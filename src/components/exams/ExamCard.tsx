import { useTranslations } from "next-intl";
import { Flag, ListChecks, Tags, Timer } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { localize, type ExamDifficulty, type ExamSummary } from "@content/exams/types";

/**
 * Clave de i18n con el nombre de la dificultad.
 *
 * `as const satisfies` y no `Record<ExamDifficulty, string>`: next-intl valida las
 * claves de mensaje en tiempo de compilación, y con `string` se pierde el tipo
 * literal que necesita. Es el mismo truco que `CLAVE_DE_ESTADO` en
 * `ExamQuestionGrid`.
 */
const CLAVE_DE_DIFICULTAD = {
  introductory: "difficultyIntroductory",
  intermediate: "difficultyIntermediate",
  advanced: "difficultyAdvanced",
  mixed: "difficultyMixed",
} as const satisfies Record<ExamDifficulty, string>;

interface ExamCardProps {
  exam: ExamSummary;
  locale: AppLocale;
  /** Preguntas pendientes de repaso, o null si no se pudieron contar. */
  pendingReview: number | null;
}

export function ExamCard({ exam, locale, pendingReview }: ExamCardProps) {
  const t = useTranslations("exams");

  return (
    <Link
      href={`/exams/${exam.slug}`}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-indigo-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500/50"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
            {t(CLAVE_DE_DIFICULTAD[exam.difficulty])}
          </span>
          {pendingReview !== null && pendingReview > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
              <Flag className="h-3 w-3" aria-hidden="true" />
              {t("cardPendingReview", { count: pendingReview })}
            </span>
          )}
        </div>

        <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
          {localize(exam.title, locale)}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {localize(exam.description, locale)}
        </p>
      </div>

      <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <li className="flex items-center gap-1.5">
          <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
          {t("cardQuestions", { count: exam.questionCount })}
        </li>
        <li className="flex items-center gap-1.5">
          <Tags className="h-3.5 w-3.5" aria-hidden="true" />
          {t("cardTopics", { count: exam.topicCount })}
        </li>
        <li className="flex items-center gap-1.5">
          <Timer className="h-3.5 w-3.5" aria-hidden="true" />
          {t("cardSuggested", { minutes: exam.suggestedDurationMinutes })}
        </li>
        <li>{t("cardPassMark", { percent: exam.passingPercent })}</li>
      </ul>
    </Link>
  );
}
