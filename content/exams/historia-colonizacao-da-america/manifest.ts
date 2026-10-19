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
 * História: a colonização da América (capítulos 9, 10 e 11 del libro).
 *
 * Primera prueba del grupo "Exámenes Saymons". Sale de la guía de estudio
 * `examenes-saymons/Historia_Guia_de_Estudo_v1.pdf` y la cubre entera: cada
 * página de contenido de la guía tiene al menos un tema que la evalúa.
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
