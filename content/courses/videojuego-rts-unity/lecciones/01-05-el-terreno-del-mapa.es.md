# 1.5 — El terreno del mapa

> Módulo 1 · Unity y C# para un RTS · Clase 5 de 11 · ⏱️ 8 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a convertir el plano gris de prueba en el mapa de verdad de tu juego.

Al terminar tendrás cien metros de terreno con su material propio. Llevará una
capa que lo identifica, y sabrás para qué sirve eso. El cubo de andamio
desaparecerá para siempre.

## 🧠 Antes de empezar

1. En la clase 1.2 viste que un objeto es una caja con piezas. ¿Qué pieza crees
   que decide de qué color se ve el suelo?
2. Dentro de dos clases harás clic en el suelo para dar órdenes. ¿Cómo sabrá el
   juego que has hecho clic en el suelo y no en un árbol?
3. Un mapa de cien metros de lado, ¿te parece grande o pequeño para veinte
   unidades que se mueven a tres metros por segundo?

## 📐 La idea

Unity trae una herramienta llamada `Terrain`, pensada para paisajes con
montañas, ríos y vegetación pintada a mano. Es potente y es pesada.

Este curso no la usa. Un juego de estrategia necesita un suelo casi plano. Las
unidades tienen que poder recorrerlo entero, y el jugador tiene que verlo de un
vistazo. Un plano escalado hace ese trabajo, pesa mucho menos y se entiende en
una clase.

Que conste que no es una limitación permanente. En el módulo 2 traerás colinas y
relieve modelados en Blender. Se colocan encima de este plano sin tocar nada de
lo de hoy.

El **material** es la pieza que decide cómo se ve una superficie: su color, su
brillo, su textura. Vive en la carpeta `Assets`, no en la escena, y un mismo
material puede pintar veinte objetos a la vez.

La **capa** es otra cosa, y es la que importa de verdad hoy. Una capa es una
etiqueta que Unity usa para separar objetos en grupos. Sirve para decir "en este
cálculo solo mires estos objetos".

Ahí está la clave para la clase 1.9. Cuando el jugador haga clic, lanzarás un
rayo desde la cámara y preguntarás qué ha tocado. Si el rayo mira todo, tocará
árboles, unidades y el propio cursor. Si el rayo solo mira la capa `Ground`,
devuelve el punto del suelo y nada más.

Por eso la capa se crea hoy, cuatro clases antes de necesitarla. Es más barato
etiquetar un objeto que filtrar cincuenta después.

## 🛠️ Manos a la obra

**1.** Borra el cubo `Andamio` de la jerarquía. Ya cumplió su función.

**2.** Crea el material. En `Assets`, crea una carpeta `Materials`. Clic derecho
dentro → `Create` → `Material`. Llámalo `SueloVerde`.

**3.** Selecciónalo y, en el Inspector, busca `Albedo`. Es el primer campo del
shader `Standard`, que es el que trae la plantilla Built-in del curso. Haz clic
en el rectángulo blanco de su derecha y elige un verde apagado. Por ejemplo,
`6E8B4C` en el campo hexadecimal.

Un verde apagado, y no uno brillante, por un motivo práctico. El suelo va a
estar detrás de todo lo demás durante horas. Cuanto menos llame la atención,
mejor se verán encima las unidades.

**4.** Arrastra `SueloVerde` desde `Assets/Materials` sobre el objeto `Suelo` de
la jerarquía. El plano cambia de color al instante.

**5.** Ahora la capa. Con `Suelo` seleccionado, arriba del Inspector despliega
`Layer` → `Add Layer...`. Escribe `Ground` en la primera casilla vacía.

**6.** Vuelve a seleccionar `Suelo` y, en `Layer`, elige `Ground`. Si Unity
pregunta por los hijos, responde que sí.

**7.** Comprueba las medidas. Con `Suelo` seleccionado, el Inspector debe
mostrar `Scale` en `(10, 1, 10)` y `Position` en `(0, 0, 0)`.

Haz la cuenta. Cien metros, con unidades que andan a tres metros por segundo,
son unos treinta segundos de punta a punta. Es un mapa de escaramuza pequeña, y
da de sobra hasta el módulo 5.

Si lo haces mucho más grande, las partidas se alargan sin volverse más
interesantes. Los mapas pequeños obligan a decidir antes, y eso es justo lo que
hace divertido un juego de estrategia.

**8.** Guarda con `Ctrl + S`.

## 🤖 Pídelo a Claude Code

```text
En mi escena Assets/Scenes/Partida.unity tengo un objeto Suelo que es un Plane
con Scale (10, 1, 10). Dime cuántos metros mide de lado y confirma si su
collider cubre toda esa superficie. Explícame qué componente da el collider y
qué pasaría si no lo tuviera. No modifiques la escena.
```

Revisa dos cosas. Que responde cien metros, porque un `Plane` mide diez y la
escala multiplica. Y que nombra el `Mesh Collider` como la pieza que hace al
suelo detectable por un rayo.

Lo que no se delega: el tamaño del mapa. Cien metros es una decisión de diseño
del juego, y la vas a reconsiderar cuando haya unidades de verdad.

## ▶️ Compruébalo

En la ventana `Game` ves un terreno verde apagado que ocupa casi todo el
encuadre, sin ningún cubo encima.

Cuatro comprobaciones que conviene hacer ahora y no en la clase 1.9:

- Con `Suelo` seleccionado, `Layer` dice `Ground`.
- En su Inspector aparece un componente `Mesh Collider`.
- El objeto `Andamio` ya no está en la jerarquía.
- En `Assets/Materials` está `SueloVerde`, y el suelo lo usa.

Para ver el tamaño real, activa la cuadrícula de la ventana `Scene` desde el
menú `Gizmos`. Cada cuadro es un metro, y el plano ocupa cien.

Una última prueba, esta de las que dan confianza. Selecciona el suelo y pulsa
`R` para escalarlo a mano. Verás que las cifras del Inspector cambian mientras
arrastras, y que el material no se estira ni se deforma.

Deshaz con `Ctrl + Z` hasta dejarlo otra vez en `(10, 1, 10)`. Los materiales se
adaptan al tamaño del objeto. Eso te ahorrará trabajo en el módulo 2, cuando
coloques edificios de tamaños distintos.

## 🧯 Si algo se rompe

**El suelo sigue gris después de arrastrar el material.**
Causa: soltaste el material en la jerarquía sin apuntar al objeto.
Arreglo: arrástralo directamente sobre el plano en la ventana `Scene`, o sobre
el campo del material en el Inspector.

**No encuentro el campo `Albedo`.**
Causa: el proyecto no usa el shader `Standard` del Built-in Render Pipeline.
Arreglo: en otras plantillas el mismo campo se llama `Base Map`. Es el primero
que aparece, con un rectángulo de color al lado.

**La capa `Ground` no aparece en la lista.**
Causa: la escribiste pero no pulsaste `Enter`, o editaste una fila reservada.
Arreglo: las ocho primeras filas son de Unity. Usa la primera que esté vacía.

**El suelo se ve negro.**
Causa: la luz direccional está apagada o apunta hacia arriba.
Arreglo: revisa que su `Rotation` es `(50, -30, 0)` y su casilla está marcada.

## 🔁 Repaso relámpago

1. ¿Por qué el curso usa un plano escalado en vez de la herramienta `Terrain`?
2. ¿Para qué va a servir la capa `Ground` dentro de cuatro clases?
3. ¿Cuánto mide el mapa y de dónde sale ese número?
4. ¿En qué se diferencia un material de una capa?

**Respuestas:** 1. Porque un RTS necesita suelo plano y transitable, y el plano
pesa mucho menos. 2. Para que el rayo del clic solo mire el suelo y no los
árboles ni las unidades. 3. Cien metros: un `Plane` mide diez y la escala
multiplica por diez. 4. El material dice cómo se ve; la capa, en qué grupo está
para los cálculos.

## 🎒 Tu turno

Pon a prueba lo que acabas de montar, sin escribir código.

Crea un cubo, ponlo en `(5, 0.5, 5)` y déjalo en la capa por defecto. Ahora
selecciona el suelo y mira su `Mesh Collider` en el Inspector: desmarca la
casilla `Convex` si estuviera marcada.

Después entra en el desplegable `Layer` del cubo. Verás que `Ground` ya aparece
en la lista, aunque este cubo no tenga nada que ver con el suelo. Las capas son
del proyecto entero, no de un objeto.

Borra el cubo, guarda y haz el commit de la clase. En la siguiente empiezas a
mover la cámara por este mapa.
