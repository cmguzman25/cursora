# 2.5 — Kinesis Data Firehose: buffering, dynamic partitioning y conversión de formato

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 11 min de lectura

## 🤔 Antes de empezar

- Si un servicio entrega datos a un data lake sin que escribas código, ¿qué crees
  que pierdes a cambio de esa comodidad?
- ¿Por qué crees que un servicio de entrega acumula los datos en lugar de escribir
  cada registro en cuanto llega?
- Si los datos hay que guardarlos en carpetas por fecha y por tipo de evento,
  ¿quién debería decidir esa ruta?

## 📘 Contenido

**Kinesis Data Firehose** (renombrado **Amazon Data Firehose**) es el otro extremo
de la familia: mientras Kinesis Data Streams **retiene** para que tú escribas el
consumidor, Firehose **entrega**. Le indicas un origen y un destino, y él se
encarga del resto sin que despliegues nada.

Esa es la respuesta a la primera pregunta de activación: a cambio de la comodidad
**pierdes la capacidad de releer**. Una vez entregado, el dato ya no está en
Firehose. Si necesitas reprocesar, tendrás que hacerlo desde el destino.

### Orígenes y destinos

Firehose lee de **Direct PUT** (tu aplicación escribe directamente), de un stream
de **Kinesis Data Streams** o de **Amazon MSK**.

Y entrega a un conjunto **cerrado** de destinos soportados: Amazon S3, Amazon
Redshift, Amazon OpenSearch Service, endpoints HTTP y algunos servicios de
terceros. Ese carácter cerrado es materia de examen: **si el destino que pide el
enunciado no está en la lista, Firehose no es la respuesta**.

Un detalle concreto que aparece: para la entrega a **Amazon Redshift solo se
admiten clústeres accesibles públicamente**. Es una restricción que sorprende y que
descarta opciones cuando el enunciado insiste en que nada sea público.

### El buffering: por qué acumula antes de escribir

Firehose no escribe cada registro por separado. Acumula en un búfer y entrega
cuando se cumple **lo primero** de estas dos condiciones:

- El búfer alcanza un **tamaño** determinado, medido en MB.
- Pasa un **intervalo de tiempo**, configurable entre **60 y 900 segundos**.

La razón es la de la lección 1.5: escribir muchos archivos pequeños destroza el
rendimiento y el costo de las consultas posteriores. Firehose acumula
precisamente para no crear ese problema. Existe además una opción de **buffering
cero** para casos que exigen latencia mínima, y hay que saber que **no está
disponible cuando se usa el particionado dinámico**.

De ahí la decisión que más se pregunta sobre este servicio:

| Si el enunciado pide… | Ajusta el búfer… |
|---|---|
| Menor latencia, datos disponibles antes | Intervalo pequeño, cerca de 60 segundos |
| Menor costo de consulta, archivos grandes | Intervalo y tamaño altos |

Otros límites verificables: el **tamaño máximo de un registro es de 1.000 KiB**
antes de la codificación en base64, `PutRecordBatch` admite hasta **500 registros
o 4 MiB por llamada**, y si el destino no está disponible Firehose **conserva los
datos hasta 24 horas** cuando el origen es Direct PUT. Con Kinesis Data Streams
como origen, la retención la marca el propio stream.

*(Cuotas vigentes; conviene contrastarlas con la documentación del servicio.)*

### Transformación con Lambda

Firehose puede invocar una **función de Lambda** sobre los registros antes de
entregarlos. Sirve para limpiezas ligeras: normalizar campos, descartar registros
inválidos, convertir de un formato de texto a JSON.

Es una transformación **sin estado y por registro**: no puede agregar, ni unir con
otra fuente, ni calcular nada que dependa de otros registros. Cuando el enunciado
pida agregaciones o ventanas, esta no es la pieza.

Los registros que la función marca como fallidos, y los que Firehose no consigue
entregar, van a un **prefijo de error** en S3 en lugar de perderse.

### Conversión de formato

Firehose convierte **JSON a Parquet u ORC** durante la entrega a S3, sin que
escribas código. Para hacerlo necesita conocer el esquema, y lo obtiene de una
tabla del **AWS Glue Data Catalog**.

Esta capacidad es la que convierte a Firehose en la respuesta habitual del patrón
que vimos en la lección 1.4: **ingerir en un formato por filas y almacenar en
columnar**. Resuelve de un golpe el formato y el tamaño de archivo, que son dos de
las tres palancas de costo.

Si los datos de origen no son JSON, se usa primero la transformación con Lambda
para convertirlos, y después la conversión de formato.

### Dynamic partitioning

Responde a la tercera pregunta de activación: la ruta la decide Firehose, a partir
del **contenido de cada registro**.

Con el **particionado dinámico** activado, se definen expresiones que extraen
valores del registro y construyen el prefijo de S3. Un evento con
`{"tipo": "compra", "fecha": "2026-08-27"}` puede acabar en
`s3://bucket/eventos/tipo=compra/fecha=2026-08-27/`, listo para el partition
pruning de la lección 1.5.

Sin esta función, Firehose solo sabe particionar por la fecha y hora de entrega,
que es el **processing time** y no el **event time**: exactamente el problema de
la lección 1.2.

Los límites que conviene recordar:

- **500 particiones activas por stream** por defecto, ampliables hasta 2.500 por
  solicitud. Si se supera, los registros sobrantes van al prefijo de error.
- **1 GB/s de rendimiento** por partición activa.
- El buffering interno es multietapa, así que el retraso real puede ser hasta
  **1,5 veces** el intervalo configurado.
- **No es compatible con el buffering cero.**

El límite de 500 particiones activas explica por qué no se debe particionar
dinámicamente por un campo de cardinalidad alta: es la misma regla de la lección
1.5, aquí con un número concreto detrás.

### Cuándo Firehose y cuándo Data Streams

| | **Data Streams** | **Firehose** |
|---|---|---|
| Naturaleza | Retiene | Entrega |
| Consumidores | Varios, independientes | El destino configurado |
| Reprocesar | Sí, dentro de la retención | No desde el servicio |
| Latencia | Sub-segundo posible | Desde 60 segundos (o cero buffering) |
| Esfuerzo | Escribes el consumidor | Ninguno |
| Destinos | Los que programes | Lista cerrada |

**En resumen:** Firehose entrega sin código a una lista cerrada de destinos,
acumulando en un búfer que se vacía por tamaño o por un intervalo de 60 a 900
segundos. Convierte JSON a Parquet u ORC usando el Glue Data Catalog y puede
construir las rutas de S3 a partir del contenido del registro con particionado
dinámico, limitado a 500 particiones activas. Lo que no hace es retener: entregado
el dato, no se puede releer desde el servicio.

## 🔍 Cómo lo pregunta el examen

> Una empresa entrega eventos JSON a Amazon S3 con Kinesis Data Firehose y los
> consulta con Athena. Las consultas filtran por tipo de evento y por la fecha en
> que ocurrió, pero resultan lentas y caras: los objetos se guardan en carpetas
> por la hora de entrega y en formato JSON. ¿Qué configuración de Firehose lo
> corrige con el menor esfuerzo?

Las pistas son **filtran por tipo de evento y por la fecha en que ocurrió**,
**carpetas por hora de entrega** y **formato JSON**. Son dos problemas
simultáneos: formato equivocado y particionado por el reloj equivocado.

Descarta las opciones que solo activan la conversión a Parquet: mejoran el
formato pero dejan las carpetas por hora de entrega, así que el filtro por fecha
del evento seguiría escaneando todo. Y descarta las que proponen un job posterior
que reorganice los archivos, porque hay una solución dentro del propio servicio y
el enunciado pide el menor esfuerzo.

La respuesta correcta combina **conversión de formato a Parquet** y **particionado
dinámico** con expresiones que extraigan el tipo y la fecha del propio registro.
Cuando veas "las carpetas usan la hora de entrega" junto a "filtran por la fecha
del evento", el particionado dinámico es la pieza.

## 💬 Ahora te toca a ti

**Pregunta:** Si un servicio entrega datos a un data lake sin que escribas código,
¿qué crees que pierdes a cambio de esa comodidad?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** La capacidad de releer y el control fino. Firehose no
retiene: una vez entregado el dato, no se puede volver a leer desde el servicio,
así que no hay reproceso ni consumidores nuevos que recuperen el histórico.
Además, los destinos son una lista cerrada y la transformación se limita a lo que
pueda hacer una función por registro, sin estado. Si el caso exige releer o un
destino no soportado, la respuesta es Kinesis Data Streams.

**Pregunta:** ¿Por qué crees que un servicio de entrega acumula los datos en lugar
de escribir cada registro en cuanto llega?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Para no generar millones de archivos diminutos. Escribir
cada registro por separado crearía justo el problema de la lección 1.5: cada
archivo tiene un costo fijo de apertura, así que las consultas posteriores serían
lentísimas aunque escanearan pocos bytes. Acumular en un búfer que se vacía por
tamaño o por tiempo produce objetos de tamaño razonable. El precio es latencia, y
por eso el intervalo del búfer es la palanca entre disponer antes de los datos y
consultarlos más barato.

**Pregunta:** Si los datos hay que guardarlos en carpetas por fecha y por tipo de
evento, ¿quién debería decidir esa ruta?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El contenido del propio registro, no el reloj del servicio.
Por defecto Firehose particiona por la fecha y hora de entrega, que es processing
time, así que un evento retrasado acaba en la carpeta equivocada. El particionado
dinámico permite extraer el tipo y la fecha del registro y construir el prefijo
con ellos, que es lo que hace que el filtro de las consultas coincida con la
organización de las carpetas.

## ⚠️ No lo confundas con

- **Firehose vs. Data Streams:** entregar frente a retener. Firehose no permite
  releer; Data Streams sí, mientras dure la retención.
- **Particionado dinámico vs. particionado por hora de entrega:** el primero usa el
  contenido del registro (event time); el segundo, el reloj de Firehose
  (processing time).
- **Transformación con Lambda vs. procesamiento con estado:** la de Firehose es por
  registro y sin estado. Agregar o usar ventanas exige otro servicio.
- **Conversión de formato vs. transformación:** la conversión pasa JSON a Parquet u
  ORC usando el catálogo; la transformación cambia el contenido de los registros.
  Son dos funciones distintas y se pueden encadenar.
- **Buffering cero vs. intervalo mínimo:** el intervalo configurable empieza en 60
  segundos; el buffering cero es una opción aparte y no funciona con particionado
  dinámico.

## 🎯 Pistas para el examen

- **"Sin escribir código" y "sin administrar nada" apuntan a Firehose**, siempre
  que el destino esté en su lista y no haga falta releer.
- **Si el enunciado exige reprocesar o varios consumidores independientes,
  Firehose queda descartado** por muy cómodo que sea.
- **Baja latencia significa intervalo de búfer pequeño; menor costo de consulta,
  intervalo grande.** Es la palanca que el examen pide ajustar.
- **JSON a Parquet en la ingesta es conversión de formato de Firehose**, y necesita
  una tabla en el Glue Data Catalog. Si una opción la propone sin catálogo, es
  incompleta.
- **El particionado dinámico tiene un límite de 500 particiones activas.** Es el
  argumento concreto para no particionar por campos de cardinalidad alta.
