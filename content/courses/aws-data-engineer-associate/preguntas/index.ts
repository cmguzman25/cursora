import type { ExamQuizQuestion } from "../../types";

/**
 * Maps each "quiz" lesson id to its question bank.
 *
 * Empty until the first bank is written. The lesson page already handles a
 * missing bank: a `kind: "quiz"` lesson with no entry here renders the
 * "not ready yet" placeholder, same as a lesson without its markdown file.
 *
 * Question counts per lesson are fixed in `README.md` and the rules for
 * writing them in `CONTRATO-DE-CLASES.md` (lesson types C and D). The per-module
 * counts add up to the official domain weights — don't change one without
 * rechecking the totals.
 *
 *   01-10-analisis-preguntas-modulo-1  → modulo-1.ts   (15)  fundamentos
 *   02-18-analisis-preguntas-modulo-2  → modulo-2.ts   (16)  D1 · ingesta
 *   03-17-analisis-preguntas-modulo-3  → modulo-3.ts   (12)  D1 · transformación
 *   04-14-analisis-preguntas-modulo-4  → modulo-4.ts   (10)  D1 · orquestación
 *   05-18-analisis-preguntas-modulo-5  → modulo-5.ts   (14)  D2 · almacenes
 *   06-19-analisis-preguntas-modulo-6  → modulo-6.ts   (14)  D2 · catálogo y modelado
 *   07-17-analisis-preguntas-modulo-7  → modulo-7.ts   (13)  D3 · automatización
 *   08-14-analisis-preguntas-modulo-8  → modulo-8.ts   (11)  D3 · monitoreo y calidad
 *   09-15-analisis-preguntas-modulo-9  → modulo-9.ts   (10)  D4 · identidad
 *   10-16-analisis-preguntas-modulo-10 → modulo-10.ts  (10)  D4 · cifrado y gobierno
 *   11-04-simulacro-completo           → simulacro.ts  (65)  todos los dominios
 */
export const EXAM_QUIZZES: Record<string, ExamQuizQuestion[]> = {};
