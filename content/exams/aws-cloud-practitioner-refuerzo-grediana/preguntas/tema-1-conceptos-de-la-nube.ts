import type { ExamQuestionWithTopic } from "../../types";

/**
 * Dominio 1 — Conceptos de la nube. Seis preguntas, tres por cada fallo:
 *
 *   - sim-d1-q05 (eligió Eficiencia de rendimiento; era Optimización de costos): q01–q03
 *   - sim-d1-q07 (eligió Fiabilidad; era Excelencia operativa): q04–q06
 *
 * Las dos confusiones son la misma en el fondo: dos pilares que comparten
 * vocabulario. Cada trío tiene una pregunta "al revés" (q01, q05), donde la
 * correcta es justamente el pilar que se eligió mal, para que la regla aprendida
 * no sea "siempre el otro".
 */
export const TEMA_1_CONCEPTOS: ExamQuestionWithTopic[] = [
  {
    id: "ref-gr-d1-q01",
    topic: "1",
    prompt:
      "Un equipo prueba su motor de búsqueda en tres tipos de instancia distintos, mide la latencia de cada uno y se queda con el que responde más rápido para el patrón de consultas que tiene. Cada vez que AWS lanza una generación nueva, repite la prueba. ¿Qué pilar del Well-Architected Framework aplica?",
    options: [
      {
        id: "A",
        text: "Optimización de costos",
        correct: false,
        explanation:
          "Tienta porque 'elegir el tipo de instancia correcto' suena a rightsizing, que es una práctica de costos. Pero mirá qué se mide: la latencia, no la factura. El criterio de elección es la velocidad de respuesta, y eso es rendimiento.",
      },
      {
        id: "B",
        text: "Eficiencia de rendimiento",
        correct: true,
        explanation:
          "Correcta. Eficiencia de rendimiento es elegir y reevaluar los recursos según lo que exige la carga: probar tipos, medir, quedarse con el que mejor responde y volver a probar cuando aparece tecnología nueva.",
      },
      {
        id: "C",
        text: "Fiabilidad",
        correct: false,
        explanation:
          "Fiabilidad es que la carga siga funcionando y se recupere cuando algo falla. Probar tres instancias tiene aire de 'hacer pruebas', pero ninguna de estas pruebas simula una falla: comparan velocidad.",
      },
      {
        id: "D",
        text: "Sostenibilidad",
        correct: false,
        explanation:
          "Sostenibilidad también habla de elegir instancias nuevas, porque las generaciones recientes suelen consumir menos energía por trabajo hecho. Lo que la descarta es el objetivo declarado: el equipo busca la que responde más rápido, no la que consume menos.",
      },
    ],
    tips: [
      "Para ubicar una práctica en un pilar, buscá qué se mide para decidir: latencia es rendimiento, dólares es costo, energía o huella es sostenibilidad.",
      "Una misma acción (cambiar de tipo de instancia) puede ser de tres pilares distintos. Lo que la ubica es el motivo, no la acción.",
    ],
  },
  {
    id: "ref-gr-d1-q02",
    topic: "1",
    prompt:
      "La dirección financiera de una empresa pide saber cuánto gasta cada línea de producto en AWS, fija un presupuesto mensual por departamento y revisa cada trimestre si algún servicio administrado saldría más barato que mantener servidores propios. ¿A qué pilar del Well-Architected Framework corresponden estas prácticas?",
    options: [
      {
        id: "A",
        text: "Excelencia operativa",
        correct: false,
        explanation:
          "Presupuestos por departamento y revisiones trimestrales suenan a 'buena gestión', y la buena gestión parece excelencia operativa. Pero ese pilar trata de cómo se opera y se mejora la carga (despliegues, runbooks, aprendizaje de incidentes), no de cuánto cuesta.",
      },
      {
        id: "B",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "Comparar servicios administrados con servidores propios aparece también en rendimiento, cuando se elige lo que mejor responde a la carga. Acá la comparación es explícitamente 'más barato', así que el criterio es costo.",
      },
      {
        id: "C",
        text: "Sostenibilidad",
        correct: false,
        explanation:
          "Pasar a servicios administrados puede reducir la huella, porque AWS los opera con mayor aprovechamiento. Pero nada en el enunciado habla de energía ni de impacto ambiental: todo está medido en gasto.",
      },
      {
        id: "D",
        text: "Optimización de costos",
        correct: true,
        explanation:
          "Correcta. Saber quién gasta qué (atribución de costos), poner límites (presupuestos) y evaluar si otro servicio cuesta menos son las tres patas del pilar de optimización de costos.",
      },
    ],
    tips: [
      "Atribuir el gasto, presupuestar y comparar precios entre alternativas: si el enunciado habla de dinero en cada frase, el pilar es costos aunque la práctica suene administrativa.",
      "Excelencia operativa es sobre cómo trabaja el equipo con la carga, no sobre la factura.",
    ],
  },
  {
    id: "ref-gr-d1-q03",
    topic: "1",
    multiple: true,
    prompt:
      "¿Cuáles DOS de estas prácticas pertenecen al pilar de optimización de costos del AWS Well-Architected Framework? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Reducir el tamaño de las instancias cuyo uso medido está muy por debajo de su capacidad",
        correct: true,
        explanation:
          "Correcta. Es rightsizing: ajustar el recurso a lo que de verdad se usa para dejar de pagar capacidad ociosa. Es la práctica más citada del pilar de costos.",
      },
      {
        id: "B",
        text: "Elegir instancias con GPU para entrenar un modelo porque terminan el trabajo en menos horas",
        correct: false,
        explanation:
          "'Menos horas' puede leerse como 'menos costo', y por eso tienta. Pero el motivo que da el enunciado es terminar antes: elegir el hardware que mejor se ajusta al tipo de trabajo es eficiencia de rendimiento.",
      },
      {
        id: "C",
        text: "Usar etiquetas de asignación de costos para atribuir el gasto a cada equipo",
        correct: true,
        explanation:
          "Correcta. Etiquetar para saber quién gasta qué es la base del pilar de costos: no se puede optimizar un gasto que no se sabe a quién pertenece.",
      },
      {
        id: "D",
        text: "Maximizar el aprovechamiento de cada instancia para reducir la energía consumida por unidad de trabajo",
        correct: false,
        explanation:
          "Es casi la misma acción que el rightsizing, y por eso es la trampa de esta pregunta. La diferencia está en el motivo: reducir la energía por unidad de trabajo es el objetivo del pilar de sostenibilidad.",
      },
      {
        id: "E",
        text: "Desplegar la aplicación en dos zonas de disponibilidad para soportar la caída de una",
        correct: false,
        explanation:
          "Repartir en dos AZ para seguir funcionando ante una caída es fiabilidad. Aparece como distractor porque duplicar recursos tiene un costo, pero el objetivo es resistir fallas.",
      },
    ],
    tips: [
      "Costos y sostenibilidad comparten casi todas sus prácticas (apagar lo ocioso, ajustar tamaños). El enunciado las separa por el motivo: dinero o energía.",
      "Si una opción dice 'para soportar la caída de...', es fiabilidad, cueste lo que cueste.",
    ],
  },
  {
    id: "ref-gr-d1-q04",
    topic: "1",
    prompt:
      "Un equipo define toda su infraestructura en plantillas de AWS CloudFormation guardadas en un repositorio, despliega cambios pequeños varias veces por semana y cada cambio se puede revertir con un comando. ¿Qué pilar del Well-Architected Framework describe principalmente esta forma de trabajar?",
    options: [
      {
        id: "A",
        text: "Excelencia operativa",
        correct: true,
        explanation:
          "Correcta. Operaciones como código y cambios pequeños, frecuentes y reversibles son dos principios de diseño del pilar de excelencia operativa: tratan de cómo el equipo opera y cambia la carga.",
      },
      {
        id: "B",
        text: "Fiabilidad",
        correct: false,
        explanation:
          "Es la confusión más común: cambios reversibles hacen que un error dure menos, y eso parece fiabilidad. Pero fiabilidad trata de cómo la carga resiste y se recupera de fallas (redundancia, recuperación automática, respaldos). Acá se describe cómo el equipo hace cambios, que es operación.",
      },
      {
        id: "C",
        text: "Seguridad",
        correct: false,
        explanation:
          "Tener la infraestructura en un repositorio deja un historial auditable, y eso aporta a la seguridad. Pero el foco del enunciado es el ritmo y la forma de los cambios, no el control de acceso ni la protección de datos.",
      },
      {
        id: "D",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "Desplegar seguido suena a agilidad, y la agilidad se suele asociar a rendimiento. Pero ese pilar trata de elegir recursos que respondan bien a la carga, y el enunciado no menciona ni latencia ni capacidad.",
      },
    ],
    tips: [
      "Infraestructura como código, cambios pequeños y reversibles, runbooks, aprender de los incidentes: todo lo que describe cómo trabaja el equipo es excelencia operativa.",
      "Fiabilidad describe cómo se comporta la carga cuando algo falla; excelencia operativa, cómo se comporta el equipo.",
    ],
  },
  {
    id: "ref-gr-d1-q05",
    topic: "1",
    prompt:
      "Una aplicación corre en instancias repartidas en tres zonas de disponibilidad. Un grupo de Auto Scaling reemplaza sola cualquier instancia que no pase el chequeo de salud, y una vez por mes el equipo restaura un respaldo en otra cuenta para comprobar que funciona. ¿Qué pilar del Well-Architected Framework representan estas prácticas?",
    options: [
      {
        id: "A",
        text: "Excelencia operativa",
        correct: false,
        explanation:
          "Hay automatización y una prueba periódica, y las dos suenan a operación bien hecha. Pero todo apunta a una misma pregunta: ¿la carga sobrevive y se recupera si algo se rompe? Eso es fiabilidad, aunque lo ejecute el equipo de operaciones.",
      },
      {
        id: "B",
        text: "Seguridad",
        correct: false,
        explanation:
          "Restaurar en otra cuenta podría parecer una medida de aislamiento. El objetivo declarado, sin embargo, es comprobar que el respaldo funciona, que es probar la recuperación, no proteger el acceso.",
      },
      {
        id: "C",
        text: "Fiabilidad",
        correct: true,
        explanation:
          "Correcta. Varias AZ, recuperación automática ante fallas y probar los procedimientos de restauración son principios de diseño del pilar de fiabilidad: que la carga cumpla su función aun cuando un componente falla.",
      },
      {
        id: "D",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "Auto Scaling aparece seguido en preguntas de rendimiento, cuando agrega capacidad ante más demanda. Acá no escala por demanda: reemplaza instancias que fallan, que es recuperación.",
      },
    ],
    tips: [
      "Varias AZ, recuperación automática, probar el respaldo: si el objetivo es seguir funcionando ante una falla, es fiabilidad.",
      "Auto Scaling sirve a dos pilares. Si agrega instancias por demanda, rendimiento; si reemplaza las que fallan, fiabilidad.",
    ],
  },
  {
    id: "ref-gr-d1-q06",
    topic: "1",
    multiple: true,
    prompt:
      "Una nueva líder de plataforma quiere mejorar la forma en que su equipo opera el día a día, sin tocar todavía la arquitectura. Revisando el Well-Architected Framework, ¿cuáles DOS iniciativas caen dentro del pilar de excelencia operativa? (Elegí 2).",
    options: [
      {
        id: "A",
        text: "Escribir runbooks con los pasos de los procedimientos que el equipo ejecuta seguido",
        correct: true,
        explanation:
          "Correcta. Documentar y, cuando se puede, automatizar los procedimientos de rutina es parte central de excelencia operativa: que operar la carga no dependa de lo que una persona recuerda.",
      },
      {
        id: "B",
        text: "Configurar la conmutación automática de la base de datos a una réplica en otra zona",
        correct: false,
        explanation:
          "Es automatización, y la automatización suele asociarse a excelencia operativa. Pero esta automatización existe para que la carga sobreviva a una falla, y eso la ubica en fiabilidad.",
      },
      {
        id: "C",
        text: "Cifrar los datos en reposo con claves administradas en AWS KMS",
        correct: false,
        explanation:
          "Es una buena práctica, pero de seguridad: protege la confidencialidad de los datos. No dice nada de cómo opera el equipo.",
      },
      {
        id: "D",
        text: "Compartir entre equipos lo aprendido en cada incidente para que no se repita en otro lado",
        correct: true,
        explanation:
          "Correcta. Aprender de las fallas operativas y difundir lo aprendido es un principio de diseño del pilar de excelencia operativa.",
      },
      {
        id: "E",
        text: "Distribuir el tráfico entre varias instancias para que la caída de una no interrumpa el servicio",
        correct: false,
        explanation:
          "Suena a 'operar bien', pero el motivo declarado es que la caída de una instancia no interrumpa el servicio: eso es redundancia, y la redundancia es fiabilidad.",
      },
    ],
    tips: [
      "Que algo esté automatizado no lo hace de excelencia operativa. Preguntá para qué se automatiza: resistir fallas es fiabilidad; operar mejor y aprender es excelencia operativa.",
      "Runbooks, post-mortems, infraestructura como código: las tres hablan del equipo, no de la carga.",
    ],
  },
];
