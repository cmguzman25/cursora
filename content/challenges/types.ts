import type { LocalizedText } from "@content/courses/types";

/**
 * Tipos de los retos de la sección `/practice`: un enunciado, un editor y una
 * evaluación automática, para preparar pruebas técnicas de *live coding*.
 *
 * La sección no está atada a un lenguaje. Cada reto declara su `language` y su
 * `evaluation`, y esta última es una unión discriminada por `kind`: agregar un
 * lenguaje nuevo es agregar un `kind` (y su runner en `src/lib/practice/`), sin
 * tocar los retos que ya existen.
 *
 * Este archivo, como cada `reto.ts`, solo puede tener `import type`: el
 * verificador (`verificar-retos.mjs`) los carga directamente con Node, que borra
 * los tipos pero no resuelve imports sin extensión.
 */

export type { LocalizedText } from "@content/courses/types";

export type ChallengeDifficulty = "basic" | "medium" | "advanced";

export const CHALLENGE_DIFFICULTIES: readonly ChallengeDifficulty[] = [
  "basic",
  "medium",
  "advanced",
];

export type ChallengeLanguage = "postgres" | "javascript" | "typescript" | "python" | "scala";

export const CHALLENGE_LANGUAGES: readonly ChallengeLanguage[] = [
  "postgres",
  "javascript",
  "typescript",
  "python",
  "scala",
];

/**
 * Un conjunto de datos sobre el que se corre la consulta del alumno.
 *
 * El primero visible es el "ejemplo" del enunciado. Los ocultos existen cada
 * uno por una trampa concreta (NULLs, empates, tabla vacía, duplicados), y
 * `trap` la nombra: es lo que el alumno ve cuando falla un caso oculto, sin ver
 * los datos.
 */
export interface SqlDataset {
  name: string;
  /** INSERTs (o cualquier SQL) que pueblan las tablas de `schema`. */
  seed: string;
  hidden: boolean;
  trap?: LocalizedText;
}

/**
 * Un reto de SQL: se corre `schema` + `seed` de cada dataset, y se compara el
 * resultado de la consulta del alumno con el de `solution.code`.
 *
 * El resultado esperado **no se escribe a mano**: sale de ejecutar la solución
 * de referencia sobre los mismos datos.
 */
export interface SqlQueryEvaluation {
  kind: "sql-query";
  /** CREATE TABLE ... — se ejecuta antes de cada dataset, sobre un esquema vacío. */
  schema: string;
  datasets: SqlDataset[];
  /** true si el enunciado exige un orden; si no, las filas se comparan como multiconjunto. */
  orderMatters: boolean;
}

/**
 * Un test de un reto de código: una llamada y su valor esperado, los dos
 * escritos como **expresiones del lenguaje del reto** (`solve(List(3, 1))` y
 * `Some(2)`), comparadas con la igualdad del lenguaje. JSON no alcanza: Option,
 * Either o una case class no tienen forma en JSON.
 */
export interface CodeTest {
  name: string;
  call: string;
  /** Escrito a mano; el verificador exige que la referencia lo cumpla. */
  expected: string;
  hidden: boolean;
  trap?: LocalizedText;
}

/**
 * Retos de funciones (algoritmos, modelado, manipulación de datos): se arma un
 * programa con el código del alumno y cada test, y se compara. El harness de
 * cada lenguaje vive en `src/lib/practice/<lenguaje>/harness.ts`.
 */
export interface CodeTestsEvaluation {
  kind: "code-tests";
  /** Lo que el alumno debe definir (función, clase u objeto). */
  entrypoint: string;
  tests: CodeTest[];
}

export type ChallengeEvaluation = SqlQueryEvaluation | CodeTestsEvaluation;

/**
 * Una solución que **parece** correcta y no lo es. El verificador exige que
 * falle al menos un caso oculto: si pasa todo, los casos ocultos no están
 * vigilando la trampa que dicen vigilar.
 */
export interface NaiveSolution {
  code: string;
  why: LocalizedText;
}

/**
 * El contrato del resultado, separado del enunciado para que se vea destacado:
 * columnas y orden son lo que más se le escapa a un alumno leyendo rápido, y es
 * justo lo que el evaluador compara con exactitud.
 */
export interface ChallengeOutput {
  /** Columnas exactas, en orden. El verificador las compara con las de la referencia. */
  columns: string[];
  /**
   * El orden exigido, en palabras ("por id ascendente"). Obligatorio si la
   * evaluación tiene `orderMatters`; ausente si el orden no importa.
   */
  order?: LocalizedText;
}

export interface Challenge {
  slug: string;
  title: LocalizedText;
  difficulty: ChallengeDifficulty;
  /** Patrones o conceptos: "joins", "window-functions", "group-by"... */
  tags: string[];
  language: ChallengeLanguage;
  /** Markdown. No repite columnas ni orden: eso va en `output`. */
  statement: LocalizedText;
  /** Solo en retos de SQL (o de cualquier evaluación que devuelva una tabla). */
  output?: ChallengeOutput;
  starterCode: string;
  /** Escalonadas: de la más vaga a la que casi da la respuesta. */
  hints: LocalizedText[];
  solution: {
    code: string;
    /** Markdown: por qué funciona. */
    explanation: LocalizedText;
    /** Errores típicos; cada trampa de los datasets ocultos debería aparecer acá. */
    pitfalls: LocalizedText[];
  };
  naiveSolutions: NaiveSolution[];
  suggestedMinutes: number;
  evaluation: ChallengeEvaluation;
}

/** La ficha del catálogo: sin solución, sin datos, sin pistas. */
export interface ChallengeSummary {
  slug: string;
  title: LocalizedText;
  difficulty: ChallengeDifficulty;
  tags: string[];
  language: ChallengeLanguage;
  suggestedMinutes: number;
}
