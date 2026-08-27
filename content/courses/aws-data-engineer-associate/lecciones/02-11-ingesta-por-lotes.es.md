# 2.11 — Ingesta por lotes: S3, Glue, EMR, Redshift COPY y Lambda

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 10 min de lectura

## 🤔 Antes de empezar

- Si un proveedor te envía cada noche un único archivo de 200 GB, ¿qué le pedirías
  que cambiara para que tu carga sea más rápida?
- ¿Por qué crees que cargar datos en un almacén analítico con miles de sentencias
  `INSERT` es mala idea?
- Un proceso de carga tarda 40 minutos y falla en el minuto 38. ¿Qué necesitas
  saber antes de volver a lanzarlo?

## 📘 Contenido

No todo llega como flujo. Buena parte del trabajo real —y de las preguntas del
examen— consiste en mover conjuntos acotados: el volcado nocturno de un
proveedor, la exportación mensual de un sistema antiguo, los archivos que deja un
socio comercial.

### S3 como zona de aterrizaje

El patrón por defecto en AWS es que **todo lo que llega por lotes aterriza primero
en Amazon S3**, en la zona cruda de la lección 1.1, y desde ahí lo consume quien
corresponda.

Tiene tres ventajas que el examen da por supuestas: es barato, admite cualquier
formato, y **desacopla** al que entrega del que procesa. Si el proceso de
transformación falla, el archivo sigue ahí.

Para subir archivos grandes, S3 ofrece **carga multiparte** (*multipart upload*):
el archivo se parte en fragmentos que se suben en paralelo y se reensamblan al
final. Aporta velocidad y, sobre todo, **reintentos por fragmento**: si falla un
trozo, se reenvía solo ese en lugar de repetir la subida entera. AWS la recomienda
a partir de unos 100 MB y es obligatoria por encima de 5 GB.

Cuando el origen está lejos de la región, **S3 Transfer Acceleration** enruta la
subida por la red perimetral de AWS.

### Cómo debe llegar un archivo para poder cargarlo bien

Aquí está la respuesta a la primera pregunta de activación, y enlaza directamente
con la lección 1.5.

Un **único archivo de 200 GB** es el peor formato de entrega posible:

- Si está comprimido con gzip, **no se puede dividir**, así que lo procesa un solo
  hilo mientras el resto del clúster espera.
- No hay reintento parcial: un fallo obliga a repetir el archivo completo.
- No permite cargar en paralelo.

Lo que conviene pedir al proveedor son **varios archivos de tamaño parecido**, de
cientos de megabytes cada uno. Y si va a comprimirlos, que use un códec divisible
o formatos que se dividan por sí mismos.

Ese detalle tiene una consecuencia concreta en Redshift, que veremos ahora.

### Redshift COPY

Cargar datos en Amazon Redshift se hace con el comando **`COPY`**, no con
sentencias `INSERT`. Esa es la respuesta a la segunda pregunta de activación.

Un almacén columnar está construido para escribir bloques grandes de una columna
de golpe. Miles de `INSERT` individuales lo obligan a hacer justo lo contrario:
escrituras diminutas, una tras otra, cada una con su sobrecarga de transacción.
El resultado es una carga órdenes de magnitud más lenta y una tabla fragmentada
que después habrá que reorganizar.

`COPY`, en cambio, **carga en paralelo**: reparte el trabajo entre todas las
unidades de proceso del clúster. De ahí la regla de oro de la carga en Redshift:

> Divide los datos en **varios archivos**, idealmente en un múltiplo del número de
> unidades de proceso del clúster, para que todas trabajen a la vez.

Otros detalles de `COPY` que aparecen:

- Carga desde **S3**, y también desde DynamoDB o EMR.
- Un **archivo de manifiesto** permite indicar exactamente qué objetos cargar, en
  lugar de un prefijo. Es lo que garantiza que se cargue el conjunto correcto
  cuando el prefijo contiene más cosas.
- Admite CSV, JSON, Avro, Parquet y ORC, y datos comprimidos.
- La operación inversa es **`UNLOAD`**, que exporta el resultado de una consulta a
  S3 en paralelo. Se trata en la lección 6.8.

### Los motores de carga y transformación

Cuando el archivo ya está en S3, quien lo procesa es uno de estos cuatro:

| Servicio | Encaja cuando |
|---|---|
| **AWS Lambda** | Archivos pequeños, transformación simple, reacción inmediata a la llegada |
| **AWS Glue** | Volúmenes medianos y grandes, ETL serverless con catálogo, sin administrar nada |
| **Amazon EMR** | Volúmenes muy grandes, control del motor, uso intensivo de instancias Spot |
| **Amazon Redshift** | Los datos ya están en el almacén y la transformación se expresa en SQL |

La frontera de Lambda es la que más se pregunta, porque tiene límites duros: **15
minutos de ejecución máxima** y una cantidad de memoria y de almacenamiento
temporal acotada. Un archivo que no se pueda procesar dentro de esos límites
descarta Lambda, por muy cómoda que sea.

El error clásico que el examen plantea: una función que procesa archivos
pequeños funciona bien durante meses, hasta que el proveedor envía uno grande y la
función empieza a agotar el tiempo. La respuesta correcta no es subir la memoria,
es cambiar de motor.

### Reanudar sin duplicar

La tercera pregunta de activación es la de la lección 1.1 aplicada aquí: antes de
relanzar un proceso que falló a mitad, hay que saber **qué escribió ya**.

Las tres respuestas habituales:

- **Sobrescribir la partición completa.** El proceso borra y reescribe el día
  entero, así que relanzarlo es seguro.
- **Marcas de progreso.** El proceso registra qué archivos procesó y salta los
  ya hechos. En Glue, esa función se llama **job bookmark** y se estudia en la
  lección 3.3.
- **Cargar en una tabla temporal** y cambiarla por la definitiva solo cuando el
  proceso termina bien. Así nunca hay un estado a medias visible.

**En resumen:** en la ingesta por lotes todo aterriza primero en S3, y la forma en
que llegan los archivos condiciona la carga: varios archivos de tamaño parecido y
divisibles, nunca uno gigante comprimido con gzip. En Redshift se carga con
`COPY`, que trabaja en paralelo, y nunca con `INSERT`. El motor se elige por
volumen y por límites, y Lambda queda descartada por sus 15 minutos.

## 🔍 Cómo lo pregunta el examen

> Una empresa carga cada noche 500 GB de archivos CSV en Amazon Redshift mediante
> un proceso que ejecuta sentencias `INSERT` en bucle. La carga tarda más de ocho
> horas y no termina antes de que empiece la jornada. ¿Qué cambio ofrece la mayor
> mejora?

Las pistas son **almacén analítico**, **`INSERT` en bucle** y **tarda ocho horas**.
La causa está nombrada en el propio enunciado.

Descarta las opciones que agrandan el clúster: más nodos ejecutarían las mismas
escrituras diminutas de una en una, así que la mejora sería marginal frente al
costo. Descarta también las que proponen comprimir los archivos, que reduce la
transferencia pero no toca el cuello de botella.

La respuesta correcta sustituye los `INSERT` por **`COPY` desde S3, con los datos
repartidos en varios archivos** para que la carga sea paralela. Si el enunciado
menciona además que hoy es un solo archivo enorme, dividirlo forma parte de la
respuesta completa.

## 💬 Ahora te toca a ti

**Pregunta:** Si un proveedor te envía cada noche un único archivo de 200 GB, ¿qué
le pedirías que cambiara para que tu carga sea más rápida?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que lo entregue partido en varios archivos de tamaño
parecido, de cientos de megabytes cada uno, y que si lo comprime use un formato
divisible. Un único archivo grande impide cargar y procesar en paralelo, y si está
comprimido con gzip lo tendrá que leer un solo hilo. Además, con varios archivos
un fallo obliga a reprocesar solo el trozo afectado en lugar de los 200 GB
completos.

**Pregunta:** ¿Por qué crees que cargar datos en un almacén analítico con miles de
sentencias `INSERT` es mala idea?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque un almacén columnar está optimizado para escribir
bloques grandes de una columna de una vez, y los `INSERT` individuales lo fuerzan
a hacer escrituras diminutas con la sobrecarga de una transacción cada una. El
resultado es lentísimo y además deja la tabla fragmentada, lo que exige mantenerla
después. La forma correcta es `COPY`, que carga en paralelo repartiendo el trabajo
entre todas las unidades de proceso del clúster.

**Pregunta:** Un proceso de carga tarda 40 minutos y falla en el minuto 38. ¿Qué
necesitas saber antes de volver a lanzarlo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Qué alcanzó a escribir, porque si el proceso no es
idempotente relanzarlo duplicará esa parte. Las tres soluciones habituales son
sobrescribir la partición completa en lugar de añadir, llevar una marca de qué
archivos ya se procesaron para saltarlos, o cargar en una tabla temporal y
promoverla a definitiva solo cuando el proceso termina correctamente. Sin alguna
de las tres, cada reintento es un riesgo.

## ⚠️ No lo confundas con

- **`COPY` vs. `INSERT`:** carga paralela masiva frente a escrituras fila a fila.
  En un almacén analítico, `INSERT` masivo es siempre la opción incorrecta.
- **`COPY` vs. `UNLOAD`:** cargar desde S3 hacia Redshift frente a exportar de
  Redshift hacia S3.
- **Carga multiparte vs. dividir el archivo:** la multiparte acelera la **subida**
  de un objeto; dividir el archivo permite **procesarlo** en paralelo después. Son
  cosas distintas y ambas aparecen.
- **Manifiesto vs. prefijo:** el manifiesto lista exactamente qué objetos cargar;
  el prefijo carga todo lo que cuelgue de él, incluido lo que no debía.
- **Límite de Lambda vs. falta de memoria:** los 15 minutos son un techo duro.
  Subir la memoria acelera, pero no permite superarlo.

## 🎯 Pistas para el examen

- **Si el enunciado menciona `INSERT` sobre Redshift, la respuesta casi siempre es
  `COPY`.** Agrandar el clúster es el distractor caro.
- **"Un solo archivo enorme" y "el clúster está ocioso" es divisibilidad.**
  La solución es partirlo, no añadir capacidad.
- **Lambda se descarta por sus 15 minutos**, no por su memoria. Comprueba siempre
  la duración estimada del trabajo antes de elegirla.
- **Todo lote aterriza en S3 primero.** Una opción que cargue directamente del
  proveedor al almacén, sin zona cruda, pierde la capacidad de reprocesar.
