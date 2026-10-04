# 1.6 — Calcular un rango a mano, sin fórmulas raras

> Módulo 1 · Redes sin nube · Clase 6 de 13 · ⏱️ 8 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

Cómo pasar de `10.0.0.0/18` a "esto va desde aquí hasta aquí", sin binario y sin
calculadora. Es la habilidad que te deja planificar una red en una servilleta.
También evita el error más caro de todos. Ese error es crear dos subredes que
se pisan, y descubrirlo cuando ya hay máquinas dentro.

## 🤔 Antes de empezar

1. En la clase 1.2 vimos por qué ningún número de una dirección pasa de 255.
   ¿Por qué era?
2. Si una calle tiene bloques de 25 casas numeradas desde el 1, ¿en qué número
   empieza el cuarto bloque?
3. ¿Qué te resultaría más rápido: dividir 65.536 entre 256, o contar de 256 en
   256 hasta llegar?

## 📐 La idea

Hay dos casos, y uno de los dos no da ningún trabajo.

**Caso fácil: `/8`, `/16` y `/24`.** La frontera cae justo entre dos puntos. El
rango se lee a ojo. Lo que es red se queda fijo, y lo que es casa va de 0 a 255:

| Rango | Desde | Hasta |
|---|---|---|
| `10.0.1.0/24` | `10.0.1.0` | `10.0.1.255` |
| `10.0.0.0/16` | `10.0.0.0` | `10.0.255.255` |
| `10.0.0.0/8` | `10.0.0.0` | `10.255.255.255` |

**Caso con trabajo: todo lo demás.** Aquí la frontera cae dentro de un número, y
hay que calcular algo. Pero ese algo es una resta.

El truco se llama **tamaño de bloque**, y son dos pasos:

1. Mira el valor de la máscara en el número donde cae la frontera.
2. Réstalo de 256. Eso es cada cuánto empieza un bloque nuevo.

Solo hay siete valores posibles, y esta tabla los tiene todos. El "resto" es lo
que sobra al dividir el número del CIDR entre 8:

| Resto | Valor de máscara | 256 menos eso | Bloques de |
|---|---|---|---|
| 1 | 128 | 128 | 128 |
| 2 | 192 | 64 | 64 |
| 3 | 224 | 32 | 32 |
| 4 | 240 | 16 | 16 |
| 5 | 248 | 8 | 8 |
| 6 | 252 | 4 | 4 |
| 7 | 254 | 2 | 2 |

Fíjate en el patrón: cada fila es la mitad de la anterior. Si te acuerdas de
que 1 son bloques de 128, el resto sale dividiendo entre dos.

Y ahí está la segunda pregunta del principio. Si los bloques son de 25, el
cuarto empieza en el 76. Se cuenta de 25 en 25. Aquí es idéntico, con otros
números.

## 🔬 En detalle

Vamos con un caso real. Tienes `10.0.0.0/18` y quieres saber hasta dónde llega.

**Paso 1. ¿Dónde cae la frontera?** Divide 18 entre 8. Da 2 y sobran 2. Los dos
primeros números son red entera. La frontera cae en el **tercer** número.

**Paso 2. ¿Cuánto vale la máscara ahí?** El resto era 2. Mirando la tabla, un
resto de 2 da una máscara de 192.

**Paso 3. ¿Tamaño de bloque?** 256 menos 192 son **64**.

**Paso 4. Contar.** Los bloques empiezan de 64 en 64 en el tercer número:

```text
   10.0.  0.0/18   →   10.0.  0.0  hasta  10.0. 63.255
   10.0. 64.0/18   →   10.0. 64.0  hasta  10.0.127.255
   10.0.128.0/18   →   10.0.128.0  hasta  10.0.191.255
   10.0.192.0/18   →   10.0.192.0  hasta  10.0.255.255

   cuatro bloques de 64, y se acabó el /16
```

El final de cada bloque es siempre el número justo antes del siguiente inicio.
Si el siguiente empieza en 64, este acaba en 63. Nada más.

Lo mismo con la frontera en el último número. Con `10.0.1.0/26`: 26 entre 8 da
3 y el resto es 2. La frontera cae en el cuarto número. Un resto de 2 da
máscara 192, y 256 menos 192 son 64. Así que los bloques son `10.0.1.0`,
`10.0.1.64`, `10.0.1.128` y `10.0.1.192`.

Fíjate en una cosa que da tranquilidad. Los bloques **siempre empiezan en un
múltiplo de su tamaño**. Si alguien te dice que su subred es `10.0.1.50/26`,
está mal: 50 no es múltiplo de 64. Esa comprobación detecta la mitad de los
errores sin calcular nada.

Y ahí es donde la analogía de la calle deja de valer, justo en el detalle que
importa. Una calle puede tener bloques de 25 casas si al urbanista le apetece.
Una red no. Los bloques son siempre potencias de dos, y siempre empiezan donde
les toca. Por eso pides el tamaño que quepa y aceptas que sobre sitio.

## 🗺️ Dónde aparece esto en AWS

La consola de AWS te echa una mano a medias. Cuando escribes un rango, te
muestra cuántas direcciones salen. Lo que **no** te dice es si ese rango choca
con una subred que creaste hace tres meses.

Esa comprobación es tuya, y por eso este cálculo importa. Antes de crear la
segunda subred de una VPC, tienes que saber dónde acaba la primera.

AWS sí te frena en dos casos. No te deja solapar dos subredes de la misma VPC.
Y no te deja usar un rango que no quepa dentro del rango de la VPC.

Pero no te protege del problema caro, que es solapar con **otra** red. Eso
aparece al conectar dos VPC, o al conectar con una oficina. Para entonces ya
hay máquinas funcionando y mover el rango es carísimo. Es el tema de las clases
5.4 y 6.1.

Hay una costumbre que ahorra muchos disgustos y cuesta cinco minutos. Antes de
crear nada, escribe el reparto entero en una tabla, incluidos los trozos que
todavía no vas a usar:

| Trozo | Para qué | Estado |
|---|---|---|
| `10.0.0.0/20` | Subredes públicas | En uso |
| `10.0.16.0/20` | Subredes privadas | En uso |
| `10.0.32.0/20` | Bases de datos | Reservado |
| `10.0.48.0/20` | Lo que venga | Libre |

Reservar sitio para lo que no existe todavía parece una pérdida de tiempo. Es
lo contrario. Las direcciones no se gastan por apuntarlas en un papel. Y tener
el hueco marcado evita que alguien lo ocupe sin darse cuenta.

## ⚠️ No lo confundas con

**La primera dirección con la primera usable.** La primera de cada bloque da
nombre a la red, y no se le pone a ninguna máquina. En `10.0.1.0/24`, la
`10.0.1.0` es el nombre del barrio. La primera que podrías usar sería la `.1`.

**La última dirección con la última usable.** La última de cada bloque está
reservada para mandar un mensaje a todos los del barrio a la vez. En un `/24`
esa es la `.255`. Tampoco se le pone a nadie.

**Contar bloques con contar direcciones.** Un `/18` da cuatro bloques dentro de
un `/16`, y cada bloque tiene 16.384 direcciones. Son dos preguntas distintas y
se confunden a menudo. Una pregunta cuántos trozos, la otra cuánto cabe en cada
trozo.

## 🔁 Autoevaluación

1. ¿Cuáles son los dos pasos del truco del tamaño de bloque?
2. ¿Hasta dónde llega `10.0.64.0/18`?
3. ¿Por qué `10.0.1.50/26` está mal escrito?
4. ¿Cuántas subredes `/24` caben en un `/16`?

**Respuestas:** Una, mirar el valor de la máscara en el número donde cae la
frontera, y restarlo de 256. Dos, hasta `10.0.127.255`. Los bloques de un `/18`
son de 64, así que el siguiente empieza en 128. Tres, porque 50 no es múltiplo
de 64, y los bloques de un `/26` van de 64 en 64. Cuatro, 256. Un `/16` tiene
65.536 direcciones y un `/24` tiene 256.

## 🎒 Para pensar

Te dan `10.0.0.0/16` y te piden tres subredes: una para 1.000 máquinas, otra
para 300 y otra para 20. Elige el tamaño de cada una y decide dónde empieza
cada bloque, sin que se pisen. Después pregúntate algo incómodo: ¿en qué orden
conviene colocarlas para desperdiciar menos?
