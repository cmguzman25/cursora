import type { LocalizedQuestions } from "../../types";
import { MODULE_0_QUESTIONS } from "./modulo-0";

/**
 * Relaciona cada clase de tipo cuestionario con su banco de preguntas.
 *
 * La página de clase ya contempla que falte el banco: una clase con
 * `kind: "quiz"` sin entrada aquí muestra el aviso de "todavía no está lista",
 * igual que una clase sin su archivo Markdown. Por eso el mapa va creciendo
 * módulo a módulo en lugar de tener que estar completo.
 *
 * Cómo se escriben las preguntas está en `CONTRATO-DE-CLASES.md` (tipo C). Las
 * cantidades son fijas: de 12 a 15 por módulo, con 2 o 3 preguntas de módulos
 * anteriores en cada uno.
 *
 *   00-08-checkpoint-modulo-0 → modulo-0.ts  entorno, Git y Claude Code
 *   01-11-checkpoint-modulo-1 → modulo-1.ts  editor, C#, cámara, raycast
 *   02-19-checkpoint-modulo-2 → modulo-2.ts  Blender: modelar, UV, rig, export
 *   03-11-checkpoint-modulo-3 → modulo-3.ts  selección, NavMesh, estados
 *   04-12-checkpoint-modulo-4 → modulo-4.ts  recursos, recolección, construcción
 *   05-12-checkpoint-modulo-5 → modulo-5.ts  combate, niebla, bot
 *   06-08-checkpoint-modulo-6 → modulo-6.ts  HUD, guardado, rendimiento
 *   07-13-checkpoint-final    → final.ts     multijugador y repaso del curso
 */
export const EXAM_QUIZZES: Record<string, LocalizedQuestions> = {
  "00-08-checkpoint-modulo-0": { es: MODULE_0_QUESTIONS },
};
