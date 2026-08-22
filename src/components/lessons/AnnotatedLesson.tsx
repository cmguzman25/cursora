"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
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

interface Draft {
  anchor: TextAnchor;
  top: number;
  left: number;
}

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

  const [draft, setDraft] = useState<Draft | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [orphanIds, setOrphanIds] = useState<Set<string>>(new Set());
  const [indexVersion, setIndexVersion] = useState(0);
  const [panelOpenOnMobile, setPanelOpenOnMobile] = useState(false);

  const highlightsSupported = supportsHighlights();

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

  const captureSelection = useCallback((event: Event) => {
    const target = event.target as Element | null;
    // Selecting inside the composer must not replace the draft it belongs to.
    if (target?.closest?.("[data-comment-composer]")) return;

    const article = articleRef.current;
    const column = columnRef.current;
    const index = indexRef.current;
    if (!article || !column || !index) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      setDraft(null);
      return;
    }

    const range = selection.getRangeAt(0);
    if (!article.contains(range.commonAncestorContainer)) {
      setDraft(null);
      return;
    }

    const anchor = createAnchorFromRange(index, range);
    if (!anchor) {
      setDraft(null);
      return;
    }

    // Position relative to the article column so the popover scrolls with the
    // page instead of floating over it.
    const selectionRect = range.getBoundingClientRect();
    const columnRect = column.getBoundingClientRect();
    const centre = selectionRect.left - columnRect.left + selectionRect.width / 2;

    setDraft({
      anchor,
      top: selectionRect.bottom - columnRect.top + 8,
      left: Math.min(Math.max(centre, 168), Math.max(columnRect.width - 168, 168)),
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    document.addEventListener("mouseup", captureSelection);
    document.addEventListener("keyup", captureSelection);
    return () => {
      document.removeEventListener("mouseup", captureSelection);
      document.removeEventListener("keyup", captureSelection);
    };
  }, [captureSelection, user]);

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
          setPanelOpenOnMobile(true);
          return;
        }
      } catch {
        // Range detached from a stale index — ignore and keep scanning.
      }
    }
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
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <div ref={columnRef} className="relative flex min-w-0 flex-col gap-6">
        {header}
        {article}

        {user && draft && (
          <CommentComposer
            quote={draft.anchor.quote}
            top={draft.top}
            left={draft.left}
            onSubmit={async (kind, body) => {
              const ok = await addComment({ kind, body, anchor: draft.anchor });
              if (ok) window.getSelection()?.removeAllRanges();
              return ok;
            }}
            onCancel={() => setDraft(null)}
          />
        )}

        {footer}

        {user && (
          <button
            type="button"
            onClick={() => setPanelOpenOnMobile((value) => !value)}
            aria-expanded={panelOpenOnMobile}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-600 lg:hidden dark:border-zinc-700 dark:text-zinc-300"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            {panelOpenOnMobile ? t("hidePanel") : t("showPanel")}
            {comments.length > 0 && (
              <span className="rounded-full bg-zinc-100 px-1.5 text-xs dark:bg-zinc-800">
                {comments.length}
              </span>
            )}
          </button>
        )}
      </div>

      <div className={panelOpenOnMobile ? "" : "hidden lg:block"}>
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
