# 1.4 — La notación CIDR: qué significa de verdad /24

> Módulo 1 · Redes sin nube · Clase 4 de 13 · ⏱️ 9 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

Qué significa la barra de `10.0.1.0/24`. Por qué un número más pequeño da una
red más grande. Y cómo saber de un vistazo cuántas direcciones caben. Vas a
escribir esta notación en AWS cada vez que crees algo. Conviene que deje de ser
un ruido que se copia y se pega.

## 🤔 Antes de empezar

1. En la clase 1.1 vimos que una red necesita tres cosas. ¿Cuáles eran?
2. Si un número más pequeño significara "más grande", ¿se te ocurre algún
   ejemplo cotidiano donde eso pase?
3. ¿Cuántas casas crees que caben en un barrio cuyo nombre ocupa casi toda la
   dirección?

## 📐 La idea

Escribir `255.255.255.0` cada vez cansa. Y hay un detalle que lo hace
redundante. En una máscara, los números grandes **siempre van primero** y los
ceros después. Nunca verás `255.0.255.0`.

Si la frontera siempre cae en el mismo sitio, con decir dónde está es
suficiente. Eso es toda la notación **CIDR** (Classless Inter-Domain Routing,
enrutamiento sin clases). Un número que dice **cuántos bits ocupa la parte de
red**.

```text
   255 . 255 . 255 .  0      255 . 255 .  0  .  0
   ─────────────────  ─      ───────────  ───────
    8  +  8  +  8  = 24       8  +  8   =   16
         red         casa         red       casa

         →  /24                   →  /16
```

Recuerda de la clase 1.2 que cada número de la dirección son 8 bits. Así que
contar es sumar de ocho en ocho: un 255 son 8 bits, dos son 16, tres son 24.

Entonces `10.0.1.0/24` se lee: "los primeros 24 bits son el barrio". Veinticuatro
bits son tres números. El barrio es `10.0.1` y queda libre el último.

Hay un atajo que conviene tener a mano desde ya. Divide el número entre ocho:

- **Da exacto** (`/8`, `/16`, `/24`). La frontera cae justo entre dos puntos, y
  puedes leer el barrio a ojo sin calcular nada.
- **No da exacto** (`/20`, `/26`, `/28`). La frontera cae **dentro** de un
  número, y hay que pensar un poco más. Eso es la clase 1.6.

Mientras te muevas en `/8`, `/16` y `/24`, no vas a necesitar una calculadora
nunca. La mayoría de las redes que diseñes van a estar ahí. Quedarse en esos
tres mientras aprendes es una buena costumbre.

Y aquí está la parte que descoloca a todo el mundo:

> **Cuanto más pequeño es el número después de la barra, más grande es la red.**

No es una rareza. Es aritmética. El número dice cuánto ocupa el **barrio**. Si
el barrio ocupa mucho, queda poco sitio para las casas. Si el barrio ocupa poco,
queda muchísimo sitio.

Ahí están las otras dos preguntas del principio. Lo de "más pequeño es más
grande" pasa en sitios cotidianos. Quedar primero es mejor que quedar décimo.
La planta -3 está más abajo que la -1. El número no mide la cosa: mide otra que
va al revés.

Y un barrio cuyo nombre ocupa casi toda la dirección deja sitio para muy pocas
casas. Eso es exactamente un `/28`, que verás en la tabla de abajo.

## 🔬 En detalle

Los bits que no son de red son de máquina. Si hay 32 bits en total y `/24` usa
24, quedan 8 para las casas. Con 8 bits se cuenta hasta 256.

De ahí sale la tabla que conviene tener en la cabeza. No hace falta
memorizarla entera: con las tres o cuatro de en medio se sobrevive.

| CIDR | Bits de casa | Direcciones | Tamaño mental |
|---|---|---|---|
| `/8` | 24 | 16.777.216 | Enorme. Una multinacional entera |
| `/16` | 16 | 65.536 | Grande. El tamaño típico de una VPC |
| `/20` | 12 | 4.096 | Una subred holgada |
| `/24` | 8 | 256 | La subred de toda la vida |
| `/28` | 4 | 16 | Minúscula. El mínimo que acepta AWS |
| `/32` | 0 | 1 | Una sola dirección exacta |

Dos cosas de esa tabla que vale la pena notar.

Cada vez que el número sube de uno en uno, la red se parte **por la mitad**. Un
`/25` tiene la mitad de direcciones que un `/24`. Un `/26`, la cuarta parte. Por
eso los tamaños son siempre potencias de dos. Nunca verás una red de exactamente
100 direcciones: se pide un `/25`, que da 128, y sobran 28.

Y `/32` no es un error. Significa "esta dirección exacta y ninguna más". Lo
escribirás a menudo en las reglas de cortafuegos de la clase 1.12. Sirve para
permitir una sola máquina. En AWS, `203.0.113.5/32` quiere decir "solo ese".

El otro extremo también existe y lo vas a usar todavía más. `0.0.0.0/0` son
cero bits de red, es decir, ninguna frontera. Significa **cualquier dirección
del mundo**. Es la ruta de salida por defecto, y por eso se lee como "todo lo
demás".

Queda explicar de dónde viene el nombre. Antes de 1993 las redes venían en tres
tallas fijas. La talla la decidía el primer número de la dirección, y se
llamaban clase A, clase B y clase C.

El problema era evidente. Una empresa con 300 máquinas no cabía en una clase C,
que daba 256. Y al darle una clase B se llevaba 65.536 direcciones para
desperdiciar 65.236. Así se agotó medio internet.

CIDR quitó las tallas fijas. De ahí el nombre: enrutamiento **sin clases**.
Ahora pides el tamaño que necesitas, en potencias de dos, y no la talla que te
toque. Todo lo que vas a hacer en AWS funciona así.

## 🗺️ Dónde aparece esto en AWS

En AWS esta notación está en todas partes, y casi siempre en sitios donde
equivocarse duele:

- Al crear una **VPC** le das un rango como `10.0.0.0/16`. AWS acepta de `/16`
  a `/28`, y ese rango **no se puede encoger después**.
- Cada **subred** lleva un trozo del rango de la VPC, por ejemplo
  `10.0.1.0/24`. Qué es una subred y para qué sirve partir una red es la clase
  1.5.
- Cada línea de una **tabla de rutas** tiene un destino en esta notación,
  incluido el `0.0.0.0/0` que acabas de ver. Las tablas de rutas son la clase
  1.7.
- Cada regla de un **grupo de seguridad** dice de qué rango acepta tráfico.
  Ahí es donde `/32` aparece sin parar.

La clase 2.2 va entera sobre cómo elegir el rango de una VPC. Es una de las
pocas decisiones de AWS que de verdad cuesta deshacer.

## ⚠️ No lo confundas con

**El `/24` con el último número.** En `10.0.1.0/24`, el `24` no tiene nada que
ver con el `0` del final, ni con ningún octeto. Está contando bits, y vive en
otra dimensión que los cuatro números de delante.

**Número grande con red grande.** Es justo al revés, y es el error más repetido
al empezar. Un `/28` tiene 16 direcciones y un `/8` tiene dieciséis millones.
Si dudas, piensa: el número mide el **barrio**, no las casas.

**Direcciones totales con direcciones usables.** Un `/24` tiene 256
direcciones, y no puedes usar las 256. Siempre hay algunas reservadas, y en AWS
hay más de lo habitual. Eso es la clase 2.5.

**Definir un rango con referirse a uno.** Cuando creas una subred, el CIDR
**define** qué direcciones existen ahí. Cuando lo escribes en una regla de
cortafuegos, solo **señala** a un grupo de direcciones que ya existe. Es la
misma notación haciendo dos trabajos distintos, y conviene no mezclarlos.

## 🔁 Autoevaluación

1. ¿Qué cuenta exactamente el número que va después de la barra?
2. ¿Cuántas direcciones tiene un `/24`? ¿Y un `/16`?
3. ¿Qué significa `0.0.0.0/0`, y dónde lo has visto ya?
4. ¿Por qué un `/16` es más grande que un `/24`?

**Respuestas:** Una, cuántos bits de la dirección son la parte de red. El
tamaño del barrio. Dos, un `/24` tiene 256 y un `/16` tiene 65.536. Tres,
ninguna frontera, es decir, cualquier dirección del mundo. Es la ruta por
defecto hacia la salida. Cuatro, porque el número mide el barrio. Si el barrio
ocupa menos bits, quedan más bits libres para las casas.

## 🎒 Para pensar

Tienes el rango `10.0.0.0/16` para una empresa y te piden partirlo en subredes
de `/24`. ¿Cuántas te salen? Piénsalo con la tabla de arriba, comparando el
número de direcciones de cada uno. Y después piensa en la pregunta incómoda:
¿cuántas te saldrían si las pidieran de `/20`?
