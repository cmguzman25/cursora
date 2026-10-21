import { useTranslations } from "next-intl";
import { BookOpen, PencilLine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { localize } from "@content/exams/types";
import type { ExerciseSetSummary } from "@content/exercises/types";

interface ExerciseSetCardProps {
  set: ExerciseSetSummary;
  locale: AppLocale;
}

/** La tarjeta de una lista de ejercicios prácticos en la página de su grupo. */
export function ExerciseSetCard({ set, locale }: ExerciseSetCardProps) {
  const t = useTranslations("exams");

  return (
    <Link
      href={`/exams/exercises/${set.slug}`}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-emerald-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-emerald-500/50"
    >
      <div className="flex flex-col gap-2">
        <span className="self-start rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300">
          {t("exercisesBadge")}
        </span>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
          {localize(set.title, locale)}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{localize(set.description, locale)}</p>
      </div>

      <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <li className="flex items-center gap-1.5">
          <PencilLine className="h-3.5 w-3.5" aria-hidden="true" />
          {t("cardExercises", { count: set.exerciseCount })}
        </li>
        <li className="flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          {t("cardChapters", { count: set.sectionCount })}
        </li>
      </ul>
    </Link>
  );
}
