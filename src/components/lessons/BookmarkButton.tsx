"use client";

import { useTranslations } from "next-intl";
import { Bookmark, BookmarkPlus, Loader2 } from "lucide-react";

interface BookmarkButtonProps {
  hasBookmark: boolean;
  isSaving: boolean;
  onSet: () => void;
}

/**
 * "Mark here", floating over the lesson rather than sitting in the toolbar at
 * the top of the page.
 *
 * The toolbar was the wrong home for it: you decide to mark your place when
 * you are halfway down a lesson, and by then the toolbar has scrolled out of
 * sight — the one moment the control is needed is the one moment it isn't
 * there. Pinned to the viewport, it follows the reader down the page.
 *
 * It fills in for the mark itself too: when one exists the button changes
 * tone, so you can tell you have a mark somewhere above or below without
 * hunting for the line.
 */
export function BookmarkButton({ hasBookmark, isSaving, onSet }: BookmarkButtonProps) {
  const t = useTranslations("lesson");

  return (
    <button
      type="button"
      onClick={onSet}
      disabled={isSaving}
      title={t("bookmarkHint")}
      className={`fixed right-5 bottom-5 z-30 inline-flex items-center gap-2 rounded-full py-2.5 pr-4 pl-3.5 text-sm font-semibold shadow-lg transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
        hasBookmark
          ? "bg-indigo-600 text-white hover:bg-indigo-500"
          : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      }`}
    >
      {isSaving ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : hasBookmark ? (
        <Bookmark className="h-4 w-4 fill-current" aria-hidden="true" />
      ) : (
        <BookmarkPlus className="h-4 w-4" aria-hidden="true" />
      )}
      {t("bookmarkSet")}
    </button>
  );
}
