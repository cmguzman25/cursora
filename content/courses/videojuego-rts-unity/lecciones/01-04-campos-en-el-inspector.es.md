# 1.4 — Campos en el Inspector: serialización y rangos

> Módulo 1 · Unity y C# para un RTS · Clase 4 de 11 · ⏱️ 8 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a sacar los números de tu script a la ventana del Inspector, para poder
ajustarlos sin abrir el código.

Al terminar, la velocidad del cubo será un deslizador con límites, con su
etiqueta y su explicación. Y sabrás por qué un valor del Inspector gana siempre
al del código.

## 🧠 Antes de empezar

1. En la clase 1.1 escribiste posiciones a mano en vez de arrastrar con el
   ratón. ¿Qué ventaja tenía escribir el número exacto?
2. Para ajustar la velocidad de giro tienes que abrir el editor, cambiar el
   número, guardar y esperar a que compile. ¿Cuántas veces harías eso?
3. Si un valor se puede tocar desde fuera del código, ¿qué impide que alguien
   ponga un número absurdo?

## 📐 La idea

**Serializar** es guardar un valor fuera del código, en el archivo de la escena
o del prefab. Un campo serializado deja de vivir solo en C# y pasa a verse y
editarse en el Inspector.

Unity serializa por defecto los campos públicos. Ese es justo el motivo por el
que mucha gente escribe `public float speed;` sin necesitarlo.

Es mala idea. Público quiere decir que cualquier otro script del proyecto puede
escribir ese valor, y eso no es lo que querías. Solo querías verlo en el
Inspector.

La forma correcta es `[SerializeField] private float speed;`. Privado para el
código, visible para el editor. Así lo pide el archivo de reglas que escribiste
en la clase 0.4, y por eso lo pide.

Hay tres acompañantes que cuestan una línea y se agradecen:

| Atributo | Qué hace |
|---|---|
| `[Range(min, max)]` | Convierte el campo en un deslizador con topes |
| `[Tooltip("...")]` | Muestra una explicación al pasar el ratón |
| `[Header("...")]` | Pone un título encima para agrupar campos |

Y ahora la trampa que pilla a todo el mundo una vez.

**El valor del Inspector gana al del código.** Imagina que tu script dice
`= 45f` y luego mueves el deslizador a 10. El objeto se queda con 10 para
siempre. Cambiar el `45f` en el código ya no hará nada.

El motivo es que ese número del código solo se usa una vez. Se usa el día que el
componente se añade al objeto. A partir de ahí, el valor vive en el archivo de
la escena, y no en tu clase.

Cuando un cambio en el código "no hace efecto", casi siempre es esto. Se arregla
con el menú de los tres puntos del componente y la opción `Reset`.

## 🛠️ Manos a la obra

**1.** Abre `Assets/Scripts/Presentation/Spinner.cs` y deja el archivo así:

`Assets/Scripts/Presentation/Spinner.cs`

```csharp
using UnityEngine;

public class Spinner : MonoBehaviour
{
    [Header("Giro")]
    [Tooltip("Grados que gira cada segundo sobre su eje vertical.")]
    [SerializeField, Range(0f, 360f)]
    private float degreesPerSecond = 45f;

    private void Update()
    {
        transform.Rotate(0f, degreesPerSecond * Time.deltaTime, 0f);
    }
}
```

Los `Debug.Log` de la clase anterior ya cumplieron su función y salen del
archivo. Dejar registros de prueba en el código sale caro. Con doscientas unidades, la
consola escupe miles de líneas por segundo y el juego se arrastra.

**2.** Guarda y vuelve a Unity. Espera a que compile.

**3.** Selecciona `Andamio` y mira el componente `Spinner` en el Inspector. Ahora
hay un título, un deslizador y una explicación al pasar el ratón por encima.

**4.** Entra en modo juego y mueve el deslizador. El cubo cambia de velocidad al
instante, sin recompilar nada.

**5.** Sal del modo juego. Fíjate en que el deslizador ha vuelto a 45, porque los
cambios en modo juego se pierden. Ahora muévelo a 120 con el juego parado y
guarda la escena. Ese sí se queda.

## 🤖 Pídelo a Claude Code

```text
En Assets/Scripts/Presentation/Spinner.cs, añade un campo booleano serializado
llamado clockwise, con su Tooltip, que invierta el sentido del giro cuando esté
marcado. Mantén el rango del campo existente y no añadas ningún Debug.Log.
```

Revisa tres cosas. Que usa `[SerializeField] private bool`, y no un campo
público. Que el giro sigue multiplicado por `Time.deltaTime`. Y que no metió la
comprobación dentro de un bucle innecesario.

Lo que no se delega: el rango de 0 a 360. Ese tope dice qué valores tienen
sentido en tu juego, y eso lo sabes tú.

## ▶️ Compruébalo

Con el juego parado, el Inspector del componente `Spinner` muestra el título
`Giro`, el nombre `Degrees Per Second` y un deslizador.

Unity convierte `degreesPerSecond` en `Degrees Per Second` para mostrarlo. El
nombre del campo en C# no cambia; solo se muestra más legible.

Pasa el ratón por encima del nombre y espera un segundo: aparece el texto del
`Tooltip`.

Arrastra el deslizador al máximo. No pasa de 360, por mucho que insistas. Ese es
el trabajo del `[Range]`. Es la diferencia entre un valor ajustable y un valor
por el que puede colarse un 99999.

Parece una tontería y no lo es. Tendrás veinte campos de balance repartidos por
el juego. Los topes impiden que un despiste con el teclado deje a una unidad
moviéndose a mil metros por segundo.

## 🧯 Si algo se rompe

**El campo no aparece en el Inspector.**
Causa: falta `[SerializeField]`, o el campo es una propiedad en vez de un campo.
Arreglo: Unity solo serializa campos, no propiedades con `get` y `set`.

**Cambio el número en el código y no pasa nada.**
Causa: el objeto guarda el valor que tocaste en el Inspector.
Arreglo: menú de los tres puntos del componente → `Reset`. Recuperará el valor
del código.

**El deslizador no aparece, solo una casilla de texto.**
Causa: el `[Range]` está mal escrito o aplicado a un tipo que no es numérico.
Arreglo: revisa que lleva la `f` en los dos números, como `Range(0f, 360f)`.

**Aparecen dos componentes `Spinner` en el mismo objeto.**
Causa: lo arrastraste dos veces.
Arreglo: quita uno con el menú de los tres puntos → `Remove Component`.

## 🔁 Repaso relámpago

1. ¿Por qué no se usa un campo público para que salga en el Inspector?
2. Si cambias el valor por defecto en el código y no pasa nada, ¿qué ocurre?
3. ¿Qué hace `[Range]` además de dibujar un deslizador?
4. ¿Qué diferencia hay entre lo que muestra el Inspector y el nombre en C#?

**Respuestas:** 1. Porque público significa que cualquier script puede
escribirlo, y solo querías verlo en el editor. 2. Que el objeto guarda el valor
que tocaste en el Inspector, y ese gana. 3. Pone topes: impide valores fuera del
rango que tiene sentido. 4. El Inspector separa las palabras y las capitaliza,
pero el campo en C# se sigue llamando igual.

## 🎒 Tu turno

Dentro de dos clases escribirás `CameraPan`, el script de la cámara. Ve pensando
qué campos suyos merecerían un `[Tooltip]` y qué topes les pondrías.

Mientras tanto, haz esto en el `Spinner`. Añade un segundo campo serializado
llamado `axis`, de tipo `Vector3`, con valor por defecto `(0, 1, 0)`. Úsalo en
`transform.Rotate` en lugar de los tres números sueltos.

Entra en modo juego y pon el eje en `(1, 0, 0)`. El cubo pasa a girar hacia
delante, como una rueda. Eso es lo que da un campo serializado: probar diez
variantes en un minuto, sin tocar el código.
