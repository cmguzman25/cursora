import { intercalarPorTema } from "../../intercalar";
import { TEMA_POLUICAO_DO_AR } from "./tema-1-poluicao-do-ar";
import { TEMA_EFEITO_ESTUFA } from "./tema-2-efeito-estufa";
import { TEMA_CAMADA_DE_OZONIO } from "./tema-3-camada-de-ozonio";
import { TEMA_CHUVA_ACIDA_E_INVERSAO } from "./tema-4-chuva-acida-e-inversao";
import { TEMA_POLUICAO_DA_AGUA } from "./tema-5-poluicao-da-agua";
import { TEMA_POLUICAO_DO_SOLO } from "./tema-6-poluicao-do-solo";
import { TEMA_OUTRAS_POLUICOES } from "./tema-7-outras-poluicoes";

/**
 * Las preguntas del examen, intercaladas por tema.
 *
 * Este archivo sí puede importar valores sin extensión, porque solo lo carga el
 * empaquetador de Next. Los archivos de tema usan únicamente `import type`: el
 * verificador los carga directamente con Node y **no importa este archivo**.
 */
export const PREGUNTAS = intercalarPorTema([
  TEMA_POLUICAO_DO_AR,
  TEMA_EFEITO_ESTUFA,
  TEMA_CAMADA_DE_OZONIO,
  TEMA_CHUVA_ACIDA_E_INVERSAO,
  TEMA_POLUICAO_DA_AGUA,
  TEMA_POLUICAO_DO_SOLO,
  TEMA_OUTRAS_POLUICOES,
]);
