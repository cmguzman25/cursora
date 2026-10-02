import type { ExamQuestionWithDomain } from "../../../types";

/**
 * Dominio 2 — Seguridad y cumplimiento. 19 de las 65 preguntas del simulacro
 * (29,2 %, contra el 30 % oficial), repartidas entre 2.1 responsabilidad
 * compartida, 2.2 gobierno y cumplimiento, 2.3 IAM, 2.4a protección contra
 * ataques y 2.4b detección y auditoría.
 */
export const SIM_D2: ExamQuestionWithDomain[] = [
  {
    id: "sim-d2-q01",
    domain: "2",
    prompt:
      "Una empresa corre su aplicación en instancias EC2 con Linux. Se publica un parche crítico del sistema operativo. Según el modelo de responsabilidad compartida, ¿quién tiene que aplicarlo?",
    options: [
      {
        id: "A",
        text: "El cliente",
        correct: true,
        explanation:
          "Correcta. En EC2, AWS entrega el hardware y el hipervisor, pero el sistema operativo que corre dentro de la instancia es del cliente: él elige la imagen, lo configura y lo parchea. Es la frontera que el examen pregunta más veces.",
      },
      {
        id: "B",
        text: "AWS",
        correct: false,
        explanation:
          "AWS parchea el sistema operativo en los servicios administrados, como RDS o Lambda, donde el cliente no tiene acceso a la máquina. En EC2 el cliente sí entra a la máquina, así que el parche es suyo.",
      },
      {
        id: "C",
        text: "AWS, siempre que la instancia tenga activadas las actualizaciones automáticas",
        correct: false,
        explanation:
          "Activar actualizaciones automáticas dentro de la instancia es una configuración que hace el cliente, y por lo tanto una responsabilidad del cliente. Automatizar una tarea no la transfiere a AWS.",
      },
      {
        id: "D",
        text: "Depende del plan de soporte contratado",
        correct: false,
        explanation:
          "El plan de soporte cambia los tiempos de respuesta y el acceso a asesoría, no el reparto de responsabilidades. Ningún plan de soporte hace que AWS parchee el sistema operativo de tus instancias EC2.",
      },
    ],
    tips: [
      "La regla corta: **si podés entrar a la máquina, el sistema operativo es tuyo.** En EC2 entrás; en RDS y Lambda no.",
      "Las opciones que atan la responsabilidad al **plan de soporte** son siempre incorrectas: el modelo de responsabilidad compartida no se compra.",
    ],
  },
  {
    id: "sim-d2-q02",
    domain: "2",
    prompt:
      "Un auditor pregunta quién decide qué datos de la empresa se consideran confidenciales y con qué nivel de cifrado se guardan en Amazon S3. ¿Cuál es la respuesta correcta según el modelo de responsabilidad compartida?",
    options: [
      {
        id: "A",
        text: "AWS, porque administra la infraestructura donde viven los datos",
        correct: false,
        explanation:
          "AWS administra la infraestructura y ofrece las herramientas de cifrado, pero no mira el contenido de los datos del cliente ni decide su clasificación. Administrar el almacén no es lo mismo que gobernar lo almacenado.",
      },
      {
        id: "B",
        text: "El cliente, porque la clasificación y la protección de los datos nunca se delegan",
        correct: true,
        explanation:
          "Correcta. Los datos del cliente son la única parte del modelo que es siempre, en todos los servicios, responsabilidad del cliente: qué datos son sensibles, quién accede y si se cifran. AWS da las herramientas; usarlas es decisión del cliente.",
      },
      {
        id: "C",
        text: "AWS, si el bucket tiene activado el cifrado del lado del servidor",
        correct: false,
        explanation:
          "El cifrado del lado del servidor lo ejecuta AWS, pero activarlo y elegir con qué claves es una configuración del cliente. Y la clasificación de qué dato es confidencial sigue siendo del cliente de todas formas.",
      },
      {
        id: "D",
        text: "Se reparte según el nivel de cumplimiento normativo que aplique",
        correct: false,
        explanation:
          "Las normativas imponen requisitos, pero no mueven la frontera del modelo. Los datos son del cliente con PCI DSS, con HIPAA y sin ninguna normativa.",
      },
    ],
    tips: [
      "Lo que **nunca** deja de ser del cliente, en ningún servicio: los datos, su clasificación y quién tiene acceso. Si una opción se lo atribuye a AWS, descartala.",
      "Separá dos cosas que el examen mezcla: AWS **ejecuta** el cifrado, el cliente **decide** que haya cifrado.",
    ],
  },
  {
    id: "sim-d2-q03",
    domain: "2",
    prompt:
      "Una empresa mueve su base de datos de una instancia EC2 autoadministrada a Amazon RDS. ¿Qué responsabilidad pasa de la empresa a AWS con ese cambio?",
    options: [
      {
        id: "A",
        text: "Definir quién puede consultar las tablas de la base",
        correct: false,
        explanation:
          "Los usuarios de la base de datos y sus permisos siguen siendo del cliente en RDS. AWS administra el motor, no decide quién consulta qué.",
      },
      {
        id: "B",
        text: "Decidir qué datos se guardan y si están cifrados",
        correct: false,
        explanation:
          "Los datos y su protección son del cliente en cualquier servicio. Pasar a un servicio administrado no cambia esto.",
      },
      {
        id: "C",
        text: "Instalar los parches del sistema operativo y del motor de base de datos",
        correct: true,
        explanation:
          "Correcta. Eso es precisamente lo que se delega al pasar a un servicio administrado: AWS se encarga del sistema operativo subyacente, de los parches del motor, de los respaldos automáticos y del reemplazo del hardware. El cliente deja de tener acceso a esa máquina, y por eso deja de ser responsable de ella.",
      },
      {
        id: "D",
        text: "Elegir el tamaño de la instancia de base de datos",
        correct: false,
        explanation:
          "Elegir el tamaño sigue siendo del cliente: es una decisión de costo y rendimiento que AWS no toma por él. De hecho, el rightsizing de instancias RDS es una recomendación habitual de Trusted Advisor.",
      },
    ],
    tips: [
      "Cuanto más administrado es el servicio, más responsabilidades se corren hacia AWS — pero siempre son las de **mantener la plataforma**, nunca las de **gobernar los datos**.",
      "Pensá el movimiento como una línea que se desplaza: EC2 (casi todo del cliente) → RDS → Lambda (casi todo de AWS), con los datos siempre del lado del cliente.",
    ],
  },
  {
    id: "sim-d2-q04",
    domain: "2",
    multiple: true,
    prompt:
      "¿Cuáles DOS de las siguientes son responsabilidades de AWS bajo el modelo de responsabilidad compartida? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "La seguridad física de los centros de datos",
        correct: true,
        explanation:
          "Correcta. La protección física de las instalaciones —vigilancia, control de acceso, energía, refrigeración— es de AWS, y es la parte del modelo que los clientes no pueden auditar por su cuenta: para eso existen los informes de AWS Artifact.",
      },
      {
        id: "B",
        text: "La configuración de los grupos de seguridad de la VPC",
        correct: false,
        explanation:
          "Los grupos de seguridad son del cliente. AWS provee el mecanismo; qué puertos se abren y hacia dónde es una decisión y una responsabilidad del cliente, y es una de las causas más comunes de exposición accidental.",
      },
      {
        id: "C",
        text: "El mantenimiento del hardware y de la infraestructura global",
        correct: true,
        explanation:
          "Correcta. Los servidores, el almacenamiento, la red y las Regiones y Zonas de disponibilidad que los agrupan son de AWS. Esto es lo que el modelo llama la seguridad **de** la nube.",
      },
      {
        id: "D",
        text: "La gestión de los usuarios y los permisos de IAM",
        correct: false,
        explanation:
          "IAM es un servicio que AWS opera, pero los usuarios, grupos, roles y políticas que se crean adentro son del cliente. Aplicar el principio de menor privilegio es responsabilidad suya.",
      },
      {
        id: "E",
        text: "El cifrado de los datos del cliente en reposo",
        correct: false,
        explanation:
          "AWS ofrece el cifrado y lo ejecuta cuando se lo activa, pero decidir que los datos se cifren y con qué claves es del cliente. Un bucket sin cifrar es un problema del cliente, no de AWS.",
      },
    ],
    tips: [
      "La frase que resuelve casi todas estas preguntas: **AWS asegura la nube, el cliente asegura lo que pone en la nube.**",
      "Si la opción nombra algo que se **configura desde la consola** (grupos de seguridad, IAM, cifrado de un bucket), es del cliente. Si nombra algo **físico o global**, es de AWS.",
    ],
  },
  {
    id: "sim-d2-q05",
    domain: "2",
    prompt:
      "El área legal de una empresa necesita el informe SOC 2 y la certificación ISO 27001 de AWS para presentarlos ante un auditor externo. ¿De dónde los descarga?",
    options: [
      {
        id: "A",
        text: "AWS Artifact",
        correct: true,
        explanation:
          "Correcta. AWS Artifact es el repositorio de informes de cumplimiento y acuerdos de AWS: SOC, ISO, PCI DSS y otros. Es autoservicio y sin costo, y existe justamente porque el cliente no puede auditar los centros de datos de AWS por su cuenta.",
      },
      {
        id: "B",
        text: "AWS Config",
        correct: false,
        explanation:
          "AWS Config registra cómo fueron cambiando las configuraciones de **tus** recursos y si cumplen las reglas que definís. Sirve para demostrar tu propio cumplimiento, no para obtener las certificaciones de AWS.",
      },
      {
        id: "C",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "Trusted Advisor revisa tu cuenta y recomienda mejoras en costos, rendimiento, seguridad, tolerancia a fallos y cuotas. No entrega documentación de cumplimiento de AWS.",
      },
      {
        id: "D",
        text: "AWS Audit Manager",
        correct: false,
        explanation:
          "Audit Manager automatiza la recolección de evidencia sobre tu propio uso de AWS para preparar auditorías. Es el distractor más fino de esta pregunta, pero los informes de AWS como proveedor están en Artifact.",
      },
    ],
    tips: [
      "**Informes y certificaciones de AWS** ⇒ Artifact. **Evidencia sobre tu propio uso** ⇒ Audit Manager o Config.",
      "La pregunta a hacerse es de quién es el cumplimiento: si es de AWS, es Artifact; si es tuyo, es otro servicio.",
    ],
  },
  {
    id: "sim-d2-q06",
    domain: "2",
    prompt:
      "Un grupo de seguridad de una VPC quedó abierto al mundo durante el fin de semana y nadie sabe desde cuándo ni cómo estaba configurado antes. ¿Qué servicio permite reconstruir el historial de configuración de ese recurso?",
    options: [
      {
        id: "A",
        text: "Amazon CloudWatch",
        correct: false,
        explanation:
          "CloudWatch recopila métricas y logs sobre cómo está funcionando un recurso: CPU, memoria, errores. No guarda cómo estaba configurado en el pasado.",
      },
      {
        id: "B",
        text: "AWS Config",
        correct: true,
        explanation:
          "Correcta. AWS Config lleva un inventario de los recursos y un historial versionado de sus configuraciones, así que permite ver exactamente cómo estaba un grupo de seguridad en cualquier momento y qué cambió. También evalúa si la configuración cumple las reglas definidas.",
      },
      {
        id: "C",
        text: "AWS CloudTrail",
        correct: false,
        explanation:
          "CloudTrail registra las llamadas a la API: diría **quién** hizo el cambio y cuándo. Es el complemento natural, y en la práctica se usan juntos, pero el historial del estado de la configuración lo guarda Config.",
      },
      {
        id: "D",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "GuardDuty detecta actividad maliciosa analizando logs y podría alertar sobre el tráfico que entró por ese puerto. No reconstruye configuraciones históricas.",
      },
    ],
    tips: [
      "El trío que más se mezcla, en una palabra cada uno: CloudTrail = **quién**, Config = **cómo estaba**, CloudWatch = **cómo funciona**.",
      "Si el enunciado pide **el historial de una configuración**, es Config. Si pide **el autor de una acción**, es CloudTrail.",
    ],
  },
  {
    id: "sim-d2-q07",
    domain: "2",
    prompt:
      "Una empresa con 30 cuentas de AWS quiere impedir, de forma central y sin excepciones, que cualquier cuenta pueda crear recursos fuera de las Regiones aprobadas, incluso si un administrador de esa cuenta lo intenta. ¿Qué mecanismo usa?",
    options: [
      {
        id: "A",
        text: "Una política de IAM adjunta a cada usuario administrador",
        correct: false,
        explanation:
          "Una política de IAM se puede modificar o desadjuntar por quien tenga permisos de administración en esa cuenta, así que no logra el 'sin excepciones' que pide el enunciado. Además habría que mantenerla en 30 cuentas.",
      },
      {
        id: "B",
        text: "Un grupo de IAM con los permisos restringidos",
        correct: false,
        explanation:
          "Los grupos de IAM organizan usuarios dentro de una sola cuenta y no cruzan los límites de la cuenta. No sirven como control central sobre 30 cuentas.",
      },
      {
        id: "C",
        text: "Una política de control de servicios (SCP) en AWS Organizations",
        correct: true,
        explanation:
          "Correcta. Las SCP se aplican desde AWS Organizations sobre cuentas o unidades organizativas y fijan el techo máximo de permisos: ni el usuario root de una cuenta hija puede excederlo. Es el único mecanismo de la lista que da un control central e inquebrantable.",
      },
      {
        id: "D",
        text: "Una regla de AWS Config en cada cuenta",
        correct: false,
        explanation:
          "Una regla de Config **detecta** y marca los recursos que no cumplen, e incluso puede remediarlos, pero no impide que se creen. El enunciado pide impedir, no detectar.",
      },
    ],
    tips: [
      "**Varias cuentas + control central que nadie pueda saltear** ⇒ SCP de Organizations. **Una sola cuenta** ⇒ políticas de IAM.",
      "Distinguí **prevenir** de **detectar**: una SCP prohíbe la acción; Config la encuentra después. Si el enunciado dice *impedir*, es prevención.",
    ],
  },
  {
    id: "sim-d2-q08",
    domain: "2",
    prompt:
      "Una aplicación envía datos de tarjetas de crédito desde el navegador del usuario hasta el servidor, y además los guarda en una base de datos. El equipo de seguridad exige proteger la información en los dos momentos. ¿Qué combinación corresponde?",
    options: [
      {
        id: "A",
        text: "Cifrado en tránsito para los datos guardados y cifrado en reposo para los datos que viajan",
        correct: false,
        explanation:
          "Están invertidos. En tránsito es mientras los datos viajan por la red; en reposo es mientras están almacenados. Esta opción existe para castigar a quien reconoce los dos términos pero no cuál es cuál.",
      },
      {
        id: "B",
        text: "Solo cifrado en reposo, porque protege los datos de forma permanente",
        correct: false,
        explanation:
          "El cifrado en reposo no protege nada mientras el dato cruza internet. Un atacante que intercepte la conexión vería las tarjetas en claro aunque la base esté cifrada.",
      },
      {
        id: "C",
        text: "Solo cifrado en tránsito, porque el riesgo real está en la red",
        correct: false,
        explanation:
          "Cifrar solo el tránsito deja la base legible para cualquiera que obtenga acceso al almacenamiento o a un respaldo. Las normativas de tarjetas exigen las dos cosas.",
      },
      {
        id: "D",
        text: "Cifrado en tránsito mientras los datos viajan y cifrado en reposo mientras están almacenados",
        correct: true,
        explanation:
          "Correcta. Son dos protecciones complementarias y el examen espera que se apliquen juntas: TLS o HTTPS para el viaje, y cifrado del almacenamiento (por ejemplo con claves de KMS) para los datos guardados. Cada una cubre un momento que la otra no.",
      },
    ],
    tips: [
      "**En tránsito = viajando** (TLS, HTTPS). **En reposo = guardado** (disco, bucket, respaldo). Memorizá la pareja, porque las preguntas suelen ofrecerla invertida.",
      "Cuando el enunciado dice **en los dos momentos** o nombra una normativa de datos sensibles, la respuesta casi nunca es una sola de las dos.",
    ],
  },
  {
    id: "sim-d2-q09",
    domain: "2",
    prompt:
      "Una función de AWS Lambda tiene que escribir registros en una tabla de Amazon DynamoDB. El equipo discute cómo otorgarle el permiso. ¿Cuál es la forma recomendada?",
    options: [
      {
        id: "A",
        text: "Asignarle a la función un rol de ejecución con permiso de escritura sobre esa tabla",
        correct: true,
        explanation:
          "Correcta. El rol de ejecución entrega credenciales temporales que AWS rota solo y que no quedan escritas en ninguna parte. Es la práctica recomendada para que un servicio acceda a otro, y la respuesta esperada siempre que el enunciado plantee un componente de AWS necesitando permiso sobre otro.",
      },
      {
        id: "B",
        text: "Guardar las claves de acceso de un usuario de IAM en las variables de entorno de la función",
        correct: false,
        explanation:
          "Son credenciales de larga duración almacenadas junto al código: quedan visibles para cualquiera que pueda ver la configuración de la función, no se rotan solas y hay que reemplazarlas a mano. Es el distractor que más aparece en este tipo de pregunta.",
      },
      {
        id: "C",
        text: "Usar las claves de acceso del usuario root, que ya tiene permiso sobre todo",
        correct: false,
        explanation:
          "Doblemente mal: el root tiene acceso total e irrevocable y no debe usarse para tareas cotidianas, y además serían credenciales de larga duración incrustadas en la función. Lo recomendado es que el root no tenga claves de acceso en absoluto.",
      },
      {
        id: "D",
        text: "Adjuntar a la tabla una política de recursos que permita el acceso a cualquier principal",
        correct: false,
        explanation:
          "Resolvería el acceso de la función abriéndolo a todos los demás a la vez. Dar permiso a cualquier principal para no tener que especificar uno es el patrón que termina en filtraciones.",
      },
    ],
    tips: [
      "Regla casi sin excepciones: **un servicio de AWS accediendo a otro ⇒ rol de IAM.** Si una opción propone guardar claves en algún lado, descartala.",
      "Los roles dan credenciales **temporales**; los usuarios, de **larga duración**. El examen premia siempre lo temporal.",
    ],
  },
  {
    id: "sim-d2-q10",
    domain: "2",
    prompt:
      "Una empresa acaba de crear su cuenta de AWS. ¿Cuál es la práctica recomendada respecto del usuario root?",
    options: [
      {
        id: "A",
        text: "Compartirlo entre el equipo de administradores para que todos puedan resolver urgencias",
        correct: false,
        explanation:
          "Compartir credenciales elimina la posibilidad de saber quién hizo qué, que es la base de cualquier auditoría. Cada persona debe tener su propia identidad.",
      },
      {
        id: "B",
        text: "Activarle MFA, usarlo solo para las tareas que lo requieren y trabajar el día a día con usuarios o roles",
        correct: true,
        explanation:
          "Correcta. El root tiene acceso total e irrevocable a la cuenta, así que se protege con autenticación multifactor y se reserva para las pocas tareas que solo él puede hacer, como cerrar la cuenta o cambiar el plan de soporte. Todo lo demás va por identidades con permisos limitados.",
      },
      {
        id: "C",
        text: "Eliminarlo después de crear el primer usuario administrador",
        correct: false,
        explanation:
          "El usuario root no se puede eliminar: es la identidad original de la cuenta y existe mientras exista la cuenta. Lo que sí conviene es no tenerle claves de acceso y no usarlo.",
      },
      {
        id: "D",
        text: "Usarlo para todas las tareas administrativas, ya que es el único con permisos completos",
        correct: false,
        explanation:
          "Es exactamente lo contrario de la recomendación. Y el supuesto es falso: un usuario o rol de IAM puede recibir permisos administrativos amplios sin ser el root.",
      },
    ],
    tips: [
      "Las tres cosas que el examen espera sobre el root: **activarle MFA**, **no usarlo a diario** y **no tenerle claves de acceso**. No se elimina.",
      "Cualquier opción que proponga **compartir** una credencial es incorrecta, sin importar lo práctica que suene.",
    ],
  },
  {
    id: "sim-d2-q11",
    domain: "2",
    prompt:
      "Un analista nuevo necesita leer informes en un bucket de S3 específico. El administrador le otorga permisos de lectura solo sobre ese bucket, y nada más. ¿Qué principio de seguridad está aplicando?",
    options: [
      {
        id: "A",
        text: "Defensa en profundidad",
        correct: false,
        explanation:
          "La defensa en profundidad es poner varias capas de control, de modo que si una falla queden otras. Es un principio real, pero no describe el acto de acotar los permisos de una persona a lo que necesita.",
      },
      {
        id: "B",
        text: "Separación de funciones",
        correct: false,
        explanation:
          "La separación de funciones reparte una tarea sensible entre varias personas para que ninguna la complete sola. Acá no hay una tarea repartida: hay un permiso acotado.",
      },
      {
        id: "C",
        text: "Principio de menor privilegio",
        correct: true,
        explanation:
          "Correcta. El menor privilegio consiste en otorgar únicamente los permisos necesarios para la tarea, y nada más. Dar lectura sobre un bucket puntual en vez de acceso general a S3 es su aplicación literal.",
      },
      {
        id: "D",
        text: "Autenticación multifactor",
        correct: false,
        explanation:
          "MFA es un mecanismo para verificar la identidad con un segundo factor. Responde a *quién sos*, no a *qué podés hacer*, que es lo que se está limitando acá.",
      },
    ],
    tips: [
      "Distinguí **autenticación** de **autorización**: MFA confirma quién sos; el menor privilegio limita qué podés hacer.",
      "Las palabras **solo, únicamente, lo mínimo necesario, nada más** señalan menor privilegio.",
    ],
  },
  {
    id: "sim-d2-q12",
    domain: "2",
    prompt:
      "Un administrador adjuntó la misma política, una por una, a los doce usuarios de IAM del área de datos. Ahora tiene que agregarles un permiso más, y quiere evitar repetir cada cambio futuro doce veces. ¿Qué debería hacer?",
    options: [
      {
        id: "A",
        text: "Adjuntar también la política nueva a cada uno de los doce usuarios",
        correct: false,
        explanation:
          "Resuelve el pedido de hoy y deja el problema intacto: el próximo cambio vuelve a ser doce modificaciones, y basta olvidarse de un usuario para que los permisos queden descalibrados sin que nadie lo note.",
      },
      {
        id: "B",
        text: "Crear un usuario de IAM compartido para el área de datos",
        correct: false,
        explanation:
          "Compartir una identidad rompe la trazabilidad: CloudTrail registraría todas las acciones como del mismo usuario y sería imposible saber quién hizo qué.",
      },
      {
        id: "C",
        text: "Pedirles que usen las credenciales del administrador cuando necesiten el permiso nuevo",
        correct: false,
        explanation:
          "Además de compartir credenciales, les otorga todos los permisos del administrador en vez del único que necesitan. Viola la trazabilidad y el principio de menor privilegio a la vez.",
      },
      {
        id: "D",
        text: "Crear un grupo de IAM, mover a los doce usuarios y adjuntar las políticas al grupo",
        correct: true,
        explanation:
          "Correcta. Los grupos existen justamente para esto: la política se define una vez y todos los miembros la heredan, así que un cambio futuro se aplica a los doce de una sola vez. Cada persona conserva su propia identidad, y con ella su trazabilidad.",
      },
    ],
    tips: [
      "**Varias personas con el mismo rol de trabajo** ⇒ grupo de IAM. **Un servicio que necesita acceder a otro** ⇒ rol.",
      "Cualquier opción que implique compartir una identidad pierde la trazabilidad, y eso solo ya alcanza para descartarla.",
    ],
  },
  {
    id: "sim-d2-q13",
    domain: "2",
    prompt:
      "Una empresa con varias cuentas de AWS quiere que sus empleados entren a todas ellas con las credenciales corporativas que ya usan en su directorio interno, sin crear un usuario de IAM por persona en cada cuenta. ¿Qué servicio resuelve esto?",
    options: [
      {
        id: "A",
        text: "AWS IAM Identity Center",
        correct: true,
        explanation:
          "Correcta. IAM Identity Center administra de forma central el acceso de las personas a múltiples cuentas de AWS y se conecta con un directorio corporativo existente, así que cada empleado usa sus credenciales de siempre y recibe acceso temporal a las cuentas que le corresponden.",
      },
      {
        id: "B",
        text: "Amazon Cognito",
        correct: false,
        explanation:
          "Cognito administra la identidad de los **usuarios de tus aplicaciones** (registro, inicio de sesión en una app móvil o web), no el acceso de tus empleados a la consola de AWS. Es el distractor más tentador de esta pregunta.",
      },
      {
        id: "C",
        text: "AWS Organizations",
        correct: false,
        explanation:
          "Organizations agrupa las cuentas para gobernarlas y facturarlas de forma conjunta, y es un prerrequisito habitual. Pero no es el servicio que autentica a las personas ni el que las conecta con el directorio corporativo.",
      },
      {
        id: "D",
        text: "AWS Secrets Manager",
        correct: false,
        explanation:
          "Secrets Manager guarda y rota credenciales que usan las aplicaciones, como la contraseña de una base de datos. No gestiona el inicio de sesión de las personas.",
      },
    ],
    tips: [
      "La distinción clave: **empleados accediendo a AWS** ⇒ IAM Identity Center. **Usuarios finales de tu aplicación** ⇒ Cognito.",
      "**Varias cuentas + credenciales corporativas existentes + sin duplicar usuarios** es la firma de IAM Identity Center.",
    ],
  },
  {
    id: "sim-d2-q14",
    domain: "2",
    multiple: true,
    prompt:
      "¿Cuáles DOS de las siguientes son prácticas recomendadas de seguridad en AWS? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Activar la autenticación multifactor en las identidades con permisos elevados",
        correct: true,
        explanation:
          "Correcta. MFA agrega un segundo factor, así que una contraseña filtrada deja de ser suficiente para entrar. Es la recomendación más repetida del examen, y especialmente para el usuario root.",
      },
      {
        id: "B",
        text: "Rotar las claves de acceso con regularidad",
        correct: true,
        explanation:
          "Correcta. Una clave de acceso de larga duración acumula riesgo con el tiempo: cuanto más vieja, más lugares pudo haber quedado copiada. Rotarla limita la ventana en la que sirve si se filtró.",
      },
      {
        id: "C",
        text: "Otorgar permisos amplios desde el principio y recortarlos cuando alguien se queje",
        correct: false,
        explanation:
          "Es lo contrario del menor privilegio. Los permisos de más casi nunca se recortan después, porque nadie se queja de poder hacer demasiado: se arranca con lo mínimo y se agrega lo que haga falta.",
      },
      {
        id: "D",
        text: "Usar el usuario root para las tareas administrativas diarias",
        correct: false,
        explanation:
          "El root se reserva para las pocas tareas que lo exigen y se protege con MFA. Usarlo a diario significa operar siempre con acceso total y sin poder distinguir quién hizo qué.",
      },
      {
        id: "E",
        text: "Incrustar las credenciales en el código para que no se pierdan",
        correct: false,
        explanation:
          "Las credenciales en el código terminan en el repositorio y desde ahí se filtran. Para una aplicación la respuesta es un rol de IAM; para un secreto que haya que guardar, Secrets Manager.",
      },
    ],
    tips: [
      "Las respuestas correctas de seguridad casi siempre **agregan una verificación** o **reducen permisos y vida útil**. Las incorrectas amplían el acceso por comodidad.",
      "Si una opción justifica una mala práctica con un beneficio operativo (*para que no se pierdan*, *para resolver urgencias*), está mal.",
    ],
  },
  {
    id: "sim-d2-q15",
    domain: "2",
    prompt:
      "El sitio web de una empresa queda inaccesible porque recibe un volumen enorme de tráfico desde miles de direcciones distintas, en un ataque de denegación de servicio distribuido. ¿Qué servicio de AWS está diseñado para mitigarlo?",
    options: [
      {
        id: "A",
        text: "AWS WAF",
        correct: false,
        explanation:
          "WAF filtra tráfico malicioso a nivel de la aplicación: inyección SQL, scripts entre sitios, solicitudes que coinciden con reglas que definís. Ayuda contra ataques de capa 7, pero el servicio dedicado a la denegación de servicio por volumen es Shield.",
      },
      {
        id: "B",
        text: "AWS Shield",
        correct: true,
        explanation:
          "Correcta. Shield es el servicio específico de protección contra denegación de servicio distribuida. Shield Standard está activo para todos los clientes sin costo ni configuración; Shield Advanced se paga y agrega mitigación de ataques mayores, informes y acceso al equipo de respuesta de AWS.",
      },
      {
        id: "C",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "GuardDuty detecta actividad sospechosa analizando logs y podría alertar sobre el ataque. Pero detectar no es mitigar: no bloquea el tráfico.",
      },
      {
        id: "D",
        text: "AWS Firewall Manager",
        correct: false,
        explanation:
          "Firewall Manager administra de forma central las reglas de WAF y Shield en varias cuentas. Es una herramienta de administración, no el motor que absorbe el ataque.",
      },
    ],
    tips: [
      "**Denegación de servicio, volumen, inundación de tráfico** ⇒ Shield. **Inyección SQL, scripts, reglas de solicitudes** ⇒ WAF.",
      "Separá siempre **detectar** de **mitigar**: GuardDuty avisa, Shield y WAF bloquean.",
    ],
  },
  {
    id: "sim-d2-q16",
    domain: "2",
    prompt:
      "Una aplicación web recibe intentos de inyección SQL a través de un formulario de búsqueda. El equipo quiere filtrar esas solicitudes antes de que lleguen a la aplicación, con reglas propias. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "AWS Shield Advanced",
        correct: false,
        explanation:
          "Shield Advanced protege contra denegación de servicio y de hecho incluye WAF, pero el componente que filtra solicitudes por su contenido es WAF. Elegir Shield acá es resolver el problema con la herramienta equivocada y pagando de más.",
      },
      {
        id: "B",
        text: "Un grupo de seguridad de la VPC",
        correct: false,
        explanation:
          "Un grupo de seguridad permite tráfico por puerto, protocolo y origen, y deniega implícitamente todo lo que no haya permitido. Pero no puede ver el contenido de una solicitud HTTP, así que no distingue una búsqueda legítima de una inyección SQL.",
      },
      {
        id: "C",
        text: "AWS WAF",
        correct: true,
        explanation:
          "Correcta. WAF es un firewall de aplicaciones web: inspecciona las solicitudes HTTP y las bloquea según reglas, con conjuntos ya preparados para inyección SQL y scripts entre sitios, además de reglas propias y límites por tasa.",
      },
      {
        id: "D",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Inspector analiza instancias, contenedores y funciones buscando vulnerabilidades conocidas. Informa que hay un problema; no filtra el tráfico que lo explota.",
      },
    ],
    tips: [
      "Los firewalls se distinguen por **qué capa miran**: grupo de seguridad y NACL miran puertos y direcciones; WAF mira el contenido de la solicitud.",
      "**Reglas propias sobre solicitudes web** es la firma de WAF.",
    ],
  },
  {
    id: "sim-d2-q17",
    domain: "2",
    prompt:
      "Una aplicación necesita la contraseña de su base de datos para conectarse. El equipo de seguridad exige que no esté en el código y que se renueve automáticamente cada 30 días. ¿Qué servicio corresponde?",
    options: [
      {
        id: "A",
        text: "AWS KMS",
        correct: false,
        explanation:
          "KMS crea y administra **claves de cifrado** y se usa para cifrar datos. No está pensado para guardar una contraseña de base de datos ni para rotarla: es el distractor principal, porque los dos servicios suenan a 'guardar algo secreto'.",
      },
      {
        id: "B",
        text: "AWS CloudHSM",
        correct: false,
        explanation:
          "CloudHSM es un módulo de hardware dedicado para administrar claves criptográficas cuando una normativa exige hardware exclusivo. Es aún más específico que KMS y tampoco rota contraseñas de aplicaciones.",
      },
      {
        id: "C",
        text: "AWS IAM",
        correct: false,
        explanation:
          "IAM administra identidades y permisos dentro de AWS. La contraseña de un motor de base de datos es una credencial de la base, no una identidad de IAM.",
      },
      {
        id: "D",
        text: "AWS Secrets Manager",
        correct: true,
        explanation:
          "Correcta. Secrets Manager guarda credenciales y otros secretos, los entrega a la aplicación mediante una llamada a la API con permisos de IAM, y los **rota automáticamente** según el plazo que se configure. La rotación automática es la palabra que decide esta pregunta.",
      },
    ],
    tips: [
      "**Claves de cifrado** ⇒ KMS. **Hardware dedicado por normativa** ⇒ CloudHSM. **Contraseñas y credenciales que se rotan** ⇒ Secrets Manager.",
      "La palabra **rotación automática** apunta a Secrets Manager casi sin excepción.",
    ],
  },
  {
    id: "sim-d2-q18",
    domain: "2",
    prompt:
      "Una empresa de salud quiere saber si hay historias clínicas o números de documento guardados por error en alguno de sus cientos de buckets de S3. ¿Qué servicio está diseñado para encontrarlos?",
    options: [
      {
        id: "A",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "GuardDuty detecta actividad maliciosa o anómala —accesos desde lugares inesperados, instancias comprometidas— analizando logs. No examina el contenido de los archivos.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Inspector busca vulnerabilidades conocidas y exposiciones de red en instancias EC2, contenedores y funciones Lambda. No mira datos almacenados en S3.",
      },
      {
        id: "C",
        text: "AWS Security Hub",
        correct: false,
        explanation:
          "Security Hub centraliza y prioriza los hallazgos de otros servicios de seguridad, incluido Macie. Es el tablero donde aparecería el resultado, pero no el servicio que descubre los datos sensibles.",
      },
      {
        id: "D",
        text: "Amazon Macie",
        correct: true,
        explanation:
          "Correcta. Macie usa aprendizaje automático para descubrir y clasificar datos sensibles en S3: datos personales, números de documento, información de salud o financiera. Es el único de la lista que inspecciona el contenido de los objetos almacenados.",
      },
    ],
    tips: [
      "Cada uno responde una pregunta distinta: GuardDuty *¿me están atacando?*, Inspector *¿tengo vulnerabilidades?*, Macie *¿tengo datos sensibles en S3?*, Security Hub *¿qué dicen todos juntos?*",
      "**S3 + datos personales o sensibles** ⇒ Macie, siempre.",
    ],
  },
  {
    id: "sim-d2-q19",
    domain: "2",
    multiple: true,
    prompt:
      "Un equipo de seguridad quiere, por un lado, un único lugar donde ver los hallazgos de todos sus servicios de seguridad, y por otro, recomendaciones automáticas sobre la configuración de su cuenta. ¿Cuáles DOS servicios cubren estas necesidades? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "AWS Security Hub",
        correct: true,
        explanation:
          "Correcta. Security Hub agrega, normaliza y prioriza los hallazgos de GuardDuty, Inspector, Macie y otros en un solo panel, y los evalúa contra estándares de seguridad. Es el 'único lugar' que pide el enunciado.",
      },
      {
        id: "B",
        text: "AWS Trusted Advisor",
        correct: true,
        explanation:
          "Correcta. Trusted Advisor inspecciona la cuenta y recomienda mejoras en cinco categorías, entre ellas seguridad: puertos abiertos, MFA ausente en el root, claves de acceso expuestas. Es el que da recomendaciones automáticas de configuración.",
      },
      {
        id: "C",
        text: "Amazon Detective",
        correct: false,
        explanation:
          "Detective sirve para investigar a fondo un hallazgo concreto y reconstruir su causa raíz. Es el paso siguiente a tener el hallazgo, no el panel que los reúne ni el que recomienda configuraciones.",
      },
      {
        id: "D",
        text: "AWS Artifact",
        correct: false,
        explanation:
          "Artifact entrega los informes de cumplimiento de AWS como proveedor. No analiza tu cuenta ni reúne hallazgos.",
      },
      {
        id: "E",
        text: "AWS CloudTrail",
        correct: false,
        explanation:
          "CloudTrail registra quién llamó a qué API. Es la fuente de datos que otros servicios analizan, pero no agrega hallazgos ni emite recomendaciones.",
      },
    ],
    tips: [
      "Ordenalos por el momento en que se usan: CloudTrail **registra**, GuardDuty y Macie **detectan**, Security Hub **reúne**, Detective **investiga**, Trusted Advisor **recomienda**.",
      "**Un solo panel para todo** ⇒ Security Hub. **Revisar mi cuenta y sugerir mejoras** ⇒ Trusted Advisor.",
      "En las preguntas de dos respuestas, verificá que cada una cubra una necesidad distinta del enunciado: acá una es el panel y la otra las recomendaciones.",
    ],
  },
];
