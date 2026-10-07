import type { ExamQuizQuestion } from "@content/courses/types";

/**
 * Calificación de un examen con nota. Este módulo no es ni de cliente ni de
 * servidor a propósito: el servidor calcula la nota que se guarda y el cliente
 * pinta la revisión pregunta por pregunta, y las dos tienen que coincidir
 * exactamente. Una segunda implementación de la misma regla en el componente
 * sería una forma garantizada de que alguna vez difieran.
 */

/**
 * En qué escala se reporta la nota.
 *
 * Las funciones de este módulo piden esto y no un `PracticeExamBank` entero para
 * que los exámenes de la sección `/exams` — que no pertenecen a ningún curso ni
 * imitan la escala de ningún examen oficial — se califiquen con **estas**
 * funciones y no con una segunda copia de la regla. `PracticeExamBank` lo cumple
 * sin cambios.
 */
export interface ScoreScale {
  scaledMin: number;
  scaledMax: number;
  passingScore: number;
  passingRawFraction: number;
}

/** Una escala, los grupos del diagnóstico y las preguntas que se califican. */
export interface GradableExam extends ScoreScale {
  /** Dominios oficiales en un simulacro de certificación, temas en un examen de `/exams`. */
  domains: readonly { id: string }[];
  /**
   * Las preguntas **en el idioma que se rindió**, ya resueltas por quien llama.
   * Recibirlas como un array y no como el mapa `LocalizedQuestions` es
   * deliberado: el banco de un curso guarda todas sus traducciones, y un
   * calificador que eligiera una por su cuenta sería un segundo lugar donde
   * decidir qué idioma se está rindiendo.
   */
  questions: readonly ExamQuizQuestion[];
}

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
 * Para un simulacro de AWS el resultado es una **aproximación** y la pantalla de
 * resultados tiene que decirlo: el examen real tiene 15 preguntas que no puntúan
 * y usa un modelo de equiparación que AWS no publica. Un examen de la sección
 * `/exams` no tiene ese problema: declara `scaledMin: 0`, `scaledMax: 100` y
 * `passingScore = passingRawFraction * 100`, con lo que la recta quebrada
 * colapsa en una sola y la nota **es** el porcentaje de aciertos.
 */
export function scaledScore(correct: number, total: number, scale: ScoreScale): number {
  const { scaledMin, scaledMax, passingScore, passingRawFraction } = scale;
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
export function passingRawCount(scale: ScoreScale, total: number): number {
  return Math.ceil(total * scale.passingRawFraction);
}

export function gradeAttempt(exam: GradableExam, answers: ExamAnswers): ExamResult {
  const preguntas = exam.questions;

  const porDominio = new Map<string, DomainScore>(
    exam.domains.map((domain) => [domain.id, { domainId: domain.id, correct: 0, total: 0 }]),
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
  const nota = scaledScore(rawCorrect, rawTotal, exam);

  return {
    rawCorrect,
    rawTotal,
    scaledScore: nota,
    passed: nota >= exam.passingScore,
    // El orden lo fija el banco, no el recorrido de las preguntas, para que la
    // tabla de resultados salga siempre en el orden de los dominios oficiales.
    domainScores: exam.domains.map(
      (domain) => porDominio.get(domain.id) ?? { domainId: domain.id, correct: 0, total: 0 },
    ),
    unanswered,
  };
}
