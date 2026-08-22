/**
 * Anchoring comments to a span of rendered lesson text.
 *
 * Lesson markdown is rendered to HTML on the server, so there are no ids or
 * `data-*` hooks to point at. Instead each comment stores a W3C-style text
 * quote selector — the selected text plus a little context on either side —
 * and we re-find it in the article on every mount.
 *
 * The trade-off is deliberate: block indices would silently re-anchor to the
 * wrong paragraph after the `.md` is edited, whereas a quote that no longer
 * matches fails *loudly* and the comment can be surfaced as orphaned.
 *
 * Everything here works against a normalised copy of the article text
 * (whitespace runs collapsed to a single space), so re-flowed HTML doesn't
 * shift offsets. `TextIndex` keeps the mapping back to the live DOM nodes.
 */

/** Characters of context kept on each side of the quote. */
const CONTEXT_LENGTH = 40;

/** Matches the `quote` length check constraint in the migration. */
const MAX_QUOTE_LENGTH = 2000;

/** Give up scanning after this many occurrences of the same quote. */
const MAX_CANDIDATES = 50;

export interface TextAnchor {
  quote: string;
  prefix: string;
  suffix: string;
  /** Offset in the normalised article text. A hint for disambiguation only. */
  textPosition: number;
}

export interface TextIndex {
  /** Whitespace-normalised text of the whole article. */
  text: string;
  nodes: Text[];
  /** For each character in `text`, which node it came from... */
  nodeIndexAt: Uint32Array;
  /** ...and at which offset inside that node. */
  offsetAt: Uint32Array;
  nodePositions: Map<Text, number>;
}

function isWhitespace(char: string) {
  return char === " " || char === "\n" || char === "\t" || char === "\r" || char === "\f";
}

/**
 * Flattens `root` into normalised text while remembering where each character
 * came from. Rebuild this whenever the article DOM changes.
 */
export function buildTextIndex(root: HTMLElement): TextIndex {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  const nodePositions = new Map<Text, number>();

  let current = walker.nextNode();
  while (current) {
    const textNode = current as Text;
    nodePositions.set(textNode, nodes.length);
    nodes.push(textNode);
    current = walker.nextNode();
  }

  let text = "";
  const nodeIndexAt: number[] = [];
  const offsetAt: number[] = [];
  let pendingSpace = false;

  for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
    const data = nodes[nodeIndex].data;
    for (let offset = 0; offset < data.length; offset++) {
      if (isWhitespace(data[offset])) {
        // Collapse the run; only emit once we know real text follows, so the
        // normalised string never has leading or trailing padding.
        pendingSpace = text.length > 0;
        continue;
      }
      if (pendingSpace) {
        // The synthesized space maps to the following character's position.
        text += " ";
        nodeIndexAt.push(nodeIndex);
        offsetAt.push(offset);
        pendingSpace = false;
      }
      text += data[offset];
      nodeIndexAt.push(nodeIndex);
      offsetAt.push(offset);
    }
  }

  return {
    text,
    nodes,
    nodeIndexAt: Uint32Array.from(nodeIndexAt),
    offsetAt: Uint32Array.from(offsetAt),
    nodePositions,
  };
}

/**
 * Normalised offset of a DOM point. The `(nodeIndexAt, offsetAt)` pairs are
 * sorted by construction, so this is a binary search for the first character
 * at or after the point — which is exactly what an exclusive range end wants.
 */
function pointToOffset(index: TextIndex, node: Text, offsetInNode: number): number | null {
  const nodeIndex = index.nodePositions.get(node);
  if (nodeIndex === undefined) return null;

  let low = 0;
  let high = index.text.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    const midNode = index.nodeIndexAt[mid];
    const midOffset = index.offsetAt[mid];
    const isBefore = midNode < nodeIndex || (midNode === nodeIndex && midOffset < offsetInNode);
    if (isBefore) low = mid + 1;
    else high = mid;
  }
  return low;
}

function offsetToPoint(index: TextIndex, offset: number) {
  if (offset < 0 || offset >= index.text.length) return null;
  return {
    node: index.nodes[index.nodeIndexAt[offset]],
    offset: index.offsetAt[offset],
  };
}

/** Builds a live DOM Range covering `[start, end)` of the normalised text. */
function rangeFromOffsets(index: TextIndex, start: number, end: number): Range | null {
  if (end <= start) return null;
  const startPoint = offsetToPoint(index, start);
  // Anchor on the last character rather than the exclusive end, so the range
  // stops inside the same node. Quotes are trimmed, so this is never a
  // synthesized space (whose mapping points at the *next* character).
  const endPoint = offsetToPoint(index, end - 1);
  if (!startPoint || !endPoint) return null;

  const range = document.createRange();
  range.setStart(startPoint.node, startPoint.offset);
  range.setEnd(endPoint.node, endPoint.offset + 1);
  return range;
}

/**
 * Normalised `[start, end)` covered by a selection Range.
 *
 * Walks the text nodes the range intersects rather than reading
 * `startContainer`/`endContainer` directly — those can be elements when the
 * selection spans block boundaries, which is the common case here.
 */
function rangeToOffsets(index: TextIndex, range: Range): { start: number; end: number } | null {
  let start: number | null = null;
  let end: number | null = null;

  for (const node of index.nodes) {
    if (!range.intersectsNode(node)) continue;

    const localStart = node === range.startContainer ? range.startOffset : 0;
    const localEnd = node === range.endContainer ? range.endOffset : node.data.length;
    // `intersectsNode` also reports nodes merely touched at a boundary.
    if (localStart >= localEnd) continue;

    if (start === null) start = pointToOffset(index, node, localStart);
    end = pointToOffset(index, node, localEnd);
  }

  if (start === null || end === null || end <= start) return null;
  return { start, end };
}

/**
 * Turns a user selection into a storable anchor, or null if the selection is
 * empty, whitespace-only, or larger than the column allows.
 */
export function createAnchorFromRange(index: TextIndex, range: Range): TextAnchor | null {
  const offsets = rangeToOffsets(index, range);
  if (!offsets) return null;

  let { start, end } = offsets;
  while (start < end && isWhitespace(index.text[start])) start++;
  while (end > start && isWhitespace(index.text[end - 1])) end--;
  if (end <= start) return null;

  const quote = index.text.slice(start, end);
  if (quote.length > MAX_QUOTE_LENGTH) return null;

  return {
    quote,
    prefix: index.text.slice(Math.max(0, start - CONTEXT_LENGTH), start),
    suffix: index.text.slice(end, Math.min(index.text.length, end + CONTEXT_LENGTH)),
    textPosition: start,
  };
}

/** How many characters of `prefix`/`suffix` still line up at this candidate. */
function contextScore(text: string, at: number, anchor: TextAnchor) {
  let score = 0;

  for (let i = 1; i <= anchor.prefix.length; i++) {
    if (text[at - i] !== anchor.prefix[anchor.prefix.length - i]) break;
    score++;
  }

  const afterQuote = at + anchor.quote.length;
  for (let i = 0; i < anchor.suffix.length; i++) {
    if (text[afterQuote + i] !== anchor.suffix[i]) break;
    score++;
  }

  return score;
}

/**
 * Re-finds an anchor in the current article.
 *
 * Tries the quote in its original context first, then falls back to the
 * occurrence whose surroundings match best, breaking ties by proximity to the
 * stored position. Returns null when the text is simply gone — callers should
 * show the comment as orphaned rather than dropping it.
 */
export function resolveAnchor(index: TextIndex, anchor: TextAnchor): Range | null {
  const { text } = index;
  if (!anchor.quote) return null;

  const candidates: number[] = [];
  let at = text.indexOf(anchor.quote);
  while (at !== -1 && candidates.length < MAX_CANDIDATES) {
    candidates.push(at);
    at = text.indexOf(anchor.quote, at + 1);
  }

  if (candidates.length === 0) return null;
  if (candidates.length === 1) {
    return rangeFromOffsets(index, candidates[0], candidates[0] + anchor.quote.length);
  }

  let best = candidates[0];
  let bestScore = -1;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const candidate of candidates) {
    const score = contextScore(text, candidate, anchor);
    const distance = Math.abs(candidate - anchor.textPosition);
    if (score > bestScore || (score === bestScore && distance < bestDistance)) {
      best = candidate;
      bestScore = score;
      bestDistance = distance;
    }
  }

  return rangeFromOffsets(index, best, best + anchor.quote.length);
}

/**
 * The CSS Custom Highlight API paints ranges without touching the DOM — the
 * only safe option over markup React rendered. Where it's missing, comments
 * still work from the panel; they just aren't painted in the text.
 */
export function supportsHighlights() {
  return typeof CSS !== "undefined" && "highlights" in CSS;
}
