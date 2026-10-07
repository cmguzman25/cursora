"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { localize, type ExamQuestionWithTopic, type ExamTopic } from "@content/exams/types";
import type { ExamResult } from "@/lib/exams/grading";
import { Button, buttonClasses } from "@/components/ui/Button";

interface ExamScoreCardProps {
  examSlug: string;
  result: ExamResult;
  topics: readonly ExamTopic[];
  questions: readonly ExamQuestionWithTopic[];
  passingPercent: number;
  autoSubmitted: boolean;
  locale: AppLocale;
  onStartReview: () => void;
}

/**
 * El resultado de un examen de `/exams`.
 *
 * Es un componente nuevo y no `ExamResults` de los cursos, aunque se parezcan,
 * porque ese tiene dos cosas que acá serían mentira: una columna rotulada "peso
 * real" que lee `ExamDomain.weight` —y un examen de esta sección no tiene ninguna
 * ponderación oficial que respetar— y un párrafo que explica que la nota es
 * aproximada porque "el examen real de AWS tiene 15 preguntas que no puntúan".
 * Volver condicionales esas dos cosas serían tres o cuatro props de copy; esto es
 * más corto y no afirma nada falso.
 *
 * La nota **es** el porcentaje de aciertos, por cómo está armada la escala en
 * `toGradableExam`. No hay nada que aproximar ni que disculpar.
 */
export function ExamScoreCard({
  examSlug,
  result,
  topics,
  questions,
  passingPercent,
  autoSubmitted,
  locale,
  onStartReview,
}: ExamScoreCardProps) {
  const t = useTranslations("exams");

  const aprobado = result.passed;
  const colorNota = aprobado
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-red-600 dark:text-red-400";
  const chip = aprobado
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";

  const paraAprobar = Math.ceil(result.rawTotal * (passingPercent / 100));

  // Cuántas preguntas tiene cada tema. Es de dónde sale la columna "parte del
  // examen": no hay un peso declarado, así que lo honesto es contar.
  const porTema = new Map<string, number>();
  for (const pregunta of questions) {
    porTema.set(pregunta.topic, (porTema.get(pregunta.topic) ?? 0) + 1);
  }

  return (
    <div className="flex flex-col gap-6">
      {autoSubmitted && (
        <p className="flex items-center gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          {t("autoSubmittedNotice")}
        </p>
      )}

      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{t("resultsTitle")}</h2>

        <div className="flex flex-wrap items-end gap-3">
          <span className={`text-5xl font-bold tabular-nums ${colorNota}`}>
            {result.scaledScore}
          </span>
          <span className="pb-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            {t("scorePercent")}
          </span>
          <span className={`mb-1.5 rounded-full px-3 py-1 text-xs font-semibold ${chip}`}>
            {aprobado ? t("passed") : t("failed")}
          </span>
        </div>

        <div className="flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
          <span>{t("rawScore", { correct: result.rawCorrect, total: result.rawTotal })}</span>
          <span>
            {t("passMarkNote", {
              percent: passingPercent,
              correct: paraAprobar,
              total: result.rawTotal,
            })}
          </span>
        </div>

        {result.unanswered > 0 && (
          <p className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {t("unansweredNote", { count: result.unanswered })}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
          {t("topicTableTitle")}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[26rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                <th className="py-2 pr-4 font-semibold">{t("topicColName")}</th>
                <th className="py-2 pr-4 font-semibold">{t("topicColScore")}</th>
                <th className="py-2 font-semibold">{t("topicColShare")}</th>
              </tr>
            </thead>
            <tbody>
              {result.domainScores.map((puntaje) => {
                const tema = topics.find((candidato) => candidato.id === puntaje.domainId);
                const porcentaje =
                  puntaje.total > 0 ? Math.round((puntaje.correct / puntaje.total) * 100) : 0;
                const flojo = porcentaje < passingPercent;
                const parte =
                  questions.length > 0
                    ? Math.round(((porTema.get(puntaje.domainId) ?? 0) / questions.length) * 100)
                    : 0;

                return (
                  <tr
                    key={puntaje.domainId}
                    className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                  >
                    <td className="py-2.5 pr-4 text-zinc-800 dark:text-zinc-200">
                      {tema ? localize(tema.name, locale) : puntaje.domainId}
                    </td>
                    <td className="py-2.5 pr-4 tabular-nums">
                      <span
                        className={
                          flojo
                            ? "font-semibold text-red-600 dark:text-red-400"
                            : "font-semibold text-emerald-600 dark:text-emerald-400"
                        }
                      >
                        {puntaje.correct}/{puntaje.total}
                      </span>
                      <span className="ml-2 text-zinc-500 dark:text-zinc-400">
                        ({porcentaje} %)
                      </span>
                    </td>
                    <td className="py-2.5 tabular-nums text-zinc-500 dark:text-zinc-400">
                      {parte} %
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("topicNote")}</p>
      </div>

      {/*
        Dos revisiones distintas, y conviene que los rótulos lo digan: la primera
        recorre **este** intento pregunta por pregunta, sin salir de la pantalla;
        la segunda abre la lista acumulada de lo que falta repasar en este examen,
        que incluye los fallos de todas las rendidas y lo que marcó a mano.
      */}
      <div className="flex flex-wrap gap-3">
        <Button onClick={onStartReview}>{t("reviewAttempt")}</Button>
        <Link href={`/exams/${examSlug}/review`} className={buttonClasses("outline")}>
          {t("goToReview")}
        </Link>
        <Link href={`/exams/${examSlug}`} className={buttonClasses("ghost")}>
          {t("retake")}
        </Link>
      </div>
    </div>
  );
}
