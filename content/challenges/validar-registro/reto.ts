import type { Challenge } from "../types";

/**
 * Validación que acumula errores con `Either`.
 *
 * La trampa central: un `for` sobre `Either` corta en el **primer** error. En
 * un formulario eso es justo lo que no se quiere: el usuario corrige un campo,
 * reenvía y recién ahí se entera del siguiente.
 */

const MODELO = `case class Form(name: String, email: String, age: String)
case class User(name: String, email: String, age: Int)`;

export const challenge: Challenge = {
  slug: "validar-registro",
  title: {
    es: "Validar un formulario de registro",
    en: "Validate a sign-up form",
  },
  difficulty: "medium",
  tags: ["either", "validation", "case-class"],
  language: "scala",
  suggestedMinutes: 20,
  statement: {
    es: `Un formulario de registro llega con todos sus campos como texto:

\`\`\`scala
${MODELO}
\`\`\`

Escribe \`validate(form: Form): Either[List[String], User]\` con estas reglas:

| Campo | Regla | Error |
|---|---|---|
| \`name\` | sin espacios al principio ni al final, no puede quedar vacío | \`"name is required"\` |
| \`email\` | tiene texto antes de una \`@\`, y la parte después de la \`@\` contiene un punto | \`"invalid email"\` |
| \`age\` | es un número entero | \`"age must be a number"\` |
| \`age\` | está entre 18 y 120, ambos incluidos | \`"age must be between 18 and 120"\` |

- Si todo es válido, devuelve \`Right(User(...))\` con el nombre **sin los espacios** de los extremos y la edad como \`Int\`.
- Si hay errores, devuelve \`Left\` con **todos** los errores, en el orden de la tabla: primero el del nombre, luego el del email, luego el de la edad.
- Cada campo aporta como mucho un error.`,
    en: `A sign-up form arrives with every field as text:

\`\`\`scala
${MODELO}
\`\`\`

Write \`validate(form: Form): Either[List[String], User]\` with these rules:

| Field | Rule | Error |
|---|---|---|
| \`name\` | without leading or trailing spaces, it can't be empty | \`"name is required"\` |
| \`email\` | has text before an \`@\`, and the part after the \`@\` contains a dot | \`"invalid email"\` |
| \`age\` | is a whole number | \`"age must be a number"\` |
| \`age\` | is between 18 and 120, both included | \`"age must be between 18 and 120"\` |

- If everything is valid, return \`Right(User(...))\` with the name **trimmed** and the age as an \`Int\`.
- If there are errors, return \`Left\` with **all** of them, in table order: name first, then email, then age.
- Each field contributes at most one error.`,
  },
  starterCode: `// No cambies estas definiciones: los tests las usan.
${MODELO}

def validate(form: Form): Either[List[String], User] = {
  ???
}
`,
  hints: [
    {
      es: "Valida cada campo por separado: cada uno da un `Either[String, X]`. El problema es cómo juntar tres resultados sin perder errores.",
      en: "Validate each field on its own: each one gives an `Either[String, X]`. The problem is how to combine three results without losing errors.",
    },
    {
      es: "Un `for` sobre `Either` se detiene en el primer `Left`. Si los tres campos fallan, ¿cuántos errores verías?",
      en: "A `for` over `Either` stops at the first `Left`. If all three fields fail, how many errors would you see?",
    },
    {
      es: "Pon los tres resultados en una tupla y haz `match`: si los tres son `Right`, construye el `User`; si no, recoge los `Left` con `collect`.",
      en: "Put the three results in a tuple and `match`: if all three are `Right`, build the `User`; otherwise gather the `Left`s with `collect`.",
    },
  ],
  solution: {
    code: `${MODELO}

def validate(form: Form): Either[List[String], User] = {
  val name = form.name.trim
  val nameV: Either[String, String] =
    if (name.isEmpty) Left("name is required") else Right(name)

  val emailV: Either[String, String] = form.email.split("@", -1) match {
    case Array(local, domain) if local.nonEmpty && domain.contains(".") => Right(form.email)
    case _ => Left("invalid email")
  }

  val ageV: Either[String, Int] = form.age.trim.toIntOption match {
    case None => Left("age must be a number")
    case Some(a) if a < 18 || a > 120 => Left("age must be between 18 and 120")
    case Some(a) => Right(a)
  }

  (nameV, emailV, ageV) match {
    case (Right(n), Right(e), Right(a)) => Right(User(n, e, a))
    case _ => Left(List(nameV, emailV, ageV).collect { case Left(err) => err })
  }
}
`,
    explanation: {
      es: `Cada campo se valida **por separado** y da su propio \`Either\`. Después se combinan los tres sin cortar en el primer error: si los tres son \`Right\`, se construye el \`User\`; si no, \`collect\` recorre la lista en orden y se queda con los mensajes de los \`Left\`.

La forma "obvia" con \`for\` (o \`flatMap\`) es correcta para pasos **dependientes**, donde el segundo necesita el resultado del primero. Aquí los campos son **independientes**, y entonces cortar en el primer error es perder información.

En proyectos reales esto se hace con \`Validated\` de Cats o con \`ZValidation\`, que acumulan errores por diseño. En una entrevista, sin librerías, la tupla con \`match\` es lo idiomático y se explica en una línea.

Detalles que se llevan errores:

- **\`toIntOption\`** en lugar de \`toInt\`, que lanza \`NumberFormatException\` con \`"treinta"\`.
- **\`trim\`** antes de comprobar si el nombre está vacío, y es el nombre recortado el que va en el \`User\`.
- **Límites incluidos**: 18 es válido.`,
      en: `Each field is validated **on its own** and yields its own \`Either\`. Then the three are combined without stopping at the first error: if all three are \`Right\`, build the \`User\`; otherwise \`collect\` walks the list in order and keeps the messages of the \`Left\`s.

The "obvious" \`for\` (or \`flatMap\`) is right for **dependent** steps, where the second needs the first's result. Here the fields are **independent**, so stopping at the first error throws information away.

In real projects this is done with Cats' \`Validated\` or \`ZValidation\`, which accumulate errors by design. In an interview, with no libraries, the tuple plus \`match\` is idiomatic and takes one line to explain.

Details that cost errors:

- **\`toIntOption\`** instead of \`toInt\`, which throws \`NumberFormatException\` on \`"thirty"\`.
- **\`trim\`** before checking whether the name is empty, and the trimmed name is the one that goes into the \`User\`.
- **Inclusive bounds**: 18 is valid.`,
    },
    pitfalls: [
      {
        es: "**Cortar en el primer error.** Un `for` sobre `Either` devuelve solo el primer `Left`. Con nombre vacío y email inválido, el resultado debe traer los dos.",
        en: "**Stopping at the first error.** A `for` over `Either` returns only the first `Left`. With an empty name and an invalid email, the result must include both.",
      },
      {
        es: "**`isEmpty` sin `trim`.** `\"   \"` no está vacío, pero tampoco es un nombre.",
        en: "**`isEmpty` without `trim`.** `\"   \"` isn't empty, but it isn't a name either.",
      },
      {
        es: "**Validar recortado y guardar sin recortar.** Si el nombre llega como `\"  Ana  \"`, el `User` debe llevar `\"Ana\"`.",
        en: "**Validating the trimmed name but storing the raw one.** If the name arrives as `\"  Ana  \"`, the `User` must hold `\"Ana\"`.",
      },
      {
        es: "**`toInt` en lugar de `toIntOption`.** Con una edad que no es número, `toInt` lanza una excepción en vez de devolver el error.",
        en: "**`toInt` instead of `toIntOption`.** With an age that isn't a number, `toInt` throws instead of returning the error.",
      },
      {
        es: "**Límite excluido.** `age > 18` rechaza a alguien de 18, y la regla dice \"ambos incluidos\".",
        en: "**Exclusive bound.** `age > 18` rejects an 18-year-old, and the rule says \"both included\".",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `${MODELO}

def validate(form: Form): Either[List[String], User] = {
  val name = form.name.trim
  for {
    n <- (if (name.isEmpty) Left(List("name is required")) else Right(name))
    e <- (form.email.split("@", -1) match {
      case Array(l, d) if l.nonEmpty && d.contains(".") => Right(form.email)
      case _ => Left(List("invalid email"))
    })
    a <- (form.age.trim.toIntOption match {
      case None => Left(List("age must be a number"))
      case Some(x) if x < 18 || x > 120 => Left(List("age must be between 18 and 120"))
      case Some(x) => Right(x)
    })
  } yield User(n, e, a)
}
`,
      why: {
        es: "El `for` corta en el primer `Left`: con varios campos inválidos devuelve un solo error.",
        en: "The `for` stops at the first `Left`: with several invalid fields it returns a single error.",
      },
    },
    {
      code: `${MODELO}

def validate(form: Form): Either[List[String], User] = {
  val nameV: Either[String, String] =
    if (form.name.isEmpty) Left("name is required") else Right(form.name)
  val emailV: Either[String, String] = form.email.split("@", -1) match {
    case Array(l, d) if l.nonEmpty && d.contains(".") => Right(form.email)
    case _ => Left("invalid email")
  }
  val ageV: Either[String, Int] = form.age.trim.toIntOption match {
    case None => Left("age must be a number")
    case Some(a) if a < 18 || a > 120 => Left("age must be between 18 and 120")
    case Some(a) => Right(a)
  }
  (nameV, emailV, ageV) match {
    case (Right(n), Right(e), Right(a)) => Right(User(n, e, a))
    case _ => Left(List(nameV, emailV, ageV).collect { case Left(err) => err })
  }
}
`,
      why: {
        es: "Sin `trim`, un nombre de solo espacios pasa como válido y uno con espacios se guarda sin recortar.",
        en: "Without `trim`, a name of only spaces passes as valid and a padded name is stored untrimmed.",
      },
    },
    {
      code: `${MODELO}

def validate(form: Form): Either[List[String], User] = {
  val nameV: Either[String, String] =
    if (form.name.trim.isEmpty) Left("name is required") else Right(form.name)
  val emailV: Either[String, String] = form.email.split("@", -1) match {
    case Array(l, d) if l.nonEmpty && d.contains(".") => Right(form.email)
    case _ => Left("invalid email")
  }
  val ageV: Either[String, Int] = form.age.trim.toIntOption match {
    case None => Left("age must be a number")
    case Some(a) if a < 18 || a > 120 => Left("age must be between 18 and 120")
    case Some(a) => Right(a)
  }
  (nameV, emailV, ageV) match {
    case (Right(n), Right(e), Right(a)) => Right(User(n, e, a))
    case _ => Left(List(nameV, emailV, ageV).collect { case Left(err) => err })
  }
}
`,
      why: {
        es: "Valida el nombre recortado pero guarda el original, con sus espacios.",
        en: "Validates the trimmed name but stores the original one, spaces included.",
      },
    },
    {
      code: `${MODELO}

def validate(form: Form): Either[List[String], User] = {
  val name = form.name.trim
  val nameV: Either[String, String] =
    if (name.isEmpty) Left("name is required") else Right(name)
  val emailV: Either[String, String] = form.email.split("@", -1) match {
    case Array(l, d) if l.nonEmpty && d.contains(".") => Right(form.email)
    case _ => Left("invalid email")
  }
  val age = form.age.trim.toInt
  val ageV: Either[String, Int] =
    if (age < 18 || age > 120) Left("age must be between 18 and 120") else Right(age)
  (nameV, emailV, ageV) match {
    case (Right(n), Right(e), Right(a)) => Right(User(n, e, a))
    case _ => Left(List(nameV, emailV, ageV).collect { case Left(err) => err })
  }
}
`,
      why: {
        es: "`toInt` lanza `NumberFormatException` cuando la edad no es un número.",
        en: "`toInt` throws `NumberFormatException` when the age isn't a number.",
      },
    },
    {
      code: `${MODELO}

def validate(form: Form): Either[List[String], User] = {
  val name = form.name.trim
  val nameV: Either[String, String] =
    if (name.isEmpty) Left("name is required") else Right(name)
  val emailV: Either[String, String] = form.email.split("@", -1) match {
    case Array(l, d) if l.nonEmpty && d.contains(".") => Right(form.email)
    case _ => Left("invalid email")
  }
  val ageV: Either[String, Int] = form.age.trim.toIntOption match {
    case None => Left("age must be a number")
    case Some(a) if a <= 18 || a > 120 => Left("age must be between 18 and 120")
    case Some(a) => Right(a)
  }
  (nameV, emailV, ageV) match {
    case (Right(n), Right(e), Right(a)) => Right(User(n, e, a))
    case _ => Left(List(nameV, emailV, ageV).collect { case Left(err) => err })
  }
}
`,
      why: {
        es: "Excluye el 18, que la regla incluye.",
        en: "Excludes 18, which the rule includes.",
      },
    },
  ],
  evaluation: {
    kind: "code-tests",
    entrypoint: "validate",
    tests: [
      {
        name: "valido",
        call: `validate(Form("Ana", "ana@mail.com", "30"))`,
        expected: `Right(User("Ana", "ana@mail.com", 30))`,
        hidden: false,
      },
      {
        name: "edad-fuera-de-rango",
        call: `validate(Form("Luis", "luis@mail.com", "15"))`,
        expected: `Left(List("age must be between 18 and 120"))`,
        hidden: false,
      },
      {
        name: "varios-errores",
        call: `validate(Form("", "bad-email", "40"))`,
        expected: `Left(List("name is required", "invalid email"))`,
        hidden: true,
        trap: {
          es: "Varios campos inválidos a la vez: hay que devolver todos los errores, no solo el primero.",
          en: "Several invalid fields at once: every error must be returned, not just the first.",
        },
      },
      {
        name: "nombre-en-blanco",
        call: `validate(Form("   ", "ana@mail.com", "30"))`,
        expected: `Left(List("name is required"))`,
        hidden: true,
        trap: {
          es: "Un nombre hecho solo de espacios no está vacío, pero no es un nombre.",
          en: "A name made only of spaces isn't empty, but it isn't a name.",
        },
      },
      {
        name: "nombre-con-espacios",
        call: `validate(Form("  Ana  ", "ana@mail.com", "30"))`,
        expected: `Right(User("Ana", "ana@mail.com", 30))`,
        hidden: true,
        trap: {
          es: "El nombre válido se guarda recortado, sin los espacios de los extremos.",
          en: "A valid name is stored trimmed, without the surrounding spaces.",
        },
      },
      {
        name: "edad-no-numerica",
        call: `validate(Form("Ana", "ana@mail.com", "treinta"))`,
        expected: `Left(List("age must be a number"))`,
        hidden: true,
        trap: {
          es: "Una edad que no es un número debe dar un error, no lanzar una excepción.",
          en: "An age that isn't a number must yield an error, not throw an exception.",
        },
      },
      {
        name: "edad-limite",
        call: `validate(Form("Ana", "ana@mail.com", "18"))`,
        expected: `Right(User("Ana", "ana@mail.com", 18))`,
        hidden: true,
        trap: {
          es: "18 está dentro del rango: los límites están incluidos.",
          en: "18 is inside the range: the bounds are inclusive.",
        },
      },
    ],
  },
};
