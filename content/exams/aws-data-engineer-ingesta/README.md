# AWS Data Engineer Associate: ingesta de datos

Banco **bilingüe** de 65 preguntas sobre la parte de ingesta del AWS Certified Data
Engineer – Associate (DEA-C01), en el formato y la redacción del examen real.

El inglés es el original: se escribió primero, con la redacción del examen tal como se
rinde. El español es su traducción, estrictamente paralela.

## Qué cubre, y qué no

El DEA-C01 publica cuatro dominios, y su dominio 1 —"Data Ingestion and
Transformation", 34 % del examen— junta dos cosas. **Este banco evalúa solo la mitad
de ingesta**: cómo entran los datos, con qué caudal, con cuánta latencia, y qué se
puede volver a leer. La parte de transformación (Spark en Glue, SQL en Athena,
optimización de un job) queda fuera a propósito, y los otros tres dominios
—almacenamiento, operaciones, seguridad y gobierno— también.

Los cinco temas no son dominios oficiales de AWS. Salen de las tareas que la guía del
examen enumera para la ingesta, y existen para que el diagnóstico por tema diga algo
más útil que "te fue mal en ingesta".

## Parámetros con los que se generó

| Parámetro | Valor |
|---|---|
| Temas | 5 (ver la tabla siguiente) |
| Dificultad | Mixta escalonada |
| Preguntas | 65 |
| Reparto entre temas | 16 / 12 / 14 / 12 / 11, según el material de cada tema |
| Formato | El del DEA-C01: 55 de opción única (4 opciones / 1 correcta) y 10 de respuesta múltiple (5 / 2) |
| Respuesta múltiple | ~15 % (10 de 65) |
| Idioma | Inglés (original) y español (traducción), las 65 en los dos |
| Para aprobar | 72 %, los 720 sobre 1000 del examen real (47 de 65) |
| Duración sugerida | 130 min, los del examen real (~2 min por pregunta) |
| Versión del banco | 1 |

El reparto declarado de la dificultad mixta, para poder contarlo:

- **~10 % introductorias** — una característica decide sola (la retención máxima de un
  stream, si un servicio es de streaming o de entrega).
- **~55 % intermedias** — un escenario con un requisito explícito que descarta
  opciones; los distractores serían correctos en otro escenario.
- **~35 % avanzadas** — dos opciones defendibles y un detalle que decide. La
  explicación de la descartada **es** la clase: por qué `PutRecords` no arregla lo que
  arregla la agregación del KPL, por qué `min.insync.replicas = 3` es menos disponible
  sin ser más durable, por qué GZIP ahorra menos que Parquet cuando la consulta lee 3
  de 60 columnas.

### Qué idioma se ve, y dónde vive cada uno

| Casillero | Contenido | Quién lo ve |
|---|---|---|
| `questions.es` | Español | La app en español, y `pt-BR` por caída al idioma por defecto |
| `questions.en` | Inglés | La app en inglés |

El español va en `es` porque `es` es el `defaultLocale` del proyecto y por lo tanto
**el idioma contra el que la app califica**: `toGradableExam()` usa siempre
`questions[defaultLocale]`, sin importar en qué idioma esté leyendo el alumno. Con las
dos listas paralelas la nota sale igual en los dos casos, que es exactamente para lo
que existe la regla de paralelismo.

**El idioma de las preguntas lo decide el locale de la ruta**, no un selector propio
del examen: `examQuestions(bank, locale)` devuelve `questions[locale] ?? questions.es`.
Dicho de otro modo, para rendirlo en las condiciones del examen real hay que pasar la
app a inglés. Si se prefiere lo contrario —inglés por defecto y español como la
traducción disponible— se intercambian los dos casilleros en `manifest.ts` y se
actualiza `IDIOMA_QUE_CALIFICA` en `configuracion.ts`. No hay nada más que tocar.

#### Criterio de traducción

Nombres de servicio, de API, de error y de parámetro quedan **en inglés**, porque es
como aparecen en la consola y en el examen: `ProvisionedThroughputExceededException`,
`PutRecords`, `GetRecords`, `MillisBehindLatest`, `wal_level`, `min.insync.replicas`,
`groupFiles`, `MaxConcurrency`, `glue:StartJobRun`. Se traduce la prosa. Se mantienen
como préstamo los términos que nadie traduce al hablar y que aparecen así en la
consola: `shard`, `enhanced fan-out`, `bookmark`, `throttling`.

El aviso de respuesta múltiple se traduce y el verificador lo vigila en las dos
direcciones: toda múltiple lleva la marca de **su** idioma (`(Elegí dos.)` en español,
`(Choose two.)` en inglés) y ninguna lleva la del otro, que es lo que pasa cuando una
traducción se dejó el aviso del original.

## Temas

Cada tema tiene **dos** archivos, uno por idioma, con el mismo nombre bajo
`preguntas/en/` y `preguntas/es/`:

| id | Tema | Preguntas | Múltiples | Archivo (en los dos directorios) |
|---|---|---|---|---|
| `streaming-kinesis-msk` | Streaming: Kinesis Data Streams y MSK | 16 | 3 | `tema-1-streaming-kinesis-msk.ts` |
| `firehose-delivery` | Firehose y entrega casi en tiempo real | 12 | 2 | `tema-2-firehose-delivery.ts` |
| `batch-database-ingestion` | Ingesta por lotes y desde bases de datos | 14 | 2 | `tema-3-batch-database.ts` |
| `orchestration-event-driven` | Orquestación e ingesta por eventos | 12 | 2 | `tema-4-orchestration-event-driven.ts` |
| `throughput-replayability` | Caudal, latencia y reproducibilidad | 11 | 1 | `tema-5-throughput-replayability.ts` |

El reparto es parejo a propósito: entre 11 y 16. `intercalarPorTema` sirve una
pregunta de cada tema por vuelta, así que con un tema de 30 y otro de 5 las últimas 25
quedarían monotemáticas. Acá la última vuelta sirve cuatro preguntas del tema 1 y
nada más.

### Preguntas

| id | Formato | Qué discrimina |
|---|---|---|
| `dea-t1-q01` | única | Throttling por clave de partición concentrada, no por falta de capacidad |
| `dea-t1-q02` | única | La retención decide la profundidad del replay; el checkpoint no |
| `dea-t1-q03` | única | Enhanced fan-out da caudal dedicado **y** ~70 ms de latencia |
| `dea-t1-q04` | única | Orden por entidad es una decisión de clave de partición |
| `dea-t1-q05` | única | Modo on-demand para tráfico impredecible |
| `dea-t1-q06` | única | Agregación (KPL) contra colección (`PutRecords`) |
| `dea-t1-q07` | única | `min.insync.replicas = 2` con `acks = all` sobrevive una AZ |
| `dea-t1-q08` | única | MSK Connect corre plugins de Kafka Connect; DMS no |
| `dea-t1-q09` | única | MSK Serverless elimina sizing de brokers y rebalanceo |
| `dea-t1-q10` | única | Un `PutRecord` throttleado es una escritura rechazada |
| `dea-t1-q11` | única | El resharding no mueve ni copia registros ya escritos |
| `dea-t1-q12` | única | Un security group limita alcance, nunca identidad |
| `dea-t1-q13` | única | La compactación de log es de Kafka y no tiene equivalente en Kinesis |
| `dea-t1-q14` | múltiple | Con carga pareja, el throttling es capacidad |
| `dea-t1-q15` | múltiple | Orden por clave más límite de reintentos para el registro envenenado |
| `dea-t1-q16` | múltiple | `MillisBehindLatest` creciente con escrituras sanas es el consumidor |
| `dea-t2-q01` | única | Con tráfico liviano, el intervalo manda sobre el tamaño |
| `dea-t2-q02` | única | La conversión a Parquet necesita una tabla del Glue Data Catalog |
| `dea-t2-q03` | única | Solo la partición dinámica lee un campo del registro |
| `dea-t2-q04` | única | Los registros fallidos van al bucket de error, no a una DLQ |
| `dea-t2-q05` | única | Firehose es configuración; un consumidor es código |
| `dea-t2-q06` | única | Firehose no retiene nada, así que no hay replay |
| `dea-t2-q07` | única | La rotación de índice es del destino OpenSearch |
| `dea-t2-q08` | única | Un stream como origen de Firehose: una publicación, dos caminos |
| `dea-t2-q09` | única | Columnar reduce qué bytes se leen; comprimir solo cuántos hay |
| `dea-t2-q10` | única | Una cuota por cuenta no se arregla agregando streams |
| `dea-t2-q11` | múltiple | Duración de reintento más bucket de respaldo |
| `dea-t2-q12` | múltiple | Firehose descarga con el primer hint que se cumple |
| `dea-t3-q01` | única | Solo el CDC sobre el log ve los `DELETE` |
| `dea-t3-q02` | única | Los bookmarks de Glue persisten qué se consumió |
| `dea-t3-q03` | única | AppFlow para APIs de SaaS; DMS para motores de base de datos |
| `dea-t3-q04` | única | Transfer Family cuando el cliente SFTP no se puede cambiar |
| `dea-t3-q05` | única | El CDC de PostgreSQL necesita `wal_level = logical` |
| `dea-t3-q06` | única | Los crawls incrementales limitan el recorrido, no el muestreo |
| `dea-t3-q07` | única | Volumen sobre ancho de banda descarta la red antes de elegir |
| `dea-t3-q08` | única | Zero-ETL no es un pipeline que haya que operar |
| `dea-t3-q09` | única | La validación de datos compara filas; el assessment no |
| `dea-t3-q10` | única | El modo LOB limitado trunca en silencio |
| `dea-t3-q11` | única | Una conexión de Glue es lo que mete al job en la VPC |
| `dea-t3-q12` | única | El table level decide a qué profundidad empieza una tabla |
| `dea-t3-q13` | múltiple | Driver ocupado con executors ociosos es el problema de archivos chicos |
| `dea-t3-q14` | múltiple | `batch apply` más clase de instancia para la latencia de CDC |
| `dea-t4-q01` | única | EventBridge quita el límite de una configuración por prefijo |
| `dea-t4-q02` | única | Más de cinco minutos descarta Express antes de hablar de costo |
| `dea-t4-q03` | única | Un scheduler dispara por hora; un orquestador por dependencia |
| `dea-t4-q04` | única | Una cola convierte un problema de caudal en uno de latencia |
| `dea-t4-q05` | única | Distributed Map levanta los límites del Map inline |
| `dea-t4-q06` | única | `Parallel` no es un límite de fallo; `Retry` y `Catch` sí |
| `dea-t4-q07` | única | La concurrencia reservada es el techo que protege al downstream |
| `dea-t4-q08` | única | Fan-out a colas da buffer propio por consumidor |
| `dea-t4-q09` | única | El message group ID es lo que acota el orden en FIFO |
| `dea-t4-q10` | única | Un Pipe reemplaza la función que solo movía y filtraba |
| `dea-t4-q11` | múltiple | Redrive más evento de cambio de estado en EventBridge |
| `dea-t4-q12` | múltiple | Cero eventos coincidentes apunta al origen, no al target |
| `dea-t5-q01` | única | Un streaming no puede ser más fresco que su origen |
| `dea-t5-q02` | única | Con at-least-once, el consumidor es idempotente o no sirve |
| `dea-t5-q03` | única | Una cola distribuye trabajo; un stream es un log releíble |
| `dea-t5-q04` | única | La retención es el plazo para drenar el backlog |
| `dea-t5-q05` | única | Las ventanas de sesión son estado, y piden un motor de streaming |
| `dea-t5-q06` | única | La latencia de punta a punta es una suma: atacá el término dominante |
| `dea-t5-q07` | única | On-demand se paga por la incertidumbre que no existe acá |
| `dea-t5-q08` | única | Fan-in: un stream y una clave, no un recurso por tenant |
| `dea-t5-q09` | única | Historia y cambios en una sola tarea, para que no haya hueco |
| `dea-t5-q10` | única | Dimensionar contra los dos límites y tomar el mayor, no la suma |
| `dea-t5-q11` | múltiple | El respaldo de registros crudos es lo que salva un bug de transformación |

## Medición del verificador

```
node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/aws-data-engineer-ingesta/verificar-preguntas.mjs
```

Corre **cada control de forma sobre los dos idiomas** y después compara uno contra el
otro. Última corrida, sin problemas:

- 65 preguntas por idioma, 55 de opción única y 10 de respuesta múltiple.
- Reparto de la letra correcta, idéntico en los dos por construcción:
  **A:14 B:14 C:14 D:13**.
- Las 10 de respuesta múltiple usan **10 combinaciones distintas** de correctas
  (`AB AC AD AE BC BD BE CD CE DE`), así que el par tampoco es un patrón.
- La correcta es la opción más larga en **17 de 55** en inglés y **16 de 55** en
  español; el tope es 60 %. Se mide por idioma a propósito: el español es más largo que
  el inglés y no de forma uniforme, así que una traducción puede introducir la fuga que
  el original no tenía.
- Paralelismo: `en` alineado con `es` en 65 posiciones, mismos ids, mismos formatos y
  mismas correctas.

Además de los controles de la plantilla, este verificador agrega cinco:

- **Paralelismo entre idiomas.** Misma cantidad de preguntas, mismo orden, mismo `topic`,
  mismo formato, mismos ids de opción y mismas correctas. No es cosmético: la app
  califica siempre en el idioma por defecto mientras el alumno puede estar leyendo el
  otro, así que un orden distinto o una correcta movida calificaría una pregunta que ese
  alumno no respondió, y en silencio.
- **Enunciado sin traducir.** Si el enunciado de una traducción es idéntico al del
  original, es casi siempre un copiado a medias. Solo se mira el enunciado y no las
  opciones, porque los nombres de servicio y de API sí se repiten legítimamente.
- **El aviso de respuesta múltiple, por idioma.** Toda múltiple lleva la marca de su
  idioma y ninguna lleva la de otro. Sin el aviso, el alumno marca una sola opción y
  pierde el punto por una convención que nadie le contó.
- **Markdown y HTML en cualquier campo de texto.** No se renderizan, así que `**esto**`
  saldría con los asteriscos a la vista.
- **Un tema declarado en `TEMAS` sin archivo de preguntas en algún idioma**, que
  aparecería en el diagnóstico con cero preguntas sin que nadie lo note.

### El verificador también falla

Se comprobó en dos corridas sobre una copia del banco, con el código del verificador
sin tocar:

1. **Nueve roturas de forma** —id de pregunta duplicado, id de opción `opt-3`,
   explicación vacía, "All of the above" en el texto de una opción, `**` en un tip,
   una pregunta múltiple sin "(Choose two.)", un `topic` no declarado, un conteo
   desincronizado en `configuracion.ts`, y un tema entero sin respuestas correctas—
   reportaron 20 problemas (las 11 preguntas sin correcta cuentan una cada una) y
   salida distinta de cero. Cada rotura disparó su control.
2. **Las dos fugas estadísticas**, que la primera corrida no ejercita: forzando las 55
   correctas a la letra B y alargando su texto, saltaron los cuatro avisos de reparto
   de letra y el de longitud (100 % contra el tope de 60 %).

3. **Las cinco roturas de paralelismo**, en una tercera corrida sobre otra copia: una
   correcta movida de D a A solo en español, un id cambiado que desalinea la lista, el
   aviso `(Choose two.)` dejado en un enunciado en español, y un enunciado español
   reemplazado por el inglés byte a byte. Cada una disparó su control y la salida fue
   distinta de cero.

   Vale anotar un falso negativo que apareció al probar: el primer intento de la cuarta
   rotura cambió una palabra del inglés al copiarlo, los textos no quedaron idénticos y
   el control **no** saltó, correctamente. El control detecta "no se tradujo nada", no
   "se tradujo mal" — ver la sección siguiente.

El control de 7-gramas se verificó sin forzarlo: saltó durante la escritura, con
`dea-t2-q01` y `dea-t5-q06`, que describían los hints de buffer con las mismas
palabras. Se reescribió el enunciado de `dea-t5-q06`, no se bajó el umbral.

## Revisión de contenido

Una lectura crítica de las 65 preguntas, verificando los hechos contra la
documentación de los servicios y **rehaciendo la aritmética de cada escenario**,
encontró siete defectos. Los siete están corregidos. Se listan porque son
exactamente la clase de error que el verificador no puede ver:

| Pregunta | Qué estaba mal | Corrección |
|---|---|---|
| `dea-t2-q10` | **Hecho falso.** El enunciado inventaba una cuota de caudal "por cuenta" para Firehose. Las cuotas de Direct PUT son **por stream y por Región**, así que la opción A se descartaba con un argumento incorrecto: un segundo stream sí tendría su propia cuota | El enunciado ahora dice "cuota por stream", y la opción A se descarta por un motivo honesto (redesplegar productores en medio del incidente no rescata los registros que ya están siendo rechazados) |
| `dea-t5-q04` | **Aritmética imposible.** Productores a 10.000/s "durante el día" contra un consumidor de 4.000/s: sin acotar la jornada el backlog no se drena nunca, así que la respuesta correcta no podía funcionar | Jornada acotada a ocho horas (288 M de registros contra 345 M de capacidad diaria), y la explicación ahora muestra los números |
| `dea-t1-q03` | **Sinsentido.** La opción A decía "the throughput of one shard per partition"; en Kinesis no existe esa noción de partición | Reescrita como "enough total read capacity for all three applications" |
| `dea-t1-q14` | **Pregunta mal planteada.** Las dos correctas (más shards / modo on-demand) son alternativas mutuamente excluyentes, no dos partes de una solución, y el enunciado las pedía como si se combinaran | El enunciado ahora pide las dos acciones que "would each, on its own, resolve" el problema |
| `dea-t1-q05` | **Respuesta discutible.** El modo on-demand escala al doble del pico de los últimos 30 días, así que un salto instantáneo de 30× lo throttlearía; la correcta no era limpiamente correcta | El enunciado ahora dice que la audiencia crece durante la media hora previa, que es el caso donde on-demand sí responde |
| `dea-t1-q09` | **Afirmación exagerada.** La explicación decía que con MSK Serverless "existing clients work"; en realidad hay que reconfigurarlos para autenticación IAM, que es la única que ofrece | Explicación corregida, y el dato de IAM queda como contenido útil |
| `dea-t5-q06` | **Premisa no declarada.** La explicación daba por sentado que el tráfico era liviano, algo que el enunciado no decía | Ahora lo deriva de la medición: cinco minutos *son* el intervalo de 300 s, así que el hint de tamaño no se está llenando |

Después de las correcciones el verificador sigue en verde y las métricas no se movieron:
**A:14 B:14 C:14 D:13**, 10 pares distintos en las múltiples, la correcta más larga en
17 de 55.

`VERSION_DEL_BANCO` **sigue en 1** a pesar de estas ediciones, y es deliberado: la
revisión se hizo antes de publicar el banco, así que no existe ninguna rendida guardada
contra la versión anterior. Subirlo inventaría un historial que nadie tiene. Desde la
primera rendida, cualquier edición sube el número.

## Lo que NO está verificado

El verificador mide **forma, no verdad**. Una pregunta que pasa el verificador no es
una pregunta verificada. En concreto:

- **Que cada respuesta marcada como correcta sea de verdad la correcta no lo comprueba
  ningún script.** Las 65 pasaron por la revisión de contenido de la sección anterior,
  que encontró siete defectos y los corrigió. Eso sube la confianza; no la vuelve una
  medición. Una segunda lectura encontraría cosas que la primera no vio, y la primera
  ya demostró que hay cosas que ver.
- **Nada se validó contra el examen real.** Ni las preguntas ni el reparto por tema
  salen de ningún material oficial del DEA-C01: el corte en cinco temas es una
  interpretación de la guía del examen, y AWS no publica un peso para la mitad de
  ingesta de su dominio 1.
- **Las explicaciones de las incorrectas afirman cuál es la confusión que las hace
  tentadoras.** Eso es una hipótesis didáctica sobre cómo se equivoca un alumno, no un
  hecho medido.
- **La calibración de la dificultad es un juicio.** El reparto 10 / 55 / 35 % se
  asignó al escribir cada pregunta; nadie rindió el examen para comprobar que los
  escalones se sienten distintos, ni que el 72 % cae donde cae en el examen real.
- **Varios hechos del banco son cifras y comportamientos de servicios que cambian.**
  Cuotas por shard, máximos de buffer, el tope de retención de 365 días, qué
  conectores y destinos existen: estaban así al escribirlo y conviene revisarlos antes
  de subir `version` por otro motivo.
- **Que la traducción al español diga lo mismo que el original no lo comprueba ningún
  script.** El verificador garantiza que las dos listas estén alineadas y que las
  correctas coincidan, que es lo que impide calificar mal. Lo que no puede saber es si
  un enunciado traducido conserva el matiz que hacía discriminar a la pregunta, ni si
  una explicación en español sigue nombrando la misma confusión que la inglesa. El
  control de "sin traducir" detecta una copia textual del original, no una traducción
  mala: una traducción equivocada pasa el verificador sin problema.
- **El criterio de qué términos quedan en inglés es una decisión, no una norma.** Que
  `shard` o `throttling` se dejen como préstamo mientras "clave de partición" se traduzca
  es un juicio sobre cómo se habla, y alguien podría preferir otra línea.
- **Las traducciones de `title` y `description`** tampoco las revisó un hablante nativo
  del inglés.
