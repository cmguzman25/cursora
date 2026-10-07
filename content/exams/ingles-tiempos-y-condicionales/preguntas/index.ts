import { intercalarPorTema } from "../../intercalar";
import { TEMA_PRESENT_PERFECT } from "./tema-1-present-perfect";
import { TEMA_CONDICIONALES } from "./tema-2-condicionales";

/**
 * Las preguntas del examen, intercaladas por tema.
 *
 * Este archivo sí puede importar valores sin extensión, porque solo lo carga el
 * empaquetador de Next. Los archivos de tema, en cambio, usan únicamente
 * `import type`: el verificador los carga directamente con Node, que no resuelve
 * imports sin extensión. Por eso el verificador **no importa este archivo** —
 * reensambla el banco por su cuenta.
 */
export const PREGUNTAS = intercalarPorTema([TEMA_PRESENT_PERFECT, TEMA_CONDICIONALES]);
