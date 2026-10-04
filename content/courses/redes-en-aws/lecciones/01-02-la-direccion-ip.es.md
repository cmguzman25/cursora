# 1.2 — La dirección IP: qué identifica y qué no

> Módulo 1 · Redes sin nube · Clase 2 de 13 · ⏱️ 9 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

Qué es una dirección IP, y sobre todo **qué no es**. Casi todo el mundo cree que
una IP identifica una máquina, o peor, a una persona. No identifica ninguna de
las dos cosas. Entender qué identifica de verdad te va a ahorrar media docena de
confusiones más adelante.

## 🤔 Antes de empezar

1. Si te cambian de escritorio en la oficina, ¿cambia tu nombre o cambia tu
   número de extensión?
2. Una persona puede tener teléfono fijo y móvil. ¿Cuál de los dos números "es"
   esa persona?
3. ¿Qué pasaría si dos casas de la misma calle tuvieran el mismo número?

## 📐 La idea

En la clase anterior quedó claro que una red necesita una forma de nombrar a
cada participante. La **dirección IP** es ese nombre. Las dos letras vienen de
*Internet Protocol*, el acuerdo que usan todas las redes del mundo para
entregar paquetes.

Se escribe como cuatro números separados por puntos. Por ejemplo
`192.168.1.10`, o `10.0.1.47`. Cada uno de los cuatro va de 0 a 255, y ninguno
puede pasarse.

Hasta aquí, lo que todo el mundo sabe. Ahora la parte que casi nadie dice.

**Una dirección IP no identifica una máquina. Identifica un punto de conexión a
una red.** Es el número del escritorio, no tu nombre.

Esa diferencia tiene tres consecuencias, y las tres te van a aparecer:

- Si una máquina se conecta a dos redes, tiene dos direcciones. Tu teléfono lo
  hace todos los días, con la red de casa y la de datos.
- Si mueves la máquina a otra red, su dirección cambia. El portátil no lleva su
  número puesto: se lo da la red donde entra.
- Si apagas la máquina y la enciende otra, esa otra puede recibir la misma
  dirección. El escritorio sigue ahí aunque cambie quién se sienta.

Ahí está la primera pregunta del principio. Te cambian de sitio y tu extensión
cambia, pero tú sigues siendo tú. La dirección describe **dónde estás
conectado**, no **quién eres**.

## 🔬 En detalle

Esos cuatro números no son una decisión de diseño caprichosa. Una dirección IP
es en realidad un número binario de **32 bits**. Escribirlo como treinta y dos
unos y ceros sería insufrible, así que se parte en cuatro grupos de ocho.

Cada grupo de ocho bits se llama **octeto**, y ahí sale el límite de 255. Con
ocho bits el número más grande que cabe es 255. No hay ninguna dirección que
lleve un 256, y si ves una, está mal escrita.

```text
   192  .  168  .    1  .   10
    │       │        │       │
 8 bits  8 bits   8 bits  8 bits   =  32 bits en total

 valor mínimo de cada octeto:   0
 valor máximo de cada octeto: 255
```

Con 32 bits salen unos 4.300 millones de direcciones distintas. Parecían
infinitas en 1981. Hoy hay más dispositivos conectados que direcciones. Ese
problema explica dos clases enteras de este módulo: la 1.8 y la 1.9.

Queda una pregunta por responder. ¿De dónde saca una máquina su dirección?

Hay dos caminos. En el primero se la pones tú a mano, y no cambia nunca. El
segundo es el habitual: la máquina la pide al entrar en la red. Alguien se la
presta un rato, y ese "alguien" suele ser el mismo aparato que te conecta a la
calle.

El segundo camino es el que hace que tu teléfono funcione en cualquier parte
sin que configures nada. También es el que hace que la dirección de tu portátil
cambie entre casa y la oficina. No es un fallo: es el diseño.

Y aquí la analogía del escritorio deja de valer, en el punto que más
desconcierta. Tu extensión es única en la empresa. Una dirección privada no es
única en el mundo: la misma `192.168.1.10` existe a la vez en millones de
casas. Suena imposible ahora mismo, y se resuelve en la clase 1.8.

Hay una regla que sí es absoluta, y es la tercera pregunta del principio. Dentro
de una misma red, **dos participantes no pueden tener la misma dirección**. Si
ocurre, los mensajes empiezan a llegar a quien no deben, de forma intermitente y
difícil de diagnosticar. Es el equivalente a dos casas con el mismo número.

Ojo con el matiz: la prohibición vale dentro de una misma red. En redes
distintas, la misma dirección puede repetirse sin problema. Eso parece una
contradicción ahora, y deja de parecerlo en la clase 1.8.

## 🗺️ Dónde aparece esto en AWS

Aquí es donde AWS se vuelve sorprendentemente literal, y donde mucha gente se
pierde por no saber lo de arriba.

En AWS, una dirección IP **no pertenece a la instancia**. Pertenece a una
tarjeta de red virtual, que se puede crear, desconectar y enchufar a otra
máquina. Esa tarjeta tiene nombre propio y vive en una red concreta.

De ahí salen cosas que parecen magia y no lo son. Una instancia puede tener dos
tarjetas y estar en dos redes a la vez. Puedes apagar una máquina, mover su
tarjeta a otra, y la dirección viaja con la tarjeta.

También explica un susto clásico. Si paras una instancia y la vuelves a
arrancar, su dirección pública puede cambiar. La privada no: esa la reserva la
red mientras la tarjeta exista. En la clase 2.8 verás cómo se fija una
dirección pública para que deje de cambiar.

Y lo de pedir la dirección prestada también pasa en AWS, aunque no se note. Tu
instancia arranca sin dirección y la pide, igual que tu teléfono en casa. La
diferencia es que quien se la presta es la propia red. Y siempre le da la
misma, mientras la tarjeta siga existiendo.

Por eso en AWS no se configura la dirección dentro de la máquina. Se decide
fuera, al crear la tarjeta. Si entras a una instancia y cambias su dirección a
mano, dejará de funcionar. La red de AWS solo entrega paquetes a la dirección
que ella misma asignó.

## ⚠️ No lo confundas con

**La dirección con el nombre.** `10.0.1.47` es la dirección. `servidor-web` es
un nombre que alguien inventó para no tener que recordarla. Traducir de uno a
otro es trabajo del DNS, y eso es la clase 1.11.

**Tu dirección con la que ve internet.** Si buscas "cuál es mi IP", la web te
dirá un número que **no está en ninguna de tus máquinas**. Es la del aparato que
te conecta a la calle. Todas las máquinas de tu casa comparten esa, y verás por
qué en la clase 1.9.

**Una dirección con una persona.** Una dirección identifica un punto de
conexión, y ese punto lo puede estar usando cualquiera. Lo comparte toda tu
casa, cambia cuando reinicias el aparato, y mañana lo puede tener otro cliente.

## 🔁 Autoevaluación

1. ¿Qué identifica exactamente una dirección IP?
2. ¿Por qué ningún octeto puede valer 256?
3. ¿Puede una misma máquina tener varias direcciones a la vez?
4. En AWS, ¿a qué pertenece la dirección privada de una instancia?

**Respuestas:** Una, un punto de conexión a una red. No una máquina y no una
persona. Dos, porque cada octeto son ocho bits, y el número más grande que cabe
en ocho bits es 255. Tres, sí, una por cada red a la que esté conectada. Tu
teléfono lo hace a diario. Cuatro, a la tarjeta de red virtual, no a la
instancia. Por eso la tarjeta se puede mover con su dirección a cuestas.

## 🎒 Para pensar

Mira la dirección que tiene ahora mismo tu computadora en casa. Casi seguro
empieza por `192.168`. Pregúntale a alguien que viva en otra ciudad por la suya.
Es muy probable que empiece igual, y puede que sea idéntica. ¿Cómo puede ser,
si hace un momento dijimos que dos participantes no pueden compartir dirección?
