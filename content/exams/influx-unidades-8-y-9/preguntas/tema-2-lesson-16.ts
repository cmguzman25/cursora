import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 2: Unit 8, Lesson 16 — aceptar y rechazar pedidos.
 *
 * Cubre la Activity 1 (pedidos y sus respuestas), la Activity 2 (frases para
 * aceptar y para rechazar), los phrasal verbs de la lista del Consolidation
 * Exercise 2 y el recuadro del Exercise 3 (in a row, for the time being, keep
 * on, I was wondering if, Could you please, I really appreciate it…). Incluye
 * también los diálogos de la Lesson 15 donde esas frases se usan, porque la
 * Lesson 16 es la práctica de aquellas key phrases.
 */
export const TEMA_LESSON_16: ExamQuestionWithTopic[] = [
  {
    id: "inf-t2-q01",
    topic: "lesson-16",
    prompt:
      "En la Activity 1 de la Lesson 16, un profesor dice: “Would you mind not checking your phone in the classroom?”. ¿Qué respuesta del libro le corresponde?",
    options: [
      {
        id: "A",
        text: "Oh, I'm sorry. I'll put it away.",
        correct: true,
        explanation:
          "Correcta. Would you mind not checking your phone…? = ¿te importaría no mirar el teléfono…? La respuesta del libro se disculpa y cumple: Oh, I'm sorry. I'll put it away. Put away = guardar algo en su lugar, es decir, guardar el teléfono.",
      },
      {
        id: "B",
        text: "Oh, I'm sorry. I promise I won't be late again.",
        correct: false,
        explanation:
          "Es una disculpa con una promesa: perdón, prometo no volver a llegar tarde (promise + won't). En el libro responde a la profesora que dice I'd appreciate it if you tried to come to class on time. Tienta porque también es una disculpa en el aula. Pero el problema aquí es el teléfono, no la puntualidad.",
      },
      {
        id: "C",
        text: "You must be kidding! No way!",
        correct: false,
        explanation:
          "You must be kidding! No way! = ¡debes estar bromeando! ¡de ninguna manera!, un rechazo rotundo. En el libro responde al chico que pide el auto prestado (Do you think you could lend me your car this weekend?). Tienta porque un pedido con would you mind se puede rechazar. Pero no es la respuesta que el libro empareja con el profesor.",
      },
      {
        id: "D",
        text: "Of course. Here you go.",
        correct: false,
        explanation:
          "Of course. Here you go. = claro, aquí tienes: se dice al entregar algo en la mano. En el libro responde a Could you pass me that grocery bag over there, please? Tienta porque acepta el pedido. Pero el profesor no pide que le den el teléfono: pide que no lo usen.",
      },
    ],
    tips: [
      "Here you go / Here you are acompañan a entregar un objeto.",
      "put (something) away = guardarlo en su lugar.",
    ],
  },
  {
    id: "inf-t2-q02",
    topic: "lesson-16",
    prompt:
      "Te preguntan: “Would you mind calling me tomorrow?”. Quieres aceptar. ¿Qué respuesta del Consolidation Exercise de la Lesson 16 corresponde?",
    options: [
      {
        id: "A",
        text: "Yes, I would. I'll call you at noon.",
        correct: false,
        explanation:
          "Yes, I would responde literalmente a would you mind: sí, me importaría. Tienta porque en español a “¿te importaría llamarme?” se acepta con un sí. Pero mind significa que algo moleste; contestar yes es decir que sí molesta, o sea, rechazar, y contradice el resto de la frase.",
      },
      {
        id: "B",
        text: "No, not at all. Is it OK if I call you at noon then?",
        correct: true,
        explanation:
          "Correcta. Con would you mind, aceptar es decir que no te importa: No, not at all (no, para nada). Es la respuesta del libro, que además propone una hora: Is it OK if I call you at noon then?",
      },
      {
        id: "C",
        text: "I'm afraid I can't. I have a Math test tomorrow.",
        correct: false,
        explanation:
          "I'm afraid I can't = me temo que no puedo: un rechazo cortés, de la lista Refusing a request. En el libro responde a la invitación Why don't you come with us tonight? Tienta porque menciona tomorrow. Pero rechaza, y la consigna pide aceptar.",
      },
      {
        id: "D",
        text: "Sure. Here you are, take it.",
        correct: false,
        explanation:
          "Sure. Here you are. = claro, aquí tienes: se dice al entregar un objeto (en el libro responde a Could you pass me the sugar, please?). Tienta porque empieza con Sure, que acepta. Pero here you are acompaña a pasar algo de mano en mano, y una llamada no se entrega.",
      },
    ],
    tips: [
      "Would you mind…? se acepta con No / Not at all: no me molesta.",
      "Contestar Yes a would you mind es decir que sí molesta.",
    ],
  },
  {
    id: "inf-t2-q03",
    topic: "lesson-16",
    prompt:
      "La Activity 2 de la Lesson 16 reparte frases en dos listas: Accepting a request y Refusing a request. ¿Cuál va en Refusing?",
    options: [
      {
        id: "A",
        text: "Sure! I'd be glad to.",
        correct: false,
        explanation:
          "Sure! I'd be glad to. = ¡claro! lo haría con gusto (glad = contento). Acepta con entusiasmo. Tienta porque es muy cortés, igual que muchas negativas suaves. Pero va en la lista de aceptar.",
      },
      {
        id: "B",
        text: "It's no trouble, really.",
        correct: false,
        explanation:
          "It's no trouble, really. = no es ninguna molestia, de verdad. Se dice al aceptar un pedido para que el otro no se sienta mal por haber pedido. Tienta porque contiene una negación y suena a negativa. Pero lo negado es la molestia, no el pedido: es aceptar.",
      },
      {
        id: "C",
        text: "I don't think I can today.",
        correct: true,
        explanation:
          "Correcta. I don't think I can today. = no creo que pueda hoy. Es una negativa suave: no rechaza de golpe, pero dice que no. Va en Refusing junto con I'm afraid I can't, I'd rather not, I'm sorry but I can't right now, No way! y What? You must be kidding!",
      },
      {
        id: "D",
        text: "All right! I'll do that.",
        correct: false,
        explanation:
          "All right! I'll do that. = ¡está bien! lo hago. Acepta y se compromete con will. Tienta porque es breve y neutra, sin palabras de entusiasmo. Pero es una aceptación.",
      },
    ],
    tips: [
      "Una negación en la frase no la vuelve rechazo: It's no trouble y Not at all! Don't worry about it aceptan.",
      "Rechazos suaves: I'm afraid I can't, I'd rather not, I don't think I can today.",
    ],
  },
  {
    id: "inf-t2-q04",
    topic: "lesson-16",
    prompt:
      "A: “Mom, I've just cleaned my room. Could you throw these old magazines away for me?” B: “Sure, ____. They're all garbage, anyway.”",
    options: [
      {
        id: "A",
        text: "I'd rather not",
        correct: false,
        explanation:
          "I'd rather not = preferiría que no (eu preferia que não), un rechazo suave. Tienta porque es una key phrase de la misma lección. Pero contradice el Sure del principio: no se puede aceptar y rechazar en la misma frase.",
      },
      {
        id: "B",
        text: "I can't promise anything",
        correct: false,
        explanation:
          "I can't promise anything = no prometo nada: se usa para no garantizar un resultado incierto. Tienta porque es una respuesta posible a un pedido. Pero tirar unas revistas no tiene nada de incierto, y no encaja con Sure ni con They're all garbage, anyway.",
      },
      {
        id: "C",
        text: "I was wondering",
        correct: false,
        explanation:
          "I was wondering… = estaba pensando…, será que…: introduce un pedido (I was wondering… could I invite Mike to your party too?). Tienta porque es una de las frases más destacadas de la lección. Pero la usa quien pide, no quien responde.",
      },
      {
        id: "D",
        text: "it would be a pleasure",
        correct: true,
        explanation:
          "Correcta. It would be a pleasure = sería un placer (seria um prazer). Acepta un pedido con gusto. Es la respuesta de la mamá en el Dialog Sample 3 de la Lesson 15: Sure, it would be a pleasure. They're all garbage, anyway.",
      },
    ],
    tips: [
      "Sure abre una aceptación: lo que sigue tiene que aceptar también.",
      "It would be a pleasure, Sure! I'd be glad to y It's no trouble, really aceptan con gusto.",
    ],
  },
  {
    id: "inf-t2-q05",
    topic: "lesson-16",
    prompt:
      "A: “You can keep on living here for the time being.” B: “Oh, thanks. ____”",
    options: [
      {
        id: "A",
        text: "I really appreciate it!",
        correct: true,
        explanation:
          "Correcta. I appreciate it! / I really appreciate it! = ¡te lo agradezco (mucho)! (eu agradeço). Agradece algo que ya te ofrecieron o hicieron. Es la respuesta del Dialog Sample 4 de la Lesson 15.",
      },
      {
        id: "B",
        text: "I'd appreciate it if…",
        correct: false,
        explanation:
          "I'd appreciate it if… = agradecería si… (eu agradeceria se): sirve para pedir algo con cortesía (I'd appreciate it if you could go there for me). Tienta porque comparte appreciate. Pero introduce un pedido, y aquí B no pide nada: agradece una oferta que ya recibió.",
      },
      {
        id: "C",
        text: "It's no trouble, really.",
        correct: false,
        explanation:
          "It's no trouble, really. = no es molestia, de verdad. Lo dice quien hace el favor, para quitarle peso. Tienta porque es cortés y va bien tras thanks en otros contextos. Pero B es quien recibe el favor, no quien lo hace.",
      },
      {
        id: "D",
        text: "Sure! No problem!",
        correct: false,
        explanation:
          "Sure! No problem! = ¡claro! ¡sin problema!: acepta un pedido. Tienta porque es la respuesta más frecuente del libro. Pero A no le pide nada a B; le ofrece quedarse, y una oferta se agradece, no se acepta como un pedido.",
      },
    ],
    tips: [
      "I appreciate it! agradece; I'd appreciate it if… pide.",
      "Quien hace el favor dice It's no trouble; quien lo recibe dice I really appreciate it.",
    ],
  },
  {
    id: "inf-t2-q06",
    topic: "lesson-16",
    prompt: "Completa: “Could you please stop checking your phone in here? This is your fourth time ____.”",
    options: [
      {
        id: "A",
        text: "for the time being",
        correct: false,
        explanation:
          "For the time being = por ahora, por el momento (por enquanto): You can keep on living here for the time being. Tienta porque es otra expresión de tiempo del mismo recuadro del ejercicio. Pero no cuenta repeticiones: “cuarta vez por ahora” no dice que fueran seguidas.",
      },
      {
        id: "B",
        text: "in a row",
        correct: true,
        explanation:
          "Correcta. In a row = seguidas, consecutivas. Your fourth time in a row = tu cuarta vez seguida. Es el diálogo c del Consolidation Exercise 3 de la Lesson 16.",
      },
      {
        id: "C",
        text: "anyway",
        correct: false,
        explanation:
          "Anyway = de todos modos, de cualquier forma (de qualquer forma): They're all garbage, anyway. Tienta porque suele ir al final de la frase. Pero tras fourth time no aporta sentido: no hay nada que contrastar.",
      },
      {
        id: "D",
        text: "somehow",
        correct: false,
        explanation:
          "Somehow = de alguna forma, de alguna manera (I'll make it up to you somehow, en la Lesson 17). Tienta por la posición final y por ser otro adverbio del libro. Pero habla de la manera de hacer algo, no de cuántas veces seguidas pasó.",
      },
    ],
    tips: [
      "in a row = seguidos: three days in a row, fourth time in a row.",
      "in a row cuenta repeticiones consecutivas, no duración.",
    ],
  },
  {
    id: "inf-t2-q07",
    topic: "lesson-16",
    prompt: "En “You can keep on living here with us for the time being.”, ¿qué significa for the time being?",
    options: [
      {
        id: "A",
        text: "a tiempo, puntualmente",
        correct: false,
        explanation:
          "A tiempo, puntualmente es on time en inglés, como en I'd appreciate it if you tried to come to class on time. Tienta porque las dos expresiones llevan time. Pero for the time being no habla de puntualidad sino de duración provisoria.",
      },
      {
        id: "B",
        text: "todo el tiempo, siempre",
        correct: false,
        explanation:
          "Todo el tiempo, siempre es all the time o always en inglés. Tienta porque keep on living (seguir viviendo) sugiere continuidad. Pero la expresión dice lo contrario: es algo provisorio, hasta que la situación cambie.",
      },
      {
        id: "C",
        text: "al mismo tiempo",
        correct: false,
        explanation:
          "Al mismo tiempo es at the same time en inglés: dos cosas que ocurren a la vez. Tienta porque también es una expresión con time. Pero en la frase no hay dos acciones simultáneas.",
      },
      {
        id: "D",
        text: "por ahora, por el momento",
        correct: true,
        explanation:
          "Correcta. For the time being = por ahora, por el momento (por enquanto). En el libro: You can keep on living here for the time being, until you find a place for yourself: puedes seguir viviendo aquí por ahora, hasta que encuentres un lugar.",
      },
    ],
    tips: [
      "for the time being = por enquanto: provisorio, hasta que algo cambie.",
      "No confundir con on time (puntual) ni con at the same time (a la vez).",
    ],
  },
  {
    id: "inf-t2-q08",
    topic: "lesson-16",
    prompt:
      "Completa: “I think my daughter ____ the recipe ____.” (Traducción del libro: “Eu acho que minha filha jogou a receita fora.”)",
    options: [
      {
        id: "A",
        text: "threw … away",
        correct: true,
        explanation:
          "Correcta. To throw away = jogar fora, tirar a la basura; throw es irregular (throw / threw / thrown). Va separado alrededor del objeto: threw the recipe away. El libro lo usa también en Could you throw these old magazines away for me?",
      },
      {
        id: "B",
        text: "put … out",
        correct: false,
        explanation:
          "Put out = sacar afuera, como en put the garbage out (colocar o lixo pra fora): llevar la basura a la calle para que la recojan. Tienta porque la traducción dice fora. Pero se pone afuera la bolsa de basura; deshacerse de un papel, como la receta, es throw away.",
      },
      {
        id: "C",
        text: "throwed … away",
        correct: false,
        explanation:
          "Throwed sería un pasado regular, formado con -ed. Tienta porque es la regla general del pasado y el phrasal verb (throw away) está bien elegido. Pero throw es irregular: throw / threw / thrown, así que throwed no existe.",
      },
      {
        id: "D",
        text: "thrown … away",
        correct: false,
        explanation:
          "Thrown es el participio de throw, el que va con have o con la voz pasiva (She has thrown it away, It was thrown away). Tienta porque es una forma irregular real del verbo correcto. Pero sin auxiliar delante no funciona como pasado simple.",
      },
    ],
    tips: [
      "throw away = jogar fora: tirar algo a la basura.",
      "throw / threw / thrown: el pasado es threw.",
    ],
  },
  {
    id: "inf-t2-q09",
    topic: "lesson-16",
    prompt: "Completa: “That TV is too loud and I can't get to sleep. Would you mind turning it ____?”",
    options: [
      {
        id: "A",
        text: "up",
        correct: false,
        explanation:
          "Turn up = subir el volumen o la intensidad. Tienta porque es la pareja directa de turn down y se confunde la dirección. Pero si el televisor está demasiado alto, subirlo empeora el problema.",
      },
      {
        id: "B",
        text: "down",
        correct: true,
        explanation:
          "Correcta. Turn down = bajar el volumen (turn down the volume, de la lista del Exercise 2). Es el pedido C de la Activity 1: That TV is too loud and I can't get to sleep. Would you mind turning it down?",
      },
      {
        id: "C",
        text: "out",
        correct: false,
        explanation:
          "Turn out significa sobre todo resultar, salir de cierta manera (It turned out to be easy). Tienta porque out aparece en otros phrasal verbs de la lección, como put the garbage out. Pero no tiene que ver con el volumen.",
      },
      {
        id: "D",
        text: "away",
        correct: false,
        explanation:
          "Turn away = darse vuelta, apartar la mirada, o no dejar entrar a alguien. Tienta porque away aparece en put away y throw away, del mismo tema. Pero no sirve para un aparato ni para el volumen.",
      },
    ],
    tips: [
      "turn down = bajar el volumen · turn up = subirlo · turn off = apagar.",
      "Would you mind + -ing: Would you mind turning it down?",
    ],
  },
  {
    id: "inf-t2-q10",
    topic: "lesson-16",
    prompt:
      "En el Exercise 2 de la Lesson 16 se combina un verbo de List 1 (chop up, turn down, put out, warm up) con un sustantivo de List 2. ¿Qué verbo va con the garbage?",
    options: [
      {
        id: "A",
        text: "chop up",
        correct: false,
        explanation:
          "Chop up = picar, cortar en trozos pequeños. En la lista va con the tomatoes (chop up the tomatoes). Tienta porque también es algo que se hace en la cocina, donde está la basura. Pero la basura no se pica.",
      },
      {
        id: "B",
        text: "warm up",
        correct: false,
        explanation:
          "Warm up = calentar algo que estaba frío. En la lista va con the milk (warm up the milk). Tienta porque es otro phrasal verb doméstico de la misma lista. Pero no tiene sentido con la basura.",
      },
      {
        id: "C",
        text: "put out",
        correct: true,
        explanation:
          "Correcta. Put out the garbage = colocar o lixo pra fora, sacar la basura. El libro da también la otra forma: take out the garbage (levar o lixo pra fora). En la Lesson 17 aparece de nuevo: my daughter keeps forgetting to put the garbage out.",
      },
      {
        id: "D",
        text: "turn down",
        correct: false,
        explanation:
          "Turn down = bajar el volumen. En la lista va con the volume (turn down the volume). Tienta porque es un pedido típico del libro (Would you mind turning it down?). Pero la basura no tiene volumen que bajar.",
      },
    ],
    tips: [
      "chop up the tomatoes · turn down the volume · put out the garbage · warm up the milk.",
      "Sacar la basura: put out o take out the garbage.",
    ],
  },
  {
    id: "inf-t2-q11",
    topic: "lesson-16",
    prompt: "“Can I keep this jacket?” — “No way. I paid a lot for it.” ¿Qué significa keep en la pregunta?",
    options: [
      {
        id: "A",
        text: "seguir, continuar",
        correct: false,
        explanation:
          "Seguir, continuar es el sentido de keep cuando va seguido de -ing o de on + -ing: She kept on interrupting me, Keep smiling. Tienta porque es el uso de keep que más practica la unidad. Pero aquí keep va seguido de un objeto (this jacket), no de un verbo.",
      },
      {
        id: "B",
        text: "cumplir, mantener la palabra",
        correct: false,
        explanation:
          "Cumplir es el sentido de keep en keep a promise (cumplir una promesa). Tienta porque es una colocación de la Lesson 15. Pero solo funciona con promise; una chaqueta no se cumple.",
      },
      {
        id: "C",
        text: "llevarla cargada",
        correct: false,
        explanation:
          "Llevar cargado es carry en inglés (Could you please carry this suitcase to the car for me?). Tienta porque una chaqueta se lleva encima. Pero el que responde No way. I paid a lot for it entiende que el otro se la quiere quedar.",
      },
      {
        id: "D",
        text: "quedarse con ella",
        correct: true,
        explanation:
          "Correcta. Keep + objeto = quedarse con algo (ficar com), uno de los sentidos de keep en el Vocabulary Expansion de la Lesson 15 (manter, guardar, ficar, ficar com, continuar). Por eso la respuesta es un rechazo: No way. I paid a lot for it.",
      },
    ],
    tips: [
      "keep + objeto = quedarse con · keep + -ing = seguir · keep a promise = cumplir.",
      "keep / kept / kept.",
    ],
  },
  {
    id: "inf-t2-q12",
    topic: "lesson-16",
    prompt:
      "Te invitan: “I was wondering... Why don't you come with us tonight?”. ¿Qué respuesta del Consolidation Exercise 1 de la Lesson 16 corresponde?",
    options: [
      {
        id: "A",
        text: "I'm afraid I can't. I have a Math test tomorrow.",
        correct: true,
        explanation:
          "Correcta. I'm afraid I can't = me temo que no puedo: rechazo cortés de la lista Refusing a request, seguido de la razón. Responde bien a una invitación para esta noche: mañana hay examen y hay que quedarse estudiando.",
      },
      {
        id: "B",
        text: "Sure. Anything you want. Just ask.",
        correct: false,
        explanation:
          "Sure. Anything you want. Just ask. = claro, lo que quieras, solo pídelo. En el libro responde a Could you do me a favor?, cuando el favor todavía no se dijo. Tienta porque acepta con entusiasmo. Pero Just ask invita a formular un pedido, y la invitación ya está formulada.",
      },
      {
        id: "C",
        text: "No way. I paid a lot for it.",
        correct: false,
        explanation:
          "No way. I paid a lot for it. = de ninguna manera, pagué mucho por ella: rechaza que otro se quede con algo. En el libro responde a Can I keep this jacket? Tienta porque también es un rechazo. Pero la razón (pagué mucho) no tiene sentido ante una invitación.",
      },
      {
        id: "D",
        text: "Don't worry teacher. I promise this will never happen again.",
        correct: false,
        explanation:
          "Es una disculpa con promesa: no se preocupe, profesor, prometo que no se repetirá (promise + will). En el libro responde a I'd really appreciate it if you didn't come late next class. Tienta porque es una respuesta educada. Pero nadie se queja aquí: es una invitación.",
      },
    ],
    tips: [
      "Para rechazar con cortesía: I'm afraid I can't + la razón.",
      "Why don't you…? es una invitación o sugerencia, no una queja.",
    ],
  },
  {
    id: "inf-t2-q13",
    topic: "lesson-16",
    prompt: "Completa: “Would you mind if I ____ the window?”",
    options: [
      {
        id: "A",
        text: "closing",
        correct: false,
        explanation:
          "Closing es la forma -ing, la que va directamente tras mind: Would you mind closing the window for me? (¿te importaría cerrarla tú?). Tienta porque es la estructura de would you mind más practicada. Pero con if I hace falta un verbo conjugado; if I closing es agramatical.",
      },
      {
        id: "B",
        text: "closed",
        correct: true,
        explanation:
          "Correcta. Would you mind if I + pasado = ¿te importa si yo…? El libro lo da así: would you mind if I closed (or close) the window? Aquí quien va a cerrar es el que habla, y el pasado closed suena más cortés; el libro acepta también close.",
      },
      {
        id: "C",
        text: "to close",
        correct: false,
        explanation:
          "To close es el infinitivo, que va tras verbos como want o promise. Tienta porque es la forma de diccionario. Pero tras if + sujeto va un verbo conjugado, no un infinitivo.",
      },
      {
        id: "D",
        text: "would close",
        correct: false,
        explanation:
          "Would close es un condicional (cerraría). Tienta porque la pregunta ya empieza con would y parece que hay que repetirlo. Pero el would va en would you mind; después de if el libro pone el pasado (closed) o el presente (close).",
      },
    ],
    tips: [
      "Would you mind closing…? = ¿lo haces tú? · Would you mind if I closed…? = ¿lo hago yo?",
      "Después de if: pasado (closed) o presente (close), nunca would.",
    ],
  },
  {
    id: "inf-t2-q14",
    topic: "lesson-16",
    prompt: "A: “I was wondering if you could lend me fifty bucks?” B: “____ You never pay me back.”",
    options: [
      {
        id: "A",
        text: "Sure! No problem!",
        correct: false,
        explanation:
          "Sure! No problem! = ¡claro! ¡sin problema!: acepta un pedido. Tienta porque es la respuesta más común del libro a un pedido. Pero la frase siguiente, You never pay me back (nunca me devuelves la plata), es una razón para negarse, no para aceptar.",
      },
      {
        id: "B",
        text: "I really appreciate it!",
        correct: false,
        explanation:
          "I really appreciate it! = ¡te lo agradezco mucho!: la dice quien recibe un favor. Tienta porque es una key phrase del mismo recuadro. Pero aquí el que pide es A; B no tiene nada que agradecer.",
      },
      {
        id: "C",
        text: "What? You must be kidding! No way!",
        correct: true,
        explanation:
          "Correcta. You must be kidding! = ¡debes estar bromeando! y No way! = ¡de ninguna manera!: un rechazo fuerte, de la lista Refusing a request. Se justifica con lo que sigue: You never pay me back. Es el diálogo a del Exercise 3 de la Lesson 16.",
      },
      {
        id: "D",
        text: "I promise.",
        correct: false,
        explanation:
          "I promise = lo prometo: compromete a quien habla (I'm sorry. I promise I won't do it anymore). Tienta porque también está en el recuadro del ejercicio. Pero B no está prometiendo nada: está respondiendo a un pedido de dinero.",
      },
    ],
    tips: [
      "La frase que sigue a la respuesta dice si se aceptó o se rechazó.",
      "Rechazos fuertes: No way! / You must be kidding!",
    ],
  },
  {
    id: "inf-t2-q15",
    topic: "lesson-16",
    prompt: "Completa: “____ carry this suitcase to my bedroom for me?”",
    options: [
      {
        id: "A",
        text: "I was wondering if",
        correct: false,
        explanation:
          "I was wondering if… = será que…: introduce un pedido, pero necesita sujeto y modal después (I was wondering if you could…). Tienta porque es la fórmula estrella de la lección. Pero aquí sigue directamente carry, y I was wondering if carry queda sin sujeto.",
      },
      {
        id: "B",
        text: "Would you mind",
        correct: false,
        explanation:
          "Would you mind…? = ¿te importaría…?: también pide, pero exige -ing (Would you mind carrying…?). Tienta porque es igual de cortés. Pero carry está en forma base, y would you mind carry es agramatical.",
      },
      {
        id: "C",
        text: "I really appreciate it",
        correct: false,
        explanation:
          "I really appreciate it = te lo agradezco mucho: agradece un favor ya hecho. Tienta porque está en el mismo recuadro del Exercise 3. Pero no introduce un pedido ni puede ir seguido de un verbo.",
      },
      {
        id: "D",
        text: "Could you please",
        correct: true,
        explanation:
          "Correcta. Could you please + forma base es el pedido cortés más usual del libro (can / could are more usual). Could you please carry this suitcase to my bedroom for me? — Sure! No problem!",
      },
    ],
    tips: [
      "Could you (please) + forma base · Would you mind + -ing · I was wondering if + you could.",
      "Fíjate en la forma del verbo que sigue: decide qué fórmula encaja.",
    ],
  },
];
