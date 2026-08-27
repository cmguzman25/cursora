# 2.4 — Kinesis y Lambda: event source mapping, lotes, paralelismo y errores

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 10 min de lectura

## 🤔 Antes de empezar

- Si una función procesa lotes de registros y uno solo del lote falla, ¿qué crees
  que debería ocurrir con los demás?
- ¿Por qué crees que reintentar indefinidamente un registro que falla siempre
  puede ser peor que descartarlo?
- Si el orden de los eventos importa, ¿qué límite le pone eso al paralelismo con
  el que se pueden procesar?

## 📘 Contenido

Conectar Kinesis Data Streams con **AWS Lambda** es la forma de consumo con menos
esfuerzo operativo, y por eso aparece tanto en las respuestas correctas del
examen. No escribes consumidor, no gestionas checkpoints, no despliegas
servidores.

La pieza que hace la conexión se llama **event source mapping**: un componente
gestionado por Lambda que lee del stream y **invoca tu función pasándole lotes de
registros**. Fíjate en la dirección: no es tu función la que llama a Kinesis, es
el servicio el que la invoca.

Sus parámetros son materia de examen, porque son las palancas con las que se
resuelven los escenarios de rendimiento y de errores.

### Cómo se forman los lotes

| Parámetro | Por defecto | Máximo |
|---|---|---|
| `BatchSize` | 100 registros | **10.000** |
| `MaximumBatchingWindowInSeconds` | 0 segundos | 300 |

La función se invoca cuando se cumple **lo primero** que ocurra: se junta el
número de registros del `BatchSize` o pasa el tiempo de la ventana de agrupación.

De ahí sale una de las decisiones más preguntadas: **una ventana de agrupación
mayor mejora la eficiencia y el costo, pero añade latencia**. Con la ventana en 0,
la función se invoca en cuanto hay registros disponibles, que es lo que se busca
cuando el enunciado pide latencia mínima. Subirla a 30 segundos reduce
drásticamente el número de invocaciones cuando el tráfico es escaso, a cambio de
esperar hasta medio minuto.

### Paralelismo y orden

Por defecto, Lambda procesa **un lote a la vez por shard**. Eso preserva el orden
dentro del shard, que es la garantía que da Kinesis.

El parámetro **`ParallelizationFactor`** permite procesar hasta **10 lotes
simultáneos por shard**, multiplicando el rendimiento sin tocar el número de
shards. Y aquí está la respuesta a la tercera pregunta de activación: **Lambda
sigue respetando el orden por partition key**, porque reparte los lotes
concurrentes agrupando por esa clave. Lo que se pierde es el orden global del
shard, no el de cada clave.

La regla práctica: si el consumo va lento y el problema es la función, no el
stream, subir el factor de paralelización es más barato que añadir shards.

### Desde dónde empieza a leer

El parámetro `StartingPosition` admite tres valores, los mismos de la lección
anterior: `TRIM_HORIZON` (lo más antiguo retenido), `LATEST` (solo lo nuevo) y
`AT_TIMESTAMP` (desde un momento concreto).

Un detalle que se pregunta: **solo se aplica la primera vez**. Una vez que el
event source mapping tiene una posición guardada, continúa desde ahí aunque
modifiques el parámetro.

### Qué pasa cuando un lote falla

Este es el bloque más preguntado, y responde a las dos primeras preguntas de
activación.

Por defecto, si tu función devuelve un error, **Lambda reintenta el lote entero**.
Y como el orden importa, **no avanza**: el mismo lote se reintenta una y otra vez.
Si el fallo lo causa un registro concreto que siempre falla —un mensaje corrupto,
un campo con un tipo inesperado—, ese registro **bloquea el shard indefinidamente**
y el retraso de consumo crece sin parar. A ese registro se le llama **poison pill**
(registro envenenado), y es la respuesta a la segunda pregunta: reintentar para
siempre no es prudencia, es una parada de servicio.

Hay cuatro parámetros para gestionarlo:

| Parámetro | Por defecto | Para qué sirve |
|---|---|---|
| `MaximumRetryAttempts` | -1 (infinito) | Limitar los reintentos antes de descartar el lote |
| `MaximumRecordAgeInSeconds` | -1 (infinito) | Descartar registros más viejos que N segundos (máximo 604.800, una semana) |
| `BisectBatchOnFunctionError` | false | Partir el lote en dos y reintentar cada mitad, para **aislar** el registro que falla |
| `DestinationConfig` | — | Enviar a **SQS o SNS** la información de los lotes descartados |

La combinación que resuelve el escenario clásico es: activar la **bisección** para
que Lambda localice el registro problemático dividiendo el lote sucesivamente,
poner un **límite de reintentos** para que el shard no se bloquee, y configurar un
**destino de fallos** para no perder el rastro de lo descartado.

Existe además una alternativa más fina: **`ReportBatchItemFailures`**. Con ella, la
función devuelve la lista de identificadores de los registros que fallaron, y
Lambda solo reintenta esos en lugar del lote completo. Es la respuesta cuando el
enunciado pide no reprocesar los registros que **sí** funcionaron.

### Ventanas de agregación

El parámetro `TumblingWindowInSeconds` (hasta **900 segundos**) permite que la
función acumule estado entre invocaciones dentro de una ventana fija, para
calcular agregados sencillos sin necesidad de un motor de streaming completo.

Es útil conocerlo para descartar: cuando el enunciado pide agregaciones complejas,
ventanas deslizantes o de sesión, la respuesta ya no es Lambda sino un motor con
estado como el de la lección 2.7.

**En resumen:** el event source mapping lee del stream e invoca tu función con
lotes, formados por `BatchSize` o por la ventana de agrupación, lo que ocurra
antes. El factor de paralelización sube a 10 lotes por shard manteniendo el orden
por partition key. Y un registro que falla siempre bloquea el shard salvo que
configures bisección, límite de reintentos o edad máxima, y un destino para los
descartes.

## 🔍 Cómo lo pregunta el examen

> Una función de Lambda consume un stream de Kinesis. Desde hace horas el retraso
> de consumo crece sin parar y los registros de la función muestran el mismo error
> repetido sobre el mismo lote. El equipo necesita que el procesamiento continúe y
> quiere conservar los registros que no se puedan procesar para analizarlos.
> ¿Qué DOS configuraciones lo consiguen?

Las pistas son **el mismo error sobre el mismo lote**, **el retraso crece** y
**conservar los registros descartados**. Eso es exactamente un poison pill.

Descarta las opciones que aumentan capacidad —más shards, más memoria, más
paralelismo—: el lote seguiría fallando y bloqueando igual, solo que con más
recursos. Y descarta ampliar la retención, que no desbloquea nada.

Las dos configuraciones correctas son **limitar los reintentos** (o la edad máxima
del registro) para que Lambda descarte el lote y avance, y **configurar un destino
en SQS o SNS** para los lotes descartados, que es lo que cumple el requisito de
conservarlos. Activar la bisección suele aparecer como tercera opción válida
cuando el enunciado pide además perder lo mínimo posible.

## 💬 Ahora te toca a ti

**Pregunta:** Si una función procesa lotes de registros y uno solo del lote falla,
¿qué crees que debería ocurrir con los demás?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Idealmente, procesarse y no repetirse. El comportamiento
por defecto no hace eso: Lambda reintenta el lote entero, así que los registros
que sí funcionaron se vuelven a procesar, lo que exige que la función sea
idempotente. Para evitarlo existe `ReportBatchItemFailures`, con la que la función
devuelve los identificadores de los registros fallidos y Lambda reintenta solo
esos. La bisección es la alternativa intermedia: parte el lote para aislar al
culpable.

**Pregunta:** ¿Por qué crees que reintentar indefinidamente un registro que falla
siempre puede ser peor que descartarlo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque bloquea el shard. Como Kinesis garantiza el orden,
Lambda no avanza hasta que el lote se procese, de modo que un solo registro
corrupto detiene todo el procesamiento de ese shard mientras el retraso crece sin
límite. Un registro perdido cuesta un dato; un shard bloqueado cuesta el flujo
entero. Por eso la respuesta correcta suele combinar un límite de reintentos con
un destino donde conservar lo descartado.

**Pregunta:** Si el orden de los eventos importa, ¿qué límite le pone eso al
paralelismo con el que se pueden procesar?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que no se pueden procesar en paralelo registros que deban
mantener un orden entre sí. Kinesis garantiza el orden dentro de un shard, y por
eso Lambda procesa por defecto un lote a la vez por shard. El factor de
paralelización sube ese límite hasta 10, pero sin romper la garantía útil: agrupa
los lotes concurrentes por partition key, de modo que se conserva el orden de cada
clave aunque se pierda el orden global del shard.

## ⚠️ No lo confundas con

- **`BatchSize` vs. `MaximumBatchingWindowInSeconds`:** cuántos registros frente a
  cuánto esperar. La función se invoca con lo primero que se cumpla.
- **`ParallelizationFactor` vs. añadir shards:** el primero paraleliza el consumo
  sin tocar el stream; añadir shards aumenta también la capacidad de escritura y
  cuesta más.
- **Bisección vs. `ReportBatchItemFailures`:** la bisección parte el lote hasta
  aislar al culpable; el informe de fallos parciales identifica exactamente qué
  registros reintentar, sin repetir los buenos.
- **Destino de fallos de Lambda vs. DLQ de SQS:** aquí el destino recibe
  información sobre el **lote descartado**, no los registros originales, que
  siguen en el stream mientras dure la retención.
- **Ventana de agregación de Lambda vs. motor de streaming:** la de Lambda es fija
  y de hasta 900 segundos; las ventanas deslizantes y de sesión exigen un motor con
  estado.

## 🎯 Pistas para el examen

- **"El mismo lote falla una y otra vez y el retraso crece" es un poison pill.**
  Las opciones que añaden capacidad son distractores.
- **Latencia mínima significa ventana de agrupación en 0**; costo mínimo con
  tráfico escaso significa ventana amplia. El enunciado siempre dice cuál pide.
- **Si piden no reprocesar los registros correctos**, la respuesta es informar de
  fallos parciales, no la bisección.
- **El paralelismo por shard llega a 10** y mantiene el orden por partition key. Si
  una opción afirma que paralelizar rompe todo el orden, es imprecisa.
- **`StartingPosition` solo se aplica la primera vez.** Cambiarlo después no
  reprocesa nada, y eso aparece como distractor en preguntas de reproceso.
