# 2.6 — Amazon MSK: Kafka gestionado, MSK Serverless y MSK Connect

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 9 min de lectura

## 🤔 Antes de empezar

- Si AWS ya tiene un servicio de flujo de eventos propio, ¿por qué crees que
  ofrece además una versión gestionada de una tecnología de código abierto?
- ¿Qué crees que gana una empresa al poder llevarse su sistema de eventos a otro
  proveedor sin reescribir las aplicaciones?
- Si un flujo debe conservar los datos durante meses en lugar de días, ¿qué
  problema aparece?

## 📘 Contenido

**Amazon MSK** (Managed Streaming for Apache Kafka) es Apache Kafka operado por
AWS: los servidores, los parches, la replicación y la supervisión los gestiona el
servicio, pero **la API es la de Kafka**, no una API propietaria.

Esa frase es la clave para el examen. Responde a las dos primeras preguntas de
activación: MSK existe para quien **ya usa Kafka** o quiere **evitar quedar atado
a un servicio propietario**. Una aplicación escrita contra Kafka se mueve a MSK
sin tocar el código, y puede salir de AWS igual de fácil.

### El vocabulario de Kafka frente al de Kinesis

Los conceptos se corresponden casi uno a uno, y el examen aprovecha la confusión:

| Kinesis Data Streams | Apache Kafka / MSK |
|---|---|
| Stream | **Topic** |
| Shard | **Partition** |
| Partition key | **Message key** |
| Consumidor registrado | **Consumer group** |
| Checkpoint | **Offset** |
| Retención (24 h – 365 días) | Retención **configurable, incluso indefinida** |

Las garantías también se parecen: **el orden se mantiene dentro de una partición,
no entre particiones**, y la clave del mensaje decide en qué partición cae cada
registro. Todo lo que aprendiste sobre hot shards en la lección 2.2 aplica igual
con el nombre de *hot partition*.

Dos diferencias que sí importan:

**La retención puede ser indefinida.** Kafka permite conservar los datos sin
límite de tiempo, y además ofrece **compactación de log**: conservar solo el
último valor de cada clave. Eso responde a la tercera pregunta de activación:
guardar meses de datos es posible, pero el almacenamiento se paga, y por eso MSK
ofrece **almacenamiento por niveles** (*tiered storage*), que mueve los datos
antiguos a un nivel más barato sin dejar de exponerlos a los consumidores.

**Los consumidores se agrupan.** En Kafka, varios procesos forman un *consumer
group* y se reparten las particiones entre ellos; distintos grupos leen el mismo
topic de forma independiente, que es el equivalente natural del fan-out.

### Los dos modos de despliegue

| | **MSK aprovisionado** | **MSK Serverless** |
|---|---|---|
| Capacidad | Eliges tipo y número de brókeres | AWS la ajusta automáticamente |
| Particiones | Las defines tú | Se gestionan por ti |
| Configuración de Kafka | Control completo | Limitada |
| Cobro | Por bróker y hora, más almacenamiento | Por uso |
| Encaja cuando | Tráfico conocido, se necesita afinar | Tráfico variable o impredecible |

La regla es la misma que con Kinesis: **tráfico impredecible o querer no
administrar lleva a Serverless; volumen estable y necesidad de afinar la
configuración lleva a aprovisionado**.

### MSK Connect

**MSK Connect** ejecuta conectores de **Kafka Connect** de forma gestionada. Kafka
Connect es el marco estándar del ecosistema para mover datos entre Kafka y otros
sistemas sin escribir código: hay conectores de origen (*source*), que meten datos
en un topic, y de destino (*sink*), que los sacan hacia una base de datos, un
almacén de objetos o un buscador.

Su valor en el examen es concreto: cuando un escenario menciona que la empresa ya
tiene conectores de Kafka Connect en marcha, o quiere integrar sistemas de
terceros sin programar, MSK Connect es la respuesta y no un consumidor propio.

### Cómo se conecta MSK con el resto de AWS

Esta parte se pregunta más de lo que parece, porque los escenarios suelen pedir
llevar los datos a un data lake:

- **Kinesis Data Firehose puede leer de MSK** y entregar a sus destinos, con la
  conversión de formato incluida. Es el camino de menor esfuerzo para llevar un
  topic a S3 en Parquet.
- **AWS Lambda** puede consumir de MSK mediante un event source mapping, igual que
  con Kinesis.
- **Managed Service for Apache Flink** puede leer y escribir en topics de MSK.
- **AWS Glue** puede hacer ETL en streaming sobre un topic.

Un detalle de red que aparece en preguntas de seguridad: **un clúster de MSK vive
dentro de tu VPC**, así que los consumidores necesitan conectividad de red hacia
él. Kinesis, en cambio, es un endpoint público del servicio al que se accede con
permisos de IAM, sin requisitos de red.

Para la autenticación, MSK admite **IAM**, SASL/SCRAM con credenciales guardadas
en Secrets Manager, y TLS mutuo. Que se pueda usar IAM es lo que suele inclinar la
respuesta cuando el enunciado pide gestionar permisos de forma centralizada.

### Cuándo MSK y cuándo Kinesis

Esta comparación es de las que más aparecen:

| Elige **MSK** cuando | Elige **Kinesis Data Streams** cuando |
|---|---|
| Ya usas Kafka y no quieres reescribir | Empiezas de cero en AWS |
| Necesitas portabilidad entre nubes | La integración nativa con AWS es lo prioritario |
| Necesitas retención indefinida o compactación | 365 días bastan |
| Necesitas conectores de Kafka Connect | Prefieres el menor esfuerzo operativo |
| Necesitas afinar la configuración del motor | No quieres tocar configuración |

Si el enunciado no menciona Kafka ni portabilidad y pide el menor esfuerzo
operativo, **Kinesis suele ganar**: MSK, incluso en su versión Serverless, arrastra
más conceptos que administrar.

**En resumen:** MSK es Kafka gestionado, con la API de Kafka y por tanto sin
dependencia de un servicio propietario. Sus topics y particiones equivalen a los
streams y shards de Kinesis, con las mismas garantías de orden, pero admite
retención indefinida, compactación de log y almacenamiento por niveles. MSK
Connect ejecuta conectores estándar sin código, y el clúster vive en tu VPC.

## 🔍 Cómo lo pregunta el examen

> Una empresa ejecuta Apache Kafka en sus propios servidores con varios conectores
> de Kafka Connect hacia sistemas internos. Quiere migrar a AWS reduciendo al
> máximo el trabajo operativo, sin reescribir las aplicaciones productoras y
> consumidoras y sin perder los conectores existentes. ¿Qué solución lo consigue?

Las pistas son **ya usa Kafka**, **sin reescribir las aplicaciones** y **sin
perder los conectores**. Las tres apuntan en la misma dirección.

Eso descarta migrar a Kinesis Data Streams: sería un servicio válido, pero obliga
a reescribir productores y consumidores contra otra API y a sustituir los
conectores. Cuando el enunciado insiste en no reescribir, cambiar de tecnología no
puede ser la respuesta por muy buena que sea la alternativa.

También descarta desplegar Kafka en instancias EC2 gestionadas por el equipo:
funcionaría y conserva todo, pero contradice "reducir al máximo el trabajo
operativo".

La respuesta correcta es **Amazon MSK con MSK Connect**: misma API, mismos
conectores, y la operación en manos de AWS.

## 💬 Ahora te toca a ti

**Pregunta:** Si AWS ya tiene un servicio de flujo de eventos propio, ¿por qué
crees que ofrece además una versión gestionada de una tecnología de código
abierto?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque muchas empresas ya tienen Kafka en producción, con
aplicaciones, conectores y conocimiento del equipo construidos alrededor. Ofrecer
Kafka gestionado permite migrarlas a AWS sin reescribir nada, que es una barrera
mucho más grande que el precio. Además, hay organizaciones que exigen no depender
de una API propietaria, y una tecnología de código abierto les da esa garantía.

**Pregunta:** ¿Qué crees que gana una empresa al poder llevarse su sistema de
eventos a otro proveedor sin reescribir las aplicaciones?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Capacidad de negociación y reducción de riesgo. Si las
aplicaciones hablan la API de Kafka, mover la plataforma a otro proveedor o a un
centro de datos propio es un cambio de infraestructura, no un proyecto de
reescritura. En el examen, cuando un enunciado menciona portabilidad, evitar la
dependencia de un proveedor o mantener compatibilidad con herramientas de código
abierto, está señalando hacia MSK.

**Pregunta:** Si un flujo debe conservar los datos durante meses en lugar de días,
¿qué problema aparece?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El costo del almacenamiento, que crece de forma lineal con
el tiempo de retención. Kinesis Data Streams llega a 365 días y Kafka admite
retención indefinida, pero en ambos casos se paga por guardar. MSK ofrece dos
mitigaciones: el almacenamiento por niveles, que mueve los datos antiguos a un
nivel más barato sin dejar de exponerlos, y la compactación de log, que conserva
solo el último valor de cada clave cuando el histórico completo no hace falta.

## ⚠️ No lo confundas con

- **Topic/partition vs. stream/shard:** mismo concepto, vocabulario distinto. El
  examen mezcla los términos a propósito.
- **Consumer group vs. enhanced fan-out:** en Kafka, distintos grupos leen el mismo
  topic de forma independiente por diseño; en Kinesis, el aislamiento con capacidad
  propia se contrata con EFO.
- **MSK aprovisionado vs. MSK Serverless:** control de brókeres y configuración
  frente a escalado automático sin gestionar particiones.
- **MSK Connect vs. escribir un consumidor:** Connect ejecuta conectores estándar
  sin código; un consumidor propio implica desarrollarlo y operarlo.
- **MSK en tu VPC vs. Kinesis como endpoint del servicio:** MSK exige conectividad
  de red hacia el clúster; Kinesis se consume con permisos de IAM.

## 🎯 Pistas para el examen

- **"Ya usamos Kafka", "sin reescribir" o "evitar dependencia del proveedor" es
  MSK.** Proponer Kinesis en esos escenarios es el distractor típico.
- **Si no se menciona Kafka y piden el menor esfuerzo operativo, prefiere
  Kinesis.** MSK arrastra más conceptos que administrar aunque sea gestionado.
- **Retención indefinida o compactación de log solo existen en el lado de Kafka.**
  Es un desempate limpio frente a los 365 días de Kinesis.
- **Para llevar un topic de MSK a S3 en Parquet sin código, la respuesta es
  Firehose**, que admite MSK como origen y convierte el formato.
