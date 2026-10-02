import type { ExamDomain } from "../../../types";

/**
 * Parámetros del simulacro final, separados de las preguntas: duración, escala
 * de la nota y los cuatro dominios con su peso oficial.
 *
 * Están acá y no en el componente para que el día que otro curso quiera su
 * propio simulacro (el de Data Engineer dura 130 minutos) no haya que tocar la
 * interfaz. Y están en un archivo aparte del índice, sin más dependencias que
 * un `import type`, para que el verificador pueda cargarlos con Node.
 */

export const DURACION_MINUTOS = 90;
export const NOTA_MINIMA = 100;
export const NOTA_MAXIMA = 1000;
export const NOTA_PARA_APROBAR = 700;

/**
 * La fracción de aciertos a la que se ancla la nota de aprobación. Se eligió
 * 0,70 para que los 700 puntos caigan exactamente en el 70 % de respuestas
 * correctas, que es el número que el alumno ya tiene en la cabeza: así la nota
 * reportada y su propia cuenta mental coinciden en vez de contradecirse.
 */
export const FRACCION_PARA_APROBAR = 0.7;

/** Se incrementa al agregar, quitar, reescribir o re-clavar una pregunta. */
export const VERSION_DEL_BANCO = 1;

export const DOMINIOS: ExamDomain[] = [
  {
    id: "1",
    name: {
      es: "Conceptos de la nube",
      en: "Cloud Concepts",
      "pt-BR": "Conceitos de nuvem",
    },
    weight: 0.24,
  },
  {
    id: "2",
    name: {
      es: "Seguridad y cumplimiento",
      en: "Security and Compliance",
      "pt-BR": "Segurança e conformidade",
    },
    weight: 0.3,
  },
  {
    id: "3",
    name: {
      es: "Tecnología y servicios en la nube",
      en: "Cloud Technology and Services",
      "pt-BR": "Tecnologia e serviços na nuvem",
    },
    weight: 0.34,
  },
  {
    id: "4",
    name: {
      es: "Facturación, precios y soporte",
      en: "Billing, Pricing, and Support",
      "pt-BR": "Faturamento, preços e suporte",
    },
    weight: 0.12,
  },
];
