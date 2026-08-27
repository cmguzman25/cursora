# 2.16 — Fan-in, fan-out y transacciones stateful frente a stateless

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 10 min de lectura

## 🤔 Antes de empezar

- Cinco equipos necesitan los mismos eventos para fines distintos. ¿Qué te parece
  peor: que cada uno lea del origen, o que uno lea y se los pase a los demás?
- Si diez mil dispositivos escriben en el mismo sistema, ¿qué problema aparece
  antes: el volumen de datos o el número de conexiones?
- ¿Qué diferencia hay entre "contar cuántos eventos llegaron" y "convertir cada
  evento a otro formato", desde el punto de vista de quien lo implementa?

## 📘 Contenido

Esta lección cierra el módulo con tres conceptos que la guía de examen nombra de
forma explícita y que se responden con criterio, no con parámetros.

### Fan-in: muchos productores, un destino

**Fan-in** es la convergencia: muchos orígenes escriben en un mismo sistema. Diez
mil camiones de RutaSur enviando telemetría, miles de instancias de una aplicación
emitiendo eventos.

La segunda pregunta de activación apunta al problema real, y la respuesta suele
sorprender: **antes que el volumen, lo que se agota es el número de conexiones y de
peticiones**. Diez mil dispositivos que envían un registro pequeño cada diez
segundos mueven muy pocos datos, pero generan mil peticiones por segundo, y los
límites de peticiones se agotan antes que los de volumen, como vimos en la lección
2.13.

Las soluciones habituales:

- **Agrupar en el productor.** Enviar cien registros en una llamada en lugar de
  cien llamadas. Es lo que hace la KPL de la lección 2.3.
- **Poner un intermediario que absorba.** Un stream o una cola aceptan la
  convergencia y desacoplan del destino final.
- **Repartir bien la clave.** Si todos los productores usan la misma partition key,
  el fan-in se convierte en un hot shard.

### Fan-out: un origen, muchos consumidores

**Fan-out** es lo contrario: el mismo dato lo necesitan varios destinos. La
primera pregunta de activación plantea la decisión de diseño, y las dos opciones
que menciona son las dos malas:

- **Que cada equipo lea del origen** compite por la capacidad de lectura y
  degrada a todos, como vimos en la lección 2.3.
- **Que uno lea y se lo pase a los demás** crea un acoplamiento: si ese consumidor
  falla o cambia, los cuatro restantes se quedan sin datos, y añadir un quinto
  obliga a modificarlo.

La respuesta correcta es que **el sistema haga el fan-out**, y en AWS hay cuatro
formas según el contexto:

| Mecanismo | Cómo funciona | Encaja cuando |
|---|---|---|
| **Enhanced fan-out** de Kinesis | Cada consumidor registrado tiene 2 MB/s propios por shard | Ya hay un stream y varios consumidores compiten |
| **Consumer groups** de Kafka | Cada grupo lee el topic de forma independiente | El sistema es MSK |
| **SNS con varias colas suscritas** | El topic replica cada mensaje a todas las colas | Mensajería, cada consumidor a su ritmo |
| **EventBridge con varios destinos** | Una regla por consumidor sobre el mismo evento | Enrutar por contenido a procesos distintos |

El patrón de **SNS con colas de SQS suscritas** merece atención porque es muy
preguntado: el topic entrega una copia del mensaje a cada cola, y cada consumidor
procesa la suya a su propio ritmo, con sus propios reintentos y su propia cola de
mensajes fallidos. Un consumidor lento no afecta a los demás.

La propiedad que comparten los cuatro mecanismos es la misma: **añadir un
consumidor no obliga a tocar al productor ni a los consumidores existentes**.

### Transacciones stateful y stateless

La tercera pregunta de activación introduce la distinción que la guía nombra como
"stateful and stateless data transactions", y que ya apareció en la lección 1.2.

Una operación **stateless** (sin estado) se resuelve con la información del propio
registro. Convertir un formato, validar un campo, filtrar por país, enmascarar un
teléfono. El resultado de procesar un registro no depende de ningún otro.

Una operación **stateful** (con estado) necesita información acumulada de otros
registros. Contar cuántos eventos llegaron, calcular una media móvil, detectar que
falta un evento esperado, unir dos flujos.

Lo que cambia para quien lo implementa —que es lo que pregunta la activación— es
casi todo:

| | Stateless | Stateful |
|---|---|---|
| Escalado | Trivial: se añaden procesos | Limitado: el estado debe repartirse por clave |
| Recuperación ante fallos | Reprocesar el registro | Recuperar el estado desde un checkpoint |
| Orden de los registros | Irrelevante | A menudo crítico |
| Servicios que encajan | Lambda, transformación de Firehose | Flink, Spark streaming |
| Costo | Se paga por ejecución | Se paga por estar encendido |

De ahí la regla de decisión más útil del módulo:

> **Si la operación es stateless, elige lo más simple y barato que exista.** Si es
> stateful, la respuesta necesita un motor que gestione y recupere estado.

Y el corolario que descarta opciones: una función invocada por registro **no
puede** resolver una agregación por ventana deslizante, por muchos ajustes que se
le hagan.

### El punto intermedio

Hay un caso que conviene reconocer porque el examen lo usa para afinar: **una
agregación por ventana fija corta sí cabe en Lambda**, con el parámetro de ventana
de agregación de la lección 2.4, que llega a 900 segundos.

Es el matiz que separa dos respuestas plausibles. Si el enunciado pide un total
por cada intervalo de cinco minutos, Lambda basta y es más barata. Si pide una
media de los últimos cinco minutos recalculada cada minuto —ventana deslizante—,
hace falta Flink.

**En resumen:** el fan-in converge muchos productores en un destino y su límite
suele ser el número de peticiones antes que el volumen, así que se agrupa en el
productor y se reparte bien la clave. El fan-out lo debe hacer el sistema —enhanced
fan-out, consumer groups, SNS con colas o EventBridge—, nunca un consumidor que
reparta a otros. Y lo stateless escala y se recupera de forma trivial, mientras que
lo stateful exige un motor que gestione estado.

## 🔍 Cómo lo pregunta el examen

> Una empresa publica eventos de pedidos que consumen tres equipos: facturación,
> análisis y notificaciones. Hoy, el equipo de facturación lee los eventos y los
> reenvía a los otros dos. Cuando el procesamiento de facturación se retrasa, los
> otros dos equipos dejan de recibir datos. Se quiere añadir un cuarto consumidor
> sin modificar nada de lo existente. ¿Qué arquitectura lo resuelve?

Las pistas son **uno lee y reenvía a los demás**, **si uno se retrasa los otros se
quedan sin datos** y **añadir un cuarto sin modificar nada**. Describen un
acoplamiento, no un problema de capacidad.

Eso descarta las opciones que dan más recursos al consumidor de facturación:
aliviarían el retraso, pero los otros dos equipos seguirían dependiendo de él, y
añadir un cuarto seguiría exigiendo modificarlo.

La respuesta correcta traslada el fan-out al sistema, de forma que cada equipo
consuma de manera independiente: un **topic de SNS con una cola por consumidor**, o
consumidores con **enhanced fan-out** sobre el stream si ya existe uno. Cuando el
enunciado diga "sin modificar los consumidores existentes", busca la opción donde
sumar un consumidor sea solo suscribir uno más.

## 💬 Ahora te toca a ti

**Pregunta:** Cinco equipos necesitan los mismos eventos para fines distintos. ¿Qué
te parece peor: que cada uno lea del origen, o que uno lea y se los pase a los
demás?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Las dos son malas, por motivos distintos. Que cada uno lea
del origen hace que compitan por la capacidad de lectura y se degraden entre sí.
Que uno lea y reparta crea una dependencia: si ese consumidor falla o se retrasa,
los otros cuatro se quedan sin datos, y añadir un quinto obliga a modificarlo. Lo
correcto es que el fan-out lo haga el sistema —enhanced fan-out, consumer groups,
SNS con colas o EventBridge—, de modo que sumar un consumidor no toque a nadie.

**Pregunta:** Si diez mil dispositivos escriben en el mismo sistema, ¿qué problema
aparece antes: el volumen de datos o el número de conexiones?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Casi siempre el número de peticiones. Diez mil dispositivos
enviando un registro pequeño cada diez segundos mueven muy pocos megabytes, pero
generan mil peticiones por segundo, y los límites de peticiones por shard o por
partición se agotan antes que los de volumen. Por eso la solución habitual es
agrupar en el productor —enviar cien registros en una llamada— antes que aumentar
la capacidad.

**Pregunta:** ¿Qué diferencia hay entre "contar cuántos eventos llegaron" y
"convertir cada evento a otro formato", desde el punto de vista de quien lo
implementa?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Convertir es stateless: cada registro se resuelve con su
propia información, así que escalar es añadir procesos, recuperarse de un fallo es
reprocesar ese registro y el orden da igual. Contar es stateful: hay que mantener
un acumulado, repartirlo por clave para poder escalar, recuperarlo desde un
checkpoint tras un fallo y a menudo respetar el orden. Lo primero cabe en una
función por registro; lo segundo exige un motor que gestione estado.

## ⚠️ No lo confundas con

- **Fan-in vs. fan-out:** muchos productores hacia un destino frente a un origen
  hacia muchos consumidores.
- **Fan-out del sistema vs. un consumidor que reparte:** el primero desacopla; el
  segundo crea una dependencia y obliga a tocarlo para añadir consumidores.
- **SNS con colas vs. una sola cola con varios consumidores:** el topic entrega una
  copia a cada cola; en una única cola, cada mensaje lo procesa **un solo**
  consumidor.
- **Stateless vs. stateful:** resolver con el propio registro frente a necesitar
  información acumulada. Decide el servicio, el escalado y la recuperación.
- **Ventana fija corta vs. ventana deslizante:** la primera cabe en Lambda; la
  segunda exige un motor con estado.

## 🎯 Pistas para el examen

- **"Sin modificar los consumidores existentes" pide fan-out del sistema.** Si la
  opción obliga a tocar al productor o a un consumidor, es incorrecta.
- **"Un consumidor lento bloquea a los demás" es acoplamiento**, no falta de
  capacidad. Dar más recursos es el distractor.
- **Muchos productores pequeños agotan las peticiones antes que el volumen.**
  Agrupar en el productor suele ganar a aumentar la capacidad.
- **Antes de elegir servicio, clasifica la operación.** Stateless admite lo más
  simple y barato; stateful obliga a un motor con estado, y esa sola clasificación
  descarta la mitad de las opciones.
