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
export type ExamQuestionWithTopic = ExamQuizQuestion & {
  topic: string;
  /**
   * Una imagen que acompaña al enunciado, opcional. Existe para los exámenes que
   * salen de un libro con ilustraciones —un tablero, un bolo con pastillas de
   * colores, un ascensor— que la pregunta necesita mostrar tal como están en el
   * libro. `ExamQuestionCard` la dibuja entre el enunciado y las opciones.
   *
   * Nunca tiene que mostrar la respuesta: si la foto la trae escrita, se recorta
   * o se tapa antes.
   */
  image?: ExamQuestionImage;
};

/**
 * Una imagen servida desde `public/` (`src` empieza con `/`). Ancho y alto son los
 * del archivo, para que la página reserve el espacio antes de que cargue.
 *
 * Si el archivo no está —por ejemplo, porque está en `.gitignore` y el
 * repositorio se clonó en otro lado—, la pregunta se muestra sin la imagen en vez
 * de dibujar una imagen rota.
 */
export interface ExamQuestionImage {
  src: string;
  /** Qué se ve en la imagen, para quien no la puede ver. Obligatorio. */
  alt: string;
  width: number;
  height: number;
}

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

/**
 * Un grupo de pruebas: una certificación, un idioma, un tema del que hay —o va a
 * haber— más de una prueba.
 *
 * Existe porque un examen entero no se escribe de una vez. El DEA-C01 se cubre
 * por partes (ingesta primero, después transformación, después almacenamiento) y
 * cada parte es un banco propio, con sus temas y su diagnóstico. Sin grupos el
 * catálogo las muestra como seis exámenes sueltos y el alumno no ve que son la
 * misma certificación; con grupos ve una tarjeta por certificación y adentro las
 * partes, en el orden en el que conviene rendirlas.
 *
 * El grupo **no se rinde**. No tiene preguntas, ni duración, ni nota: es nada más
 * la carpeta. Cada prueba sigue siendo la unidad que se rinde, se califica y se
 * guarda, y su `slug` no cambia por entrar a un grupo — los intentos ya guardados
 * referencian ese slug y tienen que seguir encontrándolo.
 *
 * Es el grupo el que enumera sus pruebas, y no cada prueba la que declara su
 * grupo, por el orden: `examSlugs` es también el orden en que se muestran, y ese
 * orden es el del examen real (dominio 1, 2, 3...), que no tiene por qué coincidir
 * con el orden en que se fueron escribiendo los bancos.
 */
export interface ExamGroup {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  /**
   * Los slugs de sus pruebas, en el orden en que se muestran. Cada uno tiene que
   * estar dado de alta en `EXAM_BANKS`, y ninguna prueba puede estar en dos
   * grupos: `content/exams/verificar-grupos.mjs` comprueba las dos cosas.
   */
  examSlugs: string[];
  /**
   * Aspecto visual opcional de las páginas del grupo y de sus pruebas. Sin él se
   * ven como el resto de la sección.
   *
   * Vive en el grupo y no en cada banco porque el aspecto es de quién rinde, no
   * de qué se rinde: "Exámenes Lucía" se pinta para una nena de 7 años, y cada
   * prueba nueva que entre al grupo tiene que verse igual sin acordarse de nada.
   * Lo aplica `ExamThemeScope`; los colores están en `globals.css`.
   */
  theme?: ExamVisualTheme;
}

/**
 * Los temas visuales que existen. `unicornio`: rosa, letra más grande y redonda,
 * unicornios de fondo y una lluvia de unicornios y estrellas al acertar en el
 * modo estudio.
 */
export type ExamVisualTheme = "unicornio";

/**
 * Lo que el catálogo necesita de un grupo: su ficha y lo que suman sus pruebas,
 * sin arrastrar ni las preguntas ni las fichas de cada prueba.
 *
 * Mismo motivo que `ExamSummary`, un nivel más arriba: la portada de `/exams`
 * tiene que poder decir "3 pruebas · 180 preguntas" sin bajar al navegador los
 * enunciados de todos los bancos de todos los grupos.
 */
export interface ExamGroupSummary {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  examCount: number;
  questionCount: number;
  /** La suma de las duraciones sugeridas de sus pruebas. */
  suggestedDurationMinutes: number;
}
