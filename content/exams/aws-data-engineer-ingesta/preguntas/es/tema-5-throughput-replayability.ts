import type { ExamQuestionWithTopic } from "../../../types";

/**
 * Tema 5 en español: caudal, latencia y reproducibilidad de una ruta de ingesta.
 *
 * Traducción de `../en/tema-5-throughput-replayability.ts`, estrictamente paralela.
 * Ver la nota de criterio en `tema-1-streaming-kinesis-msk.ts`.
 */
export const TEMA_5_CAUDAL: ExamQuestionWithTopic[] = [
  {
    id: "dea-t5-q01",
    topic: "throughput-replayability",
    prompt:
      "Un tablero de finanzas se refresca una vez cada mañana a partir de 40 GB de registros de transacciones que un socio entrega de noche como un único archivo comprimido. Se le pidió al equipo minimizar tanto el costo como el esfuerzo operativo. ¿Qué diseño de ingesta corresponde al requisito?",
    options: [
      {
        id: "A",
        text: "Un job por lotes programado que cargue el archivo nocturno en la tabla de destino una vez por día.",
        correct: true,
        explanation:
          "Correcta. Los datos llegan una vez por día y se consumen una vez por día, así que una carga diaria por lotes es a la vez la más barata y la de menor operación. Nada aguas abajo podría usar datos más frescos, porque el origen no produce ninguno.",
      },
      {
        id: "B",
        text: "Un data stream de Kinesis alimentado por un proceso que divida el archivo en registros, con una aplicación de Flink manteniendo la tabla de forma continua.",
        correct: false,
        explanation:
          "Es la respuesta de sonido moderno y la que vale desarmar. Un streaming no puede ser más fresco que su origen: el archivo solo existe una vez por noche, así que el pipeline pasa 23 horas inactivo y cuesta más de correr y de operar para una tabla que se actualiza exactamente con la misma frecuencia que antes.",
      },
      {
        id: "C",
        text: "Un stream de Firehose con un intervalo de buffer de 900 segundos, leyendo el archivo a medida que se sube.",
        correct: false,
        explanation:
          "Elegir el intervalo de buffer más largo disponible muestra un instinto correcto, que los datos no son urgentes, y acto seguido usa un servicio de entrega casi en tiempo real igual. Un buffer de 15 minutos no significa nada contra una llegada diaria, y el archivo igual tiene que descomprimirse y dividirse con algo.",
      },
      {
        id: "D",
        text: "Una tarea de DMS con replicación continua leyendo la base de datos de origen del socio.",
        correct: false,
        explanation:
          "Un diseño razonable para otro escenario, que es lo que lo hace tentador: la captura continua de cambios es cómo se mantiene una tabla al día. Acá no hay ninguna base de datos a la que conectarse. El socio entrega archivos, y DMS no tiene origen de archivos.",
      },
    ],
    tips: [
      "Un pipeline de streaming no puede ser más fresco que su origen; un archivo que llega una vez por noche lo hace costar más para el mismo resultado.",
      "Hacé coincidir la frecuencia de ingesta con cuán seguido cambian los datos de verdad, no con cuán seguido te gustaría.",
      "Revisá qué puede producir físicamente el origen antes de comparar streaming contra lotes.",
    ],
  },
  {
    id: "dea-t5-q02",
    topic: "throughput-replayability",
    prompt:
      "Un consumidor escribe cada registro que recibe como una fila nueva en la tabla de destino. Operaciones reporta que un puñado de filas aparece dos o tres veces después de cada despliegue de ese consumidor. La capa de ingesta garantiza entrega al menos una vez. ¿Qué debería cambiarse?",
    options: [
      {
        id: "A",
        text: "Reconfigurar la capa de ingesta para entrega exactamente una vez, para que ningún registro se entregue dos veces.",
        correct: false,
        explanation:
          "La incorrecta más atractiva, porque parece eliminar el problema en la raíz. No existe ese parámetro en estos servicios de ingesta: al menos una vez es la garantía que ofrecen, y un redespliegue que retoma desde el último checkpoint siempre va a volver a entregar lo que estaba en vuelo.",
      },
      {
        id: "B",
        text: "Volver la escritura idempotente derivando la clave de la fila del propio registro, para que una repetición reescriba la misma fila.",
        correct: true,
        explanation:
          "Correcta. Si los duplicados son una consecuencia normal de la garantía de entrega, el consumidor tiene que estar construido para absorberlos. Una clave derivada del registro convierte una segunda entrega en la sobreescritura de una fila idéntica en lugar de una fila extra.",
      },
      {
        id: "C",
        text: "Hacer checkpoints con más frecuencia para que se repitan menos registros cuando el consumidor reinicia.",
        correct: false,
        explanation:
          "Genuinamente efectivo y genuinamente insuficiente, que es lo que lo vuelve el error más cercano. Checkpoints más frecuentes achican la ventana de repetición y por lo tanto la cantidad de duplicados, pero siempre hay una ventana, así que el defecto se vuelve más raro en lugar de desaparecer.",
      },
      {
        id: "D",
        text: "Agregar un paso de deduplicación que acumule los registros cinco minutos y descarte las repeticiones dentro de esa ventana.",
        correct: false,
        explanation:
          "La deduplicación por ventana es una técnica real y atraparía a la mayoría de estos. La ventana es la debilidad: un despliegue que tarda más de cinco minutos repite registros cuyos originales ya salieron del buffer, así que los duplicados reaparecen exactamente en el momento en que se los espera.",
      },
    ],
    tips: [
      "La entrega al menos una vez vuelve los duplicados un evento normal, así que el consumidor es donde se resuelve el problema.",
      "Una escritura idempotente deriva su clave del registro, y convierte una repetición en una sobreescritura.",
      "Achicar la ventana de repetición baja la cantidad de duplicados y nunca llega a cero.",
    ],
  },
  {
    id: "dea-t5-q03",
    topic: "throughput-replayability",
    prompt:
      "Una revisión de diseño tiene que elegir la primitiva de ingesta para un camino nuevo con tres requisitos: varios consumidores sin relación entre sí deben ver cada registro, cualquier registro debe poder releerse hasta por siete días, y el orden debe mantenerse por entidad. ¿Qué elección satisface los tres?",
    options: [
      {
        id: "A",
        text: "Una cola estándar de Amazon SQS, que escala a cualquier volumen sin planificación de capacidad.",
        correct: false,
        explanation:
          "La afirmación sobre el escalado es verdadera y no responde ninguno de los tres requisitos. Una cola estándar no promete ningún orden, borra un mensaje una vez procesado así que nada se puede releer, y reparte los mensajes entre sus consumidores en lugar de darle a cada uno todo.",
      },
      {
        id: "B",
        text: "Una cola FIFO de Amazon SQS, que preserva el orden dentro de cada grupo de mensajes.",
        correct: false,
        explanation:
          "Satisface exactamente uno de los tres requisitos, y satisfacer el que suena más difícil es lo que lo hace parecer suficiente. Un mensaje procesado se borra, así que no hay relectura de siete días, y los consumidores siguen compitiendo por los mensajes en lugar de recibir cada uno el flujo completo.",
      },
      {
        id: "C",
        text: "Un data stream de Kinesis con su período de retención puesto en siete días.",
        correct: true,
        explanation:
          "Correcta. Un stream es un log retenido, así que leer no consume: cada consumidor lee el stream completo de forma independiente, cualquiera puede arrancar desde una posición más vieja dentro de la ventana de retención, y el orden se mantiene por shard, que la clave de partición controla.",
      },
      {
        id: "D",
        text: "Una cola estándar de Amazon SQS por consumidor, cada una suscrita a un topic compartido de Amazon SNS.",
        correct: false,
        explanation:
          "El distractor más fuerte, porque la distribución sí resuelve el primer requisito y es el patrón correcto cuando eso es todo lo que se necesita. Los otros dos quedan sin cumplir: cada cola igual borra lo que procesó, así que nada se puede releer, y las colas estándar siguen sin ordenar.",
      },
    ],
    tips: [
      "Una cola reparte trabajo; un stream es un log retenido que muchos lectores pueden leer completo cada uno.",
      "Un mensaje desaparece una vez borrado de una cola, lo que descarta las colas siempre que el replay sea un requisito.",
      "La distribución de topic a colas compra varios consumidores sin comprar replay.",
    ],
  },
  {
    id: "dea-t5-q04",
    topic: "throughput-replayability",
    prompt:
      "Los productores sostienen 10.000 registros por segundo a lo largo de una jornada laboral de ocho horas y casi nada fuera de ella, mientras el consumidor procesa de forma constante 4.000 por segundo las veinticuatro horas. Ningún registro puede perderse, y el negocio confirmó que los resultados que llegan unas horas tarde son aceptables. ¿Cuál es la respuesta apropiada?",
    options: [
      {
        id: "A",
        text: "Limitar los productores a 4.000 registros por segundo durante la jornada laboral.",
        correct: false,
        explanation:
          "Proteger un componente de aguas abajo frenando el de aguas arriba es un instinto legítimo en algunos sistemas. Acá falla porque los productores están reportando hechos que ya están ocurriendo: frenarlos significa o acumular en el productor, que solo mueve el problema, o descartar registros, que el requisito prohíbe.",
      },
      {
        id: "B",
        text: "Escalar el consumidor hasta que sostenga 10.000 registros por segundo durante la jornada.",
        correct: false,
        explanation:
          "Ingeniería sólida y la respuesta más elegida, y por eso importa la tolerancia enunciada. El negocio acepta resultados con unas horas de atraso, así que aprovisionar para la tasa de llegada compra una latencia que nadie pidió y se paga todos los días.",
      },
      {
        id: "C",
        text: "Acortar el período de retención del stream para que el backlog no pueda crecer sin límite.",
        correct: false,
        explanation:
          "Esto invierte lo que hace la retención. La retención no es un tope del backlog, es la fecha límite para consumirlo, así que acortarla no evita el atraso. Lo convierte en la pérdida de datos que el requisito descarta.",
      },
      {
        id: "D",
        text: "Dejar que el backlog se acumule durante el día y poner la retención cómodamente por encima del tiempo que el consumidor necesita para drenarlo de noche.",
        correct: true,
        explanation:
          "Correcta, y la aritmética hay que revisarla antes de aceptarla: ocho horas a 10.000 por segundo son 288 millones de registros, contra una capacidad diaria del consumidor de 345 millones a 4.000 por segundo las veinticuatro horas. El backlog llega a su pico cerca de los 173 millones al final del día y se despeja en unas doce horas, así que una retención de un día o más deja margen real.",
      },
    ],
    tips: [
      "Un stream retenido absorbe el desajuste entre la tasa del productor y la del consumidor; un backlog está bien si la retención lo sobrevive.",
      "La retención es la fecha límite para consumir un backlog, no un límite de cuán grande puede ser.",
      "Dimensioná el consumidor contra el requisito de latencia, no por reflejo contra la tasa de llegada del pico.",
    ],
  },
  {
    id: "dea-t5-q05",
    topic: "throughput-replayability",
    prompt:
      "Cada acción de usuario llega como su propio registro, y el pipeline debe emitir un resumen por sesión de usuario, donde una sesión se considera terminada después de 30 minutos sin actividad de ese usuario. ¿Qué enfoque de procesamiento soporta esto de forma directa?",
    options: [
      {
        id: "A",
        text: "Una función invocada con cada lote de registros leído del stream.",
        correct: false,
        explanation:
          "El consumidor de streaming por defecto, y es sin estado: cada invocación ve un lote y nada más, así que no puede saber si pasaron 30 minutos de silencio para un usuario. Los equipos que toman este camino terminan guardando el estado de sesión en una tabla aparte, que es reimplementar a mano un motor de ventanas.",
      },
      {
        id: "B",
        text: "Amazon Managed Service for Apache Flink con una ventana de sesión con clave por usuario.",
        correct: true,
        explanation:
          "Correcta. Una ventana de sesión es exactamente la primitiva descrita: Flink mantiene estado por usuario, extiende la ventana mientras siguen llegando registros, y emite el resumen cuando transcurre el intervalo de inactividad configurado, incluidos los temporizadores que hacen que el intervalo se dispare sin entrada nueva.",
      },
      {
        id: "C",
        text: "Una función de transformación de Firehose que agrupe los registros dentro de cada buffer de entrega.",
        correct: false,
        explanation:
          "Una transformación sí llega a ver un grupo de registros juntos, y ahí está el atractivo. La agrupación es un buffer de entrega, acotado por hints de tamaño y de tiempo que no tienen nada que ver con la actividad del usuario, así que sus límites nunca coinciden con los de una sesión.",
      },
      {
        id: "D",
        text: "Una consulta de Athena sobre los objetos entregados que agrupe por usuario y ordene por marca de tiempo del evento.",
        correct: false,
        explanation:
          "El distractor más fuerte, porque SQL realmente puede reconstruir sesiones a partir de los intervalos y así es como se analizan a menudo. Es un cálculo por lotes sobre datos que ya aterrizaron, así que el pipeline no emite resúmenes de sesión; alguien corre una consulta más tarde y los obtiene.",
      },
    ],
    tips: [
      "Las ventanas de sesión y deslizantes son operaciones con estado que un motor de procesamiento de streams provee y una función sin estado no.",
      "Un límite basado en inactividad necesita temporizadores que se disparen sin entrada nueva, y eso es lo que descarta el procesamiento por lote.",
      "Los límites de un buffer de entrega son arbitrarios y nunca coinciden con ventanas de negocio.",
    ],
  },
  {
    id: "dea-t5-q06",
    topic: "throughput-replayability",
    prompt:
      "Un evento tiene que ser consultable en Athena dentro de los 90 segundos de producirse. El camino es: productor, después un data stream de Kinesis, después un stream de Firehose cuyos hints de entrega están puestos en 5 MB y 300 segundos, después Amazon S3. El tiempo medido desde la producción hasta que se puede consultar es de unos cinco minutos. ¿Qué componente debería atacarse primero?",
    options: [
      {
        id: "A",
        text: "El productor, adoptando la Kinesis Producer Library para reducir la latencia de publicación.",
        correct: false,
        explanation:
          "Una mejora real sobre el término equivocado de la suma. La latencia de publicación se mide en milisegundos, así que incluso eliminarla por completo deja los cinco minutos esencialmente iguales, y el buffer de la KPL de hecho agregaría un poco.",
      },
      {
        id: "B",
        text: "El data stream, registrando el stream de Firehose para enhanced fan-out.",
        correct: false,
        explanation:
          "Enhanced fan-out es la respuesta estándar a la latencia de un stream, que es exactamente la trampa. Lleva el retardo de propagación de alrededor de un segundo a unos 70 milisegundos, un ahorro de menos de un segundo contra un exceso de presupuesto de más de tres minutos.",
      },
      {
        id: "C",
        text: "El intervalo de buffer de Firehose, que explica casi toda la demora medida.",
        correct: true,
        explanation:
          "Correcta, y la medición misma lo demuestra: cinco minutos son el intervalo de 300 segundos, así que si el hint de 5 MB se estuviera llenando primero, la entrega ya estaría ocurriendo antes. El intervalo es el que se dispara, y es el único término de la suma lo bastante grande para bajar el total por debajo de 90 segundos.",
      },
      {
        id: "D",
        text: "Athena, agregando proyección de particiones para que las consultas devuelvan sus resultados más rápido.",
        correct: false,
        explanation:
          "Esto confunde dos presupuestos distintos. La proyección de particiones acorta cuánto tarda una consulta en responder, mientras el requisito trata de cuánto falta para que el dato esté ahí para consultarse. Una consulta más rápida sobre datos ausentes devuelve nada más rápido.",
      },
    ],
    tips: [
      "La latencia de punta a punta es una suma; identificá el término dominante antes de optimizar cualquier cosa.",
      "Un intervalo de buffer de 300 segundos aplasta cualquier mejora de escala de milisegundos que esté antes en el camino.",
      "La frescura de los datos y la duración de una consulta son presupuestos separados, y acelerar una consulta no mejora la frescura.",
    ],
  },
  {
    id: "dea-t5-q07",
    topic: "throughput-replayability",
    prompt:
      "Un stream transporta 6 MB por segundo de forma estable, con muy poca variación y sin picos de temporada, y corre en modo de capacidad on-demand desde que se lanzó. Una revisión de costos pidió una recomendación. ¿Qué debería hacer el equipo?",
    options: [
      {
        id: "A",
        text: "Pasar a modo de capacidad provisionado con la cantidad de shards dimensionada para el caudal conocido.",
        correct: true,
        explanation:
          "Correcta. El modo on-demand cobra una prima por absorber incertidumbre, y esta carga no tiene ninguna que absorber. Con el caudal conocido y plano, los shards provisionados entregan la misma capacidad por menos, y el ejercicio de dimensionar es una sola vez en lugar de trabajo continuo.",
      },
      {
        id: "B",
        text: "Quedarse en modo on-demand, porque elimina el riesgo de throttling a medida que la carga crece.",
        correct: false,
        explanation:
          "Cada cláusula de esto es verdadera, que es lo que lo vuelve persuasivo, y nada de eso responde a una revisión de costos de una carga plana. Comprar un seguro contra una variación que el escenario descarta explícitamente es justamente lo que se está pagando de más.",
      },
      {
        id: "C",
        text: "Pasar a modo provisionado y agregar una función que haga resharding cuando se disparen alarmas de CloudWatch.",
        correct: false,
        explanation:
          "Acierta con el modo de capacidad y después agrega maquinaria para un problema que no existe. El resharding automático justifica su costo operativo solo cuando la carga realmente varía; sobre una carga plana es código que mantener y una fuente de eventos de resharding innecesarios.",
      },
      {
        id: "D",
        text: "Reducir el período de retención del stream al mínimo para bajar el cargo de ingesta.",
        correct: false,
        explanation:
          "Confunde dos líneas de factura separadas. La retención extendida se cobra por su cuenta, por encima de la ingesta, así que acortarla no puede reducir la ingesta en absoluto, y lo único que se pierde de verdad es la ventana de replay.",
      },
    ],
    tips: [
      "El modo on-demand tiene precio de incertidumbre; una carga predecible y plana sale más barata con shards provisionados.",
      "La retención extendida se factura por separado de la ingesta, así que recortarla no reduce el costo de ingesta.",
      "La automatización justifica su costo solo contra una variación que de verdad ocurre.",
    ],
  },
  {
    id: "dea-t5-q08",
    topic: "throughput-replayability",
    prompt:
      "Una plataforma ingiere telemetría de 5.000 inquilinos. Cada uno envía menos de 10 KB por segundo, los inquilinos se incorporan y se dan de baja todas las semanas, y el equipo de operaciones necesita que el caudal se reporte por inquilino. ¿Cómo debería armarse la ingesta?",
    options: [
      {
        id: "A",
        text: "Un data stream de Kinesis por cada inquilino, creado y eliminado a medida que cambia la lista.",
        correct: false,
        explanation:
          "El modelo de aislamiento intuitivo, y es como mucha gente empieza. Con 5.000 inquilinos choca contra el límite de streams de la cuenta, convierte la incorporación semanal en trabajo de aprovisionamiento, y deja 5.000 streams de un shard usando cada uno una fracción de su capacidad.",
      },
      {
        id: "B",
        text: "Un data stream de Kinesis por inquilino en modo de capacidad on-demand, para que la capacidad siga a cada inquilino individualmente.",
        correct: false,
        explanation:
          "Esto hereda todos los problemas de un stream por inquilino y agrega uno: el modo on-demand tiene un cargo por hora por stream, así que 5.000 streams se facturan todo el día para transportar 10 KB por segundo cada uno.",
      },
      {
        id: "C",
        text: "Un stream de Firehose por inquilino, entregando en un prefijo dedicado de Amazon S3 por inquilino.",
        correct: false,
        explanation:
          "Produce una organización limpia por inquilino en S3, que es un beneficio real y la razón de que esto resulte atractivo. Siguen siendo 5.000 recursos que administrar, y Firehose no tiene consumidores, así que nada puede procesar la telemetría en vuelo.",
      },
      {
        id: "D",
        text: "Un data stream de Kinesis con el id de inquilino como clave de partición, y el caudal por inquilino derivado de los propios registros.",
        correct: true,
        explanation:
          "Correcta. Este es el caso de muchos productores chicos hacia uno: comparten un stream dimensionado para su volumen combinado, la clave de partición mantiene juntos y ordenados los registros de cada inquilino, y el caudal por inquilino se vuelve una dimensión de las métricas en lugar de un recurso aparte.",
      },
    ],
    tips: [
      "Muchos productores chicos pertenecen a un mismo stream; la separación por inquilino es una clave de partición y una dimensión de métrica, no un recurso cada uno.",
      "Los cargos por hora por stream y las cuotas de la cuenta hacen que los diseños de un recurso por inquilino se rompan en unos pocos cientos de inquilinos.",
      "Reservá un stream dedicado por inquilino para requisitos duros de aislamiento o de cumplimiento, no para reportar.",
    ],
  },
  {
    id: "dea-t5-q09",
    topic: "throughput-replayability",
    prompt:
      "Un data lake nuevo debe recibir primero 10 años de historia de una base de datos operativa, unos 8 TB, y después mantenerse al día con cada cambio hecho desde ese punto en adelante. La base de datos de origen no puede ponerse fuera de línea en ninguna etapa. ¿Qué plan de ingesta cumple las dos necesidades sin dejar un hueco?",
    options: [
      {
        id: "A",
        text: "Una única tarea de DMS de tipo solo carga completa, corrida todas las noches sobre la base de datos entera.",
        correct: false,
        explanation:
          "Una recarga completa nocturna sí refleja eventualmente cada cambio, y por eso sobrevive en sistemas reales. Mover 8 TB cada noche es enormemente caro, carga mucho el origen, y deja el lake con hasta 24 horas de atraso sin ningún registro de los cambios intradiarios.",
      },
      {
        id: "B",
        text: "Una tarea de DMS de tipo carga completa y replicación continua, que carga la historia y después sigue el log desde la posición en que empezó la carga.",
        correct: true,
        explanation:
          "Correcta. El tipo de tarea combinado existe precisamente para eliminar el problema del traspaso: DMS anota su posición inicial en el log, hace la carga completa mientras el origen sigue en línea, y después aplica cada cambio desde esa posición en adelante, así que nada cae entre las dos fases.",
      },
      {
        id: "C",
        text: "Una tarea de DMS de tipo solo replicación continua, arrancada de inmediato, con la historia cargada después por una exportación aparte.",
        correct: false,
        explanation:
          "La incorrecta más cercana, y un patrón que a veces es necesario para orígenes muy grandes. Hecho así, la exportación y el punto de arranque de la captura de cambios no comparten ningún límite acordado, así que los dos conjuntos de datos o se solapan o dejan un hueco, y nadie puede decir cuál de las dos cosas.",
      },
      {
        id: "D",
        text: "Un job de AWS Glue que lea la tabla completa cada noche, con un bookmark sobre la clave primaria de la tabla.",
        correct: false,
        explanation:
          "Un bookmark sobre una clave primaria creciente es una forma barata de levantar filas nuevas, y cubre las inserciones de manera convincente. Las actualizaciones de filas existentes y los borrados dejan la clave sin cambios o ausente, así que el lake se separa en silencio del origen en todo lo que no sean inserciones.",
      },
    ],
    tips: [
      "Carga completa más replicación continua es una sola tarea para que el límite entre la historia y los cambios no tenga hueco.",
      "Cargar la historia por separado de arrancar la captura de cambios exige una posición de log acordada que compartan las dos.",
      "Un bookmark sobre una clave creciente captura solo inserciones; las actualizaciones y los borrados pasan desapercibidos.",
    ],
  },
  {
    id: "dea-t5-q10",
    topic: "throughput-replayability",
    prompt:
      "Una carga de trabajo va a publicar 12.000 registros por segundo en un data stream de Kinesis, y los registros promedian 3 KB cada uno. El equipo está dimensionando el stream en modo de capacidad provisionado. ¿Cuál es la cantidad mínima de shards que soporta esta tasa de escritura?",
    options: [
      {
        id: "A",
        text: "12 shards",
        correct: false,
        explanation:
          "Esto usa solo el límite de registros por segundo: 12.000 dividido 1.000 por shard da 12. Ignora el volumen por completo, y 12 shards aceptan 12 MB por segundo contra los 36 MB por segundo que la carga va a enviar.",
      },
      {
        id: "B",
        text: "18 shards",
        correct: false,
        explanation:
          "Esto divide 36 MB por segundo por 2 MB, que es el límite de lectura por shard y no el de escritura. Confundir los dos lados de un shard es una de las formas más fáciles de subdimensionar un stream a la mitad.",
      },
      {
        id: "C",
        text: "36 shards",
        correct: true,
        explanation:
          "Correcta. La carga es 12.000 por 3 KB, o sea unos 36 MB por segundo, así que el límite de bytes de 1 MB por segundo por shard exige 36 shards, mientras el de registros exige solo 12. La restricción que manda es la mayor de las dos.",
      },
      {
        id: "D",
        text: "48 shards, la suma de lo que cada límite por shard exige por su cuenta",
        correct: false,
        explanation:
          "Sumar 36 y 12 trata los dos límites como demandas separadas que hay que satisfacer una al lado de la otra. Se aplican a los mismos shards de forma simultánea, así que un shard que mueve 1 MB por segundo ya está contado contra los dos; la respuesta es el máximo, nunca la suma.",
      },
    ],
    tips: [
      "Dimensioná un stream contra los dos límites por shard y tomá el mayor, nunca la suma.",
      "Los límites de escritura son 1 MB y 1.000 registros por segundo por shard; la cifra de 2 MB por segundo pertenece al lado de lectura.",
      "Agregá margen por encima del mínimo calculado, porque una clave de partición desigual satura un shard mucho antes de que se alcance el promedio del stream.",
    ],
  },
  {
    id: "dea-t5-q11",
    topic: "throughput-replayability",
    multiple: true,
    prompt:
      "Después de encontrar un bug en una transformación, un equipo debe poder reprocesar los eventos crudos de los últimos 14 días. La ingesta hoy es un stream de Firehose que aplica la transformación y entrega Parquet a Amazon S3. ¿Qué dos cambios hacen posible ese reprocesamiento? (Elegí dos.)",
    options: [
      {
        id: "A",
        text: "Extender el intervalo de buffer de Firehose a su máximo para que se retengan más datos antes de cada entrega.",
        correct: false,
        explanation:
          "Un buffer más largo retiene datos hasta 15 minutos, lo que puede leerse como un período de retención corto. No es almacenamiento: una vez que el buffer se descarga, Firehose no tiene nada, así que esto agrega latencia y ni una sola hora de historia reproducible.",
      },
      {
        id: "B",
        text: "Habilitar el respaldo de registros de origen para que los registros sin transformar se escriban en Amazon S3 junto con la salida transformada.",
        correct: true,
        explanation:
          "Correcta, y es lo que específicamente rescata un bug de transformación. El Parquet entregado tiene el defecto incorporado, así que reproducirlo reproduce el error; la copia de respaldo guarda el payload original, que es la única entrada contra la que se puede correr una transformación corregida.",
      },
      {
        id: "C",
        text: "Tratar el prefijo crudo de Amazon S3 como el origen del replay y confirmar que su política de ciclo de vida retiene al menos 14 días.",
        correct: true,
        explanation:
          "Correcta. Como Firehose no retiene nada, el prefijo crudo es el origen del replay, y la promesa de 14 días vale solo tanto como la regla de ciclo de vida sobre ese prefijo. Una política que expira objetos a los 7 días reduciría en silencio la ventana de recuperación a la mitad.",
      },
      {
        id: "D",
        text: "Extender el período de retención de datos del stream de Firehose a 14 días.",
        correct: false,
        explanation:
          "La opción más convincente para quien arrastra el modelo de Kinesis Data Streams. Firehose no tiene ningún período de retención que extender, porque no almacena nada: el parámetro que se busca existe en un stream, no en un servicio de entrega.",
      },
      {
        id: "E",
        text: "Habilitar el versionado en el bucket de destino para que se puedan reproducir versiones anteriores de los objetos.",
        correct: false,
        explanation:
          "El versionado protege contra que un objeto se sobreescriba o se borre, y eso no es lo que pasa acá. Firehose escribe cada lote bajo una clave nueva y nunca sobreescribe, así que no hay versiones anteriores que el versionado pueda preservar.",
      },
    ],
    tips: [
      "Un servicio de entrega no almacena nada, así que la copia reproducible tiene que ser la de los registros que ya escribió en el almacenamiento.",
      "El respaldo de registros de origen guarda el payload sin transformar, que es lo único contra lo que se puede volver a correr una transformación corregida.",
      "La ventana de replay la impone la política de ciclo de vida del prefijo crudo; verificá que coincida con la ventana que prometiste.",
    ],
  },
];
