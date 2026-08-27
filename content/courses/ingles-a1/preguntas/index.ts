import type { ExamQuizQuestion } from "../../types";

/**
 * Relaciona cada clase de tipo cuestionario con su banco de preguntas.
 *
 * La página de clase ya contempla que falte el banco: una clase con
 * `kind: "quiz"` sin entrada aquí muestra el aviso de "todavía no está lista",
 * igual que una clase sin su archivo Markdown. Por eso este mapa arranca vacío
 * y va creciendo unidad por unidad.
 *
 * Cómo se escriben las preguntas está en `CONTRATO-DE-CLASES.md` (tipo C). Las
 * cantidades son fijas: 12 a 15 por unidad y 40 en el examen final.
 *
 *   01-08-quiz-unidad-1  → unidad-1.ts   (12–15)  to be, presentarse
 *   02-08-quiz-unidad-2  → unidad-2.ts   (12–15)  artículos, plurales, have
 *   03-08-quiz-unidad-3  → unidad-3.ts   (12–15)  presente simple
 *   04-08-quiz-unidad-4  → unidad-4.ts   (12–15)  there is/are, lugar
 *   05-08-quiz-unidad-5  → unidad-5.ts   (12–15)  gustos, can
 *   06-08-quiz-unidad-6  → unidad-6.ts   (12–15)  contables, compras
 *   07-08-quiz-unidad-7  → unidad-7.ts   (12–15)  presente continuo
 *   08-08-quiz-unidad-8  → unidad-8.ts   (12–15)  pasado regular
 *   09-08-quiz-unidad-9  → unidad-9.ts   (12–15)  pasado irregular, conectores
 *   10-08-quiz-unidad-10 → unidad-10.ts  (12–15)  futuro
 *   11-08-quiz-unidad-11 → unidad-11.ts  (12–15)  modales, comparativos
 *   12-07-examen-final-a1 → examen-final.ts (40)  todo el A1, preguntas nuevas
 */
export const EXAM_QUIZZES: Record<string, ExamQuizQuestion[]> = {};
