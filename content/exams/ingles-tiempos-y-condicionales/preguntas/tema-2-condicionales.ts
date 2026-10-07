import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 2: condicionales.
 *
 * El eje es qué tan posible presenta el hablante la condición: el primer
 * condicional la trata como posible, el segundo como improbable o irreal, el
 * tercero como imposible porque ya pasó. Las explicaciones de las incorrectas
 * nombran el grado de posibilidad que la opción comunicaría, que es el error
 * real: casi nunca es desconocer la forma, es elegir el grado equivocado.
 */
export const TEMA_CONDICIONALES: ExamQuestionWithTopic[] = [
  {
    id: "ing-t2-q01",
    topic: "condicionales",
    prompt: 'Completá: "If it ____ tomorrow, we\'ll stay home."',
    options: [
      {
        id: "A",
        text: "rains",
        correct: true,
        explanation:
          'Correcta. Primer condicional: present simple después de "if", "will" en la consecuencia. La condición se presenta como perfectamente posible, que es lo que "tomorrow" sugiere.',
      },
      {
        id: "B",
        text: "will rain",
        correct: false,
        explanation:
          'Es el error más frecuente de los hispanohablantes, y es raro porque en español tampoco decimos "si lloverá": decimos "si llueve". El inglés coincide con el español acá. En el primer condicional el "will" va solo en la consecuencia, nunca después de "if".',
      },
      {
        id: "C",
        text: "rained",
        correct: false,
        explanation:
          'Pasaría al segundo condicional, que presenta la condición como improbable o hipotética, y entonces la consecuencia tendría que ser "we would stay home". Mezclado con "we\'ll" no cierra.',
      },
      {
        id: "D",
        text: "would rain",
        correct: false,
        explanation:
          '"would" no va nunca después de "if" en los condicionales estándar: es la marca de la consecuencia del segundo condicional, no de la condición.',
      },
    ],
    tips: [
      "Después de \"if\" no va ni \"will\" ni \"would\". Es la regla que más rinde memorizar.",
      "Primer condicional: if + present simple, consecuencia con will.",
      "Si la consecuencia ya dice \"will\", la condición tiene que estar en presente.",
    ],
  },
  {
    id: "ing-t2-q02",
    topic: "condicionales",
    prompt: 'Completá: "If I ____ you, I would apologise."',
    options: [
      {
        id: "A",
        text: "am",
        correct: false,
        explanation:
          'Haría un primer condicional, que presenta la condición como posible — y yo no puedo llegar a ser vos. Además chocaría con "would apologise", que ya marca el segundo condicional.',
      },
      {
        id: "B",
        text: "was",
        correct: false,
        explanation:
          'Se escucha muchísimo en inglés hablado y no está "mal" en registro informal, pero en un examen la forma esperada del segundo condicional con el verbo "be" es "were" para todas las personas. Es justamente el tipo de detalle que estas preguntas miden.',
      },
      {
        id: "C",
        text: "were",
        correct: true,
        explanation:
          'Correcta. Segundo condicional para una situación irreal, y con "be" el inglés usa "were" en todas las personas: "If I were you" es la fórmula fija para dar un consejo.',
      },
      {
        id: "D",
        text: "had been",
        correct: false,
        explanation:
          'Es tercer condicional, que habla de algo que ya no se puede cambiar, y entonces la consecuencia debería ser "I would have apologised". El consejo dejaría de ser un consejo y pasaría a ser un lamento.',
      },
    ],
    tips: [
      '"If I were you" es una fórmula fija: no la conjugues.',
      "Si la consecuencia dice \"would + infinitivo\", la condición va en pasado simple.",
    ],
  },
  {
    id: "ing-t2-q03",
    topic: "condicionales",
    prompt:
      'Completá: "If she ____ harder, she would have passed the exam." (no estudió y no aprobó)',
    options: [
      {
        id: "A",
        text: "studied",
        correct: false,
        explanation:
          'Sería segundo condicional, que habla de un presente o futuro hipotético. El paréntesis aclara que el examen ya pasó y el resultado está sellado, así que hace falta la forma que habla del pasado irreal.',
      },
      {
        id: "B",
        text: "would study",
        correct: false,
        explanation:
          '"would" no va después de "if". Y aunque fuera, "would study" apunta al futuro, no a un pasado consumado.',
      },
      {
        id: "C",
        text: "had studied",
        correct: true,
        explanation:
          'Correcta. Tercer condicional: "if" + past perfect, y la consecuencia con "would have" + participio. Es el único que habla de un pasado que no se puede cambiar, que es exactamente lo que describe el paréntesis.',
      },
      {
        id: "D",
        text: "has studied",
        correct: false,
        explanation:
          'El present perfect conecta con el presente, y acá no hay nada vigente: el examen se rindió y se desaprobó. El tercer condicional pide past perfect, no present perfect.',
      },
    ],
    tips: [
      "Tercer condicional: if + had + participio / would have + participio.",
      "Si el enunciado aclara que ya pasó y no se puede cambiar, es tercer condicional.",
      'Las dos mitades van juntas: ver "would have" en una obliga "had" en la otra.',
    ],
  },
  {
    id: "ing-t2-q04",
    topic: "condicionales",
    prompt:
      'Elegí las DOS oraciones correctas. (Elegí 2)',
    multiple: true,
    options: [
      {
        id: "A",
        text: "If you heat water to 100 °C, it boils.",
        correct: true,
        explanation:
          'Correcta. Es el condicional cero: present simple en las dos mitades, para una relación que se cumple siempre. Se usa para hechos y leyes, no para situaciones particulares.',
      },
      {
        id: "B",
        text: "If I will have time, I will call you.",
        correct: false,
        explanation:
          'Dos "will" en la misma oración condicional, y uno de ellos después de "if". La correcta sería "If I have time, I will call you".',
      },
      {
        id: "C",
        text: "If they had left earlier, they wouldn't have missed the train.",
        correct: true,
        explanation:
          'Correcta. Tercer condicional bien armado: past perfect en la condición, "would have" + participio en la consecuencia, hablando de un pasado que ya no se puede cambiar.',
      },
      {
        id: "D",
        text: "If he would ask me, I would help him.",
        correct: false,
        explanation:
          '"would" después de "if" otra vez. La forma correcta del segundo condicional es "If he asked me, I would help him".',
      },
      {
        id: "E",
        text: "If she was taller, she will play basketball.",
        correct: false,
        explanation:
          'Mezcla las dos mitades de condicionales distintos: la condición es de segundo ("was/were taller") y la consecuencia de primero ("will play"). Tendría que ser "If she were taller, she would play basketball".',
      },
    ],
    tips: [
      "Revisá primero si hay un \"will\" o un \"would\" después de \"if\": descarta la opción sola.",
      "Después revisá que las dos mitades pertenezcan al mismo condicional.",
      "Condicional cero: present simple en las dos mitades, para hechos que se cumplen siempre.",
    ],
  },
];
