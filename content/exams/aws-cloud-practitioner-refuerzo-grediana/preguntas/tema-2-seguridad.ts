import type { ExamQuestionWithTopic } from "../../types";

/**
 * Dominio 2 — Seguridad y cumplimiento. Quince preguntas, tres por cada fallo:
 *
 *   - sim-d2-q01 (eligió AWS; el parche del SO de EC2 es del cliente): q01–q03
 *   - sim-d2-q04 (eligió el cifrado en reposo como responsabilidad de AWS): q04–q06
 *   - sim-d2-q16 (eligió Inspector; era AWS WAF): q07–q09
 *   - sim-d2-q18 (eligió GuardDuty; era Macie): q10–q12
 *   - sim-d2-q19 (acertó Trusted Advisor y eligió CloudTrail en lugar de Security Hub): q13–q15
 */
export const TEMA_2_SEGURIDAD: ExamQuestionWithTopic[] = [
  {
    id: "ref-gr-d2-q01",
    topic: "2",
    prompt:
      "Una empresa mueve su base de datos PostgreSQL desde una instancia EC2 administrada por su equipo a Amazon RDS for PostgreSQL. Después de la migración, ¿quién aplica los parches del sistema operativo y del motor de base de datos?",
    options: [
      {
        id: "A",
        text: "El cliente, igual que cuando la base corría en EC2",
        correct: false,
        explanation:
          "En EC2 el cliente administra el sistema operativo invitado, así que parchearlo (y parchear el motor de base de datos que instaló) es su responsabilidad. Es la regla correcta para EC2, y por eso tienta aplicarla acá. Pero RDS es un servicio administrado: el cliente ya no tiene acceso al sistema operativo del servidor, y quien no puede entrar al servidor no puede parchearlo.",
      },
      {
        id: "B",
        text: "AWS, dentro de la ventana de mantenimiento que configura el cliente",
        correct: true,
        explanation:
          "Correcta. En RDS, AWS parchea el sistema operativo y el motor. Lo que el cliente conserva es elegir cuándo (la ventana de mantenimiento) y todo lo de adentro de la base: usuarios, permisos, datos y el acceso de red.",
      },
      {
        id: "C",
        text: "El cliente, conectándose por SSH a la instancia de RDS",
        correct: false,
        explanation:
          "SSH es el protocolo para entrar a la consola de un servidor y administrarlo, que es como se parchea una instancia EC2. Suena a cómo se haría en EC2, pero en RDS no existe esa posibilidad: el servicio no da acceso SSH al servidor subyacente. Justamente porque el cliente no puede entrar, la responsabilidad de parchear pasa a AWS.",
      },
      {
        id: "D",
        text: "Depende de si el cliente contrató el plan de soporte Business",
        correct: false,
        explanation:
          "Los planes de soporte (Basic, Developer, Business, Enterprise On-Ramp, Enterprise) definen cuánta ayuda técnica recibe el cliente, por qué canales y con qué tiempos de respuesta. No cambian cómo se reparten las responsabilidades: el modelo de responsabilidad compartida es el mismo con cualquier plan.",
      },
    ],
    tips: [
      "La regla que decide quién parchea: si el cliente tiene acceso al sistema operativo (EC2), es suyo; si el servicio es administrado (RDS, Lambda, DynamoDB), es de AWS.",
      "Cuanto más administrado es el servicio, más se corre la línea hacia AWS. Lo que nunca se corre: los datos, los permisos y la configuración de acceso.",
    ],
  },
  {
    id: "ref-gr-d2-q02",
    topic: "2",
    prompt:
      "Un equipo procesa pedidos con funciones AWS Lambda escritas en Python que usan varias bibliotecas de terceros. Se descubre una vulnerabilidad en una de esas bibliotecas. Según el modelo de responsabilidad compartida, ¿qué le corresponde al cliente?",
    options: [
      {
        id: "A",
        text: "Parchear el sistema operativo de los servidores donde corren las funciones",
        correct: false,
        explanation:
          "Parchear el sistema operativo de los servidores es responsabilidad del cliente cuando él administra esos servidores, como en EC2. Por eso aparece. En Lambda el cliente nunca ve esos servidores: el sistema operativo y el entorno de ejecución los mantiene AWS.",
      },
      {
        id: "B",
        text: "Nada: en un servicio sin servidor toda la seguridad es responsabilidad de AWS",
        correct: false,
        explanation:
          "Sin servidor (serverless) significa que AWS administra la infraestructura, el sistema operativo y el entorno de ejecución, y el cliente solo sube su código. Es la sobrecorrección típica después de aprender que AWS administra mucho en Lambda. Pero 'sin servidor' no significa 'sin responsabilidad': el código que sube el cliente, y las bibliotecas que ese código importa, siguen siendo suyos.",
      },
      {
        id: "C",
        text: "Actualizar la biblioteca vulnerable en el código de la función y volver a desplegarla",
        correct: true,
        explanation:
          "Correcta. En Lambda, AWS se ocupa de la infraestructura, el sistema operativo y el runtime administrado; el cliente es responsable de su código y de las dependencias que empaqueta con él.",
      },
      {
        id: "D",
        text: "Pedirle a AWS Support que actualice la biblioteca dentro del entorno de ejecución",
        correct: false,
        explanation:
          "AWS Support es la ayuda técnica de AWS: responde consultas, orienta y ayuda a diagnosticar, pero no modifica el código del cliente. Tienta porque el runtime de Lambda sí lo actualiza AWS. Pero una biblioteca de terceros empaquetada con la función no es parte del runtime: es parte del código del cliente.",
      },
    ],
    tips: [
      "En cualquier servicio, el código y los datos que sube el cliente son del cliente. Lo que cambia entre EC2 y Lambda es quién cuida lo que está debajo del código.",
      "Runtime administrado: AWS. Dependencias que vos empaquetás: vos.",
    ],
  },
  {
    id: "ref-gr-d2-q03",
    topic: "2",
    multiple: true,
    prompt:
      "Una empresa corre su aplicación en instancias Amazon EC2. ¿Cuáles DOS tareas son responsabilidad del cliente según el modelo de responsabilidad compartida? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Actualizar el hipervisor que separa las instancias de distintos clientes",
        correct: false,
        explanation:
          "El hipervisor es la capa de virtualización que divide un servidor físico en varias instancias y aísla a un cliente de otro. Está en el mismo servidor que la instancia, y por eso parece 'cerca' del cliente. Pero es software de AWS: el cliente no tiene acceso a él, y mantenerlo es responsabilidad de AWS.",
      },
      {
        id: "B",
        text: "Instalar los parches de seguridad del sistema operativo invitado",
        correct: true,
        explanation:
          "Correcta. En EC2 el sistema operativo invitado es del cliente desde que lanza la instancia: AWS no entra a la máquina a parchearla, aunque ofrezca herramientas como Systems Manager para automatizarlo.",
      },
      {
        id: "C",
        text: "Reemplazar los discos físicos que fallan en el centro de datos",
        correct: false,
        explanation:
          "Los discos físicos del centro de datos son el hardware donde se guardan, entre otros, los volúmenes de los clientes. Los datos del cliente están en esos discos, y eso hace que parezca que el cliente tiene algo que decir. Pero el hardware físico es siempre de AWS, en cualquier servicio.",
      },
      {
        id: "D",
        text: "Definir las reglas de los grupos de seguridad que filtran el tráfico de las instancias",
        correct: true,
        explanation:
          "Correcta. AWS provee el grupo de seguridad como herramienta, pero qué puertos se abren y a quién es configuración del cliente. Un puerto abierto al mundo es un error del cliente, no de AWS.",
      },
      {
        id: "E",
        text: "Aplicar las actualizaciones del motor de Amazon DynamoDB que usa la aplicación",
        correct: false,
        explanation:
          "Amazon DynamoDB es una base de datos NoSQL clave-valor totalmente administrada: no hay servidores ni motor visibles para el cliente. La aplicación sí la usa, por eso aparece. Pero como el cliente no ve ningún motor que actualizar, esa tarea es de AWS.",
      },
    ],
    tips: [
      "AWS provee la herramienta (grupo de seguridad, KMS, IAM); el cliente decide cómo se configura. La configuración es siempre del cliente.",
      "Hardware, hipervisor y la infraestructura física son de AWS en todos los servicios, sin excepción.",
    ],
  },
  {
    id: "ref-gr-d2-q04",
    topic: "2",
    prompt:
      "Amazon S3 cifra por defecto todos los objetos nuevos con claves que administra el propio servicio. Una empresa que guarda allí historias clínicas debe cumplir una norma que exige controlar quién puede usar la clave de cifrado y auditar cada uso. Según el modelo de responsabilidad compartida, ¿de quién es esa responsabilidad?",
    options: [
      {
        id: "A",
        text: "Del cliente, que debe elegir el tipo de cifrado y administrar quién usa la clave",
        correct: true,
        explanation:
          "Correcta. Que S3 cifre por defecto no traslada la responsabilidad sobre los datos. Elegir una clave de AWS KMS administrada por el cliente, definir su política de acceso y auditar sus usos con CloudTrail son decisiones del cliente.",
      },
      {
        id: "B",
        text: "De AWS, porque S3 ya cifra los objetos sin que el cliente haga nada",
        correct: false,
        explanation:
          "El cifrado por defecto de S3 (SSE-S3) cifra todos los objetos nuevos con claves que crea y administra el propio servicio, sin que el cliente haga nada. Es la trampa central: como existe, parece que el tema quedó en manos de AWS. Pero no da control sobre quién usa la clave ni un registro de cada uso, que es lo que exige la norma. Proteger los datos sigue siendo del cliente.",
      },
      {
        id: "C",
        text: "De AWS, siempre que el cliente use AWS KMS",
        correct: false,
        explanation:
          "AWS KMS es el servicio para crear y administrar claves de cifrado: cada clave tiene una política que define quién puede usarla, y cada uso queda registrado en CloudTrail. AWS es responsable del hardware y del servicio. Pero la política de la clave, quién puede usarla y cuándo rotarla son configuración del cliente: usar un servicio de AWS no le transfiere la decisión.",
      },
      {
        id: "D",
        text: "De nadie: con el cifrado por defecto ya no queda ninguna decisión que tomar",
        correct: false,
        explanation:
          "Esta opción parte de la idea de que el cifrado por defecto resuelve todo lo que hay que decidir sobre los datos. Resuelve 'que los datos estén cifrados', pero la norma pide algo más: control y auditoría de la clave. Esa decisión existe y es del cliente.",
      },
    ],
    tips: [
      "Que un servicio cifre por defecto no cambia de quién son los datos. La protección de los datos del cliente es siempre del cliente.",
      "Si el enunciado habla de quién puede usar la clave o de auditar sus usos, habla de una configuración, y la configuración es del cliente.",
    ],
  },
  {
    id: "ref-gr-d2-q05",
    topic: "2",
    prompt:
      "Según el modelo de responsabilidad compartida de AWS, ¿cuál de estas tareas le corresponde a AWS?",
    options: [
      {
        id: "A",
        text: "Configurar TLS entre los navegadores de los usuarios y el balanceador de carga",
        correct: false,
        explanation:
          "TLS es el protocolo que cifra el tráfico entre el navegador y el servidor (lo que hace que una URL sea HTTPS); en AWS se configura con un certificado de ACM en el listener del balanceador. Suena a algo técnico de infraestructura, y la infraestructura es de AWS. Pero instalar el certificado y exigir HTTPS es configuración del cliente: AWS da la herramienta y el cliente decide usarla.",
      },
      {
        id: "B",
        text: "Activar la autenticación multifactor en el usuario raíz de la cuenta",
        correct: false,
        explanation:
          "La autenticación multifactor (MFA) pide un segundo factor, como un código del celular, además de la contraseña; el usuario raíz es la identidad con control total de la cuenta. Activarla es la primera recomendación de seguridad que hace AWS, y por eso se asocia con AWS. Pero las identidades y sus credenciales son siempre del cliente.",
      },
      {
        id: "C",
        text: "Definir las listas de control de acceso de red de las subredes de la VPC",
        correct: false,
        explanation:
          "Una NACL (lista de control de acceso de red) es un filtro sin estado que permite o deniega tráfico por IP y puerto a nivel de subred. La red física es de AWS, y una NACL suena a red. Pero la NACL es una regla que el cliente escribe dentro de su VPC: es configuración, no infraestructura.",
      },
      {
        id: "D",
        text: "Destruir de forma segura los discos de almacenamiento al final de su vida útil",
        correct: true,
        explanation:
          "Correcta. El hardware físico, desde que entra al centro de datos hasta que se destruye, es de AWS. Eso incluye borrar y destruir los discos de forma que los datos que tuvieron no se puedan recuperar.",
      },
    ],
    tips: [
      "Cuando dudes, preguntá si la tarea se hace desde la consola o la API. Si el cliente la puede hacer ahí, es del cliente. Si requiere estar dentro del centro de datos, es de AWS.",
      "Cifrado en tránsito, cifrado en reposo, MFA, NACL, grupos de seguridad: todos son configuraciones, y todas son del cliente.",
    ],
  },
  {
    id: "ref-gr-d2-q06",
    topic: "2",
    multiple: true,
    prompt:
      "Una empresa guarda datos de clientes en Amazon S3 y en Amazon RDS, y los cifra con claves de AWS KMS. ¿Cuáles DOS responsabilidades son del cliente? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Proteger los módulos de hardware donde AWS KMS guarda el material de las claves",
        correct: false,
        explanation:
          "Los módulos de hardware de KMS (HSM) son los equipos físicos, endurecidos, donde se guarda y se usa el material criptográfico de las claves. Tienta porque las claves son del cliente, y parecería que todo lo que las rodea también. Pero ese hardware es infraestructura de AWS: el cliente usa las claves, no administra los equipos.",
      },
      {
        id: "B",
        text: "Mantener la red global que conecta las regiones de AWS",
        correct: false,
        explanation:
          "La red global de AWS es la red privada de fibra que conecta regiones, zonas de disponibilidad y ubicaciones de borde. Los datos del cliente pueden viajar por ella, y eso la acerca al tema. Pero es infraestructura de AWS en cualquier servicio.",
      },
      {
        id: "C",
        text: "Escribir las políticas que definen qué usuarios y roles pueden usar cada clave",
        correct: true,
        explanation:
          "Correcta. KMS ofrece las claves, pero quién puede usarlas lo decide el cliente con la política de la clave y con IAM. Una clave que cualquiera puede usar no protege nada, y ese error es del cliente.",
      },
      {
        id: "D",
        text: "Garantizar la seguridad física de las ubicaciones de borde de Amazon CloudFront",
        correct: false,
        explanation:
          "Las ubicaciones de borde de CloudFront son los centros de datos repartidos por el mundo donde se cachea contenido cerca de los usuarios. Sirven contenido del cliente, y por eso aparecen acá. Pero son instalaciones físicas de AWS, y la seguridad física es siempre de AWS.",
      },
      {
        id: "E",
        text: "Clasificar qué datos son sensibles y decidir cuáles se cifran",
        correct: true,
        explanation:
          "Correcta. Saber qué datos se tienen, cuáles son sensibles y qué protección necesita cada uno es la base de la responsabilidad del cliente sobre sus datos.",
      },
    ],
    tips: [
      "AWS es responsable de la seguridad de la nube (hardware, instalaciones, red global). El cliente, de la seguridad en la nube (datos, identidades, configuración).",
      "Las claves las guarda AWS; quién las usa lo decide el cliente.",
    ],
  },
  {
    id: "ref-gr-d2-q07",
    topic: "2",
    prompt:
      "Una tienda en línea ve miles de intentos de inicio de sesión por minuto desde unas pocas direcciones IP, y además quiere bloquear todo el tráfico que llega desde países donde no vende. Necesita reglas que miren cada solicitud HTTP antes de que llegue a la aplicación. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "AWS Shield Standard",
        correct: false,
        explanation:
          "AWS Shield Standard es la protección contra DDoS que AWS aplica gratis y en forma automática a todos los clientes, frente a ataques de red y transporte (capas 3 y 4). Muchas solicitudes por minuto suena a DDoS, y por eso tienta. Pero no tiene reglas propias: no puede limitar intentos de login por IP ni filtrar por país.",
      },
      {
        id: "B",
        text: "Una lista de control de acceso de red (NACL)",
        correct: false,
        explanation:
          "Una NACL es un filtro sin estado a nivel de subred que permite o deniega tráfico según IP, puerto y protocolo. Puede bloquear direcciones IP, por eso parece servir para la primera necesidad. Pero no entiende solicitudes HTTP, no cuenta solicitudes por minuto y no sabe de qué país viene una IP.",
      },
      {
        id: "C",
        text: "AWS WAF",
        correct: true,
        explanation:
          "Correcta. AWS WAF es un firewall de aplicaciones web: inspecciona cada solicitud HTTP y permite reglas propias, entre ellas reglas basadas en frecuencia (limitar solicitudes por IP) y por origen geográfico. Se asocia a CloudFront, a un balanceador de aplicaciones o a API Gateway.",
      },
      {
        id: "D",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "Amazon GuardDuty es el servicio de detección de amenazas: analiza CloudTrail, los registros de flujo de la VPC y el DNS para encontrar actividad maliciosa y genera hallazgos. Podría detectar un patrón sospechoso, y por eso tienta. Pero detecta y avisa: no bloquea solicitudes ni permite escribir reglas de filtrado.",
      },
    ],
    tips: [
      "Filtrar solicitudes HTTP con reglas propias (frecuencia, país, inyección SQL, XSS) es AWS WAF.",
      "Detectar no es bloquear: GuardDuty e Inspector avisan; WAF, grupos de seguridad y NACL filtran.",
    ],
  },
  {
    id: "ref-gr-d2-q08",
    topic: "2",
    prompt:
      "Un equipo quiere saber, de forma continua, si sus instancias EC2 y las imágenes de contenedor que guarda en Amazon ECR tienen paquetes de software con vulnerabilidades conocidas (CVE). ¿Qué servicio está pensado para eso?",
    options: [
      {
        id: "A",
        text: "Amazon Inspector",
        correct: true,
        explanation:
          "Correcta. Inspector escanea instancias EC2, imágenes en ECR y funciones Lambda en busca de vulnerabilidades de software conocidas y exposición de red no intencional, y vuelve a escanear cuando aparece una CVE nueva.",
      },
      {
        id: "B",
        text: "AWS WAF",
        correct: false,
        explanation:
          "AWS WAF es un firewall de aplicaciones web: inspecciona cada solicitud HTTP que llega a CloudFront, un balanceador o API Gateway y la bloquea según reglas (inyección SQL, XSS, IP, país, límite de solicitudes). Se asocia con 'vulnerabilidades' porque frena ataques que las explotan. Pero filtra solicitudes que llegan; no revisa qué paquetes tiene instalados una instancia.",
      },
      {
        id: "C",
        text: "Amazon Macie",
        correct: false,
        explanation:
          "Amazon Macie usa aprendizaje automático para descubrir datos sensibles (datos personales, números de tarjeta) dentro de los objetos de los buckets de S3. También escanea, y por eso puede confundirse. Pero escanea contenido de S3, no el software de instancias o contenedores.",
      },
      {
        id: "D",
        text: "AWS Shield Advanced",
        correct: false,
        explanation:
          "AWS Shield Advanced es la versión paga de Shield: protección reforzada contra DDoS, acceso al equipo de respuesta de AWS (SRT) y protección ante los costos del escalado que provoca un ataque. Es un servicio de seguridad, pero no mira el software instalado en ninguna parte.",
      },
    ],
    tips: [
      "CVE, paquete vulnerable, imagen de contenedor: Inspector. Solicitud web maliciosa: WAF.",
      "Inspector mira lo que está instalado; WAF mira lo que está llegando.",
    ],
  },
  {
    id: "ref-gr-d2-q09",
    topic: "2",
    multiple: true,
    prompt:
      "Un sitio de noticias sufre ataques de denegación de servicio de gran volumen durante elecciones, y quiere acceso al equipo de respuesta de AWS y protección ante los costos del escalado que provocan. Además, recibe intentos de inyectar scripts (XSS) en el formulario de comentarios. ¿Qué DOS servicios de AWS contrata para resolver ambos problemas? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Amazon Inspector escanea de forma continua instancias EC2, imágenes de contenedor en ECR y funciones Lambda buscando vulnerabilidades de software conocidas (CVE). XSS es una vulnerabilidad, y esa es la asociación que lo hace tentador. Pero Inspector revisa el software instalado, no filtra lo que envían los visitantes.",
      },
      {
        id: "B",
        text: "AWS Shield Advanced",
        correct: true,
        explanation:
          "Correcta. Shield Standard protege a todos los clientes gratis, pero el equipo de respuesta ante DDoS y la protección de costos ante el escalado provocado por un ataque son parte de Shield Advanced.",
      },
      {
        id: "C",
        text: "Los grupos de seguridad de la VPC",
        correct: false,
        explanation:
          "Los grupos de seguridad son firewalls con estado a nivel de instancia que permiten tráfico según puerto, protocolo y origen. Filtran tráfico, por eso parecen útiles para las dos cosas. Pero un ataque XSS llega por el puerto 443 abierto, igual que cualquier visitante legítimo, y el grupo no mira el contenido de la solicitud ni frena un DDoS de gran volumen.",
      },
      {
        id: "D",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "AWS Trusted Advisor revisa la cuenta y recomienda mejoras en costos, rendimiento, seguridad, tolerancia a fallas y cuotas de servicio. Recomienda configuraciones más seguras, pero no protege nada en tiempo real: no frena un ataque en curso ni filtra solicitudes.",
      },
      {
        id: "E",
        text: "AWS WAF",
        correct: true,
        explanation:
          "Correcta. WAF inspecciona el contenido de las solicitudes HTTP y tiene reglas administradas para XSS e inyección SQL que bloquean esos intentos antes de que lleguen a la aplicación.",
      },
    ],
    tips: [
      "Equipo de respuesta ante DDoS y protección de costos: Shield Advanced. Ataques dentro de la solicitud web (XSS, inyección SQL): WAF.",
      "Shield y WAF se complementan: uno contra el volumen, el otro contra el contenido.",
    ],
  },
  {
    id: "ref-gr-d2-q10",
    topic: "2",
    prompt:
      "El equipo de seguridad quiere que le avisen si una instancia EC2 empieza a comunicarse con direcciones IP conocidas de minería de criptomonedas, o si unas credenciales de la cuenta hacen llamadas a la API desde un país desde el que nunca se usaron. ¿Qué servicio detecta esto?",
    options: [
      {
        id: "A",
        text: "Amazon Macie",
        correct: false,
        explanation:
          "Amazon Macie descubre datos sensibles (datos personales, números de tarjeta) dentro de los objetos guardados en S3. Es un servicio de detección, y por eso puede confundirse. Pero lo que detecta es contenido sensible, no comportamientos sospechosos de instancias o credenciales.",
      },
      {
        id: "B",
        text: "Amazon GuardDuty",
        correct: true,
        explanation:
          "Correcta. GuardDuty analiza de forma continua los registros de CloudTrail, los flujos de red de la VPC y las consultas DNS, y los cruza con inteligencia de amenazas para detectar comportamientos como estos.",
      },
      {
        id: "C",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Amazon Inspector escanea instancias EC2, contenedores y funciones Lambda buscando software con vulnerabilidades conocidas. Revisa instancias EC2, y eso lo acerca. Pero busca software vulnerable, no comportamiento: una instancia con todo parcheado puede igual estar minando criptomonedas, y eso Inspector no lo ve.",
      },
      {
        id: "D",
        text: "AWS WAF",
        correct: false,
        explanation:
          "AWS WAF es un firewall de aplicaciones web que filtra las solicitudes HTTP que llegan a una aplicación según reglas. Ni la comunicación saliente de una instancia ni las llamadas a la API de AWS pasan por él.",
      },
    ],
    tips: [
      "Comportamiento sospechoso (IP maliciosas, llamadas a la API inusuales, credenciales usadas desde lugares raros): GuardDuty.",
      "GuardDuty mira lo que pasa; Macie mira lo que hay guardado; Inspector mira lo que hay instalado.",
    ],
  },
  {
    id: "ref-gr-d2-q11",
    topic: "2",
    prompt:
      "Antes de darle a un socio acceso de lectura a un bucket de S3 con miles de archivos exportados, una empresa quiere comprobar que ninguno contiene números de tarjeta de crédito ni datos personales de sus clientes. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "Amazon GuardDuty detecta amenazas analizando la actividad de la cuenta: llamadas a la API, tráfico de red, DNS y, con su protección para S3, accesos sospechosos a los buckets. Protege S3, y por eso tienta. Pero mira quién accede y cómo, no lee el contenido de los archivos buscando datos sensibles.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Amazon Inspector escanea software buscando vulnerabilidades conocidas en instancias EC2, imágenes de contenedor y funciones Lambda. La pregunta pide escanear, y por eso tienta. Pero Inspector no escanea el contenido de objetos en S3.",
      },
      {
        id: "C",
        text: "IAM Access Analyzer",
        correct: false,
        explanation:
          "IAM Access Analyzer revisa las políticas de los recursos (buckets, roles, claves) y muestra cuáles son accesibles desde fuera de la cuenta. Encaja con la parte de 'darle acceso a un socio'. Pero responde quién puede entrar, no qué hay adentro de los archivos.",
      },
      {
        id: "D",
        text: "Amazon Macie",
        correct: true,
        explanation:
          "Correcta. Macie usa aprendizaje automático y reconocimiento de patrones para encontrar datos sensibles (tarjetas, documentos de identidad, datos personales) dentro de los objetos de S3.",
      },
    ],
    tips: [
      "Datos sensibles dentro de S3: Macie, siempre. Es lo único que hace.",
      "Quién puede entrar (Access Analyzer), quién está entrando de forma rara (GuardDuty) y qué hay adentro (Macie) son tres preguntas distintas sobre el mismo bucket.",
    ],
  },
  {
    id: "ref-gr-d2-q12",
    topic: "2",
    multiple: true,
    prompt:
      "Una aseguradora quiere dos cosas: saber en cuáles de sus buckets de S3 hay datos personales de sus asegurados, y que la alerten si unas credenciales robadas empiezan a descargar volúmenes inusuales de esos buckets. ¿Cuáles DOS servicios usa? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Amazon Inspector busca vulnerabilidades de software conocidas en instancias EC2, contenedores y funciones Lambda. Se asocia con 'encontrar problemas de seguridad', pero sus problemas son de software: no ve ni el contenido de S3 ni el patrón de acceso a los buckets.",
      },
      {
        id: "B",
        text: "AWS Artifact",
        correct: false,
        explanation:
          "AWS Artifact es el portal donde se descargan los informes de auditoría y certificaciones de AWS (SOC, ISO, PCI) y se aceptan acuerdos como el BAA. Una aseguradora tiene requisitos de cumplimiento, y Artifact suena a cumplimiento. Pero entrega documentos sobre AWS; no inspecciona nada de la cuenta del cliente.",
      },
      {
        id: "C",
        text: "Amazon GuardDuty",
        correct: true,
        explanation:
          "Correcta. Cubre la segunda necesidad: con su protección de S3 analiza los eventos de acceso a los buckets y detecta patrones anómalos, como descargas masivas con credenciales usadas de forma inusual.",
      },
      {
        id: "D",
        text: "Amazon Macie",
        correct: true,
        explanation:
          "Correcta. Cubre la primera necesidad: recorre los buckets y encuentra los objetos que contienen datos personales.",
      },
      {
        id: "E",
        text: "AWS Config",
        correct: false,
        explanation:
          "AWS Config registra la configuración de cada recurso y sus cambios a lo largo del tiempo, y evalúa reglas sobre ella (por ejemplo, 'ningún bucket público'). Puede detectar un bucket mal configurado, y eso lo acerca. Pero evalúa configuraciones, no el contenido de los archivos ni quién los descarga.",
      },
    ],
    tips: [
      "Cuando una pregunta pide encontrar datos y detectar amenazas sobre el mismo S3, son dos servicios: Macie y GuardDuty.",
      "Artifact es para descargar los informes de cumplimiento de AWS, no para revisar la cuenta del cliente.",
    ],
  },
  {
    id: "ref-gr-d2-q13",
    topic: "2",
    prompt:
      "Una empresa con veinte cuentas de AWS usa GuardDuty, Inspector y Macie, y quiere ver todos sus hallazgos en una sola consola, priorizados, junto con una evaluación automática de sus cuentas contra estándares como CIS. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "AWS Security Hub",
        correct: true,
        explanation:
          "Correcta. Security Hub agrega en un formato común los hallazgos de los servicios de seguridad de AWS (y de terceros) de todas las cuentas, y evalúa continuamente las cuentas contra estándares como CIS AWS Foundations o PCI DSS.",
      },
      {
        id: "B",
        text: "AWS CloudTrail",
        correct: false,
        explanation:
          "AWS CloudTrail registra cada llamada a la API hecha en la cuenta: quién, qué acción, cuándo y desde qué IP. 'Todo en un lugar' suena a eso. Pero registra acciones, no hallazgos de seguridad: no sabe qué encontró GuardDuty ni compara la cuenta contra CIS.",
      },
      {
        id: "C",
        text: "Amazon Detective",
        correct: false,
        explanation:
          "Amazon Detective ayuda a investigar un incidente: arma gráficos de relaciones entre recursos, usuarios e IP a partir de CloudTrail, los registros de flujo y los hallazgos de GuardDuty. Se alimenta de hallazgos, y por eso parece un centralizador. Pero sirve para investigar a fondo un hallazgo puntual, no para ver todos juntos ni evaluar estándares.",
      },
      {
        id: "D",
        text: "Amazon CloudWatch",
        correct: false,
        explanation:
          "Amazon CloudWatch es el servicio de monitoreo: recoge métricas y logs de los recursos, dispara alarmas y arma tableros. Puede tener tableros con todo, y por eso tienta. Pero no entiende de hallazgos de seguridad ni de estándares de cumplimiento.",
      },
    ],
    tips: [
      "Un solo lugar para los hallazgos de varios servicios de seguridad, más chequeos contra estándares: Security Hub.",
      "Security Hub junta; Detective investiga uno. Si el enunciado dice 'por qué pasó esto', es Detective.",
    ],
  },
  {
    id: "ref-gr-d2-q14",
    topic: "2",
    prompt:
      "Un bucket de S3 con informes de ventas desapareció el martes. El auditor pide saber qué identidad lo borró, a qué hora y desde qué dirección IP. ¿Qué servicio tiene esa información?",
    options: [
      {
        id: "A",
        text: "AWS Security Hub",
        correct: false,
        explanation:
          "AWS Security Hub reúne en una consola los hallazgos de GuardDuty, Inspector, Macie y otros, los prioriza y evalúa la cuenta contra estándares como CIS. Es el lugar central de la seguridad, y por eso parece que debería saberlo. Pero muestra hallazgos y evaluaciones, no el registro de cada acción hecha en la cuenta.",
      },
      {
        id: "B",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "AWS Trusted Advisor revisa cómo está configurada la cuenta hoy y recomienda mejoras en costos, seguridad, rendimiento, tolerancia a fallas y cuotas. Es una foto del presente: no guarda un historial de quién hizo qué.",
      },
      {
        id: "C",
        text: "Amazon Detective",
        correct: false,
        explanation:
          "Amazon Detective sirve para investigar incidentes: cruza CloudTrail, registros de flujo y hallazgos de GuardDuty y los muestra como relaciones entre identidades, recursos e IP. Investigar un incidente suena exactamente a Detective. Pero arma su análisis a partir de otras fuentes; el dato primario de quién llamó a DeleteBucket está en CloudTrail.",
      },
      {
        id: "D",
        text: "AWS CloudTrail",
        correct: true,
        explanation:
          "Correcta. CloudTrail registra cada llamada a la API de AWS con la identidad que la hizo, la hora, la IP de origen y los parámetros. Borrar un bucket es una llamada a DeleteBucket, y queda registrada.",
      },
    ],
    tips: [
      "Quién, qué, cuándo y desde dónde en una cuenta de AWS: CloudTrail.",
      "CloudTrail es el registro primario. Detective y Security Hub consumen información, no la reemplazan como evidencia de auditoría.",
    ],
  },
  {
    id: "ref-gr-d2-q15",
    topic: "2",
    prompt:
      "Una empresa pequeña quiere un servicio que revise su cuenta y le recomiende, en un mismo informe, qué recursos están ociosos para ahorrar dinero, qué cuotas de servicio están cerca del límite y si el usuario raíz todavía no tiene MFA. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "AWS Security Hub",
        correct: false,
        explanation:
          "AWS Security Hub centraliza los hallazgos de seguridad de varios servicios y evalúa la cuenta contra estándares como CIS o las buenas prácticas de AWS. También puede marcar que el usuario raíz no tiene MFA, y eso lo hace muy tentador. Pero solo cubre seguridad: no habla de recursos ociosos ni de cuotas de servicio.",
      },
      {
        id: "B",
        text: "AWS Trusted Advisor",
        correct: true,
        explanation:
          "Correcta. Trusted Advisor revisa la cuenta en varias categorías (optimización de costos, rendimiento, seguridad, tolerancia a fallas y cuotas de servicio) y da recomendaciones. Es el único de la lista que cubre las tres necesidades. Un detalle que el examen pregunta: con el plan de soporte Basic solo se ven los chequeos principales de seguridad y cuotas; el conjunto completo, el de costos incluido, requiere el plan Business o superior.",
      },
      {
        id: "C",
        text: "AWS Cost Explorer",
        correct: false,
        explanation:
          "AWS Cost Explorer muestra el gasto histórico con filtros y gráficos, proyecta el gasto futuro y recomienda compras de Savings Plans y ajustes de tamaño. Cubre la parte del dinero. Pero no sabe de cuotas de servicio ni de la MFA del usuario raíz.",
      },
      {
        id: "D",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "Amazon GuardDuty es el servicio de detección de amenazas: avisa si alguien usa la cuenta o los recursos de forma sospechosa. Es seguridad, pero de detección: no recomienda activar MFA ni apagar recursos, y no sabe nada de cuotas.",
      },
    ],
    tips: [
      "Recomendaciones que cruzan costo, seguridad, rendimiento, tolerancia a fallas y cuotas: Trusted Advisor. Ningún otro servicio mezcla esas categorías.",
      "Security Hub y Trusted Advisor se superponen en seguridad. El que habla también de dinero y de límites es Trusted Advisor.",
    ],
  },
];
