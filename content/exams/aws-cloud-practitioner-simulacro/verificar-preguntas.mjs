// Verificador del banco de aws-cloud-practitioner-simulacro. Se corre desde la
// raíz del repo:
//
//   node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/aws-cloud-practitioner-simulacro/verificar-preguntas.mjs
//
// Este examen **tiene sus propias preguntas**. Nacieron como copia del simulacro
// del curso, pero ese banco quedó congelado y las correcciones se hacen acá, así
// que acá también se juzga la forma — antes este script solo comprobaba que la
// adaptación no mintiera, y eso ya no alcanza.
//
// Importa los `.ts` directamente: Node 24 les quita los tipos al cargarlos, y
// estos archivos solo tienen `import type`. Por eso no se importan
// `preguntas/index.ts` ni `manifest.ts`: los dos importan sin extensión.
//
// El verificador mide **forma, no verdad**: que una respuesta marcada como
// correcta sea de verdad la correcta no lo comprueba ningún script.

import { TEMA_1_CONCEPTOS } from "./preguntas/tema-1-conceptos-de-la-nube.ts";
import { TEMA_2_SEGURIDAD } from "./preguntas/tema-2-seguridad.ts";
import { TEMA_3_TECNOLOGIA } from "./preguntas/tema-3-tecnologia.ts";
import { TEMA_4_FACTURACION } from "./preguntas/tema-4-facturacion.ts";
import { intercalarPorTema } from "../intercalar.ts";
import {
  DESCRIPCION,
  DURACION_SUGERIDA_MINUTOS,
  PORCENTAJE_PARA_APROBAR,
  PREGUNTAS_POR_TEMA,
  TEMAS,
  TITULO,
  VERSION_DEL_BANCO,
} from "./configuracion.ts";

const ARCHIVOS_DE_TEMA = [
  { numero: 1, topic: "1", preguntas: TEMA_1_CONCEPTOS },
  { numero: 2, topic: "2", preguntas: TEMA_2_SEGURIDAD },
  { numero: 3, topic: "3", preguntas: TEMA_3_TECNOLOGIA },
  { numero: 4, topic: "4", preguntas: TEMA_4_FACTURACION },
];

const LETRAS = ["A", "B", "C", "D", "E", "F"];

const FORMATOS = {
  simple: { opciones: 4, correctas: 1 },
  multiple: { opciones: 5, correctas: 2 },
};

// Proporción de respuesta múltiple que imita al CLF-C02 real (~15 %).
const RANGO_MULTIPLE = [8, 12];

let problemas = 0;
const fallo = (msg) => {
  problemas++;
  console.log(`  *** ${msg}`);
};

/** Los signos diacríticos sueltos que deja `normalize("NFD")`. */
const SIGNOS_DIACRITICOS = /[̀-ͯ]/g;

const normalizar = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(SIGNOS_DIACRITICOS, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const septagramas = (palabras) => {
  const out = new Set();
  for (let i = 0; i + 7 <= palabras.length; i++) out.add(palabras.slice(i, i + 7).join(" "));
  return out;
};

const FRASES_PROHIBIDAS = [
  /todas las anteriores/i,
  /ninguna de las anteriores/i,
  /all of the above/i,
  /none of the above/i,
];

function revisarPregunta(q, etiqueta) {
  const correctas = q.options.filter((o) => o.correct);
  const formato = q.multiple ? FORMATOS.multiple : FORMATOS.simple;

  if (q.options.length !== formato.opciones) {
    fallo(`${etiqueta}: ${q.options.length} opciones, se esperaban ${formato.opciones}`);
  }
  if (correctas.length !== formato.correctas) {
    fallo(`${etiqueta}: ${correctas.length} correctas, se esperaban ${formato.correctas}`);
  }
  if (!q.prompt?.trim()) fallo(`${etiqueta}: sin enunciado`);

  for (const o of q.options) {
    if (!o.text?.trim()) fallo(`${etiqueta} / opción ${o.id}: sin texto`);
    if (!o.explanation?.trim()) fallo(`${etiqueta} / opción ${o.id}: sin explicación`);
  }

  const idsEsperados = LETRAS.slice(0, q.options.length);
  const idsReales = q.options.map((o) => o.id);
  if (idsReales.join(",") !== idsEsperados.join(",")) {
    fallo(
      `${etiqueta}: ids de opción ${idsReales.join(",")}, se esperaban ${idsEsperados.join(",")}`,
    );
  }

  const textos = q.options.map((o) => (o.text ?? "").trim().toLowerCase());
  const repetidos = textos.filter((t, i) => t && textos.indexOf(t) !== i);
  if (repetidos.length > 0) fallo(`${etiqueta}: texto de opción repetido ("${repetidos[0]}")`);

  for (const texto of [q.prompt, ...q.options.map((o) => o.text)]) {
    for (const prohibida of FRASES_PROHIBIDAS) {
      if (prohibida.test(texto ?? "")) {
        fallo(`${etiqueta}: contiene una frase prohibida (${prohibida.source})`);
      }
    }
  }

  if (!Array.isArray(q.tips) || q.tips.length < 2 || q.tips.length > 3) {
    fallo(`${etiqueta}: ${q.tips?.length ?? 0} tips, se piden 2 o 3`);
  }
  (q.tips ?? []).forEach((t, i) => {
    if (!t?.trim()) fallo(`${etiqueta}: el tip ${i + 1} está vacío`);
  });
}

// --- tema por tema --------------------------------------------------------
console.log(`examen ${TITULO.es}`);

const idsDeTemasDeclarados = new Set(TEMAS.map((t) => t.id));

for (const { numero, topic, preguntas } of ARCHIVOS_DE_TEMA) {
  const esperadas = PREGUNTAS_POR_TEMA[topic];

  if (esperadas === undefined) {
    fallo(`tema "${topic}": no figura en PREGUNTAS_POR_TEMA`);
  } else if (preguntas.length !== esperadas) {
    fallo(`tema "${topic}": ${preguntas.length} preguntas, se declararon ${esperadas}`);
  }
  if (!idsDeTemasDeclarados.has(topic)) fallo(`tema "${topic}": no está declarado en TEMAS`);

  for (const q of preguntas) {
    revisarPregunta(q, q.id);

    if (q.topic !== topic) {
      fallo(`${q.id}: está en el archivo del tema "${topic}" pero declara topic "${q.topic}"`);
    }
    // Los ids se heredaron del simulacro del curso y se conservan a propósito:
    // una rendida guardada los referencia, así que renombrarlos la rompería.
    if (!new RegExp(`^sim-d${numero}-q\\d{2}$`).test(q.id)) {
      fallo(`${q.id}: el id no sigue la forma sim-d${numero}-qNN`);
    }
  }

  console.log(`  tema ${numero}: ${preguntas.length} preguntas`);
}

// --- el banco completo ----------------------------------------------------
const todas = intercalarPorTema(ARCHIVOS_DE_TEMA.map((t) => t.preguntas));

const totalDeclarado = Object.values(PREGUNTAS_POR_TEMA).reduce((n, c) => n + c, 0);
if (todas.length !== totalDeclarado) {
  fallo(`el banco expone ${todas.length} preguntas y PREGUNTAS_POR_TEMA suma ${totalDeclarado}`);
}

const ids = todas.map((q) => q.id);
const duplicados = ids.filter((id, i) => ids.indexOf(id) !== i);
if (duplicados.length > 0) {
  fallo(`ids de pregunta repetidos: ${[...new Set(duplicados)].join(", ")}`);
}

const multiples = todas.filter((q) => q.multiple).length;
const [minMul, maxMul] = RANGO_MULTIPLE;
if (multiples < minMul || multiples > maxMul) {
  fallo(`${multiples} de respuesta múltiple; se esperaban entre ${minMul} y ${maxMul}`);
}

// --- reparto de la letra correcta ----------------------------------------
const simples = todas.filter((q) => !q.multiple);
const letras = {};
for (const q of simples) {
  const correcta = q.options.find((o) => o.correct);
  if (correcta) letras[correcta.id] = (letras[correcta.id] || 0) + 1;
}

const reparto = ["A", "B", "C", "D"].map((l) => `${l}:${letras[l] ?? 0}`).join(" ");
console.log(`  total ${todas.length} | múltiple ${multiples} | correctas ${reparto}`);

const ideal = simples.length / 4;
const margen = Math.max(2, Math.ceil(ideal * 0.6));
for (const letra of ["A", "B", "C", "D"]) {
  const cuenta = letras[letra] ?? 0;
  if (Math.abs(cuenta - ideal) > margen) {
    fallo(`la correcta cae ${cuenta} veces en ${letra} y lo parejo serían ~${ideal.toFixed(1)}`);
  }
}

// --- fuga por longitud ----------------------------------------------------
let correctaMasLarga = 0;
for (const q of simples) {
  const largos = q.options.map((o) => (o.text ?? "").length);
  const maximo = Math.max(...largos);
  const correcta = q.options.find((o) => o.correct);
  if (correcta && (correcta.text ?? "").length === maximo) correctaMasLarga++;
}
const proporcion = simples.length > 0 ? correctaMasLarga / simples.length : 0;
console.log(`  la correcta es la más larga en ${correctaMasLarga}/${simples.length} de opción única`);
if (proporcion > 0.6) {
  fallo(
    `la correcta es la opción más larga en el ${Math.round(proporcion * 100)} % de las de opción única; el tope es 60 %`,
  );
}

// --- enunciados que se repiten entre sí -----------------------------------
for (let i = 0; i < todas.length; i++) {
  const propios = septagramas(normalizar(todas[i].prompt));
  for (let j = i + 1; j < todas.length; j++) {
    if (todas[i].prompt === todas[j].prompt) {
      fallo(`${todas[i].id}: enunciado idéntico al de ${todas[j].id}`);
      continue;
    }
    const ajenos = septagramas(normalizar(todas[j].prompt));
    const comunes = [...propios].filter((g) => ajenos.has(g)).length;
    if (comunes >= 3) {
      fallo(
        `${todas[i].id}: enunciado muy parecido al de ${todas[j].id} (${comunes} tramos iguales)`,
      );
    }
  }
}

// --- la ficha del examen --------------------------------------------------
if (!TITULO?.es?.trim()) fallo("el examen no tiene título en español");
if (!DESCRIPCION?.es?.trim()) fallo("el examen no tiene descripción en español");
if (TEMAS.length === 0) fallo("el examen no declara ningún tema");
for (const tema of TEMAS) {
  if (!tema.name?.es?.trim()) fallo(`el tema "${tema.id}" no tiene nombre en español`);
}
if (!(DURACION_SUGERIDA_MINUTOS > 0)) {
  fallo(`DURACION_SUGERIDA_MINUTOS inválida: ${DURACION_SUGERIDA_MINUTOS}`);
}
if (!(PORCENTAJE_PARA_APROBAR > 0 && PORCENTAJE_PARA_APROBAR < 100)) {
  fallo(`PORCENTAJE_PARA_APROBAR tiene que caer entre 1 y 99: ${PORCENTAJE_PARA_APROBAR}`);
}
if (!Number.isInteger(VERSION_DEL_BANCO) || VERSION_DEL_BANCO < 1) {
  fallo(`VERSION_DEL_BANCO inválida: ${VERSION_DEL_BANCO}`);
}

console.log(`\n${problemas === 0 ? "OK — sin problemas" : `${problemas} problema(s)`}`);
process.exit(problemas === 0 ? 0 : 1);
