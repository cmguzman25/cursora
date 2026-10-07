import { defaultLocale, type AppLocale } from "@/i18n/routing";
import type { ExamQuizQuestion, LocalizedText } from "@content/courses/types";

/**
 * Tipos de los exámenes de la sección `/exams`: exámenes que **no pertenecen a
 * ningún curso**. El alumno los rinde para prepararse para una certificación o
 * para repasar algo que está estudiando fuera de esta plataforma.
 *
 * De `content/courses/types.ts` se reutilizan sin tocar `LocalizedText`,
 * `localize`, `ExamQuizOption` y `ExamQuizQuestion`. En particular
 * `ExamQuizOption.explanation` ya es obligatorio en **todas** las opciones, no
 * solo en la correcta, así que el "por qué las otras no son correctas" del modo
 * estudio no necesita ningún tipo nuevo.
 *
 * Esos cuatro se vuelven a exportar desde acá para que un examen no tenga que
 * importar de dos lugares distintos: todo lo que necesita un archivo de
 * `content/exams/` entra por este módulo.
 */
export type { ExamQuizOption, ExamQuizQuestion, LocalizedText } from "@content/courses/types";
export { localize } from "@content/courses/types";

/**
 * Un tema que el examen evalúa.
 *
 * A diferencia de `ExamDomain`, no tiene `weight`: nadie publicó una
 * ponderación oficial para estos exámenes. La parte que ocupa un tema se deriva
 * de cuántas preguntas tiene, que es lo único honesto que se puede decir.
 */
export interface ExamTopic {
  /** Clave estable e independiente del idioma. Coincide con `ExamQuestionWithTopic.topic`. */
  id: string;
  name: LocalizedText;
}

export type ExamDifficulty = "introductory" | "intermediate" | "advanced" | "mixed";

/**
 * Una pregunta de un examen de esta sección. El tema es obligatorio: el
 * diagnóstico por tema se calcula a partir de él, y una pregunta sin tema
 * desaparecería de la tabla de resultados sin que nadie lo note.
 *
 * Se llama `topic` y no `domain` porque "dominio" es vocabulario de las
 * certificaciones de AWS y acá el examen puede ser de cualquier cosa. El
 * adaptador de `src/lib/exams/generated.ts` lo traduce a `domain` para que el
 * calificador compartido funcione sin cambios.
 */
export type ExamQuestionWithTopic = ExamQuizQuestion & { topic: string };

/**
 * Las preguntas en cada idioma en el que se escribieron. Misma forma y misma
 * regla de paralelismo que `LocalizedQuestions`: mismas preguntas, mismo orden,
 * mismos ids de opción y mismas correctas en todas las traducciones.
 *
 * Un aviso que ahorra confusión: `es` es el nombre del casillero obligatorio, no
 * una promesa sobre el idioma de lo que hay dentro. Un examen de inglés va a
 * tener sus enunciados en inglés dentro de `questions.es`, y está bien.
 */
export type LocalizedTopicQuestions = Partial<Record<AppLocale, ExamQuestionWithTopic[]>> &
  Record<typeof defaultLocale, ExamQuestionWithTopic[]>;

/**
 * Un examen de la sección `/exams`, tal como lo escribe el skill
 * `generar-examen`.
 *
 * Deliberadamente **no** tiene `durationMinutes`, `scaledMin`, `scaledMax`,
 * `passingScore` ni `passingRawFraction`:
 *
 *   - la duración la elige el alumno al empezar, y `suggestedDurationMinutes`
 *     es nada más el valor con el que arranca el campo;
 *   - los otros cuatro tendrían un único valor legal cada uno (0, 100,
 *     `passingPercent` y `passingPercent / 100`), y llevarlos en el archivo
 *     autorado sería invitar a que alguna vez queden mal escritos. Los pone el
 *     adaptador, en un solo lugar.
 */
export interface GeneratedExamBank {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  topics: ExamTopic[];
  difficulty: ExamDifficulty;
  /** Lo que estimó quien lo escribió (~1,5 min por pregunta). Un punto de partida, no la duración. */
  suggestedDurationMinutes: number;
  /** Porcentaje de aciertos que cuenta como aprobado, 0–100. */
  passingPercent: number;
  /**
   * Se incrementa ante cualquier edición de cualquier pregunta. Queda guardado en
   * cada rendida, para que un intento viejo no se revise nunca contra un banco
   * más nuevo: mostraría enunciados que ese alumno no respondió.
   */
  version: number;
  questions: LocalizedTopicQuestions;
}

/** Lo que el catálogo necesita de un examen, sin arrastrar las preguntas. */
export interface ExamSummary {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  difficulty: ExamDifficulty;
  questionCount: number;
  topicCount: number;
  suggestedDurationMinutes: number;
  passingPercent: number;
}
