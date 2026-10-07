import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { ExamStartPanel } from "@/components/exams/ExamStartPanel";
import { buttonClasses } from "@/components/ui/Button";
import { EXAM_SLUGS, getExamBank } from "@content/exams/registry";
import { localize } from "@content/exams/types";
import { examQuestions, DURACION_MAXIMA, DURACION_MINIMA } from "@/lib/exams/generated";
import { leerRendidasAbiertas } from "@/lib/exams/server-queries";
import { createClient } from "@/lib/supabase/server";

/**
 * La pantalla previa de un examen: qué evalúa, y con qué modalidad rendirlo.
 *
 * Es el único lugar desde el que se empieza un examen, y por eso no arranca nada:
 * los dos modos son rutas propias (`./exam` y `./study`), a las que se llega con un
 * clic explícito. Que el reloj no pueda arrancar por abrir una página es la misma
 * regla que sostiene `ExamGate` en los cursos.
 */

// Igual que en las rutas de cursos: en dev devuelve `[]` por la inestabilidad de
// los parámetros de ruta con Turbopack.
export function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") return [];

  return routing.locales.flatMap((locale) => EXAM_SLUGS.map((examSlug) => ({ locale, examSlug })));
}

/** Atajos de duración que se le ofrecen al alumno, además del campo numérico. */
function presetsDeDuracion(sugerida: number): number[] {
  const candidatos = [sugerida, 15, 30, 45, 60, 90];
  return [...new Set(candidatos)]
    .filter((minutos) => minutos >= DURACION_MINIMA && minutos <= DURACION_MAXIMA)
    .sort((a, b) => a - b);
}

export default async function ExamStartPage({
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

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const abiertas = await leerRendidasAbiertas(examSlug);

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-3">
          <Link
            href="/exams"
            className="self-start text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← {t("backToExams")}
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {localize(bank.title, locale as AppLocale)}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {localize(bank.description, locale as AppLocale)}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            {t("topicsTitle")}
          </h2>
          <ul className="flex flex-col gap-1.5 text-sm text-zinc-700 dark:text-zinc-300">
            {bank.topics.map((tema) => {
              const cuantas = preguntas.filter((pregunta) => pregunta.topic === tema.id).length;
              return (
                <li key={tema.id} className="flex flex-wrap items-baseline gap-2">
                  <span>{localize(tema.name, locale as AppLocale)}</span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {t("cardQuestions", { count: cuantas })}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <ExamStartPanel
          examSlug={examSlug}
          totalQuestions={preguntas.length}
          suggestedDurationMinutes={bank.suggestedDurationMinutes}
          presets={presetsDeDuracion(bank.suggestedDurationMinutes)}
          openRuns={abiertas}
          isSignedIn={Boolean(user)}
        />

        <Link href={`/exams/${examSlug}/review`} className={buttonClasses("ghost", "self-start")}>
          {t("goToReview")}
        </Link>
      </main>
    </div>
  );
}
