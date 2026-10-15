import type { Challenge } from "../types";

/**
 * Colecciones: tokenizar, agrupar, contar y ordenar con desempate.
 *
 * Las trampas son las de siempre con texto real: mayúsculas y puntuación, el
 * texto vacío (que `split(" ")` convierte en una "palabra" vacía) y los empates
 * de frecuencia, cuyo orden queda al azar si no se desempata.
 */
export const challenge: Challenge = {
  slug: "frecuencia-de-palabras",
  title: {
    es: "Frecuencia de palabras",
    en: "Word frequencies",
  },
  difficulty: "basic",
  tags: ["collections", "group-by", "sorting"],
  language: "scala",
  suggestedMinutes: 10,
  statement: {
    es: `Escribe \`wordFrequencies(text: String): List[(String, Int)]\`, que cuenta cuántas veces aparece cada palabra de un texto.

- Una **palabra** es una secuencia de letras (\`Char.isLetter\`). Todo lo demás (espacios, comas, signos) separa palabras.
- Las palabras se cuentan **en minúsculas**: \`Hola\` y \`hola\` son la misma.
- El resultado va ordenado por **cantidad descendente** y, a igual cantidad, **alfabéticamente**.
- Un texto sin palabras devuelve una lista vacía.`,
    en: `Write \`wordFrequencies(text: String): List[(String, Int)]\`, which counts how many times each word appears in a text.

- A **word** is a run of letters (\`Char.isLetter\`). Everything else (spaces, commas, punctuation) separates words.
- Words are counted **in lowercase**: \`Hello\` and \`hello\` are the same word.
- The result is sorted by **count descending** and, for equal counts, **alphabetically**.
- A text with no words returns an empty list.`,
  },
  starterCode: `def wordFrequencies(text: String): List[(String, Int)] = {
  ???
}
`,
  hints: [
    {
      es: "Son tres pasos: sacar las palabras, contarlas y ordenarlas. Resuélvelos por separado.",
      en: "There are three steps: extract the words, count them, sort them. Solve each one separately.",
    },
    {
      es: "`split(\" \")` sobre `\"\"` devuelve `Array(\"\")`, y no separa la coma de `\"hola,\"`. Piensa en reemplazar lo que no es letra por un espacio y descartar los vacíos.",
      en: "`split(\" \")` on `\"\"` returns `Array(\"\")`, and it doesn't separate the comma in `\"hello,\"`. Think about replacing non-letters with a space and dropping empty strings.",
    },
    {
      es: "`sortBy` acepta una tupla: ordenar por `(-cantidad, palabra)` resuelve el orden y el desempate a la vez.",
      en: "`sortBy` accepts a tuple: sorting by `(-count, word)` handles the order and the tie-break at once.",
    },
  ],
  solution: {
    code: `def wordFrequencies(text: String): List[(String, Int)] = {
  val words = text.toLowerCase
    .map(c => if (c.isLetter) c else ' ')
    .split(" ")
    .filter(_.nonEmpty)
    .toList

  words
    .groupBy(identity)
    .map { case (word, occurrences) => (word, occurrences.size) }
    .toList
    .sortBy { case (word, count) => (-count, word) }
}
`,
    explanation: {
      es: `Primero se normaliza: todo a minúsculas y cada carácter que no es letra se convierte en espacio. Así \`"Hola, hola!"\` queda como \`"hola  hola "\`. Al partir por espacios aparecen cadenas vacías, y \`filter(_.nonEmpty)\` las descarta. Eso también resuelve el texto vacío.

Después, \`groupBy(identity)\` junta las apariciones de cada palabra y \`size\` las cuenta. En Scala 2.13+ también existe \`groupMapReduce(identity)(_ => 1)(_ + _)\`, que hace lo mismo en una pasada.

Por último, el orden: un \`Map\` no tiene orden útil, así que hay que ordenar la lista. Ordenar por la tupla \`(-count, word)\` da la cantidad descendente y, en empate, el orden alfabético. Sin el segundo criterio, los empates salen en el orden interno del \`Map\`, que no está garantizado.`,
      en: `First, normalize: lowercase everything and turn every non-letter character into a space. That makes \`"Hello, hello!"\` into \`"hello  hello "\`. Splitting on spaces leaves empty strings, which \`filter(_.nonEmpty)\` drops. That also handles the empty text.

Then \`groupBy(identity)\` gathers each word's occurrences and \`size\` counts them. Scala 2.13+ also has \`groupMapReduce(identity)(_ => 1)(_ + _)\`, which does the same in one pass.

Finally, the order: a \`Map\` has no useful order, so the list must be sorted. Sorting by the tuple \`(-count, word)\` gives count descending and, on ties, alphabetical order. Without the second key, ties come out in the \`Map\`'s internal order, which isn't guaranteed.`,
    },
    pitfalls: [
      {
        es: "**Partir solo por espacios.** `\"Hola,\"` y `\"hola\"` quedan como palabras distintas, y las mayúsculas también separan.",
        en: "**Splitting on spaces only.** `\"Hello,\"` and `\"hello\"` end up as different words, and so do different cases.",
      },
      {
        es: "**El texto vacío.** `\"\".split(\" \")` es `Array(\"\")`: sin filtrar, el resultado trae la \"palabra\" vacía con cantidad 1.",
        en: "**The empty text.** `\"\".split(\" \")` is `Array(\"\")`: without filtering, the result includes the empty \"word\" with count 1.",
      },
      {
        es: "**Empates sin desempatar, o al revés.** Ordenar solo por cantidad deja los empates en el orden del `Map`, que no está garantizado. Y ordenar ascendente para después hacer `reverse` invierte también el desempate.",
        en: "**Ties unbroken, or broken backwards.** Sorting by count alone leaves ties in the `Map`'s order, which isn't guaranteed. And sorting ascending then calling `reverse` flips the tie-break too.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `def wordFrequencies(text: String): List[(String, Int)] =
  text.split(" ").toList
    .groupBy(identity)
    .map { case (w, ws) => (w, ws.size) }
    .toList
    .sortBy { case (w, c) => (-c, w) }
`,
      why: {
        es: "Parte solo por espacios: no separa la puntuación, distingue mayúsculas y cuenta la cadena vacía.",
        en: "Splits on spaces only: it keeps punctuation, is case-sensitive and counts the empty string.",
      },
    },
    {
      code: `def wordFrequencies(text: String): List[(String, Int)] =
  text.toLowerCase
    .map(c => if (c.isLetter) c else ' ')
    .split(" ")
    .filter(_.nonEmpty)
    .toList
    .groupBy(identity)
    .map { case (w, ws) => (w, ws.size) }
    .toList
    .sortBy { case (w, c) => (c, w) }
    .reverse
`,
      why: {
        es: "Ordena ascendente y da vuelta la lista: la cantidad queda bien, pero los empates quedan en orden alfabético inverso.",
        en: "Sorts ascending and reverses the list: the counts come out right, but ties end up in reverse alphabetical order.",
      },
    },
  ],
  evaluation: {
    kind: "code-tests",
    entrypoint: "wordFrequencies",
    tests: [
      {
        name: "ejemplo",
        call: `wordFrequencies("red blue red green blue red")`,
        expected: `List(("red", 3), ("blue", 2), ("green", 1))`,
        hidden: false,
      },
      {
        name: "mayusculas-y-puntuacion",
        call: `wordFrequencies("Hello, hello! HELLO world.")`,
        expected: `List(("hello", 3), ("world", 1))`,
        hidden: true,
        trap: {
          es: "Mayúsculas y signos pegados a las palabras: `Hello,` y `hello` son la misma palabra.",
          en: "Uppercase letters and punctuation stuck to words: `Hello,` and `hello` are the same word.",
        },
      },
      {
        name: "texto-vacio",
        call: `wordFrequencies("")`,
        expected: `List()`,
        hidden: true,
        trap: {
          es: "Un texto sin palabras devuelve una lista vacía, no la cadena vacía contada una vez.",
          en: "A text with no words returns an empty list, not the empty string counted once.",
        },
      },
      {
        name: "empates",
        call: `wordFrequencies("b a c b a c d")`,
        expected: `List(("a", 2), ("b", 2), ("c", 2), ("d", 1))`,
        hidden: true,
        trap: {
          es: "Varias palabras con la misma cantidad: se desempatan alfabéticamente.",
          en: "Several words with the same count: ties are broken alphabetically.",
        },
      },
    ],
  },
};
