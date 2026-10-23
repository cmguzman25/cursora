// Verificador del banco de ciencias-fenomenos-naturais-impactos-ambientais. Se corre desde la raíz del repo:
//
//   node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/ciencias-fenomenos-naturais-impactos-ambientais/verificar-preguntas.mjs
//
// Importa los `.ts` directamente: Node 24 les quita los tipos al cargarlos, y
// estos archivos solo tienen `import type`, que la eliminación de tipos borra.
// Así se valida sobre los objetos reales en vez de parsear objetos anidados con
// expresiones regulares.
//
// Por eso **no se importa `preguntas/index.ts` ni `manifest.ts`**: los dos
// importan a sus vecinos sin extensión, como es la convención del proyecto
// (TypeScript resuelve con `moduleResolution: bundler`), y el cargador de Node
// necesita la extensión. Los temas y la configuración viven en módulos hoja
// justamente para que se puedan cargar acá, y el banco se vuelve a ensamblar más
// abajo con la misma función que usa la app.
//
// El verificador mide **forma, no verdad**: que una respuesta marcada como
// correcta sea de verdad la correcta no lo comprueba ningún script.

import { TEMA_POLUICAO_DO_AR } from "./preguntas/tema-1-poluicao-do-ar.ts";
import { TEMA_EFEITO_ESTUFA } from "./preguntas/tema-2-efeito-estufa.ts";
import { TEMA_CAMADA_DE_OZONIO } from "./preguntas/tema-3-camada-de-ozonio.ts";
import { TEMA_CHUVA_ACIDA_E_INVERSAO } from "./preguntas/tema-4-chuva-acida-e-inversao.ts";
import { TEMA_POLUICAO_DA_AGUA } from "./preguntas/tema-5-poluicao-da-agua.ts";
import { TEMA_POLUICAO_DO_SOLO } from "./preguntas/tema-6-poluicao-do-solo.ts";
import { TEMA_OUTRAS_POLUICOES } from "./preguntas/tema-7-outras-poluicoes.ts";
import { intercalarPorTema } from "../intercalar.ts";
import {
  DESCRIPCION,
  DURACION_SUGERIDA_MINUTOS,
  PORCENTAJE_PARA_APROBAR,
  PREFIJO_DE_IDS,
  PREGUNTAS_POR_TEMA,
  TEMAS,
  TITULO,
  VERSION_DEL_BANCO,
} from "./configuracion.ts";

// Los archivos de tema, en el orden en que el manifest los ensambla. El número
// de tema sale de esta posición y es el que tiene que aparecer en los ids.
const ARCHIVOS_DE_TEMA = [
  { numero: 1, topic: "poluicao-do-ar", preguntas: TEMA_POLUICAO_DO_AR },
  { numero: 2, topic: "efeito-estufa", preguntas: TEMA_EFEITO_ESTUFA },
  { numero: 3, topic: "camada-de-ozonio", preguntas: TEMA_CAMADA_DE_OZONIO },
  { numero: 4, topic: "chuva-acida-e-inversao", preguntas: TEMA_CHUVA_ACIDA_E_INVERSAO },
  { numero: 5, topic: "poluicao-da-agua", preguntas: TEMA_POLUICAO_DA_AGUA },
  { numero: 6, topic: "poluicao-do-solo", preguntas: TEMA_POLUICAO_DO_SOLO },
  { numero: 7, topic: "outras-poluicoes", preguntas: TEMA_OUTRAS_POLUICOES },
];

const LETRAS = ["A", "B", "C", "D", "E", "F"];

// Formato de la casa: 4 opciones / 1 correcta. La regla detrás de los números es
// "siempre un distractor más que correctas": con 4 opciones y 1 correcta,
// adivinar paga 25 %; con 3 pagaría 33 %.
const FORMATOS = {
  simple: { opciones: 4, correctas: 1 },
  multiple: { opciones: 5, correctas: 2 },
};

// Proporción de respuesta múltiple acordada: ninguna.
const RANGO_MULTIPLE = null;

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

// "Todas las anteriores" y sus parientes evalúan lógica de examen, no el tema.
const FRASES_PROHIBIDAS = [
  /todas las anteriores/i,
  /ninguna de las anteriores/i,
  /all of the above/i,
  /none of the above/i,
  /both a and b/i,
  /todas as anteriores/i,
  /nenhuma das anteriores/i,
];

/** Reglas que valen para cualquier pregunta. */
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

  // Cada opción, correcta o incorrecta, tiene que explicar por qué lo es. En las
  // incorrectas es donde está el valor del modo estudio: una explicación que solo
  // dice "no es correcta" no enseña nada.
  for (const o of q.options) {
    if (!o.text?.trim()) fallo(`${etiqueta} / opción ${o.id}: sin texto`);
    if (!o.explanation?.trim()) fallo(`${etiqueta} / opción ${o.id}: sin explicación`);
  }

  // Los ids de opción tienen que ser las letras en orden: el botón de opción
  // imprime `option.id` dentro de un círculo de 24 px, así que un id como
  // "opt-1" sale impreso tal cual y desborda.
  const idsEsperados = LETRAS.slice(0, q.options.length);
  const idsReales = q.options.map((o) => o.id);
  if (idsReales.join(",") !== idsEsperados.join(",")) {
    fallo(
      `${etiqueta}: ids de opción ${idsReales.join(",")}, se esperaban ${idsEsperados.join(",")}`,
    );
  }

  // Dos opciones con el mismo texto hacen que la pregunta no tenga una única
  // respuesta defendible, aunque solo una esté marcada como correcta.
  const textos = q.options.map((o) => (o.text ?? "").trim().toLowerCase());
  const repetidos = textos.filter((t, i) => t && textos.indexOf(t) !== i);
  if (repetidos.length > 0) {
    fallo(`${etiqueta}: texto de opción repetido ("${repetidos[0]}")`);
  }

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
  if (!idsDeTemasDeclarados.has(topic)) {
    fallo(`tema "${topic}": no está declarado en TEMAS`);
  }

  for (const q of preguntas) {
    revisarPregunta(q, q.id);

    if (q.topic !== topic) {
      fallo(`${q.id}: está en el archivo del tema "${topic}" pero declara topic "${q.topic}"`);
    }
    if (!new RegExp(`^${PREFIJO_DE_IDS}-t${numero}-q\\d{2}$`).test(q.id)) {
      fallo(`${q.id}: el id no sigue la forma ${PREFIJO_DE_IDS}-t${numero}-qNN`);
    }
  }

  console.log(`  tema ${numero} "${topic}": ${preguntas.length} preguntas`);
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
if (RANGO_MULTIPLE === null) {
  if (multiples > 0) fallo(`${multiples} preguntas de respuesta múltiple, y se acordó ninguna`);
} else {
  const [minMul, maxMul] = RANGO_MULTIPLE;
  if (multiples < minMul || multiples > maxMul) {
    fallo(`${multiples} de respuesta múltiple; se esperaban entre ${minMul} y ${maxMul}`);
  }
}

// --- reparto de la letra correcta ----------------------------------------
const simples = todas.filter((q) => !q.multiple);
const letras = {};
for (const q of simples) {
  const correcta = q.options.find((o) => o.correct);
  if (correcta) letras[correcta.id] = (letras[correcta.id] || 0) + 1;
}

const reparto = ["A", "B", "C", "D"].map((l) => `${l}:${letras[l] ?? 0}`).join(" ");
console.log(`  total ${todas.length} | opción única ${simples.length} | correctas ${reparto}`);

// Con la correcta siempre en la misma letra se acierta por patrón en vez de por
// conocimiento. El margen tolerado crece con la cantidad de preguntas.
const ideal = simples.length / 4;
const margen = Math.max(2, Math.ceil(ideal * 0.6));
for (const letra of ["A", "B", "C", "D"]) {
  const cuenta = letras[letra] ?? 0;
  if (Math.abs(cuenta - ideal) > margen) {
    fallo(`la correcta cae ${cuenta} veces en ${letra} y lo parejo serían ~${ideal.toFixed(1)}`);
  }
}

// --- fuga por longitud ----------------------------------------------------
// La forma más común de que un banco se vuelva adivinable: la correcta termina
// siendo sistemáticamente la opción más larga, porque es la que lleva los
// matices. Se mide y se falla, en vez de confiar en que no pasó.
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
