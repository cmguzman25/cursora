import type { Challenge } from "../types";

/**
 * Reto alto: gaps-and-islands, el patrón de window functions más pedido en
 * entrevistas de data.
 *
 * El truco: en una secuencia de días consecutivos, `día - ROW_NUMBER()` es
 * constante; ese valor identifica la "isla". Las trampas atacan cada supuesto:
 *
 * - **Varios logins el mismo día**: sin deduplicar, ROW_NUMBER avanza dentro del
 *   mismo día y parte la isla.
 * - **Rachas que cruzan fin de mes**: restar el número de día del mes
 *   (`EXTRACT(DAY ...)`) en vez de la fecha completa corta la racha el día 1.
 * - **Usuarios sin logins**: tienen que salir con 0, y un INNER JOIN (o partir de
 *   `logins`) los pierde.
 */
export const challenge: Challenge = {
  slug: "racha-mas-larga",
  title: {
    es: "Racha más larga de días consecutivos",
    en: "Longest streak of consecutive days",
  },
  difficulty: "advanced",
  tags: ["window-functions", "gaps-and-islands", "row-number", "cte"],
  language: "postgres",
  suggestedMinutes: 35,
  statement: {
    es: `Una app de hábitos registra cada inicio de sesión:

\`\`\`sql
users  (id int, username text)
logins (id int, user_id int, logged_at timestamp)
\`\`\`

Un usuario puede iniciar sesión varias veces el mismo día.

Para cada usuario, calcula su **racha más larga**: la mayor cantidad de **días calendario consecutivos** en los que inició sesión al menos una vez. Un día con login aislado es una racha de 1. Los usuarios que nunca iniciaron sesión tienen racha \`0\`.`,
    en: `A habit-tracking app records every login:

\`\`\`sql
users  (id int, username text)
logins (id int, user_id int, logged_at timestamp)
\`\`\`

A user can log in several times on the same day.

For each user, compute their **longest streak**: the largest number of **consecutive calendar days** on which they logged in at least once. A single isolated day is a streak of 1. Users who never logged in have a streak of \`0\`.`,
  },
  output: {
    columns: ["user_id", "longest_streak"],
    order: { es: "por user_id ascendente", en: "by user_id ascending" },
  },
  starterCode: `-- Escribe tu consulta aquí
WITH dias AS (
  SELECT
  FROM logins
)
SELECT
`,
  hints: [
    {
      es: "Lo que importa es **en qué días** inició sesión cada usuario, no cuántas veces. Empieza por reducir `logins` a un día por fila.",
      en: "What matters is **which days** each user logged in, not how many times. Start by reducing `logins` to one day per row.",
    },
    {
      es: "Numera los días de cada usuario en orden con `ROW_NUMBER()`. ¿Qué tienen en común los días de una misma racha si a cada fecha le restas su número de fila?",
      en: "Number each user's days in order with `ROW_NUMBER()`. What do days in the same streak have in common if you subtract each date's row number from it?",
    },
    {
      es: "`fecha - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY fecha)` es constante dentro de una racha (resta días a una `date`, no al número de día del mes). Agrupa por ese valor, cuenta, y quédate con el máximo por usuario, sin olvidar a los que tienen 0.",
      en: "`date - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY date)` is constant within a streak (subtract days from a `date`, not from the day-of-month number). Group by that value, count, and keep the max per user, without forgetting those with 0.",
    },
  ],
  solution: {
    code: `WITH dias AS (
  SELECT DISTINCT user_id, logged_at::date AS dia
  FROM logins
),
islas AS (
  SELECT user_id,
         dia - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY dia))::int AS isla
  FROM dias
),
rachas AS (
  SELECT user_id, COUNT(*) AS largo
  FROM islas
  GROUP BY user_id, isla
)
SELECT u.id AS user_id, COALESCE(MAX(r.largo), 0) AS longest_streak
FROM users u
LEFT JOIN rachas r ON r.user_id = u.id
GROUP BY u.id
ORDER BY u.id;`,
    explanation: {
      es: `Es el patrón **gaps-and-islands**. La idea en una tabla:

| día | ROW_NUMBER | día − ROW_NUMBER |
|---|---|---|
| 03-01 | 1 | 02-29 |
| 03-02 | 2 | 02-29 |
| 03-03 | 3 | 02-29 |
| 03-07 | 4 | 03-03 |
| 03-08 | 5 | 03-03 |

Mientras los días son consecutivos, la fecha y el número de fila avanzan juntos y la resta no cambia. Cuando hay un hueco, la fecha salta más que el número de fila y la resta cambia: empieza otra **isla**. Agrupando por ese valor, cada grupo es una racha y \`COUNT(*)\` es su largo.

Los pasos:

1. **\`dias\`**: \`DISTINCT\` sobre la fecha (sin la hora). Sin esto, dos logins el mismo día harían avanzar \`ROW_NUMBER\` sin que avance la fecha, y la racha se partiría.
2. **\`islas\`**: la resta se hace sobre una \`date\` completa, así que cruzar de un mes a otro (31 → 1) sigue siendo consecutivo.
3. **\`rachas\`**: un grupo por usuario e isla.
4. El \`LEFT JOIN\` desde \`users\` con \`COALESCE(..., 0)\` hace aparecer a los que nunca iniciaron sesión.

Una alternativa válida marca el inicio de cada racha con \`LAG\` (\`dia - LAG(dia) OVER (...) <> 1\`) y numera las rachas con una suma acumulada de esas marcas. Es más larga, pero algunos entrevistadores la encuentran más fácil de seguir.`,
      en: `This is the **gaps-and-islands** pattern. The idea in a table:

| day | ROW_NUMBER | day − ROW_NUMBER |
|---|---|---|
| 03-01 | 1 | 02-29 |
| 03-02 | 2 | 02-29 |
| 03-03 | 3 | 02-29 |
| 03-07 | 4 | 03-03 |
| 03-08 | 5 | 03-03 |

While days are consecutive, the date and the row number advance together and the difference doesn't change. When there's a gap, the date jumps further than the row number and the difference changes: a new **island** starts. Grouping by that value, each group is a streak and \`COUNT(*)\` is its length.

The steps:

1. **\`dias\`**: \`DISTINCT\` on the date (without the time). Without it, two logins on the same day would advance \`ROW_NUMBER\` without advancing the date, splitting the streak.
2. **\`islas\`**: the subtraction is done on a full \`date\`, so crossing from one month to the next (31 → 1) is still consecutive.
3. **\`rachas\`**: one group per user and island.
4. The \`LEFT JOIN\` from \`users\` with \`COALESCE(..., 0)\` brings in those who never logged in.

A valid alternative marks the start of each streak with \`LAG\` (\`day - LAG(day) OVER (...) <> 1\`) and numbers the streaks with a running sum of those marks. It's longer, but some interviewers find it easier to follow.`,
    },
    pitfalls: [
      {
        es: "**No deduplicar los días.** Con dos logins el mismo día, `ROW_NUMBER` avanza dos veces y la fecha una sola: la resta cambia en medio de la racha y la parte en dos. Hay que reducir a `DISTINCT user_id, logged_at::date` antes de numerar.",
        en: "**Not deduplicating days.** With two logins on the same day, `ROW_NUMBER` advances twice and the date only once: the difference changes mid-streak and splits it in two. Reduce to `DISTINCT user_id, logged_at::date` before numbering.",
      },
      {
        es: "**Restar el número de día del mes.** `EXTRACT(DAY FROM dia) - ROW_NUMBER()` funciona mientras la racha no cruce de mes: del 31 al 1 el número de día cae y la racha se corta. La resta tiene que ser sobre la fecha completa (`date - integer`).",
        en: "**Subtracting the day-of-month number.** `EXTRACT(DAY FROM day) - ROW_NUMBER()` works as long as the streak doesn't cross a month: from the 31st to the 1st the day number drops and the streak breaks. Subtract from the full date (`date - integer`).",
      },
      {
        es: "**Perder a los usuarios sin logins.** Si la consulta parte de `logins`, o une `users` con INNER JOIN, quien nunca inició sesión no aparece. El enunciado pide que salga con `0`: `LEFT JOIN` desde `users` y `COALESCE`.",
        en: "**Losing users without logins.** If the query starts from `logins`, or joins `users` with an INNER JOIN, someone who never logged in doesn't appear. The statement asks for them with `0`: `LEFT JOIN` from `users` and `COALESCE`.",
      },
      {
        es: "**Usar `RANK` o `DENSE_RANK` en vez de `ROW_NUMBER`.** Con días ya deduplicados dan lo mismo, pero sin deduplicar `DENSE_RANK` esconde el problema en vez de resolverlo: conviene deduplicar explícitamente y que se lea.",
        en: "**Using `RANK` or `DENSE_RANK` instead of `ROW_NUMBER`.** With deduplicated days they're equivalent, but without deduplicating `DENSE_RANK` hides the problem instead of solving it: deduplicate explicitly so it reads clearly.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `WITH islas AS (
  SELECT user_id,
         logged_at::date - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY logged_at))::int AS isla
  FROM logins
),
rachas AS (
  SELECT user_id, COUNT(*) AS largo FROM islas GROUP BY user_id, isla
)
SELECT u.id AS user_id, COALESCE(MAX(r.largo), 0) AS longest_streak
FROM users u LEFT JOIN rachas r ON r.user_id = u.id
GROUP BY u.id
ORDER BY u.id;`,
      why: {
        es: "No deduplica: dos logins el mismo día parten la racha.",
        en: "Doesn't deduplicate: two logins on the same day split the streak.",
      },
    },
    {
      code: `WITH dias AS (
  SELECT DISTINCT user_id, logged_at::date AS dia FROM logins
),
islas AS (
  SELECT user_id,
         EXTRACT(DAY FROM dia) - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY dia) AS isla
  FROM dias
),
rachas AS (
  SELECT user_id, COUNT(*) AS largo FROM islas GROUP BY user_id, isla
)
SELECT u.id AS user_id, COALESCE(MAX(r.largo), 0) AS longest_streak
FROM users u LEFT JOIN rachas r ON r.user_id = u.id
GROUP BY u.id
ORDER BY u.id;`,
      why: {
        es: "Resta el número de día del mes: una racha del 30 de abril al 2 de mayo se corta en el cambio de mes.",
        en: "Subtracts the day-of-month: a streak from April 30 to May 2 breaks at the month change.",
      },
    },
    {
      code: `WITH dias AS (
  SELECT DISTINCT user_id, logged_at::date AS dia FROM logins
),
islas AS (
  SELECT user_id,
         dia - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY dia))::int AS isla
  FROM dias
),
rachas AS (
  SELECT user_id, COUNT(*) AS largo FROM islas GROUP BY user_id, isla
)
SELECT user_id, MAX(largo) AS longest_streak
FROM rachas
GROUP BY user_id
ORDER BY user_id;`,
      why: {
        es: "Parte de los logins: los usuarios que nunca iniciaron sesión no aparecen con 0.",
        en: "Starts from logins: users who never logged in don't appear with 0.",
      },
    },
    {
      code: `WITH dias AS (
  SELECT DISTINCT user_id, logged_at::date AS dia FROM logins
),
islas AS (
  SELECT user_id,
         dia - (ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY dia))::int AS isla
  FROM dias
),
rachas AS (
  SELECT user_id, COUNT(*) AS largo FROM islas GROUP BY user_id, isla
)
SELECT u.id AS user_id, COALESCE(MAX(r.largo), 0) AS longest_streak
FROM users u LEFT JOIN rachas r ON r.user_id = u.id
GROUP BY u.id;`,
      why: {
        es: "La lógica es correcta pero no tiene ORDER BY.",
        en: "The logic is right but there is no ORDER BY.",
      },
    },
  ],
  evaluation: {
    kind: "sql-query",
    orderMatters: true,
    schema: `CREATE TABLE users (id int PRIMARY KEY, username text NOT NULL);
CREATE TABLE logins (
  id int PRIMARY KEY,
  user_id int NOT NULL REFERENCES users(id),
  logged_at timestamp NOT NULL
);`,
    datasets: [
      {
        name: "ejemplo",
        hidden: false,
        // Un login por día, todo dentro de marzo, todos con logins: las tres
        // trampas quedan escondidas para los casos ocultos.
        seed: `INSERT INTO users VALUES
  (1, 'ana'),
  (2, 'bruno'),
  (3, 'carla');
INSERT INTO logins VALUES
  (1, 1, '2024-03-01 08:10'),
  (2, 1, '2024-03-02 09:00'),
  (3, 1, '2024-03-03 07:45'),
  (4, 1, '2024-03-07 21:30'),
  (5, 1, '2024-03-08 22:00'),
  (6, 2, '2024-03-05 12:00'),
  (7, 2, '2024-03-10 12:00'),
  (8, 2, '2024-03-11 12:30'),
  (9, 3, '2024-03-15 18:00');`,
      },
      {
        name: "varios-logins-por-dia",
        hidden: true,
        // El día repetido va en medio de la racha: en los extremos, sin deduplicar,
        // la resta da el largo correcto por casualidad.
        trap: {
          es: "Hay usuarios que inician sesión varias veces el mismo día.",
          en: "Some users log in several times on the same day.",
        },
        seed: `INSERT INTO users VALUES
  (1, 'ana'),
  (2, 'bruno');
INSERT INTO logins VALUES
  (1, 1, '2024-04-01 08:00'),
  (2, 1, '2024-04-02 08:00'),
  (3, 1, '2024-04-02 13:00'),
  (4, 1, '2024-04-02 20:00'),
  (5, 1, '2024-04-03 09:00'),
  (6, 1, '2024-04-04 23:59'),
  (7, 2, '2024-04-10 10:00'),
  (8, 2, '2024-04-11 10:00'),
  (9, 2, '2024-04-11 11:00');`,
      },
      {
        name: "cambio-de-mes",
        hidden: true,
        trap: {
          es: "Una racha cruza de un mes al siguiente (del 30 de abril al 2 de mayo).",
          en: "A streak crosses from one month into the next (April 30 to May 2).",
        },
        seed: `INSERT INTO users VALUES
  (1, 'ana'),
  (2, 'bruno');
INSERT INTO logins VALUES
  (1, 1, '2024-04-29 08:00'),
  (2, 1, '2024-04-30 08:00'),
  (3, 1, '2024-05-01 08:00'),
  (4, 1, '2024-05-02 08:00'),
  (5, 1, '2024-05-10 08:00'),
  (6, 2, '2024-05-20 08:00'),
  (7, 2, '2024-05-21 08:00'),
  (8, 2, '2024-05-22 08:00');`,
      },
      {
        name: "usuarios-sin-logins",
        hidden: true,
        trap: {
          es: "Hay usuarios que nunca iniciaron sesión: tienen que aparecer con racha 0.",
          en: "Some users never logged in: they must appear with a streak of 0.",
        },
        seed: `INSERT INTO users VALUES
  (1, 'ana'),
  (2, 'bruno'),
  (3, 'carla');
INSERT INTO logins VALUES
  (1, 2, '2024-06-01 08:00'),
  (2, 2, '2024-06-02 08:00');`,
      },
      {
        name: "usuarios-desordenados",
        hidden: true,
        trap: {
          es: "Los usuarios no están guardados en orden de id: sin ORDER BY, el resultado sale desordenado.",
          en: "Users are not stored in id order: without ORDER BY, the result comes out unordered.",
        },
        seed: `INSERT INTO users VALUES
  (12, 'lucia'),
  (3, 'carla'),
  (8, 'hugo'),
  (1, 'ana'),
  (10, 'julia'),
  (5, 'elena'),
  (7, 'gael');
INSERT INTO logins VALUES
  (1, 12, '2024-07-01 08:00'),
  (2, 3, '2024-07-01 08:00'),
  (3, 3, '2024-07-02 08:00'),
  (4, 8, '2024-07-05 08:00'),
  (5, 1, '2024-07-01 08:00'),
  (6, 1, '2024-07-02 08:00'),
  (7, 1, '2024-07-03 08:00'),
  (8, 10, '2024-07-09 08:00'),
  (9, 5, '2024-07-04 08:00'),
  (10, 7, '2024-07-06 08:00'),
  (11, 7, '2024-07-07 08:00');`,
      },
    ],
  },
};
