import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { StudyRun } from "@/components/exams/StudyRun";
import { EXAM_SLUGS, getExamBank } from "@content/exams/registry";
import { localize } from "@content/exams/types";
import { examQuestions } from "@/lib/exams/generated";

/**
 * El modo estudio: sin reloj, revelando al marcar.
 *
 * Es una ruta propia y no un parámetro del modo examen, para que la URL diga en qué
 * está el alumno y para que cada orquestador sea un componente simple en vez de uno
 * con un `mode` y una rama en cada decisión.
 */

export function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") return [];

  return routing.locales.flatMap((locale) => EXAM_SLUGS.map((examSlug) => ({ locale, examSlug })));
}

export default async function StudyPage({
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
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("modeStudyTitle")}</p>
        </div>

        <StudyRun examSlug={examSlug} questions={preguntas} />
      </main>
    </div>
  );
}
