import type { Challenge } from "../types";

/**
 * El clásico de entrevista: two sum con un mapa de valor a índice.
 *
 * Lo que separa una respuesta buena de una mediocre: no usar el mismo elemento
 * dos veces, guardar el **primer** índice de cada valor, y hacerlo en una
 * pasada (el caso grande deja fuera a la fuerza bruta O(n²)).
 */
export const challenge: Challenge = {
  slug: "dos-sumas",
  title: {
    es: "Dos números que suman el objetivo",
    en: "Two sum",
  },
  difficulty: "medium",
  tags: ["hash-map", "arrays", "complexity"],
  language: "scala",
  suggestedMinutes: 20,
  statement: {
    es: `Escribe \`twoSum(nums: Vector[Int], target: Int): Option[(Int, Int)]\`, que busca dos posiciones **distintas** \`i < j\` tales que \`nums(i) + nums(j) == target\`.

- Si hay varias parejas, devuelve la que **se completa primero** al recorrer de izquierda a derecha: el menor \`j\` posible y, para ese \`j\`, el menor \`i\`.
- Si no hay ninguna, devuelve \`None\`.
- \`nums\` puede tener **hasta 200 000 elementos**: la solución tiene que ser mejor que O(n²).`,
    en: `Write \`twoSum(nums: Vector[Int], target: Int): Option[(Int, Int)]\`, which looks for two **different** positions \`i < j\` such that \`nums(i) + nums(j) == target\`.

- If there are several pairs, return the one that **completes first** when scanning left to right: the smallest possible \`j\` and, for that \`j\`, the smallest \`i\`.
- If there is none, return \`None\`.
- \`nums\` may have **up to 200,000 elements**: the solution must be better than O(n²).`,
  },
  starterCode: `def twoSum(nums: Vector[Int], target: Int): Option[(Int, Int)] = {
  ???
}
`,
  hints: [
    {
      es: "Para cada `nums(j)`, el número que te falta es `target - nums(j)`. ¿Cómo sabes en O(1) si ya lo viste antes, y dónde?",
      en: "For each `nums(j)`, the number you're missing is `target - nums(j)`. How do you know in O(1) whether you've already seen it, and where?",
    },
    {
      es: "Un `Map` de valor a índice, construido **mientras** recorres, solo contiene posiciones anteriores a `j`: así no puedes usar el mismo elemento dos veces.",
      en: "A value-to-index `Map` built **while** you scan only holds positions before `j`: that way you can't use the same element twice.",
    },
    {
      es: "Si un valor se repite, ¿qué índice quieres conservar en el mapa: el primero o el último?",
      en: "If a value repeats, which index do you want to keep in the map: the first or the last?",
    },
  ],
  solution: {
    code: `def twoSum(nums: Vector[Int], target: Int): Option[(Int, Int)] = {
  val seen = scala.collection.mutable.HashMap.empty[Int, Int]
  var j = 0
  while (j < nums.length) {
    val x = nums(j)
    seen.get(target - x) match {
      case Some(i) => return Some((i, j))
      case None => if (!seen.contains(x)) seen(x) = j
    }
    j += 1
  }
  None
}
`,
    explanation: {
      es: `Una sola pasada con un mapa de **valor → primer índice donde apareció**.

En cada posición \`j\` se pregunta primero si el complemento \`target - nums(j)\` ya está en el mapa, y **después** se agrega \`nums(j)\`. Ese orden importa: el mapa solo tiene posiciones anteriores, así que \`i < j\` siempre, y un elemento nunca se empareja consigo mismo.

El primer \`j\` donde aparece un complemento es la pareja que se completa primero. Como el mapa guarda el **primer** índice de cada valor (\`if (!seen.contains(x))\`), el \`i\` también es el menor.

Es O(n) en tiempo y en memoria. La fuerza bruta con dos bucles es O(n²): con 200 000 elementos son unos 20 000 millones de comparaciones.

Una versión puramente funcional usaría \`foldLeft\` sobre \`zipWithIndex\` con un \`Map\` inmutable, pero cortar al encontrar la pareja es más incómodo. En una entrevista, un bucle con \`HashMap\` mutable y local es perfectamente idiomático, y conviene decir por qué no se escapa la mutabilidad.`,
      en: `A single pass with a map of **value → first index where it appeared**.

At each position \`j\`, first ask whether the complement \`target - nums(j)\` is already in the map, and **then** add \`nums(j)\`. That order matters: the map only holds earlier positions, so \`i < j\` always, and an element never pairs with itself.

The first \`j\` where a complement shows up is the pair that completes first. Since the map keeps the **first** index of each value (\`if (!seen.contains(x))\`), the \`i\` is also the smallest.

It's O(n) in time and memory. Brute force with two loops is O(n²): with 200,000 elements that's about 20 billion comparisons.

A purely functional version would use \`foldLeft\` over \`zipWithIndex\` with an immutable \`Map\`, but stopping once the pair is found is clumsier. In an interview, a loop with a local mutable \`HashMap\` is perfectly idiomatic, and it's worth saying why the mutability doesn't leak.`,
    },
    pitfalls: [
      {
        es: "**Usar el mismo elemento dos veces.** Si el mapa se arma completo antes de buscar, con `target = 6` y un `3` en la lista, el 3 se empareja consigo mismo.",
        en: "**Using the same element twice.** If the map is fully built before searching, with `target = 6` and a `3` in the list, the 3 pairs with itself.",
      },
      {
        es: "**Sobrescribir el índice de un valor repetido.** El mapa termina con el último índice, y la pareja devuelta no es la del menor `i`.",
        en: "**Overwriting the index of a repeated value.** The map ends up with the last index, and the returned pair isn't the one with the smallest `i`.",
      },
      {
        es: "**Fuerza bruta O(n²).** Pasa los ejemplos chicos y se queda sin tiempo con la entrada grande.",
        en: "**O(n²) brute force.** It passes the small examples and runs out of time on the large input.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `def twoSum(nums: Vector[Int], target: Int): Option[(Int, Int)] = {
  val index = nums.zipWithIndex.toMap
  nums.indices.collectFirst {
    case i if index.contains(target - nums(i)) => (i, index(target - nums(i)))
  }
}
`,
      why: {
        es: "Arma el mapa completo antes de buscar: puede emparejar un elemento consigo mismo.",
        en: "Builds the whole map before searching: it can pair an element with itself.",
      },
    },
    {
      code: `def twoSum(nums: Vector[Int], target: Int): Option[(Int, Int)] = {
  val seen = scala.collection.mutable.HashMap.empty[Int, Int]
  var j = 0
  while (j < nums.length) {
    val x = nums(j)
    seen.get(target - x) match {
      case Some(i) => return Some((i, j))
      case None => seen(x) = j
    }
    j += 1
  }
  None
}
`,
      why: {
        es: "Sobrescribe el índice cuando un valor se repite: no devuelve el menor `i`.",
        en: "Overwrites the index when a value repeats: it doesn't return the smallest `i`.",
      },
    },
    {
      code: `def twoSum(nums: Vector[Int], target: Int): Option[(Int, Int)] = {
  val pairs = for {
    j <- nums.indices.iterator
    i <- (0 until j).iterator
    if nums(i) + nums(j) == target
  } yield (i, j)
  pairs.nextOption()
}
`,
      why: {
        es: "Correcta pero O(n²): con 200 000 elementos no termina a tiempo.",
        en: "Correct but O(n²): with 200,000 elements it doesn't finish in time.",
      },
    },
  ],
  evaluation: {
    kind: "code-tests",
    entrypoint: "twoSum",
    tests: [
      {
        name: "ejemplo",
        call: `twoSum(Vector(2, 7, 11, 15), 9)`,
        expected: `Some((0, 1))`,
        hidden: false,
      },
      {
        name: "mismo-elemento",
        call: `twoSum(Vector(3, 2, 4), 6)`,
        expected: `Some((1, 2))`,
        hidden: true,
        trap: {
          es: "El objetivo es el doble de un elemento: no se puede usar el mismo elemento dos veces.",
          en: "The target is twice one element: the same element can't be used twice.",
        },
      },
      {
        name: "primer-indice",
        call: `twoSum(Vector(1, 1, 5, 9), 6)`,
        expected: `Some((0, 2))`,
        hidden: true,
        trap: {
          es: "Un valor repetido: el `i` devuelto es su primera aparición.",
          en: "A repeated value: the returned `i` is its first occurrence.",
        },
      },
      {
        name: "sin-solucion",
        call: `twoSum(Vector(1, 2, 3), 100)`,
        expected: `None`,
        hidden: true,
        trap: {
          es: "Ninguna pareja suma el objetivo.",
          en: "No pair adds up to the target.",
        },
      },
      {
        name: "entrada-grande",
        call: `twoSum(Vector.range(0, 200000), 399997)`,
        expected: `Some((199998, 199999))`,
        hidden: true,
        trap: {
          es: "200 000 elementos con la pareja al final: O(n²) no termina a tiempo.",
          en: "200,000 elements with the pair at the very end: O(n²) doesn't finish in time.",
        },
      },
    ],
  },
};
