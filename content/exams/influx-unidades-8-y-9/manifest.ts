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
 * Influx, Units 8 y 9: Favors and Requests · Complaints and Apologies.
 *
 * Las frases, los ejemplos y el vocabulario salen del libro, tal como están
 * impresos, porque el examen real del alumno se basa en ese contenido. Los
 * enunciados y las explicaciones están en español y el material en inglés;
 * cuando el libro da una traducción al portugués, el enunciado la cita para
 * desambiguar, igual que hacen los Consolidation Exercises.
 *
 * Las preguntas viven en `questions.es`, que es el nombre del casillero
 * obligatorio, no una promesa sobre el idioma del contenido.
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
