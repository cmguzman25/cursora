# 1.8 — Scroll de borde y límites del mapa

> Módulo 1 · Unity y C# para un RTS · Clase 8 de 11 · ⏱️ 8 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a terminar la cámara con las dos cosas que le faltan para sentirse
profesional.

Al terminar, acercar el ratón al borde de la pantalla desplazará la vista. Y la
cámara dejará de poder salirse del mapa, por mucho que insistas.

## 🧠 Antes de empezar

1. En la clase 1.5 decidiste que el mapa mide cien metros de lado. ¿Hasta dónde
   debería poder llegar la cámara?
2. Con una mano en el ratón dando órdenes, ¿te resulta cómodo soltar para
   pulsar `W`?
3. Si el ratón sale de la ventana del juego, ¿qué debería hacer el scroll de
   borde?

## 📐 La idea

El **scroll de borde** es un clásico del género. Acercas el ratón a un lado de
la pantalla y la vista se desplaza hacia allí. Existe por una razón práctica.
En un RTS la mano derecha vive en el ratón, seleccionando y dando órdenes.
Soltarlo para pulsar una tecla cuesta tiempo.

La idea es leer la posición del ratón en píxeles. Después se comprueba si cae
dentro de una franja estrecha junto a cada borde. Esa franja se llama
**margen**, y suele medir entre 10 y 30 píxeles.

Hay un detalle que casi todos los tutoriales se saltan. Cuando el ratón sale de
la ventana, sus coordenadas siguen llegando, y pueden ser negativas o mayores
que la pantalla. Si no lo compruebas, la cámara sale disparada en
cuanto el jugador va a pulsar algo fuera de la ventana.

La otra mitad de la clase son los **límites del mapa**. Ahora mismo tu cámara
puede volar hasta el infinito y dejar el terreno atrás. Eso no es un problema
estético: un jugador perdido en el vacío no sabe volver.

La solución se llama recorte, y Unity la trae hecha. `Mathf.Clamp` toma un
valor, un mínimo y un máximo. Devuelve ese valor metido a la fuerza dentro del
rango. Aplicado a la posición de la cámara después de moverla, salirse deja de
ser posible.

El truco está en dónde aplicarlo. Si cada script recorta por su cuenta, acabas
con la misma comprobación en tres sitios. Mejor un componente propio que
recorta al final del fotograma, pase lo que pase antes.

## 🛠️ Manos a la obra

**1.** En `Assets/Scripts/Input`, crea `CameraEdgeScroll`.

`Assets/Scripts/Input/CameraEdgeScroll.cs`

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class CameraEdgeScroll : MonoBehaviour
{
    [SerializeField, Range(5f, 50f)] private float margin = 20f;
    [SerializeField, Range(5f, 40f)] private float speed = 18f;

    private void Update()
    {
        Mouse mouse = Mouse.current;
        if (mouse == null) return;

        Vector2 p = mouse.position.ReadValue();
        if (p.x < 0f || p.y < 0f) return;
        if (p.x > Screen.width || p.y > Screen.height) return;

        float x = 0f;
        float z = 0f;
        if (p.x < margin) x -= 1f;
        if (p.x > Screen.width - margin) x += 1f;
        if (p.y < margin) z -= 1f;
        if (p.y > Screen.height - margin) z += 1f;

        Vector3 dir = new Vector3(x, 0f, z).normalized;
        transform.position += dir * (speed * Time.deltaTime);
    }
}
```

Las dos líneas de comprobación son el detalle que mencionaba antes. Si el ratón
está fuera de la ventana, el método sale y no pasa nada.

El eje `Y` del ratón crece hacia arriba, igual que la `Z` del mundo en esta
cámara. Por eso el borde superior mueve hacia `+Z` sin más cuentas.

**2.** Arrastra `CameraEdgeScroll` sobre `Main Camera`.

**3.** Ahora los límites. Crea `CameraBounds` en la misma carpeta.

`Assets/Scripts/Input/CameraBounds.cs`

```csharp
using UnityEngine;

public class CameraBounds : MonoBehaviour
{
    [SerializeField] private float halfWidth = 50f;
    [SerializeField] private float halfDepth = 50f;

    private void LateUpdate()
    {
        Vector3 p = transform.position;
        p.x = Mathf.Clamp(p.x, -halfWidth, halfWidth);
        p.z = Mathf.Clamp(p.z, -halfDepth, halfDepth);
        transform.position = p;
    }
}
```

Los 50 salen del mapa: cien metros de lado centrado en el origen son 50 a cada
lado. Si mañana agrandas el terreno, cambias estos dos números y nada más.

**4.** Arrastra `CameraBounds` sobre `Main Camera`. Va el último de los cuatro
componentes.

`LateUpdate` se ejecuta después de todos los `Update` del fotograma. Da igual
qué script haya movido la cámara: el recorte llega siempre al final.

## 🤖 Pídelo a Claude Code

```text
En Assets/Scripts/Input/CameraBounds.cs, añade un método OnDrawGizmosSelected
que dibuje en la ventana Scene un rectángulo con los límites actuales, usando
Gizmos.DrawWireCube a la altura y = 0. No cambies el recorte.
```

Revisa dos cosas. Que el cubo dibujado mide el doble de `halfWidth` y
`halfDepth`, porque son medias medidas. Y que el método es
`OnDrawGizmosSelected`, no `OnDrawGizmos`. Así no ensucia la escena cuando la
cámara no está seleccionada.

Lo que no se delega: el tamaño de los límites. Sale del mapa que decidiste tú.

## ▶️ Compruébalo

Entra en modo juego y lleva el ratón al borde derecho de la ventana `Game`. La
cámara se desplaza hacia la derecha, sin tocar el teclado.

Ahora la prueba de los límites. Mantén el ratón en el borde y espera. La cámara
avanza y, en algún momento, se para en seco aunque sigas ahí. Ha llegado al
final del mapa.

Prueba también lo contrario: saca el ratón de la ventana por el borde derecho,
hacia el escritorio. La cámara debe parar. Si sigue moviéndose, faltan las dos
líneas de comprobación.

Selecciona la cámara, con el gizmo del encargo ya hecho. Verás el rectángulo
blanco de los límites dibujado sobre el terreno. Debe coincidir con el borde del
plano verde.

## 🧯 Si algo se rompe

**La cámara se mueve sola sin tocar nada.**
Causa: el ratón está parado justo en la franja del margen.
Arreglo: no es un fallo. Mueve el ratón al centro y para.

**La cámara se va volando al cambiar de ventana.**
Causa: faltan las comprobaciones de ratón fuera de pantalla.
Arreglo: añade las dos líneas que comparan con `0` y con `Screen.width`.

**La cámara se para antes de llegar al borde del mapa.**
Causa: `halfWidth` o `halfDepth` son menores de 50.
Arreglo: ponlos en 50, que es la mitad de los cien metros del terreno.

**El scroll de borde y el teclado se pelean.**
Causa: ninguna, funcionan a la vez y se suman.
Arreglo: si el movimiento combinado va demasiado rápido, baja el `speed` de uno
de los dos.

## 🔁 Repaso relámpago

1. ¿Por qué hay que comprobar si el ratón está fuera de la ventana?
2. ¿Qué hace `Mathf.Clamp` y para qué se usa aquí?
3. ¿Por qué el recorte va en `LateUpdate` y no en `Update`?
4. ¿De dónde salen los 50 metros de los límites?

**Respuestas:** 1. Porque sus coordenadas siguen llegando fuera de la ventana, y
la cámara saldría disparada. 2. Mete un valor dentro de un mínimo y un máximo;
aquí impide que la cámara salga del mapa. 3. Porque se ejecuta después de todos
los `Update`, así que recorta lo haya movido quien lo haya movido. 4. Del mapa:
cien metros centrados en el origen son cincuenta a cada lado.

## 🎒 Tu turno

El scroll de borde tiene un problema real que todavía no hemos resuelto.

En el módulo 3, el jugador arrastrará un recuadro para seleccionar unidades.
Quizá no quiera que la cámara se mueva sola al llegar al borde. O quizá sí: los
dos comportamientos existen en juegos comerciales.

Añade hoy un campo serializado booleano que apague el scroll de borde, y una
tecla para alternarlo. Llámalo `edgeScrollEnabled` y no `enabled`. Ese
nombre ya lo usa `MonoBehaviour` para activar el componente entero, y taparlo
confunde a quien lea el código. Todavía no lo usará nadie, pero el
interruptor ya estará puesto cuando llegue el módulo 3.

Y prueba el juego en pantalla completa con `Ctrl + Shift + Enter` en el modo
juego. El margen en píxeles se comporta distinto según la resolución, y eso es
algo que conviene ver ahora.
