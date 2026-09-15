# 1.3 — Tu primer script: MonoBehaviour y el ciclo de vida

> Módulo 1 · Unity y C# para un RTS · Clase 3 de 11 · ⏱️ 8 min de lectura

## 🎯 Qué vas a lograr hoy

Vas a escribir tu primer componente y a ver con tus ojos cuándo llama Unity a
cada método.

Al terminar tendrás un cubo girando en la escena. Y sabrás el orden exacto en
que se ejecutan `Awake`, `Start` y `Update`. Ese orden explica buena parte de
los errores raros que te esperan en los próximos módulos.

## 🧠 Antes de empezar

1. En la clase 0.7 decidiste que la simulación decide y la presentación dibuja.
   ¿Dónde pondrías un script que solo hace girar un objeto?
2. Tu script es una pieza enchufada a una caja. ¿Quién crees que llama a sus
   métodos: tú o el motor?
3. Si un componente necesita hablar con otro al arrancar, ¿qué pasaría si el
   otro todavía no está listo?

## 📐 La idea

En un programa normal tú escribes el `main` y decides qué se ejecuta. Aquí no.

Unity tiene su propio bucle y **te llama a ti**. Tu trabajo es rellenar los
métodos que el motor conoce por su nombre. Si escribes un método llamado
`Update`, Unity lo llamará una vez por fotograma sin que lo registres en ningún
sitio.

Los cuatro que importan ahora:

| Método | Cuándo se llama | Para qué sirve |
|---|---|---|
| `Awake` | Al crearse el objeto, una vez | Prepararse a uno mismo |
| `Start` | Antes del primer fotograma, una vez | Hablar con otros objetos |
| `Update` | Una vez por fotograma | Leer entrada, mover cosas |
| `FixedUpdate` | A intervalos fijos | Física |

El orden entre `Awake` y `Start` parece un detalle y no lo es. Unity llama al
`Awake` de **todos** los objetos antes del `Start` de cualquiera.

De ahí sale una regla que evita errores muy desagradables. **En `Awake` te
preparas a ti mismo; en `Start` hablas con los demás.** Si buscas a otro objeto
desde `Awake`, puede que aún no exista. Desde `Start` ya existen todos.

Esos errores son de los peores que hay, porque no fallan siempre. Dependen del
orden en que Unity decida crear los objetos. Y ese orden puede cambiar de una
ejecución a la siguiente.

`Update` es el caballo de batalla. Se llama sesenta veces por segundo, o las que
dé la máquina. De ahí venían las señales de alarma de la clase 0.5. Todo lo que
pongas ahí se multiplica por los fotogramas y por el número de objetos.

Los nombres se escriben exactamente así, con mayúscula inicial. `update` en
minúscula compila, no da ningún error y no se llama nunca.

## 🛠️ Manos a la obra

**1.** En la ventana `Project`, entra en `Assets/Scripts/Presentation`. Si la
carpeta no existe, créala.

**2.** Clic derecho sobre la carpeta → `Create` → `Scripting` →
`MonoBehaviour Script`. Nómbralo `Spinner` y ábrelo con doble clic.

**3.** Reemplaza todo el contenido por esto:

`Assets/Scripts/Presentation/Spinner.cs`

```csharp
using UnityEngine;

public class Spinner : MonoBehaviour
{
    private float degreesPerSecond = 45f;

    private void Awake()
    {
        Debug.Log($"Awake de {name}");
    }

    private void Start()
    {
        Debug.Log($"Start de {name}");
    }

    private void Update()
    {
        transform.Rotate(0f, degreesPerSecond * Time.deltaTime, 0f);
    }
}
```

El nombre del archivo y el de la clase tienen que coincidir. Unity no encuentra
el componente si `Spinner.cs` contiene una clase llamada de otra forma.

`transform.Rotate` gira el objeto sobre su propio eje vertical. Y ahí está otra
vez `Time.deltaTime`, por el mismo motivo que en cualquier movimiento. Queremos
45 grados por segundo, no 45 por fotograma.

**4.** Vuelve a Unity y espera a que termine de compilar. Abajo a la derecha
aparece un círculo girando mientras lo hace.

**5.** Arrastra `Spinner` desde la ventana `Project` sobre el cubo `Andamio` de
la jerarquía.

**6.** Abre la consola con `Window` → `General` → `Console` y déjala visible.

## 🤖 Pídelo a Claude Code

```text
En Assets/Scripts/Presentation/Spinner.cs, añade un método OnEnable y otro
OnDisable, cada uno con su Debug.Log, igual que los que ya hay. Explícame en
qué momento se llama cada uno y por qué pueden ejecutarse más de una vez. No
cambies el método Update.
```

Revisa dos cosas. Que sitúa `OnEnable` **después** de `Awake` y antes de
`Start`. Y que explica que se llaman cada vez que el componente se activa o se
desactiva, no solo al arrancar.

Lo que no se delega: los 45 grados por segundo. Es un valor de presentación, y
se decide mirando la pantalla.

## ▶️ Compruébalo

Entra en modo juego. El cubo gira despacio sobre sí mismo, dando una vuelta
completa cada ocho segundos.

En la consola aparecen dos líneas, en este orden exacto:

```text
Awake de Andamio
Start de Andamio
```

Ahora la prueba interesante. Sin salir del modo juego, desmarca la casilla del
componente `Spinner` en el Inspector. El cubo se para. Vuelve a marcarla y sigue
girando, pero no aparecen más líneas en la consola.

Eso confirma dos cosas. Que `Awake` y `Start` se llaman una sola vez. Y que
`Update` deja de llamarse cuando el componente está desactivado.

## 🧯 Si algo se rompe

**No puedo arrastrar el script sobre el cubo.**
Causa: el archivo tiene errores de compilación, o el nombre de la clase no
coincide con el del archivo.
Arreglo: mira la consola, arregla el error rojo y espera a que recompile.

**El cubo no gira pero no hay errores.**
Causa: el método se llama `update` en minúscula, o el componente está
desactivado.
Arreglo: revisa la mayúscula inicial y la casilla del componente.

**La consola no muestra nada.**
Causa: los tres botones de filtro de arriba a la derecha están apagados.
Arreglo: comprueba que el primero, el de los mensajes normales, está encendido.

**El cubo gira a tirones.**
Causa: quitaste el `Time.deltaTime` y el giro depende de los fotogramas.
Arreglo: devuélvelo. Sin él, el giro cambia de velocidad con la carga del
ordenador.

## 🔁 Repaso relámpago

1. ¿Quién llama a `Update`, y con qué frecuencia?
2. ¿Por qué conviene hablar con otros objetos en `Start` y no en `Awake`?
3. ¿Qué pasa si escribes `update` en minúscula?
4. ¿Qué tiene que coincidir entre el archivo y el código?

**Respuestas:** 1. El motor, una vez por fotograma, sin que tú lo registres en
ninguna parte. 2. Porque Unity llama al `Awake` de todos los objetos antes que
al `Start` de cualquiera. En `Start` ya existen todos. 3. Compila sin
errores y no se llama nunca. 4. El nombre del archivo y el nombre de la clase.

## 🎒 Tu turno

Haz un experimento que deja clara la diferencia entre los dos métodos.

Añade un segundo cubo a la escena, ponle también el componente `Spinner` y
llámalo `Andamio2`. Entra en modo juego y mira el orden de las cuatro líneas de
la consola.

Verás los dos `Awake` primero y los dos `Start` después, nunca intercalados. Esa
es exactamente la garantía que da Unity, y la razón de la regla de hoy.

Cuando lo hayas visto, borra `Andamio2` y guarda la escena.
