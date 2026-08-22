import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for supported languages. To add or remove a
 * language: update this list and add/remove the matching
 * `messages/<locale>.json` file and entry in `locale-labels.ts`.
 */
/**
 * The locale everything falls back to when a translation is missing: UI
 * messages, course metadata, and lesson markdown. Exported on its own so its
 * literal type survives — `routing.defaultLocale` widens to the whole union.
 */
export const defaultLocale = "es";

export const routing = defineRouting({
  locales: ["es", "en", "pt-BR"],
  defaultLocale,
});

export type AppLocale = (typeof routing.locales)[number];
