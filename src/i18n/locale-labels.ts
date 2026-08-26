import type { AppLocale } from "./routing";

/**
 * Display metadata for the language switcher. Add an entry here whenever a
 * new locale is added to `routing.ts`.
 *
 * No flags: Windows renders regional-indicator emoji as bare letter pairs
 * ("ES", "GB"), and a flag names a country rather than a language anyway —
 * English isn't British to most of the people reading it. The short code
 * plays the same role of being scannable without that baggage.
 */
export const localeLabels: Record<AppLocale, { name: string; code: string }> = {
  es: { name: "Español", code: "ES" },
  en: { name: "English", code: "EN" },
  "pt-BR": { name: "Português (Brasil)", code: "PT" },
};
