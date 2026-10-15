import type { Challenge } from "../types";

/**
 * Ventana deslizante: la subcadena más larga sin caracteres repetidos.
 *
 * La trampa fina es la de "abba": al ver la segunda `a`, su aparición anterior
 * ya quedó **fuera** de la ventana, y mover el inicio hacia atrás rompe todo.
 */
export const challenge: Challenge = {
  slug: "subcadena-sin-repetidos",
  title: {
    es: "Subcadena más larga sin repetidos",
    en: "Longest substring without repeats",
  },
  difficulty: "medium",
  tags: ["sliding-window", "hash-map", "strings"],
  language: "scala",
  suggestedMinutes: 20,
  statement: {
    es: `Escribe \`longestUniqueSubstring(s: String): Int\`, que devuelve la **longitud** de la subcadena más larga de \`s\` sin caracteres repetidos.

Una subcadena son caracteres **contiguos**: en \`"pwwkew"\`, \`"wke"\` es una subcadena y \`"pwke"\` no.

\`s\` puede tener **decenas de miles de caracteres**: la solución tiene que ser lineal.`,
    en: `Write \`longestUniqueSubstring(s: String): Int\`, which returns the **length** of the longest substring of \`s\` without repeated characters.

A substring is made of **contiguous** characters: in \`"pwwkew"\`, \`"wke"\` is a substring and \`"pwke"\` isn't.

\`s\` may have **tens of thousands of characters**: the solution must be linear.`,
  },
  starterCode: `def longestUniqueSubstring(s: String): Int = {
  ???
}
`,
  hints: [
    {
      es: "Mantén una ventana `[start, end]` sin repetidos. Al avanzar `end`, ¿cuándo tienes que mover `start`, y hasta dónde?",
      en: "Keep a window `[start, end]` with no repeats. When you advance `end`, when must you move `start`, and how far?",
    },
    {
      es: "Guarda en un mapa la última posición donde viste cada carácter. Si el carácter actual ya está en la ventana, el nuevo inicio es esa posición + 1.",
      en: "Store in a map the last position where you saw each character. If the current character is already inside the window, the new start is that position + 1.",
    },
    {
      es: "Prueba tu idea a mano con `\"abba\"`. Cuando llegas a la última `a`, ¿su aparición anterior sigue dentro de la ventana?",
      en: "Try your idea by hand on `\"abba\"`. When you reach the last `a`, is its previous occurrence still inside the window?",
    },
  ],
  solution: {
    code: `def longestUniqueSubstring(s: String): Int = {
  val lastSeen = scala.collection.mutable.HashMap.empty[Char, Int]
  var start = 0
  var best = 0
  for (end <- s.indices) {
    val c = s(end)
    lastSeen.get(c).foreach { prev => start = math.max(start, prev + 1) }
    lastSeen(c) = end
    best = math.max(best, end - start + 1)
  }
  best
}
`,
    explanation: {
      es: `La ventana \`[start, end]\` nunca tiene repetidos. Cada paso avanza \`end\` un carácter. Si ese carácter ya apareció **dentro** de la ventana, el inicio salta a la posición siguiente a esa aparición.

El \`math.max(start, prev + 1)\` es la clave: la aparición anterior puede haber quedado **antes** del inicio actual. En \`"abba"\`, al llegar a la segunda \`b\` el inicio pasa a 2. Al llegar a la última \`a\`, su aparición anterior es la 0, que ya está fuera de la ventana. Sin el \`max\`, el inicio volvería a 1 y la ventana \`"bba"\` tendría un repetido.

Cada carácter entra y sale de la ventana una sola vez, así que la solución es O(n). Revisar todas las subcadenas es O(n²) o peor, y con decenas de miles de caracteres no termina.`,
      en: `The window \`[start, end]\` never contains repeats. Each step advances \`end\` by one character. If that character already appeared **inside** the window, the start jumps to the position right after that occurrence.

The \`math.max(start, prev + 1)\` is the key: the previous occurrence may lie **before** the current start. In \`"abba"\`, at the second \`b\` the start moves to 2. At the last \`a\`, its previous occurrence is 0, which is already outside the window. Without the \`max\`, the start would go back to 1 and the window \`"bba"\` would contain a repeat.

Each character enters and leaves the window once, so the solution is O(n). Checking every substring is O(n²) or worse, and with tens of thousands of characters it doesn't finish.`,
    },
    pitfalls: [
      {
        es: "**Mover el inicio hacia atrás.** Sin `max`, una aparición que ya quedó fuera de la ventana la agranda de nuevo (`\"abba\"` da 3 en vez de 2).",
        en: "**Moving the start backwards.** Without `max`, an occurrence already outside the window grows it again (`\"abba\"` gives 3 instead of 2).",
      },
      {
        es: "**Contar caracteres distintos.** `s.distinct.length` ignora que la subcadena tiene que ser contigua.",
        en: "**Counting distinct characters.** `s.distinct.length` ignores that the substring must be contiguous.",
      },
      {
        es: "**Probar todas las subcadenas.** Funciona con los ejemplos y se queda sin tiempo con la entrada grande.",
        en: "**Trying every substring.** It works on the examples and runs out of time on the large input.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `def longestUniqueSubstring(s: String): Int = {
  val lastSeen = scala.collection.mutable.HashMap.empty[Char, Int]
  var start = 0
  var best = 0
  for (end <- s.indices) {
    val c = s(end)
    lastSeen.get(c).foreach { prev => start = prev + 1 }
    lastSeen(c) = end
    best = math.max(best, end - start + 1)
  }
  best
}
`,
      why: {
        es: "Mueve el inicio sin `max`: una aparición que ya quedó fuera de la ventana lo hace retroceder.",
        en: "Moves the start without `max`: an occurrence already outside the window pulls it backwards.",
      },
    },
    {
      code: `def longestUniqueSubstring(s: String): Int = s.distinct.length
`,
      why: {
        es: "Cuenta caracteres distintos, sin exigir que sean contiguos.",
        en: "Counts distinct characters, without requiring them to be contiguous.",
      },
    },
    {
      code: `def longestUniqueSubstring(s: String): Int = {
  var best = 0
  for (i <- s.indices) {
    val seen = scala.collection.mutable.HashSet.empty[Char]
    var j = i
    while (j < s.length && !seen.contains(s(j))) {
      seen += s(j)
      j += 1
    }
    best = math.max(best, j - i)
  }
  best
}
`,
      why: {
        es: "Correcta pero recorre desde cada inicio: con una entrada grande no termina a tiempo.",
        en: "Correct, but it rescans from every start: on a large input it doesn't finish in time.",
      },
    },
  ],
  evaluation: {
    kind: "code-tests",
    entrypoint: "longestUniqueSubstring",
    tests: [
      {
        name: "ejemplo",
        call: `longestUniqueSubstring("abcabcbb")`,
        expected: `3`,
        hidden: false,
      },
      {
        name: "repetido-fuera-de-la-ventana",
        call: `longestUniqueSubstring("abba")`,
        expected: `2`,
        hidden: true,
        trap: {
          es: "La aparición anterior de un carácter ya quedó fuera de la ventana: el inicio no debe retroceder.",
          en: "A character's previous occurrence is already outside the window: the start must not move back.",
        },
      },
      {
        name: "no-contigua",
        call: `longestUniqueSubstring("pwwkew")`,
        expected: `3`,
        hidden: true,
        trap: {
          es: "Hay más caracteres distintos que el largo de la mejor subcadena: tiene que ser contigua.",
          en: "There are more distinct characters than the best substring's length: it must be contiguous.",
        },
      },
      {
        name: "cadena-vacia",
        call: `longestUniqueSubstring("")`,
        expected: `0`,
        hidden: true,
        trap: {
          es: "Una cadena vacía tiene longitud 0, no una excepción.",
          en: "An empty string has length 0, not an exception.",
        },
      },
      {
        name: "entrada-grande",
        call: `longestUniqueSubstring((0 until 50000).map(i => (i + 256).toChar).mkString)`,
        expected: `50000`,
        hidden: true,
        trap: {
          es: "50 000 caracteres todos distintos: recorrer desde cada inicio es cuadrático y no termina a tiempo.",
          en: "50,000 characters, all distinct: rescanning from every start is quadratic and doesn't finish in time.",
        },
      },
    ],
  },
};
