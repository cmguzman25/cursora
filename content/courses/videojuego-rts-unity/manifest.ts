import type { CourseManifest, LessonMeta, LocalizedText } from "../types";

/**
 * Generado a partir del `README.md` de este curso, que es el índice legible.
 * Cuando se agrega, renombra o reordena una clase, se cambia primero allí y
 * después aquí — la app navega por esta lista.
 *
 * Las 94 clases se reparten en 8 módulos: el juego crece módulo a módulo desde
 * el proyecto vacío hasta una partida 1v1 por internet. Cómo se escribe cada
 * clase está en `CONTRATO-DE-CLASES.md`.
 *
 * Las clases marcadas `kind: "quiz"` no tienen archivo Markdown: su contenido
 * vive en `preguntas/` (tipo C del contrato). Hay una por módulo.
 */

const COURSE_SLUG = "videojuego-rts-unity";
/** Mismo texto que el título del catálogo en `src/lib/courses.ts`: la tarjeta y
 *  la cabecera del curso salen de sitios distintos y no deben discrepar. */
const COURSE_TITLE: LocalizedText = {
  es: "Crea tu RTS con Unity, Blender y Claude Code",
  en: "Build your RTS with Unity, Blender, and Claude Code",
  "pt-BR": "Crie seu RTS com Unity, Blender e Claude Code",
};

const MODULES: Record<string, LocalizedText> = {
  "modulo-0": { es: "Módulo 0 — Preparación y cómo trabajar con Claude Code" },
  "modulo-1": { es: "Módulo 1 — Unity y C# para un RTS" },
  "modulo-2": { es: "Módulo 2 — Blender a fondo: el arte del juego" },
  "modulo-3": { es: "Módulo 3 — Unidades: selección, movimiento y estados" },
  "modulo-4": { es: "Módulo 4 — Economía: recursos, recolección y construcción" },
  "modulo-5": { es: "Módulo 5 — Combate, niebla de guerra e IA enemiga" },
  "modulo-6": { es: "Módulo 6 — Interfaz y pulido" },
  "modulo-7": { es: "Módulo 7 — Multijugador online y publicación" },
};

const LESSONS: LessonMeta[] = [
  { id: "00-01-que-vas-a-construir", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Qué vas a construir" } },
  { id: "00-02-instala-el-entorno", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Instala Unity, Blender, Git y Claude Code" } },
  { id: "00-03-como-trabaja-claude-code", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Cómo trabaja Claude Code: contexto, permisos y sesiones" } },
  { id: "00-04-las-reglas-de-tu-proyecto", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Las reglas de tu proyecto" } },
  { id: "00-05-revisar-el-codigo-generado", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Revisar el código que escribe Claude Code" } },
  { id: "00-06-git-en-un-proyecto-de-unity", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Git en un proyecto de Unity: qué se guarda y qué no" } },
  { id: "00-07-la-arquitectura-en-una-hoja", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "La arquitectura del juego en una hoja" } },
  { id: "00-08-checkpoint-modulo-0", moduleId: "modulo-0", module: MODULES["modulo-0"], title: { es: "Checkpoint del módulo 0" }, kind: "quiz" },

  { id: "01-01-el-editor-de-unity", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "El editor de Unity: escena, jerarquía e Inspector" } },
  { id: "01-02-gameobject-y-component", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "GameObject y Component: el modelo mental" } },
  { id: "01-03-tu-primer-script", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Tu primer script: MonoBehaviour y el ciclo de vida" } },
  { id: "01-04-campos-en-el-inspector", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Campos en el Inspector: serialización y rangos" } },
  { id: "01-05-el-terreno-del-mapa", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "El terreno del mapa" } },
  { id: "01-06-camara-rts-paneo", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "La cámara RTS: paneo con teclado" } },
  { id: "01-07-zoom-y-rotacion", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Zoom y rotación de la cámara" } },
  { id: "01-08-scroll-de-borde-y-limites", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Scroll de borde y límites del mapa" } },
  { id: "01-09-del-raton-al-mundo", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Del ratón al mundo: raycast, capas y clic en el suelo" } },
  { id: "01-10-datos-con-scriptableobject", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Los datos del juego con ScriptableObject" } },
  { id: "01-11-checkpoint-modulo-1", moduleId: "modulo-1", module: MODULES["modulo-1"], title: { es: "Checkpoint del módulo 1" }, kind: "quiz" },

  { id: "02-01-la-interfaz-de-blender", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "La interfaz de Blender: moverte y transformar" } },
  { id: "02-02-modo-edicion", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Modo edición: vértices, aristas y caras" } },
  { id: "02-03-tu-primer-arbol", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Tu primer árbol low-poly" } },
  { id: "02-04-modificadores", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Modificadores: Mirror, Array y Bevel" } },
  { id: "02-05-topologia-limpia", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Topología limpia: por qué importan los cuádriláteros" } },
  { id: "02-06-la-casa-del-aldeano", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "La casa del aldeano" } },
  { id: "02-07-edificios-modulares", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Edificios modulares: cuartel y centro urbano" } },
  { id: "02-08-escala-orientacion-y-export", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Escala, orientación y export a Unity" } },
  { id: "02-09-desplegar-uvs", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Desplegar UVs sin sufrir" } },
  { id: "02-10-atlas-de-textura", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Un atlas de textura para todo el pack" } },
  { id: "02-11-pintar-texturas-y-materiales", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Pintar texturas y materiales" } },
  { id: "02-12-baking-ao-y-normal-map", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Baking: oclusión ambiental y normal map" } },
  { id: "02-13-modelar-el-aldeano", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "El aldeano: modelar un personaje low-poly" } },
  { id: "02-14-rigging-del-aldeano", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Rigging: armature, huesos y jerarquía" } },
  { id: "02-15-weight-painting", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Weight painting: que la malla siga al hueso" } },
  { id: "02-16-animar-al-aldeano", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Animar: quieto, caminar, recolectar y atacar" } },
  { id: "02-17-del-fbx-al-animator", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Del FBX al Animator de Unity" } },
  { id: "02-18-lods-y-presupuesto-de-poligonos", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "LODs y presupuesto de polígonos" } },
  { id: "02-19-checkpoint-modulo-2", moduleId: "modulo-2", module: MODULES["modulo-2"], title: { es: "Checkpoint del módulo 2" }, kind: "quiz" },

  { id: "03-01-el-aldeano-en-escena", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "El aldeano en escena: prefab y datos" } },
  { id: "03-02-seleccionar-con-un-clic", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Seleccionar con un clic" } },
  { id: "03-03-seleccion-con-caja", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Selección múltiple con caja de arrastre" } },
  { id: "03-04-como-encuentra-el-camino", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Cómo encuentra el camino un RTS" } },
  { id: "03-05-navmesh-hornear-el-mapa", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "NavMesh: hornear el mapa" } },
  { id: "03-06-mover-con-clic-derecho", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Mover con clic derecho" } },
  { id: "03-07-evitacion-y-formaciones", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Grupos que no se pisan: evitación y formaciones" } },
  { id: "03-08-maquina-de-estados", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "La máquina de estados de la unidad" } },
  { id: "03-09-conectar-el-animator", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Conectar el Animator: quieto, caminando, trabajando" } },
  { id: "03-10-cola-de-ordenes-y-grupos", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Cola de órdenes y grupos de control" } },
  { id: "03-11-checkpoint-modulo-3", moduleId: "modulo-3", module: MODULES["modulo-3"], title: { es: "Checkpoint del módulo 3" }, kind: "quiz" },

  { id: "04-01-los-cuatro-recursos", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Los cuatro recursos: datos y almacén" } },
  { id: "04-02-nodos-de-recurso", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Nodos de recurso en el mapa: bosque, mina y granja" } },
  { id: "04-03-el-ciclo-del-recolector", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "El ciclo del recolector" } },
  { id: "04-04-ritmo-y-capacidad-de-carga", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Ritmo de recolección y capacidad de carga" } },
  { id: "04-05-la-economia-de-un-rts", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "La economía de un RTS: por qué estos números" } },
  { id: "04-06-colocar-edificios", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Colocar edificios: previsualización y rejilla" } },
  { id: "04-07-validar-el-sitio", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Validar el sitio: terreno, solapes y coste" } },
  { id: "04-08-construccion-progresiva", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "La obra: construcción progresiva" } },
  { id: "04-09-cola-de-entrenamiento", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Producir unidades: la cola de entrenamiento" } },
  { id: "04-10-limite-de-poblacion", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Límite de población y casas" } },
  { id: "04-11-arbol-tecnologico-minimo", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Mejoras: un árbol tecnológico mínimo" } },
  { id: "04-12-checkpoint-modulo-4", moduleId: "modulo-4", module: MODULES["modulo-4"], title: { es: "Checkpoint del módulo 4" }, kind: "quiz" },

  { id: "05-01-estadisticas-de-combate", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Estadísticas de combate y tipos de daño" } },
  { id: "05-02-detectar-enemigos", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Detectar enemigos: rango y capas" } },
  { id: "05-03-atacar-y-morir", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Atacar: cadencia, daño, barra de vida y muerte" } },
  { id: "05-04-arqueros-y-proyectiles", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Arqueros: proyectiles y trayectoria" } },
  { id: "05-05-comportamiento-por-defecto", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Comportamiento por defecto: agresivo, defensivo, quieto" } },
  { id: "05-06-niebla-de-guerra", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Niebla de guerra: la visión de cada unidad" } },
  { id: "05-07-lo-explorado-y-lo-visible", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Lo explorado y lo visible" } },
  { id: "05-08-como-decide-un-bot", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Cómo decide un bot de RTS" } },
  { id: "05-09-el-bot-economia", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "El bot: economía y construcción" } },
  { id: "05-10-el-bot-ataques-y-dificultad", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "El bot: ataques y niveles de dificultad" } },
  { id: "05-11-victoria-y-derrota", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Victoria, derrota y fin de partida" } },
  { id: "05-12-checkpoint-modulo-5", moduleId: "modulo-5", module: MODULES["modulo-5"], title: { es: "Checkpoint del módulo 5" }, kind: "quiz" },

  { id: "06-01-el-panel-de-recursos", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "El panel de recursos" } },
  { id: "06-02-panel-de-seleccion", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Panel de selección y botones de acción" } },
  { id: "06-03-el-minimapa", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "El minimapa" } },
  { id: "06-04-menu-principal-y-escenas", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Menú principal y flujo de escenas" } },
  { id: "06-05-guardar-y-cargar", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Guardar y cargar la partida" } },
  { id: "06-06-sonido-y-musica", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Sonido: efectos, música y mezcla" } },
  { id: "06-07-rendimiento", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Rendimiento: perfilar y arreglar" } },
  { id: "06-08-checkpoint-modulo-6", moduleId: "modulo-6", module: MODULES["modulo-6"], title: { es: "Checkpoint del módulo 6" }, kind: "quiz" },

  { id: "07-01-como-se-juega-en-red", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Cómo se juega en red: host, cliente y autoridad" } },
  { id: "07-02-netcode-y-play-mode", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Netcode for GameObjects y Multiplayer Play Mode" } },
  { id: "07-03-tu-primera-conexion", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Tu primera conexión: host y cliente" } },
  { id: "07-04-que-se-sincroniza", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Qué se sincroniza y qué no" } },
  { id: "07-05-ordenes-por-rpc", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Las órdenes viajan como RPC, no como clics" } },
  { id: "07-06-movimiento-con-autoridad", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Mover unidades con autoridad del servidor" } },
  { id: "07-07-el-servidor-manda", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "El servidor es la fuente de verdad: coste, construcción y daño" } },
  { id: "07-08-niebla-por-jugador", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Niebla de guerra por jugador" } },
  { id: "07-09-sesiones-y-codigo-de-partida", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Salas por internet: sesiones y código de partida" } },
  { id: "07-10-latencia-y-limites", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Latencia, simulador de red y los límites de este modelo" } },
  { id: "07-11-compilar-y-publicar", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Compilar y publicar tu juego" } },
  { id: "07-12-que-construir-despues", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Qué construir después" } },
  { id: "07-13-checkpoint-final", moduleId: "modulo-7", module: MODULES["modulo-7"], title: { es: "Checkpoint final" }, kind: "quiz" },
];

export const manifest: CourseManifest = {
  slug: COURSE_SLUG,
  title: COURSE_TITLE,
  lessons: LESSONS,
};
