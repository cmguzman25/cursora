import { intercalarPorTema } from "../../intercalar";
import { TEMA_1_CONCEPTOS } from "./tema-1-conceptos-de-la-nube";
import { TEMA_2_SEGURIDAD } from "./tema-2-seguridad";
import { TEMA_3_TECNOLOGIA } from "./tema-3-tecnologia";
import { TEMA_4_FACTURACION } from "./tema-4-facturacion";

/** Las 54 preguntas del segundo refuerzo, intercaladas por tema. */
export const PREGUNTAS = intercalarPorTema([
  TEMA_1_CONCEPTOS,
  TEMA_2_SEGURIDAD,
  TEMA_3_TECNOLOGIA,
  TEMA_4_FACTURACION,
]);
