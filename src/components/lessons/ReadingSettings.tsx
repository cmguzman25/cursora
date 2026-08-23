"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Minus, Plus, Type } from "lucide-react";
import {
  READING_FONT_SIZES,
  READING_THEMES,
  readDefaultReadingPreferences,
  readReadingPreferences,
  setReadingPreferences,
  stepFontSize,
  subscribeToReadingPreferences,
  type ReadingTheme,
} from "@/lib/reading-preferences";

/** Swatch colours mirror the tints defined in `globals.css`. */
const THEME_SWATCHES: Record<ReadingTheme, string> = {
  system: "bg-gradient-to-br from-white to-zinc-800",
  light: "bg-[#fdfcfa]",
  sepia: "bg-[#f4ecd8]",
  dark: "bg-[#16161a]",
};

/**
 * The e-reader controls for a lesson: text size and page tint.
 *
 * This component also *applies* the preferences, by writing them onto <html>
 * and clearing them on unmount — so the tint lives exactly as long as the
 * lesson is on screen and never leaks into the rest of the app.
 */
export function ReadingSettings() {
  const t = useTranslations("reading");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const preferences = useSyncExternalStore(
    subscribeToReadingPreferences,
    readReadingPreferences,
    readDefaultReadingPreferences,
  );
  const { theme, fontSize } = preferences;

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "system") delete root.dataset.readingTheme;
    else root.dataset.readingTheme = theme;

    root.style.setProperty("--reading-font-size", `${fontSize}px`);

    return () => {
      delete root.dataset.readingTheme;
      root.style.removeProperty("--reading-font-size");
    };
  }, [theme, fontSize]);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isSmallest = fontSize === READING_FONT_SIZES[0];
  const isLargest = fontSize === READING_FONT_SIZES[READING_FONT_SIZES.length - 1];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        title={t("title")}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-xs font-semibold text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        <Type className="h-3.5 w-3.5" aria-hidden="true" />
        {t("title")}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-label={t("title")}
          className="absolute top-11 right-0 z-30 w-64 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
        >
          <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {t("textSize")}
          </p>
          <div className="mb-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setReadingPreferences({ fontSize: stepFontSize(fontSize, -1) })}
              disabled={isSmallest}
              aria-label={t("decrease")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <Minus className="h-4 w-4" aria-hidden="true" />
            </button>

            <div
              className="flex flex-1 items-center justify-center gap-1"
              role="group"
              aria-label={t("textSize")}
            >
              {READING_FONT_SIZES.map((size) => (
                <span
                  key={size}
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    size <= fontSize
                      ? "bg-indigo-500"
                      : "bg-zinc-200 dark:bg-zinc-700"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => setReadingPreferences({ fontSize: stepFontSize(fontSize, 1) })}
              disabled={isLargest}
              aria-label={t("increase")}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <p className="mb-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            {t("background")}
          </p>
          <div className="flex gap-2" role="radiogroup" aria-label={t("background")}>
            {READING_THEMES.map((option) => {
              const selected = option === theme;
              return (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setReadingPreferences({ theme: option })}
                  title={t(`themes.${option}`)}
                  className={`flex flex-1 flex-col items-center gap-1 rounded-lg border p-2 text-[0.65rem] font-medium transition-colors ${
                    selected
                      ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-5 w-5 rounded-full border border-zinc-300 dark:border-zinc-600 ${THEME_SWATCHES[option]}`}
                  />
                  {t(`themes.${option}`)}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
