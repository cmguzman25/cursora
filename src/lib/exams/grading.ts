import type { ExamQuizQuestion, PracticeExamBank } from "@content/courses/types";

/**
 * Calificación de un simulacro. Este módulo no es ni de cliente ni de
 * servidor a propósito: el servidor calcula la nota que se guarda y el cliente
 * pinta la revisión pregunta por pregunta, y las dos tienen que coincidir
 * exactamente. Una segunda implementación de la misma regla en el componente
 * sería una forma garantizada de que alguna vez difieran.
 */

/** Lo que el alumno marcó, por id de pregunta: `{ "sim-d1-q01": ["B"] }`. */
export type ExamAnswers = Record<string, string[]>;

export interface DomainScore {
  domainId: string;
  correct: number;
  total: number;
}

export interface ExamResult {
  rawCorrect: number;
  rawTotal: number;
  scaledScore: number;
  passed: boolean;
  domainScores: DomainScore[];
  /** Preguntas que quedaron sin marcar. Se cuentan como erradas, pero se informan aparte. */
  unanswered: number;
}

/**
 * Todo o nada, igual que el examen real: no hay puntaje parcial en las
 * preguntas de respuesta múltiple. Marcar una de las dos correctas vale lo
 * mismo que no marcar ninguna.
 */
export function isAnswerCorrect(selected: readonly string[] | Set<string>, question: ExamQuizQuestion): boolean {
  const marcadas = selected instanceof Set ? selected : new Set(selected);

  // Sin respuesta es incorrecta, nunca correcta por vacuidad. El examen
  // permite dejar preguntas en blanco, así que este caso llega de verdad —
  // y sin esta guarda, una pregunta sin opciones correctas daría `true` para
  // quien no contestó nada (0 === 0 y "todas las marcadas pertenecen" se
  // cumple trivialmente sobre un conjunto vacío).
  if (marcadas.size === 0) return false;

  const correctas = question.options.filter((option) => option.correct).map((option) => option.id);
  if (marcadas.size !== correctas.length) return false;

  const esperadas = new Set(correctas);
  for (const id of marcadas) {
    if (!esperadas.has(id)) return false;
  }
  return true;
}

/**
 * Lleva los aciertos crudos a la escala del examen (100–1000), anclando la
 * nota de aprobación en la fracción que declara el banco.
 *
 * Es deliberadamente una recta quebrada en ese ancla, no una recta sola: con
 * `scaledMin + (correct/total) * (scaledMax - scaledMin)` los 700 puntos
 * caerían en el 66,7 % de aciertos, y el alumno que saca el 68 % aprobaría
 * cuando el umbral real está en el 70 %. Partir la recta en el ancla hace que
 * la nota reportada y el porcentaje que el alumno calcula de cabeza coincidan.
 *
 * El resultado es una **aproximación** y la pantalla de resultados tiene que
 * decirlo: el examen real tiene 15 preguntas que no puntúan y usa un modelo de
 * equiparación que AWS no publica.
 */
export function scaledScore(correct: number, total: number, bank: PracticeExamBank): number {
  const { scaledMin, scaledMax, passingScore, passingRawFraction } = bank;
  if (total <= 0) return scaledMin;

  const fraccion = Math.min(1, Math.max(0, correct / total));

  const bruto =
    fraccion < passingRawFraction
      ? scaledMin + (passingScore - scaledMin) * (fraccion / passingRawFraction)
      : passingScore +
        (scaledMax - passingScore) * ((fraccion - passingRawFraction) / (1 - passingRawFraction));

  return Math.min(scaledMax, Math.max(scaledMin, Math.round(bruto)));
}

/** Cuántos aciertos hacen falta para aprobar, para poder decírselo al alumno. */
export function passingRawCount(bank: PracticeExamBank, total: number): number {
  return Math.ceil(total * bank.passingRawFraction);
}

export function gradeAttempt(bank: PracticeExamBank, answers: ExamAnswers): ExamResult {
  const preguntas = bank.questions.es;

  const porDominio = new Map<string, DomainScore>(
    bank.domains.map((domain) => [domain.id, { domainId: domain.id, correct: 0, total: 0 }]),
  );

  let rawCorrect = 0;
  let unanswered = 0;

  for (const pregunta of preguntas) {
    const marcadas = answers[pregunta.id] ?? [];
    if (marcadas.length === 0) unanswered++;

    const acierto = isAnswerCorrect(marcadas, pregunta);
    if (acierto) rawCorrect++;

    const dominio = pregunta.domain ? porDominio.get(pregunta.domain) : undefined;
    if (dominio) {
      dominio.total++;
      if (acierto) dominio.correct++;
    }
  }

  const rawTotal = preguntas.length;
  const nota = scaledScore(rawCorrect, rawTotal, bank);

  return {
    rawCorrect,
    rawTotal,
    scaledScore: nota,
    passed: nota >= bank.passingScore,
    // El orden lo fija el banco, no el recorrido de las preguntas, para que la
    // tabla de resultados salga siempre en el orden de los dominios oficiales.
    domainScores: bank.domains.map(
      (domain) => porDominio.get(domain.id) ?? { domainId: domain.id, correct: 0, total: 0 },
    ),
    unanswered,
  };
}
