"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, Clock, Info } from "lucide-react";
import { localize, type PracticeExamBank } from "@content/courses/types";
import type { AppLocale } from "@/i18n/routing";
import type { ExamResult } from "@/lib/exams/grading";
import { Button } from "@/components/ui/Button";

interface ExamResultsProps {
  bank: PracticeExamBank;
  result: ExamResult;
  autoSubmitted: boolean;
  locale: AppLocale;
  onStartReview: () => void;
  onRetake: () => void;
  canRetake: boolean;
}

export function ExamResults({
  bank,
  result,
  autoSubmitted,
  locale,
  onStartReview,
  onRetake,
  canRetake,
}: ExamResultsProps) {
  const t = useTranslations("lesson.exam");

  const aprobado = result.passed;
  const colorNota = aprobado
    ? "text-emerald-600 dark:text-emerald-400"
    : "text-red-600 dark:text-red-400";
  const chip = aprobado
    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400";

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
            {t("scaledScoreOutOf", { max: bank.scaledMax })}
          </span>
          <span className={`mb-1.5 rounded-full px-3 py-1 text-xs font-semibold ${chip}`}>
            {aprobado ? t("passed") : t("failed")}
          </span>
        </div>

        <div className="flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
          <span>{t("rawScore", { correct: result.rawCorrect, total: result.rawTotal })}</span>
          <span>{t("passMarkNote", { score: bank.passingScore, max: bank.scaledMax })}</span>
        </div>

        {result.unanswered > 0 && (
          <p className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {t("unansweredNote", { count: result.unanswered })}
          </p>
        )}

        {/*
          El aviso de que la nota es una aproximación va en el cuerpo y no en un
          globo de ayuda: es la pantalla donde el alumno más confía en el
          número, y prometerle precisión que no tenemos sería mentirle.
        */}
        <p className="flex items-start gap-2.5 rounded-xl bg-zinc-100 p-3 text-sm text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-400">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {t("approximationNote")}
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">{t("domainTitle")}</h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[26rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                <th className="py-2 pr-4 font-semibold">{t("domainColName")}</th>
                <th className="py-2 pr-4 font-semibold">{t("domainColScore")}</th>
                <th className="py-2 font-semibold">{t("domainColWeight")}</th>
              </tr>
            </thead>
            <tbody>
              {result.domainScores.map((puntaje) => {
                const dominio = bank.domains.find((d) => d.id === puntaje.domainId);
                const porcentaje =
                  puntaje.total > 0 ? Math.round((puntaje.correct / puntaje.total) * 100) : 0;
                const flojo = porcentaje < bank.passingRawFraction * 100;

                return (
                  <tr
                    key={puntaje.domainId}
                    className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                  >
                    <td className="py-2.5 pr-4 text-zinc-800 dark:text-zinc-200">
                      {dominio ? localize(dominio.name, locale) : puntaje.domainId}
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
                      <span className="ml-2 text-zinc-500 dark:text-zinc-400">({porcentaje} %)</span>
                    </td>
                    <td className="py-2.5 tabular-nums text-zinc-500 dark:text-zinc-400">
                      {Math.round((dominio?.weight ?? 0) * 100)} %
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("domainNote")}</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-3">
          <Button onClick={onStartReview}>{t("startReview")}</Button>
          {canRetake && (
            <Button variant="outline" onClick={onRetake}>
              {t("retake")}
            </Button>
          )}
        </div>
        {canRetake && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("retakeHint")}</p>
        )}
      </div>
    </div>
  );
}
