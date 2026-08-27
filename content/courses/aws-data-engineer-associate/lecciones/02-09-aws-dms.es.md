# 2.9 — AWS DMS: full load, CDC y validación de la migración

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 10 min de lectura

## 🤔 Antes de empezar

- Para migrar una base de datos que sigue recibiendo escrituras, ¿cómo evitarías
  perder los cambios que ocurren mientras copias los datos?
- Si el origen es Oracle y el destino PostgreSQL, ¿qué crees que hay que resolver
  además de mover las filas?
- Terminada una migración, ¿cómo comprobarías que el destino tiene exactamente los
  mismos datos que el origen?

## 📘 Contenido

Andes Retail tiene el catálogo de productos y el inventario de sus 400
supermercados en una base de datos Oracle de hace doce años. La dirección quiere
llevarlo a AWS, y hay una condición que no se negocia: **las cajas no pueden dejar
de cobrar**. Una parada de dos horas un sábado por la tarde cuesta más que el
proyecto entero.

**AWS Database Migration Service** (DMS) existe para ese problema. Mueve datos
entre bases de datos, y su nombre engaña un poco: se usa tanto para migraciones
puntuales como para **replicación continua** hacia un data lake o un almacén de
datos, que es el caso que más aparece en este examen.

Su rasgo distintivo es que **el origen sigue funcionando durante todo el proceso**.
Es lo que responde a la primera pregunta de activación.

### Las piezas

- **Endpoints de origen y destino.** Definen a qué bases se conecta. DMS admite
  orígenes comerciales y de código abierto —Oracle, SQL Server, MySQL, PostgreSQL,
  MongoDB— y destinos que incluyen bases relacionales, **Amazon S3**, Amazon
  Redshift, DynamoDB y OpenSearch. Que S3 sea un destino válido es lo que lo
  convierte en una herramienta de ingesta hacia el data lake.
- **Instancia de replicación.** El servidor gestionado que hace el trabajo. Su
  tamaño determina el rendimiento, y existe una modalidad **DMS Serverless** que
  ajusta la capacidad automáticamente, útil cuando el enunciado pide no
  dimensionar nada.
- **Tarea de replicación.** Define qué tablas se mueven, con qué reglas de
  transformación y en qué modo.

### Los tres modos de tarea

Este es el bloque más preguntado y responde a la primera pregunta de activación.

**Full load.** Copia los datos existentes y termina. Sirve para una migración de
una sola vez sobre una base que está detenida.

**Full load + CDC.** Copia los datos existentes y, **a la vez**, va anotando los
cambios que ocurren durante la copia. Cuando termina el volcado, aplica esos
cambios acumulados y continúa replicando de forma continua. Es el modo que permite
migrar sin parar el origen, y por eso es la respuesta habitual cuando el enunciado
menciona **tiempo de inactividad mínimo**.

**CDC only.** Replica solo los cambios a partir de un punto, asumiendo que los
datos existentes ya se cargaron por otro medio.

La captura de cambios funciona leyendo el **registro de transacciones** de la base
de origen, así que no hace falta añadir columnas de marca de tiempo ni disparadores
en las tablas. Sí exige que el origen tenga habilitado ese registro con el nivel de
detalle adecuado, algo que en Oracle o PostgreSQL requiere configuración previa.

### DMS mueve datos, no esquemas

Aquí está la respuesta a la segunda pregunta de activación, y es una de las
distinciones que el examen usa más.

Cuando origen y destino son del **mismo motor** —de MySQL a MySQL—, la migración
es *homogénea* y DMS puede crear las tablas básicas en el destino.

Cuando son **motores distintos** —de Oracle a PostgreSQL—, la migración es
*heterogénea*, y hay una parte que DMS no hace: convertir el esquema. Los tipos de
datos, los procedimientos almacenados, las secuencias y las vistas no se traducen
solos.

Para eso existe el **AWS Schema Conversion Tool** (**AWS SCT**), y también la
funcionalidad equivalente integrada, **DMS Schema Conversion**. El reparto es
claro y conviene memorizarlo:

> **SCT convierte el esquema. DMS mueve los datos.**

Si un escenario plantea una migración heterogénea y una opción propone solo DMS,
está incompleta. El tema se desarrolla en la lección 6.14.

### Validación de datos

La tercera pregunta de activación tiene respuesta directa: DMS incluye
**validación de datos**, una función que compara origen y destino fila a fila
después de migrarlas y registra las diferencias que encuentra.

Es la respuesta correcta cuando el enunciado pide **comprobar que la migración fue
completa y correcta**. Las alternativas artesanales —contar filas, calcular sumas
de verificación con consultas propias— aparecen como distractores: funcionan, pero
implican trabajo que el servicio ya hace.

### Reglas de transformación y selección

Una tarea puede incluir reglas para **seleccionar** qué esquemas y tablas se
mueven, y para **transformar** sobre la marcha: renombrar tablas o columnas,
cambiar mayúsculas a minúsculas, añadir prefijos o excluir columnas.

Son transformaciones simples, a nivel de estructura. Cuando el enunciado pide
lógica de negocio, agregaciones o uniones, la respuesta ya no es DMS sino un motor
de transformación como los del módulo 3.

### DMS hacia S3

Cuando el destino es S3, DMS escribe los cambios como archivos **CSV o Parquet**.
Cada registro incluye una columna que indica el **tipo de operación** —inserción,
modificación o borrado—, que es lo que permite reconstruir el estado aguas abajo.

De ahí un patrón que aparece en el examen: los archivos que DMS deja en S3 no son
el estado actual de la tabla, sino un **registro de cambios**. Convertirlos en una
tabla consultable exige un paso posterior que aplique esos cambios, y ahí es donde
encajan de forma natural los formatos de tabla abiertos de la lección 1.3, que
soportan modificaciones y borrados por fila.

### DMS frente a las alternativas

| Necesidad | Respuesta |
|---|---|
| Migrar una base de datos manteniéndola en servicio | **DMS full load + CDC** |
| Convertir el esquema entre motores distintos | **SCT / DMS Schema Conversion** |
| Replicar cambios de DynamoDB | DynamoDB Streams o Kinesis (lección 2.8) |
| Llevar datos de Aurora o RDS a Redshift sin pipeline | **Zero-ETL** (lección 2.10) |
| Copiar archivos, no bases de datos | DataSync o Transfer Family |

La frontera con zero-ETL es la que más importa hoy y se trata en la lección
siguiente.

**En resumen:** DMS mueve datos entre bases sin detener el origen, con tres modos
—full load, full load + CDC y CDC only— leyendo el registro de transacciones. No
convierte esquemas: eso es trabajo de SCT o de DMS Schema Conversion. Incluye
validación fila a fila, admite reglas simples de selección y transformación, y
puede escribir en S3 en CSV o Parquet marcando el tipo de operación de cada
registro.

## 🔍 Cómo lo pregunta el examen

> Una empresa debe migrar una base de datos Oracle de 8 TB a Amazon Aurora
> PostgreSQL. La aplicación no puede detenerse más de 15 minutos y, al terminar,
> el equipo debe demostrar que el destino contiene exactamente los mismos datos.
> ¿Qué combinación cumple los requisitos?

Tres pistas, tres piezas. **Oracle a PostgreSQL** es una migración heterogénea;
**no puede detenerse más de 15 minutos** exige captura de cambios; **demostrar que
los datos coinciden** exige validación.

Eso descarta las opciones que proponen solo DMS con full load: dejarían fuera la
conversión de esquema y obligarían a detener la aplicación durante toda la copia
de 8 TB. También descarta las que proponen exportar e importar archivos, por la
misma razón de tiempo de inactividad.

La respuesta correcta combina **SCT o DMS Schema Conversion** para el esquema,
**DMS con full load + CDC** para los datos sin detener el origen, y la
**validación de datos** de DMS para la comprobación final. Cuando el enunciado
mencione dos motores distintos, comprueba siempre que la opción incluya la
conversión de esquema.

## 💬 Ahora te toca a ti

**Pregunta:** Para migrar una base de datos que sigue recibiendo escrituras, ¿cómo
evitarías perder los cambios que ocurren mientras copias los datos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Registrando esos cambios mientras dura la copia y
aplicándolos al terminar. Es exactamente lo que hace el modo full load + CDC de
DMS: vuelca los datos existentes y, en paralelo, va anotando las transacciones que
ocurren; cuando el volcado acaba, aplica lo acumulado y sigue replicando en
continuo. Así el corte de servicio se reduce al momento de cambiar la aplicación
de una base a otra, en lugar de durar toda la copia.

**Pregunta:** Si el origen es Oracle y el destino PostgreSQL, ¿qué crees que hay
que resolver además de mover las filas?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El esquema. Los tipos de datos no se corresponden uno a
uno entre motores, y los procedimientos almacenados, las vistas, las secuencias y
los disparadores están escritos en dialectos distintos. DMS mueve los datos pero
no traduce nada de eso: hace falta el Schema Conversion Tool o la conversión de
esquema integrada en DMS. En el examen, una migración heterogénea cuya solución
solo mencione DMS está incompleta.

**Pregunta:** Terminada una migración, ¿cómo comprobarías que el destino tiene
exactamente los mismos datos que el origen?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Con la validación de datos que incluye DMS, que compara
origen y destino fila a fila y registra las diferencias. Es la respuesta que el
examen busca, porque las alternativas manuales —contar filas o calcular sumas de
verificación con consultas propias— suponen trabajo que el servicio ya hace y no
detectan diferencias dentro de una fila cuyo recuento coincide.

## ⚠️ No lo confundas con

- **DMS vs. SCT:** DMS mueve datos; SCT convierte esquemas. Una migración
  heterogénea necesita los dos.
- **Full load vs. full load + CDC:** copiar una vez frente a copiar y seguir
  replicando. Solo el segundo permite tiempo de inactividad mínimo.
- **CDC de DMS vs. DynamoDB Streams:** DMS lee el registro de transacciones de una
  base relacional; DynamoDB Streams es el registro nativo de una tabla de
  DynamoDB.
- **Migración homogénea vs. heterogénea:** mismo motor frente a motores distintos.
  Cambia por completo si hace falta conversión de esquema.
- **Archivos de DMS en S3 vs. estado de la tabla:** lo que DMS escribe es un
  registro de cambios con el tipo de operación, no una fotografía consultable.

## 🎯 Pistas para el examen

- **"Sin detener la aplicación" o "tiempo de inactividad mínimo" es full load +
  CDC.** Es una asociación casi automática.
- **Dos motores distintos obligan a incluir la conversión de esquema.** Si la
  opción solo dice DMS, está incompleta.
- **"Demostrar que los datos coinciden" es la validación de DMS**, no un script
  propio.
- **DMS puede escribir en S3**, así que aparece como respuesta en escenarios de
  data lake y no solo de migración entre bases.
- **Si el origen es Aurora o RDS y el destino Redshift, comprueba primero si
  zero-ETL cubre el caso**: suele tener menos esfuerzo operativo que DMS.
