import type { CourseManifest, LessonMeta, LocalizedText } from "../types";

/**
 * Generado a partir del `README.md` de este curso, que es el índice legible.
 * Cuando se agrega, renombra o reordena una clase, se cambia primero allí y
 * después aquí — la app navega por esta lista.
 *
 * Las 100 clases se reparten en 24 semanas: la unidad 0 es de orientación y
 * cada una de las 12 unidades ocupa dos semanas (6 clases de contenido, un
 * repaso ★ y un cuestionario). Cómo se escribe cada clase está en
 * `CONTRATO-DE-CLASES.md`.
 *
 * Las clases marcadas `kind: "quiz"` no tienen archivo Markdown: su contenido
 * vive en `preguntas/` (tipo C del contrato).
 */

const COURSE_SLUG = "ingles-a1";
const COURSE_TITLE: LocalizedText = {
  es: "Inglés A1 desde cero para hispanohablantes",
  en: "English A1 from scratch for Spanish speakers",
  "pt-BR": "Inglês A1 do zero para falantes de espanhol",
};

const MODULES: Record<string, LocalizedText> = {
  "unidad-0": { es: "Unidad 0 — Antes de empezar" },
  "unidad-1": { es: "Unidad 1 — Hola, ¿quién eres?" },
  "unidad-2": { es: "Unidad 2 — Mi gente y mis cosas" },
  "unidad-3": { es: "Unidad 3 — Mi día a día" },
  "unidad-4": { es: "Unidad 4 — Dónde vivo" },
  "unidad-5": { es: "Unidad 5 — Lo que me gusta" },
  "unidad-6": { es: "Unidad 6 — Comprar y comer" },
  "unidad-7": { es: "Unidad 7 — Ahora mismo" },
  "unidad-8": { es: "Unidad 8 — Lo que pasó" },
  "unidad-9": { es: "Unidad 9 — Historias" },
  "unidad-10": { es: "Unidad 10 — Planes" },
  "unidad-11": { es: "Unidad 11 — Pedir, aconsejar y describir" },
  "unidad-12": { es: "Unidad 12 — Todo junto" },
};

const LESSONS: LessonMeta[] = [
  { id: "00-01-que-vas-a-lograr-en-6-meses", moduleId: "unidad-0", module: MODULES["unidad-0"], title: { es: "Qué vas a poder hacer dentro de seis meses" } },
  { id: "00-02-como-estudiar-15-minutos-al-dia", moduleId: "unidad-0", module: MODULES["unidad-0"], title: { es: "Quince minutos al día le ganan a tres horas el domingo" } },
  { id: "00-03-los-sonidos-del-ingles", moduleId: "unidad-0", module: MODULES["unidad-0"], title: { es: "Los sonidos del inglés que no existen en español" } },
  { id: "00-04-tu-kit-de-estudio", moduleId: "unidad-0", module: MODULES["unidad-0"], title: { es: "Tu kit: diccionario, subtítulos y cómo usar la IA sin engañarte" } },

  { id: "01-01-saludos-y-despedidas", moduleId: "unidad-1", module: MODULES["unidad-1"], title: { es: "Saludar, despedirte y salir del paso" } },
  { id: "01-02-el-verbo-to-be", moduleId: "unidad-1", module: MODULES["unidad-1"], title: { es: "I am, you are: el verbo que aparece en todo" } },
  { id: "01-03-preguntas-y-negaciones-con-to-be", moduleId: "unidad-1", module: MODULES["unidad-1"], title: { es: "Are you…? I'm not…: preguntar y negar con to be" } },
  { id: "01-04-numeros-y-deletrear", moduleId: "unidad-1", module: MODULES["unidad-1"], title: { es: "Números del 0 al 20 y deletrear tu nombre" } },
  { id: "01-05-paises-y-nacionalidades", moduleId: "unidad-1", module: MODULES["unidad-1"], title: { es: "Países, nacionalidades e idiomas" } },
  { id: "01-06-presentarte-en-cinco-frases", moduleId: "unidad-1", module: MODULES["unidad-1"], title: { es: "Presentarte en cinco frases" } },
  { id: "01-07-repaso-unidad-1", moduleId: "unidad-1", module: MODULES["unidad-1"], title: { es: "★ Repaso de la unidad 1" } },
  { id: "01-08-quiz-unidad-1", moduleId: "unidad-1", module: MODULES["unidad-1"], title: { es: "Ponte a prueba: unidad 1" }, kind: "quiz" },

  { id: "02-01-a-an-the", moduleId: "unidad-2", module: MODULES["unidad-2"], title: { es: "a, an y the: los artículos sin misterio" } },
  { id: "02-02-plurales", moduleId: "unidad-2", module: MODULES["unidad-2"], title: { es: "Plurales: la -s y los seis irregulares que importan" } },
  { id: "02-03-this-that-these-those", moduleId: "unidad-2", module: MODULES["unidad-2"], title: { es: "This, that, these, those: esto de aquí y aquello de allá" } },
  { id: "02-04-la-familia-y-el-posesivo", moduleId: "unidad-2", module: MODULES["unidad-2"], title: { es: "La familia y el posesivo 's" } },
  { id: "02-05-have-y-dont-have", moduleId: "unidad-2", module: MODULES["unidad-2"], title: { es: "I have / I don't have: decir lo que tienes" } },
  { id: "02-06-colores-y-objetos", moduleId: "unidad-2", module: MODULES["unidad-2"], title: { es: "Colores, objetos y What's this?" } },
  { id: "02-07-repaso-unidad-2", moduleId: "unidad-2", module: MODULES["unidad-2"], title: { es: "★ Repaso de la unidad 2" } },
  { id: "02-08-quiz-unidad-2", moduleId: "unidad-2", module: MODULES["unidad-2"], title: { es: "Ponte a prueba: unidad 2" }, kind: "quiz" },

  { id: "03-01-present-simple", moduleId: "unidad-3", module: MODULES["unidad-3"], title: { es: "I work, I live: hablar de lo que haces siempre" } },
  { id: "03-02-la-s-de-tercera-persona", moduleId: "unidad-3", module: MODULES["unidad-3"], title: { es: "He works: la -s que todo el mundo olvida" } },
  { id: "03-03-preguntas-con-do-y-does", moduleId: "unidad-3", module: MODULES["unidad-3"], title: { es: "Do you…? Does he…?: preguntar sobre la rutina" } },
  { id: "03-04-negaciones-con-dont-y-doesnt", moduleId: "unidad-3", module: MODULES["unidad-3"], title: { es: "I don't, he doesn't: decir que no" } },
  { id: "03-05-la-hora-y-los-dias", moduleId: "unidad-3", module: MODULES["unidad-3"], title: { es: "La hora, los días y las preposiciones at, on, in" } },
  { id: "03-06-adverbios-de-frecuencia", moduleId: "unidad-3", module: MODULES["unidad-3"], title: { es: "Always, usually, never: cada cuánto lo haces" } },
  { id: "03-07-repaso-unidad-3", moduleId: "unidad-3", module: MODULES["unidad-3"], title: { es: "★ Repaso de la unidad 3" } },
  { id: "03-08-quiz-unidad-3", moduleId: "unidad-3", module: MODULES["unidad-3"], title: { es: "Ponte a prueba: unidad 3" }, kind: "quiz" },

  { id: "04-01-there-is-there-are", moduleId: "unidad-4", module: MODULES["unidad-4"], title: { es: "There is / there are: decir qué hay" } },
  { id: "04-02-preposiciones-de-lugar", moduleId: "unidad-4", module: MODULES["unidad-4"], title: { es: "In, on, under, next to: dónde está cada cosa" } },
  { id: "04-03-mi-casa", moduleId: "unidad-4", module: MODULES["unidad-4"], title: { es: "Mi casa por dentro: habitaciones y muebles" } },
  { id: "04-04-some-any-how-many", moduleId: "unidad-4", module: MODULES["unidad-4"], title: { es: "Some, any y How many?: cantidades sin número" } },
  { id: "04-05-mi-ciudad-y-como-llegar", moduleId: "unidad-4", module: MODULES["unidad-4"], title: { es: "Mi ciudad: lugares y cómo llegar" } },
  { id: "04-06-describir-donde-vives", moduleId: "unidad-4", module: MODULES["unidad-4"], title: { es: "Describir dónde vives" } },
  { id: "04-07-repaso-unidad-4", moduleId: "unidad-4", module: MODULES["unidad-4"], title: { es: "★ Repaso de la unidad 4" } },
  { id: "04-08-quiz-unidad-4", moduleId: "unidad-4", module: MODULES["unidad-4"], title: { es: "Ponte a prueba: unidad 4" }, kind: "quiz" },

  { id: "05-01-i-like-i-dont-like", moduleId: "unidad-5", module: MODULES["unidad-5"], title: { es: "I like / I don't like: gustos y preferencias" } },
  { id: "05-02-like-mas-ing", moduleId: "unidad-5", module: MODULES["unidad-5"], title: { es: "I like cooking: gustar + actividad" } },
  { id: "05-03-pronombres-objeto", moduleId: "unidad-5", module: MODULES["unidad-5"], title: { es: "Me, him, her, it: los pronombres que van detrás" } },
  { id: "05-04-can-y-cant", moduleId: "unidad-5", module: MODULES["unidad-5"], title: { es: "Can / can't: lo que sabes y no sabes hacer" } },
  { id: "05-05-tiempo-libre-y-deportes", moduleId: "unidad-5", module: MODULES["unidad-5"], title: { es: "Tiempo libre, deportes y música" } },
  { id: "05-06-why-y-because", moduleId: "unidad-5", module: MODULES["unidad-5"], title: { es: "Why? Because…: dar una razón" } },
  { id: "05-07-repaso-unidad-5", moduleId: "unidad-5", module: MODULES["unidad-5"], title: { es: "★ Repaso de la unidad 5" } },
  { id: "05-08-quiz-unidad-5", moduleId: "unidad-5", module: MODULES["unidad-5"], title: { es: "Ponte a prueba: unidad 5" }, kind: "quiz" },

  { id: "06-01-contables-e-incontables", moduleId: "unidad-6", module: MODULES["unidad-6"], title: { es: "Lo que se cuenta y lo que no: two coffees o some coffee" } },
  { id: "06-02-how-much-how-many", moduleId: "unidad-6", module: MODULES["unidad-6"], title: { es: "How much, how many y a lot of" } },
  { id: "06-03-id-like-pedir-con-cortesia", moduleId: "unidad-6", module: MODULES["unidad-6"], title: { es: "I'd like…: pedir sin sonar brusco" } },
  { id: "06-04-precios-y-numeros-grandes", moduleId: "unidad-6", module: MODULES["unidad-6"], title: { es: "Precios y números grandes" } },
  { id: "06-05-en-el-restaurante", moduleId: "unidad-6", module: MODULES["unidad-6"], title: { es: "En el restaurante, de principio a fin" } },
  { id: "06-06-en-la-tienda", moduleId: "unidad-6", module: MODULES["unidad-6"], title: { es: "En la tienda: tallas, probarse y pagar" } },
  { id: "06-07-repaso-unidad-6", moduleId: "unidad-6", module: MODULES["unidad-6"], title: { es: "★ Repaso de la unidad 6 y medio camino" } },
  { id: "06-08-quiz-unidad-6", moduleId: "unidad-6", module: MODULES["unidad-6"], title: { es: "Ponte a prueba: unidad 6" }, kind: "quiz" },

  { id: "07-01-present-continuous", moduleId: "unidad-7", module: MODULES["unidad-7"], title: { es: "I'm working: lo que está pasando ahora" } },
  { id: "07-02-preguntas-y-negaciones-en-continuous", moduleId: "unidad-7", module: MODULES["unidad-7"], title: { es: "Are you working? I'm not working" } },
  { id: "07-03-simple-vs-continuous", moduleId: "unidad-7", module: MODULES["unidad-7"], title: { es: "I work o I'm working: la confusión que más cuesta" } },
  { id: "07-04-la-ropa", moduleId: "unidad-7", module: MODULES["unidad-7"], title: { es: "La ropa y qué llevas puesto" } },
  { id: "07-05-el-clima-y-las-estaciones", moduleId: "unidad-7", module: MODULES["unidad-7"], title: { es: "El clima y las estaciones" } },
  { id: "07-06-describir-una-foto", moduleId: "unidad-7", module: MODULES["unidad-7"], title: { es: "Describir una foto en voz alta" } },
  { id: "07-07-repaso-unidad-7", moduleId: "unidad-7", module: MODULES["unidad-7"], title: { es: "★ Repaso de la unidad 7" } },
  { id: "07-08-quiz-unidad-7", moduleId: "unidad-7", module: MODULES["unidad-7"], title: { es: "Ponte a prueba: unidad 7" }, kind: "quiz" },

  { id: "08-01-was-y-were", moduleId: "unidad-8", module: MODULES["unidad-8"], title: { es: "Was y were: el pasado de to be" } },
  { id: "08-02-el-pasado-regular-ed", moduleId: "unidad-8", module: MODULES["unidad-8"], title: { es: "La terminación -ed y sus tres sonidos" } },
  { id: "08-03-preguntas-en-pasado-con-did", moduleId: "unidad-8", module: MODULES["unidad-8"], title: { es: "Did you…?: preguntar por el pasado" } },
  { id: "08-04-negaciones-con-didnt", moduleId: "unidad-8", module: MODULES["unidad-8"], title: { es: "I didn't go: negar en pasado" } },
  { id: "08-05-expresiones-de-tiempo-pasado", moduleId: "unidad-8", module: MODULES["unidad-8"], title: { es: "Yesterday, last week, ago: cuándo pasó" } },
  { id: "08-06-contar-tu-fin-de-semana", moduleId: "unidad-8", module: MODULES["unidad-8"], title: { es: "Contar tu fin de semana" } },
  { id: "08-07-repaso-unidad-8", moduleId: "unidad-8", module: MODULES["unidad-8"], title: { es: "★ Repaso de la unidad 8" } },
  { id: "08-08-quiz-unidad-8", moduleId: "unidad-8", module: MODULES["unidad-8"], title: { es: "Ponte a prueba: unidad 8" }, kind: "quiz" },

  { id: "09-01-verbos-irregulares-primera-tanda", moduleId: "unidad-9", module: MODULES["unidad-9"], title: { es: "Los doce verbos irregulares que más vas a usar" } },
  { id: "09-02-verbos-irregulares-segunda-tanda", moduleId: "unidad-9", module: MODULES["unidad-9"], title: { es: "Doce verbos irregulares más" } },
  { id: "09-03-preguntas-wh-en-pasado", moduleId: "unidad-9", module: MODULES["unidad-9"], title: { es: "Where did you go?: preguntas abiertas en pasado" } },
  { id: "09-04-conectores-and-but-because-so", moduleId: "unidad-9", module: MODULES["unidad-9"], title: { es: "And, but, because, so: unir tus frases" } },
  { id: "09-05-contar-una-historia-en-orden", moduleId: "unidad-9", module: MODULES["unidad-9"], title: { es: "First, then, after that: contar una historia en orden" } },
  { id: "09-06-fechas-meses-y-anos", moduleId: "unidad-9", module: MODULES["unidad-9"], title: { es: "Fechas, meses y años" } },
  { id: "09-07-repaso-unidad-9", moduleId: "unidad-9", module: MODULES["unidad-9"], title: { es: "★ Repaso de la unidad 9" } },
  { id: "09-08-quiz-unidad-9", moduleId: "unidad-9", module: MODULES["unidad-9"], title: { es: "Ponte a prueba: unidad 9" }, kind: "quiz" },

  { id: "10-01-be-going-to", moduleId: "unidad-10", module: MODULES["unidad-10"], title: { es: "I'm going to…: tus planes" } },
  { id: "10-02-preguntas-y-negaciones-con-going-to", moduleId: "unidad-10", module: MODULES["unidad-10"], title: { es: "Are you going to…? I'm not going to…" } },
  { id: "10-03-will", moduleId: "unidad-10", module: MODULES["unidad-10"], title: { es: "Will: decisiones del momento y predicciones" } },
  { id: "10-04-invitar-y-quedar", moduleId: "unidad-10", module: MODULES["unidad-10"], title: { es: "Would you like to…? Let's…: invitar y quedar" } },
  { id: "10-05-viajes-hotel-y-aeropuerto", moduleId: "unidad-10", module: MODULES["unidad-10"], title: { es: "Viajar: aeropuerto, hotel y reservas" } },
  { id: "10-06-hablar-de-tus-planes", moduleId: "unidad-10", module: MODULES["unidad-10"], title: { es: "Hablar de tus planes del mes" } },
  { id: "10-07-repaso-unidad-10", moduleId: "unidad-10", module: MODULES["unidad-10"], title: { es: "★ Repaso de la unidad 10" } },
  { id: "10-08-quiz-unidad-10", moduleId: "unidad-10", module: MODULES["unidad-10"], title: { es: "Ponte a prueba: unidad 10" }, kind: "quiz" },

  { id: "11-01-imperativos", moduleId: "unidad-11", module: MODULES["unidad-11"], title: { es: "Open the door: instrucciones e indicaciones" } },
  { id: "11-02-have-to-y-must", moduleId: "unidad-11", module: MODULES["unidad-11"], title: { es: "Have to y must: lo que hay que hacer" } },
  { id: "11-03-should", moduleId: "unidad-11", module: MODULES["unidad-11"], title: { es: "You should…: dar un consejo" } },
  { id: "11-04-can-i-y-could-you", moduleId: "unidad-11", module: MODULES["unidad-11"], title: { es: "Can I…? Could you…?: pedir permiso y favores" } },
  { id: "11-05-el-cuerpo-y-el-medico", moduleId: "unidad-11", module: MODULES["unidad-11"], title: { es: "El cuerpo, los síntomas y el médico" } },
  { id: "11-06-adjetivos-y-comparativos", moduleId: "unidad-11", module: MODULES["unidad-11"], title: { es: "Bigger, more expensive: comparar dos cosas" } },
  { id: "11-07-repaso-unidad-11", moduleId: "unidad-11", module: MODULES["unidad-11"], title: { es: "★ Repaso de la unidad 11" } },
  { id: "11-08-quiz-unidad-11", moduleId: "unidad-11", module: MODULES["unidad-11"], title: { es: "Ponte a prueba: unidad 11" }, kind: "quiz" },

  { id: "12-01-repaso-de-todos-los-tiempos", moduleId: "unidad-12", module: MODULES["unidad-12"], title: { es: "Pasado, presente y futuro en una sola tabla" } },
  { id: "12-02-las-cien-palabras-mas-utiles", moduleId: "unidad-12", module: MODULES["unidad-12"], title: { es: "Las cien palabras que más vas a usar" } },
  { id: "12-03-los-quince-errores-del-hispanohablante", moduleId: "unidad-12", module: MODULES["unidad-12"], title: { es: "Los quince errores que delatan a un hispanohablante" } },
  { id: "12-04-seis-conversaciones-completas", moduleId: "unidad-12", module: MODULES["unidad-12"], title: { es: "Seis conversaciones reales de principio a fin" } },
  { id: "12-05-escribir-mensajes-correos-y-perfil", moduleId: "unidad-12", module: MODULES["unidad-12"], title: { es: "Escribir un mensaje, un correo y tu perfil" } },
  { id: "12-06-tablas-de-referencia-a1", moduleId: "unidad-12", module: MODULES["unidad-12"], title: { es: "★ Tablas de referencia de todo el A1" } },
  { id: "12-07-examen-final-a1", moduleId: "unidad-12", module: MODULES["unidad-12"], title: { es: "Examen final del nivel A1" }, kind: "quiz" },
  { id: "12-08-como-seguir-hasta-a2", moduleId: "unidad-12", module: MODULES["unidad-12"], title: { es: "Qué sigue: de A1 a A2 sin perder lo aprendido" } },
];

export const manifest: CourseManifest = {
  slug: COURSE_SLUG,
  title: COURSE_TITLE,
  lessons: LESSONS,
};
