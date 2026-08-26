"use client";

import { useTranslations } from "next-intl";
import { MessageSquarePlus } from "lucide-react";

interface SelectionCommentButtonProps {
  /** Position within the article column, in pixels. */
  top: number;
  left: number;
  onOpen: () => void;
}

/**
 * The button that floats under a fresh text selection and opens the composer.
 *
 * Double-clicking the selection does the same thing, but that gesture doesn't
 * exist on a touch screen — long-pressing gives you the native selection
 * handles and nothing else. This is the affordance that makes commenting
 * reachable there, and on a desktop it also makes a hidden gesture visible.
 *
 * It sits *below* the selection because iOS and Android paint their own
 * "Copy / Look up / Share" callout above it.
 */
export function SelectionCommentButton({ top, left, onOpen }: SelectionCommentButtonProps) {
  const t = useTranslations("comments");

  return (
    <button
      type="button"
      // Without this the press collapses the selection before the handler
      // runs, and the quote the comment would anchor to is gone.
      onPointerDown={(event) => event.preventDefault()}
      // Two ways in, because that `preventDefault` is reported to swallow the
      // click on some iOS versions: `pointerup` covers touch and mouse,
      // `click` covers the keyboard, which produces no pointer events at all.
      // Opening twice is harmless — the button unmounts on the first one.
      onPointerUp={onOpen}
      onClick={onOpen}
      style={{ top, left }}
      className="absolute z-30 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-zinc-900 py-2 pr-3.5 pl-3 text-xs font-semibold text-white shadow-lg transition-transform hover:scale-105 dark:bg-white dark:text-zinc-900"
    >
      <MessageSquarePlus className="h-4 w-4" aria-hidden="true" />
      {t("addComment")}
    </button>
  );
}
