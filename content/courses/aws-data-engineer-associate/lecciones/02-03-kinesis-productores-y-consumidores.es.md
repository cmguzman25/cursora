# 2.3 — Kinesis: productores y consumidores, y el enhanced fan-out

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 10 min de lectura

## 🤔 Antes de empezar

- Si cinco equipos leen el mismo flujo de eventos y comparten un límite de
  lectura, ¿qué crees que le pasa al quinto?
- ¿Por qué crees que existe una biblioteca específica para escribir en un flujo,
  en lugar de llamar directamente a la API?
- ¿Qué debería recordar un consumidor entre una ejecución y la siguiente para no
  volver a leer lo mismo?

## 📘 Contenido

Un stream por sí solo no hace nada: hay alguien que escribe (**productor**) y
alguien que lee (**consumidor**). El examen pregunta sobre todo por dos temas de
este apartado: cómo se reparte la capacidad de lectura entre varios consumidores,
y qué opción elegir según el volumen y la latencia.

### Productores: cómo entran los datos

| Forma de escribir | Qué es | Encaja cuando |
|---|---|---|
| **SDK** (`PutRecord`, `PutRecords`) | Llamadas directas a la API | Volumen bajo o control total desde tu código |
| **KPL** (Kinesis Producer Library) | Biblioteca que agrupa y reintenta | Volumen alto, se busca eficiencia |
| **Kinesis Agent** | Agente que vigila archivos y los envía | Enviar logs de un servidor sin escribir código |

La diferencia entre `PutRecord` y `PutRecords` importa: el primero escribe **un**
registro por llamada; el segundo admite **hasta 500 registros** en una sola
llamada. Como los límites del shard cuentan también las llamadas, agrupar es la
forma básica de aprovechar la capacidad.

La **KPL** existe por lo que plantea la segunda pregunta de activación: escribir
registro a registro desde el SDK desperdicia capacidad y complica los reintentos.
La KPL añade tres cosas:

- **Agregación**: empaqueta varios registros de aplicación dentro de un mismo
  registro de Kinesis, lo que permite superar el límite de 1.000 registros por
  segundo por shard cuando los registros son pequeños.
- **Agrupación en lotes** de varias escrituras en una llamada.
- **Reintentos automáticos** con espera progresiva.

El precio es una **latencia adicional**, porque la KPL espera para poder agrupar.
Ese retardo se configura, y es la razón por la que la KPL no encaja cuando se
pide la latencia más baja posible.

### Consumidores: los dos modos de lectura

Aquí está el concepto central de la lección, y responde a la primera pregunta de
activación.

**Modo compartido (*shared throughput*).** Es el comportamiento por defecto.
Todos los consumidores del stream **se reparten los 2 MB/s por shard**. Con dos
consumidores, cada uno dispone de aproximadamente 1 MB/s. Con cinco, de 400 KB/s
cada uno. Además, comparten el límite de **5 llamadas de lectura por segundo por
shard**, así que a partir de tres o cuatro consumidores empiezan a estorbarse.

El consumidor **pide** los datos con `GetRecords`, y ese sondeo tiene un costo en
latencia que crece con el número de lectores: unos **200 ms de media con un solo
consumidor**, que suben hasta cerca de **1.000 ms con cinco**.

**Enhanced fan-out (EFO).** Cada consumidor registrado obtiene **su propio canal
de 2 MB/s por shard**, independiente de los demás. Cinco consumidores con EFO
disponen de 2 MB/s cada uno, sin competir. Y el modelo de entrega cambia: en
lugar de que el consumidor pregunte, **Kinesis le envía** los registros mediante
`SubscribeToShard`. La latencia media baja a unos **70 ms, sea un consumidor o
cinco**.

| | Compartido | Enhanced fan-out |
|---|---|---|
| Capacidad por shard | 2 MB/s **entre todos** | 2 MB/s **por consumidor** |
| Latencia media | ~200 ms con 1 consumidor, ~1.000 ms con 5 | **~70 ms**, con 1 o con 5 |
| Modelo de entrega | El consumidor pide (`GetRecords`) | Kinesis empuja (`SubscribeToShard`) |
| Costo | Incluido | Se paga aparte, por consumidor y por dato |
| Consumidores registrados | — | Hasta **20** por stream |

*(El límite de 20 sube a 50 en el modo On-demand Advantage, disponible solo en
algunas regiones. Cuotas vigentes; conviene contrastarlas con la documentación.)*

La regla del examen es directa: **uno o dos consumidores sin exigencia de latencia
extrema, modo compartido; varios consumidores independientes o latencia baja,
enhanced fan-out**. Y si el enunciado pide la opción más económica y solo hay un
consumidor, EFO es un gasto innecesario.

### Cómo se lee: KCL y el seguimiento de la posición

La tercera pregunta de activación apunta a un problema real: un consumidor que se
reinicia necesita saber por dónde iba. Esa marca se llama **checkpoint**.

La **KCL** (Kinesis Client Library) se encarga de eso y de bastante más:

- **Guarda los checkpoints** en una tabla de DynamoDB que crea automáticamente.
  Ese detalle se pregunta: la tabla se factura aparte y, si está mal
  dimensionada, puede convertirse en el cuello de botella del consumidor.
- **Reparte los shards entre las instancias** de la aplicación consumidora y
  reequilibra cuando una se cae o se añade otra.
- **Se adapta al resharding**, siguiendo los shards nuevos que aparecen tras un
  split o un merge.

Cuando un consumidor arranca, elige desde dónde leer:

- `TRIM_HORIZON`: desde el registro más antiguo que siga retenido.
- `LATEST`: solo lo que llegue a partir de ahora.
- `AT_TIMESTAMP`: desde un momento concreto.

Esa elección es lo que materializa la *replayability*: reprocesar tres días de
histórico es arrancar un consumidor con `TRIM_HORIZON` o con una marca de tiempo,
siempre que la retención lo permita.

### Las opciones de consumo que aparecen en el examen

Además de una aplicación con la KCL, un stream puede consumirse con:

- **AWS Lambda**, mediante un *event source mapping*. Es la opción de menor
  esfuerzo operativo y la más frecuente en las respuestas correctas. Tiene su
  propia lección, la 2.4.
- **Amazon Managed Service for Apache Flink**, cuando hace falta procesamiento con
  estado y ventanas (lección 2.7).
- **Kinesis Data Firehose**, que lee del stream y lo entrega a un destino sin que
  escribas nada (lección 2.5).
- **AWS Glue streaming ETL**, para transformar con Spark en micro-lotes.

**En resumen:** los productores escriben con el SDK, la KPL —que agrupa y reintenta
a costa de latencia— o el agente para archivos. En consumo, el modo compartido
reparte 2 MB/s por shard entre todos los consumidores, mientras que el enhanced
fan-out da 2 MB/s a cada uno, baja la latencia media de unos 200 ms a unos 70 ms
y se paga aparte. La
KCL gestiona checkpoints en una tabla de DynamoDB y reparte los shards entre
instancias.

## 🔍 Cómo lo pregunta el examen

> Cuatro equipos consumen el mismo stream de Kinesis Data Streams con aplicaciones
> propias. Al incorporarse el cuarto, todos los equipos empezaron a notar retrasos
> crecientes y errores de límite de lectura, aunque el volumen de datos escrito no
> ha cambiado. ¿Qué solución resuelve el problema?

Las pistas son **cuatro consumidores**, **el volumen escrito no cambió** y
**retrasos al incorporarse el cuarto**. Si escribir sigue igual y leer empeoró al
sumar un lector, el problema está en el reparto de la capacidad de lectura.

Eso descarta añadir shards: aumentaría la capacidad de escritura y también la de
lectura, pero seguiría repartiéndose entre los cuatro y es una solución cara para
el problema equivocado. También descarta ampliar la retención, que no tiene nada
que ver.

La respuesta correcta es **registrar los consumidores con enhanced fan-out**, para
que cada uno tenga su propio canal de 2 MB/s por shard en lugar de competir por
uno compartido. Cuando el enunciado diga "al añadir un consumidor todos
empeoraron", esa es la respuesta.

## 💬 Ahora te toca a ti

**Pregunta:** Si cinco equipos leen el mismo flujo de eventos y comparten un
límite de lectura, ¿qué crees que le pasa al quinto?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No le pasa solo al quinto: empeoran los cinco. En el modo
compartido, los 2 MB/s por shard y las 5 llamadas de lectura por segundo se
reparten entre todos los consumidores, así que cada nuevo lector reduce la
porción de los demás y aumenta la latencia de todos. La solución es el enhanced
fan-out, que da a cada consumidor registrado su propio canal de 2 MB/s por shard.

**Pregunta:** ¿Por qué crees que existe una biblioteca específica para escribir en
un flujo, en lugar de llamar directamente a la API?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque escribir registro a registro desaprovecha la
capacidad y complica el manejo de errores. La KPL agrupa varios registros de
aplicación dentro de uno de Kinesis, junta varias escrituras en una sola llamada
y reintenta automáticamente, lo que permite exprimir los límites del shard. A
cambio introduce latencia, porque espera para poder agrupar, y por eso no es la
opción cuando se pide la latencia más baja posible.

**Pregunta:** ¿Qué debería recordar un consumidor entre una ejecución y la
siguiente para no volver a leer lo mismo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Hasta qué punto de cada shard llegó: es el checkpoint. La
KCL lo gestiona por ti y lo guarda en una tabla de DynamoDB que crea
automáticamente, lo que conviene recordar porque esa tabla se factura aparte y
puede convertirse en un cuello de botella si queda mal dimensionada. Además de
los checkpoints, la KCL reparte los shards entre las instancias del consumidor y
se adapta cuando el stream cambia de número de shards.

## ⚠️ No lo confundas con

- **KPL vs. KCL:** la KPL es para **producir** —agrega, agrupa y reintenta—; la
  KCL es para **consumir** —checkpoints, reparto de shards y reequilibrio—.
- **Compartido vs. enhanced fan-out:** 2 MB/s por shard repartidos entre todos
  frente a 2 MB/s por shard para cada consumidor registrado, con menos latencia y
  costo aparte.
- **`PutRecord` vs. `PutRecords`:** uno frente a hasta 500 registros por llamada.
  Agrupar importa porque las llamadas también cuentan contra los límites.
- **`TRIM_HORIZON` vs. `LATEST`:** empezar por lo más antiguo retenido frente a
  leer solo lo nuevo. Reprocesar histórico exige lo primero.
- **Agregación de la KPL vs. agrupación en lotes:** la agregación mete varios
  registros de aplicación dentro de un registro de Kinesis; la agrupación manda
  varios registros en una llamada. Sirven para saltarse límites distintos.

## 🎯 Pistas para el examen

- **"Al añadir un consumidor, todos empeoraron" es enhanced fan-out.** Añadir
  shards es el distractor caro.
- **Si solo hay un consumidor y piden lo más económico**, el enhanced fan-out
  sobra: se paga por consumidor y por dato.
- **Cuando el enunciado pida la latencia más baja de lectura**, EFO con sus ~70
  ms gana al modo compartido. Cuando pida la latencia más baja de escritura,
  desconfía de la KPL, que añade retardo por agrupar.
- **Recuerda que la KCL usa una tabla de DynamoDB.** Aparece en preguntas de costo
  inesperado y de cuellos de botella del consumidor.
