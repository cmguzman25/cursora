import type { ExamDifficulty, ExamTopic, LocalizedText } from "../types";

/**
 * La ficha del simulacro de Cloud Practitioner como examen de `/exams`.
 *
 * Las preguntas **no se copian**: viven donde siempre, en
 * `content/courses/aws-cloud-practitioner/preguntas/simulacro/`, y
 * `preguntas/index.ts` las adapta. Este archivo solo declara lo que la sección
 * necesita y el banco del curso no tiene: título y descripción propios, y los
 * dominios en el papel de temas.
 *
 * Los nombres de los temas sí están escritos acá en vez de importados de
 * `configuracion.ts` del curso, y es a propósito: este archivo tiene que poder
 * cargarse con Node para el verificador, y un import de valor hacia el curso
 * necesitaría la extensión `.ts`. Son cuatro cadenas cortas, y el verificador
 * comprueba que los ids coincidan con los que declaran las preguntas, así que una
 * desincronización salta mecánicamente.
 */

export const SLUG = "aws-cloud-practitioner-simulacro";

export const TITULO: LocalizedText = {
  es: "AWS Cloud Practitioner: simulacro de examen",
};

export const DESCRIPCION: LocalizedText = {
  es: "Las 65 preguntas del simulacro final del curso, en el formato del CLF-C02 real: 24 / 30 / 34 / 12 % por dominio. Rendilo cronometrado para medir dónde estás, o en modo estudio para que cada opción incorrecta te explique por qué suena bien.",
};

/**
 * Los cuatro dominios oficiales del CLF-C02, en el papel de temas. Los ids son
 * los mismos que declara cada pregunta en su campo `domain`.
 *
 * Acá no llevan `weight`: la sección muestra la parte que ocupa cada tema
 * contándole las preguntas, que es lo único que puede afirmar sin inventar. El
 * peso oficial está en el banco del curso, y es lo que su pantalla de resultados
 * sigue usando.
 */
export const TEMAS: ExamTopic[] = [
  { id: "1", name: { es: "Conceptos de la nube" } },
  { id: "2", name: { es: "Seguridad y cumplimiento" } },
  { id: "3", name: { es: "Tecnología y servicios en la nube" } },
  { id: "4", name: { es: "Facturación, precios y soporte" } },
];

/**
 * Cuántas preguntas lleva cada tema. El reparto sigue los pesos oficiales lo más
 * de cerca que permite un total de 65: 24,6 / 29,2 / 33,8 / 12,3 % contra el
 * 24 / 30 / 34 / 12 % que publica AWS.
 */
export const PREGUNTAS_POR_TEMA: Record<string, number> = {
  "1": 16,
  "2": 19,
  "3": 22,
  "4": 8,
};

export const DIFICULTAD: ExamDifficulty = "mixed";

/** Los 90 minutos del examen real. El alumno puede elegir otra duración. */
export const DURACION_SUGERIDA_MINUTOS = 90;

/** El CLF-C02 aprueba con 700 sobre 1000, anclado al 70 % de aciertos. */
export const PORCENTAJE_PARA_APROBAR = 70;

/**
 * Numera **este** banco, que ya no es el del curso.
 *
 * Arrancó como copia del simulacro de `aws-cloud-practitioner`, pero ese quedó
 * congelado y las correcciones se hacen solo acá, así que las dos versiones son
 * independientes y no tienen por qué coincidir.
 *
 * Sube ante cualquier edición de cualquier pregunta: queda guardada en cada
 * rendida, y un intento viejo revisado contra un banco más nuevo mostraría
 * enunciados que ese alumno no respondió.
 *
 * Historial: v2 — revisión de contenido de las 65 preguntas (ver el README).
 */
export const VERSION_DEL_BANCO = 2;
