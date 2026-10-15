import { useTranslations } from "next-intl";
import { CheckCircle2, CircleDashed, Timer } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { localize } from "@content/courses/types";
import type { ChallengeSummary } from "@content/challenges/types";
import type { ChallengeStats } from "@/lib/practice/submissions";
import { isLanguageSupported } from "@/lib/practice/languages";
import { DifficultyBadge, LanguageBadge } from "./DifficultyBadge";

interface ChallengeCardProps {
  challenge: ChallengeSummary;
  locale: AppLocale;
  /** null = no se pudo saber (sin sesión o sin migración): no se muestra estado. */
  stats: ChallengeStats | null;
}

export function ChallengeCard({ challenge, locale, stats }: ChallengeCardProps) {
  const t = useTranslations("practice");

  return (
    <Link
      href={`/practice/${challenge.slug}`}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-indigo-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500/50"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <DifficultyBadge difficulty={challenge.difficulty} />
          <LanguageBadge language={challenge.language} />
          {!isLanguageSupported(challenge.language) && (
            <span className="rounded-full border border-dashed border-zinc-300 px-2.5 py-1 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              {t("cardNoEngine")}
            </span>
          )}
          {stats && <StatusBadge stats={stats} />}
        </div>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
          {localize(challenge.title, locale)}
        </h2>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1.5">
          <Timer className="h-3.5 w-3.5" aria-hidden="true" />
          {t("cardMinutes", { minutes: challenge.suggestedMinutes })}
        </span>
        {challenge.tags.map((tag) => (
          <span key={tag} className="font-mono">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

/** Resuelto ×N (solo cuentan las entregas con todo en verde), intentado o nuevo. */
function StatusBadge({ stats }: { stats: ChallengeStats }) {
  const t = useTranslations("practice");

  if (stats.solved > 0) {
    return (
      <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
        {t("cardSolved", { count: stats.solved })}
      </span>
    );
  }
  return (
    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
      <CircleDashed className="h-3 w-3" aria-hidden="true" />
      {stats.attempts > 0 ? t("cardAttempted", { count: stats.attempts }) : t("cardNew")}
    </span>
  );
}
