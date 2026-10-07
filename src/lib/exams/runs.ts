/**
 * La fila de `exam_runs` y cómo se le presenta al cliente.
 *
 * Vive en `src/lib/` y no dentro de la ruta porque las rutas de Next solo pueden
 * exportar sus handlers, y tanto `run/route.ts` como `run/submit/route.ts`
 * necesitan leer la misma fila y devolverla con la misma forma. Dos conversiones
 * para la misma tabla terminan discrepando en algún campo.
 */

export const TABLA_RENDIDAS = "exam_runs";

export const COLUMNAS_RENDIDA =
  "id, mode, duration_minutes, started_at, expires_at, submitted_at, auto_submitted, answers, cursor, raw_correct, raw_total, scaled_score, passed, domain_scores, bank_version";

export type ModoDeRendida = "exam" | "study";

export interface FilaRendida {
  id: string;
  mode: ModoDeRendida;
  duration_minutes: number | null;
  started_at: string;
  expires_at: string | null;
  submitted_at: string | null;
  auto_submitted: boolean;
  answers: Record<string, string[]> | null;
  cursor: number;
  raw_correct: number | null;
  raw_total: number | null;
  scaled_score: number | null;
  passed: boolean | null;
  domain_scores: unknown;
  bank_version: number;
}

export function modoValido(raw: unknown): ModoDeRendida | null {
  return raw === "exam" || raw === "study" ? raw : null;
}

export function comoRespuesta(fila: FilaRendida) {
  const answers = fila.answers ?? {};

  return {
    id: fila.id,
    mode: fila.mode,
    durationMinutes: fila.duration_minutes,
    startedAt: fila.started_at,
    expiresAt: fila.expires_at,
    submittedAt: fila.submitted_at,
    autoSubmitted: fila.auto_submitted,
    answers,
    /**
     * Siempre vacío. El hook de la rendida comparte su forma con el del simulacro
     * de los cursos, que sí guarda las marcas en el intento; acá las marcas viven
     * en `exam_review_flags` y las trae su propio hook, porque tienen que
     * sobrevivir a la rendida.
     */
    flagged: [] as string[],
    cursor: fila.cursor,
    bankVersion: fila.bank_version,
    result:
      fila.submitted_at && fila.scaled_score !== null
        ? {
            rawCorrect: fila.raw_correct ?? 0,
            rawTotal: fila.raw_total ?? 0,
            scaledScore: fila.scaled_score,
            passed: fila.passed ?? false,
            domainScores: fila.domain_scores ?? [],
            unanswered: Math.max(0, (fila.raw_total ?? 0) - Object.keys(answers).length),
          }
        : null,
  };
}
