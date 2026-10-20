import type { ExamQuestionWithTopic } from "../../types";

/**
 * Tema 1: Unit 8, Lesson 15 — Favors and Requests.
 *
 * Cubre el Vocabulary Expansion (favor, request, promise, garbage, baggage,
 * suitcase, briefcase, backpack, groceries y los verbos promise, keep, pass,
 * carry, pack), los dos Helping You de la lección y los Consolidation Exercises.
 * Las frases son las del libro; cuando el libro trae traducción al portugués, el
 * enunciado la cita para que la respuesta no dependa de adivinar la intención.
 */
export const TEMA_LESSON_15: ExamQuestionWithTopic[] = [
  {
    id: "inf-t1-q01",
    topic: "lesson-15",
    prompt: "Completa: “Can you ____ me a favor?”",
    options: [
      {
        id: "A",
        text: "do",
        correct: true,
        explanation:
          "Correcta. You do (somebody) a favor = hacerle un favor a alguien. “Can you do me a favor?” es la forma estándar de pedir un favor: quien lo hace es el otro, y el verbo que se combina con favor es do.",
      },
      {
        id: "B",
        text: "make",
        correct: false,
        explanation:
          "Make significa fabricar, producir o crear algo, y forma colocaciones como make a request, make a promise o make a complaint. Tienta porque en español decimos “hacer un favor” y make también se traduce como hacer. Pero favor no va con make: en inglés el favor se hace con do.",
      },
      {
        id: "C",
        text: "ask",
        correct: false,
        explanation:
          "Ask significa preguntar o pedir; con favor forma ask (somebody) (for) a favor = pedirle un favor a alguien (“Can I ask you a favor?”). Tienta porque también va con favor. Pero aquí el sujeto es you y el favor me lo hace a mí: “Can you ask me a favor?” significaría “¿puedes pedirme un favor?”, al revés de lo que se quiere decir.",
      },
      {
        id: "D",
        text: "give",
        correct: false,
        explanation:
          "Give significa dar, y forma give (somebody) an excuse = darle una excusa a alguien. Tienta porque “dar un favor” suena posible si se traduce palabra por palabra. Pero favor no se combina con give: la colocación fija es do a favor.",
      },
    ],
    tips: [
      "Pedir el favor: ask (somebody) for a favor. Hacerlo: do (somebody) a favor.",
      "En español decimos “hacer un favor”; en inglés ese hacer es do.",
    ],
  },
  {
    id: "inf-t1-q02",
    topic: "lesson-15",
    prompt:
      "También se puede usar will / would para pedir un favor (“Will you do me a favor?”), pero hay otro par de verbos más usual. ¿Cuál?",
    options: [
      {
        id: "A",
        text: "must / should",
        correct: false,
        explanation:
          "Must expresa una obligación fuerte y should da un consejo (“You should apologize to the teacher for arriving late”). Tientan porque son modales, como could y would. Pero ninguno de los dos pide: uno ordena y el otro aconseja, así que usarlos para un favor suena a imposición.",
      },
      {
        id: "B",
        text: "can / could",
        correct: true,
        explanation:
          "Correcta. Will / would también sirven para pedir un favor o hacer un pedido, pero can / could son más usuales. Por eso la mayoría de los pedidos empiezan con Can you… o Could you please…: “Can you pass me the groceries…?”, “Could you please carry this suitcase to the car for me?”.",
      },
      {
        id: "C",
        text: "may / might",
        correct: false,
        explanation:
          "May y might expresan posibilidad (It might rain), y may también sirve para pedir permiso de forma muy formal (May I come in?). Tientan porque may aparece en pedidos de permiso. Pero con ellos uno pide permiso para hacer algo uno mismo, no que el otro haga un favor, y no son la forma usual de pedir un favor.",
      },
      {
        id: "D",
        text: "have to / need to",
        correct: false,
        explanation:
          "Have to y need to expresan obligación o necesidad (I need to ask you something). Tientan porque necesitar algo de otra persona parece cercano a pedirlo. Pero describen la necesidad, no formulan el pedido: “You have to carry this suitcase” es una orden, no un favor.",
      },
    ],
    tips: [
      "Para pedir: Can you…? / Could you (please)…? son lo más usual; Will you…? / Would you…? también valen.",
      "Should aconseja y must obliga: ninguno de los dos sirve para pedir un favor.",
    ],
  },
  {
    id: "inf-t1-q03",
    topic: "lesson-15",
    prompt: "Hay tres verbos que se combinan con promise. ¿Cuál significa cumplir una promesa?",
    options: [
      {
        id: "A",
        text: "make a promise",
        correct: false,
        explanation:
          "Make a promise = hacer una promesa, prometer. Tienta porque es la colocación más conocida y porque en español también “hacemos” promesas. Pero describe el momento de prometer, no el de cumplir: alguien puede make a promise y después no cumplirla.",
      },
      {
        id: "B",
        text: "break a promise",
        correct: false,
        explanation:
          "Break a promise = romper una promesa, no cumplirla. Tienta porque forma la misma serie (make / keep / break a promise) y es fácil confundir la dirección. Pero significa justo lo contrario de lo que se pregunta.",
      },
      {
        id: "C",
        text: "keep a promise",
        correct: true,
        explanation:
          "Correcta. Keep a promise = cumplir (mantener) una promesa. Keep (keep / kept / kept = manter, guardar, ficar, ficar com, continuar) tiene muchos sentidos, y con promise toma el sentido de mantener lo prometido.",
      },
      {
        id: "D",
        text: "do a promise",
        correct: false,
        explanation:
          "Do significa hacer y forma colocaciones fijas como do (somebody) a favor (“Can you do me a favor?”). Tienta porque favor y promise suelen estudiarse juntos. Pero do no se combina con promise: do a promise no existe en inglés.",
      },
    ],
    tips: [
      "make a promise = prometer · keep a promise = cumplirla · break a promise = romperla.",
      "Keep, además de guardar, significa mantener: mantener la palabra es keep a promise.",
    ],
  },
  {
    id: "inf-t1-q04",
    topic: "lesson-15",
    prompt: "Completa con la forma que significa lo mismo que agree to: “You agree to a request, or you ____ a request.”",
    options: [
      {
        id: "A",
        text: "refuse",
        correct: false,
        explanation:
          "Refuse a request = rechazar un pedido; para eso hay toda una lista de frases (I'm afraid I can't, I'd rather not…). Tienta porque forma parte de la misma serie de colocaciones con request. Pero agree to es aceptar, y refuse es lo opuesto.",
      },
      {
        id: "B",
        text: "make",
        correct: false,
        explanation:
          "Make a request = hacer un pedido. Tienta porque es la colocación más común con request. Pero la hace quien pide, y agree to describe lo que hace quien recibe el pedido.",
      },
      {
        id: "C",
        text: "ask",
        correct: false,
        explanation:
          "Ask significa pedir o preguntar, y se combina con favor: ask (somebody) (for) a favor. Tienta porque request y pedir suenan a ask. Pero ask a request no es una colocación del inglés, y además describiría a quien pide, no a quien acepta.",
      },
      {
        id: "D",
        text: "accept",
        correct: true,
        explanation:
          "Correcta. Las dos formas son equivalentes: you agree to a request or you accept a request = aceptar un pedido. La opuesta es you refuse a request.",
      },
    ],
    tips: [
      "make a request (pedir) · agree to / accept a request (aceptar) · refuse a request (rechazar).",
      "Agree lleva to antes de request; accept va directo, sin preposición.",
    ],
  },
  {
    id: "inf-t1-q05",
    topic: "lesson-15",
    prompt: "¿Qué otra expresión significa lo mismo que garbage man?",
    options: [
      {
        id: "A",
        text: "garbage collector",
        correct: true,
        explanation:
          "Correcta. Garbage man y garbage collector son la misma persona: el recolector de basura.",
      },
      {
        id: "B",
        text: "garbage can",
        correct: false,
        explanation:
          "Garbage can es el bote o tacho de basura, el recipiente donde se tira (lixeira). Tienta porque se estudia junto a garbage man: garbage can / garbage man. Pero es un objeto, no una persona.",
      },
      {
        id: "C",
        text: "garbage bag",
        correct: false,
        explanation:
          "Garbage bag es la bolsa de basura; bag se combina así con otras palabras: grocery bag, plastic bag, paper bag, tea bag, shopping bag. Tienta por el mismo patrón garbage + sustantivo. Pero es una bolsa, no el trabajador que recoge la basura.",
      },
      {
        id: "D",
        text: "grocery store",
        correct: false,
        explanation:
          "Grocery store es el supermercado o almacén (mercado, supermercado). Tienta porque es vocabulario del mismo tema y se parece en la forma: palabra + sustantivo. Pero no tiene nada que ver con la basura.",
      },
    ],
    tips: [
      "garbage = basura · garbage can = el bote · garbage man / garbage collector = el recolector.",
      "garbage can es un objeto; garbage man y garbage collector son la persona.",
    ],
  },
  {
    id: "inf-t1-q06",
    topic: "lesson-15",
    prompt: "Completa: “A: How many ____ do you have? B: Only these two.”",
    options: [
      {
        id: "A",
        text: "baggages",
        correct: false,
        explanation:
          "Baggages sería el plural regular de baggage con -s. Tienta porque así se pluraliza la mayoría de los sustantivos (bag → bags). Pero baggage es incontable en inglés, como equipaje en el sentido de conjunto: nunca lleva -s.",
      },
      {
        id: "B",
        text: "pieces of baggage",
        correct: true,
        explanation:
          "Correcta. Baggage es incontable, así que para contarlo se usa piece: one piece of baggage / two pieces of baggage. Por eso: How many pieces of baggage do you have? — Only these two.",
      },
      {
        id: "C",
        text: "baggage",
        correct: false,
        explanation:
          "Baggage sola es el sustantivo incontable equipaje (bagagem). Tienta porque es la palabra correcta del tema. Pero how many pide algo contable; con un incontable solo cabe how much baggage, y la respuesta Only these two exige unidades que se puedan contar.",
      },
      {
        id: "D",
        text: "bags of baggage",
        correct: false,
        explanation:
          "Bag es bolsa, sacola o mala, y bags of sirve para contar contenido: two bags of groceries. Tienta porque parece la unidad lógica para contar equipaje. Pero la unidad para contar baggage es piece; bags of baggage es redundante y no se usa.",
      },
    ],
    tips: [
      "Baggage es incontable: one piece of baggage, two pieces of baggage.",
      "How many va con contables; con un incontable se pregunta how much.",
      "Otras combinaciones: checked baggage, excess baggage.",
    ],
  },
  {
    id: "inf-t1-q07",
    topic: "lesson-15",
    prompt:
      "Completa: “Every time she goes to the gym she carries that ____ with her.” (En portugués: “…ela carrega aquela mochila com ela.”)",
    options: [
      {
        id: "A",
        text: "suitcase",
        correct: false,
        explanation:
          "Suitcase es la maleta de viaje (mala de viagem), la que se arma con pack your bags. Tienta porque también se carga (carry) y es del mismo vocabulario. Pero la traducción dice mochila, y nadie lleva una maleta de viaje al gimnasio.",
      },
      {
        id: "B",
        text: "briefcase",
        correct: false,
        explanation:
          "Briefcase es el maletín de ejecutivo (maleta de executivo/a), el portafolios rígido para documentos. Tienta porque comparte -case con suitcase y es otro bolso del vocabulario. Pero no es una mochila.",
      },
      {
        id: "C",
        text: "backpack",
        correct: true,
        explanation:
          "Correcta. Backpack = mochila. Es la bolsa que se lleva a la espalda, como en la frase del gimnasio: she carries that backpack with her.",
      },
      {
        id: "D",
        text: "grocery bag",
        correct: false,
        explanation:
          "Grocery bag es la bolsa de las compras del supermercado (Could you please help me carry those grocery bags?). Tienta porque también se lleva encima y es vocabulario del mismo tema. Pero es la bolsa del súper, no una mochila.",
      },
    ],
    tips: [
      "suitcase = mala de viagem · briefcase = maletín · backpack = mochila.",
      "Carry = llevar cargado; carry something with you = llevarlo encima.",
    ],
  },
  {
    id: "inf-t1-q08",
    topic: "lesson-15",
    prompt: "Completa: “Can you pass me the ____ in those bags over there?”",
    options: [
      {
        id: "A",
        text: "groceries",
        correct: true,
        explanation:
          "Correcta. Groceries = compras del supermercado, mantimentos. Por ejemplo: Can you pass me the groceries in those bags over there? — Sure! No problem!",
      },
      {
        id: "B",
        text: "grocery store",
        correct: false,
        explanation:
          "Grocery store es el supermercado, el lugar donde se compra. Tienta porque comparte la palabra grocery. Pero un lugar no puede estar dentro de unas bolsas ni pasarse de mano en mano.",
      },
      {
        id: "C",
        text: "garbage",
        correct: false,
        explanation:
          "Garbage es basura (lixo), lo que se saca con take out / put out the garbage. Tienta porque la basura también se guarda en bolsas. Pero nadie pide que le pasen la basura; lo que hay en las bolsas son las compras.",
      },
      {
        id: "D",
        text: "baggage",
        correct: false,
        explanation:
          "Baggage es el equipaje de viaje (bagagem), un sustantivo incontable. Tienta porque suena parecido a bags. Pero el equipaje no va dentro de unas bolsas: las maletas y bolsas son el equipaje.",
      },
    ],
    tips: [
      "grocery store = el lugar · groceries = lo que compras ahí.",
      "Pass me… = pásame…: to pass / passed / passed.",
    ],
  },
  {
    id: "inf-t1-q09",
    topic: "lesson-15",
    prompt: "Completa: “She ____ on interrupting me while I was speaking.”",
    options: [
      {
        id: "A",
        text: "keeped",
        correct: false,
        explanation:
          "Keeped sería un pasado regular, formado con -ed. Tienta porque esa es la regla general del pasado. Pero keep es irregular: keep / kept / kept.",
      },
      {
        id: "B",
        text: "kept",
        correct: true,
        explanation:
          "Correcta. Keep on + -ing = keep + -ing = seguir haciendo algo (continuar, ficar). El pasado de keep es kept, y while I was speaking pide pasado. Por eso: She kept on interrupting me while I was speaking.",
      },
      {
        id: "C",
        text: "keep",
        correct: false,
        explanation:
          "Keep es la forma base, la que aparece en presente, como en Don't keep interrupting me while I'm speaking. Tienta porque es el mismo verbo. Pero con she en presente sería keeps, y esta frase está en pasado (was speaking).",
      },
      {
        id: "D",
        text: "was keep",
        correct: false,
        explanation:
          "Was + forma base no es ningún tiempo verbal del inglés: was solo va con -ing (was keeping, pasado continuo) o con participio (was kept, voz pasiva). Tienta porque imita el was speaking del final de la frase. Pero combinado así es agramatical.",
      },
    ],
    tips: [
      "keep / kept / kept: es irregular.",
      "keep on + -ing = keep + -ing = seguir haciendo algo.",
    ],
  },
  {
    id: "inf-t1-q10",
    topic: "lesson-15",
    prompt: "Completa: “She promised she ____ tell him the truth.”",
    options: [
      {
        id: "A",
        text: "will",
        correct: false,
        explanation:
          "Will es el futuro que acompaña a promise en presente: I promise I won't tell anyone what happened. Tienta porque es la estructura más conocida para prometer. Pero aquí el verbo es promised, en pasado, y promised va con would.",
      },
      {
        id: "B",
        text: "is going",
        correct: false,
        explanation:
          "Be going to es el futuro de los planes ya decididos, y necesita el to (is going to tell). Tienta por ser otra forma de futuro. Pero tras promised no corresponde, y además is going tell, sin to, es agramatical.",
      },
      {
        id: "C",
        text: "would",
        correct: true,
        explanation:
          "Correcta. Funciona en pares: you say (I) promise… will, y (I) promised… would. Como promised está en pasado, el futuro se desplaza a would: She promised she would tell him the truth.",
      },
      {
        id: "D",
        text: "to",
        correct: false,
        explanation:
          "To + verbo es la otra estructura posible con promise: She promised to tell him the truth. Tienta porque es correcta con promise. Pero esa forma no lleva sujeto en medio; con she entre promised y tell hace falta would.",
      },
    ],
    tips: [
      "promise… will (presente) · promised… would (pasado).",
      "Promised está en pasado y arrastra el futuro: will pasa a would.",
    ],
  },
  {
    id: "inf-t1-q11",
    topic: "lesson-15",
    prompt: "Completa: “I promise ____ anyone what happened.”",
    options: [
      {
        id: "A",
        text: "to not telling",
        correct: false,
        explanation:
          "To + -ing mezcla dos formas distintas: el infinitivo (to tell) y el gerundio (telling). Tienta porque parece una negación de to tell. Pero tras to va la forma base, y la negación va antes del to: promise (not) to do something.",
      },
      {
        id: "B",
        text: "don't tell",
        correct: false,
        explanation:
          "Don't tell es un imperativo negativo, una orden: ¡no le digas a nadie! Tienta porque tiene la negación y el verbo correctos. Pero promise no va seguido de una orden; va seguido de to + verbo o de una oración con will (I promise I won't tell…).",
      },
      {
        id: "C",
        text: "not telling",
        correct: false,
        explanation:
          "Not + -ing es el gerundio negativo, que va tras verbos como mind (Would you mind not checking your phone in the classroom?). Tienta porque es una negación muy usada en pedidos. Pero promise pide infinitivo, no gerundio.",
      },
      {
        id: "D",
        text: "not to tell",
        correct: true,
        explanation:
          "Correcta. You say (I) promise (not) to do something — I promise not to tell anyone what happened. La negación not va delante del to.",
      },
    ],
    tips: [
      "promise (not) to + verbo: la negación va antes de to.",
      "Equivalente con will: I promise I won't tell anyone what happened.",
    ],
  },
  {
    id: "inf-t1-q12",
    topic: "lesson-15",
    prompt:
      "Completa: “____ you could lend me your beach house this weekend?” (En portugués: “Será que você poderia me emprestar sua casa de praia este fim de semana?”)",
    options: [
      {
        id: "A",
        text: "I was wondering if",
        correct: true,
        explanation:
          "Correcta. I was wondering if… = será que…, eu estava pensando se… Es una fórmula muy usada para pedir favores, y va seguida de you could: I was wondering if you could… (= I wonder if you could…).",
      },
      {
        id: "B",
        text: "I'd appreciate it if",
        correct: false,
        explanation:
          "I'd appreciate it if… = yo agradecería si… (eu agradeceria se). Sirve para pedir algo de forma cortés: I'd appreciate it if you could go there for me. Tienta porque también puede ir seguido de you could. Pero la traducción dice será que, y con agradecería la frase deja de ser una pregunta.",
      },
      {
        id: "C",
        text: "Would you mind",
        correct: false,
        explanation:
          "Would you mind…? = ¿te importaría…? (você se importaria). Va seguido de -ing (Would you mind lending me…?) o de if + pasado (if I closed the window). Tienta porque es otra forma cortés de pedir. Pero nunca va seguido de you could.",
      },
      {
        id: "D",
        text: "Could you please",
        correct: false,
        explanation:
          "Could you please…? es el pedido directo y cortés: Could you please carry this suitcase to the car for me? Tienta porque es la forma más usual de pedir. Pero ya incluye could; delante de you could repetiría el verbo (Could you please you could…).",
      },
    ],
    tips: [
      "I was wondering if / I wonder if + you could… = será que…",
      "Será que… = I was wondering if…; agradeceria se… = I'd appreciate it if…",
    ],
  },
  {
    id: "inf-t1-q13",
    topic: "lesson-15",
    prompt: "Completa: “Would you mind ____ me your motorcycle for a while?”",
    options: [
      {
        id: "A",
        text: "to lend",
        correct: false,
        explanation:
          "To lend es el infinitivo, que va tras verbos como want o promise (I promise not to tell…). Tienta porque es la forma de diccionario del verbo. Pero mind exige -ing después.",
      },
      {
        id: "B",
        text: "lending",
        correct: true,
        explanation:
          "Correcta. Would you mind + -ing = ¿te importaría…? (você se importaria). Es la estructura de Would you mind closing the window for me? y de Would you mind lending me your motorcycle for a while?",
      },
      {
        id: "C",
        text: "lend",
        correct: false,
        explanation:
          "Lend es la forma base, la que va tras modales como could (Could you lend me…?). Tienta porque los pedidos con could la usan. Pero mind no es un modal y no admite la forma base.",
      },
      {
        id: "D",
        text: "lent",
        correct: false,
        explanation:
          "Lent es el pasado de lend, y el pasado solo aparece en la otra estructura: would you mind if I + pasado (Would you mind if I closed the window?). Tienta por eso. Pero aquí no hay if ni sujeto: tras mind va directamente -ing.",
      },
    ],
    tips: [
      "would you mind + -ing: Would you mind closing the window?",
      "mind no es un modal: no admite la forma base detrás.",
    ],
  },
  {
    id: "inf-t1-q14",
    topic: "lesson-15",
    prompt:
      "Completa: “I'll try my best to be there before eight but ____.” (En portugués: “…mas não prometo nada.”)",
    options: [
      {
        id: "A",
        text: "I promise I will",
        correct: false,
        explanation:
          "I promise I will… es prometer algo (promise + will). Tienta porque contiene la palabra promise. Pero dice lo contrario: quien habla no garantiza llegar, y la traducción es não prometo nada.",
      },
      {
        id: "B",
        text: "I'd rather not",
        correct: false,
        explanation:
          "I'd rather not = preferiría que no (eu preferia que não), una forma suave de rechazar un pedido. Tienta porque también expresa reserva. Pero quien habla no rechaza nada: va a intentarlo, solo no asegura el resultado.",
      },
      {
        id: "C",
        text: "I can't promise anything",
        correct: true,
        explanation:
          "Correcta. I can't promise anything = no puedo prometer nada (eu não posso prometer nada, eu não prometo nada). Encaja con el but: lo voy a intentar, pero no lo garantizo.",
      },
      {
        id: "D",
        text: "I really appreciate it",
        correct: false,
        explanation:
          "I really appreciate it = te lo agradezco mucho (eu agradeço). Sirve para agradecer un favor que te hicieron. Tienta porque es otra frase hecha muy usada en pedidos. Pero aquí nadie está agradeciendo nada.",
      },
    ],
    tips: [
      "I can't promise anything: lo intento, pero no lo garantizo.",
      "I'd rather not rechaza; I can't promise anything acepta intentarlo.",
    ],
  },
  {
    id: "inf-t1-q15",
    topic: "lesson-15",
    prompt:
      "Completa: “When you ____ your baggage, could you please not forget to take sunscreen?” (En portugués: “Quando você for arrumar sua bagagem…”)",
    options: [
      {
        id: "A",
        text: "carry",
        correct: false,
        explanation:
          "Carry = carregar, llevar algo cargado de un lugar a otro (Could you please carry this suitcase to the car for me?). Tienta porque el equipaje se carga. Pero el protector solar se mete al armar el equipaje, antes de cargarlo.",
      },
      {
        id: "B",
        text: "keep",
        correct: false,
        explanation:
          "Keep = mantener, guardar, quedarse con algo. Tienta porque “guardar algo en la maleta” suena a keep. Pero keep your baggage sería conservar el equipaje o quedárselo, no prepararlo.",
      },
      {
        id: "C",
        text: "pass",
        correct: false,
        explanation:
          "Pass = pasar algo de mano en mano (Could you please pass me that red sweater in the first drawer?). Tienta por ser otro verbo que se usa con objetos y equipaje. Pero nadie pasa su equipaje para acordarse del protector solar.",
      },
      {
        id: "D",
        text: "pack",
        correct: true,
        explanation:
          "Correcta. Pack = empacotar, embalar, fazer as malas. Se usa en pack your bags / baggage / suitcase (hacer las maletas) y pack something in a suitcase / bag.",
      },
    ],
    tips: [
      "pack your bags = hacer las maletas; pack something in a suitcase = meterlo en la maleta.",
      "carry = cargar · pass = pasar · keep = guardar, quedarse con · pack = empacar.",
    ],
  },
];
