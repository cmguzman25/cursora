import type { ExamQuestionWithTopic } from "../../../types";

/**
 * Tema 1 en español: ingesta en streaming con Kinesis Data Streams y Amazon MSK.
 *
 * Traducción de `../en/tema-1-streaming-kinesis-msk.ts`, estrictamente paralela:
 * mismos ids, mismo orden, mismos ids de opción y mismas correctas. El verificador lo
 * comprueba, porque la app califica siempre en español mientras el alumno puede estar
 * leyendo en inglés.
 *
 * Criterio de traducción, el mismo en los cinco temas: los nombres de servicio, de API,
 * de error y de parámetro quedan en inglés, porque es como aparecen en la consola y en
 * el examen real. Se traduce la prosa. "shard" se mantiene como préstamo por el mismo
 * motivo, y "enhanced fan-out" también, que es el nombre de la función.
 */
export const TEMA_1_STREAMING: ExamQuestionWithTopic[] = [
  {
    id: "dea-t1-q01",
    topic: "streaming-kinesis-msk",
    prompt:
      "Una empresa de viajes compartidos envía telemetría de vehículos a un data stream de Amazon Kinesis que tiene 20 shards. Cada registro usa la ciudad del vehículo como clave de partición. Dos ciudades concentran la mayor parte de los viajes, y los productores de esas dos ciudades reciben errores ProvisionedThroughputExceededException con frecuencia, mientras la utilización general del stream se mantiene cerca del 15 por ciento. ¿Cuál es la causa MÁS probable de los errores?",
    options: [
      {
        id: "A",
        text: "El stream está en modo de capacidad on-demand y todavía no terminó de duplicar su capacidad para el volumen de escritura actual.",
        correct: false,
        explanation:
          "Tienta porque un stream on-demand lanza exactamente esta excepción mientras se pone al día con un salto repentino de tráfico, y es una trampa conocida. Pero el escenario dice que el stream tiene 20 shards, que es un dato del modo provisionado, y un problema de calentamiento afectaría a todos los productores en lugar de solo a los de las dos ciudades más activas.",
      },
      {
        id: "B",
        text: "La clave de partición tiene muy pocos valores distintos, así que las escrituras se concentran en unos pocos shards.",
        correct: true,
        explanation:
          "Correcta. Kinesis aplica un hash a la clave de partición para elegir el shard, así que una clave con un puñado de valores solo puede alcanzar un puñado de shards por más que existan veinte. Los dos datos que lo delatan son que los errores siguen a productores concretos y que la utilización del stream es baja: la capacidad existe, pero las ciudades más activas no pueden llegar a ella.",
      },
      {
        id: "C",
        text: "Los productores superan el límite de 1.000 registros por segundo que se aplica al stream en su conjunto.",
        correct: false,
        explanation:
          "El número es real y el alcance está mal, y esa es la confusión que vale nombrar: 1 MB por segundo y 1.000 registros por segundo son límites por shard, así que un stream de 20 shards admite 20.000 registros por segundo en total. Leer la cuota como si fuera del stream completo también vuelve imposible el dato de la utilización baja, en lugar de diagnóstico.",
      },
      {
        id: "D",
        text: "Los registros superan el tamaño máximo de 1 MB por registro, así que el servicio los rechaza.",
        correct: false,
        explanation:
          "Los registros demasiado grandes sí se rechazan, pero el error es otro y el patrón también sería otro: un registro entra o no entra nunca, así que las fallas serían constantes en lugar de concentrarse en los picos, y no tendrían relación con qué ciudad las envió.",
      },
    ],
    tips: [
      "Un throttling que sigue a productores concretos apunta a la distribución de la clave; uno que sigue al volumen total apunta a la capacidad.",
      "Las cuotas de escritura de Kinesis, 1 MB por segundo y 1.000 registros por segundo, son por shard y no por stream.",
      "La utilización a nivel de stream puede verse baja mientras un shard está saturado, así que mirá las métricas por shard antes de agregar shards.",
    ],
  },
  {
    id: "dea-t1-q02",
    topic: "streaming-kinesis-msk",
    prompt:
      "Un equipo de ingeniería de datos necesita poder reconstruir una tabla analítica reprocesando todos los eventos que un data stream de Kinesis recibió en los 30 días anteriores. El stream usa hoy la configuración por defecto. ¿Qué cambio hace posible ese reprocesamiento?",
    options: [
      {
        id: "A",
        text: "Aumentar el período de retención de datos del stream a 30 días o más.",
        correct: true,
        explanation:
          "Correcta. Un stream guarda los registros 24 horas por defecto, así que un replay de 30 días es imposible hasta extender la retención; el servicio admite hasta 365 días. La retención es el único parámetro que decide desde cuán atrás puede arrancar un consumidor nuevo.",
      },
      {
        id: "B",
        text: "Habilitar enhanced fan-out para la aplicación que hace el reprocesamiento.",
        correct: false,
        explanation:
          "Enhanced fan-out es una función de caudal de lectura y de latencia: le da al consumidor sus propios 2 MB por segundo por shard. Hace que un replay corra más rápido, pero no puede hacer que exista un registro que la retención ya descartó, y esa es la distinción que evalúa la pregunta.",
      },
      {
        id: "C",
        text: "Pasar el stream a modo de capacidad on-demand para que los registros se conserven hasta que un consumidor los lea.",
        correct: false,
        explanation:
          "Esto importa la semántica de una cola a un servicio de streaming. En Amazon SQS un mensaje sí sobrevive hasta que se consume y se borra, pero un registro de Kinesis expira por reloj, lo haya leído alguien o no, y el modo de capacidad solo cambia cómo se provisiona la capacidad de escritura.",
      },
      {
        id: "D",
        text: "Configurar el consumidor para que guarde su posición en una tabla de Amazon DynamoDB y así pueda reiniciar desde un punto anterior del stream.",
        correct: false,
        explanation:
          "El distractor más fuerte, porque la Kinesis Client Library hace exactamente eso: guarda checkpoints en DynamoDB y sí puede reiniciar desde un número de secuencia más viejo. Lo que no puede es reiniciar desde antes del horizonte de retención: llevar la cuenta de una posición solo sirve dentro de la ventana que la retención mantiene abierta.",
      },
    ],
    tips: [
      "Kinesis Data Streams retiene los registros 24 horas por defecto y se puede extender hasta 365 días.",
      "Cuán atrás se puede reproducir es una decisión de retención; dónde retoma un consumidor es una decisión de checkpoint.",
      "Los registros de Kinesis expiran por reloj: a diferencia de una cola, leerlos no los borra y no leerlos no los conserva.",
    ],
  },
  {
    id: "dea-t1-q03",
    topic: "streaming-kinesis-msk",
    prompt:
      "Tres aplicaciones independientes leen el mismo data stream de Kinesis. Cada una necesita el caudal completo de todos los shards, y el negocio exige que un registro nuevo llegue a cada aplicación en unos 70 milisegundos. Hoy las aplicaciones comparten capacidad de lectura y observan alrededor de un segundo de retardo de propagación. ¿Qué solución cumple los requisitos de latencia y caudal?",
    options: [
      {
        id: "A",
        text: "Triplicar la cantidad de shards para que el stream tenga capacidad de lectura total suficiente para las tres aplicaciones.",
        correct: false,
        explanation:
          "Agregar shards sube la capacidad total del stream, y por eso parece el arreglo de uso general. No cambia que los consumidores de caudal compartido se reparten entre sí los 2 MB por segundo de un shard, y un consumidor que hace polling no se acerca a los 70 milisegundos por más shards que existan.",
      },
      {
        id: "B",
        text: "Que una aplicación lea el stream y republique cada registro en dos colas de Amazon SQS que las otras dos consulten.",
        correct: false,
        explanation:
          "Es un patrón de distribución real, y de ahí viene su atractivo. Cuesta un salto extra de latencia, convierte al repetidor en un punto único de falla, y las colas estándar de SQS pierden el orden por shard que el stream ofrecía, así que entrega menos de lo que resuelve.",
      },
      {
        id: "C",
        text: "Registrar cada aplicación como consumidor con enhanced fan-out.",
        correct: true,
        explanation:
          "Correcta. Enhanced fan-out le da a cada consumidor registrado 2 MB por segundo dedicados por shard, así que las aplicaciones dejan de competir, y empuja los registros por HTTP/2 con unos 70 milisegundos de retardo de propagación en lugar de esperar un ciclo de polling.",
      },
      {
        id: "D",
        text: "Aumentar la frecuencia con la que cada aplicación llama a GetRecords para recuperar los registros en cuanto llegan.",
        correct: false,
        explanation:
          "Hacer polling más seguido es la respuesta instintiva a un problema de latencia, pero GetRecords tiene un tope de cinco llamadas por segundo por shard entre todos los consumidores de caudal compartido. Tres aplicaciones consultando con insistencia llegan a ese techo y empiezan a hacerse throttling entre ellas, así que el retardo empeora.",
      },
    ],
    tips: [
      "Enhanced fan-out compra dos cosas distintas: 2 MB por segundo dedicados por shard, y unos 70 ms de latencia de empuje.",
      "Los consumidores de caudal compartido se reparten 1 MB por segundo de lectura por shard y comparten un tope de cinco llamadas a GetRecords por segundo.",
      "Agregar shards escala la capacidad total del stream, nunca la porción que un consumidor obtiene de un shard.",
    ],
  },
  {
    id: "dea-t1-q04",
    topic: "streaming-kinesis-msk",
    prompt:
      "Un sistema de gestión de pedidos publica eventos de creación, actualización y cancelación en un data stream de Kinesis de 12 shards. Los eventos que pertenecen al mismo pedido deben procesarse en la secuencia en que se produjeron, mientras que los de pedidos distintos pueden procesarse en cualquier secuencia. ¿Cómo se cumple el requisito de orden?",
    options: [
      {
        id: "A",
        text: "Reducir el stream a un solo shard para que todos los eventos pasen por una única secuencia global de números de secuencia.",
        correct: false,
        explanation:
          "Esto sí entrega orden, y justamente por eso atrae, pero entrega una garantía más fuerte que la pedida y se la cobra a todo el sistema: un shard limita el stream a 1 MB por segundo y a un consumidor. El orden global es la herramienta equivocada cuando solo se pidió orden por pedido.",
      },
      {
        id: "B",
        text: "Habilitar enhanced fan-out para que el consumidor reciba los registros en la secuencia en que Kinesis los almacenó.",
        correct: false,
        explanation:
          "Enhanced fan-out cambia con cuánta velocidad y cuán pronto se entregan los registros, nunca su disposición. Los registros ya llegan en secuencia dentro de un shard para cualquier tipo de consumidor, así que esta opción promete algo que el servicio ya hace y deja los eventos de un pedido repartidos en 12 shards.",
      },
      {
        id: "C",
        text: "Ordenar los registros de cada lote por su ApproximateArrivalTimestamp antes de que el consumidor los aplique.",
        correct: false,
        explanation:
          "Ordenar parece un arreglo barato y suele ser la primera idea. La marca de tiempo es aproximada y no es única, y sobre todo los eventos de un pedido están en shards distintos leídos por workers distintos, así que ningún lote contiene nunca la secuencia completa para ordenar.",
      },
      {
        id: "D",
        text: "Usar el id de pedido como clave de partición para que todos los eventos de un pedido caigan en el mismo shard.",
        correct: true,
        explanation:
          "Correcta. Kinesis garantiza el orden dentro de un shard, y la clave de partición decide el shard, así que usar el id de pedido pone los eventos de un pedido en una única secuencia ordenada mientras los distintos pedidos siguen repartiéndose entre los 12 shards. El requisito y la elección de clave coinciden exactamente.",
      },
    ],
    tips: [
      "Kinesis preserva el orden solo dentro de un shard, lo que vuelve el orden por entidad una decisión de clave de partición.",
      "Elegí una clave de partición con suficientes valores distintos para repartir la carga, pero lo bastante estable para mantener juntos los registros relacionados.",
      "Cuando el requisito pide orden por clave, el orden global es un sobreprecio y no una respuesta más segura.",
    ],
  },
  {
    id: "dea-t1-q05",
    topic: "streaming-kinesis-msk",
    prompt:
      "La carga de ingesta de una empresa de medios está casi inactiva la mayor parte de la semana y después trepa unas 30 veces a medida que la audiencia crece durante la media hora previa a cada transmisión en vivo. Las transmisiones se anuncian con pocas horas de aviso. El equipo no quiere vigilar cantidades de shards ni mantener scripts de resharding, y quiere pagar solo por el tráfico que realmente envía. ¿Qué configuración de capacidad corresponde a este patrón?",
    options: [
      {
        id: "A",
        text: "Modo de capacidad on-demand.",
        correct: true,
        explanation:
          "Correcta. El modo on-demand administra la capacidad de escritura por el equipo y cobra por GB ingresado más un cargo por hora de stream, así que una semana inactiva cuesta casi nada y una transmisión escala sin que nadie reciba una alerta. Es el modo diseñado para tráfico que no se puede pronosticar.",
      },
      {
        id: "B",
        text: "Modo de capacidad provisionado, con la cantidad de shards fijada en el volumen observado durante la transmisión más grande.",
        correct: false,
        explanation:
          "Es la respuesta prudente de ingeniería y sí evita el throttling, y por eso es la incorrecta más elegida. También factura shards de pico cada hora de la semana inactiva, lo que contradice directamente el requisito de pagar solo por el tráfico realmente enviado.",
      },
      {
        id: "C",
        text: "Modo de capacidad provisionado, con una función de AWS Lambda que hace resharding cuando se disparan alarmas de Amazon CloudWatch.",
        correct: false,
        explanation:
          "Era el patrón estándar antes de que existiera el modo on-demand, así que todavía aparece en material viejo y en las costumbres de los equipos. Es exactamente la maquinaria de resharding que el equipo dijo que no quiere mantener, y reacciona después de la alarma en lugar de antes de la transmisión.",
      },
      {
        id: "D",
        text: "Modo de capacidad provisionado, con enhanced fan-out habilitado para que los consumidores absorban los picos de las transmisiones.",
        correct: false,
        explanation:
          "Esto confunde los dos lados del stream. Enhanced fan-out escala la lectura, y el problema descrito está en la escritura: productores que envían 30 veces más datos. Ningún parámetro del lado de lectura crea capacidad de escritura.",
      },
    ],
    tips: [
      "El modo on-demand sirve para tráfico impredecible y cobra por GB más un cargo por hora de stream, en lugar de por hora de shard.",
      "El modo on-demand escala hasta el doble del pico de los últimos 30 días, así que un salto instantáneo puede hacer throttling un rato igual.",
      "El modo de capacidad gobierna la escritura; enhanced fan-out gobierna la lectura. Decidí primero cuál de los dos lados está saturado.",
    ],
  },
  {
    id: "dea-t1-q06",
    topic: "streaming-kinesis-msk",
    prompt:
      "Una flota de sensores emite una lectura de 200 bytes por segundo por dispositivo hacia un data stream de Kinesis. El volumen es moderado, 40 MB por segundo, y sin embargo el stream hace throttling por cantidad de registros mucho antes de acercarse a su límite de bytes, y las unidades de payload de PUT dominan la factura mensual. ¿Qué cambio resuelve el throttling y el costo a la vez?",
    options: [
      {
        id: "A",
        text: "Pasar el stream a modo de capacidad on-demand para que el límite de registros por segundo deje de aplicarse a los productores.",
        correct: false,
        explanation:
          "El modo on-demand quita la necesidad de dimensionar shards, pero no quita los límites por shard: el techo de registros por segundo sigue existiendo detrás de escena, y cada lectura de 200 bytes sigue consumiendo una unidad de payload de PUT completa. La opción resuelve la tarea de dimensionar, no los dos problemas que se preguntaron.",
      },
      {
        id: "B",
        text: "Usar la Kinesis Producer Library para agregar muchas lecturas en cada registro de Kinesis, y desagregarlas con la Kinesis Client Library.",
        correct: true,
        explanation:
          "Correcta. La agregación empaqueta muchas lecturas de la aplicación en un registro de Kinesis, así que miles de lecturas consumen un lugar de registro y una unidad de payload en lugar de miles. Los dos síntomas tienen la misma causa de fondo, registros mucho más chicos que la unidad de facturación de 25 KB, y la agregación es la función que apunta ahí.",
      },
      {
        id: "C",
        text: "Usar la API PutRecords para enviar las lecturas al stream en lotes de hasta 500 en vez de llamar a PutRecord una vez por lectura.",
        correct: false,
        explanation:
          "La incorrecta más instructiva, porque agrupar y agregar se confunden todo el tiempo. PutRecords es agrupación: reduce la cantidad de peticiones HTTP, pero cada una de las 500 entradas sigue contando por separado contra el límite de registros por segundo y se sigue facturando como su propia unidad de payload, así que ninguno de los dos síntomas mejora.",
      },
      {
        id: "D",
        text: "Comprimir cada lectura con gzip antes de llamar a PutRecord para consumir menos unidades de payload de PUT por lectura.",
        correct: false,
        explanation:
          "La compresión ataca los bytes, y los bytes nunca fueron la restricción acá. Un payload de 200 bytes casi no se comprime, y aun un registro vacío consume una unidad de payload de 25 KB, así que la factura no se mueve y la cantidad de registros no cambia en absoluto.",
      },
    ],
    tips: [
      "Agrupar con PutRecords reduce las llamadas a la API; agregar con la KPL reduce la cantidad de registros de Kinesis.",
      "Una unidad de payload de PUT se factura en tramos de 25 KB, así que un registro mucho más chico desperdicia la mayor parte de lo que se paga.",
      "Los límites por shard son 1.000 registros por segundo y 1 MB por segundo; el primero que se alcance es el que hace throttling.",
    ],
  },
  {
    id: "dea-t1-q07",
    topic: "streaming-kinesis-msk",
    prompt:
      "Una empresa opera un cluster provisionado de Amazon MSK con brokers repartidos en tres zonas de disponibilidad. Un topic no debe perder nunca un mensaje que ya fue confirmado al productor, y debe seguir aceptando escrituras si una zona de disponibilidad queda inalcanzable. ¿Qué combinación de parámetros de topic y de productor cumple las dos condiciones?",
    options: [
      {
        id: "A",
        text: "replication.factor = 3, min.insync.replicas = 3, productor con acks = all",
        correct: false,
        explanation:
          "La trampa clásica, y la que más se elige porque parece lo máximo en seguridad. Es durable, pero exigir que las tres réplicas estén sincronizadas significa que perder una zona de disponibilidad deja dos réplicas y detiene las escrituras por completo, lo que rompe la mitad de disponibilidad del requisito.",
      },
      {
        id: "B",
        text: "replication.factor = 3, min.insync.replicas = 1, productor con acks = all",
        correct: false,
        explanation:
          "Parece durable porque acks está en all, y ahí vive la confusión: acks = all significa todas las réplicas que estén sincronizadas en ese momento, y min.insync.replicas = 1 permite que ese conjunto sea solo el líder. Un mensaje puede quedar confirmado por un único broker y perderse cuando ese broker falla.",
      },
      {
        id: "C",
        text: "replication.factor = 3, min.insync.replicas = 2, productor con acks = all",
        correct: true,
        explanation:
          "Correcta. Tres réplicas en tres zonas de disponibilidad con un quórum de dos significa que toda escritura confirmada existe en al menos dos brokers de dos zonas, así que perder una zona no pierde ningún dato confirmado y todavía deja dos réplicas sincronizadas, que alcanzan para seguir aceptando escrituras.",
      },
      {
        id: "D",
        text: "replication.factor = 2, min.insync.replicas = 2, productor con acks = 1 y confirmación solo del líder",
        correct: false,
        explanation:
          "Acá se suman dos problemas. Con acks = 1 al productor se le dice que la escritura salió bien en cuanto la tiene el líder, así que min.insync.replicas nunca se consulta, y con solo dos réplicas la pérdida de una zona ya deja el conjunto sincronizado por debajo del mínimo configurado.",
      },
    ],
    tips: [
      "Factor de replicación 3 con min.insync.replicas 2 y acks = all es la configuración estándar que sobrevive la pérdida de un broker o una zona sin dejar de aceptar escrituras.",
      "min.insync.replicas solo tiene efecto cuando los productores usan acks = all; con acks = 1 nunca se evalúa.",
      "Poner min.insync.replicas igual al factor de replicación cambia disponibilidad por nada de durabilidad extra.",
    ],
  },
  {
    id: "dea-t1-q08",
    topic: "streaming-kinesis-msk",
    prompt:
      "Un equipo quiere llevar los eventos de cambio de una base de datos PostgreSQL autoadministrada hacia topics de Amazon MSK usando el conector de origen Debezium, que ya configuró y probó en una laptop. El equipo no está dispuesto a aprovisionar, escalar ni parchear los nodos worker sobre los que normalmente corre Kafka Connect. ¿Cómo debería desplegarse el conector?",
    options: [
      {
        id: "A",
        text: "Empaquetar la lógica del conector como una función de AWS Lambda e invocarla con una programación de Amazon EventBridge.",
        correct: false,
        explanation:
          "Lambda es la respuesta reflejo en cuanto un requisito dice serverless, y ese reflejo es lo que esta opción aprovecha. Un conector de Kafka Connect es un plugin del runtime de Connect, no un handler de Lambda, y un sondeo programado no es captura de cambios: se perdería los borrados y los estados intermedios entre invocaciones.",
      },
      {
        id: "B",
        text: "Correr Kafka Connect en modo distribuido sobre un grupo de Auto Scaling de Amazon EC2 detrás de un Network Load Balancer.",
        correct: false,
        explanation:
          "Es la forma clásica de desplegar Connect, así que se lee como la respuesta experta. También es exactamente la flota de workers que el equipo se negó a tener: el grupo de Auto Scaling sigue necesitando AMIs, parches y decisiones de capacidad.",
      },
      {
        id: "C",
        text: "Usar AWS Database Migration Service con el cluster de MSK configurado como endpoint de destino.",
        correct: false,
        explanation:
          "El distractor más fuerte, porque DMS realmente puede capturar cambios de PostgreSQL hacia Kafka y realmente es administrado. Lo que no hace es ejecutar conectores de Kafka Connect, así que tira a la basura la configuración de Debezium que el equipo ya validó y cambia el formato de los mensajes contra el que se construyeron los consumidores.",
      },
      {
        id: "D",
        text: "Usar MSK Connect con el conector Debezium subido como plugin personalizado.",
        correct: true,
        explanation:
          "Correcta. MSK Connect es Kafka Connect administrado: el equipo sube el plugin de Debezium, aporta la configuración del conector que ya probó, y AWS corre y escala los workers. El trabajo existente se traslada sin cambios, que es lo que el escenario protege.",
      },
    ],
    tips: [
      "Cuando un escenario nombra un conector de Kafka Connect que ya existe, el camino administrado es MSK Connect y no reescribirlo sobre otro servicio.",
      "DMS y MSK Connect pueden los dos capturar cambios de una base de datos hacia Kafka, pero solo MSK Connect ejecuta plugins de Kafka Connect.",
      "Un sondeo programado no es captura de cambios: no puede ver las filas que se crearon y se borraron entre dos corridas.",
    ],
  },
  {
    id: "dea-t1-q09",
    topic: "streaming-kinesis-msk",
    prompt:
      "Una startup está levantando su primera carga de trabajo con Kafka. Se espera que el tráfico oscile de forma impredecible entre casi nada y unos 100 MB por segundo. El equipo de cuatro personas necesita compatibilidad con la API de Kafka para sus librerías cliente existentes, pero no tiene experiencia operando Kafka y quiere evitar dimensionar brokers o rebalancear particiones. ¿Qué opción debería elegir?",
    options: [
      {
        id: "A",
        text: "Amazon MSK Serverless.",
        correct: true,
        explanation:
          "Correcta. MSK Serverless habla la API de Kafka, así que el código cliente se traslada una vez configurado para autenticación IAM, que es el único mecanismo que ofrece. Elimina justamente las dos tareas que el equipo nombró: no hay brokers que dimensionar ni rebalanceo de particiones que ejecutar, y la facturación es por hora de cluster, hora de partición y tráfico.",
      },
      {
        id: "B",
        text: "Amazon MSK provisionado, con brokers dimensionados para el pico esperado y Cruise Control desplegado para rebalancear particiones.",
        correct: false,
        explanation:
          "Una arquitectura de producción legítima, y por eso resulta tentadora para un equipo que quiere hacer las cosas bien. Las dos mitades son el trabajo que el equipo excluyó: dimensionar brokers para el pico y operar una herramienta de rebalanceo son exactamente las habilidades de operación de Kafka que no tiene.",
      },
      {
        id: "C",
        text: "Amazon MSK provisionado con el escalado automático de almacenamiento habilitado para que el cluster se adapte a la carga variable.",
        correct: false,
        explanation:
          "La trampa de la automatización parcial. El escalado automático de almacenamiento es real y útil, pero solo hace crecer los discos de los brokers cuando se llenan; el tipo de instancia, la cantidad de brokers y la colocación de particiones siguen eligiéndose y revisándose a mano.",
      },
      {
        id: "D",
        text: "Un cluster de Apache Kafka autoadministrado sobre Amazon EC2, con los tipos de instancia elegidos según la guía de dimensionamiento de Apache Kafka.",
        correct: false,
        explanation:
          "Control máximo, y la única opción que garantiza que el equipo se queda con todas las tareas operativas que dijo que no puede cubrir: aprovisionar brokers, parchearlos, administrar ZooKeeper o KRaft, y planificar capacidad.",
      },
    ],
    tips: [
      "MSK Serverless elimina el dimensionamiento de brokers y el rebalanceo de particiones; MSK provisionado deja las dos cosas como tu trabajo.",
      "El escalado automático de almacenamiento de MSK provisionado hace crecer discos y nada más. La capacidad de cómputo se sigue dimensionando a mano.",
      "MSK Serverless tiene sus propias cuotas, incluido el caudal por partición, así que compará el pico esperado contra ellas antes de decidir.",
    ],
  },
  {
    id: "dea-t1-q10",
    topic: "streaming-kinesis-msk",
    prompt:
      "Miles de clientes móviles envían eventos a través de una capa de API que llama a PutRecord una vez por evento contra un data stream de Kinesis. Durante los picos breves de tráfico, una fracción pequeña de esas llamadas falla con errores de throttling, y el equipo de la aplicación móvil reporta que los eventos correspondientes nunca aparecen aguas abajo. La cantidad de shards ya cubre el volumen de bytes del pico. ¿Qué cambio hace que la ingesta tolere estos episodios breves?",
    options: [
      {
        id: "A",
        text: "Reemplazar el stream por una cola estándar de Amazon SQS, que absorbe el pico porque no tiene un límite de escritura por shard.",
        correct: false,
        explanation:
          "Cambiar de servicio sí esquiva los límites por shard, y eso lo hace leer como el arreglo decisivo. También descarta el replay y el orden por clave, y trata un bug de reintentos ausentes como un problema de arquitectura: el mismo código llamando a SQS sin reintentos también perdería mensajes ante un error de SQS.",
      },
      {
        id: "B",
        text: "Usar la Kinesis Producer Library, que almacena los registros en buffer y reintenta las escrituras con throttling usando retroceso exponencial.",
        correct: true,
        explanation:
          "Correcta. Los eventos se pierden porque un PutRecord con throttling es una escritura rechazada y nada la reintentó. La KPL agrega el buffer y el reintento con retroceso que a un productor artesanal de un registro por llamada le faltan, así que unos segundos de throttling se vuelven unos segundos de latencia extra en lugar de pérdida de datos.",
      },
      {
        id: "C",
        text: "Aumentar el período de retención de datos del stream para que los registros con throttling se guarden hasta que se libere capacidad de escritura.",
        correct: false,
        explanation:
          "Esto lee mal dónde se aplica la retención. La retención gobierna cuánto tiempo siguen legibles los registros que fueron aceptados; un registro con throttling nunca fue aceptado, así que no hay nada en el stream que una retención más larga pueda conservar.",
      },
      {
        id: "D",
        text: "Habilitar enhanced fan-out para que los consumidores vacíen los shards más rápido y alivien la presión sobre los productores.",
        correct: false,
        explanation:
          "Esto traslada una intuición de colas a Kinesis: en una cola, consumir más rápido libera espacio para los productores. Un shard de Kinesis tiene una tasa limitada en lugar de ser un buffer finito, así que la velocidad de lectura no tiene ningún efecto sobre si una escritura recibe throttling.",
      },
    ],
    tips: [
      "Un PutRecord con throttling es una escritura rechazada. Si el productor no la reintenta, el evento se perdió.",
      "La Kinesis Producer Library agrega buffer, agregación y reintento con retroceso que los productores escritos a mano suelen omitir.",
      "En Kinesis, leer no libera capacidad de escritura: los shards tienen una tasa limitada, no son un buffer que se vacía.",
    ],
  },
  {
    id: "dea-t1-q11",
    topic: "streaming-kinesis-msk",
    prompt:
      "Mientras una aplicación de la Kinesis Client Library consume un stream, un ingeniero de datos divide un shard saturado en dos shards hijos. Ningún registro escrito antes de la división puede perderse. ¿Qué pasa con los registros que el shard original ya tenía?",
    options: [
      {
        id: "A",
        text: "Se redistribuyen entre los dos shards hijos según los nuevos rangos de clave de hash.",
        correct: false,
        explanation:
          "Es el modelo mental de rebalanceo que se trae de la reasignación de particiones de Kafka, donde los datos sí pueden moverse entre brokers. Kinesis nunca reescribe registros almacenados: una división cambia solo dónde caen los registros futuros, así que nada de lo existente se redistribuye.",
      },
      {
        id: "B",
        text: "Se descartan al completarse la división, así que los productores tienen que enviarlos de nuevo.",
        correct: false,
        explanation:
          "La lectura del resharding guiada por el miedo, y vale descartarla explícitamente porque volvería el resharding inutilizable sobre un stream en vivo. Una división es una operación de metadatos; nunca borra registros que ya se escribieron de forma durable.",
      },
      {
        id: "C",
        text: "Se quedan en el shard padre, que sigue siendo legible hasta que expire el período de retención.",
        correct: true,
        explanation:
          "Correcta. El shard padre queda cerrado a escrituras nuevas pero conserva sus registros y sigue legible por el resto del período de retención. La KCL vacía un padre hasta el final antes de tomar los hijos, y así una división preserva tanto la completitud como el orden por clave.",
      },
      {
        id: "D",
        text: "Se copian en los dos shards hijos, así que el consumidor debe deduplicarlos por número de secuencia.",
        correct: false,
        explanation:
          "Plausible si uno supone que el resharding duplica datos por precaución, e inventa una carga de deduplicación que no existe. Los registros viven en exactamente un shard; los únicos duplicados que una aplicación de la KCL normalmente tiene que tolerar vienen de repeticiones por checkpoint, no de divisiones.",
      },
    ],
    tips: [
      "El resharding crea shards nuevos y cierra los viejos; nunca mueve, copia ni borra registros ya escritos.",
      "La KCL termina un shard padre antes de empezar con sus hijos, y eso es lo que mantiene el orden por clave a través de una división.",
      "Un shard padre cerrado desaparece solo cuando expira la retención, así que esperá ver más shards que la cantidad abierta actual.",
    ],
  },
  {
    id: "dea-t1-q12",
    topic: "streaming-kinesis-msk",
    prompt:
      "Aplicaciones que corren sobre Amazon EKS en la misma cuenta de AWS que un cluster de Amazon MSK producen y consumen de varios topics. Seguridad exige que los permisos de topic de cada carga de trabajo se expresen como políticas adjuntas al rol que ya asume, sin ninguna contraseña ni certificado que haya que rotar. ¿Qué método de autenticación de cliente debería configurarse en el cluster?",
    options: [
      {
        id: "A",
        text: "Autenticación SASL/SCRAM con las credenciales guardadas en AWS Secrets Manager y rotadas automáticamente.",
        correct: false,
        explanation:
          "Es la incorrecta más cercana porque realmente es la opción de secreto administrado para MSK y Secrets Manager realmente puede rotar la credencial. Sigue siendo una contraseña, así que sigue habiendo un secreto con un ciclo de vida de rotación, y los permisos se otorgan en ACLs de Kafka en lugar de en las políticas de los roles que el requisito nombra.",
      },
      {
        id: "B",
        text: "Autenticación TLS mutua con certificados de cliente emitidos por una autoridad certificante privada de AWS.",
        correct: false,
        explanation:
          "Autenticación fuerte, y atractiva porque una CA privada suena como la elección de nivel empresarial. Los certificados vencen y hay que renovarlos y distribuirlos, que es exactamente la carga de rotación que el requisito descarta.",
      },
      {
        id: "C",
        text: "Acceso sin autenticar, restringido por grupos de seguridad que solo permiten tráfico desde las subredes de los nodos de EKS.",
        correct: false,
        explanation:
          "La confusión que vale nombrar es tratar la alcanzabilidad como identidad. Un grupo de seguridad decide qué red puede conectarse, no quién se está conectando, así que toda carga de trabajo dentro de las subredes permitidas obtiene el mismo acceso ilimitado y los permisos de topic por carga se vuelven imposibles.",
      },
      {
        id: "D",
        text: "Control de acceso con IAM para Amazon MSK, con los permisos de topic otorgados en las políticas IAM de las cargas de trabajo.",
        correct: true,
        explanation:
          "Correcta. El control de acceso con IAM resuelve autenticación y autorización de los clientes de Kafka usando el rol IAM que el pod ya asume, así que los permisos a nivel de topic viven en políticas IAM y no hay ninguna contraseña ni certificado en la escena.",
      },
    ],
    tips: [
      "El control de acceso con IAM para MSK autentica y autoriza clientes de Kafka con políticas IAM, y no deja ningún secreto que rotar.",
      "Los grupos de seguridad limitan quién puede alcanzar un puerto; nunca establecen identidad. Un requisito de autenticación necesita un mecanismo de autenticación.",
      "SASL/SCRAM y TLS mutua son compatibles con MSK, pero cada una introduce una credencial o un certificado con ciclo de vida de rotación.",
    ],
  },
  {
    id: "dea-t1-q13",
    topic: "streaming-kinesis-msk",
    prompt:
      "Una empresa ingiere eventos de clickstream con clave por usuario. Debe conservar indefinidamente el evento más reciente de cada clave de usuario, para que un consumidor recién desplegado pueda reconstruir en cualquier momento futuro una tabla completa del estado de los usuarios. El equipo de ingeniería ya mantiene código de consumidores de Kafka. ¿Qué plataforma de ingesta soporta este requisito de forma directa?",
    options: [
      {
        id: "A",
        text: "Amazon MSK con un topic que use compactación de log.",
        correct: true,
        explanation:
          "Correcta. La compactación de log es la función de Kafka que conserva para siempre el registro más reciente de cada clave y descarta las versiones superadas, que es exactamente una tabla de estado reconstruible. Los consumidores de Kafka que el equipo ya tiene la leen sin modificaciones.",
      },
      {
        id: "B",
        text: "Amazon Kinesis Data Streams con el período de retención de datos elevado a su máximo de 365 días.",
        correct: false,
        explanation:
          "La opción más seductora, porque 365 días se siente lo bastante parecido a indefinidamente. Dos cosas la rompen: un año sigue siendo un horizonte duro, y Kinesis no tiene compactación, así que el stream acumula todas las versiones históricas de todas las claves en lugar de converger a la última.",
      },
      {
        id: "C",
        text: "Amazon Kinesis Data Streams con enhanced fan-out registrado para el consumidor que hace la reconstrucción.",
        correct: false,
        explanation:
          "Enhanced fan-out responde otra pregunta: con cuánta velocidad puede leer el consumidor que reconstruye. No hace nada respecto de cuánta historia existe, y la reconstrucción falla por falta de datos mucho antes de que el caudal de lectura sea la restricción.",
      },
      {
        id: "D",
        text: "Amazon Data Firehose entregando los eventos a Amazon S3 con partición dinámica por la clave de usuario.",
        correct: false,
        explanation:
          "Tienta porque S3 sí almacena datos indefinidamente y a bajo costo. Firehose es un servicio de entrega sin semántica de log: nada colapsa las versiones viejas de una clave, así que reconstruir el último estado por usuario implica escribir y correr un trabajo de deduplicación aparte sobre toda la historia.",
      },
    ],
    tips: [
      "La compactación de log conserva para siempre el registro más reciente de cada clave y no tiene equivalente en Kinesis Data Streams.",
      "La retención de Kinesis tiene un techo de 365 días, así que cualquier requisito redactado como indefinidamente apunta a otro lado.",
      "Cuando un requisito nombra una capacidad específica de Kafka, la respuesta es Kafka administrado y no un parecido de Kinesis.",
    ],
  },
  {
    id: "dea-t1-q14",
    topic: "streaming-kinesis-msk",
    multiple: true,
    prompt:
      "Un data stream de Kinesis en modo de capacidad provisionado rechaza escrituras con ProvisionedThroughputExceededException durante una ventana de dos horas todas las tardes. Las métricas muestran que los bytes entrantes llegan a unas tres veces la capacidad provisionada durante esa ventana, con la carga repartida de forma pareja entre todos los shards. ¿Cuáles son las dos acciones que, cada una por su cuenta, resuelven las escrituras rechazadas? (Elegí dos.)",
    options: [
      {
        id: "A",
        text: "Aumentar la cantidad de shards para que la capacidad de escritura provisionada cubra el volumen del pico de la tarde.",
        correct: true,
        explanation:
          "Correcta. En modo provisionado la capacidad de escritura es la cantidad de shards multiplicada por 1 MB por segundo, así que triplicar la demanda contra una capacidad fija se resuelve provisionando shards suficientes para el pico.",
      },
      {
        id: "B",
        text: "Reducir la cantidad de valores distintos de clave de partición para que las escrituras se agrupen en menos shards.",
        correct: false,
        explanation:
          "Esto invierte una regla que sí trata sobre throttling. La cardinalidad de la clave de partición importa cuando la carga es desigual, pero acá ya es pareja, y concentrar las escrituras en menos shards a propósito crea shards saturados y empeora el throttling.",
      },
      {
        id: "C",
        text: "Pasar el stream a modo de capacidad on-demand para que la capacidad de escritura siga al tráfico observado.",
        correct: true,
        explanation:
          "Correcta. El modo on-demand administra la capacidad de escritura contra el caudal observado, lo que cubre un pico nocturno previsible sin que nadie haga resharding. Tené en cuenta que escala desde el pico histórico, así que la primera tarde todavía puede hacer throttling un rato.",
      },
      {
        id: "D",
        text: "Registrar las aplicaciones consumidoras para enhanced fan-out para que los shards se vacíen más rápido durante el pico.",
        correct: false,
        explanation:
          "Capacidad del lado de lectura aplicada a una falla del lado de escritura. Vaciar los shards más rápido no devuelve capacidad de escritura a los productores, porque un shard impone una tasa en lugar de contener una cola que pueda llenarse.",
      },
      {
        id: "E",
        text: "Aumentar el período de retención de datos del stream para que abarque las dos horas completas del pico de la tarde.",
        correct: false,
        explanation:
          "La retención gobierna cuánto tiempo siguen legibles los registros aceptados. Una escritura rechazada nunca entró al stream, así que ningún valor de retención puede rescatarla, y dos horas ya están dentro de las 24 por defecto de todos modos.",
      },
    ],
    tips: [
      "Cuando la carga ya está repartida de forma pareja entre los shards, el throttling es un problema de capacidad y no de distribución de la clave.",
      "La capacidad de escritura sale de la cantidad de shards en modo provisionado, o la administra el servicio en modo on-demand.",
      "Enhanced fan-out es capacidad de lectura y la retención es historia. Ninguna de las dos agrega capacidad de escritura.",
    ],
  },
  {
    id: "dea-t1-q15",
    topic: "streaming-kinesis-msk",
    multiple: true,
    prompt:
      "Una función de AWS Lambda consume un data stream de Kinesis y aplica los eventos en Amazon DynamoDB. Los eventos que comparten un id de cuenta deben aplicarse en la secuencia de producción. Hoy un único evento mal formado mantiene bloqueado su shard durante todo el período de retención mientras Lambda lo reintenta. ¿Qué dos decisiones de configuración preservan la secuencia por cuenta y evitan que un evento defectuoso bloquee su shard? (Elegí dos.)",
    options: [
      {
        id: "A",
        text: "Poner la posición inicial del mapeo de origen de eventos en LATEST para que la función saltee el evento mal formado.",
        correct: false,
        explanation:
          "La posición inicial solo se aplica cuando el mapeo empieza a leer un shard por primera vez, y ese detalle es lo que hace que parezca una vía de escape. No tiene ningún efecto sobre un lote que ya está siendo reintentado, y saltear hacia adelante descartaría en silencio todos los eventos que están detrás del defectuoso.",
      },
      {
        id: "B",
        text: "Producir los eventos usando el id de cuenta como clave de partición.",
        correct: true,
        explanation:
          "Correcta. Kinesis ordena los registros dentro de un shard, y la clave de partición selecciona el shard, así que usar el id de cuenta es lo que convierte los eventos de una cuenta en una única secuencia ordenada que Lambda procesa en orden.",
      },
      {
        id: "C",
        text: "Registrar el mapeo de origen de eventos de Lambda para enhanced fan-out para aislar el lote que falla de los demás.",
        correct: false,
        explanation:
          "Enhanced fan-out le da al mapeo caudal dedicado y menor latencia, y la palabra dedicado es lo que hace sonar plausible el aislamiento. No cambia nada del comportamiento de reintentos: el mismo registro envenenado bloquearía su propia secuencia dedicada de lotes con la misma eficacia.",
      },
      {
        id: "D",
        text: "Configurar el mapeo de origen de eventos con un máximo de intentos de reintento y un destino en caso de falla.",
        correct: true,
        explanation:
          "Correcta. Juntos acotan el daño: después de la cantidad de intentos configurada Lambda deja de reintentar el lote, envía sus metadatos al destino de falla para investigarlo, y sigue adelante, así que el shard avanza en lugar de quedar trabado hasta que el registro expire.",
      },
      {
        id: "E",
        text: "Reducir el stream a un solo shard para que el orden sea global y el registro defectuoso sea más fácil de localizar.",
        correct: false,
        explanation:
          "El orden global es más fuerte que el requisito por cuenta y limita el caudal del stream al de un shard. También empeora el bloqueo: con un shard, el registro envenenado bloquea todas las cuentas en lugar de solo las que caen en su shard por hash.",
      },
    ],
    tips: [
      "El orden por clave sale de la clave de partición. Colapsar a un solo shard es un sustituto sobredimensionado con un costo de caudal.",
      "Un mapeo de origen de eventos sin límite de reintentos ni destino de falla reintentará un registro defectuoso hasta que expire, bloqueando todo lo que está detrás.",
      "El máximo de intentos, la bisección ante error de la función y los destinos en caso de falla son los controles de Lambda para los registros envenenados.",
    ],
  },
  {
    id: "dea-t1-q16",
    topic: "streaming-kinesis-msk",
    multiple: true,
    prompt:
      "Una aplicación de la Kinesis Client Library que consume un stream de 50 shards corre sobre cuatro instancias de Amazon EC2. La métrica MillisBehindLatest sube de forma sostenida a lo largo del día aunque los productores nunca reciben throttling. El equipo debe cerrar la brecha sin alterar la cantidad de shards del stream. ¿Qué dos acciones ayudan? (Elegí dos.)",
    options: [
      {
        id: "A",
        text: "Aumentar la cantidad de shards para que cada uno lleve menos registros que la aplicación deba procesar.",
        correct: false,
        explanation:
          "Más shards sí le darían a la aplicación más paralelismo, y por eso es la primera idea que tiene casi todo el mundo. El escenario lo descarta explícitamente, y la restricción está ahí porque el resharding no arregla un consumidor que es lento por registro.",
      },
      {
        id: "B",
        text: "Bajar el parámetro maxRecords de la KCL para que cada llamada a GetRecords devuelva un lote más chico y más rápido.",
        correct: false,
        explanation:
          "Los lotes más chicos sí terminan más rápido de a uno, y ahí está la trampa. GetRecords tiene un tope de cinco llamadas por segundo por shard, así que menos registros por llamada significa estrictamente menos caudal por shard y el retraso crece más rápido.",
      },
      {
        id: "C",
        text: "Agregar instancias de EC2 a la aplicación para que se procesen más leases de shard en paralelo.",
        correct: true,
        explanation:
          "Correcta. La KCL reparte leases entre los workers, y cuatro instancias cubriendo 50 shards significa que cada worker está serializando muchos shards. Agregar workers reparte los leases, y el techo útil es un worker por shard.",
      },
      {
        id: "D",
        text: "Elevar el período de retención de datos del stream para que la aplicación tenga más tiempo de ponerse al día antes de que los registros expiren.",
        correct: false,
        explanation:
          "Esto compra tiempo antes de la pérdida de datos, que es una mitigación real y a veces necesaria, y esa utilidad es lo que la vuelve atractiva acá. No reduce el retraso ni un milisegundo: el consumidor sigue quedándose atrás, solo con una fecha límite más lejana.",
      },
      {
        id: "E",
        text: "Sacar la consulta a la base de datos que se hace por registro del procesador de registros y agruparla una vez por lote.",
        correct: true,
        explanation:
          "Correcta. Un retraso que sube con escrituras sanas significa que el tiempo de procesamiento por registro es el cuello de botella. Reemplazar una consulta por registro por una consulta por lote recorta ese tiempo de forma directa, que es la palanca que queda cuando la cantidad de shards está fija.",
      },
    ],
    tips: [
      "Un MillisBehindLatest que sube mientras los productores están sanos es un problema de caudal del consumidor, no de la ingesta.",
      "Una aplicación de la KCL no gana nada con más workers que shards, porque un shard se arrienda a un worker a la vez.",
      "Los lotes más chicos nunca hacen más rápido a un consumidor cuando las llamadas a GetRecords tienen un tope de cinco por segundo por shard.",
    ],
  },
];
