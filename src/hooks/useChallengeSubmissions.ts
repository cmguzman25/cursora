"use client";

import { useCallback, useEffect, useState } from "react";
import type { SubmissionMode, SubmissionSummary } from "@/lib/practice/submissions";

export interface NewSubmission {
  code: string;
  passedCases: number;
  totalCases: number;
  mode: SubmissionMode;
  durationSeconds?: number;
  sessionId?: string;
}

export type SaveStatus = "idle" | "saving" | "saved" | "failed";

interface State {
  submissions: SubmissionSummary[];
  attempts: number;
  solved: number;
  /** false = no se pudo leer (sin sesión o sin la migración): la UI no muestra historial. */
  persisted: boolean;
  loaded: boolean;
}

/**
 * Historial y contadores de entregas de un reto, más la función para registrar
 * una. Al guardar, actualiza el estado local con la fila que devolvió el
 * servidor en vez de volver a pedir todo.
 */
export function useChallengeSubmissions(slug: string, historyLimit: number) {
  const [state, setState] = useState<State>({
    submissions: [],
    attempts: 0,
    solved: 0,
    persisted: false,
    loaded: false,
  });
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    let cancelado = false;
    fetch(`/api/practice/${slug}/submissions`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelado) return;
        setState(
          data
            ? {
                submissions: data.submissions,
                attempts: data.attempts,
                solved: data.solved,
                persisted: data.persisted,
                loaded: true,
              }
            : (s) => ({ ...s, loaded: true }),
        );
      })
      .catch(() => {
        if (!cancelado) setState((s) => ({ ...s, loaded: true }));
      });
    return () => {
      cancelado = true;
    };
  }, [slug]);

  const save = useCallback(
    async (entrega: NewSubmission) => {
      setSaveStatus("saving");
      try {
        const r = await fetch(`/api/practice/${slug}/submissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entrega),
        });
        if (!r.ok) throw new Error(String(r.status));
        const { submission } = (await r.json()) as { submission: SubmissionSummary };
        setState((s) => ({
          ...s,
          persisted: true,
          submissions: [submission, ...s.submissions].slice(0, historyLimit),
          attempts: s.attempts + 1,
          solved: s.solved + (submission.passed ? 1 : 0),
        }));
        setSaveStatus("saved");
      } catch {
        setSaveStatus("failed");
      }
    },
    [slug, historyLimit],
  );

  return { ...state, save, saveStatus };
}
