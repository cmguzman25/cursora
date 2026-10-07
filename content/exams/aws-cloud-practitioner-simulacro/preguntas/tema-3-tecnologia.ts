import type { ExamQuestionWithTopic } from "../../types";

/**
 * Dominio 3 — Tecnología y servicios en la nube. 22 de las 65 preguntas del
 * simulacro (33,8 %, contra el 34 % oficial). Es el dominio más extenso y el
 * que más servicios sueltos hay que reconocer, así que las preguntas están
 * repartidas por subtema en vez de concentradas en cómputo y almacenamiento:
 * 3.1 formas de desplegar, 3.2 infraestructura global, 3.3 cómputo, 3.4 bases
 * de datos, 3.5 red, 3.6 almacenamiento, 3.7 IA/ML y analítica, y 3.8
 * integración, desarrollo y cómputo para el usuario final.
 */
export const TEMA_3_TECNOLOGIA: ExamQuestionWithTopic[] = [
  {
    id: "sim-d3-q01",
    topic: "3",
    prompt:
      "Un equipo crea su infraestructura a mano desde la consola y cada entorno termina ligeramente distinto. Quiere describir la infraestructura en archivos de texto versionados, para poder recrear un entorno idéntico cuando haga falta. ¿Qué enfoque corresponde?",
    options: [
      {
        id: "A",
        text: "Infraestructura como código, con AWS CloudFormation",
        correct: true,
        explanation:
          "Correcta. La infraestructura como código describe los recursos en plantillas que se guardan en un repositorio, así que el mismo archivo produce siempre el mismo entorno y los cambios quedan registrados. CloudFormation es el servicio de AWS para esto.",
      },
      {
        id: "B",
        text: "Usar la AWS CLI en vez de la consola",
        correct: false,
        explanation:
          "La CLI automatiza comandos, lo cual ayuda, pero sigue siendo una secuencia de acciones y no una descripción del estado deseado. Si un comando falla a mitad de camino, el entorno queda a medias y nada declara cómo debería haber quedado.",
      },
      {
        id: "C",
        text: "Documentar en un manual los pasos a seguir en la consola",
        correct: false,
        explanation:
          "Un manual depende de que la persona lo siga sin equivocarse, que es justamente el problema que el escenario describe. La documentación no es reproducible por una máquina.",
      },
      {
        id: "D",
        text: "Crear una imagen de máquina y clonarla a mano",
        correct: false,
        explanation:
          "Una imagen captura el contenido de una instancia, no la arquitectura completa: ni las redes, ni los permisos, ni las bases de datos. Y clonar a mano reintroduce el error humano.",
      },
    ],
    tips: [
      "Las palabras **reproducible, versionado, idéntico, plantilla** apuntan a infraestructura como código.",
      "Distinguí **declarativo** de **imperativo**: CloudFormation describe cómo debe quedar; la CLI ejecuta pasos. El examen premia lo declarativo cuando se pide reproducibilidad.",
    ],
  },
  {
    id: "sim-d3-q02",
    topic: "3",
    prompt:
      "Una empresa tiene que mantener parte de su sistema en su propio centro de datos por una exigencia regulatoria, pero quiere correr el resto en AWS y que las dos partes trabajen juntas. ¿Qué modelo de despliegue describe esta situación?",
    options: [
      {
        id: "A",
        text: "Despliegue íntegramente en la nube",
        correct: false,
        explanation:
          "Un despliegue íntegramente en la nube implica que todos los componentes corren en AWS. El escenario dice explícitamente que una parte tiene que quedarse en el centro de datos propio.",
      },
      {
        id: "B",
        text: "Despliegue híbrido",
        correct: true,
        explanation:
          "Correcta. Un despliegue híbrido combina recursos en la nube con recursos en las instalaciones propias, conectados entre sí. Es el modelo que aparece cuando hay una restricción regulatoria, un sistema heredado que no se puede mover o una migración por etapas.",
      },
      {
        id: "C",
        text: "Despliegue en las instalaciones propias",
        correct: false,
        explanation:
          "Este modelo es tener todo en el centro de datos propio, sin nube. La empresa quiere correr parte en AWS, así que no es el caso.",
      },
      {
        id: "D",
        text: "Despliegue multinube",
        correct: false,
        explanation:
          "Multinube es usar más de un proveedor de nube, por ejemplo AWS y otro. Acá el segundo entorno no es otra nube: es el centro de datos de la propia empresa.",
      },
    ],
    tips: [
      "**Nube + instalaciones propias trabajando juntas** ⇒ híbrido. **Dos proveedores de nube** ⇒ multinube. Son dos cosas distintas y el examen las ofrece juntas.",
      "Una exigencia regulatoria que obliga a dejar datos en un lugar concreto casi siempre está señalando un escenario híbrido.",
    ],
  },
  {
    id: "sim-d3-q03",
    topic: "3",
    prompt:
      "Una aplicación corre en una sola instancia EC2 dentro de una única Zona de disponibilidad. El equipo quiere que siga funcionando si esa zona tiene un problema. ¿Cuál es la forma correcta de lograrlo?",
    options: [
      {
        id: "A",
        text: "Usar un tipo de instancia más grande",
        correct: false,
        explanation:
          "Una instancia más grande aguanta más carga, pero sigue siendo una sola instancia en una sola zona. Si la zona falla, la aplicación cae igual. Esto es escalado vertical, no disponibilidad.",
      },
      {
        id: "B",
        text: "Hacer copias de seguridad más frecuentes de la instancia",
        correct: false,
        explanation:
          "Los respaldos permiten recuperar datos después de un incidente, pero no evitan la interrupción: habría que restaurar, y eso lleva tiempo. Respaldo y disponibilidad resuelven problemas distintos.",
      },
      {
        id: "C",
        text: "Desplegar instancias en varias Zonas de disponibilidad detrás de un balanceador de carga",
        correct: true,
        explanation:
          "Correcta. Las Zonas de disponibilidad son instalaciones físicamente separadas dentro de una Región, con energía y red independientes. Repartir las instancias en más de una y poner un balanceador adelante es la receta estándar de alta disponibilidad en AWS.",
      },
      {
        id: "D",
        text: "Mover la instancia a una Región más cercana a los usuarios",
        correct: false,
        explanation:
          "Cambiar de Región puede mejorar la latencia, pero una instancia sola en una zona de otra Región tiene exactamente el mismo punto único de falla.",
      },
    ],
    tips: [
      "La regla más repetida del dominio: **alta disponibilidad = repartir en varias Zonas de disponibilidad.**",
      "No mezcles los tres conceptos: **respaldo** recupera datos, **escalado** absorbe carga, **multizona** sobrevive a una falla.",
    ],
  },
  {
    id: "sim-d3-q04",
    topic: "3",
    prompt:
      "Una empresa europea tiene que garantizar que los datos personales de sus clientes no salgan del territorio de la Unión Europea. ¿Qué decisión de la infraestructura global de AWS le corresponde tomar?",
    options: [
      {
        id: "A",
        text: "Habilitar más Zonas de disponibilidad dentro de su Región actual",
        correct: false,
        explanation:
          "Las Zonas de disponibilidad están todas dentro de la misma Región, así que agregarlas mejora la disponibilidad pero no cambia en qué país están los datos.",
      },
      {
        id: "B",
        text: "Usar ubicaciones de borde para acercar el contenido a los usuarios",
        correct: false,
        explanation:
          "Las ubicaciones de borde guardan copias en caché para reducir la latencia, y están repartidas por todo el mundo. Para un requisito de residencia de datos, distribuir copias globalmente es lo contrario de lo que se necesita.",
      },
      {
        id: "C",
        text: "Contratar el plan de soporte Enterprise para obtener asesoría sobre cumplimiento",
        correct: false,
        explanation:
          "El plan de soporte da acceso a asesoría y mejores tiempos de respuesta, pero no determina dónde se almacenan los datos. Es una decisión de arquitectura, no de soporte.",
      },
      {
        id: "D",
        text: "Elegir una Región de AWS ubicada en la Unión Europea",
        correct: true,
        explanation:
          "Correcta. La Región es la unidad geográfica que determina dónde residen físicamente los datos, y AWS no los mueve de Región sin que el cliente lo pida. Elegir la Región es, de hecho, uno de los criterios principales junto con la latencia, el precio y qué servicios están disponibles.",
      },
    ],
    tips: [
      "**Residencia de datos, soberanía, una normativa que fija un territorio** ⇒ elegir la Región. Es lo primero que define dónde viven los datos.",
      "Recordá la jerarquía: Región (geografía) contiene Zonas de disponibilidad (edificios separados), y las ubicaciones de borde son una red aparte para contenido en caché.",
    ],
  },
  {
    id: "sim-d3-q05",
    topic: "3",
    multiple: true,
    prompt:
      "Una empresa pone Amazon CloudFront delante de su sitio web. ¿Cuáles DOS beneficios obtiene? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Menor latencia para los usuarios alejados del origen",
        correct: true,
        explanation:
          "Correcta. CloudFront guarda copias del contenido en ubicaciones de borde repartidas por el mundo, así que el usuario lo recibe desde un punto cercano en vez de cruzar el planeta hasta el servidor de origen.",
      },
      {
        id: "B",
        text: "Menos carga sobre los servidores de origen",
        correct: true,
        explanation:
          "Correcta. Cada respuesta servida desde la caché del borde es una solicitud que el origen no atiende, así que el mismo servidor soporta mucho más tráfico. Es un efecto buscado además de la latencia.",
      },
      {
        id: "C",
        text: "Cifrado automático de la base de datos de la aplicación",
        correct: false,
        explanation:
          "CloudFront distribuye contenido; no toca la base de datos. El cifrado de una base se configura en el servicio correspondiente, con claves de KMS.",
      },
      {
        id: "D",
        text: "Respaldos automáticos del contenido del sitio",
        correct: false,
        explanation:
          "Una caché no es un respaldo: guarda copias temporales para servirlas rápido y las descarta cuando expiran. Si el origen pierde los datos, CloudFront no los recupera.",
      },
      {
        id: "E",
        text: "Eliminación de la necesidad de un servidor de origen",
        correct: false,
        explanation:
          "CloudFront siempre necesita un origen del cual obtener el contenido la primera vez y cuando la caché expira. Puede ser un bucket de S3 o un balanceador, pero no desaparece.",
      },
    ],
    tips: [
      "Una red de distribución de contenido da dos cosas a la vez: **más cerca del usuario** y **menos trabajo para el origen**. Si una pregunta pide dos beneficios, suelen ser esos.",
      "Cuidado con confundir **caché** con **respaldo**. La caché es temporal y descartable por diseño.",
    ],
  },
  {
    id: "sim-d3-q06",
    topic: "3",
    prompt:
      "Cada vez que se sube una imagen a un bucket de S3, hay que generar automáticamente una miniatura. El proceso tarda unos dos segundos y ocurre de forma irregular, unas pocas veces por hora. El equipo no quiere administrar servidores. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "AWS Lambda",
        correct: true,
        explanation:
          "Correcta. Lambda ejecuta código en respuesta a un evento —acá, la subida del objeto a S3—, cobra solo por el tiempo de ejecución y no requiere administrar ningún servidor. Una tarea corta, esporádica y disparada por un evento es el caso de uso exacto.",
      },
      {
        id: "B",
        text: "Amazon EC2 con Auto Scaling",
        correct: false,
        explanation:
          "Funcionaría, pero habría que administrar el sistema operativo y pagar instancias encendidas esperando trabajo que llega pocas veces por hora. El enunciado dice explícitamente que no quieren administrar servidores.",
      },
      {
        id: "C",
        text: "Amazon ECS sobre instancias EC2",
        correct: false,
        explanation:
          "ECS orquesta contenedores, y sobre EC2 el cliente sigue administrando las instancias subyacentes. Para una función de dos segundos es mucha infraestructura para muy poco trabajo.",
      },
      {
        id: "D",
        text: "AWS Batch",
        correct: false,
        explanation:
          "Batch está pensado para procesar grandes volúmenes de trabajos por lotes, con colas y prioridades. Es desproporcionado para generar una miniatura cada tanto.",
      },
    ],
    tips: [
      "La firma de Lambda: **disparado por un evento**, **corto** (menos de 15 minutos) y **sin administrar servidores**. Si las tres aparecen, es Lambda.",
      "Cuando el enunciado dice *no queremos administrar servidores*, descartá todo lo que incluya EC2, incluso con escalado automático.",
    ],
  },
  {
    id: "sim-d3-q07",
    topic: "3",
    prompt:
      "Una aplicación web en EC2 tiene picos de tráfico impredecibles. El equipo quiere que la cantidad de instancias suba y baje sola, y que el tráfico se reparta entre las que estén sanas. ¿Qué combinación de servicios lo logra?",
    options: [
      {
        id: "A",
        text: "Amazon CloudFront y AWS WAF",
        correct: false,
        explanation:
          "CloudFront distribuye contenido en caché y WAF filtra solicitudes maliciosas. Ninguno de los dos agrega instancias ni reparte tráfico entre ellas según su estado de salud.",
      },
      {
        id: "B",
        text: "Amazon EC2 Auto Scaling y Elastic Load Balancing",
        correct: true,
        explanation:
          "Correcta. Auto Scaling ajusta la cantidad de instancias según la demanda, y el balanceador de carga distribuye las solicitudes entre las instancias disponibles, verificando su estado de salud y dejando de enviar tráfico a las que fallan. Es la pareja estándar para esto.",
      },
      {
        id: "C",
        text: "AWS Lambda y Amazon API Gateway",
        correct: false,
        explanation:
          "Es una arquitectura serverless válida y escala sola, pero implicaría reescribir la aplicación. El enunciado parte de una aplicación que ya corre en EC2 y pide resolver el escalado, no migrar de modelo.",
      },
      {
        id: "D",
        text: "Amazon Route 53 y Amazon CloudWatch",
        correct: false,
        explanation:
          "Route 53 resuelve nombres de dominio y CloudWatch monitorea. CloudWatch puede disparar el escalado, pero por sí solos no agregan instancias ni balancean tráfico: son las piezas de alrededor, no la solución.",
      },
    ],
    tips: [
      "Auto Scaling y balanceador son **complementarios, no alternativos**: uno cambia la cantidad, el otro reparte el tráfico. Las preguntas suelen pedir los dos.",
      "Si el enunciado menciona **instancias sanas** o **verificación de estado**, está hablando del balanceador de carga.",
    ],
  },
  {
    id: "sim-d3-q08",
    topic: "3",
    prompt:
      "Un equipo ya empaquetó su aplicación en contenedores Docker. Quiere orquestarlos en AWS sin tener que aprovisionar ni parchear las instancias que los ejecutan. ¿Qué opción cumple con eso?",
    options: [
      {
        id: "A",
        text: "Amazon EC2 con Docker instalado manualmente",
        correct: false,
        explanation:
          "Esto deja toda la administración del lado del cliente: aprovisionar instancias, parchearlas y orquestar los contenedores a mano. Es lo contrario de lo que pide el enunciado.",
      },
      {
        id: "B",
        text: "AWS Elastic Beanstalk sobre instancias EC2",
        correct: false,
        explanation:
          "Beanstalk simplifica el despliegue, pero las instancias EC2 subyacentes siguen existiendo y siendo visibles para el cliente, que mantiene responsabilidad sobre ellas.",
      },
      {
        id: "C",
        text: "AWS Fargate",
        correct: true,
        explanation:
          "Correcta. Fargate ejecuta contenedores sin servidores que administrar: AWS aprovisiona y parchea la capacidad subyacente y el cliente solo define el contenedor y sus recursos. Es la respuesta cuando se juntan *contenedores* y *sin administrar servidores*.",
      },
      {
        id: "D",
        text: "Amazon S3",
        correct: false,
        explanation:
          "S3 es almacenamiento de objetos. Puede guardar artefactos, pero no ejecuta contenedores ni ningún tipo de cómputo.",
      },
    ],
    tips: [
      "**Contenedores + sin administrar servidores** ⇒ Fargate. **Contenedores con control de las instancias** ⇒ ECS o EKS sobre EC2.",
      "ECS y EKS son los orquestadores; Fargate es el modo de ejecución sin servidores. Pueden aparecer juntos, y no son alternativas excluyentes.",
    ],
  },
  {
    id: "sim-d3-q09",
    topic: "3",
    prompt:
      "Una aplicación de juegos móviles necesita guardar el perfil de cada jugador, con campos que varían entre jugadores, y leerlo en pocos milisegundos para millones de usuarios simultáneos. ¿Qué base de datos corresponde?",
    options: [
      {
        id: "A",
        text: "Amazon RDS con MySQL",
        correct: false,
        explanation:
          "RDS es relacional y exige un esquema fijo de columnas, así que campos que varían entre registros no encajan bien. Y escalar la escritura a millones de usuarios simultáneos es justamente la limitación de las bases relacionales.",
      },
      {
        id: "B",
        text: "Amazon Redshift",
        correct: false,
        explanation:
          "Redshift es un almacén de datos para analizar grandes volúmenes con consultas complejas. Está optimizado para informes, no para leer un perfil individual en milisegundos.",
      },
      {
        id: "C",
        text: "Amazon ElastiCache",
        correct: false,
        explanation:
          "ElastiCache es una caché en memoria y sí responde en microsegundos, pero es un acelerador que acompaña a una base de datos, no el almacén principal: los datos en caché son volátiles.",
      },
      {
        id: "D",
        text: "Amazon DynamoDB",
        correct: true,
        explanation:
          "Correcta. DynamoDB es una base no relacional, serverless, con esquema flexible y respuesta en milisegundos de un dígito a cualquier escala. Perfiles de jugadores con campos variables y millones de usuarios es su caso de uso de manual.",
      },
    ],
    tips: [
      "**Estructura flexible, escala enorme, milisegundos** ⇒ DynamoDB. **Esquema fijo y relaciones** ⇒ RDS o Aurora. **Informes sobre volúmenes grandes** ⇒ Redshift.",
      "ElastiCache es la trampa habitual cuando la pregunta menciona velocidad. Fijate si el enunciado pide **almacenar** (base de datos) o **acelerar** (caché).",
    ],
  },
  {
    id: "sim-d3-q10",
    topic: "3",
    prompt:
      "Una aplicación ejecuta la misma consulta costosa contra su base de datos relacional cientos de veces por minuto, y siempre devuelve el mismo resultado. El equipo quiere bajar la latencia y la carga de la base sin cambiar el motor. ¿Qué servicio agrega?",
    options: [
      {
        id: "A",
        text: "Amazon ElastiCache",
        correct: true,
        explanation:
          "Correcta. ElastiCache guarda en memoria los resultados que se consultan repetidamente, así que las lecturas siguientes se responden en microsegundos sin tocar la base. Una consulta repetida con resultado estable es exactamente para lo que existe.",
      },
      {
        id: "B",
        text: "Amazon S3",
        correct: false,
        explanation:
          "S3 almacena objetos y no está pensado como caché de consultas de base de datos: su latencia es de milisegundos a decenas de milisegundos, muy por encima de una caché en memoria.",
      },
      {
        id: "C",
        text: "AWS Database Migration Service",
        correct: false,
        explanation:
          "DMS migra bases de datos de un lugar a otro con mínima interrupción. No acelera consultas: mueve datos.",
      },
      {
        id: "D",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Athena ejecuta consultas SQL sobre datos que viven en S3. No intercepta ni acelera las consultas que la aplicación le hace a una base relacional.",
      },
    ],
    tips: [
      "**Consultas repetidas, misma respuesta, bajar latencia y carga** ⇒ caché ⇒ ElastiCache.",
      "Si el enunciado aclara **sin cambiar el motor** o **sin modificar la base**, está pidiendo agregar algo adelante, no reemplazar.",
    ],
  },
  {
    id: "sim-d3-q11",
    topic: "3",
    multiple: true,
    prompt:
      "Una empresa quiere mover su base de datos Oracle del centro de datos propio a Amazon Aurora PostgreSQL, y necesita que el sistema siga funcionando mientras la migración ocurre. ¿Cuáles DOS servicios necesita? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "AWS Database Migration Service (DMS)",
        correct: true,
        explanation:
          "Correcta. DMS copia los datos hacia AWS manteniendo el origen en funcionamiento y replicando los cambios hasta el momento del cambio definitivo. La frase *sin apagar el sistema* es su señal en el examen.",
      },
      {
        id: "B",
        text: "AWS Schema Conversion Tool (SCT)",
        correct: true,
        explanation:
          "Correcta. El motor de origen y el de destino son distintos —Oracle a PostgreSQL—, así que además de mover los datos hay que traducir la estructura: tablas, procedimientos, tipos. Eso lo hace SCT.",
      },
      {
        id: "C",
        text: "Amazon ElastiCache",
        correct: false,
        explanation:
          "ElastiCache es una caché en memoria que acelera consultas repetidas. No participa en una migración: ni mueve datos ni convierte esquemas.",
      },
      {
        id: "D",
        text: "AWS Backup",
        correct: false,
        explanation:
          "AWS Backup centraliza las copias de respaldo de recursos que ya están en AWS. Un respaldo de la base original tampoco serviría: no traduce la estructura de Oracle a PostgreSQL.",
      },
      {
        id: "E",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Athena ejecuta consultas SQL sobre archivos guardados en S3. Nada que ver con migrar una base de datos entre motores.",
      },
    ],
    tips: [
      "**DMS y SCT vienen en par pero no son intercambiables:** DMS mueve los datos, SCT convierte la estructura. Si el escenario cambia de motor, hacen falta los dos; si el motor es el mismo, alcanza con DMS.",
      "**Sin apagar el sistema**, **con mínima interrupción** o **mientras sigue operando** son la firma de DMS.",
      "Cuando una pregunta nombra dos motores distintos (Oracle a PostgreSQL, SQL Server a MySQL), está pidiendo que te acuerdes de SCT además de DMS.",
    ],
  },
  {
    id: "sim-d3-q12",
    topic: "3",
    prompt:
      "Un administrador necesita bloquear el tráfico proveniente de una dirección IP específica para toda una subred, de modo que ninguna instancia de esa subred la reciba. ¿Qué debe usar?",
    options: [
      {
        id: "A",
        text: "Un grupo de seguridad, agregando una regla de denegación",
        correct: false,
        explanation:
          "Los grupos de seguridad solo admiten reglas de permiso: todo lo que no se permite queda implícitamente denegado, pero no se puede escribir una regla que deniegue una IP puntual. Y además se aplican a instancias, no a subredes.",
      },
      {
        id: "B",
        text: "AWS WAF, con una regla que bloquee esa dirección",
        correct: false,
        explanation:
          "WAF filtra solicitudes HTTP y puede bloquear por dirección, pero actúa delante de aplicaciones web (en CloudFront o en un balanceador), no a nivel de subred de la VPC.",
      },
      {
        id: "C",
        text: "Una tabla de rutas de la VPC",
        correct: false,
        explanation:
          "Una tabla de rutas decide hacia dónde se envía el tráfico, no si se permite o se bloquea. Es un mecanismo de enrutamiento, no de filtrado.",
      },
      {
        id: "D",
        text: "Una lista de control de acceso de red (NACL)",
        correct: true,
        explanation:
          "Correcta. Las NACL operan a nivel de subred y son el único mecanismo de la VPC que admite reglas de **denegación** explícitas, así que son lo indicado para bloquear una dirección concreta en toda la subred. Son sin estado, así que hay que contemplar ida y vuelta.",
      },
    ],
    tips: [
      "Las tres diferencias que resuelven cualquier pregunta de este par: la NACL protege la **subred**, admite **denegar** y es **sin estado**; el grupo de seguridad protege la **instancia**, solo **permite** y es **con estado**.",
      "La palabra **bloquear** o **denegar** una dirección concreta apunta a NACL, porque el grupo de seguridad no puede expresarlo.",
    ],
  },
  {
    id: "sim-d3-q13",
    topic: "3",
    prompt:
      "Una empresa quiere registrar su dominio, resolver los nombres hacia su balanceador de carga y dirigir a los usuarios a la Región más cercana. ¿Qué servicio cumple estas funciones?",
    options: [
      {
        id: "A",
        text: "Amazon Route 53",
        correct: true,
        explanation:
          "Correcta. Route 53 es el servicio de DNS de AWS: registra dominios, resuelve nombres hacia recursos como un balanceador o un bucket, y tiene políticas de enrutamiento —por latencia, por geografía, por estado de salud— que permiten dirigir a cada usuario al destino más conveniente.",
      },
      {
        id: "B",
        text: "Amazon CloudFront",
        correct: false,
        explanation:
          "CloudFront acerca el contenido al usuario mediante una caché en el borde. Trabaja muy seguido junto con Route 53, pero no registra dominios ni resuelve nombres: es distribución de contenido, no DNS.",
      },
      {
        id: "C",
        text: "AWS Direct Connect",
        correct: false,
        explanation:
          "Direct Connect es un enlace de red privado y dedicado entre el centro de datos del cliente y AWS. No tiene nada que ver con nombres de dominio.",
      },
      {
        id: "D",
        text: "Amazon VPC",
        correct: false,
        explanation:
          "La VPC es la red privada donde se ubican los recursos. Define subredes y enrutamiento interno, no la resolución de nombres públicos.",
      },
    ],
    tips: [
      "**Dominio, DNS, resolución de nombres, enrutamiento por latencia o geografía** ⇒ Route 53.",
      "Route 53 y CloudFront aparecen juntos muy seguido. Uno **traduce el nombre**, el otro **sirve el contenido**.",
    ],
  },
  {
    id: "sim-d3-q14",
    topic: "3",
    prompt:
      "Una empresa necesita una conexión entre su centro de datos y AWS con ancho de banda consistente y sin pasar por internet pública, para transferir grandes volúmenes todos los días. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "Una conexión VPN de sitio a sitio",
        correct: false,
        explanation:
          "Una VPN cifra el tráfico, pero viaja por internet pública, así que el rendimiento depende de la congestión y no es consistente. Es más rápida y barata de montar, y suele usarse como respaldo de Direct Connect.",
      },
      {
        id: "B",
        text: "AWS Direct Connect",
        correct: true,
        explanation:
          "Correcta. Direct Connect es un enlace físico dedicado entre las instalaciones del cliente y AWS, sin pasar por internet. Da ancho de banda consistente y latencia estable, que es exactamente lo que pide el enunciado para transferencias diarias grandes.",
      },
      {
        id: "C",
        text: "Un gateway de internet en la VPC",
        correct: false,
        explanation:
          "Un gateway de internet es lo que permite que los recursos de la VPC alcancen internet. Es justamente el camino que el enunciado quiere evitar.",
      },
      {
        id: "D",
        text: "AWS Transit Gateway",
        correct: false,
        explanation:
          "Transit Gateway concentra la conectividad entre muchas VPC y redes propias, simplificando la topología. Es útil a escala, pero no es por sí mismo el enlace privado hacia el centro de datos.",
      },
    ],
    tips: [
      "**Dedicado, consistente, sin internet pública** ⇒ Direct Connect. **Rápido de montar, cifrado sobre internet** ⇒ VPN.",
      "Si el enunciado prioriza el **costo o la rapidez de implementación**, se inclina a VPN; si prioriza el **rendimiento predecible**, a Direct Connect.",
    ],
  },
  {
    id: "sim-d3-q15",
    topic: "3",
    prompt:
      "Una empresa tiene que conservar registros contables durante diez años por exigencia legal. Prevé consultarlos una o dos veces en toda la década, y acepta esperar varias horas para recuperarlos. ¿Qué clase de almacenamiento de S3 es la más conveniente?",
    options: [
      {
        id: "A",
        text: "S3 Standard",
        correct: false,
        explanation:
          "S3 Standard está pensado para datos de acceso frecuente y es la clase más cara por gigabyte almacenado. Pagar diez años de almacenamiento Standard para dos consultas es desperdicio puro.",
      },
      {
        id: "B",
        text: "S3 Standard-Infrequent Access",
        correct: false,
        explanation:
          "Standard-IA baja el precio de almacenamiento para datos de acceso poco frecuente pero con recuperación inmediata. Es mejor que Standard acá, pero sigue siendo más caro que el archivo profundo, y el enunciado aclara que esperar horas no es problema.",
      },
      {
        id: "C",
        text: "S3 Glacier Deep Archive",
        correct: true,
        explanation:
          "Correcta. Deep Archive es la clase más económica de S3 y está diseñada para archivo de largo plazo con recuperaciones muy raras, con tiempos de restauración de hasta doce horas. Retención legal por una década con acceso casi nulo es su caso de uso declarado.",
      },
      {
        id: "D",
        text: "S3 Intelligent-Tiering",
        correct: false,
        explanation:
          "Intelligent-Tiering mueve los objetos entre niveles según el patrón de acceso observado, y conviene cuando ese patrón es **desconocido o cambiante**. Acá el patrón se conoce perfectamente, así que pagar el monitoreo no aporta nada.",
      },
    ],
    tips: [
      "Las clases de S3 se eligen con dos datos: **con qué frecuencia se accede** y **cuánto se puede esperar**. Si se acepta esperar horas, la respuesta es Glacier Deep Archive.",
      "Intelligent-Tiering es la respuesta cuando el patrón de acceso es **impredecible**. Si el enunciado lo describe con precisión, no es esa.",
    ],
  },
  {
    id: "sim-d3-q16",
    topic: "3",
    prompt:
      "Un equipo guarda datos importantes en el almacén de instancia (instance store) de sus EC2. Tras detener y volver a iniciar una instancia, descubre que los datos desaparecieron. ¿Qué almacenamiento debería haber usado para conservarlos?",
    options: [
      {
        id: "A",
        text: "Un bucket de S3 montado como disco local",
        correct: false,
        explanation:
          "S3 es almacenamiento de objetos y no se monta como un disco de bloques para un sistema operativo. Sirve para guardar archivos mediante su API, pero no reemplaza el disco de una instancia.",
      },
      {
        id: "B",
        text: "Otro almacén de instancia con más capacidad",
        correct: false,
        explanation:
          "El problema no es la capacidad sino la naturaleza del almacén de instancia: es efímero por diseño. Más capacidad del mismo tipo perdería los datos exactamente igual.",
      },
      {
        id: "C",
        text: "Programar instantáneas periódicas del almacén de instancia",
        correct: false,
        explanation:
          "Las instantáneas son una característica de EBS: el almacén de instancia no se puede capturar así. Y aunque se pudiera, copiar cada tanto no arregla el problema de fondo —el almacén es efímero por diseño— y se perdería todo lo escrito desde la última copia.",
      },
      {
        id: "D",
        text: "Un volumen de Amazon EBS",
        correct: true,
        explanation:
          "Correcta. EBS es almacenamiento de bloques persistente: el volumen vive independientemente de la instancia, así que los datos sobreviven a detenerla e iniciarla, y hasta se puede desconectar y conectar a otra instancia de la misma zona.",
      },
    ],
    tips: [
      "La diferencia que el examen pregunta: el **almacén de instancia es efímero** (se pierde al detener la instancia), **EBS es persistente**.",
      "Si el enunciado habla del **disco de una sola instancia** ⇒ EBS. Si habla de **muchas instancias compartiendo archivos** ⇒ EFS.",
    ],
  },
  {
    id: "sim-d3-q17",
    topic: "3",
    prompt:
      "Un sitio de noticias corre en un grupo de instancias EC2 con Linux detrás de un balanceador de carga. Cuando un editor sube una fotografía, cualquiera de las instancias tiene que poder servirla de inmediato, y el espacio ocupado crece sin parar. ¿Qué servicio de almacenamiento corresponde?",
    options: [
      {
        id: "A",
        text: "Amazon EFS",
        correct: true,
        explanation:
          "Correcta. EFS es un sistema de archivos compartido y elástico: muchas instancias Linux lo montan a la vez, dentro de varias Zonas de disponibilidad, y la capacidad crece y se achica automáticamente sin aprovisionar nada.",
      },
      {
        id: "B",
        text: "Un volumen de Amazon EBS conectado a todas las instancias del grupo",
        correct: false,
        explanation:
          "Un volumen EBS estándar se conecta a una sola instancia a la vez y vive en una única Zona de disponibilidad. No resuelve el acceso compartido simultáneo que pide el escenario.",
      },
      {
        id: "C",
        text: "El almacén de instancia local de cada máquina del grupo",
        correct: false,
        explanation:
          "El almacén de instancia es local a cada máquina y efímero, así que cada instancia guardaría su propia copia aislada: la foto subida a una no la verían las demás, y se perdería al detenerse. Es lo contrario de un sistema compartido.",
      },
      {
        id: "D",
        text: "Amazon FSx for Windows File Server",
        correct: false,
        explanation:
          "FSx for Windows es un sistema de archivos compartido, pero para cargas de Windows con el protocolo SMB. El escenario especifica instancias Linux, que corresponden a EFS.",
      },
    ],
    tips: [
      "**Muchas instancias, archivos compartidos, Linux** ⇒ EFS. **Lo mismo pero Windows** ⇒ FSx for Windows File Server.",
      "La palabra **elástico** en el enunciado (crece solo, sin aprovisionar) es casi una firma de EFS.",
    ],
  },
  {
    id: "sim-d3-q18",
    topic: "3",
    multiple: true,
    prompt:
      "Una empresa tiene que mover 80 terabytes desde su centro de datos a AWS, y su conexión a internet tardaría meses en transferirlos. Además quiere que, una vez migrada, una aplicación heredada siga accediendo a archivos locales respaldados en la nube. ¿Cuáles DOS servicios usa? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "AWS Snowball",
        correct: true,
        explanation:
          "Correcta. Snowball es un dispositivo físico que AWS envía al cliente: este copia los datos localmente y lo devuelve para que AWS los cargue. Es la respuesta cuando el volumen es grande y la conexión de red haría que la transferencia tardara demasiado.",
      },
      {
        id: "B",
        text: "AWS Storage Gateway",
        correct: true,
        explanation:
          "Correcta. Storage Gateway da a las aplicaciones locales acceso al almacenamiento de AWS mediante protocolos conocidos, manteniendo en caché los datos usados con frecuencia. Es la pieza típica de un escenario híbrido con una aplicación heredada.",
      },
      {
        id: "C",
        text: "Amazon S3 Transfer Acceleration",
        correct: false,
        explanation:
          "Transfer Acceleration acelera las subidas a S3 usando la red de borde de AWS, pero sigue dependiendo de la conexión a internet del cliente. Con 80 terabytes y una conexión que tardaría meses, no alcanza.",
      },
      {
        id: "D",
        text: "AWS Database Migration Service",
        correct: false,
        explanation:
          "DMS migra bases de datos entre motores y plataformas. El enunciado habla de un volumen de archivos y de una aplicación que accede a archivos, no de una base de datos.",
      },
      {
        id: "E",
        text: "Amazon EBS",
        correct: false,
        explanation:
          "EBS son discos para instancias EC2 dentro de AWS. No transfiere datos desde un centro de datos externo ni expone almacenamiento a aplicaciones locales.",
      },
    ],
    tips: [
      "**Decenas de terabytes o más, y la red tardaría demasiado** ⇒ familia Snow (dispositivo físico). **Transferencia continua por red** ⇒ DataSync o Transfer Acceleration.",
      "**Aplicación local que necesita ver almacenamiento de AWS** ⇒ Storage Gateway. Es el servicio híbrido de almacenamiento por excelencia.",
      "Cuando la pregunta plantea dos necesidades distintas, asegurate de que cada respuesta cubra una: acá, una es la migración masiva y la otra el acceso híbrido permanente.",
    ],
  },
  {
    id: "sim-d3-q19",
    topic: "3",
    prompt:
      "Una empresa quiere convertir automáticamente en texto las grabaciones de las llamadas de su centro de atención, para poder buscarlas después. ¿Qué servicio de AWS usa?",
    options: [
      {
        id: "A",
        text: "Amazon Polly",
        correct: false,
        explanation:
          "Polly hace lo contrario: convierte texto en voz sintetizada. Es el distractor más frecuente de esta pregunta, porque los dos servicios trabajan entre audio y texto pero en direcciones opuestas.",
      },
      {
        id: "B",
        text: "Amazon Transcribe",
        correct: true,
        explanation:
          "Correcta. Transcribe convierte audio en texto, y es el servicio indicado para transcribir llamadas, reuniones o videos y poder buscar su contenido después.",
      },
      {
        id: "C",
        text: "Amazon Comprehend",
        correct: false,
        explanation:
          "Comprehend analiza texto para extraer entidades, temas y sentimiento. Es el paso natural **después** de transcribir, pero necesita texto de entrada: no procesa audio.",
      },
      {
        id: "D",
        text: "Amazon Translate",
        correct: false,
        explanation:
          "Translate traduce texto entre idiomas. Tampoco toma audio como entrada, y el escenario no pide cambiar de idioma.",
      },
    ],
    tips: [
      "Recordá los servicios de IA por el **verbo**: Transcribe pasa audio a texto, Polly pasa texto a audio, Translate traduce, Comprehend entiende sentimiento, Rekognition mira imágenes, Textract extrae de documentos.",
      "Transcribe y Polly son inversos y aparecen juntos a propósito. Fijate qué tiene el cliente de entrada: si tiene audio, es Transcribe.",
    ],
  },
  {
    id: "sim-d3-q20",
    topic: "3",
    prompt:
      "Un analista tiene varios años de registros de servidor guardados en S3 y quiere consultarlos con SQL de forma puntual, sin montar ni administrar ninguna base de datos. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "Amazon RDS",
        correct: false,
        explanation:
          "RDS implicaría aprovisionar una instancia de base de datos y cargar los registros en ella. El enunciado pide explícitamente no administrar ninguna base de datos.",
      },
      {
        id: "B",
        text: "Amazon Redshift",
        correct: false,
        explanation:
          "Redshift es un almacén de datos potentísimo para análisis recurrente sobre grandes volúmenes, pero hay que aprovisionar el clúster y cargar los datos. Para consultas puntuales sobre archivos que ya están en S3 es más maquinaria de la necesaria.",
      },
      {
        id: "C",
        text: "Amazon Athena",
        correct: true,
        explanation:
          "Correcta. Athena ejecuta consultas SQL directamente sobre los datos que ya viven en S3, sin servidores que administrar y cobrando por la cantidad de datos escaneados. Consultas puntuales sobre archivos en S3 es su caso de uso exacto.",
      },
      {
        id: "D",
        text: "Amazon QuickSight",
        correct: false,
        explanation:
          "QuickSight es la herramienta de tableros y visualización: muestra los resultados del análisis a la gente de negocio. Necesita una fuente que ejecute las consultas, y esa fuente podría ser Athena.",
      },
    ],
    tips: [
      "**SQL sobre datos que ya están en S3, sin administrar nada** ⇒ Athena.",
      "Ordená la cadena de analítica: Glue **prepara** los datos, Athena o Redshift **consultan**, QuickSight **muestra**.",
    ],
  },
  {
    id: "sim-d3-q21",
    topic: "3",
    prompt:
      "Una tienda en línea quiere que los pedidos entren en una lista de espera para que el sistema de facturación los procese a su propio ritmo, sin perder ninguno si ese sistema se cae un rato. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "Amazon SNS",
        correct: false,
        explanation:
          "SNS empuja la notificación a todos los suscriptores a la vez, en el momento. Reintenta y puede derivar a una cola de mensajes fallidos, pero no retiene el mensaje esperando a que un consumidor lo retire cuando pueda: no hay nadie que vaya a buscarlo a su ritmo, que es justo lo que pide el escenario.",
      },
      {
        id: "B",
        text: "Amazon EventBridge",
        correct: false,
        explanation:
          "EventBridge enruta eventos hacia destinos según reglas, y es excelente para conectar servicios. Pero el enunciado describe específicamente una lista de espera que desacopla dos sistemas a distinta velocidad, que es una cola.",
      },
      {
        id: "C",
        text: "Amazon Kinesis Data Streams",
        correct: false,
        explanation:
          "Kinesis está pensado para flujos continuos de datos en tiempo real, como telemetría o clics, con varios consumidores leyendo la misma secuencia. Para una cola de pedidos procesados de a uno es la herramienta equivocada.",
      },
      {
        id: "D",
        text: "Amazon SQS",
        correct: true,
        explanation:
          "Correcta. SQS es una cola de mensajes: el productor deja el pedido y el consumidor lo retira cuando puede. Los mensajes quedan retenidos mientras el consumidor no esté disponible, así que desacopla los dos sistemas y evita perder pedidos.",
      },
    ],
    tips: [
      "**Cola, lista de espera, procesar a su ritmo, desacoplar, no perder mensajes** ⇒ SQS. **Avisar a varios a la vez** ⇒ SNS.",
      "SQS es de uno a uno y con retención; SNS es de uno a muchos y en el momento. Si el enunciado menciona que un componente puede estar caído, está pidiendo la cola.",
    ],
  },
  {
    id: "sim-d3-q22",
    topic: "3",
    multiple: true,
    prompt:
      "Una empresa necesita, por un lado, dar a sus empleados remotos escritorios Windows administrados a los que accedan desde cualquier dispositivo, y por otro, automatizar la compilación y el despliegue de su aplicación cada vez que se sube código. ¿Cuáles DOS servicios cubren estas necesidades? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Amazon WorkSpaces",
        correct: true,
        explanation:
          "Correcta. WorkSpaces entrega escritorios virtuales administrados en la nube, a los que el empleado accede desde cualquier dispositivo. Es el servicio de cómputo para el usuario final que el examen espera para este escenario.",
      },
      {
        id: "B",
        text: "AWS CodePipeline",
        correct: true,
        explanation:
          "Correcta. CodePipeline orquesta las etapas de integración y entrega continuas, disparándose con cada cambio en el repositorio y coordinando la compilación y el despliegue.",
      },
      {
        id: "C",
        text: "Amazon AppStream 2.0",
        correct: false,
        explanation:
          "AppStream transmite **aplicaciones** individuales desde la nube, no un escritorio completo. Es el distractor fino de esta pregunta: si el enunciado pidiera una sola aplicación, sería la respuesta correcta.",
      },
      {
        id: "D",
        text: "AWS X-Ray",
        correct: false,
        explanation:
          "X-Ray analiza y traza las solicitudes dentro de una aplicación distribuida para encontrar cuellos de botella. Es una herramienta de diagnóstico, no de despliegue.",
      },
      {
        id: "E",
        text: "AWS IoT Core",
        correct: false,
        explanation:
          "IoT Core conecta dispositivos físicos con la nube. Nada que ver con escritorios de empleados ni con despliegue de código.",
      },
    ],
    tips: [
      "**Escritorio completo** ⇒ WorkSpaces. **Una aplicación suelta transmitida** ⇒ AppStream 2.0. La pregunta se decide en esa palabra.",
      "En las herramientas de desarrollo, separá por etapa: CodeBuild **compila**, CodeDeploy **despliega**, CodePipeline **orquesta** todo el flujo.",
    ],
  },
];
