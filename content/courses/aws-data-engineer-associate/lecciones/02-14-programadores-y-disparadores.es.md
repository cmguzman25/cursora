# 2.14 — Programadores y disparadores: EventBridge, S3 Event Notifications y Pipes

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 10 min de lectura

## 🤔 Antes de empezar

- Un archivo llega a un almacén de objetos en un momento impredecible. ¿Qué
  prefieres: comprobar cada cinco minutos si llegó, o que el almacén te avise?
- Si un proceso debe ejecutarse "todos los días a las 3 de la madrugada", ¿de qué
  zona horaria estamos hablando?
- ¿Qué crees que gana un sistema donde quien produce un evento no sabe quién lo va
  a consumir?

## 📘 Contenido

Un pipeline necesita algo que lo ponga en marcha. Hay dos formas, y elegir la
equivocada es un error de arquitectura que el examen castiga.

### Programación frente a evento

**Por programación** (*schedule*): el proceso se ejecuta a intervalos fijos, mire
lo que mire. Encaja cuando el trabajo es periódico por naturaleza —el informe
diario, la consolidación mensual— o cuando el origen no puede avisar.

**Por evento** (*event-driven*): algo ocurre y eso dispara el proceso. Encaja
cuando la llegada del dato es impredecible y se quiere reaccionar pronto.

La primera pregunta de activación describe el caso donde la diferencia se nota. Un
proceso programado cada cinco minutos que comprueba si llegó un archivo tiene tres
defectos: **gasta ejecuciones en balde** la mayoría de las veces, **añade hasta
cinco minutos de retraso** cuando el archivo sí llega, y hay que **recordar qué
archivos ya procesó** para no repetirlos. La notificación del propio almacén evita
los tres.

Regla del examen: **si el origen puede avisar, avisar gana**. El sondeo periódico
solo es la respuesta correcta cuando el origen no ofrece notificaciones.

### S3 Event Notifications

Amazon S3 puede emitir un evento cuando se crea, se elimina o se restaura un
objeto. Los destinos posibles son **Amazon SNS**, **Amazon SQS**, **AWS Lambda** y
**Amazon EventBridge**.

Se pueden filtrar por **prefijo** y por **sufijo**, lo que permite reaccionar solo
a lo que cae en una carpeta concreta o solo a los archivos con una extensión
determinada.

Dos matices que el examen aprovecha:

- **Enviar a SQS en lugar de a Lambda directamente** aporta amortiguación: si
  llegan miles de archivos de golpe, la cola los retiene en lugar de disparar
  miles de invocaciones simultáneas. Es el patrón de la lección anterior aplicado
  aquí.
- **Enviar a EventBridge** abre filtros mucho más ricos y varios destinos por
  evento, a cambio de una pieza más. Es la opción cuando el enunciado pide enrutar
  distintos tipos de archivo a procesos distintos.

### Amazon EventBridge

**EventBridge** es el bus de eventos de AWS. Tres piezas:

- Un **bus** por el que circulan los eventos, que pueden venir de servicios de AWS,
  de aplicaciones propias o de aplicaciones SaaS.
- **Reglas** que filtran esos eventos por su contenido, con patrones sobre el JSON
  del evento.
- **Destinos** (*targets*) a los que se envía lo que coincide: Lambda, Step
  Functions, colas, un job de Glue, y muchos más.

Su valor es el que plantea la tercera pregunta de activación: **desacopla**. Quien
produce el evento no sabe ni le importa quién lo consume. Añadir un consumidor
nuevo es crear una regla, sin tocar al productor. Y **un mismo evento puede
activar varios destinos a la vez**, que es la forma natural de hacer fan-out sin
programar nada.

### EventBridge Scheduler

Para lo programado existe una pieza específica, **EventBridge Scheduler**, más
capaz que las reglas programadas clásicas:

- Admite expresiones **cron** y de **tasa** (cada N minutos, horas o días), y
  también **programaciones de una sola vez**.
- **Admite zona horaria**, lo que responde a la segunda pregunta de activación:
  "las 3 de la madrugada" es ambiguo salvo que se diga en qué zona, y este detalle
  importa de verdad en los países con cambio de hora estacional. Una regla que solo
  entienda UTC ejecutará el proceso a una hora distinta medio año.
- Ofrece una **ventana de tiempo flexible**, que reparte las ejecuciones dentro de
  un margen en lugar de lanzarlas todas en el mismo segundo. Sirve para no crear
  un pico artificial cuando hay muchas programaciones.
- Escala a un número muy alto de programaciones y puede invocar directamente a
  muchos servicios, sin una función intermedia.

### EventBridge Pipes

**Pipes** conecta un origen con un destino de forma punto a punto, con dos pasos
opcionales por el camino:

```
Origen  →  [filtro]  →  [enriquecimiento]  →  Destino
```

- El **origen** puede ser una cola, un stream de Kinesis, un topic de MSK o
  DynamoDB Streams.
- El **filtro** descarta lo que no interesa **antes** de invocar nada, lo que
  ahorra ejecuciones y dinero.
- El **enriquecimiento** puede llamar a una función o a una API para completar el
  evento con datos adicionales.

Su caso de uso en el examen es reconocible: **sustituye a la función de pegamento**
que solo servía para leer de un sitio, filtrar y escribir en otro. Si un enunciado
describe exactamente eso y pide reducir el código a mantener, Pipes es la
respuesta.

### Los programadores propios de cada servicio

Además de EventBridge, varios servicios traen su propia programación, y conviene
saberlo para no añadir piezas de más:

- Los **crawlers de Glue** se pueden programar directamente.
- Los **triggers de Glue** encadenan jobs por horario, por finalización de otro
  job o bajo demanda.
- **Amazon MWAA** (Airflow) programa DAGs por sí mismo.
- **AppFlow** tiene su propia programación de flujos, como vimos en la lección
  2.12.

Si el enunciado ya usa uno de estos servicios, añadir EventBridge solo para
programarlo suele ser una complicación innecesaria.

**En resumen:** el disparo por evento gana al sondeo siempre que el origen pueda
avisar, porque evita ejecuciones en balde, retraso y llevar la cuenta de lo ya
procesado. S3 notifica a SNS, SQS, Lambda o EventBridge, y pasar por una cola
amortigua las ráfagas. EventBridge desacopla productor y consumidores, Scheduler
añade zona horaria y ventanas flexibles, y Pipes sustituye a la función de
pegamento con filtrado y enriquecimiento.

## 🔍 Cómo lo pregunta el examen

> Varios proveedores depositan archivos en un bucket de Amazon S3 en momentos
> impredecibles a lo largo del día. Un proceso programado cada 10 minutos comprueba
> si hay archivos nuevos y los procesa. El equipo quiere reducir la latencia y
> eliminar las ejecuciones que no encuentran nada. Ocasionalmente llegan cientos de
> archivos a la vez. ¿Qué arquitectura lo consigue?

Hay tres requisitos: **reducir latencia**, **eliminar ejecuciones vacías** y
**soportar ráfagas de cientos de archivos**.

Los dos primeros descartan cualquier opción que mantenga el sondeo, aunque sea más
frecuente: reducir el intervalo a un minuto multiplicaría las ejecuciones vacías,
que es justo lo contrario de lo que se pide.

El tercero es el que decide entre las opciones basadas en eventos. Notificar
directamente a una función en cada objeto funciona, pero una ráfaga de cientos de
archivos dispararía cientos de invocaciones simultáneas.

La respuesta correcta usa **notificaciones de S3 hacia una cola de SQS**, y la
función consume de la cola. Así el evento elimina la latencia y las ejecuciones
vacías, y la cola absorbe la ráfaga. Cuando el enunciado mencione "llegan muchos a
la vez", busca la opción que incluya la cola.

## 💬 Ahora te toca a ti

**Pregunta:** Un archivo llega a un almacén de objetos en un momento impredecible.
¿Qué prefieres: comprobar cada cinco minutos si llegó, o que el almacén te avise?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que avise, casi siempre. El sondeo gasta ejecuciones que no
encuentran nada, añade hasta cinco minutos de retraso cuando el archivo sí llega y
obliga a llevar la cuenta de qué se procesó ya para no repetirlo. La notificación
elimina los tres problemas y además indica exactamente qué objeto llegó. El sondeo
solo se justifica cuando el origen no puede notificar.

**Pregunta:** Si un proceso debe ejecutarse "todos los días a las 3 de la
madrugada", ¿de qué zona horaria estamos hablando?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Hay que decirlo explícitamente, porque las programaciones
que solo entienden UTC ejecutarán el proceso a una hora local distinta durante medio
año en los países con cambio horario estacional. Si el informe debe estar listo
antes de que abra el negocio, ese desfase de una hora puede romper el acuerdo de
servicio. EventBridge Scheduler admite zona horaria precisamente para eso, y es una
de sus ventajas sobre las reglas programadas clásicas.

**Pregunta:** ¿Qué crees que gana un sistema donde quien produce un evento no sabe
quién lo va a consumir?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Puede evolucionar sin coordinación. Añadir un consumidor
nuevo es crear una regla en el bus, sin desplegar ni modificar al productor, y si
un consumidor falla no arrastra a los demás. Además, un mismo evento puede activar
varios destinos a la vez, que es la forma de hacer fan-out sin escribir código. El
precio es que el flujo deja de leerse en un solo sitio: hay que mirar las reglas
para saber quién reacciona a qué.

## ⚠️ No lo confundas con

- **Programación vs. evento:** intervalos fijos frente a reaccionar a algo que
  ocurre. Si el origen puede avisar, avisar gana.
- **S3 a Lambda vs. S3 a SQS a Lambda:** el paso por la cola amortigua las ráfagas
  y evita cientos de invocaciones simultáneas.
- **EventBridge vs. EventBridge Scheduler:** el bus enruta eventos que ocurren; el
  Scheduler ejecuta cosas a una hora, con zona horaria y ventanas flexibles.
- **EventBridge Pipes vs. una regla del bus:** Pipes es punto a punto con filtro y
  enriquecimiento; una regla del bus reparte un evento a varios destinos.
- **Notificaciones de S3 vs. eventos de S3 en EventBridge:** las primeras son
  directas y con filtros simples de prefijo y sufijo; las segundas permiten
  patrones ricos y varios destinos, con una pieza más.

## 🎯 Pistas para el examen

- **"Ejecuciones que no encuentran nada" o "reducir la latencia de detección" es
  pasar de sondeo a evento.** Aumentar la frecuencia es el distractor.
- **"Llegan cientos de archivos a la vez" pide una cola entre la notificación y el
  procesamiento.**
- **Si el enunciado menciona zona horaria o cambio de hora, la respuesta es
  EventBridge Scheduler**, no una regla clásica.
- **Una función que solo lee, filtra y reenvía puede sustituirse por Pipes.** Es la
  señal para elegirlo cuando piden reducir código a mantener.
- **Comprueba si el servicio ya trae su propia programación** —Glue, MWAA,
  AppFlow— antes de añadir EventBridge encima.
