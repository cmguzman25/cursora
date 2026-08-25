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
  /**
   * "quiz" lessons render an interactive `ExamQuiz` instead of the markdown
   * pipeline — their content lives in a question bank (see `ExamQuizQuestion`),
   * not in a `.md` file. Omitted (or "lesson") for regular content lessons.
   */
  kind?: "lesson" | "quiz";
}

export interface ExamQuizOption {
  id: string;
  text: string;
  correct: boolean;
  /** Shown after the learner reveals the answer, for this option specifically — why it's right or wrong. */
  explanation: string;
}

export interface ExamQuizQuestion {
  id: string;
  prompt: string;
  /** true = "select 2 correct out of 5" (checkbox), like the real exam's multi-answer format. Default: single choice. */
  multiple?: boolean;
  options: ExamQuizOption[];
  /** Short exam-prep tips shown alongside the explanations once revealed. */
  tips: string[];
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
