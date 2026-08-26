"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { MessageSquare } from "lucide-react";
import {
  buildTextIndex,
  createAnchorFromRange,
  resolveAnchor,
  supportsHighlights,
  type TextAnchor,
  type TextIndex,
} from "@/lib/comments/anchor";
import { ACTIVE_HIGHLIGHT_NAME, COMMENT_KINDS, COMMENT_KIND_STYLES } from "@/lib/comments/kinds";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useLessonComments } from "@/hooks/useLessonComments";
import { CommentComposer } from "@/components/lessons/CommentComposer";
import { CommentPanel } from "@/components/lessons/CommentPanel";
import { SelectionCommentButton } from "@/components/lessons/SelectionCommentButton";
import { ReadingSettings } from "@/components/lessons/ReadingSettings";

interface AnnotatedLessonProps {
  courseSlug: string;
  lessonId: string;
  /** Locale of the markdown actually rendered — not always the URL locale. */
  contentLocale: string;
  /** Server-rendered slots, so the markdown parser never ships to the browser. */
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

/**
 * The CSS Custom Highlight API isn't in every TypeScript DOM lib yet, and this
 * is the only place that needs it — so it's typed narrowly here rather than
 * pulled in globally.
 */
interface HighlightRegistryLike {
  set(name: string, value: object): void;
  delete(name: string): void;
}
type HighlightConstructor = new (...ranges: Range[]) => object;

function getHighlightApi() {
  if (typeof window === "undefined" || !supportsHighlights()) return null;
  const registry = (CSS as unknown as { highlights?: HighlightRegistryLike }).highlights;
  const Constructor = (window as unknown as { Highlight?: HighlightConstructor }).Highlight;
  return registry && Constructor ? { registry, Constructor } : null;
}

/** Caret under the pointer, across the two vendor spellings. */
function caretPointFromClick(x: number, y: number) {
  const doc = document as Document & {
    caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node; offset: number } | null;
    caretRangeFromPoint?: (x: number, y: number) => Range | null;
  };

  const position = doc.caretPositionFromPoint?.(x, y);
  if (position) return { node: position.offsetNode, offset: position.offset };

  const range = doc.caretRangeFromPoint?.(x, y);
  return range ? { node: range.startContainer, offset: range.startOffset } : null;
}

const PANEL_PREFERENCE_KEY = "cursora:lesson-comments-panel";

/**
 * The rail's open/closed state lives in `localStorage`, not in React state:
 * it is a per-browser preference that has to survive navigation between
 * lessons. Exposing it as an external store lets the server render "closed"
 * and the client adopt the stored value during hydration, with no effect
 * writing state on mount.
 */
const panelListeners = new Set<() => void>();

function subscribeToPanelPreference(listener: () => void) {
  panelListeners.add(listener);
  return () => {
    panelListeners.delete(listener);
  };
}

function readPanelPreference() {
  try {
    return window.localStorage.getItem(PANEL_PREFERENCE_KEY) === "open";
  } catch {
    // Private mode or blocked storage: closed is a fine default.
    return false;
  }
}

function writePanelPreference(open: boolean) {
  try {
    window.localStorage.setItem(PANEL_PREFERENCE_KEY, open ? "open" : "closed");
  } catch {
    // The preference just won't persist; the UI still updates.
  }
  for (const listener of panelListeners) listener();
}

interface Draft {
  anchor: TextAnchor;
  top: number;
  left: number;
}

/** A selection that could become a comment, remembered until the reader asks for one. */
interface PendingSelection {
  anchor: TextAnchor;
  range: Range;
  /** Below the selection, in column coordinates. */
  top: number;
  /** Horizontal centre of the selection, before any clamping. */
  centre: number;
  columnWidth: number;
}

/** Half the composer's width, plus a margin, so it never hangs off the column. */
const COMPOSER_HALF_WIDTH = 168;
const BUBBLE_HALF_WIDTH = 72;

function clampToColumn(centre: number, columnWidth: number, halfWidth: number) {
  return Math.min(Math.max(centre, halfWidth), Math.max(columnWidth - halfWidth, halfWidth));
}

/**
 * How long the selection has to hold still before the button appears.
 *
 * `selectionchange` fires on every pixel of a drag and on every nudge of the
 * native handles; waiting for the quiet moment keeps the button from chasing
 * the reader's thumb.
 */
const SELECTION_SETTLE_MS = 250;

export function AnnotatedLesson({
  courseSlug,
  lessonId,
  contentLocale,
  header,
  footer,
  children,
}: AnnotatedLessonProps) {
  const t = useTranslations("comments");
  const { user } = useCurrentUser();
  const {
    comments,
    isLoading,
    error,
    addComment,
    updateComment,
    deleteComment,
    setResolved,
    addReply,
    deleteReply,
  } = useLessonComments({
    userKey: user?.id ?? null,
    courseSlug,
    lessonId,
    contentLocale,
  });

  const articleRef = useRef<HTMLElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<TextIndex | null>(null);
  const rangesRef = useRef<Map<string, Range>>(new Map());

  const pendingRef = useRef<PendingSelection | null>(null);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [draft, setDraft] = useState<Draft | null>(null);
  const [bubble, setBubble] = useState<{ top: number; left: number } | null>(null);
  // Read from the selection listener, which must stay registered across
  // renders — hence a ref rather than the state value itself.
  const draftRef = useRef<Draft | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [orphanIds, setOrphanIds] = useState<Set<string>>(new Set());
  const [indexVersion, setIndexVersion] = useState(0);
  const isPanelOpen = useSyncExternalStore(
    subscribeToPanelPreference,
    readPanelPreference,
    () => false,
  );

  const highlightsSupported = supportsHighlights();

  const togglePanel = useCallback(() => {
    writePanelPreference(!readPanelPreference());
  }, []);

  // The article is server-rendered and never re-renders, so the index is built
  // once. `indexVersion` lets the painting effect wait for it.
  useEffect(() => {
    if (!articleRef.current) return;
    indexRef.current = buildTextIndex(articleRef.current);
    setIndexVersion((value) => value + 1);
  }, []);

  // Re-resolve every anchor and repaint. Runs whenever the thread changes, so
  // a newly added comment is highlighted immediately.
  useEffect(() => {
    const index = indexRef.current;
    if (!index) return;

    const ranges = new Map<string, Range>();
    const orphans = new Set<string>();

    for (const comment of comments) {
      const range = resolveAnchor(index, comment.anchor);
      if (range) ranges.set(comment.id, range);
      else orphans.add(comment.id);
    }

    rangesRef.current = ranges;
    setOrphanIds(orphans);

    const api = getHighlightApi();
    if (!api) return;

    for (const kind of COMMENT_KINDS) {
      const kindRanges = comments
        .filter((comment) => comment.kind === kind && ranges.has(comment.id))
        .map((comment) => ranges.get(comment.id)!);
      const name = COMMENT_KIND_STYLES[kind].highlightName;

      if (kindRanges.length > 0) api.registry.set(name, new api.Constructor(...kindRanges));
      else api.registry.delete(name);
    }

    const activeRange = activeId ? ranges.get(activeId) : undefined;
    if (activeRange) api.registry.set(ACTIVE_HIGHLIGHT_NAME, new api.Constructor(activeRange));
    else api.registry.delete(ACTIVE_HIGHLIGHT_NAME);
  }, [comments, activeId, indexVersion]);

  // Highlights are registered globally, so they must be torn down on unmount
  // or they bleed onto the next lesson.
  useEffect(() => {
    return () => {
      const api = getHighlightApi();
      if (!api) return;
      for (const kind of COMMENT_KINDS) api.registry.delete(COMMENT_KIND_STYLES[kind].highlightName);
      api.registry.delete(ACTIVE_HIGHLIGHT_NAME);
    };
  }, []);

  /** Describes the current selection, or null when there is nothing commentable. */
  const describeSelection = useCallback((): PendingSelection | null => {
    const article = articleRef.current;
    const column = columnRef.current;
    const index = indexRef.current;
    if (!article || !column || !index) return null;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) return null;

    const range = selection.getRangeAt(0);
    if (!article.contains(range.commonAncestorContainer)) return null;

    const anchor = createAnchorFromRange(index, range);
    if (!anchor) return null;

    // Position relative to the article column so the popover scrolls with the
    // page instead of floating over it.
    const selectionRect = range.getBoundingClientRect();
    const columnRect = column.getBoundingClientRect();

    return {
      anchor,
      range: range.cloneRange(),
      top: selectionRect.bottom - columnRect.top + 8,
      centre: selectionRect.left - columnRect.left + selectionRect.width / 2,
      columnWidth: columnRect.width,
    };
  }, []);

  /** Opens the composer over a remembered selection. */
  const openDraft = useCallback((pending: PendingSelection) => {
    const next = {
      anchor: pending.anchor,
      top: pending.top,
      left: clampToColumn(pending.centre, pending.columnWidth, COMPOSER_HALF_WIDTH),
    };
    draftRef.current = next;
    setDraft(next);
    setBubble(null);
  }, []);

  const closeDraft = useCallback(() => {
    draftRef.current = null;
    setDraft(null);
  }, []);

  // Selecting text only *remembers* it and offers the button — highlighting
  // while reading, or selecting to copy, must not pop the composer open.
  //
  // The trigger is `selectionchange` rather than `mouseup`, because dragging
  // the native selection handles on a phone never produces a mouse event: the
  // old listener meant a touch reader could select text and be offered
  // nothing.
  useEffect(() => {
    if (!user) return;

    function handleSelectionChange() {
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);

      settleTimeoutRef.current = setTimeout(() => {
        // While the composer is open its own selection churn is none of our
        // business — replacing the pending selection would change the quote
        // out from under the draft.
        if (draftRef.current) return;

        const selection = window.getSelection();
        const withinComposer = selection?.anchorNode
          ? ((selection.anchorNode as Element).closest?.("[data-comment-composer]") ??
            selection.anchorNode.parentElement?.closest("[data-comment-composer]"))
          : null;
        if (withinComposer) return;

        const pending = describeSelection();
        pendingRef.current = pending;
        setBubble(
          pending
            ? {
                top: pending.top,
                left: clampToColumn(pending.centre, pending.columnWidth, BUBBLE_HALF_WIDTH),
              }
            : null,
        );
      }, SELECTION_SETTLE_MS);
    }

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    };
  }, [describeSelection, user]);

  // `::highlight()` paints but cannot be clicked, so map the click back to a
  // caret position and test it against the resolved ranges.
  function handleArticleClick(event: React.MouseEvent) {
    if (window.getSelection()?.isCollapsed === false) return;

    const point = caretPointFromClick(event.clientX, event.clientY);
    if (!point) return;

    for (const [commentId, range] of rangesRef.current) {
      try {
        if (range.isPointInRange(point.node, point.offset)) {
          setActiveId(commentId);
          writePanelPreference(true);
          return;
        }
      } catch {
        // Range detached from a stale index — ignore and keep scanning.
      }
    }
  }

  /** Double-click is the deliberate gesture that opens the composer. */
  function handleArticleDoubleClick(event: React.MouseEvent) {
    if (!user) return;

    const pending = pendingRef.current;
    const point = caretPointFromClick(event.clientX, event.clientY);

    if (pending && point) {
      let insidePending = false;
      try {
        insidePending = pending.range.isPointInRange(point.node, point.offset);
      } catch {
        // Range detached from a stale index — fall through to the fresh selection.
      }

      if (insidePending) {
        // Put the reader's own selection back: the browser replaced it with the
        // double-clicked word, and the quote in the composer must match.
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(pending.range.cloneRange());

        openDraft(pending);
        return;
      }
    }

    // No selection under the pointer: comment on the word the double-click just
    // selected, which is a gesture of its own.
    const fresh = describeSelection();
    if (!fresh) return;
    pendingRef.current = fresh;
    openDraft(fresh);
  }

  function focusComment(commentId: string) {
    setActiveId(commentId);
    const range = rangesRef.current.get(commentId);
    const target = range?.startContainer.parentElement;
    target?.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  const article = (
    <article
      ref={articleRef}
      onClick={handleArticleClick}
      onDoubleClick={handleArticleDoubleClick}
      className="prose prose-zinc dark:prose-invert prose-headings:font-semibold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 max-w-none"
    >
      {children}
    </article>
  );

  // The wrapper structure never changes shape between the loading and
  // signed-in states. Swapping layouts here would remount the <article>,
  // leaving the text index built against a detached DOM node — so the grid is
  // always rendered and only the contents of the rail come and go.
  return (
    <div
      className={`grid gap-8 lg:items-start ${
        isPanelOpen ? "lg:grid-cols-[minmax(0,1fr)_20rem]" : "lg:grid-cols-1"
      }`}
    >
      {/* Only the classes change between states — swapping the tree here would
          remount the <article> and detach the text index built against it. */}
      <div
        ref={columnRef}
        className={`relative flex min-w-0 flex-col gap-6 ${
          isPanelOpen ? "" : "mx-auto w-full max-w-4xl"
        }`}
      >
        <div className="flex flex-wrap items-center justify-end gap-2">
          <ReadingSettings />
          {user && (
            <button
              type="button"
              onClick={togglePanel}
              aria-expanded={isPanelOpen}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              {isPanelOpen ? t("hidePanel") : t("showPanel")}
              {comments.length > 0 && (
                <span className="rounded-full bg-zinc-100 px-1.5 dark:bg-zinc-800">
                  {comments.length}
                </span>
              )}
            </button>
          )}
        </div>

        {header}
        {article}

        {user && bubble && !draft && (
          <SelectionCommentButton
            top={bubble.top}
            left={bubble.left}
            onOpen={() => {
              const pending = pendingRef.current;
              if (pending) openDraft(pending);
            }}
          />
        )}

        {user && draft && (
          <CommentComposer
            quote={draft.anchor.quote}
            top={draft.top}
            left={draft.left}
            onSubmit={async (kind, body) => {
              const ok = await addComment({ kind, body, anchor: draft.anchor });
              if (ok) {
                pendingRef.current = null;
                window.getSelection()?.removeAllRanges();
                writePanelPreference(true);
              }
              return ok;
            }}
            onCancel={closeDraft}
          />
        )}

        {footer}
      </div>

      <div className={isPanelOpen ? "" : "hidden"}>
        {user && (
          <CommentPanel
            comments={comments}
            isLoading={isLoading}
            error={error}
            currentUserId={user.id}
            isAdmin={user.role === "admin"}
            orphanIds={orphanIds}
            activeId={activeId}
            highlightsSupported={highlightsSupported}
            onFocus={focusComment}
            onUpdate={(commentId, body, kind) => updateComment(commentId, { body, kind })}
            onDelete={deleteComment}
            onToggleResolved={setResolved}
            onReply={addReply}
            onDeleteReply={deleteReply}
          />
        )}
      </div>
    </div>
  );
}
