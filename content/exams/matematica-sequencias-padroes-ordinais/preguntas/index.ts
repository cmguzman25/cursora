import { intercalarPorTema } from "../../intercalar";
import { TEMA_SEQUENCIAS_NUMERICAS } from "./tema-1-sequencias-numericas";
import { TEMA_PARES_IMPARES_CRESCENTE_DECRESCENTE } from "./tema-2-pares-impares-crescente-decrescente";
import { TEMA_PADROES_DE_CORES_E_FORMAS } from "./tema-3-padroes-de-cores-e-formas";
import { TEMA_NUMERAIS_ORDINAIS } from "./tema-4-numerais-ordinais";

/**
 * Las preguntas del examen, intercaladas por tema.
 *
 * Este archivo sí puede importar valores sin extensión, porque solo lo carga el
 * empaquetador de Next. Los archivos de tema usan únicamente `import type`: el
 * verificador los carga directamente con Node y **no importa este archivo**.
 */
export const PREGUNTAS = intercalarPorTema([
  TEMA_SEQUENCIAS_NUMERICAS,
  TEMA_PARES_IMPARES_CRESCENTE_DECRESCENTE,
  TEMA_PADROES_DE_CORES_E_FORMAS,
  TEMA_NUMERAIS_ORDINAIS,
]);
