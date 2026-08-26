# 1.5 — Particionado, compresión y tamaño de archivo: las tres palancas de costo

> Módulo 1 · Fundamentos · ⏱️ 13 min de lectura

## 🤔 Antes de empezar

- Si particionar los datos hace que las consultas lean menos, ¿por qué no
  particionar por todos los campos posibles?
- Una tabla y otra ocupan lo mismo y tienen las mismas filas, pero una se consulta
  en 4 segundos y la otra en 6 minutos. ¿Qué puede explicar la diferencia?
- ¿Por qué crees que tener demasiados archivos pequeños puede ser un problema, si
  el almacenamiento se cobra por bytes?

## 📘 Contenido

En la lección anterior vimos la primera palanca de costo: el formato. Esta
lección cubre las otras dos, y la combinación de las tres explica la mayoría de
las preguntas de optimización del examen.

La razón es que motores como Athena **cobran por bytes escaneados**, y en Spark
o EMR el tiempo de cómputo es proporcional a los datos leídos. Reducir bytes
leídos reduce dinero de forma directa.

### Particionado: no leer lo que no hace falta

**Particionar** es organizar los archivos en carpetas según el valor de una o
varias columnas, de forma que el motor pueda descartar carpetas enteras sin
abrirlas.

En S3 se hace con una convención de rutas llamada estilo Hive:

```
s3://mediateca-datalake/eventos/anio=2026/mes=08/dia=26/parte-0001.parquet
s3://mediateca-datalake/eventos/anio=2026/mes=08/dia=27/parte-0001.parquet
```

Los pares `clave=valor` de la ruta se convierten en columnas de la tabla. Cuando
una consulta filtra `WHERE anio = 2026 AND mes = 8 AND dia = 26`, el motor
**solo lista y lee esa carpeta**. A eso se le llama **partition pruning**.

El efecto es brutal. Sobre tres años de eventos, una consulta de un solo día pasa
de escanear unos 43 TB a escanear 40 GB. Mismo dato, misma consulta, tres órdenes
de magnitud menos de factura.

**La regla para elegir la clave de partición** es una sola: se particiona por
**los campos por los que se filtra habitualmente**, no por los que parecen
importantes. La fecha es la clave de partición más común porque casi todas las
consultas analíticas acotan un período.

### Por qué no se particiona por todo

Cada partición es una carpeta con al menos un archivo y una entrada en el
catálogo. Particionar de más produce **sobreparticionado** (*over-partitioning*),
y tiene tres costes:

- **Explosión de metadatos.** Particionar por año, mes, día **y** id de usuario,
  con dos millones de usuarios, genera millones de particiones. Solo planificar la
  consulta —listar y filtrar particiones— puede tardar más que leer los datos.
- **Archivos diminutos.** Si cada partición recibe pocos registros, acabas con
  archivos de kilobytes. El siguiente apartado explica por qué eso duele.
- **Particiones desiguales.** Si un valor concentra la mayoría de los datos, esa
  partición se convierte en un cuello de botella.

La guía práctica: particiona por campos de **cardinalidad baja o media** —fecha,
región, tipo de evento— y **nunca por identificadores únicos** como el id de
usuario o el id de transacción.

Cuando necesitas agrupar por un campo de cardinalidad alta, la herramienta no es
particionar sino **bucketing** (o *clustering*): repartir las filas en un número
fijo de archivos según el hash de una columna, de modo que todas las filas con el
mismo valor caigan en el mismo archivo. Da agrupación sin multiplicar carpetas.

Su punto fuerte son las **búsquedas de un valor concreto**: si los datos están
distribuidos por identificador de usuario, el motor sabe de antemano qué archivo
puede contener ese usuario y se salta el resto. Por el mismo motivo pierde valor
cuando las consultas buscan muchos valores distintos a la vez: cuantos más
valores, más probable es que haya que leer todos los archivos igualmente.

Hay otra alternativa que AWS recomienda de forma explícita y que se olvida a
menudo: **ordenar los datos dentro del archivo** por la columna del filtro. Si
las consultas miran rangos de días, es mejor particionar por día y mantener los
registros ordenados por marca de tiempo que particionar por hora. La ordenación
aprovecha las estadísticas de cada bloque para saltárselos, y evita multiplicar
las particiones por 24.

### El problema de los archivos pequeños

Este es el que más sorprende, porque el almacenamiento se cobra por bytes y
parece que el número de archivos no debería importar. Importa por otro motivo:
**cada archivo tiene un coste fijo de apertura**.

Para leer un archivo en S3, el motor hace al menos una petición HTTP, espera la
respuesta, lee metadatos y planifica una tarea. Ese coste fijo es de milisegundos
o decenas de milisegundos, y **no depende del tamaño del archivo**.

Con 200 archivos de 128 MB, ese coste fijo es despreciable frente al trabajo
útil. Con 200.000 archivos de 128 KB —los mismos 25 GB—, el motor pasa la mayor
parte del tiempo abriendo archivos en lugar de procesar datos. En Athena y en
Spark el resultado es el mismo: consultas lentas sin motivo aparente.

AWS no publica un tamaño mínimo exacto, pero sí dos referencias útiles. La
primera: los formatos columnares se organizan internamente en bloques —*row
groups* en Parquet, *stripes* en ORC— cuyo tamaño por defecto es de **128 MB y
64 MB** respectivamente, y AWS desaconseja reducirlos. Un archivo más pequeño que
su propio bloque interno paga la sobrecarga del formato sin obtener sus ventajas.
La segunda: **por encima de unos 1.000 archivos en una misma partición**, listar
el contenido exige varias operaciones sucesivas, porque S3 devuelve como máximo
1.000 objetos por listado.

Hay además un límite duro que conviene conocer: S3 admite del orden de **5.500
peticiones por segundo** sobre un mismo índice de prefijos. Un conjunto con
decenas de miles de archivos puede superarlo y provocar errores de tipo
`SlowDown`, sobre todo con varias consultas concurrentes. El síntoma deja de ser
"va lento" y pasa a ser "falla".

En la práctica, el orden de magnitud que se busca es de **cientos de megabytes
por archivo**, tanto en Athena como en Spark.

De dónde salen los archivos pequeños, casi siempre:

- Un proceso de streaming que escribe cada pocos segundos.
- Sobreparticionado, que reparte pocos registros en muchas carpetas.
- Un job de Spark con más particiones en memoria de las necesarias: **cada
  partición de Spark escribe su propio archivo**.

Y las soluciones habituales: aumentar el búfer del proceso de ingesta, reducir el
número de particiones antes de escribir, o pasar un proceso periódico de
**compactación** que junte los archivos pequeños de cada partición en pocos
grandes.

### Compresión: menos bytes por el mismo dato

La tercera palanca. Comprimir reduce lo que se lee de disco y lo que viaja por la
red, a cambio de CPU para descomprimir. En cargas analíticas ese intercambio casi
siempre compensa, porque el cuello de botella es la lectura.

Lo que hay que recordar del examen, además de la tabla de códecs de la lección
1.4, es la interacción con la divisibilidad: **un archivo grande comprimido con
gzip solo lo puede procesar una tarea**, mientras que Parquet con Snappy se
paraleliza porque cada row group se comprime por separado.

Y una consecuencia práctica de la lección anterior que conviene enlazar aquí: en
un formato columnar la compresión es más efectiva, porque agrupa valores del
mismo tipo. La misma columna de códigos de región comprime mucho mejor cuando
está junta que intercalada entre otros campos.

### Las tres palancas, juntas

El caso completo de Mediateca, con las tres aplicadas sobre los mismos datos:

| Estado | Formato | Particionado | Tamaño de archivo | Escaneo de una consulta de un día |
|---|---|---|---|---|
| Inicial | JSON | No | Miles de archivos pequeños | Todo el conjunto |
| Solo formato | Parquet + Snappy | No | Miles de archivos pequeños | Todo, pero muchos menos bytes |
| Formato y particiones | Parquet + Snappy | Por fecha | Miles de archivos pequeños | Solo un día, pero lento por el número de archivos |
| Las tres | Parquet + Snappy | Por fecha | Archivos de ~128 MB | Solo un día, rápido |

El orden importa menos que aplicarlas las tres. Y el examen suele construir sus
opciones de respuesta poniendo **una sola palanca** en las incorrectas y **dos o
tres** en la correcta, cuando el enunciado pide "la mayor reducción".

**En resumen:** particionar por los campos de filtro habituales evita leer lo que
no hace falta, pero particionar de más explota los metadatos y genera archivos
diminutos. Los archivos pequeños duelen por el coste fijo de apertura, no por el
espacio: el objetivo son cientos de megabytes por archivo. Y la compresión reduce
bytes leídos, siempre que no destruya la divisibilidad.

## 🔍 Cómo lo pregunta el examen

> Un equipo ingiere eventos en Amazon S3 con un proceso de streaming que escribe
> un archivo Parquet cada 30 segundos, particionado por año, mes, día y hora. Las
> consultas de Athena filtran por rangos de días y tardan varios minutos, aunque
> escanean pocos gigabytes. ¿Qué explica la lentitud y cómo se corrige?

Fíjate en la contradicción del enunciado: **escanean pocos gigabytes** pero
**tardan varios minutos**. Si el volumen leído es bajo y aun así es lento, el
problema no está en los bytes: está en el **número de objetos**.

Escribir cada 30 segundos produce 2.880 archivos diarios, y particionar hasta la
hora los reparte en carpetas con 120 archivos cada una. El formato ya es Parquet
y el particionado ya funciona —por eso escanea poco—, así que las opciones que
proponen convertir a Parquet o particionar por fecha no aportan nada: ya está
hecho.

La respuesta correcta ataca el número de archivos: **compactar los archivos
pequeños** en pocos grandes, y de paso aumentar el búfer del proceso de ingesta o
reducir el particionado de hora a día. Cuando el enunciado diga "escanea poco pero
tarda mucho", piensa en archivos pequeños antes que en cualquier otra cosa.

## 💬 Ahora te toca a ti

**Pregunta:** Si particionar los datos hace que las consultas lean menos, ¿por qué
no particionar por todos los campos posibles?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque cada partición es una carpeta con archivos y una
entrada en el catálogo. Particionar por campos de cardinalidad alta genera
millones de particiones, y solo planificar la consulta —listarlas y filtrarlas—
puede tardar más que leer los datos. Además reparte pocos registros en muchas
carpetas, lo que produce archivos diminutos. Se particiona por campos de
cardinalidad baja o media por los que se filtra de verdad, nunca por
identificadores únicos.

**Pregunta:** Una tabla y otra ocupan lo mismo y tienen las mismas filas, pero una
se consulta en 4 segundos y la otra en 6 minutos. ¿Qué puede explicar la
diferencia?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Las tres palancas. El formato: si una es Parquet y la otra
CSV, la primera lee solo las columnas necesarias y se salta bloques por
estadísticas. El particionado: si una está organizada por el campo del filtro, se
salta carpetas enteras. Y el tamaño de archivo: si una está en cientos de archivos
grandes y la otra en cientos de miles de archivos pequeños, la segunda gasta el
tiempo abriendo objetos en vez de procesar. Ocupar lo mismo no dice nada sobre
cuánto hay que leer para responder.

**Pregunta:** ¿Por qué crees que tener demasiados archivos pequeños puede ser un
problema, si el almacenamiento se cobra por bytes?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque el coste que duele no es el del espacio, es el coste
fijo de abrir cada archivo: una petición a S3, su latencia, la lectura de
metadatos y la planificación de una tarea. Ese coste no depende del tamaño, así
que con archivos diminutos el motor pasa más tiempo abriendo que procesando. El
síntoma característico es una consulta que escanea pocos datos y aun así tarda
mucho.

## ⚠️ No lo confundas con

- **Particionado vs. bucketing:** particionar crea carpetas por valor y sirve para
  cardinalidad baja o media; el bucketing reparte por hash en un número fijo de
  archivos y sirve para cardinalidad alta y para uniones.
- **Partition pruning vs. predicate pushdown:** el pruning descarta **carpetas**
  usando la ruta; el pushdown descarta **bloques dentro de un archivo** usando
  las estadísticas del formato. Son dos ahorros distintos que se suman.
- **Pocos bytes escaneados vs. consulta rápida:** no son lo mismo. Muchos archivos
  pequeños dan poco escaneo y mucha lentitud.
- **Particionado de la tabla vs. particiones de Spark:** el primero es la
  organización en carpetas de S3; el segundo, los trozos en memoria en los que
  Spark divide el trabajo. Comparten nombre y no son lo mismo.
- **Comprimir más vs. consultar mejor:** bzip2 comprime más que Snappy y suele dar
  peor rendimiento analítico. El objetivo no es el archivo más pequeño.

## 🎯 Pistas para el examen

- **Cuando pidan "la mayor reducción de costo", busca la opción que combine varias
  palancas.** Convertir a Parquet **y** particionar por el campo del filtro gana
  a cualquiera de las dos por separado.
- **"Escanea poco pero tarda mucho" es archivos pequeños.** Es el patrón que más
  se confunde con falta de capacidad.
- **Verifica qué está ya resuelto en el enunciado.** Si los datos ya son Parquet y
  ya están particionados, las opciones que proponen eso son relleno.
- **Particionar por un identificador único es siempre incorrecto.** Si una opción
  propone particionar por id de usuario o de transacción, descártala.
- **Comprueba que la clave de partición coincide con el filtro.** Particionar por
  región cuando todas las consultas filtran por fecha no ahorra nada, y es un
  distractor habitual.
