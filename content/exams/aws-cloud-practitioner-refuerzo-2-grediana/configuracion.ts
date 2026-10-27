import type { ExamDifficulty, ExamTopic, LocalizedText } from "../types";

/**
 * La ficha del segundo refuerzo de Cloud Practitioner armado para Grediana.
 *
 * Nace de su rendida del primer refuerzo (`aws-cloud-practitioner-refuerzo-grediana`,
 * modo estudio, 14 al 18 de octubre de 2026): respondió las 48 preguntas, 17 siguen
 * falladas en su último intento y marcó para repasar esas mismas más una que después
 * acertó. Cada una tiene acá tres preguntas nuevas. La tabla fallo → preguntas está en
 * el README.
 *
 * Solo `import type`: el verificador carga este archivo directamente con Node.
 */

export const SLUG = "aws-cloud-practitioner-refuerzo-2-grediana";

export const TITULO: LocalizedText = {
  es: "AWS Cloud Practitioner: segundo refuerzo para Grediana",
};

export const DESCRIPCION: LocalizedText = {
  es: "54 preguntas nuevas sobre las 18 que Grediana siguió fallando o marcó en el primer refuerzo: conectividad híbrida, almacenamiento, analítica, CI/CD, servicios de seguridad, pilares y precios. Tres por cada una, desde ángulos que todavía no vio. Conviene rendirlo primero en modo estudio.",
};

/** Los cuatro dominios del CLF-C02, con los mismos ids que el simulacro. */
export const TEMAS: ExamTopic[] = [
  { id: "1", name: { es: "Conceptos de la nube" } },
  { id: "2", name: { es: "Seguridad y cumplimiento" } },
  { id: "3", name: { es: "Tecnología y servicios en la nube" } },
  { id: "4", name: { es: "Facturación, precios y soporte" } },
];

/**
 * Tres preguntas por cada pregunta pendiente o marcada: 2 / 3 / 11 / 2 por dominio.
 * El desbalance es su perfil de errores; el intercalado agota los dominios 1 y 4 en
 * la sexta vuelta y los 2 en la novena, así que las últimas 24 son del dominio 3.
 */
export const PREGUNTAS_POR_TEMA: Record<string, number> = {
  "1": 6,
  "2": 9,
  "3": 33,
  "4": 6,
};

export const DIFICULTAD: ExamDifficulty = "advanced";

/** ~1,4 minutos por pregunta. */
export const DURACION_SUGERIDA_MINUTOS = 75;

export const PORCENTAJE_PARA_APROBAR = 70;

/** Sube ante cualquier edición de cualquier pregunta. */
export const VERSION_DEL_BANCO = 1;

/** Prefijo de los ids de pregunta: `ref2-gr-d<dominio>-q<nn>`. */
export const PREFIJO_DE_IDS = "ref2-gr";
