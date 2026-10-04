# 1.3 — La máscara: dónde termina tu red y empieza el mundo

> Módulo 1 · Redes sin nube · Clase 3 de 13 · ⏱️ 9 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

Por qué una dirección sola no sirve de nada. Y qué es esa cosa llamada
**máscara** que siempre aparece a su lado. Al terminar vas a poder responder la
única pregunta que tu máquina se hace antes de mandar algo. Esa pregunta es:
"¿esto es para un vecino, o se lo doy al router?".

## 🤔 Antes de empezar

1. Si te doy el número de teléfono `4567`, ¿puedes llamar? ¿Qué te falta?
2. Viendo dos direcciones postales, ¿cómo sabes si están en el mismo barrio?
3. Cuando mandas algo por correo dentro de tu propio edificio, ¿lo llevas al
   buzón de la calle o lo subes tú?

## 📐 La idea

Una dirección como `10.0.1.47` lleva dos partes metidas dentro. A simple vista
no se ve dónde acaba una y empieza la otra:

- La parte de **red**. El barrio. La comparten todos los que están juntos.
- La parte de **máquina**. El número de casa dentro de ese barrio. Es distinta
  para cada uno.

El problema es que la dirección no trae una marca que diga dónde está el corte.
`10.0.1.47` podría ser "barrio `10`, casa `0.1.47`" o "barrio `10.0.1`, casa
`47`". Son situaciones completamente distintas.

La **máscara de subred** es lo que marca el corte. Se escribe igual que una
dirección, y la más común con diferencia es `255.255.255.0`.

No te preocupes todavía por la palabra "subred" de ese nombre. Es el término
que se usa, y cobrará sentido en la clase 1.5. Hoy puedes llamarla máscara a
secas.

Se lee así: donde hay 255, esa parte es del barrio. Donde hay 0, esa parte es
del número de casa.

```text
   dirección:  10 . 0 . 1 . 47
   máscara:   255 .255.255.  0
               ───────────   ──
                  barrio     casa

   barrio: 10.0.1        casa: 47
```

Con esa máscara, `10.0.1.47` y `10.0.1.200` son vecinos: comparten barrio.
Pero `10.0.1.47` y `10.0.2.200` no lo son. Mira el tercer número: cambia de 1 a
2, y el tercer número es parte del barrio.

## 🔬 En detalle

Toda esta historia existe para que tu máquina pueda contestar **una sola
pregunta**. La contesta antes de mandar absolutamente cada paquete:

> ¿El destino está en mi mismo barrio, sí o no?

Si la respuesta es sí, lo entrega directamente. El vecino está ahí al lado.

Si la respuesta es no, tu máquina no tiene ni idea de cómo llegar. Así que hace
lo único sensato: se lo da al **router** y se desentiende.

Del router solo necesitas saber hoy una cosa. Es una máquina conectada a dos
redes a la vez, y por eso puede pasar cosas de una a otra. Es el aparato al que
se le da todo lo que no es del barrio. La clase 1.7 va entera sobre él.

Ahí está la tercera pregunta del principio. Lo de tu edificio lo subes tú, lo
de fuera va al buzón de la calle.

Esa decisión, repetida miles de veces por segundo, es casi todo lo que hace una
máquina en una red. Se toma comparando el destino con la dirección propia,
usando la máscara como plantilla.

Veamos los tres casos, con la misma máquina `10.0.1.47` y máscara
`255.255.255.0`:

| Destino | ¿Mismo barrio? | Qué hace |
|---|---|---|
| `10.0.1.200` | Sí, `10.0.1` coincide | Se lo entrega directamente |
| `10.0.2.200` | No, cambia el tercero | Se lo da al router |
| `8.8.8.8` | No, cambia todo | Se lo da al router |

Fíjate en algo importante. La máquina **no sabe** si `10.0.2.200` existe, ni
dónde está, ni si se puede llegar. No es su problema. Solo sabe que no es un
vecino, y que para eso está el router.

Esa ignorancia deliberada es lo que hace que la red escale. Ninguna máquina
necesita conocer el mapa completo. Solo necesita saber quién es su vecino y a
quién molestar cuando no lo es.

Lo cual deja un cabo suelto. Si el destino no es un vecino, tu máquina se lo da
al router. Pero el router también es una máquina con su propia dirección. ¿Cómo
sabe la tuya cuál es?

No lo adivina. Se lo tienen que decir. Esa dirección se llama **puerta de
enlace predeterminada**. Es el tercer dato que toda máquina necesita para
funcionar en una red. Los tres son estos:

| Dato | Qué dice | Ejemplo |
|---|---|---|
| Dirección | Quién soy | `10.0.1.47` |
| Máscara | Dónde está la frontera de mi barrio | `255.255.255.0` |
| Puerta de enlace | A quién le doy lo que no es del barrio | `10.0.1.1` |

Fíjate en que la puerta de enlace **está dentro del barrio**. Tiene que
estarlo, porque tu máquina solo sabe entregar directamente a sus vecinos. Si la
puerta de enlace estuviera fuera, haría falta una puerta de enlace para llegar
a la puerta de enlace.

Por costumbre se le suele dar la primera dirección utilizable del rango, la
que acaba en `.1`. No es una regla, es una convención. En AWS se cumple
siempre, y en la clase 2.5 verás por qué ahí no es negociable.

Antes de seguir, conviene decir dónde deja de valer la analogía del barrio. Un
barrio real lo dibuja la geografía, y se ve al asomarse a la ventana. Aquí la
frontera la decide un número que alguien escribió. Cambia la máscara y el
barrio cambia, sin que ninguna máquina se haya movido de sitio.

## 🗺️ Dónde aparece esto en AWS

Cuando crees una subred en AWS, le darás un rango como `10.0.1.0/24`. Ese `/24`
es la máscara, escrita de otra forma, y la clase 1.4 va entera sobre esa
notación.

Lo que importa hoy es la consecuencia. Dos instancias en la **misma subred** se
hablan directamente, sin que nada decida por ellas. Dos instancias en subredes
**distintas** necesitan que alguien enrute. Eso vale aunque estén en la misma
VPC y a un metro de distancia.

Por eso "¿están en la misma subred?" es la primera pregunta ante un problema de
conectividad en AWS. La respuesta cambia qué piezas intervienen, y por tanto
dónde hay que mirar.

La puerta de enlace también existe en AWS, y no la configuras tú. Cada subred
tiene la suya, siempre en la primera dirección **utilizable** del rango. En
`10.0.1.0/24` es la `10.0.1.1`, porque la `10.0.1.0` es el nombre del barrio.
AWS se la entrega a cada instancia automáticamente.

No es un aparato que puedas ver en la consola: es una función repartida por la
red de Amazon. La llaman el router implícito de la VPC. Es la razón de que dos
subredes de la misma VPC se hablen sin que hagas nada.

## ⚠️ No lo confundas con

**La máscara con la dirección.** Se escriben igual y no son lo mismo. La
dirección dice quién eres. La máscara dice dónde está la frontera. Las dos
máquinas de una misma red tienen direcciones distintas y la **misma** máscara.

**Mismo barrio con mismo cable.** Dos máquinas pueden estar enchufadas al mismo
aparato y tener máscaras que las ponen en barrios distintos. Entonces no se
hablan directamente, aunque el cable sea el mismo. La frontera es lógica, no
física, y esa es justo la idea que hace posible la nube.

**Más máscara con más seguridad.** La máscara no protege nada. Solo decide
quién es vecino de quién. Impedir que dos máquinas se hablen es otro asunto, y
es la clase 1.12.

## 🔁 Autoevaluación

1. ¿Qué dos partes lleva dentro una dirección IP?
2. ¿Qué pregunta responde una máquina usando la máscara?
3. Con máscara `255.255.255.0`, ¿son vecinas `10.0.5.9` y `10.0.6.9`?
4. ¿Qué hace una máquina cuando el destino no está en su barrio?

**Respuestas:** Una, la parte de red y la parte de máquina. El barrio y el
número de casa. Dos, si el destino está en su mismo barrio o no. Tres, no. El
tercer número cambia, y con esa máscara el tercer número es parte del barrio.
Cuatro, se lo entrega al router y se desentiende. No sabe si el destino existe
ni cómo llegar, y no le hace falta saberlo.

## 🎒 Para pensar

Imagina dos máquinas con la misma dirección de barrio pero máscaras distintas.
La primera cree que son vecinas y le manda un paquete directo. La segunda cree
que no lo son y contesta a través del router. ¿Funcionaría la conversación?
Piensa en la ida y en la vuelta por separado.
