// ---------------------------------------------------------------------------
// Verificador de los retos de `/practice`. Se corre desde la raíz del repo:
//
//   node --no-warnings content/challenges/verificar-retos.mjs [slug]
//
// Sin argumento revisa todos los retos; con un slug, solo ese.
//
// Importa cada `reto.ts` directamente: Node 24 borra los tipos al cargarlo, y
// esos archivos solo tienen `import type`. Por eso `registry.ts` no se importa
// (sus imports no llevan extensión); se lee como texto para comprobar que cada
// carpeta está dada de alta.
//
// A diferencia del verificador de exámenes, este **sí mide verdad**, no solo
// forma: corre la solución de referencia y las soluciones ingenuas en un
// Postgres real (PGlite) con el **mismo evaluador** que usa la app
// (`src/lib/practice/sql/evaluate.ts`).
//
// Los retos de Scala (`code-tests`) se compilan y ejecutan en Docker, con la
// imagen `virtuslab/scala-cli` y el mismo harness que usará el runner de la app
// (`src/lib/practice/scala/harness.ts`). Sin Docker, esos retos fallan: no se
// dan por buenos sin ejecutarlos.
// ---------------------------------------------------------------------------

import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { PGlite } from "@electric-sql/pglite";
import { evaluateSql, runToTable } from "../../src/lib/practice/sql/evaluate.ts";
import { buildScalaProgram, parseScalaOutput } from "../../src/lib/practice/scala/harness.ts";

const AQUI = dirname(fileURLToPath(import.meta.url));
const DIFICULTADES = ["basic", "medium", "advanced"];
const LENGUAJES = ["postgres", "javascript", "typescript", "python", "scala"];
const IMAGEN_SCALA = "virtuslab/scala-cli:latest";

/**
 * Compila y corre un programa de Scala en Docker. La caché de dependencias vive
 * en el volumen `scala-cli-cache` para no bajar el compilador en cada corrida, y
 * `--rm` no deja contenedores encendidos.
 */
function correrScala(variantes, tests) {
  const dir = mkdtempSync(join(tmpdir(), "reto-scala-"));
  try {
    writeFileSync(join(dir, "Main.scala"), buildScalaProgram(variantes, tests));
    const r = spawnSync(
      "docker",
      ["run", "--rm", "-v", "scala-cli-cache:/root/.cache", "-v", `${dir}:/w`, IMAGEN_SCALA,
        "run", "/w/Main.scala", "--server=false", "--quiet"],
      { encoding: "utf8", timeout: 600_000, maxBuffer: 32 * 1024 * 1024 },
    );
    if (r.error) return { error: `no se pudo correr Docker: ${r.error.message}`, results: [] };
    const results = parseScalaOutput(r.stdout ?? "");
    const error = r.status !== 0 && results.length === 0
      ? `no compiló o no corrió (exit ${r.status}):\n${(r.stderr || r.stdout || "").replace(/\x1b\[[0-9;]*m/g, "").trim().split("\n").slice(-25).join("\n")}`
      : null;
    return { error, results };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

const soloSlug = process.argv[2];
const registro = readFileSync(join(AQUI, "registry.ts"), "utf8");
const carpetas = readdirSync(AQUI).filter(
  (n) => statSync(join(AQUI, n)).isDirectory() && (!soloSlug || n === soloSlug),
);

if (soloSlug && carpetas.length === 0) {
  console.error(`No existe content/challenges/${soloSlug}/`);
  process.exit(1);
}

let db = null;
async function getDb() {
  db ??= await PGlite.create();
  return db;
}

let totalErrores = 0;

for (const carpeta of carpetas) {
  const errores = [];
  const avisos = [];
  const err = (m) => errores.push(m);
  const aviso = (m) => avisos.push(m);

  const archivo = join(AQUI, carpeta, "reto.ts");
  let reto;
  try {
    ({ challenge: reto } = await import(pathToFileURL(archivo).href));
  } catch (e) {
    console.log(`✗ ${carpeta}: no se pudo cargar reto.ts — ${e.message}`);
    totalErrores++;
    continue;
  }
  if (!reto) {
    console.log(`✗ ${carpeta}: reto.ts no exporta \`challenge\``);
    totalErrores++;
    continue;
  }

  // --- forma ---------------------------------------------------------------
  if (reto.slug !== carpeta) err(`slug "${reto.slug}" no coincide con la carpeta`);
  if (!registro.includes(`./${carpeta}/reto"`)) err("no está dado de alta en registry.ts");
  if (!DIFICULTADES.includes(reto.difficulty)) err(`dificultad inválida: ${reto.difficulty}`);
  if (!LENGUAJES.includes(reto.language)) err(`lenguaje inválido: ${reto.language}`);
  if (!reto.title?.es) err("falta title.es");
  if (!reto.statement?.es?.trim()) err("falta statement.es");
  if (!Array.isArray(reto.tags) || reto.tags.length === 0) err("sin tags");
  if (!(reto.suggestedMinutes > 0)) err("suggestedMinutes debe ser > 0");
  if (!reto.hints?.length) err("sin pistas");
  if (!reto.solution?.code?.trim()) err("falta solution.code");
  if (!reto.solution?.explanation?.es?.trim()) err("falta solution.explanation.es");
  if (!reto.solution?.pitfalls?.length) err("sin pitfalls");
  if (!reto.naiveSolutions?.length) err("sin naiveSolutions: nada prueba que los casos ocultos vigilen algo");

  for (const campo of ["title", "statement"]) {
    if (reto[campo] && !reto[campo].en) aviso(`${campo} sin traducción al inglés`);
  }

  // --- evaluación SQL ------------------------------------------------------
  const ev = reto.evaluation;
  if (ev?.kind === "sql-query") {
    if (reto.language !== "postgres") err(`evaluación sql-query con lenguaje ${reto.language}`);
    const visibles = ev.datasets.filter((d) => !d.hidden);
    const ocultos = ev.datasets.filter((d) => d.hidden);
    if (visibles.length === 0) err("ningún dataset visible (el ejemplo del enunciado)");
    if (ocultos.length === 0) err("ningún dataset oculto");
    const nombres = ev.datasets.map((d) => d.name);
    if (new Set(nombres).size !== nombres.length) err("nombres de dataset repetidos");
    for (const d of ocultos) if (!d.trap?.es) err(`dataset oculto "${d.name}" sin trap.es`);

    if (ev.orderMatters && !/order\s+by/i.test(reto.solution.code)) {
      err("orderMatters es true pero la solución no tiene ORDER BY");
    }
    if (!reto.output?.columns?.length) err("falta output.columns (el formato del resultado)");
    if (ev.orderMatters && !reto.output?.order?.es) err("orderMatters es true pero falta output.order.es");
    if (!ev.orderMatters && reto.output?.order) err("output.order declarado pero orderMatters es false");
    if (/\*\*(columnas|columns|orden|order)/i.test(reto.statement?.es ?? "")) {
      aviso("el enunciado repite columnas u orden: eso va en `output`, que la UI muestra destacado");
    }

    if (errores.length === 0) {
      const pg = await getDb();
      const referencia = await evaluateSql(pg, {
        evaluation: ev,
        referenceSql: reto.solution.code,
        userSql: reto.solution.code,
        includeHidden: true,
      });
      if (referencia.fatal) err(referencia.fatal);
      for (const c of referencia.cases) {
        if (c.status !== "passed") err(`la referencia no pasa su propio caso "${c.name}": ${c.error ?? c.mismatch?.kind}`);
      }
      for (const c of referencia.cases.filter((c) => !c.hidden)) {
        if (c.expected && c.expected.rows.length === 0) err(`el ejemplo "${c.name}" da un resultado vacío: no enseña nada`);
        const declaradas = (reto.output?.columns ?? []).join(", ");
        const reales = c.expected?.columns.join(", ");
        if (reales !== undefined && declaradas.toLowerCase() !== reales.toLowerCase()) {
          err(`output.columns dice [${declaradas}] pero la referencia devuelve [${reales}]`);
        }
      }

      // Dos datasets ocultos con el mismo resultado esperado suelen vigilar lo mismo.
      const firmas = new Map();
      for (const d of ocultos) {
        await pg.exec("BEGIN; SET LOCAL TIME ZONE 'UTC';");
        try {
          await pg.exec("DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;");
          await pg.exec(ev.schema);
          await pg.exec(d.seed);
          const t = await runToTable(pg, reto.solution.code.replace(/;+\s*$/, ""));
          const firma = JSON.stringify(t.rows);
          if (firmas.has(firma) && t.rows.length > 0) {
            aviso(`"${d.name}" y "${firmas.get(firma)}" esperan exactamente el mismo resultado`);
          }
          firmas.set(firma, d.name);
        } finally {
          await pg.exec("ROLLBACK");
        }
      }

      // Determinismo: con empates en el ORDER BY, el orden de las filas empatadas
      // depende del plan. Se corre la referencia con varias estrategias del
      // planificador; si el resultado cambia, el orden pedido es ambiguo. Es una
      // heurística: si salta hay un problema seguro, si no salta no lo descarta.
      if (ev.orderMatters) {
        const planes = [
          "",
          "SET LOCAL enable_hashjoin = off; SET LOCAL enable_hashagg = off;",
          "SET LOCAL enable_mergejoin = off; SET LOCAL enable_nestloop = off;",
          "SET LOCAL enable_seqscan = off; SET LOCAL enable_sort = off;",
        ];
        for (const d of ev.datasets) {
          const vistos = new Set();
          for (const plan of planes) {
            await pg.exec("BEGIN; SET LOCAL TIME ZONE 'UTC';");
            try {
              await pg.exec("DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;");
              await pg.exec(ev.schema);
              await pg.exec(d.seed);
              if (plan) await pg.exec(plan);
              const t = await runToTable(pg, reto.solution.code.replace(/;+\s*$/, ""));
              vistos.add(JSON.stringify(t.rows));
            } finally {
              await pg.exec("ROLLBACK");
            }
          }
          if (vistos.size > 1) {
            err(`"${d.name}": la referencia devuelve otro orden según el plan — hay empates sin desempate en output.order`);
          }
        }
      }

      if (!reto.starterCode?.trim()) aviso("starterCode vacío");

      for (const [i, ingenua] of (reto.naiveSolutions ?? []).entries()) {
        const r = await evaluateSql(pg, {
          evaluation: ev,
          referenceSql: reto.solution.code,
          userSql: ingenua.code,
          includeHidden: true,
        });
        const fallaOculto = r.cases.some((c) => c.hidden && c.status !== "passed");
        if (!fallaOculto) err(`la solución ingenua #${i + 1} pasa todos los casos ocultos`);
        const fallaVisible = r.cases.some((c) => !c.hidden && c.status !== "passed");
        if (fallaVisible) aviso(`la solución ingenua #${i + 1} ya falla el ejemplo visible (la trampa queda menos escondida)`);
      }
    }
  } else if (ev?.kind === "code-tests") {
    if (reto.language !== "scala") err(`evaluación code-tests sin harness para ${reto.language}`);
    if (!ev.entrypoint?.trim()) err("falta entrypoint");
    const tests = ev.tests ?? [];
    const visibles = tests.filter((t) => !t.hidden);
    const ocultos = tests.filter((t) => t.hidden);
    if (visibles.length === 0) err("ningún test visible (el ejemplo del enunciado)");
    if (ocultos.length < 2) err("menos de dos tests ocultos");
    const nombres = tests.map((t) => t.name);
    if (new Set(nombres).size !== nombres.length) err("nombres de test repetidos");
    for (const t of ocultos) if (!t.trap?.es) err(`test oculto "${t.name}" sin trap.es`);
    for (const t of tests) if (!t.call?.trim() || !t.expected?.trim()) err(`test "${t.name}" sin call o expected`);
    if (!reto.starterCode?.includes(ev.entrypoint)) aviso(`el starterCode no menciona ${ev.entrypoint}`);

    if (errores.length === 0) {
      // Referencia, ingenuas y código inicial en una sola compilación. Si no
      // compila junto, se repite de a una para saber cuál es la que falla.
      const variantes = [
        { id: "ref", code: reto.solution.code },
        ...(reto.naiveSolutions ?? []).map((n, i) => ({ id: `naive${i + 1}`, code: n.code })),
        { id: "starter", code: reto.starterCode },
      ];
      let { error, results } = correrScala(variantes, tests);
      if (error) {
        results = [];
        for (const v of variantes) {
          const r = correrScala([v], tests);
          if (r.error) err(`${v.id}: ${r.error}`);
          results.push(...r.results);
        }
      }
      const de = (id) => results.filter((r) => r.variant === id);

      const ref = de("ref");
      if (ref.length > 0 || !error) {
        if (ref.length !== tests.length) err(`la referencia reportó ${ref.length} de ${tests.length} tests`);
        for (const r of ref) {
          if (!r.passed) err(`la referencia no pasa "${r.name}": ${r.error ?? `devolvió ${r.actual}, se esperaba ${r.expected}`}`);
        }
      }
      for (const [i] of (reto.naiveSolutions ?? []).entries()) {
        const rs = de(`naive${i + 1}`);
        if (rs.length === 0) continue;
        const porNombre = new Map(rs.map((r) => [r.name, r]));
        if (!ocultos.some((t) => porNombre.get(t.name)?.passed === false)) {
          err(`la solución ingenua #${i + 1} pasa todos los tests ocultos`);
        }
        if (visibles.some((t) => porNombre.get(t.name)?.passed === false)) {
          aviso(`la solución ingenua #${i + 1} ya falla el ejemplo visible (la trampa queda menos escondida)`);
        }
      }
      if (de("starter").some((r) => r.passed)) aviso("el starterCode ya pasa algún test");
    }
  } else {
    err(`evaluation.kind desconocido: ${ev?.kind}`);
  }

  const marca = errores.length ? "✗" : "✓";
  console.log(`${marca} ${carpeta} (${reto.difficulty}, ${reto.language})`);
  for (const m of errores) console.log(`    error: ${m}`);
  for (const m of avisos) console.log(`    aviso: ${m}`);
  totalErrores += errores.length;
}

await db?.close();

if (totalErrores > 0) {
  console.log(`\n${totalErrores} error(es).`);
  process.exit(1);
}
console.log(`\nTodo en orden (${carpetas.length} reto(s)).`);
