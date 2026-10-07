"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";

export type EstadoCelda = "answered" | "unanswered" | "correct" | "incorrect";

export interface Celda {
  index: number;
  estado: EstadoCelda;
  marcada: boolean;
}

/**
 * Clave de i18n con el nombre del estado, para el rótulo accesible. `as const`
 * y no `Record<EstadoCelda, string>`: next-intl valida las claves de mensaje
 * en tiempo de compilación, y con `string` pierde el tipo literal que necesita.
 */
const CLAVE_DE_ESTADO = {
  answered: "stateAnswered",
  unanswered: "stateUnanswered",
  correct: "stateCorrect",
  incorrect: "stateIncorrect",
} as const satisfies Record<EstadoCelda, string>;

const CLASES: Record<EstadoCelda, string> = {
  answered:
    "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-500/10 dark:text-indigo-300",
  unanswered:
    "border-zinc-200 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400",
  correct:
    "border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-500/60 dark:bg-emerald-500/10 dark:text-emerald-400",
  incorrect:
    "border-red-500 bg-red-50 text-red-700 dark:border-red-500/60 dark:bg-red-500/10 dark:text-red-400",
};

interface ExamQuestionGridProps {
  celdas: readonly Celda[];
  actual: number;
  onJump: (index: number) => void;
}

/**
 * Las preguntas de un examen como una grilla, para saltar a cualquiera.
 *
 * Usa un único punto de tabulación con navegación por flechas en vez de 65
 * botones tabulables: una grilla de este tamaño con un tab stop por celda
 * vuelve el teclado inutilizable para llegar a lo que viene después.
 */
export function ExamQuestionGrid({ celdas, actual, onJump }: ExamQuestionGridProps) {
  // Namespace `exam` y no `lesson.exam`: esta grilla la usan también los
  // exámenes de `/exams`, que no son lecciones de ningún curso.
  const t = useTranslations("exam");
  const contenedorRef = useRef<HTMLDivElement>(null);

  const mover = (desde: number, delta: number) => {
    const destino = Math.min(celdas.length - 1, Math.max(0, desde + delta));
    if (destino === desde) return;
    onJump(celdas[destino].index);
    const botones = contenedorRef.current?.querySelectorAll<HTMLButtonElement>("button");
    botones?.[destino]?.focus();
  };

  const posicionActual = Math.max(
    0,
    celdas.findIndex((celda) => celda.index === actual),
  );

  return (
    <div
      ref={contenedorRef}
      role="group"
      aria-label={t("gridLabel")}
      className="grid grid-cols-[repeat(auto-fill,minmax(2.25rem,1fr))] gap-1.5"
      onKeyDown={(event) => {
        const columnas = 10;
        const movimientos: Record<string, number> = {
          ArrowRight: 1,
          ArrowLeft: -1,
          ArrowDown: columnas,
          ArrowUp: -columnas,
        };
        const delta = movimientos[event.key];
        if (delta === undefined) return;
        event.preventDefault();
        mover(posicionActual, delta);
      }}
    >
      {celdas.map((celda, posicion) => {
        const esActual = celda.index === actual;
        const estados = [t(CLAVE_DE_ESTADO[celda.estado])];
        if (celda.marcada) estados.push(t("stateFlagged"));

        return (
          <button
            key={celda.index}
            type="button"
            tabIndex={posicion === posicionActual ? 0 : -1}
            onClick={() => onJump(celda.index)}
            aria-current={esActual ? "true" : undefined}
            aria-label={t("gridCellLabel", { number: celda.index + 1, state: estados.join(", ") })}
            className={`relative h-9 rounded-lg border text-xs font-semibold tabular-nums transition-colors ${
              CLASES[celda.estado]
            } ${esActual ? "ring-2 ring-indigo-500 ring-offset-1 dark:ring-offset-zinc-950" : ""}`}
          >
            {celda.index + 1}
            {celda.marcada && (
              <span
                aria-hidden="true"
                className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-amber-500"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
