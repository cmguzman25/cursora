import type { ExamQuestionWithTopic } from "../../../types";

/**
 * Tema 2 en español: Amazon Data Firehose y la entrega casi en tiempo real.
 *
 * Traducción de `../en/tema-2-firehose-delivery.ts`, estrictamente paralela. Ver la
 * nota de criterio en `tema-1-streaming-kinesis-msk.ts`.
 */
export const TEMA_2_FIREHOSE: ExamQuestionWithTopic[] = [
  {
    id: "dea-t2-q01",
    topic: "firehose-delivery",
    prompt:
      "Un equipo de seguridad consulta un bucket de Amazon S3 en el que escribe un stream de Amazon Data Firehose, y los analistas reportan que los eventos tardan unos cinco minutos en aparecer. El stream está configurado con un tamaño de buffer de 64 MB y un intervalo de buffer de 300 segundos, y el tráfico es lo bastante liviano como para que el tamaño nunca se alcance. ¿Qué cambio reduce la demora?",
    options: [
      {
        id: "A",
        text: "Aumentar el tamaño de buffer a 128 MB para que Firehose escriba objetos más grandes y de forma más eficiente.",
        correct: false,
        explanation:
          "Esto confunde caudal con latencia, y además va en la dirección equivocada. El tamaño ya no se alcanza nunca, así que subirlo no cambia absolutamente nada; y si el tráfico creciera, un tamaño mayor haría esperar más a los registros, no menos.",
      },
      {
        id: "B",
        text: "Habilitar la conversión de formato a Apache Parquet para que los registros se escriban a medida que llegan.",
        correct: false,
        explanation:
          "La conversión de formato cambia cómo está organizado un objeto entregado, nunca cuándo se entrega. La conversión sigue ocurriendo sobre el lote acumulado, así que los mismos cinco minutos de espera se aplican a un archivo Parquet igual que a uno JSON.",
      },
      {
        id: "C",
        text: "Cambiar el origen del stream de Direct PUT a un data stream de Kinesis para acortar el retardo de propagación.",
        correct: false,
        explanation:
          "Cambiar el origen tienta porque el retardo de propagación es una métrica real del lado del stream. Gobierna con cuánta rapidez Firehose ve un registro, que acá ya es rápido; los cinco minutos se gastan después, en el buffer de entrega, que el parámetro de origen no toca.",
      },
      {
        id: "D",
        text: "Bajar el intervalo de buffer para que Firehose descargue por tiempo transcurrido en lugar de por tamaño acumulado.",
        correct: true,
        explanation:
          "Correcta. Firehose descarga cuando se cumple el primero de los dos hints, y con tráfico liviano el que se dispara siempre es el intervalo. Bajarlo de 300 segundos es lo único acá que acorta la espera, hasta cero segundos si el equipo acepta muchos objetos chicos.",
      },
    ],
    tips: [
      "Firehose entrega cuando se alcanza el tamaño de buffer o el intervalo de buffer, el primero de los dos.",
      "Con tráfico liviano el intervalo decide la latencia; con tráfico alto lo hace el tamaño. Identificá cuál se está disparando antes de ajustar.",
      "El intervalo de buffer de S3 puede bajar a cero segundos, y se paga con muchos objetos chicos.",
    ],
  },
  {
    id: "dea-t2-q02",
    topic: "firehose-delivery",
    prompt:
      "Un ingeniero de datos configura un stream de Amazon Data Firehose para escribir en Amazon S3, como Apache Parquet, los registros JSON que recibe. Todos los registros fallan con un error de conversión de formato. ¿Qué requiere la conversión que está faltando?",
    options: [
      {
        id: "A",
        text: "Una tabla en el AWS Glue Data Catalog que declare el esquema de los registros.",
        correct: true,
        explanation:
          "Correcta. Parquet es un formato columnar y tipado, así que hay que decirle a Firehose los nombres y los tipos de las columnas antes de que pueda escribir uno. Ese esquema lo lee de una tabla del Glue Data Catalog, y sin la tabla no hay nada contra lo que convertir.",
      },
      {
        id: "B",
        text: "Una transformación de AWS Lambda que serialice cada registro a Parquet antes de la entrega.",
        correct: false,
        explanation:
          "El reflejo de suponer que el trabajo hay que hacerlo uno mismo. Firehose hace la conversión de forma nativa una vez que tiene un esquema, y una transformación de Lambda acá sería redundante y además incorrecta: las transformaciones deben devolver JSON, no bytes de Parquet.",
      },
      {
        id: "C",
        text: "La partición dinámica habilitada, para que Firehose pueda agrupar correctamente los registros en archivos Parquet.",
        correct: false,
        explanation:
          "Esto junta dos funciones de S3 que en realidad son independientes. La partición dinámica decide bajo qué prefijo se escribe un objeto; la conversión de formato decide los bytes que van adentro. Cualquiera de las dos se puede habilitar sin la otra.",
      },
      {
        id: "D",
        text: "Una tabla de Amazon Athena definida sobre el prefijo de destino para poder inferir el esquema del Parquet.",
        correct: false,
        explanation:
          "Lo bastante cerca para ser el distractor más fuerte, porque una tabla de Athena es una tabla del Glue Data Catalog. La dirección está al revés: el esquema tiene que existir antes de la entrega para que Firehose escriba con él, no después y sobre objetos que nunca se produjeron.",
      },
    ],
    tips: [
      "La conversión de formato de Firehose toma el esquema de destino de una tabla del Glue Data Catalog.",
      "La conversión de formato acepta solo entrada JSON; cualquier otro formato necesita antes una transformación de Lambda que emita JSON.",
      "La partición dinámica y la conversión de formato son parámetros independientes y ninguno implica al otro.",
    ],
  },
  {
    id: "dea-t2-q03",
    topic: "firehose-delivery",
    prompt:
      "Los objetos entregados en Amazon S3 deben caer bajo prefijos con la forma customer_id=123/year=2026/month=10/ para que Amazon Athena pueda descartar particiones. El id de cliente es un campo que viene dentro de cada registro JSON. ¿Qué capacidad de Firehose produce un prefijo así?",
    options: [
      {
        id: "A",
        text: "Una expresión de prefijo de S3 construida enteramente con los espacios de nombres !{timestamp:yyyy} y !{timestamp:MM}.",
        correct: false,
        explanation:
          "Media verdad, y eso es lo que la hace peligrosa. El espacio de nombres de timestamp sí produce los componentes de año y mes, pero solo puede leer la hora de entrega o de llegada aproximada. No tiene acceso a ningún campo de dentro del payload, así que el componente customer_id es imposible por esta vía.",
      },
      {
        id: "B",
        text: "La partición dinámica con una expresión JQ en línea que extraiga el id de cliente de cada registro.",
        correct: true,
        explanation:
          "Correcta. La partición dinámica es justamente la función que permite que un prefijo dependa del contenido del registro: la expresión JQ en línea saca customer_id del JSON y lo expone como una clave de partición que la expresión de prefijo puede referenciar.",
      },
      {
        id: "C",
        text: "La conversión de formato a Parquet, que escribe prefijos estilo Hive a partir de las columnas de partición de la tabla de Glue.",
        correct: false,
        explanation:
          "Esto supone que la definición de particiones de la tabla de Glue gobierna dónde escribe Firehose. No lo hace: la tabla de Glue le dice a Firehose cuáles son las columnas, y el prefijo de entrega se configura por separado. Declarar columnas de partición en la tabla no cambia nada de la ruta en S3.",
      },
      {
        id: "D",
        text: "Un crawler de AWS Glue programado para reorganizar los objetos entregados en prefijos particionados.",
        correct: false,
        explanation:
          "Un crawler es para descubrir, no para mover, y esa es la confusión que vale corregir. Inspecciona objetos que ya están en S3 y registra las particiones que encuentra; nunca reescribe claves ni reubica datos.",
      },
    ],
    tips: [
      "La partición dinámica es la única función de Firehose que permite que el prefijo de destino dependa del contenido de un registro.",
      "El espacio de nombres !{timestamp:...} solo puede expresar tiempo de entrega, nunca un campo de dentro del payload.",
      "Un crawler de Glue registra particiones que ya existen en S3; nunca mueve ni reescribe objetos.",
    ],
  },
  {
    id: "dea-t2-q04",
    topic: "firehose-delivery",
    prompt:
      "Una función de AWS Lambda invocada por un stream de Firehose enriquece cada registro con una consulta, y algunas invocaciones devuelven registros marcados con estado de falla de procesamiento. El equipo de cumplimiento exige que ninguno de esos registros se pierda. ¿Dónde pone Firehose los registros que la transformación reportó como fallidos?",
    options: [
      {
        id: "A",
        text: "De vuelta en el data stream de Kinesis de origen, para que se tomen otra vez en la lectura siguiente.",
        correct: false,
        explanation:
          "Un modelo de reinyección prestado de los brokers de mensajes, donde un mensaje rechazado vuelve a la cola. Firehose solo lee de su origen y escribe en destinos; no tiene ningún camino que escriba hacia arriba.",
      },
      {
        id: "B",
        text: "En una cola de mensajes fallidos de Amazon SQS asociada a la función de transformación.",
        correct: false,
        explanation:
          "Las colas de mensajes fallidos de Lambda se aplican a las invocaciones asincrónicas, que es donde casi todos las conocieron. Firehose invoca su transformación de forma sincrónica e interpreta la respuesta él mismo, así que la configuración de mensajes fallidos de la función nunca se consulta.",
      },
      {
        id: "C",
        text: "En el bucket de respaldo de Amazon S3 configurado, bajo un prefijo processing-failed.",
        correct: true,
        explanation:
          "Correcta. Firehose reintenta la invocación una cantidad configurable de veces, y los registros que siguen marcados como fallidos se escriben en el bucket de error de S3 bajo processing-failed/ con los metadatos del error adjuntos, que es lo que vuelve satisfacible el requisito de cumplimiento.",
      },
      {
        id: "D",
        text: "En ningún lado: los registros marcados como fallidos se descartan una vez agotada la cantidad de reintentos configurada.",
        correct: false,
        explanation:
          "La mitad de esto es verdad, y esa mitad es el anzuelo. Firehose sí deja de reintentar después de los intentos configurados, pero entonces escribe los registros en el bucket de error en lugar de descartarlos, siempre que haya uno configurado. El riesgo real es olvidarse de configurar el bucket, no que el servicio borre datos por diseño.",
      },
    ],
    tips: [
      "Los registros que una transformación marca como fallidos van al bucket de error de S3 bajo processing-failed/, no a una cola de mensajes fallidos.",
      "Firehose invoca su función de transformación de forma sincrónica, así que los parámetros de reintento y de mensajes fallidos de la función no aplican.",
      "El respaldo de errores y de registros de origen en S3 hay que configurarlo explícitamente; no viene activado.",
    ],
  },
  {
    id: "dea-t2-q05",
    topic: "firehose-delivery",
    prompt:
      "Los datos de clickstream deben llegar a Amazon Redshift pocos minutos después de producirse. El equipo no tiene capacidad para construir ni operar aplicaciones consumidoras, y confirmó que el modelo que está aguas abajo tolera que en casos aislados una fila se escriba dos veces. ¿Qué camino de ingesta cumple estas restricciones sin código de consumidor que mantener?",
    options: [
      {
        id: "A",
        text: "Amazon Kinesis Data Streams con una aplicación de la Kinesis Client Library que ejecute comandos COPY contra Redshift.",
        correct: false,
        explanation:
          "Técnicamente sólido, y es como se construía esto antes de que existiera Firehose, y por eso todavía se siente como la respuesta de verdad. También es una aplicación que el equipo tiene que escribir, desplegar, escalar y mantener viva, que es justo lo que el escenario descarta.",
      },
      {
        id: "B",
        text: "Amazon MSK con el conector sink de Redshift desplegado en MSK Connect.",
        correct: false,
        explanation:
          "Lo bastante administrado como para que parezca cumplir el requisito de no escribir código. Sigue habiendo un cluster de Kafka que dimensionar y una configuración de conector que mantener, y nada en el escenario sugiere que el equipo necesite semántica de Kafka para empezar.",
      },
      {
        id: "C",
        text: "Amazon Kinesis Data Streams con un consumidor de AWS Lambda que inserte filas mediante la Redshift Data API.",
        correct: false,
        explanation:
          "La palabra serverless hace que esto se lea como poco esfuerzo. Sigue siendo un consumidor que el equipo mantiene, y las inserciones fila por fila son el antipatrón clásico de Redshift: está hecho para cargas masivas, así que este camino se degrada mal a medida que crece el volumen.",
      },
      {
        id: "D",
        text: "Amazon Data Firehose con Amazon Redshift configurado como destino de entrega.",
        correct: true,
        explanation:
          "Correcta. Firehose es el camino sin código: se configura un destino en lugar de escribir un consumidor. Deja los lotes en S3 y ejecuta COPY en nombre del equipo, que además es el patrón correcto de carga de Redshift y es coherente con los duplicados aceptados de la entrega al menos una vez.",
      },
    ],
    tips: [
      "Firehose es configuración en lugar de código: se elige un destino y no hay aplicación consumidora que operar.",
      "Firehose entrega al menos una vez, así que cualquier destino detrás tiene que tolerar el duplicado ocasional.",
      "Redshift debe cargarse con COPY desde S3 en lotes, que es exactamente lo que el destino Redshift de Firehose hace por vos.",
    ],
  },
  {
    id: "dea-t2-q06",
    topic: "firehose-delivery",
    prompt:
      "Un arquitecto propone reemplazar un data stream de Kinesis por Amazon Data Firehose en un camino de ingesta. Uno de los requisitos dice que si se encuentra un defecto en la lógica de agregación que está aguas abajo, el equipo debe poder reprocesar los eventos crudos de las 48 horas anteriores desde la capa de ingesta. ¿Por qué Firehose por sí solo no cumple ese requisito?",
    options: [
      {
        id: "A",
        text: "Su intervalo de buffer no puede configurarse por encima de 900 segundos, que es mucho menos que 48 horas.",
        correct: false,
        explanation:
          "La cuota es real, y por eso esto suena con autoridad, pero responde otra pregunta. El intervalo de buffer controla cuánto esperan los registros antes de la entrega, no cuánto siguen disponibles después. Incluso un buffer ilimitado no daría una historia reproducible.",
      },
      {
        id: "B",
        text: "No retiene los registros entregados, así que no hay ninguna posición a la que un consumidor pueda retroceder.",
        correct: true,
        explanation:
          "Correcta. Firehose es un servicio de entrega y no un log: una vez que el lote se escribió en el destino, Firehose no guarda nada. El replay necesita registros retenidos y una posición legible, que es precisamente lo que un data stream de Kinesis ofrece y Firehose no.",
      },
      {
        id: "C",
        text: "Entrega los registros a lo sumo una vez, así que una corrida de reprocesamiento se perdería los registros que ya se consumieron.",
        correct: false,
        explanation:
          "Esto invierte la garantía de entrega real. Firehose es al menos una vez, así que los duplicados son la anomalía esperada y la pérdida silenciosa no lo es. Quien recuerda que Firehose tiene una garantía más débil de la que querría suele confundirse en qué dirección es débil.",
      },
      {
        id: "D",
        text: "Admite un solo destino por stream, así que una segunda aplicación no puede leer los mismos datos.",
        correct: false,
        explanation:
          "La afirmación en sí es correcta, y eso la vuelve un motivo equivocado convincente. La distribución no es lo que el requisito preguntaba: incluso un stream de Firehose con diez destinos seguiría sin poder entregarle a nadie las últimas 48 horas, porque no guardó ninguna.",
      },
    ],
    tips: [
      "Firehose no guarda nada después de la entrega, así que cualquier requisito de replay necesita un stream retenido por delante.",
      "Firehose garantiza entrega al menos una vez: planificá para duplicados aguas abajo, no para pérdida silenciosa.",
      "Una afirmación verdadera puede ser igual el motivo equivocado. Hacé coincidir la explicación con el requisito que realmente se enunció.",
    ],
  },
  {
    id: "dea-t2-q07",
    topic: "firehose-delivery",
    prompt:
      "Los documentos de log entregados en Amazon OpenSearch Service se acumulan todos en un único índice, que creció tanto que eliminar datos viejos se volvió lento y caro. El equipo quiere un índice separado por día para poder descartar los datos que envejecen borrando índices completos. ¿Qué parámetro de Firehose lo provee?",
    options: [
      {
        id: "A",
        text: "Un intervalo de buffer de 86.400 segundos, para que se entregue exactamente un lote por día.",
        correct: false,
        explanation:
          "Esto equipara el período de entrega con el período del índice, que no tienen relación, y el número ni siquiera está permitido: el intervalo de buffer tiene un techo de 900 segundos. Los lotes no crean índices; el nombre del índice sí.",
      },
      {
        id: "B",
        text: "Una transformación de Lambda que marque cada documento con la fecha en que se produjo.",
        correct: false,
        explanation:
          "Un campo de fecha hace que las consultas por rango funcionen bien, y esa utilidad es la trampa. No hace nada respecto de la organización de los índices: todos esos documentos con fecha siguen cayendo en el mismo índice, y borrar por consulta es la operación lenta de la que el equipo intenta escapar.",
      },
      {
        id: "C",
        text: "El período de rotación de índice, configurado en OneDay.",
        correct: true,
        explanation:
          "Correcta. El destino OpenSearch tiene un período de rotación de índice que agrega un sufijo de fecha al nombre configurado, y produce un índice nuevo por hora, día, semana o mes. Descartar el índice de ayer pasa a ser una sola operación barata.",
      },
      {
        id: "D",
        text: "La partición dinámica con una expresión JQ que extraiga la fecha del log de cada documento.",
        correct: false,
        explanation:
          "El distractor más fuerte para cualquiera que aprendió la partición dinámica como la respuesta general a dividir datos por fecha. La partición dinámica existe solo para el destino Amazon S3, así que ni siquiera es configurable en un stream que entrega a OpenSearch.",
      },
    ],
    tips: [
      "El destino OpenSearch tiene un período de rotación de índice que agrega un sufijo de fecha al nombre del índice.",
      "La partición dinámica se aplica solo al destino Amazon S3.",
      "Descartar un índice completo es mucho más barato que borrar documentos, y por eso la rotación por tiempo es el patrón estándar de logs.",
    ],
  },
  {
    id: "dea-t2-q08",
    topic: "firehose-delivery",
    prompt:
      "Un mismo flujo de eventos tiene que ser entregado en Amazon S3 por Firehose y, al mismo tiempo, leído por una aplicación de detección de fraude que el equipo está construyendo sobre la Kinesis Client Library, con latencia medida en segundos. Los productores deben publicar cada evento una sola vez. ¿Cómo debería armarse el camino?",
    options: [
      {
        id: "A",
        text: "Publicar en un data stream de Kinesis y configurar el stream de Firehose para que use ese data stream como origen.",
        correct: true,
        explanation:
          "Correcta. Un data stream de Kinesis puede ser el origen de un stream de Firehose, así que una sola publicación alimenta los dos caminos: la aplicación de la KCL lee el stream directamente en segundos, y Firehose acumula los mismos registros en S3 de forma independiente.",
      },
      {
        id: "B",
        text: "Publicar en el stream de Firehose con Direct PUT y que la aplicación de fraude lea los objetos entregados desde Amazon S3.",
        correct: false,
        explanation:
          "Esto sí cumple la regla de publicar una vez y sí lleva los datos a los dos lugares, y por eso es la incorrecta más elegida. La aplicación de fraude ahora espera el buffer de entrega y después tiene que consultar S3, así que su latencia se mide en minutos y no en segundos.",
      },
      {
        id: "C",
        text: "Publicar en el stream de Firehose con Direct PUT y registrar la aplicación de fraude como consumidor con enhanced fan-out de ese stream.",
        correct: false,
        explanation:
          "Pega una función de Kinesis Data Streams al servicio equivocado. Firehose no expone ninguna API de consumidores: nada lee de un stream de Firehose, así que no hay consumidor que registrar, con o sin enhanced fan-out.",
      },
      {
        id: "D",
        text: "Publicar en dos streams de Firehose, uno que entregue a Amazon S3 y otro que entregue a la aplicación de fraude detrás de un endpoint HTTP.",
        correct: false,
        explanation:
          "Publicar en dos streams rompe el requisito de que los productores publiquen una sola vez, y duplica la posibilidad de que los dos caminos divergan. El destino de endpoint HTTP también acumula en buffer, así que la aplicación de fraude seguiría sin obtener latencia de segundos.",
      },
    ],
    tips: [
      "Un data stream de Kinesis puede actuar como origen de Firehose, y eso da entrega durable y consumidores en tiempo real con una sola publicación.",
      "Firehose no tiene API de consumidores: solo escribe en destinos, así que nada lee de él.",
      "Cuando los productores deben publicar una vez pero dos sistemas necesitan los datos, poné primero un stream retenido y colgá los consumidores de ahí.",
    ],
  },
  {
    id: "dea-t2-q09",
    topic: "firehose-delivery",
    prompt:
      "Un stream de Firehose escribe JSON en Amazon S3, donde los analistas corren consultas de Athena que seleccionan 3 de los 60 campos y casi siempre recorren toda la historia. El costo de almacenamiento y el de datos recorridos por Athena están los dos por encima del presupuesto, y los productores no se pueden modificar. ¿Qué configuración de Firehose reduce los dos?",
    options: [
      {
        id: "A",
        text: "Habilitar la compresión GZIP en los objetos entregados.",
        correct: false,
        explanation:
          "La incorrecta más cercana, porque la compresión sí recorta el almacenamiento y Athena se factura sobre los bytes comprimidos que lee. Un archivo orientado a filas igual tiene que leerse completo para llegar a tres campos, así que esto deja sobre la mesa el ahorro más grande: 57 columnas innecesarias se descomprimen en cada consulta.",
      },
      {
        id: "B",
        text: "Subir el tamaño de buffer para que Firehose escriba objetos JSON menos numerosos y más grandes.",
        correct: false,
        explanation:
          "Los objetos más grandes sí ayudan a Athena, pero con el tiempo de planificación y no con el volumen recorrido: menos archivos significa menos listados y menos aperturas. Los bytes almacenados y los bytes recorridos quedan esencialmente iguales, así que ninguno de los dos problemas de presupuesto se mueve.",
      },
      {
        id: "C",
        text: "Habilitar la partición dinámica por fecha de evento para que Athena pueda descartar particiones.",
        correct: false,
        explanation:
          "Descartar particiones es la palanca estándar de costo en Athena, y por eso es lo primero que viene a la mente. Solo rinde cuando las consultas filtran por la columna de partición, y el escenario dice que estas consultas recorren toda la historia, así que no hay nada que descartar.",
      },
      {
        id: "D",
        text: "Habilitar la conversión de formato a Apache Parquet con compresión Snappy.",
        correct: true,
        explanation:
          "Correcta. Parquet es columnar, así que Athena lee solo las 3 columnas que la consulta nombra en lugar de las 60, y Snappy achica lo que se almacena. Es la única opción que ataca tanto cuáles bytes se leen como cuántos bytes existen.",
      },
    ],
    tips: [
      "La compresión reduce los bytes almacenados y recorridos; un formato columnar reduce además cuáles bytes hay que tocar.",
      "Descartar particiones ahorra dinero solo cuando las consultas filtran por la columna de partición.",
      "Objetos menos numerosos y más grandes ayudan al tiempo de planificación, que es un costo distinto del de datos recorridos.",
    ],
  },
  {
    id: "dea-t2-q10",
    topic: "firehose-delivery",
    prompt:
      "A mitad del lanzamiento de un producto, los productores que usan Direct PUT contra un stream de Firehose empiezan a recibir respuestas ServiceUnavailableException. El destino está sano, CloudWatch confirma que el stream alcanzó su cuota de caudal de Direct PUT por defecto para la Región, y ningún registro producido durante el lanzamiento puede perderse. ¿Qué debería hacer el equipo?",
    options: [
      {
        id: "A",
        text: "Repartir los productores en un segundo stream de Firehose con el mismo destino, redesplegándolos durante el lanzamiento.",
        correct: false,
        explanation:
          "El instinto es sensato, porque las cuotas de caudal de Direct PUT se aplican de verdad por stream de Firehose, así que un segundo stream vendría con su propia asignación. Es la movida equivocada en medio del incidente: implica redesplegar todos los productores con el tráfico en su pico, y no hace nada por los registros que están siendo rechazados ahora, a los que solo un reintento puede salvar.",
      },
      {
        id: "B",
        text: "Pedir un aumento de cuota para la Región y que los productores reintenten los registros rechazados con retroceso exponencial hasta que tome efecto.",
        correct: true,
        explanation:
          "Correcta. ServiceUnavailableException señala un límite de caudal y no un destino roto, así que importan dos cosas: no perder lo que está siendo rechazado, y subir el techo. El retroceso con reintento protege los datos del lanzamiento de inmediato, y el aumento de cuota es el arreglo durable que no necesita ningún cambio en los productores.",
      },
      {
        id: "C",
        text: "Aumentar el tamaño de buffer para que el stream pueda aceptar más registros en cada petición.",
        correct: false,
        explanation:
          "Esto lee el buffer como un parámetro de admisión. Los hints de buffer gobiernan cómo agrupa Firehose los registros en su camino hacia el destino, y se aplican después de que un registro ya fue aceptado, así que no pueden cambiar lo que la cuota de ingesta permite entrar.",
      },
      {
        id: "D",
        text: "Habilitar la conversión de formato para que Firehose comprima los registros entrantes y consuma menos cuota.",
        correct: false,
        explanation:
          "La conversión y la compresión también ocurren después de la ingesta, sobre el lote acumulado. La cuota se mide contra lo que los productores envían, así que comprimir la salida no tiene ningún efecto sobre la tasa a la que Firehose acepta entrada.",
      },
    ],
    tips: [
      "Un ServiceUnavailableException de Firehose significa que se alcanzó una cuota de caudal; la respuesta es retroceso más un pedido de aumento de cuota.",
      "Las cuotas de caudal de Direct PUT se aplican por stream de Firehose y por Región, así que se suben con un pedido de soporte en lugar de esquivarse.",
      "El buffer, la conversión y la compresión pasan todos después de que un registro fue aceptado y no pueden aliviar una cuota de ingesta.",
    ],
  },
  {
    id: "dea-t2-q11",
    topic: "firehose-delivery",
    multiple: true,
    prompt:
      "Un stream de Firehose entrega documentos a Amazon OpenSearch Service. El equipo de seguridad exige que ningún evento se pierda si OpenSearch rechaza un documento o queda inalcanzable hasta por una hora. ¿Qué dos configuraciones cumplen ese requisito? (Elegí dos.)",
    options: [
      {
        id: "A",
        text: "Configurar el período de rotación de índice para que los documentos rechazados se escriban en el índice del día siguiente.",
        correct: false,
        explanation:
          "La rotación de índice decide el nombre del índice en el que caen los documentos exitosos. Un documento rechazado nunca se indexó, así que ningún valor de rotación le da un segundo hogar.",
      },
      {
        id: "B",
        text: "Configurar un bucket de respaldo en Amazon S3 para que los documentos que Firehose no pudo entregar se escriban ahí.",
        correct: true,
        explanation:
          "Correcta. El bucket de respaldo de S3 es el lugar durable donde aterriza todo lo que el destino rechazó o lo que sobrevivió a la ventana de reintentos. Sin él, los registros que agotan los reintentos se pierden de verdad, que es la pérdida de la que seguridad se está cuidando.",
      },
      {
        id: "C",
        text: "Habilitar la conversión de formato a Apache Parquet para que OpenSearch acepte los documentos rechazados.",
        correct: false,
        explanation:
          "La conversión de formato es una función del destino S3, y OpenSearch ingiere documentos JSON y no archivos Parquet. Los rechazos normalmente vienen de conflictos de mapeo o de presión en el cluster, y un formato de archivo no cambia ninguna de las dos cosas.",
      },
      {
        id: "D",
        text: "Cambiar el destino a Direct PUT para que los productores se enteren y puedan reintentar ante una falla.",
        correct: false,
        explanation:
          "Esto confunde los dos extremos del stream: Direct PUT es un tipo de origen y no un destino, así que no se puede seleccionar acá. La confusión es entendible porque las dos cosas se configuran en el mismo stream, pero solo una de las dos mira hacia los productores.",
      },
      {
        id: "E",
        text: "Poner una duración de reintento lo bastante larga para cubrir una hora de indisponibilidad del destino.",
        correct: true,
        explanation:
          "Correcta. Firehose reintenta una entrega fallida durante la duración configurada antes de rendirse, así que una duración de reintento más corta que la caída que el equipo debe sobrevivir empezaría a derivar registros al respaldo mientras OpenSearch simplemente tardaba en responder.",
      },
    ],
    tips: [
      "La entrega durable a OpenSearch descansa en dos parámetros: cuánto reintenta Firehose, y dónde van los registros cuando deja de hacerlo.",
      "El bucket de respaldo de S3 es opcional. Sin él, los registros que agotan los reintentos se pierden.",
      "Direct PUT es un tipo de origen; OpenSearch, S3 y Redshift son destinos. No confundas los dos extremos de un stream.",
    ],
  },
  {
    id: "dea-t2-q12",
    topic: "firehose-delivery",
    multiple: true,
    prompt:
      "Un stream que usa Direct PUT envía unos 50 KB por segundo a Amazon S3 con un tamaño de buffer de 1 MB y un intervalo de buffer de 60 segundos. Las consultas de Athena sobre el destino son lentas y los cargos mensuales por peticiones de S3 están por encima de lo previsto. ¿Qué dos cambios atacan los dos síntomas? (Elegí dos.)",
    options: [
      {
        id: "A",
        text: "Subir el tamaño de buffer para que Firehose acumule más datos antes de escribir un objeto.",
        correct: true,
        explanation:
          "Correcta. A 50 KB por segundo el hint de 1 MB se alcanza cada veinte segundos, así que el límite de tamaño es una de las dos cosas que producen la avalancha de objetos diminutos. Subirlo es la mitad del arreglo.",
      },
      {
        id: "B",
        text: "Bajar el intervalo de buffer a cero segundos para que los objetos se escriban en cuanto llegan los registros.",
        correct: false,
        explanation:
          "Esto trata el síntoma como si fuera latencia cuando es cantidad de objetos. El buffer de cero segundos produce la mayor cantidad posible de los objetos más chicos posibles, lo que empeora bastante tanto los cargos por peticiones como el tiempo de planificación de Athena.",
      },
      {
        id: "C",
        text: "Habilitar la partición dinámica usando como clave el id de petición que trae cada registro.",
        correct: false,
        explanation:
          "Una idea sensata atada a una clave ruinosa. Un campo casi único crea un prefijo, y en la práctica un objeto, por registro, lo que multiplica la cantidad de objetos en lugar de reducirla y le deja a Athena una organización de particiones inutilizable.",
      },
      {
        id: "D",
        text: "Subir el intervalo de buffer para que se acumulen más registros entre descargas.",
        correct: true,
        explanation:
          "Correcta, y hace falta junto con el cambio de tamaño y no en su lugar. Firehose descarga con el primero de los dos hints que alcanza, así que dejar el intervalo en 60 segundos limitaría los objetos a unos 3 MB por más que el tamaño creciera.",
      },
      {
        id: "E",
        text: "Habilitar el cifrado del lado del servidor con una clave de AWS KMS en el bucket de destino.",
        correct: false,
        explanation:
          "El cifrado es buena práctica y acá está completamente al margen. No cambia ni la cantidad de objetos escritos ni el volumen que Athena recorre, y KMS agrega su propio costo por petición encima de los cargos que el equipo intenta reducir.",
      },
    ],
    tips: [
      "Firehose descarga con el primero de los dos hints que se alcanza, así que cambiar solo uno puede no cambiar nada.",
      "Muchos objetos chicos cuestan peticiones de S3 y hacen lenta a Athena, que gasta su tiempo listando y abriendo archivos en lugar de leerlos.",
      "La partición dinámica sobre un campo de cardinalidad alta multiplica la cantidad de objetos en lugar de reducirla.",
    ],
  },
];
