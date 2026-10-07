"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, BookOpen, Timer } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { DURACION_MAXIMA, DURACION_MINIMA, clampDuration } from "@/lib/exams/generated";
import { formatRemaining, useExamCountdown } from "@/hooks/useExamCountdown";
import type { ModoDeRendida } from "@/lib/exams/runs";

/** Lo que el servidor ya sabe de una rendida abierta, para ofrecer continuarla. */
export interface RendidaAbierta {
  mode: ModoDeRendida;
  expiresAt: string | null;
  answered: number;
}

interface ExamStartPanelProps {
  examSlug: string;
  totalQuestions: number;
  suggestedDurationMinutes: number;
  /** Las que el examen ofrece como atajo, además del campo numérico. */
  presets: readonly number[];
  openRuns: readonly RendidaAbierta[];
  isSignedIn: boolean;
}

/**
 * La pantalla previa: elegir modo y, en modo examen, cuánto tiempo.
 *
 * No es opcional, por el mismo motivo que `ExamGate` no lo es para los simulacros
 * de los cursos: **el reloj arranca con un clic explícito**. Si el examen empezara
 * al cargar la página, alguien que la abre para ver de qué se trata quemaría la
 * mitad del tiempo sin haber respondido nada.
 *
 * La duración se elige acá y no viene del banco, que es la diferencia con
 * `ExamGate`. El banco solo sugiere.
 *
 * No arranca la rendida: navega a la ruta del modo elegido, llevando la duración
 * en la query. Así la URL dice en qué modo estás, el botón "atrás" del navegador
 * hace lo que uno espera, y el arranque de verdad lo decide el orquestador con su
 * propio clic.
 */
export function ExamStartPanel({
  examSlug,
  totalQuestions,
  suggestedDurationMinutes,
  presets,
  openRuns,
  isSignedIn,
}: ExamStartPanelProps) {
  const t = useTranslations("exams");

  const [minutos, setMinutos] = useState(String(suggestedDurationMinutes));
  const duracion = clampDuration(minutos);

  const examenAbierto = openRuns.find((run) => run.mode === "exam");
  const estudioAbierto = openRuns.find((run) => run.mode === "study");

  /**
   * Cuánto le queda al examen empezado, si hay uno.
   *
   * Se deriva con el hook y no con `Date.now()` durante el render por dos motivos:
   * leer el reloj en el render no es puro, y el servidor renderizaría una hora
   * distinta de la del navegador, con el aviso de hidratación correspondiente. El
   * hook devuelve 0 en el snapshot del servidor y se corrige en el cliente.
   *
   * El desfase va en 0 porque acá todavía no se pidió la hora del servidor, y no
   * hace falta: este número es informativo. El vencimiento que vale es el que ya
   * está escrito en la base, y lo hace cumplir la ruta.
   */
  const { remainingMs } = useExamCountdown(examenAbierto?.expiresAt ?? null, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{t("startTitle")}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("startIntro")}</p>
      </div>

      {!isSignedIn && (
        <div className="flex gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <span>{t("notSaved")}</span>
            <span>{t("notSavedSignIn")}</span>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {/* --- modo examen --- */}
        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-2">
            <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
              <Timer className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              {t("modeExamTitle")}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("modeExamDescription")}</p>
          </div>

          {examenAbierto ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {t("resumeExamRemaining", { time: formatRemaining(remainingMs) })}
              </p>
              <Link href={`/exams/${examSlug}/exam`} className={buttonClasses()}>
                {t("resume")}
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Input
                name="minutes"
                type="number"
                inputMode="numeric"
                min={DURACION_MINIMA}
                max={DURACION_MAXIMA}
                label={t("durationLabel")}
                hint={t("durationHint", {
                  min: DURACION_MINIMA,
                  max: DURACION_MAXIMA,
                  suggested: suggestedDurationMinutes,
                })}
                error={
                  minutos.trim() !== "" && duracion === null
                    ? t("durationInvalid", { min: DURACION_MINIMA, max: DURACION_MAXIMA })
                    : undefined
                }
                value={minutos}
                onChange={(event) => setMinutos(event.target.value)}
              />

              <div className="flex flex-wrap gap-1.5">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMinutos(String(preset))}
                    aria-pressed={duracion === preset}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                      duracion === preset
                        ? "bg-indigo-600 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {t("durationPreset", { minutes: preset })}
                  </button>
                ))}
              </div>

              {duracion === null ? (
                <Button disabled>{t("start")}</Button>
              ) : (
                <Link
                  href={`/exams/${examSlug}/exam?minutes=${duracion}`}
                  className={buttonClasses()}
                >
                  {t("start")}
                </Link>
              )}
            </div>
          )}
        </div>

        {/* --- modo estudio --- */}
        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-2">
            <h3 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
              <BookOpen
                className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                aria-hidden="true"
              />
              {t("modeStudyTitle")}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("modeStudyDescription")}</p>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            {estudioAbierto && (
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {t("resumeStudyProgress", {
                  answered: estudioAbierto.answered,
                  total: totalQuestions,
                })}
              </p>
            )}
            <Link href={`/exams/${examSlug}/study`} className={buttonClasses("outline")}>
              {estudioAbierto ? t("resume") : t("start")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
