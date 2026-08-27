# 2.7 — Amazon Managed Service for Apache Flink: ventanas y procesamiento de streams

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 9 min de lectura

## 🤔 Antes de empezar

- Para calcular la media de los últimos cinco minutos sobre un flujo que no
  termina nunca, ¿qué necesita recordar el sistema entre un registro y el
  siguiente?
- Si el proceso que mantiene esa memoria se cae, ¿qué debería ocurrir para que el
  resultado siga siendo correcto?
- ¿Por qué crees que una función que se ejecuta por registro no sirve para
  detectar que un evento **no** ha ocurrido?

## 📘 Contenido

**Amazon Managed Service for Apache Flink** (antes Kinesis Data Analytics) es el
motor de procesamiento de flujos gestionado de AWS. Ejecuta **Apache Flink**, un
motor de código abierto especializado en algo que ni Lambda ni Firehose hacen
bien: **procesamiento con estado sobre datos no acotados**.

Aquí conviene una precisión que ya adelantamos en la lección 1.8: Flink **no
ingiere, procesa**. Aparece en este módulo porque en el examen casi nunca se elige
por separado de la familia de streaming.

### El problema que resuelve

Recupera las transformaciones con estado de la lección 1.2. Corriente Pagos quiere
bloquear una tarjeta cuando se usa en dos países en menos de diez minutos. Para
decidirlo, el sistema debe recordar, en cada instante, **dónde se usó cada tarjeta
activa durante los últimos diez minutos**.

Eso es la respuesta a la primera pregunta de activación: hace falta **estado**, y
mantenerlo no es trivial. Son millones de tarjetas, el estado cambia a cada
segundo, y si el proceso se cae ese estado no puede perderse.

Flink existe para eso. Sus tres capacidades centrales:

**Gestión de estado.** Guarda y recupera el estado de la aplicación de forma
distribuida, con **checkpoints** periódicos. Si un nodo falla, el trabajo se
reanuda desde el último checkpoint con el estado intacto: esa es la respuesta a la
segunda pregunta de activación. Se guardan en almacenamiento duradero gestionado
por el servicio.

**Ventanas.** Las tres de la lección 1.2 —fija, deslizante y de sesión—, con
soporte de primer nivel.

**Semántica de tiempo del evento.** Flink puede agregar por **event time** en lugar
de por processing time, gestionando los datos que llegan tarde mediante
**marcas de agua** (*watermarks*): un mecanismo que indica hasta qué momento el
sistema considera que ya ha recibido todo, y que decide cuándo cerrar una ventana.

### Detectar lo que no ocurre

La tercera pregunta de activación apunta a una capacidad que sorprende: **detectar
la ausencia de un evento**.

Una función que se ejecuta por registro solo puede reaccionar a lo que llega. Si
un pedido genera un evento de "creado" y debe recibir uno de "confirmado" en
quince minutos, ninguna invocación por registro va a dispararse cuando ese segundo
evento **no** aparezca, porque no hay nada que la dispare.

Un motor con estado sí puede: recuerda los pedidos pendientes, mantiene
temporizadores y emite una alerta cuando vence el plazo. Este patrón se llama
**detección de patrones temporales**, y cuando aparece en un enunciado descarta de
golpe las soluciones basadas en funciones sin estado.

### Cómo se programa

Hay dos caminos, y el examen distingue entre ellos:

- **Flink SQL** y las API de Java, Scala o Python. El SQL de streaming permite
  expresar ventanas y agregaciones sin escribir código de aplicación, y es la vía
  de menor esfuerzo cuando el equipo sabe SQL.
- **Notebooks de Studio**, para exploración interactiva sobre el flujo antes de
  desplegar la aplicación de forma continua.

Los orígenes y destinos habituales son **Kinesis Data Streams**, **Amazon MSK**,
**Firehose**, **S3** y bases de datos, lo que permite encadenarlo con el resto del
pipeline.

En capacidad, la aplicación se dimensiona con **KPU** (*Kinesis Processing
Units*), y admite **escalado automático** en función de la carga.

### Cuándo Flink y cuándo otra cosa

Esta es la comparación que decide las preguntas:

| Necesidad | Respuesta |
|---|---|
| Transformar cada registro por separado | Lambda o transformación de Firehose |
| Entregar el flujo a un destino soportado | Firehose |
| Agregar por ventanas, unir dos flujos, detectar patrones | **Flink** |
| Detectar que un evento esperado no llegó | **Flink** |
| Agregación simple por ventana fija corta | Lambda con ventana de agregación |
| Micro-lotes con Spark sobre un flujo | AWS Glue streaming ETL |

La frontera entre Lambda y Flink merece atención. Lambda tiene ventanas fijas de
hasta 900 segundos y puede acumular un estado sencillo, así que para un contador
por ventana fija puede bastar. En cuanto aparecen **ventanas deslizantes o de
sesión, uniones entre flujos, semántica de event time con datos que llegan tarde o
estado grande**, la respuesta es Flink.

Y el desempate por costo: Flink está **encendido de forma continua** y se paga por
KPU y hora. Si el caso se resuelve con una función que solo se ejecuta cuando
llegan datos, Flink es caro de más.

**En resumen:** Flink es el motor con estado del catálogo de AWS. Mantiene estado
distribuido con checkpoints para recuperarse de fallos, soporta las tres clases de
ventana, agrega por event time con marcas de agua y detecta la ausencia de eventos
esperados. Se programa con SQL de streaming o con las API de Java, Scala y Python,
y se dimensiona con KPU.

## 🔍 Cómo lo pregunta el examen

> Una empresa recibe eventos de pedidos en un stream. Cada pedido genera un evento
> `creado` y debe generar un evento `confirmado` en los 15 minutos siguientes. El
> equipo necesita una alerta cuando un pedido no reciba su confirmación en ese
> plazo, con la menor latencia posible. ¿Qué solución cumple el requisito?

La pista decisiva es **cuando un pedido NO reciba su confirmación**. No se pide
reaccionar a un evento, se pide reaccionar a su ausencia.

Eso descarta cualquier opción basada en una función invocada por registro: no hay
nada que la invoque cuando el evento no llega. También descarta una consulta
programada sobre los datos ya almacenados en el data lake, porque el enunciado
pide la menor latencia posible y una consulta periódica añade el intervalo entre
ejecuciones.

La respuesta correcta es una aplicación de **Managed Service for Apache Flink** que
mantenga el estado de los pedidos pendientes con temporizadores por event time y
emita la alerta al vencer el plazo. Cuando veas "detectar que algo no ocurrió",
piensa en un motor con estado.

## 💬 Ahora te toca a ti

**Pregunta:** Para calcular la media de los últimos cinco minutos sobre un flujo
que no termina nunca, ¿qué necesita recordar el sistema entre un registro y el
siguiente?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Los registros de esa ventana, o al menos los acumulados que
permitan recalcular la media: la suma y el número de elementos de los últimos cinco
minutos, por cada clave que se esté agregando. Eso es el estado. Como el flujo no
termina, no existe un momento en el que se pueda procesar todo de una vez: hay que
mantener ese estado vivo, actualizarlo con cada registro y descartar lo que sale
de la ventana.

**Pregunta:** Si el proceso que mantiene esa memoria se cae, ¿qué debería ocurrir
para que el resultado siga siendo correcto?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El estado tiene que poder recuperarse, no reconstruirse
desde cero. Flink guarda checkpoints periódicos del estado en almacenamiento
duradero, de modo que al reiniciar retoma desde el último punto consistente, junto
con la posición de lectura del flujo. Sin ese mecanismo habría dos opciones malas:
perder el estado y dar resultados incorrectos durante la ventana siguiente, o
reprocesar el histórico entero cada vez que algo falla.

**Pregunta:** ¿Por qué crees que una función que se ejecuta por registro no sirve
para detectar que un evento **no** ha ocurrido?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque esa función solo se ejecuta cuando llega un
registro, y la ausencia de un evento no genera ninguno: no hay nada que la
dispare. Detectar una ausencia exige recordar qué se está esperando y tener un
temporizador que salte al vencer el plazo, y eso es procesamiento con estado. Es
uno de los indicadores más fiables de que la respuesta correcta pasa por un motor
de streaming y no por una función.

## ⚠️ No lo confundas con

- **Flink vs. Lambda:** Lambda procesa por registro y admite ventanas fijas cortas;
  Flink mantiene estado grande, ventanas deslizantes y de sesión, y uniones entre
  flujos.
- **Flink vs. Firehose:** Firehose entrega y transforma por registro sin estado;
  Flink calcula sobre el flujo. No compiten.
- **Flink vs. Glue streaming ETL:** ambos procesan flujos, pero Glue trabaja con
  Spark en micro-lotes, mientras que Flink procesa evento a evento con estado y
  menor latencia.
- **Checkpoint de Flink vs. checkpoint de la KCL:** el de Flink guarda el estado de
  la aplicación; el de la KCL guarda solo la posición de lectura del shard.
- **Marca de agua vs. ventana:** la ventana define el intervalo que se agrega; la
  marca de agua decide cuándo se considera cerrado ese intervalo pese a los datos
  que llegan tarde.

## 🎯 Pistas para el examen

- **"Detectar que un evento esperado no llegó" es siempre un motor con estado.**
  Ninguna función por registro puede hacerlo.
- **Ventana deslizante, ventana de sesión o unión de dos flujos descartan Lambda.**
  La ventana fija corta es la única que Lambda cubre.
- **Si el enunciado pide agregar por el momento en que ocurrió el evento y hay
  datos que llegan tarde**, la respuesta necesita event time y marcas de agua.
- **Flink está encendido siempre y se paga por KPU.** Cuando el caso se resuelva
  con una función que solo corre al llegar datos y pidan lo más económico, Flink
  sobra.
