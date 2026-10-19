import { intercalarPorTema } from "../../intercalar";
import { TEMA_PROCESSO_DE_INDUSTRIALIZACAO } from "./tema-1-processo-de-industrializacao";
import { TEMA_TIPOS_DE_INDUSTRIA } from "./tema-2-tipos-de-industria";
import { TEMA_BRASIL_INDUSTRIAL } from "./tema-3-brasil-industrial";
import { TEMA_PRIVATIZACAO_E_POLOS } from "./tema-4-privatizacao-e-polos";
import { TEMA_DESCONCENTRACAO_INDUSTRIAL } from "./tema-5-desconcentracao-industrial";
import { TEMA_GUERRA_FISCAL } from "./tema-6-guerra-fiscal";
import { TEMA_TECNOPOLOS } from "./tema-7-tecnopolos";

/**
 * Las preguntas del examen, intercaladas por tema.
 *
 * Este archivo sí puede importar valores sin extensión, porque solo lo carga el
 * empaquetador de Next. Los archivos de tema usan únicamente `import type`: el
 * verificador los carga directamente con Node y **no importa este archivo**.
 */
export const PREGUNTAS = intercalarPorTema([
  TEMA_PROCESSO_DE_INDUSTRIALIZACAO,
  TEMA_TIPOS_DE_INDUSTRIA,
  TEMA_BRASIL_INDUSTRIAL,
  TEMA_PRIVATIZACAO_E_POLOS,
  TEMA_DESCONCENTRACAO_INDUSTRIAL,
  TEMA_GUERRA_FISCAL,
  TEMA_TECNOPOLOS,
]);
