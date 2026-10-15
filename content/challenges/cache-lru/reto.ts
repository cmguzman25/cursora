import type { Challenge } from "../types";

/**
 * Caché LRU: diseño de estructura con O(1) por operación.
 *
 * Las trampas son las de una entrevista real: `get` también cuenta como uso,
 * `put` sobre una clave existente la refresca, el desborde de capacidad por
 * uno, y la versión con lista que es correcta pero lineal.
 */

const MODELO = `sealed trait Op
case class Get(key: Int) extends Op
case class Put(key: Int, value: Int) extends Op`;

export const challenge: Challenge = {
  slug: "cache-lru",
  title: {
    es: "Caché LRU",
    en: "LRU cache",
  },
  difficulty: "advanced",
  tags: ["data-structures", "linked-hash-map", "complexity", "design"],
  language: "scala",
  suggestedMinutes: 35,
  statement: {
    es: `Una caché **LRU** (*least recently used*) guarda como mucho \`capacity\` claves. Cuando se llena, descarta la que lleva **más tiempo sin usarse**.

Las operaciones llegan como una lista:

\`\`\`scala
${MODELO}
\`\`\`

Escribe \`simulate(capacity: Int, ops: List[Op]): List[Option[Int]]\`, que aplica las operaciones en orden y devuelve el resultado de cada \`Get\`, en orden:

- \`Get(k)\` devuelve \`Some(valor)\` si \`k\` está en la caché, o \`None\`. Si estaba, **cuenta como uso**.
- \`Put(k, v)\` guarda \`v\` en \`k\` y cuenta como uso. Si \`k\` ya existía, actualiza su valor. Si es nueva y la caché está llena, primero descarta la menos usada recientemente.
- \`capacity >= 1\`. Puede haber **cientos de miles de operaciones** y una capacidad de decenas de miles: cada operación tiene que ser O(1).`,
    en: `An **LRU** (*least recently used*) cache holds at most \`capacity\` keys. When full, it evicts the one that has gone **unused the longest**.

Operations arrive as a list:

\`\`\`scala
${MODELO}
\`\`\`

Write \`simulate(capacity: Int, ops: List[Op]): List[Option[Int]]\`, which applies the operations in order and returns each \`Get\`'s result, in order:

- \`Get(k)\` returns \`Some(value)\` if \`k\` is cached, otherwise \`None\`. If it was cached, it **counts as a use**.
- \`Put(k, v)\` stores \`v\` under \`k\` and counts as a use. If \`k\` already existed, its value is updated. If it's new and the cache is full, first evict the least recently used key.
- \`capacity >= 1\`. There may be **hundreds of thousands of operations** and a capacity in the tens of thousands: each operation must be O(1).`,
  },
  starterCode: `// No cambies estas definiciones: los tests las usan.
${MODELO}

def simulate(capacity: Int, ops: List[Op]): List[Option[Int]] = {
  ???
}
`,
  hints: [
    {
      es: "Necesitas dos cosas en O(1): buscar una clave y saber cuál es la menos usada. Un mapa da lo primero; ¿qué da lo segundo?",
      en: "You need two things in O(1): looking up a key and knowing which one is least recently used. A map gives the first; what gives the second?",
    },
    {
      es: "`scala.collection.mutable.LinkedHashMap` recuerda el orden de inserción. Si \"usar\" una clave es quitarla y volver a insertarla, la primera del mapa es la menos usada.",
      en: "`scala.collection.mutable.LinkedHashMap` remembers insertion order. If \"using\" a key means removing and re-inserting it, the map's first key is the least recently used.",
    },
    {
      es: "Ojo: `put` sobre una clave que ya existe **no** la mueve al final en un `LinkedHashMap`. Hay que quitarla primero.",
      en: "Careful: `put` on an existing key does **not** move it to the end of a `LinkedHashMap`. You have to remove it first.",
    },
  ],
  solution: {
    code: `${MODELO}

def simulate(capacity: Int, ops: List[Op]): List[Option[Int]] = {
  val cache = scala.collection.mutable.LinkedHashMap.empty[Int, Int]
  val results = List.newBuilder[Option[Int]]

  def touch(key: Int, value: Int): Unit = {
    cache.remove(key)
    cache.put(key, value)
  }

  ops.foreach {
    case Get(k) =>
      val found = cache.get(k)
      found.foreach(v => touch(k, v))
      results += found
    case Put(k, v) =>
      if (!cache.contains(k) && cache.size >= capacity) {
        cache.remove(cache.head._1)
      }
      touch(k, v)
  }
  results.result()
}
`,
    explanation: {
      es: `El \`LinkedHashMap\` mutable combina un hash map (búsqueda en O(1)) con una lista doblemente enlazada que recuerda el orden de inserción. Si cada uso de una clave la **quita y la vuelve a insertar**, el orden del mapa es el orden de uso, y \`cache.head\` es siempre la menos usada recientemente.

- **\`Get\`** también es un uso: si la clave está, se refresca.
- **\`Put\`** de una clave existente actualiza el valor **y** la refresca. En un \`LinkedHashMap\`, \`put\` sobre una clave existente conserva su posición, por eso \`touch\` hace \`remove\` primero.
- **El desalojo** se hace antes de insertar y solo si la clave es nueva y la caché está llena (\`size >= capacity\`). Con \`>\` se aceptaría una clave de más.

La implementación clásica de entrevista es un \`HashMap\` más una lista doblemente enlazada escrita a mano. Conviene nombrarla y explicar que \`LinkedHashMap\` es exactamente eso. Una lista inmutable con \`filterNot\` en cada uso es correcta, pero cada operación es O(capacidad).`,
      en: `The mutable \`LinkedHashMap\` combines a hash map (O(1) lookup) with a doubly linked list that remembers insertion order. If every use of a key **removes and re-inserts it**, the map's order is the usage order, and \`cache.head\` is always the least recently used.

- **\`Get\`** is also a use: if the key is present, it gets refreshed.
- **\`Put\`** on an existing key updates the value **and** refreshes it. In a \`LinkedHashMap\`, \`put\` on an existing key keeps its position, which is why \`touch\` does \`remove\` first.
- **Eviction** happens before inserting, and only when the key is new and the cache is full (\`size >= capacity\`). With \`>\` it would accept one key too many.

The classic interview implementation is a \`HashMap\` plus a hand-written doubly linked list. It's worth naming it and explaining that \`LinkedHashMap\` is exactly that. An immutable list with \`filterNot\` on every use is correct, but each operation is O(capacity).`,
    },
    pitfalls: [
      {
        es: "**`Get` no refresca.** Eso es una caché FIFO, no LRU: se descarta una clave que se acaba de leer.",
        en: "**`Get` doesn't refresh.** That's a FIFO cache, not LRU: it evicts a key that was just read.",
      },
      {
        es: "**`put` sobre una clave existente sin quitarla.** En un `LinkedHashMap` conserva su posición vieja y se descarta antes de tiempo.",
        en: "**`put` on an existing key without removing it.** In a `LinkedHashMap` it keeps its old position and gets evicted too early.",
      },
      {
        es: "**Desalojar con `>`.** Comprobar `size > capacity` antes de insertar deja una clave de más.",
        en: "**Evicting with `>`.** Checking `size > capacity` before inserting leaves one key too many.",
      },
      {
        es: "**Lista para el orden de uso.** Es correcta, pero cada operación recorre la lista: con muchas operaciones no termina a tiempo.",
        en: "**A list for usage order.** It's correct, but every operation walks the list: with many operations it doesn't finish in time.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `${MODELO}

def simulate(capacity: Int, ops: List[Op]): List[Option[Int]] = {
  val cache = scala.collection.mutable.LinkedHashMap.empty[Int, Int]
  val results = List.newBuilder[Option[Int]]
  ops.foreach {
    case Get(k) => results += cache.get(k)
    case Put(k, v) =>
      if (!cache.contains(k) && cache.size >= capacity) cache.remove(cache.head._1)
      cache.remove(k)
      cache.put(k, v)
  }
  results.result()
}
`,
      why: {
        es: "`Get` no refresca la clave: se comporta como FIFO.",
        en: "`Get` doesn't refresh the key: it behaves like FIFO.",
      },
    },
    {
      code: `${MODELO}

def simulate(capacity: Int, ops: List[Op]): List[Option[Int]] = {
  val cache = scala.collection.mutable.LinkedHashMap.empty[Int, Int]
  val results = List.newBuilder[Option[Int]]
  ops.foreach {
    case Get(k) =>
      val found = cache.get(k)
      found.foreach { v => cache.remove(k); cache.put(k, v) }
      results += found
    case Put(k, v) =>
      if (!cache.contains(k) && cache.size >= capacity) cache.remove(cache.head._1)
      cache.put(k, v)
  }
  results.result()
}
`,
      why: {
        es: "`put` sobre una clave existente no la mueve al final: conserva su posición vieja.",
        en: "`put` on an existing key doesn't move it to the end: it keeps its old position.",
      },
    },
    {
      code: `${MODELO}

def simulate(capacity: Int, ops: List[Op]): List[Option[Int]] = {
  val cache = scala.collection.mutable.LinkedHashMap.empty[Int, Int]
  val results = List.newBuilder[Option[Int]]
  def touch(k: Int, v: Int): Unit = { cache.remove(k); cache.put(k, v) }
  ops.foreach {
    case Get(k) =>
      val found = cache.get(k)
      found.foreach(v => touch(k, v))
      results += found
    case Put(k, v) =>
      if (!cache.contains(k) && cache.size > capacity) cache.remove(cache.head._1)
      touch(k, v)
  }
  results.result()
}
`,
      why: {
        es: "Desaloja con `>`: la caché guarda una clave más que su capacidad.",
        en: "Evicts with `>`: the cache holds one key more than its capacity.",
      },
    },
    {
      code: `${MODELO}

def simulate(capacity: Int, ops: List[Op]): List[Option[Int]] = {
  var order = List.empty[(Int, Int)]
  val results = List.newBuilder[Option[Int]]
  ops.foreach {
    case Get(k) =>
      val found = order.find(_._1 == k).map(_._2)
      found.foreach(v => order = order.filterNot(_._1 == k) :+ ((k, v)))
      results += found
    case Put(k, v) =>
      val rest = order.filterNot(_._1 == k)
      val trimmed = if (rest.size == order.size && rest.size >= capacity) rest.tail else rest
      order = trimmed :+ ((k, v))
  }
  results.result()
}
`,
      why: {
        es: "Correcta, pero cada operación recorre la lista: con muchas operaciones no termina a tiempo.",
        en: "Correct, but every operation walks the list: with many operations it doesn't finish in time.",
      },
    },
  ],
  evaluation: {
    kind: "code-tests",
    entrypoint: "simulate",
    tests: [
      {
        name: "ejemplo",
        call: `simulate(2, List(Put(1, 1), Put(2, 2), Get(1), Get(3)))`,
        expected: `List(Some(1), None)`,
        hidden: false,
      },
      {
        name: "get-refresca",
        call: `simulate(2, List(Put(1, 1), Put(2, 2), Get(1), Put(3, 3), Get(2), Get(1), Get(3)))`,
        expected: `List(Some(1), None, Some(1), Some(3))`,
        hidden: true,
        trap: {
          es: "Leer una clave cuenta como uso: la que se descarta es la otra.",
          en: "Reading a key counts as a use: the other one gets evicted.",
        },
      },
      {
        name: "put-existente",
        call: `simulate(2, List(Put(1, 1), Put(2, 2), Put(1, 10), Put(3, 3), Get(1), Get(2), Get(3)))`,
        expected: `List(Some(10), None, Some(3))`,
        hidden: true,
        trap: {
          es: "Un `Put` sobre una clave existente actualiza el valor y también cuenta como uso.",
          en: "A `Put` on an existing key updates the value and also counts as a use.",
        },
      },
      {
        name: "capacidad-uno",
        call: `simulate(1, List(Put(1, 1), Put(2, 2), Get(1), Get(2)))`,
        expected: `List(None, Some(2))`,
        hidden: true,
        trap: {
          es: "Con capacidad 1, cada clave nueva desaloja a la anterior: nunca hay dos.",
          en: "With capacity 1, every new key evicts the previous one: there are never two.",
        },
      },
      {
        name: "entrada-grande",
        call: `simulate(50000, ((0 until 100000).map(i => Put(i, i): Op) ++ (0 until 100000).map(i => Get(i): Op)).toList)`,
        expected: `List.fill(50000)(None) ++ (50000 until 100000).map(i => Some(i))`,
        hidden: true,
        trap: {
          es: "200 000 operaciones con capacidad 50 000: recorrer una lista en cada operación no termina a tiempo.",
          en: "200,000 operations with capacity 50,000: walking a list on every operation doesn't finish in time.",
        },
      },
    ],
  },
};
