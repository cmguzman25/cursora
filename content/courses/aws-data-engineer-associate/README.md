# AWS Certified Data Engineer – Associate (DEA-C01)

Curso completo para preparar el examen **DEA-C01**, la certificación de
ingeniería de datos de AWS. Cubre los cuatro dominios oficiales, sus 17 task
statements y los 120 skills de la guía de examen vigente, más los 75 servicios
de la lista *In-Scope AWS Services*.

Este archivo es el **índice vivo**: se marca `[x]` cada lección a medida que se
desarrolla. Cómo se escribe cada lección está en `CONTRATO-DE-CLASES.md` y **no
se improvisa**. La demostración de que el temario cubre todo lo evaluable está
en `COBERTURA.md`, con la trazabilidad skill por skill.

## Ficha del examen

| | |
|---|---|
| Código | DEA-C01 |
| Nombre oficial | AWS Certified Data Engineer – Associate |
| Preguntas | 65 (50 puntuables + 15 no puntuables, sin identificar cuáles) |
| Tipo de preguntas | Opción múltiple (1 de 4) y respuesta múltiple (2 o más de 5 o más) |
| Duración | 130 minutos |
| Puntaje para aprobar | 720 / 1000 (escala 100–1000) |
| Modelo de puntuación | Compensatorio: se aprueba por el total, no dominio por dominio |
| Costo | 150 USD |
| Modalidad | Centro Pearson VUE o examen online supervisado |
| Vigencia del certificado | 3 años |
| Prerrequisitos | Ninguno obligatorio |
| Perfil recomendado | 2–3 años de experiencia en ingeniería de datos y 1–2 años con AWS |
| Idiomas | **Inglés, japonés, coreano y chino simplificado** |

> **El examen no está disponible en español.** El curso está escrito en español
> para que entiendas los conceptos, pero todo el vocabulario técnico se mantiene
> en inglés a propósito: es el que vas a leer el día del examen. Los nombres de
> los task statements se citan textualmente en inglés en la cabecera de cada
> lección.

**Fuera de alcance del examen** (la guía lo dice explícitamente): entrenar
modelos de machine learning y hacer inferencias, conocer la sintaxis específica
de un lenguaje de programación, y sacar conclusiones de negocio a partir de los
datos.

## Dominios y peso en el examen

| Dominio | Peso | Task statements | Módulos del curso |
|---|---|---|---|
| 1. Data Ingestion and Transformation | 34 % | 4 | 2, 3, 4 |
| 2. Data Store Management | 26 % | 4 | 5, 6 |
| 3. Data Operations and Support | 22 % | 4 | 7, 8 |
| 4. Data Security and Governance | 18 % | 5 | 9, 10 |

El dominio 1 vale más de un tercio del examen él solo, así que ocupa tres
módulos. Ningún módulo pasa de 19 lecciones: los dominios grandes se parten por
la frontera natural de sus task statements, para que cada cuestionario de cierre
evalúe un bloque coherente.

*Fuente: guía oficial de examen de AWS
(`docs.aws.amazon.com/aws-certification/latest/data-engineer-associate-01/`),
consultada en agosto de 2026, incluyendo las listas de servicios in-scope y
out-of-scope. AWS revisa estas guías periódicamente y publica los cambios al
menos un mes antes de que lleguen al examen — el procedimiento para repetir la
auditoría está en `COBERTURA.md`.*

## Nombres que cambiaron

Varios servicios del temario se renombraron después de que se escribiera la guía
de examen. El curso los nombra **como los llama la guía**, con el nombre actual
entre paréntesis la primera vez que aparecen en cada lección.

| Guía de examen | Nombre actual |
|---|---|
| Amazon Kinesis Data Firehose | Amazon Data Firehose |
| Amazon QuickSight (la guía lo lista como "Amazon Quick") | Amazon Quick Suite |
| Amazon DataZone | Amazon SageMaker Catalog |
| Amazon SageMaker (clásico) | Amazon SageMaker AI |
| Amazon Kinesis Data Analytics | Amazon Managed Service for Apache Flink |

## Cómo está pensado el curso

1. **Es un curso de examen, no un taller.** No hay laboratorios, ni pasos de
   consola, ni recursos que crear y borrar. No necesitas una cuenta de AWS para
   seguirlo. Sí hay parámetros, límites y fragmentos de código o SQL, porque el
   examen los pregunta.
2. **Clases de 10 a 15 minutos de lectura.** Ninguna pasa de 2.500 palabras. Los
   servicios grandes —Kinesis, Redshift, Glue, Athena, Lake Formation— se
   reparten en varias lecciones en vez de comprimirse en una sola.
3. **Redacción seria y ejemplos reales.** Los conceptos técnicos se mantienen
   con su nombre en inglés. Los ejemplos son sistemas que existen en empresas de
   verdad, no analogías domésticas. Cuatro escenarios se repiten a lo largo del
   curso para que los ejemplos se acumulen: **Andes Retail** (supermercados,
   batch y almacén de datos), **Corriente Pagos** (pagos en tiempo real, datos
   regulados), **RutaSur Logística** (telemetría de flota) y **Mediateca**
   (clickstream de una plataforma de video).
4. **Un módulo de fundamentos antes de los dominios.** El examen asume 2–3 años
   de experiencia en datos. El módulo 1 nivela ese piso: formatos columnares,
   particionado, OLTP frente a OLAP, y cómo funciona Apache Spark por dentro.
   Sin eso, ni el dominio 2 ni las preguntas de diagnóstico se entienden.
5. **Cada módulo cierra igual:** una lección ★ de tablas comparativas —el examen
   pregunta constantemente "¿cuándo X en vez de Y?"— y una lección interactiva
   de análisis de preguntas, con una cantidad proporcional al peso del dominio.
6. **Trazabilidad total.** Cada lección declara en su cabecera el task statement
   oficial que cubre. `COBERTURA.md` mapea los 120 skills y los 75 servicios
   in-scope a sus lecciones, y también documenta qué **no** se enseña porque AWS
   lo declaró fuera de alcance.

---

## Módulo 0 — Preparación y mapa del examen

> 4 lecciones · sin dominio asignado

- [x] 0.1 Qué evalúa el DEA-C01 y qué queda fuera de alcance (`lecciones/00-01-que-evalua-el-dea-c01.es.md`)
- [x] 0.2 Cómo son las preguntas: escenarios, palabras clave y descarte de opciones (`lecciones/00-02-como-son-las-preguntas.es.md`)
- [x] 0.3 Plan de estudio y cómo usar este curso (`lecciones/00-03-plan-de-estudio.es.md`)
- [x] 0.4 Inscripción, día del examen y recertificación (`lecciones/00-04-inscripcion-y-dia-del-examen.es.md`)

## Módulo 1 — Fundamentos de ingeniería de datos

> 10 lecciones · base común · el examen la da por sabida y no la enseña

- [x] 1.1 Qué hace un ingeniero de datos y qué es un pipeline de datos (`lecciones/01-01-que-hace-un-ingeniero-de-datos.es.md`)
- [x] 1.2 Batch, micro-batch y streaming: latencia, volumen y costo (`lecciones/01-02-batch-vs-streaming.es.md`)
- [x] 1.3 OLTP, OLAP, data lake, data warehouse y lakehouse (`lecciones/01-03-oltp-olap-lake-warehouse.es.md`)
- [x] 1.4 Formatos de archivo: CSV, JSON, Avro, Parquet y ORC (`lecciones/01-04-formatos-de-archivo.es.md`)
- [x] 1.5 Particionado, compresión y tamaño de archivo: las tres palancas de costo (`lecciones/01-05-particionado-y-compresion.es.md`)
- [x] 1.6 Esquemas: schema-on-read, schema-on-write y evolución (`lecciones/01-06-esquemas-y-evolucion.es.md`)
- [x] 1.7 Cómputo distribuido y Apache Spark: particiones, shuffle, DAG y ejecutores (`lecciones/01-07-computo-distribuido-y-spark.es.md`)
- [x] 1.8 El mapa de servicios de datos de AWS que entran al examen (`lecciones/01-08-mapa-de-servicios.es.md`)
- [x] ★ 1.9 Tablas comparativas: formatos, latencias y tipos de almacén (`lecciones/01-09-comparativas-fundamentos.es.md`)
- [x] 1.10 Analiza preguntas de examen: fundamentos — 15 preguntas (`preguntas/modulo-1.ts` — lección interactiva)

## Módulo 2 — Dominio 1 · Ingesta de datos

> 18 lecciones · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion

- [x] 2.1 Panorama de la ingesta: fuentes, destinos y las decisiones que pregunta el examen (`lecciones/02-01-panorama-de-la-ingesta.es.md`)
- [x] 2.2 Kinesis Data Streams: shards, capacidad, retención y resharding (`lecciones/02-02-kinesis-data-streams.es.md`)
- [x] 2.3 Kinesis: productores (KPL, Agent, SDK) y consumidores (KCL, enhanced fan-out) (`lecciones/02-03-kinesis-productores-y-consumidores.es.md`)
- [x] 2.4 Kinesis y Lambda: event source mapping, lotes, paralelismo y errores (`lecciones/02-04-kinesis-y-lambda.es.md`)
- [x] 2.5 Kinesis Data Firehose: buffering, dynamic partitioning y conversión de formato (`lecciones/02-05-kinesis-data-firehose.es.md`)
- [x] 2.6 Amazon MSK: Kafka gestionado, MSK Serverless y MSK Connect (`lecciones/02-06-amazon-msk.es.md`)
- [x] 2.7 Amazon Managed Service for Apache Flink: ventanas y procesamiento de streams (`lecciones/02-07-managed-flink.es.md`)
- [x] 2.8 Change data capture con DynamoDB Streams y Kinesis Data Streams for DynamoDB (`lecciones/02-08-cdc-con-dynamodb-streams.es.md`)
- [x] 2.9 AWS DMS: full load, CDC y validación de la migración (`lecciones/02-09-aws-dms.es.md`)
- [x] 2.10 Integraciones zero-ETL: cuando el pipeline desaparece (`lecciones/02-10-zero-etl.es.md`)
- [x] 2.11 Ingesta por lotes: S3, Glue, EMR, Redshift COPY y Lambda (`lecciones/02-11-ingesta-por-lotes.es.md`)
- [x] 2.12 Amazon AppFlow, consumo de APIs de datos y allowlists de IP (`lecciones/02-12-appflow-y-apis.es.md`)
- [x] 2.13 Throttling, límites de tasa y reintentos (Kinesis, DynamoDB, RDS) (`lecciones/02-13-throttling-y-limites.es.md`)
- [x] 2.14 Programadores y disparadores: EventBridge Scheduler, S3 Event Notifications y Pipes (`lecciones/02-14-programadores-y-disparadores.es.md`)
- [x] 2.15 Replayability y semántica de entrega: at-least-once, exactly-once e idempotencia (`lecciones/02-15-replayability-y-entrega.es.md`)
- [x] 2.16 Fan-in, fan-out y transacciones stateful frente a stateless (`lecciones/02-16-fan-out-y-transacciones.es.md`)
- [x] ★ 2.17 Tablas comparativas: Data Streams vs. Firehose vs. MSK vs. Flink vs. DMS vs. AppFlow (`lecciones/02-17-comparativas-ingesta.es.md`)
- [x] 2.18 Analiza preguntas de examen: ingesta — 16 preguntas (`preguntas/modulo-2.ts` — lección interactiva)

## Módulo 3 — Dominio 1 · Transformación y procesamiento

> 17 lecciones · Dominio 1 (34 %) · Task 1.2 — Transform and process data

- [ ] 3.1 Cómo se elige el motor de transformación: Glue, EMR, Lambda o Redshift (`lecciones/03-01-elegir-el-motor-de-transformacion.es.md`)
- [ ] 3.2 AWS Glue ETL: jobs, DPU, tipos de worker y versiones (`lecciones/03-02-aws-glue-etl.es.md`)
- [ ] 3.3 Glue: DynamicFrames, job bookmarks y transformaciones habituales (`lecciones/03-03-glue-dynamicframes-y-bookmarks.es.md`)
- [ ] 3.4 Glue streaming ETL y AWS Glue Schema Registry (`lecciones/03-04-glue-streaming-y-schema-registry.es.md`)
- [ ] 3.5 Depurar y optimizar jobs de Glue: fallos comunes y métricas (`lecciones/03-05-depurar-glue.es.md`)
- [ ] 3.6 Amazon EMR: clústeres, tipos de nodo, EMRFS e instancias Spot (`lecciones/03-06-amazon-emr.es.md`)
- [ ] 3.7 EMR Serverless y EMR on EKS (`lecciones/03-07-emr-serverless-y-eks.es.md`)
- [ ] 3.8 Contenedores para procesamiento de datos: ECS, EKS, ECR y AWS Batch (`lecciones/03-08-contenedores-para-datos.es.md`)
- [ ] 3.9 Transformar entre formatos: de CSV a Parquet y por qué importa (`lecciones/03-09-conversion-de-formatos.es.md`)
- [ ] 3.10 Conectar fuentes heterogéneas: JDBC, ODBC y conexiones de Glue en VPC (`lecciones/03-10-conectar-fuentes-jdbc-odbc.es.md`)
- [ ] 3.11 Integrar datos de varias fuentes: joins, deduplicación y datos que llegan tarde (`lecciones/03-11-integrar-varias-fuentes.es.md`)
- [ ] 3.12 Optimizar el costo del procesamiento de datos (`lecciones/03-12-optimizar-costos-de-procesamiento.es.md`)
- [ ] 3.13 Exponer datos como API: API Gateway, Redshift Data API y Athena API (`lecciones/03-13-exponer-datos-como-api.es.md`)
- [ ] 3.14 Volumen, velocidad y variedad: estructurados, semiestructurados y no estructurados (`lecciones/03-14-volumen-velocidad-variedad.es.md`)
- [ ] 3.15 Integrar LLMs en el procesamiento de datos: Amazon Bedrock (`lecciones/03-15-llms-para-procesar-datos.es.md`)
- [ ] ★ 3.16 Tablas comparativas: motores de transformación (`lecciones/03-16-comparativas-transformacion.es.md`)
- [ ] 3.17 Analiza preguntas de examen: transformación — 12 preguntas (`preguntas/modulo-3.ts` — lección interactiva)

## Módulo 4 — Dominio 1 · Orquestación y programación

> 14 lecciones · Dominio 1 (34 %) · Tasks 1.3 y 1.4

- [ ] 4.1 AWS Step Functions: máquinas de estado, Map, reintentos y manejo de errores (`lecciones/04-01-step-functions.es.md`)
- [ ] 4.2 Amazon MWAA: Airflow gestionado, DAGs y cuándo conviene (`lecciones/04-02-mwaa.es.md`)
- [ ] 4.3 Glue workflows y orquestación ligera con Lambda y EventBridge (`lecciones/04-03-glue-workflows-y-orquestacion-ligera.es.md`)
- [ ] 4.4 Pipelines resilientes: reintentos, DLQ, idempotencia y tolerancia a fallos (`lecciones/04-04-pipelines-resilientes.es.md`)
- [ ] 4.5 Notificaciones y alertas con Amazon SNS y Amazon SQS (`lecciones/04-05-notificaciones-sns-y-sqs.es.md`)
- [ ] 4.6 AWS Lambda para datos: memoria, timeout, concurrencia y almacenamiento (`lecciones/04-06-lambda-para-datos.es.md`)
- [ ] 4.7 Optimizar código para reducir el tiempo de ejecución (`lecciones/04-07-optimizar-codigo.es.md`)
- [ ] 4.8 Lenguajes y frameworks: Python, PySpark, SQL, Scala y scripting (`lecciones/04-08-lenguajes-y-frameworks.es.md`)
- [ ] 4.9 Estructuras de datos y algoritmos que aparecen en el examen (`lecciones/04-09-estructuras-y-algoritmos.es.md`)
- [ ] 4.10 Buenas prácticas: control de versiones con Git, pruebas y logging (`lecciones/04-10-buenas-practicas.es.md`)
- [ ] 4.11 Infraestructura como código: CloudFormation, CDK y SAM (`lecciones/04-11-iac-para-datos.es.md`)
- [ ] 4.12 CI/CD de pipelines de datos: CodePipeline, CodeBuild y CodeDeploy (`lecciones/04-12-ci-cd-de-pipelines.es.md`)
- [ ] ★ 4.13 Tablas comparativas: orquestadores y despliegue (`lecciones/04-13-comparativas-orquestacion.es.md`)
- [ ] 4.14 Analiza preguntas de examen: orquestación y programación — 10 preguntas (`preguntas/modulo-4.ts` — lección interactiva)

## Módulo 5 — Dominio 2 · Elegir y configurar el almacén

> 18 lecciones · Dominio 2 (26 %) · Task 2.1 — Choose a data store

- [ ] 5.1 Cómo elegir el almacén de datos: el árbol de decisión del examen (`lecciones/05-01-como-elegir-el-almacen.es.md`)
- [ ] 5.2 Amazon S3 como data lake: clases, rendimiento, prefijos y Storage Lens (`lecciones/05-02-s3-como-data-lake.es.md`)
- [ ] 5.3 Amazon Redshift: arquitectura, nodos, slices y RA3 (`lecciones/05-03-redshift-arquitectura.es.md`)
- [ ] 5.4 Redshift Serverless: RPU, escalado y cuándo conviene (`lecciones/05-04-redshift-serverless.es.md`)
- [ ] 5.5 Redshift: distribution styles, sort keys y compresión (`lecciones/05-05-redshift-distribucion-y-ordenamiento.es.md`)
- [ ] 5.6 Redshift: WLM, concurrency scaling, VACUUM y ANALYZE (`lecciones/05-06-redshift-mantenimiento.es.md`)
- [ ] 5.7 Redshift Spectrum, consultas federadas y vistas materializadas (`lecciones/05-07-redshift-spectrum-y-federacion.es.md`)
- [ ] 5.8 Bloqueos y concurrencia en Redshift y RDS (`lecciones/05-08-bloqueos-y-concurrencia.es.md`)
- [ ] 5.9 Amazon DynamoDB: claves, índices LSI y GSI, capacidad y export a S3 (`lecciones/05-09-dynamodb.es.md`)
- [ ] 5.10 Amazon RDS y Aurora en pipelines de datos (`lecciones/05-10-rds-y-aurora.es.md`)
- [ ] 5.11 Vectores en Aurora PostgreSQL: pgvector, HNSW e IVF (`lecciones/05-11-vectores-en-aurora.es.md`)
- [ ] 5.12 Almacenes especializados: MemoryDB, DocumentDB, Keyspaces y Neptune (`lecciones/05-12-almacenes-especializados.es.md`)
- [ ] 5.13 Amazon OpenSearch Service: índices, ingestion pipelines y casos de uso (`lecciones/05-13-opensearch-service.es.md`)
- [ ] 5.14 Formatos de tabla abiertos: Apache Iceberg, S3 Tables, Hudi y Delta Lake (`lecciones/05-14-formatos-de-tabla-abiertos.es.md`)
- [ ] 5.15 Almacenamiento para el cómputo: EBS, EFS e instance store (`lecciones/05-15-almacenamiento-para-computo.es.md`)
- [ ] 5.16 Migración y transferencia: Transfer Family, DataSync, Snow Family y los servicios de migración (`lecciones/05-16-migracion-y-transferencia.es.md`)
- [ ] ★ 5.17 Tablas comparativas: almacenes de datos uno junto a otro (`lecciones/05-17-comparativas-almacenes.es.md`)
- [ ] 5.18 Analiza preguntas de examen: almacenes de datos — 14 preguntas (`preguntas/modulo-5.ts` — lección interactiva)

## Módulo 6 — Dominio 2 · Catálogo, ciclo de vida y modelado

> 19 lecciones · Dominio 2 (26 %) · Tasks 2.2, 2.3 y 2.4

- [ ] 6.1 AWS Glue Data Catalog y el Hive metastore (`lecciones/06-01-glue-data-catalog.es.md`)
- [ ] 6.2 Crawlers de Glue: descubrimiento de esquemas y clasificadores (`lecciones/06-02-crawlers-de-glue.es.md`)
- [ ] 6.3 Particiones en el catálogo: sincronización, MSCK REPAIR y partition projection (`lecciones/06-03-particiones-en-el-catalogo.es.md`)
- [ ] 6.4 Conexiones de origen y destino para catalogar (`lecciones/06-04-conexiones-para-catalogar.es.md`)
- [ ] 6.5 Catálogos de negocio: Amazon SageMaker Catalog y el glosario de datos (`lecciones/06-05-catalogos-de-negocio.es.md`)
- [ ] 6.6 Ciclo de vida en S3: transiciones entre clases, Glacier y expiración (`lecciones/06-06-ciclo-de-vida-en-s3.es.md`)
- [ ] 6.7 Versionado de S3, TTL de DynamoDB y borrado por requisito legal (`lecciones/06-07-versionado-ttl-y-borrado.es.md`)
- [ ] 6.8 Mover datos entre S3 y Redshift: COPY y UNLOAD (`lecciones/06-08-copy-y-unload.es.md`)
- [ ] 6.9 Resiliencia y disponibilidad: replicación, AWS Backup, PITR, RTO y RPO (`lecciones/06-09-resiliencia-y-backup.es.md`)
- [ ] 6.10 Modelado dimensional para Redshift: estrella, copo de nieve y tablas de hechos (`lecciones/06-10-modelado-para-redshift.es.md`)
- [ ] 6.11 Modelado para DynamoDB: patrones de acceso primero y single-table design (`lecciones/06-11-modelado-para-dynamodb.es.md`)
- [ ] 6.12 Modelado sobre el data lake: zonas raw, curated y de consumo (`lecciones/06-12-modelado-del-data-lake.es.md`)
- [ ] 6.13 Evolución de esquemas y cambios en las características de los datos (`lecciones/06-13-evolucion-de-esquemas.es.md`)
- [ ] 6.14 Conversión de esquemas: AWS SCT y DMS Schema Conversion (`lecciones/06-14-conversion-de-esquemas.es.md`)
- [ ] 6.15 Linaje de datos con herramientas de AWS (`lecciones/06-15-linaje-de-datos.es.md`)
- [ ] 6.16 Optimización por servicio: índices, particiones y compresión en S3, Redshift y DynamoDB (`lecciones/06-16-optimizacion-por-servicio.es.md`)
- [ ] 6.17 Vectorización y knowledge bases de Amazon Bedrock (`lecciones/06-17-vectorizacion-y-bedrock.es.md`)
- [ ] ★ 6.18 Tablas comparativas: catálogo, ciclo de vida y modelado (`lecciones/06-18-comparativas-catalogo-y-modelado.es.md`)
- [ ] 6.19 Analiza preguntas de examen: catálogo y modelado — 14 preguntas (`preguntas/modulo-6.ts` — lección interactiva)

## Módulo 7 — Dominio 3 · Automatización y análisis

> 17 lecciones · Dominio 3 (22 %) · Tasks 3.1 y 3.2

- [ ] 7.1 Panorama de la automatización del procesamiento de datos (`lecciones/07-01-panorama-de-la-automatizacion.es.md`)
- [ ] 7.2 Operar Step Functions y MWAA: fallos, reintentos y diagnóstico (`lecciones/07-02-operar-step-functions-y-mwaa.es.md`)
- [ ] 7.3 SDK, AWS CLI y APIs de datos desde código (`lecciones/07-03-sdk-cli-y-apis-de-datos.es.md`)
- [ ] 7.4 Amazon Athena: motor, particiones y costo por consulta (`lecciones/07-04-athena-fundamentos.es.md`)
- [ ] 7.5 Athena: workgroups, CTAS, vistas, UNLOAD y control de costos (`lecciones/07-05-athena-workgroups-y-ctas.es.md`)
- [ ] 7.6 Athena: consultas federadas y notebooks con Apache Spark (`lecciones/07-06-athena-federacion-y-notebooks.es.md`)
- [ ] 7.7 Preparar datos sin escribir código: AWS Glue DataBrew (`lecciones/07-07-glue-databrew.es.md`)
- [ ] 7.8 SageMaker Unified Studio y SageMaker Data Wrangler (`lecciones/07-08-unified-studio-y-data-wrangler.es.md`)
- [ ] 7.9 Lambda y EventBridge en operación: reglas, programaciones y Pipes (`lecciones/07-09-lambda-y-eventbridge.es.md`)
- [ ] 7.10 Visualización con Amazon QuickSight: SPICE, datasets y permisos (`lecciones/07-10-quicksight.es.md`)
- [ ] 7.11 SQL analítico en Redshift y Athena: vistas, CTE y funciones de ventana (`lecciones/07-11-sql-analitico.es.md`)
- [ ] 7.12 Agregación, medias móviles, agrupación y pivoteo (`lecciones/07-12-agregacion-y-pivoteo.es.md`)
- [ ] 7.13 Verificar y limpiar datos antes de publicarlos (`lecciones/07-13-verificar-y-limpiar-datos.es.md`)
- [ ] 7.14 Provisionado frente a serverless: el compromiso que más se pregunta (`lecciones/07-14-provisionado-vs-serverless.es.md`)
- [ ] 7.15 Amazon Q y Amazon Kendra: asistencia y búsqueda sobre los datos (`lecciones/07-15-amazon-q-y-kendra.es.md`)
- [ ] ★ 7.16 Tablas comparativas: consulta, preparación y visualización (`lecciones/07-16-comparativas-analisis.es.md`)
- [ ] 7.17 Analiza preguntas de examen: automatización y análisis — 13 preguntas (`preguntas/modulo-7.ts` — lección interactiva)

## Módulo 8 — Dominio 3 · Monitoreo, costos y calidad

> 14 lecciones · Dominio 3 (22 %) · Tasks 3.3 y 3.4

- [ ] 8.1 Amazon CloudWatch para pipelines: métricas, logs y alarmas (`lecciones/08-01-cloudwatch-para-pipelines.es.md`)
- [ ] 8.2 AWS CloudTrail y el seguimiento de llamadas a la API (`lecciones/08-02-cloudtrail.es.md`)
- [ ] 8.3 Extraer y centralizar logs para auditoría (`lecciones/08-03-centralizar-logs.es.md`)
- [ ] 8.4 Analizar logs: CloudWatch Logs Insights, Athena, OpenSearch y EMR (`lecciones/08-04-analizar-logs.es.md`)
- [ ] 8.5 Diagnóstico de rendimiento en Glue y EMR (`lecciones/08-05-rendimiento-glue-y-emr.es.md`)
- [ ] 8.6 Diagnóstico de rendimiento en Redshift y Athena (`lecciones/08-06-rendimiento-redshift-y-athena.es.md`)
- [ ] 8.7 Observabilidad de punta a punta y Amazon Managed Grafana (`lecciones/08-07-observabilidad-y-grafana.es.md`)
- [ ] 8.8 Controlar el gasto: Cost Explorer, AWS Budgets y cost allocation tags (`lecciones/08-08-controlar-el-gasto.es.md`)
- [ ] 8.9 Calidad de datos con AWS Glue Data Quality y DQDL (`lecciones/08-09-glue-data-quality.es.md`)
- [ ] 8.10 Definir reglas de calidad y perfilar datos con DataBrew (`lecciones/08-10-reglas-de-calidad-y-perfilado.es.md`)
- [ ] 8.11 Consistencia de datos y reconciliación entre origen y destino (`lecciones/08-11-consistencia-y-reconciliacion.es.md`)
- [ ] 8.12 Muestreo de datos y data skew: qué son y cómo se corrigen (`lecciones/08-12-muestreo-y-skew.es.md`)
- [ ] ★ 8.13 Tablas comparativas: monitoreo, logs y calidad (`lecciones/08-13-comparativas-monitoreo.es.md`)
- [ ] 8.14 Analiza preguntas de examen: monitoreo y calidad — 11 preguntas (`preguntas/modulo-8.ts` — lección interactiva)

## Módulo 9 — Dominio 4 · Autenticación y autorización

> 15 lecciones · Dominio 4 (18 %) · Tasks 4.1 y 4.2

- [ ] 9.1 IAM para ingeniería de datos: usuarios, grupos, roles y políticas (`lecciones/09-01-iam-para-datos.es.md`)
- [ ] 9.2 Roles de servicio y relaciones de confianza: cómo Glue, EMR y Redshift acceden a los datos (`lecciones/09-02-roles-de-servicio.es.md`)
- [ ] 9.3 Políticas IAM personalizadas y el principio de menor privilegio (`lecciones/09-03-politicas-y-menor-privilegio.es.md`)
- [ ] 9.4 Políticas de recurso: bucket policies, S3 Access Points y acceso entre cuentas (`lecciones/09-04-politicas-de-recurso.es.md`)
- [ ] 9.5 Acceso privado a la red: security groups, VPC endpoints y PrivateLink (`lecciones/09-05-red-y-acceso-privado.es.md`)
- [ ] 9.6 Proteger endpoints de datos: API Gateway, AWS WAF, Shield, CloudFront y Route 53 (`lecciones/09-06-proteger-endpoints.es.md`)
- [ ] 9.7 AWS Secrets Manager y la rotación de credenciales (`lecciones/09-07-secrets-manager.es.md`)
- [ ] 9.8 Secrets Manager frente a Systems Manager Parameter Store (`lecciones/09-08-secrets-vs-parameter-store.es.md`)
- [ ] 9.9 Permisos dentro de Amazon Redshift: usuarios, grupos y roles de base de datos (`lecciones/09-09-permisos-en-redshift.es.md`)
- [ ] 9.10 AWS Lake Formation: permisos de tabla, columna, fila y celda (`lecciones/09-10-lake-formation.es.md`)
- [ ] 9.11 Autorización basada en roles, en etiquetas y en atributos (RBAC, TBAC, ABAC) (`lecciones/09-11-rbac-tbac-abac.es.md`)
- [ ] 9.12 Servicios gestionados frente a no gestionados y la responsabilidad compartida (`lecciones/09-12-gestionados-vs-no-gestionados.es.md`)
- [ ] 9.13 SageMaker Unified Studio: domains, domain units y projects (`lecciones/09-13-unified-studio-domains.es.md`)
- [ ] ★ 9.14 Tablas comparativas: identidad, permisos y acceso (`lecciones/09-14-comparativas-identidad.es.md`)
- [ ] 9.15 Analiza preguntas de examen: autenticación y autorización — 10 preguntas (`preguntas/modulo-9.ts` — lección interactiva)

## Módulo 10 — Dominio 4 · Cifrado, auditoría y gobierno

> 16 lecciones · Dominio 4 (18 %) · Tasks 4.3, 4.4 y 4.5

- [ ] 10.1 AWS KMS: tipos de clave, políticas y envelope encryption (`lecciones/10-01-kms.es.md`)
- [ ] 10.2 Cifrado en reposo servicio por servicio: S3, Redshift, DynamoDB, EMR y Glue (`lecciones/10-02-cifrado-en-reposo.es.md`)
- [ ] 10.3 Cifrado en tránsito y cifrado entre cuentas y regiones (`lecciones/10-03-cifrado-en-transito-y-entre-cuentas.es.md`)
- [ ] 10.4 Enmascaramiento y anonimización: Redshift dynamic data masking y detección de PII en Glue (`lecciones/10-04-enmascaramiento.es.md`)
- [ ] 10.5 CloudTrail para auditoría: trails, data events y trails de organización (`lecciones/10-05-cloudtrail-para-auditoria.es.md`)
- [ ] 10.6 AWS CloudTrail Lake: consultas centralizadas de auditoría (`lecciones/10-06-cloudtrail-lake.es.md`)
- [ ] 10.7 Logs de auditoría a escala: CloudWatch Logs, Athena, OpenSearch y EMR (`lecciones/10-07-logs-de-auditoria-a-escala.es.md`)
- [ ] 10.8 Identificación de PII con Amazon Macie y Lake Formation (`lecciones/10-08-identificacion-de-pii.es.md`)
- [ ] 10.9 Compartir datos: Redshift data sharing y AWS Data Exchange (`lecciones/10-09-compartir-datos.es.md`)
- [ ] 10.10 Patrones de compartición y marcos de gobierno de datos (`lecciones/10-10-gobierno-y-patrones.es.md`)
- [ ] 10.11 Gobierno con SageMaker Catalog: proyectos y suscripciones a datos (`lecciones/10-11-gobierno-con-sagemaker-catalog.es.md`)
- [ ] 10.12 Residencia y soberanía: impedir réplicas a regiones no permitidas (`lecciones/10-12-residencia-y-soberania.es.md`)
- [ ] 10.13 AWS Config y el seguimiento de cambios de configuración (`lecciones/10-13-aws-config.es.md`)
- [ ] 10.14 AWS Well-Architected Tool y la lente de analítica de datos (`lecciones/10-14-well-architected-tool.es.md`)
- [ ] ★ 10.15 Tablas comparativas: cifrado, auditoría y gobierno (`lecciones/10-15-comparativas-seguridad.es.md`)
- [ ] 10.16 Analiza preguntas de examen: cifrado y gobierno — 10 preguntas (`preguntas/modulo-10.ts` — lección interactiva)

## Módulo 11 — Repaso final y simulacro

> 5 lecciones · todos los dominios

- [ ] 11.1 Repaso relámpago por dominio: los datos que más se preguntan (`lecciones/11-01-repaso-por-dominio.es.md`)
- [ ] 11.2 Las trampas del DEA-C01: los errores de concepto que más puntos cuestan (`lecciones/11-02-trampas-del-examen.es.md`)
- [ ] 11.3 Los servicios que se confunden: guía de descarte rápido (`lecciones/11-03-guia-de-descarte.es.md`)
- [ ] 11.4 Simulacro completo: 65 preguntas en 130 minutos (`preguntas/simulacro.ts` — lección interactiva)
- [ ] 11.5 Estrategia del día del examen, gestión del tiempo y qué hacer si no apruebas (`lecciones/11-05-estrategia-del-dia.es.md`)

---

## Trazabilidad: task statements oficiales → módulos

La trazabilidad completa, skill por skill (120 skills) y servicio por servicio
(75 servicios in-scope), está en `COBERTURA.md`. Este es el resumen:

| Task statement (nombre oficial) | Dominio | Módulo · lecciones |
|---|---|---|
| 1.1 Perform data ingestion | 1 (34 %) | M2 · 2.1 – 2.17 |
| 1.2 Transform and process data | 1 (34 %) | M3 · 3.1 – 3.16 |
| 1.3 Orchestrate data pipelines | 1 (34 %) | M4 · 4.1 – 4.5 |
| 1.4 Apply programming concepts | 1 (34 %) | M4 · 4.6 – 4.13 |
| 2.1 Choose a data store | 2 (26 %) | M5 · 5.1 – 5.17 |
| 2.2 Understand data cataloging systems | 2 (26 %) | M6 · 6.1 – 6.5 |
| 2.3 Manage the lifecycle of data | 2 (26 %) | M6 · 6.6 – 6.9 |
| 2.4 Design data models and schema evolution | 2 (26 %) | M6 · 6.10 – 6.18 |
| 3.1 Automate data processing by using AWS services | 3 (22 %) | M7 · 7.1 – 7.9 |
| 3.2 Analyze data by using AWS services | 3 (22 %) | M7 · 7.10 – 7.16 |
| 3.3 Maintain and monitor data pipelines | 3 (22 %) | M8 · 8.1 – 8.8 |
| 3.4 Ensure data quality | 3 (22 %) | M8 · 8.9 – 8.13 |
| 4.1 Apply authentication mechanisms | 4 (18 %) | M9 · 9.1 – 9.2, 9.5 – 9.7, 9.12 – 9.13 |
| 4.2 Apply authorization mechanisms | 4 (18 %) | M9 · 9.3 – 9.4, 9.8 – 9.11 |
| 4.3 Ensure data encryption and masking | 4 (18 %) | M10 · 10.1 – 10.4 |
| 4.4 Prepare logs for audit | 4 (18 %) | M10 · 10.5 – 10.7 |
| 4.5 Understand data privacy and governance | 4 (18 %) | M10 · 10.8 – 10.15 |

Los módulos 0, 1 y 11 no cubren task statements: son preparación, nivelación y
repaso.

## Banco de preguntas

Las lecciones interactivas no tienen archivo Markdown. Su `id` en `manifest.ts`
es el de la primera columna, y su banco de preguntas se registra en
`preguntas/index.ts`.

| Lección | `id` en el manifest | Preguntas | Archivo |
|---|---|---|---|
| 1.10 Fundamentos | `01-10-analisis-preguntas-modulo-1` | 15 | `preguntas/modulo-1.ts` |
| 2.18 Ingesta | `02-18-analisis-preguntas-modulo-2` | 16 | `preguntas/modulo-2.ts` |
| 3.17 Transformación | `03-17-analisis-preguntas-modulo-3` | 12 | `preguntas/modulo-3.ts` |
| 4.14 Orquestación y programación | `04-14-analisis-preguntas-modulo-4` | 10 | `preguntas/modulo-4.ts` |
| 5.18 Almacenes de datos | `05-18-analisis-preguntas-modulo-5` | 14 | `preguntas/modulo-5.ts` |
| 6.19 Catálogo y modelado | `06-19-analisis-preguntas-modulo-6` | 14 | `preguntas/modulo-6.ts` |
| 7.17 Automatización y análisis | `07-17-analisis-preguntas-modulo-7` | 13 | `preguntas/modulo-7.ts` |
| 8.14 Monitoreo y calidad | `08-14-analisis-preguntas-modulo-8` | 11 | `preguntas/modulo-8.ts` |
| 9.15 Autenticación y autorización | `09-15-analisis-preguntas-modulo-9` | 10 | `preguntas/modulo-9.ts` |
| 10.16 Cifrado y gobierno | `10-16-analisis-preguntas-modulo-10` | 10 | `preguntas/modulo-10.ts` |
| 11.4 Simulacro completo | `11-04-simulacro-completo` | 65 | `preguntas/simulacro.ts` |
| **Total** | | **190** | |

Las 110 preguntas de los módulos de dominio respetan el peso oficial: 38 del
dominio 1 (34,5 %), 28 del dominio 2 (25,5 %), 24 del dominio 3 (21,8 %) y 20
del dominio 4 (18,2 %). Las 65 del simulacro son nuevas: no se reciclan.

## Progreso

**32 / 167 lecciones desarrolladas.**

| Módulo | Lecciones | Hechas |
|---|---|---|
| 0 · Preparación | 4 | **4** |
| 1 · Fundamentos | 10 | **10** |
| 2 · D1 Ingesta | 18 | **18** |
| 3 · D1 Transformación | 17 | 0 |
| 4 · D1 Orquestación y programación | 14 | 0 |
| 5 · D2 Elegir el almacén | 18 | 0 |
| 6 · D2 Catálogo, ciclo de vida y modelado | 19 | 0 |
| 7 · D3 Automatización y análisis | 17 | 0 |
| 8 · D3 Monitoreo, costos y calidad | 14 | 0 |
| 9 · D4 Autenticación y autorización | 15 | 0 |
| 10 · D4 Cifrado, auditoría y gobierno | 16 | 0 |
| 11 · Repaso y simulacro | 5 | 0 |

## Integración con la app

- [x] `manifest.ts` del curso (generado a partir de este índice).
- [x] Curso registrado en `content/courses/registry.ts` y en el catálogo
      (`src/lib/courses.ts`).
- [x] `preguntas/index.ts` creado y registrado (vacío hasta que se escriba el
      primer banco).
- [ ] **Pendiente en la app:** el componente `ExamQuiz` no cronometra ni reporta
      puntaje por dominio. La lección 11.4 lo necesita para funcionar como
      simulacro real. Hasta entonces puede publicarse advirtiendo que el lector
      se cronometre por su cuenta.

Las lecciones que todavía no tienen archivo Markdown se muestran en la app con
el aviso de "no disponible todavía", igual que en los otros cursos: registrar
todo el índice en `manifest.ts` desde el principio no rompe nada.

**Al agregar, renombrar o reordenar una lección:** se cambia primero aquí (este
archivo es el índice legible), después en `manifest.ts` —que es por donde la app
navega— y por último en `COBERTURA.md`, para que la auditoría siga siendo
válida. El `id` de cada lección en el manifest es el nombre del archivo sin
`.es.md`.
