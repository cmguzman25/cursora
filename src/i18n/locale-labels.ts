import type { AppLocale } from "./routing";

/**
 * Display metadata for the language switcher. Add an entry here whenever a
 * new locale is added to `routing.ts`.
 */
export const localeLabels: Record<AppLocale, { name: string; flag: string }> = {
  es: { name: "Español", flag: "🇪🇸" },
  en: { name: "English", flag: "🇬🇧" },
  "pt-BR": { name: "Português (Brasil)", flag: "🇧🇷" },
};
