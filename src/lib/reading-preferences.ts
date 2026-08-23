/**
 * Reading preferences for lesson pages: text size and page tint, the two
 * controls every e-reader gives you.
 *
 * Kept in `localStorage` rather than React state so the choice survives moving
 * between lessons, and exposed as an external store (subscribe + snapshot) so
 * components can read it with `useSyncExternalStore`: the server renders the
 * defaults and the client adopts the stored value during hydration, without an
 * effect writing state on mount.
 */

export type ReadingTheme = "system" | "light" | "sepia" | "dark";

export const READING_THEMES: ReadingTheme[] = ["system", "light", "sepia", "dark"];

/**
 * 16px is the accessible floor for body text on the web; the top of the range
 * covers low-vision reading without turning every line into three words.
 */
export const READING_FONT_SIZES = [16, 18, 20, 22, 24] as const;

export interface ReadingPreferences {
  theme: ReadingTheme;
  /** Base text size of the lesson body, in pixels. */
  fontSize: number;
}

const STORAGE_KEY = "cursora:reading-preferences";

/** 18px reads better than 16 for long-form text, and stays adjustable. */
export const DEFAULT_READING_PREFERENCES: ReadingPreferences = { theme: "system", fontSize: 18 };

const listeners = new Set<() => void>();

/**
 * The snapshot has to be referentially stable between reads, or
 * `useSyncExternalStore` re-renders forever — so the parsed value is cached
 * and only replaced when it actually changes.
 */
let cached: ReadingPreferences | null = null;

function parse(raw: string | null): ReadingPreferences {
  if (!raw) return DEFAULT_READING_PREFERENCES;

  try {
    const stored = JSON.parse(raw) as Partial<ReadingPreferences>;
    const theme = READING_THEMES.includes(stored.theme as ReadingTheme)
      ? (stored.theme as ReadingTheme)
      : DEFAULT_READING_PREFERENCES.theme;
    const fontSize = READING_FONT_SIZES.includes(
      stored.fontSize as (typeof READING_FONT_SIZES)[number],
    )
      ? (stored.fontSize as number)
      : DEFAULT_READING_PREFERENCES.fontSize;

    return { theme, fontSize };
  } catch {
    // Corrupted or hand-edited value: fall back instead of breaking the page.
    return DEFAULT_READING_PREFERENCES;
  }
}

export function readReadingPreferences(): ReadingPreferences {
  if (cached) return cached;

  try {
    cached = parse(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    // Private mode or blocked storage.
    cached = DEFAULT_READING_PREFERENCES;
  }

  return cached;
}

/** Server snapshot: constant, so hydration matches the pre-JS markup. */
export function readDefaultReadingPreferences(): ReadingPreferences {
  return DEFAULT_READING_PREFERENCES;
}

export function subscribeToReadingPreferences(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setReadingPreferences(patch: Partial<ReadingPreferences>) {
  cached = { ...readReadingPreferences(), ...patch };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cached));
  } catch {
    // The preference just won't persist; the page still updates.
  }

  for (const listener of listeners) listener();
}

/** Next size up or down, clamped at the ends of the scale. */
export function stepFontSize(current: number, direction: 1 | -1) {
  const index = READING_FONT_SIZES.indexOf(current as (typeof READING_FONT_SIZES)[number]);
  const from = index === -1 ? READING_FONT_SIZES.indexOf(18) : index;
  const next = Math.min(Math.max(from + direction, 0), READING_FONT_SIZES.length - 1);
  return READING_FONT_SIZES[next];
}
