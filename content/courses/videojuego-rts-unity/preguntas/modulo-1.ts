import type { ExamQuizQuestion } from "../../types";

/**
 * Banco de la clase "01-11-checkpoint-modulo-1" (Módulo 1 — Unity y C# para un
 * RTS). Catorce preguntas repartidas por todo el módulo.
 *
 * Las tres últimas son de repaso espaciado del módulo 0, como pide el contrato:
 * arquitectura por capas, revisión del código generado y control de versiones.
 */
export const MODULE_1_QUESTIONS: ExamQuizQuestion[] = [
  {
    id: "m1-q01",
    prompt:
      "Ajustas la posición de la cámara mientras el juego está en marcha, la dejas perfecta y sales del modo juego. La cámara ha vuelto a donde estaba. ¿Qué ha pasado?",
    options: [
      {
        id: "A",
        text: "Unity restaura la escena al salir del modo juego",
        correct: true,
        explanation:
          "Es una red de seguridad para poder probar valores sin miedo. También muerde al que edita sin darse cuenta de que el juego estaba corriendo.",
      },
      {
        id: "B",
        text: "Faltaba guardar la escena con Ctrl + S",
        correct: false,
        explanation:
          "Guardar durante el modo juego tampoco habría servido. Unity descarta los cambios de la escena al salir, se hayan guardado o no.",
      },
      {
        id: "C",
        text: "El script CameraBounds recortó la posición",
        correct: false,
        explanation:
          "El recorte solo actúa si la cámara se sale de los límites del mapa. No la devuelve a una posición anterior.",
      },
      {
        id: "D",
        text: "El valor del código sobrescribió al del Inspector",
        correct: false,
        explanation:
          "Es al revés: el valor del Inspector gana al del código. Pero aquí ni siquiera es eso, es la restauración de la escena.",
      },
    ],
    tips: [
      "Mira siempre si el botón de reproducir está iluminado antes de editar algo.",
      "Los ScriptableObjects son la excepción: sus cambios sí persisten, porque no viven en la escena.",
    ],
  },
  {
    id: "m1-q02",
    prompt:
      "Quieres que un aldeano y un soldado compartan la capacidad de atacar, pero el aldeano solo la usa para defenderse. ¿Cómo lo resuelve Unity?",
    options: [
      {
        id: "A",
        text: "Creando una clase base Unidad de la que hereden los dos",
        correct: false,
        explanation:
          "La herencia obliga a decidir el árbol antes de conocer el juego, y los juegos cambian de opinión a mitad del desarrollo.",
      },
      {
        id: "B",
        text: "Enchufando un componente de combate a la caja del aldeano",
        correct: true,
        explanation:
          "Un GameObject es una caja y los componentes son piezas. Añadir o quitar una capacidad es añadir o quitar una pieza.",
      },
      {
        id: "C",
        text: "Duplicando el código de ataque en los dos scripts",
        correct: false,
        explanation:
          "Funcionaría y sería un problema desde el primer cambio. Componer evita la duplicación sin recurrir a la herencia.",
      },
      {
        id: "D",
        text: "Poniendo el ataque en el Transform, que lo tienen todos",
        correct: false,
        explanation:
          "El `Transform` guarda posición, rotación y escala. No es un sitio donde meter lógica de juego.",
      },
    ],
    tips: [
      "Composición tiene un precio: la lógica queda repartida y hay que mirar el Inspector al depurar.",
      "La única herencia habitual del curso es la de MonoBehaviour.",
    ],
  },
  {
    id: "m1-q03",
    prompt:
      "Un script necesita leer un valor de otro objeto de la escena nada más arrancar. ¿En qué método lo haces?",
    options: [
      {
        id: "A",
        text: "En Start",
        correct: true,
        explanation:
          "Unity llama al `Awake` de todos los objetos antes que al `Start` de cualquiera. En `Start` ya existen todos.",
      },
      {
        id: "B",
        text: "En Awake",
        correct: false,
        explanation:
          "El otro objeto puede no estar listo todavía. Y el fallo no ocurre siempre: depende del orden de creación, que puede cambiar entre ejecuciones.",
      },
      {
        id: "C",
        text: "En Update, comprobando si ya existe",
        correct: false,
        explanation:
          "Eso repite la comprobación sesenta veces por segundo durante toda la partida, para algo que solo hace falta una vez.",
      },
      {
        id: "D",
        text: "En el constructor de la clase",
        correct: false,
        explanation:
          "Los MonoBehaviour no se crean con `new`: los instancia Unity. El constructor no es un punto de entrada fiable.",
      },
    ],
    tips: [
      "La regla corta: en Awake te preparas a ti mismo, en Start hablas con los demás.",
      "Los errores de orden de arranque son de los peores porque no fallan siempre.",
    ],
  },
  {
    id: "m1-q04",
    prompt:
      "Cambias el valor por defecto de un campo en el código, de 45 a 90, guardas, y en el juego sigue girando a 45. ¿Qué revisas?",
    options: [
      {
        id: "A",
        text: "Si el objeto guarda un valor propio puesto desde el Inspector",
        correct: true,
        explanation:
          "El valor del código solo se usa el día que el componente se añade. A partir de ahí manda el que está en el archivo de la escena.",
      },
      {
        id: "B",
        text: "Si falta el atributo SerializeField",
        correct: false,
        explanation:
          "Sin `[SerializeField]` el campo no aparecería en el Inspector, pero el valor del código sí se usaría.",
      },
      {
        id: "C",
        text: "Si el proyecto ha recompilado",
        correct: false,
        explanation:
          "Merece una mirada rápida, pero si hubiera un error de compilación la consola lo diría en rojo. Aquí el síntoma apunta a otro sitio.",
      },
      {
        id: "D",
        text: "Si el método Update está bien escrito",
        correct: false,
        explanation:
          "El objeto sigue girando, así que `Update` se está llamando. El problema es el valor, no el método.",
      },
    ],
    tips: [
      "El menú de los tres puntos del componente tiene una opción Reset que recupera los valores del código.",
      "Es la causa número uno de los cambios que 'no hacen efecto'.",
    ],
  },
  {
    id: "m1-q05",
    prompt:
      "¿Por qué el zoom de la cámara mueve por transform.forward en lugar de bajarla en vertical? Elige 2.",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Porque así el punto del centro de la pantalla no se desplaza",
        correct: true,
        explanation:
          "La cámara está inclinada. Bajarla en vertical acerca también el punto que mira, y la vista se escapa hacia delante.",
      },
      {
        id: "B",
        text: "Porque respeta la dirección en la que la cámara está mirando",
        correct: true,
        explanation:
          "`transform.forward` es el vector hacia donde apunta. Avanzar por él es acercarse a lo que ves, que es lo que espera el jugador.",
      },
      {
        id: "C",
        text: "Porque en vertical la cámara atravesaría el suelo",
        correct: false,
        explanation:
          "De eso se encargan los topes de altura, y harían falta igual con cualquiera de los dos métodos.",
      },
      {
        id: "D",
        text: "Porque bajar en vertical obligaría a usar Time.deltaTime",
        correct: false,
        explanation:
          "El zoom no usa Time.deltaTime en ninguno de los dos casos: la rueda es un suceso que llega una vez, no un estado continuo.",
      },
    ],
    tips: [
      "Los topes se comprueban sobre la posición futura, antes de aplicarla.",
      "Rotar la cámara inclina la imagen; orbitarla con RotateAround gira alrededor de un punto del suelo.",
    ],
  },
  {
    id: "m1-q06",
    prompt:
      "El jugador va a pulsar un botón de la barra de tareas y la cámara sale disparada hacia la derecha. ¿Qué le falta al scroll de borde?",
    options: [
      {
        id: "A",
        text: "Comprobar que el ratón está dentro de la ventana",
        correct: true,
        explanation:
          "Las coordenadas del ratón siguen llegando fuera de la ventana, y pueden ser negativas o mayores que la pantalla.",
      },
      {
        id: "B",
        text: "Un margen más pequeño",
        correct: false,
        explanation:
          "El margen decide a qué distancia del borde empieza el desplazamiento. No impide que el ratón se vaya fuera.",
      },
      {
        id: "C",
        text: "Multiplicar la velocidad por Time.deltaTime",
        correct: false,
        explanation:
          "Eso hace que la velocidad sea igual en todas las máquinas. No tiene relación con el ratón fuera de la ventana.",
      },
      {
        id: "D",
        text: "Normalizar el vector de dirección",
        correct: false,
        explanation:
          "Normalizar evita que la diagonal corra más. Aquí el problema es que no debería moverse en absoluto.",
      },
    ],
    tips: [
      "Es el detalle que casi todos los tutoriales de scroll de borde se saltan.",
      "El margen en píxeles se comporta distinto según la resolución: pruébalo en pantalla completa.",
    ],
  },
  {
    id: "m1-q07",
    prompt:
      "Tienes cuatro scripts en la cámara y cualquiera de ellos puede moverla. ¿Por qué el recorte de los límites va en LateUpdate?",
    options: [
      {
        id: "A",
        text: "Porque se ejecuta después de todos los Update del fotograma",
        correct: true,
        explanation:
          "Da igual quién haya movido la cámara: el recorte llega siempre al final y corrige lo que haga falta.",
      },
      {
        id: "B",
        text: "Porque LateUpdate se llama menos veces y ahorra rendimiento",
        correct: false,
        explanation:
          "`LateUpdate` se llama una vez por fotograma, igual que `Update`. Lo que cambia es el momento, no la frecuencia.",
      },
      {
        id: "C",
        text: "Porque Update está reservado para leer la entrada del jugador",
        correct: false,
        explanation:
          "No hay tal reserva. Se puede leer entrada y mover cosas en `Update` sin problema.",
      },
      {
        id: "D",
        text: "Porque en Update el Transform todavía no existe",
        correct: false,
        explanation:
          "El `Transform` existe desde que el objeto se crea. Es el único componente que Unity garantiza siempre.",
      },
    ],
    tips: [
      "Sin LateUpdate tendrías la misma comprobación repetida en cada script que mueve la cámara.",
      "Mathf.Clamp mete un valor dentro de un mínimo y un máximo.",
    ],
  },
  {
    id: "m1-q08",
    prompt:
      "Haces clic derecho sobre el terreno y la marca no aparece nunca, pero la consola no da ningún error. ¿Qué revisas primero?",
    options: [
      {
        id: "A",
        text: "Que el suelo esté en la capa Ground y la máscara la incluya",
        correct: true,
        explanation:
          "Si la máscara no coincide con la capa del objeto, el raycast no acierta nada y el método sale sin hacer ruido.",
      },
      {
        id: "B",
        text: "Que el campo Marker esté asignado en el Inspector",
        correct: false,
        explanation:
          "Si faltara, habría un error de referencia nula en la consola. El enunciado dice que no hay errores.",
      },
      {
        id: "C",
        text: "Que la cámara tenga el componente CameraPan",
        correct: false,
        explanation:
          "El paneo no interviene en el raycast. La cámara se usa para lanzar el rayo, no para detectar el impacto.",
      },
      {
        id: "D",
        text: "Que el botón derecho esté leído con isPressed",
        correct: false,
        explanation:
          "Con `isPressed` la marca aparecería igual, solo que recolocándose muchas veces. El síntoma sería otro.",
      },
    ],
    tips: [
      "Un raycast que no acierta nada devuelve false y no lanza ninguna excepción.",
      "El objeto necesita además un collider: sin él es invisible para cualquier rayo.",
    ],
  },
  {
    id: "m1-q09",
    prompt:
      "Un cubo se ve perfectamente en pantalla pero el raycast nunca lo detecta. ¿Qué le falta?",
    options: [
      {
        id: "A",
        text: "Un collider",
        correct: true,
        explanation:
          "El collider define la forma del objeto para los cálculos de física. Sin él, el objeto se dibuja pero no existe para un rayo.",
      },
      {
        id: "B",
        text: "Un Mesh Renderer",
        correct: false,
        explanation:
          "El `Mesh Renderer` es justo lo que lo hace visible, y el enunciado dice que se ve. El problema está en el otro lado.",
      },
      {
        id: "C",
        text: "Estar marcado como estático",
        correct: false,
        explanation:
          "Lo estático sirve para optimizar iluminación y dibujado. No influye en si un rayo lo detecta.",
      },
      {
        id: "D",
        text: "Un material asignado",
        correct: false,
        explanation:
          "El material decide cómo se ve. Un objeto sin material se vería en rosa, pero seguiría siendo detectable.",
      },
    ],
    tips: [
      "Ver y existir para la física son dos cosas distintas en Unity.",
      "Es la causa de la mitad de los clics que no hacen nada durante todo el curso.",
    ],
  },
  {
    id: "m1-q10",
    prompt:
      "Tienes quince tipos de unidad y necesitas comparar sus costes para equilibrar la economía. ¿Dónde conviene que vivan esos números?",
    options: [
      {
        id: "A",
        text: "En ScriptableObjects, un archivo por unidad en una carpeta",
        correct: true,
        explanation:
          "Los ves todos en fila, los comparas de un vistazo y puedes seleccionar varios a la vez para editarlos juntos.",
      },
      {
        id: "B",
        text: "En campos serializados dentro de cada prefab",
        correct: false,
        explanation:
          "Funciona, pero obliga a abrir quince prefabs uno a uno cada vez que quieras comparar dos números.",
      },
      {
        id: "C",
        text: "Como constantes en un script de configuración",
        correct: false,
        explanation:
          "Cada ajuste exige editar código y recompilar. Y quien equilibra el juego no tiene por qué saber programar.",
      },
      {
        id: "D",
        text: "En la escena, dentro de un objeto vacío de configuración",
        correct: false,
        explanation:
          "Los cambios hechos durante el modo juego se perderían, que es justo cuando quieres ajustar el balance.",
      },
    ],
    tips: [
      "Un ScriptableObject no está en la escena, así que sus cambios sobreviven al modo juego.",
      "Esa misma persistencia es un riesgo: tocar una ficha afecta a todas las unidades y también a la partida siguiente.",
    ],
  },
  {
    id: "m1-q11",
    prompt:
      "En una ficha de datos escribes campos públicos, aunque las reglas del proyecto prohíben los campos públicos en los componentes. ¿Por qué no es una contradicción?",
    options: [
      {
        id: "A",
        text: "Porque una ficha de datos existe precisamente para que otros la lean",
        correct: true,
        explanation:
          "La regla protege el estado de un componente, que nadie de fuera debería escribir. Una ficha de datos es de solo lectura por naturaleza.",
      },
      {
        id: "B",
        text: "Porque los ScriptableObject no admiten SerializeField",
        correct: false,
        explanation:
          "Lo admiten sin problema. La elección es de diseño, no una limitación técnica.",
      },
      {
        id: "C",
        text: "Porque los campos públicos son más rápidos de leer",
        correct: false,
        explanation:
          "La diferencia de rendimiento entre un campo público y uno privado serializado es irrelevante.",
      },
      {
        id: "D",
        text: "Porque las reglas del proyecto no se aplican a la carpeta Data",
        correct: false,
        explanation:
          "Las reglas se aplican a todo el proyecto. Lo que ocurre es que esta regla concreta habla de componentes.",
      },
    ],
    tips: [
      "Cuando una regla tiene una excepción, conviene escribirla en el archivo de reglas.",
      "Unity no serializa diccionarios: usa tipos simples, listas o arrays.",
    ],
  },
  {
    id: "m1-q12",
    prompt:
      "Escribes un script que solo hace sonar un efecto al seleccionar una unidad. Según la arquitectura del módulo 0, ¿en qué carpeta va?",
    options: [
      {
        id: "A",
        text: "Assets/Scripts/Presentation",
        correct: true,
        explanation:
          "Un sonido no decide nada: comunica al jugador algo que ya se decidió. Esa es la definición de la capa de presentación.",
      },
      {
        id: "B",
        text: "Assets/Scripts/Input",
        correct: false,
        explanation:
          "La entrada traduce el clic en una orden. Que algo se dispare a raíz de un clic no lo convierte en entrada.",
      },
      {
        id: "C",
        text: "Assets/Scripts/Simulation",
        correct: false,
        explanation:
          "La simulación decide qué unidades quedan seleccionadas. Que eso suene o no, no cambia el estado del juego.",
      },
      {
        id: "D",
        text: "Assets/Scripts/Data",
        correct: false,
        explanation:
          "En datos vive la referencia al archivo de sonido, pero no el código que lo reproduce.",
      },
    ],
    tips: [
      "Prueba mental: si lo quitas, ¿cambia algún resultado de la partida? Si no, es presentación.",
      "La pregunta de control de la clase 0.7: ¿seguiría funcionando si el que manda estuviera en otro ordenador?",
    ],
  },
  {
    id: "m1-q13",
    prompt:
      "Claude Code te devuelve un script que llama a GetComponent dentro de Update. Compila y funciona en tu escena con dos objetos. ¿Qué haces?",
    options: [
      {
        id: "A",
        text: "Pedir que guarde la referencia en Awake y la reutilice",
        correct: true,
        explanation:
          "Buscar la pieza en cada fotograma es gastar tiempo en encontrar algo que nunca cambia. Con doscientas unidades se nota mucho.",
      },
      {
        id: "B",
        text: "Aceptarlo: compila y funciona",
        correct: false,
        explanation:
          "Que compile solo dice que el compilador lo acepta. Ni que sea correcto, ni que aguante cuando haya muchos objetos.",
      },
      {
        id: "C",
        text: "Rechazarlo entero y escribirlo a mano",
        correct: false,
        explanation:
          "Es una salida válida para trozos cortos, pero aquí basta con pedir un cambio concreto sobre algo que ya está casi bien.",
      },
      {
        id: "D",
        text: "Aceptarlo y anotarlo para optimizar al final del curso",
        correct: false,
        explanation:
          "Dejar deuda conocida en los cimientos sale caro. Este arreglo cuesta dos líneas hoy.",
      },
    ],
    tips: [
      "Las señales de alarma comparten patrón: funcionan con un objeto y se hunden con doscientos.",
      "Revisar no es imponer tu estilo: un nombre de variable que no te gusta no es un problema.",
    ],
  },
  {
    id: "m1-q14",
    prompt:
      "Clonas tu proyecto en otro ordenador para seguir el curso y los materiales salen en rosa, con los scripts desconectados de sus objetos. ¿Qué falló?",
    options: [
      {
        id: "A",
        text: "Los archivos .meta no se versionaron",
        correct: true,
        explanation:
          "Cada .meta guarda el identificador con el que escenas y prefabs encuentran su archivo. Sin ellos, Unity genera otros nuevos y las referencias se pierden.",
      },
      {
        id: "B",
        text: "La carpeta Library no se subió al repositorio",
        correct: false,
        explanation:
          "Library nunca debe subirse: se regenera sola al abrir el proyecto. No tiene nada que ver con este síntoma.",
      },
      {
        id: "C",
        text: "El otro ordenador tiene otra versión de Unity",
        correct: false,
        explanation:
          "Eso daría avisos de actualización del proyecto, pero no desconectaría las referencias de forma masiva.",
      },
      {
        id: "D",
        text: "Faltaba configurar la serialización en Force Text",
        correct: false,
        explanation:
          "Ese ajuste sirve para poder leer y resolver conflictos en escenas y prefabs. No afecta a los identificadores.",
      },
    ],
    tips: [
      "Es el error más caro del módulo 0 y el que menos se ve venir: en tu ordenador nunca da la cara.",
      "Compruébalo con git ls-files \"*.meta\" antes de confiar en un repositorio de Unity.",
    ],
  },
  {
    id: "m1-q15",
    prompt:
      "Estás decidiendo dónde poner cada número de tu juego. ¿Cuáles de estos van en una ficha de datos y no en un campo del prefab de la unidad? Elige 2.",
    multiple: true,
    options: [
      {
        id: "A",
        text: "El coste en comida de entrenar un aldeano",
        correct: true,
        explanation:
          "Es un valor de balance. Lo vas a comparar con el de las otras quince unidades, y quieres verlos todos en fila.",
      },
      {
        id: "B",
        text: "Los puntos de vida máximos de un soldado",
        correct: true,
        explanation:
          "Mismo caso: define el tipo de unidad, no a un soldado concreto. Cambiarlo debe afectar a todos los soldados a la vez.",
      },
      {
        id: "C",
        text: "La vida que le queda ahora mismo a ese soldado herido",
        correct: false,
        explanation:
          "Eso es estado de una unidad concreta durante la partida. Si viviera en la ficha, todos los soldados compartirían herida.",
      },
      {
        id: "D",
        text: "El punto del mapa hacia el que camina esa unidad",
        correct: false,
        explanation:
          "También es estado de una sola unidad, y cambia cada pocos segundos. Nada que ver con los datos del tipo.",
      },
    ],
    tips: [
      "La pregunta que separa los dos casos: ¿esto describe al tipo de unidad o a un individuo?",
      "Compartir por error el estado de una unidad es de los fallos más desconcertantes que existen.",
    ],
  },
];
