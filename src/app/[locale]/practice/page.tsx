import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Timer } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { ChallengeCard } from "@/components/practice/ChallengeCard";
import { CLAVE_DE_DIFICULTAD, NOMBRE_DE_LENGUAJE } from "@/components/practice/DifficultyBadge";
import { getChallengeSummaries } from "@content/challenges/registry";
import { getChallengeStats } from "@/lib/practice/submissions";
import {
  CHALLENGE_DIFFICULTIES,
  type ChallengeDifficulty,
  type ChallengeLanguage,
} from "@content/challenges/types";

/**
 * El catálogo de retos de código, filtrable por dificultad y lenguaje.
 *
 * Los filtros van en la URL (`?difficulty=basic&language=postgres&sort=difficulty`)
 * y son enlaces, no estado de cliente: la página sigue siendo de servidor, el
 * filtro se puede compartir y el botón "atrás" lo deshace.
 *
 * Por defecto ordena por **menos veces resuelto** (solo cuentan las entregas con
 * todos los casos en verde), para que lo próximo a practicar quede arriba. Si no
 * se pudieron leer las entregas, cae al orden por dificultad.
 */

type Orden = "least-solved" | "difficulty";
export default async function PracticePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ difficulty?: string; language?: string; sort?: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("practice");
  const { difficulty, language, sort } = await searchParams;

  const todos = getChallengeSummaries();
  const stats = await getChallengeStats();
  const orden: Orden = sort === "difficulty" || !stats ? "difficulty" : "least-solved";
  const resueltas = (slug: string) => stats?.[slug]?.solved ?? 0;
  const porDificultad = (a: { difficulty: ChallengeDifficulty }, b: { difficulty: ChallengeDifficulty }) =>
    CHALLENGE_DIFFICULTIES.indexOf(a.difficulty) - CHALLENGE_DIFFICULTIES.indexOf(b.difficulty);
  const lenguajes = [...new Set(todos.map((c) => c.language))];

  const dificultadActiva = CHALLENGE_DIFFICULTIES.includes(difficulty as ChallengeDifficulty)
    ? (difficulty as ChallengeDifficulty)
    : null;
  const lenguajeActivo = lenguajes.includes(language as ChallengeLanguage)
    ? (language as ChallengeLanguage)
    : null;

  const retos = todos
    .filter((c) => !dificultadActiva || c.difficulty === dificultadActiva)
    .filter((c) => !lenguajeActivo || c.language === lenguajeActivo)
    .sort((a, b) =>
      orden === "least-solved"
        ? resueltas(a.slug) - resueltas(b.slug) || porDificultad(a, b)
        : porDificultad(a, b),
    );

  const href = (cambio: {
    difficulty?: string | null;
    language?: string | null;
    sort?: Orden;
  }) => {
    const q = new URLSearchParams();
    const d = cambio.difficulty !== undefined ? cambio.difficulty : dificultadActiva;
    const l = cambio.language !== undefined ? cambio.language : lenguajeActivo;
    const o = cambio.sort ?? orden;
    if (d) q.set("difficulty", d);
    if (l) q.set("language", l);
    // El orden por defecto no va en la URL.
    if (o !== "least-solved") q.set("sort", o);
    const s = q.toString();
    return s ? `/practice?${s}` : "/practice";
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {t("title")}
          </h1>
          <p className="max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">{t("intro")}</p>
        </div>

        <Link
          href="/practice/mock"
          className="flex flex-wrap items-center gap-4 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-violet-50 p-5 transition-colors hover:border-indigo-400 dark:border-indigo-500/30 dark:from-indigo-500/10 dark:to-violet-500/10"
        >
          <Timer className="h-6 w-6 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-sm font-semibold text-indigo-950 dark:text-indigo-100">
              {t("mockCtaTitle")}
            </span>
            <span className="text-sm text-indigo-900/80 dark:text-indigo-200/80">{t("mockCtaText")}</span>
          </div>
          <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">{t("mockCtaGo")} →</span>
        </Link>

        {todos.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("empty")}</p>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <FilterRow
                label={t("filterDifficulty")}
                options={[
                  { label: t("filterAll"), href: href({ difficulty: null }), active: !dificultadActiva },
                  ...CHALLENGE_DIFFICULTIES.map((d) => ({
                    label: t(CLAVE_DE_DIFICULTAD[d]),
                    href: href({ difficulty: d }),
                    active: dificultadActiva === d,
                  })),
                ]}
              />
              <FilterRow
                label={t("filterLanguage")}
                options={[
                  { label: t("filterAll"), href: href({ language: null }), active: !lenguajeActivo },
                  ...lenguajes.map((l) => ({
                    label: NOMBRE_DE_LENGUAJE[l],
                    href: href({ language: l }),
                    active: lenguajeActivo === l,
                  })),
                ]}
              />
              {stats && (
                <FilterRow
                  label={t("sortLabel")}
                  options={[
                    {
                      label: t("sortLeastSolved"),
                      href: href({ sort: "least-solved" }),
                      active: orden === "least-solved",
                    },
                    {
                      label: t("sortDifficulty"),
                      href: href({ sort: "difficulty" }),
                      active: orden === "difficulty",
                    },
                  ]}
                />
              )}
            </div>

            {retos.length === 0 ? (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("noResults")}</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {retos.map((reto) => (
                  <ChallengeCard
                    key={reto.slug}
                    challenge={reto}
                    locale={locale}
                    stats={stats ? (stats[reto.slug] ?? { attempts: 0, solved: 0 }) : null}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function FilterRow({
  label,
  options,
}: {
  label: string;
  options: { label: string; href: string; active: boolean }[];
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-24 text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
      {options.map((o) => (
        <Link
          key={o.href + o.label}
          href={o.href}
          aria-current={o.active ? "true" : undefined}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            o.active
              ? "bg-indigo-600 text-white"
              : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800 dark:hover:bg-zinc-800"
          }`}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}
