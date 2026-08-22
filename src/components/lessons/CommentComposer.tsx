"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";
import { COMMENT_KINDS, COMMENT_KIND_STYLES, type CommentKind } from "@/lib/comments/kinds";

interface CommentComposerProps {
  quote: string;
  /** Position within the article column, in pixels. */
  top: number;
  left: number;
  onSubmit: (kind: CommentKind, body: string) => Promise<boolean>;
  onCancel: () => void;
}

/**
 * The popover that appears under a fresh text selection.
 *
 * There is no dialog primitive in this codebase, so this follows the
 * outside-click pattern from `LanguageSwitcher` — plus the Escape handling
 * that one is missing.
 */
export function CommentComposer({ quote, top, left, onSubmit, onCancel }: CommentComposerProps) {
  const t = useTranslations("comments");
  const [kind, setKind] = useState<CommentKind>("error");
  const [body, setBody] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onCancel();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = body.trim();
    if (!trimmed || isSaving) return;

    setIsSaving(true);
    const ok = await onSubmit(kind, trimmed);
    setIsSaving(false);
    if (ok) onCancel();
  }

  return (
    <div
      ref={containerRef}
      data-comment-composer=""
      style={{ top, left }}
      className="absolute z-30 w-80 -translate-x-1/2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
      role="dialog"
      aria-label={t("composerTitle")}
    >
      <p className="mb-3 line-clamp-2 border-l-2 border-zinc-300 pl-2 text-xs text-zinc-500 italic dark:border-zinc-600 dark:text-zinc-400">
        {quote}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 flex gap-1.5" role="radiogroup" aria-label={t("kindLabel")}>
          {COMMENT_KINDS.map((option) => {
            const style = COMMENT_KIND_STYLES[option];
            const selected = option === kind;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setKind(option)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors ${
                  selected
                    ? style.pickerSelected
                    : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
                {t(`kinds.${option}`)}
              </button>
            );
          })}
        </div>

        <textarea
          ref={textareaRef}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          rows={3}
          maxLength={4000}
          placeholder={t("placeholder")}
          className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />

        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            disabled={!body.trim() || isSaving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:from-indigo-500 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving && <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />}
            {t("save")}
          </button>
        </div>
      </form>
    </div>
  );
}
