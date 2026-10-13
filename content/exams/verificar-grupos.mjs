// ---------------------------------------------------------------------------
// Verificador de los grupos de `/exams`. Se corre desde la raíz del repo:
//
//   node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/verificar-grupos.mjs
//
// Comprueba la correspondencia entre tres listas que se editan por separado y se
// desincronizan a la primera distracción:
//
//   1. las carpetas de examen que hay en disco,
//   2. las altas de `registry.ts`,
//   3. los `examSlugs` de `groups.ts`.
//
// Un slug mal escrito en un grupo no rompe nada visible: la prueba simplemente no
// aparece en la página del grupo, y nadie se enteraría hasta que un alumno la
// busque. Eso es justo lo que este script convierte en un error.
//
// Importa los `.ts` directamente —Node les quita los tipos al cargarlos— y por eso
// solo toca módulos hoja: `groups.ts` y los `configuracion.ts`, que no tienen más
// que `import type`. `registry.ts` **no** se puede importar (importa los manifests,
// que importan a sus vecinos sin extensión), así que de ese se lee el texto.
//
// Lo que no comprueba: que un grupo tenga sentido. Que la prueba de ingesta esté
// en el grupo del DEA-C01 y no en el de inglés no lo puede saber ningún script.

import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { EXAM_GROUPS, SEGMENTO_DE_GRUPOS } from "./groups.ts";

const AQUI = dirname(fileURLToPath(import.meta.url));

let problemas = 0;
const fallo = (msg) => {
  problemas++;
  console.log(`  *** ${msg}`);
};

/* --- lo que hay en disco -------------------------------------------------- */

const entradas = await readdir(AQUI, { withFileTypes: true });
const carpetas = entradas.filter((entrada) => entrada.isDirectory()).map((entrada) => entrada.name);

/** `{ carpeta, slug }` de cada examen que existe, leyendo su `configuracion.ts`. */
const examenes = [];

for (const carpeta of carpetas) {
  const configuracion = join(AQUI, carpeta, "configuracion.ts");

  try {
    await stat(configuracion);
  } catch {
    fallo(`la carpeta "${carpeta}" no tiene configuracion.ts, así que no se la puede verificar`);
    continue;
  }

  const modulo = await import(pathToFileURL(configuracion).href);
  if (!modulo.SLUG) {
    fallo(`${carpeta}/configuracion.ts no exporta SLUG`);
    continue;
  }
  if (modulo.SLUG !== carpeta) {
    // No es obligatorio para la app, pero cada verificador, cada README y cada
    // import se apoyan en que coincidan.
    fallo(`la carpeta "${carpeta}" declara el slug "${modulo.SLUG}"; tienen que coincidir`);
  }

  examenes.push({ carpeta, slug: modulo.SLUG });
}

const slugsDeExamen = new Set(examenes.map((examen) => examen.slug));
console.log(`\nExámenes en disco: ${examenes.length}`);

/* --- el alta en el registro ---------------------------------------------- */

const registro = await readFile(join(AQUI, "registry.ts"), "utf8");

for (const { carpeta } of examenes) {
  if (!registro.includes(`./${carpeta}/manifest`)) {
    fallo(`"${carpeta}" no está dado de alta en registry.ts: existe en disco y en ninguna parte`);
  }
}

/* --- los grupos ---------------------------------------------------------- */

console.log(`Grupos declarados: ${EXAM_GROUPS.length}`);

const slugsDeGrupo = new Set();
/** En qué grupo quedó cada prueba, para detectar las que están en dos. */
const grupoDeExamen = new Map();

for (const grupo of EXAM_GROUPS) {
  const nombre = grupo.slug || "(sin slug)";

  if (!grupo.slug?.trim()) {
    fallo("hay un grupo sin slug");
  } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(grupo.slug)) {
    fallo(`el slug "${grupo.slug}" no es kebab-case; es un segmento de URL`);
  } else if (slugsDeGrupo.has(grupo.slug)) {
    fallo(`el slug de grupo "${grupo.slug}" está repetido`);
  }
  slugsDeGrupo.add(grupo.slug);

  if (slugsDeExamen.has(grupo.slug)) {
    // Mecánicamente no choca —son dos mapas distintos y dos rutas distintas—,
    // pero sí choca en la cabeza de quien lea una tabla con una columna
    // `exam_slug` y encuentre ahí el nombre de un grupo.
    fallo(`el grupo "${grupo.slug}" usa el mismo slug que una prueba`);
  }

  if (!grupo.title?.es?.trim()) fallo(`el grupo "${nombre}" no tiene título en español`);
  if (!grupo.description?.es?.trim()) fallo(`el grupo "${nombre}" no tiene descripción en español`);

  for (const [locale, texto] of Object.entries(grupo.title ?? {})) {
    if (!texto?.trim()) fallo(`el título del grupo "${nombre}" está vacío en "${locale}"`);
  }
  for (const [locale, texto] of Object.entries(grupo.description ?? {})) {
    if (!texto?.trim()) fallo(`la descripción del grupo "${nombre}" está vacía en "${locale}"`);
  }

  if (!Array.isArray(grupo.examSlugs) || grupo.examSlugs.length === 0) {
    // Legal mientras se escribe la primera prueba, pero en la portada se ve una
    // tarjeta que no lleva a ninguna parte.
    console.log(`  aviso: el grupo "${nombre}" todavía no tiene ninguna prueba`);
    continue;
  }

  const vistos = new Set();
  for (const slug of grupo.examSlugs) {
    if (vistos.has(slug)) {
      fallo(`el grupo "${nombre}" lista "${slug}" dos veces`);
      continue;
    }
    vistos.add(slug);

    if (!slugsDeExamen.has(slug)) {
      fallo(`el grupo "${nombre}" lista "${slug}", que no existe bajo content/exams/`);
      continue;
    }

    const yaEstaba = grupoDeExamen.get(slug);
    if (yaEstaba) {
      fallo(`"${slug}" está en dos grupos: "${yaEstaba}" y "${nombre}"`);
      continue;
    }
    grupoDeExamen.set(slug, nombre);
  }

  console.log(`  ${nombre}: ${grupo.examSlugs.length} prueba(s)`);
}

/* --- las pruebas que quedaron afuera ------------------------------------- */

for (const { slug } of examenes) {
  if (!grupoDeExamen.has(slug)) {
    fallo(`"${slug}" no está en ningún grupo: la portada la muestra aparte, suelta`);
  }
}

/* --- el segmento reservado ----------------------------------------------- */

// La carpeta `src/app/[locale]/exams/groups/` gana por ser estática, así que una
// prueba con ese slug tendría su pantalla previa tapada por la de los grupos.
if (slugsDeExamen.has(SEGMENTO_DE_GRUPOS)) {
  fallo(`hay una prueba con el slug "${SEGMENTO_DE_GRUPOS}", que es el segmento de los grupos`);
}
for (const grupo of EXAM_GROUPS) {
  if (grupo.slug === SEGMENTO_DE_GRUPOS) {
    fallo(`hay un grupo con el slug "${SEGMENTO_DE_GRUPOS}", que ya es el segmento que lo contiene`);
  }
}

console.log(`\n${problemas === 0 ? "OK — sin problemas" : `${problemas} problema(s)`}`);
process.exit(problemas === 0 ? 0 : 1);
