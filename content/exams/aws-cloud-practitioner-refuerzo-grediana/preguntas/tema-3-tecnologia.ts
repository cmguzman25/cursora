import type { ExamQuestionWithTopic } from "../../types";

/**
 * Dominio 3 — Tecnología y servicios en la nube. Veintiuna preguntas, tres por
 * cada fallo:
 *
 *   - sim-d3-q05 (eligió "elimina el servidor de origen" para CloudFront): q01–q03
 *   - sim-d3-q14 (eligió internet gateway; era Direct Connect): q04–q06
 *   - sim-d3-q16 (eligió S3 montado como disco; era EBS): q07–q09
 *   - sim-d3-q18 (eligió DMS y EBS; eran Snowball y Storage Gateway): q10–q12
 *   - sim-d3-q19 (eligió Polly; era Transcribe): q13–q15
 *   - sim-d3-q20 (eligió Redshift; era Athena): q16–q18
 *   - sim-d3-q22 (acertó WorkSpaces y eligió AppStream 2.0 en lugar de CodePipeline): q19–q21.
 *     Por eso dos de las tres van a la familia de CI/CD (q20, q21) y una a escritorios (q19).
 */
export const TEMA_3_TECNOLOGIA: ExamQuestionWithTopic[] = [
  {
    id: "ref-gr-d3-q01",
    topic: "3",
    prompt:
      "Un equipo pone Amazon CloudFront delante de su servidor web. Un usuario en Tokio pide una imagen que nadie había pedido antes desde esa zona. ¿Qué hace la ubicación de borde de CloudFront?",
    options: [
      {
        id: "A",
        text: "La genera a partir de una copia completa del sitio que CloudFront replicó al configurarse",
        correct: false,
        explanation:
          "Es la idea que hace pensar que CloudFront reemplaza al origen: que al activarlo todo el sitio se copia a cada ubicación de borde. No es así. CloudFront no replica el sitio por adelantado; guarda lo que se le va pidiendo.",
      },
      {
        id: "B",
        text: "La pide al servidor de origen, se la entrega al usuario y la guarda en caché para los siguientes",
        correct: true,
        explanation:
          "Correcta. CloudFront es una caché: cuando no tiene el objeto, lo busca en el origen (a veces pasando por una caché regional), lo sirve y lo guarda durante el tiempo configurado. El origen sigue siendo la fuente de verdad.",
      },
      {
        id: "C",
        text: "Devuelve un error hasta que el equipo suba la imagen a esa ubicación de borde",
        correct: false,
        explanation:
          "Tienta a quien imagina las ubicaciones de borde como servidores que hay que cargar a mano. Pero el cliente no sube nada a las ubicaciones de borde: CloudFront las llena solo, a pedido, desde el origen.",
      },
      {
        id: "D",
        text: "Redirige al usuario a la zona de disponibilidad más cercana de la región de Tokio",
        correct: false,
        explanation:
          "Mezcla dos piezas de la infraestructura global. Las ubicaciones de borde no son zonas de disponibilidad, y CloudFront no redirige al usuario: le responde desde el borde, trayendo lo que falta del origen.",
      },
    ],
    tips: [
      "CloudFront es una caché delante de un origen. Sin origen no hay nada que cachear.",
      "La primera solicitud de un objeto en una ubicación de borde siempre llega al origen; las siguientes, no.",
    ],
  },
  {
    id: "ref-gr-d3-q02",
    topic: "3",
    prompt:
      "Un juego en línea usa tráfico UDP propio (no HTTP) entre los jugadores y sus servidores en dos regiones. Quiere que los jugadores entren a la red de AWS en el punto más cercano, con dos direcciones IP fijas que no cambien aunque se mueva un servidor de región. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon CloudFront",
        correct: false,
        explanation:
          "Usuarios en todo el mundo y baja latencia suenan a CloudFront, por eso es la trampa. Pero CloudFront es una caché de contenido web: no sirve para tráfico UDP de un juego en tiempo real, donde no hay nada que cachear, ni da direcciones IP fijas.",
      },
      {
        id: "B",
        text: "Amazon S3 Transfer Acceleration",
        correct: false,
        explanation:
          "También usa las ubicaciones de borde para acelerar, y por eso se parece. Pero solo acelera las subidas y descargas de objetos a un bucket de S3.",
      },
      {
        id: "C",
        text: "Amazon Route 53 con enrutamiento por latencia",
        correct: false,
        explanation:
          "Route 53 puede mandar a cada jugador a la región más cercana, y eso cubre parte del pedido. Pero es DNS: devuelve las IP de cada región, que cambian si se mueve un servidor, y el tráfico viaja por internet hasta la región.",
      },
      {
        id: "D",
        text: "AWS Global Accelerator",
        correct: true,
        explanation:
          "Correcta. Global Accelerator da dos IP estáticas anycast; el usuario entra a la red de AWS en la ubicación de borde más cercana y viaja por la red privada de AWS hasta el servidor. Funciona con TCP y UDP, sin caché.",
      },
    ],
    tips: [
      "CloudFront cachea contenido HTTP. Global Accelerator acelera conexiones TCP o UDP sin cachear nada, y da IP fijas.",
      "Si el enunciado dice 'IP estáticas' o 'UDP', descartá CloudFront.",
    ],
  },
  {
    id: "ref-gr-d3-q03",
    topic: "3",
    multiple: true,
    prompt:
      "Una plataforma de video bajo demanda tiene clientes en todo el mundo y sus servidores en una sola región. ¿Cuáles DOS efectos tiene servir los videos a través de Amazon CloudFront? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Los videos que ya se pidieron en una zona se entregan desde la ubicación de borde, sin consultar al origen",
        correct: true,
        explanation:
          "Correcta. Ese es el efecto que alivia al origen: cada objeto cacheado responde las siguientes solicitudes desde el borde, mientras su tiempo de vida en caché no venza.",
      },
      {
        id: "B",
        text: "El servicio sigue funcionando aunque se borren los servidores, porque el contenido ya está en el borde",
        correct: false,
        explanation:
          "Es la misma confusión de 'CloudFront reemplaza al origen'. La caché tiene vencimiento y solo guarda lo pedido: un video nunca visto o una caché expirada necesitan el origen.",
      },
      {
        id: "C",
        text: "Los servidores de origen se copian automáticamente a otras regiones cercanas a los usuarios",
        correct: false,
        explanation:
          "Parece una forma de bajar la latencia, y por eso tienta. Pero CloudFront no replica servidores ni crea recursos en otras regiones: cachea respuestas en el borde.",
      },
      {
        id: "D",
        text: "Desaparece el cargo por transferencia de datos hacia los usuarios",
        correct: false,
        explanation:
          "Tienta porque la transferencia del origen en AWS hacia CloudFront no se cobra. Pero lo que CloudFront entrega a los usuarios sí tiene un costo de transferencia, aunque suele ser menor.",
      },
      {
        id: "E",
        text: "Los usuarios lejanos se conectan a una ubicación de borde cercana, lo que reduce la latencia",
        correct: true,
        explanation:
          "Correcta. El usuario de Australia ya no viaja hasta la región del origen: se conecta a una ubicación de borde cerca suyo, y eso baja la latencia aunque el origen esté lejos.",
      },
    ],
    tips: [
      "Los dos beneficios de CloudFront van juntos: menos latencia para el usuario y menos carga para el origen. Ninguno elimina al origen.",
      "Desconfiá de las opciones que dicen 'desaparece' o 'ya no hace falta' algo en una CDN.",
    ],
  },
  {
    id: "ref-gr-d3-q04",
    topic: "3",
    prompt:
      "Una empresa necesita conectar su oficina con su VPC esta misma semana para que unos pocos empleados accedan a una aplicación interna. El tráfico es bajo, y le alcanza con que viaje cifrado por su conexión a internet actual. ¿Qué elige?",
    options: [
      {
        id: "A",
        text: "Una conexión AWS Site-to-Site VPN",
        correct: true,
        explanation:
          "Correcta. Una VPN de sitio a sitio crea túneles IPsec cifrados sobre internet. Se configura en horas, es barata y alcanza para poco tráfico. Es lo que se elige cuando internet es aceptable.",
      },
      {
        id: "B",
        text: "Un internet gateway en la VPC",
        correct: false,
        explanation:
          "Conecta la VPC con internet, y la oficina está en internet: por eso parece servir. Pero expone la aplicación a todo internet, sin túnel ni cifrado propio. No crea un enlace privado entre la oficina y la VPC.",
      },
      {
        id: "C",
        text: "AWS Direct Connect",
        correct: false,
        explanation:
          "Es la respuesta cuando se pide un enlace privado y estable, y por eso es la tentación. Pero un enlace dedicado tarda semanas en instalarse, cuesta más, y por defecto no cifra el tráfico. Para poco tráfico esta semana, es la herramienta equivocada.",
      },
      {
        id: "D",
        text: "Un VPC peering",
        correct: false,
        explanation:
          "El peering conecta dos VPC entre sí, dentro de AWS. La oficina no es una VPC, así que no aplica.",
      },
    ],
    tips: [
      "Rápido, barato, cifrado y por internet: VPN. Dedicado, consistente y sin internet: Direct Connect.",
      "Direct Connect no se instala en una semana: si el enunciado tiene apuro, casi seguro es VPN.",
    ],
  },
  {
    id: "ref-gr-d3-q05",
    topic: "3",
    prompt:
      "Una plataforma de operaciones bursátiles necesita que la latencia entre su centro de datos y su VPC sea predecible y estable todo el día, sin depender de cómo esté internet en cada momento. ¿Qué servicio cumple este requisito?",
    options: [
      {
        id: "A",
        text: "AWS Site-to-Site VPN",
        correct: false,
        explanation:
          "La VPN suena privada porque cifra el tráfico, y eso la hace tentadora. Pero los túneles viajan por internet: la latencia sube y baja con el estado de la red pública, que es justo lo que el enunciado no acepta.",
      },
      {
        id: "B",
        text: "Un internet gateway con una IP elástica",
        correct: false,
        explanation:
          "Una IP fija da estabilidad de dirección, no de latencia. Todo el tráfico que pasa por un internet gateway viaja por internet.",
      },
      {
        id: "C",
        text: "AWS Direct Connect",
        correct: true,
        explanation:
          "Correcta. Direct Connect es un enlace físico dedicado entre el centro de datos (o un punto de presencia) y AWS. Al no pasar por internet, da ancho de banda y latencia consistentes.",
      },
      {
        id: "D",
        text: "Un VPC peering",
        correct: false,
        explanation:
          "El peering da conectividad privada y de baja latencia, pero entre VPC. No conecta un centro de datos del cliente.",
      },
    ],
    tips: [
      "Las palabras 'consistente', 'predecible' o 'sin pasar por internet' entre un centro de datos y AWS señalan a Direct Connect.",
      "Cifrar el tráfico no lo saca de internet: una VPN es privada en contenido, no en camino.",
    ],
  },
  {
    id: "ref-gr-d3-q06",
    topic: "3",
    multiple: true,
    prompt:
      "Una empresa necesita dos cosas en su VPC: que los servidores web de una subred pública reciban tráfico de usuarios en internet, y un enlace privado y dedicado de 10 Gbps hacia su centro de datos para sincronizar datos todas las noches. ¿Cuáles DOS componentes usa? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "AWS Transit Gateway",
        correct: false,
        explanation:
          "Transit Gateway aparece seguido en preguntas de conectividad híbrida, y por eso tienta. Pero es un concentrador que interconecta muchas VPC y conexiones; no es en sí un enlace dedicado al centro de datos ni da acceso desde internet.",
      },
      {
        id: "B",
        text: "Un internet gateway",
        correct: true,
        explanation:
          "Correcta. Es lo que hace que una subred sea pública: permite que los recursos con IP pública reciban y envíen tráfico de internet. Es la pieza correcta para los usuarios, no para el centro de datos.",
      },
      {
        id: "C",
        text: "Un NAT gateway",
        correct: false,
        explanation:
          "Se confunde con el internet gateway porque los dos tienen que ver con salir a internet. Pero el NAT gateway solo permite conexiones salientes desde subredes privadas; nadie desde internet puede iniciar una conexión a través de él.",
      },
      {
        id: "D",
        text: "AWS Direct Connect",
        correct: true,
        explanation:
          "Correcta. Es el enlace privado y dedicado hacia el centro de datos, con velocidades como 1, 10 o 100 Gbps y sin pasar por internet.",
      },
      {
        id: "E",
        text: "Una conexión Site-to-Site VPN",
        correct: false,
        explanation:
          "Conecta el centro de datos, así que cubre la mitad de la idea. Pero viaja por internet: no es dedicada y su ancho de banda por túnel es limitado.",
      },
    ],
    tips: [
      "Internet gateway: tráfico entre la VPC e internet. Direct Connect: enlace dedicado entre la VPC y tu centro de datos. Son puertas a lugares distintos.",
      "NAT gateway deja salir, no deja entrar.",
    ],
  },
  {
    id: "ref-gr-d3-q07",
    topic: "3",
    prompt:
      "Veinte instancias EC2 con Linux, repartidas en tres zonas de disponibilidad, necesitan leer y escribir al mismo tiempo en un mismo sistema de archivos compartido que crezca solo. ¿Qué almacenamiento usan?",
    options: [
      {
        id: "A",
        text: "Un volumen de Amazon EBS",
        correct: false,
        explanation:
          "EBS es el disco persistente de EC2, y por eso tienta. Pero un volumen EBS vive en una sola zona de disponibilidad y, salvo casos especiales dentro de la misma AZ, se adjunta a una instancia por vez. No sirve para veinte instancias en tres zonas.",
      },
      {
        id: "B",
        text: "El almacén de instancia de una de ellas, compartido por la red",
        correct: false,
        explanation:
          "Compartirlo por la red suena ingenioso, pero el almacén de instancia es efímero: si esa instancia se detiene o falla, las veinte pierden los archivos.",
      },
      {
        id: "C",
        text: "Un bucket de Amazon S3",
        correct: false,
        explanation:
          "S3 es accesible desde todas las zonas y crece solo, que es la mitad del pedido. Pero es almacenamiento de objetos, no un sistema de archivos que se monte y se modifique como un disco: no se edita una parte de un archivo, se reemplaza el objeto entero.",
      },
      {
        id: "D",
        text: "Amazon EFS",
        correct: true,
        explanation:
          "Correcta. EFS es un sistema de archivos NFS administrado: lo montan muchas instancias Linux a la vez, desde varias zonas de disponibilidad, y crece y se achica solo.",
      },
    ],
    tips: [
      "Bloque para una instancia: EBS. Archivos compartidos por muchas instancias: EFS. Objetos accesibles por API: S3.",
      "S3 no es un disco. Si el enunciado pide 'sistema de archivos' o 'montar', no es S3.",
    ],
  },
  {
    id: "ref-gr-d3-q08",
    topic: "3",
    prompt:
      "Una aplicación de procesamiento necesita un espacio temporal para archivos intermedios con la mayor velocidad de lectura y escritura posible. Si la instancia se detiene, esos archivos no importan: se regeneran en la siguiente ejecución. ¿Qué almacenamiento conviene?",
    options: [
      {
        id: "A",
        text: "El almacén de instancia (instance store)",
        correct: true,
        explanation:
          "Correcta. El almacén de instancia son discos conectados físicamente al servidor: dan muy alto rendimiento y no tienen costo aparte. Que se pierdan al detener la instancia es un problema para datos importantes, pero acá el enunciado dice que no importa.",
      },
      {
        id: "B",
        text: "Un volumen de Amazon EBS",
        correct: false,
        explanation:
          "Es la respuesta correcta cuando los datos tienen que sobrevivir a un reinicio, y por eso tienta después de aprender esa regla. Pero acá la persistencia no se pide: se pide velocidad para datos descartables, y para eso el almacén de instancia es más rápido y no se paga aparte.",
      },
      {
        id: "C",
        text: "Un bucket de Amazon S3",
        correct: false,
        explanation:
          "S3 es durable y barato, pero cada lectura y escritura es una llamada por red. Para archivos intermedios que se escriben y leen todo el tiempo es la opción más lenta de la lista.",
      },
      {
        id: "D",
        text: "Amazon S3 Glacier Deep Archive",
        correct: false,
        explanation:
          "Deep Archive es la clase más barata de S3, para archivar datos que casi nunca se consultan, y recuperar un objeto tarda horas. Es lo opuesto a lo que se pide.",
      },
    ],
    tips: [
      "Almacén de instancia: rapidísimo y efímero. Sirve para caché, búferes y datos temporales; nunca para lo que no se puede perder.",
      "La regla no es 'siempre EBS': es 'EBS cuando los datos tienen que sobrevivir a la instancia'.",
    ],
  },
  {
    id: "ref-gr-d3-q09",
    topic: "3",
    multiple: true,
    prompt:
      "¿Cuáles DOS afirmaciones describen correctamente a un volumen de Amazon EBS? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Se puede adjuntar directamente a una instancia de cualquier zona de disponibilidad de la región",
        correct: false,
        explanation:
          "Tienta porque muchos servicios de AWS son regionales. Pero un volumen EBS se crea en una zona de disponibilidad y solo se adjunta a instancias de esa zona; para llevarlo a otra se pasa por una instantánea.",
      },
      {
        id: "B",
        text: "Pierde sus datos cada vez que la instancia se detiene",
        correct: false,
        explanation:
          "Es el comportamiento del almacén de instancia, no de EBS. Confundirlos es justamente el error que esta pregunta busca separar.",
      },
      {
        id: "C",
        text: "Conserva sus datos aunque la instancia se detenga o se desconecte de él",
        correct: true,
        explanation:
          "Correcta. EBS es almacenamiento en bloque por red, independiente del servidor físico: el volumen sigue existiendo aunque la instancia se detenga, y se puede adjuntar a otra.",
      },
      {
        id: "D",
        text: "Permite tomar instantáneas que se guardan en Amazon S3",
        correct: true,
        explanation:
          "Correcta. Las instantáneas (snapshots) de EBS son copias incrementales guardadas en S3, de forma administrada por AWS. Sirven como respaldo y para crear volúmenes nuevos, incluso en otra zona o región.",
      },
      {
        id: "E",
        text: "Lo pueden montar miles de instancias a la vez como sistema de archivos compartido",
        correct: false,
        explanation:
          "Eso describe a EFS. EBS es un disco en bloque pensado para una instancia; incluso su modo de adjuntar a varias tiene límites estrictos y queda dentro de una misma zona.",
      },
    ],
    tips: [
      "EBS: persistente, de una zona de disponibilidad, con instantáneas en S3.",
      "Si una afirmación sobre EBS habla de perder datos al detener, está describiendo el almacén de instancia.",
    ],
  },
  {
    id: "ref-gr-d3-q10",
    topic: "3",
    prompt:
      "Un laboratorio en una zona rural tiene 500 TB de imágenes satelitales que quiere llevar a Amazon S3. Su conexión a internet es lenta e inestable, y transferirlas por red tardaría más de un año. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "AWS DataSync",
        correct: false,
        explanation:
          "DataSync es el servicio de AWS para mover datos a S3 o EFS, y por eso es la tentación. Pero mueve los datos por la red: con una conexión lenta e inestable, tarda lo mismo que cualquier otra transferencia en línea.",
      },
      {
        id: "B",
        text: "AWS Snowball Edge",
        correct: true,
        explanation:
          "Correcta. Snowball Edge es un dispositivo físico que AWS envía al cliente: se cargan los datos localmente, se devuelve el equipo y AWS los sube a S3. Cuando la red es el cuello de botella, se mueven los datos en un camión.",
      },
      {
        id: "C",
        text: "AWS Database Migration Service",
        correct: false,
        explanation:
          "'Migrar' está en el nombre, y por eso aparece en cualquier pregunta de migración. Pero DMS migra bases de datos, y lo que hay acá son archivos de imágenes.",
      },
      {
        id: "D",
        text: "Amazon S3 Transfer Acceleration",
        correct: false,
        explanation:
          "Acelera la parte del camino que va de la ubicación de borde hasta la región. Pero el tramo lento acá es la conexión del laboratorio, y eso ningún servicio en línea lo arregla.",
      },
    ],
    tips: [
      "Muchos terabytes y una red que no da abasto: familia Snow. Ningún servicio en línea es más rápido que la red por la que viaja.",
      "DMS es para bases de datos. Si son archivos, descartalo.",
    ],
  },
  {
    id: "ref-gr-d3-q11",
    topic: "3",
    prompt:
      "Una empresa respalda sus servidores con un software de backup que escribe en una biblioteca de cintas físicas. Quiere dejar de comprar y guardar cintas, y llevar esos respaldos a AWS sin cambiar el software ni su configuración. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "AWS Snowball",
        correct: false,
        explanation:
          "Snowball puede llevar a AWS las cintas que ya existen, de una vez, y por eso aparece. Pero el pedido es seguir respaldando todos los días sin cambiar el software, y un dispositivo que se envía por correo no es un destino de backup permanente.",
      },
      {
        id: "B",
        text: "Amazon EBS",
        correct: false,
        explanation:
          "EBS es almacenamiento en bloque para instancias EC2 dentro de AWS. El software de backup está en el centro de datos del cliente y no puede escribir en un volumen EBS como si fuera una cinta.",
      },
      {
        id: "C",
        text: "AWS Storage Gateway",
        correct: true,
        explanation:
          "Correcta. Storage Gateway, en su modo de cintas (Tape Gateway), se presenta al software de backup como una biblioteca de cintas virtual y guarda los respaldos en S3 y S3 Glacier. El software no se entera del cambio.",
      },
      {
        id: "D",
        text: "AWS DataSync",
        correct: false,
        explanation:
          "DataSync mueve y sincroniza archivos, y eso suena a respaldar. Pero no se presenta como una biblioteca de cintas: habría que cambiar el software de backup, que es justo lo que no se quiere.",
      },
    ],
    tips: [
      "Una aplicación local que tiene que seguir funcionando igual mientras los datos viven en AWS: Storage Gateway.",
      "Snowball es una mudanza, de una vez. Storage Gateway es un puente, que queda funcionando.",
    ],
  },
  {
    id: "ref-gr-d3-q12",
    topic: "3",
    multiple: true,
    prompt:
      "Una empresa con una buena conexión de 10 Gbps a AWS quiere sincronizar cada semana 2 TB de archivos de un servidor NFS local con Amazon EFS, y migrar una vez su base de datos Oracle a Amazon Aurora con la menor interrupción posible. ¿Cuáles DOS servicios usa? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "AWS DataSync",
        correct: true,
        explanation:
          "Correcta. Con buena red, DataSync es la herramienta para mover y sincronizar archivos de NFS o SMB hacia S3, EFS o FSx de forma programada, verificando la integridad de lo que copia.",
      },
      {
        id: "B",
        text: "AWS Snowball",
        correct: false,
        explanation:
          "Snowball se asocia con migrar volúmenes grandes, y por eso se elige por reflejo. Pero acá la red alcanza de sobra para 2 TB por semana, y un dispositivo físico no sirve para una sincronización que se repite cada semana.",
      },
      {
        id: "C",
        text: "AWS Database Migration Service",
        correct: true,
        explanation:
          "Correcta. DMS migra bases de datos manteniendo la base de origen en funcionamiento y replicando los cambios mientras dura la migración, lo que reduce la interrupción. Para pasar de Oracle a Aurora se combina con la herramienta de conversión de esquemas.",
      },
      {
        id: "D",
        text: "AWS Storage Gateway",
        correct: false,
        explanation:
          "Storage Gateway también une lo local con AWS, por eso se parece. Pero sirve para que aplicaciones locales sigan usando almacenamiento respaldado en la nube; no es una herramienta de sincronización programada ni de migración de bases.",
      },
      {
        id: "E",
        text: "Amazon EBS",
        correct: false,
        explanation:
          "EBS es almacenamiento para instancias EC2. No mueve ni migra nada desde el centro de datos.",
      },
    ],
    tips: [
      "Para elegir la herramienta de migración, primero mirá la red: si alcanza, DataSync (archivos) o DMS (bases); si no, la familia Snow.",
      "DMS es la respuesta cuando lo que se mueve es una base de datos, sobre todo si se pide poca interrupción.",
    ],
  },
  {
    id: "ref-gr-d3-q13",
    topic: "3",
    prompt:
      "Una aplicación para personas con baja visión quiere leer en voz alta los artículos de un diario digital, con una voz que suene natural y en varios idiomas. ¿Qué servicio de AWS usa?",
    options: [
      {
        id: "A",
        text: "Amazon Polly",
        correct: true,
        explanation:
          "Correcta. Polly convierte texto en voz (text-to-speech), con voces naturales en muchos idiomas. Acá el texto ya existe y lo que falta es el audio.",
      },
      {
        id: "B",
        text: "Amazon Transcribe",
        correct: false,
        explanation:
          "Es el par exacto de Polly, y por eso se confunden. Pero Transcribe va en la dirección contraria: toma audio y produce texto. Acá se parte de texto.",
      },
      {
        id: "C",
        text: "Amazon Comprehend",
        correct: false,
        explanation:
          "Comprehend trabaja con el texto de los artículos, y eso lo acerca. Pero lo analiza (temas, entidades, sentimiento); no produce audio.",
      },
      {
        id: "D",
        text: "Amazon Lex",
        correct: false,
        explanation:
          "Lex arma interfaces conversacionales por voz o texto, y 'voz' lo vuelve tentador. Pero sirve para que un usuario dialogue con un bot, no para leer un artículo en voz alta.",
      },
    ],
    tips: [
      "Para recordarlo: Polly habla (texto a voz), Transcribe escucha (voz a texto).",
      "Antes de elegir un servicio de IA, preguntá qué entra y qué sale: texto o audio.",
    ],
  },
  {
    id: "ref-gr-d3-q14",
    topic: "3",
    prompt:
      "Un centro de atención ya tiene en texto todas las conversaciones con sus clientes. Ahora quiere saber, de forma automática, en cuáles el cliente terminó enojado y qué productos se mencionan más. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon Transcribe",
        correct: false,
        explanation:
          "Llamadas de un centro de atención es el escenario típico de Transcribe, y por eso tienta. Pero el enunciado dice que las conversaciones ya están en texto: el paso de audio a texto ya está hecho.",
      },
      {
        id: "B",
        text: "Amazon Comprehend",
        correct: true,
        explanation:
          "Correcta. Comprehend es procesamiento de lenguaje natural: detecta el sentimiento de un texto, extrae entidades (productos, personas, lugares) y frases clave.",
      },
      {
        id: "C",
        text: "Amazon Translate",
        correct: false,
        explanation:
          "Translate trabaja con texto, y por eso aparece. Pero solo lo traduce de un idioma a otro; no dice nada sobre lo que el texto expresa.",
      },
      {
        id: "D",
        text: "Amazon Rekognition",
        correct: false,
        explanation:
          "Rekognition también detecta emociones, y eso lo hace parecer útil. Pero en rostros de imágenes y video, no en texto.",
      },
    ],
    tips: [
      "Sentimiento, entidades, frases clave en un texto: Comprehend.",
      "Si el enunciado aclara que algo ya está en texto, descartá Transcribe.",
    ],
  },
  {
    id: "ref-gr-d3-q15",
    topic: "3",
    multiple: true,
    prompt:
      "Una empresa con sede en Buenos Aires graba en español las llamadas de su soporte, y su equipo de calidad trabaja desde Canadá y lee solo inglés. Quiere que ese equipo pueda leer cada conversación. ¿Cuáles DOS servicios encadena? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Amazon Polly",
        correct: false,
        explanation:
          "Es la confusión que esta pregunta ataca: Polly trabaja con voz, y la entrada es voz. Pero Polly produce voz, no la recibe. El equipo de calidad quiere leer, y Polly no genera texto.",
      },
      {
        id: "B",
        text: "Amazon Lex",
        correct: false,
        explanation:
          "Lex entiende voz para armar un bot conversacional, y eso lo acerca. Pero el objetivo no es que un bot dialogue con el cliente, sino tener la conversación completa por escrito.",
      },
      {
        id: "C",
        text: "Amazon Comprehend",
        correct: false,
        explanation:
          "Comprehend podría analizar las conversaciones una vez en texto, y por eso tienta. Pero el pedido es leerlas en otro idioma, no analizarlas, y Comprehend no traduce.",
      },
      {
        id: "D",
        text: "Amazon Transcribe",
        correct: true,
        explanation:
          "Correcta. Es el primer paso: convierte el audio de las llamadas en texto en español.",
      },
      {
        id: "E",
        text: "Amazon Translate",
        correct: true,
        explanation:
          "Correcta. Es el segundo paso: traduce ese texto del español al inglés para el equipo de calidad.",
      },
    ],
    tips: [
      "Los servicios de IA se encadenan: audio → Transcribe → texto → Translate o Comprehend → resultado.",
      "Seguí el formato del dato: cada servicio toma un formato y entrega otro.",
    ],
  },
  {
    id: "ref-gr-d3-q16",
    topic: "3",
    prompt:
      "Una cadena de supermercados quiere un almacén de datos central con varios petabytes de ventas históricas, donde cientos de analistas ejecuten todos los días consultas complejas con muchas uniones entre tablas, con rendimiento rápido y estable. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Athena también ejecuta SQL sobre grandes volúmenes, y por eso tienta. Pero está pensada para consultas puntuales sobre archivos en S3, pagando por dato escaneado; para cientos de analistas consultando todo el día con rendimiento estable, el servicio diseñado es un data warehouse.",
      },
      {
        id: "B",
        text: "Amazon RDS for MySQL",
        correct: false,
        explanation:
          "RDS es la base relacional administrada, y las uniones entre tablas suenan a base relacional. Pero RDS está optimizado para transacciones (muchas escrituras pequeñas), no para consultas analíticas sobre petabytes.",
      },
      {
        id: "C",
        text: "Amazon Redshift",
        correct: true,
        explanation:
          "Correcta. Redshift es el data warehouse de AWS: almacenamiento en columnas y procesamiento paralelo para consultas analíticas complejas sobre grandes volúmenes, con muchos usuarios concurrentes.",
      },
      {
        id: "D",
        text: "Amazon DynamoDB",
        correct: false,
        explanation:
          "DynamoDB escala a cualquier volumen, y 'petabytes' lo hace tentador. Pero es una base clave-valor sin uniones entre tablas: no sirve para análisis con SQL complejo.",
      },
    ],
    tips: [
      "Data warehouse, consultas analíticas recurrentes, muchos analistas: Redshift.",
      "Athena y Redshift hablan SQL los dos. La diferencia es el uso: puntual sobre S3 (Athena) o continuo en un almacén dedicado (Redshift).",
    ],
  },
  {
    id: "ref-gr-d3-q17",
    topic: "3",
    prompt:
      "Un equipo de ciencia de datos necesita ejecutar trabajos de Apache Spark escritos por ellos mismos sobre petabytes de datos, con control sobre el clúster y sus bibliotecas. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon EMR",
        correct: true,
        explanation:
          "Correcta. EMR es la plataforma administrada para frameworks de big data como Spark, Hadoop y Hive. Da control sobre el clúster y lo que corre en él, que es lo que pide un código propio de Spark.",
      },
      {
        id: "B",
        text: "Amazon Athena",
        correct: false,
        explanation:
          "Athena procesa grandes volúmenes sin administrar servidores, e incluso ofrece cuadernos interactivos de Spark, y por eso es tentadora. Pero es serverless justamente para no dar control sobre el clúster: cuando el pedido es configurar el clúster y sus bibliotecas, el servicio es EMR.",
      },
      {
        id: "C",
        text: "Amazon QuickSight",
        correct: false,
        explanation:
          "QuickSight es para ver los resultados en tableros. Aparece en las preguntas de análisis, pero no procesa trabajos de Spark.",
      },
      {
        id: "D",
        text: "Amazon Redshift",
        correct: false,
        explanation:
          "Redshift es para análisis a gran escala, y eso lo acerca. Pero es un data warehouse que se consulta con SQL, no un clúster donde se ejecutan trabajos de Spark.",
      },
    ],
    tips: [
      "Spark, Hadoop, Hive, clúster: EMR.",
      "Athena es SQL sin clúster; EMR es un clúster para frameworks de big data; Redshift es un almacén para consultas recurrentes.",
    ],
  },
  {
    id: "ref-gr-d3-q18",
    topic: "3",
    multiple: true,
    prompt:
      "Un equipo guarda en S3 los registros de su aplicación en formato JSON. Quiere consultarlos con SQL cuando algo falla, pagando solo por los datos que examina cada consulta, y mostrar los resultados más importantes en un tablero para la gerencia. ¿Cuáles DOS servicios usa? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Amazon RDS",
        correct: false,
        explanation:
          "SQL hace pensar en una base relacional, por eso aparece. Pero habría que cargar los registros en la base y pagarla encendida todo el tiempo, cuando el pedido es consultar donde están, solo cuando hace falta.",
      },
      {
        id: "B",
        text: "Amazon Athena",
        correct: true,
        explanation:
          "Correcta. Athena consulta con SQL los datos directamente en S3, sin servidores ni carga previa, y cobra por los datos escaneados en cada consulta.",
      },
      {
        id: "C",
        text: "Amazon QuickSight",
        correct: true,
        explanation:
          "Correcta. QuickSight es el servicio de inteligencia de negocio de AWS para crear tableros interactivos, y puede usar Athena como fuente de datos.",
      },
      {
        id: "D",
        text: "Amazon Redshift",
        correct: false,
        explanation:
          "Es el error del simulacro: Redshift también consulta con SQL y puede leer de S3. Pero es un almacén dedicado pensado para uso continuo; para consultas ocasionales cuando algo falla, sin administrar nada, la herramienta es Athena.",
      },
      {
        id: "E",
        text: "Amazon EMR",
        correct: false,
        explanation:
          "EMR procesa grandes volúmenes en S3, y eso lo acerca. Pero hay que levantar y configurar un clúster, que es más de lo que pide una consulta SQL ocasional.",
      },
    ],
    tips: [
      "SQL sobre datos en S3, puntual, sin servidores, pago por consulta: Athena.",
      "Tablero o visualización para el negocio: QuickSight. Ningún servicio de consulta reemplaza al tablero.",
    ],
  },
  {
    id: "ref-gr-d3-q19",
    topic: "3",
    prompt:
      "Una universidad quiere que sus estudiantes usen un programa de diseño asistido por computadora desde el navegador, en cualquier computadora, sin instalarlo. No necesitan un escritorio completo: solo esa aplicación. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon WorkSpaces",
        correct: false,
        explanation:
          "WorkSpaces también entrega trabajo remoto en cualquier dispositivo, y por eso es la trampa. Pero da un escritorio completo y persistente por usuario; el enunciado dice explícitamente que solo hace falta una aplicación.",
      },
      {
        id: "B",
        text: "Amazon AppStream 2.0",
        correct: true,
        explanation:
          "Correcta. AppStream 2.0 transmite aplicaciones de escritorio al navegador del usuario. La aplicación corre en AWS, y el estudiante ve y usa solo esa aplicación, sin instalar nada.",
      },
      {
        id: "C",
        text: "Amazon EC2 con acceso por escritorio remoto",
        correct: false,
        explanation:
          "Técnicamente podría funcionar, y por eso tienta. Pero obliga a administrar cada servidor, sus licencias y el acceso de cientos de estudiantes: es lo que AppStream resuelve como servicio administrado.",
      },
      {
        id: "D",
        text: "AWS Amplify",
        correct: false,
        explanation:
          "Amplify es para construir y alojar aplicaciones web y móviles. Suena a 'aplicación en el navegador', pero no transmite un programa de escritorio existente.",
      },
    ],
    tips: [
      "Una sola aplicación en el navegador: AppStream 2.0. Un escritorio completo por persona: WorkSpaces.",
      "La palabra que decide es 'escritorio' o 'aplicación'.",
    ],
  },
  {
    id: "ref-gr-d3-q20",
    topic: "3",
    prompt:
      "Un equipo ya compila y prueba su aplicación con sus propias herramientas. Lo único que le falta es automatizar la instalación de cada versión nueva en sus 200 instancias EC2, de a grupos, y que la actualización se detenga y vuelva atrás si las instancias actualizadas empiezan a fallar. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "AWS CodeBuild",
        correct: false,
        explanation:
          "Pertenece a la misma familia de herramientas de entrega continua, y por eso aparece. Pero CodeBuild compila y ejecuta pruebas, que es justo la parte que el equipo ya tiene resuelta. No instala nada en las instancias.",
      },
      {
        id: "B",
        text: "AWS CodePipeline",
        correct: false,
        explanation:
          "Es la tentación después de aprender que CodePipeline automatiza la entrega. Pero CodePipeline orquesta etapas: no instala por sí mismo el código en las instancias, sino que le pasa esa etapa a un servicio de despliegue. Acá se pide solo esa etapa.",
      },
      {
        id: "C",
        text: "AWS CodeDeploy",
        correct: true,
        explanation:
          "Correcta. CodeDeploy automatiza el despliegue de versiones en EC2, servidores locales, Lambda o ECS. Permite desplegar de a grupos de instancias y revertir automáticamente si el despliegue falla o salta una alarma.",
      },
      {
        id: "D",
        text: "AWS X-Ray",
        correct: false,
        explanation:
          "X-Ray ayuda a ver si las instancias nuevas empiezan a fallar, porque traza las solicitudes a través de la aplicación, y eso lo acerca a la segunda mitad del pedido. Pero observa; no instala versiones ni las revierte.",
      },
    ],
    tips: [
      "Las herramientas de CI/CD de AWS son etapas distintas: CodeBuild compila y prueba, CodeDeploy instala la versión, CodePipeline encadena todo.",
      "Si el enunciado aclara qué parte del flujo ya está resuelta, la respuesta es el servicio de la parte que falta, no el que orquesta todo.",
    ],
  },
  {
    id: "ref-gr-d3-q21",
    topic: "3",
    prompt:
      "Un equipo quiere que, cada vez que alguien sube código al repositorio, se encadenen solas varias etapas: compilar, ejecutar pruebas, esperar la aprobación de un responsable y desplegar en producción. ¿Qué servicio orquesta ese flujo completo?",
    options: [
      {
        id: "A",
        text: "AWS CodeBuild",
        correct: false,
        explanation:
          "Compilar y ejecutar pruebas es justo lo que hace CodeBuild, y por eso tienta. Pero CodeBuild es una etapa del flujo; no espera aprobaciones ni encadena el despliegue.",
      },
      {
        id: "B",
        text: "AWS CodeDeploy",
        correct: false,
        explanation:
          "CodeDeploy hace la última etapa, el despliegue en EC2, Lambda o ECS. Es una pieza del flujo, no lo que conecta todas las etapas.",
      },
      {
        id: "C",
        text: "AWS CloudFormation",
        correct: false,
        explanation:
          "CloudFormation automatiza la creación de infraestructura, y 'automatizar' lo acerca. Pero crea recursos a partir de plantillas; no reacciona a cambios en el código ni coordina compilación y pruebas.",
      },
      {
        id: "D",
        text: "AWS CodePipeline",
        correct: true,
        explanation:
          "Correcta. CodePipeline es el servicio de integración y entrega continua que orquesta las etapas: detecta el cambio en el repositorio y pasa por CodeBuild, aprobaciones manuales y CodeDeploy (u otras herramientas).",
      },
    ],
    tips: [
      "CodePipeline orquesta, CodeBuild compila y prueba, CodeDeploy despliega. Si la pregunta habla del flujo completo, es CodePipeline.",
      "Una aprobación manual entre etapas es una señal de CodePipeline: es el único que maneja etapas.",
    ],
  },
];
