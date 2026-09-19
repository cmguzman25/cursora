import type { ExamQuizQuestion } from "../../types";

/**
 * Question bank for lesson "32-analisis-preguntas-modulo-4" (Módulo 4 —
 * Facturación, precios y soporte). 15 questions, per the per-module counts in
 * CONTRATO-DE-CLASES.md, spread across 4.1 (pricing models), 4.2 (billing and
 * cost management) and 4.3 (technical support and resources).
 */
export const MODULE_4_QUESTIONS: ExamQuizQuestion[] = [
  {
    id: "m4-q01",
    prompt:
      "Una empresa corre un sistema de facturación en EC2 que funciona las 24 horas, con una carga estable y conocida, y no piensa cambiar el tipo de instancia en los próximos tres años. ¿Qué modelo de compra le conviene?",
    options: [
      {
        id: "A",
        text: "On-Demand",
        correct: false,
        explanation:
          "On-Demand no pide compromiso, pero justamente por eso es el precio más alto. Para una carga estable que va a correr tres años, pagar la tarifa sin descuento es tirar dinero.",
      },
      {
        id: "B",
        text: "Spot Instances",
        correct: false,
        explanation:
          "Spot es la opción más barata, pero AWS te quita la instancia con 2 minutos de aviso cuando necesita la capacidad. Un sistema de facturación que corre 24 horas no puede interrumpirse así.",
      },
      {
        id: "C",
        text: "Reserved Instances a 3 años",
        correct: true,
        explanation:
          "Correcta. Cuando la carga es estable y se conoce el tipo de instancia, comprometerse por 1 o 3 años baja el precio hasta un 72 %. El escenario dice explícitamente que no va a cambiar de instancia, que es la condición que hace que Reserved sea mejor que las alternativas.",
      },
      {
        id: "D",
        text: "Dedicated Hosts",
        correct: false,
        explanation:
          "Los Dedicated Hosts dan el servidor físico entero y son la opción más cara. Se eligen por licencias atadas al hardware o por normativa de aislamiento, no para ahorrar en una carga estable.",
      },
    ],
    tips: [
      "Buscá siempre **cuánto compromiso acepta el cliente**: sin compromiso ⇒ On-Demand; 1 o 3 años ⇒ Reserved o Savings Plans; interrumpible ⇒ Spot.",
      "Las palabras **estable, predecible, constante o conocida** empujan hacia el compromiso a largo plazo.",
      "Cuando el enunciado aclara que **no va a cambiar de instancia**, está descartando Savings Plans a favor de Reserved: esa frase está puesta a propósito.",
    ],
  },
  {
    id: "m4-q02",
    prompt:
      "Un equipo procesa videos por lotes durante la noche. Si un proceso se corta, puede volver a lanzarse sin consecuencias. Quieren pagar lo menos posible. ¿Qué opción recomendarías?",
    options: [
      {
        id: "A",
        text: "Spot Instances",
        correct: true,
        explanation:
          "Correcta. Spot vende la capacidad sobrante de AWS con hasta 90 % de descuento a cambio de poder quitártela con 2 minutos de aviso. Un trabajo por lotes que se puede relanzar es el caso de uso exacto para el que existe.",
      },
      {
        id: "B",
        text: "Reserved Instances a 1 año",
        correct: false,
        explanation:
          "Reserved ahorra hasta un 72 %, bastante menos que Spot, y obliga a pagar todo el año aunque el proceso corra solo unas horas por noche. Es caro para una carga que además tolera interrupciones.",
      },
      {
        id: "C",
        text: "Instancias On-Demand con Auto Scaling",
        correct: false,
        explanation:
          "Funciona técnicamente, pero es la tarifa sin descuento. El escenario pide pagar lo menos posible y aclara que el trabajo tolera cortes, que es la señal de Spot.",
      },
      {
        id: "D",
        text: "Dedicated Instances",
        correct: false,
        explanation:
          "Las Dedicated Instances dan hardware no compartido y cuestan más que On-Demand. No hay nada en el escenario que pida aislamiento físico.",
      },
    ],
    tips: [
      "**Tolerar interrupciones** es la palabra mágica de Spot. Si el enunciado dice que el trabajo se puede reintentar, pausar o relanzar, la respuesta es Spot.",
      "Al revés también sirve: si dice **producción, crítico, siempre disponible o base de datos**, Spot queda descartado aunque sea el más barato.",
      "Procesamiento **por lotes, renderizado, simulaciones y análisis de datos** son los ejemplos que AWS usa una y otra vez para Spot.",
    ],
  },
  {
    id: "m4-q03",
    prompt:
      "Una empresa tiene licencias de software que se cobran por procesador físico y quiere reutilizarlas en AWS. Necesita ver los sockets y núcleos del servidor donde corre. ¿Qué debe elegir?",
    options: [
      {
        id: "A",
        text: "Instancias On-Demand en una VPC dedicada",
        correct: false,
        explanation:
          "Una VPC es una red privada, no un servidor físico. Aísla el tráfico, pero el hardware por debajo se sigue compartiendo y no se ven los sockets.",
      },
      {
        id: "B",
        text: "Dedicated Hosts",
        correct: true,
        explanation:
          "Correcta. El Dedicated Host te asigna el servidor físico completo y te deja ver sus procesadores y sockets, que es lo que necesitan las licencias contadas por hardware. Es la razón principal por la que existe.",
      },
      {
        id: "C",
        text: "Dedicated Instances",
        correct: false,
        explanation:
          "Es el distractor más tentador: también da hardware no compartido. Pero no te muestra el servidor físico ni sus sockets, así que no sirve para licencias que se cuentan por procesador. Su motivo de uso es el aislamiento, no el licenciamiento.",
      },
      {
        id: "D",
        text: "Savings Plans con la opción BYOL",
        correct: false,
        explanation:
          "Los Savings Plans son una forma de pagar, no un tipo de servidor, y BYOL no es una opción dentro de ellos. Traer tu propia licencia es posible, pero si la licencia se cuenta por hardware hace falta además el Dedicated Host.",
      },
    ],
    tips: [
      "**Licencia atada al hardware físico ⇒ Dedicated Host.** Es prácticamente la única situación en la que el examen lo da por correcto.",
      "Dedicated Instance y Dedicated Host aparecen casi siempre juntos como opciones. El separador es si hace falta **ver** el servidor físico: solo el Host lo muestra.",
      "Si el escenario solo pide 'aislamiento' o 'no compartir con otros clientes' sin hablar de licencias, la respuesta es Dedicated Instance.",
    ],
  },
  {
    id: "m4-q04",
    prompt:
      "Una empresa con diez cuentas de AWS las agrupa bajo AWS Organizations y activa la facturación consolidada. ¿Qué DOS beneficios obtiene? (Elegí 2)",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Los recursos de todas las cuentas se unifican en una sola cuenta",
        correct: false,
        explanation:
          "La facturación consolidada unifica el pago, no los recursos. Cada cuenta sigue con sus propias instancias, sus propios permisos y su propio aislamiento: ese es justamente el motivo por el que se usan varias cuentas.",
      },
      {
        id: "B",
        text: "Los descuentos por volumen se calculan sobre el uso sumado de todas las cuentas",
        correct: true,
        explanation:
          "Correcta. Al agregar el uso de todas las cuentas, el grupo llega antes a los tramos de precio más baratos que si cada cuenta facturara por separado. Es el mismo razonamiento del plan familiar de telefonía.",
      },
      {
        id: "C",
        text: "El soporte técnico pasa automáticamente al plan Enterprise",
        correct: false,
        explanation:
          "El plan de soporte se contrata aparte y no cambia por agrupar cuentas. Organizations y AWS Support son cosas distintas.",
      },
      {
        id: "D",
        text: "Las Reserved Instances y los Savings Plans se comparten entre las cuentas del grupo",
        correct: true,
        explanation:
          "Correcta. Si una cuenta no consume toda la reserva que compró, otra cuenta del grupo la aprovecha. Así no se desperdicia capacidad ya pagada.",
      },
      {
        id: "E",
        text: "AWS aplica automáticamente las recomendaciones de Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor solo recomienda: nunca aplica cambios por su cuenta, ni con facturación consolidada ni sin ella. Decidir qué hacer con cada recomendación siempre es del cliente.",
      },
    ],
    tips: [
      "Los tres beneficios de la facturación consolidada son **una sola factura, descuentos por volumen y reservas compartidas**. El examen suele pedir dos de esos tres.",
      "Cualquier opción que diga que las cuentas **se fusionan** o que los recursos se mezclan es falsa: la separación entre cuentas es el punto de tener varias.",
      "Ojo con los distractores que hacen que una herramienta **actúe sola**. En AWS, Trusted Advisor y Cost Explorer recomiendan; aplicar es siempre del cliente.",
    ],
  },
  {
    id: "m4-q05",
    prompt:
      "Una startup guarda 500 GB de imágenes en Amazon S3 y las entrega a usuarios de todo el mundo. Revisando la factura, encuentra un cargo mucho mayor al esperado. ¿Cuál es la causa más probable?",
    options: [
      {
        id: "A",
        text: "La transferencia de datos de salida hacia internet",
        correct: true,
        explanation:
          "Correcta. Meter datos en AWS es gratis, pero sacarlos hacia internet se cobra por gigabyte. Con contenido que se descarga muchas veces, la salida de datos supera fácilmente al costo de guardarlo.",
      },
      {
        id: "B",
        text: "La subida de las imágenes a S3",
        correct: false,
        explanation:
          "La transferencia de entrada hacia AWS no tiene costo. Es la mitad de la regla que hay que memorizar: entrar gratis, salir se paga.",
      },
      {
        id: "C",
        text: "El almacenamiento de los 500 GB",
        correct: false,
        explanation:
          "500 GB en S3 Standard cuesta poco más de diez dólares al mes. Es un monto chico, conocido y estable: no es el tipo de cargo que sorprende en la factura.",
      },
      {
        id: "D",
        text: "La cantidad de buckets creados",
        correct: false,
        explanation:
          "Crear buckets no tiene costo. Se paga por lo que guardás, por las solicitudes y por la transferencia de salida, nunca por la cantidad de contenedores.",
      },
    ],
    tips: [
      "Memorizá la regla y usala como primer filtro: **entrada gratis, salida paga**. Resuelve sola varias preguntas del dominio.",
      "Si el escenario menciona **usuarios de todo el mundo descargando contenido**, está apuntando a transferencia de salida, y muchas veces la solución que busca es **CloudFront**.",
      "Los distractores suelen ofrecer cargos que **no existen** (crear buckets, crear una VPC, abrir una cuenta). Si nunca escuchaste que algo se cobre, probablemente sea gratis.",
    ],
  },
  {
    id: "m4-q06",
    prompt:
      "Antes de migrar, un cliente quiere saber cuánto le costaría por mes una arquitectura con 4 instancias EC2, una base RDS y 2 TB en S3. Todavía no creó nada en AWS. ¿Qué herramienta usa?",
    options: [
      {
        id: "A",
        text: "AWS Cost Explorer",
        correct: false,
        explanation:
          "Cost Explorer analiza el gasto que **ya ocurrió**, con hasta 12 meses de historial. Si el cliente no creó nada todavía, no hay nada que mostrar.",
      },
      {
        id: "B",
        text: "AWS Pricing Calculator",
        correct: true,
        explanation:
          "Correcta. Es la herramienta para estimar **antes** de gastar: se arma la solución que se está pensando y devuelve un costo mensual estimado. No hace falta tener cuenta ni haber desplegado nada.",
      },
      {
        id: "C",
        text: "AWS Budgets",
        correct: false,
        explanation:
          "Budgets sirve para fijar un techo y recibir avisos cuando el gasto se acerca o lo supera. Necesita que el gasto esté ocurriendo; no estima una arquitectura futura.",
      },
      {
        id: "D",
        text: "El AWS Cost and Usage Report",
        correct: false,
        explanation:
          "El CUR es el detalle línea por línea del consumo real, el nivel de detalle más fino que existe. También es un informe de lo ya gastado, no una estimación.",
      },
    ],
    tips: [
      "Ordená las herramientas de costos por **momento**: estimar antes ⇒ Pricing Calculator; avisar mientras ⇒ Budgets; analizar después ⇒ Cost Explorer.",
      "La frase **'todavía no creó nada'** o 'antes de migrar' descarta de entrada todo lo que necesita historial.",
      "Pricing Calculator es pública: se puede usar sin cuenta de AWS, lo que la hace la respuesta típica para presupuestos y propuestas comerciales.",
    ],
  },
  {
    id: "m4-q07",
    prompt:
      "Un responsable de finanzas quiere recibir un correo automático cuando el gasto mensual del equipo llegue al 80 % de los 5.000 USD asignados. ¿Qué servicio lo resuelve?",
    options: [
      {
        id: "A",
        text: "AWS Cost Explorer",
        correct: false,
        explanation:
          "Cost Explorer muestra y desglosa el gasto en gráficos, e incluso lo proyecta, pero no envía alertas cuando se cruza un umbral. Explica, no avisa.",
      },
      {
        id: "B",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor revisa la configuración de la cuenta y recomienda mejoras, incluidas las de costo. No tiene presupuestos ni umbrales definidos por el cliente.",
      },
      {
        id: "C",
        text: "AWS Cost and Usage Report",
        correct: false,
        explanation:
          "El CUR entrega los datos crudos del consumo para analizarlos con otras herramientas. Es una fuente de datos, no un sistema de alertas.",
      },
      {
        id: "D",
        text: "AWS Budgets",
        correct: true,
        explanation:
          "Correcta. Budgets es la herramienta para fijar un techo de costo o de uso y recibir notificaciones al acercarse, al superarlo o cuando el pronóstico indica que se va a superar antes de fin de mes.",
      },
    ],
    tips: [
      "Las palabras **notificar, alertar, avisar, umbral o límite** apuntan a AWS Budgets, aunque Cost Explorer aparezca entre las opciones.",
      "Budgets también puede avisar por **pronóstico**: antes de cruzar la línea, si el ritmo actual dice que la vas a cruzar.",
      "No lo confundas con **Cost Anomaly Detection**: ese avisa de gastos inusuales **sin** que definas un límite; Budgets avisa sobre la línea que vos pusiste.",
    ],
  },
  {
    id: "m4-q08",
    prompt:
      "Después de tres meses de uso, una empresa quiere ver en qué servicios y en qué Regiones se fue su dinero, con gráficos y filtros, y proyectar el gasto de los próximos meses. ¿Qué herramienta usa?",
    options: [
      {
        id: "A",
        text: "AWS Cost Explorer",
        correct: true,
        explanation:
          "Correcta. Es el panel visual del gasto ya ocurrido: permite mirar hasta 12 meses hacia atrás, filtrar por servicio, Región, cuenta o etiqueta, y proyectar la tendencia hacia adelante.",
      },
      {
        id: "B",
        text: "AWS Pricing Calculator",
        correct: false,
        explanation:
          "La Pricing Calculator estima una arquitectura que todavía no existe. No conoce el consumo real de la cuenta, así que no puede decir dónde se fue el dinero.",
      },
      {
        id: "C",
        text: "AWS Budgets",
        correct: false,
        explanation:
          "Budgets avisa cuando el gasto cruza un umbral, pero no es la herramienta para explorar y desglosar el histórico con gráficos.",
      },
      {
        id: "D",
        text: "AWS Health Dashboard",
        correct: false,
        explanation:
          "El Health Dashboard informa sobre el estado de los servicios de AWS y los eventos que afectan a tus recursos. No tiene relación con los costos.",
      },
    ],
    tips: [
      "Regla corta del tema: **Budgets avisa, Cost Explorer explica.** Si la pregunta es 'en qué se me fue la plata', es Cost Explorer.",
      "Cost Explorer también **recomienda** compras de Reserved Instances y Savings Plans según tu uso real: si una opción menciona esa recomendación, sigue siendo Cost Explorer.",
      "'Gráficos', 'visualizar', 'desglosar' y 'últimos 12 meses' son señales directas de Cost Explorer.",
    ],
  },
  {
    id: "m4-q09",
    prompt:
      "Una empresa ve que gasta 8.000 USD por mes en EC2, pero no puede saber cuánto corresponde al equipo de marketing y cuánto al de ingeniería. ¿Qué necesita implementar?",
    options: [
      {
        id: "A",
        text: "Revisar el desglose por servicio en la consola de facturación",
        correct: false,
        explanation:
          "Ese desglose es justo lo que la empresa ya tiene: sabe que gastó 8.000 USD en EC2. La consola de facturación separa por servicio, nunca por equipo, porque AWS no tiene forma de saber de quién es cada instancia si nadie se lo dijo.",
      },
      {
        id: "B",
        text: "Un presupuesto de AWS Budgets por equipo",
        correct: false,
        explanation:
          "Un presupuesto necesita saber qué gasto le corresponde a cada equipo para poder medirlo. Sin etiquetas, no hay forma de separarlo: Budgets llega después, no antes.",
      },
      {
        id: "C",
        text: "Etiquetas de asignación de costos en los recursos",
        correct: true,
        explanation:
          "Correcta. Las etiquetas son pares de texto (por ejemplo, `Equipo: Marketing`) que se pegan a cada recurso y, una vez activadas en la consola de facturación, permiten filtrar y agrupar el gasto por equipo, proyecto o ambiente.",
      },
      {
        id: "D",
        text: "El AWS Cost and Usage Report",
        correct: false,
        explanation:
          "El CUR trae el máximo detalle del consumo, pero ese detalle es técnico: dice qué recurso consumió qué, no de qué equipo es. Sin etiquetas, tampoco puede atribuirlo.",
      },
    ],
    tips: [
      "Cuando la pregunta es **de quién es el gasto** —equipo, proyecto, departamento, ambiente— la respuesta son las **etiquetas de asignación de costos**.",
      "Las etiquetas son el **paso previo**: ninguna herramienta puede desglosar por área si antes nadie etiquetó los recursos. Por eso suelen ganarle a Budgets o Cost Explorer en este tipo de escenario.",
      "No alcanza con poner la etiqueta: hay que **activarla** como etiqueta de asignación de costos en la consola de facturación para que aparezca en los informes.",
    ],
  },
  {
    id: "m4-q10",
    prompt:
      "Una empresa quiere comprometerse a 3 años para ahorrar, pero prevé cambiar de familia de instancia e incluso mover parte de la carga a Lambda y Fargate. ¿Qué le conviene?",
    options: [
      {
        id: "A",
        text: "Reserved Instances Standard",
        correct: false,
        explanation:
          "Las Standard dan el mayor descuento pero quedan atadas al tipo de instancia elegido y no aplican a Lambda ni a Fargate. El escenario dice explícitamente que la carga va a cambiar.",
      },
      {
        id: "B",
        text: "Compute Savings Plans",
        correct: true,
        explanation:
          "Correcta. El compromiso es un gasto por hora, no una instancia concreta, y el descuento se aplica a EC2, Lambda y Fargate en cualquier familia y Región. Es la opción pensada para quien quiere el ahorro del largo plazo sin perder flexibilidad.",
      },
      {
        id: "C",
        text: "Spot Instances",
        correct: false,
        explanation:
          "Spot no tiene compromiso de 3 años y puede interrumpirse. Es barato, pero no es lo que pide un escenario que habla de comprometerse a largo plazo para una carga que sigue en producción.",
      },
      {
        id: "D",
        text: "EC2 Instance Savings Plans",
        correct: false,
        explanation:
          "Buen distractor: también son Savings Plans, pero quedan atados a una familia de instancias en una Región, y no cubren Lambda ni Fargate. El escenario pide justamente esa flexibilidad.",
      },
    ],
    tips: [
      "**Reserved vs. Savings Plans:** plazo y descuento son parecidos; lo que cambia es a qué te atás. Instancia fija ⇒ Reserved. Gasto por hora y libertad de moverte ⇒ Savings Plans.",
      "Si la pregunta menciona **Lambda o Fargate**, solo los **Compute** Savings Plans los cubren. Es el separador entre los dos tipos de Savings Plan.",
      "La palabra **flexibilidad** en un escenario de compromiso a 1 o 3 años es casi siempre la firma de los Compute Savings Plans.",
    ],
  },
  {
    id: "m4-q11",
    prompt:
      "Una empresa con soporte Business está evaluando pasar a Enterprise. ¿Qué DOS cosas obtendría que hoy no tiene? (Elegí 2)",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Un Technical Account Manager designado para la cuenta",
        correct: true,
        explanation:
          "Correcta. El TAM designado —una persona concreta que conoce la arquitectura del cliente y hace revisiones proactivas— aparece solo en Enterprise. Enterprise On-Ramp da acceso a un grupo de TAM, y Business no tiene TAM.",
      },
      {
        id: "B",
        text: "Soporte técnico 24/7 por teléfono, chat y correo",
        correct: false,
        explanation:
          "Eso ya viene con Business: es justamente el plan donde aparece por primera vez el soporte 24/7 por los tres canales. No sería una novedad al subir.",
      },
      {
        id: "C",
        text: "Acceso al conjunto completo de revisiones de Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor completo, con sus seis categorías, arranca en **Business**. Basic y Developer son los que se quedan con el conjunto reducido.",
      },
      {
        id: "D",
        text: "Respuesta en menos de 15 minutos para un sistema crítico caído",
        correct: true,
        explanation:
          "Correcta. Los 15 minutos para sistema crítico caído son exclusivos de Enterprise. Business no tiene siquiera esa categoría de severidad: su mejor tiempo es 1 hora para producción caída.",
      },
      {
        id: "E",
        text: "Cantidad ilimitada de personas habilitadas para abrir casos de soporte",
        correct: false,
        explanation:
          "Los usuarios ilimitados ya están incluidos en Business. El límite de una sola persona es de Developer.",
      },
    ],
    tips: [
      "Memorizá los **tres cortes** de los planes: 24/7 y Trusted Advisor completo empiezan en **Business**; el TAM, en **Enterprise On-Ramp**; los 15 minutos, en **Enterprise**.",
      "En las preguntas de 'qué gano al subir de plan', descartá primero todo lo que **ya tiene** el plan actual. Suele ser la mitad de las opciones.",
      "Los tiempos que más se preguntan: **1 hora** (Business, producción caída), **30 minutos** (Enterprise On-Ramp) y **15 minutos** (Enterprise).",
    ],
  },
  {
    id: "m4-q12",
    prompt:
      "Una empresa acaba de poner su tienda en línea en producción. Necesita poder llamar por teléfono a cualquier hora, que varias personas del equipo abran casos y que un sistema de producción caído se atienda en menos de una hora, al menor costo posible. ¿Qué plan de soporte contrata?",
    options: [
      {
        id: "A",
        text: "Basic",
        correct: false,
        explanation:
          "Basic no incluye soporte técnico: solo cubre consultas de facturación y de la cuenta, más el material público como documentación y re:Post. No hay ingenieros a los que llamar.",
      },
      {
        id: "B",
        text: "Developer",
        correct: false,
        explanation:
          "Developer atiende solo por correo, en horario laboral, y habilita a una sola persona para abrir casos. Está pensado para probar y desarrollar, no para producción.",
      },
      {
        id: "C",
        text: "Enterprise",
        correct: false,
        explanation:
          "Enterprise cumple todos los requisitos, pero cuesta desde ~15.000 USD al mes cuando Business ya resuelve exactamente lo pedido. El escenario dice 'al menor costo posible': es la opción que se pasa.",
      },
      {
        id: "D",
        text: "Business",
        correct: true,
        explanation:
          "Correcta. Business es el primer plan pensado para producción: 24/7 por teléfono, chat y correo, usuarios ilimitados, Trusted Advisor completo y respuesta en menos de 1 hora con producción caída. Cumple todo lo pedido y es el más barato que lo hace.",
      },
    ],
    tips: [
      "Frente a un escenario de soporte, preguntate en este orden: **¿es producción?** → **¿cuánto puede esperar?** → **¿pide un asesor asignado?**",
      "Cuando el enunciado agrega **'al menor costo'** o 'la opción más económica que cumpla', el plan de arriba deja de ser correcto aunque también sirva.",
      "**Producción + 24/7 ⇒ Business** es de las asociaciones más rentables de todo el dominio 4.",
    ],
  },
  {
    id: "m4-q13",
    prompt:
      "Una empresa quiere una revisión automática de su cuenta que le señale instancias infrautilizadas, puertos abiertos innecesarios y cuánto le falta para alcanzar un límite de servicio. ¿Qué herramienta se lo da?",
    options: [
      {
        id: "A",
        text: "AWS Config",
        correct: false,
        explanation:
          "AWS Config registra cómo fue cambiando la configuración de los recursos y evalúa reglas de cumplimiento. Es una herramienta de auditoría, no un revisor con recomendaciones de costo y límites.",
      },
      {
        id: "B",
        text: "Amazon CloudWatch",
        correct: false,
        explanation:
          "CloudWatch recolecta métricas y registros para ver cómo se comportan los recursos. Muestra datos, pero no emite recomendaciones sobre seguridad, costos o cuotas.",
      },
      {
        id: "C",
        text: "AWS Trusted Advisor",
        correct: true,
        explanation:
          "Correcta. Trusted Advisor revisa la cuenta y recomienda en seis categorías: optimización de costos, rendimiento, seguridad, tolerancia a fallos, límites de servicio y excelencia operativa. Los tres ejemplos del enunciado caen exactamente en esas categorías.",
      },
      {
        id: "D",
        text: "AWS Health Dashboard",
        correct: false,
        explanation:
          "El Health Dashboard informa sobre el estado de los servicios de AWS y los eventos que afectan a tus recursos. Mira el lado de AWS, no la configuración de tu cuenta.",
      },
    ],
    tips: [
      "Las **seis categorías de Trusted Advisor** —costos, rendimiento, seguridad, tolerancia a fallos, límites de servicio y excelencia operativa— son el mapa completo: si el escenario cae en alguna, es él.",
      "**Los límites o cuotas de servicio son marca registrada de Trusted Advisor.** Ningún otro servicio del examen avisa que te estás acercando a un tope.",
      "Recordá el matiz de los planes: Basic y Developer solo ven un conjunto reducido de revisiones; **las seis categorías completas arrancan en Business**.",
    ],
  },
  {
    id: "m4-q14",
    prompt:
      "Un equipo nota que su aplicación responde mal y sospecha que el problema no es suyo, sino de un servicio de AWS en su Región. ¿Dónde lo verifica?",
    options: [
      {
        id: "A",
        text: "En el AWS Health Dashboard",
        correct: true,
        explanation:
          "Correcta. El Health Dashboard muestra el estado de los servicios de AWS y, en su vista de cuenta, los eventos que afectan específicamente a tus recursos, como un mantenimiento programado o una degradación que te toca.",
      },
      {
        id: "B",
        text: "En AWS Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor revisa cómo está configurada **tu** cuenta y qué podrías mejorar. No informa incidentes del lado de AWS.",
      },
      {
        id: "C",
        text: "En AWS CloudTrail",
        correct: false,
        explanation:
          "CloudTrail registra quién hizo qué llamada dentro de tu cuenta. Sirve para auditar acciones, no para saber si un servicio de AWS está degradado.",
      },
      {
        id: "D",
        text: "En AWS re:Post",
        correct: false,
        explanation:
          "re:Post es el foro de preguntas y respuestas de la comunidad. Puede que alguien comente el incidente, pero no es la fuente oficial ni tiene garantía de respuesta.",
      },
    ],
    tips: [
      "La frase que separa los dos paneles: **Health Dashboard te dice si el problema es de AWS; Trusted Advisor, si el problema es tuyo.**",
      "El Health Dashboard tiene **dos caras**: el estado general de los servicios, público, y el estado de tu cuenta, con los eventos que tocan a tus recursos.",
      "Si el enunciado habla de **mantenimiento programado, certificado por vencer o instancia que va a ser retirada**, es el Health Dashboard en su vista de cuenta.",
    ],
  },
  {
    id: "m4-q15",
    prompt:
      "Una empresa sin experiencia en la nube necesita ayuda externa para diseñar y ejecutar su migración a AWS, con una firma certificada por AWS. ¿A qué recurso recurre?",
    options: [
      {
        id: "A",
        text: "AWS re:Post",
        correct: false,
        explanation:
          "re:Post es el foro gratuito de preguntas y respuestas de la comunidad. Sirve para dudas puntuales, pero nadie se hace cargo de ejecutar un proyecto de migración ni hay compromiso de respuesta.",
      },
      {
        id: "B",
        text: "AWS Marketplace",
        correct: false,
        explanation:
          "El Marketplace es la tienda para comprar **software** de terceros listo para desplegar, cobrado en la misma factura de AWS. Vende productos, no servicios de consultoría para un proyecto.",
      },
      {
        id: "C",
        text: "El AWS Knowledge Center",
        correct: false,
        explanation:
          "El Knowledge Center reúne las respuestas a las preguntas más frecuentes. Es material de consulta gratuito, no un proveedor que ejecute la migración.",
      },
      {
        id: "D",
        text: "El AWS Partner Network (APN)",
        correct: true,
        explanation:
          "Correcta. El APN es la red de empresas certificadas por AWS. Los Consulting Partners son los que ayudan a diseñar, migrar y operar; los Technology Partners venden software que corre sobre AWS.",
      },
    ],
    tips: [
      "Separá los recursos por lo que entregan: **APN y Professional Services entregan personas**; **Marketplace entrega software**; **re:Post, Knowledge Center y los whitepapers entregan información**.",
      "**Consulting Partner** (ayudan a hacer) vs. **Technology Partner** (venden producto) es la subdivisión del APN que el examen pregunta.",
      "Si el escenario pide un compromiso de respuesta o responsabilidad sobre el resultado, los recursos gratuitos de la comunidad nunca son la respuesta correcta.",
    ],
  },
];
