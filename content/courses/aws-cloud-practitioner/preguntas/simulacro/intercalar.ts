import type { ExamQuestionWithDomain } from "../../../types";

/**
 * Reparte las preguntas de los cuatro dominios en forma alternada: una de cada
 * dominio por vuelta, hasta agotar cada lista. Sin esto el simulacro serviría
 * 16 preguntas de conceptos de la nube al hilo y después 19 de seguridad, que
 * no se parece al examen real y encima le da al alumno una pista de contexto
 * que el examen no le va a dar.
 *
 * Es determinista a propósito — nada de orden aleatorio. El progreso de un
 * intento se guarda por **id** de pregunta, no por posición, así que este
 * orden se puede cambiar sin invalidar los intentos ya rendidos; pero un orden
 * que cambiara en cada carga haría imposible comparar dos intentos del mismo
 * alumno.
 *
 * Vive en su propio archivo, sin más dependencias que un `import type`, para
 * que el verificador de preguntas pueda cargarlo directamente con Node.
 */
export function intercalarPorDominio(
  listas: ExamQuestionWithDomain[][],
): ExamQuestionWithDomain[] {
  const resultado: ExamQuestionWithDomain[] = [];
  const masLarga = Math.max(...listas.map((lista) => lista.length));

  for (let vuelta = 0; vuelta < masLarga; vuelta++) {
    for (const lista of listas) {
      const pregunta = lista[vuelta];
      if (pregunta) resultado.push(pregunta);
    }
  }

  return resultado;
}
