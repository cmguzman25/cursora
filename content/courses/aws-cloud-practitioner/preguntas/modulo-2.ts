import type { ExamQuizQuestion } from "../../types";

/**
 * Question bank for lesson "15-analisis-preguntas-modulo-2" (Módulo 2 —
 * Seguridad y cumplimiento). 25 questions, per the per-module counts in
 * CONTRATO-DE-CLASES.md, spread across 2.1 (shared responsibility), 2.2
 * (governance/compliance), 2.3 (IAM), 2.4a (protection) and 2.4b (detection).
 */
export const MODULE_2_QUESTIONS: ExamQuizQuestion[] = [
  {
    id: "m2-q01",
    prompt:
      "Una empresa levanta varias instancias EC2 para su aplicación. Sale publicada una actualización de seguridad importante para el sistema operativo de esas instancias. Según el modelo de responsabilidad compartida, ¿quién debe instalarla?",
    options: [
      {
        id: "A",
        text: "AWS, porque el hardware que ejecuta las instancias es suyo",
        correct: false,
        explanation:
          "AWS es dueño del hardware y de la capa que lo virtualiza, sí — pero el sistema operativo que corre dentro de una instancia EC2 está del lado del cliente. Ser dueño del edificio no lo hace responsable de lo que pasa dentro de tu departamento.",
      },
      {
        id: "B",
        text: "AWS, porque las actualizaciones de seguridad siempre son suyas",
        correct: false,
        explanation:
          "No hay ninguna regla que le asigne todas las actualizaciones a AWS. Con RDS o Lambda sí las aplica AWS, pero con EC2 el sistema operativo lo administra el cliente. La misma tarea cambia de dueño según el servicio.",
      },
      {
        id: "C",
        text: "El cliente, porque en EC2 el sistema operativo lo administra él",
        correct: true,
        explanation:
          "Correcto. EC2 es el servicio donde más le toca al cliente: sistema operativo y sus parches, el software instalado, el firewall, los datos y los accesos. AWS solo se ocupa del hardware y la virtualización.",
      },
      {
        id: "D",
        text: "Ninguno: las instancias EC2 se actualizan solas",
        correct: false,
        explanation:
          "No se actualizan solas. Si nadie aplica el parche, la instancia queda vulnerable — que es exactamente el tipo de debilidad que después detecta Amazon Inspector.",
      },
    ],
    tips: [
      "Traducí siempre la pregunta a \"¿esto es el edificio o mi departamento?\". Hardware, red y seguridad física son de AWS; sistema operativo, datos y accesos son tuyos.",
      "Acordate del orden de cuánto te toca: EC2 (mucho) → RDS (menos) → Lambda (casi nada). Parchear el sistema operativo es tuyo solo en el primero.",
      "Si una opción dice que algo \"se actualiza solo\" sin nombrar un servicio administrado, desconfiá: suele ser un distractor inventado.",
    ],
  },
  {
    id: "m2-q02",
    prompt:
      "¿Cuál de las siguientes es responsabilidad de AWS en todos los casos, sin importar qué servicio use el cliente?",
    options: [
      {
        id: "A",
        text: "Configurar los permisos de los usuarios",
        correct: false,
        explanation:
          "Los permisos son siempre del cliente, con cualquier servicio. AWS te da IAM como herramienta, pero decidir quién accede a qué nunca deja de ser tu tarea.",
      },
      {
        id: "B",
        text: "La seguridad física de los centros de datos",
        correct: true,
        explanation:
          "Correcto. Guardias, cámaras y control de acceso al edificio son de AWS siempre. Ningún cliente entra a tocar un servidor, así que esta responsabilidad no es negociable ni configurable.",
      },
      {
        id: "C",
        text: "Clasificar qué datos del cliente son sensibles",
        correct: false,
        explanation:
          "AWS no mira tus datos ni decide cuáles son delicados. Existen herramientas que ayudan a encontrarlos (como Macie), pero clasificarlos y protegerlos es del cliente.",
      },
      {
        id: "D",
        text: "Activar el cifrado de los datos del cliente",
        correct: false,
        explanation:
          "AWS ofrece las herramientas de cifrado, pero decidir cifrar y configurarlo es del cliente. Que la opción exista no significa que esté activada — es una trampa clásica.",
      },
    ],
    tips: [
      "Si una opción pone a AWS como responsable de tus datos o de tus permisos, es incorrecta sin importar el resto del enunciado.",
      "Del lado de AWS entra siempre lo que vos no podés tocar aunque quisieras: el edificio, el hardware, la red física.",
      "Ojo con las opciones que suenan a que AWS \"te ayuda\" con algo: ayudar con una herramienta no es lo mismo que ser responsable de la decisión.",
    ],
  },
  {
    id: "m2-q03",
    prompt:
      "Una empresa migra su base de datos a Amazon RDS, el servicio de bases de datos administradas. ¿Quién se encarga de aplicar los parches al motor de base de datos?",
    options: [
      {
        id: "A",
        text: "AWS, porque RDS es un servicio administrado",
        correct: true,
        explanation:
          "Correcto. Esa es justamente la diferencia entre RDS y montar la base de datos vos mismo en EC2: en RDS, AWS se ocupa del sistema operativo y de los parches del motor. Al cliente le quedan los datos, los accesos, el cifrado y la configuración de red.",
      },
      {
        id: "B",
        text: "El cliente, igual que en EC2",
        correct: false,
        explanation:
          "En EC2 sí, pero justamente lo que cambia con un servicio administrado es que esa tarea pasa a AWS. Si fuera igual que EC2, RDS no tendría ventaja.",
      },
      {
        id: "C",
        text: "El cliente, porque la base de datos contiene sus datos",
        correct: false,
        explanation:
          "Que los datos sean tuyos no te vuelve responsable del software que los administra. Los datos son tuyos (y su cifrado y sus accesos también), pero el motor lo mantiene AWS.",
      },
      {
        id: "D",
        text: "Se reparte: AWS parchea y el cliente aprueba cada actualización",
        correct: false,
        explanation:
          "El modelo no funciona con aprobaciones cruzadas así. Podés elegir ventanas de mantenimiento, pero la responsabilidad de parchear el motor es de AWS, no compartida en el sentido que plantea la opción.",
      },
    ],
    tips: [
      "Cuanto más administrado es el servicio, más corta es tu lista de responsabilidades. \"Administrado\" en el enunciado es una señal fuerte.",
      "Distinguí datos de motor: los datos siempre son tuyos; el software que los corre depende del servicio.",
      "Compará mentalmente con montar la misma base de datos en EC2: todo lo que dejás de hacer al pasar a RDS es lo que asumió AWS.",
    ],
  },
  {
    id: "m2-q04",
    prompt:
      "¿Cuáles DOS responsabilidades son siempre del cliente, sin importar si usa EC2, RDS o Lambda?",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Aplicar parches al sistema operativo",
        correct: false,
        explanation:
          "Depende del servicio: es tuyo en EC2, pero lo hace AWS en RDS y en Lambda ni siquiera hay un sistema operativo que puedas tocar. Justamente por eso no es \"siempre\".",
      },
      {
        id: "B",
        text: "Los datos que se guardan y qué tan sensibles son",
        correct: true,
        explanation:
          "Correcta. Tus datos nunca salen de tu columna. Qué subís, cuán delicado es, si lo cifrás y cuánto lo conservás son decisiones tuyas con cualquier servicio.",
      },
      {
        id: "C",
        text: "El mantenimiento del hardware donde corre el servicio",
        correct: false,
        explanation:
          "Eso es de AWS siempre, con todos los servicios. Es la parte del modelo que ningún cliente puede tocar.",
      },
      {
        id: "D",
        text: "Quién tiene acceso y con qué permisos",
        correct: true,
        explanation:
          "Correcta. Crear usuarios, asignar permisos y quitarlos cuando alguien se va es tuyo siempre. Si se filtra información porque alguien tenía permisos de más, la responsabilidad es del cliente.",
      },
      {
        id: "E",
        text: "La seguridad física del centro de datos",
        correct: false,
        explanation:
          "Nunca es del cliente. Guardias, cámaras y acceso al edificio son de AWS con cualquier servicio.",
      },
    ],
    tips: [
      "Las dos constantes del modelo son fáciles de recordar: **tus datos** y **tus accesos**. Todo lo demás se mueve según el servicio.",
      "Cuando la pregunta diga \"siempre\" o \"sin importar el servicio\", descartá de entrada todo lo que cambie entre EC2, RDS y Lambda.",
      "En las preguntas de respuesta múltiple, primero separá las opciones en \"de AWS\" y \"del cliente\": con eso solo suelen quedar dos candidatas.",
    ],
  },
  {
    id: "m2-q05",
    prompt:
      "Un cliente importante le pide a una empresa pruebas de que la infraestructura donde corre su aplicación cumple con la norma ISO 27001. ¿Dónde consigue esos informes de auditoría?",
    options: [
      {
        id: "A",
        text: "En AWS Config",
        correct: false,
        explanation:
          "Config registra cómo están configurados tus recursos y si cumplen las reglas que definiste. Sirve para auditar lo tuyo, no para conseguir certificaciones de AWS.",
      },
      {
        id: "B",
        text: "En AWS Security Hub",
        correct: false,
        explanation:
          "Security Hub reúne los hallazgos de seguridad de tu propia cuenta y los compara con estándares. Pero no es de donde se descargan los certificados de AWS.",
      },
      {
        id: "C",
        text: "En AWS Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor te da recomendaciones sobre tu cuenta en cinco categorías. No entrega documentos de cumplimiento de AWS.",
      },
      {
        id: "D",
        text: "En AWS Artifact",
        correct: true,
        explanation:
          "Correcto. Artifact es el portal gratuito desde donde se descargan los informes de auditoría de AWS: SOC, ISO 27001, PCI DSS y otros. Es el equivalente al certificado de bromatología que emite un tercero independiente.",
      },
    ],
    tips: [
      "Artifact es el único de la lista que entrega documentos **de AWS**. Los demás analizan **tu** cuenta. Esa es la línea que separa la respuesta del resto.",
      "Si una opción dice que Artifact sirve para auditar tus propios recursos, es incorrecta: eso es Config y CloudTrail.",
      "Recordá que el cumplimiento es compartido: que AWS tenga la certificación no significa que tu aplicación la tenga automáticamente.",
    ],
  },
  {
    id: "m2-q06",
    prompt:
      "Una base de datos crítica apareció borrada esta mañana y nadie del equipo se hace cargo. ¿Qué servicio permite averiguar qué usuario ejecutó esa acción y desde dónde?",
    options: [
      {
        id: "A",
        text: "AWS CloudTrail",
        correct: true,
        explanation:
          "Correcto. CloudTrail registra cada acción hecha en la cuenta junto con el usuario, la fecha y el origen. Es el servicio de auditoría: las cámaras de seguridad de tu cuenta.",
      },
      {
        id: "B",
        text: "Amazon CloudWatch",
        correct: false,
        explanation:
          "CloudWatch te habría avisado de que algo dejó de funcionar, porque mira métricas y rendimiento. Pero no te dice quién causó el problema. Es el distractor más frecuente de esta pregunta.",
      },
      {
        id: "C",
        text: "AWS Config",
        correct: false,
        explanation:
          "Config te muestra cómo cambió la configuración de tus recursos a lo largo del tiempo, pero el nombre del usuario que ejecutó la acción se encuentra en CloudTrail.",
      },
      {
        id: "D",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "GuardDuty analiza registros para detectar actividad sospechosa y alertar. Puede avisarte de un comportamiento raro, pero el registro detallado de quién hizo qué vive en CloudTrail.",
      },
    ],
    tips: [
      "La regla más rentable del módulo: si la pregunta dice **\"quién hizo esto\"**, la respuesta es CloudTrail casi sin excepción.",
      "CloudWatch y CloudTrail se intercambian todo el tiempo entre las opciones porque los nombres se parecen. Watch = rendimiento, Trail = quién.",
      "CloudTrail guarda el registro; GuardDuty lo interpreta para detectar amenazas. Si piden el dato crudo del responsable, es CloudTrail.",
    ],
  },
  {
    id: "m2-q07",
    prompt:
      "Un equipo quiere recibir un aviso automático cada vez que el uso de procesador de sus servidores supere el 90 % durante más de cinco minutos. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "AWS CloudTrail",
        correct: false,
        explanation:
          "CloudTrail registra acciones y responsables, no el rendimiento de los recursos. No sirve para vigilar el uso de procesador.",
      },
      {
        id: "B",
        text: "AWS Config",
        correct: false,
        explanation:
          "Config vigila cómo está configurado un recurso y si cumple una regla, no cuánto está trabajando. Que la CPU esté al 90 % no es un problema de configuración.",
      },
      {
        id: "C",
        text: "Amazon CloudWatch",
        correct: true,
        explanation:
          "Correcto. CloudWatch recolecta métricas y registros, y permite crear alarmas que avisan cuando un valor se sale de lo normal. Es el tablero con los números del negocio.",
      },
      {
        id: "D",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor da recomendaciones generales sobre tu cuenta cada tanto, no monitoreo continuo con alarmas sobre una métrica puntual.",
      },
    ],
    tips: [
      "Las palabras **métrica, alarma, umbral y monitoreo** apuntan siempre a CloudWatch.",
      "Si el escenario pide reaccionar a un número que sube o baja, es CloudWatch. Si pide saber quién tocó algo, es CloudTrail.",
      "Trusted Advisor recomienda, no monitorea en tiempo real. Es un distractor cómodo en preguntas de vigilancia.",
    ],
  },
  {
    id: "m2-q08",
    prompt:
      "Una empresa define que todos sus depósitos de almacenamiento deben tener el cifrado activado, y quiere que alguien le avise automáticamente si algún recurso deja de cumplir esa regla. ¿Qué servicio necesita?",
    options: [
      {
        id: "A",
        text: "Amazon CloudWatch",
        correct: false,
        explanation:
          "CloudWatch vigila el rendimiento y las métricas. Que el cifrado esté activado o no es una cuestión de configuración, no de cuánto trabaja el recurso.",
      },
      {
        id: "B",
        text: "AWS Config",
        correct: true,
        explanation:
          "Correcto. Config registra cómo está configurado cada recurso, guarda el historial de cambios y evalúa esa configuración contra las reglas que definiste, avisando cuando algo deja de cumplirlas.",
      },
      {
        id: "C",
        text: "AWS CloudTrail",
        correct: false,
        explanation:
          "CloudTrail te diría quién desactivó el cifrado y cuándo, pero no evalúa de forma continua si el estado actual cumple una regla. Registra acciones, no conformidad.",
      },
      {
        id: "D",
        text: "AWS Artifact",
        correct: false,
        explanation:
          "Artifact solo entrega los informes de cumplimiento de AWS. No revisa ni evalúa tus recursos.",
      },
    ],
    tips: [
      "Las palabras **configuración, regla, cumple/no cumple e historial de cambios** son la firma de AWS Config.",
      "CloudTrail y Config se rozan: Trail responde \"quién lo cambió\", Config responde \"cómo quedó y si eso está bien\".",
      "Si el escenario define una norma interna y quiere vigilarla de forma continua, pensá en Config antes que en cualquier otro.",
    ],
  },
  {
    id: "m2-q09",
    prompt:
      "Una aplicación envía datos de clientes desde el navegador hasta el servidor a través de internet. La empresa quiere asegurarse de que nadie pueda leerlos si los intercepta en el camino. ¿Qué tipo de protección necesita?",
    options: [
      {
        id: "A",
        text: "Cifrado en reposo",
        correct: false,
        explanation:
          "El cifrado en reposo protege el dato mientras está guardado en un disco, no mientras viaja. Es la caja fuerte, y acá el problema está en el trayecto.",
      },
      {
        id: "B",
        text: "Copias de seguridad automáticas",
        correct: false,
        explanation:
          "Las copias de seguridad te protegen de perder información, no de que alguien la lea. Responden a un riesgo distinto al que plantea el escenario.",
      },
      {
        id: "C",
        text: "Control de acceso con IAM",
        correct: false,
        explanation:
          "IAM define quién puede acceder a tus recursos de AWS. No protege un dato que ya está viajando por internet fuera de esa frontera.",
      },
      {
        id: "D",
        text: "Cifrado en tránsito",
        correct: true,
        explanation:
          "Correcto. El cifrado en tránsito —en la práctica HTTPS/TLS— protege el dato mientras se mueve por la red. Es el sobre lacrado: aunque alguien intercepte la carta, no puede leerla.",
      },
    ],
    tips: [
      "Ante la palabra cifrado, preguntate en qué momento: si el dato **se mueve**, es en tránsito; si **está guardado**, es en reposo.",
      "\"Interceptar\", \"en el camino\", \"por la red\" e \"HTTPS\" son señales de tránsito. \"Disco\", \"almacenado\" y \"si roban el hardware\" son de reposo.",
      "No son alternativas: en la vida real se usan los dos, y una pregunta puede pedirte solo el que corresponde al riesgo descrito.",
    ],
  },
  {
    id: "m2-q10",
    prompt:
      "Una empresa quiere crear y administrar de forma centralizada las llaves que se usan para cifrar su información en AWS. ¿Qué servicio le corresponde?",
    options: [
      {
        id: "A",
        text: "AWS KMS (Key Management Service)",
        correct: true,
        explanation:
          "Correcto. KMS es donde se crean, guardan y controlan las llaves de cifrado. Recordá que AWS te da la herramienta, pero decidir cifrar y configurarlo sigue siendo tuyo.",
      },
      {
        id: "B",
        text: "AWS Artifact",
        correct: false,
        explanation:
          "Artifact entrega los informes de cumplimiento de AWS. No tiene relación con administrar llaves de cifrado.",
      },
      {
        id: "C",
        text: "AWS IAM",
        correct: false,
        explanation:
          "IAM administra identidades y permisos: quién puede hacer qué. Es un distractor tentador porque también es control de acceso, pero las llaves de cifrado viven en KMS.",
      },
      {
        id: "D",
        text: "Amazon Macie",
        correct: false,
        explanation:
          "Macie encuentra datos sensibles guardados en S3 y avisa. Detecta el problema, no administra las llaves para resolverlo.",
      },
    ],
    tips: [
      "Asociá KMS directamente a la palabra **llave**. Si el escenario habla de crear, rotar o controlar llaves de cifrado, es KMS.",
      "IAM controla el acceso a los servicios; KMS controla las llaves del cifrado. Se complementan, pero responden preguntas distintas.",
      "Macie descubre dónde hay datos sensibles; KMS es parte de cómo se protegen. Descubrir y proteger son etapas distintas.",
    ],
  },
  {
    id: "m2-q11",
    prompt:
      "Una aplicación que corre en una instancia EC2 necesita leer archivos guardados en Amazon S3. ¿Cuál es la forma recomendada de darle ese acceso?",
    options: [
      {
        id: "A",
        text: "Guardar las claves de acceso de un usuario IAM en un archivo dentro de la instancia",
        correct: false,
        explanation:
          "Esta es la opción que el examen pone justamente para que la descartes. Una clave guardada en el servidor queda escrita, sin vencimiento, disponible para cualquiera que llegue a ese archivo.",
      },
      {
        id: "B",
        text: "Usar las credenciales del usuario root de la cuenta",
        correct: false,
        explanation:
          "El usuario root no se usa nunca para el trabajo diario, y menos dentro de una aplicación. Es la llave maestra: abre todo y no se le pueden quitar permisos.",
      },
      {
        id: "C",
        text: "Asignarle un rol de IAM a la instancia",
        correct: true,
        explanation:
          "Correcto. El rol entrega credenciales temporales que vencen solas y no queda nada escrito dentro del servidor. Es la respuesta estándar cada vez que un servicio de AWS necesita acceder a otro.",
      },
      {
        id: "D",
        text: "Hacer público el depósito de S3 para que la instancia pueda leerlo",
        correct: false,
        explanation:
          "Abrir el depósito al mundo entero para resolver un permiso interno es exactamente lo contrario al menor privilegio, y crea una exposición mucho más grave que el problema original.",
      },
    ],
    tips: [
      "Si un servicio de AWS necesita acceder a otro, la respuesta es **rol**, prácticamente sin excepción.",
      "Cualquier opción que proponga guardar claves de acceso dentro de una instancia es incorrecta, sin importar cómo esté redactada.",
      "Desconfiá de las opciones que resuelven un permiso puntual abriendo algo al público: casi siempre son la respuesta trampa.",
    ],
  },
  {
    id: "m2-q12",
    prompt:
      "Un administrador crea un usuario IAM nuevo y no le asigna ninguna política. ¿Qué puede hacer ese usuario en la cuenta?",
    options: [
      {
        id: "A",
        text: "Todo, hasta que se le apliquen restricciones",
        correct: false,
        explanation:
          "Es exactamente al revés, y es una confusión frecuente. Si fuera así, cada usuario nuevo sería un riesgo enorme hasta que alguien se acordara de limitarlo.",
      },
      {
        id: "B",
        text: "Nada, hasta que se le otorguen permisos explícitos",
        correct: true,
        explanation:
          "Correcto. En IAM, todo lo que no está permitido está prohibido. Un usuario nuevo nace sin poder hacer absolutamente nada hasta que se le asignan permisos.",
      },
      {
        id: "C",
        text: "Solo leer información, pero no modificarla",
        correct: false,
        explanation:
          "No existe un permiso de lectura otorgado por defecto. Sin política asignada, el usuario tampoco puede leer nada.",
      },
      {
        id: "D",
        text: "Lo mismo que el usuario root",
        correct: false,
        explanation:
          "Ningún usuario IAM equivale al root por defecto. El root es único, se crea con la cuenta y tiene acceso completo que no se le puede quitar.",
      },
    ],
    tips: [
      "Memorizá las dos reglas de las políticas: **sin permiso explícito no se puede nada**, y **una negación explícita le gana a cualquier permiso**.",
      "Que el comportamiento por defecto sea \"nada\" es lo que hace posible el menor privilegio: se empieza en cero y se agrega.",
      "Si una opción sugiere que AWS otorga permisos automáticamente, sospechá: el modelo es al revés.",
    ],
  },
  {
    id: "m2-q13",
    prompt:
      "¿Cuáles DOS son buenas prácticas recomendadas para el usuario root de una cuenta de AWS?",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Activarle la autenticación multifactor (MFA)",
        correct: true,
        explanation:
          "Correcta. El root abre todo, así que una contraseña robada bastaría para perder la cuenta entera. MFA agrega una segunda prueba y es imprescindible en esta cuenta.",
      },
      {
        id: "B",
        text: "Usarlo para las tareas administrativas del día a día",
        correct: false,
        explanation:
          "Justo lo contrario. Trabajar a diario con el root significa operar siempre con permisos totales, donde cualquier error se vuelve catastrófico.",
      },
      {
        id: "C",
        text: "Compartir sus credenciales con el equipo de administradores",
        correct: false,
        explanation:
          "Compartir credenciales elimina la posibilidad de saber quién hizo qué, y multiplica las chances de filtración. Cada persona debe tener su propio usuario IAM.",
      },
      {
        id: "D",
        text: "Reservarlo solo para las tareas que únicamente él puede hacer",
        correct: true,
        explanation:
          "Correcta. Hay unas pocas tareas que exigen el root, como cerrar la cuenta o cambiar el plan de soporte. Para todo lo demás se usan usuarios IAM con los permisos justos.",
      },
      {
        id: "E",
        text: "Quitarle permisos para que no pueda borrar recursos",
        correct: false,
        explanation:
          "No se le pueden quitar permisos al root: es la llave maestra por diseño. Por eso la protección consiste en guardarlo bien y no usarlo, no en limitarlo.",
      },
    ],
    tips: [
      "El root se protege de dos formas: **MFA activado** y **no usarlo salvo cuando es obligatorio**. Esas dos aparecen juntas muy seguido.",
      "Cualquier opción que proponga compartir credenciales es incorrecta en cualquier pregunta de IAM.",
      "Recordá que al root no se le pueden recortar permisos. Si una opción lo plantea, es un distractor inventado.",
    ],
  },
  {
    id: "m2-q14",
    prompt:
      "Una empresa incorpora cinco personas nuevas al área de contabilidad, y todas necesitan exactamente los mismos permisos. ¿Cuál es la forma más eficiente de administrarlos?",
    options: [
      {
        id: "A",
        text: "Asignarle las políticas a cada usuario por separado",
        correct: false,
        explanation:
          "Funciona, pero es lento y frágil: cuando los permisos cambien habrá que repetir la modificación cinco veces, y es fácil que alguno quede distinto sin que nadie lo note.",
      },
      {
        id: "B",
        text: "Crear un rol y compartirlo entre las cinco personas",
        correct: false,
        explanation:
          "Los roles existen para accesos temporales o para servicios, no para reemplazar la identidad permanente de empleados fijos. Estas personas necesitan sus propios usuarios.",
      },
      {
        id: "C",
        text: "Crear un solo usuario IAM que compartan las cinco",
        correct: false,
        explanation:
          "Compartir un usuario elimina la trazabilidad: cuando algo pase, no habrá forma de saber quién fue. Cada persona debe tener su credencial propia.",
      },
      {
        id: "D",
        text: "Crear un grupo con esas políticas y agregar a los cinco usuarios",
        correct: true,
        explanation:
          "Correcto. Los permisos se configuran una vez en el grupo y se aplican a todos sus miembros. Si mañana entra alguien más, se lo agrega al grupo; si se va, se lo saca.",
      },
    ],
    tips: [
      "Cuando el escenario mencione **varias personas con los mismos permisos**, la respuesta es grupo.",
      "Recordá que un grupo no es una identidad: no se inicia sesión con él, solo sirve para asignar permisos de a muchos.",
      "Grupo es para personas con el mismo rol laboral; rol de IAM es para accesos temporales y para servicios. No los mezcles.",
    ],
  },
  {
    id: "m2-q15",
    prompt:
      "A un usuario IAM se le aplican dos políticas: una le permite borrar archivos de un depósito de almacenamiento, y otra se lo niega expresamente. ¿Qué ocurre cuando intenta borrar un archivo?",
    options: [
      {
        id: "A",
        text: "Puede borrarlo, porque existe una política que se lo permite",
        correct: false,
        explanation:
          "Un permiso no alcanza cuando hay una negación explícita en juego. Si funcionara así, cualquier política mal escrita podría anular una restricción de seguridad puesta a propósito.",
      },
      {
        id: "B",
        text: "No puede borrarlo: la negación explícita prevalece",
        correct: true,
        explanation:
          "Correcto. Una negación explícita le gana siempre a cualquier permiso. Esta regla existe justamente para que una prohibición deliberada no pueda ser anulada sin querer.",
      },
      {
        id: "C",
        text: "Depende de cuál política se haya aplicado más recientemente",
        correct: false,
        explanation:
          "El orden o la fecha de las políticas no influye en la evaluación. No hay ninguna noción de \"la última gana\" en IAM.",
      },
      {
        id: "D",
        text: "Puede borrarlo solo si además tiene MFA activado",
        correct: false,
        explanation:
          "MFA es una prueba adicional de identidad al iniciar sesión, no una forma de sortear una negación. Es un distractor que mezcla dos conceptos distintos.",
      },
    ],
    tips: [
      "Grabate el orden de evaluación: **negación explícita > permiso explícito > todo lo demás prohibido**.",
      "Si en una pregunta aparecen dos políticas en conflicto, la respuesta casi siempre es que gana la que niega.",
      "Descartá cualquier opción que hable de orden, antigüedad o prioridad entre políticas: eso no existe en IAM.",
    ],
  },
  {
    id: "m2-q16",
    prompt:
      "Una empresa tiene ocho cuentas de AWS separadas y quiere que sus empleados inicien sesión una sola vez y accedan desde ahí a las cuentas que les correspondan, usando el sistema de usuarios que la empresa ya tiene. ¿Qué servicio le conviene?",
    options: [
      {
        id: "A",
        text: "Crear los mismos usuarios IAM en cada una de las ocho cuentas",
        correct: false,
        explanation:
          "Es justamente el problema que hay que evitar: usuarios duplicados, permisos que se desalinean con el tiempo y credenciales que hay que dar de baja ocho veces cuando alguien se va.",
      },
      {
        id: "B",
        text: "AWS Firewall Manager",
        correct: false,
        explanation:
          "Firewall Manager sí trabaja sobre varias cuentas, pero para aplicar reglas de red y de cortafuegos, no para administrar el inicio de sesión de las personas.",
      },
      {
        id: "C",
        text: "AWS IAM Identity Center",
        correct: true,
        explanation:
          "Correcto. Identity Center permite iniciar sesión una sola vez y acceder a todas las cuentas donde la persona tenga permiso, integrándose además con el sistema de usuarios que la empresa ya use.",
      },
      {
        id: "D",
        text: "Compartir el usuario root de la cuenta principal",
        correct: false,
        explanation:
          "Compartir el root es la peor opción posible en cualquier escenario: permisos totales, sin trazabilidad y sin posibilidad de limitarlo.",
      },
    ],
    tips: [
      "Las palabras **varias cuentas** + **iniciar sesión una sola vez** apuntan a IAM Identity Center.",
      "Ojo con Firewall Manager: también actúa sobre varias cuentas, pero sobre reglas de seguridad de red, no sobre identidades.",
      "Si una opción propone duplicar usuarios manualmente en muchos lugares, casi siempre es el problema y no la solución.",
    ],
  },
  {
    id: "m2-q17",
    prompt:
      "El sitio web de una empresa queda fuera de servicio porque recibe una cantidad enorme de tráfico falso destinado a saturarlo. ¿Qué servicio de AWS está pensado para defenderla de esto?",
    options: [
      {
        id: "A",
        text: "AWS Shield",
        correct: true,
        explanation:
          "Correcto. Shield es la protección contra ataques de denegación de servicio (DDoS), es decir, saturar un sitio con tráfico basura hasta que deja de responder. Shield Standard viene activado y gratis para todos.",
      },
      {
        id: "B",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "GuardDuty detecta actividad sospechosa y avisa, pero no bloquea nada. Ante un ataque en curso, avisarte no mantiene el sitio en pie.",
      },
      {
        id: "C",
        text: "AWS Config",
        correct: false,
        explanation:
          "Config vigila la configuración de tus recursos. No tiene ninguna función de defensa frente al tráfico entrante.",
      },
      {
        id: "D",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Inspector busca vulnerabilidades en tus sistemas antes de que alguien las aproveche. No interviene durante un ataque de saturación.",
      },
    ],
    tips: [
      "**Shield = volumen (DDoS), WAF = contenido (reglas).** Con esa frase se resuelven casi todas las preguntas de protección.",
      "Si una opción dice que hay que contratar o activar Shield Standard, es incorrecta: viene por defecto y sin costo. El que se paga es Shield Advanced.",
      "Filtro rápido: si el escenario pide **impedir** algo, descartá GuardDuty, Inspector, Macie y Security Hub, que solo detectan y avisan.",
    ],
  },
  {
    id: "m2-q18",
    prompt:
      "Una empresa quiere bloquear las peticiones a su aplicación web que provengan de determinados países y las que intenten colar instrucciones maliciosas dentro de sus formularios. ¿Qué servicio necesita?",
    options: [
      {
        id: "A",
        text: "AWS Shield",
        correct: false,
        explanation:
          "Shield frena avalanchas de tráfico, pero no distingue el contenido de cada petición. No puede decidir por país ni detectar instrucciones maliciosas dentro de un formulario.",
      },
      {
        id: "B",
        text: "AWS KMS",
        correct: false,
        explanation:
          "KMS administra llaves de cifrado. No filtra tráfico web de ninguna manera.",
      },
      {
        id: "C",
        text: "AWS WAF",
        correct: true,
        explanation:
          "Correcto. WAF revisa cada petición web y la bloquea o la deja pasar según reglas que vos definís: por país, por dirección de origen, por patrones maliciosos o por cantidad de peticiones.",
      },
      {
        id: "D",
        text: "AWS Security Hub",
        correct: false,
        explanation:
          "Security Hub reúne hallazgos de seguridad en un panel único. Muestra información, no bloquea tráfico.",
      },
    ],
    tips: [
      "Cuando el escenario nombra **reglas concretas sobre las peticiones** (país, dirección, patrón, cantidad por minuto), es WAF.",
      "Shield y WAF no compiten: se usan juntos. Shield frena la avalancha y WAF revisa lo que sí llega.",
      "WAF se coloca delante de la aplicación, no dentro del servidor. Esa idea ayuda a descartar opciones que hablan de instalar algo en la instancia.",
    ],
  },
  {
    id: "m2-q19",
    prompt:
      "Una organización con veinte cuentas de AWS quiere definir sus reglas de cortafuegos una sola vez y que se apliquen automáticamente en todas, incluidas las cuentas que se creen más adelante. ¿Qué servicio se lo permite?",
    options: [
      {
        id: "A",
        text: "AWS WAF",
        correct: false,
        explanation:
          "WAF define y aplica las reglas, pero por sí solo hay que configurarlo cuenta por cuenta. Le falta la parte de administración centralizada que pide el escenario.",
      },
      {
        id: "B",
        text: "AWS IAM Identity Center",
        correct: false,
        explanation:
          "Identity Center centraliza el inicio de sesión de las personas en varias cuentas, no las reglas de cortafuegos. Es el distractor que confunde dos tipos distintos de centralización.",
      },
      {
        id: "C",
        text: "AWS Security Hub",
        correct: false,
        explanation:
          "Security Hub centraliza los hallazgos de seguridad para verlos juntos, pero no aplica ni impone reglas de cortafuegos.",
      },
      {
        id: "D",
        text: "AWS Firewall Manager",
        correct: true,
        explanation:
          "Correcto. Firewall Manager permite definir las reglas una vez y aplicarlas a todas las cuentas de la organización, incluidas las futuras. Es la empresa de seguridad que impone el mismo protocolo en todas las sucursales.",
      },
    ],
    tips: [
      "La combinación **varias cuentas + reglas uniformes o centralizadas** es la firma de Firewall Manager.",
      "Cuidado con las tres formas de \"centralizar\" del módulo: Identity Center centraliza identidades, Firewall Manager centraliza reglas, Security Hub centraliza hallazgos.",
      "Que el escenario mencione cuentas futuras refuerza la respuesta: aplicar reglas automáticamente a lo que todavía no existe es propio de Firewall Manager.",
    ],
  },
  {
    id: "m2-q20",
    prompt:
      "Una empresa necesita un software de seguridad de otro proveedor, ya listo para usar, y prefiere que el costo aparezca en su misma factura de AWS en lugar de negociar un contrato aparte. ¿Dónde lo consigue?",
    options: [
      {
        id: "A",
        text: "En AWS Artifact",
        correct: false,
        explanation:
          "Artifact entrega informes de cumplimiento de AWS. No es una tienda ni ofrece software de terceros.",
      },
      {
        id: "B",
        text: "En AWS Marketplace",
        correct: true,
        explanation:
          "Correcto. Marketplace es la tienda dentro de AWS con software de otras empresas listo para usar, y su gran ventaja es que se paga junto con tu factura de AWS.",
      },
      {
        id: "C",
        text: "En AWS Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor da recomendaciones sobre tu cuenta. Puede sugerirte mejoras, pero no es donde se adquiere software.",
      },
      {
        id: "D",
        text: "En AWS Config",
        correct: false,
        explanation:
          "Config vigila la configuración de tus recursos. No distribuye ni vende software.",
      },
    ],
    tips: [
      "Ante \"software de terceros\", \"de otro proveedor\" o \"ya listo para usar\", la respuesta es Marketplace.",
      "El detalle de que se cobra en la misma factura de AWS es parte del beneficio y suele aparecer en el enunciado como pista.",
      "No confundas Marketplace (comprar herramientas) con Artifact (descargar certificados). Ambos son \"lugares donde conseguir algo\", pero cosas muy distintas.",
    ],
  },
  {
    id: "m2-q21",
    prompt:
      "Una empresa quiere que alguien vigile su cuenta de forma continua y la avise si detecta accesos desde países donde nunca operó o servidores comunicándose con direcciones conocidas por ser maliciosas. ¿Qué servicio hace eso?",
    options: [
      {
        id: "A",
        text: "Amazon GuardDuty",
        correct: true,
        explanation:
          "Correcto. GuardDuty analiza de forma continua los registros que tu cuenta ya genera y avisa cuando detecta comportamiento que no encaja. Es el detective que mira las cámaras y nota lo raro.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Inspector busca debilidades tuyas —software desactualizado, fallas conocidas— pero no vigila el comportamiento en curso. Detecta por dónde podrían entrar, no que estén entrando.",
      },
      {
        id: "C",
        text: "AWS Artifact",
        correct: false,
        explanation:
          "Artifact solo entrega informes de cumplimiento de AWS. No analiza nada de tu cuenta.",
      },
      {
        id: "D",
        text: "AWS WAF",
        correct: false,
        explanation:
          "WAF filtra peticiones web según reglas que definís de antemano. No hace análisis continuo de comportamiento ni detecta patrones sospechosos por su cuenta.",
      },
    ],
    tips: [
      "**GuardDuty = amenaza ocurriendo ahora; Inspector = debilidad que todavía nadie usó.** Es la confusión más cara del módulo.",
      "Las frases \"actividad sospechosa\", \"comportamiento inusual\" y \"análisis continuo\" apuntan a GuardDuty.",
      "GuardDuty avisa, no bloquea. Si el escenario pidiera impedir el acceso, la respuesta estaría entre Shield y WAF.",
    ],
  },
  {
    id: "m2-q22",
    prompt:
      "¿Cuáles DOS de los siguientes servicios detectan problemas y avisan, en lugar de bloquear el tráfico?",
    multiple: true,
    options: [
      {
        id: "A",
        text: "AWS Shield",
        correct: false,
        explanation:
          "Shield bloquea: frena los ataques de saturación antes de que tumben el sitio. Está del lado de la protección, no de la detección.",
      },
      {
        id: "B",
        text: "Amazon GuardDuty",
        correct: true,
        explanation:
          "Correcta. GuardDuty analiza la actividad de la cuenta y alerta sobre comportamiento sospechoso, pero no interviene para frenarlo.",
      },
      {
        id: "C",
        text: "AWS WAF",
        correct: false,
        explanation:
          "WAF bloquea peticiones web según tus reglas. Es de la familia que impide, no de la que avisa.",
      },
      {
        id: "D",
        text: "AWS Firewall Manager",
        correct: false,
        explanation:
          "Firewall Manager aplica reglas de bloqueo en muchas cuentas a la vez. Su función es hacer cumplir la protección, no detectar.",
      },
      {
        id: "E",
        text: "Amazon Inspector",
        correct: true,
        explanation:
          "Correcta. Inspector revisa tus sistemas y te informa qué vulnerabilidades encontró, pero no las corrige ni impide que alguien las aproveche.",
      },
    ],
    tips: [
      "El corte más útil del módulo: **Shield, WAF y Firewall Manager bloquean; GuardDuty, Inspector, Macie, Security Hub y Trusted Advisor avisan.**",
      "Si el escenario pide impedir algo, mirá la primera lista; si pide enterarse de algo, la segunda.",
      "Aplicá este filtro antes de pensar en qué hace cada servicio: descarta la mitad de las opciones en un segundo.",
    ],
  },
  {
    id: "m2-q23",
    prompt:
      "El área legal de una empresa sospecha que en su almacenamiento en Amazon S3 hay archivos con números de documento y datos de tarjetas de clientes, guardados sin protección. Quiere descubrir dónde están. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "GuardDuty detecta amenazas y comportamiento sospechoso. Acá no hay ningún ataque: el problema es información delicada guardada donde no corresponde.",
      },
      {
        id: "B",
        text: "AWS CloudTrail",
        correct: false,
        explanation:
          "CloudTrail registra quién hizo qué en la cuenta. Podría decirte quién subió un archivo, pero no analiza el contenido para saber si tiene datos personales.",
      },
      {
        id: "C",
        text: "Amazon Macie",
        correct: true,
        explanation:
          "Correcto. Macie analiza lo que guardás en S3 y avisa cuando encuentra datos personales o sensibles, como números de documento o de tarjeta. Es quien abre los archivadores y te dice qué hay adentro.",
      },
      {
        id: "D",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Inspector busca vulnerabilidades en servidores y aplicaciones, no datos sensibles dentro de los archivos almacenados. Revisa las cerraduras, no el contenido de los cajones.",
      },
    ],
    tips: [
      "La combinación **datos personales o sensibles + S3** apunta a Macie casi siempre.",
      "Macie cubre un caso que no es un ataque: nadie entró, pero hay información delicada mal ubicada. Ese matiz lo distingue de GuardDuty.",
      "Inspector mira sistemas, Macie mira contenido. Si el enunciado habla de lo que hay *dentro* de los archivos, es Macie.",
    ],
  },
  {
    id: "m2-q24",
    prompt:
      "Una empresa usa GuardDuty, Inspector y Macie, pero su equipo de seguridad se queja de tener que revisar tres consolas distintas y no saber qué atender primero. ¿Qué servicio resuelve ese problema?",
    options: [
      {
        id: "A",
        text: "AWS Config",
        correct: false,
        explanation:
          "Config vigila la configuración de los recursos y su historial de cambios. Es una fuente más de información, no el lugar donde se reúnen los hallazgos de los otros servicios.",
      },
      {
        id: "B",
        text: "Amazon CloudWatch",
        correct: false,
        explanation:
          "CloudWatch centraliza métricas y registros de rendimiento, no los hallazgos de seguridad de los servicios de detección. Es un distractor cómodo porque también agrupa información.",
      },
      {
        id: "C",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor genera sus propias recomendaciones en cinco categorías, pero no reúne ni ordena los hallazgos de GuardDuty, Inspector y Macie.",
      },
      {
        id: "D",
        text: "AWS Security Hub",
        correct: true,
        explanation:
          "Correcto. Security Hub reúne los hallazgos de esos servicios en un panel único, los ordena por gravedad y revisa además si la cuenta cumple estándares conocidos. No descubre nada por su cuenta: su valor es juntar y priorizar.",
      },
    ],
    tips: [
      "Si el enunciado pide una **vista única, central o consolidada** de la seguridad, es Security Hub.",
      "Security Hub **agrega**, no descubre. Ese matiz es exactamente lo que el examen quiere que distingas de GuardDuty, Inspector y Macie.",
      "Cuando varias opciones \"centralizan\" algo, fijate qué centralizan: métricas (CloudWatch), identidades (Identity Center), reglas (Firewall Manager) o hallazgos de seguridad (Security Hub).",
    ],
  },
  {
    id: "m2-q25",
    prompt:
      "Además de seguridad, ¿cuáles DOS de las siguientes categorías forman parte de las recomendaciones que entrega AWS Trusted Advisor?",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Optimización de costos",
        correct: true,
        explanation:
          "Correcta. Trusted Advisor te señala recursos que estás pagando y no usás, que es una de sus cinco categorías.",
      },
      {
        id: "B",
        text: "Sostenibilidad ambiental",
        correct: false,
        explanation:
          "La sostenibilidad es un pilar del Well-Architected Framework, pero no es una de las categorías de Trusted Advisor. Es un distractor efectivo porque mezcla dos listas que se parecen.",
      },
      {
        id: "C",
        text: "Cumplimiento normativo y certificaciones",
        correct: false,
        explanation:
          "Las certificaciones se consiguen en AWS Artifact, y evaluar el cumplimiento de tu cuenta contra estándares es de Security Hub. No es una categoría de Trusted Advisor.",
      },
      {
        id: "D",
        text: "Límites de servicio",
        correct: true,
        explanation:
          "Correcta. Trusted Advisor te avisa cuando te estás acercando al máximo permitido de algún recurso, antes de que eso te bloquee.",
      },
      {
        id: "E",
        text: "Gestión de identidades",
        correct: false,
        explanation:
          "Trusted Advisor sí revisa cuestiones de seguridad relacionadas con accesos, pero \"gestión de identidades\" no es una de sus cinco categorías: eso es el terreno de IAM.",
      },
    ],
    tips: [
      "Las cinco categorías de Trusted Advisor: **costos, rendimiento, seguridad, tolerancia a fallos y límites de servicio.**",
      "Trusted Advisor es el único servicio del módulo que no es solo de seguridad. Si la pregunta mezcla costos o rendimiento con seguridad, es él.",
      "No confundas sus categorías con los 6 pilares del Well-Architected (Módulo 1): se parecen, pero sostenibilidad está en los pilares y no en Trusted Advisor.",
    ],
  },
];
