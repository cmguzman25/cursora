import { useTranslations } from "next-intl";
import { Flag, FolderOpen, ListChecks, Timer } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { localize, type ExamGroupSummary } from "@content/exams/types";

interface ExamGroupCardProps {
  group: ExamGroupSummary;
  locale: AppLocale;
  /** Preguntas pendientes de repaso en todo el grupo, o null si no se pudieron contar. */
  pendingReview: number | null;
}

/**
 * La tarjeta de un grupo en la portada de `/exams`.
 *
 * Deliberadamente parecida a `ExamCard` pero sin dificultad ni nota para aprobar:
 * esas son propiedades de una prueba, y un grupo no se rinde. Lo que muestra son
 * las tres cosas que se pueden sumar sin inventar nada —cuántas pruebas, cuántas
 * preguntas entre todas, cuánto tiempo si se rindieran todas— más lo que le queda
 * pendiente de repaso al alumno en el grupo entero.
 */
export function ExamGroupCard({ group, locale, pendingReview }: ExamGroupCardProps) {
  const t = useTranslations("exams");

  return (
    <Link
      href={`/exams/groups/${group.slug}`}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-indigo-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500/50"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
            <FolderOpen className="h-3 w-3" aria-hidden="true" />
            {t("cardExams", { count: group.examCount })}
          </span>
          {pendingReview !== null && pendingReview > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
              <Flag className="h-3 w-3" aria-hidden="true" />
              {t("cardPendingReview", { count: pendingReview })}
            </span>
          )}
        </div>

        <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
          {localize(group.title, locale)}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {localize(group.description, locale)}
        </p>
      </div>

      {/*
        Un grupo recién creado, sin pruebas todavía, no tiene nada que sumar: cero
        preguntas y cero minutos no son datos, así que no se muestran.
      */}
      {group.examCount > 0 && (
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <li className="flex items-center gap-1.5">
            <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
            {t("cardQuestions", { count: group.questionCount })}
          </li>
          <li className="flex items-center gap-1.5">
            <Timer className="h-3.5 w-3.5" aria-hidden="true" />
            {t("cardSuggested", { minutes: group.suggestedDurationMinutes })}
          </li>
        </ul>
      )}
    </Link>
  );
}
