import type { ExamDifficulty, ExamTopic, LocalizedText } from "../types";

/**
 * La ficha del examen, sin las preguntas.
 *
 * Vive separada de `manifest.ts` para que el verificador la pueda cargar con Node
 * (solo tiene `import type`) y comprobar que los temas y las cantidades declaradas
 * coinciden con las preguntas que hay de verdad.
 *
 * El examen está escrito en portugués: el libro y la prueba real del alumno son
 * en portugués. `questions.es` es el nombre del casillero obligatorio, no una
 * promesa sobre el idioma de lo que hay dentro.
 */

export const SLUG = "ciencias-fenomenos-naturais-impactos-ambientais";

export const TITULO: LocalizedText = {
  es: "Ciências: fenômenos naturais e impactos ambientais",
  en: "Science: natural phenomena and environmental impacts",
};

export const DESCRIPCION: LocalizedText = {
  es: "Capítulo 11 do livro: poluição do ar, efeito estufa e aquecimento global, camada de ozônio, chuva ácida, inversão térmica, poluição da água e do solo, mineração, poluição sonora, visual e luminosa, abelhas e espécies exóticas. Em português, como a prova. Cada alternativa errada explica o que ela é e por que não responde à pergunta.",
  en: "Chapter 11 of the textbook: air pollution, the greenhouse effect and global warming, the ozone layer, acid rain, thermal inversion, water and soil pollution, mining, noise, visual and light pollution, bees and exotic species. Written in Portuguese, like the real test. Every wrong option explains what it is and why it does not answer the question.",
};

export const TEMAS: ExamTopic[] = [
  {
    id: "poluicao-do-ar",
    name: { es: "Poluição ambiental e poluição do ar", en: "Environmental and air pollution" },
  },
  {
    id: "efeito-estufa",
    name: { es: "Efeito estufa e aquecimento global", en: "Greenhouse effect and global warming" },
  },
  {
    id: "camada-de-ozonio",
    name: { es: "Camada de ozônio", en: "Ozone layer" },
  },
  {
    id: "chuva-acida-e-inversao",
    name: { es: "Chuva ácida e inversão térmica", en: "Acid rain and thermal inversion" },
  },
  {
    id: "poluicao-da-agua",
    name: {
      es: "Poluição da água: eutrofização, metais tóxicos e petróleo",
      en: "Water pollution: eutrophication, toxic metals and oil",
    },
  },
  {
    id: "poluicao-do-solo",
    name: {
      es: "Poluição e degradação do solo",
      en: "Soil pollution and degradation",
    },
  },
  {
    id: "outras-poluicoes",
    name: {
      es: "Poluição sonora, visual e luminosa, abelhas e espécies exóticas",
      en: "Noise, visual and light pollution, bees and exotic species",
    },
  },
];

/** Cuántas preguntas lleva cada tema. El verificador lo comprueba contra los archivos. */
export const PREGUNTAS_POR_TEMA: Record<string, number> = {
  "poluicao-do-ar": 7,
  "efeito-estufa": 10,
  "camada-de-ozonio": 7,
  "chuva-acida-e-inversao": 9,
  "poluicao-da-agua": 9,
  "poluicao-do-solo": 11,
  "outras-poluicoes": 8,
};

export const DIFICULTAD: ExamDifficulty = "mixed";

/** ~1,5 min por pregunta. El alumno elige la duración real al empezar. */
export const DURACION_SUGERIDA_MINUTOS = 90;

export const PORCENTAJE_PARA_APROBAR = 80;

/** Se incrementa ante cualquier edición de cualquier pregunta. */
export const VERSION_DEL_BANCO = 1;

/** Prefijo de los ids de pregunta: `<PREFIJO>-t<n>-qNN`. */
export const PREFIJO_DE_IDS = "cie";
