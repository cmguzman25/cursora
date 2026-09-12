import fs from "node:fs";
import path from "node:path";

/**
 * Verifica lo que se puede medir sin criterio, según `CONTRATO-DE-CLASES.md`.
 * Lo que exige leer (que la clase enseñe una sola idea, que el código compile,
 * que el fallo listado ocurra de verdad) sigue en la checklist manual de la
 * sección 18 del contrato.
 *
 *   node content/courses/videojuego-rts-unity/verificar-lecciones.mjs
 */

const dir = "content/courses/videojuego-rts-unity/lecciones";

const SECCIONES = {
  A: [
    "🎯 Qué vas a lograr hoy",
    "🧠 Antes de empezar",
    "📐 La idea",
    "🛠️ Manos a la obra",
    "🤖 Pídelo a Claude Code",
    "▶️ Compruébalo",
    "🧯 Si algo se rompe",
    "🔁 Repaso relámpago",
    "🎒 Tu turno",
  ],
  B: [
    "🎯 De qué va esta clase",
    "🧠 Antes de empezar",
    "📖 Contenido",
    "🗺️ Cómo encaja en el juego",
    "🔁 Repaso relámpago",
    "🎒 Qué hacer hoy",
  ],
};

// Unidades de lectura por minuto: el rango que el contrato da por válido.
const UNIDADES_POR_MINUTO = { min: 150, max: 190 };
// Una línea de código cuesta leerla como unas diez palabras de prosa.
const PESO_LINEA_CODIGO = 10;
const MINUTOS_VALIDOS = [8, 9, 10];

const MAX_LINEAS_POR_BLOQUE = 25;
const MAX_LINEAS_DE_PROGRAMA = 60;
// Lenguajes que cuentan para el tope de 60 líneas: los bloques ```text son
// diagramas y prompts, pesan para el tiempo de lectura pero no son programa.
const LENGUAJES_DE_PROGRAMA = new Set(["csharp", "cs", "python", "json", "bash", "shell"]);

const PALABRAS_PROHIBIDAS =
  /\b(es f[áa]cil|simplemente|obviamente|basta con|sencillamente|como ya sabes|solo tienes que|no tiene ning[úu]n misterio)\b/gi;

const MAX_PALABRAS_POR_FRASE = 20;
const MAX_PROMEDIO_POR_FRASE = 18;

let problemas = 0;
const fallo = (msg) => {
  problemas++;
  console.log(`  *** ${msg}`);
};

if (!fs.existsSync(dir)) {
  console.log(`No existe ${dir} todavía — nada que verificar.`);
  process.exit(0);
}

const archivos = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .sort();

if (archivos.length === 0) {
  console.log(`${dir} está vacío — nada que verificar.`);
  process.exit(0);
}

/** Separa los bloques cercados del resto del texto. */
function separarCodigo(raw) {
  const bloques = [];
  const prosa = raw.replace(/^```([^\n]*)\n([\s\S]*?)^```[ \t]*$/gm, (_, info, cuerpo) => {
    bloques.push({
      lenguaje: info.trim().toLowerCase(),
      lineas: cuerpo.split("\n").filter((l) => l.trim() !== ""),
      cuerpo,
    });
    return "\n";
  });
  return { bloques, prosa };
}

/** Palabras reales de prosa: sin marcas de markdown y sin tuberías de tabla. */
function contarPalabras(prosa) {
  return prosa
    .replace(/^#+\s*/gm, "")
    .replace(/`[^`]*`/g, " ")
    .replace(/^\s*\|[\s|:-]+\|\s*$/gm, " ")
    .replace(/[|>*_`-]/g, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

/** Solo los párrafos: las tablas, listas, citas y títulos no son frases. */
function frasesDeParrafo(prosa) {
  const parrafos = prosa
    .split("\n")
    .filter((l) => {
      const t = l.trim();
      if (t === "") return false;
      // Una línea sangrada es la continuación de un elemento de lista, no un párrafo.
      if (/^\s/.test(l)) return false;
      return !/^[#>|]/.test(t) && !/^([-*+]|\d+\.)\s/.test(t) && !/^\[\s*[ x]\s*\]/.test(t);
    })
    .join(" ")
    .replace(/`[^`]*`/g, "X")
    .replace(/\*\*|\*|_/g, "");

  return parrafos
    .split(/(?<=[.!?:])\s+(?=[A-ZÁÉÍÓÚÑ¿¡"«])/)
    .map((f) => f.trim())
    .filter((f) => f.length > 0);
}

for (const file of archivos) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  console.log(`\n${file}`);

  // 1. Nombre, título y cabecera --------------------------------------------
  const nombreOk = /^(\d{2})-(\d{2})-[a-z0-9-]+\.es\.md$/.exec(file);
  if (!nombreOk) fallo(`el nombre no sigue el patrón MM-CC-slug-corto.es.md`);

  const lineas = raw.split("\n");
  const titulo = lineas[0] ?? "";

  if (titulo.trim() === "---") fallo(`el archivo empieza con frontmatter, y la app lo imprimiría tal cual`);

  const tituloOk = /^# (\d+)\.(\d+) — .+/.exec(titulo);
  if (!tituloOk) fallo(`el título no tiene el formato "# M.C — Título de la clase"`);

  const cabecera = /^> Módulo (\d+) · (.+) · Clase (\d+) de (\d+) · ⏱️ (\d+) min de lectura$/m.exec(raw);
  if (!cabecera) {
    fallo(`la cabecera no tiene el formato "> Módulo M · Nombre · Clase C de N · ⏱️ NN min de lectura"`);
  }

  // El número de módulo y de clase dice lo mismo en los tres sitios
  if (nombreOk && tituloOk) {
    if (Number(nombreOk[1]) !== Number(tituloOk[1]) || Number(nombreOk[2]) !== Number(tituloOk[2])) {
      fallo(`el nombre del archivo (${nombreOk[1]}.${nombreOk[2]}) y el título (${tituloOk[1]}.${tituloOk[2]}) no coinciden`);
    }
  }
  if (nombreOk && cabecera) {
    if (Number(nombreOk[1]) !== Number(cabecera[1]) || Number(nombreOk[2]) !== Number(cabecera[3])) {
      fallo(`la cabecera dice módulo ${cabecera[1]}, clase ${cabecera[3]}, y el archivo es ${nombreOk[1]}.${nombreOk[2]}`);
    }
  }
  if (cabecera && Number(cabecera[3]) > Number(cabecera[4])) {
    fallo(`la cabecera dice "Clase ${cabecera[3]} de ${cabecera[4]}"`);
  }

  // 2. Tipo de clase ---------------------------------------------------------
  // Las secciones se buscan en la prosa, no en el texto crudo: una clase puede
  // enseñar un archivo Markdown dentro de un bloque, y sus "##" no son secciones.
  const { bloques, prosa } = separarCodigo(raw);
  const presentes = [...prosa.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  const tipo = presentes[0] === SECCIONES.B[0] ? "B" : "A";

  // 3. Peso de lectura -------------------------------------------------------
  const palabras = contarPalabras(prosa);
  const lineasCodigo = bloques.reduce((n, b) => n + b.lineas.length, 0);
  const peso = palabras + lineasCodigo * PESO_LINEA_CODIGO;
  const declarado = cabecera ? Number(cabecera[5]) : 0;

  console.log(
    `  tipo ${tipo} | prosa ${palabras} pal | código ${lineasCodigo} líneas | peso ${peso} | declara ${declarado} min`,
  );

  if (!MINUTOS_VALIDOS.includes(declarado)) {
    fallo(`declara ${declarado} min, y solo valen ${MINUTOS_VALIDOS.join(", ")}`);
  } else {
    const min = declarado * UNIDADES_POR_MINUTO.min;
    const max = declarado * UNIDADES_POR_MINUTO.max;
    if (peso < min || peso > max) {
      fallo(`el peso ${peso} está fuera del rango ${min}-${max} para ${declarado} min`);
    }
  }

  // 4. Secciones exactas y en orden ------------------------------------------
  const esperadas = SECCIONES[tipo];
  if (presentes.join(" | ") !== esperadas.join(" | ")) {
    fallo(`las secciones no coinciden con el tipo ${tipo}`);
    console.log(`      esperadas: ${esperadas.join(" | ")}`);
    console.log(`      están:     ${presentes.join(" | ") || "(ninguna)"}`);
  }

  // 5. Bloques de código -----------------------------------------------------
  let lineasDePrograma = 0;
  for (const bloque of bloques) {
    if (bloque.lenguaje === "") fallo(`hay un bloque de código sin lenguaje declarado`);
    if (bloque.lineas.length > MAX_LINEAS_POR_BLOQUE) {
      fallo(`un bloque tiene ${bloque.lineas.length} líneas y el máximo es ${MAX_LINEAS_POR_BLOQUE}`);
    }
    if (LENGUAJES_DE_PROGRAMA.has(bloque.lenguaje)) {
      lineasDePrograma += bloque.lineas.length;
      if (/^\s*(\/\/|#)\s*\.\.\.\s*$/m.test(bloque.cuerpo)) {
        fallo(`un bloque usa "// ..." de relleno en vez de mostrar el código completo`);
      }
    }
  }
  if (lineasDePrograma > MAX_LINEAS_DE_PROGRAMA) {
    fallo(`${lineasDePrograma} líneas de programa, y el máximo por clase es ${MAX_LINEAS_DE_PROGRAMA}`);
  }

  // 6. Lo que el renderizador no soporta -------------------------------------
  [...prosa.matchAll(/<(details|summary|br|audio|img|div|span|iframe|table|p|b|i)\b/gi)].forEach((m) =>
    fallo(`etiqueta HTML no soportada: <${m[1]}>`),
  );
  if (/!\[[^\]]*\]\(/.test(prosa)) fallo(`hay una imagen, y las clases no pueden llevarlas`);

  // Emojis fuera de los títulos (❌ y ✅ sí se permiten en el cuerpo)
  const emoji = /\p{Extended_Pictographic}/u;
  prosa.split("\n").forEach((l, i) => {
    if (l.startsWith("#") || l.startsWith(">")) return;
    if (emoji.test(l.replace(/[❌✅]/g, ""))) {
      fallo(`emoji fuera de un título (línea ${i + 1}): ${l.trim().slice(0, 60)}`);
    }
  });

  // 7. Tono y redacción ------------------------------------------------------
  const cuerpo = prosa.replace(/^#.*$/gm, "").replace(/^>.*$/gm, "");
  [...cuerpo.matchAll(PALABRAS_PROHIBIDAS)].forEach((m) => fallo(`palabra prohibida: "${m[0]}"`));

  // Una exclamación por sección como máximo (la prosa, no el código)
  prosa.split(/^## /m).forEach((bloque, i) => {
    const exclamaciones = (bloque.match(/!/g) ?? []).length;
    if (exclamaciones > 1) fallo(`${exclamaciones} exclamaciones en la sección ${i} (el máximo es 1)`);
  });

  const frases = frasesDeParrafo(cuerpo);
  if (frases.length > 0) {
    const largos = frases.map((f) => f.split(/\s+/).filter(Boolean).length);
    const promedio = largos.reduce((a, b) => a + b, 0) / largos.length;
    console.log(`  frases: ${frases.length} | promedio ${promedio.toFixed(1)} palabras`);
    frases.forEach((f, i) => {
      if (largos[i] > MAX_PALABRAS_POR_FRASE) {
        fallo(`frase de ${largos[i]} palabras (el máximo es ${MAX_PALABRAS_POR_FRASE}): ${f.slice(0, 70)}…`);
      }
    });
    if (promedio > MAX_PROMEDIO_POR_FRASE) {
      fallo(`el promedio de frase es ${promedio.toFixed(1)} y el máximo es ${MAX_PROMEDIO_POR_FRASE}`);
    }
  }

  // 8. Repaso relámpago ------------------------------------------------------
  const repaso = prosa.split("## 🔁 Repaso relámpago")[1]?.split("\n## ")[0] ?? "";
  if (repaso === "") {
    fallo(`falta la sección "🔁 Repaso relámpago"`);
  } else {
    const preguntas = [...repaso.matchAll(/^\s*\d+\.\s+\S/gm)].length;
    if (preguntas !== 4) fallo(`el repaso relámpago tiene ${preguntas} preguntas y el contrato pide 4`);
    if (!/\*\*Respuestas:?\*\*/.test(repaso)) fallo(`el repaso relámpago no trae su bloque de respuestas`);
  }

  // 9. Referencias a archivos internos del repositorio ------------------------
  [...raw.matchAll(/`?(CONTRATO-DE-CLASES\.md|manifest\.ts|registry\.ts|README\.md|preguntas\/)`?/g)].forEach((m) =>
    fallo(`referencia a un archivo interno del repositorio: ${m[1]}`),
  );
}

console.log(`\n${problemas === 0 ? "OK — sin problemas" : `${problemas} problema(s)`}`);
process.exit(problemas === 0 ? 0 : 1);
