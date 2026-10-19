import { intercalarPorTema } from "../../intercalar";
import { TEMA_COLOMBO_E_CONQUISTA } from "./tema-1-colombo-e-conquista";
import { TEMA_MAIAS_ASTECAS_INCAS } from "./tema-2-maias-astecas-incas";
import { TEMA_AMERICA_ESPANHOLA } from "./tema-3-america-espanhola";
import { TEMA_PORTUGUESES_NO_BRASIL } from "./tema-4-portugueses-no-brasil";
import { TEMA_CAPITANIAS_HEREDITARIAS } from "./tema-5-capitanias-hereditarias";
import { TEMA_GOVERNO_GERAL_E_JESUITAS } from "./tema-6-governo-geral-e-jesuitas";

/**
 * Las preguntas del examen, intercaladas por tema.
 *
 * Este archivo sí puede importar valores sin extensión, porque solo lo carga el
 * empaquetador de Next. Los archivos de tema usan únicamente `import type`: el
 * verificador los carga directamente con Node y **no importa este archivo**.
 */
export const PREGUNTAS = intercalarPorTema([
  TEMA_COLOMBO_E_CONQUISTA,
  TEMA_MAIAS_ASTECAS_INCAS,
  TEMA_AMERICA_ESPANHOLA,
  TEMA_PORTUGUESES_NO_BRASIL,
  TEMA_CAPITANIAS_HEREDITARIAS,
  TEMA_GOVERNO_GERAL_E_JESUITAS,
]);
