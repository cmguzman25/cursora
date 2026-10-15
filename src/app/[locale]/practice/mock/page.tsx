import { randomUUID } from "node:crypto";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Clock, ListChecks } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { buttonClasses } from "@/components/ui/Button";
import { DifficultyBadge } from "@/components/practice/DifficultyBadge";
import { MockConfigurator } from "@/components/practice/MockConfigurator";
import { getChallengeSummaries } from "@content/challenges/registry";
import { getChallengeStats } from "@/lib/practice/submissions";
import { mockMinutes, MOCK_PRESETS, pickMockChallenges } from "@/lib/practice/mock";

/**
 * Elegir un simulacro.
 *
 * Los retos se eligen **al renderizar esta página** y viajan en el enlace de
 * cada formato (`?c=slug1,slug2&s=id`). Así la sesión es estable: recargarla no
 * vuelve a sortear, y el id `s` separa dos simulacros con los mismos retos. Los
 * títulos no se muestran hasta empezar, para que no se pueda ir a practicar
 * justo esos.
 *
 * Debajo, el simulacro personalizado (`MockConfigurator`): ese no se sortea
 * aquí sino en `/practice/mock/start`, con la configuración que elija el alumno.
 */
export default async function MockPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ empty?: string }>;
}) {
  const { locale } = await params;
  const { empty } = await searchParams;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("practice");
  const catalogo = getChallengeSummaries();
  const stats = await getChallengeStats();

  const formatos = MOCK_PRESETS.map((preset) => {
    const retos = pickMockChallenges(catalogo, stats, preset.difficulties);
    const href = retos
      ? `/practice/mock/session?c=${retos.map((r) => r.slug).join(",")}&s=${randomUUID().slice(0, 12)}`
      : null;
    return { preset, retos, href };
  });

  const CLAVE_DE_FORMATO = {
    short: "mockShort",
    standard: "mockStandard",
    full: "mockFull",
  } as const;

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-2">
          <Link
            href="/practice"
            className="self-start text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← {t("backToCatalog")}
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {t("mockTitle")}
          </h1>
          <p className="max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">{t("mockIntro")}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {formatos.map(({ preset, retos, href }) => (
            <div
              key={preset.id}
              className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
                  {t(CLAVE_DE_FORMATO[preset.id])}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {preset.difficulties.map((d, i) => (
                    <DifficultyBadge key={i} difficulty={d} />
                  ))}
                </div>
              </div>
              {retos ? (
                <ul className="flex flex-col gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                  <li className="flex items-center gap-1.5">
                    <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("mockChallenges", { count: retos.length })}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("cardMinutes", { minutes: mockMinutes(retos) })}
                  </li>
                </ul>
              ) : (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t("mockUnavailable")}</p>
              )}
              {href ? (
                <Link href={href} className={buttonClasses("primary", "mt-auto")}>
                  {t("mockChoose")}
                </Link>
              ) : null}
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400">{t("mockHowPicked")}</p>

        {empty === "1" && (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
            {t("mockCustomEmpty")}
          </p>
        )}
        <MockConfigurator catalog={catalogo} hasStats={stats !== null} />
      </main>
    </div>
  );
}
