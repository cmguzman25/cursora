# 1.7 — Zoom y rotación de la cámara

> Módulo 1 · Unity y C# para un RTS · Clase 7 de 11 · ⏱️ 10 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a añadir a la cámara las otras dos cosas que hace cualquier juego de
estrategia. Acercar con la rueda del ratón, y girar el punto de vista.

Al terminar podrás acercarte hasta ver una unidad en detalle. También alejarte
para ver medio mapa, y girar la escena para mirar detrás de un edificio.

## 🧠 Antes de empezar

1. En la clase 1.4 sacaste los números a la ventana del Inspector con topes.
   ¿Qué topes le pondrías a la altura de una cámara?
2. Si la cámara solo bajara en vertical al acercarte, ¿qué pasaría con el punto
   que estabas mirando?
3. La cámara gira alrededor de un punto. ¿Cuál crees que debería ser ese punto:
   ella misma o algo en el suelo?

## 📐 La idea

El zoom de un juego de estrategia no es el zoom de una cámara de fotos. No
cambias el objetivo: mueves la cámara más cerca del suelo.

La forma barata es bajarla en vertical. Funciona, pero tiene un defecto molesto.
La cámara está inclinada, así que al bajar también se acerca el punto que mira.
La vista se te escapa hacia delante.

La forma correcta es moverla **a lo largo de su propia línea de visión**. Ese
vector ya lo tiene: `transform.forward` apunta hacia donde mira. Avanzar por él
acerca la cámara sin cambiar lo que hay en el centro de la pantalla.

Los topes importan más de lo que parece. Sin un mínimo, la cámara se mete debajo
del suelo y el jugador ve el mundo por dentro. Sin un máximo, se aleja tanto que
las unidades son puntos. Entre 10 y 40 metros de altura funciona bien para este
mapa.

La rotación tiene su propia trampa. Si giras la cámara sobre sí misma, gira la
imagen y el jugador se marea. Lo que quiere el jugador es **orbitar**: girar
alrededor de un punto del suelo, manteniendo la distancia y la inclinación.

Unity tiene un método que hace justo eso, `RotateAround`. Le das un punto, un
eje y unos grados. Mueve el objeto describiendo un arco, y lo mantiene mirando
hacia el centro.

## 🛠️ Manos a la obra

**1.** En `Assets/Scripts/Input`, crea un script nuevo llamado `CameraZoom`.

`Assets/Scripts/Input/CameraZoom.cs`

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class CameraZoom : MonoBehaviour
{
    [SerializeField, Range(0.5f, 8f)] private float zoomStep = 2f;
    [SerializeField] private float minHeight = 10f;
    [SerializeField] private float maxHeight = 40f;

    private void Update()
    {
        HandleZoom();
    }

    private void HandleZoom()
    {
        Mouse mouse = Mouse.current;
        if (mouse == null) return;

        float wheel = mouse.scroll.ReadValue().y;
        if (Mathf.Approximately(wheel, 0f)) return;

        Vector3 next = transform.position + transform.forward * (Mathf.Sign(wheel) * zoomStep);
        if (next.y < minHeight || next.y > maxHeight) return;

        transform.position = next;
    }
}
```

Aquí hay una excepción a la regla del `Time.deltaTime`, y conviene entenderla.

Una tecla pulsada es un estado continuo: la lees en cada fotograma y por eso
multiplicas por el tiempo transcurrido. La rueda del ratón no. Cada muesca es
un **suceso**, y llega una sola vez. Multiplicarla por `Time.deltaTime` haría
que la misma muesca moviera más o menos según los fotogramas de la máquina. Es
justo lo contrario de lo que buscas.

Por eso el campo se llama `zoomStep` y no `zoomSpeed`: son metros por muesca,
no metros por segundo.

`Mathf.Sign` reduce la rueda a `1` o `-1`, porque cada ratón devuelve valores de
escala distinta. Y `Mathf.Approximately` compara con cero, que es más fiable que
un `==` entre decimales.

Los topes se comprueban sobre la posición **futura**, antes de aplicarla. Así la
cámara nunca llega a salirse y luego vuelve.

**2.** Arrastra `CameraZoom` sobre `Main Camera`, debajo del `CameraPan` que ya
tenía.

**3.** Ahora la rotación. Añade este campo junto a los otros tres, en el mismo
archivo:

`Assets/Scripts/Input/CameraZoom.cs`

```csharp
    [SerializeField, Range(20f, 180f)] private float rotationSpeed = 90f;
```

**4.** Reemplaza el método `Update` por este, y añade los dos métodos nuevos
debajo de `HandleZoom`:

`Assets/Scripts/Input/CameraZoom.cs`

```csharp
    private void Update()
    {
        HandleZoom();
        HandleRotation();
    }

    private void HandleRotation()
    {
        Keyboard keyboard = Keyboard.current;
        if (keyboard == null) return;

        float turn = 0f;
        if (keyboard.qKey.isPressed) turn -= 1f;
        if (keyboard.eKey.isPressed) turn += 1f;
        if (Mathf.Approximately(turn, 0f)) return;

        transform.RotateAround(GetGroundPivot(), Vector3.up,
            turn * rotationSpeed * Time.deltaTime);
    }

    private Vector3 GetGroundPivot()
    {
        float drop = -transform.forward.y;
        float distance = drop > 0.01f ? transform.position.y / drop : 50f;
        return transform.position + transform.forward * distance;
    }
```

El giro sí es continuo: mantienes la tecla y sigue girando. Por eso aquí el
`Time.deltaTime` vuelve a estar donde tiene que estar.

`GetGroundPivot` calcula dónde corta el suelo la línea que mira la cámara. Con
la cámara a 25 metros e inclinada 50 grados, ese punto cae a unos 32 metros por
delante. La división por `drop` es lo que convierte la altura en distancia.

El `if` protege de una cámara mirando al horizonte. Ahí esa línea no cortaría el
suelo nunca, y la división se dispararía.

## 🤖 Pídelo a Claude Code

```text
En Assets/Scripts/Input/CameraZoom.cs, cuando la rueda llevaría la cámara más
allá de un tope, colócala exactamente en ese tope en lugar de ignorar la
entrada. Añade también un Tooltip a cada campo. No toques la rotación ni
metas Time.deltaTime en el zoom.
```

Revisa tres cosas. Que sigue sin multiplicar el zoom por `Time.deltaTime`, que
es el error que más se repite aquí. Que la cámara acaba exactamente en el tope y
no un poco antes. Y que no ha convertido ningún campo en público por el camino.

Lo que no se delega: los 10 y 40 metros de los topes, ni los 2 metros por
muesca. Esos números salen de jugar y de ver cuándo dejas de distinguir tus
unidades.

## ▶️ Compruébalo

Entra en modo juego y mueve la rueda hacia delante. La cámara se acerca al suelo
y **el centro de la pantalla no se desplaza**. Ese es el detalle que separa un
zoom bueno de uno mareante.

Sigue girando la rueda. En algún momento la cámara deja de bajar y se queda
quieta: ha llegado a los 10 metros. Hacia atrás pasa lo mismo a los 40.

Ahora mantén `Q` y luego `E`. La escena gira suavemente alrededor de un punto
del suelo, sin que el horizonte se incline.

Prueba las tres cosas juntas. Desplázate con `W`, acerca con la rueda y gira con
`E`. Los dos componentes de la cámara conviven sin pelearse, aunque los dos
escriban en `transform.position`.

El motivo es que cada uno solo actúa cuando recibe su entrada. Y los dos suman
sobre la posición del fotograma anterior, en vez de asignarla. Eso deja de
funcionar en cuanto alguien escribe una posición absoluta. Lo verás en la clase
1.8, con los límites del mapa.

## 🧯 Si algo se rompe

**La rueda no hace nada.**
Causa: el script no está en la cámara, o el ratón no tiene rueda detectada.
Arreglo: comprueba que `Camera Zoom` aparece en el Inspector de `Main Camera`.

**La cámara atraviesa el suelo.**
Causa: `minHeight` quedó en un valor menor que cero.
Arreglo: ponlo en 10. El tope se comprueba antes de mover, así que con el valor
correcto no puede pasar.

**Al girar, la imagen se inclina.**
Causa: estás rotando el objeto sobre sí mismo en vez de orbitar.
Arreglo: `RotateAround` con eje `Vector3.up`, como arriba. El eje tiene que ser
el vertical del mundo.

**El giro va a tirones o se acelera.**
Causa: falta el `Time.deltaTime` en la llamada a `RotateAround`.
Arreglo: añádelo. Es el mismo motivo de siempre.

**El zoom se mueve una miseria con cada muesca.**
Causa: multiplicaste el paso por `Time.deltaTime`.
Arreglo: quítalo. La rueda no es un estado continuo.

## 🔁 Repaso relámpago

1. ¿Por qué el zoom mueve la cámara por `transform.forward` y no en vertical?
2. ¿Por qué se comprueban los topes antes de aplicar la posición?
3. ¿Qué diferencia hay entre rotar la cámara y orbitarla?
4. ¿Por qué el zoom no multiplica por `Time.deltaTime` y el giro sí?

**Respuestas:** 1. Para que el punto del centro de la pantalla no se desplace al
acercarse. 2. Para que la cámara nunca llegue a salirse del rango y tenga que
volver. 3. Rotarla inclina la imagen; orbitarla gira alrededor de un punto del
suelo. 4. Porque la rueda es un suceso que llega una sola vez. El giro es un
estado continuo que se lee en cada fotograma.

## 🎒 Tu turno

Añade una tecla que devuelva la cámara a su sitio.

Cuando el jugador pulse `Inicio`, la cámara debe volver a su sitio de partida.
Es decir, `Position (0, 25, -20)` y `Rotation (50, 0, 0)`.

Dos pistas. El Input System lo lee con `keyboard.homeKey.wasPressedThisFrame`,
que no es lo mismo que `isPressed`. Se cumple solo en el fotograma en que la
tecla baja. Y los valores de vuelta merecen campos serializados, no números
sueltos en medio del código.

Esa tecla la vas a usar cien veces durante el curso. Sobre todo el día que
pierdas la cámara detrás de una colina.
