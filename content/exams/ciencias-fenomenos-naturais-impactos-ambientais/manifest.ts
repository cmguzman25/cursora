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
 * Ciências: fenômenos naturais e impactos ambientais (capítulo 11 del libro).
 *
 * Prueba del grupo "Exámenes Saymons". Sale de las fotos del libro que quedaron
 * en `examenes-saymons/` (pp. 48–58) y las cubre enteras: cada sección del
 * texto, cada recuadro AZpédia y el "Voando Alto" tienen al menos una pregunta.
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
