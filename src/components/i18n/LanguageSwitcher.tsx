"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, Globe } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { localeLabels } from "@/i18n/locale-labels";

/**
 * Language picker for the header, next to the account menu.
 *
 * It stays out of the account panel on purpose: the language of the site is
 * not a property of your account, and the globe is the symbol readers already
 * scan for when they want to switch. The trigger is the icon alone — the
 * current language is the one the whole page is already written in, so
 * spelling it out again in the header buys nothing.
 *
 * The options are real links to the same page in another locale, so the
 * current one is `aria-current` and any of them can be opened in a new tab.
 */
export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      // Escape has to hand focus back, or the keyboard user is left on a
      // list that no longer exists.
      triggerRef.current?.focus();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown") return;
          event.preventDefault();
          setOpen(true);
          requestAnimationFrame(() => {
            listRef.current?.querySelector<HTMLElement>("a")?.focus();
          });
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="language-panel"
        aria-label={t("languageSwitcherLabel")}
        title={t("languageSwitcherLabel")}
        className={`flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 ${
          open ? "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200" : ""
        }`}
      >
        <Globe className="h-5 w-5" aria-hidden="true" />
      </button>

      {open && (
        <ul
          ref={listRef}
          id="language-panel"
          aria-label={t("languageSwitcherLabel")}
          className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
        >
          {routing.locales.map((code) => (
            <li key={code}>
              <Link
                href={pathname}
                locale={code}
                onClick={() => setOpen(false)}
                aria-current={code === locale ? "true" : undefined}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                <span
                  aria-hidden="true"
                  className="w-6 shrink-0 text-[11px] font-semibold tracking-wide text-zinc-400 dark:text-zinc-500"
                >
                  {localeLabels[code].code}
                </span>
                <span className="flex-1 truncate">{localeLabels[code].name}</span>
                {code === locale && (
                  <Check
                    className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
