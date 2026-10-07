import type { ExamQuestionWithTopic } from "../../types";

/**
 * Dominio 4 — Facturación, precios y soporte. 8 de las 65 preguntas del
 * simulacro (12,3 %, contra el 12 % oficial), repartidas entre 4.1 modelos de
 * precios, 4.2 herramientas de facturación y costos, y 4.3 planes de soporte.
 *
 * Es el dominio más chico, así que una sola pregunta mueve el porcentaje más
 * de 12 puntos: el desglose por dominio de este bloque sirve para detectar un
 * tema flojo, no para sacar una conclusión fina.
 */
export const TEMA_4_FACTURACION: ExamQuestionWithTopic[] = [
  {
    id: "sim-d4-q01",
    topic: "4",
    prompt:
      "Una empresa corre una carga estable las 24 horas y está dispuesta a comprometerse por tres años, pero quiere poder cambiar de familia de instancia e incluso pasar parte de la carga a Fargate más adelante. ¿Qué modelo de compra le conviene?",
    options: [
      {
        id: "A",
        text: "Reserved Instances estándar",
        correct: false,
        explanation:
          "Las Reserved estándar dan el mayor descuento pero atan a un tipo de instancia concreto y no se pueden cambiar. El enunciado pide justamente poder moverse, así que este es el distractor principal: mismo plazo, mismo descuento aproximado, pero sin la flexibilidad pedida.",
      },
      {
        id: "B",
        text: "Savings Plans",
        correct: true,
        explanation:
          "Correcta. Un Savings Plan compromete un **gasto por hora** durante 1 o 3 años en vez de un tipo de instancia, así que permite cambiar de familia, de tamaño y de Región, y aplica también a Lambda y Fargate. La palabra flexibilidad es la que decide entre este y Reserved.",
      },
      {
        id: "C",
        text: "Spot Instances",
        correct: false,
        explanation:
          "Spot es lo más barato pero AWS puede quitar la instancia con dos minutos de aviso. Una carga que corre 24 horas de forma estable no es interrumpible, así que queda descartado.",
      },
      {
        id: "D",
        text: "On-Demand",
        correct: false,
        explanation:
          "On-Demand no pide compromiso, y por eso es el precio más alto. La empresa está dispuesta a comprometerse por tres años, así que pagar sin descuento sería tirar dinero.",
      },
    ],
    tips: [
      "Reserved y Savings Plans tienen plazo y descuento casi iguales. La única diferencia real es **a qué te comprometés**: Reserved a un tipo de instancia, Savings Plans a un gasto por hora.",
      "Si el enunciado dice **flexibilidad**, **cambiar de familia** o menciona Lambda o Fargate, es Savings Plans.",
    ],
  },
  {
    id: "sim-d4-q02",
    topic: "4",
    prompt:
      "Un equipo procesa simulaciones científicas que pueden detenerse y relanzarse sin consecuencias, y quiere pagar lo menos posible por el cómputo. ¿Qué modelo corresponde?",
    options: [
      {
        id: "A",
        text: "Dedicated Hosts",
        correct: false,
        explanation:
          "Los Dedicated Hosts entregan un servidor físico completo y son la opción más cara. Se eligen por licencias atadas al hardware o por normativas de aislamiento, nunca para ahorrar.",
      },
      {
        id: "B",
        text: "Reserved Instances a 1 año",
        correct: false,
        explanation:
          "Las Reserved dan hasta un 72 % de descuento, un ahorro importante pero menor que Spot. Y comprometerse un año para una carga que podría no ser continua no es lo óptimo cuando el trabajo tolera interrupciones.",
      },
      {
        id: "C",
        text: "Spot Instances",
        correct: true,
        explanation:
          "Correcta. Spot vende la capacidad sobrante de AWS con hasta un 90 % de descuento a cambio de poder reclamarla con dos minutos de aviso. Un trabajo que se puede detener y relanzar es precisamente el caso de uso para el que existe.",
      },
      {
        id: "D",
        text: "On-Demand",
        correct: false,
        explanation:
          "On-Demand es la tarifa sin descuento. Para una carga tolerante a interrupciones que busca el mínimo costo, es la peor elección económica de la lista.",
      },
    ],
    tips: [
      "La palabra **interrumpible**, o cualquier variante de *se puede relanzar sin consecuencias*, señala Spot de manera casi inequívoca.",
      "El orden de descuento: Spot (hasta 90 %) > Reserved y Savings Plans (hasta 72 %) > On-Demand (sin descuento) > Dedicated Hosts (más caro).",
    ],
  },
  {
    id: "sim-d4-q03",
    topic: "4",
    prompt:
      "Al revisar su primera factura, una empresa se sorprende por un cargo de transferencia de datos. ¿Cuál es la regla general de cómo AWS cobra la transferencia?",
    options: [
      {
        id: "A",
        text: "Los datos que entran a AWS son gratuitos y los que salen hacia internet se cobran",
        correct: true,
        explanation:
          "Correcta. La entrada de datos a AWS generalmente no tiene costo, y la salida hacia internet se cobra por gigabyte. Es la regla que más sorprende en la primera factura y una de las preguntas más repetidas del dominio.",
      },
      {
        id: "B",
        text: "Los datos que entran se cobran y los que salen son gratuitos",
        correct: false,
        explanation:
          "Es la dirección invertida. Esta opción está para castigar a quien recuerda que hay una asimetría pero no en qué sentido va.",
      },
      {
        id: "C",
        text: "Toda transferencia de datos es gratuita dentro de la misma Región",
        correct: false,
        explanation:
          "Es una verdad parcial convertida en absoluto: parte del tráfico interno no se cobra, pero la transferencia entre Zonas de disponibilidad sí tiene costo. El enunciado pide la regla general y esta opción es demasiado tajante.",
      },
      {
        id: "D",
        text: "La transferencia se cobra siempre por igual, sin importar la dirección",
        correct: false,
        explanation:
          "Falso: justamente la asimetría entre entrada y salida es lo característico del modelo de precios de AWS.",
      },
    ],
    tips: [
      "La frase para memorizar: **entrar es gratis, salir se paga.** Y aparece como opción invertida muy seguido.",
      "Desconfiá de las opciones con **siempre**, **toda** o **sin importar**: los absolutos casi nunca son la respuesta correcta.",
    ],
  },
  {
    id: "sim-d4-q04",
    topic: "4",
    prompt:
      "Un equipo de investigación tiene asignadas 2.000 horas mensuales de cómputo en EC2 y quiere que le avisen cuando esté por agotarlas, con independencia de lo que cueste cada hora. ¿Qué herramienta se lo permite?",
    options: [
      {
        id: "A",
        text: "AWS Cost Explorer",
        correct: false,
        explanation:
          "Cost Explorer mira hacia atrás: muestra y desglosa lo ya consumido, con gráficos de hasta doce meses. Permitiría ver cuántas horas se usaron, pero no avisa cuando se está llegando a un límite.",
      },
      {
        id: "B",
        text: "AWS Pricing Calculator",
        correct: false,
        explanation:
          "La Pricing Calculator estima cuánto costaría una arquitectura antes de construirla. Es una herramienta de planificación previa, no de seguimiento de una cuenta en funcionamiento.",
      },
      {
        id: "C",
        text: "AWS Cost and Usage Report",
        correct: false,
        explanation:
          "El informe de costo y uso entrega el detalle crudo, línea por línea, para procesarlo con otras herramientas. Es la fuente de datos más completa del conjunto, pero no envía ninguna notificación.",
      },
      {
        id: "D",
        text: "AWS Budgets",
        correct: true,
        explanation:
          "Correcta. Budgets admite presupuestos de **uso** además de presupuestos de costo, así que se puede fijar un techo de horas de EC2 y recibir el aviso al acercarse. Es el único de la lista que notifica antes de que el límite se cruce.",
      },
    ],
    tips: [
      "Ordená las tres herramientas por momento: Pricing Calculator **antes** de gastar, Budgets **mientras** gastás, Cost Explorer **después** de gastar.",
      "**Notificar, alertar, umbral, límite** ⇒ Budgets. **Analizar, en qué se fue** ⇒ Cost Explorer.",
    ],
  },
  {
    id: "sim-d4-q05",
    topic: "4",
    multiple: true,
    prompt:
      "Una empresa agrupa sus doce cuentas de AWS bajo AWS Organizations con facturación consolidada. ¿Cuáles DOS beneficios obtiene? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Una sola factura para todas las cuentas",
        correct: true,
        explanation:
          "Correcta. La facturación consolidada reúne el gasto de todas las cuentas de la organización en un único pago, lo que simplifica la administración financiera y da una visión conjunta del costo.",
      },
      {
        id: "B",
        text: "Descuentos por volumen al sumarse el uso de todas las cuentas",
        correct: true,
        explanation:
          "Correcta. El uso de todas las cuentas se agrega para calcular los niveles de precio por volumen, así que el conjunto alcanza escalones de descuento que cada cuenta por separado no alcanzaría. También se comparten las Reserved Instances y los Savings Plans no utilizados.",
      },
      {
        id: "C",
        text: "Soporte técnico de nivel Enterprise sin costo adicional",
        correct: false,
        explanation:
          "El plan de soporte se contrata y se paga aparte. Organizations no regala ningún nivel de soporte.",
      },
      {
        id: "D",
        text: "Eliminación del costo de transferencia de datos entre cuentas",
        correct: false,
        explanation:
          "La facturación consolidada cambia cómo se paga, no qué se cobra. La transferencia de datos se sigue cobrando según las mismas reglas.",
      },
      {
        id: "E",
        text: "Respaldos automáticos de todos los recursos de la organización",
        correct: false,
        explanation:
          "Organizations es una herramienta de gobierno y facturación, no de protección de datos. Los respaldos se configuran por servicio o con AWS Backup.",
      },
    ],
    tips: [
      "Los tres beneficios que el examen espera de la facturación consolidada: **una factura**, **descuentos por volumen** y **compartir Reserved Instances y Savings Plans**.",
      "Descartá cualquier opción que convierta Organizations en algo que no es: no da soporte, no hace respaldos y no elimina cargos.",
    ],
  },
  {
    id: "sim-d4-q06",
    topic: "4",
    prompt:
      "El director financiero de una empresa quiere saber cuánto gastó cada área en AWS el mes pasado. Hoy todos los recursos están en una sola cuenta y sin ninguna marca que los identifique. ¿Qué hace falta para poder hacer ese desglose?",
    options: [
      {
        id: "A",
        text: "Aplicar etiquetas de asignación de costos a los recursos",
        correct: true,
        explanation:
          "Correcta. Las etiquetas de asignación de costos son pares de clave y valor que se aplican a los recursos y después se activan en la consola de facturación, lo que permite agrupar el gasto por área, proyecto o entorno en Cost Explorer. Sin etiquetas no hay desglose posible.",
      },
      {
        id: "B",
        text: "Contratar el plan de soporte Business",
        correct: false,
        explanation:
          "El plan de soporte mejora los tiempos de respuesta y habilita Trusted Advisor completo, pero no reparte el gasto por área. Ninguna herramienta puede atribuir costos si los recursos no están identificados.",
      },
      {
        id: "C",
        text: "Migrar cada área a su propia Región de AWS",
        correct: false,
        explanation:
          "Separar por Región mezclaría una decisión de arquitectura con una necesidad contable, encarecería la operación y no es la forma prevista de atribuir costos.",
      },
      {
        id: "D",
        text: "Activar AWS Config en todas las Regiones",
        correct: false,
        explanation:
          "Config inventaría recursos y evalúa su configuración, pero no es una herramienta de atribución de costos ni alimenta el desglose de la factura.",
      },
    ],
    tips: [
      "Ninguna herramienta puede desglosar el gasto por equipo o proyecto si **nadie etiquetó** los recursos. Las etiquetas son el prerrequisito, no un extra.",
      "La alternativa estructural es **una cuenta por área** dentro de Organizations, que separa el gasto por diseño. Si el enunciado habla de una sola cuenta, la respuesta son las etiquetas.",
    ],
  },
  {
    id: "sim-d4-q07",
    topic: "4",
    prompt:
      "Una empresa va a poner su sistema de ventas en producción y necesita soporte técnico disponible las 24 horas por teléfono, con respuesta en menos de una hora si el sistema se cae, y acceso a todos los chequeos de Trusted Advisor. ¿Cuál es el plan de soporte más económico que cumple?",
    options: [
      {
        id: "A",
        text: "Developer",
        correct: false,
        explanation:
          "Developer responde solo por correo, en horario laboral, y habilita a una única persona a abrir casos. No tiene teléfono ni cobertura 24/7, así que no alcanza para producción.",
      },
      {
        id: "B",
        text: "Enterprise On-Ramp",
        correct: false,
        explanation:
          "Enterprise On-Ramp cumple todo lo pedido, pero agrega respuesta en menos de 30 minutos para sistemas críticos y acceso a un grupo de asesores técnicos, a un costo mucho mayor. Resuelve el problema pasándose de lo necesario, y AWS considera incorrectas esas opciones cuando la pregunta pide el más económico.",
      },
      {
        id: "C",
        text: "Business",
        correct: true,
        explanation:
          "Correcta. Business es el primer plan pensado para producción: soporte 24/7 por teléfono, chat y correo, usuarios ilimitados, respuesta en menos de una hora cuando producción está caída y Trusted Advisor completo. Cumple todo lo pedido y es el más económico que lo hace.",
      },
      {
        id: "D",
        text: "Basic",
        correct: false,
        explanation:
          "Basic es gratuito y no incluye soporte técnico en absoluto: solo documentación, foros y un conjunto reducido de chequeos de Trusted Advisor.",
      },
    ],
    tips: [
      "Los tres cortes que resuelven casi todas estas preguntas: **producción y 24/7 ⇒ Business**; **asesor técnico designado ⇒ Enterprise**; **30 minutos ⇒ Enterprise On-Ramp, 15 minutos ⇒ Enterprise**.",
      "Cuando la pregunta dice **el más económico que cumple**, el plan que se pasa de los requisitos es incorrecto aunque técnicamente los satisfaga.",
    ],
  },
  {
    id: "sim-d4-q08",
    topic: "4",
    prompt:
      "Un administrador quiere saber si un servicio de AWS está sufriendo una interrupción que afecta a sus propios recursos, para distinguirlo de un problema en su configuración. ¿Qué herramienta consulta?",
    options: [
      {
        id: "A",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor mira **tu cuenta y tu configuración** y recomienda mejoras en costos, rendimiento, seguridad, tolerancia a fallos y cuotas. Dice si el problema es tuyo, que es lo contrario de lo que se busca acá.",
      },
      {
        id: "B",
        text: "AWS Health Dashboard",
        correct: true,
        explanation:
          "Correcta. El AWS Health Dashboard informa el estado de los servicios de AWS y, lo más importante, los eventos que afectan específicamente a los recursos de tu cuenta, incluidos los mantenimientos programados. Dice si el problema es de AWS.",
      },
      {
        id: "C",
        text: "Amazon CloudWatch",
        correct: false,
        explanation:
          "CloudWatch muestra métricas y logs de tus recursos: diría que algo dejó de responder, pero no si la causa es una interrupción del lado de AWS.",
      },
      {
        id: "D",
        text: "AWS Cost Explorer",
        correct: false,
        explanation:
          "Cost Explorer analiza el gasto. No tiene ninguna relación con el estado operativo de los servicios.",
      },
    ],
    tips: [
      "La frase que separa los dos paneles que más se confunden: **Trusted Advisor, el problema es tuyo; Health Dashboard, el problema es de AWS.**",
      "Si el enunciado busca descartar que la culpa sea de la propia configuración, está pidiendo el Health Dashboard.",
    ],
  },
];
