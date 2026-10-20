import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 4: Key Phrases & Expressions de la Lesson 17 y Unit 9, Lesson 18.
 *
 * Cubre las key phrases (on purpose, no big deal, I feel really bad, there's no
 * excuse for, it's unforgivable, it's (not) my fault, sorry to bother you,
 * somehow, to make an excuse, to make it up to), el Helping You de make an
 * excuse = make up an excuse, y de la Lesson 18 la Activity 1 (quejas y
 * respuestas), mess / messy, drive somebody crazy / nuts / mad, be finished
 * with, las excusas de la Activity 2, las formas de disculparse y la lame
 * excuse de la Activity 3. Las frases del Consolidation Exercise 1 de la
 * Lesson 18 son las que practican esas key phrases.
 */
export const TEMA_LESSON_18: ExamQuestionWithTopic[] = [
  {
    id: "inf-t4-q01",
    topic: "lesson-18",
    prompt:
      "Completa: “I don't think it was an accident. I think she did it ____.” (Traducción del libro: “…Eu acho que ela fez de propósito.”)",
    options: [
      {
        id: "A",
        text: "on purpose",
        correct: true,
        explanation:
          "Correcta. On purpose = de propósito, a propósito. El libro lo enseña como you do (something) on purpose, y es lo contrario de an accident. También aparece en I'm sure you did it on purpose.",
      },
      {
        id: "B",
        text: "by accident",
        correct: false,
        explanation:
          "By accident = sin querer, por accidente. Tienta porque la frase habla de un accidente y by accident es la expresión hermana de on purpose. Pero significa justo lo contrario: quien habla cree que no fue un accidente.",
      },
      {
        id: "C",
        text: "somehow",
        correct: false,
        explanation:
          "Somehow = de alguna forma, de alguna manera (I'll make it up to you somehow). Tienta porque es una key phrase de la misma lista y va al final de la frase. Pero dice cómo, no si fue intencional.",
      },
      {
        id: "D",
        text: "no big deal",
        correct: false,
        explanation:
          "No big deal = no es nada, no tiene importancia (it's no big deal!). Tienta porque también está en la lista de key phrases. Pero le resta importancia a algo; no dice que fuera intencional, y did it no big deal es agramatical.",
      },
    ],
    tips: [
      "on purpose = de propósito · by accident = sin querer.",
      "Se dice do something on purpose: did it on purpose.",
    ],
  },
  {
    id: "inf-t4-q02",
    topic: "lesson-18",
    prompt:
      "Completa: “____ your weird behavior.” (Traducción del libro: “Não tem desculpa para seu comportamento estranho.”)",
    options: [
      {
        id: "A",
        text: "You owe me an apology for",
        correct: false,
        explanation:
          "You owe me an apology for… = me debes una disculpa por… (owe somebody an apology). Tienta porque también reprocha el comportamiento y termina en for. Pero no dice que no haya justificación, que es lo que traduce não tem desculpa.",
      },
      {
        id: "B",
        text: "There's no excuse for",
        correct: true,
        explanation:
          "Correcta. There's no excuse for (that) = não tem desculpa pra (isso). El libro lo da como there is no excuse for (something / doing something), y lo usa en Don't try to make excuses. There's no excuse for what you did.",
      },
      {
        id: "C",
        text: "It's unforgivable for",
        correct: false,
        explanation:
          "It's unforgivable = es imperdonable, no tiene perdón (What they've done to her is unforgivable). Tienta porque expresa la misma condena. Pero el libro no lo usa con for + algo, y la traducción dice desculpa, no perdão.",
      },
      {
        id: "D",
        text: "You make an excuse for",
        correct: false,
        explanation:
          "You make an excuse for… = inventas una excusa para… (to make an excuse = to make up an excuse). Tienta porque contiene excuse for, como la correcta. Pero describe inventar una excusa, no que no exista ninguna.",
      },
    ],
    tips: [
      "There's no excuse for + algo / -ing = no hay excusa para.",
      "Va con algo o con -ing: no excuse for what you did, no excuse for doing that.",
    ],
  },
  {
    id: "inf-t4-q03",
    topic: "lesson-18",
    prompt:
      "Completa: “That's no excuse. You'll have to ____ me somehow.” (Traducción del libro: “…Você terá que me compensar de alguma maneira.”)",
    options: [
      {
        id: "A",
        text: "make an excuse to",
        correct: false,
        explanation:
          "Make an excuse = inventar una excusa. Tienta porque comparte make con la correcta y la frase empieza con excuse. Pero inventar una excusa no compensa nada, y la traducción dice compensar.",
      },
      {
        id: "B",
        text: "apologize to",
        correct: false,
        explanation:
          "Apologize to (somebody) = pedirle disculpas a alguien. Tienta porque es lo esperable de quien falló. Pero pedir perdón no es compensar: la frase exige reparar el daño de alguna manera.",
      },
      {
        id: "C",
        text: "make it up to",
        correct: true,
        explanation:
          "Correcta. To make it up to (somebody) = compensar (a alguien). Es una key phrase de la Lesson 17, y el libro la usa en I'll make it up to you somehow / You can't make it up to me.",
      },
      {
        id: "D",
        text: "make a complaint to",
        correct: false,
        explanation:
          "Make a complaint = hacer una reclamación. Tienta porque comparte make y la frase suena a reclamo. Pero quien tiene que compensar es el otro; hacer una queja sería lo que hace el que habla, no lo que le exige.",
      },
    ],
    tips: [
      "La persona va al final, tras to: make it up to me, make it up to you.",
      "somehow = de alguna forma: I'll make it up to you somehow.",
    ],
  },
  {
    id: "inf-t4-q04",
    topic: "lesson-18",
    prompt:
      "Completa: “I had to ____ for not going to her birthday party.” (Traducción del libro: “Eu tive que inventar uma desculpa…”)",
    options: [
      {
        id: "A",
        text: "make it up",
        correct: false,
        explanation:
          "Make it up (to somebody) = compensar a alguien. Tienta porque comparte make … up con la correcta. Pero no lleva excuse, y la traducción dice inventar uma desculpa, no compensar.",
      },
      {
        id: "B",
        text: "give an apology",
        correct: false,
        explanation:
          "Una apology es un pedido de perdón; el libro la combina con accept, reject y owe. Tienta porque apology y excuse se traducen igual (desculpa). Pero la apology reconoce la falta, y aquí se trata de inventar un pretexto.",
      },
      {
        id: "C",
        text: "owe an excuse",
        correct: false,
        explanation:
          "Owe = deber, y el libro lo usa con apology: you owe somebody an apology. Tienta porque mezcla un verbo de la lección con excuse. Pero owe an excuse no es una colocación del libro y no significa inventar.",
      },
      {
        id: "D",
        text: "make up an excuse",
        correct: true,
        explanation:
          "Correcta. El Helping You: to make an excuse = to make up an excuse = inventar una desculpa, y se dice make an excuse for (something / doing something). Por eso sigue for not going.",
      },
    ],
    tips: [
      "make an excuse = make up an excuse = inventar una excusa.",
      "make an excuse for + -ing: for not going.",
    ],
  },
  {
    id: "inf-t4-q05",
    topic: "lesson-18",
    prompt: "Completa: “Come on! It's ____.” (Traducción del libro: “Vamos lá. Não foi nada demais.”)",
    options: [
      {
        id: "A",
        text: "unforgivable",
        correct: false,
        explanation:
          "Unforgivable = imperdonable, no tiene perdón (it's unforgivable). Tienta porque es una key phrase de la misma lista y va tras It's. Pero dice lo contrario: es algo gravísimo, no algo sin importancia.",
      },
      {
        id: "B",
        text: "no big deal",
        correct: true,
        explanation:
          "Correcta. (It's) no big deal! = não foi nada!, não é nada demais!, não tem importância! El libro la usa en I know it was all my fault, but look, it's no big deal! y en Come on, it's no big deal, but I'll turn the volume down, anyway.",
      },
      {
        id: "C",
        text: "my fault",
        correct: false,
        explanation:
          "It's my fault = es mi culpa (eu tenho culpa). Tienta porque también es una key phrase con It's. Pero asumir la culpa no es restarle importancia, y Come on! introduce justamente eso.",
      },
      {
        id: "D",
        text: "a lame excuse",
        correct: false,
        explanation:
          "A lame excuse = una excusa poco convincente, difícil de creer (What a lame excuse!). Tienta porque es una expresión de la Lesson 18. Pero critica una excusa; no dice que algo no tenga importancia.",
      },
    ],
    tips: [
      "(It's) no big deal = no es nada, no tiene importancia.",
      "Come on! introduce algo que le quita importancia a la situación.",
    ],
  },
  {
    id: "inf-t4-q06",
    topic: "lesson-18",
    prompt: "La Activity 3 de la Lesson 18 se titula “What a lame excuse!”. Según el libro, ¿qué es a lame excuse?",
    options: [
      {
        id: "A",
        text: "An excuse you make on purpose to hurt somebody.",
        correct: false,
        explanation:
          "Describe una excusa malintencionada: on purpose = de propósito. Tienta porque mezcla dos expresiones de la unidad (excuse y on purpose). Pero lame no habla de intención, sino de lo poco creíble que es la excusa.",
      },
      {
        id: "B",
        text: "A polite way of starting or finishing an apology.",
        correct: false,
        explanation:
          "Describe frases como Sorry about that, Gee, I'm sorry o It won't happen again, que la Activity 2 presenta como ways of starting or finishing your apologies. Tienta porque están en la misma página. Pero no son excusas, y no tienen nada de lame.",
      },
      {
        id: "C",
        text: "An excuse that is not very convincing, so difficult to believe.",
        correct: true,
        explanation:
          "Correcta. El libro: A lame excuse is not very convincing, and so, difficult to believe. Las de la Activity 2 (I was stuck in a traffic jam, My alarm didn't go off…) son usual but not very convincing excuses.",
      },
      {
        id: "D",
        text: "An apology you owe somebody for what you said.",
        correct: false,
        explanation:
          "Describe owe somebody an apology (You owe her an apology for what you said). Tienta porque apology y excuse se traducen igual en portugués. Pero una apology pide perdón; una excuse justifica, y lame se refiere a esa justificación.",
      },
    ],
    tips: [
      "lame excuse = excusa poco convincente: What a lame excuse!",
      "excuse justifica; apology pide perdón.",
    ],
  },
  {
    id: "inf-t4-q07",
    topic: "lesson-18",
    prompt:
      "Completa: “____ but I need to ask you something.” (Traducción del libro: “Desculpe incomodar você, mas eu preciso te perguntar algo.”)",
    options: [
      {
        id: "A",
        text: "Sorry about that",
        correct: false,
        explanation:
          "Sorry about that = perdón por eso: se disculpa por algo que ya pasó (Oh, sorry about that. I didn't realize it was so loud). Tienta porque es una de las formas de disculparse de la Lesson 18. Pero aquí la molestia todavía no ocurrió: es una interrupción que empieza ahora.",
      },
      {
        id: "B",
        text: "I feel really bad",
        correct: false,
        explanation:
          "I feel really bad = me siento muy mal (con eso): expresa arrepentimiento por algo hecho (I do and I feel really bad). Tienta porque es una key phrase de disculpa. Pero no se usa para interrumpir a alguien con una pregunta.",
      },
      {
        id: "C",
        text: "I do apologize",
        correct: false,
        explanation:
          "I do apologize = realmente pido disculpas, una disculpa enfática por una falta (Please, forgive me. I do apologize for that). Tienta porque es cortés. Pero es demasiado fuerte para pedir un momento, y no traduce desculpe incomodar.",
      },
      {
        id: "D",
        text: "Sorry to bother you",
        correct: true,
        explanation:
          "Correcta. Sorry to bother you = desculpe te incomodar, una key phrase de la Lesson 17. Se usa antes de interrumpir o pedir algo, como en Sorry to bother you but could I ask you a favor?",
      },
    ],
    tips: [
      "Sorry to bother you: antes de molestar · Sorry about that: después.",
      "bother = incomodar, aborrecer.",
    ],
  },
  {
    id: "inf-t4-q08",
    topic: "lesson-18",
    prompt: "Completa: “Don't blame me. It ____.” (Traducción del libro: “Não me culpe. Eu não tive culpa.”)",
    options: [
      {
        id: "A",
        text: "wasn't my fault",
        correct: true,
        explanation:
          "Correcta. It's (not) my fault = eu (não) tenho culpa, (não) é minha culpa. En pasado: It wasn't my fault. Es la respuesta natural a Don't blame me: no me culpes, no fue culpa mía.",
      },
      {
        id: "B",
        text: "was on purpose",
        correct: false,
        explanation:
          "Was on purpose = fue a propósito, intencional. Tienta porque on purpose es una key phrase de la lección. Pero admitir que fue a propósito es lo contrario de pedir que no te culpen.",
      },
      {
        id: "C",
        text: "was no excuse",
        correct: false,
        explanation:
          "No excuse viene de there's no excuse for (that) = no hay excusa para eso. Tienta porque comparte el campo de las excusas. Pero it was no excuse diría que algo no sirve como justificación, no que uno no tenga culpa.",
      },
      {
        id: "D",
        text: "doesn't bother me",
        correct: false,
        explanation:
          "It doesn't bother me = no me molesta (It doesn't bother me that my daughter keeps forgetting…). Tienta porque es otra frase con it de la Lesson 17. Pero habla de molestia, no de culpa, y la traducción dice não tive culpa.",
      },
    ],
    tips: [
      "it's (not) my fault = (no) es mi culpa · it wasn't my fault = no fue mi culpa.",
      "Don't blame me pide que no te culpen; la razón es que no fue tu culpa.",
    ],
  },
  {
    id: "inf-t4-q09",
    topic: "lesson-18",
    prompt: "Según el Helping You de la Lesson 18, “Your room is in such a mess.” = “Your room is so ____.”",
    options: [
      {
        id: "A",
        text: "mess",
        correct: false,
        explanation:
          "Mess es el sustantivo: desorden, lío (What a mess in your room!). Tienta porque es la palabra de la frase original, y el libro dice que mess es más común que messy al hablar. Pero so va seguido de un adjetivo, y mess no lo es.",
      },
      {
        id: "B",
        text: "messy",
        correct: true,
        explanation:
          "Correcta. El libro: mess (noun) / messy (adjective). Your room is in such a mess = Your room is so messy. Tras so va el adjetivo, messy (desordenado). Y agrega: mess es más común que messy en el inglés hablado.",
      },
      {
        id: "C",
        text: "messed",
        correct: false,
        explanation:
          "Messed es el pasado o participio del verbo mess (mess up = desordenar, arruinar). Tienta porque los participios a veces funcionan como adjetivos. Pero el adjetivo que enseña el libro es messy; so messed no se usa así.",
      },
      {
        id: "D",
        text: "messing",
        correct: false,
        explanation:
          "Messing es la forma -ing del verbo mess (messing around = perder el tiempo, hacer tonterías). Tienta porque -ing también puede ir tras is. Pero describiría una acción en curso, no el estado del cuarto.",
      },
    ],
    tips: [
      "in such a mess (sustantivo) = so messy (adjetivo).",
      "such a + sustantivo · so + adjetivo.",
    ],
  },
  {
    id: "inf-t4-q10",
    topic: "lesson-18",
    prompt: "Completa: “That noise is driving me ____.”",
    options: [
      {
        id: "A",
        text: "crazily",
        correct: false,
        explanation:
          "Crazily es el adverbio de crazy: de manera loca (He drove crazily = manejó como un loco). Tienta porque la expresión correcta usa crazy y drive también significa manejar. Pero la expresión del libro lleva el adjetivo: drive somebody crazy.",
      },
      {
        id: "B",
        text: "annoying",
        correct: false,
        explanation:
          "Annoying = molesto, irritante, y describe la cosa que molesta (Oh, sorry about that. I didn't realize it was so annoying). Tienta porque el ruido es justamente annoying. Pero tras driving me va cómo queda la persona, no cómo es el ruido.",
      },
      {
        id: "C",
        text: "nuts",
        correct: true,
        explanation:
          "Correcta. To drive (somebody) crazy / nuts / mad = volver loco a alguien, hacer que se sienta o se comporte como loco. Es el ejemplo del Helping You de la Lesson 18: That noise is driving me nuts.",
      },
      {
        id: "D",
        text: "messy",
        correct: false,
        explanation:
          "Messy = desordenado (Your room is so messy). Tienta porque es otro adjetivo del mismo Helping You. Pero describe un lugar desordenado, no a una persona desesperada, y no forma expresión con drive.",
      },
    ],
    tips: [
      "drive somebody crazy / nuts / mad = volverlo loco.",
      "annoying describe lo que molesta; crazy / nuts / mad describen cómo te deja.",
    ],
  },
  {
    id: "inf-t4-q11",
    topic: "lesson-18",
    prompt: "¿Cómo se dice en inglés “Você já terminou de usar minha caneta?”, como en el Consolidation Exercise de la Lesson 18?",
    options: [
      {
        id: "A",
        text: "Are you finishing my pen yet?",
        correct: false,
        explanation:
          "Are you finishing…? es el presente continuo de finish: ¿estás terminando…? Tienta porque se parece a la estructura correcta (are you…). Pero sin with, finish my pen sugiere gastar o consumir la lapicera, no terminar de usarla.",
      },
      {
        id: "B",
        text: "Did you finish to use my pen?",
        correct: false,
        explanation:
          "Es un calco palabra por palabra de terminar de usar. Tienta porque traduce cada parte del portugués. Pero finish no va seguido de to + verbo (sería finish using), y el libro enseña una expresión propia para esto: be finished with.",
      },
      {
        id: "C",
        text: "Have you finished of my pen yet?",
        correct: false,
        explanation:
          "Have you finished…? es correcto, pero of no es la preposición que pide la expresión. Tienta porque en español decimos terminar de. Pero en inglés la preposición es with: Have you finished with my pen yet?",
      },
      {
        id: "D",
        text: "Are you finished with my pen yet?",
        correct: true,
        explanation:
          "Correcta. To have / to be finished with (something) = terminar de usar (alguna coisa). El libro da las dos formas como iguales: Are you finished with my scissors yet? = Have you finished with my scissors yet?",
      },
    ],
    tips: [
      "be finished with / have finished with = terminar de usar.",
      "La preposición es with: finished with my pen.",
    ],
  },
  {
    id: "inf-t4-q12",
    topic: "lesson-18",
    prompt:
      "Activity 1 de la Lesson 18: “I've lent you $50 for over a month. When are you going to pay me back?” ¿Qué respuesta del libro le corresponde?",
    options: [
      {
        id: "A",
        text: "Gosh, I'm sorry. I completely forgot about it. Let me transfer you the money right away.",
        correct: true,
        explanation:
          "Correcta. La queja es por dinero prestado (lend / lent) que no se devolvió, y la respuesta se disculpa (Gosh, I'm sorry), da la razón (lo olvidé por completo) y repara el problema: te transfiero el dinero ya mismo.",
      },
      {
        id: "B",
        text: "Oh, yes, I have. I'll give it back to you this afternoon. Sorry about that.",
        correct: false,
        explanation:
          "Responde a By the way, I need my laptop back. Have you finished with it yet?: sí, terminé (yes, I have) y te lo devuelvo (give it back) esta tarde. Tienta porque también promete devolver algo. Pero Oh, yes, I have contesta a una pregunta con have, y la del dinero es when are you going to…",
      },
      {
        id: "C",
        text: "Come on, it's no big deal, but I'll turn the volume down, anyway.",
        correct: false,
        explanation:
          "Responde a I'm trying to study here and this noise is driving me crazy: no es para tanto, pero bajo el volumen igual. Tienta porque es una respuesta a una queja de la misma actividad. Pero habla de volumen, y decir no big deal sobre una deuda sería ofensivo.",
      },
      {
        id: "D",
        text: "Yes, you're right. I've been so busy that I haven't had time to clean it up lately.",
        correct: false,
        explanation:
          "Responde a What a mess in your room! It's about time you cleaned it up: tienes razón, estuve tan ocupado que no tuve tiempo de ordenarlo. Tienta porque admite la falta. Pero habla de limpiar un cuarto, no de devolver dinero.",
      },
    ],
    tips: [
      "pay (somebody) back = devolver dinero · give (something) back = devolver un objeto.",
      "Una buena respuesta a una queja: disculpa + razón + solución.",
    ],
  },
  {
    id: "inf-t4-q13",
    topic: "lesson-18",
    prompt:
      "Activity 1 de la Lesson 18: “At last you're here! I've been waiting for more than an hour.” ¿Qué respuesta del libro le corresponde?",
    options: [
      {
        id: "A",
        text: "Oh, yes, I have. I'll give it back to you this afternoon.",
        correct: false,
        explanation:
          "Responde a By the way, I need my laptop back. Have you finished with it yet?: sí, terminé, te lo devuelvo esta tarde. Tienta porque es una disculpa con promesa. Pero no hay nada que devolver aquí: la queja es por la espera.",
      },
      {
        id: "B",
        text: "Gee, I do apologize for that. I missed the first bus.",
        correct: true,
        explanation:
          "Correcta. La queja es por llegar más de una hora tarde, y la respuesta se disculpa con énfasis (Gee, I do apologize for that) y da la excusa: perdí el primer autobús (I missed the first bus, una de las excusas de la Activity 2).",
      },
      {
        id: "C",
        text: "Come on, it's no big deal, but I'll turn the volume down.",
        correct: false,
        explanation:
          "Responde a I'm trying to study here and this noise is driving me crazy: no es para tanto (it's no big deal), pero bajo el volumen igual (turn down). Tienta porque es la respuesta a otra queja de la misma actividad. Pero habla de volumen, y restarle importancia a una hora de espera sería una falta de respeto.",
      },
      {
        id: "D",
        text: "Yes, you're right. I haven't had time to clean it up.",
        correct: false,
        explanation:
          "Responde a What a mess in your room! It's about time you cleaned it up: tienes razón, no tuve tiempo de ordenarlo. Tienta porque admite la falta. Pero clean it up se refiere a un cuarto desordenado, no a una espera.",
      },
    ],
    tips: [
      "At last you're here! = ¡por fin llegaste!: queja por la demora.",
      "Gee / Gosh, I'm sorry e I do apologize abren una disculpa.",
    ],
  },
  {
    id: "inf-t4-q14",
    topic: "lesson-18",
    prompt: "“I ran out of gas.” es una de las excusas por llegar tarde de la Activity 2 de la Lesson 18. ¿Qué significa?",
    options: [
      {
        id: "A",
        text: "Me quedé atascado en un embotellamiento.",
        correct: false,
        explanation:
          "Es la traducción de I was stuck in a traffic jam (stuck = atascado, traffic jam = embotellamiento), otra excusa de la misma lista. Tienta porque también es un problema del camino. Pero no menciona el tránsito: ran out of habla de quedarse sin algo.",
      },
      {
        id: "B",
        text: "Se me pinchó una llanta del auto.",
        correct: false,
        explanation:
          "Es la traducción de I had a flat tire (flat tire = llanta o neumático pinchado), otra excusa de la lista. Tienta porque también deja el auto parado. Pero gas no es la llanta: es la gasolina.",
      },
      {
        id: "C",
        text: "Me quedé sin gasolina en el camino.",
        correct: true,
        explanation:
          "Correcta. Run out of (something) = quedarse sin algo (run / ran / run), y gas = gasolina en inglés americano. Es una de las usual but not very convincing excuses de la Activity 2.",
      },
      {
        id: "D",
        text: "Perdí el autobús de la mañana.",
        correct: false,
        explanation:
          "Es la traducción de I missed the bus (miss = perder un transporte), otra excusa de la lista. Tienta porque es igual de común. Pero no habla de autobús: habla de gasolina.",
      },
    ],
    tips: [
      "run out of = quedarse sin · gas = gasolina · flat tire = llanta pinchada.",
      "Otras excusas del libro: My alarm didn't go off, There was a terrible accident on the way.",
    ],
  },
  {
    id: "inf-t4-q15",
    topic: "lesson-18",
    prompt:
      "Completa: “What they've done to her is ____.” (Traducción del libro: “O que eles fizeram pra ela é imperdoável.”)",
    options: [
      {
        id: "A",
        text: "no big deal",
        correct: false,
        explanation:
          "No big deal = no es nada, no tiene importancia. Tienta porque es una key phrase que va tras is. Pero es lo opuesto de imperdoável: le quita gravedad a lo que pasó.",
      },
      {
        id: "B",
        text: "a lame excuse",
        correct: false,
        explanation:
          "A lame excuse = una excusa poco convincente. Tienta porque es una expresión de la Lesson 18 que juzga algo negativamente. Pero lo que hicieron no es una excusa: es una acción.",
      },
      {
        id: "C",
        text: "on purpose",
        correct: false,
        explanation:
          "On purpose = de propósito. Tienta porque algo imperdonable suele ser intencional, y on purpose es otra key phrase de la lista. Pero no traduce imperdoável, y is on purpose suena forzado: se dice did it on purpose.",
      },
      {
        id: "D",
        text: "unforgivable",
        correct: true,
        explanation:
          "Correcta. It's unforgivable = é imperdoável, não tem perdão. Viene de forgive (perdonar) + -able (que se puede) con el prefijo un- (no). El libro la usa también en Don't say that. It was unforgivable.",
      },
    ],
    tips: [
      "unforgivable = un- + forgive + -able: que no se puede perdonar.",
      "It's unforgivable (gravísimo) es lo opuesto de it's no big deal (sin importancia).",
    ],
  },
];
