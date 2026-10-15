import type { Challenge } from "../types";

/**
 * Un ADT recursivo y un intérprete que devuelve `Either`.
 *
 * Las trampas: la división por cero que no es un literal (hay que mirar el
 * valor ya evaluado), la variable que falta (`env(name)` lanza) y el "atajo"
 * de multiplicar por cero, que se salta un error del otro lado.
 */

const MODELO = `sealed trait Expr
case class Num(n: Int) extends Expr
case class Var(name: String) extends Expr
case class Add(a: Expr, b: Expr) extends Expr
case class Mul(a: Expr, b: Expr) extends Expr
case class Div(a: Expr, b: Expr) extends Expr`;

export const challenge: Challenge = {
  slug: "evaluar-expresiones",
  title: {
    es: "Evaluar expresiones",
    en: "Evaluate expressions",
  },
  difficulty: "advanced",
  tags: ["adt", "recursion", "either", "pattern-matching"],
  language: "scala",
  suggestedMinutes: 35,
  statement: {
    es: `Una calculadora representa sus expresiones como un árbol:

\`\`\`scala
${MODELO}
\`\`\`

Escribe \`eval(e: Expr, env: Map[String, Int]): Either[String, Int]\`:

- \`Num\` vale su número. \`Var\` vale lo que diga \`env\` para ese nombre.
- \`Add\`, \`Mul\` y \`Div\` operan con enteros. \`Div\` es la división entera de Scala (\`7 / 2 == 3\`).
- Los errores se devuelven como \`Left\`, nunca como excepción:
  - \`"division by zero"\` si el divisor **vale** 0;
  - \`"unknown variable: x"\` si \`x\` no está en \`env\`.
- Se evalúa primero el lado izquierdo y después el derecho. Si hay varios errores, se devuelve **el primero** en ese orden.
- **Siempre se evalúan los dos lados**: \`Mul(Num(0), Var("z"))\` sin \`z\` en \`env\` es un error, no 0.`,
    en: `A calculator represents its expressions as a tree:

\`\`\`scala
${MODELO}
\`\`\`

Write \`eval(e: Expr, env: Map[String, Int]): Either[String, Int]\`:

- \`Num\` is its number. \`Var\` is whatever \`env\` says for that name.
- \`Add\`, \`Mul\` and \`Div\` work on integers. \`Div\` is Scala's integer division (\`7 / 2 == 3\`).
- Errors are returned as \`Left\`, never as exceptions:
  - \`"division by zero"\` if the divisor **evaluates** to 0;
  - \`"unknown variable: x"\` if \`x\` isn't in \`env\`.
- The left side is evaluated first, then the right. With several errors, return **the first** in that order.
- **Both sides are always evaluated**: \`Mul(Num(0), Var("z"))\` with no \`z\` in \`env\` is an error, not 0.`,
  },
  starterCode: `// No cambies estas definiciones: los tests las usan.
${MODELO}

def eval(e: Expr, env: Map[String, Int]): Either[String, Int] = {
  ???
}
`,
  hints: [
    {
      es: "Es una función recursiva con un caso por constructor. Los casos base son `Num` y `Var`.",
      en: "It's a recursive function with one case per constructor. The base cases are `Num` and `Var`.",
    },
    {
      es: "Para los operadores, evalúa los dos lados y combínalos. Un `for` sobre `Either` evalúa en orden y corta en el primer `Left`: aquí eso es justo lo que se pide.",
      en: "For the operators, evaluate both sides and combine them. A `for` over `Either` evaluates in order and stops at the first `Left`: here that's exactly what's required.",
    },
    {
      es: "La división por cero no se ve en el árbol: `Div(Num(10), Add(Num(2), Num(-2)))`. Hay que mirar el **valor** del divisor ya evaluado.",
      en: "Division by zero isn't visible in the tree: `Div(Num(10), Add(Num(2), Num(-2)))`. You must check the divisor's **evaluated** value.",
    },
  ],
  solution: {
    code: `${MODELO}

def eval(e: Expr, env: Map[String, Int]): Either[String, Int] = e match {
  case Num(n) => Right(n)
  case Var(name) => env.get(name).toRight(s"unknown variable: $name")
  case Add(a, b) => for { x <- eval(a, env); y <- eval(b, env) } yield x + y
  case Mul(a, b) => for { x <- eval(a, env); y <- eval(b, env) } yield x * y
  case Div(a, b) =>
    for {
      x <- eval(a, env)
      y <- eval(b, env)
      r <- if (y == 0) Left("division by zero") else Right(x / y)
    } yield r
}
`,
    explanation: {
      es: `Un \`match\` por constructor. Como \`Expr\` es \`sealed\`, el compilador avisa si falta un caso.

- **\`Var\`**: \`env.get(name)\` da un \`Option\` y \`toRight\` lo convierte en \`Either\` con el mensaje de error. \`env(name)\` lanzaría \`NoSuchElementException\`.
- **Operadores**: un \`for\` sobre \`Either\` evalúa la izquierda, luego la derecha, y corta en el primer \`Left\`. Eso da exactamente "el primer error, de izquierda a derecha". Comparado con el reto de validar un formulario, aquí cortar es lo correcto: los pasos son dependientes, porque sin los dos valores no hay resultado.
- **\`Div\`**: la comprobación va sobre \`y\`, el valor **ya evaluado** del divisor. Mirar el árbol (\`case Div(_, Num(0))\`) solo atrapa el cero literal.

El "atajo" \`Mul\` por 0 = 0 parece una optimización, pero cambia el significado: se salta los errores del otro lado. Por eso el enunciado pide evaluar siempre los dos.`,
      en: `One \`match\` case per constructor. Since \`Expr\` is \`sealed\`, the compiler warns about a missing case.

- **\`Var\`**: \`env.get(name)\` gives an \`Option\` and \`toRight\` turns it into an \`Either\` with the error message. \`env(name)\` would throw \`NoSuchElementException\`.
- **Operators**: a \`for\` over \`Either\` evaluates the left side, then the right, and stops at the first \`Left\`. That gives exactly "the first error, left to right". Compared with the form-validation challenge, stopping is right here: the steps are dependent, because without both values there's no result.
- **\`Div\`**: the check is on \`y\`, the divisor's **evaluated** value. Inspecting the tree (\`case Div(_, Num(0))\`) only catches a literal zero.

The "shortcut" \`Mul\` by 0 = 0 looks like an optimization, but it changes the meaning: it skips the other side's errors. That's why the statement requires always evaluating both.`,
    },
    pitfalls: [
      {
        es: "**Buscar el cero en el árbol.** `case Div(_, Num(0))` no ve un divisor que vale 0 después de evaluarlo, y la división lanza `ArithmeticException`.",
        en: "**Looking for zero in the tree.** `case Div(_, Num(0))` misses a divisor that evaluates to 0, and the division throws `ArithmeticException`.",
      },
      {
        es: "**`env(name)`.** Lanza una excepción con una variable desconocida; `env.get(name)` devuelve `Option`.",
        en: "**`env(name)`.** It throws on an unknown variable; `env.get(name)` returns an `Option`.",
      },
      {
        es: "**Cortar la multiplicación por cero.** Devolver 0 sin evaluar el otro lado oculta sus errores.",
        en: "**Short-circuiting multiplication by zero.** Returning 0 without evaluating the other side hides its errors.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `${MODELO}

def eval(e: Expr, env: Map[String, Int]): Either[String, Int] = e match {
  case Num(n) => Right(n)
  case Var(name) => env.get(name).toRight(s"unknown variable: $name")
  case Add(a, b) => for { x <- eval(a, env); y <- eval(b, env) } yield x + y
  case Mul(a, b) => for { x <- eval(a, env); y <- eval(b, env) } yield x * y
  case Div(_, Num(0)) => Left("division by zero")
  case Div(a, b) => for { x <- eval(a, env); y <- eval(b, env) } yield x / y
}
`,
      why: {
        es: "Solo detecta el cero literal: un divisor que vale 0 lanza `ArithmeticException`.",
        en: "Only catches a literal zero: a divisor that evaluates to 0 throws `ArithmeticException`.",
      },
    },
    {
      code: `${MODELO}

def eval(e: Expr, env: Map[String, Int]): Either[String, Int] = e match {
  case Num(n) => Right(n)
  case Var(name) => Right(env(name))
  case Add(a, b) => for { x <- eval(a, env); y <- eval(b, env) } yield x + y
  case Mul(a, b) => for { x <- eval(a, env); y <- eval(b, env) } yield x * y
  case Div(a, b) =>
    for {
      x <- eval(a, env)
      y <- eval(b, env)
      r <- if (y == 0) Left("division by zero") else Right(x / y)
    } yield r
}
`,
      why: {
        es: "`env(name)` lanza una excepción con una variable desconocida.",
        en: "`env(name)` throws on an unknown variable.",
      },
    },
    {
      code: `${MODELO}

def eval(e: Expr, env: Map[String, Int]): Either[String, Int] = e match {
  case Num(n) => Right(n)
  case Var(name) => env.get(name).toRight(s"unknown variable: $name")
  case Add(a, b) => for { x <- eval(a, env); y <- eval(b, env) } yield x + y
  case Mul(a, b) =>
    eval(a, env) match {
      case Right(0) => Right(0)
      case left => for { x <- left; y <- eval(b, env) } yield x * y
    }
  case Div(a, b) =>
    for {
      x <- eval(a, env)
      y <- eval(b, env)
      r <- if (y == 0) Left("division by zero") else Right(x / y)
    } yield r
}
`,
      why: {
        es: "Corta la multiplicación cuando el lado izquierdo vale 0 y se salta el error del derecho.",
        en: "Short-circuits multiplication when the left side is 0 and skips the right side's error.",
      },
    },
  ],
  evaluation: {
    kind: "code-tests",
    entrypoint: "eval",
    tests: [
      {
        name: "ejemplo",
        call: `eval(Add(Num(2), Mul(Var("x"), Num(3))), Map("x" -> 4))`,
        expected: `Right(14)`,
        hidden: false,
      },
      {
        name: "division-entera",
        call: `eval(Div(Num(7), Num(2)), Map())`,
        expected: `Right(3)`,
        hidden: false,
      },
      {
        name: "division-por-cero-anidada",
        call: `eval(Div(Num(10), Add(Num(2), Num(-2))), Map())`,
        expected: `Left("division by zero")`,
        hidden: true,
        trap: {
          es: "El divisor no es un 0 literal, pero vale 0 una vez evaluado.",
          en: "The divisor isn't a literal 0, but it evaluates to 0.",
        },
      },
      {
        name: "variable-desconocida",
        call: `eval(Add(Var("x"), Num(1)), Map())`,
        expected: `Left("unknown variable: x")`,
        hidden: true,
        trap: {
          es: "Una variable que no está en `env`: es un `Left`, no una excepción.",
          en: "A variable missing from `env`: it's a `Left`, not an exception.",
        },
      },
      {
        name: "cero-no-corta",
        call: `eval(Mul(Num(0), Var("z")), Map())`,
        expected: `Left("unknown variable: z")`,
        hidden: true,
        trap: {
          es: "Multiplicar por 0 no evita evaluar el otro lado, que tiene un error.",
          en: "Multiplying by 0 doesn't skip evaluating the other side, which has an error.",
        },
      },
    ],
  },
};
