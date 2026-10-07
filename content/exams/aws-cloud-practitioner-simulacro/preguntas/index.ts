import { intercalarPorTema } from "../../intercalar";
import { TEMA_1_CONCEPTOS } from "./tema-1-conceptos-de-la-nube";
import { TEMA_2_SEGURIDAD } from "./tema-2-seguridad";
import { TEMA_3_TECNOLOGIA } from "./tema-3-tecnologia";
import { TEMA_4_FACTURACION } from "./tema-4-facturacion";

/**
 * Las 65 preguntas del simulacro, intercaladas por tema.
 *
 * **Este examen tiene su propia copia de las preguntas.** Nacieron en
 * `content/courses/aws-cloud-practitioner/preguntas/simulacro/`, pero ese banco
 * quedó congelado: las correcciones se hacen acá y no se llevan allá. Son dos
 * bancos independientes que arrancaron idénticos, no uno compartido.
 *
 * Si algún día hay que tocar el del curso, sepa quien lo haga que esta copia
 * **ya divergió**: ver la sección "Correcciones" del README.
 */
export const PREGUNTAS = intercalarPorTema([
  TEMA_1_CONCEPTOS,
  TEMA_2_SEGURIDAD,
  TEMA_3_TECNOLOGIA,
  TEMA_4_FACTURACION,
]);
