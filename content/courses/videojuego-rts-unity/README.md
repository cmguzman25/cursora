# Crea tu RTS — Unity, Blender y Claude Code

Curso práctico: construir un juego de estrategia en tiempo real estilo *Age of
Empires*, desde el proyecto vacío hasta una build publicable, con arte modelado
en Blender por el propio alumno.

- **slug**: `videojuego-rts-unity`
- **Título**: "Crea tu RTS con Unity, Blender y Claude Code" (el mismo en el
  manifest y en el catálogo: la tarjeta y la cabecera del curso no deben
  discrepar)
- **Nivel**: intermedio (sabe programar; cero Unity, Blender y C#)
- **Idioma base**: español (`es`); `en` y `pt-BR` caen al español mientras no
  estén traducidas
- **94 clases** en 8 módulos, lecturas de 8 a 10 minutos
- **Entorno fijo**: Unity 6.3 LTS · Blender 5.2 LTS · Git + LFS · VS Code
- **Solo en el módulo 7**: Netcode for GameObjects · Multiplayer Services SDK ·
  cuenta gratuita de Unity Gaming Services. Se prueba con Multiplayer Play Mode,
  sin necesidad de un segundo ordenador.

Cómo se escribe cada clase está en `CONTRATO-DE-CLASES.md`. Lo medible se
comprueba con:

```bash
node content/courses/videojuego-rts-unity/verificar-lecciones.mjs
```

## Tipos de clase

- **A** — Construcción: el juego avanza (74 clases).
- **B** — Concepto: no se toca el proyecto (12 clases).
- **C** — Checkpoint: cuestionario de 12 a 15 preguntas, cierra el módulo (8).

## Estado

La columna **Estado** se pone a `✅` cuando la clase pasa el verificador y la
checklist manual del contrato.

Escritas: el **módulo 0 entero** (8 clases, checkpoint incluido) y la 1.6, que
fue el **piloto** con el que se calibraron los presupuestos de longitud.

Todas pasan el verificador. Ninguna ha pasado todavía la parte de la checklist
manual que exige ejecutar sus pasos: crear el proyecto en Unity 6.3, seguir la
instalación en una máquina limpia y comprobar que cada ruta de menú está donde
dice la clase. Hasta entonces se quedan en `⚠️`.

Calibración medida al escribir el módulo 0: una clase de tipo B, sin código,
ronda las 1.200 palabras. Una de tipo A con 20 a 35 líneas de código ronda las
900 o 1.100, y las dos salen en ocho minutos.

---

## Módulo 0 — Preparación y cómo trabajar con Claude Code

`moduleId: modulo-0` · 8 clases · **Hito**: proyecto en Git, Claude Code
configurado y la arquitectura del juego decidida.

| # | id | Título | Tipo | Estado |
|---|---|---|---|---|
| 0.1 | `00-01-que-vas-a-construir` | Qué vas a construir | B | ⚠️ escrita |
| 0.2 | `00-02-instala-el-entorno` | Instala Unity, Blender, Git y Claude Code | A | ⚠️ escrita |
| 0.3 | `00-03-como-trabaja-claude-code` | Cómo trabaja Claude Code: contexto, permisos y sesiones | B | ⚠️ escrita |
| 0.4 | `00-04-las-reglas-de-tu-proyecto` | Las reglas de tu proyecto | A | ⚠️ escrita |
| 0.5 | `00-05-revisar-el-codigo-generado` | Revisar el código que escribe Claude Code | B | ⚠️ escrita |
| 0.6 | `00-06-git-en-un-proyecto-de-unity` | Git en un proyecto de Unity: qué se guarda y qué no | A | ⚠️ escrita |
| 0.7 | `00-07-la-arquitectura-en-una-hoja` | La arquitectura del juego en una hoja | B | ⚠️ escrita |
| 0.8 | `00-08-checkpoint-modulo-0` | Checkpoint del módulo 0 | C | ⚠️ escrita |

## Módulo 1 — Unity y C# para un RTS

`moduleId: modulo-1` · 11 clases · **Hito**: terreno con cámara RTS completa y
clic en el suelo.

| # | id | Título | Tipo | Estado |
|---|---|---|---|---|
| 1.1 | `01-01-el-editor-de-unity` | El editor de Unity: escena, jerarquía e Inspector | A | |
| 1.2 | `01-02-gameobject-y-component` | GameObject y Component: el modelo mental | B | |
| 1.3 | `01-03-tu-primer-script` | Tu primer script: MonoBehaviour y el ciclo de vida | A | |
| 1.4 | `01-04-campos-en-el-inspector` | Campos en el Inspector: serialización y rangos | A | |
| 1.5 | `01-05-el-terreno-del-mapa` | El terreno del mapa | A | |
| 1.6 | `01-06-camara-rts-paneo` | La cámara RTS: paneo con teclado | A | ⚠️ piloto |
| 1.7 | `01-07-zoom-y-rotacion` | Zoom y rotación de la cámara | A | |
| 1.8 | `01-08-scroll-de-borde-y-limites` | Scroll de borde y límites del mapa | A | |
| 1.9 | `01-09-del-raton-al-mundo` | Del ratón al mundo: raycast, capas y clic en el suelo | A | |
| 1.10 | `01-10-datos-con-scriptableobject` | Los datos del juego con ScriptableObject | A | |
| 1.11 | `01-11-checkpoint-modulo-1` | Checkpoint del módulo 1 | C | |

## Módulo 2 — Blender a fondo: el arte del juego

`moduleId: modulo-2` · 19 clases · **Hito**: pack propio con aldeano riggeado y
animado, edificios y vegetación, todo ya funcionando en Unity.

| # | id | Título | Tipo | Estado |
|---|---|---|---|---|
| 2.1 | `02-01-la-interfaz-de-blender` | La interfaz de Blender: moverte y transformar | A | |
| 2.2 | `02-02-modo-edicion` | Modo edición: vértices, aristas y caras | A | |
| 2.3 | `02-03-tu-primer-arbol` | Tu primer árbol low-poly | A | |
| 2.4 | `02-04-modificadores` | Modificadores: Mirror, Array y Bevel | A | |
| 2.5 | `02-05-topologia-limpia` | Topología limpia: por qué importan los cuádriláteros | B | |
| 2.6 | `02-06-la-casa-del-aldeano` | La casa del aldeano | A | |
| 2.7 | `02-07-edificios-modulares` | Edificios modulares: cuartel y centro urbano | A | |
| 2.8 | `02-08-escala-orientacion-y-export` | Escala, orientación y export a Unity | A | |
| 2.9 | `02-09-desplegar-uvs` | Desplegar UVs sin sufrir | A | |
| 2.10 | `02-10-atlas-de-textura` | Un atlas de textura para todo el pack | A | |
| 2.11 | `02-11-pintar-texturas-y-materiales` | Pintar texturas y materiales | A | |
| 2.12 | `02-12-baking-ao-y-normal-map` | Baking: oclusión ambiental y normal map | A | |
| 2.13 | `02-13-modelar-el-aldeano` | El aldeano: modelar un personaje low-poly | A | |
| 2.14 | `02-14-rigging-del-aldeano` | Rigging: armature, huesos y jerarquía | A | |
| 2.15 | `02-15-weight-painting` | Weight painting: que la malla siga al hueso | A | |
| 2.16 | `02-16-animar-al-aldeano` | Animar: quieto, caminar, recolectar y atacar | A | |
| 2.17 | `02-17-del-fbx-al-animator` | Del FBX al Animator de Unity | A | |
| 2.18 | `02-18-lods-y-presupuesto-de-poligonos` | LODs y presupuesto de polígonos | A | |
| 2.19 | `02-19-checkpoint-modulo-2` | Checkpoint del módulo 2 | C | |

## Módulo 3 — Unidades: selección, movimiento y estados

`moduleId: modulo-3` · 11 clases · **Hito**: seleccionas un grupo, lo mandas a
un punto y camina con su animación.

| # | id | Título | Tipo | Estado |
|---|---|---|---|---|
| 3.1 | `03-01-el-aldeano-en-escena` | El aldeano en escena: prefab y datos | A | |
| 3.2 | `03-02-seleccionar-con-un-clic` | Seleccionar con un clic | A | |
| 3.3 | `03-03-seleccion-con-caja` | Selección múltiple con caja de arrastre | A | |
| 3.4 | `03-04-como-encuentra-el-camino` | Cómo encuentra el camino un RTS | B | |
| 3.5 | `03-05-navmesh-hornear-el-mapa` | NavMesh: hornear el mapa | A | |
| 3.6 | `03-06-mover-con-clic-derecho` | Mover con clic derecho | A | |
| 3.7 | `03-07-evitacion-y-formaciones` | Grupos que no se pisan: evitación y formaciones | A | |
| 3.8 | `03-08-maquina-de-estados` | La máquina de estados de la unidad | B | |
| 3.9 | `03-09-conectar-el-animator` | Conectar el Animator: quieto, caminando, trabajando | A | |
| 3.10 | `03-10-cola-de-ordenes-y-grupos` | Cola de órdenes y grupos de control | A | |
| 3.11 | `03-11-checkpoint-modulo-3` | Checkpoint del módulo 3 | C | |

## Módulo 4 — Economía: recursos, recolección y construcción

`moduleId: modulo-4` · 12 clases · **Hito**: aldeanos que recolectan y
depositan; colocas edificios y producen unidades.

| # | id | Título | Tipo | Estado |
|---|---|---|---|---|
| 4.1 | `04-01-los-cuatro-recursos` | Los cuatro recursos: datos y almacén | A | |
| 4.2 | `04-02-nodos-de-recurso` | Nodos de recurso en el mapa: bosque, mina y granja | A | |
| 4.3 | `04-03-el-ciclo-del-recolector` | El ciclo del recolector | A | |
| 4.4 | `04-04-ritmo-y-capacidad-de-carga` | Ritmo de recolección y capacidad de carga | A | |
| 4.5 | `04-05-la-economia-de-un-rts` | La economía de un RTS: por qué estos números | B | |
| 4.6 | `04-06-colocar-edificios` | Colocar edificios: previsualización y rejilla | A | |
| 4.7 | `04-07-validar-el-sitio` | Validar el sitio: terreno, solapes y coste | A | |
| 4.8 | `04-08-construccion-progresiva` | La obra: construcción progresiva | A | |
| 4.9 | `04-09-cola-de-entrenamiento` | Producir unidades: la cola de entrenamiento | A | |
| 4.10 | `04-10-limite-de-poblacion` | Límite de población y casas | A | |
| 4.11 | `04-11-arbol-tecnologico-minimo` | Mejoras: un árbol tecnológico mínimo | A | |
| 4.12 | `04-12-checkpoint-modulo-4` | Checkpoint del módulo 4 | C | |

## Módulo 5 — Combate, niebla de guerra e IA enemiga

`moduleId: modulo-5` · 12 clases · **Hito**: partida completa contra un bot que
recolecta, construye y ataca, con victoria y derrota.

| # | id | Título | Tipo | Estado |
|---|---|---|---|---|
| 5.1 | `05-01-estadisticas-de-combate` | Estadísticas de combate y tipos de daño | A | |
| 5.2 | `05-02-detectar-enemigos` | Detectar enemigos: rango y capas | A | |
| 5.3 | `05-03-atacar-y-morir` | Atacar: cadencia, daño, barra de vida y muerte | A | |
| 5.4 | `05-04-arqueros-y-proyectiles` | Arqueros: proyectiles y trayectoria | A | |
| 5.5 | `05-05-comportamiento-por-defecto` | Comportamiento por defecto: agresivo, defensivo, quieto | A | |
| 5.6 | `05-06-niebla-de-guerra` | Niebla de guerra: la visión de cada unidad | A | |
| 5.7 | `05-07-lo-explorado-y-lo-visible` | Lo explorado y lo visible | A | |
| 5.8 | `05-08-como-decide-un-bot` | Cómo decide un bot de RTS | B | |
| 5.9 | `05-09-el-bot-economia` | El bot: economía y construcción | A | |
| 5.10 | `05-10-el-bot-ataques-y-dificultad` | El bot: ataques y niveles de dificultad | A | |
| 5.11 | `05-11-victoria-y-derrota` | Victoria, derrota y fin de partida | A | |
| 5.12 | `05-12-checkpoint-modulo-5` | Checkpoint del módulo 5 | C | |

## Módulo 6 — Interfaz y pulido

`moduleId: modulo-6` · 8 clases · **Hito**: juego completo en un solo jugador,
con minimapa, menús, guardado y sonido.

| # | id | Título | Tipo | Estado |
|---|---|---|---|---|
| 6.1 | `06-01-el-panel-de-recursos` | El panel de recursos | A | |
| 6.2 | `06-02-panel-de-seleccion` | Panel de selección y botones de acción | A | |
| 6.3 | `06-03-el-minimapa` | El minimapa | A | |
| 6.4 | `06-04-menu-principal-y-escenas` | Menú principal y flujo de escenas | A | |
| 6.5 | `06-05-guardar-y-cargar` | Guardar y cargar la partida | A | |
| 6.6 | `06-06-sonido-y-musica` | Sonido: efectos, música y mezcla | A | |
| 6.7 | `06-07-rendimiento` | Rendimiento: perfilar y arreglar | A | |
| 6.8 | `06-08-checkpoint-modulo-6` | Checkpoint del módulo 6 | C | |

## Módulo 7 — Multijugador online y publicación

`moduleId: modulo-7` · 13 clases · **Hito**: partida 1v1 por internet contra un
amigo, con código de partida, y el juego publicado.

Modelo de red: **servidor autoritativo** con Netcode for GameObjects. No es
lockstep, que es lo que usan los RTS comerciales para mover cientos de unidades;
la clase 7.10 explica la diferencia y dónde está el techo de este modelo.

| # | id | Título | Tipo | Estado |
|---|---|---|---|---|
| 7.1 | `07-01-como-se-juega-en-red` | Cómo se juega en red: host, cliente y autoridad | B | |
| 7.2 | `07-02-netcode-y-play-mode` | Netcode for GameObjects y Multiplayer Play Mode | A | |
| 7.3 | `07-03-tu-primera-conexion` | Tu primera conexión: host y cliente | A | |
| 7.4 | `07-04-que-se-sincroniza` | Qué se sincroniza y qué no | A | |
| 7.5 | `07-05-ordenes-por-rpc` | Las órdenes viajan como RPC, no como clics | A | |
| 7.6 | `07-06-movimiento-con-autoridad` | Mover unidades con autoridad del servidor | A | |
| 7.7 | `07-07-el-servidor-manda` | El servidor es la fuente de verdad: coste, construcción y daño | A | |
| 7.8 | `07-08-niebla-por-jugador` | Niebla de guerra por jugador | A | |
| 7.9 | `07-09-sesiones-y-codigo-de-partida` | Salas por internet: sesiones y código de partida | A | |
| 7.10 | `07-10-latencia-y-limites` | Latencia, simulador de red y los límites de este modelo | A | |
| 7.11 | `07-11-compilar-y-publicar` | Compilar y publicar tu juego | A | |
| 7.12 | `07-12-que-construir-despues` | Qué construir después | B | |
| 7.13 | `07-13-checkpoint-final` | Checkpoint final | C | |

---

## Conectado a la app

El curso ya aparece en el catálogo y sus 94 rutas de clase se generan:

- `manifest.ts` — las 94 clases con su `moduleId` y las ocho marcadas `kind: "quiz"`.
- `preguntas/index.ts` — el mapa de bancos, todavía vacío.
- Alta en `content/courses/registry.ts` (manifest y bancos).
- Entrada en `COURSES` de `src/lib/courses.ts`.

Mientras una clase no tenga su archivo `.md`, la página muestra el aviso de
"todavía no está lista". Lo mismo con los cuestionarios sin banco. El progreso,
los marcadores y los comentarios funcionan desde ya.
