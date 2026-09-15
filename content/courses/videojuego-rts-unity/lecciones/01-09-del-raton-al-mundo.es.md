# 1.9 — Del ratón al mundo: raycast, capas y clic en el suelo

> Módulo 1 · Unity y C# para un RTS · Clase 9 de 11 · ⏱️ 9 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a traducir un clic del ratón en un punto exacto del terreno.

Al terminar, hacer clic derecho en el suelo dejará una marca visible en ese
punto. Con ese gesto se dan todas las órdenes de un juego de estrategia. Hoy
montas su mitad técnica.

## 🧠 Antes de empezar

1. En la clase 1.6 escribiste el paneo de la cámara leyendo teclas. ¿Qué
   diferencia hay entre leer una tecla y saber dónde apunta el ratón?
2. El ratón está en una pantalla plana y el mundo tiene tres dimensiones. Un
   punto de la pantalla, ¿a cuántos puntos del mundo puede corresponder?
3. Si el rayo del clic tocara la primera cosa que encuentra, ¿qué pasaría al
   hacer clic sobre un árbol que tapa el suelo?

## 📐 La idea

Un píxel de la pantalla no es un punto del mundo. Es una **línea** que sale del
ojo de la cámara y se aleja hasta el infinito. Atraviesa todo lo que se cruce en
su camino.

Esa línea se llama **rayo**, y Unity te la da hecha:
`Camera.main.ScreenPointToRay(posición)` devuelve el rayo que pasa por ese píxel.

Lanzar el rayo y preguntar qué toca se llama **raycast**. El método
`Physics.Raycast` devuelve si acertó algo. Si acertó, rellena además una
estructura con los datos del impacto. Qué objeto era, en qué punto exacto, y con
qué inclinación estaba la superficie.

Aquí es donde se paga la capa `Ground` que creaste en la clase 1.5. El raycast
acepta una **máscara de capas**, que es una lista de las capas que le interesan.
Con la máscara puesta en `Ground`, el rayo ignora árboles, unidades y todo lo
demás. Devuelve el punto del suelo aunque haya diez cosas por delante.

Sin máscara tendrías que comprobar a mano qué has tocado, descartar lo que no
sirve y relanzar. Con máscara, el motor lo hace por ti y además va más rápido,
porque descarta objetos antes de calcular.

El raycast necesita que el objeto tenga un **collider**. Es la pieza que define
su forma para los cálculos de física. Tu suelo ya lo tiene: el `Plane` viene con
un `Mesh Collider` de fábrica.

Sin collider, un objeto es invisible para cualquier rayo. Se dibuja en pantalla
y no existe para la física. Es la causa de la mitad de los clics que no hacen
nada, en este módulo y en los siguientes.

Un último apunte. `Camera.main` busca la cámara marcada con la etiqueta
`MainCamera` y no es gratis. Se pregunta una vez y se guarda, que es justo lo
que decía la clase 1.2.

Y se pregunta en `Start`, no en `Awake`. Buscar la cámara es hablar con otro
objeto de la escena. Esa es justo la regla que fijó la clase 1.3.

## 🛠️ Manos a la obra

**1.** Crea un objeto que marque el punto. `GameObject` → `3D Object` →
`Cylinder`, llámalo `MarcaDestino` y ponle `Scale (0.6, 0.05, 0.6)`.

Es un disco plano. Desactívalo desmarcando la casilla junto a su nombre en el
Inspector.

**2.** En `Assets/Scripts/Input`, crea `GroundClick`.

`Assets/Scripts/Input/GroundClick.cs`

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class GroundClick : MonoBehaviour
{
    [SerializeField] private LayerMask groundMask;
    [SerializeField] private Transform marker;
    [SerializeField] private float maxDistance = 500f;

    private Camera cam;

    private void Start()
    {
        cam = Camera.main;
    }

    private void Update()
    {
        Mouse mouse = Mouse.current;
        if (mouse == null || !mouse.rightButton.wasPressedThisFrame) return;

        Ray ray = cam.ScreenPointToRay(mouse.position.ReadValue());
        if (!Physics.Raycast(ray, out RaycastHit hit, maxDistance, groundMask)) return;

        marker.position = hit.point;
        marker.gameObject.SetActive(true);
    }
}
```

`wasPressedThisFrame` se cumple solo en el fotograma en que el botón baja. Con
`isPressed` la marca se recolocaría sesenta veces por segundo mientras tuvieras
el botón apretado.

`hit.point` es el punto exacto del mundo donde el rayo tocó el collider. Ese
`Vector3` es el que en el módulo 3 pasará a ser el destino de una orden.

**3.** Crea un objeto vacío en la jerarquía con `GameObject` → `Create Empty`,
llámalo `Entrada` y arrástrale el script `GroundClick`.

**4.** En su Inspector, despliega `Ground Mask` y marca solo `Ground`. Después
arrastra `MarcaDestino` al campo `Marker`.

Ese objeto vacío es de los de la clase 1.2. No se ve y no se mueve. Sirve de
sitio donde vivir para los scripts que leen la entrada del jugador.

## 🤖 Pídelo a Claude Code

```text
En Assets/Scripts/Input/GroundClick.cs, haz que la marca se oriente según la
inclinación del suelo usando la normal del impacto, y que se desactive sola
pasados 2 segundos. Usa una corrutina. No cambies el filtrado por capas ni el
botón del ratón.
```

Revisa tres cosas. Que usa `hit.normal` para orientar la marca. Que la corrutina
se cancela si llega un clic nuevo antes de los 2 segundos. Y que el raycast
sigue recibiendo la máscara como cuarto argumento.

Lo que no se delega: los 2 segundos. Es un valor de sensación, y se decide
mirando la pantalla.

## ▶️ Compruébalo

Entra en modo juego y haz clic derecho en cualquier punto del terreno. El disco
aparece exactamente bajo el cursor.

Mueve la cámara con `W` y `A` y vuelve a hacer clic. La marca sigue cayendo
donde apuntas, porque el rayo sale de la cámara esté donde esté.

Acerca el zoom al máximo y haz clic en una esquina de la pantalla. Sigue
funcionando: el raycast no depende del centro de la vista.

La prueba de la máscara es esta. Crea un cubo grande, ponlo entre la cámara y el
suelo, y déjalo en la capa por defecto. Haz clic a través de él: la marca
aparece en el suelo, detrás del cubo, porque el rayo lo ignora. Borra el cubo
cuando lo hayas visto.

## 🧯 Si algo se rompe

**Error de referencia nula al hacer clic.**
Causa: el campo `Marker` está vacío en el Inspector.
Arreglo: arrastra `MarcaDestino` a ese campo.

**La marca nunca aparece.**
Causa: la máscara no incluye `Ground`, o el suelo no está en esa capa.
Arreglo: revisa las dos cosas. Son el fallo más común de esta clase.

**La marca aparece en un sitio raro, lejos del cursor.**
Causa: hay más de una cámara en la escena y `Camera.main` cogió otra.
Arreglo: comprueba que solo `Main Camera` tiene la etiqueta `MainCamera`.

**La marca parpadea o se queda pegada al cursor.**
Causa: usaste `isPressed` en lugar de `wasPressedThisFrame`.
Arreglo: cámbialo. Uno es "está pulsado", el otro es "se acaba de pulsar".

## 🔁 Repaso relámpago

1. ¿Por qué un píxel de pantalla se convierte en un rayo y no en un punto?
2. ¿Qué aporta la máscara de capas al raycast?
3. ¿Qué pieza necesita un objeto para que un rayo lo detecte?
4. ¿Qué diferencia hay entre `isPressed` y `wasPressedThisFrame`?

**Respuestas:** 1. Porque la pantalla es plana y el mundo tiene profundidad; ese
píxel corresponde a infinitos puntos en línea. 2. Que el rayo solo mire las capas
que te interesan, ignorando lo demás y yendo más rápido. 3. Un collider, que
define su forma para los cálculos de física. 4. El primero se cumple mientras el
botón está abajo; el segundo, solo en el fotograma en que baja.

## 🎒 Tu turno

Pon a prueba lo que acabas de aprender con un caso que verás en el módulo 3.

Añade un segundo raycast al hacer clic **izquierdo**, esta vez sin máscara de
capas. Saca por consola el nombre del objeto que toca con `hit.collider.name`.

Haz clic en el suelo y verás `Suelo`. Crea un cubo, ponlo encima, haz clic sobre
él y verás el nombre del cubo. Ese es exactamente el mecanismo con el que
seleccionarás unidades dentro de dos módulos.

Cuando lo hayas visto, quita el `Debug.Log` antes del commit. Los registros de
prueba no se quedan en el código, como decía la clase 1.4.
