import type { ExamQuestionWithTopic } from "../../../types";

/**
 * Tema 3 en español: ingesta por lotes y desde bases de datos.
 *
 * Traducción de `../en/tema-3-batch-database.ts`, estrictamente paralela. Ver la nota
 * de criterio en `tema-1-streaming-kinesis-msk.ts`.
 */
export const TEMA_3_BATCH: ExamQuestionWithTopic[] = [
  {
    id: "dea-t3-q01",
    topic: "batch-database-ingestion",
    prompt:
      "Cada inserción, actualización y borrado que se aplica en una base de datos Microsoft SQL Server on-premises debe aterrizar de forma continua en Amazon S3, para que una tabla del data lake se mantenga al paso del origen. La aplicación dueña de la base de datos no se puede modificar. ¿Qué camino de ingesta captura los tres tipos de cambio?",
    options: [
      {
        id: "A",
        text: "AWS DMS con Amazon S3 como endpoint de destino, con una tarea de tipo carga completa y replicación continua.",
        correct: true,
        explanation:
          "Correcta. DMS lee el log de transacciones del origen, así que ve los borrados igual que las inserciones y las actualizaciones, y no necesita ningún cambio en la aplicación para hacerlo. El destino S3 escribe cada cambio con un indicador de operación que la tabla del lake puede aplicar.",
      },
      {
        id: "B",
        text: "Un job de AWS Glue programado que lea la tabla por JDBC con un bookmark sobre la columna updated_at.",
        correct: false,
        explanation:
          "La incorrecta más instructiva, porque sí captura inserciones y actualizaciones y es un patrón habitual. Una consulta con marca de agua solo puede ver las filas que todavía existen, así que todos los borrados son invisibles: la fila simplemente deja de aparecer, y el lake conserva la copia obsoleta para siempre.",
      },
      {
        id: "C",
        text: "Amazon AppFlow con un conector de SQL Server programado para traer los cambios.",
        correct: false,
        explanation:
          "Esto aplica un servicio orientado a SaaS a un origen relacional. AppFlow se conecta a APIs de aplicaciones como Salesforce o ServiceNow y no tiene conector de origen para SQL Server, así que el pipeline no se puede construir como se describe.",
      },
      {
        id: "D",
        text: "AWS DataSync transfiriendo a Amazon S3 los archivos de datos de la base desde el disco del servidor.",
        correct: false,
        explanation:
          "Copiar archivos resulta atractivo porque no necesita nada del motor de base de datos. Los archivos de una base en funcionamiento son una instantánea inconsistente de páginas a mitad de transacción, así que lo que aterriza en S3 no es un conjunto de datos consultable y no se puede leer como filas.",
      },
    ],
    tips: [
      "La captura de cambios basada en log es el único método de ingesta que observa los borrados sin ayuda de la aplicación.",
      "Una consulta sobre una columna de fecha de modificación captura inserciones y actualizaciones, y se pierde todos los borrados.",
      "Hacé coincidir el servicio con el tipo de origen: DMS para bases de datos, AppFlow para APIs de SaaS, DataSync para sistemas de archivos.",
    ],
  },
  {
    id: "dea-t3-q02",
    topic: "batch-database-ingestion",
    prompt:
      "Un job de Spark en AWS Glue corre cada hora contra un prefijo de Amazon S3 donde van cayendo archivos JSON nuevos. Cada corrida reprocesa el prefijo completo, así que el tiempo de ejecución y el costo suben a lo largo del día y la tabla de destino se llena de duplicados. ¿Qué función de Glue hace que una corrida lea solo lo que llegó desde la anterior?",
    options: [
      {
        id: "A",
        text: "El límite de corridas concurrentes del job, subido para que las corridas horarias nunca se solapen entre sí.",
        correct: false,
        explanation:
          "El control de concurrencia y el procesamiento incremental son problemas distintos, y esto no arregla ninguno. Las corridas solapadas no son lo que crea los duplicados: una sola corrida que lee todos los archivos ya duplica todo lo que leyó la hora anterior.",
      },
      {
        id: "B",
        text: "Los bookmarks de job.",
        correct: true,
        explanation:
          "Correcta. Un bookmark es estado persistido que registra cuáles objetos de S3, o cuál valor de marca de agua de JDBC, ya consumió un job, así que la corrida siguiente arranca donde terminó la anterior. Hay que habilitarlo en el job y confirmarlo en el script para que tenga efecto.",
      },
      {
        id: "C",
        text: "Un crawler de AWS Glue programado justo antes del job para que solo se registren las particiones nuevas.",
        correct: false,
        explanation:
          "Un crawler mantiene al día el Data Catalog, lo que da la sensación de que debería acotar lo que el job ve. Solo afecta los metadatos: el job sigue leyendo todo lo que cubre la definición de su origen, particiones viejas incluidas, salvo que algo le diga que las saltee.",
      },
      {
        id: "D",
        text: "Un trigger de workflow de Glue que pase al job como parámetro la marca de tiempo de fin de la corrida anterior.",
        correct: false,
        explanation:
          "El distractor más fuerte, porque esto funciona y muchos equipos lo construyeron. Es un bookmark artesanal con los defectos de siempre: un archivo que llega tarde se saltea para siempre, y una corrida fallida deja la marca de tiempo ambigua, dos cosas que los bookmarks a nivel de objeto manejan por vos.",
      },
    ],
    tips: [
      "Los bookmarks de job persisten lo que un job de Glue ya consumió para que las corridas posteriores lo salteen.",
      "Los bookmarks hay que habilitarlos en el job y confirmarlos en el script; habilitarlos solo no hace nada.",
      "Un crawler mantiene metadatos del catálogo y nunca cambia qué archivos lee un job.",
    ],
  },
  {
    id: "dea-t3-q03",
    topic: "batch-database-ingestion",
    prompt:
      "Los registros de oportunidad de una organización de Salesforce tienen que copiarse a Amazon S3 una vez por hora. El equipo no tiene capacidad para escribir ni hospedar código y no tiene permiso para instalar ningún paquete dentro de la organización de Salesforce. ¿Qué servicio hace esta ingesta?",
    options: [
      {
        id: "A",
        text: "AWS Glue con una conexión JDBC apuntada a la base de datos de Salesforce.",
        correct: false,
        explanation:
          "El camino JDBC de Glue es la forma conocida de leer un origen relacional, y por eso se recurre a él acá. Salesforce expone una API HTTPS y ningún endpoint de base de datos al que un driver JDBC pueda llegar, así que no hay nada a lo que la conexión se conecte.",
      },
      {
        id: "B",
        text: "AWS DMS con Salesforce configurado como endpoint de origen.",
        correct: false,
        explanation:
          "DMS cubre una lista impresionante de orígenes, así que suponer que Salesforce está entre ellos es razonable. Sus orígenes son motores de base de datos cuyo log de transacciones puede leer, y una aplicación SaaS no expone ningún log así.",
      },
      {
        id: "C",
        text: "Amazon AppFlow con el conector de Salesforce en una programación horaria.",
        correct: true,
        explanation:
          "Correcta. AppFlow es el servicio de conectores administrados para aplicaciones SaaS: se autentica contra la organización, trae el objeto según una programación y escribe en S3 sin ningún código y sin nada instalado del lado de Salesforce.",
      },
      {
        id: "D",
        text: "Una función de AWS Lambda con una programación de Amazon EventBridge que llame a la API REST de Salesforce.",
        correct: false,
        explanation:
          "Esto funciona, y es la respuesta que elegiría un ingeniero al que le gusta el control. También es código que el equipo dijo que no puede escribir ni mantener, e implica reimplementar la renovación de tokens OAuth, la paginación y el manejo de límites de API que AppFlow ya provee.",
      },
    ],
    tips: [
      "AppFlow es para APIs de aplicaciones SaaS; DMS es para motores de base de datos; el JDBC de Glue necesita un endpoint de base alcanzable.",
      "AppFlow maneja autenticación, paginación y traídas incrementales que un cliente de API escrito a mano tiene que reinventar.",
      "Un requisito que nombra un producto SaaS por su marca y prohíbe escribir código está apuntando a AppFlow.",
    ],
  },
  {
    id: "dea-t3-q04",
    topic: "batch-database-ingestion",
    prompt:
      "Varias docenas de socios externos suben archivos todas las noches desde clientes SFTP que no están dispuestos a reemplazar. Los archivos tienen que llegar directamente a Amazon S3, y la empresa se niega a operar o parchear cualquier servidor de transferencia de archivos. ¿Qué debería desplegar la empresa?",
    options: [
      {
        id: "A",
        text: "Un grupo de Auto Scaling de Amazon EC2 con OpenSSH y el bucket de S3 montado mediante un driver de sistema de archivos.",
        correct: false,
        explanation:
          "Satisface a los socios, ya que nada cambia de su lado, y ese ajuste parcial es el atractivo. También le entrega a la empresa exactamente lo que rechazó: instancias que parchear, claves de host que administrar y un directorio de usuarios que operar.",
      },
      {
        id: "B",
        text: "AWS DataSync, con un agente instalado en el sitio de cada socio para empujar los archivos nocturnos.",
        correct: false,
        explanation:
          "DataSync es la familia correcta de herramienta para mover archivos, y por eso parece plausible. Necesita un agente desplegado en el origen, y estos orígenes son de socios que la empresa no controla y en los que no puede instalar software.",
      },
      {
        id: "C",
        text: "Amazon AppFlow configurado con un conector SFTP para cada socio.",
        correct: false,
        explanation:
          "Esto lee AppFlow como un servicio de conectores de propósito general. Sus conectores son APIs de aplicaciones SaaS, y no actúa como un servidor al que clientes externos se conectan, así que no puede recibir una sesión SFTP entrante en absoluto.",
      },
      {
        id: "D",
        text: "AWS Transfer Family con un servidor habilitado para SFTP cuyo almacenamiento sea el bucket de Amazon S3.",
        correct: true,
        explanation:
          "Correcta. Transfer Family es SFTP administrado delante de S3: los socios conservan sus clientes y su modelo de credenciales, los archivos aterrizan como objetos de S3, y AWS se queda con los servidores, el parcheo y el escalado que la empresa se negó a asumir.",
      },
    ],
    tips: [
      "Transfer Family provee endpoints administrados de SFTP, FTPS y FTP respaldados por Amazon S3 o Amazon EFS.",
      "DataSync requiere un agente en el origen, lo que lo descarta siempre que no controlás el otro extremo.",
      "AppFlow se conecta a APIs de SaaS. No es un servidor de transferencia de archivos y no acepta sesiones entrantes de clientes.",
    ],
  },
  {
    id: "dea-t3-q05",
    topic: "batch-database-ingestion",
    prompt:
      "Una tarea de DMS configurada como carga completa y replicación continua lee de un servidor PostgreSQL 15 autoadministrado. La carga completa termina sin problemas, y la fase de captura de cambios falla inmediatamente después. ¿Qué configuración del lado del origen requiere la captura de cambios?",
    options: [
      {
        id: "A",
        text: "El parámetro wal_level puesto en logical, con un slot de replicación disponible para la tarea.",
        correct: true,
        explanation:
          "Correcta. La captura de cambios de PostgreSQL en DMS decodifica el write-ahead log, que solo lleva información suficiente cuando wal_level está en logical, y necesita un slot de replicación para sostener su posición. Una carga completa lee las tablas directamente, y por eso tuvo éxito primero.",
      },
      {
        id: "B",
        text: "Una réplica de lectura promovida a primaria, para que DMS pueda conectarse con permisos de escritura sobre el origen.",
        correct: false,
        explanation:
          "Esto supone que la replicación necesita acceso de escritura al origen, lo que resulta intuitivo porque la palabra replicación sugiere trabajo en dos direcciones. DMS solo lee del origen; los permisos de escritura que necesita son sobre el endpoint de destino.",
      },
      {
        id: "C",
        text: "La tabla de origen particionada, para que DMS pueda leer los cambios de varias particiones en paralelo.",
        correct: false,
        explanation:
          "El paralelismo por partición es una capacidad real de DMS, pero pertenece a la fase de carga completa, que acá ya terminó. La captura de cambios sigue un único flujo de log, así que ninguna cantidad de particionado de tablas la hace arrancar.",
      },
      {
        id: "D",
        text: "Amazon RDS Performance Insights habilitado, para que DMS pueda observar la actividad de cambios en el origen.",
        correct: false,
        explanation:
          "Confundir una herramienta de observabilidad con un camino de datos. Performance Insights describe lo que hace una base de datos para que lo lea una persona; no expone ningún flujo de cambios, y además ni siquiera está disponible para un servidor autoadministrado.",
      },
    ],
    tips: [
      "La captura de cambios de PostgreSQL en DMS lee el write-ahead log, que necesita wal_level en logical más un slot de replicación.",
      "Una carga completa que funciona mientras la captura de cambios falla te dice que la conectividad está bien y la configuración de logging no.",
      "El equivalente en MySQL es el binary logging en formato ROW con suficiente retención de binlog para que la tarea se mantenga al día.",
    ],
  },
  {
    id: "dea-t3-q06",
    topic: "batch-database-ingestion",
    prompt:
      "Un crawler corre cada noche sobre un prefijo de Amazon S3 que contiene cinco años de carpetas diarias. Las corridas tardan horas porque todas las carpetas se examinan otra vez, aunque solo el día más reciente cambia alguna vez. ¿Qué parámetro del crawler recorta el tiempo de corrida?",
    options: [
      {
        id: "A",
        text: "Bajar la configuración de nivel de tabla para que el crawler deje de descender hacia las carpetas más viejas.",
        correct: false,
        explanation:
          "La configuración de nivel de tabla suena como un límite de profundidad sobre el recorrido, y ahí está la mala lectura. Decide a qué profundidad de carpeta se define una tabla, con todo lo que está por debajo convertido en particiones, así que cambia la forma del catálogo y no cuánto S3 recorre el crawler.",
      },
      {
        id: "B",
        text: "Habilitar los crawls incrementales para que solo se examinen las carpetas agregadas desde la última corrida.",
        correct: true,
        explanation:
          "Correcta. Un crawl incremental limita el crawler a las carpetas nuevas y registra las particiones nuevas que encuentra, que es exactamente la forma de este conjunto de datos: solo se agrega, y la historia nunca cambia.",
      },
      {
        id: "C",
        text: "Reducir el tamaño de muestra del crawler para que se lean menos archivos dentro de cada carpeta.",
        correct: false,
        explanation:
          "La incorrecta más cercana, porque el muestreo es real y sí reduce las lecturas por carpeta. Las horas se están gastando en listar cinco años de carpetas en lugar de leer dentro de ellas, así que el crawler sigue visitando todas y el ahorro es marginal.",
      },
      {
        id: "D",
        text: "Cambiar la programación del crawler de diaria a semanal para que haya menos corridas largas.",
        correct: false,
        explanation:
          "Correr menos seguido reduce el tiempo total de crawler, que es un ahorro de costo real, así que es fácil de aceptar. Cada corrida individual sigue tardando horas, y ahora las particiones nuevas quedan invisibles para las consultas hasta por una semana.",
      },
    ],
    tips: [
      "Los crawls incrementales restringen un crawler a las carpetas agregadas desde su corrida anterior.",
      "La configuración de nivel de tabla fija la profundidad a la que se definen las tablas; no es un límite de recorrido.",
      "Para conjuntos de datos donde las particiones solo se agregan, la proyección de particiones de Athena puede sacar al crawler del camino por completo.",
    ],
  },
  {
    id: "dea-t3-q07",
    topic: "batch-database-ingestion",
    prompt:
      "Una emisora tiene 500 TB de video archivado en un NAS on-premises que deben llegar a Amazon S3 dentro de tres semanas. El sitio tiene una única conexión a internet de 200 Mbps, de la cual unos dos tercios están permanentemente consumidos por tráfico de producción. ¿Qué enfoque puede terminar a tiempo?",
    options: [
      {
        id: "A",
        text: "AWS DataSync sobre la conexión existente, con un límite de ancho de banda puesto en la capacidad sobrante.",
        correct: false,
        explanation:
          "DataSync es la herramienta correcta para transferencias por red y el límite es ingeniería responsable, lo que juntos hacen esto muy convincente. Hacé la cuenta: 500 TB sobre unos 65 Mbps de capacidad sobrante tarda bastante más de un año, así que la fecha límite se incumple por dos órdenes de magnitud.",
      },
      {
        id: "B",
        text: "Un script en un servidor del sitio que haga cargas multiparte a S3 del archivo histórico en paralelo.",
        correct: false,
        explanation:
          "La carga multiparte en paralelo es la forma estándar de saturar un enlace, y saturarlo no es el problema. La capacidad del enlace es el techo duro, así que esto llega al mismo plazo que cualquier otro método por red y encima agrega lógica de reintentos que nadie quiere mantener.",
      },
      {
        id: "C",
        text: "Dispositivos AWS Snowball Edge enviados al sitio, cargados localmente y devueltos a AWS.",
        correct: true,
        explanation:
          "Correcta. Cuando el volumen dividido por el ancho de banda utilizable supera la fecha límite, la transferencia física es la única opción que entra: el archivo histórico se copia por la red local a velocidad de NAS y los dispositivos viajan en días en lugar de meses.",
      },
      {
        id: "D",
        text: "AWS Storage Gateway en modo file gateway, cacheando el contenido del NAS y subiéndolo a Amazon S3.",
        correct: false,
        explanation:
          "Un file gateway sí presenta S3 localmente y sí sube en segundo plano, lo que lo hace parecer un aparato de transferencia. Cada byte subido sigue cruzando el mismo enlace de 200 Mbps, así que el gateway cambia el patrón de acceso y no el tiempo de transferencia.",
      },
    ],
    tips: [
      "Dividí el volumen por el ancho de banda utilizable antes de elegir un método; el resultado a menudo descarta la red por completo.",
      "Snowball sirve para movimientos masivos de una sola vez; DataSync sirve para sincronización incremental continua.",
      "Storage Gateway presenta almacenamiento en la nube de forma local y sigue enviando cada byte por tu enlace existente.",
    ],
  },
  {
    id: "dea-t3-q08",
    topic: "batch-database-ingestion",
    prompt:
      "Los analistas necesitan que las tablas de un cluster de Amazon Aurora MySQL sean consultables en Amazon Redshift pocos segundos después de escribirse. La dirección instruyó al equipo de ingeniería de datos a no construir ni operar ningún pipeline para esto. ¿Qué enfoque satisface el objetivo de latencia y la instrucción?",
    options: [
      {
        id: "A",
        text: "Una tarea de AWS DMS que replique el cluster de Aurora hacia Amazon Redshift de forma continua.",
        correct: false,
        explanation:
          "La incorrecta más cercana en términos funcionales: DMS puede hacer esto y puede mantener la latencia baja. Sigue siendo un pipeline del que el equipo es dueño, con una instancia de replicación que dimensionar, parámetros de tarea que ajustar y fallas por las que recibir alertas, que es lo que la instrucción prohibía.",
      },
      {
        id: "B",
        text: "Un job de AWS Glue programado cada cinco minutos que lea Aurora por JDBC y escriba en Redshift.",
        correct: false,
        explanation:
          "Dos problemas, y uno de ellos es aritmético. Una programación de cinco minutos no puede producir frescura a nivel de segundos por más rápido que sea el job, y el job en sí es el pipeline que al equipo le dijeron que no construyera.",
      },
      {
        id: "C",
        text: "Consultas federadas de Redshift que lean las tablas de Aurora directamente en el momento de la consulta.",
        correct: false,
        explanation:
          "Un distractor fuerte, porque genuinamente no hay pipeline y los datos son lo más frescos posible. El costo recae en la base de datos operativa, que ahora atiende recorridos analíticos, y los datos nunca llegan de verdad a Redshift, así que no se pueden unir a velocidad de warehouse ni conservar después de que el origen los purgue.",
      },
      {
        id: "D",
        text: "Una integración zero-ETL entre el cluster de Aurora MySQL y el warehouse de Redshift.",
        correct: true,
        explanation:
          "Correcta. Una integración zero-ETL es el camino de replicación administrado: AWS mantiene las tablas de Redshift al paso de Aurora en segundos, y el equipo configura la integración una vez en lugar de operar algo.",
      },
    ],
    tips: [
      "Una integración zero-ETL replica Aurora hacia Redshift sin nada que construir ni operar.",
      "La consulta federada deja los datos en el origen y pone carga analítica sobre la base de datos operativa.",
      "Cuando un requisito prohíbe operar un pipeline, preferí una integración administrada antes que un servicio administrado que igual dimensionás y ajustás.",
    ],
  },
  {
    id: "dea-t3-q09",
    topic: "batch-database-ingestion",
    prompt:
      "Después de una migración con DMS de Oracle a Amazon RDS for PostgreSQL, un auditor exige evidencia de que las filas del destino coinciden con las del origen fila por fila, y de que siguen coincidiendo mientras corre la replicación continua. ¿Qué capacidad de DMS produce esa evidencia?",
    options: [
      {
        id: "A",
        text: "Habilitar la validación de datos en la tarea para que DMS compare las filas de origen y destino y registre las discrepancias.",
        correct: true,
        explanation:
          "Correcta. La validación de datos lee filas de los dos endpoints, las compara y escribe las discrepancias en una tabla de validación, y continúa durante la fase de captura de cambios. Esa tabla es el artefacto que se le puede mostrar a un auditor.",
      },
      {
        id: "B",
        text: "Correr una evaluación previa a la migración sobre la tarea y adjuntar su informe.",
        correct: false,
        explanation:
          "El error más cercano, y una función real de DMS que se confunde con la validación. Una evaluación corre antes de la tarea e informa obstáculos estructurales, como tipos de datos no soportados o claves primarias ausentes. Nunca mira una sola fila de datos.",
      },
      {
        id: "C",
        text: "Activar el logging detallado en Amazon CloudWatch para la tarea y reconciliar los conteos de sentencias aplicadas.",
        correct: false,
        explanation:
          "Los conteos se sienten como prueba porque son numéricos. Conteos de sentencias que coinciden muestran que ocurrió la misma cantidad de trabajo, no que las filas resultantes sean idénticas, y un valor truncado o convertido en silencio se cuenta como aplicado.",
      },
      {
        id: "D",
        text: "Habilitar las copias de seguridad automatizadas en la instancia de RDS y comparar snapshots restaurados contra el origen.",
        correct: false,
        explanation:
          "Las copias de seguridad demuestran que el destino se puede recuperar, que es una garantía completamente distinta. Comparar un snapshot restaurado a mano también es un ejercicio puntual en el tiempo, y el auditor pidió evidencia que se sostenga mientras la replicación continúa.",
      },
    ],
    tips: [
      "La validación de datos de DMS compara filas en los dos endpoints de forma continua y registra las discrepancias en una tabla de validación.",
      "Una evaluación previa a la migración inspecciona la estructura antes de que la tarea arranque y nunca compara datos.",
      "Los conteos de filas y el volumen de logs miden actividad, no corrección.",
    ],
  },
  {
    id: "dea-t3-q10",
    topic: "batch-database-ingestion",
    prompt:
      "Una tarea de DMS que mueve una tabla con columnas CLOB no reporta errores, y sin embargo el texto de las filas del destino queda cortado en 32 KB. ¿Qué parámetro de la tarea explica el truncamiento?",
    options: [
      {
        id: "A",
        text: "La carga en paralelo dividió la tabla en rangos y se descartó el rango final de cada valor grande.",
        correct: false,
        explanation:
          "Esto inventa un mecanismo de truncamiento a partir de una función real. La carga en paralelo divide una tabla en rangos de filas para acelerar la carga completa; nunca divide el valor de una columna individual, así que no puede recortar uno.",
      },
      {
        id: "B",
        text: "El modo LOB limitado está habilitado con un tamaño máximo de LOB menor que el valor más grande de la columna.",
        correct: true,
        explanation:
          "Correcta. El modo LOB limitado asigna un buffer fijo por objeto grande para ganar velocidad y descarta en silencio todo lo que lo excede, con 32 KB como el valor por defecto conocido. No se lanza ningún error porque truncar es el comportamiento documentado de ese modo.",
      },
      {
        id: "C",
        text: "La conversión de esquema creó la columna de destino como VARCHAR en lugar de TEXT, así que los valores se recortan al insertarse.",
        correct: false,
        explanation:
          "Un defecto de esquema creíble y que vale descartar bien. PostgreSQL rechaza con un error un valor que excede un VARCHAR acotado, en lugar de recortarlo, así que la tarea habría fallado de forma ruidosa en vez de producir filas acortadas.",
      },
      {
        id: "D",
        text: "La validación de datos está deshabilitada, así que DMS aplicó las filas sin comprobar su longitud.",
        correct: false,
        explanation:
          "Esto trata la validación como si fuera una compuerta. La validación observa y reporta diferencias después de que las filas se aplican; nunca bloquea ni corrige una escritura, así que habilitarla habría revelado el truncamiento sin impedirlo.",
      },
    ],
    tips: [
      "El modo LOB limitado es rápido y trunca en silencio todo lo que excede el tamaño máximo de LOB configurado.",
      "El modo LOB completo preserva los valores enteros a un costo alto de rendimiento; el modo LOB en línea es el intermedio para tamaños mezclados.",
      "Un truncamiento silencioso en un número redondo apunta a un límite configurado antes que a un bug.",
    ],
  },
  {
    id: "dea-t3-q11",
    topic: "batch-database-ingestion",
    prompt:
      "Un job de AWS Glue tiene que leer de una instancia de Amazon RDS que no tiene dirección pública y vive en subredes privadas. El job falla al establecer la conexión con la base de datos. ¿Qué configuración le da al job acceso de red a la instancia?",
    options: [
      {
        id: "A",
        text: "Agregar una ruta a una internet gateway en las subredes privadas para que el job pueda alcanzar la instancia.",
        correct: false,
        explanation:
          "El ruteo es la categoría correcta y esta es la dirección equivocada. Glue no está dentro de la VPC para empezar, así que una ruta a internet gateway no le da ningún camino nuevo, y lo único que el cambio lograría es exponer una base que se hizo privada a propósito.",
      },
      {
        id: "B",
        text: "Otorgarle al rol IAM del job los permisos rds:DescribeDBInstances y rds-db:connect.",
        correct: false,
        explanation:
          "La confusión que vale nombrar es permiso contra alcanzabilidad. IAM decide si una llamada está autorizada; no puede crear un camino de red, y una conexión que nunca llega a la instancia falla antes de que se evalúe cualquier autorización.",
      },
      {
        id: "C",
        text: "Crear una conexión de AWS Glue que especifique la VPC, la subred y el grupo de seguridad, y asociarla al job.",
        correct: true,
        explanation:
          "Correcta. Asociar una conexión de Glue es lo que hace que Glue cree interfaces de red elásticas dentro de la subred elegida, así que el job corre con una dirección en la VPC y puede alcanzar una instancia privada mediante las reglas normales de grupo de seguridad.",
      },
      {
        id: "D",
        text: "Crear un endpoint de VPC de tipo interfaz para AWS Glue en la VPC de la base de datos.",
        correct: false,
        explanation:
          "Una confusión precisa y habitual. Un endpoint de interfaz de Glue permite que los recursos dentro de la VPC llamen a la API de Glue sin pasar por internet, que es la dirección de viaje opuesta. No hace nada por colocar los workers del job dentro de la VPC.",
      },
    ],
    tips: [
      "Una conexión de Glue es lo que coloca las interfaces de red elásticas de un job dentro de tus subredes de VPC.",
      "El grupo de seguridad que usa una conexión de Glue debe permitir tráfico entrante desde sí mismo, para la comunicación interna de Glue.",
      "IAM gobierna si una llamada está permitida; el ruteo y los grupos de seguridad gobiernan si se puede hacer.",
    ],
  },
  {
    id: "dea-t3-q12",
    topic: "batch-database-ingestion",
    prompt:
      "Un crawler apuntado a s3://logs/ produjo miles de tablas de Glue casi idénticas, una por carpeta de dispositivo, cuando el equipo quería una sola tabla particionada por dispositivo. Todas las carpetas contienen archivos con el mismo esquema. ¿Qué configuración da como resultado una tabla?",
    options: [
      {
        id: "A",
        text: "Habilitar los crawls incrementales para que las carpetas ya vistas no vuelvan a registrarse como tablas.",
        correct: false,
        explanation:
          "El crawling incremental cambia cuánto mira el crawler, no cómo agrupa lo que encuentra. Las carpetas de dispositivo nuevas seguirían convirtiéndose cada una en su propia tabla, así que el catálogo se sigue desbordando al mismo ritmo.",
      },
      {
        id: "B",
        text: "Configurar el crawler para que actualice todas las particiones nuevas y existentes con los metadatos de la tabla.",
        correct: false,
        explanation:
          "Es una opción real del crawler y sí tiene que ver con particiones, y por eso parece relevante. Propaga los cambios de columnas de una tabla hacia sus particiones, y solo se aplica una vez que las particiones existen como particiones y no como tablas separadas.",
      },
      {
        id: "C",
        text: "Excluir las carpetas de dispositivo con un patrón glob para que el crawler se detenga en el nivel superior.",
        correct: false,
        explanation:
          "Excluir sí evita que aparezcan las tablas extra, lo que da la sensación de arreglo. Los prefijos excluidos no se catalogan en absoluto, así que los datos se vuelven invisibles en lugar de quedar particionados, y las consultas devuelven nada en lugar de demasiadas tablas.",
      },
      {
        id: "D",
        text: "Poner la configuración de nivel de tabla del crawler para que la tabla se defina en el nivel de s3://logs/.",
        correct: true,
        explanation:
          "Correcta. El nivel de tabla le dice al crawler a qué profundidad de carpeta empieza un conjunto de datos; definirlo en el nivel de logs hace que todo lo que está debajo sean particiones de una sola tabla, que es la forma que el equipo quería.",
      },
    ],
    tips: [
      "La configuración de nivel de tabla fija la profundidad de carpeta donde empieza una tabla; todo lo más profundo se vuelve particiones.",
      "Un crawler crea una tabla separada por cada carpeta que parece un conjunto de datos independiente, y por eso importan los prefijos consistentes.",
      "Excluir un prefijo lo saca del catálogo por completo en lugar de plegarlo dentro de una tabla padre.",
    ],
  },
  {
    id: "dea-t3-q13",
    topic: "batch-database-ingestion",
    multiple: true,
    prompt:
      "Un job nocturno de Spark en AWS Glue lee unos 200.000 objetos JSON chicos de Amazon S3 y tarda cuatro horas. El monitoreo muestra el driver ocupado mientras la mayoría de los executors están inactivos, y agregar workers no ayudó. ¿Qué dos cambios reducen el tiempo de ejecución? (Elegí dos.)",
    options: [
      {
        id: "A",
        text: "Poner la opción groupFiles del job en inPartition con un tamaño de grupo, para que cada tarea lea muchos objetos chicos.",
        correct: true,
        explanation:
          "Correcta. La agrupación de archivos es la respuesta directa a una carga de archivos chicos: en lugar de una tarea por objeto, Spark empaqueta muchos objetos en cada tarea, lo que recorta el costo de planificación y pone a trabajar a los executors inactivos.",
      },
      {
        id: "B",
        text: "Aumentar la cantidad de DPUs asignadas al job para que haya más executors disponibles.",
        correct: false,
        explanation:
          "El reflejo ante un job lento de Spark, y el escenario ya dice que se probó. Los executors están inactivos, así que la capacidad no es la restricción; más de ellos simplemente significa más capacidad inactiva facturada.",
      },
      {
        id: "C",
        text: "Cambiar el job de Spark a un job de Python shell para evitar el costo de arranque de Spark.",
        correct: false,
        explanation:
          "El costo de arranque es real pero se mide en minutos y no en horas, así que esto atribuye mal el costo. Un job de Python shell además corre en un solo nodo, lo que elimina el paralelismo que es lo único que vuelve manejables 200.000 objetos.",
      },
      {
        id: "D",
        text: "Habilitar el bookmark del job para que los objetos procesados en noches anteriores no se lean de nuevo.",
        correct: false,
        explanation:
          "Una buena práctica que responde otra pregunta. El escenario describe el costo de los objetos de una sola noche; un bookmark evita releer noches anteriores pero no hace nada respecto de los 200.000 archivos que esta corrida legítimamente tiene que abrir.",
      },
      {
        id: "E",
        text: "Hacer que la entrega que está aguas arriba escriba objetos más grandes, para que cada noche lleguen menos archivos y más grandes.",
        correct: true,
        explanation:
          "Correcta, y es el arreglo que dura. La agrupación compensa los archivos chicos en el momento de leer, mientras agrandarlos en el momento de escribir elimina el problema para todos los consumidores del conjunto de datos, Athena incluida.",
      },
    ],
    tips: [
      "Un driver ocupado con executors inactivos en Spark es la firma de demasiados archivos chicos, no de poca capacidad.",
      "La opción groupFiles de Glue empaqueta muchos objetos chicos en cada tarea, y es la mitigación del lado de la lectura.",
      "Arreglar el tamaño de los objetos en el punto de escritura ayuda a todos los consumidores de aguas abajo, no solo a un job.",
    ],
  },
  {
    id: "dea-t3-q14",
    topic: "batch-database-ingestion",
    multiple: true,
    prompt:
      "La latencia de destino de una tarea de captura de cambios de DMS creció de segundos a casi una hora durante el horario laboral. La instancia de replicación muestra CPU alta sostenida, y la tarea aplica los cambios de a una sentencia por vez contra un destino de Amazon RDS. ¿Qué dos acciones reducen la latencia? (Elegí dos.)",
    options: [
      {
        id: "A",
        text: "Cambiar el tipo de tarea a solo carga completa para que deje de seguir los cambios continuos.",
        correct: false,
        explanation:
          "Esto elimina la métrica de latencia eliminando la función que la produce. La captura de cambios es el requisito, así que abandonarla no hace el pipeline más rápido: lo hace un pipeline distinto y peor.",
      },
      {
        id: "B",
        text: "Aumentar el período de retención de los logs de transacciones en la base de datos de origen.",
        correct: false,
        explanation:
          "Vale la pena por seguridad y es fácil confundirlo con un arreglo. Una retención de log más larga significa que una tarea atrasada todavía puede encontrar los cambios que necesita en lugar de fallar directamente, pero no hace nada por ayudarla a ponerse al día.",
      },
      {
        id: "C",
        text: "Habilitar la aplicación por lotes para que los cambios capturados se apliquen al destino en lotes en lugar de de a uno.",
        correct: true,
        explanation:
          "Correcta. Aplicar los cambios de a una sentencia por vez suele ser el costo dominante en una tarea atrasada. La aplicación por lotes los agrupa en muchas menos idas y vueltas al destino, que es típicamente la mayor reducción de latencia disponible.",
      },
      {
        id: "D",
        text: "Escalar la instancia de replicación a una clase con más CPU y memoria.",
        correct: true,
        explanation:
          "Correcta, y las métricas apuntan ahí de forma directa: CPU alta sostenida en la instancia de replicación significa que la tarea está limitada por cómputo mientras transforma y aplica los cambios, así que la clase de instancia es una restricción real y no una conjetura.",
      },
      {
        id: "E",
        text: "Habilitar la validación de datos en la tarea para que las filas que se atrasan se detecten antes.",
        correct: false,
        explanation:
          "Detectar no es acelerar, y acá además perjudica. La validación emite sus propias lecturas contra los dos endpoints, lo que agrega carga a la instancia de replicación ya saturada y empuja la latencia más arriba.",
      },
    ],
    tips: [
      "Aplicar los cambios de a una fila por vez es la causa habitual de una latencia de destino creciente; la aplicación por lotes es lo primero que hay que probar.",
      "CPU alta en la instancia de replicación significa que el cuello de botella es la clase de instancia y no los parámetros de la tarea.",
      "La validación agrega carga de lectura a los dos endpoints, así que habilitala a propósito y no mientras persigues latencia.",
    ],
  },
];
