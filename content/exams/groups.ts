import type { ExamGroup } from "./types";

/**
 * Los grupos de la sección `/exams`, en el orden en que se muestran en la portada.
 *
 * **Cómo se agrega una prueba a un grupo que ya existe:** se escribe su banco como
 * siempre (ver el skill `generar-examen`), se la da de alta en
 * `content/exams/registry.ts`, y se agrega su slug a `examSlugs` del grupo, en la
 * posición que le corresponde. Nada más: la tarjeta del grupo recalcula sus
 * totales y la página del grupo la lista.
 *
 * **Cómo se crea un grupo nuevo:** se agrega una entrada acá, con un `slug` que no
 * choque con ningún slug de examen ni con el segmento reservado de abajo. Un grupo
 * sin pruebas es legal mientras se está escribiendo la primera, pero el
 * verificador avisa: en la portada se vería una tarjeta que no lleva a nada.
 *
 * Este archivo solo tiene `import type` a propósito, igual que los
 * `configuracion.ts` de cada examen: así `verificar-grupos.mjs` lo puede cargar
 * directamente con Node y comprobar las correspondencias contra los slugs reales.
 * No importes valores acá.
 */
export const EXAM_GROUPS: ExamGroup[] = [
  {
    slug: "aws-cloud-practitioner",
    title: {
      es: "AWS Cloud Practitioner (CLF-C02)",
      en: "AWS Cloud Practitioner (CLF-C02)",
    },
    description: {
      es: "La certificación de entrada a AWS: qué es la nube, qué servicio hace qué, cómo se factura y de quién es cada responsabilidad de seguridad.",
      en: "The entry-level AWS certification: what the cloud is, which service does what, how it is billed, and who owns each security responsibility.",
    },
    examSlugs: ["aws-cloud-practitioner-simulacro", "aws-cloud-practitioner-refuerzo-grediana"],
  },
  {
    slug: "aws-data-engineer",
    title: {
      es: "AWS Data Engineer Associate (DEA-C01)",
      en: "AWS Data Engineer Associate (DEA-C01)",
    },
    description: {
      es: "La certificación de ingeniería de datos, cubierta por partes. Cada prueba toma un pedazo del temario y lo evalúa con la redacción de escenario del examen real.",
      en: "The data engineering certification, covered one part at a time. Each test takes a slice of the exam guide and drills it in the real exam's scenario style.",
    },
    examSlugs: ["aws-data-engineer-ingesta"],
  },
  {
    slug: "ingles",
    title: {
      es: "Inglés",
      en: "English",
    },
    description: {
      es: "Los puntos de gramática donde más se trastabilla al pasar de B1 a B2, uno por prueba.",
      en: "The grammar points where B1 learners stumble most on the way to B2, one per test.",
    },
    examSlugs: ["ingles-tiempos-y-condicionales"],
  },
];

/**
 * El segmento de ruta de la página de un grupo: `/exams/groups/<slug>`. Es la
 * carpeta `src/app/[locale]/exams/groups/`, que en el enrutador gana por ser
 * estática frente a `[examSlug]`.
 *
 * Está acá, como constante, por una sola razón: un examen que se llamara `groups`
 * quedaría tapado por esa carpeta y su pantalla previa sería inalcanzable. El
 * verificador lo comprueba leyendo este valor, en vez de llevar la cadena
 * repetida.
 */
export const SEGMENTO_DE_GRUPOS = "groups";
