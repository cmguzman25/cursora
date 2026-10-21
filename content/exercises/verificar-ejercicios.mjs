// ---------------------------------------------------------------------------
// Verificador de las listas de ejercicios prácticos. Se corre desde la raíz:
//
//   node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exercises/verificar-ejercicios.mjs
//
// Importa los `.ts` directamente —Node les quita los tipos— y por eso solo toca
// módulos hoja: los `configuracion.ts` y los `capitulo-*.ts` de cada lista, y
// `content/exams/groups.ts`. Ni `index.ts` ni `registry.ts` se pueden importar
// (importan a sus vecinos sin extensión); del registro se lee el texto.
//
// Mide forma, no verdad: que una resolución esté bien hecha no lo comprueba
// ningún script.

import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { EXAM_GROUPS } from "../exams/groups.ts";

const AQUI = dirname(fileURLToPath(import.meta.url));
const PUBLIC = join(AQUI, "..", "..", "public");

let problemas = 0;
const fallo = (msg) => {
  problemas++;
  console.log(`  *** ${msg}`);
};

// El Markdown no se renderiza: `**esto**` saldría con los asteriscos a la vista.
const MARKDOWN = /\*\*|__|^#|`/m;

const textoValido = (texto, donde) => {
  if (typeof texto !== "string" || !texto.trim()) {
    fallo(`${donde}: está vacío`);
    return;
  }
  if (MARKDOWN.test(texto)) fallo(`${donde}: tiene Markdown, que no se renderiza`);
};

const registro = await readFile(join(AQUI, "registry.ts"), "utf8");
const carpetas = (await readdir(AQUI, { withFileTypes: true }))
  .filter((entrada) => entrada.isDirectory())
  .map((entrada) => entrada.name);

const slugsEnDisco = new Set();

for (const carpeta of carpetas) {
  const base = join(AQUI, carpeta);
  const configuracion = await import(pathToFileURL(join(base, "configuracion.ts")).href);
  console.log(`\nlista ${carpeta}`);

  if (configuracion.SLUG !== carpeta) {
    fallo(`la carpeta "${carpeta}" declara el slug "${configuracion.SLUG}"; tienen que coincidir`);
  }
  slugsEnDisco.add(configuracion.SLUG);

  if (!registro.includes(`./${carpeta}"`)) {
    fallo(`"${carpeta}" no está dado de alta en registry.ts`);
  }

  textoValido(configuracion.TITULO?.es, "título");
  textoValido(configuracion.DESCRIPCION?.es, "descripción");

  const secciones = new Set(configuracion.SECCIONES.map((seccion) => seccion.id));
  const porSeccion = new Map([...secciones].map((id) => [id, 0]));

  // Cada capítulo exporta un único arreglo de ejercicios.
  const archivos = (await readdir(base)).filter((nombre) => /^capitulo-.*\.ts$/.test(nombre)).sort();
  const ejercicios = [];
  for (const archivo of archivos) {
    const modulo = await import(pathToFileURL(join(base, archivo)).href);
    const valores = Object.values(modulo);
    if (valores.length !== 1 || !Array.isArray(valores[0])) {
      fallo(`${archivo}: tiene que exportar un único arreglo de ejercicios`);
      continue;
    }
    ejercicios.push(...valores[0]);
  }

  const vistos = new Set();
  for (const ejercicio of ejercicios) {
    const id = ejercicio.id ?? "(sin id)";

    if (!/^c\d+-(n\d|folha)-[0-9]+[a-z]?$/.test(id)) fallo(`${id}: el id no sigue la forma c<cap>-n<nivel>-<número>`);
    if (vistos.has(id)) fallo(`${id}: id repetido`);
    vistos.add(id);

    if (!secciones.has(ejercicio.section)) {
      fallo(`${id}: la sección "${ejercicio.section}" no está declarada`);
    } else {
      porSeccion.set(ejercicio.section, porSeccion.get(ejercicio.section) + 1);
    }

    textoValido(ejercicio.label, `${id} / label`);
    textoValido(ejercicio.prompt, `${id} / enunciado`);
    textoValido(ejercicio.answer, `${id} / respuesta`);
    if (ejercicio.note !== undefined) textoValido(ejercicio.note, `${id} / nota`);

    // La solución explica paso a paso: una respuesta sola no enseña cómo se llega.
    if (!Array.isArray(ejercicio.steps) || ejercicio.steps.length === 0) {
      fallo(`${id}: no tiene pasos de resolución`);
    }
    (ejercicio.steps ?? []).forEach((paso, i) => {
      textoValido(paso.text, `${id} / paso ${i + 1}`);
      (paso.work ?? []).forEach((linea, j) => textoValido(linea, `${id} / paso ${i + 1} / cuenta ${j + 1}`));
    });

    if (ejercicio.image) {
      const { src, alt, width, height } = ejercicio.image;
      textoValido(alt, `${id} / alt de la figura`);
      if (!(width > 0 && height > 0)) fallo(`${id}: figura sin ancho y alto`);
      if (!/^\/exercises\/[a-z0-9-]+\/[a-z0-9-]+\.png$/.test(src ?? "")) {
        fallo(`${id}: src de figura inesperado (${src})`);
      } else if (!existsSync(join(PUBLIC, src))) {
        fallo(`${id}: no está el archivo public${src}`);
      }
    }
  }

  for (const [seccion, cuenta] of porSeccion) {
    if (cuenta === 0) fallo(`la sección "${seccion}" no tiene ejercicios`);
    console.log(`  ${seccion}: ${cuenta} ejercicios`);
  }
  console.log(`  total ${ejercicios.length} | con figura ${ejercicios.filter((e) => e.image).length}`);
}

/* --- los grupos ---------------------------------------------------------- */

const enGrupo = new Map();
for (const grupo of EXAM_GROUPS) {
  for (const slug of grupo.exerciseSetSlugs ?? []) {
    if (!slugsEnDisco.has(slug)) fallo(`el grupo "${grupo.slug}" lista "${slug}", que no existe bajo content/exercises/`);
    if (enGrupo.has(slug)) fallo(`"${slug}" está en dos grupos`);
    enGrupo.set(slug, grupo.slug);
  }
}
for (const slug of slugsEnDisco) {
  if (!enGrupo.has(slug)) fallo(`"${slug}" no está en ningún grupo: nadie llega a su página`);
}

console.log(`\n${problemas === 0 ? "OK — sin problemas" : `${problemas} problema(s)`}`);
process.exit(problemas === 0 ? 0 : 1);
