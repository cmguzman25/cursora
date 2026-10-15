import type { Challenge } from "../types";

/**
 * Case classes + `foldLeft`: aplicar una secuencia de operaciones a un estado.
 *
 * Las trampas son de reglas de negocio: qué se hace con una operación rechazada
 * (no a medias), y la transferencia a sí misma, que rompe la versión que lee el
 * mapa viejo dos veces.
 */

const MODELO = `sealed trait Tx
case class Deposit(account: String, amount: Int) extends Tx
case class Withdraw(account: String, amount: Int) extends Tx
case class Transfer(from: String, to: String, amount: Int) extends Tx`;

export const challenge: Challenge = {
  slug: "saldo-de-cuentas",
  title: {
    es: "Saldo de cuentas",
    en: "Account balances",
  },
  difficulty: "medium",
  tags: ["fold", "case-class", "pattern-matching", "immutability"],
  language: "scala",
  suggestedMinutes: 20,
  statement: {
    es: `Un banco registra sus movimientos en orden:

\`\`\`scala
${MODELO}
\`\`\`

Escribe \`balances(txs: List[Tx]): Map[String, Int]\`, que aplica los movimientos en orden y devuelve el saldo final de cada cuenta:

- Toda cuenta empieza con saldo **0**.
- Un \`Withdraw\` o un \`Transfer\` que dejaría la cuenta de origen **en negativo** se **rechaza entero**: no cambia ningún saldo.
- En el resultado aparece **toda cuenta mencionada** en algún movimiento, aunque ese movimiento se haya rechazado.
- Los montos siempre son positivos.`,
    en: `A bank records its transactions in order:

\`\`\`scala
${MODELO}
\`\`\`

Write \`balances(txs: List[Tx]): Map[String, Int]\`, which applies the transactions in order and returns each account's final balance:

- Every account starts with balance **0**.
- A \`Withdraw\` or \`Transfer\` that would leave the source account **negative** is **rejected entirely**: no balance changes.
- The result includes **every account mentioned** in some transaction, even if that transaction was rejected.
- Amounts are always positive.`,
  },
  starterCode: `// No cambies estas definiciones: los tests las usan.
${MODELO}

def balances(txs: List[Tx]): Map[String, Int] = {
  ???
}
`,
  hints: [
    {
      es: "El estado es un `Map[String, Int]` y cada movimiento lo transforma en otro: es un `foldLeft`.",
      en: "The state is a `Map[String, Int]` and each transaction turns it into another one: that's a `foldLeft`.",
    },
    {
      es: "Para que las cuentas mencionadas aparezcan aunque se rechace el movimiento, registra las cuentas en 0 **antes** de decidir si se aplica.",
      en: "For mentioned accounts to appear even when the transaction is rejected, register them at 0 **before** deciding whether to apply it.",
    },
    {
      es: "En una transferencia, si `from == to`, ¿qué pasa si calculas los dos saldos nuevos a partir del mismo mapa viejo?",
      en: "In a transfer, if `from == to`, what happens if you compute both new balances from the same old map?",
    },
  ],
  solution: {
    code: `${MODELO}

def balances(txs: List[Tx]): Map[String, Int] = {
  def touch(m: Map[String, Int], accounts: String*): Map[String, Int] =
    accounts.foldLeft(m)((acc, a) => if (acc.contains(a)) acc else acc.updated(a, 0))

  txs.foldLeft(Map.empty[String, Int]) { (m, tx) =>
    tx match {
      case Deposit(a, amount) =>
        val m1 = touch(m, a)
        m1.updated(a, m1(a) + amount)
      case Withdraw(a, amount) =>
        val m1 = touch(m, a)
        if (m1(a) < amount) m1 else m1.updated(a, m1(a) - amount)
      case Transfer(from, to, amount) =>
        val m1 = touch(m, from, to)
        if (m1(from) < amount) m1
        else {
          val debited = m1.updated(from, m1(from) - amount)
          debited.updated(to, debited(to) + amount)
        }
    }
  }
}
`,
    explanation: {
      es: `\`foldLeft\` recorre los movimientos en orden, llevando el mapa de saldos como acumulador. Cada caso del \`match\` devuelve el mapa siguiente, sin mutar nada.

\`touch\` registra en 0 las cuentas que aún no existen. Se llama **antes** de decidir si el movimiento se aplica, así que una cuenta mencionada solo en un movimiento rechazado aparece igual con saldo 0.

En la transferencia, el crédito se calcula sobre el mapa **ya debitado** (\`debited(to)\`), no sobre el original. Con dos cuentas distintas da lo mismo. Con \`from == to\`, leer dos veces el mapa original hace que el segundo \`updated\` pise al primero y la cuenta gane el monto de la nada.

Si el origen no alcanza, se devuelve \`m1\` tal cual: el rechazo es entero, y el destino no recibe nada.`,
      en: `\`foldLeft\` walks the transactions in order, carrying the balance map as the accumulator. Each \`match\` case returns the next map without mutating anything.

\`touch\` registers missing accounts at 0. It's called **before** deciding whether the transaction applies, so an account mentioned only in a rejected transaction still shows up with balance 0.

In a transfer, the credit is computed on the **already debited** map (\`debited(to)\`), not on the original one. With two different accounts it makes no difference. With \`from == to\`, reading the original map twice makes the second \`updated\` overwrite the first, and the account gains the amount out of thin air.

If the source can't cover it, \`m1\` is returned as is: the rejection is complete, and the destination receives nothing.`,
    },
    pitfalls: [
      {
        es: "**No rechazar.** Restar sin comprobar el saldo deja cuentas en negativo.",
        en: "**Not rejecting.** Subtracting without checking the balance leaves accounts negative.",
      },
      {
        es: "**Rechazar a medias.** Si la transferencia no alcanza, el destino tampoco debe recibir nada.",
        en: "**Half-rejecting.** If the transfer can't be covered, the destination must not receive anything either.",
      },
      {
        es: "**Transferencia a sí misma.** `m.updated(from, m(from) - x).updated(to, m(to) + x)` lee el mapa viejo dos veces: con `from == to`, la cuenta gana `x`.",
        en: "**Self-transfer.** `m.updated(from, m(from) - x).updated(to, m(to) + x)` reads the old map twice: with `from == to`, the account gains `x`.",
      },
      {
        es: "**Cuentas de movimientos rechazados.** Si solo se registran al aplicar, no aparecen en el resultado.",
        en: "**Accounts from rejected transactions.** If they're only registered when applied, they're missing from the result.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `${MODELO}

def balances(txs: List[Tx]): Map[String, Int] =
  txs.foldLeft(Map.empty[String, Int].withDefaultValue(0)) { (m, tx) =>
    tx match {
      case Deposit(a, x) => m.updated(a, m(a) + x)
      case Withdraw(a, x) => m.updated(a, m(a) - x)
      case Transfer(f, t, x) =>
        val d = m.updated(f, m(f) - x)
        d.updated(t, d(t) + x)
    }
  }
`,
      why: {
        es: "No rechaza nada: los saldos pueden quedar negativos.",
        en: "Rejects nothing: balances can go negative.",
      },
    },
    {
      code: `${MODELO}

def balances(txs: List[Tx]): Map[String, Int] =
  txs.foldLeft(Map.empty[String, Int]) { (m0, tx) =>
    val m = tx match {
      case Deposit(a, _) => m0 + (a -> m0.getOrElse(a, 0))
      case Withdraw(a, _) => m0 + (a -> m0.getOrElse(a, 0))
      case Transfer(f, t, _) => m0 + (f -> m0.getOrElse(f, 0)) + (t -> m0.getOrElse(t, 0))
    }
    tx match {
      case Deposit(a, x) => m.updated(a, m(a) + x)
      case Withdraw(a, x) => if (m(a) < x) m else m.updated(a, m(a) - x)
      case Transfer(f, t, x) =>
        if (m(f) < x) m else m.updated(f, m(f) - x).updated(t, m(t) + x)
    }
  }
`,
      why: {
        es: "Calcula el crédito sobre el mapa viejo: una transferencia a sí misma regala el monto.",
        en: "Computes the credit on the old map: a self-transfer gives the amount away for free.",
      },
    },
    {
      code: `${MODELO}

def balances(txs: List[Tx]): Map[String, Int] =
  txs.foldLeft(Map.empty[String, Int]) { (m0, tx) =>
    val m = tx match {
      case Deposit(a, _) => m0 + (a -> m0.getOrElse(a, 0))
      case Withdraw(a, _) => m0 + (a -> m0.getOrElse(a, 0))
      case Transfer(f, t, _) => m0 + (f -> m0.getOrElse(f, 0)) + (t -> m0.getOrElse(t, 0))
    }
    tx match {
      case Deposit(a, x) => m.updated(a, m(a) + x)
      case Withdraw(a, x) => if (m(a) < x) m else m.updated(a, m(a) - x)
      case Transfer(f, t, x) =>
        val credited = m.updated(t, m(t) + x)
        if (m(f) < x) credited else credited.updated(f, credited(f) - x)
    }
  }
`,
      why: {
        es: "Acredita al destino antes de comprobar el origen: una transferencia rechazada igual le suma.",
        en: "Credits the destination before checking the source: a rejected transfer still adds to it.",
      },
    },
    {
      code: `${MODELO}

def balances(txs: List[Tx]): Map[String, Int] =
  txs.foldLeft(Map.empty[String, Int]) { (m, tx) =>
    def bal(a: String) = m.getOrElse(a, 0)
    tx match {
      case Deposit(a, x) => m.updated(a, bal(a) + x)
      case Withdraw(a, x) => if (bal(a) < x) m else m.updated(a, bal(a) - x)
      case Transfer(f, t, x) =>
        if (bal(f) < x) m
        else {
          val d = m.updated(f, bal(f) - x)
          d.updated(t, d.getOrElse(t, 0) + x)
        }
    }
  }
`,
      why: {
        es: "Solo registra una cuenta cuando se le aplica un movimiento: las de movimientos rechazados no aparecen.",
        en: "Only registers an account when a transaction applies to it: accounts from rejected transactions are missing.",
      },
    },
  ],
  evaluation: {
    kind: "code-tests",
    entrypoint: "balances",
    tests: [
      {
        name: "ejemplo",
        call: `balances(List(Deposit("ana", 100), Withdraw("ana", 30), Transfer("ana", "bob", 50)))`,
        expected: `Map("ana" -> 20, "bob" -> 50)`,
        hidden: false,
      },
      {
        name: "retiro-rechazado",
        call: `balances(List(Deposit("ana", 10), Withdraw("ana", 30), Withdraw("ana", 5)))`,
        expected: `Map("ana" -> 5)`,
        hidden: true,
        trap: {
          es: "Un retiro mayor que el saldo se rechaza, y los siguientes se siguen aplicando.",
          en: "A withdrawal larger than the balance is rejected, and later ones still apply.",
        },
      },
      {
        name: "transferencia-rechazada",
        call: `balances(List(Deposit("ana", 10), Transfer("ana", "bob", 50)))`,
        expected: `Map("ana" -> 10, "bob" -> 0)`,
        hidden: true,
        trap: {
          es: "Una transferencia sin saldo suficiente no le acredita nada al destino.",
          en: "A transfer without enough balance credits nothing to the destination.",
        },
      },
      {
        name: "transferencia-a-si-misma",
        call: `balances(List(Deposit("ana", 10), Transfer("ana", "ana", 10)))`,
        expected: `Map("ana" -> 10)`,
        hidden: true,
        trap: {
          es: "Una transferencia de una cuenta a sí misma no cambia su saldo.",
          en: "A transfer from an account to itself doesn't change its balance.",
        },
      },
      {
        name: "solo-rechazados",
        call: `balances(List(Withdraw("zoe", 5)))`,
        expected: `Map("zoe" -> 0)`,
        hidden: true,
        trap: {
          es: "Una cuenta mencionada solo en un movimiento rechazado aparece con saldo 0.",
          en: "An account mentioned only in a rejected transaction shows up with balance 0.",
        },
      },
    ],
  },
};
