# 2.1 — Panorama de la ingesta: fuentes, destinos y las decisiones que pregunta el examen

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 10 min de lectura

## 🤔 Antes de empezar

- Antes de elegir un servicio de ingesta, ¿qué tres cosas necesitarías saber
  sobre los datos que vas a mover?
- ¿Por qué crees que existen tantos servicios de ingesta en AWS si todos acaban
  dejando datos en el mismo sitio?
- Si el sistema de destino se cae durante dos horas, ¿qué debería pasar con los
  datos que llegan mientras tanto?

## 📘 Contenido

Este módulo cubre el task statement **1.1 — Perform data ingestion**, que es la
puerta de entrada del dominio más pesado del examen. Antes de entrar en cada
servicio, conviene tener el marco de decisión: el examen no pregunta "qué es
Kinesis", pregunta "cuál de estos cinco encaja con estos requisitos".

### Las cinco preguntas que ordenan cualquier escenario de ingesta

Cuando leas un enunciado de ingesta, estas cinco preguntas se responden casi
siempre con el propio texto, y cada respuesta descarta opciones.

**1. ¿Flujo continuo o conjunto acotado?** Un flujo de eventos que no termina
lleva a la familia de streaming; archivos que llegan cada noche o una base de
datos que hay que replicar, a la familia de lotes y migración.

**2. ¿Qué latencia se exige?** Recuerda la traducción de la lección 1.2: *real
time* son segundos, *near real time* admite minutos, y un informe diario admite
horas. Esta pregunta decide más respuestas que ninguna otra.

**3. ¿Hay que poder releer los datos?** Es la pregunta que más candidatos pasan
por alto. Algunos servicios **retienen** lo que reciben durante un tiempo, de
modo que un consumidor puede volver atrás y reprocesar. Otros solo **entregan**:
una vez entregado, el dato ya no está en el servicio de ingesta. Si el enunciado
menciona reprocesar, corregir un error de la aplicación o alimentar un consumidor
nuevo con el histórico, esa distinción resuelve la pregunta.

**4. ¿Cuántos consumidores independientes hay?** Un único destino se resuelve con
una entrega directa. Varios equipos que necesitan los mismos datos, cada uno a su
ritmo y sin estorbarse, exigen un servicio que soporte varios lectores sobre el
mismo flujo.

**5. ¿Cuánto se quiere operar?** Es la pregunta de *least operational overhead*:
entre dos servicios que resuelven el caso, el examen premia el que no exige
escribir ni mantener código.

### El mapa: de dónde salen los datos

Las fuentes que aparecen en el examen se agrupan en cuatro tipos, y cada tipo
tiene su familia de servicios.

| Tipo de fuente | Ejemplo | Familia de servicios |
|---|---|---|
| Flujo de eventos | Clics, telemetría, transacciones | Kinesis Data Streams, Firehose, Amazon MSK |
| Base de datos operativa | Pedidos en RDS, catálogo en DynamoDB | AWS DMS, DynamoDB Streams, zero-ETL |
| Archivos | CSV de un proveedor, exportaciones | S3, DataSync, Transfer Family, Snow Family |
| Aplicaciones SaaS y APIs | CRM, plataforma de anuncios | Amazon AppFlow, código propio |

Fíjate en que la fuente **no** determina por sí sola la respuesta: una base de
datos se puede replicar de forma continua con DMS o volcar cada noche a S3. Lo
que decide es la combinación de fuente con latencia y con capacidad de releer.

### Retener frente a entregar: la distinción que más se pregunta

Merece un apartado propio porque el examen la explota una y otra vez.

Un servicio que **retiene** guarda los registros durante un período configurado.
Mientras estén ahí, cualquier consumidor puede leerlos, releerlos y empezar
desde el principio. Eso permite tres cosas:

- **Reprocesar** cuando se descubre un error en la lógica de consumo.
- **Añadir un consumidor nuevo** que necesita el histórico reciente.
- **Recuperarse** de una caída del consumidor sin perder datos.

Un servicio que solo **entrega** toma el dato, lo envía al destino configurado y
se olvida. No hay a dónde volver. A cambio, no hay que escribir consumidor,
ni gestionar posiciones de lectura, ni operar nada.

Ninguno es mejor: son respuestas a preguntas distintas. Corriente Pagos retiene
sus transacciones porque el equipo antifraude reprocesa a menudo; Mediateca
entrega sus clics directamente al data lake porque nadie los va a releer desde el
servicio de ingesta, ya que quedan guardados en S3.

### Qué hacer cuando el destino se cae

La tercera pregunta de activación tiene una respuesta que conviene fijar ahora,
porque reaparece en todo el módulo: **los datos deben acumularse en algún sitio
hasta que el destino vuelva**, y todos los servicios de ingesta gestionados
tienen un mecanismo para eso.

Los patrones que verás:

- **Retención en el propio flujo.** El productor sigue escribiendo y el consumidor
  se pone al día cuando el destino se recupera. Aparece un **retraso de consumo**
  (*consumer lag*) que hay que vigilar.
- **Búfer con reintentos.** El servicio de entrega reintenta durante un período
  configurable y, si no lo consigue, escribe los registros fallidos en un
  destino de error aparte.
- **Cola de mensajes fallidos** (*dead-letter queue*). Lo que no se pudo procesar
  se aparta para revisarlo sin bloquear el resto.

Lo que **nunca** es la respuesta correcta es descartar los datos en silencio.

### El error de arquitectura que el examen castiga

Hay un patrón incorrecto que aparece con frecuencia entre las opciones: **usar un
servicio de streaming para datos que no son un flujo**.

Un escenario típico: una empresa recibe cada noche un archivo de 200 GB de un
proveedor y una opción propone leerlo registro a registro y publicarlo en un
flujo de eventos. Es técnicamente posible, y es caro, lento e innecesario. Los
datos ya están acotados y ya están completos; procesarlos como lote es más
simple y más barato.

El error simétrico también aparece: **acumular un flujo continuo para procesarlo
una vez al día** cuando el enunciado exigía detectar algo en segundos.

**En resumen:** ante un escenario de ingesta, responde cinco preguntas antes de
mirar servicios —flujo o lote, qué latencia, hay que releer, cuántos consumidores
y cuánto se quiere operar—. La distinción entre retener y entregar es la que más
preguntas decide, y ninguna respuesta correcta descarta datos en silencio cuando
el destino falla.

## 🔍 Cómo lo pregunta el examen

> Una empresa publica eventos de su aplicación en un flujo. Tres equipos los
> consumen. Un cuarto equipo necesita ahora los mismos eventos, incluidos los de
> los últimos tres días, y no debe afectar al rendimiento de los otros tres.
> ¿Qué característica del servicio de ingesta hace esto posible?

Las pistas son **incluidos los de los últimos tres días** y **sin afectar a los
otros tres**. La primera exige retención; la segunda, consumidores
independientes.

Eso descarta cualquier opción basada en un servicio que solo entrega al destino:
los eventos de los últimos tres días ya no estarían disponibles para el equipo
nuevo. Y descarta las que proponen que el cuarto equipo lea la salida de otro
consumidor, porque los acopla.

Fíjate en que la pregunta se responde **sin saber configurar nada**: alcanza con
haber entendido qué significa retener y qué significa que varios consumidores
lean el mismo flujo. Ese es el nivel al que hay que llegar antes de estudiar los
parámetros de cada servicio.

## 💬 Ahora te toca a ti

**Pregunta:** Antes de elegir un servicio de ingesta, ¿qué tres cosas necesitarías
saber sobre los datos que vas a mover?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Si forman un flujo continuo o un conjunto acotado, qué
latencia exige el caso de uso, y si hay que poder volver a leerlos. Con esas tres
suele bastar para reducir la lista a uno o dos servicios. Después conviene
comprobar cuántos consumidores independientes habrá y cuánto está dispuesto el
equipo a operar, que es lo que decide entre las opciones que quedan.

**Pregunta:** ¿Por qué crees que existen tantos servicios de ingesta en AWS si
todos acaban dejando datos en el mismo sitio?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque el destino es lo único que comparten. Se
diferencian en el origen del que saben leer, en la latencia que alcanzan, en si
retienen o solo entregan, en cuántos consumidores admiten y en cuánto hay que
operarlos. Un servicio que copia archivos por SFTP y otro que procesa millones de
eventos por segundo resuelven problemas que no se parecen en nada, aunque los dos
terminen escribiendo en almacenamiento de objetos.

**Pregunta:** Si el sistema de destino se cae durante dos horas, ¿qué debería
pasar con los datos que llegan mientras tanto?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Deben acumularse en algún sitio hasta que el destino
vuelva, nunca descartarse en silencio. Según el servicio, eso ocurre de tres
formas: los datos siguen retenidos en el flujo y el consumidor se pone al día
después —acumulando un retraso que hay que vigilar—, el servicio de entrega
reintenta durante un período configurable y manda a un destino de error lo que no
consigue entregar, o los mensajes fallidos se apartan en una cola aparte para
revisarlos sin bloquear el resto.

## ⚠️ No lo confundas con

- **Retener vs. entregar:** retener permite releer y sumar consumidores nuevos;
  entregar es más simple y no exige operar nada, pero el dato no vuelve.
- **Fuente de los datos vs. servicio de ingesta:** una misma base de datos se
  puede replicar de forma continua o volcar por lotes. La fuente no decide sola.
- **Ingesta continua vs. procesamiento en streaming:** se pueden recibir datos de
  forma continua y procesarlos por lotes. Son decisiones separadas.
- **Retraso del consumidor vs. pérdida de datos:** un consumidor atrasado sigue
  teniendo los datos disponibles mientras dure la retención. Solo se pierden si
  la retención expira antes de alcanzarlos.

## 🎯 Pistas para el examen

- **Responde las cinco preguntas antes de leer las opciones.** Flujo o lote, qué
  latencia, si hay que releer, cuántos consumidores y cuánto operar. Cada
  respuesta elimina candidatos.
- **"Reprocesar", "volver a leer" o "un consumidor nuevo necesita el histórico"
  exige retención.** Es la señal más fiable de todo el módulo.
- **Desconfía de las opciones que convierten un lote en un flujo**, o al revés.
  Procesar un archivo nocturno registro a registro por un flujo de eventos es un
  distractor recurrente.
- **Ninguna respuesta correcta descarta datos cuando el destino falla.** Si una
  opción implica pérdida silenciosa, elimínala sin analizarla.
