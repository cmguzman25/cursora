import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for supported languages. To add or remove a
 * language: update this list and add/remove the matching
 * `messages/<locale>.json` file and entry in `locale-labels.ts`.
 */
export const routing = defineRouting({
  locales: ["es", "en", "pt-BR"],
  defaultLocale: "es",
});

export type AppLocale = (typeof routing.locales)[number];
