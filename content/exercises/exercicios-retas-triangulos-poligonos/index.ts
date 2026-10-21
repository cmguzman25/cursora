import type { ExerciseSet } from "../types";
import { DESCRIPCION, SECCIONES, SLUG, TITULO } from "./configuracion";
import { CAPITULO_10 } from "./capitulo-10";
import { CAPITULO_11 } from "./capitulo-11";
import { CAPITULO_12 } from "./capitulo-12";

/**
 * Ejercicios prácticos de Saymons: las actividades de los capítulos 10, 11 y 12
 * del libro de Matemática, en el orden del libro. Acompañan a la prueba
 * `matematica-retas-triangulos-poligonos` del mismo grupo.
 */
export const set: ExerciseSet = {
  slug: SLUG,
  title: TITULO,
  description: DESCRIPCION,
  sections: SECCIONES,
  exercises: [...CAPITULO_10, ...CAPITULO_11, ...CAPITULO_12],
};
