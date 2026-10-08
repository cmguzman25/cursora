import type { ExamDifficulty, ExamTopic, LocalizedText } from "../types";

/**
 * La ficha del examen, sin las preguntas.
 *
 * Vive separada de `manifest.ts` por un motivo mecánico: el verificador carga los
 * `.ts` directamente con Node, y `manifest.ts` importa `./preguntas`, que a su vez
 * importa a sus vecinos sin extensión (la convención del proyecto, que resuelve el
 * empaquetador pero no el cargador de Node). Este archivo solo tiene `import type`,
 * así que el verificador puede leerlo y comprobar que los temas y las cantidades
 * declaradas coinciden con las preguntas que hay de verdad.
 *
 * El banco es **bilingüe**. El inglés es el original: se escribió con la redacción
 * del DEA-C01 real, que es el idioma en el que se rinde. El español es su traducción,
 * y vive en `questions.es` porque `es` es el idioma por defecto de la app y por lo
 * tanto el que califica (ver `src/lib/exams/generated.ts`).
 *
 * Consecuencia que conviene tener presente: **el idioma de las preguntas lo decide el
 * locale de la ruta**, no un selector propio del examen. Leyendo la app en español se
 * ven las preguntas en español; para rendirlo como el examen real, hay que pasar la
 * app a inglés. Si algún día se prefiere lo contrario, se intercambian los dos
 * casilleros en `manifest.ts` y nada más.
 */

export const SLUG = "aws-data-engineer-ingesta";

export const TITULO: LocalizedText = {
  es: "AWS Data Engineer Associate: ingesta de datos",
  en: "AWS Data Engineer Associate: data ingestion",
};

export const DESCRIPCION: LocalizedText = {
  es: "65 preguntas en inglés sobre la parte de ingesta del DEA-C01, con la redacción de escenario del examen real y sus 130 minutos. Rendilo cronometrado para medir dónde estás, o en modo estudio para que cada opción incorrecta te explique por qué suena bien.",
  en: "65 questions on the ingestion portion of the DEA-C01, written in the real exam's scenario style and timed to its 130 minutes. Take it under the clock to measure where you stand, or in study mode so every wrong option explains why it sounds right.",
};

/**
 * Los cinco temas en los que se partió la ingesta.
 *
 * No son dominios oficiales de AWS: el DEA-C01 publica un único dominio 1 ("Data
 * Ingestion and Transformation", 34 %) y acá se evalúa solo su mitad de ingesta.
 * El corte en cinco sale de las tareas de la guía del examen, y existe para que el
 * diagnóstico por tema diga algo más útil que "te fue mal en ingesta".
 *
 * Los ids son en inglés porque son también los valores de `topic` de cada pregunta,
 * y las preguntas están en inglés.
 */
export const TEMAS: ExamTopic[] = [
  {
    id: "streaming-kinesis-msk",
    name: {
      es: "Streaming: Kinesis Data Streams y MSK",
      en: "Streaming: Kinesis Data Streams and MSK",
    },
  },
  {
    id: "firehose-delivery",
    name: {
      es: "Firehose y entrega casi en tiempo real",
      en: "Firehose and near-real-time delivery",
    },
  },
  {
    id: "batch-database-ingestion",
    name: {
      es: "Ingesta por lotes y desde bases de datos",
      en: "Batch and database ingestion",
    },
  },
  {
    id: "orchestration-event-driven",
    name: {
      es: "Orquestación e ingesta por eventos",
      en: "Orchestration and event-driven ingestion",
    },
  },
  {
    id: "throughput-replayability",
    name: {
      es: "Caudal, latencia y reproducibilidad",
      en: "Throughput, latency and replayability",
    },
  },
];

/** Cuántas preguntas lleva cada tema. El verificador lo comprueba contra los archivos. */
export const PREGUNTAS_POR_TEMA: Record<string, number> = {
  "streaming-kinesis-msk": 16,
  "firehose-delivery": 12,
  "batch-database-ingestion": 14,
  "orchestration-event-driven": 12,
  "throughput-replayability": 11,
};

/**
 * Mixta, escalonada hacia arriba: la guía del examen pide elegir entre servicios
 * que se solapan, así que casi ninguna pregunta se contesta reconociendo un
 * término. El reparto declarado, que el README repite para poder contarlo:
 *
 *   - ~10 % introductorias: una característica que decide sola (retención máxima,
 *     si un servicio es de streaming o de lotes).
 *   - ~55 % intermedias: un escenario con un requisito que descarta opciones.
 *   - ~35 % avanzadas: dos opciones defendibles y un detalle que decide.
 */
export const DIFICULTAD: ExamDifficulty = "mixed";

/**
 * Los 130 minutos del DEA-C01 real. Son ~2 min por pregunta, más que el ~1,5 que
 * usan los otros bancos de esta carpeta, y es a propósito: los enunciados de
 * escenario son largos y leerlos es parte de lo que el examen mide. El alumno puede
 * elegir otra duración al empezar.
 */
export const DURACION_SUGERIDA_MINUTOS = 130;

/**
 * El DEA-C01 aprueba con 720 sobre 1000. Como la nota de un examen de esta sección
 * **es** el porcentaje de aciertos (ver `src/lib/exams/generated.ts`), anclar acá en
 * 72 pone el número en el mismo lugar que el examen real: 47 de 65.
 */
export const PORCENTAJE_PARA_APROBAR = 72;

/**
 * Se incrementa ante cualquier edición de cualquier pregunta, porque queda guardada
 * en cada rendida y un intento viejo revisado contra un banco más nuevo mostraría
 * enunciados que ese alumno no respondió.
 *
 * Sigue en 1 a pesar de la revisión de contenido que corrigió siete preguntas (ver el
 * README), y es a propósito: esa revisión se hizo antes de que el banco se publicara,
 * así que no existe ni puede existir ninguna rendida guardada contra la versión
 * anterior. Subirlo a 2 inventaría un historial que nadie tiene.
 *
 * A partir de la primera rendida esto deja de valer: cualquier edición posterior sube
 * el número.
 */
export const VERSION_DEL_BANCO = 1;

/** Prefijo de los ids de pregunta: `<PREFIJO>-t<n>-qNN`. */
export const PREFIJO_DE_IDS = "dea";

/**
 * El idioma contra el que la app califica, que es el `defaultLocale` de
 * `src/i18n/routing.ts`. Está acá, duplicado a propósito, porque el verificador no
 * puede importar ese módulo (resuelve sin extensión) y necesita saber cuál de los dos
 * bancos es la referencia del paralelismo.
 *
 * Si alguna vez cambia el `defaultLocale` del proyecto, este valor tiene que seguirlo,
 * y el casillero de `manifest.ts` también.
 */
export const IDIOMA_QUE_CALIFICA = "es";

/**
 * Cómo avisa cada idioma que una pregunta es de respuesta múltiple.
 *
 * El examen real lo dice en el enunciado, y hay que respetarlo: sin el aviso el alumno
 * marca una sola opción y pierde el punto por una convención que nadie le contó. El
 * verificador comprueba las dos direcciones — que toda múltiple lleve la marca de su
 * idioma, y que ninguna lleve la de otro, que es lo que pasa cuando una traducción se
 * dejó el "(Choose two.)" del original.
 */
export const MARCA_DE_MULTIPLE: Record<string, string> = {
  es: "(Elegí dos.)",
  en: "(Choose two.)",
};
