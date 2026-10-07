import type { ExamDifficulty, ExamTopic, LocalizedText } from "../types";

/**
 * La ficha del examen, sin las preguntas.
 *
 * Vive separada de `manifest.ts` por un motivo mecánico: el verificador carga los
 * `.ts` directamente con Node, y `manifest.ts` importa `./preguntas`, que a su vez
 * importa a sus vecinos sin extensión (la convención del proyecto, que resuelve
 * el empaquetador pero no el cargador de Node). Este archivo solo tiene
 * `import type`, así que el verificador puede leerlo y comprobar que los temas y
 * las cantidades declaradas coinciden con las preguntas que hay de verdad.
 *
 * Sin esta separación el verificador tendría que repetir los valores esperados, y
 * dos fuentes de verdad para "cuántas preguntas tiene el tema 2" se desincronizan
 * a la primera edición.
 */

export const SLUG = "ingles-tiempos-y-condicionales";

export const TITULO: LocalizedText = {
  es: "Inglés: present perfect y condicionales",
  en: "English: present perfect and conditionals",
};

export const DESCRIPCION: LocalizedText = {
  es: "Los dos puntos donde más se trastabilla al pasar de B1 a B2: cuándo el pasado sigue conectado al presente, y cómo se arma cada condicional. Cada opción incorrecta explica qué confusión la hace sonar bien.",
  en: "The two places where B1 learners stumble most on the way to B2: when the past stays connected to the present, and how each conditional is built. Every wrong option explains the confusion that makes it sound right.",
};

export const TEMAS: ExamTopic[] = [
  {
    id: "present-perfect",
    name: { es: "Present perfect vs. past simple", en: "Present perfect vs. past simple" },
  },
  {
    id: "condicionales",
    name: { es: "Condicionales", en: "Conditionals" },
  },
];

/** Cuántas preguntas lleva cada tema. El verificador lo comprueba contra los archivos. */
export const PREGUNTAS_POR_TEMA: Record<string, number> = {
  "present-perfect": 4,
  condicionales: 4,
};

export const DIFICULTAD: ExamDifficulty = "intermediate";

/** ~1,5 min por pregunta. El alumno elige la duración real al empezar. */
export const DURACION_SUGERIDA_MINUTOS = 12;

export const PORCENTAJE_PARA_APROBAR = 70;

/** Se incrementa ante cualquier edición de cualquier pregunta. */
export const VERSION_DEL_BANCO = 1;

/** Prefijo de los ids de pregunta: `<PREFIJO>-t<n>-qNN`. */
export const PREFIJO_DE_IDS = "ing";
