import type { Challenge } from "../types";

/**
 * Option: un resultado que puede no existir.
 *
 * El promedio de "nada" no es 0 ni `NaN`: no hay promedio. Ese es el punto del
 * reto, junto con la división entera, que en Scala pasa en silencio.
 */
export const challenge: Challenge = {
  slug: "promedio-de-notas-validas",
  title: {
    es: "Promedio de notas válidas",
    en: "Average of valid grades",
  },
  difficulty: "basic",
  tags: ["option", "parsing", "collections"],
  language: "scala",
  suggestedMinutes: 10,
  statement: {
    es: `Las notas de un curso llegan como texto, tal como las escribieron a mano en una planilla:

\`\`\`scala
List("80", "90", "abc", "75")
\`\`\`

Escribe \`averageGrade(grades: List[String]): Option[Double]\`:

- Una nota es **válida** si es un número entero entre **0 y 100, ambos incluidos**. Las demás se ignoran.
- Devuelve \`Some(promedio)\` de las notas válidas, sin redondear.
- Si no hay ninguna nota válida, devuelve \`None\`.`,
    en: `A course's grades arrive as text, exactly as they were typed into a spreadsheet:

\`\`\`scala
List("80", "90", "abc", "75")
\`\`\`

Write \`averageGrade(grades: List[String]): Option[Double]\`:

- A grade is **valid** if it is a whole number between **0 and 100, both included**. Ignore the rest.
- Return \`Some(average)\` of the valid grades, unrounded.
- If there are no valid grades, return \`None\`.`,
  },
  starterCode: `def averageGrade(grades: List[String]): Option[Double] = {
  ???
}
`,
  hints: [
    {
      es: "Separa el problema: primero quedarte con las notas válidas como `Int`, después promediarlas.",
      en: "Split the problem: first keep the valid grades as `Int`s, then average them.",
    },
    {
      es: "`toIntOption` convierte sin lanzar excepciones, y `flatMap` sobre una lista descarta los `None`.",
      en: "`toIntOption` converts without throwing, and `flatMap` over a list drops the `None`s.",
    },
    {
      es: "¿Qué tipo tiene `245 / 3` en Scala? ¿Y qué pasa si la lista de válidas está vacía?",
      en: "What type is `245 / 3` in Scala? And what happens if the list of valid grades is empty?",
    },
  ],
  solution: {
    code: `def averageGrade(grades: List[String]): Option[Double] = {
  val valid = grades.flatMap(_.toIntOption).filter(g => g >= 0 && g <= 100)
  if (valid.isEmpty) None
  else Some(valid.sum.toDouble / valid.size)
}
`,
    explanation: {
      es: `\`flatMap(_.toIntOption)\` hace dos cosas en un paso: convierte cada texto y descarta los que no son números, porque un \`Option\` vacío no aporta elementos. Después \`filter\` deja solo el rango válido.

El promedio solo existe si hay notas, por eso el tipo es \`Option[Double]\`: el \`if\` lo hace explícito. Sin él, \`0 / 0\` lanza \`ArithmeticException\` con enteros, y \`0.0 / 0\` da \`NaN\` con decimales. Ninguna de las dos cosas significa "no hay promedio".

El \`toDouble\` va **antes** de dividir. \`245 / 3\` es \`81\` (división entera), y convertir después da \`81.0\`, no \`81.666…\`.`,
      en: `\`flatMap(_.toIntOption)\` does two things in one step: it converts each text and drops the ones that aren't numbers, because an empty \`Option\` contributes no elements. Then \`filter\` keeps only the valid range.

An average only exists if there are grades, which is why the type is \`Option[Double]\`, and the \`if\` makes it explicit. Without it, \`0 / 0\` throws \`ArithmeticException\` with integers and \`0.0 / 0\` gives \`NaN\` with doubles. Neither means "there is no average".

The \`toDouble\` goes **before** dividing. \`245 / 3\` is \`81\` (integer division), and converting afterwards yields \`81.0\`, not \`81.666…\`.`,
    },
    pitfalls: [
      {
        es: "**División entera.** `(suma / cantidad).toDouble` ya perdió los decimales: hay que convertir antes de dividir.",
        en: "**Integer division.** `(sum / count).toDouble` has already lost the decimals: convert before dividing.",
      },
      {
        es: "**Lista vacía.** Sin comprobarla, el resultado es una excepción o `Some(NaN)` en lugar de `None`.",
        en: "**Empty list.** Without checking it, the result is an exception or `Some(NaN)` instead of `None`.",
      },
      {
        es: "**Límites del rango.** 0 y 100 son notas válidas; `g > 0` o `g < 100` las excluye.",
        en: "**Range bounds.** 0 and 100 are valid grades; `g > 0` or `g < 100` excludes them.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `def averageGrade(grades: List[String]): Option[Double] = {
  val valid = grades.flatMap(_.toIntOption).filter(g => g >= 0 && g <= 100)
  if (valid.isEmpty) None
  else Some((valid.sum / valid.size).toDouble)
}
`,
      why: {
        es: "Divide enteros y convierte después: el promedio pierde los decimales.",
        en: "Divides integers and converts afterwards: the average loses its decimals.",
      },
    },
    {
      code: `def averageGrade(grades: List[String]): Option[Double] = {
  val valid = grades.flatMap(_.toIntOption).filter(g => g >= 0 && g <= 100)
  Some(valid.sum.toDouble / valid.size)
}
`,
      why: {
        es: "No contempla la lista sin notas válidas: devuelve `Some(NaN)`.",
        en: "Doesn't handle the case with no valid grades: it returns `Some(NaN)`.",
      },
    },
    {
      code: `def averageGrade(grades: List[String]): Option[Double] = {
  val valid = grades.flatMap(_.toIntOption).filter(g => g > 0 && g < 100)
  if (valid.isEmpty) None
  else Some(valid.sum.toDouble / valid.size)
}
`,
      why: {
        es: "Excluye los límites 0 y 100, que son notas válidas.",
        en: "Excludes the bounds 0 and 100, which are valid grades.",
      },
    },
  ],
  evaluation: {
    kind: "code-tests",
    entrypoint: "averageGrade",
    tests: [
      {
        name: "ejemplo",
        call: `averageGrade(List("80", "90", "abc"))`,
        expected: `Some(85.0)`,
        hidden: false,
      },
      {
        name: "division-entera",
        call: `averageGrade(List("80", "90", "75"))`,
        expected: `Some(245.0 / 3)`,
        hidden: true,
        trap: {
          es: "Un promedio que no es exacto: la división tiene que hacerse con decimales.",
          en: "An average that isn't exact: the division must be done with decimals.",
        },
      },
      {
        name: "lista-vacia",
        call: `averageGrade(List())`,
        expected: `None`,
        hidden: true,
        trap: {
          es: "Sin notas no hay promedio: `None`, no `NaN` ni una excepción.",
          en: "No grades means no average: `None`, not `NaN` or an exception.",
        },
      },
      {
        name: "todas-invalidas",
        call: `averageGrade(List("abc", "-5", "101"))`,
        expected: `None`,
        hidden: true,
        trap: {
          es: "Hay notas, pero ninguna es válida: tampoco hay promedio.",
          en: "There are grades, but none is valid: there's no average either.",
        },
      },
      {
        name: "limites",
        call: `averageGrade(List("100", "0", "150"))`,
        expected: `Some(50.0)`,
        hidden: true,
        trap: {
          es: "0 y 100 son válidas (límites incluidos); 150 no.",
          en: "0 and 100 are valid (inclusive bounds); 150 isn't.",
        },
      },
    ],
  },
};
