import { createClient } from "@/lib/supabase/server";
import { tablaFaltante } from "@/lib/exams/persistence";

/**
 * Lectura y validación de las entregas de `/practice` (tabla
 * `challenge_submissions`, ver 0007). Solo servidor.
 */

export const TABLA_ENTREGAS = "challenge_submissions";

/** Cuántas entregas trae el historial de un reto. */
export const LIMITE_HISTORIAL = 10;

export const MAX_CODIGO = 20000;

export interface ChallengeStats {
  /** Entregas totales (Enviar), correctas o no. */
  attempts: number;
  /** Entregas con todos los casos en verde. */
  solved: number;
}

export type SubmissionMode = "practice" | "interview";

export interface SubmissionSummary {
  id: string;
  code: string;
  passed: boolean;
  passedCases: number;
  totalCases: number;
  createdAt: string;
  mode: SubmissionMode;
  /** Solo en modo entrevista: segundos desde que arrancó el reloj. */
  durationSeconds: number | null;
}

/** Las columnas que se piden para armar un `SubmissionSummary`. */
export const COLUMNAS_ENTREGA =
  "id, code, passed, passed_cases, total_cases, created_at, mode, duration_seconds";

export function aResumen(fila: Record<string, unknown>): SubmissionSummary {
  return {
    id: fila.id as string,
    code: fila.code as string,
    passed: fila.passed as boolean,
    passedCases: fila.passed_cases as number,
    totalCases: fila.total_cases as number,
    createdAt: fila.created_at as string,
    mode: fila.mode === "interview" ? "interview" : "practice",
    durationSeconds: (fila.duration_seconds as number | null) ?? null,
  };
}

/**
 * Las estadísticas de todos los retos del usuario, por slug.
 *
 * `null` es "no lo sabemos" (sin sesión, o sin la migración corrida), y la UI lo
 * distingue de "cero": un "sin intentar" en ese caso sería una afirmación falsa.
 * Mismo criterio que `contarPendientesPorExamen`.
 *
 * Trae solo dos columnas y agrega en memoria: son las entregas de una persona,
 * y PostgREST no agrupa sin una vista o una función.
 */
export async function getChallengeStats(): Promise<Record<string, ChallengeStats> | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from(TABLA_ENTREGAS)
    .select("challenge_slug, passed")
    .eq("user_id", user.id);

  if (error) return null;

  const stats: Record<string, ChallengeStats> = {};
  for (const fila of data ?? []) {
    const actual = (stats[fila.challenge_slug as string] ??= { attempts: 0, solved: 0 });
    actual.attempts++;
    if (fila.passed) actual.solved++;
  }
  return stats;
}

export function esTablaFaltante(error: { code?: string; message?: string } | null): boolean {
  return tablaFaltante(error, TABLA_ENTREGAS);
}

export interface EntregaValida {
  code: string;
  passedCases: number;
  totalCases: number;
  mode: SubmissionMode;
  durationSeconds: number | null;
  sessionId: string | null;
}

const SESION_VALIDA = /^[A-Za-z0-9_-]{1,64}$/;

/**
 * Valida el cuerpo de un POST de entrega. Devuelve null si algo no cuadra.
 *
 * `totalCases` tiene que ser el total del reto: una entrega con menos casos
 * sería un "Ejecutar" (solo el ejemplo) colado como entrega.
 */
export function validarEntrega(body: unknown, totalDelReto: number): EntregaValida | null {
  if (!body || typeof body !== "object") return null;
  const { code, passedCases, totalCases, mode, durationSeconds, sessionId } = body as Record<
    string,
    unknown
  >;
  // Una entrega de entrevista puede venir con el código inicial intacto o vacío:
  // es lo que se entrega solo cuando se acaba el tiempo sin haber escrito nada.
  if (typeof code !== "string" || code.length > MAX_CODIGO) return null;
  if (!Number.isInteger(passedCases) || !Number.isInteger(totalCases)) return null;
  const pasados = passedCases as number;
  const total = totalCases as number;
  if (total !== totalDelReto || pasados < 0 || pasados > total) return null;

  const modo: SubmissionMode = mode === "interview" ? "interview" : "practice";
  if (modo === "practice" && code.length === 0) return null;

  let duracion: number | null = null;
  let sesion: string | null = null;
  if (modo === "interview") {
    if (!Number.isInteger(durationSeconds) || (durationSeconds as number) < 0) return null;
    duracion = durationSeconds as number;
    if (sessionId !== undefined && sessionId !== null) {
      if (typeof sessionId !== "string" || !SESION_VALIDA.test(sessionId)) return null;
      sesion = sessionId;
    }
  }

  return {
    code,
    passedCases: pasados,
    totalCases: total,
    mode: modo,
    durationSeconds: duracion,
    sessionId: sesion,
  };
}
