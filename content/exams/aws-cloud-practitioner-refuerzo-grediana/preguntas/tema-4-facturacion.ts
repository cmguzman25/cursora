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
          "Tienta porque dice Savings Plans, y Savings Plans suena a flexibilidad. Pero el EC2 Instance Savings Plan ata el compromiso a una familia de instancias EC2 en una región: en cuanto la carga pasa a Fargate o Lambda, el descuento deja de aplicarse a esa parte.",
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
          "Es la trampa más cercana: las convertibles permiten cambiar de familia, sistema operativo y tenencia durante el plazo, y eso se parece mucho a 'flexibilidad'. Pero siguen siendo reservas de instancias EC2. No cubren Fargate ni Lambda.",
      },
      {
        id: "D",
        text: "Spot Instances con una solicitud persistente",
        correct: false,
        explanation:
          "Spot da el descuento más grande, por eso aparece. Pero no es un compromiso a un año, AWS puede interrumpir la instancia con dos minutos de aviso, y una API que atiende usuarios no tolera eso. Además tampoco se aplica a Lambda.",
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
          "Tolera los cambios, y mucho más: otra familia, otra región, Fargate, Lambda. Por eso tienta. Pero esa flexibilidad se paga: su descuento máximo ronda el 66 %. Si el equipo ya sabe que no va a salir de la familia M en us-east-1, está pagando por una flexibilidad que no usa.",
      },
      {
        id: "B",
        text: "Reserved Instances estándar regionales",
        correct: false,
        explanation:
          "Dan un descuento comparable, y por eso tientan. Pero una RI estándar queda fijada a la plataforma con la que se compró: el paso de Windows a Linux la deja sin aplicar. Además, la flexibilidad de tamaño de las RI regionales solo existe para Linux, así que las instancias Windows tampoco podrían cambiar de tamaño sin perder el descuento.",
      },
      {
        id: "C",
        text: "On-Demand con un presupuesto de AWS Budgets",
        correct: false,
        explanation:
          "Budgets avisa cuando el gasto se pasa de un umbral, y por eso aparece cuando se habla de controlar costos. Pero no descuenta nada: On-Demand es el precio de lista, el más alto de todos los modelos.",
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
          "Para una carga estable 24 horas es la respuesta de manual, y por eso tienta. El detalle que la descarta es la migración a Lambda: una RI cubre instancias EC2 y nada más, así que la parte que se mude dejaría pagando una reserva sin usar.",
      },
      {
        id: "C",
        text: "Dedicated Hosts para el renderizado nocturno",
        correct: false,
        explanation:
          "Un Dedicated Host es un servidor físico entero para el cliente. Se elige por licencias atadas al hardware o por requisitos de cumplimiento, no para ahorrar: es de los modelos más caros, y el enunciado no menciona ninguna de esas dos necesidades.",
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
          "On-Demand es lo correcto cuando no se puede prever el uso o la carga dura poco. Acá el servicio corre las 24 horas: pagar precio de lista por algo que se sabe que va a estar encendido todo el año es dejar el descuento sobre la mesa.",
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
          "Es la herramienta de monitoreo por excelencia, por eso se elige. Pero CloudWatch mide lo que pasa en los recursos del cliente (CPU, latencia, logs). No sabe que AWS planea retirar un servidor físico: ese es un evento del proveedor, no una métrica del recurso.",
      },
      {
        id: "C",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor revisa la cuenta y recomienda: instancias subutilizadas, puertos abiertos, límites cerca del tope. Es una auditoría de la configuración del cliente, no un aviso de lo que AWS va a hacer con su infraestructura.",
      },
      {
        id: "D",
        text: "AWS Config",
        correct: false,
        explanation:
          "Config registra cómo cambió la configuración de cada recurso a lo largo del tiempo y evalúa reglas sobre ella. Tienta porque habla de 'los recursos de la cuenta', pero registra cambios hechos por el cliente, no eventos de mantenimiento de AWS.",
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
          "Health avisa, y por eso parece encajar con 'recibir un aviso'. Pero sus avisos son de eventos de AWS: una interrupción del servicio, un mantenimiento. El CPU alto de una instancia del cliente no es un evento de AWS; AWS está funcionando bien mientras el servidor se satura.",
      },
      {
        id: "B",
        text: "Un chequeo de AWS Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor sí mira el uso de CPU, pero al revés y en otra escala de tiempo: busca instancias que pasan días casi sin uso para recomendar achicarlas. No dispara una alerta a los diez minutos de un pico.",
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
          "CloudTrail registra quién llamó a qué API y cuándo. Tienta porque 'registra lo que pasa en la cuenta', pero una CPU al 80 % no es una llamada a la API de nadie: es una métrica.",
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
          "CloudWatch mostraría el síntoma (la latencia subiendo, los errores), y por eso parece útil después de una caída. Pero no responde ninguna de las dos preguntas: no sabe del estado de AWS ni registra quién cambió una regla.",
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
          "Trusted Advisor puede señalar un grupo de seguridad con puertos abiertos al mundo, y eso lo acerca a la segunda pregunta. Pero dice cómo está configurado hoy, no quién lo cambió ni cuándo.",
      },
      {
        id: "D",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Inspector busca vulnerabilidades de software conocidas en instancias EC2, imágenes de contenedores y funciones Lambda. Aparece por sonar a investigación, pero no registra cambios ni estados del proveedor.",
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
