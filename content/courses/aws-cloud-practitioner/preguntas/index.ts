import type { LocalizedQuestions } from "../../types";
import { MODULE_1_QUESTIONS } from "./modulo-1";
import { MODULE_2_QUESTIONS } from "./modulo-2";
import { MODULE_3_QUESTIONS } from "./modulo-3";

/** Maps each "quiz" lesson id to its question bank, per locale. */
export const EXAM_QUIZZES: Record<string, LocalizedQuestions> = {
  "08-analisis-preguntas-modulo-1": { es: MODULE_1_QUESTIONS },
  "15-analisis-preguntas-modulo-2": { es: MODULE_2_QUESTIONS },
  "27-analisis-preguntas-modulo-3": { es: MODULE_3_QUESTIONS },
};
