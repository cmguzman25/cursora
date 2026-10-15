import type { Challenge } from "../types";

/**
 * Reto piloto de la sección: el anti-join.
 *
 * La trampa que enseña es la clásica de entrevista: `NOT IN (subconsulta)`
 * devuelve **cero filas** en cuanto la subconsulta trae un NULL, porque
 * `x NOT IN (1, NULL)` es `x <> 1 AND x <> NULL`, y lo segundo es desconocido.
 */
export const challenge: Challenge = {
  slug: "clientes-sin-pedidos",
  title: {
    es: "Clientes que nunca compraron",
    en: "Customers who never ordered",
  },
  difficulty: "basic",
  tags: ["anti-join", "left-join", "null"],
  language: "postgres",
  suggestedMinutes: 10,
  statement: {
    es: `Una tienda en línea guarda sus clientes y sus pedidos en dos tablas:

\`\`\`sql
customers (id int, name text, email text)
orders    (id int, customer_id int, total numeric, created_at date)
\`\`\`

\`orders.customer_id\` puede ser \`NULL\`: son pedidos hechos como invitado.

Escribe una consulta que devuelva los clientes que **nunca** hicieron un pedido.`,
    en: `An online store keeps its customers and orders in two tables:

\`\`\`sql
customers (id int, name text, email text)
orders    (id int, customer_id int, total numeric, created_at date)
\`\`\`

\`orders.customer_id\` may be \`NULL\`: those are guest checkouts.

Write a query that returns the customers who have **never** placed an order.`,
  },
  output: {
    columns: ["id", "name"],
    order: { es: "por id ascendente", en: "by id ascending" },
  },
  starterCode: `-- Escribe tu consulta aquí
SELECT
FROM customers c
`,
  hints: [
    {
      es: "Necesitas los clientes para los que **no existe** una fila en `orders`. Hay al menos tres formas de decir eso en SQL.",
      en: "You need the customers for which **no** row exists in `orders`. There are at least three ways to say that in SQL.",
    },
    {
      es: "Un `LEFT JOIN` conserva todos los clientes; los que no tienen pedido quedan con las columnas de `orders` en `NULL`.",
      en: "A `LEFT JOIN` keeps every customer; those without orders end up with the `orders` columns set to `NULL`.",
    },
    {
      es: "Si usas `NOT IN (SELECT customer_id FROM orders)`, piensa qué pasa cuando esa lista contiene un `NULL`.",
      en: "If you use `NOT IN (SELECT customer_id FROM orders)`, think about what happens when that list contains a `NULL`.",
    },
  ],
  solution: {
    code: `SELECT c.id, c.name
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
)
ORDER BY c.id;`,
    explanation: {
      es: `\`NOT EXISTS\` pregunta, cliente por cliente, si hay **alguna** fila en \`orders\` que lo referencie. No le afectan los \`NULL\` de \`customer_id\`: la comparación \`o.customer_id = c.id\` con un NULL da *desconocido*, esa fila no cuenta, y nada más.

Una alternativa equivalente es el anti-join con \`LEFT JOIN\`:

\`\`\`sql
SELECT c.id, c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL
ORDER BY c.id;
\`\`\`

Fíjate en que el filtro es sobre \`o.id\` (la clave primaria, que nunca es NULL en una fila real) y no sobre una columna que podría ser NULL por sí misma.`,
      en: `\`NOT EXISTS\` asks, customer by customer, whether **any** row in \`orders\` references it. NULLs in \`customer_id\` don't affect it: \`o.customer_id = c.id\` against a NULL is *unknown*, that row doesn't count, and that's all.

An equivalent alternative is the \`LEFT JOIN\` anti-join:

\`\`\`sql
SELECT c.id, c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL
ORDER BY c.id;
\`\`\`

Note the filter is on \`o.id\` (the primary key, never NULL on a real row), not on a column that could be NULL on its own.`,
    },
    pitfalls: [
      {
        es: "**`NOT IN` con NULLs.** `id NOT IN (1, 2, NULL)` equivale a `id <> 1 AND id <> 2 AND id <> NULL`; lo último es desconocido, así que la condición nunca es verdadera y la consulta devuelve cero filas. Con un solo pedido de invitado, el resultado queda vacío.",
        en: "**`NOT IN` with NULLs.** `id NOT IN (1, 2, NULL)` means `id <> 1 AND id <> 2 AND id <> NULL`; the last part is unknown, so the condition is never true and the query returns zero rows. A single guest checkout empties the result.",
      },
      {
        es: "**Olvidar el `ORDER BY`.** Sin él, Postgres no garantiza ningún orden: devuelve las filas como le resulte más cómodo según el plan de ejecución. Con datos guardados en orden de `id` parece funcionar, y deja de hacerlo en cuanto no lo están.",
        en: "**Forgetting `ORDER BY`.** Without it, Postgres guarantees no order: it returns rows however suits the execution plan. With data stored in `id` order it seems to work, and stops working as soon as it isn't.",
      },
      {
        es: "**Usar `JOIN` en vez de `LEFT JOIN`.** Un `INNER JOIN` descarta justamente a los clientes sin pedidos, que son los que buscas.",
        en: "**Using `JOIN` instead of `LEFT JOIN`.** An `INNER JOIN` drops exactly the customers without orders — the ones you want.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `SELECT id, name FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders)
ORDER BY id;`,
      why: {
        es: "Falla en cuanto hay un pedido de invitado (customer_id NULL): devuelve cero filas.",
        en: "Fails as soon as there is a guest order (NULL customer_id): returns zero rows.",
      },
    },
    {
      code: `SELECT c.id, c.name FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);`,
      why: {
        es: "La lógica es correcta pero no tiene ORDER BY: pasa mientras los datos estén guardados en orden de id.",
        en: "The logic is right but there is no ORDER BY: it passes only while the data is stored in id order.",
      },
    },
  ],
  evaluation: {
    kind: "sql-query",
    orderMatters: true,
    schema: `CREATE TABLE customers (id int PRIMARY KEY, name text NOT NULL, email text);
CREATE TABLE orders (
  id int PRIMARY KEY,
  customer_id int REFERENCES customers(id),
  total numeric(10,2) NOT NULL,
  created_at date NOT NULL
);`,
    datasets: [
      {
        name: "ejemplo",
        hidden: false,
        seed: `INSERT INTO customers VALUES
  (1, 'Ana', 'ana@mail.com'),
  (2, 'Bruno', 'bruno@mail.com'),
  (3, 'Carla', NULL),
  (4, 'Diego', 'diego@mail.com');
INSERT INTO orders VALUES
  (10, 1, 120.00, '2024-03-01'),
  (11, 1, 35.50, '2024-03-04'),
  (12, 3, 80.00, '2024-03-07');`,
      },
      {
        name: "pedidos-de-invitado",
        hidden: true,
        trap: {
          es: "Hay pedidos con customer_id NULL (compras como invitado).",
          en: "There are orders with a NULL customer_id (guest checkouts).",
        },
        seed: `INSERT INTO customers VALUES
  (1, 'Ana', 'ana@mail.com'),
  (2, 'Bruno', NULL),
  (5, 'Elena', 'elena@mail.com');
INSERT INTO orders VALUES
  (20, 1, 50.00, '2024-04-01'),
  (21, NULL, 15.00, '2024-04-02'),
  (22, NULL, 99.90, '2024-04-03');`,
      },
      {
        name: "sin-pedidos",
        hidden: true,
        trap: {
          es: "La tabla de pedidos está vacía: todos los clientes califican.",
          en: "The orders table is empty: every customer qualifies.",
        },
        seed: `INSERT INTO customers VALUES
  (3, 'Carla', 'carla@mail.com'),
  (7, 'Gael', NULL),
  (9, 'Inés', 'ines@mail.com');`,
      },
      {
        name: "clientes-desordenados",
        hidden: true,
        trap: {
          es: "Los clientes no están guardados en orden de id: sin ORDER BY, el resultado sale desordenado.",
          en: "Customers are not stored in id order: without ORDER BY, the result comes out unordered.",
        },
        seed: `INSERT INTO customers VALUES
  (12, 'Lucía', 'lucia@mail.com'),
  (3, 'Carla', NULL),
  (8, 'Hugo', 'hugo@mail.com'),
  (1, 'Ana', 'ana@mail.com'),
  (10, 'Julia', NULL),
  (5, 'Elena', 'elena@mail.com'),
  (7, 'Gael', 'gael@mail.com');
INSERT INTO orders VALUES
  (40, 1, 25.00, '2024-06-01'),
  (41, 7, 60.00, '2024-06-02'),
  (42, 7, 12.50, '2024-06-03');`,
      },
      {
        name: "todos-compraron",
        hidden: true,
        trap: {
          es: "Todos los clientes compraron (algunos varias veces): el resultado correcto es vacío.",
          en: "Every customer ordered (some several times): the correct result is empty.",
        },
        seed: `INSERT INTO customers VALUES
  (1, 'Ana', 'ana@mail.com'),
  (2, 'Bruno', 'bruno@mail.com');
INSERT INTO orders VALUES
  (30, 1, 10.00, '2024-05-01'),
  (31, 2, 20.00, '2024-05-02'),
  (32, 2, 30.00, '2024-05-03');`,
      },
    ],
  },
};
