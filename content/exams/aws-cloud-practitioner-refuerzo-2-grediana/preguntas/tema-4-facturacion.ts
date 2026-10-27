import type { ExamQuestionWithTopic } from "../../types";

/**
 * Dominio 4 — Facturación, precios y soporte. Seis preguntas, tres por cada
 * pendiente del primer refuerzo:
 *
 *   - ref-gr-d4-q03 (acertó Spot, pero eligió Dedicated Hosts para ahorrar; era Compute Savings Plans): q01–q03
 *   - ref-gr-d4-q06 (acertó CloudTrail, pero eligió CloudWatch; era AWS Health Dashboard): q04–q06
 */
export const TEMA_4_FACTURACION: ExamQuestionWithTopic[] = [
  {
    id: "ref2-gr-d4-q01",
    topic: "4",
    prompt:
      "Una empresa trae sus propias licencias de Windows Server y SQL Server, que se cuentan por socket y por núcleo físico. El contrato de licencias exige poder demostrar en qué servidor físico corre el software. ¿Qué opción de EC2 lo permite?",
    options: [
      {
        id: "A",
        text: "Spot Instances",
        correct: false,
        explanation:
          "Las Spot Instances usan capacidad sobrante de EC2 con un descuento de hasta 90 %, pero AWS puede recuperarlas con dos minutos de aviso. Tientan porque son la opción más barata. Pero corren en hardware compartido que el cliente no ve ni elige, así que no permiten contar sockets ni núcleos físicos.",
      },
      {
        id: "B",
        text: "Compute Savings Plans",
        correct: false,
        explanation:
          "Compute Savings Plans son un compromiso de gasto por hora durante uno o tres años que descuenta EC2, Fargate y Lambda. Tientan porque bajan el costo de cualquier servidor. Pero son un modelo de pago, no un tipo de hardware: no dan visibilidad del servidor físico.",
      },
      {
        id: "C",
        text: "Dedicated Hosts",
        correct: true,
        explanation:
          "Correcta. Un Dedicated Host es un servidor físico completo reservado para el cliente, con visibilidad de sus sockets y núcleos. Es la opción pensada para licencias por servidor físico (BYOL) y para requisitos de cumplimiento que exigen hardware dedicado.",
      },
      {
        id: "D",
        text: "Reserved Instances convertibles",
        correct: false,
        explanation:
          "Las Reserved Instances convertibles son reservas de EC2 a uno o tres años con descuento, que permiten cambiar de familia o sistema operativo durante el plazo. Tientan por el ahorro y la flexibilidad. Pero una Reserved Instance es un descuento de facturación que se aplica a instancias: no da un servidor físico identificable ni visibilidad de sus sockets y núcleos.",
      },
    ],
    tips: [
      "Licencias por socket o por núcleo físico, o una norma que exige hardware dedicado: Dedicated Hosts.",
      "Dedicated Hosts resuelven un problema de licencias o de cumplimiento, no de costos: son de las opciones más caras.",
    ],
  },
  {
    id: "ref2-gr-d4-q02",
    topic: "4",
    prompt:
      "Una empresa sin requisitos de licencias ni de aislamiento físico corre servidores web en EC2 las 24 horas. Su gerente propone pasarlos a Dedicated Hosts 'para ahorrar'. ¿Qué es lo correcto?",
    options: [
      {
        id: "A",
        text: "Es buena idea: Dedicated Hosts dan el mayor descuento disponible en EC2",
        correct: false,
        explanation:
          "Un Dedicated Host es un servidor físico entero reservado para un solo cliente. Tienta porque 'dedicado' suena a 'reservado' y las reservas dan descuento. Pero se paga el servidor completo, se use o no: sin una necesidad de licencias o de cumplimiento, es más caro que compartir hardware.",
      },
      {
        id: "B",
        text: "No conviene: para ahorrar sin requisitos de hardware se usan Savings Plans o Reserved Instances",
        correct: true,
        explanation:
          "Correcta. Para una carga estable las 24 horas, el ahorro llega con un compromiso de uso: Savings Plans o Reserved Instances, con descuentos de hasta alrededor de 72 % sobre On-Demand en hardware compartido. Dedicated Hosts se eligen por licencias o por cumplimiento, no por precio.",
      },
      {
        id: "C",
        text: "Es buena idea, porque Dedicated Hosts vienen incluidos en los planes de soporte de pago",
        correct: false,
        explanation:
          "Los planes de soporte de pago de AWS son suscripciones de asistencia técnica: dan acceso a ingenieros de AWS, tiempos de respuesta comprometidos y más chequeos de Trusted Advisor según el nivel. Tienta porque los planes de soporte incluyen beneficios. Pero ningún plan de soporte regala capacidad de cómputo: los Dedicated Hosts se pagan aparte.",
      },
      {
        id: "D",
        text: "Da igual: Dedicated Hosts y Spot Instances cuestan lo mismo y se interrumpen igual",
        correct: false,
        explanation:
          "Las Spot Instances son capacidad sobrante de EC2 con mucho descuento que AWS puede recuperar con dos minutos de aviso. Aparecen porque son el otro extremo en precio. Pero un Dedicated Host no se interrumpe y cuesta mucho más que Spot: son opuestos en precio y en garantías.",
      },
    ],
    tips: [
      "Para ahorrar en una carga estable: Savings Plans o Reserved Instances. Para trabajos que toleran interrupciones: Spot.",
      "Dedicated Hosts y Dedicated Instances se pagan por aislamiento físico, no dan descuento.",
    ],
  },
  {
    id: "ref2-gr-d4-q03",
    topic: "4",
    multiple: true,
    prompt: "¿Qué dos afirmaciones sobre los modelos de compra de cómputo en AWS son correctas? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Dedicated Hosts son la opción más barata cuando no hay requisitos de licencias",
        correct: false,
        explanation:
          "Dedicated Hosts son servidores físicos completos reservados para un cliente, pensados para licencias por núcleo o normas de aislamiento. Tientan porque 'dedicado' suena a precio especial. Pero se paga el servidor entero: sin esos requisitos, es de lo más caro.",
      },
      {
        id: "B",
        text: "Compute Savings Plans también descuentan el uso de Fargate y de Lambda",
        correct: true,
        explanation:
          "Correcta. El Compute Savings Plan es un compromiso de gasto por hora que se aplica a EC2 de cualquier familia y región, a Fargate y a Lambda, así que acompaña a una carga que se va moviendo a servicios sin servidor.",
      },
      {
        id: "C",
        text: "Las Reserved Instances estándar se pueden aplicar a funciones Lambda",
        correct: false,
        explanation:
          "Las Reserved Instances estándar son reservas de capacidad de EC2 con descuento a uno o tres años, fijas en familia de instancia. Tientan porque son el modelo de descuento más conocido. Pero solo aplican a instancias EC2 (y existen versiones para RDS y otros servicios), nunca a Lambda.",
      },
      {
        id: "D",
        text: "Spot conviene para trabajos que pueden interrumpirse y reanudarse",
        correct: true,
        explanation:
          "Correcta. Las Spot Instances son capacidad sobrante con hasta 90 % de descuento; como AWS puede recuperarlas con dos minutos de aviso, encajan en trabajos que guardan su avance y pueden retomar.",
      },
      {
        id: "E",
        text: "On-Demand exige comprometerse por un año a cambio de no tener interrupciones",
        correct: false,
        explanation:
          "On-Demand es pagar el precio de lista por segundo o por hora, sin ningún compromiso. Tienta porque tampoco se interrumpe. Pero justamente no requiere compromiso: es lo que se paga por esa libertad, y por eso es el precio más alto.",
      },
    ],
    tips: [
      "Mapa rápido: On-Demand sin compromiso; Savings Plans y RI con compromiso y descuento; Spot con descuento e interrupciones; Dedicated Hosts para licencias y cumplimiento.",
      "Solo los Compute Savings Plans cubren Lambda y Fargate.",
    ],
  },
  {
    id: "ref2-gr-d4-q04",
    topic: "4",
    prompt:
      "Un equipo quiere recibir un aviso cuando el uso de CPU de sus instancias EC2 pase del 80 % durante cinco minutos seguidos. ¿Qué servicio configura?",
    options: [
      {
        id: "A",
        text: "AWS Health Dashboard",
        correct: false,
        explanation:
          "AWS Health Dashboard muestra los eventos del lado de AWS que pueden afectar a la cuenta: incidentes de un servicio en una región, mantenimientos programados, retiros de hardware. Tienta porque avisa de problemas que afectan a las instancias. Pero informa lo que pasa en la infraestructura de AWS, no mide el uso de CPU de las instancias del cliente.",
      },
      {
        id: "B",
        text: "AWS CloudTrail",
        correct: false,
        explanation:
          "AWS CloudTrail registra cada llamada a la API de la cuenta: quién hizo qué, cuándo y desde qué IP. Tienta porque también sirve para investigar incidentes. Pero registra acciones, no métricas de rendimiento como la CPU.",
      },
      {
        id: "C",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "AWS Trusted Advisor revisa la cuenta contra buenas prácticas y, por ejemplo, señala instancias con poca utilización para ahorrar. Tienta porque mira el uso de las instancias. Pero hace revisiones periódicas con recomendaciones, no alarmas sobre una métrica en tiempo real.",
      },
      {
        id: "D",
        text: "Amazon CloudWatch",
        correct: true,
        explanation:
          "Correcta. Amazon CloudWatch recibe las métricas de los recursos, como la CPU de EC2, y permite crear alarmas que se disparan cuando una métrica supera un umbral durante cierto tiempo, y que pueden avisar por SNS.",
      },
    ],
    tips: [
      "CloudWatch mide tus recursos (métricas, registros, alarmas); Health Dashboard informa lo que le pasa a AWS; CloudTrail registra quién hizo qué.",
      "Umbral sobre una métrica durante un tiempo: alarma de CloudWatch.",
    ],
  },
  {
    id: "ref2-gr-d4-q05",
    topic: "4",
    prompt:
      "Una auditoría exige conservar durante siete años un registro de cada llamada a la API hecha en todas las regiones de la cuenta, con la identidad que la hizo. ¿Qué configura la empresa?",
    options: [
      {
        id: "A",
        text: "Un trail de AWS CloudTrail para todas las regiones que entregue a Amazon S3",
        correct: true,
        explanation:
          "Correcta. AWS CloudTrail registra las llamadas a la API con su identidad, hora e IP. La consola guarda solo 90 días de historial; para conservarlo años se crea un trail para todas las regiones que entrega los eventos a un bucket de S3, donde se guardan el tiempo que haga falta. Un trail registra por defecto los eventos de administración (crear, cambiar o borrar recursos); los eventos de datos, como leer objetos de S3, se activan aparte en el mismo trail.",
      },
      {
        id: "B",
        text: "Métricas de Amazon CloudWatch con la retención extendida a siete años",
        correct: false,
        explanation:
          "Amazon CloudWatch guarda métricas numéricas de los recursos, como la CPU o la latencia, y permite alarmas y paneles. Tienta porque es el servicio de monitoreo y tiene retención configurable. Pero las métricas miden cómo se comportan los recursos; no registran quién llamó a cada API.",
      },
      {
        id: "C",
        text: "El historial de eventos de AWS Health Dashboard",
        correct: false,
        explanation:
          "AWS Health Dashboard muestra los eventos de la infraestructura de AWS que afectan a la cuenta, como incidentes de servicio o mantenimientos. Tienta porque guarda un historial de eventos. Pero son eventos del lado de AWS, no las acciones de los usuarios de la cuenta.",
      },
      {
        id: "D",
        text: "Reglas de AWS Config activadas en todas las regiones de la cuenta",
        correct: false,
        explanation:
          "AWS Config registra cómo cambia la configuración de los recursos y evalúa si cumplen reglas. Es la trampa más cercana, porque también sirve para auditorías. Pero registra estados de configuración de recursos, no cada llamada a la API, incluidas las de lectura, con la identidad que la hizo.",
      },
    ],
    tips: [
      "Registro de auditoría de las llamadas a la API, quién y desde dónde: CloudTrail.",
      "Para guardar la actividad de CloudTrail más de 90 días se crea un trail que la entregue a S3.",
    ],
  },
  {
    id: "ref2-gr-d4-q06",
    topic: "4",
    multiple: true,
    prompt:
      "Después de una caída, la empresa quiere responder dos preguntas: si hubo un problema de AWS en la región que afectó a sus recursos, y a qué hora empezó a subir la latencia de su balanceador. ¿Qué dos servicios consulta? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "AWS CloudTrail",
        correct: false,
        explanation:
          "AWS CloudTrail registra quién hizo cada llamada a la API de la cuenta, cuándo y desde dónde. Tienta porque es la herramienta clásica de investigación tras un incidente. Pero ninguna de las dos preguntas es sobre una acción de un usuario: una es sobre AWS y la otra sobre una métrica.",
      },
      {
        id: "B",
        text: "AWS Health Dashboard",
        correct: true,
        explanation:
          "Correcta. AWS Health Dashboard muestra los eventos de la infraestructura de AWS, como una degradación de un servicio en la región, y señala cuáles afectaron a los recursos de la cuenta. Responde la primera pregunta.",
      },
      {
        id: "C",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Amazon Inspector busca vulnerabilidades de software en EC2, contenedores y Lambda. Puede aparecer porque se asocia con investigar problemas. Pero no tiene datos de disponibilidad de AWS ni métricas de latencia.",
      },
      {
        id: "D",
        text: "Amazon CloudWatch",
        correct: true,
        explanation:
          "Correcta. Amazon CloudWatch guarda las métricas del balanceador, como la latencia de respuesta, con su historial en el tiempo. Responde la segunda pregunta.",
      },
      {
        id: "E",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "AWS Trusted Advisor revisa la cuenta contra buenas prácticas de costo, seguridad, tolerancia a fallos, rendimiento y cuotas. Tienta porque señala riesgos de disponibilidad. Pero da recomendaciones; no registra incidentes de AWS ni la latencia a lo largo del tiempo.",
      },
    ],
    tips: [
      "Separa por quién causó el problema: AWS (Health Dashboard), un usuario de la cuenta (CloudTrail) o el comportamiento de tus recursos (CloudWatch).",
      "Health Dashboard tiene una vista de la cuenta que muestra qué recursos tuyos afectó cada evento de AWS.",
    ],
  },
];
