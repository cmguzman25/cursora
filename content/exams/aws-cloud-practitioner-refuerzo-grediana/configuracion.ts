import type { ExamDifficulty, ExamTopic, LocalizedText } from "../types";

/**
 * La ficha del refuerzo de Cloud Practitioner armado para Grediana.
 *
 * Nace de su rendida del simulacro (`aws-cloud-practitioner-simulacro`, banco v2,
 * modo estudio, 7 al 9 de octubre de 2026): 64 respondidas, 16 falladas, y las
 * mismas 16 marcadas para repasar. Cada fallo tiene acá tres preguntas nuevas que
 * enfrentan el par de conceptos que confundió. La tabla fallo → preguntas está en
 * el README.
 *
 * Solo `import type`: el verificador carga este archivo directamente con Node.
 */

export const SLUG = "aws-cloud-practitioner-refuerzo-grediana";

export const TITULO: LocalizedText = {
  es: "AWS Cloud Practitioner: refuerzo para Grediana",
};

export const DESCRIPCION: LocalizedText = {
  es: "48 preguntas nuevas armadas a partir de las 16 que Grediana falló y marcó en el simulacro: tres por cada error, cada una enfrentando el par de servicios o conceptos que se confundieron. Conviene rendirlo primero en modo estudio.",
};

/** Los cuatro dominios del CLF-C02, con los mismos ids que el simulacro. */
export const TEMAS: ExamTopic[] = [
  { id: "1", name: { es: "Conceptos de la nube" } },
  { id: "2", name: { es: "Seguridad y cumplimiento" } },
  { id: "3", name: { es: "Tecnología y servicios en la nube" } },
  { id: "4", name: { es: "Facturación, precios y soporte" } },
];

/**
 * Tres preguntas por cada fallo: 2 / 5 / 7 / 2 fallos por dominio. El desbalance
 * es a propósito, es su perfil de errores; el costo es que el intercalado agota
 * los dominios 1 y 4 en la sexta vuelta y el final del examen queda en 2 y 3.
 */
export const PREGUNTAS_POR_TEMA: Record<string, number> = {
  "1": 6,
  "2": 15,
  "3": 21,
  "4": 6,
};

export const DIFICULTAD: ExamDifficulty = "advanced";

/** ~1,5 minutos por pregunta. */
export const DURACION_SUGERIDA_MINUTOS = 70;

export const PORCENTAJE_PARA_APROBAR = 70;

/** Sube ante cualquier edición de cualquier pregunta. */
export const VERSION_DEL_BANCO = 1;

/** Prefijo de los ids de pregunta: `ref-gr-d<dominio>-q<nn>`. */
export const PREFIJO_DE_IDS = "ref-gr";
