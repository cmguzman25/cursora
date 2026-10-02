import type { PracticeExamBank } from "../../../types";
import {
  DOMINIOS,
  DURACION_MINUTOS,
  FRACCION_PARA_APROBAR,
  NOTA_MAXIMA,
  NOTA_MINIMA,
  NOTA_PARA_APROBAR,
  VERSION_DEL_BANCO,
} from "./configuracion";
import { intercalarPorDominio } from "./intercalar";
import { SIM_D1 } from "./dominio-1";
import { SIM_D2 } from "./dominio-2";
import { SIM_D3 } from "./dominio-3";
import { SIM_D4 } from "./dominio-4";

/**
 * Simulacro final del curso (lección "34-simulacro-de-examen"): 65 preguntas
 * en 90 minutos, igual que el CLF-C02 real.
 *
 * El reparto por dominio sigue los pesos oficiales lo más de cerca que permite
 * un total de 65 preguntas: 16 / 19 / 22 / 8, o sea 24,6 / 29,2 / 33,8 / 12,3 %
 * contra el 24 / 30 / 34 / 12 % publicado por AWS.
 *
 * Este archivo solo ensambla. Las preguntas están en un archivo por dominio,
 * los parámetros en `configuracion.ts` y el orden en `intercalar.ts`.
 */
export const FINAL_EXAM: PracticeExamBank = {
  durationMinutes: DURACION_MINUTOS,
  scaledMin: NOTA_MINIMA,
  scaledMax: NOTA_MAXIMA,
  passingScore: NOTA_PARA_APROBAR,
  passingRawFraction: FRACCION_PARA_APROBAR,
  version: VERSION_DEL_BANCO,
  domains: DOMINIOS,
  questions: { es: intercalarPorDominio([SIM_D1, SIM_D2, SIM_D3, SIM_D4]) },
};
