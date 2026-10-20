import { intercalarPorTema } from "../../intercalar";
import { TEMA_LESSON_15 } from "./tema-1-lesson-15";
import { TEMA_LESSON_16 } from "./tema-2-lesson-16";
import { TEMA_LESSON_17 } from "./tema-3-lesson-17";
import { TEMA_LESSON_18 } from "./tema-4-lesson-18";

/**
 * Las preguntas del examen, intercaladas por tema.
 *
 * Este archivo sí puede importar valores sin extensión, porque solo lo carga el
 * empaquetador de Next. Los archivos de tema usan únicamente `import type`: el
 * verificador los carga directamente con Node, que no resuelve imports sin
 * extensión. Por eso el verificador **no importa este archivo** — reensambla el
 * banco por su cuenta.
 */
export const PREGUNTAS = intercalarPorTema([
  TEMA_LESSON_15,
  TEMA_LESSON_16,
  TEMA_LESSON_17,
  TEMA_LESSON_18,
]);
