import type { Challenge } from "../types";

/**
 * Reto básico: NULL en una comparación de desigualdad.
 *
 * `d.name <> 'Sales'` es *desconocido* cuando `d.name` es NULL, y el WHERE solo
 * deja pasar lo verdadero. Así, un empleado sin departamento —que claramente
 * **no** está en Ventas— desaparece. La trampa aparece por dos caminos: un INNER
 * JOIN que lo descarta antes, o un LEFT JOIN que lo recupera y el `<>` lo vuelve
 * a descartar.
 */
export const challenge: Challenge = {
  slug: "empleados-fuera-de-ventas",
  title: {
    es: "Empleados fuera de Ventas",
    en: "Employees outside Sales",
  },
  difficulty: "basic",
  tags: ["left-join", "null", "is-distinct-from"],
  language: "postgres",
  suggestedMinutes: 10,
  statement: {
    es: `Recursos Humanos guarda los empleados y los departamentos así:

\`\`\`sql
employees   (id int, name text, department_id int)
departments (id int, name text)
\`\`\`

Hay empleados recién contratados que todavía no tienen departamento asignado: su \`department_id\` es \`NULL\`.

Van a enviar una encuesta a todos los que **no** trabajan en el departamento \`'Sales'\`. Devuelve esos empleados con el nombre de su departamento en la columna \`department\` (\`NULL\` si no tienen).`,
    en: `HR stores employees and departments like this:

\`\`\`sql
employees   (id int, name text, department_id int)
departments (id int, name text)
\`\`\`

Some newly hired employees don't have a department yet: their \`department_id\` is \`NULL\`.

A survey goes out to everyone who does **not** work in the \`'Sales'\` department. Return those employees with their department name in a \`department\` column (\`NULL\` if they have none).`,
  },
  output: {
    columns: ["id", "name", "department"],
    order: { es: "por id ascendente", en: "by id ascending" },
  },
  starterCode: `-- Escribe tu consulta aquí
SELECT
FROM employees e
`,
  hints: [
    {
      es: "Un empleado sin departamento, ¿trabaja en Ventas? Asegúrate de que tu consulta responda lo mismo que tú.",
      en: "Does an employee without a department work in Sales? Make sure your query answers the same way you do.",
    },
    {
      es: "Para tener el nombre del departamento sin perder a los empleados que no tienen uno, necesitas un `LEFT JOIN`.",
      en: "To get the department name without losing employees who have none, you need a `LEFT JOIN`.",
    },
    {
      es: "¿Qué devuelve `NULL <> 'Sales'`? Pruébalo seleccionando solo `SELECT NULL <> 'Sales';` y ejecutando la selección.",
      en: "What does `NULL <> 'Sales'` return? Try it by selecting just `SELECT NULL <> 'Sales';` and running the selection.",
    },
  ],
  solution: {
    code: `SELECT e.id, e.name, d.name AS department
FROM employees e
LEFT JOIN departments d ON d.id = e.department_id
WHERE d.name IS DISTINCT FROM 'Sales'
ORDER BY e.id;`,
    explanation: {
      es: `Dos piezas:

1. **\`LEFT JOIN\`** conserva a los empleados sin departamento: quedan con \`d.name\` en NULL.
2. **\`IS DISTINCT FROM\`** es la desigualdad que trata a NULL como un valor más: \`NULL IS DISTINCT FROM 'Sales'\` es **verdadero**, mientras que \`NULL <> 'Sales'\` es **desconocido** y el \`WHERE\` lo descarta.

La forma equivalente, que funciona en cualquier motor SQL, explicita el caso NULL:

\`\`\`sql
WHERE d.name <> 'Sales' OR d.name IS NULL
\`\`\`

En una entrevista vale la pena **decir en voz alta** qué pasa con los NULL antes de que te lo pregunten: es exactamente lo que este tipo de enunciado busca medir.`,
      en: `Two pieces:

1. **\`LEFT JOIN\`** keeps employees without a department: they end up with \`d.name\` as NULL.
2. **\`IS DISTINCT FROM\`** is the inequality that treats NULL as just another value: \`NULL IS DISTINCT FROM 'Sales'\` is **true**, while \`NULL <> 'Sales'\` is **unknown** and \`WHERE\` drops it.

The equivalent form, which works in any SQL engine, spells out the NULL case:

\`\`\`sql
WHERE d.name <> 'Sales' OR d.name IS NULL
\`\`\`

In an interview it pays to **say out loud** what happens with NULLs before you're asked: that's exactly what this kind of statement is testing.`,
    },
    pitfalls: [
      {
        es: "**`<>` con NULL.** `NULL <> 'Sales'` no es verdadero ni falso: es desconocido, y el `WHERE` solo deja pasar lo verdadero. Un `LEFT JOIN` seguido de `WHERE d.name <> 'Sales'` recupera a los empleados sin departamento y en la línea siguiente los vuelve a descartar.",
        en: "**`<>` with NULL.** `NULL <> 'Sales'` is neither true nor false: it is unknown, and `WHERE` only lets true through. A `LEFT JOIN` followed by `WHERE d.name <> 'Sales'` recovers employees without a department and drops them again on the next line.",
      },
      {
        es: "**`INNER JOIN`.** Un empleado con `department_id` NULL no tiene fila con la que unirse en `departments`, así que el `JOIN` lo descarta antes de llegar al filtro.",
        en: "**`INNER JOIN`.** An employee with a NULL `department_id` has no row to match in `departments`, so the `JOIN` drops them before the filter even runs.",
      },
      {
        es: "**Comparar contra una subconsulta.** `WHERE e.department_id <> (SELECT id FROM departments WHERE name = 'Sales')` parece más directo, pero si no existe el departamento `'Sales'` la subconsulta devuelve NULL y la consulta no devuelve **ninguna** fila, cuando la respuesta correcta es *todos*.",
        en: "**Comparing against a subquery.** `WHERE e.department_id <> (SELECT id FROM departments WHERE name = 'Sales')` looks more direct, but if no `'Sales'` department exists the subquery returns NULL and the query returns **no** rows, when the right answer is *everyone*.",
      },
      {
        es: "**Olvidar el `ORDER BY`.** Sin él, Postgres no garantiza ningún orden.",
        en: "**Forgetting `ORDER BY`.** Without it, Postgres guarantees no order.",
      },
    ],
  },
  naiveSolutions: [
    {
      code: `SELECT e.id, e.name, d.name AS department
FROM employees e
JOIN departments d ON d.id = e.department_id
WHERE d.name <> 'Sales'
ORDER BY e.id;`,
      why: {
        es: "INNER JOIN: los empleados sin departamento desaparecen.",
        en: "INNER JOIN: employees without a department disappear.",
      },
    },
    {
      code: `SELECT e.id, e.name, d.name AS department
FROM employees e
LEFT JOIN departments d ON d.id = e.department_id
WHERE d.name <> 'Sales'
ORDER BY e.id;`,
      why: {
        es: "El LEFT JOIN conserva a los empleados sin departamento, pero `NULL <> 'Sales'` es desconocido y el WHERE los descarta.",
        en: "The LEFT JOIN keeps employees without a department, but `NULL <> 'Sales'` is unknown and WHERE drops them.",
      },
    },
    {
      code: `SELECT e.id, e.name, d.name AS department
FROM employees e
LEFT JOIN departments d ON d.id = e.department_id
WHERE e.department_id IS NULL
   OR e.department_id <> (SELECT id FROM departments WHERE name = 'Sales')
ORDER BY e.id;`,
      why: {
        es: "Maneja el NULL del empleado, pero si no existe el departamento 'Sales' la subconsulta es NULL y solo quedan los empleados sin departamento.",
        en: "Handles the employee's NULL, but if no 'Sales' department exists the subquery is NULL and only employees without a department remain.",
      },
    },
    {
      code: `SELECT e.id, e.name, d.name AS department
FROM employees e
LEFT JOIN departments d ON d.id = e.department_id
WHERE d.name IS DISTINCT FROM 'Sales';`,
      why: {
        es: "La lógica es correcta pero no tiene ORDER BY.",
        en: "The logic is right but there is no ORDER BY.",
      },
    },
  ],
  evaluation: {
    kind: "sql-query",
    orderMatters: true,
    schema: `CREATE TABLE departments (id int PRIMARY KEY, name text NOT NULL);
CREATE TABLE employees (
  id int PRIMARY KEY,
  name text NOT NULL,
  department_id int REFERENCES departments(id)
);`,
    datasets: [
      {
        name: "ejemplo",
        hidden: false,
        seed: `INSERT INTO departments VALUES
  (1, 'Sales'),
  (2, 'Engineering'),
  (3, 'Finance');
INSERT INTO employees VALUES
  (1, 'Ana', 1),
  (2, 'Bruno', 2),
  (3, 'Carla', 1),
  (4, 'Diego', 3),
  (5, 'Elena', 2);`,
      },
      {
        name: "recien-contratados",
        hidden: true,
        trap: {
          es: "Hay empleados sin departamento (department_id NULL): no están en Ventas, así que reciben la encuesta.",
          en: "There are employees without a department (NULL department_id): they're not in Sales, so they get the survey.",
        },
        seed: `INSERT INTO departments VALUES
  (1, 'Sales'),
  (2, 'Engineering');
INSERT INTO employees VALUES
  (1, 'Ana', 1),
  (2, 'Bruno', NULL),
  (3, 'Carla', 2),
  (4, 'Diego', NULL);`,
      },
      {
        name: "sin-departamento-de-ventas",
        hidden: true,
        trap: {
          es: "No existe el departamento 'Sales': todos los empleados reciben la encuesta.",
          en: "There is no 'Sales' department: every employee gets the survey.",
        },
        seed: `INSERT INTO departments VALUES
  (2, 'Engineering'),
  (3, 'Finance');
INSERT INTO employees VALUES
  (1, 'Ana', 2),
  (2, 'Bruno', 3),
  (3, 'Carla', NULL);`,
      },
      {
        name: "empleados-desordenados",
        hidden: true,
        trap: {
          es: "Los empleados no están guardados en orden de id: sin ORDER BY, el resultado sale desordenado.",
          en: "Employees are not stored in id order: without ORDER BY, the result comes out unordered.",
        },
        seed: `INSERT INTO departments VALUES
  (1, 'Sales'),
  (2, 'Engineering'),
  (3, 'Finance');
INSERT INTO employees VALUES
  (12, 'Lucía', 2),
  (3, 'Carla', 3),
  (8, 'Hugo', 1),
  (1, 'Ana', 2),
  (10, 'Julia', 3),
  (5, 'Elena', 2),
  (7, 'Gael', 3),
  (2, 'Bruno', 1);`,
      },
    ],
  },
};
