import type { ExamQuestionWithTopic } from "../../types";

/**
 * Dominio 1 — Conceptos de la nube. Seis preguntas, tres por cada pendiente del
 * primer refuerzo:
 *
 *   - ref-gr-d1-q05 (eligió Eficiencia de rendimiento; era Fiabilidad, falló 2 de 3): q01, q03, q05
 *   - ref-gr-d1-q01 (marcada; la trampa era Optimización de costos): q02, q04, q06
 *
 * La confusión de fondo: ve "Auto Scaling" o "más instancias" y piensa en
 * rendimiento, cuando el objetivo del escenario es sobrevivir a un fallo.
 */
export const TEMA_1_CONCEPTOS: ExamQuestionWithTopic[] = [
  {
    id: "ref2-gr-d1-q01",
    topic: "1",
    prompt:
      "Una empresa configura su base de datos Amazon RDS en modo Multi-AZ. Si la instancia principal deja de responder, RDS promueve sola la réplica en espera de otra zona y la aplicación sigue funcionando tras una breve interrupción. ¿Qué pilar del AWS Well-Architected Framework guía esta decisión?",
    options: [
      {
        id: "A",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "El pilar de eficiencia de rendimiento trata de usar los recursos de cómputo, almacenamiento y base de datos de la forma más rápida y adecuada para la carga, y de seguir eligiendo bien a medida que la demanda y la tecnología cambian. Tienta porque Multi-AZ suena a 'más infraestructura', y más infraestructura suena a más velocidad. Pero la réplica en espera de Multi-AZ no atiende consultas: no hace nada más rápido, solo está lista para reemplazar a la principal si falla.",
      },
      {
        id: "B",
        text: "Excelencia operativa",
        correct: false,
        explanation:
          "El pilar de excelencia operativa trata de cómo se opera y se mejora el sistema: operaciones como código, runbooks, cambios pequeños y reversibles, y aprender de los incidentes. Tienta porque la conmutación es automática y lo automático se asocia con operación. Pero aquí lo automático está al servicio de otra cosa: que la base de datos sobreviva a una falla, no que el equipo opere mejor.",
      },
      {
        id: "C",
        text: "Fiabilidad",
        correct: true,
        explanation:
          "Correcta. El pilar de fiabilidad trata de que la carga cumpla su función aunque algo falle: recuperarse automáticamente de los fallos y no depender de un único componente. Una réplica en otra zona que toma el lugar de la principal es exactamente eso.",
      },
      {
        id: "D",
        text: "Optimización de costos",
        correct: false,
        explanation:
          "El pilar de optimización de costos trata de entregar el valor del negocio al menor precio: pagar solo por lo que se usa, dimensionar bien y medir el gasto. Aparece porque cualquier decisión de arquitectura tiene un costo. Pero Multi-AZ va en la dirección contraria: duplica la instancia de base de datos y se paga más para ganar resistencia a fallos.",
      },
    ],
    tips: [
      "La pregunta clave para separar pilares: ¿qué pasaría si esa pieza no existiera? Si la respuesta es 'nos caeríamos cuando algo falle', es fiabilidad.",
      "Una réplica en espera que no atiende tráfico nunca es rendimiento: solo sirve cuando hay un fallo.",
    ],
  },
  {
    id: "ref2-gr-d1-q02",
    topic: "1",
    prompt:
      "Una tienda en línea tarda 800 ms en mostrar el catálogo. El equipo agrega una caché en memoria con Amazon ElastiCache delante de la base de datos y el tiempo baja a 90 ms, con la misma cantidad de servidores y un gasto mensual un poco mayor. ¿Qué pilar del Well-Architected Framework guía esta mejora?",
    options: [
      {
        id: "A",
        text: "Eficiencia de rendimiento",
        correct: true,
        explanation:
          "Correcta. El pilar de eficiencia de rendimiento trata de elegir los recursos y patrones que dan la mejor velocidad para la carga, como una caché en memoria para lecturas repetidas. El objetivo medido es la latencia, y eso es lo que mejora.",
      },
      {
        id: "B",
        text: "Fiabilidad",
        correct: false,
        explanation:
          "El pilar de fiabilidad trata de que la carga siga funcionando cuando algo falla: redundancia entre zonas, recuperación automática, copias de seguridad probadas. Tienta porque agregar un componente nuevo parece hacer el sistema más robusto. Pero el enunciado no habla de ninguna falla: la base de datos funcionaba, solo era lenta, y la caché se agregó para responder más rápido.",
      },
      {
        id: "C",
        text: "Optimización de costos",
        correct: false,
        explanation:
          "El pilar de optimización de costos trata de entregar lo mismo pagando menos: dimensionar bien, apagar lo que no se usa, elegir el modelo de compra adecuado. Tienta porque una caché a veces reduce la carga de la base de datos y con eso su costo. Pero aquí el gasto sube un poco, y lo que se buscaba y se midió es el tiempo de respuesta.",
      },
      {
        id: "D",
        text: "Sostenibilidad",
        correct: false,
        explanation:
          "El pilar de sostenibilidad trata de reducir el impacto ambiental de la carga: usar menos recursos, aprovecharlos mejor y elegir regiones y servicios más eficientes en energía. Puede aparecer porque cualquier optimización suena a 'usar mejor los recursos'. Pero agregar un clúster de caché suma recursos, y el objetivo declarado es la velocidad, no la huella de carbono.",
      },
    ],
    tips: [
      "Si lo que se mide en el enunciado es latencia o tiempo de respuesta, el pilar es eficiencia de rendimiento.",
      "Cachés, CDN, tipos de instancia más adecuados y bases de datos especializadas son las herramientas típicas de eficiencia de rendimiento.",
    ],
  },
  {
    id: "ref2-gr-d1-q03",
    topic: "1",
    multiple: true,
    prompt:
      "¿Qué dos principios de diseño pertenecen al pilar de fiabilidad del AWS Well-Architected Framework? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Probar los procedimientos de recuperación",
        correct: true,
        explanation:
          "Correcta. Fiabilidad pide simular fallas y restaurar copias de seguridad para comprobar que la recuperación funciona antes de necesitarla de verdad. Un backup que nunca se restauró no es un plan de recuperación.",
      },
      {
        id: "B",
        text: "Usar arquitecturas sin servidor",
        correct: false,
        explanation:
          "Usar arquitecturas sin servidor (Lambda, Fargate, DynamoDB) es un principio de eficiencia de rendimiento: quitarse de encima la administración de servidores para concentrarse en la aplicación. Tienta porque los servicios sin servidor también son muy resistentes a fallos. Pero el principio está escrito en el pilar de rendimiento, como una forma de usar mejor la tecnología.",
      },
      {
        id: "C",
        text: "Escalar horizontalmente para aumentar la disponibilidad de la carga",
        correct: true,
        explanation:
          "Correcta. Fiabilidad propone reemplazar un recurso grande por varios pequeños, para que la falla de uno no tumbe toda la carga. Es la trampa al revés: muchas veces Auto Scaling y 'más instancias' se leen como rendimiento, pero cuando el objetivo es que una sola falla no lo detenga todo, es fiabilidad.",
      },
      {
        id: "D",
        text: "Adoptar un modelo de consumo",
        correct: false,
        explanation:
          "Adoptar un modelo de consumo es un principio de optimización de costos: pagar solo por los recursos que se usan y apagarlos cuando no hacen falta. Puede tentar porque escalar según la demanda también aparece en fiabilidad. Pero este principio habla de cuánto se paga, no de seguir funcionando ante una falla.",
      },
      {
        id: "E",
        text: "Realizar las operaciones como código",
        correct: false,
        explanation:
          "Realizar las operaciones como código es un principio de excelencia operativa: definir la infraestructura y los procedimientos en código para repetirlos sin errores manuales. Tienta porque automatizar ayuda a recuperarse rápido. Pero el principio pertenece al pilar que trata de cómo se opera el sistema, no al que trata de cómo resiste los fallos.",
      },
    ],
    tips: [
      "Los principios de fiabilidad: recuperarse automáticamente, probar la recuperación, escalar horizontalmente, dejar de adivinar la capacidad y gestionar el cambio con automatización.",
      "Escalar horizontalmente aparece en fiabilidad porque varios recursos pequeños toleran la pérdida de uno; no es solo una cuestión de velocidad.",
    ],
  },
  {
    id: "ref2-gr-d1-q04",
    topic: "1",
    prompt:
      "Con AWS Compute Optimizer, un equipo descubre que sus instancias usan en promedio el 8 % de CPU. Las cambia por un tamaño más chico, el tiempo de respuesta queda igual y la factura mensual baja un 40 %. ¿Qué pilar del Well-Architected Framework guía este cambio?",
    options: [
      {
        id: "A",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "El pilar de eficiencia de rendimiento trata de elegir los recursos que dan la mejor velocidad para la carga y de revisar esa elección a medida que cambia la tecnología. Tienta porque el cambio consiste en 'elegir otro tipo de instancia', que es una tarea típica de ese pilar. Pero el tiempo de respuesta no mejoró: lo único que cambió es cuánto se paga.",
      },
      {
        id: "B",
        text: "Fiabilidad",
        correct: false,
        explanation:
          "El pilar de fiabilidad trata de que la carga siga funcionando ante fallos y de tener la capacidad necesaria sin adivinarla. Puede aparecer porque cambiar el tamaño de las instancias toca la capacidad. Pero el enunciado no habla de fallas ni de quedarse sin capacidad: las instancias estaban casi vacías.",
      },
      {
        id: "C",
        text: "Excelencia operativa",
        correct: false,
        explanation:
          "El pilar de excelencia operativa trata de operar y mejorar el sistema con procesos: monitoreo, runbooks, cambios pequeños y aprendizaje de los incidentes. Tienta porque revisar métricas con una herramienta suena a buena operación. Pero la revisión se hizo para gastar menos, y eso la ubica en otro pilar.",
      },
      {
        id: "D",
        text: "Optimización de costos",
        correct: true,
        explanation:
          "Correcta. El pilar de optimización de costos incluye ajustar el tamaño de los recursos a lo que la carga usa de verdad (rightsizing). Instancias al 8 % de CPU son capacidad pagada y desperdiciada; achicarlas sin perder velocidad es ahorrar.",
      },
    ],
    tips: [
      "Si el rendimiento no cambia y lo único que baja es el costo, el pilar es optimización de costos.",
      "Elegir el tipo de instancia aparece en dos pilares: para ganar velocidad es rendimiento, para pagar menos es costos. Decide el objetivo, no la acción.",
    ],
  },
  {
    id: "ref2-gr-d1-q05",
    topic: "1",
    prompt:
      "Una tienda usa un grupo de Auto Scaling para sus servidores web. ¿En cuál de estos casos el objetivo principal de Auto Scaling es la fiabilidad, es decir, recuperarse de un fallo?",
    options: [
      {
        id: "A",
        text: "Agrega instancias cuando la CPU sube durante una oferta para mantener el tiempo de respuesta",
        correct: false,
        explanation:
          "Agregar instancias cuando sube la demanda es escalado dinámico: el grupo crece para que cada servidor tenga menos trabajo y responda igual de rápido. Es el uso más conocido de Auto Scaling, y por eso tienta. Escalar con la demanda también evita que los servidores se saturen, y por eso el framework lo menciona en fiabilidad. Pero aquí no falló nada: el objetivo que nombra la opción es mantener el tiempo de respuesta, y eso es eficiencia de rendimiento.",
      },
      {
        id: "B",
        text: "Reemplaza una instancia que no pasó la comprobación de estado para mantener la capacidad mínima",
        correct: true,
        explanation:
          "Correcta. Cuando una instancia falla la comprobación de estado, Auto Scaling la termina y lanza otra para no quedar por debajo de la capacidad mínima. Eso es recuperarse automáticamente de un fallo, el primer principio del pilar de fiabilidad.",
      },
      {
        id: "C",
        text: "Pasa a lanzar instancias de una generación más nueva que procesan más solicitudes por segundo",
        correct: false,
        explanation:
          "Cambiar a una generación más nueva de instancias es actualizar la plantilla de lanzamiento para usar hardware más capaz. Tienta porque lo hace el mismo grupo de Auto Scaling. Pero el beneficio que nombra la opción, procesar más solicitudes por segundo, es eficiencia de rendimiento.",
      },
      {
        id: "D",
        text: "Reduce el grupo a dos instancias durante la madrugada, cuando casi no hay visitas",
        correct: false,
        explanation:
          "Reducir el grupo cuando baja la demanda es escalar hacia adentro: se apagan las instancias que no hacen falta. Tienta porque es Auto Scaling ajustando la capacidad. Pero apagar lo que no se usa para no pagarlo es optimización de costos.",
      },
    ],
    tips: [
      "Auto Scaling sirve a varios pilares: reemplazar lo que falla es fiabilidad pura; crecer con la demanda aparece en rendimiento y en fiabilidad; achicarse cuando no hay demanda es costos.",
      "Decide el objetivo, no la herramienta: sobrevivir a un fallo es fiabilidad, responder más rápido es rendimiento, pagar menos es costos.",
    ],
  },
  {
    id: "ref2-gr-d1-q06",
    topic: "1",
    multiple: true,
    prompt:
      "Un arquitecto revisa su carga con la lente de eficiencia de rendimiento, es decir, buscando que responda más rápido con los recursos adecuados. ¿Qué dos principios forman parte de ese pilar? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Democratizar las tecnologías avanzadas",
        correct: true,
        explanation:
          "Correcta. Eficiencia de rendimiento propone consumir como servicio administrado lo que sería muy difícil construir (bases de datos especializadas, aprendizaje automático, transcodificación), en lugar de que el equipo aprenda a operarlo desde cero.",
      },
      {
        id: "B",
        text: "Hacerse global en minutos",
        correct: true,
        explanation:
          "Correcta. Eficiencia de rendimiento propone desplegar en varias regiones del mundo para acercar la aplicación a los usuarios y bajar la latencia, algo que en la nube toma minutos.",
      },
      {
        id: "C",
        text: "Recuperarse automáticamente de los fallos",
        correct: false,
        explanation:
          "Recuperarse automáticamente de los fallos es el principio central del pilar de fiabilidad: vigilar indicadores y disparar la recuperación sin intervención humana. Tienta porque la recuperación automática suele usar las mismas herramientas que el rendimiento, como Auto Scaling. Pero su objetivo es seguir funcionando ante un fallo, no ser más rápido.",
      },
      {
        id: "D",
        text: "Analizar y atribuir el gasto",
        correct: false,
        explanation:
          "Analizar y atribuir el gasto es un principio de optimización de costos: saber cuánto cuesta cada carga y cada equipo para decidir dónde ahorrar. Puede tentar porque el análisis de métricas aparece en todos los pilares. Pero este principio mide dinero, no velocidad.",
      },
      {
        id: "E",
        text: "Anticipar los fallos",
        correct: false,
        explanation:
          "Anticipar los fallos es un principio de excelencia operativa: hacer simulacros (game days) y análisis previos para encontrar los puntos débiles antes de que causen un incidente. Tienta porque suena a preparar el sistema para la carga. Pero se trata de preparar al equipo y sus procesos, no de que la aplicación responda más rápido.",
      },
    ],
    tips: [
      "Los principios de eficiencia de rendimiento: democratizar tecnologías avanzadas, hacerse global en minutos, usar arquitecturas sin servidor, experimentar más seguido y considerar la afinidad mecánica.",
      "Cuando un principio habla de fallos (recuperarse o anticiparlos), no es de rendimiento: es de fiabilidad o de excelencia operativa.",
    ],
  },
];
