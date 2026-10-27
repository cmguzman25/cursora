import type { ExamQuestionWithTopic } from "../../types";

/**
 * Dominio 2 — Seguridad y cumplimiento. Nueve preguntas, tres por cada pendiente
 * del primer refuerzo:
 *
 *   - ref-gr-d2-q02 (en Lambda eligió "parchear el SO"; era actualizar la librería): q01–q03
 *   - ref-gr-d2-q08 (eligió Macie; era Inspector, falló 2 de 2): q04–q06
 *   - ref-gr-d2-q10 (eligió WAF; era GuardDuty, falló 2 de 2): q07–q09
 *
 * WAF, Shield, Macie, Security Hub y Trusted Advisor los corrigió en el primer
 * refuerzo: acá solo aparecen como distractores.
 */
export const TEMA_2_SEGURIDAD: ExamQuestionWithTopic[] = [
  {
    id: "ref2-gr-d2-q01",
    topic: "2",
    prompt:
      "Una empresa mueve sus contenedores de instancias EC2 que ella misma administraba a AWS Fargate. Según el modelo de responsabilidad compartida, ¿qué tarea deja de estar en manos del cliente con este cambio?",
    options: [
      {
        id: "A",
        text: "Definir los permisos del rol de IAM que usa cada tarea",
        correct: false,
        explanation:
          "El rol de IAM de una tarea es la identidad con la que el contenedor llama a otros servicios de AWS, y sus permisos dicen qué puede leer o escribir. Tienta porque Fargate es un servicio administrado y parece que AWS se ocupa de todo. Pero quién puede hacer qué con los recursos de la cuenta es siempre responsabilidad del cliente, con EC2, con Fargate o con Lambda.",
      },
      {
        id: "B",
        text: "Aplicar los parches del sistema operativo de los servidores donde corren los contenedores",
        correct: true,
        explanation:
          "Correcta. En Fargate el cliente no ve ni administra los servidores: AWS mantiene el sistema operativo del host y el entorno donde corren los contenedores. En EC2 esos parches eran del cliente; ese es justo el trabajo que desaparece al pasar a un servicio sin servidor.",
      },
      {
        id: "C",
        text: "Actualizar las librerías vulnerables dentro de la imagen del contenedor",
        correct: false,
        explanation:
          "La imagen del contenedor es el paquete que arma el cliente con su aplicación y las librerías que esta necesita. Tienta porque, si AWS administra los servidores, parece lógico que también actualice lo que corre encima. Pero el contenido de la imagen lo eligió y lo construyó el cliente: una librería vulnerable ahí dentro la tiene que actualizar él, igual que en Lambda.",
      },
      {
        id: "D",
        text: "Cifrar los datos que la aplicación guarda en Amazon S3",
        correct: false,
        explanation:
          "Cifrar los datos en reposo es configurar que lo guardado en S3 se almacene cifrado, con claves administradas por AWS o por el propio cliente en AWS KMS. Puede tentar porque S3 ya cifra los objetos nuevos por defecto. Pero decidir cómo se protegen los datos, y con qué claves, sigue siendo del cliente en cualquier modelo de servicio.",
      },
    ],
    tips: [
      "Cuanto más administrado es el servicio, más capas pasan a AWS: en Fargate y Lambda, el sistema operativo y los servidores son de AWS.",
      "Lo que nunca pasa a AWS: los datos, los permisos de IAM y el código o las librerías que el cliente sube.",
    ],
  },
  {
    id: "ref2-gr-d2-q02",
    topic: "2",
    prompt:
      "Una función Lambda está escrita para una versión de Python que llega al fin de su soporte en Lambda. Según el modelo de responsabilidad compartida, ¿qué corresponde hacer?",
    options: [
      {
        id: "A",
        text: "Nada: AWS migra la función a la versión nueva cuando termina el soporte",
        correct: false,
        explanation:
          "AWS sí aplica automáticamente los parches de seguridad menores dentro de un runtime de Lambda mientras ese runtime tiene soporte. Por eso tienta pensar que también se encarga del cambio de versión. Pero pasar de una versión de Python a otra puede romper el código, así que AWS no lo hace por su cuenta: avisa del fin del soporte y la migración queda en manos del cliente.",
      },
      {
        id: "B",
        text: "Parchear el sistema operativo del entorno de ejecución de Lambda",
        correct: false,
        explanation:
          "El entorno de ejecución de Lambda es la máquina, con su sistema operativo, donde AWS ejecuta las funciones. Tienta porque en EC2 parchear el sistema operativo es la tarea típica del cliente. Pero en Lambda el cliente no tiene acceso a ese sistema operativo: lo mantiene AWS.",
      },
      {
        id: "C",
        text: "Cambiar la función a un runtime con soporte y probar el código con él",
        correct: true,
        explanation:
          "Correcta. El runtime (la versión del lenguaje) lo elige el cliente en la configuración de la función. AWS lo mantiene mientras tiene soporte, pero elegir uno vigente y comprobar que el código funciona con él es del cliente, porque el código es suyo.",
      },
      {
        id: "D",
        text: "Abrir un caso en AWS Support para que actualicen la función",
        correct: false,
        explanation:
          "AWS Support es el servicio de asistencia técnica: responde dudas y ayuda a diagnosticar problemas según el plan contratado. Tienta como forma de delegar el trabajo. Pero Support orienta, no modifica las cargas del cliente: el código y la configuración de la función siguen siendo del cliente.",
      },
    ],
    tips: [
      "En Lambda, AWS mantiene el sistema operativo y los parches del runtime; el cliente elige la versión del lenguaje y es dueño del código.",
      "Cambiar de versión de un lenguaje puede romper código; por eso AWS nunca lo hace solo, aunque el servicio sea administrado.",
    ],
  },
  {
    id: "ref2-gr-d2-q03",
    topic: "2",
    multiple: true,
    prompt:
      "Una aplicación sin servidores usa funciones Lambda que leen y escriben en una tabla de Amazon DynamoDB. ¿Qué dos tareas siguen siendo responsabilidad del cliente? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Definir las políticas de IAM que dan acceso a la tabla",
        correct: true,
        explanation:
          "Correcta. Decidir quién y qué puede leer o escribir en la tabla se hace con políticas de IAM, y eso es del cliente en cualquier servicio. Es la parte de 'seguridad en la nube'.",
      },
      {
        id: "B",
        text: "Aplicar los parches al motor de la base de datos DynamoDB",
        correct: false,
        explanation:
          "DynamoDB es una base de datos NoSQL totalmente administrada: no hay servidores ni motor que el cliente instale o actualice. Tienta porque con una base de datos instalada en EC2 los parches del motor son del cliente. Pero en DynamoDB todo el software lo mantiene AWS.",
      },
      {
        id: "C",
        text: "Mantener actualizado el código de las funciones y las librerías que incluye",
        correct: true,
        explanation:
          "Correcta. El código y sus dependencias los sube el cliente, así que corregir una librería vulnerable o un error de seguridad en el código es tarea suya, aunque Lambda administre todo lo demás.",
      },
      {
        id: "D",
        text: "Replicar el almacenamiento de la tabla entre zonas de disponibilidad",
        correct: false,
        explanation:
          "DynamoDB guarda automáticamente cada tabla en varias zonas de disponibilidad de la región, sin que el cliente configure nada. Tienta porque en EC2 la redundancia entre zonas la diseña el cliente. Pero en este servicio la replicación dentro de la región es parte de lo que AWS entrega.",
      },
      {
        id: "E",
        text: "Actualizar el sistema operativo de los servidores donde se ejecuta Lambda",
        correct: false,
        explanation:
          "Los servidores de Lambda son la flota de AWS donde se ejecutan las funciones, y el cliente nunca accede a ellos. Tienta porque parchear el sistema operativo es lo primero que se asocia con la responsabilidad del cliente. Pero eso vale para EC2; en Lambda es de AWS.",
      },
    ],
    tips: [
      "En servicios sin servidor, el cliente conserva tres cosas: sus datos, sus permisos y su código.",
      "Si la opción menciona servidores, motores o sistema operativo de un servicio administrado, es responsabilidad de AWS.",
    ],
  },
  {
    id: "ref2-gr-d2-q04",
    topic: "2",
    prompt:
      "Antes de una auditoría de protección de datos, la empresa necesita un informe de qué buckets de S3 contienen números de tarjeta de crédito, documentos de identidad u otros datos personales. ¿Qué servicio lo produce?",
    options: [
      {
        id: "A",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Amazon Inspector escanea instancias EC2, imágenes de contenedor en ECR y funciones Lambda en busca de vulnerabilidades de software conocidas (CVE) y de exposición de red. Tienta porque es un servicio de 'escaneo' y aquí hay que escanear. Pero Inspector revisa software instalado, no lo que contienen los archivos guardados en S3.",
      },
      {
        id: "B",
        text: "AWS Config",
        correct: false,
        explanation:
          "AWS Config registra la configuración de los recursos a lo largo del tiempo y evalúa si cumple reglas, por ejemplo si un bucket es público o no está cifrado. Tienta porque sirve para auditorías. Pero Config mira la configuración del bucket, no lee los objetos para saber si contienen datos personales.",
      },
      {
        id: "C",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "Amazon GuardDuty detecta amenazas analizando registros como CloudTrail, los registros de flujo de la VPC y el DNS; con la protección de S3 detecta accesos sospechosos a los buckets. Tienta porque vigila S3. Pero GuardDuty busca comportamiento malicioso, no clasifica qué tipo de datos hay dentro de cada objeto.",
      },
      {
        id: "D",
        text: "Amazon Macie",
        correct: true,
        explanation:
          "Correcta. Amazon Macie usa aprendizaje automático y patrones para descubrir y clasificar datos sensibles en S3, como datos personales o financieros, e informa en qué buckets están. Es el único servicio de la lista que mira el contenido de los objetos.",
      },
    ],
    tips: [
      "Datos sensibles dentro de S3: Macie. Software vulnerable en EC2, contenedores o Lambda: Inspector.",
      "Macie mira qué hay guardado; Inspector mira qué hay instalado; GuardDuty mira qué está pasando.",
    ],
  },
  {
    id: "ref2-gr-d2-q05",
    topic: "2",
    prompt:
      "Se publica una vulnerabilidad crítica en un paquete de npm. El equipo quiere saber, sin revisar a mano, qué funciones Lambda y qué imágenes de contenedor de Amazon ECR incluyen ese paquete, y enterarse si aparece en una imagen nueva. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "Amazon Inspector",
        correct: true,
        explanation:
          "Correcta. Amazon Inspector escanea de forma continua instancias EC2, imágenes en ECR y funciones Lambda, compara el software que encuentra con las bases de vulnerabilidades conocidas (CVE) y vuelve a escanear cuando hay una imagen nueva o se publica una CVE nueva.",
      },
      {
        id: "B",
        text: "Amazon Macie",
        correct: false,
        explanation:
          "Amazon Macie descubre y clasifica datos sensibles, como datos personales o números de tarjeta, guardados en buckets de S3. Tienta porque es otro servicio que 'escanea' y genera hallazgos de seguridad. Pero Macie lee el contenido de los archivos de S3; no sabe qué paquetes de software hay en una función o en una imagen.",
      },
      {
        id: "C",
        text: "AWS Trusted Advisor",
        correct: false,
        explanation:
          "AWS Trusted Advisor revisa la cuenta contra buenas prácticas de costo, rendimiento, seguridad, tolerancia a fallos y cuotas, por ejemplo puertos abiertos o falta de MFA en la raíz. Tienta porque da recomendaciones de seguridad. Pero revisa la configuración de la cuenta, no las librerías de cada función o imagen.",
      },
      {
        id: "D",
        text: "AWS Security Hub",
        correct: false,
        explanation:
          "AWS Security Hub reúne en un solo panel los hallazgos de otros servicios de seguridad y comprueba la cuenta contra estándares como CIS. Tienta porque los hallazgos de vulnerabilidades sí se pueden ver ahí. Pero Security Hub los recibe de Inspector: no es el que escanea los paquetes.",
      },
    ],
    tips: [
      "CVE, paquetes, librerías vulnerables, imágenes de contenedor: la palabra clave apunta a Inspector.",
      "Security Hub muestra lo que encuentran otros; si la pregunta es quién detecta, busca el servicio de origen.",
    ],
  },
  {
    id: "ref2-gr-d2-q06",
    topic: "2",
    multiple: true,
    prompt:
      "Un equipo de seguridad tiene dos objetivos: saber qué instancias EC2 tienen software con vulnerabilidades conocidas, y saber qué buckets guardan datos personales de clientes. ¿Qué dos servicios cubren esos objetivos? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "AWS WAF",
        correct: false,
        explanation:
          "AWS WAF es el firewall de aplicaciones web: filtra solicitudes HTTP con reglas, por ejemplo contra inyección SQL, y se asocia a CloudFront, a un Application Load Balancer o a API Gateway. Tienta porque protege las aplicaciones. Pero bloquea solicitudes en tránsito; no inventaría vulnerabilidades del software ni datos guardados.",
      },
      {
        id: "B",
        text: "Amazon Macie",
        correct: true,
        explanation:
          "Correcta. Amazon Macie encuentra y clasifica datos sensibles en S3, como datos personales. Cubre el segundo objetivo.",
      },
      {
        id: "C",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "Amazon GuardDuty detecta comportamiento malicioso analizando CloudTrail, los registros de flujo de la VPC y el DNS, por ejemplo una instancia que habla con un servidor de minería. Tienta porque vigila instancias y buckets. Pero detecta actividad sospechosa, no software vulnerable ni tipos de datos.",
      },
      {
        id: "D",
        text: "AWS Shield Standard",
        correct: false,
        explanation:
          "AWS Shield Standard es la protección automática y sin costo contra los ataques DDoS más comunes de red y transporte. Tienta por ser un servicio de seguridad incluido en todas las cuentas. Pero se ocupa de ataques de volumen, no de revisar software ni datos.",
      },
      {
        id: "E",
        text: "Amazon Inspector",
        correct: true,
        explanation:
          "Correcta. Amazon Inspector escanea instancias EC2 en busca de software con vulnerabilidades conocidas. Cubre el primer objetivo.",
      },
    ],
    tips: [
      "Separa los servicios de seguridad por lo que miran: Inspector el software, Macie los datos de S3, GuardDuty la actividad, WAF las solicitudes web, Shield los ataques DDoS.",
      "Si cada objetivo del enunciado habla de algo distinto, cada respuesta es un servicio distinto.",
    ],
  },
  {
    id: "ref2-gr-d2-q07",
    topic: "2",
    prompt:
      "A las 3 de la madrugada, un usuario de IAM detiene el registro de CloudTrail y crea claves de acceso nuevas desde una IP que nunca se había visto en la cuenta. La empresa quiere que algo así genere un hallazgo automáticamente, sin instalar agentes. ¿Qué servicio usa?",
    options: [
      {
        id: "A",
        text: "AWS WAF",
        correct: false,
        explanation:
          "AWS WAF es el firewall de aplicaciones web: inspecciona las solicitudes HTTP que llegan a CloudFront, a un balanceador o a API Gateway y las bloquea según reglas. Tienta porque es un servicio de seguridad que reacciona ante IP sospechosas. Pero las llamadas a la API de IAM y de CloudTrail no pasan por una aplicación web: WAF nunca las ve.",
      },
      {
        id: "B",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Amazon Inspector busca vulnerabilidades de software conocidas en EC2, imágenes de contenedor y funciones Lambda. Tienta porque 'inspeccionar' suena a revisar lo que pasa en la cuenta. Pero Inspector mira qué software está instalado, no quién hace qué llamadas ni desde dónde.",
      },
      {
        id: "C",
        text: "Amazon GuardDuty",
        correct: true,
        explanation:
          "Correcta. Amazon GuardDuty analiza de forma continua los eventos de CloudTrail, los registros de flujo de la VPC y el DNS, y genera hallazgos ante comportamientos anómalos, como desactivar el registro o usar credenciales desde una ubicación inusual. Su detección básica no requiere instalar nada.",
      },
      {
        id: "D",
        text: "AWS Shield Standard",
        correct: false,
        explanation:
          "AWS Shield Standard protege automáticamente contra los ataques DDoS más comunes de red y transporte. Tienta porque está siempre activo y es gratuito. Pero se ocupa de ataques de volumen contra las aplicaciones, no de detectar el uso indebido de credenciales dentro de la cuenta.",
      },
    ],
    tips: [
      "Comportamiento anómalo de credenciales, instancias o cuentas detectado en los registros: GuardDuty.",
      "WAF solo ve solicitudes HTTP a una aplicación web; lo que pasa en la API de AWS queda fuera de su alcance.",
    ],
  },
  {
    id: "ref2-gr-d2-q08",
    topic: "2",
    prompt:
      "Los registros de acceso de un Application Load Balancer muestran que una IP está probando miles de contraseñas contra el formulario de inicio de sesión de una aplicación web. Ahora la empresa quiere bloquear automáticamente cualquier IP que envíe más de 100 solicitudes en cinco minutos. ¿Qué servicio lo hace?",
    options: [
      {
        id: "A",
        text: "Amazon GuardDuty",
        correct: false,
        explanation:
          "Amazon GuardDuty es el servicio de detección de amenazas: analiza CloudTrail, los registros de flujo de la VPC y el DNS, y genera hallazgos cuando ve algo sospechoso. Tienta porque es el servicio que se asocia con ataques. Pero detecta y avisa; no se coloca delante de la aplicación ni bloquea solicitudes HTTP.",
      },
      {
        id: "B",
        text: "AWS WAF",
        correct: true,
        explanation:
          "Correcta. AWS WAF se asocia al Application Load Balancer y aplica reglas a cada solicitud HTTP; una regla basada en frecuencia bloquea las IP que superan un número de solicitudes en una ventana de tiempo.",
      },
      {
        id: "C",
        text: "Amazon Macie",
        correct: false,
        explanation:
          "Amazon Macie descubre y clasifica datos sensibles guardados en S3. Puede aparecer porque las contraseñas son datos sensibles. Pero Macie revisa archivos guardados en buckets, no el tráfico que llega a una aplicación.",
      },
      {
        id: "D",
        text: "Amazon Inspector",
        correct: false,
        explanation:
          "Amazon Inspector escanea EC2, contenedores y Lambda en busca de vulnerabilidades de software y de exposición de red. Tienta porque podría señalar que el servidor tiene un puerto abierto. Pero no filtra solicitudes: describe debilidades, no bloquea ataques en curso.",
      },
    ],
    tips: [
      "GuardDuty detecta amenazas en la cuenta; WAF filtra y bloquea solicitudes HTTP antes de que lleguen a la aplicación.",
      "Las reglas basadas en frecuencia de WAF limitan cuántas solicitudes acepta una IP en un período.",
    ],
  },
  {
    id: "ref2-gr-d2-q09",
    topic: "2",
    multiple: true,
    prompt: "¿Qué dos afirmaciones describen a Amazon GuardDuty? (Elige dos.)",
    options: [
      {
        id: "A",
        text: "Bloquea las solicitudes HTTP maliciosas antes de que lleguen al balanceador",
        correct: false,
        explanation:
          "Bloquear solicitudes HTTP según reglas es lo que hace AWS WAF, el firewall de aplicaciones web, asociado a CloudFront, a un balanceador o a API Gateway. Tienta porque los dos son servicios de seguridad que reaccionan ante tráfico malicioso. Pero GuardDuty no está en el camino de las solicitudes: lee registros y genera hallazgos.",
      },
      {
        id: "B",
        text: "Analiza eventos de CloudTrail, registros de flujo de la VPC y consultas DNS",
        correct: true,
        explanation:
          "Correcta. Esas son las fuentes básicas de GuardDuty: con ellas compara la actividad de la cuenta con inteligencia de amenazas y con lo que es normal para esa cuenta.",
      },
      {
        id: "C",
        text: "Escanea las imágenes de contenedor en busca de paquetes con CVE conocidas",
        correct: false,
        explanation:
          "Escanear imágenes de contenedor en busca de CVE es lo que hace Amazon Inspector con las imágenes de ECR. Tienta porque GuardDuty también puede vigilar contenedores, pero lo que vigila es su comportamiento en ejecución, no el software que traen.",
      },
      {
        id: "D",
        text: "Clasifica los objetos de S3 según contengan datos personales",
        correct: false,
        explanation:
          "Clasificar el contenido de S3 según tenga datos personales es lo que hace Amazon Macie. Tienta porque GuardDuty también tiene una protección para S3. Pero esa protección detecta accesos sospechosos a los buckets, no qué tipo de datos contienen.",
      },
      {
        id: "E",
        text: "Su detección básica funciona sin instalar agentes en las instancias",
        correct: true,
        explanation:
          "Correcta. GuardDuty se activa en la cuenta y empieza a analizar los registros que AWS ya tiene; no hace falta instalar software para la detección básica. El monitoreo en tiempo de ejecución, que es opcional, sí puede usar un agente.",
      },
    ],
    tips: [
      "GuardDuty: lee registros, compara con amenazas conocidas, genera hallazgos. No bloquea, no escanea software, no clasifica datos.",
      "Para responder automáticamente a un hallazgo de GuardDuty se combina con otros servicios, como EventBridge y Lambda, o se bloquea con WAF.",
    ],
  },
];
