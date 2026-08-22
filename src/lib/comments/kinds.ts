/**
 * The three comment labels. Kept in sync with the `kind` check constraint in
 * `supabase/migrations/0001_lesson_comments.sql` — adding one here means
 * widening that constraint too.
 */
export const COMMENT_KINDS = ["error", "suggestion", "question"] as const;

export type CommentKind = (typeof COMMENT_KINDS)[number];

export function isCommentKind(value: unknown): value is CommentKind {
  return typeof value === "string" && (COMMENT_KINDS as readonly string[]).includes(value);
}

interface CommentKindStyle {
  /** Registered name in `CSS.highlights`; styled via `::highlight()` in globals.css. */
  highlightName: string;
  /** Small round swatch, used in the kind picker and badges. */
  dot: string;
  /** Badge pill. */
  badge: string;
  /** Selected state in the kind picker. */
  pickerSelected: string;
  /** Left edge of a comment card, so the kind reads at a glance down the rail. */
  cardAccent: string;
}

export const COMMENT_KIND_STYLES: Record<CommentKind, CommentKindStyle> = {
  error: {
    highlightName: "cursora-comment-error",
    dot: "bg-rose-500",
    badge:
      "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    pickerSelected:
      "border-rose-500 bg-rose-50 text-rose-700 dark:border-rose-500/60 dark:bg-rose-500/10 dark:text-rose-300",
    cardAccent: "border-l-rose-500",
  },
  suggestion: {
    highlightName: "cursora-comment-suggestion",
    dot: "bg-amber-500",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    pickerSelected:
      "border-amber-500 bg-amber-50 text-amber-700 dark:border-amber-500/60 dark:bg-amber-500/10 dark:text-amber-300",
    cardAccent: "border-l-amber-500",
  },
  question: {
    highlightName: "cursora-comment-question",
    dot: "bg-indigo-500",
    badge:
      "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    pickerSelected:
      "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500/60 dark:bg-indigo-500/10 dark:text-indigo-300",
    cardAccent: "border-l-indigo-500",
  },
};

/** Extra highlight layered on top of the kind colour for the focused comment. */
export const ACTIVE_HIGHLIGHT_NAME = "cursora-comment-active";

/** `question` is a private note to self — nothing for the admin to resolve. */
export function isResolvable(kind: CommentKind) {
  return kind === "error" || kind === "suggestion";
}
