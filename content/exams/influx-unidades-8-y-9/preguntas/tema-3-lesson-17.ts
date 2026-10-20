import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 3: Unit 9, Lesson 17 — vocabulario y verbos.
 *
 * Cubre el Vocabulary Expansion (complaint, apology, excuse, behavior, fault y
 * los verbos complain, apologize, forgive, behave, blame, bother, realize), los
 * Helping You con la preposición que pide cada verbo, los Dialog Samples de la
 * página 69 y el Consolidation Exercise 1. Las key phrases de la lección (on
 * purpose, no big deal, make it up to…) se evalúan en el tema 4, junto con la
 * Lesson 18, donde el libro las practica.
 */
export const TEMA_LESSON_17: ExamQuestionWithTopic[] = [
  {
    id: "inf-t3-q01",
    topic: "lesson-17",
    prompt: "¿Qué palabra del Vocabulary Expansion de la Lesson 17 significa reclamação, queja?",
    options: [
      {
        id: "A",
        text: "complaint",
        correct: true,
        explanation:
          "Correcta. Complaint = reclamação, queixa: la queja que uno hace cuando algo le molesta. Su verbo es to complain / complained / complained (reclamar, queixar-se), y se usa en make a complaint about… o have a complaint about…",
      },
      {
        id: "B",
        text: "apology",
        correct: false,
        explanation:
          "Apology = desculpa, el pedido de perdón (you owe somebody an apology). Tienta porque queja y disculpa forman la pareja del título de la unidad, Complaints and Apologies. Pero la queja la hace quien se siente perjudicado, y la apology la ofrece quien causó el problema.",
      },
      {
        id: "C",
        text: "excuse",
        correct: false,
        explanation:
          "Excuse = desculpa, pretexto: la razón que uno da para justificarse (What's your excuse this time?). Tienta porque en portugués apology y excuse se traducen igual, desculpa, y las dos aparecen en la misma lista. Pero ninguna de las dos es una queja.",
      },
      {
        id: "D",
        text: "fault",
        correct: false,
        explanation:
          "Fault = culpa, defeito: de quién es la responsabilidad (it's my fault) o una falla de un aparato. Tienta porque una queja suele buscar al culpable. Pero fault es la culpa, no la queja.",
      },
    ],
    tips: [
      "complaint = queja · apology = disculpa · excuse = pretexto · fault = culpa, defecto.",
      "apology pide perdón; excuse justifica.",
    ],
  },
  {
    id: "inf-t3-q02",
    topic: "lesson-17",
    prompt: "A: “My laptop keyboard isn't working again.” B: “Yeah, there's definitely a ____ with it.”",
    options: [
      {
        id: "A",
        text: "mess",
        correct: false,
        explanation:
          "Mess = desorden, lío (What a mess in your room!, en la Lesson 18). Tienta porque un aparato que no anda parece un lío. Pero mess describe desorden o suciedad, no una falla técnica.",
      },
      {
        id: "B",
        text: "fault",
        correct: true,
        explanation:
          "Correcta. Además de culpa, fault significa defeito, una falla de funcionamiento. Es el ejemplo del Helping You de la Lesson 17: My laptop keyboard isn't working again. — Yeah, there's definitely a fault with it.",
      },
      {
        id: "C",
        text: "blame",
        correct: false,
        explanation:
          "Blame es sobre todo el verbo culpar (to blame / blamed / blamed: Don't blame me). Tienta porque blame y fault giran en torno a la culpa. Pero aquí no se culpa a nadie: se dice que el teclado tiene un defecto.",
      },
      {
        id: "D",
        text: "behavior",
        correct: false,
        explanation:
          "Behavior = comportamiento, conducta (good behavior, bad behavior, strange behavior). Tienta porque se puede hablar del comportamiento extraño de una máquina. Pero el libro usa behavior para personas, y there's a … with it pide el sustantivo que nombra la falla.",
      },
    ],
    tips: [
      "fault tiene dos sentidos: culpa (it's my fault) y defecto (there's a fault with it).",
      "mess = desorden; fault = falla de un aparato.",
    ],
  },
  {
    id: "inf-t3-q03",
    topic: "lesson-17",
    prompt: "Completa: “I never ____ myself for forgetting her birthday.”",
    options: [
      {
        id: "A",
        text: "forgived",
        correct: false,
        explanation:
          "Forgived sería el pasado regular, con -ed. Tienta porque es la regla general del pasado. Pero forgive es irregular: forgive / forgave / forgiven, como figura en la tabla de la Lesson 17.",
      },
      {
        id: "B",
        text: "forgiven",
        correct: false,
        explanation:
          "Forgiven es el participio de forgive, el que va con have o con la pasiva (I have forgiven him, You are forgiven). Tienta porque es una forma irregular real del mismo verbo. Pero sin auxiliar delante no puede funcionar como pasado.",
      },
      {
        id: "C",
        text: "forgave",
        correct: true,
        explanation:
          "Correcta. Forgave es el pasado de forgive (perdoar). La estructura del libro es you forgive (somebody) for (something / doing something), y este es su ejemplo: I never forgave myself for forgetting her birthday.",
      },
      {
        id: "D",
        text: "forgot",
        correct: false,
        explanation:
          "Forgot es el pasado de forget (olvidar), que en la misma frase aparece como forgetting. Tienta porque forget y forgive se parecen mucho en la forma. Pero “nunca me olvidé a mí mismo por olvidar su cumpleaños” no tiene sentido.",
      },
    ],
    tips: [
      "forgive / forgave / forgiven.",
      "forgive (somebody) for + -ing: forgave myself for forgetting.",
    ],
  },
  {
    id: "inf-t3-q04",
    topic: "lesson-17",
    prompt: "Completa: “You should apologize ____ the teacher ____ arriving late.”",
    options: [
      {
        id: "A",
        text: "for … to",
        correct: false,
        explanation:
          "For … to invierte las preposiciones correctas. Tienta porque las dos palabras son las que pide apologize, solo que en otro orden. Pero for va con el motivo y to con la persona, y aquí la persona (the teacher) va primero.",
      },
      {
        id: "B",
        text: "with … about",
        correct: false,
        explanation:
          "With y about son las preposiciones de bother: you bother (somebody) with / about (something). Tienta porque es otro verbo de la misma lección con dos preposiciones. Pero apologize no las usa.",
      },
      {
        id: "C",
        text: "to … of",
        correct: false,
        explanation:
          "Of se usa en español como “de” en disculparse de algo, y por eso tienta (también hay calcos como complain of). La primera mitad, to, está bien. Pero el libro enseña for para el motivo: apologize for doing something, nunca of.",
      },
      {
        id: "D",
        text: "to … for",
        correct: true,
        explanation:
          "Correcta. El libro: you apologize to (somebody) for (something / doing something). To introduce a quien se pide perdón, for el motivo, y tras for el verbo va con -ing: You should apologize to the teacher for arriving late.",
      },
    ],
    tips: [
      "apologize TO a person FOR something / doing something.",
      "Después de preposición, el verbo va con -ing: for arriving late.",
    ],
  },
  {
    id: "inf-t3-q05",
    topic: "lesson-17",
    prompt:
      "Completa: “I want to ____ a complaint about the noise you've been making lately.” (Traducción del libro: “Eu quero fazer uma reclamação…”)",
    options: [
      {
        id: "A",
        text: "make",
        correct: true,
        explanation:
          "Correcta. El Helping You de la Lesson 17: you make a complaint (about)… / you have a complaint (about)… Make es el verbo que acompaña a complaint para decir hacer una reclamación.",
      },
      {
        id: "B",
        text: "do",
        correct: false,
        explanation:
          "Do significa hacer y va con favor (do somebody a favor). Tienta porque en portugués y en español decimos fazer / hacer una reclamación, y do también es hacer. Pero complaint se combina con make, no con do.",
      },
      {
        id: "C",
        text: "say",
        correct: false,
        explanation:
          "Say = decir, y se usa para citar palabras (She said she was sorry). Tienta porque una queja se dice en voz alta. Pero say no forma colocación con complaint: say a complaint no se usa.",
      },
      {
        id: "D",
        text: "tell",
        correct: false,
        explanation:
          "Tell = contar o decirle algo a alguien, y necesita la persona (She told him she behaved badly…). Tienta porque también es comunicar. Pero no se combina con complaint, y aquí no hay persona después del verbo.",
      },
    ],
    tips: [
      "make a complaint about / have a complaint about.",
      "make: request, promise, complaint, excuse · do: favor.",
    ],
  },
  {
    id: "inf-t3-q06",
    topic: "lesson-17",
    prompt: "Completa: “You ____ her an apology for what you said.”",
    options: [
      {
        id: "A",
        text: "accept",
        correct: false,
        explanation:
          "Accept an apology = aceptar una disculpa. Tienta porque está en la misma línea del libro (accept / reject / owe an apology). Pero lo hace quien recibe la disculpa, y aquí la frase está dirigida a quien dijo algo hiriente.",
      },
      {
        id: "B",
        text: "apologize",
        correct: false,
        explanation:
          "Apologize es el verbo pedir disculpas (to apologize / apologized / apologized), y se construye apologize to (somebody) for (something). Tienta porque es el verbo de la misma familia que apology. Pero no lleva objeto directo: apologize her an apology repite la idea y es agramatical; sería You should apologize to her for what you said.",
      },
      {
        id: "C",
        text: "owe",
        correct: true,
        explanation:
          "Correcta. Owe = deber, tener una deuda. You owe (somebody) an apology = le debes una disculpa a alguien. Es el ejemplo exacto del Helping You: You owe her an apology for what you said.",
      },
      {
        id: "D",
        text: "reject",
        correct: false,
        explanation:
          "Reject an apology = rechazar una disculpa, no aceptarla. Tienta porque también es una colocación de apology en el libro. Pero lo hace quien recibe la disculpa, y no lleva una persona en medio (reject her an apology no existe).",
      },
    ],
    tips: [
      "owe = deber algo, igual que se debe dinero.",
      "La persona va justo después de owe: owe her an apology.",
    ],
  },
  {
    id: "inf-t3-q07",
    topic: "lesson-17",
    prompt: "Completa: “Stop ____ a child.” (Traducción del libro: “Pare de se comportar como uma criança.”)",
    options: [
      {
        id: "A",
        text: "behaving in",
        correct: false,
        explanation:
          "Behave in a … way es la otra estructura del libro: behave in a strange way, in a terrible way, in a childish way. Tienta porque también describe cómo se comporta alguien. Pero exige la palabra way; behaving in a child no tiene sentido.",
      },
      {
        id: "B",
        text: "to behave like",
        correct: false,
        explanation:
          "To behave es el infinitivo, y stop + to cambia el sentido: stop to do = detenerse para hacer algo. Tienta porque behave like es la estructura correcta. Pero “stop to behave like a child” diría que alguien se detiene para empezar a portarse como niño.",
      },
      {
        id: "C",
        text: "behaving as a way",
        correct: false,
        explanation:
          "Behaving as a way mezcla las dos estructuras del libro (like a child / in a childish way) y no existe como tal. Tienta porque contiene way, como behave in a strange way. Pero ni as a way ni la combinación con a child son correctas.",
      },
      {
        id: "D",
        text: "behaving like",
        correct: true,
        explanation:
          "Correcta. El libro: you behave like a professional / like sheep / like a child / like an adult. Tras stop, el verbo va con -ing (dejar de hacer algo): Stop behaving like a child.",
      },
    ],
    tips: [
      "behave like + persona (like a child) · behave in a + adjetivo + way (in a childish way).",
      "behave / behaved / behaved = comportarse.",
    ],
  },
  {
    id: "inf-t3-q08",
    topic: "lesson-17",
    prompt: "Completa: “Don't blame me ____ your mistakes.”",
    options: [
      {
        id: "A",
        text: "of",
        correct: false,
        explanation:
          "Of es la preposición de posesión o de origen (the behavior of her son). Tienta porque en español decimos “culpar de”, y of parece su traducción directa. Pero en inglés blame no va con of: el libro enseña blame (somebody) for (something / doing something).",
      },
      {
        id: "B",
        text: "for",
        correct: true,
        explanation:
          "Correcta. El libro: you blame (somebody) for (something / doing something), con el ejemplo She blamed him for the accident. La traducción del ejercicio es Não me culpe pelos seus erros: pelos = for.",
      },
      {
        id: "C",
        text: "about",
        correct: false,
        explanation:
          "About es la preposición de complain y de bother: complain about my behavior, bother somebody about something. Tienta porque son verbos de la misma lección. Pero blame no la usa.",
      },
      {
        id: "D",
        text: "with",
        correct: false,
        explanation:
          "With va con bother: She keeps bothering him with her problems. Tienta porque bother y blame se estudian juntos y empiezan con b. Pero blame pide for.",
      },
    ],
    tips: [
      "blame somebody FOR something: She blamed him for the accident.",
      "En español culpamos de algo; en inglés se culpa for algo.",
    ],
  },
  {
    id: "inf-t3-q09",
    topic: "lesson-17",
    prompt: "Completa: “She keeps bothering him ____ her problems.”",
    options: [
      {
        id: "A",
        text: "with",
        correct: true,
        explanation:
          "Correcta. El libro: you bother (somebody) with / about (something) = incomodar, aborrecer a alguien con algo. Es su ejemplo: She keeps bothering him with her problems. Con about también sería correcto, pero no está entre las opciones.",
      },
      {
        id: "B",
        text: "for",
        correct: false,
        explanation:
          "For es la preposición de blame, forgive y apologize: blame him for the accident, forgive somebody for something. Tienta porque es la preposición más repetida de la lección. Pero bother no va con for.",
      },
      {
        id: "C",
        text: "of",
        correct: false,
        explanation:
          "Of es la preposición de posesión o pertenencia (the behavior of her son). Tienta porque en español a veces decimos “molestar de”. Pero no es la preposición de bother en el libro.",
      },
      {
        id: "D",
        text: "to",
        correct: false,
        explanation:
          "To es la preposición que introduce a la persona en apologize to the teacher. Tienta porque aquí también hay una persona (him). Pero him ya va directo tras bothering; lo que sigue es el tema de la molestia, y eso va con with o about.",
      },
    ],
    tips: [
      "bother somebody WITH / ABOUT something.",
      "keep + -ing = seguir haciendo: keeps bothering.",
    ],
  },
  {
    id: "inf-t3-q10",
    topic: "lesson-17",
    prompt:
      "Completa: “It ____ bother me that my daughter keeps forgetting to put the garbage out.” (Traducción del libro: “Eu não me incomodo…”)",
    options: [
      {
        id: "A",
        text: "isn't",
        correct: false,
        explanation:
          "Isn't es la negación de be (is not), que se usa con adjetivos o con -ing (It isn't bothering me). Tienta porque es la negación más común con it. Pero aquí bother está en forma base, y en presente simple la negación se hace con does not.",
      },
      {
        id: "B",
        text: "don't",
        correct: false,
        explanation:
          "Don't es la negación de presente simple para I, you, we y they (Don't blame me). Tienta porque es la negación que más aparece en los ejemplos del libro. Pero el sujeto es it, tercera persona del singular, que pide doesn't.",
      },
      {
        id: "C",
        text: "doesn't",
        correct: true,
        explanation:
          "Correcta. It doesn't bother me that… = no me molesta que… Con it, el presente simple se niega con doesn't + forma base. El libro usa la misma estructura en pregunta: Does it bother you that I earn more than you?",
      },
      {
        id: "D",
        text: "not",
        correct: false,
        explanation:
          "Not solo es la partícula de negación, pero en presente simple necesita un auxiliar (do / does) que la sostenga. Tienta porque la traducción tiene un não suelto. Pero en inglés it not bother es agramatical.",
      },
    ],
    tips: [
      "It doesn't bother me that… / Does it bother you that…?",
      "Presente simple con he / she / it: doesn't y does.",
    ],
  },
  {
    id: "inf-t3-q11",
    topic: "lesson-17",
    prompt:
      "Completa: “It took me a long time to ____ what had happened.” (Traducción del libro: “Eu levei muito tempo para me dar conta do que havia acontecido.”)",
    options: [
      {
        id: "A",
        text: "behave",
        correct: false,
        explanation:
          "Behave = comportarse (Stop behaving like a child). Tienta porque es otro verbo de la tabla de la Lesson 17. Pero comportarse no tiene objeto: behave what had happened no tiene sentido.",
      },
      {
        id: "B",
        text: "forgive",
        correct: false,
        explanation:
          "Forgive = perdonar (I'll never forgive you for what you've done to me). Tienta porque tardar en perdonar lo ocurrido también es común. Pero la traducción dice me dar conta, no perdoar.",
      },
      {
        id: "C",
        text: "blame",
        correct: false,
        explanation:
          "Blame = culpar, y su objeto es una persona (blame somebody for something). Tienta porque es un verbo de la misma tabla y la frase habla de algo que pasó. Pero no se culpa a lo que pasó, y la traducción pide darse cuenta.",
      },
      {
        id: "D",
        text: "realize",
        correct: true,
        explanation:
          "Correcta. To realize / realized / realized = dar-se conta, perceber. Es el último verbo de la tabla de la Lesson 17 y aparece también en Do you realize you're an hour late? y en I didn't realize it was so loud.",
      },
    ],
    tips: [
      "realize = darse cuenta (no “realizar”).",
      "Do you realize…? = ¿te das cuenta de que…?",
    ],
  },
  {
    id: "inf-t3-q12",
    topic: "lesson-17",
    prompt:
      "A: “Do you realize you're an hour late?” B: “Please, forgive me. I do apologize for that.” ¿Qué hace el do en I do apologize?",
    options: [
      {
        id: "A",
        text: "Convierte la frase en una pregunta.",
        correct: false,
        explanation:
          "Do es el auxiliar que forma preguntas en presente simple (Do you realize…?, la frase de A). Tienta porque la pregunta de A empieza justamente con do. Pero en una pregunta do va antes del sujeto, y aquí va después de I, en una afirmación.",
      },
      {
        id: "B",
        text: "Refuerza la disculpa: realmente lo siento.",
        correct: true,
        explanation:
          "Correcta. En una afirmación, do + forma base da énfasis: I do apologize = realmente pido disculpas (eu realmente peço desculpas, en la traducción del libro). Está también en la lista de formas de disculparse de la Lesson 18, junto a I really apologize.",
      },
      {
        id: "C",
        text: "Pone la disculpa en pasado.",
        correct: false,
        explanation:
          "El pasado de apologize es apologized (to apologize / apologized / apologized), y si hubiera auxiliar sería did. Tienta porque la falta pasó antes. Pero do está en presente: la disculpa se pide ahora.",
      },
      {
        id: "D",
        text: "Significa hacer: hago una disculpa.",
        correct: false,
        explanation:
          "Do como verbo principal significa hacer (do me a favor). Tienta porque es el significado básico de do. Pero aquí apologize ya es el verbo principal; do no añade una acción, solo intensidad.",
      },
    ],
    tips: [
      "I do apologize = I really apologize: el do afirmativo enfatiza.",
      "Do antes del sujeto = pregunta; do después del sujeto = énfasis.",
    ],
  },
  {
    id: "inf-t3-q13",
    topic: "lesson-17",
    prompt: "A: “She always complains about my behavior.” B: “Of course. You never stop ____ her.”",
    options: [
      {
        id: "A",
        text: "to bother",
        correct: false,
        explanation:
          "To bother es el infinitivo, y stop + to significa detenerse para hacer otra cosa: stop to bother her = parar para ir a molestarla. Tienta porque to bother es la forma de diccionario. Pero B quiere decir que A nunca deja de molestarla, y eso es stop + -ing.",
      },
      {
        id: "B",
        text: "bother",
        correct: false,
        explanation:
          "Bother en forma base es lo que va tras un modal o tras don't (Don't bother her). Tienta porque stop parece una orden. Pero stop aquí es el verbo principal conjugado (you never stop), y lo que sigue tiene que ir con -ing.",
      },
      {
        id: "C",
        text: "bothering",
        correct: true,
        explanation:
          "Correcta. Stop + -ing = dejar de hacer algo. Es el Dialog Sample 1 de la Lesson 17: She always complains about my behavior. — Of course. You never stop bothering her (claro, nunca paras de incomodarla).",
      },
      {
        id: "D",
        text: "bothered",
        correct: false,
        explanation:
          "Bothered es el pasado y el participio de bother (to bother / bothered / bothered). Tienta porque es una forma real del verbo. Pero stop no va seguido de pasado ni de participio.",
      },
    ],
    tips: [
      "stop + -ing = dejar de · stop + to = detenerse para.",
      "complain about: She always complains about my behavior.",
    ],
  },
  {
    id: "inf-t3-q14",
    topic: "lesson-17",
    prompt:
      "Completa: “____ is it, anyway?” (Traducción del libro: “De quem é a culpa, de qualquer forma?”)",
    options: [
      {
        id: "A",
        text: "Who's fault",
        correct: false,
        explanation:
          "Who's es la contracción de who is o who has (Who's late?). Tienta porque suena exactamente igual que whose. Pero who is fault no tiene sentido; para preguntar de quién es algo hace falta el posesivo whose.",
      },
      {
        id: "B",
        text: "Whose excuse",
        correct: false,
        explanation:
          "Excuse = desculpa, pretexto (What's your excuse this time?). Tienta porque whose está bien y excuse es vocabulario de la misma lección. Pero la traducción pregunta por la culpa, no por la excusa.",
      },
      {
        id: "C",
        text: "Who blames",
        correct: false,
        explanation:
          "Blame es el verbo culpar, y who blames preguntaría quién culpa (a otro). Tienta porque blame está en el campo de la culpa. Pero la pregunta es de quién es la culpa, no quién acusa, y who blames is it es agramatical.",
      },
      {
        id: "D",
        text: "Whose fault",
        correct: true,
        explanation:
          "Correcta. Whose = de quién (posesivo) y fault = culpa. Whose fault is it, anyway? = ¿de quién es la culpa, de todos modos? La respuesta usa la misma palabra: it's my fault / it's not my fault / it's the traffic's fault.",
      },
    ],
    tips: [
      "whose = de quién (posesivo) · who's = who is.",
      "it's (not) my fault = (no) es mi culpa.",
    ],
  },
  {
    id: "inf-t3-q15",
    topic: "lesson-17",
    prompt: "En el Helping You de la Lesson 17, ¿qué verbo se usa con apology para decir que no aceptas una disculpa?",
    options: [
      {
        id: "A",
        text: "reject",
        correct: true,
        explanation:
          "Correcta. El libro: you accept an apology / you reject an apology / you owe (somebody) an apology. Reject an apology = rechazar una disculpa, no aceptarla.",
      },
      {
        id: "B",
        text: "refuse",
        correct: false,
        explanation:
          "Refuse = rechazar, negarse; el libro lo enseña con request: you refuse a request (Lesson 15). Tienta porque en español los dos son rechazar, y en inglés también se oye refuse an apology. Pero la pregunta es por la colocación del Helping You de la Lesson 17, y ahí el libro escribe reject an apology.",
      },
      {
        id: "C",
        text: "owe",
        correct: false,
        explanation:
          "Owe = deber: you owe somebody an apology = le debes una disculpa a alguien. Tienta porque es otra colocación de apology en la misma línea del libro. Pero describe a quien tiene que disculparse, no a quien rechaza la disculpa.",
      },
      {
        id: "D",
        text: "break",
        correct: false,
        explanation:
          "Break = romper, y el libro lo usa con promise: you break a promise (no cumplir una promesa). Tienta porque también expresa algo negativo con un sustantivo de la unidad. Pero break no se combina con apology.",
      },
    ],
    tips: [
      "apology: accept / reject / owe · request: accept / refuse · promise: make / keep / break.",
      "Rechazar una disculpa: reject; rechazar un pedido: refuse.",
    ],
  },
];
