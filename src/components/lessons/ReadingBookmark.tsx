"use client";

import { useTranslations } from "next-intl";
import { Bookmark, Loader2, X } from "lucide-react";

interface ReadingBookmarkProps {
  /** Vertical offset within the article column, in pixels. */
  top: number;
  isRemoving: boolean;
  onRemove: () => void;
}

/**
 * The line drawn across the lesson where the reader left off.
 *
 * It has to be visible for the mark to be understandable at all: arriving at a
 * lesson already scrolled halfway down is disorienting unless something on the
 * page says why. It also carries the only "remove" control, which is the right
 * place for it — coming back drops you here, so the control is under your eyes
 * exactly when you'd want it.
 *
 * The wrapper ignores pointer events so the line never gets in the way of
 * selecting the text it crosses; only the pill takes clicks.
 */
export function ReadingBookmark({ top, isRemoving, onRemove }: ReadingBookmarkProps) {
  const t = useTranslations("lesson");

  return (
    <div
      style={{ top }}
      className="pointer-events-none absolute inset-x-0 z-20 flex -translate-y-1/2 items-center gap-2"
    >
      <span className="pointer-events-auto inline-flex items-center gap-1 rounded-full bg-indigo-600 py-0.5 pr-1 pl-2 text-[11px] font-semibold text-white shadow-sm">
        <Bookmark className="h-3 w-3" aria-hidden="true" />
        {t("bookmarkHere")}
        <button
          type="button"
          onClick={onRemove}
          disabled={isRemoving}
          aria-label={t("bookmarkRemove")}
          className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-white/20 disabled:opacity-60"
        >
          {isRemoving ? (
            <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
          ) : (
            <X className="h-3 w-3" aria-hidden="true" />
          )}
        </button>
      </span>
      <span className="h-px flex-1 bg-indigo-300 dark:bg-indigo-500/40" aria-hidden="true" />
    </div>
  );
}
