// ---------------------------------------------------------------------------
// Verificador del banco de aws-data-engineer-ingesta. Se corre desde la raíz del
// repo:
//
//   node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/aws-data-engineer-ingesta/verificar-preguntas.mjs
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
// El banco es **bilingüe**: el español vive en `preguntas/es/` y es el idioma por
// defecto, o sea el que califica (ver `src/lib/exams/generated.ts`); el inglés vive
// en `preguntas/en/` y es el original, escrito con la redacción del DEA-C01 real.
// Cada control de forma se corre sobre los dos, y además se comprueba que sean
// **estrictamente paralelos**, que es la regla que el tipo exige y que ningún otro
// control del proyecto vigila.
//
// El formato es el del DEA-C01: 4 opciones con 1 correcta, y una minoría de
// respuesta múltiple con 5 opciones y 2 correctas.
//
// El verificador mide **forma, no verdad**: que una respuesta marcada como
// correcta sea de verdad la correcta no lo comprueba ningún script, y que la
// traducción diga lo mismo que el original, tampoco.

import { TEMA_1_STREAMING as EN_1 } from "./preguntas/en/tema-1-streaming-kinesis-msk.ts";
import { TEMA_2_FIREHOSE as EN_2 } from "./preguntas/en/tema-2-firehose-delivery.ts";
import { TEMA_3_BATCH as EN_3 } from "./preguntas/en/tema-3-batch-database.ts";
import { TEMA_4_ORQUESTACION as EN_4 } from "./preguntas/en/tema-4-orchestration-event-driven.ts";
import { TEMA_5_CAUDAL as EN_5 } from "./preguntas/en/tema-5-throughput-replayability.ts";
import { TEMA_1_STREAMING as ES_1 } from "./preguntas/es/tema-1-streaming-kinesis-msk.ts";
import { TEMA_2_FIREHOSE as ES_2 } from "./preguntas/es/tema-2-firehose-delivery.ts";
import { TEMA_3_BATCH as ES_3 } from "./preguntas/es/tema-3-batch-database.ts";
import { TEMA_4_ORQUESTACION as ES_4 } from "./preguntas/es/tema-4-orchestration-event-driven.ts";
import { TEMA_5_CAUDAL as ES_5 } from "./preguntas/es/tema-5-throughput-replayability.ts";
import { intercalarPorTema } from "../intercalar.ts";
import {
  DESCRIPCION,
  DURACION_SUGERIDA_MINUTOS,
  IDIOMA_QUE_CALIFICA,
  MARCA_DE_MULTIPLE,
  PORCENTAJE_PARA_APROBAR,
  PREFIJO_DE_IDS,
  PREGUNTAS_POR_TEMA,
  TEMAS,
  TITULO,
  VERSION_DEL_BANCO,
} from "./configuracion.ts";

/**
 * Los temas de cada idioma, en el orden en que el manifest los ensambla. El número
 * de tema sale de esta posición y es el que tiene que aparecer en los ids.
 */
const TEMAS_POR_IDIOMA = {
  es: [
    { numero: 1, topic: "streaming-kinesis-msk", preguntas: ES_1 },
    { numero: 2, topic: "firehose-delivery", preguntas: ES_2 },
    { numero: 3, topic: "batch-database-ingestion", preguntas: ES_3 },
    { numero: 4, topic: "orchestration-event-driven", preguntas: ES_4 },
    { numero: 5, topic: "throughput-replayability", preguntas: ES_5 },
  ],
  en: [
    { numero: 1, topic: "streaming-kinesis-msk", preguntas: EN_1 },
    { numero: 2, topic: "firehose-delivery", preguntas: EN_2 },
    { numero: 3, topic: "batch-database-ingestion", preguntas: EN_3 },
    { numero: 4, topic: "orchestration-event-driven", preguntas: EN_4 },
    { numero: 5, topic: "throughput-replayability", preguntas: EN_5 },
  ],
};

const LETRAS = ["A", "B", "C", "D", "E", "F"];

// El formato del DEA-C01. La regla detrás de los números es "siempre un distractor
// más que correctas": con 4 opciones y 1 correcta, adivinar paga 25 %; con 3
// pagaría 33 %.
const FORMATOS = {
  simple: { opciones: 4, correctas: 1 },
  multiple: { opciones: 5, correctas: 2 },
};

// Se acordó ~15 % de respuesta múltiple sobre 65 preguntas, o sea 10. El rango deja
// margen para una edición que mueva una pregunta de formato sin tener que tocar el
// verificador, pero no tanto como para que el 30 % descartado pase inadvertido.
const RANGO_MULTIPLE = [9, 11];

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
];

/** Reglas que valen para cualquier pregunta, en cualquier idioma. */
function revisarPregunta(q, etiqueta, marcaMultiple, marcasAjenas) {
  const correctas = q.options.filter((o) => o.correct);
  const formato = q.multiple ? FORMATOS.multiple : FORMATOS.simple;

  if (q.options.length !== formato.opciones) {
    fallo(`${etiqueta}: ${q.options.length} opciones, se esperaban ${formato.opciones}`);
  }
  if (correctas.length !== formato.correctas) {
    fallo(`${etiqueta}: ${correctas.length} correctas, se esperaban ${formato.correctas}`);
  }
  if (!q.prompt?.trim()) fallo(`${etiqueta}: sin enunciado`);

  // Una pregunta de respuesta múltiple tiene que decirlo en el enunciado, como lo
  // dice el examen real. Si no, el alumno marca una sola opción y pierde el punto
  // por una convención que nadie le contó. Cada idioma tiene su marca.
  if (q.multiple && !q.prompt?.includes(marcaMultiple)) {
    fallo(`${etiqueta}: es de respuesta múltiple y el enunciado no avisa "${marcaMultiple}"`);
  }
  if (!q.multiple && q.prompt?.includes(marcaMultiple)) {
    fallo(`${etiqueta}: el enunciado dice "${marcaMultiple}" pero la pregunta es de opción única`);
  }
  // Y tiene que llevar la marca de **su** idioma: una traducción que se dejó el
  // "(Choose two.)" del original quedaría avisando en el idioma equivocado.
  for (const ajena of marcasAjenas) {
    if (q.prompt?.includes(ajena)) {
      fallo(`${etiqueta}: el enunciado lleva la marca "${ajena}", que es de otro idioma`);
    }
  }

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

  // El Markdown no se renderiza en ninguno de los tres campos de texto, así que un
  // `**` o un backtick sale impreso tal cual. Es el error que ya tienen los bancos
  // de los cursos y no hay que repetirlo.
  for (const [campo, texto] of [
    ["enunciado", q.prompt],
    ...q.options.map((o) => [`opción ${o.id}`, o.text]),
    ...q.options.map((o) => [`explicación de ${o.id}`, o.explanation]),
    ...(q.tips ?? []).map((t, i) => [`tip ${i + 1}`, t]),
  ]) {
    if (/\*\*|`|^\s*[-*]\s|<[a-z]/i.test(texto ?? "")) {
      fallo(`${etiqueta} / ${campo}: parece tener Markdown o HTML, que se imprime literal`);
    }
  }

  if (!Array.isArray(q.tips) || q.tips.length < 2 || q.tips.length > 3) {
    fallo(`${etiqueta}: ${q.tips?.length ?? 0} tips, se piden 2 o 3`);
  }
  (q.tips ?? []).forEach((t, i) => {
    if (!t?.trim()) fallo(`${etiqueta}: el tip ${i + 1} está vacío`);
  });
}

/** Revisa un idioma completo y devuelve el banco ya intercalado. */
function revisarIdioma(locale) {
  console.log(`\nidioma "${locale}"${locale === IDIOMA_QUE_CALIFICA ? " (el que califica)" : ""}`);

  const marcaMultiple = MARCA_DE_MULTIPLE[locale];
  if (!marcaMultiple) {
    fallo(`el idioma "${locale}" no declara su marca de respuesta múltiple en MARCA_DE_MULTIPLE`);
  }
  const marcasAjenas = Object.entries(MARCA_DE_MULTIPLE)
    .filter(([otro]) => otro !== locale)
    .map(([, marca]) => marca);

  const idsDeTemasDeclarados = new Set(TEMAS.map((t) => t.id));

  for (const { numero, topic, preguntas } of TEMAS_POR_IDIOMA[locale]) {
    const esperadas = PREGUNTAS_POR_TEMA[topic];

    if (esperadas === undefined) {
      fallo(`tema "${topic}": no figura en PREGUNTAS_POR_TEMA`);
    } else if (preguntas.length !== esperadas) {
      fallo(`[${locale}] tema "${topic}": ${preguntas.length} preguntas, se declararon ${esperadas}`);
    }
    if (!idsDeTemasDeclarados.has(topic)) {
      fallo(`tema "${topic}": no está declarado en TEMAS`);
    }

    for (const q of preguntas) {
      revisarPregunta(q, `[${locale}] ${q.id}`, marcaMultiple, marcasAjenas);

      if (q.topic !== topic) {
        fallo(
          `[${locale}] ${q.id}: está en el archivo del tema "${topic}" pero declara topic "${q.topic}"`,
        );
      }
      if (!new RegExp(`^${PREFIJO_DE_IDS}-t${numero}-q\\d{2}$`).test(q.id)) {
        fallo(`[${locale}] ${q.id}: el id no sigue la forma ${PREFIJO_DE_IDS}-t${numero}-qNN`);
      }
    }

    const mul = preguntas.filter((q) => q.multiple).length;
    console.log(`  tema ${numero} "${topic}": ${preguntas.length} preguntas (${mul} múltiples)`);
  }

  const todas = intercalarPorTema(TEMAS_POR_IDIOMA[locale].map((t) => t.preguntas));

  const totalDeclarado = Object.values(PREGUNTAS_POR_TEMA).reduce((n, c) => n + c, 0);
  if (todas.length !== totalDeclarado) {
    fallo(
      `[${locale}] el banco expone ${todas.length} preguntas y PREGUNTAS_POR_TEMA suma ${totalDeclarado}`,
    );
  }

  const ids = todas.map((q) => q.id);
  const duplicados = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicados.length > 0) {
    fallo(`[${locale}] ids de pregunta repetidos: ${[...new Set(duplicados)].join(", ")}`);
  }

  const multiples = todas.filter((q) => q.multiple).length;
  const [minMul, maxMul] = RANGO_MULTIPLE;
  if (multiples < minMul || multiples > maxMul) {
    fallo(`[${locale}] ${multiples} de respuesta múltiple; se esperaban entre ${minMul} y ${maxMul}`);
  }

  // --- reparto de la letra correcta ---------------------------------------
  const simples = todas.filter((q) => !q.multiple);
  const letras = {};
  for (const q of simples) {
    const correcta = q.options.find((o) => o.correct);
    if (correcta) letras[correcta.id] = (letras[correcta.id] || 0) + 1;
  }

  const reparto = ["A", "B", "C", "D"].map((l) => `${l}:${letras[l] ?? 0}`).join(" ");
  console.log(`  total ${todas.length} | opción única ${simples.length} | correctas ${reparto}`);

  const ideal = simples.length / 4;
  const margen = Math.max(2, Math.ceil(ideal * 0.6));
  for (const letra of ["A", "B", "C", "D"]) {
    const cuenta = letras[letra] ?? 0;
    if (Math.abs(cuenta - ideal) > margen) {
      fallo(
        `[${locale}] la correcta cae ${cuenta} veces en ${letra} y lo parejo serían ~${ideal.toFixed(1)}`,
      );
    }
  }

  // --- fuga por longitud --------------------------------------------------
  // Se mide por idioma a propósito: el español es más largo que el inglés y no lo
  // es de forma uniforme, así que una traducción puede introducir la fuga que el
  // original no tenía.
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
      `[${locale}] la correcta es la opción más larga en el ${Math.round(proporcion * 100)} % de las de opción única; el tope es 60 %`,
    );
  }

  // --- enunciados que se repiten entre sí ---------------------------------
  for (let i = 0; i < todas.length; i++) {
    const propios = septagramas(normalizar(todas[i].prompt));
    for (let j = i + 1; j < todas.length; j++) {
      if (todas[i].prompt === todas[j].prompt) {
        fallo(`[${locale}] ${todas[i].id}: enunciado idéntico al de ${todas[j].id}`);
        continue;
      }
      const ajenos = septagramas(normalizar(todas[j].prompt));
      const comunes = [...propios].filter((g) => ajenos.has(g)).length;
      if (comunes >= 3) {
        fallo(
          `[${locale}] ${todas[i].id}: enunciado muy parecido al de ${todas[j].id} (${comunes} tramos iguales)`,
        );
      }
    }
  }

  return todas;
}

// --- cada idioma por su cuenta --------------------------------------------
console.log(`examen ${TITULO.es}`);

const bancos = {};
for (const locale of Object.keys(TEMAS_POR_IDIOMA)) {
  bancos[locale] = revisarIdioma(locale);
}

// --- paralelismo entre idiomas --------------------------------------------
// La regla del tipo: mismas preguntas, mismo orden, mismos ids de opción y mismas
// correctas en todas las traducciones. No es cosmética. La app califica siempre en
// el idioma por defecto (ver `toGradableExam`) mientras el alumno puede estar
// leyendo otro, así que un orden distinto o una correcta movida calificaría una
// pregunta que ese alumno no respondió, y en silencio.
console.log(`\nparalelismo contra "${IDIOMA_QUE_CALIFICA}"`);

const referencia = bancos[IDIOMA_QUE_CALIFICA];
if (!referencia) {
  fallo(`IDIOMA_QUE_CALIFICA es "${IDIOMA_QUE_CALIFICA}" y no hay preguntas para ese idioma`);
}

for (const [locale, banco] of Object.entries(bancos)) {
  if (locale === IDIOMA_QUE_CALIFICA || !referencia) continue;

  if (banco.length !== referencia.length) {
    fallo(`[${locale}] tiene ${banco.length} preguntas y "${IDIOMA_QUE_CALIFICA}" tiene ${referencia.length}`);
  }

  let desalineadas = 0;
  for (let i = 0; i < Math.min(banco.length, referencia.length); i++) {
    const a = referencia[i];
    const b = banco[i];

    if (a.id !== b.id) {
      fallo(`[${locale}] en la posición ${i} hay "${b.id}" y en "${IDIOMA_QUE_CALIFICA}" hay "${a.id}"`);
      desalineadas++;
      continue;
    }
    if (a.topic !== b.topic) {
      fallo(`[${locale}] ${b.id}: topic "${b.topic}" contra "${a.topic}" del original`);
    }
    if (Boolean(a.multiple) !== Boolean(b.multiple)) {
      fallo(`[${locale}] ${b.id}: el formato no coincide (multiple ${Boolean(b.multiple)} contra ${Boolean(a.multiple)})`);
    }
    if (a.options.length !== b.options.length) {
      fallo(`[${locale}] ${b.id}: ${b.options.length} opciones contra ${a.options.length} del original`);
      continue;
    }
    for (let k = 0; k < a.options.length; k++) {
      if (a.options[k].id !== b.options[k].id) {
        fallo(`[${locale}] ${b.id}: la opción ${k} es "${b.options[k].id}" y en el original "${a.options[k].id}"`);
      }
      if (a.options[k].correct !== b.options[k].correct) {
        fallo(
          `[${locale}] ${b.id} / opción ${a.options[k].id}: correcta=${b.options[k].correct} contra ${a.options[k].correct} del original`,
        );
      }
    }
    // Una "traducción" que dejó el texto del original tal cual es casi siempre un
    // copiado a medias, no una decisión. Los nombres de servicio y las APIs sí se
    // repiten, así que solo se mira el enunciado, que nunca es solo jerga.
    if (a.prompt === b.prompt) {
      fallo(`[${locale}] ${b.id}: el enunciado es idéntico al de "${IDIOMA_QUE_CALIFICA}", parece sin traducir`);
    }
  }

  if (desalineadas === 0 && banco.length === referencia.length) {
    console.log(`  ${locale}: ${banco.length} preguntas alineadas, mismos ids, formatos y correctas`);
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

// Todo tema declarado tiene que tener su archivo en **todos** los idiomas: un tema
// en `TEMAS` sin preguntas aparecería en el diagnóstico con cero preguntas y nadie
// lo notaría.
for (const [locale, temas] of Object.entries(TEMAS_POR_IDIOMA)) {
  const conArchivo = new Set(temas.map((t) => t.topic));
  for (const tema of TEMAS) {
    if (!conArchivo.has(tema.id)) {
      fallo(`[${locale}] el tema "${tema.id}" está declarado y no tiene archivo`);
    }
  }
}

console.log(`\n${problemas === 0 ? "OK — sin problemas" : `${problemas} problema(s)`}`);
process.exit(problemas === 0 ? 0 : 1);
