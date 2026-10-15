import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Timer } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { buttonClasses } from "@/components/ui/Button";
import { isLanguageSupported } from "@/lib/practice/languages";
import { ChallengeWorkspace } from "@/components/practice/ChallengeWorkspace";
import { DifficultyBadge, LanguageBadge } from "@/components/practice/DifficultyBadge";
import { CHALLENGE_SLUGS, getChallenge } from "@content/challenges/registry";
import { localize } from "@content/courses/types";

/**
 * Un reto: enunciado a la izquierda, editor y resultados a la derecha.
 *
 * El reto completo —solución incluida— viaja al navegador, porque el runner la
 * necesita para calcular el resultado esperado. Es estudio propio: la UI la
 * esconde hasta que el alumno envía o se rinde, y con eso alcanza.
 */

export function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") return [];

  return routing.locales.flatMap((locale) =>
    CHALLENGE_SLUGS.map((challengeSlug) => ({ locale, challengeSlug })),
  );
}

export default async function ChallengePage({
  params,
}: {
  params: Promise<{ locale: string; challengeSlug: string }>;
}) {
  const { locale, challengeSlug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const challenge = getChallenge(challengeSlug);
  if (!challenge) {
    notFound();
  }

  const t = await getTranslations("practice");

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-6 py-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/practice"
            className="self-start text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← {t("backToCatalog")}
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              {localize(challenge.title, locale as AppLocale)}
            </h1>
            <DifficultyBadge difficulty={challenge.difficulty} />
            <LanguageBadge language={challenge.language} />
            <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <Timer className="h-3.5 w-3.5" aria-hidden="true" />
              {t("cardMinutes", { minutes: challenge.suggestedMinutes })}
            </span>
            {isLanguageSupported(challenge.language) && (
              <Link
                href={`/practice/${challenge.slug}/interview`}
                className={buttonClasses("outline", "ml-auto h-9")}
              >
                <Timer className="h-4 w-4" aria-hidden="true" />
                {t("interviewCta")}
              </Link>
            )}
          </div>
        </div>

        <ChallengeWorkspace challenge={challenge} />
      </main>
    </div>
  );
}
