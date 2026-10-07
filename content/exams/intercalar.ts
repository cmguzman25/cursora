import type { ExamQuestionWithTopic } from "./types";

/**
 * Reparte las preguntas de los temas en forma alternada: una de cada tema por
 * vuelta, hasta agotar cada lista. Sin esto el examen serviría ocho preguntas de
 * un tema al hilo y después seis de otro, que le da al alumno una pista de
 * contexto —"estamos en condicionales, la respuesta tiene que ser un
 * condicional"— que no tendría respondiendo salteado.
 *
 * Es determinista a propósito, nada de orden aleatorio. El progreso de una
 * rendida se guarda por **id** de pregunta y no por posición, así que este orden
 * se puede cambiar sin invalidar las rendidas ya guardadas; pero un orden que
 * cambiara en cada carga haría imposible comparar dos rendidas del mismo alumno.
 *
 * Un aviso para quien arme un banco muy desbalanceado: con un tema de 30
 * preguntas y otro de 5, el intercalado agota el corto en la quinta vuelta y las
 * últimas 25 quedan monotemáticas. No es un error de esta función, es el reparto;
 * el skill `generar-examen` lo advierte al elegir cuántas preguntas por tema.
 *
 * Vive en su propio archivo, sin más dependencias que un `import type`, para que
 * el verificador de preguntas pueda cargarlo directamente con Node.
 */
export function intercalarPorTema(listas: ExamQuestionWithTopic[][]): ExamQuestionWithTopic[] {
  const resultado: ExamQuestionWithTopic[] = [];
  const masLarga = Math.max(0, ...listas.map((lista) => lista.length));

  for (let vuelta = 0; vuelta < masLarga; vuelta++) {
    for (const lista of listas) {
      const pregunta = lista[vuelta];
      if (pregunta) resultado.push(pregunta);
    }
  }

  return resultado;
}
