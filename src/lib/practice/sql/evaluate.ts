import type { SqlQueryEvaluation } from "@content/challenges/types";

/**
 * El evaluador de los retos de SQL, compartido por el Web Worker del navegador
 * (`postgres.worker.ts`) y por el verificador de Node
 * (`content/challenges/verificar-retos.mjs`).
 *
 * Que sea **el mismo código** en los dos lados es la garantía de que un reto que
 * el verificador da por bueno se califica igual en la app. Por eso este archivo
 * no importa nada en tiempo de ejecución: Node lo carga borrando los tipos, y no
 * resuelve imports sin extensión.
 *
 * No conoce PGlite: recibe cualquier cosa con `exec` y `query`, que es la forma
 * de PGlite y es fácil de imitar en una prueba.
 */

export interface SqlEngine {
  exec(
    sql: string,
    options?: { rowMode?: "array" | "object" },
  ): Promise<{ fields: { name: string; dataTypeID: number }[]; rows: unknown[]; affectedRows?: number }[]>;
  query(
    sql: string,
    params?: unknown[],
    options?: { rowMode?: "array" | "object" },
  ): Promise<{ fields: { name: string; dataTypeID: number }[]; rows: unknown[] }>;
}

/** Una tabla de resultados ya pasada a texto, lista para mostrar y para comparar. */
export interface ResultTable {
  columns: string[];
  /** OID de tipo de Postgres de cada columna; decide cómo se compara. */
  types: number[];
  rows: (string | null)[][];
}

/**
 * `row-order`: las filas son las correctas pero en otro orden. Se distingue de
 * `row-values` porque el arreglo es otro (falta un ORDER BY, o está mal) y el
 * alumno no debería ponerse a buscar un error en la lógica de la consulta.
 */
export type MismatchKind =
  | "column-count"
  | "column-names"
  | "row-count"
  | "row-values"
  | "row-order";

export interface Mismatch {
  kind: MismatchKind;
  /** Para `row-values`/`row-order` con orden: la primera fila (0-based) que difiere. */
  row?: number;
}

export type CaseStatus = "passed" | "failed" | "error";

/**
 * Errores que la UI explica con un texto propio en vez del mensaje de Postgres,
 * porque el de Postgres no le dice al alumno qué hacer.
 */
export type KnownErrorKind = "multiple-statements";

export interface SqlCaseResult {
  name: string;
  hidden: boolean;
  status: CaseStatus;
  /** Mensaje de Postgres cuando `status` es `error`. */
  error?: string;
  errorKind?: KnownErrorKind;
  mismatch?: Mismatch;
  /** Solo en casos visibles: los ocultos no muestran datos. */
  actual?: ResultTable;
  expected?: ResultTable;
  ms: number;
}

export interface SqlRunResult {
  cases: SqlCaseResult[];
  passed: number;
  total: number;
  /** Error que impidió evaluar (la solución de referencia o el esquema fallaron). */
  fatal?: string;
}

export interface SqlEvaluateInput {
  evaluation: SqlQueryEvaluation;
  referenceSql: string;
  userSql: string;
  /** false = "Ejecutar" (solo los visibles); true = "Enviar" (todos). */
  includeHidden: boolean;
}

// Tipos numéricos de Postgres: int2, int4, int8, oid, float4, float8, numeric.
const NUMERIC_TYPES = new Set([21, 23, 20, 26, 700, 701, 1700]);

/** Prepara el SQL del alumno para `query()`, que acepta una sola sentencia. */
export function cleanUserSql(sql: string): string {
  return sql.trim().replace(/;+\s*$/, "").trim();
}

function toDisplay(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) {
    const iso = value.toISOString();
    return iso.endsWith("T00:00:00.000Z") ? iso.slice(0, 10) : iso;
  }
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export async function runToTable(db: SqlEngine, sql: string): Promise<ResultTable> {
  const result = await db.query(sql, [], { rowMode: "array" });
  return {
    columns: result.fields.map((f) => f.name),
    types: result.fields.map((f) => f.dataTypeID),
    rows: (result.rows as unknown[][]).map((row) => row.map(toDisplay)),
  };
}

/**
 * La forma canónica de un valor para comparar. Los números se comparan por valor
 * (1.50 = 1.5) y con seis decimales, para que una división calculada por otro
 * camino no falle por el último dígito. El resto se compara como texto.
 */
function canonical(value: string | null, type: number | undefined): string {
  if (value === null) return "\u0000null";
  if (type !== undefined && NUMERIC_TYPES.has(type)) {
    const n = Number(value);
    if (Number.isFinite(n)) {
      return Number.isInteger(n) ? String(n) : String(Number(n.toFixed(6)));
    }
  }
  return value;
}

function rowKey(row: (string | null)[], types: number[]): string {
  return JSON.stringify(row.map((v, i) => canonical(v, types[i])));
}

/**
 * Compara dos resultados. Las columnas importan en cantidad, en orden y en
 * nombre (sin distinguir mayúsculas), porque una prueba técnica pide un
 * resultado con columnas concretas. Las filas se comparan en orden solo si el
 * enunciado lo exige.
 */
export function compareResultSets(
  expected: ResultTable,
  actual: ResultTable,
  orderMatters: boolean,
): Mismatch | null {
  if (expected.columns.length !== actual.columns.length) return { kind: "column-count" };
  const nombresIguales = expected.columns.every(
    (c, i) => c.toLowerCase() === actual.columns[i].toLowerCase(),
  );
  if (!nombresIguales) return { kind: "column-names" };
  if (expected.rows.length !== actual.rows.length) return { kind: "row-count" };

  // Los tipos de la referencia mandan: si el alumno devuelve un numeric donde la
  // referencia devuelve un int, se comparan los dos como número.
  const types = expected.types.map((t, i) =>
    NUMERIC_TYPES.has(t) || NUMERIC_TYPES.has(actual.types[i]) ? 1700 : t,
  );
  const esperadas = expected.rows.map((r) => rowKey(r, types));
  const obtenidas = actual.rows.map((r) => rowKey(r, types));

  const fila = esperadas.findIndex((k, i) => k !== obtenidas[i]);
  if (fila === -1) return null;

  const esperadasOrdenadas = [...esperadas].sort();
  const obtenidasOrdenadas = [...obtenidas].sort();
  const mismasFilas = esperadasOrdenadas.every((k, i) => k === obtenidasOrdenadas[i]);
  if (!orderMatters) return mismasFilas ? null : { kind: "row-values" };
  return { kind: mismasFilas ? "row-order" : "row-values", row: fila };
}

function errorMessage(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

/** `query()` (protocolo extendido) rechaza más de una sentencia con este mensaje. */
function knownErrorKind(message: string): KnownErrorKind | undefined {
  return /cannot insert multiple commands into a prepared statement/i.test(message)
    ? "multiple-statements"
    : undefined;
}

/** El resultado de explorar: una tabla por sentencia que devuelve filas. */
export interface SqlExploreResult {
  /** Nombre del dataset usado (el primer visible: el ejemplo del enunciado). */
  dataset: string;
  tables: ResultTable[];
  /** Sentencias que corrieron sin devolver filas (CREATE, INSERT, SET...). */
  silentStatements: number;
  error?: string;
  ms: number;
}

/**
 * Corre SQL libre contra los datos del ejemplo, **sin calificar**: es para que
 * el alumno mire los datos (`SELECT * FROM orders`) o pruebe un pedazo de su
 * consulta, como haría en psql durante una entrevista.
 *
 * Usa `exec` y no `query` porque acepta varias sentencias y devuelve un
 * resultado por cada una. Igual que la evaluación, todo va dentro de una
 * transacción que se deshace, y nunca toca los datasets ocultos.
 */
export async function exploreSql(
  db: SqlEngine,
  input: { evaluation: SqlQueryEvaluation; sql: string },
): Promise<SqlExploreResult> {
  const { evaluation } = input;
  const dataset = evaluation.datasets.find((d) => !d.hidden) ?? evaluation.datasets[0];
  const inicio = Date.now();

  try {
    await db.exec("BEGIN; SET LOCAL TIME ZONE 'UTC';");
    await db.exec("DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;");
    await db.exec(evaluation.schema);
    await db.exec(dataset.seed);

    try {
      const resultados = await db.exec(input.sql, { rowMode: "array" });
      const conFilas = resultados.filter((r) => r.fields.length > 0);
      return {
        dataset: dataset.name,
        tables: conFilas.map((r) => ({
          columns: r.fields.map((f) => f.name),
          types: r.fields.map((f) => f.dataTypeID),
          rows: (r.rows as unknown[][]).map((row) => row.map(toDisplay)),
        })),
        silentStatements: resultados.length - conFilas.length,
        ms: Date.now() - inicio,
      };
    } catch (e) {
      return {
        dataset: dataset.name,
        tables: [],
        silentStatements: 0,
        error: errorMessage(e),
        ms: Date.now() - inicio,
      };
    }
  } finally {
    await db.exec("ROLLBACK").catch(() => {});
  }
}

/**
 * Corre la evaluación completa sobre una base ya abierta.
 *
 * Cada dataset va dentro de una transacción que se deshace al final, así que
 * los datasets no se pisan y lo que haga la consulta del alumno (incluso un
 * DELETE) desaparece. El `DROP SCHEMA` del principio cubre el caso raro de que
 * el alumno haya cerrado la transacción con un COMMIT en una corrida anterior.
 *
 * La zona horaria se fija en UTC: PGlite toma la de la máquina, y un reto con
 * `timestamptz` daría resultados distintos según el navegador del alumno.
 */
export async function evaluateSql(db: SqlEngine, input: SqlEvaluateInput): Promise<SqlRunResult> {
  const { evaluation, includeHidden } = input;
  const referenceSql = cleanUserSql(input.referenceSql);
  const userSql = cleanUserSql(input.userSql);
  const datasets = evaluation.datasets.filter((d) => includeHidden || !d.hidden);
  const cases: SqlCaseResult[] = [];

  for (const dataset of datasets) {
    const inicio = Date.now();
    try {
      await db.exec("BEGIN; SET LOCAL TIME ZONE 'UTC';");
      await db.exec("DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;");
      await db.exec(evaluation.schema);
      await db.exec(dataset.seed);

      let expected: ResultTable;
      try {
        expected = await runToTable(db, referenceSql);
      } catch (e) {
        return {
          cases,
          passed: 0,
          total: datasets.length,
          fatal: `La solución de referencia falló en "${dataset.name}": ${errorMessage(e)}`,
        };
      }

      await db.exec("SAVEPOINT alumno");
      let actual: ResultTable | null = null;
      let error: string | undefined;
      try {
        actual = await runToTable(db, userSql);
      } catch (e) {
        error = errorMessage(e);
        await db.exec("ROLLBACK TO SAVEPOINT alumno");
      }

      const mismatch = actual ? compareResultSets(expected, actual, evaluation.orderMatters) : null;
      const status: CaseStatus = error ? "error" : mismatch ? "failed" : "passed";
      cases.push({
        name: dataset.name,
        hidden: dataset.hidden,
        status,
        error,
        errorKind: error ? knownErrorKind(error) : undefined,
        mismatch: mismatch ?? undefined,
        actual: dataset.hidden || !actual ? undefined : actual,
        expected: dataset.hidden ? undefined : expected,
        ms: Date.now() - inicio,
      });
    } catch (e) {
      return {
        cases,
        passed: 0,
        total: datasets.length,
        fatal: `El esquema o los datos de "${dataset.name}" no se pudieron cargar: ${errorMessage(e)}`,
      };
    } finally {
      await db.exec("ROLLBACK").catch(() => {});
    }
  }

  return {
    cases,
    passed: cases.filter((c) => c.status === "passed").length,
    total: cases.length,
  };
}
