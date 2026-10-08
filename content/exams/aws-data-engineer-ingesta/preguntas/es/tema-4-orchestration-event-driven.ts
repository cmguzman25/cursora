import type { ExamQuestionWithTopic } from "../../../types";

/**
 * Tema 4 en español: orquestación e ingesta disparada por eventos.
 *
 * Traducción de `../en/tema-4-orchestration-event-driven.ts`, estrictamente paralela.
 * Ver la nota de criterio en `tema-1-streaming-kinesis-msk.ts`.
 */
export const TEMA_4_ORQUESTACION: ExamQuestionWithTopic[] = [
  {
    id: "dea-t4-q01",
    topic: "orchestration-event-driven",
    prompt:
      "Tres equipos necesitan cada uno arrancar su propio procesamiento cuando se crea un objeto bajo un prefijo compartido de Amazon S3. El primer equipo ya configuró una notificación de evento de S3 hacia su función, y el intento del segundo equipo de agregar una para el mismo prefijo y tipo de evento fue rechazado. Cada equipo además quiere filtrar por tamaño de objeto y administrar su propio disparador sin coordinarse. ¿Qué deberían adoptar los equipos?",
    options: [
      {
        id: "A",
        text: "Activar las notificaciones de EventBridge para el bucket y que cada equipo cree su propia regla con su propio patrón de eventos.",
        correct: true,
        explanation:
          "Correcta. Con EventBridge habilitado en el bucket, el bucket emite un evento y cualquier cantidad de reglas independientes puede hacerle match, así que el conflicto de la configuración única de notificación desaparece. Las reglas además pueden filtrar por cualquier campo del evento, tamaño de objeto incluido, y cada equipo es dueño de su regla.",
      },
      {
        id: "B",
        text: "Enviar una sola notificación de evento de S3 a un topic de Amazon SNS y que cada equipo suscriba su propia función.",
        correct: false,
        explanation:
          "La respuesta clásica de distribución, y sí resuelve el conflicto, lo que la vuelve el distractor más fuerte. Sigue habiendo una configuración de notificación compartida que alguien tiene que poseer y modificar, y las políticas de filtro de SNS trabajan sobre atributos del mensaje en lugar de campos del evento, así que el tamaño de objeto hay que filtrarlo en el código de cada equipo después de pagar la invocación.",
      },
      {
        id: "C",
        text: "Que cada equipo configure su propia notificación de evento de S3 usando un filtro de sufijo distinto sobre ese prefijo.",
        correct: false,
        explanation:
          "Parece esquivar el rechazo haciendo que los filtros sean distintos. S3 igual se niega a aceptar configuraciones solapadas para el mismo prefijo y tipo de evento, y un filtro de sufijo no puede expresar una condición sobre el tamaño del objeto en absoluto.",
      },
      {
        id: "D",
        text: "Correr una función programada que liste el prefijo buscando objetos nuevos e invoque la función de cada equipo por turno.",
        correct: false,
        explanation:
          "El polling siempre funciona, y por eso sobrevive como recurso de último momento. Agrega latencia, cuesta un listado del prefijo en cada corrida, y convierte la función programada de un equipo en el punto único de falla del disparador de todos los demás, que es lo contrario de la propiedad independiente.",
      },
    ],
    tips: [
      "Un bucket admite una sola configuración de notificación por prefijo y tipo de evento solapados; EventBridge quita ese límite.",
      "Las reglas de EventBridge pueden hacer match sobre cualquier campo del evento, tamaño de objeto incluido, cosa que los filtros de notificación de S3 no pueden.",
      "Muchos consumidores independientes de un mismo evento es el caso de las reglas de EventBridge o de la distribución por topic, no de más entradas de notificación.",
    ],
  },
  {
    id: "dea-t4-q02",
    topic: "orchestration-event-driven",
    prompt:
      "Un flujo de ingesta coordina una tarea de DMS, dos jobs de Glue y una carga a Redshift. Una corrida dura unas dos horas y ocurre 20 veces por día, y los auditores exigen que la entrada y la salida de cada paso sean recuperables después. ¿Qué tipo de flujo de AWS Step Functions debería usarse?",
    options: [
      {
        id: "A",
        text: "Un flujo Express, que cuesta menos por transición de estado con este volumen de ejecuciones.",
        correct: false,
        explanation:
          "El costo es el eje equivocado para decidir primero, y la aritmética ni siquiera está en discusión. Los flujos Express están limitados a cinco minutos, así que una corrida de dos horas no puede completarse por más barata que sea; 20 corridas por día además no se acerca al volumen para el que existe el precio de Express.",
      },
      {
        id: "B",
        text: "Un flujo Standard.",
        correct: true,
        explanation:
          "Correcta. Los flujos Standard corren hasta un año, lo que cubre un pipeline de dos horas, y registran un historial de ejecución durable con la entrada y la salida de cada paso que la consola y la API pueden recuperar. Ese historial es precisamente el artefacto de auditoría requerido.",
      },
      {
        id: "C",
        text: "Un flujo Standard anidado dentro de un flujo Express para que el costo de orquestación se mantenga bajo.",
        correct: false,
        explanation:
          "El anidamiento es un patrón real, pero acá está invertido. Un padre no puede sobrevivir a su propio límite de cinco minutos mientras espera un hijo de dos horas, así que la ejecución Express externa expiraría primero. La versión útil de este patrón es la inversa: padre Standard, hijos Express.",
      },
      {
        id: "D",
        text: "Un flujo Express con el logging a Amazon CloudWatch Logs en el nivel ALL.",
        correct: false,
        explanation:
          "Esto identifica bien que los flujos Express no guardan historial propio y arregla esa mitad del problema. El límite de ejecución de cinco minutos queda intacto, así que el flujo sigue sin poder terminar, y el rastro de auditoría documentaría dos horas de fallas.",
      },
    ],
    tips: [
      "Los flujos Standard corren hasta un año y retienen historial de ejecución; los flujos Express tienen un tope de cinco minutos.",
      "El precio de Express favorece volúmenes muy altos de ejecuciones cortas; unas pocas docenas por día no es un problema de volumen.",
      "Cuando la duración requerida supera los cinco minutos, el tipo de flujo queda resuelto antes de que el costo entre en la conversación.",
    ],
  },
  {
    id: "dea-t4-q03",
    topic: "orchestration-event-driven",
    prompt:
      "Una empresa orquesta su ingesta con 180 DAGs de Apache Airflow que ya existen, sobre servidores autoadministrados. Quiere dejar de operar schedulers y workers, conservar el código de los DAGs como está, y mantener la interfaz que sus ingenieros ya usan. ¿A dónde debería mudarse la carga de trabajo?",
    options: [
      {
        id: "A",
        text: "AWS Step Functions, con cada DAG reescrito como una definición de máquina de estados.",
        correct: false,
        explanation:
          "Step Functions es un orquestador excelente, lo que hace que esto suene como una recomendación seria. Implica reescribir 180 DAGs y recapacitar a todos en una interfaz distinta, y el escenario protege explícitamente tanto el código como la interfaz.",
      },
      {
        id: "B",
        text: "Workflows de AWS Glue, con triggers que reproduzcan las dependencias que expresa cada DAG.",
        correct: false,
        explanation:
          "Los workflows de Glue son la elección nativa cuando todo lo que se orquesta es Glue, así que la asociación es razonable. Acá es a la vez una reescritura y una pérdida de expresividad: las dependencias basadas en triggers no pueden representar la ramificación ni la generación dinámica de tareas que los DAGs de Airflow usan habitualmente.",
      },
      {
        id: "C",
        text: "Amazon Managed Workflows for Apache Airflow.",
        correct: true,
        explanation:
          "Correcta. MWAA ejecuta Apache Airflow en sí, así que los DAGs existentes se suben sin cambios y la interfaz conocida de Airflow queda, mientras AWS opera el scheduler, los workers y la base de metadatos.",
      },
      {
        id: "D",
        text: "Amazon EventBridge Scheduler, invocando cada tarea a la hora en que el DAG la corre hoy.",
        correct: false,
        explanation:
          "Esto sustituye un orquestador por un planificador, y es la distinción con la que conviene ser preciso. EventBridge Scheduler dispara de forma confiable a una hora, pero no tiene ninguna noción de si una tarea anterior tuvo éxito, así que cada dependencia de los 180 DAGs habría que recodificarla como una conjetura sobre la duración.",
      },
    ],
    tips: [
      "MWAA es Apache Airflow administrado: los DAGs existentes y la interfaz de Airflow se trasladan sin modificación.",
      "Un planificador dispara a una hora; un orquestador dispara según el resultado del trabajo anterior. No son intercambiables.",
      "Preferí una versión administrada de lo que ya corrés cuando el requisito protege el código existente.",
    ],
  },
  {
    id: "dea-t4-q04",
    topic: "orchestration-event-driven",
    prompt:
      "Una función invocada directamente por notificaciones de evento de S3 procesa los archivos que se suben. Durante una carga masiva nocturna llegan miles de objetos en segundos, la función alcanza su límite de concurrencia y algunos objetos no se procesan nunca. Todos los objetos deben procesarse eventualmente, aunque no al instante. ¿Qué cambio evita la pérdida?",
    options: [
      {
        id: "A",
        text: "Subir la concurrencia reservada de la función hasta el límite de concurrencia de la cuenta.",
        correct: false,
        explanation:
          "Esto mueve el techo sin quitarlo, así que una carga más grande reproduce la falla, y además deja sin capacidad a todas las demás funciones de la cuenta durante el pico. También trata un techo como si fuera el problema, cuando el problema real es no tener dónde poner el trabajo que no entra debajo de él.",
      },
      {
        id: "B",
        text: "Aumentar el timeout de la función para que cada invocación tenga más tiempo de completar su trabajo.",
        correct: false,
        explanation:
          "El timeout y la concurrencia son límites separados, y esto los confunde. Un timeout más largo significa que cada invocación ocupa un lugar de concurrencia durante más tiempo, lo que vuelve el throttling durante un pico más probable y no menos.",
      },
      {
        id: "C",
        text: "Habilitar el versionado de S3 para que los objetos que no se procesaron puedan reprocesarse más tarde.",
        correct: false,
        explanation:
          "El versionado sí conserva los objetos a salvo, y esa media verdad es lo que lo hace atractivo. Los objetos nunca fueron lo que se perdió: fue la invocación. Nada en el versionado provoca un segundo intento, así que el equipo igual tendría que encontrar y reponer los huecos a mano.",
      },
      {
        id: "D",
        text: "Que S3 publique los eventos en una cola de Amazon SQS y configurar esa cola como origen de eventos de la función.",
        correct: true,
        explanation:
          "Correcta. La cola absorbe el pico y retiene los eventos hasta que la función tenga capacidad, lo que convierte un problema de caudal en uno de latencia que el requisito ya acepta. Los mensajes se borran solo después de una invocación exitosa, así que el throttling demora el trabajo en lugar de descartarlo.",
      },
    ],
    tips: [
      "Una cola entre un productor a ráfagas y un consumidor con tasa limitada convierte un problema de caudal en uno de latencia.",
      "Las notificaciones de S3 invocan Lambda de forma asincrónica con una cantidad limitada de reintentos; los eventos con throttling pueden descartarse una vez agotados.",
      "Subir un límite de concurrencia reubica un techo. Una cola elimina el requisito de que el trabajo entre debajo de uno.",
    ],
  },
  {
    id: "dea-t4-q05",
    topic: "orchestration-event-driven",
    prompt:
      "Una máquina de estados debe correr la misma validación sobre cada uno de 4 millones de objetos de un prefijo de Amazon S3, con hasta 3.000 validaciones corriendo en simultáneo. La definición actual usa un estado Map en línea, que falla una vez leídos unos pocos miles de ítems. ¿Qué enfoque soporta este volumen?",
    options: [
      {
        id: "A",
        text: "Reemplazar el Map en línea por un estado Distributed Map, que procesa los ítems como ejecuciones hijas en paralelo.",
        correct: true,
        explanation:
          "Correcta. Distributed Map se construyó justamente para esta forma: lee la lista de ítems directamente de S3 y distribuye el trabajo en ejecuciones hijas, así que ni la cantidad de ítems ni los resultados acumulados quedan restringidos por el estado de una sola ejecución.",
      },
      {
        id: "B",
        text: "Mantener el estado Map en línea y subir su parámetro MaxConcurrency a 3000.",
        correct: false,
        explanation:
          "La opción más tentadora porque se lee como un arreglo de una línea. El Map en línea tiene un tope bastante por debajo de esa cifra y, más de fondo, mantiene el estado de cada iteración dentro de la ejecución padre, así que falla por el límite de payload de estado mucho antes de que la concurrencia sea la restricción que manda.",
      },
      {
        id: "C",
        text: "Usar un estado Parallel con 3.000 ramas definidas en la definición de la máquina de estados.",
        correct: false,
        explanation:
          "Parallel y Map producen los dos concurrencia, y ahí empieza la confusión. Las ramas de un estado Parallel se escriben en tiempo de diseño y no las gobiernan los datos, así que 3.000 serían inmantenibles y superarían el límite de tamaño de la definición.",
      },
      {
        id: "D",
        text: "Reemplazar el estado Map por una función que recorra los objetos y los valide uno después del otro.",
        correct: false,
        explanation:
          "Simple de razonar, y descarta el paralelismo que vuelve viable el trabajo. Una sola invocación además tiene un techo de quince minutos, dentro del cual 4 millones de validaciones en serie no entran bajo ninguna circunstancia.",
      },
    ],
    tips: [
      "Distributed Map corre los ítems como ejecuciones hijas, lo que levanta tanto el límite de concurrencia como el de payload de estado del Map en línea.",
      "El Map en línea acumula el estado de cada iteración en la ejecución padre, así que una cantidad grande de ítems llega al límite de payload.",
      "Las ramas de un estado Parallel están fijas en la definición; las de un estado Map las gobiernan los datos.",
    ],
  },
  {
    id: "dea-t4-q06",
    topic: "orchestration-event-driven",
    prompt:
      "Una tarea de un flujo llama a la API de un socio que de forma intermitente devuelve un 503 durante unos segundos y de vez en cuando devuelve un error de validación permanente. Hoy cualquiera de las dos respuestas hace fallar la corrida completa. El caso transitorio debe reintentarse y el permanente debe derivarse a un estado de notificación. ¿Qué configuración lo logra?",
    options: [
      {
        id: "A",
        text: "Subir el TimeoutSeconds de la tarea para que la indisponibilidad breve se absorba sin fallar.",
        correct: false,
        explanation:
          "Un timeout más largo solo gobierna cuánto puede tardar un intento. Un 503 es una respuesta completada y no una lenta, así que el intento falla de inmediato y nada en el timeout provoca un segundo.",
      },
      {
        id: "B",
        text: "Agregar un bloque Retry con retroceso exponencial para el error transitorio, y un bloque Catch que derive el error de validación al estado de notificación.",
        correct: true,
        explanation:
          "Correcta. Son las dos primitivas de manejo de errores y se corresponden directamente con los dos casos: Retry vuelve a intentar un error nombrado con retroceso, mientras Catch le da a un error terminal un camino distinto por la máquina de estados en lugar de terminar la ejecución.",
      },
      {
        id: "C",
        text: "Envolver la tarea en un estado Parallel para que una rama que falla no haga fallar la ejecución.",
        correct: false,
        explanation:
          "Esto supone que un estado Parallel es un límite de aislamiento, y es la idea equivocada más útil de aclarar. Si cualquier rama de un estado Parallel falla, el estado Parallel falla y se lleva la ejecución con él salvo que haya un Catch asociado, lo que te devuelve a la respuesta correcta.",
      },
      {
        id: "D",
        text: "Convertir la máquina de estados a Express para que las ejecuciones fallidas se reintenten automáticamente.",
        correct: false,
        explanation:
          "Los flujos Express sí tienen semántica de al menos una vez cuando se invocan de forma asincrónica, y ese es el grano de verdad acá. Ese reintento se aplica a la ejecución completa y no a una tarea, así que el error de validación permanente se reintentaría para siempre y el paso de notificación nunca correría.",
      },
    ],
    tips: [
      "Retry vuelve a intentar un error nombrado con retroceso; Catch manda un error terminal por un camino distinto.",
      "Una rama que falla dentro de un estado Parallel hace fallar al estado Parallel. No es por sí sola un límite de falla.",
      "Nombrá errores específicos en Retry y en Catch para que una falla permanente no se reintente durante minutos antes de que alguien se entere.",
    ],
  },
  {
    id: "dea-t4-q07",
    topic: "orchestration-event-driven",
    prompt:
      "Una función que consume una cola de Amazon SQS escribe en una instancia de Amazon RDS que acepta como máximo 60 conexiones simultáneas. Durante las ráfagas la función escala y la base de datos empieza a rechazar conexiones. La cola debe permanecer en el diseño y ningún mensaje puede descartarse. ¿Qué debería configurarse?",
    options: [
      {
        id: "A",
        text: "Un visibility timeout más largo en la cola de origen.",
        correct: false,
        explanation:
          "El visibility timeout decide cuánto tiempo un mensaje queda oculto después de recibirse, lo que importa para la reentrega y para el trabajo duplicado. No pone ningún límite a cuántas invocaciones corren a la vez, así que la base de datos recibe exactamente la misma presión.",
      },
      {
        id: "B",
        text: "Un tamaño de lote más grande en el mapeo de origen de eventos.",
        correct: false,
        explanation:
          "La incorrecta más cercana, porque un lote más grande sí significa menos invocaciones para la misma cantidad de mensajes. Igual no fija ningún límite superior: Lambda sigue agregando pollers concurrentes a medida que crece el backlog, así que una ráfaga lo bastante grande supera las 60 conexiones de todos modos.",
      },
      {
        id: "C",
        text: "Concurrencia reservada en la función, puesta por debajo del límite de conexiones de la base de datos.",
        correct: true,
        explanation:
          "Correcta. La concurrencia reservada es un techo duro sobre cuántas copias de la función pueden correr a la vez, lo que se traduce directamente en un techo de conexiones. Los mensajes que la función limitada todavía no puede tomar simplemente esperan en la cola, así que nada se pierde.",
      },
      {
        id: "D",
        text: "Una cola de mensajes fallidos asociada a la cola de origen.",
        correct: false,
        explanation:
          "Una cola de mensajes fallidos es la herramienta correcta para mensajes que fallan repetidamente, y ese es otro problema. Registra el daño después de que las conexiones ya fueron rechazadas en lugar de prevenir los rechazos, y convertiría en silencio un problema de capacidad en una pila creciente de mensajes fallidos.",
      },
    ],
    tips: [
      "La concurrencia reservada es un techo duro sobre las ejecuciones simultáneas, y así se protege un recurso de aguas abajo con capacidad fija.",
      "Los mensajes esperan en la cola mientras una función limitada se pone al día; nada se pierde si la retención supera el backlog.",
      "El visibility timeout y las colas de mensajes fallidos gobiernan la reentrega y la falla, no cuánto escala una función.",
    ],
  },
  {
    id: "dea-t4-q08",
    topic: "orchestration-event-driven",
    prompt:
      "Un único evento de ingesta tiene que llegar a cuatro sistemas de aguas abajo. Procesan a ritmos muy distintos, cada uno debe poder fallar y ponerse al día sin afectar a los otros, y el publicador debe enviar el evento una sola vez. ¿Qué patrón cumple estas restricciones?",
    options: [
      {
        id: "A",
        text: "Publicar en una sola cola de Amazon SQS que los cuatro sistemas consulten.",
        correct: false,
        explanation:
          "Una cola con cuatro consumidores es un esquema de consumidores que compiten, que es la idea equivocada que apunta esta opción. Cada mensaje se entrega a exactamente uno de los cuatro, así que los sistemas se repartirían el trabajo en lugar de recibir cada uno todos los eventos.",
      },
      {
        id: "B",
        text: "Publicar en un topic de Amazon SNS con los cuatro sistemas suscritos como endpoints de función.",
        correct: false,
        explanation:
          "La forma de distribución correcta, y eso lo convierte en el distractor más fuerte. Sin una cola en el medio, cada suscriptor tiene que seguirle el ritmo al publicador: el sistema lento recibe throttling, y los reintentos de SNS son finitos, así que su backlog se vuelve pérdida de datos en lugar de backlog.",
      },
      {
        id: "C",
        text: "Publicar el evento cuatro veces, una en una cola dedicada para cada sistema de aguas abajo.",
        correct: false,
        explanation:
          "Esto sí le da a cada sistema su propio buffer, que es la mitad del requisito. Rompe la otra mitad de plano, porque el publicador ahora envía cuatro veces, y convierte agregar un quinto sistema en un cambio al código del publicador.",
      },
      {
        id: "D",
        text: "Publicar en un topic de Amazon SNS con cuatro colas de Amazon SQS suscritas, una por sistema.",
        correct: true,
        explanation:
          "Correcta. La distribución de topic a colas le da a cada sistema un buffer privado, su propio comportamiento de reintentos y su propio backlog, así que un consumidor lento o roto nunca afecta a los demás, mientras el publicador sigue enviando un mensaje a un topic.",
      },
    ],
    tips: [
      "La distribución de topic a colas le da a cada consumidor su propio buffer, sus reintentos y su backlog.",
      "Varios consumidores consultando una misma cola compiten por los mensajes: cada mensaje va a exactamente uno de ellos.",
      "Suscribir un endpoint de cómputo directamente a un topic quita el buffer que permite que un consumidor lento se atrase sin peligro.",
    ],
  },
  {
    id: "dea-t4-q09",
    topic: "orchestration-event-driven",
    prompt:
      "Los mensajes que pertenecen a una cuenta deben manejarse en la secuencia en que se enviaron, y ningún mensaje puede manejarse dos veces. El volumen es de unos 200 mensajes por segundo repartidos entre miles de cuentas. ¿Qué configuración de cola satisface las dos restricciones conservando ese caudal?",
    options: [
      {
        id: "A",
        text: "Una cola FIFO de Amazon SQS usando el id de cuenta como message group ID.",
        correct: true,
        explanation:
          "Correcta. Una cola FIFO ordena los mensajes dentro de un grupo de mensajes y los deduplica, y acotar el grupo a la cuenta da orden por cuenta mientras miles de grupos se procesan en paralelo. El papel del group ID acá es el mismo que el de una clave de partición en un stream.",
      },
      {
        id: "B",
        text: "Una cola estándar de Amazon SQS, con el consumidor deduplicando por un atributo del mensaje.",
        correct: false,
        explanation:
          "La deduplicación del lado del consumidor es una técnica legítima y cubre uno de los dos requisitos. Una cola estándar no promete ningún orden, así que los mensajes de una cuenta pueden llegar fuera de secuencia por más cuidadosamente que se filtren los duplicados.",
      },
      {
        id: "C",
        text: "Una cola estándar de Amazon SQS con un visibility timeout cómodamente por encima del tiempo de procesamiento.",
        correct: false,
        explanation:
          "Así se evita de verdad una fuente habitual de procesamiento duplicado, y por eso se siente una respuesta pertinente. Reduce la reentrega accidental de un mensaje que todavía se está trabajando, y no provee ni orden ni deduplicación real.",
      },
      {
        id: "D",
        text: "Una cola FIFO de Amazon SQS usando un único message group ID para todas las cuentas.",
        correct: false,
        explanation:
          "Elegir FIFO está bien y elegir el grupo es donde se desvía. Un grupo único es una única secuencia ordenada, así que los mensajes de cada cuenta hacen fila detrás de los de todas las demás y el requisito de caudal se derrumba.",
      },
    ],
    tips: [
      "Una cola FIFO ordena dentro de un grupo de mensajes, así que el group ID acota el orden igual que lo hace una clave de partición.",
      "Las colas FIFO deduplican dentro de una ventana de cinco minutos; las estándar son al menos una vez y sin garantía de orden.",
      "Un único grupo de mensajes para todo convierte una cola FIFO en un caño serial.",
    ],
  },
  {
    id: "dea-t4-q10",
    topic: "orchestration-event-driven",
    prompt:
      "Los registros que llegan a un data stream de Kinesis deben reducirse a cerca del 2 por ciento de su volumen con una coincidencia simple de contenido, enriquecerse con una llamada de consulta y entregarse a una máquina de estados. El equipo no quiere escribir ni operar una función cuyo único propósito sea mover y filtrar registros. ¿Qué servicio provee esto de forma directa?",
    options: [
      {
        id: "A",
        text: "Reglas de Amazon EventBridge, con el data stream de Kinesis configurado como origen de eventos.",
        correct: false,
        explanation:
          "Las reglas de EventBridge sí hacen filtrado de forma declarativa, que es la capacidad que se pide, pero hacen match sobre eventos que llegan a un event bus. Un data stream no es un bus y no puede asociarse a una regla como origen.",
      },
      {
        id: "B",
        text: "Amazon Data Firehose, con la máquina de estados configurada como destino de entrega.",
        correct: false,
        explanation:
          "Firehose sí conecta un stream con un destino sin código propio, lo que lo vuelve una conjetura razonable. Sus destinos son almacenes de datos y endpoints, no máquinas de estados, y no tiene filtrado declarativo: descartar el 98 por ciento de los registros necesitaría una función de transformación, que es justo lo que se está evitando.",
      },
      {
        id: "C",
        text: "Amazon EventBridge Pipes, con un filtro y un paso de enriquecimiento configurados en el pipe.",
        correct: true,
        explanation:
          "Correcta. Un pipe consulta el stream, aplica un filtro declarativo para que solo los registros coincidentes continúen, llama a un destino de enriquecimiento e invoca la máquina de estados. Eso es todo el código de pegamento del que el equipo no quería ser dueño.",
      },
      {
        id: "D",
        text: "Un job de streaming de AWS Glue que filtre los registros y arranque la máquina de estados por cada coincidencia.",
        correct: false,
        explanation:
          "Técnicamente capaz y la forma más pesada posible de hacerlo. Un job de streaming es código Spark corriendo de forma continua, con workers que dimensionar y un script que mantener, que es una versión más grande exactamente de la carga operativa que el equipo rechazó.",
      },
    ],
    tips: [
      "EventBridge Pipes conecta un origen con un destino con filtrado y enriquecimiento opcionales, y reemplaza el código de pegamento.",
      "Las reglas de EventBridge hacen match sobre eventos de un bus; un pipe consulta un origen como un stream, una cola o un stream de tabla.",
      "Filtrar dentro de un pipe significa que el destino nunca se invoca para registros que no coinciden, y de ahí viene el ahorro.",
    ],
  },
  {
    id: "dea-t4-q11",
    topic: "orchestration-event-driven",
    multiple: true,
    prompt:
      "Un flujo Standard nocturno falló en el tercero de sus seis pasos. La persona de guardia lo volvió a correr desde el principio, lo que costó cuatro horas, y nadie notó la falla hasta la mañana. El equipo quiere que una corrida fallida retome donde se rompió, y quiere ser alertado en el momento en que una falla. ¿Qué dos cambios lo consiguen? (Elegí dos.)",
    options: [
      {
        id: "A",
        text: "Hacer redrive de la ejecución fallida, que la retoma desde el paso que falló y reutiliza los resultados de los pasos completados.",
        correct: true,
        explanation:
          "Correcta. El redrive está hecho para esto: una ejecución Standard fallida se reinicia en su punto de falla con las salidas de los pasos anteriores intactas, así que las tres horas exitosas no se repiten.",
      },
      {
        id: "B",
        text: "Crear una regla de EventBridge sobre el evento de cambio de estado de ejecución de Step Functions que publique en un topic de Amazon SNS cuando una corrida falla.",
        correct: true,
        explanation:
          "Correcta. Step Functions emite los cambios de estado de ejecución a EventBridge, así que una regla que haga match con el estado FAILED es el gancho que convierte una falla silenciosa de madrugada en un aviso.",
      },
      {
        id: "C",
        text: "Convertir la máquina de estados a un flujo Express para que las ejecuciones fallidas se reintenten automáticamente.",
        correct: false,
        explanation:
          "La palabra automáticamente hace mucho trabajo acá. Los reintentos de Express se aplican a una ejecución completa en lugar de retomarla, no hay redrive, y un flujo con un camino crítico de cuatro horas no puede correr como Express en absoluto.",
      },
      {
        id: "D",
        text: "Aumentar el TimeoutSeconds de todas las tareas para que la lentitud transitoria no haga fallar un paso.",
        correct: false,
        explanation:
          "Higiene razonable apuntada al objetivo equivocado. Nada en el escenario dice que el paso haya expirado por timeout, y un timeout más largo no retoma una corrida fallida ni le avisa a nadie que una falló.",
      },
      {
        id: "E",
        text: "Habilitar el trazado con AWS X-Ray en la máquina de estados para que las fallas sean más fáciles de investigar.",
        correct: false,
        explanation:
          "El trazado acorta genuinamente la investigación, y por eso se lee como relevante. Ayuda solo una vez que ya sabés que hubo una falla, y no hace nada por evitar repetir los tres primeros pasos.",
      },
    ],
    tips: [
      "El redrive reinicia una ejecución Standard fallida en su punto de falla y reutiliza la salida de los pasos completados.",
      "Step Functions publica eventos de cambio de estado de ejecución en EventBridge, que es el gancho estándar de alertas.",
      "El trazado te ayuda a entender una falla que ya conocés; no es un mecanismo de detección.",
    ],
  },
  {
    id: "dea-t4-q12",
    topic: "orchestration-event-driven",
    multiple: true,
    prompt:
      "Se creó una regla de EventBridge con un patrón de eventos que hace match con el tipo de detalle Object Created de un bucket, y un job de Glue como destino, para que el job corra cuando aterriza un archivo. El job nunca arranca, y la regla no reporta ninguna invocación coincidente. ¿Qué dos cosas están faltando? (Elegí dos.)",
    options: [
      {
        id: "A",
        text: "Una configuración de notificación en el bucket que publique los eventos al ARN de la regla.",
        correct: false,
        explanation:
          "Esto mezcla los dos mecanismos de eventos de S3. Una configuración de notificación apunta directamente a una cola, un topic o una función, y no puede nombrar una regla de EventBridge; el camino de EventBridge se habilita con un único interruptor en el bucket.",
      },
      {
        id: "B",
        text: "Un trigger de Glue de tipo ON_DEMAND asociado al job.",
        correct: false,
        explanation:
          "Los triggers de Glue son la forma en que un workflow de Glue arranca un job, y el solapamiento de vocabulario hace que esto parezca necesario. Un destino de EventBridge llama a StartJobRun de forma directa, así que no tiene que existir ningún objeto trigger para que el job se pueda arrancar.",
      },
      {
        id: "C",
        text: "Una cola de mensajes fallidos en la regla para que las invocaciones fallidas de destino sean visibles.",
        correct: false,
        explanation:
          "Vale la pena agregarla, y habría acortado bastante esta investigación, pero no es el motivo de que nada corra. Una cola de mensajes fallidos captura invocaciones que se intentaron y fallaron, y acá la regla no reporta ninguna coincidencia.",
      },
      {
        id: "D",
        text: "Las notificaciones de EventBridge activadas para el bucket.",
        correct: true,
        explanation:
          "Correcta, y explica exactamente el conteo de cero coincidencias. Un bucket no envía nada a EventBridge hasta que ese parámetro está habilitado, así que la regla estuvo esperando sobre un event bus que nunca recibió un evento de S3.",
      },
      {
        id: "E",
        text: "Un rol IAM que EventBridge pueda asumir y que permita glue:StartJobRun sobre el job.",
        correct: true,
        explanation:
          "Correcta. EventBridge invoca este tipo de destino asumiendo un rol declarado en la regla. Sin un rol que confíe en EventBridge y además permita StartJobRun, la regla no tiene autoridad para arrancar nada ni siquiera cuando los eventos empiecen a llegar.",
      },
    ],
    tips: [
      "S3 no envía nada a EventBridge hasta que las notificaciones de EventBridge están habilitadas en el bucket.",
      "Una regla de EventBridge invoca la mayoría de los destinos asumiendo un rol declarado en la regla; un rol ausente falla en silencio.",
      "Cero eventos coincidentes apunta al origen; eventos coincidentes con cero invocaciones exitosas apunta a los permisos o al destino.",
    ],
  },
];
