import type { ExamQuizQuestion } from "../../types";

/**
 * Question bank for lesson "02-18-analisis-preguntas-modulo-2" (Módulo 2 —
 * Dominio 1 · Ingesta de datos, task statement 1.1). 16 questions covering the
 * whole module — streaming vs. batch, Kinesis capacity and consumers, Lambda
 * event source mappings, Firehose, MSK, Flink, CDC, DMS, zero-ETL, throttling,
 * triggers, delivery semantics and fan-out — not just the last topic seen.
 * See CONTRATO-DE-CLASES.md.
 */
export const MODULE_2_QUESTIONS: ExamQuizQuestion[] = [
  {
    id: "m2-q01",
    prompt:
      "Una empresa publica eventos en un stream de Kinesis Data Streams con 12 shards. Las métricas indican que el stream utiliza menos del 40 % de su capacidad total de escritura, pero los productores reciben errores de ProvisionedThroughputExceededException de forma constante. ¿Cuál es la causa más probable?",
    options: [
      {
        id: "A",
        text: "El número de shards es insuficiente para el volumen de datos",
        correct: false,
        explanation:
          "El propio enunciado lo desmiente: si el stream usa menos del 40 % de su capacidad total, no faltan shards. Añadir más repartiría el tráfico igual de mal y los nuevos quedarían tan vacíos como los actuales.",
      },
      {
        id: "B",
        text: "La partition key tiene baja cardinalidad y concentra los registros en pocos shards",
        correct: true,
        explanation:
          "Los límites de 1 MB/s y 1.000 registros por segundo se aplican por shard, no al stream completo. Una partition key con pocos valores distintos hace que su hash caiga siempre en los mismos shards, que se saturan mientras el resto queda sin usar. Es un hot shard, y se corrige eligiendo una clave mejor distribuida.",
      },
      {
        id: "C",
        text: "El período de retención es demasiado corto para el volumen ingerido",
        correct: false,
        explanation:
          "La retención define cuánto tiempo se pueden releer los datos, no cuántos se pueden escribir por segundo. Aunque estuviera mal configurada, no produciría errores de límite de rendimiento en la escritura.",
      },
      {
        id: "D",
        text: "Los consumidores no están usando enhanced fan-out y saturan el stream",
        correct: false,
        explanation:
          "El enhanced fan-out afecta a la capacidad de lectura, y el error del enunciado lo reciben los productores al escribir. Leer y escribir tienen límites separados por shard, así que la configuración de los consumidores no explica este síntoma.",
      },
    ],
    tips: [
      "\"Sobra capacidad total pero da errores de throughput\" es siempre reparto de clave, en Kinesis y también en DynamoDB.",
      "Comprueba si el error lo recibe quien escribe o quien lee: los límites de escritura y de lectura son independientes.",
    ],
  },
  {
    id: "m2-q02",
    prompt:
      "Cuatro equipos consumen el mismo stream de Kinesis Data Streams con aplicaciones propias. Al incorporarse el cuarto, los cuatro empezaron a notar retrasos crecientes y errores de límite de lectura, aunque el volumen escrito no ha cambiado. ¿Qué solución resuelve el problema?",
    options: [
      {
        id: "A",
        text: "Registrar los consumidores para que usen enhanced fan-out",
        correct: true,
        explanation:
          "En el modo compartido, los 2 MB/s por shard y las cinco llamadas de lectura por segundo se reparten entre todos los consumidores, así que cada lector nuevo degrada a los demás. Con enhanced fan-out, cada consumidor registrado obtiene su propio canal de 2 MB/s por shard y la latencia media baja a unos 70 ms.",
      },
      {
        id: "B",
        text: "Duplicar el número de shards del stream",
        correct: false,
        explanation:
          "Aumentaría la capacidad total de lectura, pero seguiría repartiéndose entre los cuatro consumidores y el problema reaparecería con el quinto. Además paga capacidad de escritura que el enunciado dice que no hace falta: el volumen escrito no cambió.",
      },
      {
        id: "C",
        text: "Ampliar el período de retención del stream a siete días",
        correct: false,
        explanation:
          "La retención permite releer datos más antiguos, pero no aporta capacidad de lectura por segundo. Los consumidores seguirían compitiendo exactamente igual por los mismos 2 MB/s por shard.",
      },
      {
        id: "D",
        text: "Hacer que un consumidor lea el stream y reenvíe los datos a los otros tres",
        correct: false,
        explanation:
          "Resolvería la competencia por la capacidad, pero crea un acoplamiento peor: si ese consumidor se retrasa o falla, los otros tres se quedan sin datos, y añadir un quinto obligaría a modificarlo. El fan-out debe hacerlo el sistema, no un consumidor.",
      },
    ],
    tips: [
      "\"Al añadir un consumidor, todos empeoraron\" es enhanced fan-out. Añadir shards es el distractor caro.",
      "Desconfía de las arquitecturas donde un consumidor reparte a los demás: acoplan y obligan a tocarlo para crecer.",
    ],
  },
  {
    id: "m2-q03",
    prompt:
      "Una empresa entrega eventos JSON a Amazon S3 mediante Kinesis Data Firehose y los consulta con Amazon Athena. Las consultas filtran por tipo de evento y por la fecha en que ocurrió el evento, pero son lentas y caras: los objetos se guardan en carpetas por la hora de entrega y en formato JSON. ¿Qué configuración de Firehose lo corrige con el menor esfuerzo?",
    options: [
      {
        id: "A",
        text: "Activar la conversión de formato a Parquet",
        correct: false,
        explanation:
          "Es media respuesta. Convertir a Parquet reduce los bytes escaneados, pero las carpetas seguirían organizadas por la hora de entrega, así que el filtro por la fecha del evento tendría que recorrer todas las particiones igualmente.",
      },
      {
        id: "B",
        text: "Reducir el intervalo del búfer al mínimo para que los objetos se escriban antes",
        correct: false,
        explanation:
          "Empeoraría el problema. Un intervalo menor produce más objetos y más pequeños, lo que añade el coste fijo de apertura de cada archivo a unas consultas que ya son lentas. El intervalo se reduce para bajar la latencia, no para acelerar las consultas.",
      },
      {
        id: "C",
        text: "Añadir un job programado que reorganice los archivos por fecha de evento cada noche",
        correct: false,
        explanation:
          "Funcionaría, pero contradice el requisito de menor esfuerzo: añade un proceso que hay que construir, programar y vigilar, cuando el propio servicio de entrega puede hacerlo al escribir. Además deja los datos mal organizados hasta que el job se ejecute.",
      },
      {
        id: "D",
        text: "Activar la conversión a Parquet y el particionado dinámico usando los campos del registro",
        correct: true,
        explanation:
          "Ataca los dos problemas del enunciado. La conversión de formato reduce los bytes leídos por fila, y el particionado dinámico construye el prefijo de S3 a partir del contenido del registro —el tipo y la fecha del evento— en lugar de la hora de entrega, de modo que el filtro de las consultas coincide con la organización de las carpetas.",
      },
    ],
    tips: [
      "\"Las carpetas usan la hora de entrega\" junto a \"filtran por la fecha del evento\" es particionado dinámico.",
      "Cuando el enunciado describa dos problemas, la respuesta correcta suele resolver los dos: desconfía de las opciones que solo cubren uno.",
    ],
  },
  {
    id: "m2-q04",
    prompt:
      "Una función de Lambda consume un stream de Kinesis. Desde hace horas el retraso de consumo crece sin parar y los registros de la función muestran el mismo error repetido sobre el mismo lote. El equipo necesita que el procesamiento continúe y quiere conservar los registros que no se puedan procesar para analizarlos después. ¿Qué DOS configuraciones lo consiguen? (Elige dos)",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Establecer un número máximo de reintentos o una edad máxima de registro",
        correct: true,
        explanation:
          "Correcta. Por defecto Lambda reintenta el lote indefinidamente y, como el orden importa, no avanza: un registro corrupto bloquea el shard entero. Limitar los reintentos o la edad del registro hace que Lambda descarte el lote y siga procesando.",
      },
      {
        id: "B",
        text: "Configurar un destino en caso de fallo hacia una cola de SQS o un topic de SNS",
        correct: true,
        explanation:
          "Correcta. Es lo que cumple el requisito de conservar lo descartado: cuando Lambda agota los reintentos, envía a ese destino la información del lote fallido para poder analizarlo, en lugar de perderlo sin rastro.",
      },
      {
        id: "C",
        text: "Aumentar la memoria asignada a la función",
        correct: false,
        explanation:
          "El enunciado describe un error repetido sobre el mismo lote, no una falta de recursos. Con más memoria, el lote seguiría fallando exactamente igual y el shard seguiría bloqueado.",
      },
      {
        id: "D",
        text: "Aumentar el factor de paralelización a 10",
        correct: false,
        explanation:
          "Permitiría procesar más lotes por shard en paralelo, pero el lote problemático seguiría fallando y reintentándose. Además, Lambda agrupa los lotes concurrentes por partition key, así que la clave afectada seguiría atascada.",
      },
      {
        id: "E",
        text: "Ampliar el período de retención del stream",
        correct: false,
        explanation:
          "La retención define cuánto tiempo siguen disponibles los datos para releerlos, pero no desbloquea al consumidor. El retraso seguiría creciendo igual: solo se ganaría margen antes de que los registros expiren sin procesar.",
      },
    ],
    tips: [
      "\"El mismo lote falla una y otra vez y el retraso crece\" es un poison pill: un registro que bloquea el shard.",
      "Cuando el enunciado pida a la vez continuar y conservar lo descartado, la respuesta son dos piezas: un límite y un destino de fallos.",
      "En respuesta múltiple no hay crédito parcial: acertar una de dos cuenta igual que fallar las dos.",
    ],
  },
  {
    id: "m2-q05",
    prompt:
      "Una empresa ejecuta Apache Kafka en sus propios servidores, con varios conectores de Kafka Connect hacia sistemas internos. Quiere migrar a AWS reduciendo al máximo el trabajo operativo, sin reescribir las aplicaciones productoras y consumidoras y sin perder los conectores existentes. ¿Qué solución lo consigue?",
    options: [
      {
        id: "A",
        text: "Migrar a Kinesis Data Streams y reescribir los conectores como funciones de Lambda",
        correct: false,
        explanation:
          "Kinesis es un servicio válido, pero obliga a reescribir productores y consumidores contra otra API y a sustituir los conectores por código propio. El enunciado descarta ambas cosas de forma explícita.",
      },
      {
        id: "B",
        text: "Amazon MSK con MSK Connect",
        correct: true,
        explanation:
          "MSK expone la API de Apache Kafka, así que las aplicaciones existentes funcionan sin cambios, y MSK Connect ejecuta de forma gestionada los mismos conectores de Kafka Connect que ya tienen. Es la única opción que conserva aplicaciones y conectores dejando la operación en manos de AWS.",
      },
      {
        id: "C",
        text: "Desplegar Kafka en instancias EC2 administradas por el equipo",
        correct: false,
        explanation:
          "Conservaría las aplicaciones y los conectores, pero contradice el requisito de reducir al máximo el trabajo operativo: el equipo seguiría encargándose de parches, escalado, replicación y supervisión del clúster.",
      },
      {
        id: "D",
        text: "Amazon Data Firehose con Amazon MSK como destino",
        correct: false,
        explanation:
          "Firehose puede leer de MSK, pero no al revés: no es un sustituto de un clúster de Kafka ni conserva conectores. La opción invierte la dirección real de la integración.",
      },
    ],
    tips: [
      "\"Ya usamos Kafka\", \"sin reescribir\" o \"evitar dependencia del proveedor\" apuntan a MSK.",
      "Si no se menciona Kafka ni portabilidad y piden menor esfuerzo operativo, Kinesis suele ganar: MSK arrastra más conceptos que administrar.",
    ],
  },
  {
    id: "m2-q06",
    prompt:
      "Una empresa recibe eventos de pedidos en un stream. Cada pedido genera un evento de creación y debe recibir un evento de confirmación en los 15 minutos siguientes. El equipo necesita una alerta cuando un pedido no reciba su confirmación en ese plazo, con la menor latencia posible. ¿Qué solución cumple el requisito?",
    options: [
      {
        id: "A",
        text: "Una aplicación de Managed Service for Apache Flink con estado y temporizadores por event time",
        correct: true,
        explanation:
          "Detectar una ausencia exige recordar qué se está esperando y disponer de temporizadores que salten al vencer el plazo. Flink mantiene ese estado de forma distribuida, lo recupera desde checkpoints tras un fallo y trabaja con la marca de tiempo del evento, que es lo que hace correcto el plazo de 15 minutos.",
      },
      {
        id: "B",
        text: "Una función de Lambda invocada por cada evento del stream",
        correct: false,
        explanation:
          "Una función invocada por registro solo puede reaccionar a lo que llega, y aquí hay que reaccionar a lo que no llega: la ausencia de un evento no dispara ninguna invocación. Sin estado ni temporizadores, no hay forma de detectarlo.",
      },
      {
        id: "C",
        text: "Una consulta programada cada hora sobre los eventos almacenados en el data lake",
        correct: false,
        explanation:
          "Detectaría el problema, pero con hasta una hora de retraso sobre un plazo de 15 minutos, y el enunciado pide la menor latencia posible. Una comprobación periódica siempre añade el intervalo entre ejecuciones.",
      },
      {
        id: "D",
        text: "Kinesis Data Firehose entregando los eventos a Amazon S3 y un crawler que los catalogue",
        correct: false,
        explanation:
          "Firehose entrega y no calcula nada, y un crawler solo registra el esquema en el catálogo. La combinación deja los datos disponibles para consultarlos después, pero no genera ninguna alerta ni detecta ausencias.",
      },
    ],
    tips: [
      "\"Detectar que un evento esperado no llegó\" es siempre un motor con estado. Ninguna función por registro puede hacerlo.",
      "Ventanas deslizantes, uniones entre flujos y detección de ausencias descartan Lambda y apuntan a Flink.",
    ],
  },
  {
    id: "m2-q07",
    prompt:
      "Una empresa replica los cambios de una tabla de DynamoDB hacia su data lake con un proceso que cada 15 minutos consulta las filas modificadas por su marca de tiempo. El equipo detecta que los elementos eliminados siguen apareciendo en el data lake y que la tabla sufre picos de latencia cada vez que el proceso se ejecuta. ¿Qué solución corrige ambos problemas?",
    options: [
      {
        id: "A",
        text: "Aumentar la capacidad de lectura aprovisionada de la tabla",
        correct: false,
        explanation:
          "Aliviaría los picos de latencia a base de pagar más capacidad, pero no corrige el problema de fondo ni hace aparecer los borrados: una fila eliminada nunca va a aparecer en una consulta por marca de tiempo.",
      },
      {
        id: "B",
        text: "Reducir el intervalo del proceso a cinco minutos",
        correct: false,
        explanation:
          "Empeora el primer problema, porque triplica la frecuencia de los escaneos que están causando los picos de latencia, y sigue sin detectar los borrados. Ajustar la frecuencia nunca arregla las limitaciones del sondeo.",
      },
      {
        id: "C",
        text: "Añadir un índice secundario global sobre la columna de marca de tiempo",
        correct: false,
        explanation:
          "Haría más eficiente la consulta por marca de tiempo, reduciendo algo los picos, pero mantiene el enfoque de sondeo: los borrados seguirían sin detectarse. Además, el índice añade coste de escritura a cada operación de la tabla.",
      },
      {
        id: "D",
        text: "Activar DynamoDB Streams y consumir los cambios en lugar de consultar la tabla",
        correct: true,
        explanation:
          "El stream registra cada inserción, modificación y borrado a medida que ocurre, así que los eliminados sí se propagan. Y como se lee del registro de cambios en lugar de escanear la tabla, desaparece la competencia con el tráfico de la aplicación.",
      },
    ],
    tips: [
      "\"Los borrados no llegan al destino\" es la firma del sondeo. La respuesta es captura de cambios, no ajustar la frecuencia.",
      "Cuando un enunciado describa dos síntomas, busca la causa común: aquí los dos salen del mismo enfoque de consultar en lugar de escuchar.",
    ],
  },
  {
    id: "m2-q08",
    prompt:
      "Una empresa debe migrar una base de datos Oracle de 8 TB a Amazon Aurora PostgreSQL. La aplicación no puede detenerse más de 15 minutos y, al terminar, el equipo debe demostrar que el destino contiene exactamente los mismos datos. ¿Qué combinación cumple los tres requisitos?",
    options: [
      {
        id: "A",
        text: "AWS DMS en modo full load, y comparar los recuentos de filas al terminar",
        correct: false,
        explanation:
          "Falla en dos requisitos. Un full load sin captura de cambios obliga a detener la aplicación durante toda la copia de 8 TB, muy por encima de 15 minutos, y no convierte el esquema entre Oracle y PostgreSQL. Comparar recuentos tampoco detecta diferencias dentro de filas que sí coinciden en número.",
      },
      {
        id: "B",
        text: "Exportar la base a archivos en Amazon S3 e importarlos en el destino",
        correct: false,
        explanation:
          "El tiempo de inactividad sería el de la exportación más el de la importación de 8 TB, incompatible con los 15 minutos permitidos. Tampoco resuelve la conversión de esquema ni aporta ninguna validación.",
      },
      {
        id: "C",
        text: "AWS SCT o DMS Schema Conversion para el esquema, DMS con full load + CDC para los datos, y la validación de datos de DMS",
        correct: true,
        explanation:
          "Cubre los tres requisitos. La conversión de esquema resuelve que Oracle y PostgreSQL son motores distintos; el modo full load + CDC copia los 8 TB mientras registra los cambios que ocurren, de modo que el corte se reduce al momento de conmutar; y la validación de datos compara origen y destino fila a fila.",
      },
      {
        id: "D",
        text: "Una integración zero-ETL entre la base Oracle y Aurora PostgreSQL",
        correct: false,
        explanation:
          "Las integraciones zero-ETL replican hacia Amazon Redshift como destino analítico, no entre dos bases operativas, y no son una herramienta de migración con conversión de esquema. El escenario del enunciado es una migración, que es el caso propio de DMS.",
      },
    ],
    tips: [
      "\"Sin detener la aplicación\" o \"tiempo de inactividad mínimo\" es full load + CDC.",
      "Dos motores distintos obligan a incluir la conversión de esquema: si la opción solo dice DMS, está incompleta.",
      "\"Demostrar que los datos coinciden\" es la validación de DMS, no un script propio.",
    ],
  },
  {
    id: "m2-q09",
    prompt:
      "Una empresa necesita analizar en Amazon Redshift los datos de su base Amazon Aurora MySQL, con un retraso máximo de unos minutos. Los datos deben llegar sin modificaciones y el equipo no dispone de personal para mantener un pipeline. ¿Qué solución cumple el requisito con el menor esfuerzo operativo?",
    options: [
      {
        id: "A",
        text: "Una integración zero-ETL entre Aurora MySQL y Amazon Redshift",
        correct: true,
        explanation:
          "Es el caso exacto para el que existe: origen soportado, destino Redshift y datos sin transformar. AWS se encarga de la carga inicial, de la replicación continua y de la recuperación ante errores, así que no hay pipeline que construir ni operar, y los datos quedan disponibles casi en tiempo real.",
      },
      {
        id: "B",
        text: "AWS DMS con full load + CDC hacia Amazon Redshift",
        correct: false,
        explanation:
          "Funcionaría y daría una latencia parecida, pero exige dimensionar, vigilar y mantener una instancia de replicación. Frente a una integración que no requiere operar nada, pierde en el criterio que el enunciado señala como decisivo.",
      },
      {
        id: "C",
        text: "Consultas federadas desde Redshift hacia la base Aurora en cada consulta analítica",
        correct: false,
        explanation:
          "Evita copiar los datos, pero cada consulta analítica cargaría la base operativa, que es precisamente lo que los pipelines de datos existen para evitar. Además, el rendimiento dependería del sistema transaccional en lugar del almacén.",
      },
      {
        id: "D",
        text: "Un volcado nocturno a Amazon S3 y una carga con COPY en Redshift",
        correct: false,
        explanation:
          "Incumple el requisito de latencia: un proceso nocturno da hasta 24 horas de retraso cuando se piden minutos. Y añade dos piezas que hay que programar y vigilar, en contra del menor esfuerzo operativo.",
      },
    ],
    tips: [
      "\"Sin personal para mantener un pipeline\" con destino Redshift apunta a zero-ETL.",
      "La condición que descarta zero-ETL es transformar durante el trayecto: si hay que limpiar o unir antes de cargar, deja de ser válida.",
    ],
  },
  {
    id: "m2-q10",
    prompt:
      "Una aplicación escribe eventos en una tabla de DynamoDB. Durante los picos de tráfico recibe errores de limitación y pierde eventos. El equipo no puede predecir cuándo ocurrirán los picos y necesita no perder ningún dato. ¿Qué DOS medidas resuelven el problema? (Elige dos)",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Cambiar la tabla al modo de capacidad bajo demanda",
        correct: true,
        explanation:
          "Correcta. Con picos impredecibles, aprovisionar capacidad fija obliga a dimensionar para el peor caso y pagarlo todo el tiempo. El modo bajo demanda ajusta la capacidad automáticamente y absorbe los picos sin previsión.",
      },
      {
        id: "B",
        text: "Desacoplar la aplicación del destino mediante una cola de Amazon SQS",
        correct: true,
        explanation:
          "Correcta. Es lo que garantiza no perder datos: la aplicación escribe en la cola al ritmo que quiera y el consumidor extrae al ritmo que el destino aguanta, de modo que un pico se convierte en una espera en lugar de en eventos descartados.",
      },
      {
        id: "C",
        text: "Implementar reintentos manuales inmediatos en la aplicación",
        correct: false,
        explanation:
          "Reintentar de inmediato y a la vez desde todos los procesos produce una tormenta de reintentos que agrava la limitación. Además, los SDK de AWS ya implementan espera exponencial con jitter, así que escribirlos a mano suele empeorar el comportamiento.",
      },
      {
        id: "D",
        text: "Crear un índice secundario global sobre la tabla",
        correct: false,
        explanation:
          "Un índice sirve para consultar por atributos distintos de la clave principal y no aporta capacidad de escritura. De hecho consume capacidad adicional en cada escritura, así que empeoraría la limitación que describe el enunciado.",
      },
      {
        id: "E",
        text: "Reducir el número de atributos de cada elemento para que ocupen menos",
        correct: false,
        explanation:
          "Podría reducir marginalmente el consumo de capacidad, pero no ataca la causa: los picos seguirían superando el límite y los eventos seguirían perdiéndose. Es una optimización, no una solución.",
      },
    ],
    tips: [
      "\"Picos impredecibles\" lleva a capacidad bajo demanda; \"sin perder ningún dato\" lleva a desacoplar con una cola.",
      "Cuando la pregunta pide dos medidas, suele haber dos requisitos distintos en el enunciado: identifícalos por separado.",
    ],
  },
  {
    id: "m2-q11",
    prompt:
      "Varios proveedores depositan archivos en un bucket de Amazon S3 en momentos impredecibles a lo largo del día. Un proceso programado cada 10 minutos comprueba si hay archivos nuevos y los procesa. El equipo quiere reducir la latencia y eliminar las ejecuciones que no encuentran nada. Ocasionalmente llegan cientos de archivos a la vez, y el sistema de destino que recibe los datos procesados solo tolera un número limitado de escrituras concurrentes. ¿Qué arquitectura cumple los tres requisitos?",
    options: [
      {
        id: "A",
        text: "Reducir el intervalo del proceso programado a un minuto",
        correct: false,
        explanation:
          "Mejoraría algo la latencia, pero multiplica por diez las ejecuciones que no encuentran nada, que es exactamente lo que el enunciado pide eliminar. El sondeo no deja de ser sondeo por hacerse más a menudo.",
      },
      {
        id: "B",
        text: "Notificaciones de eventos de S3 que invocan directamente una función de Lambda por cada objeto",
        correct: false,
        explanation:
          "Resuelve los dos primeros requisitos, pero falla en el tercero: una ráfaga de cientos de archivos dispararía cientos de invocaciones simultáneas y todas escribirían a la vez en un destino que solo tolera unas pocas escrituras concurrentes. Sin nada que amortigüe entre el evento y el procesamiento, la ráfaga se traslada íntegra al destino.",
      },
      {
        id: "C",
        text: "Notificaciones de eventos de S3 hacia una cola de Amazon SQS, con una función que consume de la cola con concurrencia limitada",
        correct: true,
        explanation:
          "Cubre los tres requisitos. El evento elimina la latencia del sondeo y las ejecuciones vacías, y la cola actúa como amortiguador: los cientos de archivos esperan en ella y se procesan al ritmo que el destino aguanta, en lugar de trasladarle la ráfaga completa.",
      },
      {
        id: "D",
        text: "Un crawler de AWS Glue programado cada cinco minutos sobre el bucket",
        correct: false,
        explanation:
          "Un crawler registra esquemas y particiones en el catálogo de datos, no procesa archivos. Además, al estar programado mantiene los dos problemas que el enunciado quiere resolver: la latencia y las ejecuciones que no encuentran nada nuevo.",
      },
    ],
    tips: [
      "\"Ejecuciones que no encuentran nada\" es la señal para pasar de sondeo a evento.",
      "\"Llegan cientos a la vez\" pide una cola entre la notificación y el procesamiento.",
    ],
  },
  {
    id: "m2-q12",
    prompt:
      "Una empresa procesa transacciones desde un stream con una función que incrementa un contador de ventas por comercio en una base de datos. Tras un incidente de red, el equipo detecta que algunos comercios muestran importes superiores a los reales, aunque no se perdió ninguna transacción. ¿Cuál es la causa y cómo se corrige?",
    options: [
      {
        id: "A",
        text: "La entrega es at-least-once y la operación de incremento no es idempotente; hay que deduplicar por el identificador de la transacción",
        correct: true,
        explanation:
          "Que no falte nada y sobre apunta a duplicados, no a pérdidas. Los servicios de streaming del temario garantizan entrega al menos una vez, así que tras un incidente algunos registros se reprocesan. Incrementar un contador suma dos veces al repetirse: hay que deduplicar por identificador o usar una escritura condicional.",
      },
      {
        id: "B",
        text: "Se perdieron confirmaciones de escritura; hay que reducir el número de reintentos",
        correct: false,
        explanation:
          "Reducir los reintentos haría que empezaran a perderse transacciones, cambiando un problema recuperable por uno que no lo es. El enunciado dice expresamente que no se perdió nada, así que la configuración de reintentos está funcionando como debe.",
      },
      {
        id: "C",
        text: "El stream tiene demasiados shards y los registros llegan desordenados; hay que reducir el número de shards",
        correct: false,
        explanation:
          "El orden entre shards no está garantizado, pero eso afectaría a la secuencia de los eventos, no a que un total quede inflado. Sumar valores da el mismo resultado en cualquier orden: el problema es cuántas veces se suma, no en qué orden.",
      },
      {
        id: "D",
        text: "La función agota el tiempo de ejecución; hay que aumentar su timeout",
        correct: false,
        explanation:
          "Un agotamiento del tiempo produciría errores y reintentos visibles en los registros, y el síntoma sería procesamiento incompleto o retrasado. No explica que los importes superen a los reales cuando no falta ninguna transacción.",
      },
    ],
    tips: [
      "\"Los totales están inflados\" con una operación de incremento es idempotencia, uno de los patrones más repetidos del examen.",
      "Reducir reintentos nunca es la respuesta a los duplicados: empieza a producir pérdidas, que son peores.",
    ],
  },
  {
    id: "m2-q13",
    prompt:
      "Una empresa necesita copiar cada hora los registros nuevos y modificados de su CRM comercial a Amazon S3, aplicando un filtro por región y enmascarando el número de teléfono de los clientes. El equipo no dispone de desarrolladores para mantener una integración. ¿Qué solución cumple el requisito con el menor esfuerzo de desarrollo?",
    options: [
      {
        id: "A",
        text: "Una función de Lambda programada que llame a la API del CRM y escriba en S3",
        correct: false,
        explanation:
          "Funciona, pero implica escribir y mantener la autenticación, la paginación, el control de los límites de tasa, la detección de cambios y los reintentos, además del filtrado y el enmascarado. Es exactamente el trabajo que el enunciado dice que no se puede asumir.",
      },
      {
        id: "B",
        text: "Un flujo de Amazon AppFlow programado cada hora, con filtro por región y enmascarado del teléfono",
        correct: true,
        explanation:
          "AppFlow tiene conectores ya construidos para las aplicaciones SaaS habituales y resuelve por configuración la autenticación, la paginación y los reintentos. El filtrado y el enmascarado forman parte del propio flujo, así que no hace falta ningún proceso adicional ni escribir código.",
      },
      {
        id: "C",
        text: "AWS DMS con el CRM como endpoint de origen",
        correct: false,
        explanation:
          "DMS trabaja con bases de datos leyendo su registro de transacciones, no con las APIs de aplicaciones SaaS. Un CRM comercial no se expone como un endpoint de base de datos compatible, así que la opción no es viable.",
      },
      {
        id: "D",
        text: "Un flujo de AppFlow hacia S3 y un job posterior de AWS Glue que filtre y enmascare",
        correct: false,
        explanation:
          "Llegaría al mismo resultado, pero añade un job que hay que construir, programar y mantener para hacer algo que AppFlow ya ofrece dentro del propio flujo. Frente a la opción que resuelve todo en un paso, es innecesariamente compleja.",
      },
    ],
    tips: [
      "\"Sin desarrolladores\" con un origen SaaS es AppFlow. Proponer Lambda contra la API es el distractor de más esfuerzo.",
      "El filtrado y el enmascarado están dentro de AppFlow: una opción que añada un proceso posterior para eso sobra.",
    ],
  },
  {
    id: "m2-q14",
    prompt:
      "Una empresa carga cada noche 500 GB de archivos CSV en Amazon Redshift mediante un proceso que ejecuta sentencias INSERT en bucle. La carga tarda más de ocho horas y no termina antes de que empiece la jornada laboral. ¿Qué cambio ofrece la mayor mejora?",
    options: [
      {
        id: "A",
        text: "Aumentar el número de nodos del clúster de Redshift",
        correct: false,
        explanation:
          "Un clúster mayor seguiría ejecutando las mismas escrituras fila a fila, cada una con la sobrecarga de su transacción. La mejora sería marginal frente al aumento de coste, porque el cuello de botella no es la capacidad de cómputo sino la forma de escribir.",
      },
      {
        id: "B",
        text: "Comprimir los archivos CSV con gzip antes de cargarlos",
        correct: false,
        explanation:
          "Reduciría el tiempo de transferencia, pero no toca la causa: las sentencias INSERT en bucle seguirían siendo el cuello de botella. Además, un archivo grande con gzip no se puede dividir, lo que impediría después cargarlo en paralelo.",
      },
      {
        id: "C",
        text: "Ejecutar los INSERT en varias conexiones simultáneas",
        correct: false,
        explanation:
          "Añadir concurrencia sobre el mismo patrón de escritura genera contención y bloqueos, y sigue produciendo escrituras diminutas que fragmentan la tabla. Es una mejora superficial sobre un enfoque que está equivocado de raíz.",
      },
      {
        id: "D",
        text: "Sustituir los INSERT por el comando COPY desde Amazon S3, con los datos repartidos en varios archivos",
        correct: true,
        explanation:
          "COPY carga en paralelo repartiendo el trabajo entre todas las unidades de proceso del clúster, que es para lo que está diseñado un almacén columnar. Repartir los datos en varios archivos permite que todas trabajen a la vez, en lugar de escribir fila a fila con la sobrecarga de una transacción por cada una.",
      },
    ],
    tips: [
      "Si el enunciado menciona INSERT masivos sobre Redshift, la respuesta casi siempre es COPY. Agrandar el clúster es el distractor caro.",
      "Repartir los datos en varios archivos forma parte de la respuesta: un solo archivo impide la carga paralela.",
    ],
  },
  {
    id: "m2-q15",
    prompt:
      "Una empresa publica eventos de pedidos que consumen tres equipos: facturación, análisis y notificaciones. Hoy, el equipo de facturación lee los eventos y los reenvía a los otros dos. Cuando el procesamiento de facturación se retrasa, los otros dos equipos dejan de recibir datos. Se quiere añadir un cuarto consumidor sin modificar nada de lo existente. ¿Qué arquitectura lo resuelve?",
    options: [
      {
        id: "A",
        text: "Aumentar los recursos del consumidor de facturación para que no se retrase",
        correct: false,
        explanation:
          "Aliviaría el síntoma actual, pero mantiene la dependencia: los otros equipos siguen recibiendo los datos a través de facturación, y añadir un cuarto consumidor seguiría obligando a modificar ese componente.",
      },
      {
        id: "B",
        text: "Publicar los eventos en un topic de Amazon SNS con una cola de SQS suscrita por cada consumidor",
        correct: true,
        explanation:
          "El topic entrega una copia de cada mensaje a todas las colas suscritas, así que cada equipo procesa a su ritmo con sus propios reintentos y su propia cola de fallidos. Un consumidor lento no afecta a los demás, y añadir un cuarto es suscribir una cola más sin tocar nada.",
      },
      {
        id: "C",
        text: "Hacer que los tres equipos lean de la misma cola de SQS",
        correct: false,
        explanation:
          "En una única cola cada mensaje lo procesa un solo consumidor, así que los equipos se repartirían los eventos en lugar de recibir todos una copia. Cada uno vería aproximadamente un tercio de los pedidos, que no es lo que necesitan.",
      },
      {
        id: "D",
        text: "Guardar los eventos en Amazon S3 y que cada equipo los consulte cuando los necesite",
        correct: false,
        explanation:
          "Desacopla, pero convierte un flujo de eventos en consultas periódicas sobre archivos, con la latencia y las ejecuciones vacías del sondeo. El enunciado describe un problema de reparto de eventos, no de almacenamiento.",
      },
    ],
    tips: [
      "\"Sin modificar los consumidores existentes\" pide que el fan-out lo haga el sistema, no un consumidor que reparta.",
      "Cuidado con la diferencia entre un topic con varias colas suscritas —cada consumidor recibe una copia— y una sola cola con varios consumidores, donde se reparten los mensajes.",
    ],
  },
  {
    id: "m2-q16",
    prompt:
      "Una empresa necesita entregar eventos de clickstream a Amazon S3 en formato Parquet con la menor administración posible. Además, un equipo de ciencia de datos que se incorporará dentro de seis meses necesitará reprocesar los eventos de los últimos 30 días. ¿Qué arquitectura de ingesta cumple ambos requisitos?",
    options: [
      {
        id: "A",
        text: "Kinesis Data Firehose con conversión de formato, directamente desde la aplicación",
        correct: false,
        explanation:
          "Cumple el primer requisito de forma óptima, pero falla en el segundo: Firehose entrega y no retiene, así que no hay forma de reprocesar los eventos desde el servicio de ingesta. El equipo futuro solo podría trabajar con lo que ya esté en S3.",
      },
      {
        id: "B",
        text: "Una función de Lambda que reciba los eventos y escriba archivos Parquet en S3",
        correct: false,
        explanation:
          "Exige escribir y mantener el código de conversión y de escritura, en contra del requisito de mínima administración, y tampoco retiene nada: los eventos no reprocesados se perderían. Además, escribir por evento produciría multitud de archivos diminutos.",
      },
      {
        id: "C",
        text: "Kinesis Data Streams con retención de 30 días, y Firehose como consumidor entregando a S3 en Parquet",
        correct: true,
        explanation:
          "Combina lo mejor de los dos. El stream retiene los eventos 30 días, lo que permite que un consumidor nuevo los relea más adelante, y Firehose los entrega a S3 con conversión a Parquet sin escribir código ni administrar nada. Es el patrón habitual cuando se piden a la vez bajo esfuerzo y capacidad de reproceso.",
      },
      {
        id: "D",
        text: "Amazon MSK con retención de 30 días y un consumidor propio que escriba en S3",
        correct: false,
        explanation:
          "Cubriría la retención, pero es la opción de mayor esfuerzo: hay que operar el clúster y escribir el consumidor que convierte a Parquet. Cuando el enunciado no menciona Kafka ni portabilidad y pide mínima administración, MSK con consumidor propio pierde.",
      },
    ],
    tips: [
      "Cuando el enunciado pida a la vez mínimo esfuerzo y capacidad de reproceso, la respuesta suele encadenar Data Streams con Firehose en lugar de elegir uno.",
      "Un consumidor que llegará en el futuro y necesita el histórico es la señal más fiable de que hace falta retención.",
      "Con esto terminas el repaso del Módulo 2. Si fallaste varias del mismo tema, vuelve a esa lección antes de seguir: el dominio 1 continúa en el Módulo 3.",
    ],
  },
];
