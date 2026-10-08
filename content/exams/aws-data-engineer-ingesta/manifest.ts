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
import { PREGUNTAS_EN, PREGUNTAS_ES } from "./preguntas";

/**
 * AWS Certified Data Engineer – Associate (DEA-C01): la parte de ingesta.
 *
 * 65 preguntas sobre la mitad de ingesta del dominio 1 del DEA-C01, en el formato del
 * examen real: 4 opciones con 1 correcta, más 10 de respuesta múltiple con 5 opciones
 * y 2 correctas.
 *
 * Bilingüe. El inglés es el original, escrito con la redacción del examen real; el
 * español es su traducción, y va en `es` porque es el idioma por defecto de la app y
 * por lo tanto el que califica (ver `src/lib/exams/generated.ts`). Las dos listas son
 * estrictamente paralelas y el verificador lo comprueba.
 *
 * `pt-BR` no está, así que cae al español por el `??` de `examQuestions`.
 *
 * Para que el inglés sea lo que se ve navegando en español, se intercambian estos dos
 * casilleros y se actualiza `IDIOMA_QUE_CALIFICA` en `configuracion.ts`. No hay nada
 * más que tocar.
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
    es: PREGUNTAS_ES,
    en: PREGUNTAS_EN,
  },
};
