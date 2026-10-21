import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Flag, ListChecks, Timer } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { ExamThemeScope } from "@/components/exams/theme/ExamThemeScope";
import { ExamCard } from "@/components/exams/ExamCard";
import { EXAM_GROUP_SLUGS, getExamGroup, listExamSummariesInGroup } from "@content/exams/registry";
import { localize } from "@content/exams/types";
import { contarPendientesPorExamen } from "@/lib/exams/server-queries";

/**
 * La página de un grupo: las pruebas de una certificación o de un tema.
 *
 * Vive bajo el segmento estático `groups` y no en `/exams/<slug>` por una razón que
 * conviene no perder: las pruebas ya tienen esa ruta, y su slug es el que quedó
 * guardado en cada rendida. Mover una prueba a `/exams/<grupo>/<slug>` para que la
 * jerarquía de URLs fuera más linda rompería los enlaces que el alumno guardó, sin
 * ganar nada que el alumno note. Así, entrar a un grupo no le cambia la dirección a
 * ninguna prueba.
 *
 * El grupo no se rinde: no hay botón de empezar acá. Lo único que agrega sobre la
 * portada es el orden de sus pruebas y lo que suman.
 */

// Igual que en el resto de la sección: en dev devuelve `[]` por la inestabilidad de
// los parámetros de ruta con Turbopack.
export function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") return [];

  return routing.locales.flatMap((locale) =>
    EXAM_GROUP_SLUGS.map((groupSlug) => ({ locale, groupSlug })),
  );
}

export default async function ExamGroupPage({
  params,
}: {
  params: Promise<{ locale: string; groupSlug: string }>;
}) {
  const { locale, groupSlug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const grupo = getExamGroup(groupSlug);
  if (!grupo) {
    notFound();
  }

  const tema = grupo.theme ?? null;

  const t = await getTranslations("exams");
  const pruebas = listExamSummariesInGroup(groupSlug);
  const pendientes = await contarPendientesPorExamen();

  const totalPreguntas = pruebas.reduce((suma, prueba) => suma + prueba.questionCount, 0);
  const totalMinutos = pruebas.reduce((suma, prueba) => suma + prueba.suggestedDurationMinutes, 0);
  const totalPendiente = pendientes
    ? grupo.examSlugs.reduce((suma, slug) => suma + (pendientes[slug] ?? 0), 0)
    : 0;

  return (
    <ExamThemeScope
      theme={tema}
      className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950"
    >
      <AppHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-3">
          <Link
            href="/exams"
            className="self-start text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← {t("backToExams")}
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {localize(grupo.title, locale)}
          </h1>
          <p className="max-w-2xl text-sm text-zinc-500 dark:text-zinc-400">
            {localize(grupo.description, locale)}
          </p>

          {pruebas.length > 0 && (
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
              <li className="flex items-center gap-1.5">
                <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
                {t("cardQuestions", { count: totalPreguntas })}
              </li>
              <li className="flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                {t("cardSuggested", { minutes: totalMinutos })}
              </li>
              {/*
                El pendiente del grupo solo se muestra cuando se pudo averiguar:
                `null` es "no lo sabemos" —sin sesión, o sin la migración corrida—, y
                un cero en ese caso sería una afirmación falsa.
              */}
              {pendientes !== null && totalPendiente > 0 && (
                <li className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                  <Flag className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("cardPendingReview", { count: totalPendiente })}
                </li>
              )}
            </ul>
          )}
        </div>

        {pruebas.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("groupEmpty")}</p>
        ) : (
          <div className="flex flex-col gap-4">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
              {t("groupExamsTitle")}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pruebas.map((prueba) => (
                <ExamCard
                  key={prueba.slug}
                  exam={prueba}
                  locale={locale}
                  pendingReview={pendientes ? (pendientes[prueba.slug] ?? 0) : null}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </ExamThemeScope>
  );
}
