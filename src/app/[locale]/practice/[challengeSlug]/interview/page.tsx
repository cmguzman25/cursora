import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { isLanguageSupported } from "@/lib/practice/languages";
import { InterviewChallenge } from "@/components/practice/InterviewChallenge";
import { DifficultyBadge, LanguageBadge } from "@/components/practice/DifficultyBadge";
import { CHALLENGE_SLUGS, getChallenge } from "@content/challenges/registry";
import { localize } from "@content/courses/types";

/**
 * Un reto en modo entrevista. Ruta propia y no un parámetro de la de práctica,
 * por lo mismo que el modo estudio de `/exams`: la URL dice en qué condiciones
 * está el alumno, y cada pantalla es un componente simple.
 */

export function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") return [];

  return routing.locales.flatMap((locale) =>
    CHALLENGE_SLUGS.map((challengeSlug) => ({ locale, challengeSlug })),
  );
}

export default async function InterviewPage({
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
  // Sin motor no hay nada que entregar: no hay entrevista posible.
  if (!challenge || !isLanguageSupported(challenge.language)) {
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
            <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white">
              {t("interviewBadge")}
            </span>
          </div>
        </div>

        <InterviewChallenge challenge={challenge} />
      </main>
    </div>
  );
}
