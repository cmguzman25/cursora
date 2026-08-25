import type { ExamQuizQuestion } from "../../types";

/**
 * Question bank for lesson "08-analisis-preguntas-modulo-1" (Módulo 1 —
 * Conceptos de la nube). 20 questions spread across the whole module
 * (benefits, Well-Architected, CAF + the 6 R's, cloud economics), not just
 * the last topic seen — see CONTRATO-DE-CLASES.md.
 */
export const MODULE_1_QUESTIONS: ExamQuizQuestion[] = [
  {
    id: "m1-q01",
    prompt:
      "El equipo de una tienda en línea siempre compraba servidores propios calculando el pico de tráfico de diciembre. El resto del año, esos servidores quedaban usados a la mitad de su capacidad. ¿Cuál beneficio de AWS Cloud resuelve mejor este problema?",
    options: [
      {
        id: "A",
        text: "Alcanzar el mundo entero en minutos",
        correct: false,
        explanation:
          "Este beneficio habla de desplegar en Regiones de otros continentes con pocos clics. El problema de la tienda no es de alcance geográfico, sino de comprar más capacidad de la que usa casi todo el año.",
      },
      {
        id: "B",
        text: "Dejar de adivinar la capacidad",
        correct: true,
        explanation:
          "En la nube podés escalar hacia arriba en diciembre y hacia abajo el resto del año, pagando solo por lo que usás en cada momento. Ya no hace falta comprar pensando en el peor caso posible.",
      },
      {
        id: "C",
        text: "Beneficiarse de economías de escala",
        correct: false,
        explanation:
          "Las economías de escala hacen que el precio por unidad baje porque AWS compra a gran volumen y traslada ese ahorro a sus clientes. Es un beneficio real, pero no resuelve el problema de comprar de más \"por las dudas\".",
      },
      {
        id: "D",
        text: "Cambiar gasto de capital por gasto variable",
        correct: false,
        explanation:
          "Es cierto que ya no compra el servidor y en cambio paga por uso — pero ese beneficio habla de cómo se paga, no de ajustar la capacidad a la demanda real. En el examen, elegí siempre la opción que responde exactamente lo que pregunta el escenario, no la que simplemente también es verdadera.",
      },
    ],
    tips: [
      "Cuando el escenario menciona \"no sé cuánta capacidad voy a necesitar\" o \"el tráfico varía mucho\", casi siempre apunta a elasticidad / dejar de adivinar la capacidad.",
      "CapEx vs. OpEx y economías de escala aparecen seguido como distractores en preguntas de capacidad: son beneficios reales, pero responden una pregunta distinta a la que se está haciendo.",
      "Antes de mirar las opciones, intentá responder la pregunta con tus propias palabras — te hace menos vulnerable a una opción que \"suena bien\" pero no es exacta.",
    ],
  },
  {
    id: "m1-q02",
    prompt:
      "Un equipo de DevOps quiere detectar automáticamente cuando un despliegue nuevo falla, revertirlo sin intervención manual, y mantener guías (runbooks) actualizadas para reducir errores humanos en operaciones futuras. ¿Qué pilar del AWS Well-Architected Framework describe mejor esta práctica?",
    options: [
      {
        id: "A",
        text: "Fiabilidad",
        correct: false,
        explanation:
          "Fiabilidad se enfoca en que el sistema se recupere solo de una falla técnica (por ejemplo, un balanceador que saca de servicio una instancia caída). Acá el foco no es la recuperación automática del sistema, sino cómo el equipo opera y corrige errores humanos — eso es Excelencia operativa.",
      },
      {
        id: "B",
        text: "Excelencia operativa",
        correct: true,
        explanation:
          "Excelencia operativa trata justamente sobre operar y mejorar los sistemas con el tiempo: automatizar cambios, responder a eventos y definir estándares (como runbooks) para las operaciones diarias — exactamente lo que describe el escenario.",
      },
      {
        id: "C",
        text: "Seguridad",
        correct: false,
        explanation:
          "Seguridad protege la información y los sistemas: control de accesos, cifrado, detección de amenazas. El escenario no menciona proteger datos ni accesos, sino un proceso operativo.",
      },
      {
        id: "D",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "Eficiencia de rendimiento es usar el tipo y tamaño correcto de recursos según la carga de trabajo. No tiene relación con revertir despliegues ni con mantener runbooks.",
      },
    ],
    tips: [
      "Cuando el escenario habla de \"automatizar cambios\", \"runbooks\", \"monitorear y responder a eventos\" o \"aprender de los fallos\", casi siempre es Excelencia operativa — aunque también se mencione una falla.",
      "Fiabilidad y Excelencia operativa se confunden seguido: Fiabilidad es que el sistema se recupere solo; Excelencia operativa es cómo el equipo opera y mejora los procesos alrededor del sistema.",
      "Memorizá los 6 pilares con su pregunta clave (como en la tabla comparativa ★1.5) — te ayuda a descartar rápido las opciones que no responden esa pregunta puntual.",
    ],
  },
  {
    id: "m1-q03",
    prompt:
      "Una empresa debe abandonar su centro de datos en 4 meses porque no le renovaron el contrato de alquiler. Necesita mover 60 aplicaciones a AWS lo más rápido posible, y por ahora no le importa aprovechar funcionalidades nativas de la nube. ¿Qué estrategia de migración es la más adecuada?",
    options: [
      {
        id: "A",
        text: "Refactoring (re-arquitectura)",
        correct: false,
        explanation:
          "Refactoring rediseña la aplicación desde cero para aprovechar al máximo la nube. Es la estrategia que mejor resultado da, pero también la que más tiempo y esfuerzo consume — justo lo que esta empresa no tiene.",
      },
      {
        id: "B",
        text: "Repurchasing",
        correct: false,
        explanation:
          "Repurchasing reemplaza la aplicación por un producto distinto, normalmente un SaaS. Cambiar 60 aplicaciones por productos nuevos implicaría migrar datos, reentrenar usuarios y rehacer integraciones: mucho más lento, no más rápido.",
      },
      {
        id: "C",
        text: "Retain",
        correct: false,
        explanation:
          "Retain significa dejar el sistema donde está por ahora. No es una opción viable acá: el centro de datos se cierra en 4 meses, así que quedarse no está sobre la mesa.",
      },
      {
        id: "D",
        text: "Rehosting (lift and shift)",
        correct: true,
        explanation:
          "Rehosting mueve la aplicación tal cual está, sin cambiarle nada. Es la forma más rápida de migrar, y por eso es la respuesta típica cuando el escenario tiene una fecha límite ajustada o muchas aplicaciones que mover de golpe.",
      },
    ],
    tips: [
      "Palabras como \"lo más rápido posible\", \"con el mínimo cambio\" o \"sin modificar la aplicación\" apuntan casi siempre a Rehosting.",
      "Ordená mentalmente las 6 R por esfuerzo: Retire y Retain (nada), Rehosting (poco), Replatforming (algo), Repurchasing y Refactoring (mucho). El escenario casi siempre te dice cuánto esfuerzo se puede pagar.",
      "Ojo con la trampa de elegir la \"mejor práctica\" en abstracto: Refactoring suena a la respuesta más profesional, pero el examen premia la que encaja con las restricciones del escenario.",
    ],
  },
  {
    id: "m1-q04",
    prompt:
      "Durante la planificación de una migración, el director de tecnología detecta que su equipo de infraestructura solo tiene experiencia con servidores físicos y no sabe operar en la nube. Quiere organizar capacitaciones y definir nuevos roles antes de migrar. ¿Qué perspectiva del AWS Cloud Adoption Framework (AWS CAF) cubre esta preocupación?",
    options: [
      {
        id: "A",
        text: "Perspectiva de Personas",
        correct: true,
        explanation:
          "La perspectiva de Personas cubre justamente esto: si el equipo tiene las habilidades necesarias para trabajar en la nube, qué capacitación hace falta y cómo cambian los roles. Es una de las capacidades de negocio del CAF, no una técnica.",
      },
      {
        id: "B",
        text: "Perspectiva de Plataforma",
        correct: false,
        explanation:
          "Plataforma trata sobre cómo se diseña e implementa la arquitectura técnica en la nube. Es una perspectiva técnica, no la que se ocupa de las habilidades del equipo.",
      },
      {
        id: "C",
        text: "Perspectiva de Operaciones",
        correct: false,
        explanation:
          "Operaciones se ocupa de cómo se van a operar, monitorear y mantener los sistemas una vez migrados. Está relacionada con el día a día del sistema, no con formar al equipo antes de migrar.",
      },
      {
        id: "D",
        text: "Perspectiva de Gobierno",
        correct: false,
        explanation:
          "Gobierno define las políticas sobre cómo se gestionan y controlan los recursos en la nube (presupuestos, estándares, cumplimiento). Es un distractor frecuente, pero el escenario habla de habilidades y roles, no de políticas de control.",
      },
    ],
    tips: [
      "Agrupá las 6 perspectivas en dos bloques: negocio (Negocio, Personas, Gobierno) y técnicas (Plataforma, Seguridad, Operaciones). Ya con eso descartás la mitad de las opciones.",
      "Cuando el escenario menciona capacitación, habilidades, cultura o cambios de rol, la respuesta es Personas prácticamente siempre.",
      "Gobierno y Operaciones se confunden seguido: Gobierno define las reglas y el control; Operaciones ejecuta y mantiene el sistema en el día a día.",
    ],
  },
  {
    id: "m1-q05",
    prompt:
      "Un equipo revisa mensualmente su factura de AWS, identifica instancias que quedaron encendidas sin usarse y apaga las que ya no hacen falta, para no pagar por recursos que nadie necesita. ¿Qué pilar del AWS Well-Architected Framework están aplicando?",
    options: [
      {
        id: "A",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "Eficiencia de rendimiento es usar el tipo y tamaño de recurso correcto para que el sistema rinda bien. Se parece, pero su objetivo es el rendimiento; acá el objetivo declarado es no pagar de más.",
      },
      {
        id: "B",
        text: "Excelencia operativa",
        correct: false,
        explanation:
          "Excelencia operativa es operar y mejorar los sistemas con el tiempo (automatización, runbooks, respuesta a eventos). Revisar la factura es una rutina operativa, sí, pero el pilar que nombra explícitamente el objetivo de evitar gastos innecesarios es otro.",
      },
      {
        id: "C",
        text: "Optimización de costos",
        correct: true,
        explanation:
          "Optimización de costos responde a la pregunta \"¿evitás gastar en algo que no necesitás?\". Detectar recursos ociosos y apagarlos es el ejemplo más directo de este pilar.",
      },
      {
        id: "D",
        text: "Sostenibilidad",
        correct: false,
        explanation:
          "Sostenibilidad busca minimizar el impacto ambiental de la carga de trabajo. Apagar recursos ociosos también ayuda al ambiente, pero el escenario justifica la acción por el gasto, no por el impacto ambiental.",
      },
    ],
    tips: [
      "Sostenibilidad y Optimización de costos comparten muchas acciones (apagar lo que no se usa). Fijate en el motivo que da el escenario: si habla de plata, es Costos; si habla de energía o impacto ambiental, es Sostenibilidad.",
      "Eficiencia de rendimiento responde \"¿el recurso es del tamaño correcto para rendir bien?\"; Optimización de costos responde \"¿estoy pagando algo que no necesito?\". Son preguntas distintas aunque la acción se parezca.",
      "Cuando dos pilares parezcan válidos, releé la frase que explica *por qué* el equipo hace lo que hace — ahí suele estar la palabra que decide.",
    ],
  },
  {
    id: "m1-q06",
    prompt:
      "Una empresa compara el costo de mantener su propio centro de datos contra migrar a AWS. El gerente financiero solo está comparando el precio de compra de los servidores contra el precio mensual de las instancias EC2. ¿Cuáles DOS costos del centro de datos propio está dejando fuera de su análisis de costo total de propiedad (TCO)?",
    multiple: true,
    options: [
      {
        id: "A",
        text: "El costo de transferencia de datos de salida de AWS",
        correct: false,
        explanation:
          "Este es un costo del lado de AWS, no del centro de datos propio. La pregunta apunta a lo que falta en la columna del centro de datos, no en la de AWS.",
      },
      {
        id: "B",
        text: "La electricidad y la refrigeración del centro de datos",
        correct: true,
        explanation:
          "Correcta. Alimentar y enfriar los servidores es un costo real y continuo de tener hardware propio, y es de los que más se olvidan al comparar solo precios de lista.",
      },
      {
        id: "C",
        text: "El precio de compra de los servidores físicos",
        correct: false,
        explanation:
          "Este costo el gerente ya lo está contando: el enunciado dice que compara justamente el precio de compra de los servidores contra el de las instancias EC2. La pregunta apunta a lo que le falta sumar, no a lo que ya incluyó.",
      },
      {
        id: "D",
        text: "El sueldo del personal técnico que mantiene el hardware",
        correct: true,
        explanation:
          "Correcta. Alguien tiene que instalar, reparar y reemplazar los equipos. Ese tiempo cuesta dinero y forma parte del TCO, aunque no aparezca en la factura del proveedor de servidores.",
      },
      {
        id: "E",
        text: "El costo de los planes de soporte de AWS",
        correct: false,
        explanation:
          "También es un costo del lado de AWS. Igual que la opción A, va en la otra columna de la comparación.",
      },
    ],
    tips: [
      "TCO significa sumar TODO lo que cuesta ser dueño de algo, no solo el precio de compra: espacio físico, energía, refrigeración, personal, reemplazo de hardware y tiempo de inactividad.",
      "En preguntas de TCO, leé con cuidado de qué lado de la comparación te están preguntando — meter costos de AWS en la columna del centro de datos propio es la trampa más común.",
      "En las preguntas de respuesta múltiple el examen te dice cuántas opciones elegir. Si dudás entre tres, descartá primero la que pertenece a otra categoría en vez de buscar la \"más correcta\".",
    ],
  },
  {
    id: "m1-q07",
    prompt:
      "Un equipo de producto quiere probar una idea nueva. Antes tenía que pedir servidores, esperar semanas a que llegaran e instalarlos; ahora levanta el entorno en minutos y, si la idea no funciona, lo apaga sin haber comprado nada. ¿Qué beneficio de la nube describe esta situación?",
    options: [
      {
        id: "A",
        text: "Aumentar la velocidad y la agilidad",
        correct: true,
        explanation:
          "Exacto. La agilidad es poder conseguir recursos en minutos en vez de semanas, lo que permite experimentar barato y rápido: si la idea falla, se apaga sin haber gastado en hardware que ahora sobra.",
      },
      {
        id: "B",
        text: "Beneficiarse de economías de escala",
        correct: false,
        explanation:
          "Las economías de escala explican por qué AWS puede ofrecer precios más bajos que los que conseguiría la empresa por su cuenta. Es un beneficio de precio, no de velocidad para lanzar un experimento.",
      },
      {
        id: "C",
        text: "Dejar de gastar en mantener centros de datos",
        correct: false,
        explanation:
          "Ese beneficio es sobre no ocuparse del enfriamiento, la seguridad física y el personal 24 horas del centro de datos. El escenario no habla de mantenimiento, sino de cuánto tarda el equipo en tener el entorno listo.",
      },
      {
        id: "D",
        text: "Alcanzar el mundo entero en minutos",
        correct: false,
        explanation:
          "Este beneficio es sobre desplegar en Regiones de otros continentes rápidamente. El \"en minutos\" del enunciado se refiere a levantar un entorno, no a llegar a usuarios de otro país — leé qué es lo que se hace rápido.",
      },
    ],
    tips: [
      "Varios beneficios comparten la palabra \"minutos\". Preguntate *qué* se logra en minutos: si es levantar recursos, es agilidad; si es llegar a otro continente, es alcance global.",
      "\"Experimentar\", \"probar una idea\", \"fallar barato\" y \"time to market\" son señales fuertes de agilidad/velocidad.",
      "Los 6 beneficios se preguntan siempre disfrazados de escenario, nunca como lista. Practicá traduciendo cada situación a una de las seis frases.",
    ],
  },
  {
    id: "m1-q08",
    prompt:
      "Una empresa ya pagó licencias perpetuas de un motor de base de datos comercial y quiere seguir usándolas al migrar a AWS, en vez de pagar de nuevo por instancias que ya incluyen el costo de la licencia. ¿Qué concepto le permite hacerlo?",
    options: [
      {
        id: "A",
        text: "Rightsizing",
        correct: false,
        explanation:
          "Rightsizing es elegir el tamaño de recurso que corresponde a la necesidad real, ni de más ni de menos. Ayuda a no pagar de más por capacidad, pero no tiene nada que ver con licencias.",
      },
      {
        id: "B",
        text: "License Included",
        correct: false,
        explanation:
          "License Included es el camino opuesto: el costo de la licencia ya viene incluido en el precio de la instancia. Le sirve a quien NO tiene licencia propia — pero esta empresa ya pagó las suyas y justamente quiere evitar pagarlas dos veces.",
      },
      {
        id: "C",
        text: "Repurchasing",
        correct: false,
        explanation:
          "Repurchasing es reemplazar la aplicación por otro producto, típicamente SaaS. Eso sería abandonar la licencia actual, justo lo contrario de lo que la empresa quiere hacer.",
      },
      {
        id: "D",
        text: "BYOL (Bring Your Own License)",
        correct: true,
        explanation:
          "BYOL es exactamente esto: traer una licencia que la empresa ya pagó, para no pagarla dos veces. La alternativa es \"License Included\", donde el costo de la licencia viene incluido en el precio de la instancia.",
      },
    ],
    tips: [
      "Cuando el escenario menciona licencias que la empresa ya compró, pensá en BYOL. Cuando dice que prefiere no gestionar licencias, pensá en License Included.",
      "Rightsizing, BYOL y TCO son los tres conceptos de economía de la nube que más se mezclan como distractores entre sí. Asociá cada uno a una palabra: tamaño (rightsizing), licencia (BYOL), comparación total (TCO).",
      "Que una opción sea un término real de AWS no la vuelve correcta — el examen llena las opciones incorrectas con conceptos verdaderos que responden otra pregunta.",
    ],
  },
  {
    id: "m1-q09",
    prompt:
      "Durante el inventario previo a una migración, un equipo clasifica cada aplicación con una de las 6 estrategias de migración. ¿Cuáles DOS estrategias NO implican mover la aplicación a la nube?",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Rehosting",
        correct: false,
        explanation:
          "Rehosting sí mueve la aplicación a la nube, tal cual está y sin cambios. Es la migración más simple, pero migración al fin.",
      },
      {
        id: "B",
        text: "Retire",
        correct: true,
        explanation:
          "Correcta. Retire es dar de baja algo que ya no se usa, en vez de migrarlo. La aplicación desaparece: nunca llega a la nube.",
      },
      {
        id: "C",
        text: "Replatforming",
        correct: false,
        explanation:
          "Replatforming mueve la aplicación a la nube haciéndole algunos cambios puntuales para aprovecharla mejor, sin rediseñarla por completo.",
      },
      {
        id: "D",
        text: "Repurchasing",
        correct: false,
        explanation:
          "Repurchasing reemplaza la aplicación por otro producto, normalmente un SaaS que corre en la nube. Cambia la herramienta, pero el resultado igual queda en la nube.",
      },
      {
        id: "E",
        text: "Retain",
        correct: true,
        explanation:
          "Correcta. Retain es dejar el sistema donde está por ahora — por regulaciones, costo o prioridades. No se elimina, pero tampoco se migra.",
      },
    ],
    tips: [
      "De las 6 R, solo Retire y Retain no terminan con la aplicación corriendo en la nube. Es un detalle chico que el examen pregunta seguido.",
      "No confundas Retire (se elimina, ya no se usa) con Retain (se conserva donde está, se pospone la decisión). La diferencia entre las dos es exactamente lo que se evalúa.",
      "Cuando la pregunta esté en negativo (\"¿cuáles NO...?\"), marcá mentalmente esa palabra antes de leer las opciones — es un error clásico responder la pregunta contraria por leer rápido.",
    ],
  },
  {
    id: "m1-q10",
    prompt:
      "Un equipo revisa sus instancias EC2 y descubre que muchas fueron creadas con un tamaño muy superior al que la carga real necesita, así que las reemplaza por instancias más chicas. ¿Cómo se llama esta práctica?",
    options: [
      {
        id: "A",
        text: "Replatforming",
        correct: false,
        explanation:
          "Replatforming es una estrategia de migración: mover una aplicación a la nube haciéndole algunos cambios puntuales. Acá la aplicación ya está en AWS, así que no se está migrando nada.",
      },
      {
        id: "B",
        text: "Elasticidad",
        correct: false,
        explanation:
          "La elasticidad es que la capacidad suba y baje sola según la demanda, de forma automática. Acá el ajuste lo hace el equipo a mano después de un análisis, que es una decisión distinta.",
      },
      {
        id: "C",
        text: "Rightsizing",
        correct: true,
        explanation:
          "Correcto. Rightsizing es elegir el tamaño de recurso que corresponde a la necesidad real. Como en AWS la capacidad se ajusta fácilmente, es algo que se revisa de forma continua, no una decisión que se toma una sola vez.",
      },
      {
        id: "D",
        text: "BYOL",
        correct: false,
        explanation:
          "BYOL es traer una licencia propia para no pagarla dos veces. No tiene relación con el tamaño de las instancias.",
      },
    ],
    tips: [
      "Rightsizing (una decisión de tamaño, revisada periódicamente) y elasticidad (ajuste automático según la demanda) se confunden muy seguido. Si el escenario dice \"automáticamente\" o \"según la demanda\", es elasticidad.",
      "Rightsizing aplica tanto a instancias como a bases de datos y almacenamiento, no solo a EC2.",
      "Si el escenario habla de una carga que YA está en AWS, descartá de entrada las 6 R: esas son estrategias para migrar, no para optimizar lo que ya migraste.",
    ],
  },
  {
    id: "m1-q11",
    prompt:
      "El director financiero de una empresa mediana no entiende por qué AWS puede ofrecerle un precio por servidor más bajo del que él consigue negociando directamente con un fabricante de hardware. ¿Qué beneficio de la nube explica esa diferencia?",
    options: [
      {
        id: "A",
        text: "Dejar de adivinar la capacidad",
        correct: false,
        explanation:
          "Ese beneficio es sobre poder subir y bajar la capacidad según la demanda real, en vez de comprar por adelantado adivinando. Habla de cuánta capacidad usás, no de por qué el precio unitario es más bajo.",
      },
      {
        id: "B",
        text: "Cambiar gasto fijo por gasto variable",
        correct: false,
        explanation:
          "Este beneficio explica que pasás de pagar una suma grande por adelantado a pagar según el uso. Cambia *cómo* pagás, pero no explica por qué el precio en sí es más barato.",
      },
      {
        id: "C",
        text: "Beneficiarse de economías de escala",
        correct: true,
        explanation:
          "AWS compra infraestructura para millones de clientes a la vez, y ese volumen le consigue precios que una empresa sola jamás obtendría. Parte de ese ahorro se traslada a los clientes: eso son las economías de escala.",
      },
      {
        id: "D",
        text: "Aumentar la velocidad y la agilidad",
        correct: false,
        explanation:
          "La agilidad es conseguir recursos en minutos en vez de semanas. Es un beneficio de tiempo, no de precio unitario.",
      },
    ],
    tips: [
      "Si la pregunta es \"¿por qué AWS sale más barato por unidad?\", la respuesta es economías de escala. Si es \"¿por qué me conviene financieramente?\", suele ser gasto fijo → gasto variable.",
      "Economías de escala es de los pocos beneficios que describe algo que hace AWS, no algo que hacés vos. Ese detalle ayuda a reconocerlo.",
      "Muchos escenarios de beneficios se resuelven identificando el sustantivo clave del enunciado: precio, tiempo, capacidad o alcance geográfico.",
    ],
  },
  {
    id: "m1-q12",
    prompt:
      "Una aplicación bancaria está diseñada para que, si el servidor que atiende las peticiones deja de responder, el tráfico se redirija solo a otro servidor sano y el usuario ni se entere. ¿Qué pilar del AWS Well-Architected Framework describe mejor este diseño?",
    options: [
      {
        id: "A",
        text: "Fiabilidad",
        correct: true,
        explanation:
          "Fiabilidad responde a \"¿el sistema se recupera solo de una falla?\". Que el tráfico se desvíe automáticamente a un servidor sano es el ejemplo clásico de este pilar.",
      },
      {
        id: "B",
        text: "Excelencia operativa",
        correct: false,
        explanation:
          "Excelencia operativa es cómo el equipo opera y mejora los sistemas (automatizar cambios, runbooks, aprender de los incidentes). Acá no hay nadie operando: el sistema se recupera solo por cómo fue diseñado.",
      },
      {
        id: "C",
        text: "Seguridad",
        correct: false,
        explanation:
          "Seguridad protege la información y los accesos. Que sea una aplicación bancaria hace pensar en seguridad, pero el escenario no menciona proteger datos: describe qué pasa cuando un servidor falla.",
      },
      {
        id: "D",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "Eficiencia de rendimiento es usar el tipo y tamaño de recurso adecuado para que el sistema rinda bien. El escenario no habla de rendimiento, sino de seguir funcionando ante una falla.",
      },
    ],
    tips: [
      "Compará con la pregunta sobre runbooks y despliegues: si el SISTEMA se recupera solo, es Fiabilidad; si el EQUIPO mejora cómo opera, es Excelencia operativa.",
      "Cuidado con el contexto decorativo: \"aplicación bancaria\" empuja a elegir Seguridad, pero el pilar se decide por lo que se describe, no por el rubro de la empresa.",
      "Señales de Fiabilidad: recuperarse de fallas, tolerancia a fallos, respaldos, alta disponibilidad, seguir funcionando si algo se cae.",
    ],
  },
  {
    id: "m1-q13",
    prompt:
      "Una empresa tiene un sistema de gestión de recursos humanos propio, viejo y caro de mantener. Aprovechando la migración, decide abandonarlo por completo y contratar en su lugar un producto SaaS de un proveedor externo. ¿Qué estrategia de migración aplicó?",
    options: [
      {
        id: "A",
        text: "Refactoring (re-arquitectura)",
        correct: false,
        explanation:
          "Refactoring es rediseñar la propia aplicación desde cero para aprovechar la nube. Acá la empresa no rediseña nada: directamente deja de usar su sistema y contrata otro producto.",
      },
      {
        id: "B",
        text: "Replatforming",
        correct: false,
        explanation:
          "Replatforming conserva la aplicación y le hace algunos cambios puntuales para que aproveche mejor la nube. Acá la aplicación original se descarta entera, no se ajusta.",
      },
      {
        id: "C",
        text: "Rehosting (lift and shift)",
        correct: false,
        explanation:
          "Rehosting mueve la aplicación tal cual está. La empresa hizo lo contrario: no la movió, la reemplazó por un producto distinto.",
      },
      {
        id: "D",
        text: "Repurchasing",
        correct: true,
        explanation:
          "Repurchasing es exactamente esto: reemplazar la aplicación por un producto distinto, típicamente un SaaS. Se cambia la herramienta en lugar de mudar la que ya se tenía.",
      },
    ],
    tips: [
      "Palabras como \"SaaS\", \"contratar un producto\", \"cambiar de proveedor\" o \"licencia comercial en vez de sistema propio\" apuntan a Repurchasing.",
      "Repurchasing y Refactoring son las dos estrategias más profundas, pero se distinguen fácil: en Refactoring seguís siendo dueño de la aplicación (rediseñada); en Repurchasing la abandonás por otra.",
      "Preguntate siempre: al terminar la migración, ¿la empresa sigue usando la MISMA aplicación? Si la respuesta es no, es Repurchasing o Retire.",
    ],
  },
  {
    id: "m1-q14",
    prompt:
      "Antes de migrar, una empresa desembolsaba una suma grande cada cuatro años para renovar sus servidores. Después de migrar a AWS, recibe una factura mensual calculada según lo que efectivamente consumió. ¿Cómo se describe este cambio en términos de economía de la nube?",
    options: [
      {
        id: "A",
        text: "Pasó de rightsizing a análisis de TCO",
        correct: false,
        explanation:
          "Rightsizing (elegir el tamaño correcto de recurso) y TCO (sumar todos los costos de ser dueño) son conceptos reales, pero ninguno de los dos describe un cambio en la forma de pagar. La opción mezcla dos términos que no se oponen entre sí.",
      },
      {
        id: "B",
        text: "Pasó de gasto de capital (CapEx) a gasto operativo (OpEx)",
        correct: true,
        explanation:
          "Correcto. CapEx es desembolsar una suma grande por adelantado para comprar un activo propio; OpEx es pagar por un servicio según el uso, mes a mes. Ese es exactamente el cambio que describe el escenario.",
      },
      {
        id: "C",
        text: "Pasó de gasto operativo (OpEx) a gasto de capital (CapEx)",
        correct: false,
        explanation:
          "Está invertido. Comprar servidores propios cada cuatro años es CapEx; pagar una factura mensual por uso es OpEx. La empresa fue de CapEx hacia OpEx, no al revés.",
      },
      {
        id: "D",
        text: "Pasó de License Included a BYOL",
        correct: false,
        explanation:
          "Esos dos términos son sobre licencias de software (si vienen incluidas en el precio de la instancia o si traés la tuya). El escenario habla del hardware y de la forma de pagar, no de licencias.",
      },
    ],
    tips: [
      "Asociá CapEx a \"comprar\" (una suma grande, por adelantado, un activo que después mantenés vos) y OpEx a \"alquilar\" (pagás según el uso y otro se encarga del mantenimiento).",
      "El examen adora poner la opción invertida (OpEx → CapEx) entre las alternativas. Leé el orden de la flecha antes de marcar.",
      "La nube casi siempre mueve el gasto de CapEx hacia OpEx. Si ves la dirección contraria en una opción, sospechá de entrada.",
    ],
  },
  {
    id: "m1-q15",
    prompt:
      "Una empresa se propone reducir la huella de carbono de sus cargas de trabajo: elige Regiones alimentadas con más energía renovable y rediseña procesos para que consuman menos recursos. ¿Qué pilar del AWS Well-Architected Framework está aplicando?",
    options: [
      {
        id: "A",
        text: "Optimización de costos",
        correct: false,
        explanation:
          "Optimización de costos busca no gastar plata en lo que no se necesita. Muchas de estas acciones también abaratan la factura, pero el escenario justifica todo por el impacto ambiental, no por el gasto.",
      },
      {
        id: "B",
        text: "Excelencia operativa",
        correct: false,
        explanation:
          "Excelencia operativa es cómo se opera y mejora el sistema con el tiempo. Rediseñar procesos suena operativo, pero el objetivo declarado acá es ambiental, y hay un pilar dedicado a eso.",
      },
      {
        id: "C",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "Eficiencia de rendimiento es usar el recurso del tamaño y tipo correcto para que el sistema rinda bien. Consumir menos recursos ayuda al rendimiento, pero el fin buscado es reducir el impacto ambiental.",
      },
      {
        id: "D",
        text: "Sostenibilidad",
        correct: true,
        explanation:
          "Sostenibilidad es el pilar que apunta a minimizar el impacto ambiental de la carga de trabajo: elegir Regiones más limpias, consumir menos y aprovechar mejor lo que se usa.",
      },
    ],
    tips: [
      "Sostenibilidad y Optimización de costos comparten casi las mismas acciones. Lo que las separa es el MOTIVO: si el enunciado dice plata, factura o ahorro, es Costos; si dice huella de carbono, energía o ambiente, es Sostenibilidad.",
      "Sostenibilidad es el pilar más nuevo del framework (son 6, no 5). Si en una opción aparece una lista de cinco pilares, ojo: puede estar desactualizada.",
      "Cuando dos pilares expliquen la misma acción, subrayá mentalmente la frase que dice para qué se hace — ahí está la respuesta.",
    ],
  },
  {
    id: "m1-q16",
    prompt:
      "Antes de migrar, una empresa define quién puede crear recursos en AWS, qué presupuesto tiene asignado cada área y cómo se va a medir que esas reglas se cumplan. ¿Qué perspectiva del AWS Cloud Adoption Framework (AWS CAF) cubre este trabajo?",
    options: [
      {
        id: "A",
        text: "Perspectiva de Gobierno",
        correct: true,
        explanation:
          "Gobierno es la perspectiva que define las políticas de cómo se gestionan y controlan los recursos en la nube: presupuestos, estándares, quién puede hacer qué y cómo se mide el cumplimiento.",
      },
      {
        id: "B",
        text: "Perspectiva de Operaciones",
        correct: false,
        explanation:
          "Operaciones se ocupa de operar, monitorear y mantener los sistemas una vez que ya están funcionando. Gobierno escribe las reglas; Operaciones trabaja dentro de ellas en el día a día.",
      },
      {
        id: "C",
        text: "Perspectiva de Seguridad",
        correct: false,
        explanation:
          "Seguridad se asegura de que los controles de protección de datos y accesos se cumplan durante y después de la migración. Se superpone con Gobierno, pero acá el foco son presupuestos y reglas de gestión, no la protección de la información.",
      },
      {
        id: "D",
        text: "Perspectiva de Negocio",
        correct: false,
        explanation:
          "Negocio se pregunta si la migración realmente ayuda a los objetivos de la empresa o se hace \"porque sí\". Justifica el para qué del proyecto, no cómo se controlan los recursos una vez aprobado.",
      },
    ],
    tips: [
      "Regla corta para el CAF: Negocio = por qué; Personas = quiénes y con qué habilidades; Gobierno = con qué reglas y presupuesto; Plataforma = cómo se construye; Seguridad = cómo se protege; Operaciones = cómo se mantiene.",
      "Presupuesto, políticas, estándares y cumplimiento son casi siempre Gobierno.",
      "Recordá que Negocio, Personas y Gobierno son las capacidades de negocio, y Plataforma, Seguridad y Operaciones las técnicas. Si el escenario no es técnico, la respuesta está en el primer grupo.",
    ],
  },
  {
    id: "m1-q17",
    prompt:
      "Tras completar su migración, el equipo de infraestructura de una empresa dejó de ocuparse de la refrigeración de las salas, los generadores de respaldo y la seguridad física del edificio, y pasó a dedicar ese tiempo a mejorar el producto que vende la empresa. ¿Qué beneficio de la nube describe esto?",
    options: [
      {
        id: "A",
        text: "Alcanzar el mundo entero en minutos",
        correct: false,
        explanation:
          "Ese beneficio es sobre desplegar en Regiones de otros continentes rápidamente. El escenario no menciona usuarios en otros países ni despliegues nuevos.",
      },
      {
        id: "B",
        text: "Beneficiarse de economías de escala",
        correct: false,
        explanation:
          "Las economías de escala explican por qué el precio por unidad de AWS es más bajo. El escenario no habla de precios, sino de en qué dejó de trabajar el equipo.",
      },
      {
        id: "C",
        text: "Dejar de gastar dinero en operar y mantener centros de datos",
        correct: true,
        explanation:
          "Exacto. Refrigeración, generadores, seguridad física y personal 24 horas son el trabajo de \"mantener el edificio\" que con AWS pasa a hacer AWS, y libera al equipo para dedicarse al producto.",
      },
      {
        id: "D",
        text: "Dejar de adivinar la capacidad",
        correct: false,
        explanation:
          "Ese beneficio es sobre ajustar la capacidad a la demanda real en vez de comprar por adelantado. El escenario no menciona nada sobre cuántos recursos se necesitan.",
      },
    ],
    tips: [
      "Señales de este beneficio: refrigeración, energía, racks, seguridad física, personal del centro de datos, y la idea de \"dedicarse a lo que diferencia al negocio\".",
      "Este beneficio y la agilidad se parecen porque ambos terminan en \"el equipo se enfoca en el producto\". La diferencia: agilidad es sobre la VELOCIDAD para conseguir recursos; este es sobre dejar de hacer el TRABAJO de mantener el hardware.",
      "En inglés aparece como \"stop spending money running and maintaining data centers\" — reconocerlo en ambos idiomas ayuda si te toca una pregunta con vocabulario poco familiar.",
    ],
  },
  {
    id: "m1-q18",
    prompt:
      "Una empresa migra su aplicación a AWS y aprovecha para reemplazar la base de datos que administraba ella misma por Amazon RDS, un servicio gestionado — pero no modifica el código de la aplicación. ¿Qué estrategia de migración usó?",
    options: [
      {
        id: "A",
        text: "Rehosting (lift and shift)",
        correct: false,
        explanation:
          "En rehosting no se cambia absolutamente nada: la aplicación y su base de datos se mueven tal cual. Acá sí hubo un cambio deliberado, pasar a un servicio gestionado.",
      },
      {
        id: "B",
        text: "Replatforming",
        correct: true,
        explanation:
          "Replatforming es justo esto: mover la aplicación haciéndole algunos cambios puntuales que le permiten aprovechar mejor la nube, sin rediseñarla por completo. Pasar a una base de datos gestionada es el ejemplo típico.",
      },
      {
        id: "C",
        text: "Refactoring (re-arquitectura)",
        correct: false,
        explanation:
          "Refactoring implica rediseñar la aplicación desde cero, normalmente reescribiendo su código. El enunciado aclara expresamente que el código no se tocó.",
      },
      {
        id: "D",
        text: "Repurchasing",
        correct: false,
        explanation:
          "Repurchasing sería abandonar la aplicación y contratar otro producto en su lugar. Acá se conserva la misma aplicación, solo cambió el motor de base de datos por debajo.",
      },
    ],
    tips: [
      "Replatforming se resume como \"lift, tinker and shift\": levantar, retocar un poco y mover. El retoque clásico es pasar a un servicio gestionado como RDS.",
      "La frase \"sin cambiar el código de la aplicación\" descarta Refactoring de inmediato. Buscá siempre esa aclaración en el enunciado.",
      "Ordená las tres del medio por cuánto se toca la aplicación: Rehosting (nada) → Replatforming (algunos ajustes) → Refactoring (se rediseña).",
    ],
  },
  {
    id: "m1-q19",
    prompt:
      "Un compañero te pasa una lista de conceptos y asegura que todos son pilares del AWS Well-Architected Framework. ¿Cuáles DOS de los siguientes lo son realmente?",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Eficiencia de rendimiento",
        correct: true,
        explanation:
          "Correcta. Es uno de los 6 pilares, y responde a la pregunta \"¿usás recursos del tipo y tamaño correcto?\".",
      },
      {
        id: "B",
        text: "Escalabilidad",
        correct: false,
        explanation:
          "La escalabilidad es una característica muy real de la nube, pero NO es un pilar del framework. Es de los distractores más efectivos justamente porque suena a que debería serlo.",
      },
      {
        id: "C",
        text: "Automatización",
        correct: false,
        explanation:
          "La automatización aparece como práctica dentro de varios pilares (sobre todo Excelencia operativa), pero no es un pilar en sí misma.",
      },
      {
        id: "D",
        text: "Seguridad",
        correct: true,
        explanation:
          "Correcta. Seguridad es uno de los 6 pilares: proteger la información, los sistemas y los accesos.",
      },
      {
        id: "E",
        text: "Elasticidad",
        correct: false,
        explanation:
          "La elasticidad es la capacidad de subir y bajar recursos según la demanda. Es un concepto central de la nube y uno de los beneficios, pero tampoco es un pilar.",
      },
    ],
    tips: [
      "Los 6 pilares, de memoria: Excelencia operativa, Seguridad, Fiabilidad, Eficiencia de rendimiento, Optimización de costos y Sostenibilidad. Cualquier otra cosa que te ofrezcan no es un pilar.",
      "Escalabilidad, elasticidad, automatización, alta disponibilidad y agilidad son conceptos verdaderos de la nube que el examen usa como falsos pilares. Es una trampa muy frecuente.",
      "Que un término sea correcto por sí solo no lo vuelve la respuesta: fijate siempre qué está preguntando exactamente el enunciado.",
    ],
  },
  {
    id: "m1-q20",
    prompt:
      "Una empresa con sede en Argentina lanza su aplicación y descubre que sus nuevos usuarios en Europa la ven muy lenta. En pocos clics despliega una copia de la aplicación en una Región de AWS ubicada en Europa, y el problema se resuelve. ¿Qué beneficio de la nube aprovechó?",
    options: [
      {
        id: "A",
        text: "Dejar de adivinar la capacidad",
        correct: false,
        explanation:
          "Ese beneficio es sobre ajustar cuántos recursos usás según la demanda real. Acá el problema no era falta de capacidad, sino la distancia física entre los usuarios y los servidores.",
      },
      {
        id: "B",
        text: "Aumentar la velocidad y la agilidad",
        correct: false,
        explanation:
          "Es un distractor muy tentador porque el escenario dice \"en pocos clics\" y menciona lentitud. Pero la agilidad se refiere a la rapidez para conseguir recursos en general; acá lo específico es haber llegado a otro continente.",
      },
      {
        id: "C",
        text: "Beneficiarse de economías de escala",
        correct: false,
        explanation:
          "Las economías de escala explican por qué AWS puede cobrar menos por unidad. El escenario no menciona costos en ningún momento.",
      },
      {
        id: "D",
        text: "Alcanzar el mundo entero en minutos",
        correct: true,
        explanation:
          "Correcto. AWS tiene Regiones repartidas por el mundo listas para usar, así que atender usuarios de otro continente con baja latencia es cuestión de desplegar ahí — sin construir nada físico en ese país.",
      },
    ],
    tips: [
      "Si el escenario nombra países, continentes, usuarios lejanos o latencia geográfica, la respuesta es alcance global, aunque también aparezca la palabra \"rápido\".",
      "Agilidad y alcance global compiten seguido. Preguntate qué es lo que se logra rápido: si son recursos, es agilidad; si es presencia en otra parte del mundo, es alcance global.",
      "Ya llegaste al final del repaso del Módulo 1. Si fallaste varias del mismo tema, volvé a esa lección antes de seguir con el Módulo 2 — conviene más que avanzar con el hueco.",
    ],
  },
];
