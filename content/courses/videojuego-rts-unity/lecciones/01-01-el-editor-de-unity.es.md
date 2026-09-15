# 1.1 — El editor de Unity: escena, jerarquía e Inspector

> Módulo 1 · Unity y C# para un RTS · Clase 1 de 11 · ⏱️ 8 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a entender las cuatro ventanas del editor y a montar el esqueleto de la
escena del juego.

Al terminar, tu escena `Partida` tendrá suelo, luz y cámara colocados. Y sabrás
mirar cualquier objeto y decir qué es y qué hace.

## 🧠 Antes de empezar

1. En la clase 0.6 pusiste el proyecto bajo Git y dejaste fuera la carpeta
   `Library`. ¿Qué archivos de la escena crees que sí se están guardando?
2. Un juego tiene un mundo en tres dimensiones y tú lo editas en una pantalla
   plana. ¿Cómo esperas moverte por ese mundo?
3. Si un objeto de la escena tiene forma, color y posición, ¿dirías que esas
   tres cosas son lo mismo o cosas separadas?

## 📐 La idea

El editor de Unity tiene muchas ventanas, pero el trabajo diario ocurre en
cuatro. Merece la pena conocerlas por su nombre, porque todas las clases del
curso las nombran así.

| Ventana | Qué es | Para qué la usas |
|---|---|---|
| `Scene` | El mundo en 3D, editable | Colocar y mover cosas |
| `Hierarchy` | La lista de todo lo que hay en la escena | Encontrar y seleccionar |
| `Inspector` | Las tripas del objeto seleccionado | Ver y cambiar sus valores |
| `Project` | Los archivos de tu carpeta `Assets` | Buscar scripts, modelos, materiales |

Hay una quinta que aparece al darle al botón de reproducir: la ventana `Game`.
Esa muestra lo que vería el jugador, desde la cámara, sin ayudas de edición.

La distinción entre `Scene` y `Game` confunde al principio. En `Scene` vuelas
por el mundo como un fantasma. En `Game` estás dentro del juego. Puedes tener
las dos abiertas a la vez y ver cómo se mueve tu cámara mientras juegas.

Y una regla que ahorra lágrimas: **los cambios hechos en modo juego se pierden
al salir**. Unity restaura la escena tal y como estaba. Es una red de seguridad
para probar valores sin miedo, pero muerde al que edita sin darse cuenta.

Queda una cosa más que se usa a todas horas: las herramientas de manipulación.
Están arriba a la izquierda y tienen atajo de teclado.

| Tecla | Herramienta | Qué hace |
|---|---|---|
| `Q` | Mano | Desplazar la vista, sin tocar nada |
| `W` | Mover | Arrastrar el objeto por los tres ejes |
| `E` | Rotar | Girarlo |
| `R` | Escalar | Cambiarle el tamaño |

Al seleccionar un objeto aparece sobre él un dibujo de flechas de colores. Rojo
es el eje `X`, verde el `Y` y azul el `Z`. Ese código de color se repite en todo
Unity, incluso en los campos del Inspector.

Arrastrar con el ratón es cómodo para colocar cosas a ojo. Para valores exactos,
escríbelos en el Inspector. En el curso los escribimos casi siempre. Un número
concreto se puede repetir; "más o menos ahí", no.

La ventana `Project` merece una nota aparte. No muestra la escena: muestra los
archivos de tu carpeta `Assets`. Ahí viven los scripts, los materiales, los
modelos que traerás de Blender y las escenas mismas.

La confusión típica es entre borrar en `Hierarchy` y borrar en `Project`. Lo
primero quita el objeto de la escena. Lo segundo borra el archivo del disco, y
todo lo que lo usara se queda roto.

## 🛠️ Manos a la obra

**1.** Abre el proyecto y, en la ventana `Project`, entra en `Assets/Scenes` y
haz doble clic en `Partida`.

**2.** Aprende a moverte por la ventana `Scene`. Son cuatro gestos y los vas a
usar miles de veces:

| Gesto | Qué hace |
|---|---|
| Rueda del ratón | Acercar y alejar |
| Botón central arrastrando | Desplazar la vista |
| Botón derecho arrastrando | Girar la vista |
| Tecla `F` con algo seleccionado | Centrar la vista en ese objeto |

**3.** Crea el suelo. En el menú, `GameObject` → `3D Object` → `Plane`. En el
Inspector, renómbralo a `Suelo` y pon `Scale` en `(10, 1, 10)`.

Un `Plane` de Unity mide 10 metros de lado. Con escala 10 son 100 metros, que es
un mapa razonable para empezar.

**4.** Coloca la cámara. Selecciona `Main Camera` en la jerarquía y pon
`Position` en `(0, 25, -20)` y `Rotation` en `(50, 0, 0)`.

**5.** Mira la ventana `Game`. Deberías ver el suelo en perspectiva, desde
arriba y en ángulo, como un juego de estrategia.

**6.** Selecciona `Directional Light` y pon `Rotation` en `(50, -30, 0)`. Con
esa inclinación las sombras caen hacia un lado y el relieve se lee mejor.

**7.** Guarda con `Ctrl + S`. Tu jerarquía debe verse así:

```text
Partida
├── Main Camera
├── Directional Light
└── Suelo
```

## 🤖 Pídelo a Claude Code

Hoy no hay código que escribir, pero sí algo que entender:

```text
Abre la escena Assets/Scenes/Partida.unity y dime qué objetos contiene, qué
componentes lleva cada uno y para qué sirve cada componente. Explícalo para
alguien que sabe programar pero no ha usado Unity. No modifiques nada.
```

Revisa dos cosas. Que menciona el componente `Camera` y el componente
`Transform` por separado, porque son cosas distintas. Y que no se inventa
objetos que no están en tu jerarquía.

Lo que no se delega: colocar la cámara. Dónde se pone es una decisión de diseño
del juego, y la vas a ajustar varias veces jugando.

## ▶️ Compruébalo

En la ventana `Game` ves un plano gris que ocupa casi toda la pantalla. Está
iluminado desde arriba y se ve en perspectiva, no de frente. El horizonte queda
en la parte alta del encuadre.

Selecciona `Suelo` y pulsa `F`. La vista de `Scene` se centra en él y el plano
llena el encuadre.

Dale al botón de reproducir. No pasa nada, y eso es correcto: todavía no hay
nada que se mueva. Vuelve a pulsarlo para salir.

Por último, mira el título de la ventana. Si aparece un asterisco junto al
nombre de la escena, es que tienes cambios sin guardar.

## 🧯 Si algo se rompe

**La ventana `Game` se ve negra.**
Causa: la cámara apunta al vacío, o su `Rotation` quedó mal.
Arreglo: revisa que `Position` es `(0, 25, -20)` y `Rotation` es `(50, 0, 0)`.

**El suelo se ve blanco y plano, sin sombras.**
Causa: no hay luz direccional en la escena, o está apagada.
Arreglo: comprueba que `Directional Light` existe y que su casilla de arriba,
junto al nombre, está marcada.

**Perdí cambios que había hecho.**
Causa: los hiciste con el modo juego activo.
Arreglo: no tiene remedio, hay que rehacerlos. Mira siempre si el botón de
reproducir está iluminado antes de editar.

**No encuentro una ventana que se me cerró.**
Causa: moviste el diseño de ventanas sin querer.
Arreglo: `Window` → `Layouts` → `Default` lo devuelve todo a su sitio.

## 🔁 Repaso relámpago

1. ¿Qué diferencia hay entre la ventana `Scene` y la ventana `Game`?
2. ¿Qué pasa con los cambios que haces mientras el juego está en marcha?
3. ¿Cuánto mide de lado un `Plane` con la escala por defecto?
4. ¿Para qué sirve la tecla `F`?

**Respuestas:** 1. En `Scene` editas el mundo volando por él; en `Game` ves lo
que vería el jugador desde la cámara. 2. Se pierden al salir del modo juego,
porque Unity restaura la escena. 3. Diez metros, así que con escala 10 quedan
cien. 4. Centra la vista de `Scene` en el objeto seleccionado.

## 🎒 Tu turno

Añade un cubo a la escena con `GameObject` → `3D Object` → `Cube` y ponlo en
`(0, 0.5, 0)`. Ese medio metro de altura lo deja apoyado en el suelo en lugar de
medio hundido.

Llámalo `Andamio`. Es un objeto de usar y tirar. Te servirá de referencia
mientras el mapa esté vacío, y lo borrarás en la clase 1.5.

Después haz tu primer commit del módulo, con un mensaje del estilo de "escena
Partida con suelo, luz y cámara". A partir de ahora, uno por clase.
