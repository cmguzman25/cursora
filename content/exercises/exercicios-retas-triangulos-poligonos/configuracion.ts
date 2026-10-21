import type { ExerciseSection, LocalizedText } from "../types";

/**
 * La ficha de la lista, sin los ejercicios. Módulo hoja (solo `import type`), para
 * que el verificador la pueda cargar con Node.
 *
 * Los ejercicios están en portugués, como el libro y la prueba real del alumno.
 */

export const SLUG = "exercicios-retas-triangulos-poligonos";

export const TITULO: LocalizedText = {
  es: "Exercícios de matemática: retas, triângulos e polígonos",
  en: "Math exercises: lines, triangles and polygons",
};

export const DESCRIPCION: LocalizedText = {
  es: "Todas as atividades e a Folha AZ dos capítulos 10, 11 e 12 do livro, com as figuras do livro. Resolva no caderno e clique em Resolver para comparar com a solução passo a passo.",
  en: "Every activity and Folha AZ exercise from chapters 10, 11 and 12 of the textbook, with the book's figures. Solve it in your notebook, then press Solve to compare with the step-by-step solution.",
};

export const SECCIONES: ExerciseSection[] = [
  {
    id: "capitulo-10",
    title: "Retas paralelas cortadas por uma transversal: ângulos",
    source: "Capítulo 10 · pp. 61–74",
  },
  { id: "capitulo-11", title: "Triângulos", source: "Capítulo 11 · pp. 94–102" },
  { id: "capitulo-12", title: "Polígonos regulares", source: "Capítulo 12 · pp. 120–128" },
];
