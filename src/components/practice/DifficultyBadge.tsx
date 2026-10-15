import { useTranslations } from "next-intl";
import type { ChallengeDifficulty, ChallengeLanguage } from "@content/challenges/types";

/** Clave de i18n de cada dificultad (`as const` por lo mismo que en `ExamCard`). */
export const CLAVE_DE_DIFICULTAD = {
  basic: "difficultyBasic",
  medium: "difficultyMedium",
  advanced: "difficultyAdvanced",
} as const satisfies Record<ChallengeDifficulty, string>;

const COLOR_DE_DIFICULTAD: Record<ChallengeDifficulty, string> = {
  basic: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  advanced: "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300",
};

/** Los nombres de los lenguajes no se traducen. */
export const NOMBRE_DE_LENGUAJE: Record<ChallengeLanguage, string> = {
  postgres: "PostgreSQL",
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  scala: "Scala",
};

export function DifficultyBadge({ difficulty }: { difficulty: ChallengeDifficulty }) {
  const t = useTranslations("practice");
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${COLOR_DE_DIFICULTAD[difficulty]}`}
    >
      {t(CLAVE_DE_DIFICULTAD[difficulty])}
    </span>
  );
}

export function LanguageBadge({ language }: { language: ChallengeLanguage }) {
  return (
    <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-mono text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
      {NOMBRE_DE_LENGUAJE[language]}
    </span>
  );
}
