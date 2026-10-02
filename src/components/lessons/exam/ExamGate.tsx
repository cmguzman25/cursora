"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, CheckCircle2, Clock, Flag, ListChecks, Timer } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatRemaining, useExamCountdown } from "@/hooks/useExamCountdown";

interface ExamGateProps {
  totalQuestions: number;
  durationMinutes: number;
  passingScore: number;
  scaledMax: number;
  passingCorrect: number;
  /**
   * Vencimiento del intento abierto, o null para empezar uno nuevo. Se recibe
   * sin calcular: el tiempo restante se deriva acá dentro, porque mirar el
   * reloj durante el render del padre no es puro.
   */
  openAttemptExpiresAt: string | null;
  skewMs: number;
  isPersisted: boolean;
  isSignedIn: boolean;
  isStarting: boolean;
  error: string | null;
  onStart: () => void;
}

/**
 * La pantalla previa al examen.
 *
 * No es opcional: sin ella el reloj arrancaría al cargar la página, y alguien
 * que abre la lección para ver de qué se trata quemaría los 90 minutos sin
 * haber respondido nada. El cronómetro empieza con un clic explícito.
 */
export function ExamGate({
  totalQuestions,
  durationMinutes,
  passingScore,
  scaledMax,
  passingCorrect,
  openAttemptExpiresAt,
  skewMs,
  isPersisted,
  isSignedIn,
  isStarting,
  error,
  onStart,
}: ExamGateProps) {
  const t = useTranslations("lesson.exam");
  const { remainingMs } = useExamCountdown(openAttemptExpiresAt, skewMs);
  const continuando = openAttemptExpiresAt !== null;

  const datos = [
    { icon: ListChecks, texto: t("gateFactQuestions", { count: totalQuestions }) },
    { icon: Timer, texto: t("gateFactDuration", { minutes: durationMinutes }) },
    {
      icon: CheckCircle2,
      texto: t("gateFactPassMark", {
        score: passingScore,
        max: scaledMax,
        correct: passingCorrect,
      }),
    },
    { icon: Flag, texto: t("gateFactFlagging") },
    { icon: Clock, texto: t("gateFactAutoSubmit") },
  ];

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{t("gateTitle")}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("gateIntro")}</p>
      </div>

      <ul className="flex flex-col gap-2">
        {datos.map(({ icon: Icono, texto }) => (
          <li key={texto} className="flex items-center gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
            <Icono className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            {texto}
          </li>
        ))}
      </ul>

      {!isPersisted && (
        <div className="flex gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <span>{t("gateNotSaved")}</span>
            {!isSignedIn && <span>{t("gateNotSavedSignIn")}</span>}
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {t("startFailed")}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={onStart} isLoading={isStarting}>
          {continuando ? t("resume") : t("start")}
        </Button>
        {continuando && (
          <span className="text-sm text-zinc-600 tabular-nums dark:text-zinc-400">
            {t("resumeRemaining", { time: formatRemaining(remainingMs) })}
          </span>
        )}
      </div>
    </div>
  );
}
