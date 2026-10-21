import { intercalarPorTema } from "../../intercalar";
import { TEMA_RETAS_NO_PLANO } from "./tema-1-retas-no-plano";
import { TEMA_ANGULOS_OPOSTOS_PELO_VERTICE } from "./tema-2-angulos-opostos-pelo-vertice";
import { TEMA_ANGULOS_COM_TRANSVERSAL } from "./tema-3-angulos-com-transversal";
import { TEMA_TRIANGULOS_ELEMENTOS } from "./tema-4-triangulos-elementos-e-classificacao";
import { TEMA_TRIANGULOS_ANGULOS } from "./tema-5-triangulos-angulos-e-existencia";
import { TEMA_POLIGONOS_REGULARES } from "./tema-6-poligonos-regulares";

/**
 * Las preguntas del examen, intercaladas por tema.
 *
 * Este archivo sí puede importar valores sin extensión, porque solo lo carga el
 * empaquetador de Next. Los archivos de tema usan únicamente `import type`: el
 * verificador los carga directamente con Node y **no importa este archivo**.
 */
export const PREGUNTAS = intercalarPorTema([
  TEMA_RETAS_NO_PLANO,
  TEMA_ANGULOS_OPOSTOS_PELO_VERTICE,
  TEMA_ANGULOS_COM_TRANSVERSAL,
  TEMA_TRIANGULOS_ELEMENTOS,
  TEMA_TRIANGULOS_ANGULOS,
  TEMA_POLIGONOS_REGULARES,
]);
