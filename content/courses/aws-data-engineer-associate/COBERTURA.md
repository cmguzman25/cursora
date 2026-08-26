# Auditoría de cobertura — DEA-C01

Este documento demuestra que el temario del curso cubre **todo** lo que la guía
oficial declara evaluable, y sirve para volver a auditarlo cuando AWS publique
una revisión de la guía.

Se audita contra tres listas oficiales:

1. Los **17 task statements** y sus **120 skills**.
2. La lista **In-Scope AWS Services** (los servicios que sí entran).
3. La lista **Out-of-Scope AWS Services** (los que no entran, para no perder
   tiempo enseñándolos).

*Fuente: `docs.aws.amazon.com/aws-certification/latest/data-engineer-associate-01/`,
consultada en agosto de 2026.*

---

## 1. Resultado de la auditoría

La primera versión del índice (125 lecciones) cubría los 17 task statements
pero **dejaba fuera 12 servicios de la lista in-scope** y tres conceptos que el
examen pregunta de forma directa. El índice actual (167 lecciones) corrige eso.

### Lecciones agregadas por la auditoría

| Lección nueva | Qué hueco cierra |
|---|---|
| 1.7 Cómputo distribuido y Apache Spark | Skills 1.4.10 y 3.4.5 (skew) y toda la depuración de Glue/EMR dependían de entender particiones, shuffle y ejecutores. Estaba implícito y no se enseñaba. |
| 2.7 Amazon Managed Service for Apache Flink | **Servicio in-scope sin ninguna lección.** Es el motor de procesamiento de streams con ventanas; aparece constantemente como respuesta correcta en preguntas de análisis en tiempo real. |
| 2.10 Integraciones zero-ETL | Skills 1.1.1 y 2.1.5. AWS empuja zero-ETL (Aurora→Redshift, DynamoDB→Redshift, RDS→Redshift) como alternativa a construir un pipeline, y el examen lo pregunta como la opción de "menor esfuerzo operativo". |
| 2.4 Kinesis y Lambda: event source mapping | Skill 1.1.7 es un skill propio. Estaba comprimido dentro de la lección de consumidores; los parámetros del event source mapping (batch size, window, paralelización, bisect on error) se preguntan con detalle. |
| 3.4 Glue streaming ETL y Glue Schema Registry | Skills 1.1.1 (Glue como fuente de streaming) y 2.4.2. El Schema Registry es la respuesta de AWS a la evolución de esquemas en streaming y no estaba en el índice. |
| 3.8 Contenedores: ECS, EKS, ECR y AWS Batch | **Skill 1.2.1 nombra explícitamente EKS y ECS.** Además ECR y AWS Batch son in-scope y no aparecían en ninguna lección. |
| 5.4 Redshift Serverless | Estaba comprimido en la lección de arquitectura. Los RPU y el modelo de cobro se preguntan aparte, y el skill 3.2.5 (provisionado vs. serverless) los usa como caso central. |
| 5.6 Redshift: WLM, concurrency scaling, VACUUM y ANALYZE | El mantenimiento de Redshift es materia de examen (skills 2.1.2, 3.3.4, 3.3.6) y no tenía lección. |
| 5.11 Vectores en Aurora PostgreSQL: pgvector, HNSW e IVF | Skills 2.1.3 y 2.1.8 nombran HNSW e IVF de forma explícita. Es contenido nuevo de la guía y estaba tratado de pasada. |
| 5.13 Amazon OpenSearch Service | **Servicio in-scope** que aparecía solo como mención dentro de otras lecciones, a pesar de estar en tres skills (2.1.1, 3.3.8, 4.4.4). |
| 5.15 Almacenamiento para el cómputo: EBS, EFS e instance store | EBS y EFS son in-scope. Skill 1.4.7 pide montar volúmenes desde Lambda (EFS) y EMR usa EBS por nodo. |
| 6.3 Particiones: sincronización, MSCK REPAIR y partition projection | Skill 2.2.4 es un skill propio. La partition projection es la optimización de costo de Athena que más se pregunta. |
| 6.12 Modelado sobre el data lake: raw, curated y consumo | Skill 2.4.1 pide diseñar esquemas para **Lake Formation**, no solo para Redshift y DynamoDB. Faltaba esa mitad. |
| 6.16 Optimización por servicio: índices, particiones y compresión | Skill 2.4.5 es un skill propio de "best practices" y estaba repartido sin dueño. |
| 7.12 Agregación, medias móviles, agrupación y pivoteo | Skill 3.2.6 nombra estas cuatro operaciones textualmente. No tenía lección. |
| 7.15 Amazon Q y Amazon Kendra | **Dos servicios in-scope** sin ninguna mención en el índice anterior. |
| 8.8 Controlar el gasto: Cost Explorer, Budgets y cost allocation tags | **AWS Budgets y Cost Explorer son in-scope** (categoría Cloud Financial Management) y no aparecían en ninguna lección. |
| 8.11 Consistencia y reconciliación entre origen y destino | Skill 3.4.3. Estaba fusionado con el perfilado de DataBrew y se perdía la parte de reconciliación. |
| 9.4 Políticas de recurso, S3 Access Points y acceso entre cuentas | Skill 4.1.5 nombra S3 Access Points y PrivateLink. El acceso entre cuentas es un escenario recurrente del examen. |
| 9.6 Proteger endpoints de datos: WAF, Shield, CloudFront y Route 53 | **Cuatro servicios in-scope** que no aparecían en ninguna lección. |
| 10.6 AWS CloudTrail Lake | Skill 4.4.3 lo nombra textualmente. Es contenido nuevo de la guía. |
| 10.11 Gobierno con SageMaker Catalog: proyectos y suscripciones | Skill 4.5.6 es un skill propio y estaba fusionado con el marco general de gobierno. |
| 10.14 AWS Well-Architected Tool y la lente de analítica | **Servicio in-scope** que no aparecía. |
| 11.3 Los servicios que se confunden: guía de descarte rápido | No cierra un skill: cierra el modo de fallo real del examen, que es elegir el servicio parecido. |

### Reestructuración de módulos

Los módulos 3 y 4 originales tenían 22 y 26 lecciones: demasiado para un solo
bloque con un solo cuestionario al final. El índice actual reparte los dominios
grandes en dos módulos cada uno, siguiendo la frontera natural de los task
statements. Ningún módulo pasa de 19 lecciones.

---

## 2. Cobertura de los 120 skills

### Dominio 1 — Data Ingestion and Transformation (34 %)

#### Task 1.1: Perform data ingestion

| Skill | Lección |
|---|---|
| 1.1.1 Read data from streaming sources (Kinesis, MSK, DynamoDB Streams, DMS, Glue, Redshift) | 2.2, 2.3, 2.6, 2.7, 2.8, 2.9, 2.10, 3.4 |
| 1.1.2 Read data from batch sources (S3, Glue, EMR, DMS, Redshift, Lambda, AppFlow) | 2.11, 2.12 |
| 1.1.3 Implement appropriate configuration options for batch ingestion | 2.11 |
| 1.1.4 Consume data APIs | 2.12 |
| 1.1.5 Set up schedulers (EventBridge, Apache Airflow, time-based for jobs and crawlers) | 2.14, 4.2 |
| 1.1.6 Set up event triggers (S3 Event Notifications, EventBridge) | 2.14 |
| 1.1.7 Call a Lambda function from Kinesis | 2.4 |
| 1.1.8 Create allowlists for IP addresses | 2.12 |
| 1.1.9 Implement throttling and overcoming rate limits | 2.13 |
| 1.1.10 Manage fan-in and fan-out | 2.3, 2.16 |
| 1.1.11 Describe replayability of data ingestion pipelines | 2.15 |
| 1.1.12 Define stateful and stateless data transactions | 2.16 |

#### Task 1.2: Transform and process data

| Skill | Lección |
|---|---|
| 1.2.1 Optimize container usage (EKS, ECS) | 3.7, 3.8 |
| 1.2.2 Connect to different data sources (JDBC, ODBC) | 3.10 |
| 1.2.3 Integrate data from multiple sources | 3.11 |
| 1.2.4 Optimize costs while processing data | 3.12 |
| 1.2.5 Implement data transformation services (EMR, Glue, Lambda, Redshift) | 3.1 – 3.7 |
| 1.2.6 Transform data between formats | 3.9 |
| 1.2.7 Troubleshoot transformation failures and performance issues | 3.5, 8.5 |
| 1.2.8 Create data APIs | 3.13 |
| 1.2.9 Define volume, velocity, and variety | 3.14 |
| 1.2.10 Integrate large language models (LLMs) | 3.15 |

#### Task 1.3: Orchestrate data pipelines

| Skill | Lección |
|---|---|
| 1.3.1 Use orchestration services (Lambda, EventBridge, MWAA, Step Functions, Glue workflows) | 4.1, 4.2, 4.3 |
| 1.3.2 Build pipelines for performance, availability, scalability, resiliency, fault tolerance | 4.4 |
| 1.3.3 Implement and maintain serverless workflows | 4.1, 4.3 |
| 1.3.4 Use notification services to send alerts (SNS, SQS) | 4.5 |

#### Task 1.4: Apply programming concepts

| Skill | Lección |
|---|---|
| 1.4.1 Optimize code to reduce runtime | 4.7 |
| 1.4.2 Configure Lambda for concurrency and performance | 4.6 |
| 1.4.3 Use programming languages and frameworks | 4.8 |
| 1.4.4 Software engineering best practices (version control, testing, logging, monitoring) | 4.10 |
| 1.4.5 Use IaC to deploy data engineering solutions | 4.11 |
| 1.4.6 Use AWS SAM to package and deploy serverless data pipelines | 4.11 |
| 1.4.7 Use and mount storage volumes from within Lambda | 4.6, 5.15 |
| 1.4.8 Use IaC for repeatable deployment (CloudFormation, CDK) | 4.11 |
| 1.4.9 Describe CI/CD | 4.12 |
| 1.4.10 Define distributed computing | 1.7 |
| 1.4.11 Describe data structures and algorithms (graphs, trees) | 4.9 |

### Dominio 2 — Data Store Management (26 %)

#### Task 2.1: Choose a data store

| Skill | Lección |
|---|---|
| 2.1.1 Appropriate storage services for cost and performance | 5.1 – 5.13 |
| 2.1.2 Configure storage for access patterns | 5.5, 5.6, 5.9 |
| 2.1.3 Apply storage to use cases (HNSW with Aurora PostgreSQL, MemoryDB) | 5.11, 5.12 |
| 2.1.4 Integrate migration tools (Transfer Family) | 5.16 |
| 2.1.5 Migration or remote access (federated queries, materialized views, Spectrum) | 5.7, 2.10 |
| 2.1.6 Manage locks to prevent access to data | 5.8 |
| 2.1.7 Manage open table formats (Apache Iceberg) | 5.14 |
| 2.1.8 Describe vector index types (HNSW, IVF) | 5.11 |

#### Task 2.2: Understand data cataloging systems

| Skill | Lección |
|---|---|
| 2.2.1 Use data catalogs to consume data from the source | 6.1 |
| 2.2.2 Build and reference a technical data catalog (Glue Data Catalog, Hive metastore) | 6.1 |
| 2.2.3 Discover schemas and use Glue crawlers | 6.2 |
| 2.2.4 Synchronize partitions with a data catalog | 6.3 |
| 2.2.5 Create source or target connections for cataloging | 6.4 |
| 2.2.6 Create and manage business data catalogs (SageMaker Catalog) | 6.5 |

#### Task 2.3: Manage the lifecycle of data

| Skill | Lección |
|---|---|
| 2.3.1 Load and unload operations between S3 and Redshift | 6.8 |
| 2.3.2 Manage S3 Lifecycle policies to change storage tier | 6.6 |
| 2.3.3 Expire data by age with S3 Lifecycle policies | 6.6 |
| 2.3.4 Manage S3 versioning and DynamoDB TTL | 6.7 |
| 2.3.5 Delete data to meet business and legal requirements | 6.7 |
| 2.3.6 Protect data with resiliency and availability | 6.9 |

#### Task 2.4: Design data models and schema evolution

| Skill | Lección |
|---|---|
| 2.4.1 Design schemas for Redshift, DynamoDB, and Lake Formation | 6.10, 6.11, 6.12 |
| 2.4.2 Address changes to the characteristics of data | 6.13, 3.4 |
| 2.4.3 Perform schema conversion (SCT, DMS Schema Conversion) | 6.14 |
| 2.4.4 Establish data lineage by using AWS tools | 6.15 |
| 2.4.5 Best practices for indexing, partitioning, compression, optimization | 6.16, 1.5 |
| 2.4.6 Describe vectorization concepts (Bedrock knowledge base) | 6.17 |

### Dominio 3 — Data Operations and Support (22 %)

#### Task 3.1: Automate data processing by using AWS services

| Skill | Lección |
|---|---|
| 3.1.1 Orchestrate data pipelines (MWAA, Step Functions) | 7.1, 7.2 |
| 3.1.2 Troubleshoot Amazon managed workflows | 7.2 |
| 3.1.3 Call SDKs to access Amazon features from code | 7.3 |
| 3.1.4 Use features of AWS services to process data (EMR, Redshift, Glue) | 7.1 |
| 3.1.5 Consume and maintain data APIs | 7.3 |
| 3.1.6 Prepare data for transformation (DataBrew, SageMaker Unified Studio) | 7.7, 7.8 |
| 3.1.7 Query data (Athena) | 7.4, 7.5, 7.6 |
| 3.1.8 Use Lambda to automate data processing | 7.9 |
| 3.1.9 Manage events and schedulers (EventBridge) | 7.9 |

#### Task 3.2: Analyze data by using AWS services

| Skill | Lección |
|---|---|
| 3.2.1 Visualize data (DataBrew, QuickSight) | 7.10 |
| 3.2.2 Verify and clean data (Lambda, Athena, QuickSight, Jupyter, Data Wrangler) | 7.8, 7.13 |
| 3.2.3 Use SQL in Redshift and Athena to query or create views | 7.11 |
| 3.2.4 Use Athena notebooks with Apache Spark | 7.6 |
| 3.2.5 Describe tradeoffs between provisioned and serverless | 7.14 |
| 3.2.6 Define aggregation, rolling average, grouping, pivoting | 7.12 |

#### Task 3.3: Maintain and monitor data pipelines

| Skill | Lección |
|---|---|
| 3.3.1 Extract logs for audits | 8.3 |
| 3.3.2 Deploy logging and monitoring for auditing and traceability | 8.7 |
| 3.3.3 Use notifications during monitoring to send alerts | 8.1 |
| 3.3.4 Troubleshoot performance issues | 8.5, 8.6 |
| 3.3.5 Use CloudTrail to track API calls | 8.2 |
| 3.3.6 Troubleshoot and maintain pipelines (Glue, EMR) | 8.5 |
| 3.3.7 Use CloudWatch Logs to log application data | 8.1 |
| 3.3.8 Analyze logs with AWS services (Athena, EMR, OpenSearch, Logs Insights) | 8.4 |

#### Task 3.4: Ensure data quality

| Skill | Lección |
|---|---|
| 3.4.1 Run data quality checks while processing | 8.9 |
| 3.4.2 Define data quality rules (DataBrew) | 8.10 |
| 3.4.3 Investigate data consistency (DataBrew) | 8.10, 8.11 |
| 3.4.4 Describe data sampling techniques | 8.12 |
| 3.4.5 Implement data skew mechanisms | 8.12, 1.7 |

### Dominio 4 — Data Security and Governance (18 %)

#### Task 4.1: Apply authentication mechanisms

| Skill | Lección |
|---|---|
| 4.1.1 Update VPC security groups | 9.5 |
| 4.1.2 Create and update IAM groups, roles, endpoints, and services | 9.1 |
| 4.1.3 Create and rotate credentials (Secrets Manager) | 9.7 |
| 4.1.4 Set up IAM roles for access (Lambda, API Gateway, CLI, CloudFormation) | 9.2 |
| 4.1.5 Apply IAM policies to roles, endpoints, services (S3 Access Points, PrivateLink) | 9.4, 9.5 |
| 4.1.6 Describe differences between managed and unmanaged services | 9.12 |
| 4.1.7 Use domain, domain units, and projects for SageMaker Unified Studio | 9.13 |

#### Task 4.2: Apply authorization mechanisms

| Skill | Lección |
|---|---|
| 4.2.1 Create custom IAM policies | 9.3 |
| 4.2.2 Store application and database credentials (Secrets Manager, Parameter Store) | 9.8 |
| 4.2.3 Provide database users, groups, roles access in a database (Redshift) | 9.9 |
| 4.2.4 Manage permissions through Lake Formation | 9.10 |
| 4.2.5 Apply authorization methods (role-based, tag-based, attribute-based) | 9.11 |
| 4.2.6 Construct custom policies for least privilege | 9.3 |

#### Task 4.3: Ensure data encryption and masking

| Skill | Lección |
|---|---|
| 4.3.1 Apply data masking and anonymization | 10.4 |
| 4.3.2 Use encryption keys to encrypt or decrypt data (KMS) | 10.1, 10.2 |
| 4.3.3 Configure encryption across AWS account boundaries | 10.3 |
| 4.3.4 Enable encryption in transit or before transit | 10.3 |

#### Task 4.4: Prepare logs for audit

| Skill | Lección |
|---|---|
| 4.4.1 Use CloudTrail to track API calls | 10.5 |
| 4.4.2 Use CloudWatch Logs to store application logs | 10.7 |
| 4.4.3 Use CloudTrail Lake for centralized logging queries | 10.6 |
| 4.4.4 Analyze logs by using AWS services (Athena, Logs Insights, OpenSearch) | 10.7 |
| 4.4.5 Integrate AWS services to perform logging (EMR for large log volumes) | 10.7 |

#### Task 4.5: Understand data privacy and governance

| Skill | Lección |
|---|---|
| 4.5.1 Grant permissions for data sharing (Redshift data sharing) | 10.9 |
| 4.5.2 Implement PII identification (Macie with Lake Formation) | 10.8 |
| 4.5.3 Prevent backups or replications to disallowed Regions | 10.12 |
| 4.5.4 View configuration changes in an account (AWS Config) | 10.13 |
| 4.5.5 Maintain data sovereignty | 10.12 |
| 4.5.6 Manage data access through SageMaker Catalog projects | 10.11 |
| 4.5.7 Describe governance data framework and data sharing patterns | 10.10 |

---

## 3. Cobertura de los servicios in-scope

Todos los servicios de la lista oficial tienen al menos una lección donde se
enseñan (no solo se mencionan).

| Categoría | Servicio | Lección principal |
|---|---|---|
| Analytics | Amazon Athena | 7.4, 7.5, 7.6 |
| Analytics | Amazon EMR | 3.6, 3.7 |
| Analytics | AWS Glue | 3.2, 3.3, 3.4, 3.5, 6.1 |
| Analytics | AWS Glue DataBrew | 7.7, 8.10 |
| Analytics | AWS Lake Formation | 9.10, 6.12 |
| Analytics | Amazon Kinesis Data Firehose | 2.5 |
| Analytics | Amazon Kinesis Data Streams | 2.2, 2.3, 2.4 |
| Analytics | Amazon Managed Service for Apache Flink | 2.7 |
| Analytics | Amazon MSK | 2.6 |
| Analytics | Amazon OpenSearch Service | 5.13 |
| Analytics | Amazon Quick (QuickSight) | 7.10 |
| Analytics / ML | Amazon SageMaker AI | 7.8, 6.15 |
| App Integration | Amazon AppFlow | 2.12 |
| App Integration | Amazon EventBridge | 2.14, 7.9 |
| App Integration | Amazon MWAA | 4.2, 7.2 |
| App Integration | Amazon SNS | 4.5 |
| App Integration | Amazon SQS | 4.5 |
| App Integration | AWS Step Functions | 4.1, 7.2 |
| Cloud Financial | AWS Budgets | 8.8 |
| Cloud Financial | AWS Cost Explorer | 8.8 |
| Compute | AWS Batch | 3.8 |
| Compute | Amazon EC2 | 3.6, 5.15 |
| Compute | AWS Lambda | 4.6, 7.9 |
| Compute | AWS SAM | 4.11 |
| Containers | Amazon ECR | 3.8 |
| Containers | Amazon ECS | 3.8 |
| Containers | Amazon EKS | 3.7, 3.8 |
| Database | Amazon DocumentDB | 5.12 |
| Database | Amazon DynamoDB | 5.9, 6.11 |
| Database | Amazon Keyspaces | 5.12 |
| Database | Amazon MemoryDB for Redis | 5.12 |
| Database | Amazon Neptune | 5.12 |
| Database | Amazon RDS | 5.10 |
| Database | Amazon Aurora | 5.10, 5.11 |
| Database | Amazon Redshift | 5.3 – 5.8, 6.10 |
| Dev Tools | AWS CLI | 7.3 |
| Dev Tools | AWS CloudFormation | 4.11 |
| Dev Tools | AWS CDK | 4.11 |
| Dev Tools | AWS CodeBuild | 4.12 |
| Dev Tools | AWS CodeDeploy | 4.12 |
| Dev Tools | AWS CodePipeline | 4.12 |
| Dev Tools | Amazon Q | 7.15 |
| Web and Mobile | Amazon API Gateway | 3.13, 9.6 |
| ML | Amazon Bedrock | 3.15, 6.17 |
| ML | Amazon Kendra | 7.15 |
| Management | AWS CloudTrail | 8.2, 10.5, 10.6 |
| Management | Amazon CloudWatch | 8.1 |
| Management | Amazon CloudWatch Logs | 8.1, 8.4, 10.7 |
| Management | AWS Config | 10.13 |
| Management | Amazon Managed Grafana | 8.7 |
| Management | AWS Systems Manager | 9.8 |
| Management | AWS Well-Architected Tool | 10.14 |
| Management | AWS Data Exchange | 10.9 |
| Migration | AWS Application Discovery Service | 5.16 |
| Migration | AWS Application Migration Service | 5.16 |
| Migration | AWS DMS | 2.9, 6.14 |
| Migration | AWS DataSync | 5.16 |
| Migration | AWS Snow Family | 5.16 |
| Migration | AWS Transfer Family | 5.16 |
| Networking | Amazon CloudFront | 9.6 |
| Networking | AWS PrivateLink | 9.5 |
| Networking | Amazon Route 53 | 9.6 |
| Networking | Amazon VPC | 9.5 |
| Security | IAM | 9.1, 9.2, 9.3 |
| Security | AWS KMS | 10.1, 10.2 |
| Security | Amazon Macie | 10.8 |
| Security | AWS Secrets Manager | 9.7, 9.8 |
| Security | AWS Shield | 9.6 |
| Security | AWS WAF | 9.6 |
| Storage | AWS Backup | 6.9 |
| Storage | Amazon EBS | 5.15 |
| Storage | Amazon EFS | 5.15, 4.6 |
| Storage | Amazon S3 | 5.2, 6.6, 6.7 |
| Storage | Amazon S3 Tables | 5.14 |
| Storage | Amazon S3 Glacier | 6.6 |

## 4. Servicios out-of-scope: qué NO se enseña

La guía publica una lista de servicios explícitamente fuera de alcance. El curso
no les dedica lecciones. Los que más sorprenden, y que por eso conviene recordar:

- **AWS X-Ray** está fuera de alcance. El trazado distribuido no se pregunta: la
  observabilidad del examen es CloudWatch, CloudTrail y Managed Grafana.
- **Toda la familia AWS IoT** está fuera de alcance (IoT Core, SiteWise,
  FleetWise, Events…). Por eso el escenario de telemetría del curso —RutaSur
  Logística— manda los datos directo a Kinesis, nunca a través de IoT Core.
- **Amazon SES, Amazon Pinpoint y Amazon Connect** están fuera. Las
  notificaciones del examen son SNS y SQS.
- **AWS Amplify, AppSync, Elastic Beanstalk, App Runner, Lightsail y Outposts**
  están fuera.
- **Amazon FinSpace** está fuera, aunque sea un servicio de datos.
- **Amazon DevOps Guru** y **AWS Fault Injection Simulator** están fuera.

Estos nombres pueden aparecer **como distractores**. Reconocer que están fuera de
alcance es en sí una técnica de descarte, y se enseña en la lección 11.3.

## 5. Conocimiento previo que la guía da por supuesto

La guía lista "recommended general IT knowledge" que el examen no enseña pero sí
usa. El curso lo cubre en el módulo 1 y en lecciones sueltas, para que nadie
quede fuera:

| Conocimiento previo declarado por AWS | Lección |
|---|---|
| Setup and maintenance of ETL pipelines from ingestion to destination | 1.1 |
| Application of high-level, language-agnostic programming concepts | 4.8, 4.9 |
| How to use Git commands for source control | 4.10 |
| How to use data lakes to store data | 1.3, 5.2 |
| General concepts for networking, storage, and compute | 1.8, 9.5 |
| General concepts of vectors | 5.11, 6.17 |
| How to structure and run SQL queries on AWS services | 7.11, 7.12 |

## 6. Cómo repetir esta auditoría

1. Volver a leer los cuatro archivos de dominio de la guía oficial y las listas
   de servicios in-scope y out-of-scope.
2. Comparar contra las tablas de las secciones 2 y 3 de este documento.
3. Todo skill o servicio nuevo que no tenga lección se agrega al `README.md`
   primero, después a `manifest.ts`, y por último a este documento.
4. Anotar la fecha de la última auditoría aquí abajo.

**Última auditoría: agosto de 2026.** Guía consultada: DEA-C01, revisión vigente
en esa fecha.
