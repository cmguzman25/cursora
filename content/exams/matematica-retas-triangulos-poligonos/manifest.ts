import type { GeneratedExamBank } from "../types";
import {
  DESCRIPCION,
  DIFICULTAD,
  DURACION_SUGERIDA_MINUTOS,
  PORCENTAJE_PARA_APROBAR,
  SLUG,
  TEMAS,
  TITULO,
  VERSION_DEL_BANCO,
} from "./configuracion";
import { PREGUNTAS } from "./preguntas";

/**
 * Matemática: retas paralelas, triângulos e polígonos (capítulos 10, 11 y 12
 * del libro).
 *
 * Tercera prueba del grupo "Exámenes Saymons". Sale de las fotos del libro que
 * quedaron en `examenes-saymons/` (pp. 40–74, 76–102 y 104–128) y cubre la
 * teoría, los ejemplos resueltos, los "Voando Alto" y los tipos de ejercicio de
 * las actividades de los tres capítulos.
 *
 * Está en portugués porque la prueba real del alumno es en portugués.
 */
export const bank: GeneratedExamBank = {
  slug: SLUG,
  title: TITULO,
  description: DESCRIPCION,
  topics: TEMAS,
  difficulty: DIFICULTAD,
  suggestedDurationMinutes: DURACION_SUGERIDA_MINUTOS,
  passingPercent: PORCENTAJE_PARA_APROBAR,
  version: VERSION_DEL_BANCO,
  questions: {
    es: PREGUNTAS,
  },
};
