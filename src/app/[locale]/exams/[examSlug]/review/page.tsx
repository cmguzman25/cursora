import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { ExamReviewView } from "@/components/exams/ExamReviewView";
import { EXAM_SLUGS, getExamBank } from "@content/exams/registry";
import { localize } from "@content/exams/types";
import { examQuestions } from "@/lib/exams/generated";
import { leerRepaso } from "@/lib/exams/server-queries";

/**
 * "Lo que tengo que repasar" de un examen.
 *
 * Las falladas se leen acá, en el servidor, porque salen de una tabla y no hacen
 * falta rutas de API para leer. Las marcadas las trae el componente de cliente con
 * su hook, porque en esta misma pantalla se pueden desmarcar y eso tiene que verse
 * al instante.
 */

export function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") return [];

  return routing.locales.flatMap((locale) => EXAM_SLUGS.map((examSlug) => ({ locale, examSlug })));
}

export default async function ExamReviewPage({
  params,
}: {
  params: Promise<{ locale: string; examSlug: string }>;
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
  const preguntas = examQuestions(bank, locale as AppLocale);
  const { wrong, droppedCount } = await leerRepaso(examSlug, preguntas);

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
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {t("reviewTitle")}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {localize(bank.title, locale as AppLocale)}
          </p>
        </div>

        <ExamReviewView
          examSlug={examSlug}
          questions={preguntas}
          wrong={wrong}
          droppedCount={droppedCount}
        />
      </main>
    </div>
  );
}
