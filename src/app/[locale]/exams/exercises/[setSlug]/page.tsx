import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PencilLine } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { ExamThemeScope } from "@/components/exams/theme/ExamThemeScope";
import { ExerciseCard } from "@/components/exams/ExerciseCard";
import { EXAM_GROUPS } from "@content/exams/groups";
import { localize } from "@content/exams/types";
import { EXERCISE_SET_SLUGS, getExerciseSet } from "@content/exercises/registry";

/**
 * Una lista de ejercicios prácticos: los ejercicios del libro, capítulo por
 * capítulo, cada uno con su botón "Resolver".
 *
 * Vive bajo el segmento estático `exercises` (ver `SEGMENTO_DE_EJERCICIOS` en
 * `content/exams/groups.ts`) por el mismo motivo que los grupos: `/exams/<slug>`
 * es de las pruebas.
 */

// Igual que en el resto de la sección: en dev devuelve `[]` por la inestabilidad de
// los parámetros de ruta con Turbopack.
export function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") return [];

  return routing.locales.flatMap((locale) =>
    EXERCISE_SET_SLUGS.map((setSlug) => ({ locale, setSlug })),
  );
}

export default async function ExerciseSetPage({
  params,
}: {
  params: Promise<{ locale: string; setSlug: string }>;
}) {
  const { locale, setSlug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const lista = getExerciseSet(setSlug);
  if (!lista) {
    notFound();
  }

  const grupo = EXAM_GROUPS.find((g) => g.exerciseSetSlugs?.includes(setSlug)) ?? null;
  const t = await getTranslations("exams");

  return (
    <ExamThemeScope
      theme={grupo?.theme ?? null}
      className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950"
    >
      <AppHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-3">
          <Link
            href={grupo ? `/exams/groups/${grupo.slug}` : "/exams"}
            className="self-start text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← {grupo ? localize(grupo.title, locale) : t("backToExams")}
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {localize(lista.title, locale)}
          </h1>
          <p className="flex gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
            <PencilLine className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {t("exercisesIntro")}
          </p>

          <nav aria-label={t("exercisesSectionsNav")} className="flex flex-wrap gap-2">
            {lista.sections.map((seccion) => (
              <a
                key={seccion.id}
                href={`#${seccion.id}`}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-emerald-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              >
                {seccion.source.split(" · ")[0]}: {seccion.title}
              </a>
            ))}
          </nav>
        </div>

        {lista.sections.map((seccion) => {
          const ejercicios = lista.exercises.filter((e) => e.section === seccion.id);

          return (
            <section key={seccion.id} id={seccion.id} className="flex scroll-mt-24 flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  {seccion.source}
                </span>
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">{seccion.title}</h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {t("cardExercises", { count: ejercicios.length })}
                </p>
              </div>
              {ejercicios.map((ejercicio) => (
                <ExerciseCard key={ejercicio.id} exercise={ejercicio} />
              ))}
            </section>
          );
        })}
      </main>
    </ExamThemeScope>
  );
}
