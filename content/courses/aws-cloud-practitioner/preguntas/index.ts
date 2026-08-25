import type { ExamQuizQuestion } from "../../types";
import { MODULE_1_QUESTIONS } from "./modulo-1";

/** Maps each "quiz" lesson id to its question bank. */
export const EXAM_QUIZZES: Record<string, ExamQuizQuestion[]> = {
  "08-analisis-preguntas-modulo-1": MODULE_1_QUESTIONS,
};
