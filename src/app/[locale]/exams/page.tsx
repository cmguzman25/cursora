import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Flag } from "lucide-react";
import { routing } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { ExamCard } from "@/components/exams/ExamCard";
import { listExamSummaries } from "@content/exams/registry";
import { contarPendientesPorExamen } from "@/lib/exams/server-queries";

/**
 * El catálogo de exámenes: la portada de la sección.
 *
 * No lleva `generateStaticParams`: el `[locale]/layout.tsx` ya provee los
 * parámetros de idioma, y de todas formas la página lee la sesión para contar lo
 * que falta repasar, así que se renderiza por petición.
 */
export default async function ExamsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = await getTranslations("exams");
  const examenes = listExamSummaries();
  const pendientes = await contarPendientesPorExamen();

  const totalPendiente = pendientes
    ? Object.values(pendientes).reduce((suma, cantidad) => suma + cantidad, 0)
    : 0;

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

        {/*
          El total pendiente solo se muestra cuando se pudo averiguar: `null` es
          "no lo sabemos" —sin sesión, o sin la migración corrida— y un cero en ese
          caso sería una afirmación falsa.
        */}
        {pendientes !== null && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <Flag
              className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-0.5">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
                {t("pendingTitle")}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {totalPendiente > 0 ? t("pendingAll", { count: totalPendiente }) : t("pendingNone")}
              </p>
            </div>
          </div>
        )}

        {examenes.length === 0 ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("empty")}</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {examenes.map((examen) => (
              <ExamCard
                key={examen.slug}
                exam={examen}
                locale={locale}
                pendingReview={pendientes ? (pendientes[examen.slug] ?? 0) : null}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
