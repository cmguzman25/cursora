import type { ExamQuizQuestion } from "../../types";

/**
 * Banco de la clase "00-08-checkpoint-modulo-0" (Módulo 0 — Preparación y cómo
 * trabajar con Claude Code). Trece preguntas repartidas por todo el módulo, no
 * solo por la última clase.
 *
 * Es el primer checkpoint del curso, así que no arrastra preguntas de módulos
 * anteriores. Todas evalúan decisiones y diagnóstico, nunca en qué menú estaba
 * un botón.
 */
export const MODULE_0_QUESTIONS: ExamQuizQuestion[] = [
  {
    id: "m0-q01",
    prompt:
      "Estás a punto de empezar el curso y ves que hay una versión de Unity más nueva que la 6.3 LTS. Te tienta instalarla. ¿Qué pasa si lo haces?",
    options: [
      {
        id: "A",
        text: "Nada: Unity mantiene las rutas de menú entre versiones",
        correct: false,
        explanation:
          "Unity cambia nombres de menú, paneles y ajustes entre versiones. Es justo lo que hace que un tutorial de hace dos años deje de poder seguirse.",
      },
      {
        id: "B",
        text: "Las rutas y los nombres de las clases pueden dejar de coincidir",
        correct: true,
        explanation:
          "Por eso el curso fija la versión en la clase 0.2. Una ruta de menú equivocada deja al alumno parado sin forma de continuar.",
      },
      {
        id: "C",
        text: "El proyecto no abrirá en absoluto",
        correct: false,
        explanation:
          "Sí abrirá, y ese es el problema: el proyecto se actualiza a la versión nueva sin avisar demasiado, y las diferencias aparecen poco a poco.",
      },
      {
        id: "D",
        text: "Perderás el soporte de Blender",
        correct: false,
        explanation:
          "Blender y Unity son programas independientes que se comunican por archivos. La versión de uno no condiciona la del otro.",
      },
    ],
    tips: [
      "LTS significa soporte a largo plazo: recibe correcciones pero deja de cambiar de aspecto.",
      "En Unity Hub puedes tener varias versiones instaladas, y cada proyecto recuerda con cuál nació.",
    ],
  },
  {
    id: "m0-q02",
    prompt:
      "Tu repositorio de Git acaba de pasar de 20 MB a 1,8 GB después del primer commit. ¿Qué revisas primero?",
    options: [
      {
        id: "A",
        text: "Si la carpeta Library entró en el commit",
        correct: true,
        explanation:
          "Es la causa casi segura. Library son las versiones procesadas de tus assets, puede pesar varios gigas y Unity la reconstruye sola.",
      },
      {
        id: "B",
        text: "Si los archivos .meta se están versionando",
        correct: false,
        explanation:
          "Los .meta sí deben versionarse, y además son diminutos. Nunca son la causa de un repositorio enorme.",
      },
      {
        id: "C",
        text: "Si la serialización está en Force Text",
        correct: false,
        explanation:
          "Ese ajuste cambia el formato de escenas y prefabs, no su tamaño de forma apreciable. Sirve para poder leer y resolver conflictos.",
      },
      {
        id: "D",
        text: "Si Git LFS está instalado",
        correct: false,
        explanation:
          "LFS ayuda con los binarios grandes que sí quieres guardar, pero con un salto de 1,8 GB en el primer commit lo probable es que entrara una carpeta generada.",
      },
    ],
    tips: [
      "Si el .gitignore se creó después del git add, ejecuta git rm -r --cached . y vuelve a añadir.",
      "Las carpetas generadas son Library, Temp, obj y Build: ninguna va al repositorio.",
    ],
  },
  {
    id: "m0-q03",
    prompt:
      "Clonas tu proyecto en otro ordenador y los materiales se ven en rosa, los prefabs aparecen vacíos y varios scripts están desconectados de sus objetos. ¿Qué ha pasado?",
    options: [
      {
        id: "A",
        text: "Falta instalar el paquete Input System",
        correct: false,
        explanation:
          "Un paquete ausente daría errores de compilación, no referencias rotas ni materiales en rosa.",
      },
      {
        id: "B",
        text: "Los archivos .meta no se versionaron",
        correct: true,
        explanation:
          "Cada .meta guarda el identificador con el que escenas y prefabs encuentran su archivo. Sin ellos, Unity genera identificadores nuevos y todas las referencias apuntan a la nada.",
      },
      {
        id: "C",
        text: "El proyecto se abrió con otra versión de Unity",
        correct: false,
        explanation:
          "Eso puede dar avisos de actualización, pero no desconecta las referencias de forma masiva como aquí.",
      },
      {
        id: "D",
        text: "Faltaba Git LFS y los binarios llegaron corruptos",
        correct: false,
        explanation:
          "Sin LFS los archivos llegan enteros igualmente; LFS cambia dónde se guardan, no si se guardan. Y eso no afectaría a los scripts.",
      },
    ],
    tips: [
      "Comprueba con git ls-files Assets que aparecen archivos .meta en el repositorio.",
      "El ajuste Visible Meta Files debe estar activo en Project Settings, sección Editor.",
    ],
  },
  {
    id: "m0-q04",
    prompt:
      "Le pediste a Claude Code que añadiera zoom a la cámara. Te devuelve el zoom y, además, reescribe el paneo con teclado que ya funcionaba. ¿Qué haces?",
    options: [
      {
        id: "A",
        text: "Aceptarlo todo: si lo reescribió, será porque estaba mejorable",
        correct: false,
        explanation:
          "Puede que tenga razón, pero si aceptas dos cambios de golpe y algo se rompe, ya no sabes cuál lo rompió.",
      },
      {
        id: "B",
        text: "Aceptar solo el zoom y dejar el paneo como estaba",
        correct: true,
        explanation:
          "Un cambio cada vez, probado en pantalla. Si el paneo te parece mejorable, eso es otro encargo, otro día.",
      },
      {
        id: "C",
        text: "Rechazarlo todo y escribir el zoom a mano",
        correct: false,
        explanation:
          "Es una salida válida si el código no te convence, pero aquí el zoom es justo lo que pediste. Descartarlo entero desaprovecha trabajo correcto.",
      },
      {
        id: "D",
        text: "Aceptarlo y arreglar después lo que falle",
        correct: false,
        explanation:
          "Es la forma más rápida de acabar depurando dos cambios a la vez sin saber cuál es el culpable.",
      },
    ],
    tips: [
      "Un encargo bien escrito dice qué no hay que tocar, justo para evitar esto.",
      "El tercer punto de un encargo, el de los límites, es el que más disgustos ahorra.",
    ],
  },
  {
    id: "m0-q05",
    prompt:
      "¿Cuáles de estas señales indican que conviene revisar un código de Unity antes de aceptarlo? Elige 2.",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Llama a GetComponent dentro de Update",
        correct: true,
        explanation:
          "Busca el componente sesenta veces por segundo cuando bastaba una vez al arrancar. Se nota con muchos objetos en escena.",
      },
      {
        id: "B",
        text: "Mueve un objeto sin multiplicar por Time.deltaTime",
        correct: true,
        explanation:
          "El objeto irá a distinta velocidad en cada ordenador, según los fotogramas por segundo que dé la máquina.",
      },
      {
        id: "C",
        text: "Usa nombres de variable distintos a los que habrías puesto tú",
        correct: false,
        explanation:
          "Revisar no es imponer tu estilo. Mientras los nombres sean claros y respeten las reglas del proyecto, no hay problema.",
      },
      {
        id: "D",
        text: "Resuelve en tres líneas algo que tú harías en seis",
        correct: false,
        explanation:
          "Ser más corto no es un defecto. Lo que importa es que funcione, que encaje con el proyecto y que lo entiendas.",
      },
    ],
    tips: [
      "Las señales de alarma comparten un patrón: el código va bien con un objeto y se hunde con doscientos.",
      "Los problemas de rendimiento no aparecen hasta el módulo 3, cuando haya grupos de unidades moviéndose.",
    ],
  },
  {
    id: "m0-q06",
    prompt:
      "Haces clic derecho en el suelo con un aldeano seleccionado. Según la arquitectura del curso, ¿quién decide si el aldeano puede ir a ese punto?",
    options: [
      {
        id: "A",
        text: "La capa de entrada, que es la que leyó el clic",
        correct: false,
        explanation:
          "La entrada traduce el clic en una intención y nada más. Si además decidiera, esa decisión viviría en la máquina del jugador.",
      },
      {
        id: "B",
        text: "La capa de simulación, al recibir la orden",
        correct: true,
        explanation:
          "La entrada emite órdenes, la simulación decide y la presentación dibuja. Es la regla que sostiene el curso entero.",
      },
      {
        id: "C",
        text: "La capa de presentación, que conoce la animación de caminar",
        correct: false,
        explanation:
          "La presentación solo dibuja lo que ya se decidió. No toma decisiones de juego en ningún momento.",
      },
      {
        id: "D",
        text: "La capa de datos, que guarda la velocidad del aldeano",
        correct: false,
        explanation:
          "Los datos no hacen nada: se dejan leer. Definen qué existe y con qué números, pero no ejecutan reglas.",
      },
    ],
    tips: [
      "La pregunta de control: ¿esto seguiría funcionando si el que manda estuviera en otro ordenador?",
      "Un clic no se puede enviar por internet; una orden, sí.",
    ],
  },
  {
    id: "m0-q07",
    prompt:
      "Ayer decidiste con Claude Code que los datos de las unidades irían en una carpeta concreta. Hoy abres una sesión nueva y propone otra carpeta distinta. ¿Por qué?",
    options: [
      {
        id: "A",
        text: "Porque la sesión anterior se cerró y esa conversación no sobrevive",
        correct: true,
        explanation:
          "Al cerrar la terminal, la conversación se acaba. Lo único que sobrevive es lo escrito en disco, empezando por el archivo de reglas del proyecto.",
      },
      {
        id: "B",
        text: "Porque cada sesión elige al azar entre varias opciones",
        correct: false,
        explanation:
          "No es azar: es falta de contexto. Con la decisión escrita en el proyecto, la respuesta sería la misma los dos días.",
      },
      {
        id: "C",
        text: "Porque el proyecto cambió de estructura durante la noche",
        correct: false,
        explanation:
          "Lee el proyecto tal y como está. Si la estructura no cambió, el problema no viene de ahí.",
      },
      {
        id: "D",
        text: "Porque hace falta reiniciar Unity para que se entere",
        correct: false,
        explanation:
          "Claude Code lee archivos del disco directamente. Que Unity esté abierto o cerrado no influye en lo que ve.",
      },
    ],
    tips: [
      "Si una decisión importa para mañana, no la dejes en la conversación: escríbela en el proyecto.",
      "El archivo de reglas se lee al empezar cada sesión, sin que haya que recordarlo.",
    ],
  },
  {
    id: "m0-q08",
    prompt:
      "Escribiste el archivo de reglas del proyecto, pero Claude Code sigue proponiendo campos públicos en lugar de campos privados con [SerializeField]. ¿Qué revisas primero?",
    options: [
      {
        id: "A",
        text: "Que el archivo esté en la raíz del proyecto y se llame CLAUDE.md",
        correct: true,
        explanation:
          "Es el fallo más común, sobre todo en Windows: un archivo guardado como CLAUDE.md.txt se ve igual con las extensiones ocultas, y no se lee.",
      },
      {
        id: "B",
        text: "Que Unity tenga activada la serialización en Force Text",
        correct: false,
        explanation:
          "Ese ajuste afecta a cómo se guardan escenas y prefabs en disco. No tiene relación con cómo se escriben los scripts.",
      },
      {
        id: "C",
        text: "Que el proyecto esté bajo control de versiones",
        correct: false,
        explanation:
          "Git guarda historial, pero no influye en lo que Claude Code propone al escribir código.",
      },
      {
        id: "D",
        text: "Que el archivo tenga más de cuarenta líneas",
        correct: false,
        explanation:
          "El problema es el contrario: un archivo de reglas largo se lee peor. Se recomienda mantenerlo por debajo de cuarenta líneas.",
      },
    ],
    tips: [
      "El archivo va junto a Assets, no dentro, para que Unity no le genere un .meta.",
      "En una sesión muy larga las reglas quedan atrás; recordárselas en el encargo funciona.",
    ],
  },
  {
    id: "m0-q09",
    prompt:
      "¿Cuáles de estas cosas no se delegan nunca en Claude Code durante el curso? Elige 2.",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Decidir cuánta vida tiene un soldado",
        correct: true,
        explanation:
          "Es una decisión de diseño. Se decide, se prueba jugando y se ajusta; no se pregunta.",
      },
      {
        id: "B",
        text: "Entender el código antes de pegarlo",
        correct: true,
        explanation:
          "Dentro de tres semanas ese código va a fallar y lo arreglarás tú. Si no lo entendías al pegarlo, tampoco lo entenderás al romperse.",
      },
      {
        id: "C",
        text: "Escribir un script a partir de una descripción clara",
        correct: false,
        explanation:
          "Eso es justo lo que sí se delega. Tú decides qué hace el script y él lo teclea.",
      },
      {
        id: "D",
        text: "Explicar qué hace una línea que no reconoces",
        correct: false,
        explanation:
          "Preguntar es una de las mejores formas de usarlo. Es una pregunta legítima y la responderá sin problema.",
      },
    ],
    tips: [
      "La regla de fondo del curso: tienes que poder leer y corregir todo lo que escriba.",
      "Si una clase necesita algo que no se ha explicado, el fallo es del orden del curso, no tuyo.",
    ],
  },
  {
    id: "m0-q10",
    prompt:
      "Estás decidiendo dónde colocar el sonido que suena al seleccionar una unidad. ¿A qué capa pertenece?",
    options: [
      {
        id: "A",
        text: "Entrada, porque lo dispara un clic del ratón",
        correct: false,
        explanation:
          "La entrada traduce el clic en una orden. Que algo se dispare a raíz de un clic no lo convierte en entrada.",
      },
      {
        id: "B",
        text: "Presentación, porque un sonido no decide nada",
        correct: true,
        explanation:
          "La presentación se entera de lo que pasó y lo comunica al jugador: animación, efectos y sonido. Ninguna regla del juego depende de ella.",
      },
      {
        id: "C",
        text: "Simulación, porque forma parte de la selección",
        correct: false,
        explanation:
          "La simulación decide qué unidades quedan seleccionadas. Que eso suene o no, no cambia el estado del juego.",
      },
      {
        id: "D",
        text: "Datos, porque hay que guardar qué archivo de sonido usar",
        correct: false,
        explanation:
          "La referencia al archivo sí puede vivir en datos, pero reproducirlo es trabajo de presentación. La pregunta es quién lo hace sonar.",
      },
    ],
    tips: [
      "Prueba mental útil: si lo quitas, ¿cambia algún resultado de la partida? Si no, es presentación.",
      "La presentación es la capa que más se puede cambiar sin romper nada.",
    ],
  },
  {
    id: "m0-q11",
    prompt:
      "Desde el módulo 3, cada unidad y cada edificio llevan un número de jugador, aunque hasta el módulo 5 no haya rival. ¿Por qué tan pronto?",
    options: [
      {
        id: "A",
        text: "Porque Unity exige un identificador en cada objeto de la escena",
        correct: false,
        explanation:
          "Unity ya identifica sus objetos por su cuenta. El número de jugador es una decisión de diseño del juego, no un requisito del motor.",
      },
      {
        id: "B",
        text: "Porque sin él, preguntas como cuánta madera hay no tienen respuesta única",
        correct: true,
        explanation:
          "Toda pregunta sobre recursos o visión necesita un dueño. La niebla de guerra del módulo 5 se calcula por jugador justo por esto.",
      },
      {
        id: "C",
        text: "Porque mejora el rendimiento al filtrar unidades",
        correct: false,
        explanation:
          "Puede ayudar a filtrar, pero ese no es el motivo. El motivo es que las preguntas del juego dejen de ser ambiguas.",
      },
      {
        id: "D",
        text: "Porque el pathfinding necesita saber de quién es cada unidad",
        correct: false,
        explanation:
          "Buscar camino no depende del dueño. Otra cosa es decidir a quién atacar, que llega en el módulo 5.",
      },
    ],
    tips: [
      "Añadir el dueño al final obligaría a tocar todos los sistemas que ya preguntan por recursos o visión.",
      "En el módulo 7, ese mismo número distingue a dos humanos en lugar de a un humano y un bot.",
    ],
  },
  {
    id: "m0-q12",
    prompt:
      "Llevas dos horas en la misma sesión de Claude Code peleando con la cámara. Ahora quieres empezar con el sistema de recursos. ¿Qué conviene hacer?",
    options: [
      {
        id: "A",
        text: "Seguir en la misma sesión, que ya conoce el proyecto",
        correct: false,
        explanation:
          "Lo que conoce el proyecto es su capacidad de leer archivos, no la conversación. Dos horas de cámara no ayudan a hablar de recursos.",
      },
      {
        id: "B",
        text: "Cerrar y abrir una sesión nueva para la tarea nueva",
        correct: true,
        explanation:
          "Una sesión por tarea. Una conversación muy larga arrastra todo lo anterior, y ese pasado estorba más que ayuda.",
      },
      {
        id: "C",
        text: "Seguir, pero pedirle que olvide lo de la cámara",
        correct: false,
        explanation:
          "Es un apaño. Abrir una sesión nueva consigue lo mismo de forma limpia y no cuesta nada.",
      },
      {
        id: "D",
        text: "Cerrar Unity antes de seguir",
        correct: false,
        explanation:
          "Que Unity esté abierto no influye en la conversación. Lo que conviene cerrar es la sesión, no el editor.",
      },
    ],
    tips: [
      "Las clases del curso están pensadas como tareas que caben en una sesión corta.",
      "Lo que quieras conservar entre sesiones tiene que acabar escrito en el proyecto.",
    ],
  },
  {
    id: "m0-q13",
    prompt:
      "El panel de recursos del módulo 6 muestra cuánta madera tienes. Como ya tiene el número delante, alguien propone que decida también si puedes pagar una casa. ¿Qué problema tiene esa idea?",
    options: [
      {
        id: "A",
        text: "Ninguno: evita duplicar la comprobación en dos sitios",
        correct: false,
        explanation:
          "Evita una duplicación pequeña a cambio de poner una decisión del juego en la capa que menos confianza merece.",
      },
      {
        id: "B",
        text: "En una partida en red, ese panel vive en la máquina del jugador",
        correct: true,
        explanation:
          "Un jugador no decide si puede pagar: lo decide quien lleva la cuenta. El panel enseña el número y nada más.",
      },
      {
        id: "C",
        text: "El panel se dibuja demasiado tarde para comprobarlo",
        correct: false,
        explanation:
          "El momento del dibujado no es el problema. El problema es quién tiene autoridad para decidir.",
      },
      {
        id: "D",
        text: "Obligaría a recalcular los recursos cada fotograma",
        correct: false,
        explanation:
          "Comparar dos números es barato. El motivo para no hacerlo ahí es de arquitectura, no de rendimiento.",
      },
    ],
    tips: [
      "La interfaz muestra el estado y emite órdenes; ninguna regla del juego vive en ella.",
      "Es la misma pregunta de control de la clase 0.7, aplicada a un caso concreto.",
    ],
  },
];
