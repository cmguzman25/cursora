import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { TimedExamRun } from "@/components/exams/TimedExamRun";
import { EXAM_SLUGS, getExamBank } from "@content/exams/registry";
import { localize } from "@content/exams/types";
import { clampDuration, examQuestions } from "@/lib/exams/generated";

/**
 * El modo examen: cronometrado.
 *
 * `?minutes=` es lo que distingue "vengo a rendir" de "vengo a ver en qué quedé".
 * Se acota acá con la misma función que usa la ruta de la API, para que el campo de
 * la pantalla previa y el servidor no puedan discrepar en qué duración es válida.
 */

export function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") return [];

  return routing.locales.flatMap((locale) => EXAM_SLUGS.map((examSlug) => ({ locale, examSlug })));
}

export default async function TimedExamPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; examSlug: string }>;
  searchParams: Promise<{ minutes?: string }>;
}) {
  const { locale, examSlug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const bank = getExamBank(examSlug);
  if (!bank) {
    notFound();
  }

  const t = await getTranslations("exams");
  const { minutes } = await searchParams;

  // Solo las preguntas del idioma que se está leyendo, no el mapa entero de
  // traducciones: un banco trilingüe triplicaría el payload que viaja al
  // navegador, y acá no hay selector de idioma que las necesite todas.
  const preguntas = examQuestions(bank, locale as AppLocale);

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-6 py-10">
        <div className="flex flex-col gap-2">
          <Link
            href={`/exams/${examSlug}`}
            className="self-start text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← {t("backToExam")}
          </Link>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {localize(bank.title, locale as AppLocale)}
          </h1>
        </div>

        <TimedExamRun
          examSlug={examSlug}
          questions={preguntas}
          topics={bank.topics}
          passingPercent={bank.passingPercent}
          requestedMinutes={clampDuration(minutes)}
          locale={locale as AppLocale}
        />
      </main>
    </div>
  );
}
