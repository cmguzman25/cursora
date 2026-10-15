import type { Challenge } from "../types";

/**
 * Sealed trait + pattern matching: el modelado de dominio más básico de Scala.
 *
 * Las trampas son de las que pasan en vivo con el reloj encima: la división
 * entera del triángulo, `reduce` sobre una lista vacía y confundir el área del
 * círculo con su perímetro.
 */

const MODELO = `sealed trait Shape
case class Rectangle(width: Int, height: Int) extends Shape
case class Triangle(base: Int, height: Int) extends Shape
case class Circle(radius: Int) extends Shape`;

export const challenge: Challenge = {
  slug: "area-de-figuras",
  title: {
    es: "Área total de figuras",
    en: "Total area of shapes",
  },
  difficulty: "basic",
  tags: ["pattern-matching", "sealed-trait", "case-class"],
  language: "scala",
  suggestedMinutes: 10,
  statement: {
    es: `Un editor de planos guarda figuras con medidas enteras:

\`\`\`scala
${MODELO}
\`\`\`

Escribe \`totalArea(shapes: List[Shape]): Double\`, que devuelve la suma de las áreas:

- Rectángulo: \`width × height\`.
- Triángulo: \`base × height / 2\`.
- Círculo: \`π × radius²\` (usa \`math.Pi\`).

Redondea el total a **2 decimales** con \`math.round(total * 100) / 100.0\`. Una lista vacía tiene área \`0.0\`.`,
    en: `A floor-plan editor stores shapes with whole-number measurements:

\`\`\`scala
${MODELO}
\`\`\`

Write \`totalArea(shapes: List[Shape]): Double\`, which returns the sum of the areas:

- Rectangle: \`width × height\`.
- Triangle: \`base × height / 2\`.
- Circle: \`π × radius²\` (use \`math.Pi\`).

Round the total to **2 decimals** with \`math.round(total * 100) / 100.0\`. An empty list has area \`0.0\`.`,
  },
  starterCode: `// No cambies estas definiciones: los tests las usan.
${MODELO}

def totalArea(shapes: List[Shape]): Double = {
  ???
}
`,
  hints: [
    {
      es: "Escribe primero una función `area(s: Shape): Double` con un `match` que tenga un caso por figura.",
      en: "First write a function `area(s: Shape): Double` with a `match` that has one case per shape.",
    },
    {
      es: "Las medidas son `Int`. ¿Cuánto da `3 * 5 / 2` en Scala?",
      en: "The measurements are `Int`s. What does `3 * 5 / 2` evaluate to in Scala?",
    },
    {
      es: "Para sumar, `map(area).sum` funciona con una lista vacía; `reduce(_ + _)` no.",
      en: "To add up, `map(area).sum` works on an empty list; `reduce(_ + _)` doesn't.",
    },
  ],
  solution: {
    code: `${MODELO}

def area(shape: Shape): Double = shape match {
  case Rectangle(w, h) => w.toDouble * h
  case Triangle(b, h) => b.toDouble * h / 2
  case Circle(r) => math.Pi * r * r
}

def totalArea(shapes: List[Shape]): Double = {
  val total = shapes.map(area).sum
  math.round(total * 100) / 100.0
}
`,
    explanation: {
      es: `Con \`sealed trait\`, el compilador conoce todas las figuras posibles. Si falta un caso en el \`match\`, lo avisa. Esa es la ventaja de modelar con un ADT en vez de con una jerarquía abierta, y vale la pena decirlo en la entrevista.

Cada caso desestructura su case class (\`case Triangle(b, h)\`) y calcula el área como \`Double\`. El \`toDouble\` va antes de operar, porque \`3 * 5 / 2\` con enteros es \`7\`, no \`7.5\`.

Para sumar se usa \`sum\`, que con una lista vacía da \`0.0\`. \`reduce\` necesita al menos un elemento y lanza \`UnsupportedOperationException\` con la lista vacía.`,
      en: `With a \`sealed trait\`, the compiler knows every possible shape. If the \`match\` misses a case, it warns you. That's the advantage of modelling with an ADT instead of an open hierarchy, and it's worth saying in the interview.

Each case destructures its case class (\`case Triangle(b, h)\`) and computes the area as a \`Double\`. The \`toDouble\` comes before the arithmetic, because \`3 * 5 / 2\` with integers is \`7\`, not \`7.5\`.

Adding up uses \`sum\`, which gives \`0.0\` on an empty list. \`reduce\` needs at least one element and throws \`UnsupportedOperationException\` on an empty list.`,
    },
    pitfalls: [
      {
        es: "**División entera en el triángulo.** `b * h / 2` con `Int` trunca: un triángulo de 3 × 5 da 7 en vez de 7,5.",
        en: "**Integer division in the triangle.** `b * h / 2` with `Int`s truncates: a 3 × 5 triangle gives 7 instead of 7.5.",
      },
      {
        es: "**`reduce` sobre una lista vacía.** Lanza una excepción; `sum` (o `foldLeft(0.0)`) da 0.",
        en: "**`reduce` on an empty list.** It throws; `sum` (or `foldLeft(0.0)`) gives 0.",
      },
      {
        es: "**Área del círculo.** `2 × π × r` es el perímetro, no el área.",
        en: "**Circle area.** `2 × π × r` is the circumference, not the area.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `${MODELO}

def totalArea(shapes: List[Shape]): Double = {
  val total = shapes.map {
    case Rectangle(w, h) => (w * h).toDouble
    case Triangle(b, h) => (b * h / 2).toDouble
    case Circle(r) => math.Pi * r * r
  }.sum
  math.round(total * 100) / 100.0
}
`,
      why: {
        es: "Calcula el área del triángulo con enteros y la trunca.",
        en: "Computes the triangle's area with integers and truncates it.",
      },
    },
    {
      code: `${MODELO}

def totalArea(shapes: List[Shape]): Double = {
  val total = shapes.map {
    case Rectangle(w, h) => w.toDouble * h
    case Triangle(b, h) => b.toDouble * h / 2
    case Circle(r) => math.Pi * r * r
  }.reduce(_ + _)
  math.round(total * 100) / 100.0
}
`,
      why: {
        es: "`reduce` lanza una excepción con la lista vacía.",
        en: "`reduce` throws on an empty list.",
      },
    },
    {
      code: `${MODELO}

def totalArea(shapes: List[Shape]): Double = {
  val total = shapes.map {
    case Rectangle(w, h) => w.toDouble * h
    case Triangle(b, h) => b.toDouble * h / 2
    case Circle(r) => 2 * math.Pi * r
  }.sum
  math.round(total * 100) / 100.0
}
`,
      why: {
        es: "Usa la fórmula del perímetro para el círculo.",
        en: "Uses the circumference formula for the circle.",
      },
    },
  ],
  evaluation: {
    kind: "code-tests",
    entrypoint: "totalArea",
    tests: [
      {
        name: "ejemplo",
        call: `totalArea(List(Rectangle(2, 3), Triangle(4, 5)))`,
        expected: `16.0`,
        hidden: false,
      },
      {
        name: "triangulo-impar",
        call: `totalArea(List(Triangle(3, 5)))`,
        expected: `7.5`,
        hidden: true,
        trap: {
          es: "Un triángulo cuya área no es entera: base × altura es impar.",
          en: "A triangle whose area isn't whole: base × height is odd.",
        },
      },
      {
        name: "lista-vacia",
        call: `totalArea(List())`,
        expected: `0.0`,
        hidden: true,
        trap: {
          es: "Sin figuras, el área total es 0, no una excepción.",
          en: "With no shapes, the total area is 0, not an exception.",
        },
      },
      {
        name: "circulo",
        call: `totalArea(List(Circle(3), Rectangle(2, 3)))`,
        expected: `34.27`,
        hidden: true,
        trap: {
          es: "Un círculo: el área es π × r², no el perímetro.",
          en: "A circle: the area is π × r², not the circumference.",
        },
      },
    ],
  },
};
