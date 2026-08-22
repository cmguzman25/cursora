import { defaultLocale, type AppLocale } from "@/i18n/routing";

/**
 * A piece of course metadata in every language we have it in. Only the default
 * locale is required: a course can ship its lessons in Spanish first and get
 * translated later, exactly like the markdown files themselves (the lesson
 * page already falls back to the default-locale content when a translation is
 * missing). Read it through `localize()` so the fallback is never forgotten.
 */
export type LocalizedText = Partial<Record<AppLocale, string>> &
  Record<typeof defaultLocale, string>;

export function localize(text: LocalizedText, locale: AppLocale): string {
  return text[locale] ?? text[defaultLocale];
}

export interface LessonMeta {
  id: string;
  /** Stable grouping key, independent of locale (used to group lessons by module). */
  moduleId: string;
  module: LocalizedText;
  title: LocalizedText;
}

export interface CourseManifest {
  slug: string;
  title: LocalizedText;
  /**
   * Ordered list of every lesson in the course. This is the source of truth
   * the app uses for navigation (current/next lesson, progress totals) — keep
   * it in sync with the course's `README.md` when lessons are added, removed,
   * or reordered.
   */
  lessons: LessonMeta[];
}
