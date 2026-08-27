# 2.13 — Throttling, límites de tasa y reintentos

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 10 min de lectura

## 🤔 Antes de empezar

- Si un servicio rechaza tus peticiones porque van demasiado rápido, ¿qué crees
  que pasa si todos tus procesos reintentan al mismo tiempo?
- ¿Por qué crees que un servicio prefiere rechazar peticiones antes que
  aceptarlas y responder despacio?
- Una base de datos aguanta el tráfico normal pero se cae cuando arranca el
  proceso nocturno de carga. ¿Qué pondrías entre los dos?

## 📘 Contenido

**Throttling** es el rechazo deliberado de peticiones que superan un límite. No es
un fallo del sistema: es un mecanismo de protección.

Responde a la segunda pregunta de activación. Un servicio que aceptara todo y
respondiera cada vez más despacio acabaría degradándose para **todos** sus
usuarios, con las peticiones acumulándose hasta agotar la memoria. Rechazar rápido
lo que excede el límite mantiene el servicio predecible para quien sí está dentro
de su cuota, y le devuelve al cliente una señal clara de que debe bajar el ritmo.

En el examen, el throttling aparece de dos formas: como **síntoma a
diagnosticar** y como **problema a evitar por diseño**.

### Dónde aparece en los servicios del temario

| Servicio | Qué se limita | Error típico |
|---|---|---|
| **Kinesis Data Streams** | 1 MB/s y 1.000 registros/s **por shard** | `ProvisionedThroughputExceededException` |
| **DynamoDB** | Capacidad de lectura y escritura, **por partición** | `ProvisionedThroughputExceededException`, `ThrottlingException` |
| **Amazon S3** | ~5.500 peticiones/s por índice de prefijos | `SlowDown` |
| **Amazon RDS / Aurora** | Número de **conexiones** simultáneas | Errores de conexión rechazada |
| **APIs de terceros** | Peticiones por minuto según contrato | Código HTTP 429 |
| **APIs de AWS** | Llamadas por segundo a la API del servicio | `ThrottlingException` |

Fíjate en el patrón de las dos primeras filas, que ya vimos en las lecciones 2.2 y
1.5: **el límite se aplica a una unidad interna, no al total**. Un stream con
capacidad total sobrada puede estar rechazando escrituras en un shard concreto, y
una tabla de DynamoDB con capacidad de sobra puede estar rechazando escrituras en
una partición caliente. Cuando el enunciado diga "hay capacidad pero da errores",
la causa está en el reparto: una clave mal elegida.

### Cómo se reintenta bien

La primera pregunta de activación describe un fallo clásico. Si un servicio
rechaza peticiones y todos los clientes reintentan **inmediatamente y a la vez**,
llega una segunda oleada tan grande como la primera, que también se rechaza. El
sistema entra en un ciclo del que no sale, y esto se llama **tormenta de
reintentos**.

La solución tiene dos partes, y el examen espera las dos:

**Espera exponencial** (*exponential backoff*). Cada reintento espera el doble que
el anterior: 100 ms, 200 ms, 400 ms, 800 ms. Así el ritmo total baja rápido en
lugar de mantenerse.

**Aleatorización** (*jitter*). Añadir una variación aleatoria a esa espera. Sin
ella, mil clientes que fallaron a la vez esperarán exactamente lo mismo y volverán
a colisionar sincronizados. El jitter los dispersa, y es la mitad que más se
olvida: **espera exponencial sin jitter sigue produciendo oleadas**.

Los SDK de AWS implementan ambas por defecto, y también un número máximo de
reintentos configurable. Por eso, en un escenario de throttling, una opción que
proponga "implementar reintentos manuales" suele ser peor que ajustar la
configuración del SDK.

### Cómo se evita por diseño

Reintentar es la reacción; lo que el examen premia es no llegar ahí.

**Repartir mejor la clave.** Es la solución de raíz cuando el problema es una
partición o un shard caliente. Ya lo vimos con la partition key de Kinesis, y
aplica igual a la clave de partición de DynamoDB.

**Cambiar a capacidad bajo demanda.** Tanto Kinesis como DynamoDB tienen un modo en
el que la capacidad se ajusta sola. Es la respuesta cuando el enunciado dice que
el tráfico es impredecible o tiene picos imprevisibles. DynamoDB añade además
**capacidad adaptativa**, que redistribuye capacidad hacia las particiones más
solicitadas de forma automática.

**Agrupar en lotes.** Menos llamadas para los mismos datos: `PutRecords` en lugar
de `PutRecord`, escrituras por lotes en DynamoDB. Reduce el consumo del límite de
peticiones, que a menudo se agota antes que el de volumen.

**Poner una cola entre los dos sistemas.** Esta es la respuesta a la tercera
pregunta de activación, y es un patrón que conviene reconocer de inmediato.

### La cola como amortiguador

Cuando un productor rápido escribe en un consumidor lento, ponerlos en contacto
directo garantiza que el segundo se caiga en el primer pico. Una cola entre ambos
—**Amazon SQS**— desacopla el ritmo: el productor escribe a la velocidad que
quiera y el consumidor lee **al ritmo que aguanta**.

A esto se le llama **nivelación de carga** (*load leveling*), y aparece con dos
formas en el examen:

- Delante de una base de datos relacional que no soporta el pico de escrituras.
- Delante de cualquier servicio con límite de tasa, para no perder trabajo cuando
  se supera.

Para el caso concreto de las **conexiones** a una base relacional, existe además
una pieza específica: **Amazon RDS Proxy**, que agrupa y reutiliza conexiones. Es
la respuesta cuando el enunciado menciona que muchas funciones concurrentes agotan
las conexiones de la base, porque cada invocación de Lambda abriría la suya.

### Qué hacer con lo que no se puede procesar

Si tras todos los reintentos un mensaje sigue fallando, no se descarta en
silencio: va a una **cola de mensajes fallidos** (*dead-letter queue*). Es el
mismo principio de la lección 2.4 con el destino de fallos de Lambda, y se
desarrolla en la lección 4.4.

**En resumen:** el throttling protege al servicio y sus límites se aplican por
unidad interna —shard, partición, prefijo—, no al total. Se reacciona con espera
exponencial **y** jitter, que los SDK ya implementan; y se evita por diseño
repartiendo mejor la clave, pasando a capacidad bajo demanda, agrupando en lotes o
poniendo una cola que nivele la carga entre un productor rápido y un consumidor
lento.

## 🔍 Cómo lo pregunta el examen

> Una aplicación escribe eventos en una tabla de DynamoDB. Durante los picos de
> tráfico, la aplicación recibe errores de limitación y pierde eventos. El equipo
> no puede predecir cuándo ocurrirán los picos y necesita no perder ningún dato.
> ¿Qué DOS medidas resuelven el problema?

Las pistas son **picos impredecibles**, **errores de limitación** y **no perder
ningún dato**. Son dos requisitos distintos y por eso la pregunta pide dos
medidas.

Lo impredecible descarta aumentar la capacidad aprovisionada a un valor fijo:
habría que dimensionar para el peor caso y pagarlo todo el tiempo. La respuesta a
esa mitad es **cambiar la tabla a capacidad bajo demanda**, que absorbe los picos
sin previsión.

No perder ningún dato es la otra mitad, y la resuelve **desacoplar con una cola**
entre la aplicación y la escritura, de modo que los eventos esperen mientras el
destino se pone al día en lugar de descartarse.

Las opciones tentadoras suelen ser reintentos manuales —los SDK ya reintentan— y
añadir un índice secundario, que no tiene relación con el problema.

## 💬 Ahora te toca a ti

**Pregunta:** Si un servicio rechaza tus peticiones porque van demasiado rápido,
¿qué crees que pasa si todos tus procesos reintentan al mismo tiempo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que llega una segunda oleada igual de grande que la
primera y también se rechaza, con lo que el sistema entra en una tormenta de
reintentos de la que no sale solo. Por eso el reintento correcto tiene dos partes:
espera exponencial, que dobla el tiempo entre intentos, y jitter, que añade una
variación aleatoria para que los clientes no vuelvan sincronizados. La segunda es
la que más se olvida, y sin ella la espera exponencial sigue produciendo oleadas.

**Pregunta:** ¿Por qué crees que un servicio prefiere rechazar peticiones antes que
aceptarlas y responder despacio?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque aceptar todo degradaría el servicio para todos los
usuarios, no solo para el que excede su cuota: las peticiones se acumularían, la
latencia crecería sin límite y el sistema acabaría agotando recursos. Rechazar
rápido lo que supera el límite mantiene un comportamiento predecible para quien
está dentro de su cuota y devuelve al cliente una señal explícita de que debe bajar
el ritmo, que es información accionable en lugar de una espera indefinida.

**Pregunta:** Una base de datos aguanta el tráfico normal pero se cae cuando
arranca el proceso nocturno de carga. ¿Qué pondrías entre los dos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Una cola, para nivelar la carga. El proceso de carga escribe
en la cola a la velocidad que quiera y el consumidor extrae al ritmo que la base
aguanta, de modo que el pico se convierte en una espera en lugar de en una caída.
Si el problema concreto son las conexiones simultáneas —muchas funciones abriendo
cada una la suya—, la pieza específica es RDS Proxy, que las agrupa y reutiliza.

## ⚠️ No lo confundas con

- **Throttling vs. caída del servicio:** el throttling es una respuesta deliberada
  y esperada; hay que gestionarla, no tratarla como un incidente.
- **Espera exponencial vs. jitter:** doblar el tiempo entre intentos frente a
  añadir aleatoriedad. Hacen falta las dos: la primera sola sigue sincronizando.
- **Capacidad total vs. capacidad por partición:** los límites se aplican por
  shard, por partición o por prefijo. Sobra capacidad global y aun así se rechaza.
- **Capacidad bajo demanda vs. capacidad adaptativa:** el modo bajo demanda ajusta
  la capacidad del recurso completo; la adaptativa redistribuye la existente hacia
  las particiones más solicitadas.
- **Cola como amortiguador vs. cola como transporte:** aquí la cola está para
  absorber el pico, no para mover datos a otro sitio.
- **RDS Proxy vs. más capacidad de base:** el proxy resuelve el agotamiento de
  **conexiones**, que es un límite distinto del de CPU o memoria.

## 🎯 Pistas para el examen

- **"Hay capacidad pero da errores de limitación" es siempre reparto de clave.**
  Añadir capacidad es el distractor.
- **"Picos impredecibles" lleva a capacidad bajo demanda**, tanto en Kinesis como
  en DynamoDB. Dimensionar para el peor caso es caro y el examen lo penaliza.
- **"Sin perder ningún dato" ante un destino saturado pide desacoplar con una
  cola**, no reintentar más veces.
- **Los SDK ya implementan espera exponencial con jitter.** Una opción que proponga
  escribir reintentos a mano suele ser peor que configurar el SDK.
- **Muchas funciones concurrentes agotando conexiones de una base relacional es
  RDS Proxy**, no una instancia mayor.
