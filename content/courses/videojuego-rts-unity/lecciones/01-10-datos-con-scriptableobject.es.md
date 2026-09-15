# 1.10 — Los datos del juego con ScriptableObject

> Módulo 1 · Unity y C# para un RTS · Clase 10 de 11 · ⏱️ 9 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a sacar los números del juego fuera del código y fuera de la escena. Irán a
archivos propios, que puedes editar sin programar.

Al terminar, la ficha del aldeano será un archivo de tu proyecto. Llevará su
coste, su velocidad y su vida. Es la primera pieza de la capa de datos que
decidiste en la clase 0.7.

## 🧠 Antes de empezar

1. En la clase 1.7 pusiste los topes del zoom como campos serializados. ¿Dónde
   se guardó ese valor: en el código o en la escena?
2. Vas a tener treinta tipos de unidad. Si cada uno lleva sus números en su
   propio prefab, ¿cómo comparas el coste de todos de un vistazo?
3. Si cambias la vida del aldeano, ¿debería cambiar en los doscientos aldeanos
   de la partida a la vez?

## 📐 La idea

Hasta ahora has guardado valores en dos sitios. En el código, escritos a mano.
Y en la escena, a través del Inspector.

Los dos tienen el mismo problema para los datos del juego: están atados a algo.
El número vive dentro de un objeto concreto, y para verlo hay que ir a buscarlo
ahí.

Un **ScriptableObject** es una tercera opción. Es una clase de C# cuyas
instancias son **archivos** dentro de `Assets`, en lugar de objetos dentro de
una escena.

La diferencia práctica es enorme:

| | Campo en un prefab | ScriptableObject |
|---|---|---|
| Dónde vive | Dentro del prefab | Archivo propio en `Assets` |
| Se comparte | No, cada copia el suyo | Sí, todos leen el mismo |
| Se compara | Abriendo prefabs uno a uno | Poniéndolos en fila en la carpeta |
| Lo edita | Quien sepa Unity | Cualquiera que sepa leer |

Esa tercera fila es la que importa cuando llegues al módulo 4 y tengas que
equilibrar la economía. Con quince fichas en una carpeta, ves los costes de
todas a la vez y ajustas. Con quince prefabs, abres quince.

Y hay una consecuencia que se nota antes. Un ScriptableObject no está en la
escena, así que **no se pierde al salir del modo juego**. Si ajustas la
velocidad del aldeano mientras juegas, ese cambio se queda. Es lo contrario de
lo que viste en la clase 1.1, y ahorra mucho tiempo al equilibrar.

Cuidado con la otra cara de eso. El cambio persiste, así que tocar una ficha
durante la partida afecta a todas las unidades de golpe. También en la partida
siguiente. Es una herramienta de ajuste, no un campo por unidad.

## 🛠️ Manos a la obra

**1.** En `Assets/Scripts/Data`, crea un script llamado `UnitData`. Si la
carpeta no existe, créala.

`Assets/Scripts/Data/UnitData.cs`

```csharp
using UnityEngine;

[CreateAssetMenu(fileName = "UnitData", menuName = "RTS/Unidad")]
public class UnitData : ScriptableObject
{
    [Header("Identidad")]
    public string displayName = "Aldeano";

    [Header("Coste")]
    [Min(0)] public int foodCost = 50;
    [Min(0)] public int woodCost = 0;

    [Header("Combate")]
    [Min(1)] public int maxHealth = 40;
    [Min(0)] public int attackDamage = 3;

    [Header("Movimiento")]
    [Range(0.5f, 10f)] public float moveSpeed = 3.5f;
}
```

Aquí los campos sí son públicos, y es la única excepción del curso. Una ficha de
datos existe para que otros scripts la lean, así que esconderla no tendría
sentido. El archivo de reglas se refiere a los componentes, no a estas fichas.

`[CreateAssetMenu]` es lo que añade la entrada al menú de creación. `[Min(0)]`
impide costes negativos, igual que `[Range]` ponía topes en la clase 1.4.

La velocidad de 3,5 metros por segundo es la que usaste para calcular el mapa en
la clase 1.5. Ahí sigue, ahora en su sitio.

**2.** Vuelve a Unity y espera a que compile.

**3.** En `Assets`, crea una carpeta `Datos`. Clic derecho dentro → `Create` →
`RTS` → `Unidad`. Llama al archivo `Aldeano`.

**4.** Selecciónalo y comprueba los valores en el Inspector. Ya son editables
sin abrir el código.

**5.** Crea un segundo archivo igual y llámalo `Soldado`. Ponle `Food Cost` 60,
`Max Health` 100, `Attack Damage` 12 y `Move Speed` 3.

**6.** Selecciona los dos archivos a la vez en la carpeta. Compara sus números
en el Inspector. Eso es lo que no podías hacer con prefabs.

## 🤖 Pídelo a Claude Code

```text
Crea Assets/Scripts/Data/BuildingData.cs siguiendo el mismo patrón que
Assets/Scripts/Data/UnitData.cs: ScriptableObject con CreateAssetMenu en el
menú RTS/Edificio. Campos: nombre, coste en madera, puntos de vida y tamaño en
casillas. No toques UnitData.
```

Revisa tres cosas. Que hereda de `ScriptableObject` y no de `MonoBehaviour`. Que
el `menuName` sigue el mismo patrón que el tuyo. Y que usa `[Min]` en los costes
y la vida, como hiciste tú.

Lo que no se delega: los números. Cuánto cuesta una casa y cuánta vida tiene son
decisiones de diseño, y se ajustan jugando.

## ▶️ Compruébalo

En `Assets/Datos` tienes dos archivos con icono propio, `Aldeano` y `Soldado`.

Selecciona `Aldeano` y prueba a poner `Food Cost` en `-10`. No te deja bajar de
cero, gracias al `[Min(0)]`.

Ahora la prueba que enseña de verdad la diferencia. Entra en modo juego, cambia
`Move Speed` a 8 y sal del modo juego. El valor sigue siendo 8.

Compara eso con la clase 1.4. Al mover el deslizador del `Spinner` durante el
juego, el cambio se perdía. Esta es la diferencia entre un dato del proyecto y
un campo de un objeto de la escena.

Devuelve `Move Speed` a 3,5 antes de seguir.

Una comprobación más, y es la que enseña para qué sirve todo esto. Abre la
carpeta `Datos` en la ventana `Project`. Selecciona los dos archivos a la vez,
manteniendo pulsado `Ctrl`.

El Inspector muestra los campos comunes. Puedes cambiar el coste de los dos a la
vez. Cuando en el módulo 4 tengas que equilibrar una economía entera, ese gesto
vale más que cualquier hoja de cálculo.

## 🧯 Si algo se rompe

**El menú `RTS` no aparece al crear.**
Causa: el proyecto no ha compilado, o falta el atributo `[CreateAssetMenu]`.
Arreglo: mira la consola. Si hay un error rojo, el menú no se registra.

**Error: la clase no coincide con el nombre del archivo.**
Causa: el archivo se llama distinto que la clase.
Arreglo: los dos tienen que llamarse `UnitData`, igual que en la clase 1.3.

**Puse un campo público y no sale en el Inspector.**
Causa: el tipo no es serializable, como un `Dictionary`.
Arreglo: usa tipos simples, listas o arrays. Unity no serializa diccionarios.

**Cambié un valor jugando y se quedó.**
Causa: eso es lo esperado en un ScriptableObject.
Arreglo: ninguno, es la característica. Ten cuidado al ajustar durante partidas.

## 🔁 Repaso relámpago

1. ¿Dónde vive un ScriptableObject: en la escena o en el proyecto?
2. ¿Por qué sus cambios no se pierden al salir del modo juego?
3. ¿Qué ventaja tiene para equilibrar quince tipos de unidad?
4. ¿Por qué aquí sí se usan campos públicos?

**Respuestas:** 1. En el proyecto, como un archivo dentro de `Assets`. 2. Porque
no forma parte de la escena, y Unity solo restaura la escena. 3. Que los ves
todos en fila en una carpeta y comparas sus números de un vistazo. 4. Porque una
ficha de datos existe para que otros scripts la lean.

## 🎒 Tu turno

Crea una tercera ficha llamada `Arquero`, con `Food Cost` 40, `Wood Cost` 25,
`Max Health` 35 y `Attack Damage` 8.

Ahora mira los tres archivos juntos y hazte una pregunta de diseño. El soldado
cuesta 60 de comida y tiene 100 de vida. El arquero cuesta 65 en total, entre
madera y comida, y solo tiene 35 de vida. ¿Está eso equilibrado?

No hay respuesta correcta todavía, porque falta saber si el arquero dispara de
lejos y cuánto alcance tiene. Pero fíjate en que has podido plantearte la
pregunta sin abrir una sola línea de código. Eso es exactamente lo que buscabas
al sacar los datos fuera.

Haz el commit. En la clase siguiente hay cuestionario, y cierra el módulo.

Aprovecha para mirar atrás un momento. Empezaste el módulo con una escena vacía.
Ahora tienes terreno y una cámara que se maneja como la de un juego comercial.
También clics que se convierten en puntos del mundo, y las primeras fichas de
datos.

Todo eso son los cimientos. En el módulo 2 los dejas quietos durante diecinueve
clases. Te vas a Blender, a fabricar lo que se moverá encima.
