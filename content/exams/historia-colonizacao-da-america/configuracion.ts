import type { ExamDifficulty, ExamTopic, LocalizedText } from "../types";

/**
 * La ficha del examen, sin las preguntas.
 *
 * Vive separada de `manifest.ts` para que el verificador la pueda cargar con Node
 * (solo tiene `import type`) y comprobar que los temas y las cantidades declaradas
 * coinciden con las preguntas que hay de verdad.
 *
 * El examen está escrito en portugués: la guía de estudio, el libro y la prueba
 * real del alumno son en portugués. `questions.es` es el nombre del casillero
 * obligatorio, no una promesa sobre el idioma de lo que hay dentro.
 */

export const SLUG = "historia-colonizacao-da-america";

export const TITULO: LocalizedText = {
  es: "História: a colonização da América",
  en: "History: the colonization of the Americas",
};

export const DESCRIPCION: LocalizedText = {
  es: "Capítulos 9, 10 e 11 do livro: a colonização espanhola, a chegada dos portugueses e a administração colonial no Brasil. Em português, como a prova. Cada alternativa errada explica o que ela é e por que não responde à pergunta.",
  en: "Chapters 9, 10 and 11 of the textbook: Spanish colonization, the arrival of the Portuguese and colonial administration in Brazil. Written in Portuguese, like the real test. Every wrong option explains what it is and why it does not answer the question.",
};

export const TEMAS: ExamTopic[] = [
  {
    id: "colombo-e-conquista",
    name: {
      es: "Colombo e a conquista dos povos nativos",
      en: "Columbus and the conquest of native peoples",
    },
  },
  {
    id: "maias-astecas-incas",
    name: { es: "Maias, astecas e incas", en: "Maya, Aztecs and Incas" },
  },
  {
    id: "america-espanhola",
    name: {
      es: "Administração e sociedade na América espanhola",
      en: "Administration and society in Spanish America",
    },
  },
  {
    id: "portugueses-no-brasil",
    name: {
      es: "Os portugueses no Brasil: Cabral, Caminha e pau-brasil",
      en: "The Portuguese in Brazil: Cabral, Caminha and brazilwood",
    },
  },
  {
    id: "capitanias-hereditarias",
    name: { es: "Capitanias hereditárias", en: "Hereditary captaincies" },
  },
  {
    id: "governo-geral-e-jesuitas",
    name: {
      es: "Governo-Geral, Tamoios e jesuítas",
      en: "General Government, Tamoios and Jesuits",
    },
  },
];

/** Cuántas preguntas lleva cada tema. El verificador lo comprueba contra los archivos. */
export const PREGUNTAS_POR_TEMA: Record<string, number> = {
  "colombo-e-conquista": 10,
  "maias-astecas-incas": 10,
  "america-espanhola": 10,
  "portugueses-no-brasil": 10,
  "capitanias-hereditarias": 10,
  "governo-geral-e-jesuitas": 10,
};

export const DIFICULTAD: ExamDifficulty = "mixed";

/** ~1,5 min por pregunta. El alumno elige la duración real al empezar. */
export const DURACION_SUGERIDA_MINUTOS = 90;

export const PORCENTAJE_PARA_APROBAR = 80;

/** Se incrementa ante cualquier edición de cualquier pregunta. */
export const VERSION_DEL_BANCO = 1;

/** Prefijo de los ids de pregunta: `<PREFIJO>-t<n>-qNN`. */
export const PREFIJO_DE_IDS = "hist";
