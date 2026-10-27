import type { ExamQuestionWithTopic } from "../../types";

/**
 * Dominio 3 — Tecnología y servicios en la nube. 33 preguntas, tres por cada
 * pendiente del primer refuerzo:
 *
 *   - ref-gr-d3-q02 (eligió Route 53; era Global Accelerator): q01–q03
 *   - ref-gr-d3-q03 (cree que CloudFront replica el origen en otras regiones): q04–q06
 *   - ref-gr-d3-q04 (eligió internet gateway; era VPN, falló 3 de 3): q07, q10, q11
 *   - ref-gr-d3-q06 (eligió NAT gateway; era Direct Connect): q08, q09, q12
 *   - ref-gr-d3-q08 (eligió S3; era instance store): q15, q16, q18
 *   - ref-gr-d3-q09 (cree que EBS se pierde al detener y sirve en cualquier zona): q13, q14, q17
 *   - ref-gr-d3-q16 (eligió Athena; era Redshift): q19, q20, q26
 *   - ref-gr-d3-q17 (eligió QuickSight; era EMR): q21, q24, q27
 *   - ref-gr-d3-q18 (eligió RDS para el tablero; era QuickSight): q22, q23, q25
 *   - ref-gr-d3-q20 (eligió CodePipeline; era CodeDeploy): q30, q31, q32
 *   - ref-gr-d3-q21 (eligió CodeDeploy; era CodePipeline): q28, q29, q33
 *
 * Conectividad, almacenamiento, analítica y CI/CD son los grupos donde falló todas
 * las preguntas del trío, o la misma más de una vez; por eso cada uno tiene una
 * pregunta "al revés", donde la correcta es la opción que antes eligió mal.
 */
export const TEMA_3_TECNOLOGIA: ExamQuestionWithTopic[] = [
  // --- Global Accelerator, Route 53 y CloudFront ---------------------------
  {
    id: "ref2-gr-d3-q01",
    topic: "3",
    prompt:
      "Un juego multijugador en línea usa UDP. Los jugadores sufren latencia variable porque su tráfico cruza internet hasta la región. El equipo quiere que entren a la red de AWS en la ubicación más cercana y que, si la región principal falla, el tráfico pase a otra en segundos sin depender de que los clientes renueven su caché de DNS. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon CloudFront",
        correct: false,
        explanation:
          "Amazon CloudFront es la red de entrega de contenido de AWS: guarda en caché contenido HTTP y HTTPS en ubicaciones de borde cercanas a los usuarios. Tienta porque también usa la red global de AWS para acercar la aplicación. Pero solo atiende tráfico HTTP, HTTPS y WebSocket: no acepta tráfico UDP como el de un juego.",
      },
      {
        id: "B",
        text: "AWS Global Accelerator",
        correct: true,
        explanation:
          "Correcta. AWS Global Accelerator da direcciones IP estáticas anycast que hacen entrar a cada usuario a la red de AWS en la ubicación de borde más cercana, funciona con TCP y UDP, y redirige el tráfico a otra región sana en segundos, sin cambios de DNS.",
      },
      {
        id: "C",
        text: "Amazon Route 53 con enrutamiento por conmutación por error",
        correct: false,
        explanation:
          "Route 53 es el servicio de DNS de AWS, y su enrutamiento por conmutación por error responde con otra dirección cuando una comprobación de estado falla. Tienta porque resuelve la parte de cambiar de región. Pero depende de que los clientes vuelvan a consultar el DNS, y no hace que el tráfico viaje por la red de AWS: sigue cruzando internet.",
      },
      {
        id: "D",
        text: "AWS Direct Connect",
        correct: false,
        explanation:
          "AWS Direct Connect es un enlace de red físico y dedicado entre un centro de datos y AWS. Tienta porque evita internet y da latencia estable. Pero conecta las instalaciones de una empresa, no a miles de jugadores repartidos por el mundo.",
      },
    ],
    tips: [
      "TCP o UDP, IP estáticas y conmutación entre regiones en segundos: Global Accelerator.",
      "CloudFront acelera contenido web que se puede guardar en caché; Global Accelerator acelera cualquier tráfico TCP o UDP sin guardar nada.",
    ],
  },
  {
    id: "ref2-gr-d3-q02",
    topic: "3",
    prompt:
      "Una aplicación web está desplegada en eu-west-1 y en us-east-1. La empresa quiere que cada visitante sea enviado al despliegue que le dé menor latencia, de la forma más simple y económica: solo con una configuración en el DNS de su dominio, sin agregar ningún servicio en el camino del tráfico y sin cambiar la aplicación. ¿Qué usa?",
    options: [
      {
        id: "A",
        text: "AWS Global Accelerator",
        correct: false,
        explanation:
          "AWS Global Accelerator da dos IP estáticas anycast y lleva el tráfico TCP o UDP por la red de AWS hasta la región más conveniente. Tienta porque también elige la región según el usuario. Pero es un servicio que se coloca en el camino del tráfico y se paga por hora y por datos transferidos; el enunciado pide resolverlo solo con DNS, que es más simple y más barato.",
      },
      {
        id: "B",
        text: "Amazon CloudFront",
        correct: false,
        explanation:
          "Amazon CloudFront guarda contenido web en caché en ubicaciones de borde para servirlo más cerca del usuario. Tienta porque baja la latencia de los visitantes lejanos. Pero sirve copias en caché desde un origen; no decide a cuál de dos despliegues completos enviar a cada visitante.",
      },
      {
        id: "C",
        text: "Elastic Load Balancing",
        correct: false,
        explanation:
          "Elastic Load Balancing reparte el tráfico entre instancias, contenedores o IP dentro de una región. Tienta porque 'repartir tráfico' es justo lo que se pide. Pero un balanceador vive en una región: no reparte entre eu-west-1 y us-east-1.",
      },
      {
        id: "D",
        text: "Amazon Route 53 con enrutamiento basado en latencia",
        correct: true,
        explanation:
          "Correcta. Route 53 es el DNS de AWS, y con enrutamiento basado en latencia responde a cada consulta con la dirección de la región que da menor latencia a ese usuario. Se configura con un registro por región bajo el mismo nombre: es solo DNS, sin nada nuevo en el camino del tráfico ni cambios en la aplicación.",
      },
    ],
    tips: [
      "Elegir región para cada usuario desde el DNS: Route 53 (latencia, geolocalización, conmutación por error).",
      "Route 53 solo responde '¿a qué dirección voy?'; después el tráfico viaja por internet. Global Accelerator, además, lo lleva por la red de AWS.",
    ],
  },
  {
    id: "ref2-gr-d3-q03",
    topic: "3",
    multiple: true,
    prompt: "¿Qué dos características son propias de AWS Global Accelerator? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Guarda en caché los archivos en las ubicaciones de borde",
        correct: false,
        explanation:
          "Guardar archivos en caché en ubicaciones de borde es lo que hace Amazon CloudFront, la red de entrega de contenido. Tienta porque los dos servicios usan las mismas ubicaciones de borde de AWS. Pero Global Accelerator no guarda nada: cada solicitud viaja hasta la aplicación.",
      },
      {
        id: "B",
        text: "Ofrece dos direcciones IP estáticas anycast como punto de entrada",
        correct: true,
        explanation:
          "Correcta. Global Accelerator entrega dos IP fijas que se anuncian desde todas las ubicaciones de borde, así que cada usuario entra por la más cercana y las IP no cambian aunque cambien los servidores detrás.",
      },
      {
        id: "C",
        text: "Resuelve nombres de dominio a direcciones IP",
        correct: false,
        explanation:
          "Resolver nombres de dominio a direcciones IP es la función de un servicio DNS como Amazon Route 53. Tienta porque los dos sirven para dirigir usuarios a una región. Pero Global Accelerator no es un DNS: recibe el tráfico en sus IP y lo transporta.",
      },
      {
        id: "D",
        text: "Funciona con tráfico TCP y UDP",
        correct: true,
        explanation:
          "Correcta. Global Accelerator trabaja a nivel de red, así que acelera tanto TCP como UDP, por ejemplo juegos, voz sobre IP o IoT, no solo HTTP.",
      },
      {
        id: "E",
        text: "Proporciona un enlace físico dedicado desde el centro de datos",
        correct: false,
        explanation:
          "Un enlace físico dedicado entre un centro de datos y AWS es lo que ofrece AWS Direct Connect. Tienta porque los dos mejoran la latencia evitando internet. Pero Global Accelerator atiende a usuarios de internet en todo el mundo, no a una oficina con un cable propio.",
      },
    ],
    tips: [
      "Global Accelerator: IP estáticas anycast, TCP y UDP, red de AWS, conmutación entre regiones en segundos.",
      "Si el enunciado pide 'IP fijas' o 'UDP', descarta CloudFront y Route 53.",
    ],
  },
  {
    id: "ref2-gr-d3-q04",
    topic: "3",
    prompt:
      "Un equipo reemplaza el archivo logo.png en el bucket que usa como origen de su distribución de CloudFront. Durante horas, muchos usuarios siguen viendo el logo anterior. ¿Por qué pasa y qué puede hacer el equipo?",
    options: [
      {
        id: "A",
        text: "Las ubicaciones de borde sirven la copia en caché hasta que vence su TTL; una invalidación obliga a pedirla de nuevo al origen",
        correct: true,
        explanation:
          "Correcta. CloudFront guarda cada objeto en caché durante su tiempo de vida (TTL) y, mientras tanto, no vuelve a consultar al origen. Para forzar el cambio, el equipo crea una invalidación de esa ruta, o publica el archivo con un nombre nuevo.",
      },
      {
        id: "B",
        text: "CloudFront había copiado el bucket a otras regiones y hay que esperar a que replique la versión nueva",
        correct: false,
        explanation:
          "Copiar un bucket a otra región es la replicación entre regiones de S3, una función del propio S3 que se configura aparte. Tienta porque la versión vieja parece estar 'guardada en otro lado'. Pero CloudFront no replica el origen: guarda en caché lo que se pidió, y lo que se ve es esa copia temporal.",
      },
      {
        id: "C",
        text: "S3 tarda horas en guardar los cambios; hay que activar S3 Transfer Acceleration",
        correct: false,
        explanation:
          "S3 Transfer Acceleration acelera las subidas a un bucket haciéndolas entrar por la ubicación de borde más cercana. Tienta porque parece que el archivo nuevo 'no terminó de llegar'. Pero S3 muestra los cambios en cuanto se escribe el objeto: el bucket ya tiene el logo nuevo; el que tiene el viejo es la caché.",
      },
      {
        id: "D",
        text: "CloudFront no entrega versiones nuevas de un archivo; hay que poner AWS Global Accelerator en su lugar",
        correct: false,
        explanation:
          "AWS Global Accelerator da IP estáticas y lleva tráfico TCP o UDP por la red de AWS hasta la aplicación, sin guardar nada en caché. Tienta porque al no tener caché no mostraría versiones viejas. Pero CloudFront sí entrega versiones nuevas cuando vence el TTL o se invalida; cambiar de servicio no hace falta.",
      },
    ],
    tips: [
      "Contenido viejo en CloudFront: espera a que venza el TTL o crea una invalidación.",
      "La caché de CloudFront es temporal y a pedido; el origen siempre tiene la versión vigente.",
    ],
  },
  {
    id: "ref2-gr-d3-q05",
    topic: "3",
    prompt:
      "Por una norma de continuidad, una empresa necesita que cada objeto nuevo de un bucket de S3 en us-east-1 se copie automáticamente a un bucket en otra región. ¿Qué configura?",
    options: [
      {
        id: "A",
        text: "Una distribución de Amazon CloudFront con el bucket como origen",
        correct: false,
        explanation:
          "Una distribución de CloudFront entrega el contenido de un origen, como un bucket, desde ubicaciones de borde con caché. Tienta porque los objetos terminan 'repartidos por el mundo'. Pero la caché es temporal y solo guarda lo que alguien pidió: no es una copia completa ni sirve para continuidad.",
      },
      {
        id: "B",
        text: "AWS Global Accelerator delante del bucket",
        correct: false,
        explanation:
          "AWS Global Accelerator da IP estáticas y lleva el tráfico TCP o UDP por la red de AWS hasta la aplicación. Tienta porque es un servicio global que trabaja con varias regiones. Pero transporta tráfico, no copia datos de un lugar a otro.",
      },
      {
        id: "C",
        text: "La replicación entre regiones de S3",
        correct: true,
        explanation:
          "Correcta. La replicación entre regiones de S3 (Cross-Region Replication) copia automáticamente y de forma asíncrona los objetos nuevos de un bucket a otro bucket en otra región. Requiere tener activado el versionado en los dos buckets, y los objetos que ya existían se copian aparte, con S3 Batch Replication.",
      },
      {
        id: "D",
        text: "S3 Transfer Acceleration",
        correct: false,
        explanation:
          "S3 Transfer Acceleration acelera las subidas de archivos a un bucket haciendo que entren por la ubicación de borde más cercana y viajen por la red de AWS. Tienta porque combina S3 con la red global. Pero acelera la llegada de datos al bucket; no los copia a otro.",
      },
    ],
    tips: [
      "Tener los datos en otra región es replicación (S3 Cross-Region Replication), no caché.",
      "CloudFront mejora la latencia de lectura; no es copia de seguridad ni recuperación ante desastres.",
    ],
  },
  {
    id: "ref2-gr-d3-q06",
    topic: "3",
    multiple: true,
    prompt:
      "Una aplicación web corre en instancias EC2 de una única región y desde hoy se sirve a través de CloudFront. ¿Qué dos afirmaciones son verdaderas? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "CloudFront copia la base de datos de la aplicación a cada ubicación de borde",
        correct: false,
        explanation:
          "Copiar una base de datos a otras ubicaciones es replicación, y en AWS se hace con funciones propias de la base, como réplicas de lectura o tablas globales. Tienta porque parece la forma de acercar todo al usuario. Pero CloudFront solo guarda respuestas HTTP en caché, nunca la base de datos.",
      },
      {
        id: "B",
        text: "La empresa deja de pagar la transferencia de datos hacia internet",
        correct: false,
        explanation:
          "La transferencia de datos hacia internet es lo que AWS cobra por los datos que salen hacia los usuarios. Tienta porque la transferencia del origen a CloudFront no tiene costo. Pero CloudFront cobra su propia transferencia hacia los usuarios: el cargo cambia de servicio, no desaparece.",
      },
      {
        id: "C",
        text: "Los objetos quedan en caché durante su tiempo de vida (TTL) y después se vuelven a pedir al origen",
        correct: true,
        explanation:
          "Correcta. Cada objeto en caché tiene un tiempo de vida; al vencer, la ubicación de borde vuelve a consultar al origen para obtener la versión vigente.",
      },
      {
        id: "D",
        text: "La aplicación pasa a ser multirregión y sigue funcionando si la región cae",
        correct: false,
        explanation:
          "Una aplicación multirregión tiene sus servidores y sus datos desplegados en más de una región, de modo que una puede reemplazar a la otra. Tienta porque CloudFront tiene presencia mundial. Pero lo que se sirva desde la caché depende de un único origen: si la región cae, todo lo que no está en caché falla.",
      },
      {
        id: "E",
        text: "El origen sigue siendo necesario para entregar lo que no está en caché",
        correct: true,
        explanation:
          "Correcta. CloudFront no reemplaza al origen: le pide cada objeto que no tiene o que venció. Por eso el origen tiene que seguir en pie.",
      },
    ],
    tips: [
      "CloudFront = caché temporal en el borde + un origen que siempre hace falta.",
      "Multirregión, réplicas de datos y copias de seguridad son otras herramientas; CloudFront solo baja la latencia y la carga del origen.",
    ],
  },

  // --- Conectividad: internet gateway, NAT, VPN y Direct Connect -----------
  {
    id: "ref2-gr-d3-q07",
    topic: "3",
    prompt: "¿Para qué sirve un internet gateway en una VPC?",
    options: [
      {
        id: "A",
        text: "Para que los recursos con IP pública de la VPC se comuniquen con internet en ambos sentidos",
        correct: true,
        explanation:
          "Correcta. El internet gateway es la puerta entre la VPC e internet: una subred cuya tabla de rutas apunta a él es una subred pública, y sus recursos con IP pública pueden recibir y enviar tráfico de internet.",
      },
      {
        id: "B",
        text: "Para conectar de forma privada y cifrada la red de una oficina con la VPC",
        correct: false,
        explanation:
          "Conectar la red de una oficina con la VPC por un túnel cifrado es lo que hace AWS Site-to-Site VPN, que usa un virtual private gateway del lado de AWS. Tienta porque los dos son 'gateways' y los dos usan internet. Pero el internet gateway expone recursos a internet; no crea ninguna conexión privada con la oficina.",
      },
      {
        id: "C",
        text: "Para que instancias de una subred privada salgan a internet sin aceptar conexiones entrantes",
        correct: false,
        explanation:
          "Dar salida a internet a una subred privada sin aceptar conexiones entrantes es la función del NAT gateway. Tienta porque el NAT gateway, a su vez, usa el internet gateway para salir. Pero el internet gateway por sí solo permite tráfico en los dos sentidos a los recursos con IP pública.",
      },
      {
        id: "D",
        text: "Para tender un enlace físico dedicado entre el centro de datos y AWS",
        correct: false,
        explanation:
          "Un enlace físico dedicado entre un centro de datos y AWS es AWS Direct Connect. Tienta porque los dos conectan la VPC con el exterior. Pero el internet gateway no tiene nada de físico ni de dedicado: es un componente lógico de la VPC que la conecta con internet público.",
      },
    ],
    tips: [
      "Internet gateway: la VPC hablando con internet. Nunca conecta tu oficina con la VPC.",
      "Para la oficina: Site-to-Site VPN (por internet, cifrado) o Direct Connect (enlace dedicado).",
    ],
  },
  {
    id: "ref2-gr-d3-q08",
    topic: "3",
    prompt:
      "Unas instancias de base de datos viven en una subred privada. Necesitan descargar parches desde internet, pero nadie en internet debe poder iniciar una conexión hacia ellas. ¿Qué componente se agrega?",
    options: [
      {
        id: "A",
        text: "Una ruta al internet gateway en la tabla de la subred privada, con IP públicas en las instancias",
        correct: false,
        explanation:
          "Un internet gateway con rutas hacia él y recursos con IP pública permite tráfico de internet en los dos sentidos. Tienta porque es la forma más directa de 'tener internet'. Pero eso convierte la subred en pública y deja a las bases de datos expuestas a conexiones entrantes, justo lo que se quiere evitar.",
      },
      {
        id: "B",
        text: "Una conexión AWS Site-to-Site VPN",
        correct: false,
        explanation:
          "AWS Site-to-Site VPN crea túneles cifrados por internet entre la red de una oficina y la VPC. Tienta porque es una conexión segura. Pero conecta la VPC con una red propia de la empresa, no le da salida a internet para descargar parches.",
      },
      {
        id: "C",
        text: "Una conexión AWS Direct Connect",
        correct: false,
        explanation:
          "AWS Direct Connect es un enlace físico dedicado entre un centro de datos y AWS. Tienta porque da una conexión privada y estable. Pero lleva tráfico hacia las instalaciones de la empresa; no sirve para que las instancias salgan a internet.",
      },
      {
        id: "D",
        text: "Un NAT gateway en una subred pública",
        correct: true,
        explanation:
          "Correcta. El NAT gateway, ubicado en una subred pública, deja que las instancias de la subred privada inicien conexiones hacia internet y reciban las respuestas, pero no acepta conexiones que empiecen desde afuera.",
      },
    ],
    tips: [
      "NAT gateway: salida a internet para subredes privadas, solo de adentro hacia afuera.",
      "El NAT gateway no conecta con la oficina ni con el centro de datos: es solo para salir a internet.",
    ],
  },
  {
    id: "ref2-gr-d3-q09",
    topic: "3",
    prompt:
      "Un regulador exige que el tráfico entre el centro de datos de un banco y su VPC no pase por internet público y tenga un ancho de banda constante. El banco acepta esperar varias semanas a que se instale la conexión. ¿Qué elige?",
    options: [
      {
        id: "A",
        text: "AWS Site-to-Site VPN",
        correct: false,
        explanation:
          "AWS Site-to-Site VPN conecta la red local con la VPC mediante túneles IPsec cifrados que viajan por internet; se configura en minutos. Tienta porque es privada en el sentido de que va cifrada. Pero el tráfico sigue pasando por internet público, con un rendimiento que varía, y la norma lo prohíbe.",
      },
      {
        id: "B",
        text: "AWS Direct Connect",
        correct: true,
        explanation:
          "Correcta. AWS Direct Connect es un enlace de red dedicado entre el centro de datos y AWS que no pasa por internet, con ancho de banda y latencia estables. Su instalación lleva semanas, algo que el enunciado ya acepta.",
      },
      {
        id: "C",
        text: "Un internet gateway con todo el tráfico cifrado por TLS",
        correct: false,
        explanation:
          "Un internet gateway conecta la VPC con internet, y TLS es el cifrado que protege el tráfico web. Tienta porque cifrar parece cumplir con la seguridad. Pero el tráfico sigue viajando por internet público; cifrarlo no cambia por dónde pasa.",
      },
      {
        id: "D",
        text: "Un emparejamiento de VPC (VPC peering)",
        correct: false,
        explanation:
          "El emparejamiento de VPC conecta de forma privada dos VPC, incluso de cuentas o regiones distintas, por la red de AWS. Tienta porque también es una conexión privada sin internet. Pero une dos VPC entre sí: no llega al centro de datos del banco.",
      },
    ],
    tips: [
      "'No pasar por internet' + 'ancho de banda constante' + 'acepta semanas de instalación': Direct Connect.",
      "Una VPN va cifrada, pero por internet; cifrado no es lo mismo que dedicado.",
    ],
  },
  {
    id: "ref2-gr-d3-q10",
    topic: "3",
    prompt:
      "Una empresa ya conecta su centro de datos con AWS mediante Direct Connect. Quiere un respaldo de bajo costo para que, si ese enlace se cae, el tráfico siga llegando a la VPC de forma cifrada usando su conexión de internet. ¿Qué agrega?",
    options: [
      {
        id: "A",
        text: "Un segundo internet gateway en la VPC",
        correct: false,
        explanation:
          "Un internet gateway conecta la VPC con internet público; además, cada VPC admite uno solo. Tienta porque el respaldo tiene que usar internet. Pero el internet gateway no crea ninguna conexión con el centro de datos: el tráfico de la empresa no llegaría cifrado ni privado.",
      },
      {
        id: "B",
        text: "Un NAT gateway",
        correct: false,
        explanation:
          "Un NAT gateway permite que instancias de una subred privada salgan a internet sin aceptar conexiones entrantes. Tienta porque vincula la red privada con internet. Pero funciona de adentro hacia afuera y no conecta con el centro de datos de la empresa.",
      },
      {
        id: "C",
        text: "Una conexión AWS Site-to-Site VPN",
        correct: true,
        explanation:
          "Correcta. AWS Site-to-Site VPN crea túneles cifrados por internet entre la red local y la VPC, se configura rápido y cuesta poco. Es el respaldo habitual de Direct Connect.",
      },
      {
        id: "D",
        text: "Una distribución de Amazon CloudFront",
        correct: false,
        explanation:
          "Amazon CloudFront entrega contenido web desde ubicaciones de borde con caché para los usuarios de internet. Puede aparecer porque es otra forma de llegar a AWS por la red global. Pero sirve contenido a usuarios finales; no conecta la red de una empresa con su VPC.",
      },
    ],
    tips: [
      "Conexión cifrada por internet entre tu red y la VPC: Site-to-Site VPN. Es rápida de montar y barata.",
      "Direct Connect como principal + Site-to-Site VPN como respaldo es una combinación clásica del examen.",
    ],
  },
  {
    id: "ref2-gr-d3-q11",
    topic: "3",
    multiple: true,
    prompt:
      "Una oficina en Lima necesita que sus equipos accedan a servidores que están en una VPC, con tráfico privado entre la red local y AWS. ¿Qué dos servicios pueden establecer esa conexión? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Internet gateway",
        correct: false,
        explanation:
          "El internet gateway conecta la VPC con internet público: los recursos con IP pública quedan alcanzables desde cualquier lugar. Es la confusión más repetida: parece la 'entrada' a la VPC. Pero no crea un vínculo privado con la oficina; cualquiera en internet usaría la misma puerta.",
      },
      {
        id: "B",
        text: "AWS Site-to-Site VPN",
        correct: true,
        explanation:
          "Correcta. Site-to-Site VPN crea túneles cifrados entre el router de la oficina y la VPC, usando la conexión a internet que ya existe.",
      },
      {
        id: "C",
        text: "NAT gateway",
        correct: false,
        explanation:
          "El NAT gateway da salida a internet a las instancias de una subred privada sin aceptar conexiones entrantes. Tienta porque tiene que ver con redes privadas. Pero solo saca tráfico hacia internet; no recibe tráfico de la oficina.",
      },
      {
        id: "D",
        text: "AWS Direct Connect",
        correct: true,
        explanation:
          "Correcta. Direct Connect es un enlace dedicado entre las instalaciones de la empresa y AWS que no pasa por internet público.",
      },
      {
        id: "E",
        text: "Un grupo de seguridad",
        correct: false,
        explanation:
          "Un grupo de seguridad es un firewall virtual a nivel de instancia que define qué tráfico entra y sale. Tienta porque hay que configurarlo para permitir el acceso desde la oficina. Pero solo filtra el tráfico; no crea ningún camino por donde llegue.",
      },
    ],
    tips: [
      "Los dos servicios de AWS para conectar tu red con la VPC son Site-to-Site VPN (por internet, cifrado) y Direct Connect (dedicado).",
      "Internet gateway y NAT gateway son para hablar con internet, no con tu oficina.",
    ],
  },
  {
    id: "ref2-gr-d3-q12",
    topic: "3",
    multiple: true,
    prompt:
      "Una VPC tiene una subred pública con servidores web que reciben visitas desde internet, y una subred privada con servidores de aplicación que deben descargar actualizaciones sin quedar expuestos. ¿Qué dos componentes necesita? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Un internet gateway",
        correct: true,
        explanation:
          "Correcta. El internet gateway es lo que hace pública a la subred de los servidores web: por él entran las visitas y salen las respuestas.",
      },
      {
        id: "B",
        text: "AWS Direct Connect",
        correct: false,
        explanation:
          "AWS Direct Connect es un enlace físico dedicado entre un centro de datos y AWS. Tienta porque mejora la conectividad de la VPC. Pero aquí no hay ningún centro de datos: las visitas y las actualizaciones vienen de internet.",
      },
      {
        id: "C",
        text: "Un NAT gateway",
        correct: true,
        explanation:
          "Correcta. El NAT gateway, en la subred pública, deja que los servidores de aplicación de la subred privada descarguen actualizaciones sin aceptar conexiones desde internet.",
      },
      {
        id: "D",
        text: "AWS Site-to-Site VPN",
        correct: false,
        explanation:
          "AWS Site-to-Site VPN crea túneles cifrados entre una red local y la VPC. Tienta porque protege el tráfico. Pero no hay una red local que conectar: el escenario solo habla de internet.",
      },
      {
        id: "E",
        text: "AWS Transit Gateway",
        correct: false,
        explanation:
          "AWS Transit Gateway es un concentrador que interconecta muchas VPC y redes locales en un solo punto. Tienta porque es un componente central de red. Pero aquí hay una sola VPC que solo necesita hablar con internet.",
      },
    ],
    tips: [
      "Subred pública = ruta al internet gateway. Subred privada con salida a internet = ruta a un NAT gateway que está en la subred pública.",
      "VPN, Direct Connect y Transit Gateway aparecen cuando hay otras redes que conectar, no solo internet.",
    ],
  },

  // --- Almacenamiento: EBS, instance store y S3 -----------------------------
  {
    id: "ref2-gr-d3-q13",
    topic: "3",
    prompt:
      "Una instancia EC2 con un volumen raíz de Amazon EBS se detiene un viernes y se vuelve a iniciar el lunes. ¿Qué pasa con los datos del volumen?",
    options: [
      {
        id: "A",
        text: "Se pierden, como ocurre con cualquier disco de una instancia detenida",
        correct: false,
        explanation:
          "Perder los datos al detener la instancia es lo que ocurre con el almacén de instancias (instance store), el disco físico del servidor donde corre la instancia. Tienta porque los dos parecen 'el disco de la instancia'. Pero un volumen EBS es almacenamiento en red independiente del servidor, y no se borra al detener.",
      },
      {
        id: "B",
        text: "Se conservan, porque EBS es almacenamiento persistente separado del servidor físico",
        correct: true,
        explanation:
          "Correcta. Amazon EBS es almacenamiento en bloque persistente: el volumen vive aparte del servidor y conserva sus datos al detener la instancia, al desasociarlo e incluso, si se configura, después de terminarla.",
      },
      {
        id: "C",
        text: "Se mueven automáticamente a Amazon S3 mientras la instancia está detenida",
        correct: false,
        explanation:
          "Amazon S3 es el almacenamiento de objetos de AWS, y es donde se guardan las instantáneas de EBS. Tienta por esa relación. Pero las instantáneas se crean cuando el cliente las pide o las programa; detener una instancia no mueve nada a S3.",
      },
      {
        id: "D",
        text: "Se conservan solo si se tomó una instantánea antes de detenerla",
        correct: false,
        explanation:
          "Una instantánea de EBS es una copia de seguridad puntual del volumen guardada en S3, útil para restaurar o crear volúmenes nuevos. Tienta porque es la forma conocida de proteger datos. Pero el volumen conserva sus datos por sí mismo al detener la instancia; la instantánea protege de otros riesgos, como un borrado.",
      },
    ],
    tips: [
      "EBS persiste al detener la instancia; instance store se pierde.",
      "Una instantánea es una copia de seguridad, no la condición para que EBS conserve los datos.",
    ],
  },
  {
    id: "ref2-gr-d3-q14",
    topic: "3",
    prompt:
      "Un volumen de Amazon EBS está asociado a una instancia en us-east-1a. El equipo necesita esos mismos datos en una instancia nueva de us-east-1b. ¿Cómo lo hace?",
    options: [
      {
        id: "A",
        text: "Desasocia el volumen y lo asocia directamente a la instancia de us-east-1b",
        correct: false,
        explanation:
          "Desasociar y asociar un volumen EBS es moverlo de una instancia a otra, algo normal y que conserva los datos. Tienta porque así se mueve un volumen entre instancias. Pero solo funciona dentro de la misma zona de disponibilidad: el volumen vive en us-east-1a y no se puede asociar a una instancia de us-east-1b.",
      },
      {
        id: "B",
        text: "Activa EBS Multi-Attach para que las dos instancias lo compartan",
        correct: false,
        explanation:
          "EBS Multi-Attach permite asociar ciertos volúmenes de alto rendimiento (io1 e io2) a varias instancias a la vez. Tienta porque suena a compartir el disco. Pero todas esas instancias tienen que estar en la misma zona que el volumen.",
      },
      {
        id: "C",
        text: "Monta el volumen por red desde us-east-1b, como un sistema de archivos compartido",
        correct: false,
        explanation:
          "Montar un sistema de archivos por red desde varias zonas es lo que permite Amazon EFS, el sistema de archivos administrado. Tienta porque EBS también es almacenamiento 'en red'. Pero un volumen EBS se asocia a instancias como un disco, no se monta como recurso compartido entre zonas.",
      },
      {
        id: "D",
        text: "Crea una instantánea del volumen y, a partir de ella, un volumen nuevo en us-east-1b",
        correct: true,
        explanation:
          "Correcta. Un volumen EBS está atado a su zona de disponibilidad. Para llevar sus datos a otra zona se toma una instantánea, que queda guardada en S3 a nivel regional, y desde ella se crea un volumen nuevo en la zona de destino.",
      },
    ],
    tips: [
      "Un volumen EBS vive en una sola zona de disponibilidad. Para cambiar de zona: instantánea y volumen nuevo.",
      "Para compartir archivos entre instancias de varias zonas: EFS.",
    ],
  },
  {
    id: "ref2-gr-d3-q15",
    topic: "3",
    prompt:
      "Un desarrollador guarda los archivos de su base de datos de pruebas en el almacén de instancias de una instancia EC2. El viernes la detiene para ahorrar y el lunes, al iniciarla, los archivos ya no están. ¿Qué explica lo ocurrido?",
    options: [
      {
        id: "A",
        text: "Venció la instantánea automática del volumen EBS",
        correct: false,
        explanation:
          "Una instantánea de EBS es una copia puntual de un volumen EBS guardada en S3; se crea a pedido o con políticas programadas. Tienta porque es el mecanismo de copia de seguridad que se asocia con los discos de EC2. Pero los archivos no estaban en EBS, y una instantánea que se borra no afecta al volumen original.",
      },
      {
        id: "B",
        text: "Una regla de ciclo de vida de S3 borró los objetos durante el fin de semana",
        correct: false,
        explanation:
          "Una regla de ciclo de vida de S3 mueve objetos a clases más baratas o los borra después de cierto tiempo. Tienta porque explica datos que desaparecen solos. Pero el almacén de instancias no es S3: es un disco del servidor, y ninguna regla de S3 lo toca.",
      },
      {
        id: "C",
        text: "El almacén de instancias es temporal: está en el servidor físico y se borra al detener la instancia",
        correct: true,
        explanation:
          "Correcta. El almacén de instancias son discos del servidor donde corre la instancia. Sus datos se borran siempre al detener, hibernar o terminar la instancia, porque al volver a arrancar puede quedar en otro servidor; solo sobreviven a un reinicio. Para datos que tienen que sobrevivir se usa EBS.",
      },
      {
        id: "D",
        text: "El sistema de archivos EFS se desmontó y hay que volver a montarlo",
        correct: false,
        explanation:
          "Amazon EFS es un sistema de archivos que las instancias montan por red; si se desmonta, los datos siguen en EFS y vuelven al montarlo. Tienta porque los archivos 'no se ven'. Pero los archivos estaban en el almacén de instancias, no en EFS.",
      },
    ],
    tips: [
      "Instance store: lo más rápido y barato, pero se pierde al detener o terminar la instancia.",
      "Datos que tienen que sobrevivir a una parada: EBS (disco) o S3 (objetos).",
    ],
  },
  {
    id: "ref2-gr-d3-q16",
    topic: "3",
    prompt:
      "Una red social necesita guardar millones de fotos que suben sus usuarios, accesibles mediante una URL desde cualquier lugar, con una durabilidad de once nueves y sin administrar capacidad. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Volúmenes Amazon EBS",
        correct: false,
        explanation:
          "Amazon EBS ofrece volúmenes de almacenamiento en bloque que funcionan como discos de una instancia EC2. Tienta porque es almacenamiento persistente. Pero un volumen se asocia a instancias de una zona, tiene un tamaño que hay que aprovisionar y no publica archivos con una URL.",
      },
      {
        id: "B",
        text: "Almacén de instancias (instance store)",
        correct: false,
        explanation:
          "El almacén de instancias son discos físicos del servidor donde corre una instancia, muy rápidos pero temporales. Tienta por su velocidad. Pero las fotos se perderían al detener la instancia, y solo esa instancia puede leerlas.",
      },
      {
        id: "C",
        text: "Amazon EFS",
        correct: false,
        explanation:
          "Amazon EFS es un sistema de archivos que varias instancias montan por red a la vez. Tienta porque guarda archivos y crece solo. Pero se accede montándolo desde servidores, no con una URL desde cualquier navegador, y para millones de objetos públicos es más caro.",
      },
      {
        id: "D",
        text: "Amazon S3",
        correct: true,
        explanation:
          "Correcta. Amazon S3 es almacenamiento de objetos: capacidad prácticamente ilimitada sin aprovisionar nada, cada objeto accesible por URL o API, y durabilidad de 99,999999999 % (once nueves). Es la elección natural para fotos subidas por usuarios.",
      },
    ],
    tips: [
      "S3 sirve para guardar objetos y accederlos por URL; no es el disco de una instancia.",
      "EBS e instance store son discos de una instancia; EFS es un sistema de archivos compartido; S3 es almacenamiento de objetos.",
    ],
  },
  {
    id: "ref2-gr-d3-q17",
    topic: "3",
    multiple: true,
    prompt:
      "Al comparar el almacén de instancias (instance store) con Amazon EBS, ¿qué dos afirmaciones son verdaderas? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "El almacén de instancias está en el servidor físico y sus datos se pierden al detener o terminar la instancia",
        correct: true,
        explanation:
          "Correcta. El almacén de instancias son discos conectados al servidor que aloja la instancia. Sus datos se borran siempre al detener, hibernar o terminar la instancia; solo sobreviven a un reinicio.",
      },
      {
        id: "B",
        text: "Un volumen EBS puede ser montado por miles de instancias como un sistema de archivos compartido",
        correct: false,
        explanation:
          "Un sistema de archivos que miles de instancias montan a la vez es Amazon EFS. Tienta porque EBS también es almacenamiento en red. Pero un volumen EBS se asocia, por lo general, a una sola instancia, y Multi-Attach solo admite unas pocas de la misma zona.",
      },
      {
        id: "C",
        text: "Un volumen EBS conserva sus datos aunque se detenga la instancia o se desasocie",
        correct: true,
        explanation:
          "Correcta. EBS es almacenamiento persistente independiente del servidor: los datos siguen ahí al detener la instancia o al pasar el volumen a otra instancia de la misma zona.",
      },
      {
        id: "D",
        text: "El almacén de instancias permite crear instantáneas en S3 como EBS",
        correct: false,
        explanation:
          "Las instantáneas son copias puntuales de un volumen EBS guardadas en S3. Tienta porque los dos son 'discos' de la instancia. Pero el almacén de instancias no tiene instantáneas: si sus datos importan, hay que copiarlos a otro lugar.",
      },
      {
        id: "E",
        text: "Un volumen EBS puede asociarse a instancias de cualquier zona de la región",
        correct: false,
        explanation:
          "Las zonas de disponibilidad son uno o más centros de datos aislados dentro de una región. Tienta porque muchos servicios, como S3, son regionales. Pero un volumen EBS se crea en una zona y solo puede asociarse a instancias de esa zona.",
      },
    ],
    tips: [
      "Instance store: rápido, incluido en el precio, se pierde al detener. EBS: persistente, de una sola zona, con instantáneas en S3.",
      "S3 es regional; un volumen EBS es de una zona.",
    ],
  },
  {
    id: "ref2-gr-d3-q18",
    topic: "3",
    multiple: true,
    prompt:
      "¿Qué dos opciones de almacenamiento se usan como disco en bloque de una instancia EC2, donde el sistema operativo crea su sistema de archivos? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Amazon S3",
        correct: false,
        explanation:
          "Amazon S3 guarda objetos (un archivo con sus metadatos) que se leen y escriben por API o URL. Tienta porque es donde muchas aplicaciones guardan sus archivos. Pero no es un disco: el sistema operativo no puede crear un sistema de archivos sobre un bucket.",
      },
      {
        id: "B",
        text: "Amazon EBS",
        correct: true,
        explanation:
          "Correcta. Amazon EBS ofrece volúmenes en bloque que la instancia ve como discos: se formatean, se montan y persisten aunque la instancia se detenga.",
      },
      {
        id: "C",
        text: "Almacén de instancias (instance store)",
        correct: true,
        explanation:
          "Correcta. El almacén de instancias también es almacenamiento en bloque: discos físicos del servidor que la instancia ve como discos propios, aunque temporales.",
      },
      {
        id: "D",
        text: "Amazon S3 Glacier Flexible Retrieval",
        correct: false,
        explanation:
          "S3 Glacier Flexible Retrieval es una clase de almacenamiento de S3 para archivo a largo plazo, barata y con recuperación de minutos a horas. Tienta porque también guarda datos de forma duradera. Pero sigue siendo almacenamiento de objetos, no un disco de la instancia.",
      },
      {
        id: "E",
        text: "Amazon DynamoDB",
        correct: false,
        explanation:
          "Amazon DynamoDB es una base de datos NoSQL administrada de clave-valor y documentos. Puede aparecer porque guarda datos de la aplicación. Pero se usa a través de su API; no es un disco sobre el que el sistema operativo cree archivos.",
      },
    ],
    tips: [
      "Bloque (disco de la instancia): EBS e instance store. Archivos compartidos: EFS. Objetos: S3 y sus clases Glacier.",
      "Si 'el sistema operativo lo formatea', es almacenamiento en bloque.",
    ],
  },

  // --- Analítica: Redshift, Athena, EMR, QuickSight y RDS ------------------
  {
    id: "ref2-gr-d3-q19",
    topic: "3",
    prompt:
      "Una cadena de tiendas quiere consolidar diez años de ventas de todas sus sucursales en un almacén de datos (data warehouse) columnar, para que el área de BI ejecute cada día informes con SQL sobre todo el historial. ¿Qué servicio elige?",
    options: [
      {
        id: "A",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Amazon Athena es un servicio sin servidor para consultar con SQL archivos guardados en S3, pagando por los datos escaneados en cada consulta. Tienta porque también usa SQL y sirve para analizar. Pero no es un almacén de datos donde se cargan y organizan los datos para consultas intensivas y repetidas todos los días.",
      },
      {
        id: "B",
        text: "Amazon RDS for PostgreSQL",
        correct: false,
        explanation:
          "Amazon RDS for PostgreSQL es una base de datos relacional administrada, pensada para transacciones: insertar, actualizar y leer filas sueltas muy rápido. Tienta porque guarda datos estructurados y habla SQL. Pero está organizada por filas y para operaciones, no para recorrer años de historial en informes analíticos.",
      },
      {
        id: "C",
        text: "Amazon Redshift",
        correct: true,
        explanation:
          "Correcta. Amazon Redshift es el almacén de datos de AWS: guarda los datos en columnas y reparte las consultas en paralelo entre sus nodos, lo que lo hace adecuado para informes SQL diarios sobre grandes volúmenes de historial.",
      },
      {
        id: "D",
        text: "Amazon EMR",
        correct: false,
        explanation:
          "Amazon EMR es una plataforma administrada para ejecutar clústeres de Spark, Hadoop y otros marcos de big data. Tienta porque procesa volúmenes enormes. Pero está pensada para trabajos de procesamiento a medida, no como almacén de datos donde un área de BI consulta con SQL todos los días.",
      },
    ],
    tips: [
      "La palabra clave 'data warehouse' o 'almacén de datos' en el examen apunta a Redshift.",
      "RDS es para transacciones (OLTP); Redshift, para análisis sobre mucho historial (OLAP).",
    ],
  },
  {
    id: "ref2-gr-d3-q20",
    topic: "3",
    prompt:
      "Una vez al mes, un analista necesita consultar con SQL unos archivos CSV de registros que ya están en S3. No quiere crear servidores ni clústeres, ni pagar nada los días en que no consulta. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon Athena",
        correct: true,
        explanation:
          "Correcta. Amazon Athena consulta con SQL los archivos directamente en S3, sin servidores que administrar ni datos que cargar, y cobra por los datos que escanea cada consulta: si no se consulta, no se paga.",
      },
      {
        id: "B",
        text: "Amazon Redshift",
        correct: false,
        explanation:
          "Amazon Redshift es el almacén de datos de AWS, con almacenamiento en columnas y consultas en paralelo, pensado para análisis intensivo y continuo. Tienta porque es el servicio de análisis con SQL más conocido. Puede leer S3 con Redshift Spectrum o funcionar sin servidor, pero sigue siendo un almacén de datos que hay que crear y configurar; para unas consultas al mes sobre archivos que ya están en S3, lo más simple y directo es otro servicio.",
      },
      {
        id: "C",
        text: "Amazon EMR",
        correct: false,
        explanation:
          "Amazon EMR ejecuta clústeres administrados de Spark, Hadoop y otros marcos de big data, con control sobre las instancias. Tienta porque también puede consultar datos de S3. Pero exige crear y dimensionar un clúster, justo lo que el analista quiere evitar.",
      },
      {
        id: "D",
        text: "Amazon QuickSight",
        correct: false,
        explanation:
          "Amazon QuickSight es el servicio de inteligencia de negocio para crear tableros y gráficos interactivos. Tienta porque es una herramienta de análisis. Pero muestra datos que le entrega otra fuente; no es el motor que ejecuta consultas SQL sobre archivos de S3.",
      },
    ],
    tips: [
      "SQL sobre archivos en S3, sin servidores, pago por datos escaneados: Athena.",
      "Athena es para consultas ocasionales; Redshift, para mucha consulta continua y rendimiento estable.",
    ],
  },
  {
    id: "ref2-gr-d3-q21",
    topic: "3",
    prompt:
      "Un equipo de ciencia de datos tiene trabajos de Apache Spark y Hadoop escritos para su clúster local. Quiere llevarlos a AWS sin reescribirlos, eligiendo el tipo y la cantidad de instancias del clúster y apagándolo al terminar. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon Redshift",
        correct: false,
        explanation:
          "Amazon Redshift es el almacén de datos de AWS, que ejecuta consultas SQL en paralelo sobre datos guardados en columnas. Tienta porque es el servicio de análisis de grandes volúmenes más conocido. Pero no ejecuta trabajos de Spark ni de Hadoop: habría que reescribirlos en SQL.",
      },
      {
        id: "B",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Amazon Athena consulta con SQL archivos en S3 sin servidores. Tienta porque también analiza grandes volúmenes sin infraestructura propia. Pero justamente no da control sobre ningún clúster, que es lo que el equipo pide.",
      },
      {
        id: "C",
        text: "Amazon QuickSight",
        correct: false,
        explanation:
          "Amazon QuickSight crea tableros y gráficos interactivos para el negocio. Tienta porque es parte de cualquier proyecto de datos. Pero visualiza resultados; no ejecuta trabajos de procesamiento.",
      },
      {
        id: "D",
        text: "Amazon EMR",
        correct: true,
        explanation:
          "Correcta. Amazon EMR ejecuta clústeres administrados de Spark, Hadoop, Hive y otros marcos de big data. Los trabajos existentes corren sin reescribirse, el cliente elige las instancias y el clúster se puede apagar al terminar.",
      },
    ],
    tips: [
      "Spark, Hadoop, Hive o 'clúster de big data con control de instancias': EMR.",
      "EMR procesa; Redshift almacena y consulta; Athena consulta sin servidores; QuickSight visualiza.",
    ],
  },
  {
    id: "ref2-gr-d3-q22",
    topic: "3",
    prompt:
      "La dirección quiere ver tableros interactivos con gráficos de las ventas que ya están en Amazon Redshift, abrirlos desde el navegador y compartirlos con los gerentes regionales. ¿Qué servicio agrega?",
    options: [
      {
        id: "A",
        text: "Amazon RDS",
        correct: false,
        explanation:
          "Amazon RDS es el servicio de bases de datos relacionales administradas, como MySQL o PostgreSQL. Tienta porque los datos de ventas se consultan con SQL y RDS es la base de datos con SQL más conocida. Pero es otra base de datos, y los datos ya están en Redshift: lo que falta es mostrarlos, no guardarlos.",
      },
      {
        id: "B",
        text: "Amazon QuickSight",
        correct: true,
        explanation:
          "Correcta. Amazon QuickSight es el servicio de inteligencia de negocio de AWS: se conecta a Redshift, Athena, RDS y otras fuentes, y crea tableros y gráficos interactivos que se comparten desde el navegador.",
      },
      {
        id: "C",
        text: "Amazon EMR",
        correct: false,
        explanation:
          "Amazon EMR ejecuta clústeres de Spark y Hadoop para procesar grandes volúmenes de datos. Tienta porque es un servicio de analítica. Pero procesa y transforma datos; no produce tableros para la dirección.",
      },
      {
        id: "D",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Amazon Athena ejecuta consultas SQL sobre archivos guardados en S3. Tienta porque es un servicio de análisis con SQL. Pero entrega resultados en tablas, no tableros con gráficos, y además tendría que llegar a Redshift mediante un conector federado.",
      },
    ],
    tips: [
      "Tableros, gráficos, BI, 'para la dirección': QuickSight.",
      "QuickSight se conecta a donde ya están los datos; no reemplaza a la base ni al almacén de datos.",
    ],
  },
  {
    id: "ref2-gr-d3-q23",
    topic: "3",
    prompt:
      "Una tienda en línea necesita la base de datos de su sistema de pedidos: miles de inserciones y actualizaciones por minuto, cada una sobre un pedido, con transacciones y una base de datos relacional que AWS administre. ¿Qué servicio elige?",
    options: [
      {
        id: "A",
        text: "Amazon Redshift",
        correct: false,
        explanation:
          "Amazon Redshift es un almacén de datos columnar para análisis de grandes volúmenes con SQL. Tienta porque es relacional y administrado. Pero está optimizado para leer muchas filas a la vez en informes, no para miles de escrituras sueltas por minuto.",
      },
      {
        id: "B",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Amazon Athena consulta con SQL archivos guardados en S3 sin servidores. Tienta porque usa SQL. Pero es un servicio de consulta: no es una base de datos donde la aplicación inserte y actualice pedidos.",
      },
      {
        id: "C",
        text: "Amazon RDS",
        correct: true,
        explanation:
          "Correcta. Amazon RDS administra bases de datos relacionales como MySQL, PostgreSQL o SQL Server, pensadas para transacciones: muchas lecturas y escrituras pequeñas, con consistencia. Es la base de datos de una aplicación de pedidos.",
      },
      {
        id: "D",
        text: "Amazon QuickSight",
        correct: false,
        explanation:
          "Amazon QuickSight crea tableros y gráficos sobre datos guardados en otras fuentes. Tienta porque se usa con datos de ventas. Pero no guarda datos ni recibe pedidos: solo los muestra.",
      },
    ],
    tips: [
      "La aplicación escribe registros uno a uno (transacciones): RDS, o Aurora. Se analiza mucho historial: Redshift.",
      "RDS guarda los datos de una aplicación; QuickSight solo los muestra.",
    ],
  },
  {
    id: "ref2-gr-d3-q24",
    topic: "3",
    prompt: "¿Cómo se cobra, principalmente, el uso de Amazon Athena?",
    options: [
      {
        id: "A",
        text: "Por la cantidad de datos que escanea cada consulta",
        correct: true,
        explanation:
          "Correcta. Athena cobra por los terabytes que lee cada consulta. Por eso conviene guardar los datos comprimidos, particionados y en formato columnar, como Parquet: menos datos escaneados, menos costo.",
      },
      {
        id: "B",
        text: "Por hora de cada nodo del clúster, esté consultando o no",
        correct: false,
        explanation:
          "Pagar por hora de cada nodo, se use o no, es el modelo de un clúster aprovisionado, como el de Amazon Redshift. Tienta porque los dos sirven para analizar con SQL. Pero Athena no tiene nodos a cargo del cliente: no hay nada encendido entre consulta y consulta.",
      },
      {
        id: "C",
        text: "Por usuario que abre los tableros cada mes",
        correct: false,
        explanation:
          "Cobrar por usuario o por sesión es el modelo de Amazon QuickSight, el servicio de tableros. Tienta porque Athena y QuickSight suelen usarse juntos. Pero Athena no tiene usuarios lectores: ejecuta consultas.",
      },
      {
        id: "D",
        text: "Por hora de las instancias EC2 que forman el clúster",
        correct: false,
        explanation:
          "Pagar por las instancias EC2 del clúster, más un cargo del servicio, es el modelo de Amazon EMR. Tienta porque EMR también analiza datos en S3. Pero en Athena no hay instancias que elegir ni que pagar.",
      },
    ],
    tips: [
      "Athena: pago por datos escaneados. Redshift aprovisionado: por nodo y hora. EMR: por las instancias del clúster.",
      "Si el enunciado dice 'pagar solo cuando se consulta', apunta a Athena.",
    ],
  },
  {
    id: "ref2-gr-d3-q25",
    topic: "3",
    multiple: true,
    prompt:
      "Una empresa necesita dos cosas: un lugar central donde cientos de analistas ejecuten cada día consultas SQL complejas sobre petabytes de historial con rendimiento estable, y tableros con gráficos para la dirección. ¿Qué dos servicios elige? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Amazon Athena consulta archivos en S3 con SQL sin servidores y cobra por datos escaneados. Tienta porque también usa SQL. Pero está pensada para consultas ocasionales; con cientos de analistas todo el día sobre petabytes, el rendimiento estable y el costo predecible los da un almacén de datos.",
      },
      {
        id: "B",
        text: "Amazon Redshift",
        correct: true,
        explanation:
          "Correcta. Amazon Redshift es el almacén de datos de AWS, diseñado para consultas SQL complejas y concurrentes sobre grandes volúmenes con rendimiento estable. Cubre el lugar central de análisis.",
      },
      {
        id: "C",
        text: "Amazon EMR",
        correct: false,
        explanation:
          "Amazon EMR ejecuta clústeres de Spark y Hadoop con control sobre las instancias. Tienta porque procesa petabytes. Pero está pensado para trabajos de procesamiento a medida, no para que cientos de analistas consulten con SQL todos los días.",
      },
      {
        id: "D",
        text: "Amazon QuickSight",
        correct: true,
        explanation:
          "Correcta. Amazon QuickSight se conecta a Redshift y crea los tableros interactivos para la dirección.",
      },
      {
        id: "E",
        text: "Amazon RDS for MySQL",
        correct: false,
        explanation:
          "Amazon RDS for MySQL es una base de datos relacional administrada para aplicaciones transaccionales. Tienta porque es SQL y es relacional. Pero no está pensada para petabytes de historial ni para consultas analíticas de cientos de usuarios, y tampoco dibuja tableros.",
      },
    ],
    tips: [
      "Almacén de datos para mucha consulta continua: Redshift. Tableros: QuickSight.",
      "Que algo use SQL no lo convierte en base de datos ni en almacén de datos: Athena consulta y RDS guarda transacciones.",
    ],
  },
  {
    id: "ref2-gr-d3-q26",
    topic: "3",
    multiple: true,
    prompt: "¿En qué dos casos conviene Amazon Athena antes que Amazon Redshift? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Consultas ocasionales sobre archivos que ya están en S3, sin cargarlos en ningún lado",
        correct: true,
        explanation:
          "Correcta. Athena consulta los archivos donde están, en S3, sin un paso de carga. Para consultas esporádicas es lo más simple.",
      },
      {
        id: "B",
        text: "Cientos de usuarios con uniones complejas todo el día y rendimiento estable",
        correct: false,
        explanation:
          "Muchos usuarios a la vez con consultas complejas y rendimiento estable es el caso para el que existe Amazon Redshift, el almacén de datos. Tienta porque Athena también ejecuta uniones con SQL. Pero en ese uso intensivo el almacén de datos da un rendimiento y un costo más predecibles.",
      },
      {
        id: "C",
        text: "Empezar a consultar en minutos, sin crear ni dimensionar nada antes",
        correct: true,
        explanation:
          "Correcta. En Athena no hay almacén de datos, servidores ni clústeres que crear: se define la tabla sobre los archivos, se escribe la consulta y se paga por los datos que escanea. Redshift, incluso en su modalidad sin servidor, exige crear y configurar el almacén antes de consultar.",
      },
      {
        id: "D",
        text: "Ejecutar trabajos de Spark con librerías propias en un clúster que se controla",
        correct: false,
        explanation:
          "Ejecutar Spark en un clúster con control sobre las instancias y librerías es el caso de Amazon EMR. Tienta porque Athena también puede ejecutar cuadernos de Spark. Pero no da control sobre el clúster, y esa es la condición del enunciado.",
      },
      {
        id: "E",
        text: "Mostrar tableros con gráficos a la dirección",
        correct: false,
        explanation:
          "Los tableros con gráficos para el negocio son el trabajo de Amazon QuickSight. Tienta porque Athena puede ser la fuente de datos de esos tableros. Pero ni Athena ni Redshift dibujan tableros.",
      },
    ],
    tips: [
      "Athena: ocasional, sin servidores, sobre S3. Redshift: intensivo, concurrente, rendimiento estable.",
      "Cuando la pregunta compara dos servicios, busca en el enunciado la palabra que inclina la balanza: 'ocasional' o 'una vez al mes' frente a 'todo el día' o 'cientos de usuarios'.",
    ],
  },
  {
    id: "ref2-gr-d3-q27",
    topic: "3",
    multiple: true,
    prompt:
      "¿Qué dos de estos servicios procesan datos en un clúster cuyo tipo y cantidad de nodos o instancias elige el cliente? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Amazon EMR en EC2",
        correct: true,
        explanation:
          "Correcta. En Amazon EMR en EC2 el cliente elige el tipo y la cantidad de instancias del clúster donde corren Spark, Hadoop y los demás marcos. (EMR también tiene una modalidad sin servidor, EMR Serverless, donde no se eligen instancias.)",
      },
      {
        id: "B",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Amazon Athena consulta con SQL los archivos de S3 sin que el cliente vea ni elija servidores: es sin servidor. Tienta porque detrás hay capacidad de procesamiento. Pero esa capacidad la administra AWS por completo.",
      },
      {
        id: "C",
        text: "Amazon QuickSight",
        correct: false,
        explanation:
          "Amazon QuickSight es el servicio de tableros de inteligencia de negocio, y se paga por usuario o por sesión. Tienta porque es parte del ecosistema de analítica. Pero no tiene clúster: es un servicio administrado de visualización.",
      },
      {
        id: "D",
        text: "Amazon S3",
        correct: false,
        explanation:
          "Amazon S3 es almacenamiento de objetos donde suelen vivir los datos que analizan los otros servicios. Tienta porque está en el centro de cualquier lago de datos. Pero guarda datos; no los procesa en un clúster.",
      },
      {
        id: "E",
        text: "Amazon Redshift con clúster aprovisionado",
        correct: true,
        explanation:
          "Correcta. Al crear un clúster aprovisionado de Redshift el cliente elige el tipo y la cantidad de nodos. (Redshift también tiene una modalidad sin servidor, pero no es la que nombra la opción.)",
      },
    ],
    tips: [
      "Con clúster que el cliente dimensiona: EMR en EC2 y Redshift aprovisionado. Sin servidores: Athena. Servicio de visualización: QuickSight.",
      "'Control sobre el clúster' en el enunciado descarta Athena.",
    ],
  },

  // --- CI/CD: CodeBuild, CodeDeploy y CodePipeline -------------------------
  {
    id: "ref2-gr-d3-q28",
    topic: "3",
    prompt:
      "¿Qué servicio compila el código fuente, ejecuta las pruebas unitarias y produce el paquete listo para desplegar, sin servidores de compilación que administrar y cobrando por minuto?",
    options: [
      {
        id: "A",
        text: "AWS CodePipeline",
        correct: false,
        explanation:
          "AWS CodePipeline orquesta el flujo de entrega: define etapas (código, compilación, pruebas, aprobación, despliegue) y las ejecuta en orden cada vez que hay un cambio. Tienta porque la compilación es una de sus etapas. Pero CodePipeline no compila: le encarga esa etapa a otro servicio.",
      },
      {
        id: "B",
        text: "AWS CodeDeploy",
        correct: false,
        explanation:
          "AWS CodeDeploy instala una versión de la aplicación en EC2, servidores locales, ECS o Lambda, en lotes y con reversión automática. Tienta porque trabaja con el paquete. Pero lo recibe ya armado: no compila ni ejecuta pruebas unitarias.",
      },
      {
        id: "C",
        text: "AWS CodeBuild",
        correct: true,
        explanation:
          "Correcta. AWS CodeBuild es el servicio administrado de compilación: compila, ejecuta las pruebas y genera los artefactos en contenedores que AWS levanta para cada compilación, y cobra por minuto.",
      },
      {
        id: "D",
        text: "AWS CloudFormation",
        correct: false,
        explanation:
          "AWS CloudFormation crea y actualiza infraestructura a partir de plantillas (infraestructura como código). Tienta porque automatiza el despliegue. Pero crea recursos de AWS, no compila el código de la aplicación.",
      },
    ],
    tips: [
      "Compilar y probar: CodeBuild. Instalar en servidores o funciones: CodeDeploy. Encadenar todo: CodePipeline.",
      "CodePipeline orquesta: el trabajo de cada etapa, como compilar o instalar, lo suele hacer un servicio especializado al que llama.",
    ],
  },
  {
    id: "ref2-gr-d3-q29",
    topic: "3",
    prompt:
      "Un equipo ya usa CodeBuild para compilar y CodeDeploy para instalar, pero los lanza a mano. Quiere que cada cambio en la rama principal recorra solo esos pasos, con una aprobación de QA en el medio, y ver en una consola en qué etapa está cada versión. ¿Qué servicio agrega?",
    options: [
      {
        id: "A",
        text: "Más grupos de despliegue de AWS CodeDeploy",
        correct: false,
        explanation:
          "AWS CodeDeploy automatiza la instalación de una versión en servidores, contenedores o funciones, con lotes y reversión, y organiza sus destinos en grupos de despliegue. Tienta porque CodeDeploy ya automatiza la instalación y parece que bastaría con ampliarlo. Pero no detecta cambios en el repositorio, no tiene etapas de aprobación ni encadena la compilación.",
      },
      {
        id: "B",
        text: "AWS CloudFormation",
        correct: false,
        explanation:
          "AWS CloudFormation crea y actualiza recursos de AWS desde plantillas. Tienta porque es automatización y puede formar parte de un despliegue. Pero describe infraestructura; no organiza las etapas de entrega de una aplicación.",
      },
      {
        id: "C",
        text: "Más proyectos de AWS CodeBuild",
        correct: false,
        explanation:
          "AWS CodeBuild compila y ejecuta pruebas en contenedores administrados. Tienta porque se podría escribir un script que llame a todo desde una compilación. Pero no tiene aprobaciones manuales ni una vista de etapas: es una pieza, no el flujo.",
      },
      {
        id: "D",
        text: "AWS CodePipeline",
        correct: true,
        explanation:
          "Correcta. AWS CodePipeline modela el flujo de entrega como etapas: detecta el cambio en el repositorio, llama a CodeBuild, espera la aprobación manual, llama a CodeDeploy y muestra en la consola el estado de cada ejecución.",
      },
    ],
    tips: [
      "'Encadenar', 'orquestar', 'etapas', 'aprobación manual', 'cada cambio en el repositorio': CodePipeline.",
      "CodePipeline es el director; CodeBuild y CodeDeploy son los músicos.",
    ],
  },
  {
    id: "ref2-gr-d3-q30",
    topic: "3",
    prompt:
      "Una empresa no usa pipelines de entrega: quiere un servicio dedicado a desplegar, al que su equipo le pase cada versión nueva de una función Lambda para enviarle primero el 10 % del tráfico durante diez minutos y volver a la versión anterior automáticamente si una alarma de CloudWatch se dispara. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "AWS CodeDeploy",
        correct: true,
        explanation:
          "Correcta. AWS CodeDeploy es el servicio dedicado a desplegar: hace despliegues graduales en Lambda (canario o lineal), moviendo el tráfico entre versiones de a poco, y revierte automáticamente si se dispara una alarma. Se usa con o sin pipeline.",
      },
      {
        id: "B",
        text: "AWS CodePipeline",
        correct: false,
        explanation:
          "AWS CodePipeline orquesta las etapas de entrega, y desde 2025 tiene incluso una acción propia que despliega en Lambda moviendo el tráfico de a poco. Tienta porque es el servicio de CI/CD más nombrado. Pero esa acción existe dentro de un pipeline, y la empresa no quiere uno: el servicio dedicado a desplegar, que se usa por sí solo, es otro.",
      },
      {
        id: "C",
        text: "AWS CodeBuild",
        correct: false,
        explanation:
          "AWS CodeBuild compila el código y ejecuta pruebas en contenedores administrados. Tienta porque prepara la versión nueva. Pero termina cuando el paquete está listo; no lo publica ni reparte tráfico.",
      },
      {
        id: "D",
        text: "Amazon CloudWatch",
        correct: false,
        explanation:
          "Amazon CloudWatch reúne métricas y registros y dispara alarmas cuando una métrica cruza un umbral. Tienta porque el enunciado menciona su alarma. Pero CloudWatch solo avisa; quien reacciona y revierte el despliegue es otro servicio.",
      },
    ],
    tips: [
      "Despliegue gradual (canario, lineal, por lotes) con reversión automática: CodeDeploy.",
      "CodeDeploy funciona con EC2, servidores locales, ECS y Lambda.",
    ],
  },
  {
    id: "ref2-gr-d3-q31",
    topic: "3",
    prompt: "¿Cuál es la relación correcta entre AWS CodePipeline y AWS CodeDeploy?",
    options: [
      {
        id: "A",
        text: "CodeDeploy organiza todo el flujo de entrega y llama a CodePipeline para instalar en los servidores",
        correct: false,
        explanation:
          "Esta opción invierte los papeles. CodeDeploy es el servicio que instala versiones en servidores, contenedores o funciones; CodePipeline es el que organiza las etapas. Tienta porque los dos nombres suenan parecidos y los dos participan del despliegue. Pero CodeDeploy no organiza flujos ni llama a CodePipeline.",
      },
      {
        id: "B",
        text: "CodePipeline organiza las etapas de entrega y, en la etapa de despliegue, puede llamar a CodeDeploy",
        correct: true,
        explanation:
          "Correcta. CodePipeline define y ejecuta las etapas; en la de despliegue suele delegar en CodeDeploy, que es el que instala la versión en los destinos con lotes y reversión.",
      },
      {
        id: "C",
        text: "Son el mismo servicio con dos nombres: uno para EC2 y otro para Lambda",
        correct: false,
        explanation:
          "Son dos servicios distintos: CodeDeploy despliega en EC2, Lambda, ECS y servidores locales, y CodePipeline orquesta las etapas de entrega. Tienta porque ambos aparecen juntos en cualquier flujo de CI/CD. Pero son servicios distintos, con funciones distintas.",
      },
      {
        id: "D",
        text: "CodePipeline instala el software en las instancias, así que CodeDeploy solo se usa sin pipeline",
        correct: false,
        explanation:
          "Instalar el software en las instancias es justamente la función de CodeDeploy. Tienta porque CodePipeline tiene una etapa llamada 'despliegue'. Pero en el flujo clásico, en esa etapa CodePipeline delega en un proveedor de despliegue como CodeDeploy, y CodeDeploy se usa con o sin pipeline: la segunda mitad de la opción es falsa.",
      },
    ],
    tips: [
      "CodePipeline = el flujo completo. CodeDeploy = el paso de instalar.",
      "Pregúntate: ¿la opción describe todo el camino o solo el último paso?",
    ],
  },
  {
    id: "ref2-gr-d3-q32",
    topic: "3",
    multiple: true,
    prompt: "¿Qué dos tareas realiza AWS CodeDeploy? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Compilar el código y ejecutar las pruebas unitarias",
        correct: false,
        explanation:
          "Compilar y ejecutar pruebas es la función de AWS CodeBuild. Tienta porque es un paso previo al despliegue. Pero CodeDeploy recibe el paquete ya compilado.",
      },
      {
        id: "B",
        text: "Definir etapas con una aprobación manual antes de producción",
        correct: false,
        explanation:
          "Definir etapas y aprobaciones manuales es la función de AWS CodePipeline, el orquestador del flujo de entrega. Es la confusión que se repite entre estos dos servicios. Pero CodeDeploy no tiene etapas de aprobación: hace un despliegue cuando se lo piden.",
      },
      {
        id: "C",
        text: "Instalar una versión en 200 instancias EC2 de a lotes, por ejemplo de a un cuarto",
        correct: true,
        explanation:
          "Correcta. CodeDeploy reparte la instalación en lotes según la configuración elegida (de a una, la mitad, todas a la vez o personalizada), para no dejar la aplicación sin servidores.",
      },
      {
        id: "D",
        text: "Guardar el código fuente en un repositorio Git",
        correct: false,
        explanation:
          "Guardar el código en un repositorio Git es la función de un servicio de control de versiones, como GitHub o AWS CodeCommit. Tienta porque es el punto de partida de todo el flujo. Pero CodeDeploy no guarda código fuente.",
      },
      {
        id: "E",
        text: "Volver automáticamente a la versión anterior si el despliegue falla",
        correct: true,
        explanation:
          "Correcta. CodeDeploy puede revertir automáticamente un despliegue cuando falla o cuando se dispara una alarma, volviendo a la última versión que funcionaba.",
      },
    ],
    tips: [
      "CodeDeploy: dónde y cómo se instala (lotes, canario, reversión).",
      "Si la opción habla de aprobaciones o etapas, es CodePipeline; si habla de compilar, es CodeBuild.",
    ],
  },
  {
    id: "ref2-gr-d3-q33",
    topic: "3",
    multiple: true,
    prompt: "¿Qué dos tareas realiza AWS CodePipeline? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Detectar un cambio en el repositorio e iniciar una ejecución del flujo",
        correct: true,
        explanation:
          "Correcta. CodePipeline vigila el origen (un repositorio o un bucket) y, cuando hay un cambio, inicia una ejecución que recorre todas las etapas.",
      },
      {
        id: "B",
        text: "Instalar el agente en las instancias EC2 de destino",
        correct: false,
        explanation:
          "El agente que se instala en las instancias EC2 de destino es el agente de CodeDeploy, que recibe y ejecuta las instrucciones de instalación. Tienta porque está ligado al despliegue. Pero pertenece a CodeDeploy, no a CodePipeline.",
      },
      {
        id: "C",
        text: "Incluir una etapa de aprobación manual antes de pasar a producción",
        correct: true,
        explanation:
          "Correcta. CodePipeline permite poner una acción de aprobación manual entre etapas: el flujo se detiene hasta que alguien aprueba o rechaza.",
      },
      {
        id: "D",
        text: "Compilar el código dentro de contenedores administrados",
        correct: false,
        explanation:
          "Compilar en contenedores administrados es la función de AWS CodeBuild. Tienta porque la compilación es una etapa del flujo. Pero CodePipeline le delega esa etapa a CodeBuild.",
      },
      {
        id: "E",
        text: "Crear los grupos de despliegue que reúnen las instancias de destino",
        correct: false,
        explanation:
          "Los grupos de despliegue son un concepto de AWS CodeDeploy: el conjunto de instancias, servicios de ECS o funciones Lambda donde se instala una versión, con su configuración de lotes y reversión. Tienta porque la etapa de despliegue del flujo los usa. Pero se crean en CodeDeploy; CodePipeline solo los nombra en su etapa de despliegue.",
      },
    ],
    tips: [
      "CodePipeline: dispara el flujo, ordena las etapas, pide aprobaciones y muestra el estado.",
      "Las tareas técnicas de cada etapa, como compilar o instalar en servidores, suelen hacerlas servicios especializados como CodeBuild y CodeDeploy.",
    ],
  },
];
