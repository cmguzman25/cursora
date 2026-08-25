import type { ExamQuizQuestion } from "../../types";

/**
 * Question bank for lesson "08-analisis-preguntas-modulo-1" (Módulo 1 —
 * Conceptos de la nube). Building just the first question to validate the
 * interactive quiz format before writing the rest.
 */
export const MODULE_1_QUESTIONS: ExamQuizQuestion[] = [
  {
    id: "m1-q01",
    prompt:
      "El equipo de una tienda en línea siempre compraba servidores propios calculando el pico de tráfico de diciembre. El resto del año, esos servidores quedaban usados a la mitad de su capacidad. ¿Cuál beneficio de AWS Cloud resuelve mejor este problema?",
    options: [
      {
        id: "A",
        text: "Ir global en minutos",
        correct: false,
        explanation:
          "Este beneficio habla de desplegar en distintas regiones del mundo con pocos clics. El problema de la tienda no es de alcance geográfico, sino de comprar más capacidad de la que usa casi todo el año.",
      },
      {
        id: "B",
        text: "Dejar de adivinar la capacidad",
        correct: true,
        explanation:
          "En la nube podés escalar hacia arriba en diciembre y hacia abajo el resto del año, pagando solo por lo que usás en cada momento. Ya no hace falta comprar pensando en el peor caso posible.",
      },
      {
        id: "C",
        text: "Economías de escala",
        correct: false,
        explanation:
          "Las economías de escala hacen que el precio por unidad baje porque AWS compra a gran volumen y traslada ese ahorro a sus clientes. Es un beneficio real, pero no resuelve el problema de comprar de más \"por las dudas\".",
      },
      {
        id: "D",
        text: "Cambiar gasto de capital por gasto variable",
        correct: false,
        explanation:
          "Es cierto que ya no compra el servidor y en cambio paga por uso — pero ese beneficio habla de cómo se paga, no de ajustar la capacidad a la demanda real. En el examen, elegí siempre la opción que responde exactamente lo que pregunta el escenario, no la que simplemente también es verdadera.",
      },
    ],
    tips: [
      "Cuando el escenario menciona \"no sé cuánta capacidad voy a necesitar\" o \"el tráfico varía mucho\", casi siempre apunta a elasticidad / dejar de adivinar la capacidad.",
      "CapEx vs. OpEx y economías de escala aparecen seguido como distractores en preguntas de capacidad: son beneficios reales, pero responden una pregunta distinta a la que se está haciendo.",
      "Antes de mirar las opciones, intenta responder la pregunta con tus propias palabras — te hace menos vulnerable a una opción que \"suena bien\" pero no es exacta.",
    ],
  },
  {
    id: "m1-q02",
    prompt:
      "Un equipo de DevOps quiere detectar automáticamente cuando un despliegue nuevo falla, revertirlo sin intervención manual, y mantener guías (runbooks) actualizadas para reducir errores humanos en operaciones futuras. ¿Qué pilar del AWS Well-Architected Framework describe mejor esta práctica?",
    options: [
      {
        id: "A",
        text: "Fiabilidad",
        correct: false,
        explanation:
          "Fiabilidad se enfoca en que el sistema se recupere solo de una falla técnica (por ejemplo, un balanceador que saca de servicio una instancia caída). Acá el foco no es la recuperación automática del sistema, sino cómo el equipo opera y corrige errores humanos — eso es Excelencia operativa.",
      },
      {
        id: "B",
        text: "Excelencia operativa",
        correct: true,
        explanation:
          "Excelencia operativa trata justamente sobre operar y mejorar los sistemas con el tiempo: automatizar cambios, responder a eventos y definir estándares (como runbooks) para las operaciones diarias — exactamente lo que describe el escenario.",
      },
      {
        id: "C",
        text: "Seguridad",
        correct: false,
        explanation:
          "Seguridad protege la información y los sistemas: control de accesos, cifrado, detección de amenazas. El escenario no menciona proteger datos ni accesos, sino un proceso operativo.",
      },
      {
        id: "D",
        text: "Eficiencia de rendimiento",
        correct: false,
        explanation:
          "Eficiencia de rendimiento es usar el tipo y tamaño correcto de recursos según la carga de trabajo. No tiene relación con revertir despliegues ni con mantener runbooks.",
      },
    ],
    tips: [
      "Cuando el escenario habla de \"automatizar cambios\", \"runbooks\", \"monitorear y responder a eventos\" o \"aprender de los fallos\", casi siempre es Excelencia operativa — aunque también se mencione una falla.",
      "Fiabilidad y Excelencia operativa se confunden seguido: Fiabilidad es que el sistema se recupere solo; Excelencia operativa es cómo el equipo opera y mejora los procesos alrededor del sistema.",
      "Memoriza los 6 pilares con su pregunta clave (como en la tabla comparativa ★1.5) — te ayuda a descartar rápido las opciones que no responden esa pregunta puntual.",
    ],
  },
];
