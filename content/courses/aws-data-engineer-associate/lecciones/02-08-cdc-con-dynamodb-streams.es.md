# 2.8 — Change data capture con DynamoDB Streams y Kinesis Data Streams

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 9 min de lectura

## 🤔 Antes de empezar

- Para llevar a un data lake los cambios de una base de datos, ¿qué crees que es
  mejor: consultarla cada pocos minutos o que ella avise cuando algo cambia?
- Si un registro se modifica, ¿qué información necesitarías además del valor
  nuevo?
- ¿Qué problema tendría un proceso que cada noche copia la tabla entera de 500
  millones de filas para detectar qué cambió?

## 📘 Contenido

**Change data capture** (CDC) es la técnica de capturar los cambios de una base de
datos —inserciones, modificaciones y borrados— a medida que ocurren, en lugar de
consultar periódicamente su estado.

Responde a la tercera pregunta de activación. La alternativa clásica es el
**sondeo** (*polling*): consultar cada cierto tiempo qué filas tienen una marca de
tiempo posterior a la última ejecución. Tiene tres defectos graves:

- **Carga la base operativa.** Escanear una tabla enorme compite con el tráfico de
  la aplicación, que es lo que los pipelines deben evitar.
- **No detecta los borrados.** Una fila eliminada no aparece en ninguna consulta,
  así que el destino conserva datos que ya no existen.
- **Pierde los cambios intermedios.** Si una fila se modifica tres veces entre dos
  ejecuciones, el sondeo solo ve el último valor.

CDC resuelve los tres, porque lee el **registro de cambios** de la propia base de
datos: cada modificación queda anotada en orden, con su tipo de operación.

### DynamoDB Streams

**DynamoDB Streams** es el registro de cambios de una tabla de DynamoDB. Cuando se
activa, cada inserción, modificación o borrado genera un registro en el stream, en
el mismo orden en que ocurrió **por clave de partición**.

Al activarlo se elige **qué información contiene cada registro** (*stream view
type*), y esta elección es la respuesta a la segunda pregunta de activación:

| Vista | Qué incluye | Encaja cuando |
|---|---|---|
| `KEYS_ONLY` | Solo las claves del elemento | Alcanza con saber que algo cambió |
| `NEW_IMAGE` | El elemento después del cambio | Replicar el estado actual |
| `OLD_IMAGE` | El elemento antes del cambio | Auditar qué había |
| `NEW_AND_OLD_IMAGES` | Ambos | **Detectar qué campos cambiaron** |

La última es la que permite calcular diferencias y la que suele pedir un enunciado
que hable de auditoría o de reaccionar solo a ciertos cambios.

Dos límites que se preguntan:

- La **retención es de 24 horas**, y no se puede ampliar. Es mucho menos que los
  365 días de Kinesis Data Streams, y define la ventana para recuperarse de un
  fallo del consumidor.
- Se recomienda **no más de dos procesos leyendo el mismo shard** de forma
  simultánea; con más, el rendimiento se degrada.

El consumidor habitual es **Lambda**, mediante un event source mapping con los
mismos parámetros de la lección 2.4: tamaño de lote, ventana de agrupación,
factor de paralelización, bisección y destino de fallos.

### Kinesis Data Streams for DynamoDB

Existe una segunda opción: enviar los cambios de la tabla a un **stream de Kinesis
Data Streams** en lugar de a DynamoDB Streams. Es la alternativa cuando los
límites de arriba estorban.

| | **DynamoDB Streams** | **Kinesis Data Streams for DynamoDB** |
|---|---|---|
| Retención | 24 horas, fija | Hasta **365 días**, configurable |
| Consumidores | Hasta 2 por shard recomendados | Muchos, con enhanced fan-out |
| Orden | Garantizado por clave | **Puede haber duplicados y desorden** |
| Integraciones | Lambda | Todo el ecosistema Kinesis: Firehose, Flink, Glue |

Fíjate en la fila del orden, porque es una diferencia real y contraintuitiva: al
enviar los cambios a Kinesis, el registro puede llegar **duplicado o fuera de
orden**, así que el consumidor debe ser idempotente y usar la marca de tiempo del
cambio para ordenarlos. Si el enunciado exige orden estricto por clave, la
respuesta es DynamoDB Streams.

La regla de decisión: **retención larga, muchos consumidores o integración con
Firehose y Flink llevan a Kinesis; orden estricto y simplicidad llevan a DynamoDB
Streams**.

### El patrón completo hacia el data lake

El camino habitual que aparece en los escenarios:

```
Tabla de DynamoDB
   │  (cambios)
   ▼
DynamoDB Streams  ──►  Lambda  ──►  Firehose  ──►  S3 (Parquet)
   o
Kinesis Data Streams  ──►  Firehose  ──►  S3 (Parquet)
```

La segunda variante tiene menos piezas y menos código, y por eso suele ganar en
preguntas de *least operational overhead*.

Existe además una opción sin ninguna pieza intermedia: la **integración zero-ETL
de DynamoDB con Amazon Redshift**, que es el tema de la lección 2.10. Y para
exportar el histórico completo, DynamoDB ofrece **exportación a S3** desde copias
de seguridad continuas, sin consumir capacidad de lectura de la tabla — que es la
respuesta cuando el enunciado pide un volcado inicial y no un flujo de cambios.

### TTL y borrados

Un detalle que aparece en preguntas combinadas: cuando DynamoDB elimina un
elemento por su **TTL** (*time to live*), el borrado también genera un registro en
el stream, marcado como generado por el servicio. Eso permite archivar en el data
lake los elementos que expiran, en lugar de perderlos: un patrón habitual de
retención escalonada.

**En resumen:** CDC captura los cambios de una base de datos desde su registro de
cambios, lo que evita cargar el sistema operativo, detecta los borrados y no pierde
los cambios intermedios. DynamoDB Streams retiene 24 horas, garantiza el orden por
clave y admite hasta dos lectores por shard; enviar los cambios a Kinesis amplía la
retención a 365 días y abre el ecosistema, a costa de posibles duplicados y
desorden.

## 🔍 Cómo lo pregunta el examen

> Una empresa replica los cambios de una tabla de DynamoDB hacia su data lake con
> un proceso que cada 15 minutos consulta las filas modificadas por su marca de
> tiempo. El equipo detecta dos problemas: los elementos eliminados siguen
> apareciendo en el data lake y la tabla sufre picos de latencia cada vez que el
> proceso se ejecuta. ¿Qué solución corrige ambos?

Los dos síntomas apuntan a la misma causa: **el sondeo**. Los borrados no aparecen
en ninguna consulta, y escanear la tabla compite con el tráfico de la aplicación.

Eso descarta las opciones que ajustan el sondeo: reducir el intervalo empeora los
picos de latencia, y aumentarlo retrasa los datos sin resolver los borrados.
También descarta añadir capacidad de lectura a la tabla, que trata el síntoma y
no la causa, y sigue sin ver los borrados.

La respuesta correcta sustituye el sondeo por **captura de cambios**, activando el
stream de la tabla y consumiéndolo. Cuando el enunciado mencione borrados que no
se propagan **junto con** carga sobre la base de origen, la respuesta es CDC.

## 💬 Ahora te toca a ti

**Pregunta:** Para llevar a un data lake los cambios de una base de datos, ¿qué
crees que es mejor: consultarla cada pocos minutos o que ella avise cuando algo
cambia?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que avise, salvo casos muy sencillos. El sondeo carga la
base operativa con escaneos que compiten con la aplicación, no detecta los
borrados —una fila eliminada no aparece en ninguna consulta— y pierde los cambios
intermedios si una fila se modificó varias veces entre dos ejecuciones. Leer el
registro de cambios evita los tres problemas y además da menor latencia.

**Pregunta:** Si un registro se modifica, ¿qué información necesitarías además del
valor nuevo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El valor anterior y el tipo de operación. Con el valor
antiguo puedes calcular qué campos cambiaron, auditar el cambio y reaccionar solo
cuando se modifica algo concreto; con el tipo de operación distingues una
inserción de una modificación o un borrado, que es lo que permite replicar el
estado correctamente. En DynamoDB Streams eso se configura al activar el stream, y
la opción que da ambas imágenes es `NEW_AND_OLD_IMAGES`.

**Pregunta:** ¿Qué problema tendría un proceso que cada noche copia la tabla entera
de 500 millones de filas para detectar qué cambió?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Es caro, lento y compite con la carga operativa: leer 500
millones de filas consume capacidad que la aplicación necesita, y el proceso tarda
tanto que la latencia de los datos es de un día entero. Además obliga a comparar
el volcado con el anterior para saber qué cambió, lo que duplica el trabajo. CDC
mueve solo los cambios, que suelen ser una fracción diminuta de la tabla, y lo
hace de forma continua.

## ⚠️ No lo confundas con

- **CDC vs. sondeo:** leer el registro de cambios frente a consultar el estado. El
  sondeo no ve los borrados ni los cambios intermedios.
- **DynamoDB Streams vs. Kinesis Data Streams for DynamoDB:** 24 horas y orden
  garantizado frente a 365 días y todo el ecosistema, con posibles duplicados y
  desorden.
- **Stream de cambios vs. exportación a S3:** el stream da los cambios de forma
  continua; la exportación vuelca el estado completo sin consumir capacidad de
  lectura. Para un volcado inicial, exportación.
- **`NEW_IMAGE` vs. `NEW_AND_OLD_IMAGES`:** replicar el estado actual frente a poder
  calcular qué cambió.
- **Borrado del usuario vs. borrado por TTL:** ambos generan un registro en el
  stream, pero el segundo va marcado como generado por el servicio.

## 🎯 Pistas para el examen

- **"Los borrados no llegan al destino" es la firma del sondeo.** La respuesta es
  CDC, no ajustar la frecuencia.
- **Si el enunciado pide retención mayor de 24 horas o varios consumidores sobre
  los cambios de DynamoDB**, la respuesta es enviarlos a Kinesis Data Streams.
- **Si exige orden estricto por clave y sin duplicados**, la respuesta es DynamoDB
  Streams: la ruta por Kinesis no lo garantiza.
- **Para un volcado inicial del histórico, exportación a S3.** Recorrer la tabla
  con un job es el distractor que consume capacidad de la aplicación.
