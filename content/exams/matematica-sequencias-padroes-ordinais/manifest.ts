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
 * Matemática: sequências, padrões e ordinais (pp. 48–68 del libro).
 *
 * Primera prueba del grupo "Exámenes Lucía". Sale de las fotos del libro que
 * quedaron en `examenes-lucia/` y las cubre enteras, con los mismos ejemplos del
 * libro.
 *
 * Está en portugués, con frases cortas, porque la alumna tiene 7 años y la prueba
 * real es en portugués. El aspecto rosa con unicornios no es de este banco sino de
 * su grupo (`theme: "unicornio"` en `content/exams/groups.ts`).
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
