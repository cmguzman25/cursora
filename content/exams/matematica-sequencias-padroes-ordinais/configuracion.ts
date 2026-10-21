import type { ExamDifficulty, ExamTopic, LocalizedText } from "../types";

/**
 * La ficha del examen, sin las preguntas.
 *
 * Vive separada de `manifest.ts` para que el verificador la pueda cargar con Node
 * (solo tiene `import type`) y comprobar que los temas y las cantidades declaradas
 * coinciden con las preguntas que hay de verdad.
 *
 * El examen está escrito en portugués, con frases cortas: es para una alumna de 7
 * años de 2º ano, y el libro y la prueba real son en portugués. `questions.es` es
 * el nombre del casillero obligatorio, no una promesa sobre el idioma de lo que
 * hay dentro.
 */

export const SLUG = "matematica-sequencias-padroes-ordinais";

export const TITULO: LocalizedText = {
  es: "Matemática: sequências, padrões e ordinais",
  en: "Math: sequences, patterns and ordinal numbers",
};

export const DESCRIPCION: LocalizedText = {
  es: "Páginas 48 a 68 do livro: sequências numéricas, pares e ímpares, crescente e decrescente, a calculadora, padrões de cores e formas e os números ordinais. Com os mesmos exemplos do livro. Cada resposta explica por que está certa ou errada.",
  en: "Textbook pages 48 to 68: number sequences, even and odd, increasing and decreasing, the calculator, color and shape patterns, and ordinal numbers. Uses the textbook's own examples, in Portuguese. Every answer explains why it is right or wrong.",
};

export const TEMAS: ExamTopic[] = [
  {
    id: "sequencias-numericas",
    name: { es: "Sequências numéricas e o número que falta", en: "Number sequences and the missing number" },
  },
  {
    id: "pares-impares-crescente-decrescente",
    name: {
      es: "Pares e ímpares, crescente e decrescente",
      en: "Even and odd, increasing and decreasing",
    },
  },
  {
    id: "padroes-de-cores-e-formas",
    name: { es: "Padrões de cores e de formas", en: "Color and shape patterns" },
  },
  {
    id: "numerais-ordinais",
    name: { es: "Numerais ordinais", en: "Ordinal numbers" },
  },
];

/** Cuántas preguntas lleva cada tema. El verificador lo comprueba contra los archivos. */
export const PREGUNTAS_POR_TEMA: Record<string, number> = {
  "sequencias-numericas": 10,
  "pares-impares-crescente-decrescente": 9,
  "padroes-de-cores-e-formas": 8,
  "numerais-ordinais": 10,
};

export const DIFICULTAD: ExamDifficulty = "introductory";

/** ~1,5 min por pregunta. La alumna elige la duración real al empezar. */
export const DURACION_SUGERIDA_MINUTOS = 55;

export const PORCENTAJE_PARA_APROBAR = 70;

/** Se incrementa ante cualquier edición de cualquier pregunta. */
export const VERSION_DEL_BANCO = 4;

/** Prefijo de los ids de pregunta: `<PREFIJO>-t<n>-qNN`. */
export const PREFIJO_DE_IDS = "mat";
