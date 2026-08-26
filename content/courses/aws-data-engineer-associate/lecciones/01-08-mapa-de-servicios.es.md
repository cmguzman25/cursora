# 1.8 — El mapa de servicios de datos de AWS que entran al examen

> Módulo 1 · Fundamentos · ⏱️ 12 min de lectura

## 🤔 Antes de empezar

- AWS tiene más de doscientos servicios. ¿Qué criterio usarías para decidir cuáles
  necesitas estudiar y cuáles puedes ignorar?
- Cuando dos servicios parecen hacer lo mismo, ¿qué pregunta te ayudaría a
  distinguirlos?
- ¿Por qué crees que un examen incluiría en sus opciones de respuesta servicios
  que no tienen nada que ver con datos?

## 📘 Contenido

Esta lección no explica ningún servicio: los **ubica**. El objetivo es que, al
leer un nombre en una opción de respuesta, sepas de inmediato a qué etapa del
pipeline pertenece y con quién compite. Cada uno tendrá su propia lección más
adelante.

### El criterio: la lista oficial

AWS publica con cada guía de examen dos listas: los servicios **in-scope** (unos
75 para el DEA-C01) y los **out-of-scope**. Ese es el criterio, y es mejor que
cualquier intuición. Un servicio que no está en la lista no se pregunta, aunque un
ingeniero de datos lo use a diario.

Y responde la tercera pregunta de activación: el examen incluye servicios ajenos
a los datos **precisamente porque son descartables**. Reconocer que AWS X-Ray o
IoT Core están fuera de alcance elimina una opción sin analizarla.

### El mapa por etapa del pipeline

Usamos las cuatro etapas de la lección 1.1.

#### 1. Ingesta: sacar los datos de su origen

| Servicio | Para qué |
|---|---|
| **Kinesis Data Streams** | Flujo de eventos con retención y varios consumidores independientes |
| **Kinesis Data Firehose** | Entrega gestionada de un flujo a un destino, sin código |
| **Amazon MSK** | Apache Kafka gestionado, para quien ya usa Kafka o necesita su ecosistema |
| **Managed Service for Apache Flink** | Procesar el flujo con ventanas y estado mientras pasa |
| **AWS DMS** | Migrar bases de datos y capturar sus cambios de forma continua |
| **Amazon AppFlow** | Traer datos de aplicaciones SaaS mediante configuración, sin código |
| **AWS DataSync** | Copiar grandes volúmenes de archivos hacia AWS |
| **AWS Transfer Family** | Recibir archivos por SFTP, FTPS o FTP |
| **AWS Snow Family** | Mover datos cuando la red no alcanza: se transportan físicamente |
| **AWS Data Exchange** | Suscribirse a conjuntos de datos de terceros |

La primera bifurcación mental: **¿el dato llega como flujo continuo o como
archivos?** Si es flujo, estás en la familia Kinesis/MSK/Flink. Si son archivos o
tablas, en DMS/DataSync/Transfer Family/AppFlow.

Dos aclaraciones sobre esta tabla. **Managed Service for Apache Flink no ingiere:
procesa** lo que ya circula por un flujo. Aparece aquí porque en el examen casi
nunca se elige por separado de la familia de streaming, pero su trabajo es
transformación. Y **AWS Data Exchange** se agrupa aquí por función —así es como
entran datos de terceros—, aunque AWS lo clasifique dentro de gobierno y el curso
lo estudie junto a la compartición de datos.

#### 2. Almacenamiento: dónde vive el dato

| Servicio | Modelo | Encaja cuando |
|---|---|---|
| **Amazon S3** | Objetos | Data lake, cualquier formato, coste bajo |
| **Amazon S3 Tables** | Objetos con tablas Iceberg | Lakehouse con transacciones sobre S3 |
| **Amazon S3 Glacier** | Objetos de archivo | Retención larga a coste mínimo |
| **Amazon Redshift** | Almacén columnar | Analítica con SQL, alta concurrencia |
| **Amazon DynamoDB** | Clave-valor y documento | Lecturas y escrituras por clave a gran escala |
| **Amazon RDS / Aurora** | Relacional | Cargas transaccionales, origen de pipelines |
| **Amazon MemoryDB** | Clave-valor en memoria | Acceso de latencia muy baja |
| **Amazon DocumentDB** | Documentos | Datos JSON con consultas ricas |
| **Amazon Keyspaces** | Columnas anchas (Cassandra) | Cargas tipo Cassandra gestionadas |
| **Amazon Neptune** | Grafos | Relaciones entre entidades, recorridos |
| **Amazon OpenSearch Service** | Índice de búsqueda | Búsqueda de texto y análisis de logs |
| **Amazon EBS / EFS** | Bloques / archivos | Discos para EC2 y EMR, sistemas de archivos compartidos |
| **AWS Backup** | Copias | Política central de copias y retención |

La pregunta que ordena esta tabla: **¿cómo se va a leer el dato?** Por clave
(DynamoDB), escaneando y agregando (Redshift, S3), buscando texto (OpenSearch) o
recorriendo relaciones (Neptune).

#### 3. Transformación: convertir el dato en algo utilizable

| Servicio | Naturaleza |
|---|---|
| **AWS Glue** | ETL serverless sobre Spark, con catálogo integrado |
| **Amazon EMR** | Clústeres de Spark, Hive y otros motores, con control total |
| **AWS Lambda** | Funciones para transformaciones cortas y por evento |
| **Amazon Redshift** | Transformación con SQL dentro del propio almacén |
| **AWS Glue DataBrew** | Preparación visual de datos, sin escribir código |
| **AWS Batch** | Ejecutar trabajos por lotes en contenedores |
| **Amazon ECS / EKS / ECR** | Contenedores propios para cargas de procesamiento |
| **Amazon Bedrock** | Modelos de lenguaje aplicados al dato: clasificar, extraer, resumir |

Aquí la bifurcación es **cuánto control necesitas y cuánto quieres operar**. Glue
es gestionado y arranca solo; EMR da control sobre versiones, motores y tipos de
instancia a cambio de administrarlo.

#### 4. Servicio: poner el dato a disposición

| Servicio | Para qué |
|---|---|
| **Amazon Athena** | Consultar S3 con SQL sin infraestructura |
| **Amazon Redshift** | Consultas de alta concurrencia sobre datos cargados |
| **Amazon QuickSight** | Paneles y visualización |
| **Amazon API Gateway** | Exponer datos como API a otras aplicaciones |
| **Amazon SageMaker AI** | Preparar datos y catálogo para ciencia de datos |
| **Amazon Kendra** | Búsqueda inteligente sobre documentos |
| **Amazon Q** | Asistencia conversacional sobre datos y desarrollo |

### Lo que atraviesa todas las etapas

**Orquestación y eventos.** **Step Functions** para flujos con pasos, ramas y
reintentos; **Amazon MWAA** (Airflow gestionado) cuando el equipo ya trabaja con
DAGs de Airflow; **EventBridge** para disparar por evento o por horario; **SNS** y
**SQS** para avisar y desacoplar.

**Catálogo y gobierno.** El **AWS Glue Data Catalog** es el registro central de
qué tablas existen y con qué esquema —lo usan Athena, EMR, Redshift Spectrum—.
**AWS Lake Formation** añade permisos finos sobre esas tablas, hasta nivel de
columna y fila. **SageMaker Catalog** aporta la capa de negocio.

**Observabilidad.** **CloudWatch** para métricas, logs y alarmas; **CloudTrail**
para el registro de llamadas a la API; **Amazon Managed Grafana** para paneles
operativos.

**Seguridad.** **IAM** para identidades y permisos; **KMS** para claves de
cifrado; **Secrets Manager** para credenciales rotables; **Macie** para descubrir
datos personales; **VPC** y **PrivateLink** para que el tráfico no salga a
internet; **WAF**, **Shield**, **CloudFront** y **Route 53** para proteger y
publicar endpoints.

**Despliegue.** **CloudFormation**, **AWS CDK** y **AWS SAM** para definir la
infraestructura como código; **CodePipeline**, **CodeBuild** y **CodeDeploy** para
automatizar el despliegue; **AWS CLI** y los SDK para operar desde código.

**Costo.** **Cost Explorer** y **AWS Budgets** para ver y limitar el gasto de la
plataforma. **AWS Config** registra cambios de configuración, y el **Well-
Architected Tool** revisa la arquitectura contra las buenas prácticas.

### Lo que NO entra, y por qué conviene saberlo

Reconocer estos nombres como fuera de alcance es una técnica de descarte:

- **AWS X-Ray**: el trazado distribuido no se evalúa.
- **Toda la familia AWS IoT**: IoT Core, SiteWise, FleetWise y las demás. En el
  examen los dispositivos escriben directo a Kinesis o MSK.
- **Amazon SES, Pinpoint y Connect**: las notificaciones del examen son SNS y SQS.
- **AWS Amplify, AppSync, Elastic Beanstalk, App Runner, Lightsail, Outposts**.
- **Amazon FinSpace**, aunque sea un servicio de datos financieros.
- **Amazon DevOps Guru** y **AWS Fault Injection Simulator**.

### Las cuatro preguntas que ubican cualquier servicio

Cuando no recuerdes qué hace un servicio, estas preguntas suelen bastar para
situarlo frente a su competidor:

1. **¿En qué etapa del pipeline actúa?** Ingesta, almacenamiento, transformación o
   servicio.
2. **¿Es serverless o hay que administrar capacidad?** Athena y Glue frente a
   Redshift provisionado y EMR. Esto decide las preguntas de *least operational
   overhead*.
3. **¿Retiene los datos o solo los pasa?** Distingue Kinesis Data Streams de
   Firehose, y explica por qué solo uno permite reprocesar.
4. **¿Cómo se accede al dato?** Por clave, por escaneo, por búsqueda o por
   relaciones. Ordena toda la familia de almacenes.

**En resumen:** la lista oficial in-scope define qué estudiar, y la out-of-scope
regala descartes. Los servicios se ordenan por etapa del pipeline —ingesta,
almacenamiento, transformación y servicio— con orquestación, catálogo,
observabilidad, seguridad y despliegue atravesándolas todas. Ante un nombre
desconocido, sitúalo con las cuatro preguntas antes de intentar recordarlo.

## 🔍 Cómo lo pregunta el examen

> Una empresa necesita analizar en tiempo real los datos de temperatura que envían
> miles de sensores industriales y generar una alerta cuando la media de los
> últimos cinco minutos supere un umbral. ¿Qué combinación de servicios cumple el
> requisito?

Las pistas son **tiempo real**, **media de los últimos cinco minutos** y **generar
una alerta**. Traducido al mapa: ingesta de flujo, procesamiento con estado por
ventana, y notificación.

Aquí es donde el descarte por alcance ahorra tiempo. Los sensores industriales
invitan a buscar **AWS IoT Core** o **IoT SiteWise** entre las opciones, y suelen
estar: son distractores, porque están fuera de alcance. En el examen los
dispositivos escriben directo a un flujo.

"Media de los últimos cinco minutos" descarta además las opciones que solo
ingieren y almacenan: una ventana deslizante necesita un motor con estado, no una
entrega a S3. Y "tiempo real" descarta un job programado.

La respuesta correcta combinará ingesta de flujo, un motor de procesamiento con
ventanas y un servicio de notificación. Fíjate en que la pregunta no se resuelve
sabiendo configurar nada: se resuelve ubicando cada pieza en su etapa.

## 💬 Ahora te toca a ti

**Pregunta:** AWS tiene más de doscientos servicios. ¿Qué criterio usarías para
decidir cuáles necesitas estudiar y cuáles puedes ignorar?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** La lista oficial de servicios in-scope que AWS publica con
la guía de examen, unos 75 para el DEA-C01. Es un criterio objetivo y mejor que la
intuición, porque hay servicios muy usados en ingeniería de datos que quedan fuera
y otros aparentemente ajenos que entran. La lista complementaria de servicios
out-of-scope es igual de útil: convierte varios nombres en descartes automáticos
cuando aparecen entre las opciones.

**Pregunta:** Cuando dos servicios parecen hacer lo mismo, ¿qué pregunta te
ayudaría a distinguirlos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Suelen bastar dos. "¿Cuánto hay que administrar?" separa lo
serverless de lo provisionado, y es lo que decide las preguntas de menor esfuerzo
operativo: Glue frente a EMR, Athena frente a Redshift provisionado. Y "¿retiene
los datos o solo los pasa?", que separa Kinesis Data Streams de Firehose y explica
cuál permite reprocesar. Para los almacenes, la pregunta que ordena todo es cómo
se accede al dato: por clave, escaneando, buscando texto o recorriendo relaciones.

**Pregunta:** ¿Por qué crees que un examen incluiría en sus opciones de respuesta
servicios que no tienen nada que ver con datos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque son distractores diseñados para quien reconoce
nombres sin entender funciones. Un escenario de sensores industriales tienta a
elegir un servicio de IoT, y un escenario de rendimiento tienta a elegir X-Ray,
pero ambos están fuera de alcance. Saber qué **no** entra convierte esas opciones
en descartes inmediatos y libera tiempo para las opciones que sí compiten de
verdad.

## ⚠️ No lo confundas con

- **Kinesis Data Streams vs. Firehose:** Streams retiene los datos y tú escribes el
  consumidor; Firehose los entrega a destinos soportados y no puedes releerlos.
- **Glue Data Catalog vs. Lake Formation:** el catálogo registra qué tablas hay y
  con qué esquema; Lake Formation decide quién puede ver qué dentro de ellas.
- **Athena vs. Redshift:** Athena consulta S3 sin infraestructura y cobra por
  escaneo; Redshift almacena los datos y brilla con muchos usuarios concurrentes.
- **Glue vs. EMR:** los dos ejecutan Spark. Glue es gestionado y arranca solo; EMR
  da control sobre motores, versiones e instancias a cambio de administrarlo.
- **Step Functions vs. MWAA:** Step Functions es una máquina de estados nativa y
  serverless; MWAA es Apache Airflow gestionado, con DAGs en Python.
- **CloudWatch vs. CloudTrail:** CloudWatch mide qué está pasando; CloudTrail
  registra quién llamó a qué API.

## 🎯 Pistas para el examen

- **Ubica antes de recordar.** Ante un nombre dudoso, sitúalo en una etapa del
  pipeline: eso ya descarta opciones sin necesidad de conocer el detalle.
- **Los servicios fuera de alcance son descartes gratis.** Aprender esa lista corta
  rinde más por minuto que casi cualquier otra cosa.
- **Un escenario de sensores o dispositivos no lleva a IoT en este examen.**
  Es el distractor temático más repetido.
- **"Menor esfuerzo operativo" reordena el mapa entero**: dentro de cada etapa,
  quédate con la opción serverless salvo que el enunciado pida control explícito
  sobre versiones o configuración del motor.
