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

export const SLUG = "geografia-industrializacao-brasileira";

export const TITULO: LocalizedText = {
  es: "Geografia: a industrialização brasileira",
  en: "Geography: Brazilian industrialization",
};

export const DESCRIPCION: LocalizedText = {
  es: "Capítulos 10 e 11 do livro: o processo de industrialização, os tipos de indústria, a história da indústria no Brasil, a Guerra Fiscal, a desconcentração industrial e os tecnopolos. Em português, como a prova. Cada alternativa errada explica o que ela é e por que não responde à pergunta.",
  en: "Chapters 10 and 11 of the textbook: the industrialization process, types of industry, the history of industry in Brazil, the Fiscal War, industrial deconcentration and technology hubs. Written in Portuguese, like the real test. Every wrong option explains what it is and why it does not answer the question.",
};

export const TEMAS: ExamTopic[] = [
  {
    id: "processo-de-industrializacao",
    name: { es: "O processo de industrialização", en: "The industrialization process" },
  },
  {
    id: "tipos-de-industria",
    name: { es: "Tipos de indústria", en: "Types of industry" },
  },
  {
    id: "brasil-industrial",
    name: {
      es: "Características do Brasil industrial (1889–1985)",
      en: "Features of industrial Brazil (1889–1985)",
    },
  },
  {
    id: "privatizacao-e-polos",
    name: {
      es: "Privatização e principais polos industriais",
      en: "Privatization and main industrial hubs",
    },
  },
  {
    id: "desconcentracao-industrial",
    name: {
      es: "O contexto atual e a desconcentração industrial",
      en: "The current context and industrial deconcentration",
    },
  },
  {
    id: "guerra-fiscal",
    name: {
      es: "Guerra Fiscal e nova espacialização industrial",
      en: "Fiscal War and the new industrial geography",
    },
  },
  {
    id: "tecnopolos",
    name: {
      es: "Tecnopolos, patentes e grandes centros administrativos",
      en: "Technology hubs, patents and major administrative centers",
    },
  },
];

/** Cuántas preguntas lleva cada tema. El verificador lo comprueba contra los archivos. */
export const PREGUNTAS_POR_TEMA: Record<string, number> = {
  "processo-de-industrializacao": 8,
  "tipos-de-industria": 8,
  "brasil-industrial": 9,
  "privatizacao-e-polos": 8,
  "desconcentracao-industrial": 9,
  "guerra-fiscal": 8,
  tecnopolos: 10,
};

export const DIFICULTAD: ExamDifficulty = "mixed";

/** ~1,5 min por pregunta. El alumno elige la duración real al empezar. */
export const DURACION_SUGERIDA_MINUTOS = 90;

export const PORCENTAJE_PARA_APROBAR = 80;

/** Se incrementa ante cualquier edición de cualquier pregunta. */
export const VERSION_DEL_BANCO = 1;

/** Prefijo de los ids de pregunta: `<PREFIJO>-t<n>-qNN`. */
export const PREFIJO_DE_IDS = "geo";
