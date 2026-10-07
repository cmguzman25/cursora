import { defaultLocale, type AppLocale } from "@/i18n/routing";
import type { ExamQuestionWithTopic, GeneratedExamBank } from "@content/exams/types";
import type { GradableExam } from "./grading";

/**
 * El puente entre un examen de la sección `/exams` y el calificador compartido
 * de `grading.ts`.
 *
 * Existe para que no entre al proyecto una segunda regla de calificación. El
 * truco está en la escala: `scaledScore()` es una recta quebrada en
 * `passingRawFraction`, y con `scaledMin = 0`, `scaledMax = 100`,
 * `passingScore = P` y `passingRawFraction = P/100` las dos ramas se reducen a lo
 * mismo:
 *
 *   debajo del ancla:  0 + (P - 0) * (f / (P/100))              = 100f
 *   encima del ancla:  P + (100 - P) * ((f - P/100) / (1 - P/100)) = 100f
 *
 * O sea que la nota de un examen de esta sección **es** el porcentaje de
 * aciertos redondeado, calculado por la misma función que califica los
 * simulacros de los cursos. No hay escala inventada ni aproximación que haya que
 * disculpar en pantalla.
 */

/**
 * Topes de la duración que puede pedir el alumno. Están acá y no en la ruta
 * porque el formulario los necesita para su `min`/`max` y el servidor para
 * acotar lo que llega: dos números distintos para la misma regla terminarían en
 * un campo que acepta lo que la API rechaza.
 */
export const DURACION_MINIMA = 5;
export const DURACION_MAXIMA = 240;

/**
 * Acota lo que el cliente pidió como duración. Devuelve null si no es un número
 * de minutos utilizable — la ruta responde 400 en ese caso en vez de inventar un
 * valor, porque un examen que dura algo distinto de lo que el alumno eligió es
 * peor que un error.
 */
export function clampDuration(raw: unknown): number | null {
  const minutos = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isFinite(minutos)) return null;

  const entero = Math.round(minutos);
  if (entero < DURACION_MINIMA || entero > DURACION_MAXIMA) return null;

  return entero;
}

/**
 * Las preguntas del examen en el idioma pedido, con caída al idioma por defecto.
 * Igual que con las clases en Markdown, un examen puede estar escrito solo en
 * español y traducirse después.
 */
export function examQuestions(
  bank: GeneratedExamBank,
  locale: AppLocale = defaultLocale,
): ExamQuestionWithTopic[] {
  return bank.questions[locale] ?? bank.questions[defaultLocale];
}

/**
 * Presenta el banco como un examen calificable.
 *
 * El mapeo `topic → domain` es lo único que hace: el calificador agrupa por
 * `domain`, y acá los grupos son los temas que el examen declara evaluar.
 *
 * Las preguntas se califican **siempre en el idioma por defecto**, no en el que
 * el alumno está leyendo. Los ids de pregunta y de opción son los mismos en
 * todas las traducciones, así que la nota sale igual; y fijarlo acá evita que
 * cambiar de idioma a mitad de una rendida pudiera moverla.
 */
export function toGradableExam(bank: GeneratedExamBank): GradableExam {
  const preguntas = bank.questions[defaultLocale];

  return {
    scaledMin: 0,
    scaledMax: 100,
    passingScore: bank.passingPercent,
    passingRawFraction: bank.passingPercent / 100,
    domains: bank.topics.map((topic) => ({ id: topic.id })),
    questions: preguntas.map((pregunta) => ({ ...pregunta, domain: pregunta.topic })),
  };
}
