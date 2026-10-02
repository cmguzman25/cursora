// Verificador de las lecciones Markdown de aws-cloud-practitioner, contra las
// reglas de CONTRATO-DE-CLASES.md. Se corre desde la raíz del repo:
//
//   node content/courses/aws-cloud-practitioner/verificar-lecciones.mjs
//
// Sale con código 1 si encuentra algo, así que sirve en un hook o en CI.
//
// Solo revisa `*.es.md`. Las traducciones (`00-bienvenida.en.md`,
// `.pt-BR.md`) tienen los títulos de sección traducidos, así que casi todas
// estas reglas no aplican tal cual; verificarlas pide su propio juego de
// encabezados por idioma y todavía no hay suficientes traducciones para que
// valga la pena.

import fs from "node:fs";
import path from "node:path";

const base = "content/courses/aws-cloud-practitioner";
const dir = path.join(base, "lecciones");

// El contrato pide 800-1500 palabras de contenido, pero ese número no es
// aplicable como está: contando solo la sección de Contenido, seis lecciones
// quedan por debajo de 800, y contando el archivo entero la lección 4.1 se
// pasa de 1500. Estos rangos son sobre el archivo completo y están calibrados
// contra lo que las lecciones realmente hacen hoy, que es la única definición
// de "largo normal" que el curso tiene de verdad.
const RANGO_NORMAL = [900, 1700];
const RANGO_COMPARATIVA = [700, 1450];

const SECCIONES = [
  "## 🤔 Antes de empezar",
  "## 📘 Contenido",
  "## 💬 Ahora te toca a ti",
  "## 🎯 Pistas para el examen",
];

const NOMBRES_DE_SECCION = "Antes de empezar|Contenido|Ahora te toca a ti|Pistas para el examen";

// El pie fijo de cada pregunta de la sección 3. Está en tuteo mientras el
// resto del curso usa voseo: es una cadena congelada por formato, idéntica en
// las 31 lecciones, y cambiarla ahora rompería la comparación en todas.
const LINEA_INTENTA = "*Intenta responderla con tus palabras antes de seguir.*";

// Formas de tuteo que delatan que una lección se escribió en segunda persona
// de España en vez del voseo del resto del curso. Ojo: `estás`, `ves` y `vas`
// son iguales en voseo y en tuteo, así que no sirven como señal.
const TUTEO =
  /\b(crees|tienes|puedes|quieres|sabes|necesitas|haces|dices|imaginas|piensas|prefieres|entiendes|recuerdas|conectas|eliges|debes)\b/gi;

let problemas = 0;
const fallo = (msg) => {
  problemas++;
  console.log(`  *** ${msg}`);
};

const normalizar = (s) => s.replace(/\s+/g, " ").trim();

const contarPalabras = (raw) =>
  raw
    .replace(/^#+\s*/gm, "")
    .replace(/[|>*_`-]/g, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

const archivos = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".es.md"))
  .sort();

for (const file of archivos) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const lineas = raw.split("\n");
  console.log(`\n${file}`);

  const esComparativa = /★/.test(lineas[0] ?? "");

  // --- largo -------------------------------------------------------------
  const palabras = contarPalabras(raw);
  const [min, max] = esComparativa ? RANGO_COMPARATIVA : RANGO_NORMAL;
  console.log(`  palabras ${palabras}${esComparativa ? " (★)" : ""}`);
  if (palabras < min || palabras > max) fallo(`fuera de rango ${min}-${max}`);

  // --- cabecera ----------------------------------------------------------
  // Línea 1: "# 2.4a — Título", con ★ opcional. Línea 2 en blanco. Línea 3:
  // la cita que ubica la lección en su dominio o módulo.
  if (!/^# (★ )?\d+\.\d+[ab]? — .+$/.test(lineas[0] ?? "")) {
    fallo(`la línea 1 no es un título con la forma "# N.N — Título"`);
  }
  if ((lineas[1] ?? "").trim() !== "") fallo(`la línea 2 debería estar en blanco`);

  const cita = lineas[2] ?? "";
  const citasValidas = [
    /^> Dominio \d+ · Task Statement \d+\.\d+ — .+$/,
    /^> Dominio \d+ · Cierre de módulo — .+$/,
    /^> Módulo \d+ · .+$/,
  ];
  if (!citasValidas.some((re) => re.test(cita))) {
    fallo(`la línea 3 no es una cita de ubicación reconocida: ${cita.slice(0, 60)}`);
  }

  // --- las cuatro secciones, exactas y en orden --------------------------
  let ordenOk = true;
  let anterior = -1;
  for (const seccion of SECCIONES) {
    const apariciones = lineas.filter((l) => l.trimEnd() === seccion).length;
    if (apariciones === 0) {
      fallo(`falta la sección "${seccion}"`);
      ordenOk = false;
      continue;
    }
    if (apariciones > 1) fallo(`la sección "${seccion}" aparece ${apariciones} veces`);
    const pos = lineas.findIndex((l) => l.trimEnd() === seccion);
    if (pos < anterior) {
      fallo(`la sección "${seccion}" está fuera de orden`);
      ordenOk = false;
    }
    anterior = pos;
  }

  const otrosH2 = lineas.filter((l) => /^## /.test(l) && !SECCIONES.includes(l.trimEnd()));
  otrosH2.forEach((l) => fallo(`sección de nivel 2 inesperada: ${l.trim()}`));

  if (ordenOk) {
    // --- la sección de contenido cierra con un resumen -------------------
    const contenido = raw.split(SECCIONES[1])[1]?.split("\n## ")[0] ?? "";
    if (!/\*\*En resumen:\*\*/.test(contenido)) {
      fallo(`la sección de Contenido no cierra con "**En resumen:**"`);
    }

    // --- preguntas idénticas entre la sección 1 y la 3 -------------------
    // Es el punto que el propio contrato pone en su lista de autochequeo, y
    // el que más fácil se rompe: basta reescribir una pregunta en un lado.
    const antes = raw.split(SECCIONES[0])[1]?.split("\n## ")[0] ?? "";
    const qA = [...antes.matchAll(/^-\s+(.+(?:\n {2}.+)*)/gm)].map((m) => normalizar(m[1]));

    const despues = raw.split(SECCIONES[2])[1]?.split("\n## ")[0] ?? "";
    const bloques = [...despues.matchAll(/\*\*Pregunta:\*\*([\s\S]*?)(?=\n\s*\n|$)/g)];
    const qB = bloques.map((m) => normalizar(m[1]));

    if (qA.length < 2 || qA.length > 4) {
      fallo(`"Antes de empezar" tiene ${qA.length} preguntas; el contrato pide entre 2 y 4`);
    }
    if (qA.length !== qB.length) {
      fallo(`${qA.length} preguntas en la sección 1 contra ${qB.length} en la sección 3`);
    } else {
      qA.forEach((q, i) => {
        if (q !== qB[i]) {
          fallo(`la pregunta ${i + 1} no es idéntica:\n      §1: ${q}\n      §3: ${qB[i]}`);
        }
      });
    }

    // Cada pregunta de la sección 3 lleva su pie fijo y su respuesta.
    const pies = despues.split(LINEA_INTENTA).length - 1;
    const respuestas = (despues.match(/\*\*Respuesta sugerida:\*\*/g) ?? []).length;
    if (qB.length > 0 && pies !== qB.length) {
      fallo(`${qB.length} preguntas pero ${pies} veces la línea "Intenta responderla..."`);
    }
    if (qB.length > 0 && respuestas !== qB.length) {
      fallo(`${qB.length} preguntas pero ${respuestas} respuestas sugeridas`);
    }

    // --- pistas para el examen -------------------------------------------
    const pistas = raw.split(SECCIONES[3])[1] ?? "";
    const viñetas = [...pistas.matchAll(/^-\s+/gm)].length;
    if (viñetas < 3 || viñetas > 5) {
      fallo(`"Pistas para el examen" tiene ${viñetas} viñetas; el contrato pide entre 3 y 5`);
    }
  }

  // --- tono --------------------------------------------------------------
  const cuerpo = raw.replace(/^#.*$/gm, "").replace(/^>.*$/gm, "");

  if (/[!¡]/.test(cuerpo)) fallo(`signo de exclamación en el cuerpo`);

  // El pie fijo de cada pregunta está congelado en tuteo por formato, así que
  // no cuenta para esta regla.
  const cuerpoSinPieFijo = cuerpo.split(LINEA_INTENTA).join(" ");
  const tuteo = [...cuerpoSinPieFijo.matchAll(TUTEO)].map((m) => m[0]);
  if (tuteo.length) {
    fallo(`tuteo donde el curso usa voseo: ${[...new Set(tuteo)].join(", ")}`);
  }

  // --- fidelidad ---------------------------------------------------------
  [
    ...raw.matchAll(/`?(COBERTURA\.md|CONTRATO-DE-CLASES\.md|manifest\.ts|README\.md|verificar-lecciones\.mjs)`?/g),
  ].forEach((m) => fallo(`referencia a un archivo interno del repo: ${m[1]}`));

  // --- emoji solo en títulos ---------------------------------------------
  // Excepción deliberada: la lección 0.1 enumera las cuatro secciones del
  // curso en prosa, y nombrarlas sin su emoji las volvería irreconocibles.
  const emoji = /\p{Extended_Pictographic}/u;
  const nombraSeccion = new RegExp(`\\*\\*\\s*\\p{Extended_Pictographic}\\s*(${NOMBRES_DE_SECCION})\\s*\\*\\*`, "u");
  lineas.forEach((l, i) => {
    if (l.startsWith("#") || l.startsWith(">")) return;
    if (!emoji.test(l)) return;
    if (nombraSeccion.test(l)) return;
    fallo(`emoji fuera de un título (línea ${i + 1}): ${l.trim().slice(0, 60)}`);
  });
}

// --- el manifiesto y los archivos tienen que coincidir ---------------------
// Esto es lo que detecta el caso de una lección declarada en el manifiesto sin
// `kind` y sin archivo: la app la muestra en el índice del curso y después
// renderiza el cartel de "todavía no está lista".
console.log("\nmanifest.ts");
const manifest = fs.readFileSync(path.join(base, "manifest.ts"), "utf8");
const enManifest = [...manifest.matchAll(/\{\s*id:\s*"([^"]+)"[^\n]*/g)].map((m) => ({
  id: m[1],
  interactiva: /kind:\s*"(quiz|exam)"/.test(m[0]),
}));

if (enManifest.length === 0) fallo(`no pude leer ninguna lección del manifiesto`);

for (const { id, interactiva } of enManifest) {
  const existe = archivos.includes(`${id}.es.md`);
  if (interactiva && existe) {
    fallo(`${id} está marcada como interactiva pero igual tiene un .es.md`);
  }
  if (!interactiva && !existe) {
    fallo(`${id} está en el manifiesto sin kind y no tiene lecciones/${id}.es.md`);
  }
}

const idsManifest = new Set(enManifest.map((l) => l.id));
for (const file of archivos) {
  const id = file.replace(/\.es\.md$/, "");
  if (!idsManifest.has(id)) fallo(`lecciones/${file} no está declarada en el manifiesto`);
}
console.log(`  ${enManifest.length} lecciones declaradas | ${archivos.length} archivos en español`);

// --- el README es el índice vivo, así que su cuenta tiene que dar ----------
console.log("\nREADME.md");
const readme = fs.readFileSync(path.join(base, "README.md"), "utf8");
const marcadas = (readme.match(/^- \[x\]/gm) ?? []).length;
const sinMarcar = (readme.match(/^- \[ \]/gm) ?? []).length;
const declarado = readme.match(/\*\*(\d+)\s*\/\s*(\d+) lecciones desarrolladas\.\*\*/);

if (!declarado) {
  fallo(`no encontré la línea "**N / M lecciones desarrolladas.**"`);
} else {
  const [, hechas, total] = declarado.map(Number);
  if (Number(total) !== enManifest.length) {
    fallo(`el README dice ${total} lecciones en total y el manifiesto tiene ${enManifest.length}`);
  }
  if (Number(hechas) !== marcadas) {
    fallo(`el README dice ${hechas} desarrolladas y tiene ${marcadas} casillas marcadas`);
  }
}
console.log(`  ${marcadas} marcadas | ${sinMarcar} sin marcar`);

console.log(`\n${problemas === 0 ? "OK — sin problemas" : `${problemas} problema(s)`}`);
process.exit(problemas === 0 ? 0 : 1);
