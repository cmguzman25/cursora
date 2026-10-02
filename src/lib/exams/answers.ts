import type { PracticeExamBank } from "@content/courses/types";
import type { ExamAnswers } from "./grading";

/**
 * Saneamiento de lo que el cliente manda. Las rutas del simulacro no confían
 * en el cuerpo de la petición: un `answers` con ids inventados se guardaría y
 * después se calificaría, y como la nota queda registrada, conviene que lo
 * almacenado solo pueda contener opciones que existen de verdad.
 */

/** Deja solo preguntas del banco y opciones que esas preguntas tienen. */
export function sanitizeAnswers(bank: PracticeExamBank, raw: unknown): ExamAnswers | null {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return null;

  const porId = new Map(bank.questions.es.map((q) => [q.id, q]));
  const limpio: ExamAnswers = {};

  for (const [questionId, valor] of Object.entries(raw as Record<string, unknown>)) {
    const pregunta = porId.get(questionId);
    if (!pregunta) return null;
    if (!Array.isArray(valor) || valor.some((v) => typeof v !== "string")) return null;

    const idsValidos = new Set(pregunta.options.map((o) => o.id));
    const marcadas = [...new Set(valor as string[])];
    if (marcadas.some((id) => !idsValidos.has(id))) return null;

    // Más opciones que correctas no es una respuesta posible en el examen; se
    // descarta en vez de guardarla, para que no quede un estado que la
    // interfaz no sabría dibujar.
    const maximo = pregunta.multiple ? 2 : 1;
    if (marcadas.length > maximo) return null;

    if (marcadas.length > 0) limpio[questionId] = marcadas;
  }

  return limpio;
}

/** Deja solo ids de preguntas que existen en el banco. */
export function sanitizeFlagged(bank: PracticeExamBank, raw: unknown): string[] | null {
  if (!Array.isArray(raw) || raw.some((v) => typeof v !== "string")) return null;

  const existentes = new Set(bank.questions.es.map((q) => q.id));
  const marcadas = [...new Set(raw as string[])];
  if (marcadas.some((id) => !existentes.has(id))) return null;

  return marcadas;
}
