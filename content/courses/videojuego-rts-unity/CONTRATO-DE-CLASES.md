# Contrato de clases — Crea tu RTS (Unity + Blender + Claude Code)

Este documento decide de antemano cómo se escribe cada clase del curso. No es
una guía de estilo opcional: es el contrato que hace que noventa y cuatro clases
escritas en semanas distintas se lean como una sola voz, y que buena parte de
su calidad se pueda comprobar con un script en lugar de a ojo.

Antes de escribir una clase, lee las secciones 6 a 14. Antes de darla por
terminada, pasa el verificador y la checklist de la sección 18.

---

## 1. Qué construye el alumno

Un juego de estrategia en tiempo real jugable, al estilo de *Age of Empires*,
hecho desde cero con Unity, con arte propio modelado en Blender y con Claude
Code como copiloto.

Al terminar el curso el juego tiene estos sistemas:

| Sistema | Qué hace |
|---|---|
| Cámara RTS | Paneo, zoom, rotación, scroll de borde y límites de mapa |
| Selección | Clic simple, caja de arrastre, grupos de control |
| Movimiento | Pathfinding sobre NavMesh, evitación y formaciones |
| Economía | Cuatro recursos, aldeanos que recolectan y depositan |
| Construcción | Colocación con rejilla, validación del sitio, obra progresiva |
| Producción | Cola de entrenamiento, coste, límite de población |
| Combate | Cuerpo a cuerpo, proyectiles, estadísticas y muerte |
| Niebla de guerra | Visión por unidad, zonas exploradas y ocultas |
| IA enemiga | Un bot que recolecta, construye, entrena y ataca |
| Fin de partida | Condiciones de victoria y derrota |
| Interfaz | Recursos, panel de selección, minimapa, menús |
| Multijugador | Partida 1v1 por internet, con código de partida |
| Entrega | Guardado, sonido, build publicable |

**La promesa central del curso: al terminar cada clase el proyecto compila y el
juego se puede ejecutar.** Ninguna clase deja el proyecto a medias "hasta la
siguiente". Si un cambio es grande, se parte en dos clases y cada una cierra en
un estado funcional, aunque sea provisional.

## 2. A quién le hablamos

El alumno sabe programar en algún lenguaje (JavaScript, Python, Java, lo que
sea). No ha tocado Unity, no ha tocado Blender y no ha escrito C#.

De ahí salen tres reglas de las que no nos salimos:

1. **C# se explica solo donde sorprende.** No explicamos qué es un bucle ni una
   clase. Sí explicamos `MonoBehaviour`, el ciclo de vida (`Awake`, `Start`,
   `Update`, `FixedUpdate`), la serialización en el Inspector, las corrutinas y
   las propiedades. Si el alumno podría escribirlo en su lenguaje sin ayuda, no
   se explica.
2. **Nada de Unity ni de Blender se da por sabido.** Cada ruta de menú se
   escribe completa la primera vez que aparece en el curso. Cada panel se nombra
   por su nombre real.
3. **Nunca se asume que el alumno "ya lo habrá probado".** Si algo hay que
   hacer, la clase lo dice como paso numerado.

## 3. Mapa del curso

Ocho módulos, noventa y cuatro clases. El listado completo de clases está en el
índice del curso; aquí queda el marco que ninguna clase puede contradecir:

| # | `moduleId` | Módulo | Clases | Hito jugable al cerrar |
|---|---|---|---|---|
| 0 | `modulo-0` | Preparación y cómo trabajar con Claude Code | 8 | Proyecto en Git, Claude Code configurado, arquitectura decidida |
| 1 | `modulo-1` | Unity y C# para un RTS | 11 | Terreno con cámara RTS completa y clic en el suelo |
| 2 | `modulo-2` | Blender a fondo: el arte del juego | 19 | Pack propio: aldeano riggeado y animado, edificios y vegetación, ya en Unity |
| 3 | `modulo-3` | Unidades: selección, movimiento y estados | 11 | Seleccionas un grupo, lo mandas y camina con su animación |
| 4 | `modulo-4` | Economía: recursos, recolección y construcción | 12 | Aldeanos que recolectan y depositan; edificios que producen unidades |
| 5 | `modulo-5` | Combate, niebla de guerra e IA enemiga | 12 | Partida completa contra un bot, con victoria y derrota |
| 6 | `modulo-6` | Interfaz y pulido | 8 | Juego completo con minimapa, menús, guardado y sonido |
| 7 | `modulo-7` | Multijugador online y publicación | 13 | Partida 1v1 por internet contra un amigo, con código de partida |

Cada módulo cierra con su clase de tipo C (checkpoint), incluida en esos
totales.

**El orden es una promesa.** Una clase solo puede usar lo que ya se enseñó en
una clase anterior. Si al escribir la clase 4.7 hace falta algo que no se
explicó, no se explica de pasada: se mueve a una clase propia o se adelanta el
contenido al módulo que corresponde.

## 4. Escrito para que el multijugador sea posible

El módulo 7 pone el juego en red con un modelo de **servidor autoritativo**: una
máquina hace de servidor, decide qué pasa, y las demás obedecen y dibujan.

Ese módulo llega al final, pero se puede volver imposible mucho antes. Estas
cuatro disciplinas se respetan desde el módulo 3 y no cuestan ni una clase
extra, porque son buena arquitectura de todos modos:

1. **La intención va separada de la ejecución.** Un clic derecho no mueve la
   unidad: emite una **orden** que alguien ejecuta después. En el módulo 7 esa
   orden viaja por la red sin cambiar de forma.
2. **Toda unidad y todo edificio tienen dueño.** Un identificador de jugador
   desde que existe el primer aldeano. El módulo 5 ya lo necesita para
   distinguirte del bot; el módulo 7 lo necesita para distinguir a dos humanos.
3. **La niebla de guerra se calcula por jugador, no "para mí".** Indexada por
   dueño desde la clase 5.6. Escrita así, ponerla en red es un cambio pequeño.
4. **La interfaz no decide nada.** El módulo 6 muestra el estado y emite
   órdenes. Ninguna regla del juego vive en el HUD, porque en red el HUD está en
   la máquina en la que menos se puede confiar.

Al escribir cualquier clase de los módulos 3 a 6, la pregunta de control es:
*¿esto seguiría funcionando si el que manda estuviera en otro ordenador?* Si la
respuesta es no, la clase está creando trabajo para el módulo 7.

## 5. El entorno está fijo

Se declara una sola vez, en la clase 0.2, y ninguna clase posterior lo
contradice:

| Herramienta | Versión |
|---|---|
| Unity | 6.3 LTS (rama `6000.3`), instalada desde Unity Hub |
| Plantilla del proyecto | 3D (Built-in Render Pipeline) |
| Blender | 5.2 LTS |
| Control de versiones | Git, con Git LFS para los binarios |
| Editor de código | Visual Studio Code |
| Claude Code | En la terminal, dentro de la carpeta del proyecto |

Tres cosas más entran solo en el módulo 7, y hasta entonces ninguna clase las
menciona ni las pide instalar:

| Herramienta | Para qué |
|---|---|
| Netcode for GameObjects | La capa de red sobre la que va todo el módulo 7 |
| Multiplayer Services SDK (`com.unity.services.multiplayer`) | Sesiones por internet: unifica Lobby y Relay en una sola API |
| Cuenta de Unity Gaming Services | Capa gratuita; hace falta para las sesiones de la clase 7.9 |

**Todo el multijugador se prueba con Multiplayer Play Mode**, que levanta hasta
cuatro jugadores en el mismo editor. Ninguna clase puede pedir un segundo
ordenador ni un segundo amigo para avanzar.

Antes de escribir una clase que dé una ruta de menú, esa ruta se comprueba en
la versión de la tabla. Las rutas de Unity y de Blender cambian entre versiones,
y una ruta equivocada deja al alumno parado sin manera de seguir.

## 6. Los tres tipos de clase

Hay tres. No se inventan más.

| Tipo | Qué es | Cuántas | Archivo |
|---|---|---|---|
| **A — Construcción** | El juego avanza. Es la clase por defecto. | 74 | `.md` |
| **B — Concepto** | No se toca el proyecto: arquitectura, cómo funciona un pathfinder, teoría de balance, orientación. | 12 | `.md` |
| **C — Checkpoint** | Cuestionario de 12 a 15 preguntas que cierra un módulo. | 8 | banco de preguntas |

Ante la duda, la clase es de tipo A. El tipo B se reserva para cuando explicar
el porqué antes de teclear evita que el alumno copie sin entender: cómo piensa
un pathfinder, cómo decide un bot, por qué la economía usa esos números.

## 7. Secciones del tipo A

Van en este orden exacto, todas, sin secciones extra. El presupuesto de palabras
es orientativo y está calculado para una clase de 10 minutos; para una de 8,
quita un 20 % a cada sección. El límite duro es el de la sección 9.

| Sección | Palabras | Qué lleva |
|---|---|---|
| `## 🎯 Qué vas a lograr hoy` | ~70 | El objetivo en una frase y cómo queda el juego al terminar |
| `## 🧠 Antes de empezar` | ~80 | Tres preguntas sin respuesta; una repasa una clase anterior |
| `## 📐 La idea` | ~260 | El concepto mínimo para entender lo que vas a teclear |
| `## 🛠️ Manos a la obra` | ~380 | Pasos numerados y código pegable |
| `## 🤖 Pídelo a Claude Code` | ~120 | El prompt exacto y qué revisar de su respuesta |
| `## ▶️ Compruébalo` | ~100 | Qué se ve en pantalla si salió bien |
| `## 🧯 Si algo se rompe` | ~130 | Tres o cuatro fallos típicos: síntoma, causa, arreglo |
| `## 🔁 Repaso relámpago` | ~100 | Cuatro preguntas con sus respuestas |
| `## 🎒 Tu turno` | ~80 | Un reto de extensión de cinco a diez minutos |

Cuatro de ellas cargan casi todo el aprendizaje, y por eso no se saltan nunca:

- **🧠 Antes de empezar** activa lo que el alumno ya sabe y le hace recuperar de
  memoria algo anterior. Son preguntas de verdad, abiertas, sin respuesta en la
  sección. Se responden solas al leer la clase.
- **▶️ Compruébalo** cierra el bucle. El alumno nunca queda sin saber si
  acertó. Describe lo observable: qué aparece, dónde, con qué aspecto, qué
  número sale en el Inspector.
- **🧯 Si algo se rompe** anticipa el error antes de que frustre. Cada entrada
  tiene los tres campos, en este formato:

  ```text
  **El aldeano atraviesa la casa.**
  Causa: el edificio no tiene collider, o está marcado como Is Trigger.
  Arreglo: selecciona el prefab y añade Box Collider con Is Trigger desmarcado.
  ```

  Los errores son reales: los que salieron al construir el juego, no los que
  suenan plausibles.
- **🔁 Repaso relámpago** hace practicar la recuperación. Cuatro preguntas
  numeradas, respuestas al final en un bloque **Respuestas:**. Preguntan por
  decisiones y causas, no por nombres de menú.

## 8. Secciones del tipo B

En este orden, sin extras:

```text
## 🎯 De qué va esta clase
## 🧠 Antes de empezar
## 📖 Contenido
## 🗺️ Cómo encaja en el juego
## 🔁 Repaso relámpago
## 🎒 Qué hacer hoy
```

`📖 Contenido` puede dividirse en subsecciones `###`. `🗺️ Cómo encaja en el
juego` conecta la teoría con el proyecto concreto del alumno y nombra las clases
donde eso se va a construir. `🎒 Qué hacer hoy` no pide teclear: pide mirar el
proyecto, dibujar un esquema o decidir algo.

## 9. Longitud y tiempo de lectura

El código se lee mucho más despacio que la prosa, así que la longitud no se mide
en palabras sino en **unidades de lectura**:

```text
peso = palabras_de_prosa + (líneas_de_código × 10)
```

La cabecera declara 8, 9 o 10 minutos. El peso tiene que caer dentro de:

```text
mínimo = minutos_declarados × 150
máximo = minutos_declarados × 190
```

En la práctica, una clase de tipo A de 10 minutos son unas 1.300 palabras de
prosa más unas 35 líneas de código. Una de 8 minutos, unas 1.100 palabras más
unas 20 líneas.

**Referencia medida.** La clase 1.6, escrita con las nueve secciones completas y
un script de 19 líneas, da 1.045 palabras de prosa, 22 líneas de código y un
peso de 1.265: ocho minutos. Sirve de patrón. Si una clase se va muy por encima
de esos números, casi siempre es que enseña dos ideas en lugar de una.

Límites adicionales del código:

- Máximo **60 líneas de programa** en toda la clase (`csharp`, `python`, `json`,
  `bash`). Los bloques ` ```text ` son diagramas y prompts: pesan para el tiempo
  de lectura, pero no cuentan para este tope.
- Máximo **25 líneas por bloque**, sea del tipo que sea. Un archivo más largo se
  enseña por partes, y cada parte dice qué método está reemplazando.

Si una clase no cabe, se parte en dos. Nunca se recorta la sección
`🧯 Si algo se rompe` ni el `🔁 Repaso relámpago` para ganar espacio: se recorta
`📐 La idea` o se mueve trabajo a `🎒 Tu turno`.

## 10. Formato del archivo

- **Nombre**: `MM-CC-slug-corto.es.md`, con el módulo y la clase a dos dígitos.
  Ejemplo: `04-03-ciclo-del-recolector.es.md`.
- **Primera línea**: `# M.C — Título de la clase`. Ejemplo: `# 4.3 — El ciclo del recolector`.
- **Segunda línea**, la cabecera, con este formato exacto:

  ```text
  > Módulo 4 · Economía: recursos, recolección y construcción · Clase 3 de 12 · ⏱️ 10 min de lectura
  ```

- **Sin frontmatter.** El archivo empieza por `#`. Un bloque `---` al principio
  saldría impreso en pantalla.
- **Sin HTML** de ningún tipo y **sin imágenes**. Los diagramas van en tablas,
  listas anidadas o bloques ` ```text ` con arte ASCII.
- **Emojis solo en los títulos** `##`. En el cuerpo solo se permiten ❌ y ✅.
- **Máximo una exclamación por sección.**
- Las clases no nombran nunca archivos internos de este repositorio. El alumno
  no ve este repositorio; ve una página web.

## 11. Cómo se escribe el código

- **Todo bloque declara su lenguaje**: ` ```csharp `, ` ```text `, ` ```json `,
  ` ```bash `. Sin excepción.
- **Cada bloque va precedido de su ruta**, en la línea anterior y en `código`:

  ```text
  `Assets/Scripts/Units/UnitSelection.cs`
  ```

- **El código es completo y pegable.** Lleva sus `using`, el nombre de la clase
  y todas las llaves cerradas. Está prohibido el `// ...` de relleno en medio de
  un archivo. Si se muestra solo un método, la prosa dice literalmente qué
  método sustituye y en qué archivo.
- **El código compila.** Se prueba en el proyecto antes de pegarlo en la clase.
  Un bloque que no compila cuesta al alumno más tiempo que toda la clase.
- **Los comentarios del código explican el porqué**, no el qué. `// el radio va
  en metros, no en celdas` sí; `// crea una lista` no.
- **Cada número que el alumno teclea lleva su unidad y su razón**: `moveSpeed =
  3.5f` metros por segundo, "más rápido que eso y el aldeano patina sobre el
  terreno". Un número sin justificar es un número que el alumno no sabrá ajustar.
- **Las rutas de interfaz se escriben completas y con flechas**:
  `Window → Package Manager → Unity Registry`. Los nombres de paneles, campos y
  botones van tal cual aparecen en pantalla, en inglés y en `código` cuando sean
  un valor que hay que escribir.

## 12. Reglas de las clases de Blender

Las clases de arte tienen el mismo problema que el código: "queda bonito" no es
verificable. Por eso cada clase de modelado cierra con criterios medibles.

- **Los atajos van en `código`** y con el mismo formato siempre: `Tab`,
  `Shift + A`, `Ctrl + R`, `G` `Z` `2`.
- La sección `▶️ Compruébalo` de una clase de Blender incluye siempre:
  - **Objetivo de polígonos** ("por debajo de 400 triángulos").
  - **Escala real en metros** ("la casa mide 4 m de ancho; compárala con el cubo
    por defecto, que mide 2 m").
  - **Pivote** ("en la base, en el centro de la planta, no en el centro del
    volumen").
  - **Orientación** ("la puerta mira hacia `-Y`, que es lo que Unity toma como
    frente tras el export").
  - **Una descripción visual comprobable**: "desde arriba, el tejado tapa las
    paredes por completo; si ves pared, el alero es corto".
- **El pipeline de export se fija en la clase 2.8 y no cambia.** Las clases
  posteriores lo repiten con los mismos ajustes, nunca con variantes.
- Las clases de arte también traen su `🤖 Pídelo a Claude Code`, pero ahí Claude
  Code no modela: ayuda con scripts de Python para Blender, con el renombrado
  por lotes, con comprobar la escala de un `.fbx` o con automatizar el export.

## 13. Reglas de Claude Code

Claude Code aparece en todas las clases de tipo A. La sección
`🤖 Pídelo a Claude Code` tiene tres partes, siempre:

1. **El prompt literal**, en un bloque ` ```text `, listo para copiar. Escrito
   como lo escribiría el alumno, con el contexto que necesita (qué archivo, qué
   patrón seguir, qué no tocar).
2. **Qué revisar de la respuesta.** Concreto: ¿usó una API que existe en Unity
   6.3? ¿compila sin avisos? ¿respeta el patrón que ya usa el proyecto? ¿metió
   un `FindObjectOfType` en un `Update`?
3. **Qué no se delega.** Las decisiones de diseño del juego, los valores de
   balance y la arquitectura las toma el alumno. Claude Code escribe el código
   que implementa esas decisiones.

La regla de fondo del curso, y se repite con estas palabras cuando haga falta:
**el alumno tiene que poder leer y corregir todo lo que Claude Code escribe.**
Ninguna clase le pide pegar código que no ha entendido. Si una clase necesita
algo que aún no se explicó, el problema es del orden del curso, no del alumno.

Las clases nunca prometen que Claude Code acierte a la primera. Cuando se
equivoque de una forma previsible, eso va en `🧯 Si algo se rompe` como un fallo
más.

**En las clases del módulo 7 hay una comprobación obligatoria más**: que la
validación ocurra en el servidor. Si el código propuesto acepta lo que dice el
cliente (que si tiene madera, que si el golpe acertó, que si el edificio cabe),
está enseñando un patrón que en un juego real es un agujero. Esa revisión se
escribe en el punto 2 de la sección, con esas palabras.

## 14. Cómo se redacta

El objetivo es que se entienda a la primera, leyendo a velocidad normal.

- **Tú, presente, voz activa.** "Abres el Inspector y marcas la casilla", no "se
  procederá a marcar la casilla".
- **Frases cortas.** Máximo 20 palabras por frase; el promedio del archivo, por
  debajo de 18. Si una frase lleva dos comas y un "que", se parte en dos.
- **Párrafos de dos a cuatro líneas.** Un párrafo largo se salta.
- **Un término técnico nuevo se marca en negrita la primera vez y se define en
  una línea, antes de usarlo.** Máximo cuatro términos nuevos por clase. Ejemplo:
  "Un **prefab** es una plantilla de objeto que puedes duplicar en la escena sin
  copiar y pegar."
- **Se conservan en inglés los nombres propios de la herramienta** (`Inspector`,
  `Prefab`, `NavMesh`, `Collider`, `Rigidbody`) porque así aparecen en pantalla,
  y se definen la primera vez. El resto va en español: "recolector" y no
  "gatherer", "niebla de guerra" y no "fog of war".
- **Nada de suspense.** El título dice qué se va a hacer y la primera sección lo
  repite. El alumno no tiene que leer para averiguar de qué va la clase.
- **Palabras prohibidas**, porque hacen sentir torpe a quien no lo consigue a la
  primera: *es fácil*, *simplemente*, *obviamente*, *basta con*,
  *sencillamente*, *como ya sabes*, *solo tienes que*, *no tiene ningún
  misterio*.
- **Ni ánimos de más ni dramatismo.** Una exclamación por sección como mucho. Se
  celebra con hechos: "ya tienes un aldeano que recolecta madera y la deposita
  solo", no "¡increíble trabajo!".

## 15. Repaso espaciado

Lo que se aprende en una clase se olvida si no vuelve a aparecer.

- Una de las tres preguntas de `🧠 Antes de empezar` recupera algo de una clase
  de **entre 3 y 8 clases atrás**, no de la inmediatamente anterior.
- Única excepción: las clases 0.1, 0.2 y 0.3, donde todavía no hay una clase
  tres puestos atrás. Ahí las tres preguntas activan lo que el alumno ya trae,
  que es saber programar.
- Cada clase de tipo A retoma en su código o en sus pasos al menos **un concepto
  de un módulo anterior**, sin volver a explicarlo desde cero. Si hace falta
  recordarlo, va en media frase entre paréntesis.
- El checkpoint de cada módulo incluye **dos o tres preguntas de módulos
  anteriores**.

## 16. Los checkpoints (tipo C)

- Entre **12 y 15 preguntas** por módulo.
- Cada opción lleva **su propia explicación**: por qué es correcta, o por qué
  parece correcta y no lo es. Una explicación por opción, no una por pregunta.
- Cada pregunta lleva **uno o dos consejos** breves que se muestran al revelar
  la respuesta.
- Las preguntas evalúan **decisiones y diagnóstico**, no memoria de menús:
  - ✅ "Tu aldeano atraviesa el edificio que acabas de colocar. ¿Qué revisas primero?"
  - ❌ "¿En qué menú está el botón de Bake del NavMesh?"
- Dos o tres preguntas de multiple respuesta ("elige 2") por checkpoint, no más.
- Las traducciones de un banco tienen que ir en paralelo: mismas preguntas, mismo
  orden, mismos identificadores de opción y mismas respuestas correctas. El
  cuestionario deja cambiar de idioma a mitad, y un banco desordenado puntuaría
  la pregunta equivocada.

## 17. El verificador

```bash
node content/courses/videojuego-rts-unity/verificar-lecciones.mjs
```

Comprueba lo que se puede medir sin criterio: nombre del archivo, título,
cabecera, peso de lectura contra los minutos declarados, secciones exactas y en
orden, bloques de código con lenguaje y dentro de los límites, palabras
prohibidas, exclamaciones, frases largas, emojis fuera de sitio, HTML,
imágenes y referencias a archivos internos.

Sale con código 1 si algo falla. Se pasa antes de dar por terminada cualquier
clase.

## 18. Checklist manual

Lo que ningún script puede medir. Se repasa clase por clase:

- [ ] La clase enseña **una sola idea**. Si al resumirla salen dos, son dos clases.
- [ ] Los pasos se pueden seguir **sin adivinar nada**. Ningún "configura el
      componente" sin decir qué campo y qué valor.
- [ ] El código **se pegó en el proyecto y compiló**.
- [ ] Lo que dice `▶️ Compruébalo` **es lo que pasa de verdad** al ejecutar.
- [ ] Los fallos de `🧯 Si algo se rompe` **ocurrieron de verdad** al construirlo.
- [ ] El prompt de `🤖 Pídelo a Claude Code` **se probó** y su respuesta se pudo
      usar.
- [ ] Al terminar la clase **el juego arranca y se puede jugar**.
- [ ] La pregunta de repaso apunta a una clase que **ya existe** y está entre 3 y
      8 clases atrás.
- [ ] No se usa nada que no se haya enseñado antes.
- [ ] Leída en voz alta, **no suena a manual**.
