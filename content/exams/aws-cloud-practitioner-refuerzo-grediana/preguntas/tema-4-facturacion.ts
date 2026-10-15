import type { ExamQuestionWithTopic } from "../../types";

/**
 * Dominio 4 — Facturación, precios y soporte. Seis preguntas, tres por cada fallo:
 *
 *   - sim-d4-q01 (eligió Reserved Instances estándar; era Savings Plans): q01–q03
 *   - sim-d4-q08 (eligió CloudWatch; era AWS Health Dashboard): q04–q06
 */
export const TEMA_4_FACTURACION: ExamQuestionWithTopic[] = [
  {
    id: "ref-gr-d4-q01",
    topic: "4",
    prompt:
      "Una empresa corre hoy su API en instancias EC2 y tiene decidido, en los próximos meses, pasar una parte a contenedores en Fargate y otra a funciones Lambda. Quiere un descuento a cambio de comprometerse por un año, sin perderlo cuando la carga cambie de servicio. ¿Qué modelo de compra elige?",
    options: [
      {
        id: "A",
        text: "EC2 Instance Savings Plans",
        correct: false,
        explanation:
          "EC2 Instance Savings Plans dan el mayor descuento de los Savings Plans a cambio de comprometer un gasto por hora en una familia de instancias EC2 dentro de una región. Tienta porque dice Savings Plans, y Savings Plans suena a flexibilidad. Pero el compromiso queda atado a EC2: en cuanto la carga pasa a Fargate o Lambda, el descuento deja de aplicarse a esa parte.",
      },
      {
        id: "B",
        text: "Compute Savings Plans",
        correct: true,
        explanation:
          "Correcta. El Compute Savings Plan es un compromiso de gasto en dólares por hora que se aplica automáticamente a EC2 de cualquier familia y región, a Fargate y a Lambda. Es el único modelo de esta lista que sigue a la carga cuando cambia de servicio.",
      },
      {
        id: "C",
        text: "Reserved Instances convertibles",
        correct: false,
        explanation:
          "Las Reserved Instances convertibles son reservas de EC2 a uno o tres años que permiten cambiar de familia, sistema operativo y tenencia durante el plazo, a cambio de un descuento algo menor que las estándar. Es la trampa más cercana, porque eso se parece mucho a 'flexibilidad'. Pero siguen siendo reservas de instancias EC2: no cubren Fargate ni Lambda.",
      },
      {
        id: "D",
        text: "Spot Instances con una solicitud persistente",
        correct: false,
        explanation:
          "Las Spot Instances usan capacidad sobrante de EC2 con hasta 90 % de descuento, pero AWS puede interrumpirlas con dos minutos de aviso; una solicitud persistente solo vuelve a pedirlas cuando se interrumpen. Dan el descuento más grande, por eso aparecen. Pero no son un compromiso a un año, una API que atiende usuarios no tolera las interrupciones, y no se aplican a Lambda.",
      },
    ],
    tips: [
      "Si el enunciado nombra Fargate o Lambda junto a EC2, el único compromiso que cubre a los tres es el Compute Savings Plan.",
      "Convertible significa 'puedo cambiar de instancia EC2', no 'puedo dejar de usar EC2'.",
    ],
  },
  {
    id: "ref-gr-d4-q02",
    topic: "4",
    prompt:
      "Un equipo está seguro de que sus servidores van a seguir siendo de la familia M en la región us-east-1 durante tres años, pero va a cambiar varias veces el tamaño de las instancias y pasar algunas de Windows a Linux. Busca el mayor descuento posible que tolere esos cambios. ¿Qué elige?",
    options: [
      {
        id: "A",
        text: "Compute Savings Plans",
        correct: false,
        explanation:
          "Compute Savings Plans son el modelo de compromiso más flexible: un gasto por hora que se aplica a EC2 de cualquier familia, tamaño, sistema operativo o región, y también a Fargate y Lambda. Tolera los cambios, y mucho más, por eso tienta. Pero esa flexibilidad se paga: su descuento máximo ronda el 66 %. Si el equipo ya sabe que no va a salir de la familia M en us-east-1, paga por una flexibilidad que no usa.",
      },
      {
        id: "B",
        text: "Reserved Instances estándar regionales",
        correct: false,
        explanation:
          "Las Reserved Instances estándar regionales son reservas de EC2 a uno o tres años con un descuento alto, aplicables a cualquier zona de la región, pero fijas en familia, plataforma y tenencia. Dan un descuento comparable, y por eso tientan. Pero quedan fijadas a la plataforma con la que se compraron: el paso de Windows a Linux las deja sin aplicar, y la flexibilidad de tamaño solo existe para Linux.",
      },
      {
        id: "C",
        text: "On-Demand con un presupuesto de AWS Budgets",
        correct: false,
        explanation:
          "On-Demand es pagar por segundo u hora el precio de lista, sin compromiso; AWS Budgets es la herramienta que avisa cuando el gasto real o proyectado supera un umbral. Budgets aparece cuando se habla de controlar costos. Pero no descuenta nada: On-Demand es el precio más alto de todos los modelos.",
      },
      {
        id: "D",
        text: "EC2 Instance Savings Plans",
        correct: true,
        explanation:
          "Correcta. El EC2 Instance Savings Plan se compromete a una familia en una región y, a cambio, da el descuento más alto de los Savings Plans (hasta ~72 %). Dentro de esa familia y región se aplica sin importar tamaño, sistema operativo, tenencia ni zona de disponibilidad.",
      },
    ],
    tips: [
      "Entre los dos Savings Plans: cuanto más se compromete el cliente (familia y región fijas), mayor es el descuento. Compute es más flexible y descuenta menos.",
      "Las RI estándar se atan a la plataforma: un cambio de sistema operativo es la señal que las descarta.",
    ],
  },
  {
    id: "ref-gr-d4-q03",
    topic: "4",
    multiple: true,
    prompt:
      "Una empresa tiene dos cargas. Un servicio web estable las 24 horas, que dentro de un año va a migrar en parte a Lambda. Y un renderizado de video que corre por las noches, guarda su avance cada pocos minutos y puede retomarse si se corta. ¿Cuáles DOS modelos de compra minimizan el costo de cada carga? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Spot Instances para el renderizado nocturno",
        correct: true,
        explanation:
          "Correcta. Spot da hasta ~90 % de descuento a cambio de que AWS pueda recuperar la instancia con aviso. Una carga que guarda su avance y se puede retomar es exactamente la que tolera esa interrupción.",
      },
      {
        id: "B",
        text: "Reserved Instances estándar para el servicio web",
        correct: false,
        explanation:
          "Las Reserved Instances estándar son reservas de instancias EC2 a uno o tres años con uno de los descuentos más altos, a cambio de fijar familia, región y plataforma. Para una carga estable 24 horas es la respuesta de manual, y por eso tienta. El detalle que la descarta es la migración a Lambda: una RI cubre instancias EC2 y nada más, así que la parte que se mude dejaría pagando una reserva sin usar.",
      },
      {
        id: "C",
        text: "Dedicated Hosts para el renderizado nocturno",
        correct: false,
        explanation:
          "Un Dedicated Host es un servidor físico entero reservado para el cliente, con visibilidad de sockets y núcleos. Se elige por licencias atadas al hardware o por requisitos de cumplimiento, no para ahorrar: es de los modelos más caros, y el enunciado no menciona ninguna de esas dos necesidades.",
      },
      {
        id: "D",
        text: "Compute Savings Plans para el servicio web",
        correct: true,
        explanation:
          "Correcta. La carga es estable, así que conviene comprometerse; y como parte va a pasar a Lambda, el compromiso tiene que ser el que cubre EC2, Fargate y Lambda por igual.",
      },
      {
        id: "E",
        text: "On-Demand para el servicio web",
        correct: false,
        explanation:
          "On-Demand es pagar el precio de lista por segundo u hora, sin compromiso: es lo correcto cuando no se puede prever el uso o la carga dura poco. Acá el servicio corre las 24 horas: pagar precio de lista por algo que se sabe que va a estar encendido todo el año es dejar el descuento sobre la mesa.",
      },
    ],
    tips: [
      "Dos preguntas ordenan los modelos de compra: ¿la carga tolera interrupciones? (Spot) y ¿se puede prever el uso? (compromiso). Recién después se elige qué compromiso.",
      "Cuando un enunciado da dos cargas con perfiles distintos, cada una tiene su modelo: no busques uno solo que sirva para las dos.",
    ],
  },
  {
    id: "ref-gr-d4-q04",
    topic: "4",
    prompt:
      "Una administradora recibe un correo de AWS que dice que una de sus instancias EC2 va a ser retirada la semana próxima por mantenimiento del hardware subyacente. Quiere ver, en un solo lugar, todos los eventos de AWS programados o en curso que afectan a los recursos de su cuenta. ¿Dónde los consulta?",
    options: [
      {
        id: "A",
        text: "AWS Health Dashboard",
        correct: true,
        explanation:
          "Correcta. El AWS Health Dashboard muestra los eventos del lado de AWS (interrupciones, mantenimientos programados, retiros de instancias) y, en su vista de cuenta, filtra los que afectan a los recursos propios. Es el lugar donde aparece ese aviso de retiro.",
      },
      {
        id: "B",
        text: "Amazon CloudWatch",
        correct: false,
        explanation:
          "Amazon CloudWatch es el servicio de monitoreo: recoge métricas (CPU, latencia) y logs de los recursos del cliente y dispara alarmas. Es la herramienta de monitoreo por excelencia, por eso se elige. Pero no sabe que AWS planea retirar un servidor físico: ese es un evento del proveedor, no una métrica del recurso.",
      },
      {
        id: "C",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "AWS Trusted Advisor revisa la cuenta y recomienda mejoras: instancias subutilizadas, puertos abiertos, límites cerca del tope. Es una auditoría de la configuración del cliente, no un aviso de lo que AWS va a hacer con su infraestructura.",
      },
      {
        id: "D",
        text: "AWS Config",
        correct: false,
        explanation:
          "AWS Config registra cómo cambió la configuración de cada recurso a lo largo del tiempo y evalúa reglas sobre ella. Tienta porque habla de 'los recursos de la cuenta'. Pero registra cambios hechos por el cliente, no eventos de mantenimiento de AWS.",
      },
    ],
    tips: [
      "La pregunta que separa a Health de CloudWatch: ¿el problema lo origina AWS o está en mis recursos? Lo de AWS va a Health; lo mío, a CloudWatch.",
      "Mantenimiento programado, retiro de instancia, interrupción regional: las tres son eventos de AWS Health.",
    ],
  },
  {
    id: "ref-gr-d4-q05",
    topic: "4",
    prompt:
      "Un equipo quiere recibir un aviso por correo cada vez que el uso de CPU de sus servidores de aplicación se mantenga por encima del 80 % durante diez minutos, para decidir si agrega capacidad. ¿Qué configura?",
    options: [
      {
        id: "A",
        text: "Una notificación de AWS Health Dashboard",
        correct: false,
        explanation:
          "AWS Health Dashboard muestra el estado de los servicios de AWS y los eventos que afectan a la cuenta: interrupciones, mantenimientos programados, retiros de hardware. Avisa, y por eso parece encajar con 'recibir un aviso'. Pero sus avisos son de eventos de AWS: el CPU alto de una instancia del cliente no lo es; AWS está funcionando bien mientras el servidor se satura.",
      },
      {
        id: "B",
        text: "Un chequeo de AWS Trusted Advisor",
        correct: false,
        explanation:
          "AWS Trusted Advisor revisa la cuenta contra buenas prácticas y recomienda mejoras en costos, seguridad, rendimiento, tolerancia a fallas y cuotas. Sí mira el uso de CPU, pero al revés y en otra escala de tiempo: busca instancias que pasan días casi sin uso para recomendar achicarlas. No dispara una alerta a los diez minutos de un pico.",
      },
      {
        id: "C",
        text: "Una alarma de Amazon CloudWatch",
        correct: true,
        explanation:
          "Correcta. CloudWatch recoge las métricas de los recursos del cliente, y una alarma evalúa una métrica contra un umbral durante un período y avisa (por ejemplo, a través de SNS por correo) cuando se cumple.",
      },
      {
        id: "D",
        text: "Un registro de AWS CloudTrail",
        correct: false,
        explanation:
          "AWS CloudTrail registra cada llamada a la API de la cuenta: quién hizo qué, cuándo y desde dónde. Tienta porque 'registra lo que pasa en la cuenta'. Pero una CPU al 80 % no es una llamada a la API de nadie: es una métrica.",
      },
    ],
    tips: [
      "Umbral, métrica, durante X minutos: es el vocabulario de una alarma de CloudWatch.",
      "CloudWatch es rendimiento de mis recursos; CloudTrail es actividad en mi cuenta; Health es estado de AWS. Tres preguntas distintas.",
    ],
  },
  {
    id: "ref-gr-d4-q06",
    topic: "4",
    multiple: true,
    prompt:
      "Después de una caída de su aplicación, un equipo quiere responder dos preguntas: si AWS tuvo un problema en esa región a esa hora, y qué usuario modificó un grupo de seguridad minutos antes de la caída. ¿Cuáles DOS servicios consulta? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Amazon CloudWatch",
        correct: false,
        explanation:
          "Amazon CloudWatch es el servicio de monitoreo de métricas y logs de los recursos del cliente, con alarmas y tableros. Mostraría el síntoma (la latencia subiendo, los errores), y por eso parece útil después de una caída. Pero no responde ninguna de las dos preguntas: no sabe del estado de AWS ni registra quién cambió una regla.",
      },
      {
        id: "B",
        text: "AWS Health Dashboard",
        correct: true,
        explanation:
          "Correcta. Responde la primera pregunta: muestra los eventos de AWS por región y hora, y en la vista de cuenta, si afectaron a sus recursos.",
      },
      {
        id: "C",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "AWS Trusted Advisor revisa la configuración actual de la cuenta y recomienda mejoras en costos, seguridad, rendimiento y cuotas. Puede señalar un grupo de seguridad con puertos abiertos al mundo, y eso lo acerca a la segunda pregunta. Pero dice cómo está configurado hoy, no quién lo cambió ni cuándo.",
      },
      {
        id: "D",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Amazon Inspector busca vulnerabilidades de software conocidas en instancias EC2, imágenes de contenedores y funciones Lambda. Aparece por sonar a investigación, pero no registra cambios ni el estado de los servicios de AWS.",
      },
      {
        id: "E",
        text: "AWS CloudTrail",
        correct: true,
        explanation:
          "Correcta. Responde la segunda pregunta: modificar un grupo de seguridad es una llamada a la API, y CloudTrail registra quién la hizo, desde dónde y a qué hora.",
      },
    ],
    tips: [
      "'Quién hizo qué y cuándo' en una cuenta de AWS es CloudTrail. 'Qué le pasó a AWS' es Health.",
      "En un post-mortem se usan los tres: Health para descartar al proveedor, CloudTrail para ver cambios, CloudWatch para ver el síntoma.",
    ],
  },
];
