# 1.3 — OLTP, OLAP, data lake, data warehouse y lakehouse

> Módulo 1 · Fundamentos · ⏱️ 12 min de lectura

## 🤔 Antes de empezar

- ¿Por qué una base de datos que responde en milisegundos al cobrar en una caja
  puede tardar horas en un informe de ventas anual?
- Si el almacenamiento en la nube es barato, ¿qué problema aparece cuando una
  empresa guarda todo "por si acaso"?
- ¿Qué crees que le falta a un data lake para poder reemplazar a un almacén de
  datos?

## 📘 Contenido

La diferencia entre estos cinco términos no es de marketing: es una consecuencia
física de cómo se guardan los bytes en disco. Entender esa consecuencia hace que
la mitad de las preguntas del dominio 2 se respondan solas.

### OLTP: optimizado para encontrar una fila

**OLTP** (*online transaction processing*) describe los sistemas que atienden
operaciones del negocio: cobrar en una caja, registrar un pedido, actualizar un
perfil.

Sus cargas de trabajo tienen una forma característica: **muchísimas operaciones
muy pequeñas**, cada una tocando una o pocas filas. "Dame el cliente 84.312".
"Descuenta una unidad del producto 55.019".

Para eso, los datos se guardan **por filas** (*row-oriented*): todos los campos
de un registro, juntos y contiguos en disco. Buscar un cliente significa ir a un
sitio y leer un bloque. Con un índice, el sistema localiza ese bloque sin
recorrer la tabla.

Además, estas bases suelen estar **normalizadas**: la información se reparte en
muchas tablas para no repetir nada, de modo que actualizar el nombre de un
producto se haga en un solo sitio.

### OLAP: optimizado para recorrer millones de filas

**OLAP** (*online analytical processing*) describe lo contrario: **pocas
consultas, cada una enorme**. "Suma las ventas de yogur por región en los últimos
tres años".

Esa consulta necesita tres columnas —producto, región, importe— de 400 millones
de filas. En un almacenamiento por filas, el sistema se ve obligado a leer las
400 millones de filas **completas**, con sus otras cuarenta columnas incluidas,
para descartar casi todo. Ahí se va el tiempo.

Por eso los sistemas analíticos guardan los datos **por columnas**
(*column-oriented*): todos los valores de "importe" juntos, todos los de "región"
juntos. Eso produce tres ventajas que se acumulan:

- **Solo se leen las columnas necesarias** (*column pruning*). Tres columnas de
  cuarenta significa leer una fracción de los bytes.
- **La compresión es mucho mejor.** Una columna contiene valores del mismo tipo y
  a menudo repetidos —el mismo código de región miles de veces seguidas—, y eso
  se comprime muchísimo mejor que filas heterogéneas.
- **Se pueden saltar bloques enteros** (*predicate pushdown*). Si el bloque
  guarda que su valor máximo de fecha es anterior al filtro, no se lee.

Y suelen estar **desnormalizadas**: se repite información a propósito para evitar
uniones costosas entre tablas.

| | OLTP | OLAP |
|---|---|---|
| Carga típica | Muchas operaciones pequeñas | Pocas consultas enormes |
| Almacenamiento | Por filas | Por columnas |
| Diseño | Normalizado | Desnormalizado |
| Optimizado para | Encontrar y modificar filas | Escanear y agregar columnas |
| Ejemplos en AWS | Amazon RDS, Aurora, DynamoDB | Amazon Redshift, Athena sobre Parquet |

**La consecuencia práctica:** ejecutar analítica sobre la base operativa no solo
es lento, también compite por recursos con el sistema que atiende clientes. Ese
es el motivo original por el que existen los pipelines de datos.

### Data warehouse: estructura primero

Un **data warehouse** (almacén de datos) es un repositorio analítico donde los
datos entran ya limpios, validados y con un esquema definido de antemano. Es
**schema-on-write**: si un registro no encaja en el esquema, se rechaza al
cargarlo.

- **A favor:** rendimiento excelente, datos consistentes, y quien consulta sabe
  exactamente qué va a encontrar.
- **En contra:** rígido y caro. Añadir una fuente nueva exige rediseñar. Y solo
  admite datos estructurados: un almacén no guarda vídeos ni documentos.

### Data lake: guardar primero, decidir después

Un **data lake** es un repositorio que almacena datos en su formato original
—estructurados, semiestructurados y no estructurados— sin exigir un esquema al
escribir. El esquema se aplica al leer: es **schema-on-read**.

En AWS, un data lake es, casi siempre, **Amazon S3**.

- **A favor:** barato, admite cualquier formato, y no obliga a decidir hoy cómo
  se usarán los datos mañana.
- **En contra:** sin disciplina se degrada. El término para eso es **data
  swamp** (pantano de datos): un lago donde nadie sabe qué hay, de dónde vino ni
  si es fiable. Es exactamente lo que pasa cuando una empresa guarda todo "por si
  acaso" sin catalogar ni gobernar.

Lo que separa un lake de un swamp no es la tecnología, son tres prácticas: un
**catálogo** que registre qué hay y con qué esquema, un **control de acceso** que
diga quién puede ver qué, y una **organización por zonas** como la de la lección
1.1.

Y hay una limitación técnica de fondo: sobre S3 puro, **no hay transacciones a
nivel de tabla**. Conviene precisar qué significa, porque se confunde con otra
cosa: cada objeto individual de S3 sí se lee de forma consistente en cuanto se
escribe. El problema aparece cuando una tabla son **cientos de archivos**. Si un
proceso está reescribiendo veinte de ellos y otro consulta la tabla en ese
momento, el segundo puede ver una mezcla de archivos nuevos y viejos: nada le
indica qué conjunto de archivos forma una versión coherente de la tabla.

Tampoco hay forma sencilla de actualizar o borrar filas concretas: para eliminar
un registro hay que reescribir el archivo entero que lo contiene, y eso choca de
frente con lo que exigen las normativas de privacidad.

### Lakehouse: transacciones sobre el lago

El **lakehouse** es la respuesta a esa limitación: conservar el almacenamiento
barato y abierto del lake, y añadirle las garantías del warehouse.

Se consigue con los **formatos de tabla abiertos** —el más relevante para el
examen es **Apache Iceberg**—, que mantienen una capa de metadatos sobre los
archivos de S3 indicando qué archivos componen la tabla en cada momento. Con eso
aparecen:

- **Transacciones ACID**: un lector nunca ve una escritura a medias.
- **Actualizaciones y borrados por fila**, sin reescribir toda la tabla.
- **Evolución de esquema** sin romper lo que ya está escrito.
- **Time travel**: consultar el estado de la tabla en un momento anterior.

Los datos siguen siendo archivos Parquet en S3, y varios motores —Athena, EMR,
Redshift— pueden leer la misma tabla. En AWS existe además **Amazon S3 Tables**,
un tipo de bucket con soporte nativo de Iceberg.

| | Data lake | Data warehouse | Lakehouse |
|---|---|---|---|
| Esquema | Al leer | Al escribir | Al leer, con metadatos |
| Tipos de dato | Cualquiera | Estructurados | Cualquiera, tablas estructuradas |
| Transacciones | No | Sí | Sí |
| Coste de almacenamiento | Bajo | Alto | Bajo |
| Riesgo | Volverse un pantano | Rigidez y coste | Complejidad de metadatos |

### Cómo conviven en la práctica

En una arquitectura real no se elige uno: se usan los tres. Andes Retail deja
todo en S3 (lake), define las tablas curadas con Iceberg para poder corregir
registros (lakehouse) y carga en Redshift solo los conjuntos que alimentan los
paneles con mucha concurrencia (warehouse).

La pregunta del examen nunca es "¿cuál es mejor?", sino "¿cuál encaja con **este**
requisito?".

**En resumen:** OLTP guarda por filas para encontrar registros; OLAP guarda por
columnas para escanear y agregar, y de ahí salen el column pruning, la mejor
compresión y el predicate pushdown. El warehouse exige esquema al escribir, el
lake lo aplica al leer, y el lakehouse añade al lake transacciones, borrados por
fila y time travel mediante formatos como Iceberg.

## 🔍 Cómo lo pregunta el examen

> Una empresa guarda diez años de registros de clientes como archivos Parquet en
> Amazon S3 y los consulta con Athena. Una normativa de privacidad la obliga a
> eliminar todos los datos de un cliente concreto cuando este lo solicite, sin
> reescribir conjuntos completos ni interrumpir las consultas en curso. ¿Qué
> solución cumple el requisito con el menor esfuerzo operativo?

Las pistas son **eliminar los datos de un cliente concreto**, **sin reescribir
conjuntos completos** y **sin interrumpir las consultas en curso**. Traducido:
hacen falta borrados por fila y aislamiento transaccional sobre datos que ya
viven en S3.

Eso descarta las opciones que proponen reescribir las particiones afectadas con
un job: funcionan, pero contradicen "sin reescribir conjuntos completos" y tienen
esfuerzo operativo alto. También descarta mover todo a un almacén de datos
relacional, que resolvería el borrado pero cambia la arquitectura entera por un
requisito puntual.

La respuesta correcta apunta a un **formato de tabla abierto como Apache
Iceberg**, que aporta exactamente esas dos capacidades sobre los mismos archivos.
Cuando veas "borrar filas concretas en S3" o "consultas consistentes mientras se
escribe", piensa en Iceberg.

## 💬 Ahora te toca a ti

**Pregunta:** ¿Por qué una base de datos que responde en milisegundos al cobrar
en una caja puede tardar horas en un informe de ventas anual?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque guarda los datos por filas, que es lo óptimo para
localizar un registro completo y lo peor para recorrer unas pocas columnas de
millones de filas. El informe anual solo necesita tres columnas, pero el
almacenamiento por filas obliga a leer las filas enteras con todas sus columnas
para descartar casi todo. Un sistema columnar leería solo esas tres columnas, muy
comprimidas, y podría saltarse bloques enteros gracias a las estadísticas de cada
bloque.

**Pregunta:** Si el almacenamiento en la nube es barato, ¿qué problema aparece
cuando una empresa guarda todo "por si acaso"?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que el data lake se convierte en un data swamp: hay
petabytes que nadie sabe qué contienen, de dónde vinieron ni si son fiables, y
acaban sin usarse. El coste real no es el del almacenamiento, es la pérdida de
confianza y el tiempo que se va en averiguar qué dato sirve. Lo que evita el
pantano no es guardar menos, es catalogar lo que se guarda, controlar quién
accede y organizarlo por zonas.

**Pregunta:** ¿Qué crees que le falta a un data lake para poder reemplazar a un
almacén de datos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Sobre S3 puro le faltan garantías transaccionales: un
lector puede ver una escritura a medias, y no hay forma sencilla de actualizar o
borrar filas concretas, algo que las normativas de privacidad exigen. También le
falta la disciplina de esquema que hace que quien consulta sepa qué va a
encontrar. Los formatos de tabla abiertos como Apache Iceberg cubren esa
distancia —eso es el lakehouse—, aunque un almacén como Redshift sigue ganando en
consultas de alta concurrencia y baja latencia.

## ⚠️ No lo confundas con

- **OLTP vs. OLAP:** no es "rápido frente a lento", es la forma de la carga.
  Muchas operaciones pequeñas contra pocas consultas enormes, y de ahí salen filas
  frente a columnas.
- **Data lake vs. data warehouse:** el lake aplica el esquema al leer y admite
  cualquier formato; el warehouse lo exige al escribir y solo admite datos
  estructurados.
- **Data lake vs. data swamp:** misma tecnología. La diferencia es catálogo,
  control de acceso y organización, no el servicio que se use.
- **Lakehouse vs. data lake:** el lakehouse es un lake más una capa de metadatos
  transaccional (Iceberg). Los archivos siguen siendo Parquet en S3.
- **Desnormalizar vs. duplicar por error:** en un sistema analítico repetir datos
  es una decisión de diseño para evitar uniones, no un fallo de modelado.

## 🎯 Pistas para el examen

- **Cuando el enunciado hable de escanear y agregar muchas filas**, la respuesta
  vive en el mundo columnar. Cuando hable de leer o actualizar registros
  individuales por clave, en el mundo por filas.
- **"Borrar o actualizar filas concretas en S3" apunta a Iceberg**, casi siempre.
  Es uno de los patrones nuevos que más aparece.
- **Vigila el requisito de concurrencia.** Athena sobre S3 y Redshift resuelven
  cosas parecidas, pero cuando el enunciado menciona muchos usuarios simultáneos
  con respuestas rápidas y predecibles, la balanza se inclina a Redshift.
- **Un enunciado que mencione datos no estructurados** —vídeos, documentos,
  imágenes— descarta el almacén de datos relacional sin necesidad de leer el
  resto de la opción.
