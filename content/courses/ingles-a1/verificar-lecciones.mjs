import fs from "node:fs";
import path from "node:path";

/**
 * Verifica lo que se puede medir sin leer, según `CONTRATO-DE-CLASES.md`.
 * Lo que exige criterio (que el diálogo sea verosímil, que el vocabulario sea
 * de alta frecuencia, que no se haya colado gramática de A2) sigue en la
 * checklist manual de la sección 13 del contrato.
 *
 *   node content/courses/ingles-a1/verificar-lecciones.mjs
 */

const dir = "content/courses/ingles-a1/lecciones";

const SECCIONES = {
  A: [
    "🎯 Al terminar vas a poder",
    "👂 Míralo en contexto",
    "🧩 Cómo funciona",
    "🗣️ Tus frases de hoy",
    "🔊 Cómo suena",
    "⚠️ Ojo, que en español no es así",
    "✍️ Practica",
    "🔁 Repaso relámpago",
    "🎒 Tu misión",
  ],
  B: [
    "📊 Toda la unidad en tablas",
    "🔁 Las 20 frases de la unidad",
    "⚠️ Los errores que más se repiten",
    "🎯 ¿Ya lo tienes?",
  ],
  D: ["🎯 De qué va esta clase", "📖 Contenido", "🎒 Qué hacer hoy"],
};

// palabras / tiempo declarado en la cabecera, por tipo de clase
const RANGOS = {
  A: { min: 1100, max: 1800, minutos: 20 },
  B: { min: 700, max: 1200, minutos: 15 },
  D: { min: 800, max: 1400, minutos: 10 },
};

// Clases de orientación (tipo D): la unidad 0 entera y el cierre del curso.
const esOrientacion = (file) => file.startsWith("00-") || file.startsWith("12-08-");

let problemas = 0;
const fallo = (msg) => {
  problemas++;
  console.log(`  *** ${msg}`);
};

if (!fs.existsSync(dir)) {
  console.log(`No existe ${dir} todavía — nada que verificar.`);
  process.exit(0);
}

const archivos = fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort();
if (archivos.length === 0) {
  console.log(`${dir} está vacío — nada que verificar.`);
  process.exit(0);
}

for (const file of archivos) {
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  console.log(`\n${file}`);

  if (!/^\d{2}-\d{2}-[a-z0-9-]+\.es\.md$/.test(file)) {
    fallo(`el nombre no sigue el patrón UU-CC-slug-corto.es.md`);
  }

  const titulo = raw.split("\n")[0];
  const tipo = esOrientacion(file) ? "D" : /★/.test(titulo) ? "B" : "A";
  const { min, max, minutos } = RANGOS[tipo];

  const words = raw
    .replace(/^#+\s*/gm, "")
    .replace(/\]\(say:[^)]*\)/g, "]") // las marcas de audio no son texto que se lea
    .replace(/[|>*_`-]/g, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  const declarado = Number(raw.match(/⏱️\s*(\d+)\s*min/)?.[1] ?? 0);

  console.log(`  tipo ${tipo} | palabras ${words} | declara ${declarado} min`);
  if (words < min || words > max) fallo(`fuera del rango ${min}-${max} palabras del tipo ${tipo}`);
  if (declarado !== minutos) fallo(`el tipo ${tipo} declara siempre ${minutos} min, no ${declarado}`);

  // Cabecera: > Unidad N · Nombre de la unidad · Semana N · ⏱️ NN min
  if (!/^> Unidad \d+ · .+ · Semana \d+(–\d+)? · ⏱️ \d+ min$/m.test(raw)) {
    fallo(`la cabecera no tiene el formato "> Unidad N · Nombre · Semana N · ⏱️ NN min"`);
  }
  if (!/^# \d+\.\d+ — .+/.test(titulo)) fallo(`el título no empieza por "# U.C — "`);

  // Las secciones obligatorias, en orden y sin extras
  const presentes = [...raw.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim());
  const esperadas = SECCIONES[tipo];
  const opcionales = file.startsWith("00-03-") ? ["🔊 Cómo suena"] : [];
  const filtradas = presentes.filter((s) => !opcionales.includes(s));
  if (filtradas.join(" | ") !== esperadas.join(" | ")) {
    fallo(`las secciones no coinciden con el tipo ${tipo}`);
    console.log(`      esperadas: ${esperadas.join(" | ")}`);
    console.log(`      están:     ${filtradas.join(" | ") || "(ninguna)"}`);
  }

  if (tipo === "A") {
    // Tabla de vocabulario: entre 8 y 12 palabras nuevas
    const frases = raw.split("## 🗣️ Tus frases de hoy")[1]?.split("\n## ")[0] ?? "";
    const filas = frases
      .split("\n")
      .filter((l) => l.trim().startsWith("|") && !/^\s*\|[\s|:-]+\|\s*$/.test(l));
    const vocab = Math.max(0, filas.length - 1); // menos la fila de cabecera
    console.log(`  vocabulario nuevo: ${vocab} palabras`);
    if (vocab < 8 || vocab > 12) fallo(`la tabla de vocabulario tiene ${vocab} filas, y el contrato pide entre 8 y 12`);
    if (filas.length && !/\|\s*Palabra\s*\|\s*Suena\s*\|\s*Significa\s*\|\s*Ejemplo\s*\|/.test(frases)) {
      fallo(`la tabla de vocabulario no tiene las columnas Palabra | Suena | Significa | Ejemplo`);
    }

    // El diálogo va en tabla, una línea por turno: en cita se renderiza como un
    // párrafo corrido en cursiva y no hay quien lo lea.
    const contexto = raw.split("## 👂 Míralo en contexto")[1]?.split("\n## ")[0] ?? "";
    const turnos = contexto.split("\n").filter((l) => l.trim().startsWith("|")).length;
    const esTextoCorto = /^>\s+\S/m.test(contexto);
    if (!esTextoCorto && turnos === 0) {
      fallo(`el diálogo no está en tabla (columnas "Quién | Dice")`);
    }

    // Audio: altavoces donde toca y en ningún otro sitio
    const altavoces = (t) => (t.match(/\]\(say:/g) ?? []).length;
    if (altavoces(contexto) === 0) fallo(`el diálogo no tiene altavoces (say:)`);
    if (altavoces(frases) < 8) {
      fallo(`la sección de frases tiene ${altavoces(frases)} altavoces, y hacen falta al menos 8`);
    }

    // Practica: los tres peldaños y las soluciones
    const practica = raw.split("## ✍️ Practica")[1]?.split("\n## ")[0] ?? "";
    for (const peldano of ["### A. Reconoce", "### B. Completa", "### C. Produce", "### ✅ Soluciones"]) {
      if (!practica.includes(peldano)) fallo(`falta "${peldano}" dentro de Practica`);
    }
    if (altavoces(practica) > 0) {
      fallo(`hay altavoces en los ejercicios: ahí el alumno tiene que producir, no escuchar`);
    }

    // Un say: con texto explícito y espacios sin escapar rompe el enlace
    [...raw.matchAll(/\]\(say:([^)]*)\)/g)].forEach((m) => {
      if (/\s/.test(m[1])) fallo(`el altavoz "say:${m[1]}" lleva espacios sin escapar (usa %20)`);
    });

    // Repaso relámpago: cinco preguntas (2 + 2 + 1)
    const repaso = raw.split("## 🔁 Repaso relámpago")[1]?.split("\n## ")[0] ?? "";
    const items = [...repaso.matchAll(/^\s*(?:\d+\.|[-*])\s+\S/gm)].length;
    if (items !== 5) fallo(`el repaso relámpago tiene ${items} preguntas y el contrato pide 5`);
    if (!/\*\*Respuestas:?\*\*/.test(repaso)) fallo(`el repaso relámpago no trae sus respuestas`);
  }

  // Tono: palabras que hacen sentir torpe al alumno
  const cuerpo = raw.replace(/^#.*$/gm, "").replace(/^>.*$/gm, "");
  const prohibidas = /\b(es f[áa]cil|simplemente|obviamente|basta con|sencillamente|como ya sabes)\b/gi;
  [...cuerpo.matchAll(prohibidas)].forEach((m) => fallo(`palabra prohibida: "${m[0]}"`));

  // Una exclamación por sección como máximo
  raw.split(/^## /m).forEach((bloque, i) => {
    const exclamaciones = (bloque.match(/!/g) ?? []).length;
    if (exclamaciones > 1) fallo(`${exclamaciones} exclamaciones en la sección ${i} (el máximo es 1)`);
  });

  // Referencias a archivos internos del repositorio
  [...raw.matchAll(/`?(CONTRATO-DE-CLASES\.md|manifest\.ts|README\.md|preguntas\/)`?/g)].forEach((m) =>
    fallo(`referencia a un archivo interno del repositorio: ${m[1]}`),
  );

  // HTML: el renderizador de la app no lo soporta
  [...raw.matchAll(/<(details|summary|br|audio|img|div|span|iframe)\b/gi)].forEach((m) =>
    fallo(`etiqueta HTML no soportada: <${m[1]}>`),
  );

  // Emojis fuera de los títulos (❌ y ✅ sí están permitidos en el texto)
  const emoji = /\p{Extended_Pictographic}/u;
  raw.split("\n").forEach((l, i) => {
    if (l.startsWith("#") || l.startsWith(">")) return;
    const limpia = l.replace(/[❌✅]/g, "");
    if (emoji.test(limpia)) fallo(`emoji fuera de un título (línea ${i + 1}): ${l.trim().slice(0, 60)}`);
  });
}

console.log(`\n${problemas === 0 ? "OK — sin problemas" : `${problemas} problema(s)`}`);
process.exit(problemas === 0 ? 0 : 1);
