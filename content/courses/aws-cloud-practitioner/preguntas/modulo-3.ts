import type { ExamQuizQuestion } from "../../types";

/**
 * Question bank for lesson "27-analisis-preguntas-modulo-3" (Módulo 3 —
 * Tecnología y servicios). 35 questions, per the per-module counts in
 * CONTRATO-DE-CLASES.md, spread across 3.1 (deployment), 3.2 (global
 * infrastructure), 3.3 (compute), 3.4 (databases), 3.5 (networking),
 * 3.6 (storage), 3.7 (AI/analytics) and 3.8 (other categories).
 */
export const MODULE_3_QUESTIONS: ExamQuizQuestion[] = [
  {
    id: "m3-q01",
    prompt:
      "Un equipo necesita levantar el mismo entorno —servidores, base de datos y red— tres veces: uno para desarrollo, otro para pruebas y otro para producción, todos idénticos. ¿Cuál es el enfoque recomendado?",
    options: [
      {
        id: "A",
        text: "Crearlos a mano en la consola siguiendo una lista de pasos",
        correct: false,
        explanation:
          "Es lento y, sobre todo, frágil: alguno va a quedar distinto sin que nadie lo note, y ahí aparecen las fallas más difíciles de diagnosticar. La lista de pasos no garantiza que los tres queden iguales.",
      },
      {
        id: "B",
        text: "Crear uno y pedirle a AWS que lo copie a las otras cuentas",
        correct: false,
        explanation:
          "AWS no clona entornos así. Y aunque pudiera, quedaría una copia puntual: cuando el entorno cambie, habría que volver a copiar a mano.",
      },
      {
        id: "C",
        text: "Describir la infraestructura en una plantilla de AWS CloudFormation",
        correct: true,
        explanation:
          "Correcto. Es infraestructura como código: se escribe una vez cómo debe quedar todo y AWS lo construye idéntico las veces que haga falta. Además queda versionado, se revisa como cualquier código y permite detectar si alguien cambió algo a mano.",
      },
      {
        id: "D",
        text: "Documentar la configuración en un manual para que el equipo la replique",
        correct: false,
        explanation:
          "Un manual sigue dependiendo de que una persona ejecute cada paso sin equivocarse. Es la versión escrita del mismo problema, no una solución.",
      },
    ],
    tips: [
      "Las palabras **repetible, idéntico, consistente, automatizado o versionado** apuntan casi siempre a infraestructura como código.",
      "Cuando una opción propone hacer a mano algo que el escenario describe como repetitivo, casi nunca es la correcta.",
      "CloudFormation no solo crea: también permite borrar todo lo que creó de una vez, sin ir recurso por recurso.",
    ],
  },
  {
    id: "m3-q02",
    prompt:
      "Una aplicación escrita en Python necesita crear y consultar recursos de AWS desde su propio código, sin intervención de una persona. ¿Qué debe usar?",
    options: [
      {
        id: "A",
        text: "El SDK de AWS para Python",
        correct: true,
        explanation:
          "Correcto. Los SDK son las bibliotecas que permiten que un programa le dé órdenes a AWS desde el lenguaje en que está escrito. Es la vía cuando quien actúa es la aplicación y no una persona.",
      },
      {
        id: "B",
        text: "La consola de administración de AWS",
        correct: false,
        explanation:
          "La consola es la página web donde una persona hace clic. Un programa no puede usarla, y el escenario aclara que no hay intervención humana.",
      },
      {
        id: "C",
        text: "AWS CloudFormation",
        correct: false,
        explanation:
          "CloudFormation describe cómo debe quedar la infraestructura y la construye. Sirve para desplegar entornos, no para que una aplicación consulte recursos mientras funciona.",
      },
      {
        id: "D",
        text: "AWS Direct Connect",
        correct: false,
        explanation:
          "Direct Connect es un cable dedicado entre el centro de datos de una empresa y AWS. Es conectividad de red, no una forma de darle órdenes a AWS.",
      },
    ],
    tips: [
      "Preguntate **quién actúa**: una persona explorando ⇒ consola; una persona automatizando con scripts ⇒ CLI; una aplicación desde su código ⇒ SDK.",
      "Si el enunciado nombra un lenguaje de programación (Python, Java, JavaScript), es una señal fuerte de SDK.",
      "CloudFormation aparece cuando se trata de **crear la infraestructura**, no de operarla desde una aplicación en marcha.",
    ],
  },
  {
    id: "m3-q03",
    prompt:
      "Una empresa mueve parte de sus sistemas a AWS, pero una regulación la obliga a mantener cierta información dentro de su propio centro de datos. Las dos partes deben seguir funcionando conectadas. ¿Qué modelo de despliegue está usando?",
    options: [
      {
        id: "A",
        text: "Todo en la nube",
        correct: false,
        explanation:
          "No, porque una parte se queda expresamente fuera de AWS. Sería \"todo en la nube\" solo si la aplicación entera viviera en AWS.",
      },
      {
        id: "B",
        text: "Nube privada",
        correct: false,
        explanation:
          "Una nube privada es infraestructura dedicada a una sola organización. Describe solo la mitad del escenario y deja afuera el hecho de que también usa AWS.",
      },
      {
        id: "C",
        text: "En las instalaciones propias (on-premises)",
        correct: false,
        explanation:
          "Eso sería tener absolutamente todo en el centro de datos de la empresa, sin usar la nube. Acá sí se está usando AWS para una parte.",
      },
      {
        id: "D",
        text: "Híbrido",
        correct: true,
        explanation:
          "Correcto. El modelo híbrido combina recursos en AWS con infraestructura propia, conectados entre sí. Es lo habitual cuando una regulación o un sistema viejo impiden mover todo, y muchas veces no es transitorio sino la arquitectura definitiva.",
      },
    ],
    tips: [
      "Ante **servidores propios que se quedan** conectados con AWS, la respuesta es híbrido. Las señales suelen ser una regulación, un sistema heredado o el costo de migrar.",
      "Híbrido no significa \"a medio hacer\": para muchas empresas es una decisión deliberada y permanente.",
      "No confundas los modelos de despliegue (dónde corre) con los tipos de nube (de quién es la infraestructura): pública, privada e híbrida.",
    ],
  },
  {
    id: "m3-q04",
    prompt:
      "Una aplicación crítica corre en instancias EC2 dentro de una sola Zona de disponibilidad. La empresa quiere que siga funcionando aunque esa zona quede fuera de servicio. ¿Qué debe hacer?",
    options: [
      {
        id: "A",
        text: "Agrandar el tamaño de las instancias existentes",
        correct: false,
        explanation:
          "Instancias más grandes no ayudan en nada si la zona entera se cae: siguen estando todas en el mismo lugar. Eso resuelve un problema de rendimiento, no de disponibilidad.",
      },
      {
        id: "B",
        text: "Desplegar instancias en varias Zonas de disponibilidad de la misma Región",
        correct: true,
        explanation:
          "Correcto. Las Zonas de disponibilidad son centros de datos aislados, con electricidad, refrigeración y red propias, separados por kilómetros. Repartir la aplicación entre varias es exactamente lo que da alta disponibilidad.",
      },
      {
        id: "C",
        text: "Sacar instantáneas de los discos con más frecuencia",
        correct: false,
        explanation:
          "Las instantáneas sirven para recuperar datos después de un problema, pero no mantienen la aplicación funcionando durante la caída. Son respaldo, no disponibilidad.",
      },
      {
        id: "D",
        text: "Usar una ubicación de borde para servir la aplicación",
        correct: false,
        explanation:
          "Las ubicaciones de borde guardan copias de contenido cerca del usuario para reducir la latencia. No ejecutan tu aplicación ni la reemplazan si la zona falla.",
      },
    ],
    tips: [
      "**Alta disponibilidad y tolerancia a fallos ⇒ varias Zonas de disponibilidad.** Es la asociación más rentable de este tema.",
      "Si una opción propone varias Regiones para resolver disponibilidad, suele ser excesivo: el examen espera multi-AZ salvo que hable de un desastre a escala regional.",
      "Distinguí respaldo de disponibilidad: una instantánea te deja recuperar; multi-AZ te deja no caerte.",
    ],
  },
  {
    id: "m3-q05",
    prompt:
      "Un equipo debe elegir en qué Región de AWS desplegar una aplicación nueva. ¿Cuáles DOS de los siguientes son criterios válidos para esa decisión?",
    multiple: true,
    options: [
      {
        id: "A",
        text: "La cantidad de Zonas de disponibilidad que tiene el mundo",
        correct: false,
        explanation:
          "Es un dato general de AWS, no un criterio para decidir. Lo que importaría sería qué ofrece cada Región candidata, no un total global.",
      },
      {
        id: "B",
        text: "Las leyes que obligan a guardar los datos en un país determinado",
        correct: true,
        explanation:
          "Correcta. El cumplimiento normativo es el criterio de mayor peso: si una ley exige que los datos no salgan del país, la Región queda determinada y los demás criterios pasan a segundo plano.",
      },
      {
        id: "C",
        text: "El sistema operativo que usarán las instancias",
        correct: false,
        explanation:
          "El sistema operativo se elige al crear la instancia y está disponible en todas las Regiones. No influye en dónde desplegar.",
      },
      {
        id: "D",
        text: "La distancia hasta los usuarios, por la latencia",
        correct: true,
        explanation:
          "Correcta. Cuanto más lejos esté la Región de los usuarios, más tarda cada pedido en ir y volver. Reducir esa demora es uno de los cuatro criterios clásicos.",
      },
      {
        id: "E",
        text: "El color del logotipo de la empresa",
        correct: false,
        explanation:
          "No tiene ninguna relación con la decisión técnica. Aparece acá como recordatorio de que conviene descartar rápido lo que no tiene que ver con el problema.",
      },
    ],
    tips: [
      "Los cuatro criterios para elegir Región: **cumplimiento normativo, latencia, servicios disponibles y precio.**",
      "Si el escenario menciona una ley o un regulador, ese criterio manda sobre todos los demás.",
      "No todos los servicios existen en todas las Regiones: los más nuevos aparecen primero en unas pocas. Ese es el tercer criterio y se olvida seguido.",
    ],
  },
  {
    id: "m3-q06",
    prompt:
      "Los usuarios europeos de un sitio alojado en una Región de Sudamérica se quejan de que las imágenes y los videos tardan en cargar. El contenido es siempre el mismo para todos. ¿Cuál es la solución más adecuada?",
    options: [
      {
        id: "A",
        text: "Aumentar el tamaño de las instancias del servidor",
        correct: false,
        explanation:
          "El problema no es que el servidor esté saturado, es la distancia que recorre cada pedido. Un servidor más potente sigue estando igual de lejos.",
      },
      {
        id: "B",
        text: "Migrar toda la aplicación a una Región europea",
        correct: false,
        explanation:
          "Resolvería a los usuarios europeos, pero empeoraría a los sudamericanos, y es una mudanza enorme para un problema que se resuelve con mucho menos.",
      },
      {
        id: "C",
        text: "Distribuir el contenido con Amazon CloudFront",
        correct: true,
        explanation:
          "Correcto. CloudFront usa las ubicaciones de borde para guardar copias del contenido cerca del usuario, así que el europeo recibe la copia que está en Europa. Es la solución típica cuando el contenido se repite y no cambia a cada segundo.",
      },
      {
        id: "D",
        text: "Agregar más Zonas de disponibilidad en la Región actual",
        correct: false,
        explanation:
          "Más Zonas de disponibilidad mejoran la tolerancia a fallos, no la distancia hasta Europa. Siguen estando todas en Sudamérica.",
      },
    ],
    tips: [
      "**Latencia por usuarios lejanos + contenido que se repite ⇒ CloudFront.** Es la señal más clara de este tema.",
      "Distinguí los dos problemas: varias Zonas resuelven **caídas**; las ubicaciones de borde resuelven **distancia**.",
      "Si el contenido fuera distinto para cada usuario y cambiara todo el tiempo, la caché en el borde ayudaría mucho menos y habría que pensar en desplegar en otra Región.",
    ],
  },
  {
    id: "m3-q07",
    prompt:
      "Una empresa necesita ejecutar una función que procesa una imagen cada vez que alguien la sube, unas pocas veces por día. No quiere administrar servidores ni pagar cuando nadie sube nada. ¿Qué servicio le corresponde?",
    options: [
      {
        id: "A",
        text: "AWS Lambda",
        correct: true,
        explanation:
          "Correcto. Lambda ejecuta la función solo cuando algo la dispara, no hay servidor que administrar y, si nadie la usa, no se paga nada. Se cobra por ejecución y por el tiempo que tarda.",
      },
      {
        id: "B",
        text: "Amazon EC2",
        correct: false,
        explanation:
          "Una instancia EC2 se paga por el tiempo que está encendida, la use alguien o no. Para una tarea de unos segundos al día sería pagar veinticuatro horas para usar unos pocos segundos.",
      },
      {
        id: "C",
        text: "Amazon EBS",
        correct: false,
        explanation:
          "EBS es almacenamiento: el disco de una instancia. No ejecuta código de ninguna manera.",
      },
      {
        id: "D",
        text: "Amazon EKS",
        correct: false,
        explanation:
          "EKS orquesta contenedores con Kubernetes. Resolvería el problema, pero implica administrar bastante más de lo que el escenario pide, y no cumple con no pagar cuando no se usa.",
      },
    ],
    tips: [
      "Las frases **\"sin administrar servidores\"** y **\"pagar solo cuando se ejecuta\"** apuntan a Lambda casi sin excepción.",
      "Lambda es para tareas que **empiezan y terminan rápido**. Si el proceso corriera durante horas, la respuesta cambiaría a EC2 o contenedores.",
      "Ojo con las opciones que son de otra familia: EBS es almacenamiento, no cómputo. Ubicá primero la familia y descartás varias de una.",
    ],
  },
  {
    id: "m3-q08",
    prompt:
      "Una aplicación heredada necesita instalarse sobre un sistema operativo específico, con software propio y configuraciones a medida del sistema. ¿Qué servicio de cómputo corresponde?",
    options: [
      {
        id: "A",
        text: "AWS Lambda",
        correct: false,
        explanation:
          "Con Lambda no hay sistema operativo que puedas tocar: solo subís código. Es justo lo contrario del control que pide el escenario.",
      },
      {
        id: "B",
        text: "Amazon EC2",
        correct: true,
        explanation:
          "Correcto. EC2 te da un servidor virtual completo donde elegís el sistema operativo, instalás lo que quieras y configurás a medida. A cambio, todo lo de adentro pasa a ser tu responsabilidad.",
      },
      {
        id: "C",
        text: "Amazon S3",
        correct: false,
        explanation:
          "S3 guarda archivos. No ejecuta aplicaciones ni tiene sistema operativo.",
      },
      {
        id: "D",
        text: "AWS Fargate",
        correct: false,
        explanation:
          "Fargate corre contenedores sin que administres los servidores por debajo. Justamente por eso no te deja configurar el sistema operativo a medida.",
      },
    ],
    tips: [
      "**Control total del sistema operativo ⇒ EC2.** Cualquier opción serverless o administrada queda descartada cuando el enunciado pide ese nivel de control.",
      "La palabra **heredada** suele indicar una aplicación que no se puede rediseñar, y eso empuja hacia EC2 antes que hacia contenedores o Lambda.",
      "Recordá el orden de cuánto administrás: EC2 (todo) → contenedores → Fargate → Lambda (solo tu código).",
    ],
  },
  {
    id: "m3-q09",
    prompt:
      "Un equipo ya usa Kubernetes en su centro de datos y quiere seguir usando las mismas herramientas y configuraciones al mover sus contenedores a AWS. ¿Qué servicio le conviene?",
    options: [
      {
        id: "A",
        text: "Amazon EC2",
        correct: false,
        explanation:
          "Podrían instalar Kubernetes ellos mismos sobre instancias EC2, pero entonces tendrían que administrarlo por completo. Existe un servicio que ya lo hace por ellos.",
      },
      {
        id: "B",
        text: "AWS Lambda",
        correct: false,
        explanation:
          "Lambda ejecuta funciones sueltas, no contenedores orquestados con Kubernetes. No conserva nada de las herramientas que el equipo ya usa.",
      },
      {
        id: "C",
        text: "Amazon ECS",
        correct: false,
        explanation:
          "ECS también orquesta contenedores, pero con la tecnología propia de AWS. Sería más simple para quien arranca de cero, pero obligaría a este equipo a abandonar Kubernetes.",
      },
      {
        id: "D",
        text: "Amazon EKS",
        correct: true,
        explanation:
          "Correcto. EKS es el servicio de Kubernetes administrado de AWS, así que el equipo conserva las herramientas y configuraciones que ya conoce mientras AWS se ocupa de mantener la infraestructura.",
      },
    ],
    tips: [
      "**Si el enunciado nombra Kubernetes, es EKS.** Si habla de contenedores sin nombrarlo, ECS alcanza. Es la única diferencia que el examen pide a este nivel.",
      "Cuando el escenario dice que el equipo **ya usa** una tecnología y quiere conservarla, buscá el servicio administrado de esa misma tecnología.",
      "ECS y EKS resuelven lo mismo; lo que cambia es si usás la tecnología de AWS o el estándar de la industria.",
    ],
  },
  {
    id: "m3-q10",
    prompt:
      "Una empresa quiere ejecutar sus contenedores sin tener que elegir, dimensionar ni parchear los servidores donde corren. ¿Qué servicio se lo permite?",
    options: [
      {
        id: "A",
        text: "AWS Fargate",
        correct: true,
        explanation:
          "Correcto. Fargate ejecuta contenedores sin que administres servidores por debajo: es serverless aplicado a contenedores. Vos definís el contenedor y AWS se ocupa del resto.",
      },
      {
        id: "B",
        text: "Amazon EC2",
        correct: false,
        explanation:
          "Con EC2 los servidores son exactamente lo que hay que elegir, dimensionar y parchear. Es lo contrario de lo que pide el escenario.",
      },
      {
        id: "C",
        text: "Amazon EBS",
        correct: false,
        explanation:
          "EBS es el disco de una instancia. No ejecuta contenedores ni nada.",
      },
      {
        id: "D",
        text: "Amazon CloudFront",
        correct: false,
        explanation:
          "CloudFront distribuye contenido cerca del usuario. No tiene relación con ejecutar contenedores.",
      },
    ],
    tips: [
      "**Contenedores + \"sin administrar servidores\" ⇒ Fargate.** Si el escenario acepta administrar los servidores, entonces ECS o EKS sobre EC2.",
      "Fargate no reemplaza a ECS y EKS: es la forma de ejecutarlos sin servidores propios por debajo.",
      "Ante servicios de otra familia entre las opciones (almacenamiento, red), descartalos primero: suelen estar de relleno.",
    ],
  },
  {
    id: "m3-q11",
    prompt:
      "El tráfico de un sitio varía muchísimo: de día recibe diez veces más visitas que de noche. La empresa quiere que la cantidad de instancias se ajuste sola a esa demanda. ¿Qué debe usar?",
    options: [
      {
        id: "A",
        text: "Amazon Route 53",
        correct: false,
        explanation:
          "Route 53 traduce nombres de dominio en direcciones. Puede dirigir a los usuarios, pero no agrega ni quita instancias.",
      },
      {
        id: "B",
        text: "Amazon EC2 Auto Scaling",
        correct: true,
        explanation:
          "Correcto. Auto Scaling agrega instancias cuando la demanda sube y las quita cuando baja, lo que evita tanto caerse en el pico como pagar capacidad ociosa de noche. Es la elasticidad del Módulo 1 hecha realidad.",
      },
      {
        id: "C",
        text: "Amazon S3",
        correct: false,
        explanation:
          "S3 es almacenamiento de archivos. No tiene nada que ver con ajustar la cantidad de servidores.",
      },
      {
        id: "D",
        text: "AWS CloudFormation",
        correct: false,
        explanation:
          "CloudFormation crea la infraestructura descrita en una plantilla, pero no reacciona sola a la demanda minuto a minuto.",
      },
    ],
    tips: [
      "**Auto Scaling responde a \"cuántos\" servidores hay**; el balanceador de carga responde a \"a cuál va cada visita\". Se preguntan como par pero no son intercambiables.",
      "Las palabras **demanda variable, picos, ajustar solo** apuntan a Auto Scaling.",
      "Fijate que Auto Scaling resuelve las dos caras del problema: no caerse cuando sube y no pagar de más cuando baja.",
    ],
  },
  {
    id: "m3-q12",
    prompt:
      "Una aplicación corre en varias instancias EC2 repartidas en dos Zonas de disponibilidad. La empresa quiere que las visitas se distribuyan entre todas ellas y que ninguna reciba tráfico si deja de responder. ¿Qué servicio necesita?",
    options: [
      {
        id: "A",
        text: "Amazon CloudFront",
        correct: false,
        explanation:
          "CloudFront acerca el contenido al usuario guardando copias en el borde. No reparte peticiones entre las instancias de tu aplicación ni comprueba si están sanas.",
      },
      {
        id: "B",
        text: "AWS Auto Scaling",
        correct: false,
        explanation:
          "Auto Scaling decide cuántas instancias hay, pero no dirige el tráfico hacia ellas. Es el complemento del balanceador, no su reemplazo.",
      },
      {
        id: "C",
        text: "Amazon EBS",
        correct: false,
        explanation:
          "EBS es el disco de una instancia. No interviene en cómo llega el tráfico.",
      },
      {
        id: "D",
        text: "Elastic Load Balancing",
        correct: true,
        explanation:
          "Correcto. El balanceador de carga reparte las peticiones entre las instancias disponibles y deja de enviarle tráfico a la que no responde. Como puede repartir entre varias Zonas de disponibilidad, es también una pieza clave de la alta disponibilidad.",
      },
    ],
    tips: [
      "Si el escenario habla de **repartir tráfico** o de **dejar de enviar peticiones a una instancia caída**, es el balanceador de carga.",
      "El par se pregunta cruzado a propósito: Auto Scaling ajusta la cantidad, el balanceador distribuye entre las que hay.",
      "El balanceador repartiendo entre varias Zonas es lo que hace que multi-AZ funcione en la práctica.",
    ],
  },
  {
    id: "m3-q13",
    prompt:
      "Un videojuego necesita guardar el progreso de millones de jugadores. Cada partida se busca por su identificador, no se cruza información entre jugadores, y las respuestas deben llegar en milisegundos. ¿Qué base de datos corresponde?",
    options: [
      {
        id: "A",
        text: "Amazon DynamoDB",
        correct: true,
        explanation:
          "Correcto. DynamoDB es la base no relacional de AWS: guarda cada elemento con la estructura que tenga, responde en milisegundos aunque haya millones de operaciones, y es serverless, así que no hay servidor que dimensionar.",
      },
      {
        id: "B",
        text: "Amazon RDS con MySQL",
        correct: false,
        explanation:
          "Una base relacional brilla cuando hay que cruzar información entre tablas, y el escenario aclara que eso no pasa. A esta escala y con búsquedas por identificador, DynamoDB encaja mejor.",
      },
      {
        id: "C",
        text: "Amazon Redshift",
        correct: false,
        explanation:
          "Redshift es un almacén de datos para análisis: consultas complejas sobre volúmenes históricos enormes. No está pensado para responder en milisegundos a la partida de un jugador.",
      },
      {
        id: "D",
        text: "Amazon S3",
        correct: false,
        explanation:
          "S3 guarda archivos completos. Se podría guardar ahí el progreso, pero no es una base de datos ni ofrece búsquedas rápidas por identificador.",
      },
    ],
    tips: [
      "La primera decisión siempre es **relacional o no relacional**. Columnas fijas y relaciones ⇒ RDS o Aurora. Estructura flexible, milisegundos, escala masiva ⇒ DynamoDB.",
      "**DynamoDB es serverless**: si una opción propone elegirle el tamaño del servidor, desconfiá.",
      "Redshift aparece como distractor en preguntas de bases de datos, pero su terreno es el análisis histórico, no la operación diaria.",
    ],
  },
  {
    id: "m3-q14",
    prompt:
      "Una tienda en línea nota que la misma consulta de catálogo se ejecuta miles de veces por minuto contra su base de datos, siempre con el mismo resultado, y eso la está saturando. ¿Qué debería agregar?",
    options: [
      {
        id: "A",
        text: "Otra base de datos RDS igual a la actual",
        correct: false,
        explanation:
          "Duplicar la base duplica el costo y el trabajo de mantenerla sincronizada, sin atacar el problema de fondo: se sigue recalculando lo mismo una y otra vez.",
      },
      {
        id: "B",
        text: "Amazon S3",
        correct: false,
        explanation:
          "S3 guarda archivos, no resultados de consultas listos para devolver en milisegundos. No es una caché.",
      },
      {
        id: "C",
        text: "Amazon ElastiCache",
        correct: true,
        explanation:
          "Correcto. ElastiCache guarda en memoria las respuestas más pedidas y las devuelve al instante, sin que la base se entere de la consulta. Se coloca delante de la base de datos justamente para aliviarle la carga.",
      },
      {
        id: "D",
        text: "AWS Glue",
        correct: false,
        explanation:
          "Glue prepara y limpia datos para analizarlos después. No acelera consultas de una aplicación en producción.",
      },
    ],
    tips: [
      "Ante **consultas repetidas, aliviar la base de datos o reducir la latencia de lectura**, la respuesta es ElastiCache.",
      "ElastiCache es el único de la familia que **no es una base de datos** sino un acelerador que se pone delante de una.",
      "Si el escenario pidiera repartir lecturas conservando los datos completos en cada copia, la respuesta sería otra: réplicas de lectura.",
    ],
  },
  {
    id: "m3-q15",
    prompt:
      "Una empresa quiere mover su base de datos PostgreSQL desde su centro de datos hacia AWS, y no puede permitirse apagarla durante la migración. El motor de destino también será PostgreSQL. ¿Qué debe usar?",
    options: [
      {
        id: "A",
        text: "AWS Schema Conversion Tool (SCT) únicamente",
        correct: false,
        explanation:
          "SCT traduce la estructura cuando el motor de origen y el de destino son distintos. Acá los dos son PostgreSQL, así que no hay nada que convertir — y SCT por sí solo no mueve los datos.",
      },
      {
        id: "B",
        text: "AWS Database Migration Service (DMS)",
        correct: true,
        explanation:
          "Correcto. DMS copia la base hacia AWS mientras la original sigue funcionando, y va sincronizando los cambios hasta el momento del corte. Como el motor no cambia, no hace falta nada más.",
      },
      {
        id: "C",
        text: "AWS Storage Gateway",
        correct: false,
        explanation:
          "Storage Gateway conecta servidores propios con el almacenamiento de AWS, en escenarios híbridos. No migra bases de datos.",
      },
      {
        id: "D",
        text: "AWS Backup",
        correct: false,
        explanation:
          "AWS Backup centraliza las copias de seguridad de varios servicios. Una copia no es una migración con el sistema en marcha.",
      },
    ],
    tips: [
      "**DMS mueve los datos; SCT traduce la estructura.** Si el motor de origen y destino son iguales, alcanza con DMS.",
      "La frase **\"sin apagar\" o \"con mínima interrupción\"** es la firma de DMS: copia mientras el original sigue funcionando.",
      "Cuando el escenario cambia de motor (por ejemplo Oracle a PostgreSQL), ahí sí hacen falta los dos.",
    ],
  },
  {
    id: "m3-q16",
    prompt:
      "Una empresa usa una base relacional compatible con MySQL y necesita más rendimiento y que los datos queden replicados automáticamente en varias Zonas de disponibilidad, sin cambiar de tecnología. ¿Qué le conviene?",
    options: [
      {
        id: "A",
        text: "Amazon DynamoDB",
        correct: false,
        explanation:
          "DynamoDB es no relacional, así que implicaría rediseñar la aplicación. El escenario aclara que no quieren cambiar de tecnología.",
      },
      {
        id: "B",
        text: "Amazon ElastiCache",
        correct: false,
        explanation:
          "ElastiCache acelera lecturas repetidas poniéndose delante de la base, pero no es una base de datos ni replica los datos entre Zonas.",
      },
      {
        id: "C",
        text: "Amazon Redshift",
        correct: false,
        explanation:
          "Redshift es un almacén de datos para análisis, no un reemplazo de la base transaccional de una aplicación.",
      },
      {
        id: "D",
        text: "Amazon Aurora",
        correct: true,
        explanation:
          "Correcto. Aurora es la base relacional de AWS compatible con MySQL y PostgreSQL, bastante más rápida que RDS estándar y con la información replicada automáticamente en varias Zonas de disponibilidad.",
      },
    ],
    tips: [
      "**RDS vs. Aurora:** si el enunciado pide más rendimiento, replicación automática o mayor disponibilidad sin cambiar de motor, la respuesta suele ser Aurora.",
      "La palabra **compatible con MySQL o PostgreSQL** en el escenario suele ser el guiño hacia Aurora.",
      "Cuidado con las opciones que resolverían el problema cambiando de familia: si el escenario dice que no quieren rediseñar, quedan descartadas.",
    ],
  },
  {
    id: "m3-q17",
    prompt:
      "Sobre las funciones de Amazon RDS, ¿cuáles DOS afirmaciones son correctas?",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Multi-AZ mantiene una copia en otra Zona de disponibilidad que toma el control si la principal falla",
        correct: true,
        explanation:
          "Correcta. Multi-AZ existe para no caerse: la copia espera lista en otra Zona y asume sola si la principal deja de responder.",
      },
      {
        id: "B",
        text: "Multi-AZ reparte las consultas de lectura entre las dos copias para andar más rápido",
        correct: false,
        explanation:
          "No: en Multi-AZ la copia de respaldo no atiende consultas, solo espera. Repartir lecturas es el trabajo de las réplicas de lectura, y confundir ambas cosas es el error más común del tema.",
      },
      {
        id: "C",
        text: "Las réplicas de lectura sirven para recuperarse automáticamente de una falla",
        correct: false,
        explanation:
          "Las réplicas de lectura existen para repartir la carga, no para tomar el control ante una falla. Esa es la función de Multi-AZ.",
      },
      {
        id: "D",
        text: "Las réplicas de lectura permiten repartir la carga cuando muchos consultan a la vez",
        correct: true,
        explanation:
          "Correcta. Son copias adicionales que sí atienden consultas de lectura, y por eso alivian a la base principal cuando hay mucho tráfico de consulta.",
      },
      {
        id: "E",
        text: "En RDS es el cliente quien aplica los parches al motor de base de datos",
        correct: false,
        explanation:
          "En RDS los parches del sistema operativo y del motor los aplica AWS: es un servicio administrado, como vimos en el modelo de responsabilidad compartida.",
      },
    ],
    tips: [
      "La regla que resuelve casi todas estas preguntas: **Multi-AZ = disponibilidad; réplicas de lectura = rendimiento.**",
      "Se cruzan a propósito en las opciones porque las dos \"hacen copias\". Fijate para qué sirve la copia: esperar o atender.",
      "Recordá que RDS es administrado: cualquier opción que ponga los parches del motor del lado del cliente es incorrecta.",
    ],
  },
  {
    id: "m3-q18",
    prompt:
      "Un equipo de seguridad necesita bloquear expresamente el tráfico proveniente de una dirección de internet concreta, para toda una subred de la VPC. ¿Qué debe configurar?",
    options: [
      {
        id: "A",
        text: "Un security group",
        correct: false,
        explanation:
          "Un security group **solo sabe permitir**: lo que no está permitido no entra, pero no se puede escribir una regla que niegue expresamente una dirección. Además protege un recurso, no una subred entera.",
      },
      {
        id: "B",
        text: "Un rol de IAM",
        correct: false,
        explanation:
          "IAM controla qué puede hacer una identidad dentro de AWS, no qué tráfico de red entra a una subred. Son capas distintas.",
      },
      {
        id: "C",
        text: "Una lista de control de acceso de red (NACL)",
        correct: true,
        explanation:
          "Correcto. La NACL protege una subred completa y **puede negar expresamente**, que es justo lo que el security group no hace. Además no recuerda las conexiones, así que entrada y salida se controlan por separado.",
      },
      {
        id: "D",
        text: "Una puerta de enlace NAT",
        correct: false,
        explanation:
          "La NAT gateway permite que los recursos de una subred privada salgan a internet sin quedar expuestos a que entren. No filtra direcciones concretas.",
      },
    ],
    tips: [
      "**Si hay que negar algo puntual, es NACL.** El security group solo permite, y esa es la diferencia que más se pregunta.",
      "El otro atajo: security group protege **un recurso**; NACL protege **una subred**.",
      "No son alternativas: se usan las dos capas juntas, la NACL en el borde de la subred y el security group en cada recurso.",
    ],
  },
  {
    id: "m3-q19",
    prompt:
      "Una empresa transfiere grandes volúmenes de datos entre su centro de datos y AWS todos los días, y necesita que el rendimiento sea constante y previsible, sin depender de la congestión de internet. ¿Qué debe contratar?",
    options: [
      {
        id: "A",
        text: "AWS Direct Connect",
        correct: true,
        explanation:
          "Correcto. Direct Connect es un cable dedicado entre el centro de datos y AWS que no pasa por internet, así que el rendimiento no varía con la congestión. Tarda semanas en instalarse y cuesta más, pero es lo que pide el escenario.",
      },
      {
        id: "B",
        text: "AWS Site-to-Site VPN",
        correct: false,
        explanation:
          "La VPN crea un túnel cifrado, pero viaja **por internet**, así que comparte camino con todo el mundo y la velocidad varía. Es la opción rápida y barata, no la de rendimiento previsible.",
      },
      {
        id: "C",
        text: "Amazon CloudFront",
        correct: false,
        explanation:
          "CloudFront acerca contenido a los usuarios finales. No conecta la red privada de una empresa con AWS.",
      },
      {
        id: "D",
        text: "Una puerta de enlace a internet",
        correct: false,
        explanation:
          "La puerta de enlace a internet permite que una subred pública alcance internet. No es una conexión dedicada con el centro de datos de la empresa.",
      },
    ],
    tips: [
      "**Rendimiento constante, previsible o gran volumen sostenido ⇒ Direct Connect.** Rápido de activar y económico ⇒ VPN.",
      "Si el escenario menciona que **no debe pasar por internet**, es Direct Connect sin dudarlo.",
      "El tiempo de instalación es una pista: si el enunciado tiene urgencia de días, apunta a VPN aunque el volumen sea alto.",
    ],
  },
  {
    id: "m3-q20",
    prompt:
      "Al diseñar una VPC para una aplicación web con base de datos, ¿dónde conviene ubicar cada componente?",
    options: [
      {
        id: "A",
        text: "Los dos en subredes públicas, para que sean fáciles de administrar",
        correct: false,
        explanation:
          "Poner la base de datos en una subred pública la deja alcanzable desde internet, que es exactamente lo que hay que evitar. La comodidad de administración no justifica esa exposición.",
      },
      {
        id: "B",
        text: "Los dos en subredes privadas, sin acceso desde internet",
        correct: false,
        explanation:
          "Si el servidor web queda en una subred privada, los usuarios no pueden llegar a él y el sitio no funciona. La capa web necesita ser alcanzable.",
      },
      {
        id: "C",
        text: "El servidor web en una subred privada y la base de datos en una pública",
        correct: false,
        explanation:
          "Está invertido, y es la peor combinación posible: los usuarios no llegarían al sitio y en cambio la base quedaría expuesta a internet.",
      },
      {
        id: "D",
        text: "El servidor web en una subred pública y la base de datos en una privada",
        correct: true,
        explanation:
          "Correcto. La capa web va adelante, alcanzable desde internet; la base de datos va atrás, sin acceso directo desde afuera. Es uno de los patrones de diseño que más aparece en el examen.",
      },
    ],
    tips: [
      "**Web adelante, base de datos atrás.** Si una opción pone la base de datos accesible desde internet, es incorrecta por diseño.",
      "Recordá que la subred privada no queda incomunicada: con una puerta de enlace NAT puede salir a internet a buscar actualizaciones sin que nadie entre.",
      "Este patrón es una aplicación directa del menor privilegio del Módulo 2: exponer solo lo que necesita estar expuesto.",
    ],
  },
  {
    id: "m3-q21",
    prompt:
      "Una empresa quiere registrar el dominio de su nueva tienda y que, cuando alguien escriba esa dirección en el navegador, se lo dirija a los servidores correctos. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon CloudFront",
        correct: false,
        explanation:
          "CloudFront acelera la entrega guardando copias del contenido cerca del usuario, pero no traduce nombres de dominio en direcciones ni registra dominios.",
      },
      {
        id: "B",
        text: "Amazon Route 53",
        correct: true,
        explanation:
          "Correcto. Route 53 es el servicio de DNS de AWS: traduce el nombre que la gente escribe a la dirección técnica del servidor, y además permite registrar dominios.",
      },
      {
        id: "C",
        text: "AWS Direct Connect",
        correct: false,
        explanation:
          "Direct Connect es un cable dedicado entre un centro de datos y AWS. No tiene relación con nombres de dominio.",
      },
      {
        id: "D",
        text: "Una puerta de enlace NAT",
        correct: false,
        explanation:
          "La NAT gateway permite que una subred privada salga a internet. No resuelve nombres ni dirige usuarios.",
      },
    ],
    tips: [
      "**Route 53 resuelve a qué dirección ir; CloudFront resuelve desde dónde se entrega el contenido.** Los dos \"mejoran el sitio\", pero en etapas distintas.",
      "Las palabras **dominio, DNS o registrar un nombre** apuntan siempre a Route 53.",
      "Si el enunciado habla de copias de contenido cerca del usuario, cambia a CloudFront.",
    ],
  },
  {
    id: "m3-q22",
    prompt:
      "Unos servidores ubicados en una subred privada necesitan descargar actualizaciones de seguridad desde internet, pero no deben ser alcanzables desde afuera bajo ningún concepto. ¿Qué corresponde configurar?",
    options: [
      {
        id: "A",
        text: "Moverlos a una subred pública",
        correct: false,
        explanation:
          "Eso los volvería alcanzables desde internet, que es precisamente lo que el escenario prohíbe. Resolvería la descarga creando un problema mayor.",
      },
      {
        id: "B",
        text: "Una conexión Site-to-Site VPN",
        correct: false,
        explanation:
          "La VPN conecta la red de la empresa con la VPC. No es lo que da salida a internet a una subred privada.",
      },
      {
        id: "C",
        text: "Una puerta de enlace NAT",
        correct: true,
        explanation:
          "Correcto. La NAT gateway permite que los recursos de una subred privada **salgan** a internet sin permitir que nadie de afuera **entre**. Es la puerta de servicio sin picaporte del lado de la calle.",
      },
      {
        id: "D",
        text: "Una regla de NACL que permita todo el tráfico entrante",
        correct: false,
        explanation:
          "Abrir el tráfico entrante es exactamente lo contrario de lo que pide el escenario, y dejaría la subred expuesta.",
      },
    ],
    tips: [
      "**Salir sí, entrar no ⇒ puerta de enlace NAT.** Es la señal inequívoca de este tema.",
      "No confundas la puerta de enlace a internet (para subredes públicas, tráfico en los dos sentidos) con la NAT gateway (para subredes privadas, solo salida).",
      "Cuidado con las opciones que resuelven el problema exponiendo algo: casi siempre son la respuesta trampa.",
    ],
  },
  {
    id: "m3-q23",
    prompt:
      "Una empresa debe conservar registros contables por diez años por obligación legal. Casi nunca los consulta, y cuando lo hace puede esperar horas. Quiere pagar lo menos posible. ¿Qué clase de almacenamiento de S3 corresponde?",
    options: [
      {
        id: "A",
        text: "S3 Standard",
        correct: false,
        explanation:
          "Standard está pensado para datos que se usan seguido: es el más caro de guardar. Pagarlo durante diez años por algo que casi nunca se consulta sería tirar dinero.",
      },
      {
        id: "B",
        text: "S3 Glacier",
        correct: true,
        explanation:
          "Correcto. Glacier es la familia de clases para archivo histórico: muy barata de guardar a cambio de que recuperar tarde. Como el escenario acepta esperar horas, encaja perfecto.",
      },
      {
        id: "C",
        text: "Amazon EBS",
        correct: false,
        explanation:
          "EBS es el disco de una instancia, no una clase de S3. Además está atado a una Zona de disponibilidad y sale bastante más caro para archivo a largo plazo.",
      },
      {
        id: "D",
        text: "S3 Intelligent-Tiering",
        correct: false,
        explanation:
          "Intelligent-Tiering sirve cuando **no sabés** con qué frecuencia se accederá y querés que AWS decida. Acá el patrón se conoce perfectamente, así que elegir Glacier directamente es más barato.",
      },
    ],
    tips: [
      "**\"Retener por años\", \"cumplimiento normativo\" o \"casi nunca se consulta\" ⇒ Glacier.**",
      "**\"No sabemos cómo se va a usar\" ⇒ Intelligent-Tiering.** Si el patrón de acceso sí se conoce, elegir la clase a mano sale más barato.",
      "Fijate siempre si el escenario acepta esperar para recuperar: esa tolerancia es lo que habilita las clases más baratas.",
    ],
  },
  {
    id: "m3-q24",
    prompt:
      "Un equipo guarda archivos temporales de procesamiento en el instance store de sus instancias EC2. ¿Qué ocurre con esos archivos cuando la instancia se detiene?",
    options: [
      {
        id: "A",
        text: "Se conservan, igual que en un disco EBS",
        correct: false,
        explanation:
          "Justamente la diferencia con EBS es esa: EBS es persistente, el instance store no. Confundirlos es de los errores más frecuentes del tema.",
      },
      {
        id: "B",
        text: "Se mueven automáticamente a Amazon S3",
        correct: false,
        explanation:
          "AWS no mueve nada solo. Copiar a S3 antes de detener la instancia sería algo que el equipo tendría que programar.",
      },
      {
        id: "C",
        text: "Se conservan durante 30 días y después se borran",
        correct: false,
        explanation:
          "No existe ningún período de gracia. La pérdida es inmediata cuando la instancia se detiene.",
      },
      {
        id: "D",
        text: "Se pierden",
        correct: true,
        explanation:
          "Correcto. El instance store es **efímero**: está físicamente pegado al servidor y su contenido desaparece cuando la instancia se detiene. Por eso solo sirve para archivos temporales o caché, nunca para datos que haya que conservar.",
      },
    ],
    tips: [
      "**EBS es persistente; instance store es efímero.** Es una de las distinciones más preguntadas del módulo.",
      "Si una opción propone guardar datos importantes en instance store, es incorrecta siempre.",
      "El instance store existe porque es muy rápido: se elige a propósito para trabajo temporal, no por descuido.",
    ],
  },
  {
    id: "m3-q25",
    prompt:
      "Varias instancias EC2 con Linux necesitan leer y escribir sobre la misma carpeta al mismo tiempo, y esa carpeta debe seguir accesible aunque falle una Zona de disponibilidad. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "Amazon EFS",
        correct: true,
        explanation:
          "Correcto. EFS es almacenamiento de archivos para Linux: una carpeta compartida que muchos servidores montan a la vez, accesible desde varias Zonas de disponibilidad y que crece y se achica sola.",
      },
      {
        id: "B",
        text: "Un volumen de Amazon EBS compartido entre todas",
        correct: false,
        explanation:
          "Un volumen EBS se conecta normalmente a una sola instancia y vive en una única Zona de disponibilidad, así que falla en los dos requisitos del escenario.",
      },
      {
        id: "C",
        text: "Amazon FSx for Windows File Server",
        correct: false,
        explanation:
          "FSx for Windows resuelve el mismo problema pero para entornos Windows. El escenario dice Linux expresamente.",
      },
      {
        id: "D",
        text: "El instance store de cada instancia",
        correct: false,
        explanation:
          "El instance store es local a cada instancia y además efímero: cada una tendría su propia copia y se perdería al detenerse. No hay nada compartido.",
      },
    ],
    tips: [
      "**La pregunta clave del almacenamiento es cuántos acceden a la vez.** Uno ⇒ EBS. Muchos sobre la misma carpeta ⇒ EFS o FSx. Archivos sueltos desde cualquier lado ⇒ S3.",
      "**EFS es Linux; FSx es Windows.** Buscá el sistema operativo en el enunciado, suele estar dicho explícitamente.",
      "El requisito de sobrevivir a la caída de una Zona descarta EBS por sí solo, sin necesidad de pensar en lo demás.",
    ],
  },
  {
    id: "m3-q26",
    prompt:
      "Una empresa quiere que sus archivos de S3 pasen a una clase más barata a los 30 días y se archiven en Glacier al año, sin que nadie tenga que intervenir. ¿Qué debe configurar?",
    options: [
      {
        id: "A",
        text: "Una tarea programada que mueva los archivos cada mes",
        correct: false,
        explanation:
          "Habría que construirla, mantenerla y vigilar que no falle. S3 ya ofrece esto de fábrica, así que escribir código propio es trabajo innecesario.",
      },
      {
        id: "B",
        text: "Una política de ciclo de vida de S3",
        correct: true,
        explanation:
          "Correcto. Se escribe la regla una sola vez —a los 30 días a una clase más barata, al año a Glacier— y S3 la aplica sola de ahí en adelante, sin que nadie tenga que acordarse.",
      },
      {
        id: "C",
        text: "Activar el versionado del bucket",
        correct: false,
        explanation:
          "El versionado conserva las versiones anteriores de un archivo para protegerte de borrados accidentales. No mueve nada entre clases de almacenamiento.",
      },
      {
        id: "D",
        text: "AWS Backup",
        correct: false,
        explanation:
          "AWS Backup centraliza las copias de seguridad de varios servicios. Es otra cosa: hacer copias, no cambiar de clase los archivos que ya tenés.",
      },
    ],
    tips: [
      "Ante **mover datos entre clases automáticamente según su antigüedad**, la respuesta es política de ciclo de vida.",
      "Si una opción propone programar a mano algo que un servicio ya hace solo, casi siempre es incorrecta.",
      "No mezcles las tres funciones de S3 que suenan parecido: clases (dónde se guarda), ciclo de vida (cuándo se muda) y versionado (protección contra borrado).",
    ],
  },
  {
    id: "m3-q27",
    prompt:
      "Sobre Amazon EBS, ¿cuáles DOS afirmaciones son correctas?",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Su contenido se borra cuando la instancia se detiene",
        correct: false,
        explanation:
          "Eso describe al instance store, no a EBS. EBS conserva lo que guardaste después de apagar y encender la instancia.",
      },
      {
        id: "B",
        text: "Es almacenamiento persistente: los datos sobreviven al apagado de la instancia",
        correct: true,
        explanation:
          "Correcta. Es la característica que lo distingue del instance store y la razón por la que se usa para el sistema operativo y los datos de un servidor.",
      },
      {
        id: "C",
        text: "Es accesible simultáneamente desde cualquier Región de AWS",
        correct: false,
        explanation:
          "Al contrario: un volumen EBS vive dentro de una única Zona de disponibilidad. Ni siquiera cruza Zonas, mucho menos Regiones.",
      },
      {
        id: "D",
        text: "Reemplaza a S3 para guardar archivos accesibles desde internet",
        correct: false,
        explanation:
          "Son cosas distintas: EBS es el disco de una instancia y S3 guarda objetos accesibles desde cualquier lado. No compiten.",
      },
      {
        id: "E",
        text: "Se le pueden sacar instantáneas que se guardan en S3",
        correct: true,
        explanation:
          "Correcta. Las instantáneas se almacenan en S3 y sirven tanto de respaldo como para recrear el volumen en otra Zona de disponibilidad.",
      },
    ],
    tips: [
      "Las dos características de EBS que más se preguntan: **es persistente** y **vive en una sola Zona de disponibilidad**.",
      "Las instantáneas son la forma de sacar un volumen EBS de su Zona: si el escenario quiere sobrevivir a la caída de una, ahí está la vía.",
      "En preguntas de respuesta múltiple, descartá primero las opciones que describen **otro** servicio: suele quedar clarísimo.",
    ],
  },
  {
    id: "m3-q28",
    prompt:
      "Una aseguradora recibe miles de formularios en papel escaneados y necesita extraer automáticamente los datos de cada campo para cargarlos en su sistema. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "Amazon Rekognition",
        correct: false,
        explanation:
          "Rekognition analiza imágenes para decir **qué hay** en ellas: objetos, caras, escenas. Acá no hace falta saber qué muestra la foto, sino leer lo que dice el documento.",
      },
      {
        id: "B",
        text: "Amazon Polly",
        correct: false,
        explanation:
          "Polly convierte texto en voz hablada. Va en la dirección contraria a lo que pide el escenario.",
      },
      {
        id: "C",
        text: "Amazon Textract",
        correct: true,
        explanation:
          "Correcto. Textract extrae el texto y los datos estructurados de documentos escaneados, que es exactamente el problema de los formularios en papel.",
      },
      {
        id: "D",
        text: "Amazon SageMaker AI",
        correct: false,
        explanation:
          "SageMaker AI serviría para entrenar un modelo propio, pero leer documentos es un problema común que AWS ya resolvió. Entrenar desde cero sería mucho más caro y lento sin ninguna ventaja.",
      },
    ],
    tips: [
      "**Rekognition responde qué hay en la imagen; Textract responde qué dice el documento.** El examen los cruza a propósito.",
      "La primera decisión de IA es **¿problema común o propio del negocio?** Si es común, hay un servicio ya entrenado y SageMaker queda descartado.",
      "Transcribe y Polly también son un par invertido: audio a texto y texto a audio. Leé en qué dirección va el escenario.",
    ],
  },
  {
    id: "m3-q29",
    prompt:
      "Una plataforma de pagos necesita analizar las transacciones a medida que ocurren para detectar fraudes en el momento, no al día siguiente. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "Amazon Kinesis",
        correct: true,
        explanation:
          "Correcto. Kinesis procesa la información a medida que llega, en vez de esperar a juntar un lote. Es la respuesta cuando el valor está en reaccionar en el momento.",
      },
      {
        id: "B",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Athena consulta archivos ya guardados en S3. Sirve para análisis histórico, no para reaccionar a algo que está ocurriendo ahora.",
      },
      {
        id: "C",
        text: "Amazon QuickSight",
        correct: false,
        explanation:
          "QuickSight arma tableros y gráficos sobre datos ya procesados. Muestra resultados, no los detecta en tiempo real.",
      },
      {
        id: "D",
        text: "AWS Glue",
        correct: false,
        explanation:
          "Glue prepara y limpia los datos antes de analizarlos. Es una etapa previa, no el análisis en el momento.",
      },
    ],
    tips: [
      "**Tiempo real, transmisión continua o \"a medida que llega\" ⇒ Kinesis.** Análisis histórico sobre lo ya guardado ⇒ Athena o Redshift.",
      "Fijate en el momento en que hace falta la respuesta: si esperar al día siguiente sirviera, la respuesta sería otra.",
      "Glue y QuickSight suelen aparecer como distractores porque son de la misma familia, pero ocupan etapas distintas del recorrido de los datos.",
    ],
  },
  {
    id: "m3-q30",
    prompt:
      "Un analista quiere hacer consultas sobre archivos que ya están guardados en Amazon S3, sin tener que cargarlos previamente en ninguna base de datos ni mover nada. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon RDS",
        correct: false,
        explanation:
          "RDS es una base de datos relacional: habría que cargar los datos en ella antes de consultarlos, que es justo lo que el escenario quiere evitar.",
      },
      {
        id: "B",
        text: "Amazon Redshift",
        correct: false,
        explanation:
          "Redshift es un almacén de datos potentísimo para consultas complejas, pero normalmente implica cargar la información en él. Es la opción cuando el volumen y la complejidad lo justifican, no cuando se pide no mover nada.",
      },
      {
        id: "C",
        text: "Amazon ElastiCache",
        correct: false,
        explanation:
          "ElastiCache guarda en memoria respuestas repetidas para devolverlas rápido. No consulta archivos de S3.",
      },
      {
        id: "D",
        text: "Amazon Athena",
        correct: true,
        explanation:
          "Correcto. Athena consulta directamente los archivos que están en S3, sin cargarlos ni transformarlos antes. Es entrar al depósito y contar las cajas ahí mismo.",
      },
    ],
    tips: [
      "**Athena consulta sobre S3 sin mover nada; Redshift requiere cargar los datos en su almacén.** Si el enunciado insiste en no mover ni transformar, es Athena.",
      "Muchas empresas guardan todo en S3 y analizan desde ahí: a ese patrón se lo llama lago de datos, y explica por qué varios servicios trabajan directamente sobre S3.",
      "Si el escenario hablara de consultas muy complejas sobre volúmenes enormes de forma habitual, ahí sí Redshift ganaría terreno.",
    ],
  },
  {
    id: "m3-q31",
    prompt:
      "Una empresa quiere construir una aplicación que redacte resúmenes y responda preguntas en lenguaje natural, aprovechando modelos de IA generativa ya entrenados y sin administrar infraestructura. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "Amazon Comprehend",
        correct: false,
        explanation:
          "Comprehend analiza texto existente: detecta de qué habla o si el tono es positivo. No genera contenido nuevo.",
      },
      {
        id: "B",
        text: "Amazon Bedrock",
        correct: true,
        explanation:
          "Correcto. Bedrock permite construir aplicaciones sobre modelos de IA generativa ya entrenados, de AWS y de otras empresas, sin administrar infraestructura. Es la opción cuando hay que **crear** contenido en vez de clasificarlo.",
      },
      {
        id: "C",
        text: "Amazon SageMaker AI",
        correct: false,
        explanation:
          "SageMaker AI es para entrenar un modelo propio con tus datos. El escenario dice expresamente que quieren aprovechar modelos ya entrenados, así que sería mucho más trabajo del necesario.",
      },
      {
        id: "D",
        text: "Amazon Kendra",
        correct: false,
        explanation:
          "Kendra busca dentro de los documentos de la empresa y devuelve lo que encuentra. Recupera información existente, no redacta contenido nuevo.",
      },
    ],
    tips: [
      "La escala de decisión en IA: **problema común ⇒ servicio ya entrenado; generar contenido nuevo ⇒ Bedrock; modelo propio con datos propios ⇒ SageMaker AI.**",
      "La palabra **generar, redactar o crear** distingue a Bedrock de los servicios que solo analizan lo que ya existe.",
      "Comprehend y Kendra son buenos distractores porque también trabajan con texto, pero ninguno produce contenido nuevo.",
    ],
  },
  {
    id: "m3-q32",
    prompt:
      "En una tienda en línea, el sistema de pedidos le pasa trabajo al de depósito. Cuando el depósito se cae, las compras fallan enteras. La empresa quiere que un fallo del depósito deje de arrastrar al resto. ¿Qué debe incorporar?",
    options: [
      {
        id: "A",
        text: "Una cola de Amazon SQS entre los dos sistemas",
        correct: true,
        explanation:
          "Correcto. Con una cola en el medio, el sistema de pedidos deja el trabajo en la fila y sigue; el depósito lo retira cuando puede. Si se cae una hora, los pedidos se acumulan en vez de perderse: los dos quedan desacoplados.",
      },
      {
        id: "B",
        text: "Un balanceador de carga delante del depósito",
        correct: false,
        explanation:
          "El balanceador reparte tráfico entre varias instancias sanas, pero si el sistema de depósito entero está caído no hay entre quiénes repartir. No resuelve el acoplamiento.",
      },
      {
        id: "C",
        text: "Aumentar el tamaño de las instancias del depósito",
        correct: false,
        explanation:
          "Instancias más grandes ayudan con la carga, no con la dependencia. Si el depósito se cae por cualquier otro motivo, el problema vuelve igual.",
      },
      {
        id: "D",
        text: "Amazon CloudFront delante de la tienda",
        correct: false,
        explanation:
          "CloudFront acelera la entrega de contenido a los usuarios. No tiene nada que ver con cómo se comunican dos sistemas internos entre sí.",
      },
    ],
    tips: [
      "Las palabras **desacoplar, que no se pierdan los mensajes o que una falla no afecte al resto** apuntan a SQS. Es el ejemplo canónico de arquitectura desacoplada.",
      "La cola tiene un segundo beneficio que también se pregunta: **absorbe los picos**, porque el trabajo se apila en la fila en vez de golpear de lleno.",
      "En SQS cada mensaje lo retira **un solo** consumidor y después desaparece. Si el escenario quisiera avisarle a varios, sería SNS.",
    ],
  },
  {
    id: "m3-q33",
    prompt:
      "Cuando se confirma un pedido, la empresa necesita avisar al mismo tiempo al sistema de facturación, al de depósito y al cliente por correo, con un único mensaje. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "Amazon SQS",
        correct: false,
        explanation:
          "En una cola SQS cada mensaje lo retira **un solo** consumidor y después desaparece. Habría que crear una cola por destinatario, cuando existe un servicio pensado justo para esto.",
      },
      {
        id: "B",
        text: "Amazon Connect",
        correct: false,
        explanation:
          "Connect es un centro de contacto telefónico en la nube. El nombre engaña: no sirve para conectar sistemas entre sí.",
      },
      {
        id: "C",
        text: "Amazon SNS",
        correct: true,
        explanation:
          "Correcto. SNS es la cartelera: publicás un mensaje en un tema y **todos los suscriptos lo reciben** a la vez, ya sean otros sistemas, un correo o un mensaje de texto.",
      },
      {
        id: "D",
        text: "Amazon EBS",
        correct: false,
        explanation:
          "EBS es el disco de una instancia. No tiene ninguna función de mensajería.",
      },
    ],
    tips: [
      "**Un mensaje que uno procesa ⇒ SQS. Un aviso que muchos reciben ⇒ SNS.** Es la comparación estrella de este tema.",
      "Si el enunciado usa la palabra **notificar**, casi siempre es SNS.",
      "Ojo con SES: también envía, pero correo con formato a clientes. SNS avisa que algo pasó; SES manda la factura.",
    ],
  },
  {
    id: "m3-q34",
    prompt:
      "Una empresa contrata personal temporal que trabaja desde sus propias computadoras, y necesita darles un escritorio corporativo completo sin que la información quede guardada en esos equipos. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "Amazon AppStream 2.0",
        correct: false,
        explanation:
          "AppStream entrega **una aplicación puntual** por el navegador, no un escritorio completo. Resolvería el caso solo si necesitaran un único programa.",
      },
      {
        id: "B",
        text: "Amazon EC2",
        correct: false,
        explanation:
          "EC2 da servidores virtuales, no escritorios preparados para que una persona trabaje. Habría que construir toda la experiencia de escritorio a mano.",
      },
      {
        id: "C",
        text: "AWS Elastic Beanstalk",
        correct: false,
        explanation:
          "Beanstalk despliega aplicaciones creando la infraestructura por debajo. No tiene relación con entregar escritorios a personas.",
      },
      {
        id: "D",
        text: "Amazon WorkSpaces",
        correct: true,
        explanation:
          "Correcto. WorkSpaces entrega un escritorio virtual completo que corre en AWS y al que la persona se conecta desde cualquier dispositivo. Como todo se ejecuta en AWS, en la computadora del empleado no queda información guardada.",
      },
    ],
    tips: [
      "**WorkSpaces = escritorio completo; AppStream 2.0 = una sola aplicación por navegador.** Buscá en el enunciado si piden el escritorio entero o un programa puntual.",
      "El argumento de que **los datos no quedan en el equipo del usuario** es el que más aparece en escenarios de escritorios virtuales: lo que viaja es la imagen de la pantalla.",
      "Personal temporal, trabajo remoto y equipos propios de los empleados son señales típicas de esta familia.",
    ],
  },
  {
    id: "m3-q35",
    prompt:
      "Un equipo quiere automatizar el camino desde que el código se escribe hasta que llega a los servidores. ¿Cuáles DOS servicios cumplen esa función?",
    multiple: true,
    options: [
      {
        id: "A",
        text: "AWS CodeBuild",
        correct: true,
        explanation:
          "Correcta. CodeBuild compila el código y corre las pruebas automáticas, que es una de las etapas del camino hacia producción.",
      },
      {
        id: "B",
        text: "Amazon Rekognition",
        correct: false,
        explanation:
          "Rekognition analiza imágenes y videos. No tiene ninguna relación con publicar software.",
      },
      {
        id: "C",
        text: "Amazon Route 53",
        correct: false,
        explanation:
          "Route 53 traduce nombres de dominio en direcciones. Es un servicio de red, no de despliegue de aplicaciones.",
      },
      {
        id: "D",
        text: "AWS CodeDeploy",
        correct: true,
        explanation:
          "Correcta. CodeDeploy instala la versión nueva en los servidores, que es la última etapa del recorrido.",
      },
      {
        id: "E",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Athena consulta archivos guardados en S3. Pertenece a la familia de analítica, no a la de desarrollo.",
      },
    ],
    tips: [
      "La familia **Code** se pregunta en bloque: CodePipeline ordena la secuencia, CodeBuild compila y prueba, CodeDeploy instala, CodeArtifact guarda las dependencias.",
      "Si el escenario pide **orquestar todo el proceso** y no una etapa, la respuesta es CodePipeline.",
      "El beneficio de fondo es el mismo que el de la infraestructura como código: lo que está escrito se repite igual siempre, sin depender de quién esté de turno.",
    ],
  },
];
