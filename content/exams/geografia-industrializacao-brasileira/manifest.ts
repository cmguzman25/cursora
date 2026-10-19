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
 * Geografia: a industrialização brasileira (capítulos 10 e 11 del libro).
 *
 * Segunda prueba del grupo "Exámenes Saymons". Sale de las fotos del libro que
 * quedaron en `examenes-saymons/` (pp. 104–111 y 118–128) y las cubre enteras:
 * cada sección del texto, y cada gráfico, mapa y tabla con datos, tiene al menos
 * una pregunta que la evalúa.
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
