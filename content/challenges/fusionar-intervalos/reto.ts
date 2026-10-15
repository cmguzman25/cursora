import type { Challenge } from "../types";

/**
 * Fusionar intervalos: ordenar y plegar.
 *
 * Tres trampas clásicas: la entrada desordenada, los intervalos que se tocan
 * en un borde (cerrados: se fusionan) y el intervalo contenido en otro, que
 * achica el fin si se toma el del último en lugar del máximo.
 */
export const challenge: Challenge = {
  slug: "fusionar-intervalos",
  title: {
    es: "Fusionar intervalos",
    en: "Merge intervals",
  },
  difficulty: "advanced",
  tags: ["sorting", "fold", "intervals"],
  language: "scala",
  suggestedMinutes: 30,
  statement: {
    es: `Un calendario guarda reservas como intervalos **cerrados** \`(inicio, fin)\`, con \`inicio <= fin\`.

Escribe \`merge(intervals: List[(Int, Int)]): List[(Int, Int)]\`, que fusiona todos los intervalos que se solapan y devuelve el resultado **ordenado por inicio**.

- Dos intervalos se solapan si comparten al menos un punto. Como son cerrados, \`(1, 4)\` y \`(4, 5)\` se solapan y se fusionan en \`(1, 5)\`.
- La entrada puede venir **en cualquier orden**.
- Una lista vacía devuelve una lista vacía.`,
    en: `A calendar stores bookings as **closed** intervals \`(start, end)\`, with \`start <= end\`.

Write \`merge(intervals: List[(Int, Int)]): List[(Int, Int)]\`, which merges every overlapping interval and returns the result **sorted by start**.

- Two intervals overlap if they share at least one point. Since they're closed, \`(1, 4)\` and \`(4, 5)\` overlap and merge into \`(1, 5)\`.
- The input may come **in any order**.
- An empty list returns an empty list.`,
  },
  starterCode: `def merge(intervals: List[(Int, Int)]): List[(Int, Int)] = {
  ???
}
`,
  hints: [
    {
      es: "Si los intervalos estuvieran ordenados por inicio, ¿con cuál de los ya fusionados podría solaparse el siguiente?",
      en: "If the intervals were sorted by start, which of the already merged ones could the next one overlap with?",
    },
    {
      es: "Ordena y recorre con `foldLeft`, llevando la lista de fusionados. Solo hace falta mirar el **último**.",
      en: "Sort, then walk with `foldLeft`, carrying the merged list. You only need to look at the **last** one.",
    },
    {
      es: "Al fusionar, el nuevo fin no siempre es el del intervalo nuevo: `(1, 10)` y `(2, 3)`.",
      en: "When merging, the new end isn't always the new interval's end: `(1, 10)` and `(2, 3)`.",
    },
  ],
  solution: {
    code: `def merge(intervals: List[(Int, Int)]): List[(Int, Int)] = {
  intervals
    .sortBy(_._1)
    .foldLeft(List.empty[(Int, Int)]) {
      case ((lastStart, lastEnd) :: rest, (start, end)) if start <= lastEnd =>
        (lastStart, math.max(lastEnd, end)) :: rest
      case (acc, interval) =>
        interval :: acc
    }
    .reverse
}
`,
    explanation: {
      es: `Después de ordenar por inicio, un intervalo solo puede solaparse con el **último** fusionado: todos los anteriores terminaron antes de que empezara ese último, o ya estarían fusionados con él.

El \`foldLeft\` lleva la lista de fusionados **al revés**, con el último adelante. Así, mirarlo y reemplazarlo es un pattern match sobre la cabeza (\`last :: rest\`), en O(1). Al final se invierte.

Dos detalles en la condición:

- **\`start <= lastEnd\`**, no \`<\`. Con intervalos cerrados, tocarse en un borde ya es solaparse.
- **\`math.max(lastEnd, end)\`**. Un intervalo puede estar contenido en el último, y entonces su fin es menor.

El costo lo domina el ordenamiento: O(n log n).`,
      en: `After sorting by start, an interval can only overlap the **last** merged one: all earlier ones ended before that last one started, or they'd already be merged with it.

The \`foldLeft\` carries the merged list **reversed**, with the last one in front. Looking at it and replacing it is then a pattern match on the head (\`last :: rest\`), in O(1). Reverse at the end.

Two details in the condition:

- **\`start <= lastEnd\`**, not \`<\`. With closed intervals, touching at an endpoint already counts as overlapping.
- **\`math.max(lastEnd, end)\`**. An interval can be contained in the last one, and then its end is smaller.

Sorting dominates the cost: O(n log n).`,
    },
    pitfalls: [
      {
        es: "**No ordenar.** Con la entrada desordenada, comparar solo con el último fusionado deja solapamientos sin fusionar.",
        en: "**Not sorting.** With unsorted input, comparing only against the last merged interval leaves overlaps unmerged.",
      },
      {
        es: "**`<` en lugar de `<=`.** Los intervalos son cerrados: `(1, 4)` y `(4, 5)` comparten el 4.",
        en: "**`<` instead of `<=`.** The intervals are closed: `(1, 4)` and `(4, 5)` share the 4.",
      },
      {
        es: "**Tomar el fin del intervalo nuevo.** Si está contenido en el anterior, el fin fusionado se achica.",
        en: "**Taking the new interval's end.** If it's contained in the previous one, the merged end shrinks.",
      },
      {
        es: "**`head` sobre la lista vacía.** Arrancar el pliegue con `intervals.head` lanza una excepción.",
        en: "**`head` on the empty list.** Seeding the fold with `intervals.head` throws.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `def merge(intervals: List[(Int, Int)]): List[(Int, Int)] =
  intervals
    .foldLeft(List.empty[(Int, Int)]) {
      case ((ls, le) :: rest, (s, e)) if s <= le => (ls, math.max(le, e)) :: rest
      case (acc, i) => i :: acc
    }
    .reverse
`,
      why: {
        es: "No ordena: con la entrada desordenada deja solapamientos sin fusionar.",
        en: "Doesn't sort: with unsorted input it leaves overlaps unmerged.",
      },
    },
    {
      code: `def merge(intervals: List[(Int, Int)]): List[(Int, Int)] =
  intervals
    .sortBy(_._1)
    .foldLeft(List.empty[(Int, Int)]) {
      case ((ls, le) :: rest, (s, e)) if s < le => (ls, math.max(le, e)) :: rest
      case (acc, i) => i :: acc
    }
    .reverse
`,
      why: {
        es: "Usa `<`: no fusiona los intervalos que se tocan en un borde.",
        en: "Uses `<`: it doesn't merge intervals that touch at an endpoint.",
      },
    },
    {
      code: `def merge(intervals: List[(Int, Int)]): List[(Int, Int)] =
  intervals
    .sortBy(_._1)
    .foldLeft(List.empty[(Int, Int)]) {
      case ((ls, le) :: rest, (s, e)) if s <= le => (ls, e) :: rest
      case (acc, i) => i :: acc
    }
    .reverse
`,
      why: {
        es: "Toma el fin del intervalo nuevo: uno contenido en otro achica el resultado.",
        en: "Takes the new interval's end: a contained interval shrinks the result.",
      },
    },
    {
      code: `def merge(intervals: List[(Int, Int)]): List[(Int, Int)] = {
  val sorted = intervals.sortBy(_._1)
  sorted.tail
    .foldLeft(List(sorted.head)) {
      case ((ls, le) :: rest, (s, e)) if s <= le => (ls, math.max(le, e)) :: rest
      case (acc, i) => i :: acc
    }
    .reverse
}
`,
      why: {
        es: "Arranca con `head`: lanza una excepción con la lista vacía.",
        en: "Starts from `head`: it throws on the empty list.",
      },
    },
  ],
  evaluation: {
    kind: "code-tests",
    entrypoint: "merge",
    tests: [
      {
        name: "ejemplo",
        call: `merge(List((1, 3), (2, 6), (8, 10), (15, 18)))`,
        expected: `List((1, 6), (8, 10), (15, 18))`,
        hidden: false,
      },
      {
        name: "desordenados",
        call: `merge(List((8, 10), (1, 3), (2, 6)))`,
        expected: `List((1, 6), (8, 10))`,
        hidden: true,
        trap: {
          es: "La entrada viene desordenada: hay que ordenar antes de fusionar.",
          en: "The input is unsorted: it must be sorted before merging.",
        },
      },
      {
        name: "se-tocan",
        call: `merge(List((1, 4), (4, 5)))`,
        expected: `List((1, 5))`,
        hidden: true,
        trap: {
          es: "Dos intervalos que se tocan en un borde: al ser cerrados, se fusionan.",
          en: "Two intervals touching at an endpoint: being closed, they merge.",
        },
      },
      {
        name: "contenido",
        call: `merge(List((1, 10), (2, 3), (4, 5)))`,
        expected: `List((1, 10))`,
        hidden: true,
        trap: {
          es: "Intervalos contenidos en otro: el fin fusionado es el máximo, no el del último.",
          en: "Intervals contained in another: the merged end is the maximum, not the last one's.",
        },
      },
      {
        name: "vacia",
        call: `merge(List())`,
        expected: `List()`,
        hidden: true,
        trap: {
          es: "Sin intervalos, el resultado es una lista vacía.",
          en: "With no intervals, the result is an empty list.",
        },
      },
    ],
  },
};
