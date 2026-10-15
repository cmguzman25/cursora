import type { Challenge } from "../types";

/**
 * Reto medio: retención D1 (la métrica de producto más pedida en entrevistas de
 * data). Tres trampas independientes, cada una con su caso oculto:
 *
 * - **División entera**: `100 * retenidos / altas` con enteros trunca 33,33 a 33.
 * - **Eventos duplicados**: un usuario con dos eventos al día siguiente, contado
 *   sobre el JOIN sin deduplicar, infla retenidos y altas.
 * - **Días sin retención**: con INNER JOIN, un día en que nadie volvió desaparece
 *   del resultado en vez de salir con 0 %.
 */
export const challenge: Challenge = {
  slug: "retencion-dia-siguiente",
  title: {
    es: "Retención al día siguiente",
    en: "Next-day retention",
  },
  difficulty: "medium",
  tags: ["left-join", "group-by", "count-distinct", "division"],
  language: "postgres",
  suggestedMinutes: 20,
  statement: {
    es: `Una app guarda cuándo se registra cada usuario y los eventos que genera al usarla:

\`\`\`sql
users  (id int, signup_date date)
events (id int, user_id int, event_date date, event_type text)
\`\`\`

Producto quiere la **retención al día siguiente** por fecha de registro: de los usuarios que se registraron un día, qué porcentaje generó **al menos un evento** el día siguiente.

Para cada \`signup_date\` devuelve:

- \`signups\`: cuántos usuarios se registraron ese día.
- \`retained\`: cuántos de ellos tuvieron algún evento exactamente el día siguiente a su registro.
- \`retention_pct\`: \`retained\` sobre \`signups\`, en porcentaje, redondeado a **2 decimales** (por ejemplo, \`33.33\`).

Toda fecha con registros tiene que aparecer, aunque nadie haya vuelto.`,
    en: `An app stores when each user signed up and the events they generate while using it:

\`\`\`sql
users  (id int, signup_date date)
events (id int, user_id int, event_date date, event_type text)
\`\`\`

Product wants **next-day retention** by signup date: of the users who signed up on a given day, what percentage generated **at least one event** the following day.

For each \`signup_date\` return:

- \`signups\`: how many users signed up that day.
- \`retained\`: how many of them had any event exactly the day after signing up.
- \`retention_pct\`: \`retained\` over \`signups\`, as a percentage, rounded to **2 decimals** (e.g. \`33.33\`).

Every date with signups must appear, even if nobody came back.`,
  },
  output: {
    columns: ["signup_date", "signups", "retained", "retention_pct"],
    order: { es: "por signup_date ascendente", en: "by signup_date ascending" },
  },
  starterCode: `-- Escribe tu consulta aquí
SELECT
FROM users u
`,
  hints: [
    {
      es: "Piensa primero en una fila por usuario: ¿volvió o no al día siguiente? Después agrupa por fecha de registro.",
      en: "First think of one row per user: did they come back the next day or not? Then group by signup date.",
    },
    {
      es: "Un usuario puede generar varios eventos el día siguiente. ¿Estás contando usuarios o eventos?",
      en: "A user can generate several events the next day. Are you counting users or events?",
    },
    {
      es: "Si un día nadie volvió, ¿tu JOIN conserva a esos usuarios? Y revisa el tipo de la división: en Postgres `1 / 3` es `0`.",
      en: "If nobody came back on some day, does your JOIN keep those users? And check the division type: in Postgres `1 / 3` is `0`.",
    },
  ],
  solution: {
    code: `SELECT u.signup_date,
       COUNT(*) AS signups,
       COUNT(r.user_id) AS retained,
       ROUND(100.0 * COUNT(r.user_id) / COUNT(*), 2) AS retention_pct
FROM users u
LEFT JOIN (
  SELECT DISTINCT user_id, event_date FROM events
) r ON r.user_id = u.id
   AND r.event_date = u.signup_date + 1
GROUP BY u.signup_date
ORDER BY u.signup_date;`,
    explanation: {
      es: `La consulta arma **una fila por usuario** y recién después agrupa:

1. La subconsulta \`SELECT DISTINCT user_id, event_date\` deja un evento por usuario y día. Así, el JOIN con el día siguiente produce **como mucho una fila por usuario**, tenga uno o diez eventos ese día.
2. El \`LEFT JOIN\` conserva a todos los usuarios. Los que no volvieron quedan con \`r.user_id\` en NULL.
3. \`COUNT(*)\` cuenta usuarios (una fila cada uno) y \`COUNT(r.user_id)\` cuenta solo los que volvieron, porque \`COUNT(columna)\` ignora los NULL.
4. \`100.0 *\` convierte la cuenta a \`numeric\` antes de dividir; sin eso, la división es entera.

Una alternativa igual de buena usa \`EXISTS\` en un \`CASE\`:

\`\`\`sql
SELECT signup_date,
       COUNT(*) AS signups,
       COUNT(*) FILTER (WHERE volvio) AS retained,
       ROUND(100.0 * COUNT(*) FILTER (WHERE volvio) / COUNT(*), 2) AS retention_pct
FROM (
  SELECT u.signup_date,
         EXISTS (SELECT 1 FROM events e
                 WHERE e.user_id = u.id AND e.event_date = u.signup_date + 1) AS volvio
  FROM users u
) t
GROUP BY signup_date
ORDER BY signup_date;
\`\`\`

\`EXISTS\` no puede duplicar filas, así que ni siquiera hace falta el \`DISTINCT\`.`,
      en: `The query builds **one row per user** and only then groups:

1. The subquery \`SELECT DISTINCT user_id, event_date\` keeps one event per user and day. So the join on the next day yields **at most one row per user**, whether they had one event that day or ten.
2. The \`LEFT JOIN\` keeps every user. Those who didn't come back end up with \`r.user_id\` as NULL.
3. \`COUNT(*)\` counts users (one row each) and \`COUNT(r.user_id)\` counts only those who came back, because \`COUNT(column)\` ignores NULLs.
4. \`100.0 *\` turns the count into \`numeric\` before dividing; without it, the division is integer.

An equally good alternative uses \`EXISTS\`:

\`\`\`sql
SELECT signup_date,
       COUNT(*) AS signups,
       COUNT(*) FILTER (WHERE came_back) AS retained,
       ROUND(100.0 * COUNT(*) FILTER (WHERE came_back) / COUNT(*), 2) AS retention_pct
FROM (
  SELECT u.signup_date,
         EXISTS (SELECT 1 FROM events e
                 WHERE e.user_id = u.id AND e.event_date = u.signup_date + 1) AS came_back
  FROM users u
) t
GROUP BY signup_date
ORDER BY signup_date;
\`\`\`

\`EXISTS\` cannot duplicate rows, so the \`DISTINCT\` isn't even needed.`,
    },
    pitfalls: [
      {
        es: "**División entera.** `100 * 1 / 3` es `33` en Postgres: los dos operandos son enteros y el resultado se trunca antes del `ROUND`. Multiplica por `100.0` o castea a `numeric`.",
        en: "**Integer division.** `100 * 1 / 3` is `33` in Postgres: both operands are integers and the result is truncated before `ROUND`. Multiply by `100.0` or cast to `numeric`.",
      },
      {
        es: "**Contar eventos en vez de usuarios.** Si un usuario tiene dos eventos el día siguiente, el JOIN contra `events` produce dos filas para él: `COUNT(*)` cuenta dos altas y `COUNT(e.user_id)` dos retenidos. El porcentaje puede incluso pasar de 100. Deduplica antes del JOIN o usa `COUNT(DISTINCT ...)`.",
        en: "**Counting events instead of users.** If a user has two events the next day, joining `events` yields two rows for them: `COUNT(*)` counts two signups and `COUNT(e.user_id)` two retained. The percentage can even exceed 100. Deduplicate before the join or use `COUNT(DISTINCT ...)`.",
      },
      {
        es: "**INNER JOIN.** Con `JOIN events`, los usuarios que no volvieron no tienen fila, y un día en que **nadie** volvió desaparece del resultado en vez de salir con `0.00`.",
        en: "**INNER JOIN.** With `JOIN events`, users who didn't come back have no row, and a day when **nobody** came back disappears from the result instead of showing `0.00`.",
      },
      {
        es: "**Filtrar el día siguiente en el `WHERE`.** `LEFT JOIN events e ON e.user_id = u.id WHERE e.event_date = u.signup_date + 1` descarta las filas con NULL y convierte el LEFT JOIN en un INNER JOIN. La condición del día va en el `ON`.",
        en: "**Filtering the next day in `WHERE`.** `LEFT JOIN events e ON e.user_id = u.id WHERE e.event_date = u.signup_date + 1` drops the NULL rows and turns the LEFT JOIN into an INNER JOIN. The day condition belongs in `ON`.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `SELECT u.signup_date,
       COUNT(DISTINCT u.id) AS signups,
       COUNT(DISTINCT e.user_id) AS retained,
       ROUND(100 * COUNT(DISTINCT e.user_id) / COUNT(DISTINCT u.id), 2) AS retention_pct
FROM users u
LEFT JOIN events e ON e.user_id = u.id AND e.event_date = u.signup_date + 1
GROUP BY u.signup_date
ORDER BY u.signup_date;`,
      why: {
        es: "División entera: con 1 de 3 retenidos devuelve 33 en vez de 33.33.",
        en: "Integer division: with 1 of 3 retained it returns 33 instead of 33.33.",
      },
    },
    {
      code: `SELECT u.signup_date,
       COUNT(*) AS signups,
       COUNT(e.user_id) AS retained,
       ROUND(100.0 * COUNT(e.user_id) / COUNT(*), 2) AS retention_pct
FROM users u
LEFT JOIN events e ON e.user_id = u.id AND e.event_date = u.signup_date + 1
GROUP BY u.signup_date
ORDER BY u.signup_date;`,
      why: {
        es: "Cuenta eventos, no usuarios: un usuario con dos eventos al día siguiente suma dos altas y dos retenidos.",
        en: "Counts events, not users: a user with two events the next day adds two signups and two retained.",
      },
    },
    {
      code: `SELECT u.signup_date,
       COUNT(DISTINCT u.id) AS signups,
       COUNT(DISTINCT e.user_id) AS retained,
       ROUND(100.0 * COUNT(DISTINCT e.user_id) / COUNT(DISTINCT u.id), 2) AS retention_pct
FROM users u
JOIN events e ON e.user_id = u.id AND e.event_date = u.signup_date + 1
GROUP BY u.signup_date
ORDER BY u.signup_date;`,
      why: {
        es: "INNER JOIN: los no retenidos no cuentan como altas, y un día sin retención desaparece.",
        en: "INNER JOIN: non-retained users don't count as signups, and a day with no retention disappears.",
      },
    },
    {
      code: `SELECT u.signup_date,
       COUNT(*) AS signups,
       COUNT(r.user_id) AS retained,
       ROUND(100.0 * COUNT(r.user_id) / COUNT(*), 2) AS retention_pct
FROM users u
LEFT JOIN (SELECT DISTINCT user_id, event_date FROM events) r
  ON r.user_id = u.id AND r.event_date = u.signup_date + 1
GROUP BY u.signup_date;`,
      why: {
        es: "La lógica es correcta pero no tiene ORDER BY.",
        en: "The logic is right but there is no ORDER BY.",
      },
    },
  ],
  evaluation: {
    kind: "sql-query",
    orderMatters: true,
    schema: `CREATE TABLE users (id int PRIMARY KEY, signup_date date NOT NULL);
CREATE TABLE events (
  id int PRIMARY KEY,
  user_id int NOT NULL REFERENCES users(id),
  event_date date NOT NULL,
  event_type text NOT NULL
);`,
    datasets: [
      {
        name: "ejemplo",
        hidden: false,
        // 50 % y 25 %: porcentajes exactos, para que la división entera no se note acá.
        seed: `INSERT INTO users VALUES
  (1, '2024-03-01'),
  (2, '2024-03-01'),
  (3, '2024-03-02'),
  (4, '2024-03-02'),
  (5, '2024-03-02'),
  (6, '2024-03-02');
INSERT INTO events VALUES
  (100, 1, '2024-03-01', 'open'),
  (101, 1, '2024-03-02', 'open'),
  (102, 2, '2024-03-01', 'open'),
  (103, 3, '2024-03-03', 'purchase'),
  (104, 4, '2024-03-02', 'open'),
  (105, 5, '2024-03-05', 'open');`,
      },
      {
        name: "porcentaje-no-exacto",
        hidden: true,
        trap: {
          es: "La retención da 33,33 %: un porcentaje que no es entero.",
          en: "Retention is 33.33%: a percentage that is not a whole number.",
        },
        seed: `INSERT INTO users VALUES
  (1, '2024-04-10'),
  (2, '2024-04-10'),
  (3, '2024-04-10');
INSERT INTO events VALUES
  (200, 1, '2024-04-11', 'open'),
  (201, 2, '2024-04-12', 'open');`,
      },
      {
        name: "eventos-repetidos",
        hidden: true,
        trap: {
          es: "Un usuario genera varios eventos el día siguiente a su registro.",
          en: "A user generates several events on the day after signing up.",
        },
        seed: `INSERT INTO users VALUES
  (1, '2024-05-01'),
  (2, '2024-05-01');
INSERT INTO events VALUES
  (300, 1, '2024-05-02', 'open'),
  (301, 1, '2024-05-02', 'search'),
  (302, 1, '2024-05-02', 'purchase');`,
      },
      {
        name: "dia-sin-retencion",
        hidden: true,
        trap: {
          es: "Hay un día en que ningún usuario volvió: tiene que aparecer con 0 %.",
          en: "There is a day when no user came back: it must appear with 0%.",
        },
        seed: `INSERT INTO users VALUES
  (1, '2024-06-01'),
  (2, '2024-06-01'),
  (3, '2024-06-02'),
  (4, '2024-06-02');
INSERT INTO events VALUES
  (400, 1, '2024-06-02', 'open'),
  (401, 2, '2024-06-02', 'open'),
  (402, 3, '2024-06-02', 'open'),
  (403, 4, '2024-06-04', 'open');`,
      },
      {
        name: "fechas-desordenadas",
        hidden: true,
        trap: {
          es: "Los usuarios no están guardados en orden de fecha de registro: sin ORDER BY, el resultado sale desordenado.",
          en: "Users are not stored in signup-date order: without ORDER BY, the result comes out unordered.",
        },
        seed: `INSERT INTO users VALUES
  (1, '2024-07-09'),
  (2, '2024-07-02'),
  (3, '2024-07-07'),
  (4, '2024-07-01'),
  (5, '2024-07-05'),
  (6, '2024-07-03'),
  (7, '2024-07-08'),
  (8, '2024-07-04');
INSERT INTO events VALUES
  (500, 1, '2024-07-10', 'open'),
  (501, 3, '2024-07-08', 'open'),
  (502, 5, '2024-07-06', 'open'),
  (503, 8, '2024-07-05', 'open');`,
      },
    ],
  },
};
