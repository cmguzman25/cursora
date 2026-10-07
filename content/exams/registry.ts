import type { ExamSummary, GeneratedExamBank } from "./types";
import { bank as awsCloudPractitionerSimulacro } from "./aws-cloud-practitioner-simulacro/manifest";
import { bank as inglesTiemposYCondicionales } from "./ingles-tiempos-y-condicionales/manifest";

/**
 * Todos los exámenes que la sección `/exams` puede servir. Agregar uno es crear
 * su carpeta bajo `content/exams/`, exportar un `bank` desde su `manifest.ts`, y
 * listarlo acá — las rutas del examen se generan a partir de esta lista.
 *
 * Los imports son estáticos a propósito, por el mismo motivo que en
 * `content/courses/registry.ts`: las rutas se prerenderizan en el build, así que
 * los bancos tienen que ser parte del bundle y no leerse en cada petición.
 */
export const EXAM_BANKS: GeneratedExamBank[] = [
  awsCloudPractitionerSimulacro,
  inglesTiemposYCondicionales,
];

const BY_SLUG = new Map(EXAM_BANKS.map((bank) => [bank.slug, bank]));

export const EXAM_SLUGS = EXAM_BANKS.map((bank) => bank.slug);

export function getExamBank(slug: string): GeneratedExamBank | null {
  return BY_SLUG.get(slug) ?? null;
}

/**
 * Las fichas del catálogo, **sin las preguntas**.
 *
 * Existe por una razón de peso, literal: un banco de 65 preguntas con una
 * explicación por opción son cientos de kilobytes. El catálogo tiene que poder
 * decir "14 preguntas, 3 temas" sin que el navegador descargue los enunciados y
 * las respuestas correctas de todos los exámenes. Es el mismo motivo por el que
 * `content/courses/registry.ts` expone `getLessonTotals()` en vez de los
 * manifests.
 */
export function listExamSummaries(): ExamSummary[] {
  return EXAM_BANKS.map((bank) => ({
    slug: bank.slug,
    title: bank.title,
    description: bank.description,
    difficulty: bank.difficulty,
    questionCount: bank.questions.es.length,
    topicCount: bank.topics.length,
    suggestedDurationMinutes: bank.suggestedDurationMinutes,
    passingPercent: bank.passingPercent,
  }));
}
