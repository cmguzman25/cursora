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
 * AWS Cloud Practitioner: simulacro de examen.
 *
 * Las 65 preguntas del simulacro final del curso, servidas también desde
 * `/exams`. Las preguntas son las mismas y están en un solo lugar: este manifest
 * las toma del banco del curso a través de `preguntas/index.ts`.
 *
 * Solo tiene el casillero `es`. Las traducciones del banco del curso tampoco
 * existen todavía, y se harán de una vez para los dos.
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
