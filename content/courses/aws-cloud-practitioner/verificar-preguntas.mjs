// Verificador de los bancos de preguntas de aws-cloud-practitioner, contra las
// reglas de CONTRATO-DE-CLASES.md. Se corre desde la raíz del repo:
//
//   node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/courses/aws-cloud-practitioner/verificar-preguntas.mjs
//
// Importa los `.ts` directamente: Node 24 les quita los tipos al cargarlos, y
// estos archivos solo tienen `import type`, que la eliminación de tipos borra.
// Así se valida sobre los objetos reales en vez de parsear 65 objetos anidados
// con expresiones regulares.
//
// Por eso no se importa `preguntas/simulacro/index.ts`: ese archivo importa a
// sus vecinos sin extensión, como es la convención del proyecto (TypeScript
// resuelve con `moduleResolution: bundler`), y el cargador de Node necesita la
// extensión. Las piezas del banco viven en módulos hoja justamente para que se
// puedan cargar acá, y el banco se vuelve a ensamblar más abajo con la misma
// función que usa la app.

import { SIM_D1 } from "./preguntas/simulacro/dominio-1.ts";
import { SIM_D2 } from "./preguntas/simulacro/dominio-2.ts";
import { SIM_D3 } from "./preguntas/simulacro/dominio-3.ts";
import { SIM_D4 } from "./preguntas/simulacro/dominio-4.ts";
import { intercalarPorDominio } from "./preguntas/simulacro/intercalar.ts";
import {
  DOMINIOS,
  DURACION_MINUTOS,
  FRACCION_PARA_APROBAR,
  NOTA_MAXIMA,
  NOTA_MINIMA,
  NOTA_PARA_APROBAR,
  VERSION_DEL_BANCO,
} from "./preguntas/simulacro/configuracion.ts";
import { MODULE_1_QUESTIONS } from "./preguntas/modulo-1.ts";
import { MODULE_2_QUESTIONS } from "./preguntas/modulo-2.ts";
import { MODULE_3_QUESTIONS } from "./preguntas/modulo-3.ts";
import { MODULE_4_QUESTIONS } from "./preguntas/modulo-4.ts";

const FINAL_EXAM = {
  durationMinutes: DURACION_MINUTOS,
  scaledMin: NOTA_MINIMA,
  scaledMax: NOTA_MAXIMA,
  passingScore: NOTA_PARA_APROBAR,
  passingRawFraction: FRACCION_PARA_APROBAR,
  version: VERSION_DEL_BANCO,
  domains: DOMINIOS,
  questions: { es: intercalarPorDominio([SIM_D1, SIM_D2, SIM_D3, SIM_D4]) },
};

let problemas = 0;
const fallo = (msg) => {
  problemas++;
  console.log(`  *** ${msg}`);
};

// Cuántas preguntas lleva cada dominio del simulacro, y de qué archivo salen.
const DOMINIOS_ESPERADOS = [
  { id: "1", esperadas: 16, preguntas: SIM_D1 },
  { id: "2", esperadas: 19, preguntas: SIM_D2 },
  { id: "3", esperadas: 22, preguntas: SIM_D3 },
  { id: "4", esperadas: 8, preguntas: SIM_D4 },
];

const TOTAL_SIMULACRO = 65;

// Proporción de preguntas de respuesta múltiple que el contrato considera
// realista (~15 %). Sobre 65 preguntas, entre 8 y 11.
const RANGO_MULTIPLE = [8, 11];

const MODULOS = [
  { nombre: "modulo-1", esperadas: 20, preguntas: MODULE_1_QUESTIONS },
  { nombre: "modulo-2", esperadas: 25, preguntas: MODULE_2_QUESTIONS },
  { nombre: "modulo-3", esperadas: 35, preguntas: MODULE_3_QUESTIONS },
  { nombre: "modulo-4", esperadas: 15, preguntas: MODULE_4_QUESTIONS },
];

/** Reglas que valen para cualquier pregunta, de simulacro o de módulo. */
function revisarPregunta(q, etiqueta) {
  const correctas = q.options.filter((o) => o.correct);
  const opcionesEsperadas = q.multiple ? 5 : 4;
  const correctasEsperadas = q.multiple ? 2 : 1;

  if (q.options.length !== opcionesEsperadas) {
    fallo(`${etiqueta}: ${q.options.length} opciones, se esperaban ${opcionesEsperadas}`);
  }
  if (correctas.length !== correctasEsperadas) {
    fallo(`${etiqueta}: ${correctas.length} opciones correctas, se esperaban ${correctasEsperadas}`);
  }
  if (!q.prompt?.trim()) fallo(`${etiqueta}: sin enunciado`);

  // Cada opción, correcta o incorrecta, tiene que explicar por qué lo es: en
  // las incorrectas es donde se enseñan las trampas del examen.
  for (const o of q.options) {
    if (!o.explanation?.trim()) fallo(`${etiqueta} / opción ${o.id}: sin explicación`);
    if (!o.text?.trim()) fallo(`${etiqueta} / opción ${o.id}: sin texto`);
  }

  const idsOpciones = q.options.map((o) => o.id);
  if (new Set(idsOpciones).size !== idsOpciones.length) {
    fallo(`${etiqueta}: ids de opción repetidos (${idsOpciones.join(", ")})`);
  }

  if (!Array.isArray(q.tips) || q.tips.length < 2 || q.tips.length > 3) {
    fallo(`${etiqueta}: ${q.tips?.length ?? 0} tips, el contrato pide 2 o 3`);
  }
  (q.tips ?? []).forEach((t, i) => {
    if (!t?.trim()) fallo(`${etiqueta}: el tip ${i + 1} está vacío`);
  });
}

// --- el simulacro, dominio por dominio -----------------------------------
console.log("simulacro final");

const idsDeclarados = new Set(FINAL_EXAM.domains.map((d) => d.id));

for (const { id, esperadas, preguntas } of DOMINIOS_ESPERADOS) {
  if (preguntas.length !== esperadas) {
    fallo(`dominio ${id}: ${preguntas.length} preguntas, se esperaban ${esperadas}`);
  }
  if (!idsDeclarados.has(id)) {
    fallo(`dominio ${id}: no está declarado en FINAL_EXAM.domains`);
  }

  const letras = {};
  for (const q of preguntas) {
    const etiqueta = q.id;
    revisarPregunta(q, etiqueta);

    if (q.domain !== id) {
      fallo(`${etiqueta}: está en el archivo del dominio ${id} pero declara domain "${q.domain}"`);
    }
    if (!new RegExp(`^sim-d${id}-q\\d{2}$`).test(q.id)) {
      fallo(`${etiqueta}: el id no sigue la forma sim-d${id}-qNN`);
    }
    if (!q.multiple) {
      const correcta = q.options.find((o) => o.correct);
      letras[correcta.id] = (letras[correcta.id] || 0) + 1;
    }
  }

  const simples = preguntas.filter((q) => !q.multiple).length;
  const reparto = ["A", "B", "C", "D"].map((l) => `${l}:${letras[l] ?? 0}`).join(" ");
  console.log(`  dominio ${id}: ${preguntas.length} preguntas | correctas ${reparto}`);

  // Con la correcta siempre en la misma letra se acierta por patrón en vez de
  // por conocimiento. El margen tolerado crece con la cantidad de preguntas.
  const ideal = simples / 4;
  const margen = Math.max(2, Math.ceil(ideal * 0.6));
  for (const letra of ["A", "B", "C", "D"]) {
    const cuenta = letras[letra] ?? 0;
    if (Math.abs(cuenta - ideal) > margen) {
      fallo(
        `dominio ${id}: la correcta cae ${cuenta} veces en ${letra} y lo parejo serían ~${ideal.toFixed(1)}`,
      );
    }
  }
}

// --- el banco completo ----------------------------------------------------
const todas = FINAL_EXAM.questions.es;

if (todas.length !== TOTAL_SIMULACRO) {
  fallo(`el simulacro tiene ${todas.length} preguntas y deberían ser ${TOTAL_SIMULACRO}`);
}

const sumaDominios = DOMINIOS_ESPERADOS.reduce((n, d) => n + d.preguntas.length, 0);
if (sumaDominios !== todas.length) {
  fallo(`los archivos por dominio suman ${sumaDominios} y el banco expone ${todas.length}`);
}

const multiples = todas.filter((q) => q.multiple).length;
const [minMul, maxMul] = RANGO_MULTIPLE;
if (multiples < minMul || multiples > maxMul) {
  fallo(`${multiples} preguntas de respuesta múltiple; se esperaban entre ${minMul} y ${maxMul}`);
}

// El orden alternado no debería dejar dos preguntas seguidas del mismo dominio
// en el tramo inicial, donde todas las listas todavía tienen material.
let seguidas = 0;
for (let i = 1; i < todas.length; i++) {
  if (todas[i].domain === todas[i - 1].domain) seguidas++;
}
console.log(`  total ${todas.length} | múltiple ${multiples} | pares seguidos del mismo dominio: ${seguidas}`);

// --- configuración del banco ---------------------------------------------
const { durationMinutes, scaledMin, scaledMax, passingScore, passingRawFraction, domains, version } =
  FINAL_EXAM;

if (domains.length !== 4) fallo(`FINAL_EXAM declara ${domains.length} dominios y deberían ser 4`);

const pesos = domains.reduce((n, d) => n + d.weight, 0);
if (Math.abs(pesos - 1) > 0.001) fallo(`los pesos de los dominios suman ${pesos}, deberían sumar 1`);

if (!(durationMinutes > 0)) fallo(`durationMinutes inválido: ${durationMinutes}`);
if (!(scaledMin < passingScore && passingScore < scaledMax)) {
  fallo(`passingScore ${passingScore} tiene que caer entre ${scaledMin} y ${scaledMax}`);
}
if (!(passingRawFraction > 0 && passingRawFraction < 1)) {
  fallo(`passingRawFraction inválido: ${passingRawFraction}`);
}
if (!Number.isInteger(version) || version < 1) fallo(`version inválida: ${version}`);

for (const d of domains) {
  if (!d.name?.es?.trim()) fallo(`el dominio ${d.id} no tiene nombre en español`);
}

// --- ids únicos y enunciados sin repetir, en los cinco bancos -------------
console.log("\ntodos los bancos del curso");

const bancos = [
  ...MODULOS.map((m) => ({ nombre: m.nombre, preguntas: m.preguntas })),
  { nombre: "simulacro", preguntas: todas },
];

const vistos = new Map();
for (const { nombre, preguntas } of bancos) {
  for (const q of preguntas) {
    if (vistos.has(q.id)) {
      fallo(`id repetido "${q.id}": está en ${vistos.get(q.id)} y en ${nombre}`);
    } else {
      vistos.set(q.id, nombre);
    }
  }
}

for (const { nombre, esperadas, preguntas } of MODULOS) {
  if (preguntas.length !== esperadas) {
    fallo(`${nombre}: ${preguntas.length} preguntas, se esperaban ${esperadas}`);
  }
  for (const q of preguntas) revisarPregunta(q, `${nombre}/${q.id}`);
}

// Las preguntas del simulacro tienen que ser nuevas: si el alumno ya las vio
// al cerrar cada módulo, la nota sale inflada y el simulacro deja de medir.
const normalizar = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const septagramas = (palabras) => {
  const out = new Set();
  for (let i = 0; i + 7 <= palabras.length; i++) out.add(palabras.slice(i, i + 7).join(" "));
  return out;
};

const deModulos = MODULOS.flatMap((m) => m.preguntas.map((q) => ({ banco: m.nombre, q })));

for (const q of todas) {
  const propios = septagramas(normalizar(q.prompt));
  for (const { banco, q: otra } of deModulos) {
    if (otra.prompt === q.prompt) {
      fallo(`${q.id}: enunciado idéntico al de ${banco}/${otra.id}`);
      continue;
    }
    const ajenos = septagramas(normalizar(otra.prompt));
    const comunes = [...propios].filter((g) => ajenos.has(g)).length;
    if (comunes >= 3) {
      fallo(`${q.id}: enunciado muy parecido al de ${banco}/${otra.id} (${comunes} tramos iguales)`);
    }
  }
}

const totalPreguntas = bancos.reduce((n, b) => n + b.preguntas.length, 0);
console.log(`  ${bancos.length} bancos | ${totalPreguntas} preguntas | ${vistos.size} ids únicos`);

console.log(`\n${problemas === 0 ? "OK — sin problemas" : `${problemas} problema(s)`}`);
process.exit(problemas === 0 ? 0 : 1);
