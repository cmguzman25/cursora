import type { ExamQuestionImage, LocalizedText } from "@content/exams/types";

/**
 * Tipos de las listas de ejercicios prácticos de `/exams/exercises/<slug>`.
 *
 * Una lista de ejercicios **no se rinde ni se califica**: el alumno resuelve en el
 * cuaderno, pulsa "Resolver" y compara su resolución con la de la lista, paso a
 * paso. Por eso no hay opciones, ni nota, ni nada que guardar.
 *
 * Vive fuera de `content/exams/` a propósito: `verificar-grupos.mjs` trata cada
 * carpeta de ahí como un banco de examen. Lo que comparte con los exámenes es el
 * grupo (`ExamGroup.exerciseSetSlugs`) y la forma de las figuras.
 *
 * Este archivo y los de cada lista solo pueden tener `import type`: el verificador
 * (`verificar-ejercicios.mjs`) los carga directamente con Node.
 */

export type { ExamQuestionImage, LocalizedText } from "@content/exams/types";

/** Una parte de la lista: en los libros, un capítulo. */
export interface ExerciseSection {
  id: string;
  title: string;
  /** De dónde sale, para encontrarlo en el libro: "Capítulo 10, pp. 61–74". */
  source: string;
}

/**
 * Un paso de la resolución. El texto explica qué se hace y por qué; `work` son las
 * líneas de cuenta que salen de ese paso, una por renglón, como se escribirían en
 * el cuaderno. Todo es texto plano: el Markdown no se renderiza.
 */
export interface SolutionStep {
  text: string;
  work?: string[];
}

export interface Exercise {
  /** `c<capítulo>-<nivel>-<número><apartado>`, por ejemplo `c10-n2-4a`. */
  id: string;
  section: string;
  /** Cómo lo llama el libro: "Nível 2 · Atividade 4a" o "Folha AZ · 1". */
  label: string;
  /** El enunciado completo, como en el libro. */
  prompt: string;
  /** La figura del libro, si el ejercicio la tiene. */
  image?: ExamQuestionImage;
  steps: SolutionStep[];
  /** La respuesta final, en una línea. */
  answer: string;
  /**
   * Una advertencia sobre el ejercicio mismo: una figura ambigua, o datos del
   * libro que llevan a un resultado raro. Se muestra junto a la solución.
   */
  note?: string;
}

export interface ExerciseSet {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  sections: ExerciseSection[];
  exercises: Exercise[];
}

/** Lo que la página del grupo necesita de una lista, sin los ejercicios. */
export interface ExerciseSetSummary {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  exerciseCount: number;
  sectionCount: number;
}
