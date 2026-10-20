import type { ExamDifficulty, ExamTopic, LocalizedText } from "../types";

/**
 * La ficha del examen, sin las preguntas.
 *
 * Vive separada de `manifest.ts` para que el verificador la pueda cargar con Node:
 * este archivo solo tiene `import type`, así que el verificador comprueba contra él
 * que los temas y las cantidades declaradas coinciden con las preguntas reales.
 *
 * Los temas siguen el libro Influx tal como está impreso: una lección por tema,
 * salvo la Lesson 17, que trae tanto material (vocabulario, verbos con su
 * preposición y diez key phrases) que sus key phrases se evalúan junto con la
 * Lesson 18, que es justamente donde el libro las practica.
 */

export const SLUG = "influx-unidades-8-y-9";

export const TITULO: LocalizedText = {
  es: "Influx: Favors and Requests · Complaints and Apologies",
  en: "Influx: Favors and Requests · Complaints and Apologies",
};

export const DESCRIPCION: LocalizedText = {
  es: "Las Units 8 y 9 del libro Influx (Lessons 15 a 18), con las frases, el vocabulario y los diálogos del propio libro: pedir y hacer favores, aceptar y rechazar pedidos, quejarse, disculparse y poner excusas. Cada opción incorrecta explica qué es y por qué no corresponde.",
  en: "Units 8 and 9 of the Influx book (Lessons 15 to 18), using the book's own phrases, vocabulary and dialogs: asking for and doing favors, accepting and refusing requests, complaining, apologizing and making excuses. Every wrong option explains what it is and why it doesn't fit.",
};

export const TEMAS: ExamTopic[] = [
  {
    id: "lesson-15",
    name: {
      es: "Favors and Requests: vocabulario y estructuras",
      en: "Favors and Requests: vocabulary and structures",
    },
  },
  {
    id: "lesson-16",
    name: {
      es: "Aceptar y rechazar pedidos",
      en: "Accepting and refusing requests",
    },
  },
  {
    id: "lesson-17",
    name: {
      es: "Complaints and Apologies: vocabulario y verbos",
      en: "Complaints and Apologies: vocabulary and verbs",
    },
  },
  {
    id: "lesson-18",
    name: {
      es: "Frases clave: excusas y disculpas",
      en: "Key phrases: excuses and apologies",
    },
  },
];

/** Cuántas preguntas lleva cada tema. El verificador lo comprueba contra los archivos. */
export const PREGUNTAS_POR_TEMA: Record<string, number> = {
  "lesson-15": 15,
  "lesson-16": 15,
  "lesson-17": 15,
  "lesson-18": 15,
};

export const DIFICULTAD: ExamDifficulty = "mixed";

/** ~1,5 min por pregunta. El alumno elige la duración real al empezar. */
export const DURACION_SUGERIDA_MINUTOS = 90;

export const PORCENTAJE_PARA_APROBAR = 70;

/** Se incrementa ante cualquier edición de cualquier pregunta. */
export const VERSION_DEL_BANCO = 1;

/** Prefijo de los ids de pregunta: `<PREFIJO>-t<n>-qNN`. */
export const PREFIJO_DE_IDS = "inf";
