# 2.2 — Kinesis Data Streams: shards, capacidad, retención y resharding

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 10 min de lectura

## 🤔 Antes de empezar

- Si un flujo de datos se reparte en varias unidades de capacidad, ¿qué crees que
  decide en cuál de ellas cae cada registro?
- ¿Qué problema aparece si todos los registros de un flujo comparten el mismo
  valor en el campo que decide ese reparto?
- Un flujo tiene capacidad de sobra en total, pero una parte de los datos recibe
  errores de límite excedido. ¿Cómo te explicas eso?

## 📘 Contenido

**Amazon Kinesis Data Streams** es el servicio de flujo de eventos de AWS: recibe
registros, los **retiene** durante un período configurado y permite que varios
consumidores los lean de forma independiente. Es el "retener" de la lección
anterior, y esa es su diferencia esencial con Firehose.

### Shards: la unidad de capacidad

Un stream se divide en **shards**: unidades de capacidad que definen cuántos
datos por segundo puede recibir y entregar el flujo. A partir de aquí usaremos
siempre el término *shard*.

Cada shard admite, en modo aprovisionado:

| | Por shard |
|---|---|
| Escritura | **1 MB/s** o **1.000 registros/s** (lo que se agote antes) |
| Lectura (compartida) | **2 MB/s** o **2.000 registros/s** |
| Llamadas de lectura | **5 por segundo**, hasta 10 MB o 10.000 registros por llamada |

*(Cuotas vigentes; AWS las ajusta y conviene contrastarlas con la documentación
del servicio.)*

La capacidad total del stream es la suma de sus shards: 10 shards dan 10 MB/s de
escritura. Si superas el límite, el servicio responde con un error de
`ProvisionedThroughputExceededException`, del que hablaremos en la lección 2.13.

Sobre el **tamaño máximo de un registro** conviene una advertencia. La
documentación actual admite cargas de hasta **10 MiB** usando capacidad de
ráfaga, pero durante años el límite fue de **1 MB**, y ese sigue siendo el número
que aparece en mucho material de examen. Si una pregunta gira alrededor de ese
valor, ten presentes los dos.

### La partition key y cómo se reparten los registros

Cada registro que escribes lleva una **partition key**: una cadena que tú eliges.
Kinesis calcula un hash de esa clave y, según el resultado, asigna el registro a
un shard concreto.

Dos consecuencias que el examen pregunta mucho:

**Los registros con la misma partition key van siempre al mismo shard.** Eso
garantiza que se lean **en orden**. Si necesitas que todos los eventos de un
mismo dispositivo se procesen en secuencia, su identificador es una buena
partition key. **El orden está garantizado dentro de un shard, nunca entre
shards.**

**Una partition key mal elegida desperdicia la capacidad.** Esta es la respuesta
a la tercera pregunta de activación. Si RutaSur Logística usa el modelo del
camión como partition key y el 70 % de su flota es del mismo modelo, ese 70 % del
tráfico cae en un solo shard. Ese shard se satura y devuelve errores mientras los
demás están casi vacíos. El stream tiene capacidad total de sobra; el problema es
el reparto.

Es el mismo fenómeno de **skew** de la lección 1.7, aplicado a la ingesta. Y se
corrige igual: eligiendo una clave de alta cardinalidad y bien distribuida —el
identificador del camión, no su modelo— o añadiendo un sufijo aleatorio cuando no
haya una clave natural, a costa de perder la garantía de orden.

Se le llama **hot shard** o **hot partition** al shard que concentra el tráfico.

### Los dos modos de capacidad

| | **Aprovisionado** | **Bajo demanda** (*on-demand*) |
|---|---|---|
| Cómo se define | Tú fijas el número de shards | AWS ajusta la capacidad automáticamente |
| Capacidad inicial | La que configures | 4 MB/s de escritura y 8 MB/s de lectura |
| Escalado | Manual, con resharding | Automático según el tráfico |
| Cobro | Por shard y hora | Por datos escritos y leídos |
| Encaja cuando | El tráfico es conocido y estable | El tráfico es impredecible o muy variable |

El modo bajo demanda escala hasta **200 MB/s de escritura** en la mayoría de las
regiones, y hasta **10 GB/s** en Norte de Virginia, Oregón e Irlanda. Se puede
**cambiar entre los dos modos dos veces cada 24 horas**.

La regla del examen: si el enunciado dice que el tráfico es impredecible, tiene
picos imprevisibles o el equipo no quiere gestionar capacidad, la respuesta es
bajo demanda. Si dice que el volumen es estable y conocido y se busca el menor
costo, aprovisionado sale más barato.

### Retención: cuánto tiempo se pueden releer los datos

Por defecto, un stream retiene los registros **24 horas**. Ese es también el
mínimo. Se puede ampliar hasta **365 días** (8.760 horas).

Esto es lo que habilita la *replayability* de la lección 1.1: mientras el dato
esté dentro de la ventana de retención, un consumidor puede volver atrás y
leerlo otra vez. Fuera de esa ventana, desaparece.

De ahí una regla práctica: **la retención debe ser mayor que el tiempo máximo que
podrías tardar en detectar y corregir un fallo del consumidor**. Si un equipo
tarda dos días en darse cuenta de que su procesamiento estaba mal, 24 horas de
retención significan datos perdidos para siempre.

### Resharding: cambiar la capacidad de un stream aprovisionado

Ajustar el número de shards se llama **resharding** y tiene dos operaciones:

- **Split**: divide un shard en dos, aumentando la capacidad. Se usa cuando un
  shard se satura.
- **Merge**: fusiona dos shards adyacentes en uno, reduciendo la capacidad y el
  costo.

También existe `UpdateShardCount`, que ajusta el total del stream sin que tengas
que decidir qué shard dividir.

Dos detalles que el examen aprovecha:

- El resharding **no es instantáneo ni gratuito en complejidad**: los shards
  originales quedan en estado cerrado hasta que expira la retención, y los
  consumidores deben terminar de leerlos antes de pasar a los nuevos.
- **Cambiar el número de shards cambia el reparto de las partition keys**, porque
  cambian los rangos de hash. El orden se sigue garantizando por shard, pero un
  mismo dispositivo puede acabar en otro shard tras el resharding.

Si todo esto suena a trabajo operativo, esa es exactamente la razón por la que
existe el modo bajo demanda.

**En resumen:** un stream se divide en shards de 1 MB/s de escritura y 2 MB/s de
lectura; la partition key decide en qué shard cae cada registro, garantiza el
orden dentro del shard y, mal elegida, crea un hot shard que se satura mientras
el resto sobra. El modo bajo demanda evita gestionar capacidad, y la retención
—24 horas por defecto, hasta 365 días— es la ventana en la que se puede releer.

## 🔍 Cómo lo pregunta el examen

> Una empresa ingiere telemetría en un stream de Kinesis Data Streams con 12
> shards. Las métricas muestran que el stream usa menos del 40 % de su capacidad
> total de escritura, pero los productores reciben errores de
> `ProvisionedThroughputExceededException` de forma constante. ¿Cuál es la causa
> más probable?

La contradicción del enunciado es la pista: **capacidad total sobrada** y
**errores de límite excedido**. Si sobra capacidad en conjunto pero falla en la
práctica, el problema no es cuánta hay, sino cómo está repartida.

Eso descarta las opciones que proponen añadir shards: con el reparto actual, los
shards nuevos también quedarían vacíos y el shard caliente seguiría saturado.
También descarta subir el tamaño del lote de escritura, que empeoraría la
concentración.

La respuesta correcta identifica una **partition key de baja cardinalidad** que
concentra el tráfico en un hot shard, y la solución es elegir una clave mejor
distribuida. Cuando veas "hay capacidad pero da errores", piensa siempre en el
reparto antes que en el volumen.

## 💬 Ahora te toca a ti

**Pregunta:** Si un flujo de datos se reparte en varias unidades de capacidad,
¿qué crees que decide en cuál de ellas cae cada registro?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** La partition key, una cadena que elige quien escribe.
Kinesis calcula un hash de esa clave y el resultado determina el shard. La
consecuencia importante es que todos los registros con la misma partition key van
siempre al mismo shard, lo que garantiza que se lean en orden. Entre shards
distintos no hay ninguna garantía de orden.

**Pregunta:** ¿Qué problema aparece si todos los registros de un flujo comparten
el mismo valor en el campo que decide ese reparto?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que todos caen en el mismo shard y lo saturan, mientras el
resto queda desaprovechado. Es un hot shard, y es el mismo problema de sesgo que
aparece en el procesamiento distribuido, solo que en la ingesta. Se corrige
eligiendo una clave de cardinalidad alta y bien repartida, o añadiendo un sufijo
aleatorio si no existe una clave natural, aunque eso hace perder la garantía de
orden por clave.

**Pregunta:** Un flujo tiene capacidad de sobra en total, pero una parte de los
datos recibe errores de límite excedido. ¿Cómo te explicas eso?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque los límites se aplican **por shard**, no al stream
completo. Un shard concreto está superando su 1 MB/s o sus 1.000 registros por
segundo aunque la suma de todos los shards esté muy por debajo de su máximo. Es
la firma de una partition key mal elegida, y añadir más shards no lo arregla: hay
que corregir el reparto.

## ⚠️ No lo confundas con

- **Partition key de Kinesis vs. partition key de DynamoDB:** el nombre coincide y
  la función se parece —repartir por hash—, pero son de servicios distintos y no
  se configuran igual.
- **Capacidad total vs. capacidad por shard:** los límites son por shard. Un
  stream con capacidad sobrada puede estar dando errores en un solo shard.
- **Aprovisionado vs. bajo demanda:** el primero exige decidir y ajustar shards; el
  segundo escala solo y se cobra por datos, no por shard y hora.
- **Retención vs. almacenamiento:** la retención es una ventana temporal para
  releer, no un lugar donde guardar los datos. Pasado el plazo, desaparecen.
- **Split/merge vs. cambio de modo:** el resharding ajusta shards dentro del modo
  aprovisionado; cambiar a bajo demanda elimina esa gestión, y solo se puede hacer
  dos veces cada 24 horas.

## 🎯 Pistas para el examen

- **"Hay capacidad pero da errores de throughput" es siempre partition key.**
  Añadir shards es la opción tentadora e incorrecta.
- **Si el enunciado exige orden de los eventos**, la respuesta pasa por que
  compartan partition key, y hay que recordar que el orden solo se garantiza
  dentro de un shard.
- **Tráfico impredecible lleva a bajo demanda; tráfico estable y buscar el menor
  costo lleva a aprovisionado.** Es una asociación casi automática.
- **Cuando aparezca "reprocesar los últimos N días", comprueba la retención.**
  Por defecto son 24 horas, y ampliarla hasta 365 días es una decisión explícita.
