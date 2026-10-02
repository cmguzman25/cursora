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
   * How the lesson is rendered. Omitted (or "lesson") for regular content
   * lessons, which come from a `.md` file:
   *
   * - "quiz" renders an interactive `ExamQuiz` — an untimed, unscored drill
   *   whose content lives in a question bank (see `ExamQuizQuestion`).
   * - "exam" renders a timed, scored `PracticeExam` — a full mock exam with a
   *   countdown and a scaled score (see `PracticeExamBank`).
   *
   * Neither interactive kind has a `.md` file.
   */
  kind?: "lesson" | "quiz" | "exam";
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
  /**
   * Which exam domain this question belongs to, matching an `ExamDomain.id` of
   * its bank. Optional here so the module quizzes — which don't report a
   * per-domain breakdown — stay as they are; practice exams require it, see
   * `ExamQuestionWithDomain`.
   */
  domain?: string;
}

/**
 * A question that can appear on a scored practice exam. The per-domain
 * breakdown is computed from `domain`, so it isn't optional here — a question
 * without one would silently vanish from the learner's diagnosis.
 */
export type ExamQuestionWithDomain = ExamQuizQuestion & { domain: string };

/**
 * A question bank in every language it has been written in — same shape as
 * `LocalizedText`: the default locale is required, the rest are optional.
 *
 * The translations have to stay parallel: same questions, same order, same
 * option ids and same correct answers. The quiz keys its progress by question
 * index and lets the learner switch language in the middle of a run, so a bank
 * that drifted out of order would score the wrong question.
 */
export type LocalizedQuestions = Partial<Record<AppLocale, ExamQuizQuestion[]>> &
  Record<typeof defaultLocale, ExamQuizQuestion[]>;

/** Same shape and same parallelism rule as `LocalizedQuestions`, for exam banks. */
export type LocalizedExamQuestions = Partial<Record<AppLocale, ExamQuestionWithDomain[]>> &
  Record<typeof defaultLocale, ExamQuestionWithDomain[]>;

export interface ExamDomain {
  /** Stable, locale-independent key. Matches `ExamQuizQuestion.domain`. */
  id: string;
  name: LocalizedText;
  /**
   * How much the domain weighs on the real exam, as a fraction (0.24 = 24 %).
   * Shown next to the learner's per-domain result: our question count can
   * never match the official weighting exactly, and showing both keeps that
   * gap visible instead of implying a precision we don't have.
   */
  weight: number;
}

/**
 * A timed, scored mock exam — the payload behind an "exam"-kind lesson.
 *
 * The duration and the scale live here rather than in the component so a
 * second course can ship its own exam (the Data Engineer one is 130 minutes)
 * without touching the UI.
 */
export interface PracticeExamBank {
  durationMinutes: number;
  /** Reported score range. The real AWS exams use 100–1000. */
  scaledMin: number;
  scaledMax: number;
  passingScore: number;
  /**
   * The raw fraction the pass mark is pinned to, so `passingScore` lands
   * exactly on the percentage learners already have in their heads. See
   * `src/lib/exams/scaled-score.ts` for why this is an approximation.
   */
  passingRawFraction: number;
  domains: ExamDomain[];
  /**
   * Bumped whenever a question is added, removed, reworded or re-keyed. Stored
   * on each attempt so an old attempt is never reviewed against a newer bank.
   */
  version: number;
  questions: LocalizedExamQuestions;
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
