# 2.15 — Replayability y semántica de entrega: at-least-once, exactly-once e idempotencia

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 10 min de lectura

## 🤔 Antes de empezar

- Un sistema entrega un mensaje y no recibe confirmación. ¿Debería reenviarlo o
  no? ¿Qué se rompe en cada caso?
- ¿Por qué crees que casi ningún sistema distribuido promete entregar cada mensaje
  exactamente una vez?
- Si tuvieras que reprocesar los últimos tres días de datos, ¿qué dos condiciones
  tendrían que cumplirse?

## 📘 Contenido

Esta lección cierra un hilo que empezó en la 1.1 y recorre todo el módulo. Es
conceptual, y por eso mismo se pregunta: son las ideas que permiten descartar
opciones sin recordar ningún parámetro.

### Las tres semánticas de entrega

Un sistema que entrega mensajes puede prometer tres cosas distintas:

**At-most-once (como mucho una vez).** Se envía y no se reintenta. Si se pierde,
se perdió. Rápido y sin duplicados, pero con pérdida. Casi nunca es aceptable para
datos de negocio.

**At-least-once (al menos una vez).** Se reintenta hasta confirmar la entrega. No
se pierde nada, pero **puede haber duplicados**: si la confirmación se pierde en el
camino, el emisor reenvía algo que el receptor ya procesó.

**Exactly-once (exactamente una vez).** Cada mensaje se entrega y se procesa una
sola vez. Es lo que todo el mundo quiere y lo que casi nadie ofrece de forma
general.

### El dilema de la confirmación perdida

La primera pregunta de activación describe el problema de fondo, y merece verlo
despacio porque explica todo lo demás.

Un emisor manda un mensaje y espera confirmación. La confirmación no llega. Hay
dos posibilidades y **el emisor no puede distinguirlas**:

- El mensaje nunca llegó.
- El mensaje llegó, se procesó, y lo que se perdió fue la confirmación.

Si reenvía, arriesga un duplicado. Si no reenvía, arriesga una pérdida. No hay una
tercera opción: la información necesaria para decidir bien no existe en el emisor.

Por eso casi todos los sistemas distribuidos eligen **at-least-once**, que es la
respuesta a la segunda pregunta de activación. Entre perder un dato y duplicarlo,
duplicar es recuperable: el receptor puede detectar y descartar el repetido.
Perder, no.

**Kinesis Data Streams, DynamoDB Streams, SQS estándar y el consumo con Lambda son
todos at-least-once.** El examen espera que lo sepas y que sepas la consecuencia.

### La consecuencia: idempotencia en el consumidor

Si la entrega es at-least-once, **el consumidor tiene que ser idempotente**. No es
una recomendación, es la contrapartida obligatoria.

Las técnicas son las de la lección 1.1, aplicadas al consumo:

- **Clave de deduplicación.** Cada mensaje lleva un identificador único y el
  consumidor registra cuáles procesó. Si vuelve a llegar, lo descarta.
- **Escritura idempotente por naturaleza.** Escribir el estado completo de un
  elemento —sustituir en lugar de sumar— produce el mismo resultado se ejecute una
  o cinco veces. Sumar uno a un contador, no.
- **Escritura condicional.** El destino acepta la escritura solo si se cumple una
  condición, como que el número de secuencia sea mayor que el último registrado.

La frase que conviene fijar: **la entrega exactamente una vez casi nunca la da el
transporte; la consigue el consumidor combinando at-least-once con
idempotencia**. Cuando un enunciado pida "procesar cada evento una sola vez", la
respuesta correcta suele ser hacer idempotente al consumidor, no buscar un
servicio que prometa exactly-once.

### Dónde sí existe algo parecido a exactly-once

Tres casos que el examen usa como matiz:

- **SQS FIFO** ofrece deduplicación dentro de una ventana de cinco minutos y
  entrega ordenada, a cambio de mucho menos rendimiento que la cola estándar.
- **Apache Flink** mantiene un estado consistente con checkpoints, de modo que el
  resultado del procesamiento es correcto aunque se reprocesen eventos tras un
  fallo. Es *exactly-once* en el efecto sobre el estado, no en el número de
  entregas.
- **Kafka** ofrece semántica transaccional en escenarios concretos.

Ninguno convierte el problema en trivial, y por eso la idempotencia sigue siendo
la respuesta general.

### Replayability

**Replayability** es la capacidad de volver a procesar datos ya procesados. La
tercera pregunta de activación pide sus dos condiciones, y son exactamente estas:

**1. El origen tiene que conservar los datos.** Solo se puede releer lo que sigue
existiendo. Esto convierte la retención en una decisión de arquitectura, y explica
la tabla que vimos repartida por el módulo:

| Servicio | Ventana para reprocesar |
|---|---|
| Kinesis Data Streams | 24 horas por defecto, hasta **365 días** |
| Amazon MSK | Configurable, incluso **indefinida** |
| DynamoDB Streams | **24 horas**, no ampliable |
| Kinesis Data Firehose | **No retiene**: no se puede reprocesar desde el servicio |
| Amazon S3 (zona cruda) | Lo que decidan las reglas de ciclo de vida |

**2. El proceso tiene que ser idempotente.** Reprocesar sin idempotencia duplica
los datos ya escritos, que es el problema de la lección 1.1.

Faltando cualquiera de las dos, no hay reproceso posible. Es un descarte muy
rentable en el examen: una opción que proponga reprocesar desde Firehose es
incorrecta por la primera condición, y una que reprocese con un consumidor que
inserta filas lo es por la segunda.

### Por qué la zona cruda es la red de seguridad

De aquí sale una recomendación que atraviesa el curso. La retención de un servicio
de streaming está pensada para recuperarse de fallos operativos, no para archivar.
365 días es mucho, pero es finito y caro.

Por eso el patrón robusto es **escribir siempre una copia cruda en S3**, además de
procesar el flujo. Si dentro de dos años hay que recalcular algo, la fuente no es
el stream: es la zona cruda del data lake. Es la misma idea de ELT de la lección
1.1, ahora con el argumento de la retención detrás.

**En resumen:** at-most-once pierde, at-least-once duplica y exactly-once casi
nadie lo ofrece, porque un emisor no puede distinguir un mensaje perdido de una
confirmación perdida. Los servicios del temario son at-least-once, así que el
consumidor debe ser idempotente mediante deduplicación, escrituras que sustituyan
o escrituras condicionales. Y reprocesar exige dos condiciones a la vez: que el
origen conserve los datos y que el proceso no duplique.

## 🔍 Cómo lo pregunta el examen

> Una empresa procesa transacciones desde un stream con una función que incrementa
> un contador de ventas por comercio en una base de datos. Tras un incidente de
> red, el equipo detecta que algunos comercios muestran importes superiores a los
> reales, aunque no se perdió ninguna transacción. ¿Cuál es la causa y cómo se
> corrige?

Las pistas son **incrementa un contador**, **no se perdió nada** e **importes
superiores a los reales**. Que no falte nada y sobre descarta la pérdida y apunta a
duplicados.

La causa es que la entrega es at-least-once: tras el incidente de red, algunos
registros se reintentaron y se procesaron dos veces. Y la operación elegida es la
peor posible frente a duplicados, porque **incrementar no es idempotente**:
ejecutarla dos veces suma dos veces.

Eso descarta las opciones que atacan la red o que reducen los reintentos:
reintentar menos veces significaría empezar a perder datos, cambiando un problema
por otro peor.

La respuesta correcta hace idempotente al consumidor: **deduplicar por el
identificador de la transacción**, o sustituir el incremento por una escritura
condicional que solo se aplique si esa transacción no se registró antes. Cuando
veas "incrementar" o "sumar" junto a "importes inflados", la respuesta es
idempotencia.

## 💬 Ahora te toca a ti

**Pregunta:** Un sistema entrega un mensaje y no recibe confirmación. ¿Debería
reenviarlo o no? ¿Qué se rompe en cada caso?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No hay respuesta buena, porque el emisor no puede saber si
se perdió el mensaje o solo la confirmación. Si reenvía, arriesga un duplicado; si
no reenvía, arriesga una pérdida. Casi todos los sistemas eligen reenviar
—at-least-once— porque un duplicado es recuperable: el receptor puede detectarlo y
descartarlo. Una pérdida no se recupera. El precio es que la responsabilidad de
deduplicar se traslada al consumidor.

**Pregunta:** ¿Por qué crees que casi ningún sistema distribuido promete entregar
cada mensaje exactamente una vez?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque exigiría distinguir entre un mensaje perdido y una
confirmación perdida, y esa información no existe en el emisor. Garantizarlo de
verdad requiere coordinación transaccional entre emisor y receptor, que cuesta
rendimiento y complejidad y deja de funcionar en cuanto hay varios sistemas por
medio. Lo que sí se consigue es el efecto: entrega at-least-once más un consumidor
idempotente producen el mismo resultado que una entrega única.

**Pregunta:** Si tuvieras que reprocesar los últimos tres días de datos, ¿qué dos
condiciones tendrían que cumplirse?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que el origen todavía conserve esos tres días, y que el
proceso sea idempotente para que reprocesarlos no duplique lo ya escrito. La
primera descarta servicios que no retienen, como Firehose, y obliga a comprobar la
retención configurada: 24 horas por defecto en Kinesis y fijas en DynamoDB Streams
no alcanzan para tres días. La segunda descarta cualquier consumidor que inserte
filas sin deduplicar.

## ⚠️ No lo confundas con

- **At-least-once vs. exactly-once:** el primero puede duplicar y es lo que ofrecen
  los servicios del temario; el segundo casi nunca lo da el transporte.
- **Exactly-once de entrega vs. de efecto:** Flink garantiza que el estado quede
  correcto aunque se reprocesen eventos; eso no significa que cada evento se
  entregue una sola vez.
- **Idempotencia vs. replayability:** que reprocesar no duplique frente a que el
  origen conserve los datos. Reprocesar bien exige las dos.
- **Retención vs. archivado:** la retención de un stream sirve para recuperarse de
  fallos; archivar a largo plazo es trabajo de la zona cruda en S3.
- **SQS estándar vs. FIFO:** la estándar es at-least-once y de alto rendimiento; la
  FIFO deduplica en una ventana de cinco minutos y ordena, con mucho menos
  rendimiento.

## 🎯 Pistas para el examen

- **"Los totales están inflados" con una operación de incremento es idempotencia.**
  Es uno de los patrones más repetidos del examen.
- **Reducir reintentos nunca es la respuesta a los duplicados**, porque empieza a
  producir pérdidas.
- **Antes de aceptar una opción de reproceso, comprueba la retención del origen.**
  Firehose no retiene y DynamoDB Streams solo 24 horas.
- **"Procesar cada evento exactamente una vez" se resuelve en el consumidor**, no
  buscando un servicio que lo prometa.
- **Guardar siempre una copia cruda en S3** es la respuesta cuando el enunciado
  habla de recalcular datos de hace meses o años.
