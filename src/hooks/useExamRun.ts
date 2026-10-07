"use client";

import { useCallback, useMemo } from "react";
import { useExamAttempt, type ExamAttempt } from "@/hooks/useExamAttempt";
import type { ModoDeRendida } from "@/lib/exams/runs";

interface UseExamRunArgs {
  examSlug: string;
  mode: ModoDeRendida;
  /** Minutos que eligió el alumno. Null en modo estudio: no hay reloj. */
  durationMinutes: number | null;
}

/**
 * Una rendida de un examen de `/exams`.
 *
 * Es una capa fina sobre `useExamAttempt`, que es el que tiene la parte difícil
 * —autoguardado con retardo, volcado forzado al cerrar la pestaña, adopción de la
 * rendida abierta cuando hay dos pestañas, degradación a memoria sin sesión—. Acá
 * solo se le arma la URL y el cuerpo de arranque, y se agrega lo único que los
 * simulacros de los cursos no necesitan: `recordAnswer`, que es cómo el modo
 * estudio alimenta el historial de fallos sin tener nunca una entrega.
 */
export function useExamRun({ examSlug, mode, durationMinutes }: UseExamRunArgs) {
  const base = `/api/exams/${examSlug}/run`;

  const startBody = useMemo(
    () => (mode === "exam" ? { mode, durationMinutes } : { mode }),
    [mode, durationMinutes],
  );

  const attempt = useExamAttempt({
    base,
    // El GET necesita el modo en la query; el POST lo manda en el cuerpo. Son dos
    // sitios porque el GET no tiene cuerpo, no porque haya dos fuentes de verdad.
    query: { mode },
    durationMinutes,
    startBody,
  });

  /**
   * Registra el veredicto de una pregunta en el modo estudio.
   *
   * Manda **solo lo que el alumno marcó**, nunca si acertó: eso lo decide el
   * servidor. Un cliente que informara su propio veredicto podría vaciarse la
   * lista de repaso diciendo que acertó todo.
   *
   * No bloquea la interfaz ni avisa si falla: la explicación ya está en pantalla y
   * el alumno siguió leyendo. Lo que se pierde cuando falla es una línea del
   * historial, y detener el repaso por eso sería peor.
   */
  const recordAnswer = useCallback(
    async (questionId: string, selected: readonly string[]) => {
      if (selected.length === 0) return;

      await fetch(`/api/exams/${examSlug}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, selected: [...selected] }),
      }).catch(() => null);
    },
    [examSlug],
  );

  return { ...attempt, recordAnswer };
}

export type { ExamAttempt };
