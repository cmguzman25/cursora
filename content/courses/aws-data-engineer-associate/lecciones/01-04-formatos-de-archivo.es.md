# 1.4 — Formatos de archivo: CSV, JSON, Avro, Parquet y ORC

> Módulo 1 · Fundamentos · ⏱️ 11 min de lectura

## 🤔 Antes de empezar

- Los mismos datos, guardados en dos formatos distintos, pueden costar diez veces
  más de consultar. ¿Dónde crees que se va esa diferencia?
- Si un formato columnar es mejor para analizar, ¿por qué los sistemas que
  reciben eventos en streaming casi nunca escriben en columnar?
- ¿Qué crees que debería pasar cuando una aplicación empieza a enviar un campo
  nuevo que los archivos anteriores no tenían?

## 📘 Contenido

Mediateca guarda los eventos de clickstream de su plataforma de vídeo: unos 40 GB
diarios. Empezó guardándolos como JSON, porque era lo que emitía la aplicación.
Cuando el equipo de analítica empezó a consultarlos, la factura de consultas se
disparó.

El cambio que arregló el problema no tocó ni un servicio ni una consulta: cambió
el **formato de archivo**. Es la decisión de menor esfuerzo y mayor impacto de
todo el temario, y por eso el examen la pregunta tanto.

### Formatos por filas y formatos por columnas

Un archivo guarda los valores en algún orden físico. Hay dos maneras.

**Por filas.** Los campos de un registro se escriben juntos y seguidos: registro
1 completo, registro 2 completo, y así. Para leer un registro entero alcanza con ir
a un sitio.

**Por columnas.** Los valores de un mismo campo se escriben juntos: todos los
`user_id`, después todos los `video_id`, después todos los `timestamp`.

De ahí salen las tres propiedades que decidieron el caso de Mediateca:

- **Column pruning.** Una consulta que usa tres campos de cuarenta lee solo esos
  tres. En un formato por filas, hay que leer las filas completas.
- **Compresión mucho mejor.** Una columna contiene valores del mismo tipo y a
  menudo repetidos, así que se comprime muchísimo más que una mezcla de campos
  heterogéneos.
- **Predicate pushdown.** El archivo guarda estadísticas por bloque —mínimo,
  máximo, número de nulos—. Si el filtro pide `fecha = 2026-08-26` y un bloque
  declara que su máximo es `2026-07-31`, el motor **no lee ese bloque**.

Como Athena y otros motores cobran por **bytes escaneados**, estas tres
propiedades se traducen directamente en dinero.

### Los cinco formatos del examen

**CSV.** Texto plano separado por comas. Sin tipos, sin esquema, sin metadatos.
Lo entiende todo y lo lee cualquier persona. Es lo que suele llegar de sistemas
antiguos y de proveedores externos. Como formato de trabajo es el peor: ocupa
mucho, no tiene tipos y hay que leerlo entero.

**JSON.** Semiestructurado y anidado. Es el formato natural de las APIs y de los
eventos de aplicación. Su ventaja es que admite estructuras complejas y campos
que varían entre registros; su desventaja es que repite el nombre de cada campo
en cada registro, lo que lo hace muy voluminoso. La variante que se usa en datos
es **JSON Lines**: un objeto JSON por línea, que sí se puede dividir en trozos
para procesar en paralelo.

**Avro.** Binario y **por filas**, con el **esquema incluido en el propio
archivo**. Está pensado para escribir: añadir un registro es barato, y como el
esquema viaja con los datos, es el formato con mejor soporte de **evolución de
esquema**. Es la elección habitual para streaming y para el intercambio entre
sistemas.

**Parquet.** Binario y **por columnas**. Es el formato analítico por defecto en
AWS y en el ecosistema de datos en general. Organiza los datos en *row groups*, y
dentro de cada uno, por columnas, con estadísticas que habilitan el predicate
pushdown. Cuando una pregunta del examen busca reducir el coste de consultas
sobre S3, la respuesta casi siempre lo incluye.

**ORC.** Binario y **por columnas**, nacido en el ecosistema Hive. Es muy
parecido a Parquet en propiedades y rendimiento; añade índices y *bloom filters*
que en algunos casos aceleran los filtros por igualdad. En la práctica, para el
examen se comportan casi igual: la distinción relevante es columnar frente a por
filas, no Parquet frente a ORC.

| Formato | Orientación | Binario | Esquema | Uso típico |
|---|---|---|---|---|
| CSV | Filas | No | Ninguno | Intercambio, sistemas antiguos |
| JSON | Filas | No | Implícito | APIs, eventos, datos anidados |
| Avro | Filas | Sí | En el archivo | Streaming, evolución de esquema |
| Parquet | Columnas | Sí | En el archivo | Analítica sobre el data lake |
| ORC | Columnas | Sí | En el archivo | Analítica en el ecosistema Hive/EMR |

### Por qué el streaming no escribe en columnar

Un formato columnar necesita **acumular muchas filas** antes de escribir, porque
solo tiene sentido cuando puede agrupar miles de valores de la misma columna para
comprimirlos y calcular estadísticas. Escribir un archivo Parquet de un solo
registro daría un archivo enorme en proporción y sin ninguna de sus ventajas.

Un sistema que recibe eventos de uno en uno no puede permitirse esa espera. Por
eso el patrón habitual es de dos pasos: **ingerir en un formato por filas —Avro o
JSON— y convertir a Parquet en una segunda etapa**, cuando ya hay volumen
suficiente. Muchos servicios de ingesta hacen esa conversión por ti mientras
acumulan el búfer.

### La compresión y el detalle que casi nadie recuerda

Sobre cualquier formato se aplica un **códec de compresión**. Los que aparecen en
el examen:

| Códec | Ratio | Velocidad | Divisible por sí mismo |
|---|---|---|---|
| Snappy | Bajo | Muy alta | No |
| gzip | Alto | Media | No |
| bzip2 | Muy alto | Baja | Sí |
| ZSTD | Alto | Alta | No |

La columna que importa es la última. Un archivo **divisible** (*splittable*)
puede repartirse entre varios procesos en paralelo. Uno que no lo es debe
procesarlo **un solo hilo de principio a fin**.

Y aquí está el detalle que se pregunta: **un archivo CSV de 10 GB comprimido con
gzip no se puede dividir**, así que una sola tarea tendrá que descomprimirlo
entero mientras el resto del clúster espera. Es una causa clásica de "el job
tarda muchísimo y el clúster está casi ocioso".

En cambio, **Parquet con Snappy sí se procesa en paralelo**, aunque Snappy no sea
divisible por sí mismo. El motivo es que Parquet comprime **cada row group por
separado**: la divisibilidad la aporta la estructura del formato, no el códec. Por
eso Snappy sobre Parquet es la combinación por defecto: rápida, paralelizable y
con buena compresión gracias a la organización columnar.

### Cómo elegir

- **Datos que llegan de fuera y no controlas**: los recibes en CSV o JSON, los
  dejas tal cual en la zona cruda y los conviertes.
- **Ingesta de eventos en streaming**: Avro o JSON Lines, por filas.
- **Cualquier cosa que se vaya a consultar con SQL de forma repetida**: Parquet.
  Sin excepciones prácticas.
- **Entorno Hive o EMR ya montado sobre ORC**: mantén ORC, el beneficio de migrar
  a Parquet no compensa.

**En resumen:** los formatos por filas son buenos para escribir y para leer
registros completos; los columnares son buenos para analizar, gracias al column
pruning, la compresión por columna y el predicate pushdown. Avro es el
row-oriented con mejor evolución de esquema; Parquet es el destino analítico por
defecto. Y la divisibilidad importa: CSV con gzip no se paraleliza, Parquet con
Snappy sí.

## 🔍 Cómo lo pregunta el examen

> Un equipo procesa a diario un archivo CSV de 12 GB comprimido con gzip en un
> clúster de Apache Spark. El job tarda más de tres horas y las métricas muestran
> que la mayoría de los nodos permanece inactiva casi todo ese tiempo. ¿Cuál es
> la causa más probable?

Las pistas son **CSV comprimido con gzip**, **un solo archivo grande** y **la
mayoría de los nodos inactiva**. Esa combinación describe un problema de
divisibilidad, no de tamaño del clúster.

Un archivo gzip no se puede dividir, así que Spark solo puede asignarlo a **una
tarea**: un núcleo descomprime 12 GB mientras el resto del clúster mira. Añadir
nodos no cambiaría nada, y esa es justamente la opción tentadora que suele
aparecer.

También suele aparecer "los datos están sesgados" (*skew*), que produce un
síntoma parecido —un nodo trabajando y el resto ocioso—, pero el skew ocurre al
agrupar por una clave desbalanceada, y aquí el enunciado apunta a la lectura del
archivo. La pista que desempata es el formato.

La respuesta correcta identifica que el archivo no es divisible. Y la solución
que acompaña estos escenarios es partirlo en varios archivos o convertirlo a un
formato divisible como Parquet.

## 💬 Ahora te toca a ti

**Pregunta:** Los mismos datos, guardados en dos formatos distintos, pueden
costar diez veces más de consultar. ¿Dónde crees que se va esa diferencia?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** En los bytes que el motor se ve obligado a leer, que es
por lo que cobran servicios como Athena. Un formato columnar lee solo las
columnas que la consulta necesita, las tiene mucho mejor comprimidas porque
agrupa valores del mismo tipo, y puede saltarse bloques enteros usando las
estadísticas de mínimo y máximo. Un formato por filas obliga a leer las filas
completas, con todas sus columnas, y descomprimirlas para descartar casi todo.

**Pregunta:** Si un formato columnar es mejor para analizar, ¿por qué los
sistemas que reciben eventos en streaming casi nunca escriben en columnar?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque un formato columnar necesita acumular muchas filas
antes de escribir: sus ventajas vienen de agrupar miles de valores de la misma
columna para comprimirlos y calcular estadísticas. Con eventos que llegan de uno
en uno, esperar a tener ese volumen añade latencia, y escribir archivos columnares
diminutos da lo peor de ambos mundos. El patrón habitual es ingerir en un formato
por filas como Avro y convertir a Parquet en una segunda etapa.

**Pregunta:** ¿Qué crees que debería pasar cuando una aplicación empieza a enviar
un campo nuevo que los archivos anteriores no tenían?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que los datos antiguos se sigan leyendo sin romperse, con
ese campo como nulo o con un valor por defecto, y que los nuevos lo incluyan. Eso
es la evolución de esquema, y no todos los formatos la soportan igual: Avro es el
mejor porque lleva el esquema dentro del archivo y define reglas de
compatibilidad. CSV es el peor, porque no tiene esquema y añadir una columna
cambia el significado de las posiciones. Es el tema de la lección 1.6.

## ⚠️ No lo confundas con

- **Parquet vs. ORC:** ambos columnares y con rendimiento equivalente. La
  distinción que el examen premia es columnar frente a por filas, no uno contra
  el otro.
- **Avro vs. Parquet:** Avro es por filas y brilla escribiendo y evolucionando
  esquemas; Parquet es columnar y brilla consultando. No compiten en el mismo
  punto del pipeline.
- **Compresión vs. formato:** son capas distintas. Parquet es el formato, Snappy
  el códec. La pregunta "¿qué comprime más?" no se responde igual que "¿qué se
  consulta mejor?".
- **Divisible vs. comprimido:** gzip comprime bien pero no se divide, así que un
  archivo grande con gzip serializa el trabajo. bzip2 sí se divide, a costa de
  ser lento.
- **Snappy no divisible vs. Parquet+Snappy sí paralelizable:** la divisibilidad la
  aporta la estructura en row groups de Parquet, no el códec.

## 🎯 Pistas para el examen

- **"Reducir el coste de las consultas sobre S3" casi siempre incluye convertir a
  Parquet.** Si además la consulta filtra por un campo, la respuesta completa
  suma particionado, que es la lección 1.5.
- **Un solo archivo enorme con gzip y un clúster ocioso es un problema de
  divisibilidad.** Añadir nodos es la opción tentadora e incorrecta.
- **Cuando el enunciado hable de esquemas que cambian con el tiempo en un flujo
  de eventos**, mira hacia Avro y hacia un registro de esquemas.
- **Los datos anidados apuntan a JSON o a un formato que soporte estructuras
  complejas.** Si una opción propone CSV para datos anidados, descártala sin
  leer el resto.
