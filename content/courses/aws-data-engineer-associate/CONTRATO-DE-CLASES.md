# Contrato de redacción — curso AWS Certified Data Engineer – Associate (DEA-C01)

Este documento define **cómo se escribe cada lección** de este curso. Es un
contrato: toda lección nueva dentro de `lecciones/` tiene que respetar la misma
estructura, el mismo tono, la misma extensión y las mismas reglas de fidelidad
al examen.

Este contrato aplica **solo a este curso**. Los cursos de AWS Cloud Practitioner
y Full Stack Developer con AWS tienen los suyos, con otras reglas. Donde este
contrato se contradiga con esos, manda este.

---

## 1. A quién le hablamos

- A alguien que **ya trabaja con datos o con software** y quiere aprobar el
  DEA-C01. No es un curso de introducción a la nube: se asume que el lector sabe
  qué es una base de datos, qué es una consulta SQL y qué es una API.
- **No se asume experiencia previa en AWS.** Cada servicio se presenta desde
  cero: qué problema resuelve, cómo funciona por dentro y cuándo se elige frente
  a sus alternativas.
- **No se asume inglés fluido**, pero sí se asume que el lector va a leer
  términos en inglés. El examen **no está disponible en español** (solo inglés,
  japonés, coreano y chino simplificado), así que el vocabulario técnico en
  inglés no es un adorno: es parte de lo que hay que aprender.
- El objetivo es **aprobar el examen**, no montar una plataforma de datos. Lo
  que no entra al examen, no entra al curso.

## 2. Principios de redacción

- **Registro profesional, trato de "tú".** Se le habla al lector de forma
  directa y respetuosa, como lo haría un colega con más experiencia en una
  revisión técnica. No es un manual corporativo ni una charla de café.
- **Sin humor, sin exclamaciones, sin coloquialismos.** Nada de "¡y listo!",
  "ojo con esto", "spoiler". Los emojis aparecen **solo** en los títulos de
  sección definidos en este contrato, nunca dentro del texto.
- **Frases cortas y directas.** Dos oraciones simples antes que una larga con
  tres ideas encadenadas. La claridad se consigue con estructura, no con
  simplificación del contenido.
- **Los conceptos técnicos se mantienen tal cual.** Un *shard* es un shard, no
  "un pedacito del stream". Un *partition key* es un partition key. La primera
  vez que aparece un término se explica en una frase y **se conserva el nombre
  técnico en inglés** para todo el resto del curso:

  > Cada stream de Kinesis Data Streams se divide en **shards**: unidades de
  > capacidad que definen cuántos datos por segundo puede recibir y entregar el
  > stream. A partir de aquí usaremos siempre el término *shard*.

- **Los ejemplos son reales y profesionales.** Cada concepto importante se
  ancla en un sistema que existe de verdad en una empresa: una cadena de
  supermercados que consolida ventas cada noche, un procesador de pagos que
  detecta fraude en segundos, una flota de camiones que emite telemetría GPS,
  una plataforma de video que analiza el clickstream de sus usuarios.

  **Está prohibido el ejemplo infantilizado.** Nada de cajas de juguetes,
  cajones de calcetines, recetas de cocina ni analogías de fantasía. Si un
  concepto necesita una comparación, la comparación es con **otro sistema real**
  (un almacén logístico, una central telefónica, un archivo bancario), no con
  un objeto doméstico.

- **Los cuatro escenarios recurrentes del curso.** Para que los ejemplos se
  acumulen en vez de dispersarse, el curso reutiliza cuatro empresas ficticias
  pero verosímiles. No hace falta usarlas todas en cada lección: se elige la que
  mejor encaje con el tema.

  | Escenario | Qué hace | Para qué temas sirve |
  |---|---|---|
  | **Andes Retail** | Cadena de supermercados: ventas, inventario y catálogo consolidados cada noche | Batch, Redshift, modelado dimensional, COPY/UNLOAD, ciclo de vida |
  | **Corriente Pagos** | Procesador de pagos: transacciones en tiempo real, detección de fraude, datos regulados | Streaming, KMS, PII, Macie, Lake Formation, auditoría |
  | **RutaSur Logística** | Flota de camiones con telemetría GPS cada 10 segundos | Kinesis, MSK, series temporales, DynamoDB, TTL, particionado |
  | **Mediateca** | Plataforma de video: clickstream y catálogo de contenidos | Athena, Parquet, particiones, Glue, calidad de datos, QuickSight |

  **Cuidado con RutaSur:** toda la familia **AWS IoT está fuera de alcance** del
  examen (ver `COBERTURA.md`, sección 4). Los camiones mandan telemetría
  directamente a Kinesis o MSK, nunca a través de IoT Core. Un ejemplo que use
  IoT Core enseñaría un servicio que no se evalúa.

- **Prohibido minimizar la dificultad.** Nada de "es fácil", "simplemente",
  "obviamente", "basta con". Si al lector no le sale, esas palabras solo lo
  hacen sentir torpe.
- **Nada de datos inventados.** Ver la sección 6.

## 3. Extensión y tiempo de lectura

**Regla dura: ninguna lección puede superar los 15 minutos de lectura.** El rango
objetivo es de 10 a 15 minutos, pero es una guía, no un mínimo que justifique
añadir relleno.

El curso mide el tiempo de lectura a **170 palabras por minuto**, que es un
ritmo realista para prosa técnica en español con términos en inglés
intercalados. De ahí sale el rango:

| | Palabras |
|---|---|
| Mínimo | 1.500 (≈9 min) |
| Máximo | 2.500 (≈15 min) |
| Objetivo | ~2.000 (12 min) |

**El techo de 15 minutos es firme; el piso es orientativo.** Una lección densa en
tablas y cifras —los límites de un servicio, una comparativa— informa más en 1.600
palabras que en 2.200, y estirarla sería el relleno que este contrato prohíbe. Lo
que **nunca** se hace es declarar en la cabecera un tiempo distinto del real: si la
lección dura 9 minutos, la cabecera dice 9.

**El conteo es de la lección completa**, no solo de la sección de contenido:
título, preguntas, contenido, escenarios de examen, respuestas y pistas. Las
tablas cuentan por su texto.

Reparto orientativo por sección (Tipo A):

| Sección | Palabras |
|---|---|
| 🤔 Antes de empezar | 60 – 100 |
| 📘 Contenido | 1.100 – 1.600 |
| 🔍 Cómo lo pregunta el examen | 150 – 250 |
| 💬 Ahora te toca a ti | 200 – 300 |
| ⚠️ No lo confundas con | 80 – 150 |
| 🎯 Pistas para el examen | 120 – 200 |

**Qué hacer cuando un tema no entra.** Se parte en dos lecciones. Nunca se
estira una lección por encima de 2.500 palabras y nunca se recorta la
explicación hasta volverla superficial para que "quepa". El índice del
`README.md` ya prevé esto: varios servicios grandes (Kinesis, Redshift, Glue,
Athena) ocupan dos o tres lecciones a propósito.

**El piso de 1.500 palabras no aplica a las lecciones de tablas comparativas
(★).** Ahí el contenido es tabular y la prosa es mínima por diseño: sirven para
comparar de un vistazo, no para volver a explicar. En ellas se espera un rango
de 900 a 1.600 palabras, y agregar párrafos para llegar a un número sería
justamente el relleno que este contrato prohíbe.

## 4. Este curso no tiene parte práctica

**No se escriben pasos de consola, ni comandos para ejecutar, ni laboratorios,
ni ejercicios de limpieza de recursos.** El curso prepara para un examen de
opción múltiple; el lector no necesita una cuenta de AWS para seguirlo.

Consecuencias concretas:

- **No hay** secciones de "Manos a la obra", "Paso a paso", "Costo y limpieza"
  ni semáforos de costo. Esas son reglas de otro curso.
- **No hay** rutas de consola del tipo `Consola AWS → S3 → Create bucket`.
- **Sí hay** parámetros, límites, cuotas y opciones de configuración —el tamaño
  de buffer de Firehose, los estilos de distribución de Redshift, los modos de
  capacidad de DynamoDB— porque el examen los pregunta. La diferencia es que se
  presentan como **conocimiento a reconocer**, no como pasos a ejecutar.
- **Sí hay** fragmentos de código, JSON o SQL **cuando el examen los muestra**:
  una política IAM, una regla de Lake Formation, un `COPY` de Redshift, una
  consulta de Athena con particiones. Son cortos (menos de 20 líneas), enseñan
  una sola cosa y se explican línea por línea. No están para copiarse y
  ejecutarse, están para leerse y reconocerse.

## 5. Los cinco tipos de lección

### Tipo A — Lección de concepto

Es el formato por defecto. Cabecera fija:

```markdown
# 2.4 — Amazon Kinesis Data Firehose

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 12 min de lectura
```

El *task statement* se cita **con su nombre oficial en inglés**, tal como
aparece en la guía de examen. Es lo que permite auditar, al terminar el curso,
que no quedó ningún task statement sin cubrir.

Y después, exactamente estas seis secciones, en este orden:

#### 1. 🤔 Antes de empezar

Entre 2 y 4 preguntas escritas por nosotros, antes de cualquier contenido. No se
responden aquí. Sirven para que el lector lea buscando la respuesta. Son
abiertas y de criterio ("¿por qué crees que una empresa elegiría X en vez de
Y?"), nunca de sí/no ni de memoria.

#### 2. 📘 Contenido

La explicación del tema. Reglas propias de esta sección:

- **Empieza por el problema, no por el servicio.** Primero qué necesita resolver
  una empresa real, después cómo lo resuelve AWS. Nunca al revés.
- **Explica cómo funciona por dentro**, no solo qué hace. El examen distingue
  candidatos que entienden el mecanismo (por qué un shard limita a 1 MB/s, por
  qué una `DISTKEY` mal elegida provoca *skew*) de los que memorizaron una
  lista de servicios.
- Se permiten subtítulos, listas y tablas. No todo tiene que ser párrafo
  corrido: el lector va a repasar esta lección más de una vez.
- **Cierra siempre con "En resumen"**, de 2 a 4 líneas.

#### 3. 🔍 Cómo lo pregunta el examen

Uno o dos mini-escenarios en el estilo real del DEA-C01, con el razonamiento
para llegar a la respuesta. No son preguntas de opción múltiple completas (esas
van en las lecciones de tipo C): son el planteo y el descarte.

Formato:

```markdown
> Una empresa ingiere 500 GB diarios de logs a S3 y necesita consultarlos con
> Athena. Las consultas filtran casi siempre por fecha y son lentas y caras.
> ¿Qué cambio da la mayor mejora con el menor esfuerzo operativo?

Las palabras que importan son **filtran por fecha** y **menor esfuerzo
operativo**. [...]
```

Aquí se enseña a leer la pregunta: qué palabras del enunciado son la pista
(*most cost-effective*, *least operational overhead*, *near real time*,
*minimal code changes*) y qué opciones se descartan con solo verlas.

#### 4. 💬 Ahora te toca a ti

Se repiten **exactamente las mismas preguntas** de la sección 1, palabra por
palabra. Formato por pregunta:

```markdown
**Pregunta:** (la misma de la sección 1)

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** ...
```

#### 5. ⚠️ No lo confundas con

De 2 a 4 pares de conceptos que el examen mezcla a propósito, una línea cada
uno, con la distinción exacta. Es la sección que más puntos salva en un examen
de nivel associate, donde casi todas las opciones incorrectas son un servicio
parecido al correcto.

```markdown
- **Kinesis Data Streams vs. Data Firehose:** Streams retiene los datos y tú
  escribes el consumidor; Firehose los entrega solo a destinos soportados y no
  puedes leerlos de vuelta.
```

#### 6. 🎯 Pistas para el examen

De 3 a 5 puntos que **no repiten contenido**, sino que enseñan cómo pensar el
tema frente a una pregunta: qué distinción le gusta preguntar a AWS, qué
trampas son comunes entre las opciones, qué principio general permite descartar
respuestas aunque no recuerdes el detalle exacto.

Esta sección es sobre estrategia, no sobre datos nuevos. Si un punto se puede
mover a "Contenido" sin que se note, es que era contenido y está mal ubicado.

### Tipo B — Lección de tablas comparativas (★)

Cierra cada módulo de contenido, justo antes de la lección de preguntas. No
enseña temas nuevos: pone uno junto a otro los servicios del módulo que el
examen confunde.

Cabecera:

```markdown
# 2.13 — ★ Tablas comparativas: servicios de ingesta

> Módulo 2 · Dominio 1 (34 %) · Repaso comparativo · ⏱️ 11 min de lectura
```

Secciones:

1. **📊 Las tablas.** Una tabla por familia de decisión. Las columnas son
   siempre los criterios que el examen usa para decidir: latencia, esfuerzo
   operativo, costo, límites, formato de destino, durabilidad.
2. **🧭 El árbol de decisión.** En bloque de texto: las preguntas en orden que
   llevan de un requisito a un servicio.
3. **⚠️ Los pares que más se confunden.** Igual formato que la sección 5 del
   Tipo A, pero cubriendo todo el módulo.
4. **🎯 Pistas para el examen.**

Aquí **no** van las secciones de preguntas de activación ("Antes de empezar" /
"Ahora te toca a ti"): son lecciones de consulta, y se leen varias veces.

### Tipo C — Lección interactiva de preguntas (quiz)

Cierra cada módulo. **No se escribe en Markdown**: se marca `kind: "quiz"` en
`manifest.ts` y su contenido vive como datos tipados en `preguntas/modulo-N.ts`,
registrados en `preguntas/index.ts`. La app la renderiza con el componente
`ExamQuiz`.

Cantidad de preguntas por módulo, proporcional al peso del dominio:

| Módulo | Dominio | Peso | Preguntas |
|---|---|---|---|
| 1 | Fundamentos (base común, no es un dominio) | — | 15 |
| 2 | Dominio 1 · Ingesta (Task 1.1) | 34 % | 16 |
| 3 | Dominio 1 · Transformación (Task 1.2) | 34 % | 12 |
| 4 | Dominio 1 · Orquestación y programación (Tasks 1.3–1.4) | 34 % | 10 |
| 5 | Dominio 2 · Elegir el almacén (Task 2.1) | 26 % | 14 |
| 6 | Dominio 2 · Catálogo, ciclo de vida y modelado (Tasks 2.2–2.4) | 26 % | 14 |
| 7 | Dominio 3 · Automatización y análisis (Tasks 3.1–3.2) | 22 % | 13 |
| 8 | Dominio 3 · Monitoreo y calidad (Tasks 3.3–3.4) | 22 % | 11 |
| 9 | Dominio 4 · Autenticación y autorización (Tasks 4.1–4.2) | 18 % | 10 |
| 10 | Dominio 4 · Cifrado, auditoría y gobierno (Tasks 4.3–4.5) | 18 % | 10 |

Sumadas, las 110 preguntas de los módulos de dominio reparten los pesos
oficiales: 38 del dominio 1 (34,5 %), 28 del dominio 2 (25,5 %), 24 del dominio
3 (21,8 %) y 20 del dominio 4 (18,2 %).

Reglas de contenido:

- **Formato real del examen:** opción múltiple (1 correcta entre 4) o respuesta
  múltiple (2 o más correctas entre 5 o más, con `multiple: true`). Alrededor
  del 15 % de respuesta múltiple es una proporción realista.
- **Estilo de escenario.** El DEA-C01 casi no pregunta definiciones: pregunta
  situaciones. La mayoría de los enunciados describen una empresa, un volumen,
  un requisito y una restricción, y terminan con una condición de optimización
  (*most cost-effective*, *least operational overhead*, *lowest latency*). Las
  preguntas de este curso se escriben igual.
- **Por cada opción** —correcta o incorrecta— se explica por qué lo es. En las
  incorrectas es donde se enseñan las trampas.
- **Tips por pregunta** (`tips`): 2 o 3 sugerencias que enseñen a *reconocer* el
  tipo de pregunta, no que repitan el dato ya explicado.
- **No es un simulacro cronometrado ni reporta nota.** El objetivo es analizar,
  no medir. El simulacro está en la lección 11.4.

Reglas de diseño del banco de preguntas (fáciles de romper sin darse cuenta):

- **Repartir la respuesta correcta** entre A, B, C y D de forma pareja. Escritas
  de corrido, la correcta tiende a caer siempre en la misma letra.
- **Cubrir cada concepto del módulo como respuesta correcta** al menos una vez,
  no solo como distractor.
- **Los distractores tienen que ser tentadores.** La mejor opción incorrecta es
  la que se confunde de verdad con la correcta (Firehose frente a Data Streams;
  `DISTKEY EVEN` frente a `DISTKEY ALL`; Parameter Store frente a Secrets
  Manager).
- **Ningún distractor puede ser defendible como correcto.** Si alguien con buen
  criterio puede argumentar que también sirve, se reemplaza.
- **Opciones gramaticalmente parejas.** Si tres son frases verbales y una es un
  sustantivo suelto, esa asimetría es una pista involuntaria.
- **Un mismo concepto se nombra siempre igual** en todas las preguntas, y con el
  mismo nombre que usó la lección que lo enseñó.

### Tipo D — Simulacro completo

Una sola lección en todo el curso: **11.4**. Mismo formato de datos que el Tipo C
(`kind: "quiz"`), pero con las condiciones del examen real: **65 preguntas** y
**130 minutos**, repartidas por dominio en la proporción oficial.

| Dominio | Peso | Preguntas del simulacro |
|---|---|---|
| 1. Data Ingestion and Transformation | 34 % | 22 |
| 2. Data Store Management | 26 % | 17 |
| 3. Data Operations and Support | 22 % | 14 |
| 4. Data Security and Governance | 18 % | 12 |

Las preguntas del simulacro **no se reciclan** de los módulos: son nuevas, para
que el resultado signifique algo.

> **Pendiente de la app:** el componente `ExamQuiz` actual no cronometra ni
> reporta un puntaje final. Para que 11.4 funcione como simulacro real hace falta
> agregarle temporizador y resultado por dominio. Mientras eso no exista, la
> lección se puede publicar igual, advirtiendo en la introducción que el lector
> debe cronometrarse por su cuenta.

### Tipo E — Lección de preparación (solo módulo 0)

Las cuatro lecciones del módulo 0 hablan **del examen**, no de contenido
evaluable: qué mide, cómo pregunta, cómo estudiarlo y cómo inscribirse. Forzarlas
al Tipo A produciría secciones de relleno —no hay "trampas del examen" sobre el
trámite de inscripción—, y el relleno está prohibido por este contrato.

Cabecera (sin dominio ni task statement, porque no cubren ninguno):

```markdown
# 0.4 — Inscripción, día del examen y recertificación

> Módulo 0 · Preparación · ⏱️ 12 min de lectura
```

Secciones obligatorias, en este orden:

1. **🤔 Antes de empezar** — igual que en el Tipo A.
2. **📘 Contenido** — igual que en el Tipo A, cerrando con "En resumen".
3. **💬 Ahora te toca a ti** — igual que en el Tipo A.
4. **🎯 Qué te llevas** — de 3 a 5 acciones concretas que el lector puede
   ejecutar hoy. A diferencia de "Pistas para el examen", aquí no se enseña a
   pensar una pregunta: se le dice qué hacer (pedir una acomodación, fijar una
   fecha, reservar horas de estudio).

Sección **opcional**, admitida solo en las lecciones que tratan sobre el formato
de las preguntas (hoy, únicamente la 0.2):

- **🔍 Cómo lo pregunta el examen** — igual que en el Tipo A.

El rango de extensión es el mismo: 1.700 a 2.500 palabras.

**Excepción a la regla de explicar cada término.** El módulo 0 necesita nombrar
servicios y conceptos que el lector todavía no vio —Glue, Firehose, Parquet,
shard— para poder mostrar qué tipo de decisión evalúa el examen. Explicarlos
todos duplicaría medio curso. Por eso, y **solo en el módulo 0**, se admite
nombrarlos sin glosa, con dos condiciones:

- La lección 0.1 abre con un aviso explícito de que esos nombres aparecerán, de
  que no hace falta entenderlos todavía y de que cada uno tiene su lección.
- Se usan como **ejemplos ilustrativos**, nunca como parte de una explicación que
  el lector deba seguir para entender el punto.

A partir del módulo 1 la regla general vuelve a aplicarse sin excepciones.

**Prohibido referenciar archivos internos del repositorio.** El lector ve las
lecciones dentro de la aplicación, no el repositorio: `COBERTURA.md`,
`CONTRATO-DE-CLASES.md` y `manifest.ts` no existen para él. Cuando una lección
necesite remitir a otro contenido, se remite **al número de la lección**
("se repasa en la lección 11.3"). Esta regla aplica a todos los tipos de lección.

Las lecciones de los módulos 1 y 11 tampoco cubren un task statement, pero **sí
enseñan contenido evaluable**, así que usan el Tipo A (o el B) con la cabecera
adaptada: `> Módulo 1 · Fundamentos · ⏱️ 12 min de lectura` y
`> Módulo 11 · Repaso final · ⏱️ 12 min de lectura`.

## 6. Fidelidad al examen (reglas no negociables)

Un curso de certificación que enseña un dato desactualizado hace perder el
examen. Por eso:

- **La guía oficial es la única fuente de verdad del temario.** Los task
  statements se citan textualmente en inglés, tal como aparecen en
  `docs.aws.amazon.com/aws-certification`. Si la guía cambia, cambia el índice
  del curso antes que las lecciones.
- **Solo entran servicios de la lista *In-Scope AWS Services*.** Un servicio
  fuera de esa lista no se enseña, aunque sea popular y aunque un ingeniero de
  datos lo use a diario. Puede mencionarse en una línea si sirve para descartar
  un distractor, y en ese caso se dice explícitamente que está fuera de alcance.
- **Nada de cifras inventadas.** Los límites, cuotas y precios que se citan
  tienen que ser verificables en la documentación de AWS. Cuando se cita una
  cifra que AWS cambia con frecuencia (precios, cuotas por defecto), se marca
  como aproximada y se recuerda verificarla:

  > Un shard admite hasta 1 MB/s o 1.000 registros por segundo de escritura
  > (cuota vigente; AWS ajusta estos límites, conviene contrastarlos con la
  > documentación del servicio).

- **Los nombres cambian y el examen se retrasa.** Varios servicios del temario
  se renombraron. La regla es nombrar **primero como los llama la guía de
  examen** y aclarar el nombre actual entre paréntesis la primera vez de cada
  lección. Casos vigentes:

  | Guía de examen | Nombre actual |
  |---|---|
  | Amazon Kinesis Data Firehose | Amazon Data Firehose |
  | Amazon QuickSight / "Amazon Quick" | Amazon Quick Suite |
  | Amazon DataZone | Amazon SageMaker Catalog |
  | Amazon SageMaker (clásico) | Amazon SageMaker AI |

- **Distinguir "lo correcto en producción" de "lo correcto en el examen".**
  Cuando la respuesta que AWS considera correcta no coincide con lo que haría un
  equipo real, se dice, en una línea y sin polemizar. Es información útil, y
  evita que el lector con experiencia se equivoque por saber demasiado.

## 7. Plantillas listas para copiar

### Tipo A — Lección de concepto

```markdown
# X.Y — Título

> Módulo X · Dominio N (NN %) · Task N.N — Nombre oficial en inglés · ⏱️ 12 min de lectura

## 🤔 Antes de empezar

- Pregunta 1
- Pregunta 2

## 📘 Contenido

[Problema real primero, después el servicio y su mecanismo]

**En resumen:** ...

## 🔍 Cómo lo pregunta el examen

> [Escenario en estilo DEA-C01]

[Qué palabras del enunciado son la pista y qué opciones se descartan]

## 💬 Ahora te toca a ti

**Pregunta:** Pregunta 1

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** ...

## ⚠️ No lo confundas con

- **A vs. B:** la distinción exacta.

## 🎯 Pistas para el examen

- Pista 1
- Pista 2
- Pista 3
```

### Tipo B — Tablas comparativas (★)

```markdown
# X.Y — ★ Tablas comparativas: [familia de servicios]

> Módulo X · Dominio N (NN %) · Repaso comparativo · ⏱️ 11 min de lectura

## 📊 Las tablas

| Servicio | Latencia | Esfuerzo operativo | Costo | Límite que importa |
|---|---|---|---|---|

## 🧭 El árbol de decisión

```
¿Necesitas retener y reprocesar los datos?
├── Sí → ...
└── No → ...
```

## ⚠️ Los pares que más se confunden

- **A vs. B:** ...

## 🎯 Pistas para el examen

- Pista 1
```

## 8. Checklist antes de dar una lección por terminada

**Primero, pasa el verificador automático.** Desde la raíz del repositorio:

```bash
node content/courses/aws-data-engineer-associate/verificar-lecciones.mjs
```

Comprueba lo que se puede medir sin leer: el rango de palabras (y el rango
distinto de las lecciones ★), que el tiempo declarado en la cabecera coincida con
el real a 170 palabras por minuto, que las preguntas de activación y de cierre
sean idénticas palabra por palabra, que no haya palabras prohibidas ni
exclamaciones, que no se referencien archivos internos del repositorio y que no
haya emojis fuera de los títulos. Sale con código 1 si encuentra algo, así que
sirve en un hook o en CI.

Lo que el verificador **no** puede comprobar, y hay que revisar a mano:

- [ ] ¿La cabecera cita el módulo, el dominio con su peso, el task statement
      oficial en inglés y el tiempo de lectura?
- [ ] ¿La lección completa está entre 1.500 y 2.500 palabras (900–1.600 si es ★)?
- [ ] ¿El tiempo declarado en la cabecera coincide con el conteo real a 170
      palabras por minuto?
- [ ] ¿Las preguntas de "Antes de empezar" y "Ahora te toca a ti" son
      exactamente las mismas, palabra por palabra?
- [ ] ¿Cada término técnico nuevo se explicó una vez y después se usó siempre en
      su forma técnica en inglés?
- [ ] ¿Los ejemplos son sistemas reales de empresas, sin analogías domésticas ni
      infantiles?
- [ ] ¿El contenido explica **cómo funciona por dentro**, no solo qué hace?
- [ ] ¿El contenido cierra con "En resumen"?
- [ ] ¿No hay ningún paso de consola, comando ni ejercicio práctico?
- [ ] ¿Todo servicio mencionado está en la lista *In-Scope AWS Services*, o se
      advirtió explícitamente que está fuera de alcance?
- [ ] ¿Las cifras y límites son verificables, y las volátiles están marcadas
      como aproximadas?
- [ ] ¿Los servicios renombrados usan el nombre de la guía de examen con el
      nombre actual entre paréntesis?
- [ ] ¿"Pistas para el examen" enseña una forma de pensar y no repite datos ya
      dichos?
- [ ] ¿Se marcó `[x]` en el `README.md` y coincide con `manifest.ts`?

## 9. Convenciones de archivos

- Un archivo por lección, en `lecciones/`, con el nombre
  `MM-LL-slug-corto.es.md` — `MM` es el módulo con dos dígitos y `LL` la lección
  dentro del módulo. Ejemplo: `02-04-kinesis-data-firehose.es.md`.
- Las lecciones de tipo C y D **no tienen archivo Markdown**: viven en
  `preguntas/modulo-N.ts` y se registran en `preguntas/index.ts`.
- Idioma inicial: **español** (`.es.md`). Las traducciones a `.en.md` y
  `.pt-BR.md` se agregan después; la app ya cae a español cuando falta el
  archivo del idioma pedido.
- El índice vivo del curso está en `README.md`, y se marca `[x]` cada lección al
  terminarla. Al agregar, renombrar o reordenar una lección se cambia primero
  ahí y después se refleja en `manifest.ts`, que es por donde navega la app. El
  `id` de cada lección en el manifest es el nombre del archivo sin `.es.md`.
