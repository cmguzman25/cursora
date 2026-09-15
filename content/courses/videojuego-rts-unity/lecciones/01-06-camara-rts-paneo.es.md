# 1.6 — La cámara RTS: paneo con teclado

> Módulo 1 · Unity y C# para un RTS · Clase 6 de 11 · ⏱️ 8 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a mover la cámara por el mapa con `W`, `A`, `S`, `D` y las flechas.

Al terminar, el terreno que hiciste en la clase anterior se recorre de punta a
punta. El movimiento irá igual de rápido en cualquier ordenador. Y la velocidad
se ajustará desde el Inspector, sin tocar el código.

## 🧠 Antes de empezar

Piensa estas tres antes de seguir. Se responden solas durante la clase.

1. ¿Por qué la cámara de un juego de estrategia se desplaza sobre un plano, en
   lugar de volar libre por el aire?
2. En la clase 1.3 viste que `Update` se ejecuta una vez por fotograma. Si en
   cada llamada sumas siempre la misma cantidad, ¿qué pasa en un ordenador que
   va al doble de fotogramas?
3. Si el jugador pulsa `W` y `D` a la vez, ¿debería moverse más rápido en
   diagonal que en línea recta?

## 📐 La idea

Una cámara de estrategia no vuela. Se queda a una altura fija, mirando hacia
abajo en ángulo, y solo se desliza sobre el mapa. Esa restricción es lo que hace
legible la partida. El jugador ve siempre el terreno desde el mismo punto de
vista.

El **Transform** es el componente que guarda la posición, la rotación y la
escala de un objeto. Mover la cámara es sumar a `transform.position`.

Aquí aparece la primera trampa. El mundo tiene tres ejes: `X` a la derecha, `Y`
hacia arriba y `Z` hacia delante. La cámara está inclinada hacia abajo, así que
su "delante" apunta al suelo. Si la mueves hacia su propio delante, se hunde en
el terreno. Por eso trabajamos siempre con los ejes del mundo, no con los de la
cámara.

La segunda trampa es el tiempo. `Update` se llama una vez por fotograma. Nadie
sabe cuántos fotogramas por segundo dará el ordenador del jugador. Si sumas una
cantidad fija, la cámara vuela en un equipo potente y se arrastra en uno lento.

La solución es **`Time.deltaTime`**: los segundos que pasaron desde el
fotograma anterior. Al multiplicar por él, dejas de razonar en unidades por
fotograma y pasas a metros por segundo. La velocidad queda igual en cualquier
máquina.

Queda la diagonal. Si sumas 1 en `X` y 1 en `Z`, el desplazamiento resultante
mide 1,41 y no 1. En diagonal irías un 41 % más rápido. Un **vector
normalizado** es un vector al que se le ha ajustado la longitud a 1 sin cambiar
su dirección. Normalizando la dirección antes de aplicar la velocidad, las ocho
direcciones corren igual.

## 🛠️ Manos a la obra

Empieza por colocar la cámara donde tiene sentido para un juego de estrategia.

1. Selecciona `Main Camera` en la jerarquía.
2. En el Inspector, pon `Position` en `(0, 25, -20)` y `Rotation` en
   `(50, 0, 0)`.

Son 25 metros de altura y 50 grados de inclinación. Con menos altura se ve muy
poco mapa. Con más inclinación, los edificios se ven desde arriba y pierden su
silueta.

Ahora el script. Crea la carpeta `Assets/Scripts/Input` y dentro un script de
C# llamado `CameraPan`.

3. Clic derecho sobre la carpeta → `Create` → `Scripting` → `MonoBehaviour Script`.
4. Nómbralo `CameraPan` y ábrelo.

Reemplaza todo el contenido por esto:

`Assets/Scripts/Input/CameraPan.cs`

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class CameraPan : MonoBehaviour
{
    [SerializeField, Range(5f, 40f)] private float speed = 18f;

    private void Update()
    {
        Keyboard keyboard = Keyboard.current;
        if (keyboard == null) return;

        float x = 0f;
        float z = 0f;
        if (keyboard.aKey.isPressed || keyboard.leftArrowKey.isPressed) x -= 1f;
        if (keyboard.dKey.isPressed || keyboard.rightArrowKey.isPressed) x += 1f;
        if (keyboard.sKey.isPressed || keyboard.downArrowKey.isPressed) z -= 1f;
        if (keyboard.wKey.isPressed || keyboard.upArrowKey.isPressed) z += 1f;

        Vector3 direction = new Vector3(x, 0f, z).normalized;
        transform.position += direction * (speed * Time.deltaTime);
    }
}
```

`Keyboard.current` es el teclado activo del **Input System**, el paquete de
entrada que trae la plantilla de Unity 6.3. Devuelve `null` si no hay teclado
conectado, y por eso salimos antes de leerlo.

La `Y` de la dirección vale siempre `0`. Así la cámara se desliza sin subir ni
bajar, por muy inclinada que esté.

`speed` vale `18` metros por segundo. Con menos, cruzar el mapa se hace largo.
Con mucho más, el jugador pierde de vista dónde estaba.

5. Arrastra `CameraPan` sobre `Main Camera` en la jerarquía.

## 🤖 Pídelo a Claude Code

Este script es corto y conviene escribirlo a mano. Lo que sí puedes delegar es
la variante con aceleración:

```text
En Assets/Scripts/Input/CameraPan.cs, añade una aceleración suave: que la
cámara tarde 0,2 segundos en alcanzar su velocidad máxima y otros 0,2 en
pararse. Usa Vector3.SmoothDamp. No cambies las teclas ni el rango de speed.
```

Al leer su respuesta, revisa tres cosas. Que el campo nuevo aparezca en el
Inspector con `[SerializeField]`. Que la velocidad siga multiplicada por
`Time.deltaTime`. Que la dirección se siga normalizando antes de aplicarla.

Lo que no se delega: cuánto vale `speed` y cuánto tarda la cámara en frenar.
Esos números se deciden probando el juego, y quien lo prueba eres tú.

## ▶️ Compruébalo

Entra en modo juego y pulsa `D`. El terreno se desliza hacia la izquierda de la
pantalla, porque la cámara avanza hacia la derecha del mundo.

Tres señales de que está bien:

- Las flechas hacen lo mismo que `W`, `A`, `S`, `D`.
- En diagonal la cámara no corre más que en recta.
- La cámara mantiene su altura: el terreno nunca se acerca ni se aleja.

Sin salir del modo juego, mueve el deslizador `Speed` en el Inspector. La
cámara cambia de ritmo al momento. Recuerda que los cambios hechos en modo
juego se pierden al salir.

## 🧯 Si algo se rompe

**La cámara no se mueve.**
Causa: el script no está en `Main Camera`, o `Speed` se quedó en el mínimo.
Arreglo: comprueba que el componente `Camera Pan` aparece en el Inspector de la
cámara y sube `Speed` a 18.

**El editor marca error en `Keyboard`.**
Causa: falta la línea `using UnityEngine.InputSystem;` arriba del archivo.
Arreglo: añádela y guarda; Unity recompila solo.

**Sale un error de entrada al entrar en modo juego.**
Causa: el proyecto está usando el sistema de entrada antiguo.
Arreglo: `Edit` → `Project Settings` → `Player` → `Active Input Handling`, y
elige `Input System Package (New)`. El editor se reinicia.

**La cámara se hunde en el terreno.**
Causa: moviste el objeto por sus propios ejes en lugar de los del mundo.
Arreglo: suma a `transform.position` un vector con la `Y` a `0`, como arriba.

## 🔁 Repaso relámpago

1. ¿Por qué multiplicamos la velocidad por `Time.deltaTime`?
2. ¿Qué pasaría si quitas el `.normalized` de la dirección?
3. ¿Por qué la componente `Y` de la dirección vale siempre cero?
4. ¿Para qué sirve el `[SerializeField]` delante de `speed`?

**Respuestas:** 1. Para que la cámara recorra los mismos metros por segundo en
cualquier ordenador, vaya a los fotogramas que vaya. 2. En diagonal la cámara
correría un 41 % más rápido que en línea recta. 3. Para que la cámara se
deslice sobre el mapa sin cambiar de altura. 4. Para ver y ajustar el valor
desde el Inspector aunque el campo sea privado.

## 🎒 Tu turno

Añade una tecla de carrera. Cuando el jugador mantenga `Shift` izquierdo, la
cámara debe moverse al doble de velocidad.

Dos pistas. El Input System lee esa tecla con `keyboard.leftShiftKey.isPressed`.
Y el multiplicador merece su propio campo serializado, no un `2f` suelto en
medio del cálculo.

Si te sale, tienes la cámara lista para la clase siguiente, donde le añadimos
zoom y rotación.
