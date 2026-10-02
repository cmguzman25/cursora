import type { ExamQuestionWithDomain } from "../../../types";

/**
 * Dominio 1 — Conceptos de la nube. 16 de las 65 preguntas del simulacro
 * (24,6 %, contra el 24 % oficial), repartidas entre 1.1 beneficios, 1.2
 * Well-Architected, 1.3 migración y AWS CAF, y 1.4 economía de la nube.
 *
 * A diferencia de los bancos por módulo, acá las explicaciones se leen todas
 * juntas al final del simulacro, sin la lección delante: cada una recuerda el
 * concepto en una frase antes de decir por qué la opción falla.
 */
export const SIM_D1: ExamQuestionWithDomain[] = [
  {
    id: "sim-d1-q01",
    domain: "1",
    prompt:
      "Un equipo de desarrollo tardaba entre seis y ocho semanas en conseguir que el área de infraestructura le entregara un servidor de pruebas. Después de migrar a AWS, levanta el mismo entorno en minutos y lo apaga cuando termina. ¿Qué beneficio de la nube describe mejor este cambio?",
    options: [
      {
        id: "A",
        text: "Agilidad",
        correct: true,
        explanation:
          "Correcta. La agilidad es poder conseguir recursos en minutos en vez de en semanas, lo que permite probar ideas rápido y descartar las que no funcionan sin haber comprado nada. El escenario contrasta justamente un plazo de semanas contra uno de minutos.",
      },
      {
        id: "B",
        text: "Elasticidad",
        correct: false,
        explanation:
          "La elasticidad es que los recursos crezcan y se achiquen solos según la demanda. Es un beneficio real de la nube, pero acá no se habla de demanda variable: se habla de cuánto tarda el equipo en obtener un servidor.",
      },
      {
        id: "C",
        text: "Alta disponibilidad",
        correct: false,
        explanation:
          "La alta disponibilidad es que el sistema siga funcionando aunque falle un componente, normalmente repartiéndolo en varias Zonas de disponibilidad. El escenario no menciona fallas ni continuidad del servicio.",
      },
      {
        id: "D",
        text: "Economía de escala",
        correct: false,
        explanation:
          "La economía de escala explica por qué AWS puede cobrar más barato que un centro de datos propio: compra para millones de clientes. Es un beneficio de costo, no de velocidad de entrega.",
      },
    ],
    tips: [
      "Cuando el enunciado compara **plazos** (semanas contra minutos), está hablando de agilidad. Cuando compara **capacidad** (picos y valles), de elasticidad.",
      "Agilidad y elasticidad se confunden porque las dos suenan a flexibilidad. La pregunta que las separa es: ¿lo que cambia es el tiempo de entrega o la cantidad de recursos?",
    ],
  },
  {
    id: "sim-d1-q02",
    domain: "1",
    prompt:
      "Un comercio electrónico recibe diez veces más tráfico durante tres días de liquidación y vuelve a su volumen normal el resto del año. Quiere atender esos picos sin pagar esa capacidad los 362 días restantes. ¿Qué característica de la nube resuelve esto?",
    options: [
      {
        id: "A",
        text: "Alcance de la infraestructura global",
        correct: false,
        explanation:
          "El alcance global es poder desplegar en Regiones de otros continentes para acercarte a tus usuarios. Resuelve la latencia geográfica, no el costo de un pico de tráfico puntual.",
      },
      {
        id: "B",
        text: "Elasticidad",
        correct: true,
        explanation:
          "Correcta. La elasticidad es exactamente esto: los recursos crecen cuando la demanda sube y se achican cuando baja, así que se paga por lo que se usa en cada momento. Un pico de tres días seguido de 362 de calma es el caso de uso canónico.",
      },
      {
        id: "C",
        text: "Agilidad",
        correct: false,
        explanation:
          "La agilidad es la velocidad para conseguir recursos y probar ideas. Acá el equipo no necesita obtener algo nuevo más rápido: necesita que lo que ya tiene se adapte solo a la demanda.",
      },
      {
        id: "D",
        text: "Tolerancia a fallos",
        correct: false,
        explanation:
          "La tolerancia a fallos es seguir funcionando cuando algo se rompe. Un pico de tráfico previsto no es una falla, y escalar para atenderlo no es tolerancia a fallos.",
      },
    ],
    tips: [
      "Las palabras **pico, estacional, variable, impredecible** apuntan a elasticidad.",
      "Si el enunciado insiste en **no pagar la capacidad cuando no se usa**, está describiendo elasticidad y el modelo de pago por uso, no disponibilidad.",
    ],
  },
  {
    id: "sim-d1-q03",
    domain: "1",
    prompt:
      "Una empresa con su aplicación alojada únicamente en Norteamérica acaba de abrir operaciones en Asia, y sus nuevos usuarios se quejan de que la aplicación responde lento. ¿Qué beneficio de AWS le permite mejorar la experiencia de esos usuarios?",
    options: [
      {
        id: "A",
        text: "Elasticidad",
        correct: false,
        explanation:
          "La elasticidad ajusta la cantidad de recursos a la demanda. Agregar más servidores en Norteamérica no reduce el tiempo que tardan los datos en cruzar el Pacífico: el problema es la distancia, no la capacidad.",
      },
      {
        id: "B",
        text: "Economía de escala",
        correct: false,
        explanation:
          "La economía de escala es por qué AWS puede cobrar precios bajos. No tiene relación con la latencia que percibe un usuario del otro lado del mundo.",
      },
      {
        id: "C",
        text: "Alcance de la infraestructura global",
        correct: true,
        explanation:
          "Correcta. AWS tiene Regiones en todo el mundo, así que la aplicación se puede desplegar también en una Región de Asia (o distribuir su contenido desde ubicaciones de borde) y acercar los datos a los usuarios. Eso es lo que reduce la latencia.",
      },
      {
        id: "D",
        text: "Alta disponibilidad",
        correct: false,
        explanation:
          "La alta disponibilidad evita que una falla deje el servicio caído. Los usuarios de Asia no reportan que la aplicación esté caída: reportan que está lenta, que es un problema distinto.",
      },
    ],
    tips: [
      "**Lentitud según la ubicación del usuario** es latencia, y la latencia se resuelve acercando la infraestructura: otra Región o una ubicación de borde.",
      "No confundas lento con caído. Lento ⇒ infraestructura global o red de distribución. Caído ⇒ alta disponibilidad.",
    ],
  },
  {
    id: "sim-d1-q04",
    domain: "1",
    multiple: true,
    prompt:
      "Una empresa que hoy tiene su propio centro de datos está evaluando pasarse a AWS. ¿Cuáles DOS de los siguientes son ventajas directas de ese cambio? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Cambiar gastos de capital por gastos variables",
        correct: true,
        explanation:
          "Correcta. En un centro de datos propio hay que comprar el hardware por adelantado (gasto de capital). En AWS se paga por el uso, mes a mes, y eso convierte ese desembolso en un gasto operativo variable.",
      },
      {
        id: "B",
        text: "Dejar de necesitar controles de seguridad propios",
        correct: false,
        explanation:
          "Esto es falso y es una trampa frecuente. Por el modelo de responsabilidad compartida, AWS asegura la infraestructura, pero los permisos, la configuración y la protección de los datos siguen siendo del cliente.",
      },
      {
        id: "C",
        text: "Beneficiarse de las economías de escala de AWS",
        correct: true,
        explanation:
          "Correcta. AWS agrega la demanda de cientos de miles de clientes y compra hardware a una escala que ninguna empresa alcanza sola, y traslada parte de ese ahorro al precio por hora. Es una ventaja que ninguna optimización interna de un centro de datos propio puede igualar.",
      },
      {
        id: "D",
        text: "Garantizar que la aplicación nunca va a tener una caída",
        correct: false,
        explanation:
          "Ningún proveedor garantiza cero caídas, y AWS tampoco: publica acuerdos de nivel de servicio con porcentajes, no con promesas absolutas. Además, una aplicación mal diseñada se cae en la nube igual que fuera de ella.",
      },
      {
        id: "E",
        text: "Eliminar la necesidad de hacer copias de respaldo",
        correct: false,
        explanation:
          "Los datos siguen siendo responsabilidad del cliente. AWS ofrece servicios que facilitan los respaldos, pero decidir qué se respalda y con qué frecuencia no se delega.",
      },
    ],
    tips: [
      "Las opciones que prometen **eliminar** una responsabilidad del cliente (seguridad, respaldos) casi siempre son incorrectas: el modelo de responsabilidad compartida no desaparece.",
      "Desconfiá de los absolutos. **Nunca** se va a caer, **garantizado**, **el único** — AWS no redacta así las respuestas correctas.",
      "Las ventajas que el examen sí reconoce suenan a economía o a operación: cambiar capital por gasto variable, aprovechar las economías de escala, dejar de adivinar capacidad, ganar velocidad y llegar a más lugares.",
    ],
  },
  {
    id: "sim-d1-q05",
    domain: "1",
    prompt:
      "Un equipo revisa cada mes qué instancias están sobredimensionadas, apaga los entornos de prueba los fines de semana y etiqueta todo para saber qué área gasta qué. ¿A qué pilar del AWS Well-Architected Framework corresponden estas prácticas?",
    options: [
      {
        id: "A",
        text: "Optimización de costos",
        correct: true,
        explanation:
          "Correcta. Este pilar se ocupa de no gastar más de lo necesario: ajustar el tamaño de los recursos, apagar lo que no se usa y poder atribuir el gasto. Las tres prácticas del escenario son ejemplos directos.",
      },
      {
        id: "B",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "La eficiencia de rendimiento es usar el tipo de recurso adecuado para que el sistema responda bien. Se parece porque también habla de elegir bien el tamaño, pero su objetivo es el rendimiento; acá el objetivo declarado es el gasto.",
      },
      {
        id: "C",
        text: "Excelencia operativa",
        correct: false,
        explanation:
          "La excelencia operativa es cómo se opera y mejora el sistema en el día a día: automatizar, documentar, aprender de los incidentes. Revisar el gasto es una práctica operativa, pero el pilar que la nombra es el de costos.",
      },
      {
        id: "D",
        text: "Sostenibilidad",
        correct: false,
        explanation:
          "La sostenibilidad busca reducir el impacto ambiental del sistema. Apagar recursos sin usar también ayuda ahí, pero el escenario justifica todo por el gasto y por saber quién lo genera, no por el consumo energético.",
      },
    ],
    tips: [
      "Varios pilares recomiendan prácticas parecidas. Lo que decide es **para qué** dice el enunciado que se hacen: ahorrar, responder más rápido, operar mejor o contaminar menos.",
      "La palabra **etiquetar para atribuir el gasto** es casi exclusiva del pilar de optimización de costos.",
    ],
  },
  {
    id: "sim-d1-q06",
    domain: "1",
    prompt:
      "Una empresa quiere reducir la huella ambiental de su infraestructura: piensa elegir Regiones con mayor proporción de energía renovable y achicar el volumen de datos que almacena sin necesidad. ¿Qué pilar del Well-Architected Framework guía estas decisiones?",
    options: [
      {
        id: "A",
        text: "Fiabilidad",
        correct: false,
        explanation:
          "La fiabilidad es que el sistema cumpla su función de forma consistente y se recupere de las fallas. Elegir una Región por su matriz energética no tiene que ver con recuperarse de fallas.",
      },
      {
        id: "B",
        text: "Sostenibilidad",
        correct: true,
        explanation:
          "Correcta. La sostenibilidad es el sexto pilar, incorporado en 2021, y se ocupa de minimizar el impacto ambiental: elegir Regiones más limpias, aprovechar mejor los recursos y no almacenar datos que nadie usa.",
      },
      {
        id: "C",
        text: "Optimización de costos",
        correct: false,
        explanation:
          "Es la confusión esperada, porque borrar datos inútiles también abarata la factura. Pero el escenario declara el objetivo: reducir la huella ambiental. Cuando el enunciado dice para qué, eso manda sobre el efecto secundario.",
      },
      {
        id: "D",
        text: "Seguridad",
        correct: false,
        explanation:
          "El pilar de seguridad protege datos, sistemas y accesos. Reducir el volumen almacenado puede bajar la superficie de riesgo, pero no es la motivación que plantea el escenario.",
      },
    ],
    tips: [
      "Sostenibilidad y optimización de costos recomiendan casi lo mismo. Fijate en el objetivo declarado: **huella ambiental, energía, consumo** ⇒ sostenibilidad; **factura, gasto** ⇒ costos.",
      "Si una pregunta menciona **energía renovable** o **impacto ambiental**, la respuesta es sostenibilidad casi sin leer el resto.",
    ],
  },
  {
    id: "sim-d1-q07",
    domain: "1",
    prompt:
      "Después de cada incidente en producción, un equipo documenta qué pasó, automatiza el paso manual que lo causó y actualiza su guía de respuesta. ¿Qué pilar del Well-Architected Framework representa esta forma de trabajar?",
    options: [
      {
        id: "A",
        text: "Fiabilidad",
        correct: false,
        explanation:
          "La fiabilidad se ocupa de que el sistema resista y se recupere de las fallas: redundancia, respaldos, recuperación ante desastres. Es el pilar más fácil de confundir acá, pero el escenario no habla de cómo aguanta el sistema, sino de cómo mejora el equipo después.",
      },
      {
        id: "B",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "Este pilar busca usar los recursos adecuados para sostener el rendimiento requerido. Documentar incidentes y automatizar tareas manuales no cambia el rendimiento del sistema.",
      },
      {
        id: "C",
        text: "Excelencia operativa",
        correct: true,
        explanation:
          "Correcta. La excelencia operativa es ejecutar y monitorear los sistemas y, sobre todo, mejorar los procesos de forma continua: hacer cambios pequeños y reversibles, automatizar lo manual y aprender de cada falla. Es exactamente lo que describe el escenario.",
      },
      {
        id: "D",
        text: "Seguridad",
        correct: false,
        explanation:
          "El pilar de seguridad protege la información y los accesos. Un incidente operativo no es necesariamente un incidente de seguridad, y el escenario no menciona datos ni permisos.",
      },
    ],
    tips: [
      "Excelencia operativa y fiabilidad se mezclan siempre. La separación corta: fiabilidad es **cómo aguanta el sistema**; excelencia operativa es **cómo trabaja el equipo** que lo opera.",
      "**Aprender de los incidentes, automatizar, mejorar los procesos** son señales de excelencia operativa.",
    ],
  },
  {
    id: "sim-d1-q08",
    domain: "1",
    prompt:
      "Al diseñar una aplicación nueva, un arquitecto quiere evitar la práctica de comprar servidores pensando en la demanda que habrá en tres años. En cambio, planea arrancar con lo mínimo y dejar que la infraestructura crezca sola. ¿Qué principio de diseño de la nube está aplicando?",
    options: [
      {
        id: "A",
        text: "Automatizar para facilitar la experimentación",
        correct: false,
        explanation:
          "Automatizar sirve para hacer y deshacer cambios con bajo costo. El arquitecto probablemente va a automatizar, pero el principio que describe el escenario es sobre la capacidad, no sobre la experimentación.",
      },
      {
        id: "B",
        text: "Hacer cambios pequeños y reversibles",
        correct: false,
        explanation:
          "Es un principio real del marco, orientado a que un cambio fallido se pueda deshacer. No es lo que plantea el escenario, que habla de cuánta capacidad comprar y cuándo.",
      },
      {
        id: "C",
        text: "Diseñar pensando en la falla",
        correct: false,
        explanation:
          "Diseñar para la falla es asumir que los componentes se van a romper y prever la redundancia. El escenario no menciona fallas: menciona cómo dimensionar al principio.",
      },
      {
        id: "D",
        text: "Dejar de adivinar la capacidad necesaria",
        correct: true,
        explanation:
          "Correcta. Este es uno de los principios de diseño de la nube: en vez de estimar la demanda futura y comprar de más o de menos, se arranca con lo necesario y se escala según la demanda real. El escenario lo describe literalmente.",
      },
    ],
    tips: [
      "Los principios de diseño se reconocen por el problema que evitan. Este evita el **sobredimensionamiento por estimación**.",
      "Cuando el enunciado describe un problema del modelo tradicional y cómo la nube lo elimina, la respuesta suele ser el principio enunciado en negativo: *dejar de* adivinar, *dejar de* comprar de más.",
    ],
  },
  {
    id: "sim-d1-q09",
    domain: "1",
    prompt:
      "Una empresa tiene que vaciar su centro de datos en cuatro meses porque se le vence el alquiler. Decide mover sus aplicaciones a EC2 tal como están, sin modificar el código, y dejar cualquier rediseño para más adelante. ¿Qué estrategia de migración está usando?",
    options: [
      {
        id: "A",
        text: "Rehosting",
        correct: true,
        explanation:
          "Correcta. El rehosting, también llamado *lift and shift*, mueve la aplicación tal cual a la nube sin cambiarla. Es la estrategia más rápida, y por eso es la que se elige cuando hay una fecha límite dura y no hay tiempo para rediseñar.",
      },
      {
        id: "B",
        text: "Replatforming",
        correct: false,
        explanation:
          "El replatforming mueve la aplicación haciendo algunos ajustes menores, por ejemplo pasando su base de datos a un servicio administrado. El escenario dice explícitamente que no se modifica nada, así que descarta esta opción.",
      },
      {
        id: "C",
        text: "Refactoring",
        correct: false,
        explanation:
          "El refactoring rediseña la aplicación para aprovechar la nube, por ejemplo partiéndola en servicios o pasándola a serverless. Es la estrategia más lenta y costosa: lo contrario de lo que pide un plazo de cuatro meses.",
      },
      {
        id: "D",
        text: "Repurchasing",
        correct: false,
        explanation:
          "El repurchasing reemplaza la aplicación por un producto comercial listo para usar. El escenario no habla de cambiar de producto, sino de mover el que ya tienen.",
      },
    ],
    tips: [
      "Las palabras **tal como está, sin cambios, lift and shift, plazo corto** apuntan siempre a rehosting.",
      "Las 6 R se ordenan por cuánto cambia la aplicación. Si el enunciado dice cuánto se puede cambiar, ya eligió la estrategia.",
    ],
  },
  {
    id: "sim-d1-q10",
    domain: "1",
    prompt:
      "Una empresa migra una aplicación Java a AWS. Mantiene el código de la aplicación casi intacto, pero en vez de seguir administrando su propio servidor de base de datos MySQL, pasa esa base a Amazon RDS. ¿Qué estrategia de migración describe esto?",
    options: [
      {
        id: "A",
        text: "Rehosting",
        correct: false,
        explanation:
          "El rehosting movería la base de datos a una instancia EC2 y seguiría administrándola igual que antes. Acá se cambió a un servicio administrado, así que hubo una modificación real de la plataforma.",
      },
      {
        id: "B",
        text: "Replatforming",
        correct: true,
        explanation:
          "Correcta. El replatforming mueve la aplicación con ajustes menores para aprovechar algo de la nube, sin rediseñarla. Cambiar una base de datos autoadministrada por RDS, dejando el código como está, es el ejemplo típico.",
      },
      {
        id: "C",
        text: "Refactoring",
        correct: false,
        explanation:
          "El refactoring implica rediseñar la aplicación: partirla en microservicios, pasarla a Lambda, cambiar su arquitectura. El escenario aclara que el código queda casi intacto.",
      },
      {
        id: "D",
        text: "Retain",
        correct: false,
        explanation:
          "Retain es decidir no migrar y dejar el sistema donde está. Acá la aplicación efectivamente se migró.",
      },
    ],
    tips: [
      "Rehosting y replatforming se confunden constantemente. La pregunta que los separa: **¿se cambió algo de la plataforma?** Pasar a un servicio administrado ya es replatforming.",
      "**Ajustes menores, sin rediseñar, aprovechar un servicio administrado** son las señales de replatforming.",
    ],
  },
  {
    id: "sim-d1-q11",
    domain: "1",
    prompt:
      "Durante el inventario previo a una migración, una empresa descubre que 40 de sus 200 aplicaciones no las usa nadie desde hace más de dos años. ¿Qué estrategia corresponde aplicar a esas 40?",
    options: [
      {
        id: "A",
        text: "Retain",
        correct: false,
        explanation:
          "Retain es dejar el sistema donde está porque hay una razón para no moverlo todavía: una regulación, una dependencia, un costo. Pero el sistema se sigue manteniendo. Para algo que nadie usa, seguir manteniéndolo es el peor resultado.",
      },
      {
        id: "B",
        text: "Rehosting",
        correct: false,
        explanation:
          "Rehosting las movería tal cual a la nube. Migrar 40 aplicaciones que nadie usa es pagar por mover algo que habría que apagar: es la trampa principal de esta pregunta.",
      },
      {
        id: "C",
        text: "Retire",
        correct: true,
        explanation:
          "Correcta. Retire es dar de baja lo que ya no aporta valor, en vez de migrarlo. El inventario previo a una migración suele revelar un 10 a 20 % de sistemas en esta condición, y apagarlos es el ahorro más inmediato de todo el proyecto.",
      },
      {
        id: "D",
        text: "Repurchasing",
        correct: false,
        explanation:
          "Repurchasing cambia la aplicación por un producto comercial equivalente. No tiene sentido comprar un reemplazo para algo que nadie usa.",
      },
    ],
    tips: [
      "Retire y Retain son las dos únicas estrategias en las que la aplicación **no termina en la nube**, y el examen las contrapone seguido. Retire la apaga; Retain la deja donde está.",
      "**Nadie la usa, no aporta valor, obsoleta** ⇒ Retire. **Hay una razón para esperar** ⇒ Retain.",
    ],
  },
  {
    id: "sim-d1-q12",
    domain: "1",
    prompt:
      "El proyecto de migración de una empresa se está atrasando: los equipos de operaciones no saben manejar las herramientas nuevas y nadie definió quién aprueba los cambios en la nube. ¿Qué marco de AWS está pensado para organizar justamente estos aspectos no técnicos?",
    options: [
      {
        id: "A",
        text: "El AWS Well-Architected Framework",
        correct: false,
        explanation:
          "El Well-Architected Framework evalúa si una arquitectura está bien construida, con sus 6 pilares. Es sobre el sistema, no sobre la preparación de la organización que lo va a operar.",
      },
      {
        id: "B",
        text: "Las 6 R de migración",
        correct: false,
        explanation:
          "Las 6 R deciden qué hacer con cada aplicación concreta: moverla, ajustarla, rediseñarla, reemplazarla, apagarla o dejarla. No dicen nada sobre capacitación ni sobre quién aprueba los cambios.",
      },
      {
        id: "C",
        text: "El modelo de responsabilidad compartida",
        correct: false,
        explanation:
          "El modelo de responsabilidad compartida delimita qué asegura AWS y qué asegura el cliente. Es un marco de seguridad, no un plan de adopción.",
      },
      {
        id: "D",
        text: "El AWS Cloud Adoption Framework (AWS CAF)",
        correct: true,
        explanation:
          "Correcta. El AWS CAF organiza la adopción de la nube en 6 perspectivas, y las de **personas** y **gobierno** son exactamente las que cubren la capacitación de los equipos y la definición de quién aprueba qué. El CAF existe porque las migraciones fallan más por estos motivos que por los técnicos.",
      },
    ],
    tips: [
      "La regla corta: si la pregunta habla de **personas, procesos o gobierno**, es CAF. Si habla de **cómo está construido el sistema**, es Well-Architected. Si habla de **una aplicación que hay que mudar**, son las 6 R.",
      "Que los dos marcos tengan 6 elementos es una coincidencia que el examen aprovecha. Los pilares son del sistema; las perspectivas, de la organización.",
    ],
  },
  {
    id: "sim-d1-q13",
    domain: "1",
    prompt:
      "El director financiero de una empresa nota que, después de migrar a AWS, el gasto en tecnología dejó de aparecer como una compra grande cada tres o cuatro años y empezó a aparecer como un monto mensual que varía con el uso. ¿Cómo se describe este cambio?",
    options: [
      {
        id: "A",
        text: "Se pasó de un gasto de capital a un gasto operativo",
        correct: true,
        explanation:
          "Correcta. Comprar servidores es un gasto de capital: un desembolso grande por adelantado, por un activo que se amortiza en años. Pagar AWS por uso es un gasto operativo: montos recurrentes que acompañan la actividad real del negocio.",
      },
      {
        id: "B",
        text: "Se pasó de un gasto operativo a un gasto de capital",
        correct: false,
        explanation:
          "Es la dirección inversa. La nube convierte la compra de activos en gasto corriente, no al revés. Esta opción está para castigar a quien reconoce los dos términos pero no cuál es cuál.",
      },
      {
        id: "C",
        text: "Se eliminó el costo total de propiedad",
        correct: false,
        explanation:
          "El costo total de propiedad no se elimina: se recalcula. Sigue habiendo costos, solo que cambian de naturaleza y, en general, dejan de incluir el centro de datos, su energía y su mantenimiento.",
      },
      {
        id: "D",
        text: "Se aplicó una economía de escala",
        correct: false,
        explanation:
          "La economía de escala explica por qué el precio unitario de AWS es bajo: agrega la demanda de millones de clientes. Es una razón del precio, no una descripción de cómo se contabiliza el gasto.",
      },
    ],
    tips: [
      "Memorizá la dirección, no solo los términos: la nube va **de capital a operativo**. Las preguntas suelen ofrecer las dos direcciones como opciones.",
      "Las señales de gasto de capital son **comprar, por adelantado, cada tantos años**; las de gasto operativo, **mensual, por uso, variable**.",
    ],
  },
  {
    id: "sim-d1-q14",
    domain: "1",
    prompt:
      "Al planificar su migración, una empresa confirma que sus contratos de licencia de Microsoft SQL Server siguen vigentes y se pueden trasladar. Quiere evitar contratar instancias cuyo precio por hora ya trae el costo de esa licencia incorporado. ¿Qué modelo de licenciamiento le corresponde?",
    options: [
      {
        id: "A",
        text: "License Included",
        correct: false,
        explanation:
          "Con License Included la licencia viene incorporada al precio por hora que cobra AWS. Es cómodo para quien no tiene licencias, pero acá la empresa ya las compró: usar este modelo sería pagarlas dos veces. Es el distractor principal de la pregunta.",
      },
      {
        id: "B",
        text: "Bring Your Own License (BYOL)",
        correct: true,
        explanation:
          "Correcta. BYOL permite llevar licencias que la empresa ya posee y aplicarlas a los recursos de AWS, así que solo se paga la infraestructura. Es la respuesta cuando el enunciado menciona licencias existentes o perpetuas.",
      },
      {
        id: "C",
        text: "Savings Plans",
        correct: false,
        explanation:
          "Los Savings Plans son un modelo de descuento por comprometerse a cierto gasto por hora durante 1 o 3 años. Afectan el precio del cómputo, no el licenciamiento del software.",
      },
      {
        id: "D",
        text: "Dedicated Hosts",
        correct: false,
        explanation:
          "Los Dedicated Hosts dan un servidor físico completo, y a veces son el requisito para licencias que se cuentan por servidor físico. Pero son el tipo de hardware, no el modelo de licenciamiento que la pregunta pide nombrar.",
      },
    ],
    tips: [
      "**Licencias que ya tiene la empresa** ⇒ BYOL. **No tiene licencias y quiere que vengan incluidas** ⇒ License Included.",
      "BYOL y License Included son la confusión clásica de este tema, y la pista está siempre en si el enunciado dice que las licencias ya existen.",
    ],
  },
  {
    id: "sim-d1-q15",
    domain: "1",
    prompt:
      "Un informe muestra que muchas instancias EC2 de una empresa usan menos del 10 % de su CPU de forma sostenida. El equipo decide pasarlas a tipos de instancia más chicos. ¿Cómo se llama esta práctica?",
    options: [
      {
        id: "A",
        text: "Escalado automático",
        correct: false,
        explanation:
          "El escalado automático agrega o quita instancias según la demanda, de forma continua y sin intervención. Acá nadie agrega ni quita instancias: se cambia el tamaño de las que ya existen, y es una decisión puntual.",
      },
      {
        id: "B",
        text: "Facturación consolidada",
        correct: false,
        explanation:
          "La facturación consolidada junta las facturas de varias cuentas de AWS Organizations en una sola, y permite sumar el uso para los descuentos por volumen. No tiene relación con el tamaño de las instancias.",
      },
      {
        id: "C",
        text: "Economía de escala",
        correct: false,
        explanation:
          "La economía de escala es el motivo por el que AWS puede ofrecer precios bajos: agrega la demanda de muchísimos clientes. Es una propiedad del proveedor, no una práctica que aplique el cliente.",
      },
      {
        id: "D",
        text: "Rightsizing",
        correct: true,
        explanation:
          "Correcta. El rightsizing es ajustar el tamaño de los recursos a lo que realmente se usa, comparando el uso medido contra la capacidad asignada. Una CPU al 10 % sostenido es el caso de libro.",
      },
    ],
    tips: [
      "Rightsizing y escalado automático se mezclan porque los dos ajustan recursos. El rightsizing cambia **el tamaño** de lo que hay; el escalado cambia **la cantidad**.",
      "Cuando el enunciado da un porcentaje bajo de uso sostenido, está describiendo un recurso sobredimensionado, y la respuesta es rightsizing.",
    ],
  },
  {
    id: "sim-d1-q16",
    domain: "1",
    multiple: true,
    prompt:
      "Una empresa está armando el caso de negocio para migrar a la nube. ¿Cuáles DOS de los siguientes costos, propios de operar un centro de datos, dejaría de tener al pasarse a AWS? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "El consumo eléctrico y la refrigeración de las salas de servidores",
        correct: true,
        explanation:
          "Correcta. La energía y la refrigeración del centro de datos son costos que absorbe AWS y que suelen olvidarse al comparar precios. Son parte de lo que hace que el costo total de propiedad del modelo propio sea más alto de lo que parece.",
      },
      {
        id: "B",
        text: "La capacitación del equipo en las herramientas que usa",
        correct: false,
        explanation:
          "La capacitación no desaparece: cambia de tema. De hecho, la perspectiva de personas del AWS CAF existe porque migrar exige formar a los equipos, y no hacerlo es una causa frecuente de proyectos atrasados.",
      },
      {
        id: "C",
        text: "El reemplazo del hardware cuando termina su vida útil",
        correct: true,
        explanation:
          "Correcta. En el modelo propio hay que renovar los servidores cada tres a cinco años, con otro desembolso grande. En AWS el hardware es de AWS, así que ese ciclo de reemplazo deja de ser un costo del cliente.",
      },
      {
        id: "D",
        text: "El desarrollo y el mantenimiento de las aplicaciones propias",
        correct: false,
        explanation:
          "Las aplicaciones siguen siendo de la empresa y hay que seguir desarrollándolas y manteniéndolas. La nube cambia dónde corren, no quién las escribe.",
      },
      {
        id: "E",
        text: "La transferencia de datos hacia internet",
        correct: false,
        explanation:
          "Este costo no solo no desaparece: es uno de los que aparecen en AWS y sorprenden en la primera factura. Los datos que entran son gratis, pero los que salen hacia internet se cobran por gigabyte.",
      },
    ],
    tips: [
      "Lo que desaparece es lo atado al **edificio y al hardware físico**: energía, refrigeración, espacio, reemplazo de equipos. Lo que sigue es lo atado a **las personas y al software propio**.",
      "Cuidado con las opciones que suenan a ahorro pero describen un costo nuevo de la nube. La transferencia de salida es el ejemplo más repetido.",
      "Cuando una pregunta compara el centro de datos propio contra la nube, está midiendo si entendés el **costo total de propiedad**, no solo el precio del servidor.",
    ],
  },
];
