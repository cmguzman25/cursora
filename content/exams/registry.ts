import type { ExamGroup, ExamGroupSummary, ExamSummary, GeneratedExamBank } from "./types";
import { EXAM_GROUPS } from "./groups";
import { bank as awsCloudPractitionerSimulacro } from "./aws-cloud-practitioner-simulacro/manifest";
import { bank as awsCloudPractitionerRefuerzoGrediana } from "./aws-cloud-practitioner-refuerzo-grediana/manifest";
import { bank as awsDataEngineerIngesta } from "./aws-data-engineer-ingesta/manifest";
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
  awsCloudPractitionerRefuerzoGrediana,
  awsDataEngineerIngesta,
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
  return EXAM_BANKS.map(resumir);
}

function resumir(bank: GeneratedExamBank): ExamSummary {
  return {
    slug: bank.slug,
    title: bank.title,
    description: bank.description,
    difficulty: bank.difficulty,
    questionCount: bank.questions.es.length,
    topicCount: bank.topics.length,
    suggestedDurationMinutes: bank.suggestedDurationMinutes,
    passingPercent: bank.passingPercent,
  };
}

/* -------------------------------------------------------------------------- */
/* Grupos                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * El grupo es la unidad del catálogo; el examen, la unidad que se rinde. Las
 * funciones de acá resuelven la relación entre las dos en un solo lugar, y todas
 * son tolerantes a un desajuste: un `examSlugs` que nombra una prueba que no
 * existe la saltea, y una prueba que no está en ningún grupo aparece en
 * `UNGROUPED_EXAM_SLUGS` en vez de desaparecer. La portada muestra esas sueltas y
 * `verificar-grupos.mjs` falla por ellas — un slug mal escrito tiene que ser
 * visible, no romper la sección entera.
 */

const GROUP_BY_SLUG = new Map(EXAM_GROUPS.map((group) => [group.slug, group]));

export const EXAM_GROUP_SLUGS = EXAM_GROUPS.map((group) => group.slug);

export function getExamGroup(slug: string): ExamGroup | null {
  return GROUP_BY_SLUG.get(slug) ?? null;
}

/** Los bancos de un grupo, en el orden declarado, sin los slugs que no existen. */
function banksOfGroup(group: ExamGroup): GeneratedExamBank[] {
  return group.examSlugs
    .map((slug) => BY_SLUG.get(slug))
    .filter((bank): bank is GeneratedExamBank => Boolean(bank));
}

/** El grupo al que pertenece una prueba, o null si no se la dio de alta en ninguno. */
export function getGroupOfExam(examSlug: string): ExamGroup | null {
  return EXAM_GROUPS.find((group) => group.examSlugs.includes(examSlug)) ?? null;
}

/** Las fichas de la portada: un grupo por tarjeta, con lo que suman sus pruebas. */
export function listExamGroupSummaries(): ExamGroupSummary[] {
  return EXAM_GROUPS.map((group) => {
    const banks = banksOfGroup(group);

    return {
      slug: group.slug,
      title: group.title,
      description: group.description,
      examCount: banks.length,
      questionCount: banks.reduce((total, bank) => total + bank.questions.es.length, 0),
      suggestedDurationMinutes: banks.reduce(
        (total, bank) => total + bank.suggestedDurationMinutes,
        0,
      ),
    };
  });
}

/** Las fichas de las pruebas de un grupo, en el orden declarado. */
export function listExamSummariesInGroup(groupSlug: string): ExamSummary[] {
  const group = GROUP_BY_SLUG.get(groupSlug);
  if (!group) return [];

  return banksOfGroup(group).map(resumir);
}

/**
 * Las pruebas que todavía no están en ningún grupo. Vacío es lo normal; cualquier
 * cosa distinta de vacío es un alta a medias, y la portada las muestra aparte para
 * que se note en vez de quedar inalcanzables.
 */
export function listUngroupedExamSummaries(): ExamSummary[] {
  return EXAM_BANKS.filter((bank) => !getGroupOfExam(bank.slug)).map(resumir);
}
