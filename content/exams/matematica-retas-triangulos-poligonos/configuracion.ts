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

export const SLUG = "matematica-retas-triangulos-poligonos";

export const TITULO: LocalizedText = {
  es: "Matemática: retas paralelas, triângulos e polígonos",
  en: "Math: parallel lines, triangles and polygons",
};

export const DESCRIPCION: LocalizedText = {
  es: "Capítulos 10, 11 e 12 do livro: retas paralelas cortadas por uma transversal e seus ângulos, triângulos (elementos, classificação, soma dos ângulos e condição de existência) e polígonos regulares (diagonais, ângulos internos e externos). Em português, como a prova. Cada alternativa errada explica o que ela é e por que não responde à pergunta.",
  en: "Chapters 10, 11 and 12 of the textbook: parallel lines cut by a transversal and their angles, triangles (elements, classification, angle sum and the triangle inequality) and regular polygons (diagonals, interior and exterior angles). Written in Portuguese, like the real test. Every wrong option explains what it is and why it does not answer the question.",
};

export const TEMAS: ExamTopic[] = [
  {
    id: "retas-no-plano",
    name: { es: "Retas paralelas, concorrentes e transversais", en: "Parallel, intersecting and transversal lines" },
  },
  {
    id: "angulos-opostos-pelo-vertice",
    name: {
      es: "Ângulos adjacentes, suplementares e opostos pelo vértice",
      en: "Adjacent, supplementary and vertical angles",
    },
  },
  {
    id: "angulos-com-transversal",
    name: {
      es: "Ângulos correspondentes, alternos e colaterais",
      en: "Corresponding, alternate and same-side angles",
    },
  },
  {
    id: "triangulos-elementos-e-classificacao",
    name: {
      es: "Triângulos: elementos, classificação e construção",
      en: "Triangles: elements, classification and construction",
    },
  },
  {
    id: "triangulos-angulos-e-existencia",
    name: {
      es: "Triângulos: soma dos ângulos e condição de existência",
      en: "Triangles: angle sum and the triangle inequality",
    },
  },
  {
    id: "poligonos-regulares",
    name: {
      es: "Polígonos regulares: diagonais e ângulos",
      en: "Regular polygons: diagonals and angles",
    },
  },
];

/** Cuántas preguntas lleva cada tema. El verificador lo comprueba contra los archivos. */
export const PREGUNTAS_POR_TEMA: Record<string, number> = {
  "retas-no-plano": 7,
  "angulos-opostos-pelo-vertice": 9,
  "angulos-com-transversal": 13,
  "triangulos-elementos-e-classificacao": 10,
  "triangulos-angulos-e-existencia": 11,
  "poligonos-regulares": 15,
};

export const DIFICULTAD: ExamDifficulty = "mixed";

/** ~1,5 min por pregunta. El alumno elige la duración real al empezar. */
export const DURACION_SUGERIDA_MINUTOS = 98;

export const PORCENTAJE_PARA_APROBAR = 80;

/** Se incrementa ante cualquier edición de cualquier pregunta. */
export const VERSION_DEL_BANCO = 1;

/** Prefijo de los ids de pregunta: `<PREFIJO>-t<n>-qNN`. */
export const PREFIJO_DE_IDS = "mat";
