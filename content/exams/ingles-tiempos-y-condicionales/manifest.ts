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
 * Inglés: present perfect y condicionales.
 *
 * Examen semilla de la sección `/exams`. Es corto a propósito — ocho preguntas —
 * porque su trabajo es que la sección tenga contra qué desarrollarse y probarse;
 * los exámenes de verdad los escribe el skill `generar-examen`.
 *
 * Los enunciados están en español y el material a evaluar en inglés, que es el
 * formato que le sirve a un hispanohablante estudiando inglés: la consigna no
 * debería ser parte de la dificultad.
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
