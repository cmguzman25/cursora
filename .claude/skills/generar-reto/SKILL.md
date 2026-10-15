---
name: generar-reto
description: Crea retos de código para la sección /practice (enunciado, editor y evaluación automática con casos ocultos) bajo content/challenges/<slug>/, con su alta en el registro y pasando el verificador. Úsalo cuando se pida un reto, ejercicio, problema o lote de práctica para preparar pruebas técnicas de live coding, en cualquier lenguaje (hoy con motor en la app: PostgreSQL; Scala se verifica con Docker pero aún no se ejecuta en la app). Pregunta antes los parámetros que cambian el diseño (lenguaje, tipo de reto, tema, dificultad, cantidad, contexto) y deriva cada caso oculto de una trampa concreta, no copiando otro reto.
---

# Retos de código para la sección `/practice`

Un reto prepara para una **prueba técnica en vivo**: un enunciado, un editor y una
evaluación automática. El alumno escribe, ejecuta contra un ejemplo visible y envía
contra casos ocultos. Cada reto declara su lenguaje y su forma de evaluarse; la
sección no está atada a ninguno.

## La regla que define este skill

**Cada caso oculto existe por una trampa con nombre.**

Es lo único que separa un reto de un ejercicio cualquiera. Un caso oculto "con más
datos" no enseña nada: el alumno que falla no sabe qué arreglar. Uno que existe
porque `NOT IN` se rompe con un NULL, o porque sin `ORDER BY` el orden es cualquiera,
**es** la clase. Si no puedes escribir en una frase qué vigila un caso (su `trap`),
ese caso sobra.

Y la contraprueba: **cada trampa tiene una solución ingenua que cae en ella**
(`naiveSolutions`). El verificador exige que falle al menos un caso oculto. Si la
ingenua pasa todo, los casos ocultos no vigilan lo que dicen vigilar.

## La otra regla: no copies otro reto

Un reto de window functions y uno de anti-join no comparten esquema, trampas ni
contexto. Diseña desde los parámetros de la sección 1 y los principios de la 4. Lo
que **sí** se reutiliza es mecánico: la forma del archivo (sección 3) y el
verificador, que es uno solo para toda la sección.

`content/challenges/clientes-sin-pedidos/` es la implementación de referencia.
Mírala para ver cómo encajan las piezas, no para copiar su tema.

---

## 1. Pregunta los parámetros antes de escribir nada

Usa `AskUserQuestion` en dos rondas. Si el usuario ya dio alguna respuesta en su
petición, no la vuelvas a preguntar.

### Ronda 1 — qué se practica

| Pregunta | Opciones sugeridas |
|---|---|
| ¿Lenguaje? | PostgreSQL · Scala · JavaScript/TypeScript · Python · Otro. *Lee `isLanguageSupported` en `src/lib/practice/languages.ts`: si el lenguaje no tiene motor, dilo antes de escribir. El reto se verá, con pistas y solución, pero no se podrá ejecutar ni entrará en el modo entrevista ni en los simulacros. Y sin harness en el verificador, ni siquiera se podrá comprobar la solución: hoy hay harness para SQL (PGlite) y Scala (Docker)* |
| ¿Tipo de reto? | Consulta SQL sobre tablas · Algoritmo (función con tests) · Manipulación de datos |
| ¿Temas o patrones? | *Redáctala para el caso*: joins, agregaciones, window functions, CTE recursivas, two pointers, hash maps… |
| ¿Dificultad? | Básico · Medio · Alto · Lote escalonado |
| ¿Cuántos retos? | 1 · 3 · 6 · 9 (3 por nivel) |

### Ronda 2 — la forma

| Pregunta | Opciones sugeridas |
|---|---|
| ¿Contexto de los enunciados? | E-commerce · Logs y eventos · Finanzas · RR. HH. · Variado |
| ¿Imita una plataforma o empresa? | No · Estilo LeetCode/HackerRank · Estilo de una empresa concreta (cuál) |
| ¿Idioma? | Español con traducción al inglés (recomendado: las entrevistas suelen ser en inglés) · Solo español · Solo inglés |
| ¿Minutos sugeridos? | Derivados de la dificultad (10 / 20 / 35) · Los indico yo |

Si un parámetro hace inviable el pedido, dilo antes de escribir. Ejemplo: "9 retos
de window functions en nivel básico" no existe; las window functions son nivel alto
por definición (ver la tabla de abajo).

---

## 2. Qué cambia cada parámetro

### La dificultad manda sobre la técnica (SQL)

| Nivel | Técnica que exige | Trampas típicas |
|---|---|---|
| **Básico** | SELECT, WHERE, ORDER BY, GROUP BY simple, un JOIN, anti-join | NULL en comparaciones, `NOT IN` con NULL, orden sin `ORDER BY`, `COUNT(*)` vs `COUNT(col)` |
| **Medio** | Varios JOIN, LEFT JOIN + agregación, HAVING, subconsultas, CTE, CASE | Agregar después de un JOIN que duplica filas, `LEFT JOIN` filtrado en el WHERE (vuelve INNER), división entera, grupos vacíos que deben aparecer con 0 |
| **Alto** | Window functions, top-N por grupo, gaps-and-islands, running totals, CTE recursivas | Empates (`ROW_NUMBER` vs `RANK` vs `DENSE_RANK`), marco por defecto de la ventana (`RANGE` con duplicados), islas que cruzan límites, grupos sin filas |

Para algoritmos la escala es análoga: básico = un recorrido con una estructura
obvia; medio = elegir la estructura (hash map, pila, dos punteros); alto = la
solución ingenua es O(n²) y el caso oculto grande lo nota.

### El tipo de reto manda sobre la evaluación

| Tipo | `evaluation.kind` | Qué compara |
|---|---|---|
| Consulta SQL | `sql-query` | El resultado de la consulta del alumno contra el de `solution.code`, dataset por dataset |
| Algoritmo / modelado / datos | `code-tests` | Cada test es una llamada (`call`) y un valor esperado (`expected`), **los dos como expresiones del lenguaje del reto**, comparados con `==`. Hoy solo Scala tiene harness (`src/lib/practice/scala/harness.ts`); **en la app no se ejecuta todavía**: avísalo |

### El idioma no cambia nada del código

`es` es el casillero obligatorio de `LocalizedText`; `en` es opcional. El SQL, los
nombres de tablas y columnas van en **inglés** siempre: es lo que se ve en una
entrevista real, y el enunciado traducido no cambia el esquema.

---

## 3. Requisitos técnicos de la plataforma

**Verifícalos leyendo el código, no confiando en esta lista.** Los archivos que
mandan:

- `content/challenges/types.ts` — `Challenge`, `ChallengeOutput`, `SqlQueryEvaluation`, `SqlDataset`
- `content/challenges/registry.ts` — el alta
- `src/lib/practice/sql/evaluate.ts` — cómo se ejecuta y compara (lo usan la app y el verificador)
- `content/challenges/verificar-retos.mjs` — los controles

A día de hoy eso impone:

- **Un archivo por reto, `content/challenges/<slug>/reto.ts`, que exporta
  `challenge`.** El slug es la carpeta, en kebab-case y en español (como el resto
  del contenido). **`mock` está reservado**: `/practice/mock` es la ruta de los
  simulacros.
- **`suggestedMinutes` es el reloj del modo entrevista** y suma al tiempo total de
  los simulacros. No es decorativo: calíbralo para alguien que conoce la técnica
  pero tiene que pensarla.
- **Solo `import type`** en `reto.ts`. El verificador lo carga con Node, que borra
  tipos pero no resuelve imports sin extensión.
- **La solución vive dentro de `reto.ts`** (`solution.code`), no en un `.sql`
  aparte: el resultado esperado se calcula ejecutándola.
- **Columnas y orden van en `output`, no en el enunciado.** La UI los muestra en un
  recuadro destacado; en el markdown se perdían. El verificador compara
  `output.columns` con lo que devuelve la referencia, exige `output.order` si
  `orderMatters`, y avisa si el enunciado repite "**Columnas:**" u "**Orden:**".
- **El Markdown sí se renderiza** (enunciado, pistas, explicación, errores típicos),
  con GFM. Los bloques ` ```sql ` se ven como código.
- **El esquema se muestra al alumno** debajo del enunciado, y los datos del dataset
  visible también. No hace falta copiarlos en el enunciado; basta una línea por
  tabla con sus columnas si ayuda a leer.
- **Postgres es PGlite** (Postgres real en WASM) con dos diferencias que importan:
  - **Collation "C"**: `ORDER BY` de texto ordena por bytes. Mayúsculas antes que
    minúsculas, y las letras con tilde **al final** (`Ana, Inés, Zoe, ana, Álvaro`).
    No pidas ordenar por un texto con tildes o mayúsculas mezcladas; ordena por id,
    fecha o número.
  - **La zona horaria se fija en UTC** dentro del evaluador. Aun así, evita `now()`
    y `current_date` en la solución: el resultado cambiaría cada día. Usa fechas
    fijas en los datos y, si hace falta "hoy", declara una fecha de referencia en
    el enunciado.
- **Los números se comparan por valor con 6 decimales** (`1.50` = `1.5`). Si el
  enunciado pide redondear, la referencia usa `ROUND(x, n)` y el enunciado dice
  cuántos decimales.
- **El nombre de cada columna se compara** (sin distinguir mayúsculas). Si el
  resultado tiene una columna calculada, `output.columns` dice su alias exacto.
- **Un reto sin motor queda fuera del modo entrevista y de los simulacros**
  (`isLanguageSupported`): no habría forma de entregarlo. Se puede practicar
  igual, comparando con los tests visibles y viendo la solución.
- **El reto no existe hasta darlo de alta** en `content/challenges/registry.ts`
  (import + entrada en `CHALLENGES`). El verificador avisa si falta.

### Retos `code-tests` (Scala)

Lo que cambia respecto de SQL:

- **`expected` se escribe a mano**, como expresión de Scala (`Some((0, 1))`,
  `Map("ana" -> 20)`, `Left(List("invalid email"))`). No sale de ejecutar la
  referencia: el verificador exige que la referencia lo cumpla en todos los tests.
- **Los tipos del dominio van en el `starterCode`** (case classes, sealed traits),
  con el comentario "No cambies estas definiciones: los tests las usan". Los tests
  construyen esos valores (`Form("Ana", ...)`), así que el alumno tiene que
  conservar los nombres. Conviene declararlos una vez en una constante `MODELO` e
  interpolarla en el enunciado, el `starterCode`, la solución y cada ingenua.
- **Sintaxis compatible con Scala 2.13**: llaves, `match` clásico, nada exclusivo
  de Scala 3. Se compila con Scala 3.3 (`SCALA_VERSION` en el harness), pero
  quien practica para Spark escribe 2.13.
- **Nada que dependa del orden de un `Map` o `Set`.** Con pocas claves el orden
  parece estable y no lo es; si el resultado es una lista, el enunciado fija el
  orden total. Una ingenua que "depende de la suerte" del hash no es una trampa
  verificable: usa una que falle siempre (p. ej. ordenar ascendente y `reverse`).
- **La trampa de complejidad es un test grande.** El harness corta cada test a
  los 5 s (`SCALA_TEST_TIMEOUT_MS`). Para que la ingenua O(n²) caiga, la entrada
  tiene que ser realmente cuadrática para ella: en "subcadena sin repetidos", un
  texto que repite el alfabeto deja ventanas de 26 y la fuerza bruta pasa; hacen
  falta decenas de miles de caracteres **distintos**. Genera la entrada con una
  expresión (`Vector.range(0, 200000)`), no con un literal.
- **El enunciado anuncia el tamaño** ("hasta 200 000 elementos") cuando hay un
  test de complejidad: en una entrevista también lo dicen.
- **Los tests visibles se muestran** debajo del enunciado (llamada → esperado).
  No hace falta repetirlos en el markdown.

### El verificador de Scala usa Docker

`verificar-retos.mjs` compila y corre la referencia, cada ingenua y el
`starterCode` en **un solo programa** dentro de `virtuslab/scala-cli`
(`docker run --rm`, caché en el volumen `scala-cli-cache`). Tarda unos 30 s por
reto. Si no compila junto, repite de a una variante para decir cuál falla.

- **Docker tiene que estar corriendo.** Sin Docker, el reto falla: no se da por
  bueno sin ejecutarlo.
- La primera vez descarga la imagen y el compilador; pide permiso antes.

---

## 4. Principios de diseño

| Principio | Cómo se materializa |
|---|---|
| Cada caso oculto, una trampa | `trap` en una frase; si describe dos cosas, son dos casos |
| Cada trampa, una ingenua | Una `naiveSolution` que cae en ella; el verificador exige que falle un oculto |
| El ejemplo no regala la trampa | La ingenua **pasa** el ejemplo visible (el verificador avisa si no). Si el ejemplo ya muestra el NULL, la trampa no está escondida |
| El ejemplo enseña | Resultado no vacío (el verificador lo exige) y de 2 a 6 filas: se tiene que poder razonar a mano |
| Orden sin ambigüedad | Si `orderMatters`, `output.order` desempata hasta ser total ("por total descendente y, a igual total, por id"). El verificador corre la referencia con varios planes y falla si el orden cambia |
| El enunciado pide qué, no cómo | "Los clientes que nunca compraron", no "usa un LEFT JOIN" |
| Pistas escalonadas | De 2 a 4: la primera reformula el problema, la última casi nombra la técnica. Ninguna trae código completo |
| Los errores típicos cubren las trampas | Cada `trap` aparece explicado en `solution.pitfalls`, con el porqué |
| La explicación muestra alternativas | Si hay dos formas idiomáticas (NOT EXISTS / LEFT JOIN), la explicación nombra la otra y cuándo conviene |

### El caso oculto del orden

Si `orderMatters`, uno de los casos ocultos existe **solo** para el orden:

- **Al menos 7 filas insertadas fuera de orden.** Con pocas filas, un hash join puede
  devolverlas ordenadas por casualidad, y la ingenua sin `ORDER BY` pasa.
- **Comprueba a mano** que varias formulaciones sin `ORDER BY` (JOIN, NOT EXISTS,
  subconsulta, EXCEPT…) salen desordenadas en ese dataset.
- Una `naiveSolution` sin `ORDER BY`.

Sin `ORDER BY`, otros casos también pueden fallar por orden según el plan. Está bien:
la UI detecta "filas correctas en otro orden" (`row-order`), lo dice así y no
muestra la trampa de ese caso.

### Datasets: qué poner

- **Mínimos.** Cada dataset tiene las filas justas para que su trampa se note. Un
  dataset de 50 filas esconde la trampa en vez de mostrarla.
- **Independientes.** Cada uno se carga sobre el esquema vacío; no dependen entre sí.
- **Distintos.** Dos ocultos con el mismo resultado esperado suelen vigilar lo mismo
  (el verificador avisa).
- **Válidos para el esquema.** Respeta las FK y los NOT NULL; un dataset que no
  carga es un error del reto, no del alumno.
- **El resultado correcto puede ser vacío** en un oculto ("todos compraron"): es una
  trampa legítima. En el ejemplo visible, no.

---

## 5. Qué entregar

Por cada reto:

1. `content/challenges/<slug>/reto.ts` con `challenge: Challenge`.
2. La línea de import y la entrada en `CHALLENGES` de `content/challenges/registry.ts`.

Y correr el verificador hasta que pase:

```
node --no-warnings content/challenges/verificar-retos.mjs <slug>
node --no-warnings content/challenges/verificar-retos.mjs        # todos
```

Además, `npx tsc --noEmit -p .` para que los tipos cuadren con la app.

---

## 6. Calibra con un reto piloto

Si el lote tiene más de un reto, escribe **uno** completo primero, pásale el
verificador y **lee de punta a punta** el enunciado, las pistas y la explicación
como si fueras el alumno. Solo después escribe el resto. El error que repetirías
nueve veces cuesta un reto encontrarlo.

En un lote escalonado, el piloto es el de nivel **medio**: tiene trampas de las dos
puntas.

---

## 7. Trampas conocidas

- **Con pocas filas, sin `ORDER BY` puede salir ordenado por casualidad.** Ver
  "El caso oculto del orden".
- **Empates en el orden pedido.** "Ordenado por total" con dos totales iguales es
  ambiguo. Desempata en `output.order` y en la solución.
- **Collation "C".** Ordenar por nombres con tildes da un orden que nadie espera.
- **Fechas relativas.** `now()` hace que el resultado esperado cambie cada día.
- **`COUNT` sobre un LEFT JOIN.** `COUNT(*)` cuenta la fila de NULLs como 1; si el
  reto quiere 0 para los grupos vacíos, la referencia usa `COUNT(col)`, y eso es una
  trampa buena para un caso oculto.
- **División entera.** `10/4` es `2` en Postgres. Si el enunciado pide un promedio o
  un porcentaje, la referencia castea, y el enunciado dice cuántos decimales.
- **La ingenua que falla el ejemplo visible.** Si ya falla ahí, la trampa no está
  escondida y el alumno la encuentra sin pensar (el verificador avisa).
- **Un `import` de valor en `reto.ts`** rompe el verificador, no la app.
- **Olvidar el alta en el registro** deja el reto en disco y fuera del catálogo.
- **Comprueba que el verificador también falla.** Rompe un reto a propósito (una
  ingenua que en realidad es correcta, un `output.columns` equivocado), confirma que
  salta y restaura.

---

## 8. Sé honesto con lo que no verificaste

El verificador ejecuta la solución, así que mide más que forma: la referencia pasa
sus casos, las ingenuas fallan, las columnas coinciden y el orden es estable entre
planes. Lo que **no** mide:

- **Que la referencia resuelva lo que dice el enunciado.** Si el enunciado y la
  solución dicen cosas distintas, el verificador da por buena la solución. Solo lo
  detecta leer los dos juntos.
- **Que las trampas sean las que de verdad se cometen en una entrevista.** Es un
  juicio didáctico, no algo medido.
- **La calibración de la dificultad y de los minutos sugeridos.**
- **El control de determinismo es una heurística**: si no salta, no prueba que el
  orden sea total.
- Si hay traducción, que diga lo mismo que el original no lo revisó un nativo.

Dilo al entregar. Un reto que pasa el verificador **no** es un reto revisado.
