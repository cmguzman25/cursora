import type { ExerciseSet, ExerciseSetSummary } from "./types";
import { set as exerciciosRetasTriangulosPoligonos } from "./exercicios-retas-triangulos-poligonos";

/**
 * Todas las listas de ejercicios prácticos. Una lista existe para la app cuando
 * está acá, y se ve cuando algún grupo de `content/exams/groups.ts` la nombra en
 * `exerciseSetSlugs`. `content/exercises/verificar-ejercicios.mjs` comprueba las dos
 * cosas.
 */
export const EXERCISE_SETS: ExerciseSet[] = [exerciciosRetasTriangulosPoligonos];

const BY_SLUG = new Map(EXERCISE_SETS.map((set) => [set.slug, set]));

export const EXERCISE_SET_SLUGS = EXERCISE_SETS.map((set) => set.slug);

export function getExerciseSet(slug: string): ExerciseSet | null {
  return BY_SLUG.get(slug) ?? null;
}

function resumir(set: ExerciseSet): ExerciseSetSummary {
  return {
    slug: set.slug,
    title: set.title,
    description: set.description,
    exerciseCount: set.exercises.length,
    sectionCount: set.sections.length,
  };
}

/** Las fichas de varias listas, en el orden pedido, sin los slugs que no existen. */
export function listExerciseSetSummaries(slugs: readonly string[]): ExerciseSetSummary[] {
  return slugs
    .map((slug) => BY_SLUG.get(slug))
    .filter((set): set is ExerciseSet => Boolean(set))
    .map(resumir);
}
