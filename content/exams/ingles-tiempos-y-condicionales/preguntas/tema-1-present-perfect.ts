import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 1: present perfect contra past simple.
 *
 * El eje del tema es uno solo: el past simple ancla la acción en un momento
 * terminado, el present perfect la deja conectada al presente. Cada enunciado
 * pone una marca temporal que decide, y las explicaciones de las incorrectas
 * nombran la marca que el alumno leyó mal.
 */
export const TEMA_PRESENT_PERFECT: ExamQuestionWithTopic[] = [
  {
    id: "ing-t1-q01",
    topic: "present-perfect",
    prompt: 'Completá: "I ____ my keys. I can\'t open the door."',
    options: [
      {
        id: "A",
        text: "lost",
        correct: false,
        explanation:
          'Es la trampa más común, porque "lost" es correcto en otros contextos: "I lost my keys yesterday". Acá no, porque la segunda frase dice que el problema sigue ahora ("I can\'t open the door"). El past simple cerraría el episodio y dejaría sin explicar por qué la puerta sigue cerrada.',
      },
      {
        id: "B",
        text: "have lost",
        correct: true,
        explanation:
          'Correcta. El present perfect sirve justamente para esto: una acción del pasado cuyo resultado está vigente. Perdí las llaves en algún momento, y la consecuencia —no puedo entrar— es presente. La pista está en la segunda frase, no en la primera.',
      },
      {
        id: "C",
        text: "am losing",
        correct: false,
        explanation:
          'El present continuous describe algo en curso ahora mismo, y perder las llaves no es una actividad que se esté desarrollando: es un hecho puntual que ya ocurrió. "I am losing" solo funciona en sentido figurado, como "I am losing patience".',
      },
      {
        id: "D",
        text: "had lost",
        correct: false,
        explanation:
          'El past perfect ubica una acción antes de otra acción pasada, y acá no hay ninguna segunda acción pasada que le sirva de referencia. Necesitaría algo como "I had lost my keys when she arrived".',
      },
    ],
    tips: [
      "Buscá el efecto presente: si la consecuencia sigue vigente, present perfect.",
      "Una marca de tiempo terminada (yesterday, last week, in 2019) obliga al past simple.",
      "Sin marca de tiempo explícita, el present perfect suele ser la apuesta correcta.",
    ],
  },
  {
    id: "ing-t1-q02",
    topic: "present-perfect",
    prompt: 'Completá: "She ____ in Berlin in 2015, but she lives in Madrid now."',
    options: [
      {
        id: "A",
        text: "has worked",
        correct: false,
        explanation:
          '"in 2015" es una marca de tiempo cerrada, y el present perfect no admite ninguna. Es el error espejo del anterior: quien aprendió que "el perfect conecta con el presente" lo empieza a usar en todas partes, incluso donde hay una fecha que lo prohíbe.',
      },
      {
        id: "B",
        text: "is working",
        correct: false,
        explanation:
          'El present continuous habla del presente, y la oración ubica el hecho en 2015. Sería correcto si dijera "She is working in Madrid now".',
      },
      {
        id: "C",
        text: "has been working",
        correct: false,
        explanation:
          'El present perfect continuous describe algo que viene pasando hasta ahora, y la frase dice lo contrario: ahora vive en Madrid. Además arrastra el mismo problema que "has worked" con "in 2015".',
      },
      {
        id: "D",
        text: "worked",
        correct: true,
        explanation:
          'Correcta. "in 2015" cierra el período, y la segunda frase confirma que ya no es así. Las dos cosas empujan al past simple.',
      },
    ],
    tips: [
      "Una fecha o un año explícito descarta el present perfect, sin excepciones.",
      "Si la segunda frase contradice la situación, el tiempo de la primera es pasado.",
    ],
  },
  {
    id: "ing-t1-q03",
    topic: "present-perfect",
    prompt: 'Completá: "How long ____ you ____ English?" (la persona sigue estudiando)',
    options: [
      {
        id: "A",
        text: "did / study",
        correct: false,
        explanation:
          'Preguntaría por un período terminado: "How long did you study English?" se le dice a alguien que ya dejó. El paréntesis aclara que sigue, así que el past simple contradice el enunciado.',
      },
      {
        id: "B",
        text: "are / studying",
        correct: false,
        explanation:
          'Gramaticalmente se puede decir, pero no responde "how long": el present continuous no mide duración desde un comienzo. "How long are you studying?" se entendería como un plan ("¿hasta cuándo te vas a quedar estudiando hoy?").',
      },
      {
        id: "C",
        text: "have / been studying",
        correct: true,
        explanation:
          'Correcta. "How long" + una actividad que continúa es el territorio del present perfect continuous. Mide el tramo que va desde el comienzo hasta ahora, que es exactamente lo que la pregunta pide.',
      },
      {
        id: "D",
        text: "have / studied",
        correct: false,
        explanation:
          'Está cerca y por eso es la distractora más fuerte. El present perfect simple con "how long" se usa con verbos de estado ("How long have you known her?"), pero con una actividad como "study" el inglés prefiere la forma continua para marcar que sigue en curso.',
      },
    ],
    tips: [
      '"How long" + algo que continúa ⇒ have been + -ing.',
      "Con verbos de estado (know, be, have) se usa el perfect simple, no el continuo.",
    ],
  },
  {
    id: "ing-t1-q04",
    topic: "present-perfect",
    prompt: 'Completá: "I ____ that film three times. It gets better every time."',
    options: [
      {
        id: "A",
        text: "have seen",
        correct: true,
        explanation:
          'Correcta. Son tres veces contadas hasta ahora, en un período todavía abierto: nada impide que haya una cuarta. Eso es present perfect. "It gets better every time" confirma que el conteo sigue vivo.',
      },
      {
        id: "B",
        text: "saw",
        correct: false,
        explanation:
          'Cerraría la cuenta: "I saw that film three times" suena a un período terminado, por ejemplo durante unas vacaciones que ya pasaron. Choca con el presente de "it gets better".',
      },
      {
        id: "C",
        text: "have been seeing",
        correct: false,
        explanation:
          'La forma continua describe una actividad en desarrollo, no un número de veces completadas. Con una cantidad ("three times") el inglés usa siempre el perfect simple.',
      },
      {
        id: "D",
        text: "was seeing",
        correct: false,
        explanation:
          'El past continuous describe algo en curso en un momento del pasado, y "three times" es un recuento, no una escena. Además "was seeing" suele leerse como "estaba saliendo con alguien".',
      },
    ],
    tips: [
      "Una cantidad de veces hasta ahora (once, twice, three times) pide perfect simple.",
      "Las formas continuas describen desarrollo; no cuentan repeticiones completadas.",
    ],
  },
];
