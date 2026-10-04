# 1.1 — Qué es una red: dos máquinas y un cable

> Módulo 1 · Redes sin nube · Clase 1 de 13 · ⏱️ 9 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

Qué es una red, en el sentido más literal. Vas a empezar con dos máquinas y un
cable. Vas a terminar entendiendo por qué una red necesita tres cosas y no una.
Es la clase que sostiene las doce siguientes. Todo lo que viene después
resuelve un problema que aparece hoy. Las direcciones, en la clase 1.2. Las
rutas, en la clase 1.7. Los cortafuegos, en la clase 1.12.

## 🤔 Antes de empezar

1. Si quisieras pasarle un archivo a la computadora de al lado sin internet,
   ¿qué harías?
2. En una oficina con cien personas, ¿cómo llega un sobre al escritorio
   correcto?
3. ¿Por qué un teléfono necesita un número y una casa necesita una dirección?

## 📐 La idea

Una red es un grupo de máquinas que pueden mandarse mensajes. Eso es todo.
No hace falta internet, ni nube, ni empresa que la venda. Dos computadoras y un
cable entre ellas ya son una red.

Con dos máquinas el problema es simple. Lo que sale por el cable solo puede
llegar a un sitio. No hay que decidir nada.

Mete una tercera y aparece el primer problema de verdad. Cada máquina necesita
un cable a cada una de las otras. Con tres son tres cables. Con diez son
cuarenta y cinco. Con cien, casi cinco mil. Conectar todo con todo no funciona.

La solución es poner algo en el medio. Un aparato al que todas se conectan, y
que reparte lo que recibe. Cada máquina tiene un solo cable, el que va al
centro:

```text
   sin nada en medio          con algo en medio

   A ───── B                    A       B
   │ ╲   ╱ │                     ╲     ╱
   │  ╲ ╱  │                      ╲   ╱
   │   ╳   │                     ┌──────┐
   │  ╱ ╲  │                     │      │
   │ ╱   ╲ │                      ╱   ╲
   C ───── D                    C       D

   6 cables, y crecen           4 cables, y crecen
   muy rápido                   de uno en uno
```

Pero el aparato del medio recibe un mensaje y tiene que decidir a quién se lo
entrega. Para eso el mensaje tiene que decir para quién es. Y para que pueda
decirlo, cada máquina necesita algo que la identifique.

Ahí está la segunda pregunta del principio. Un sobre llega al escritorio
correcto porque lleva escrito un nombre, y porque alguien lo lee y lo lleva.

Así que una red necesita tres cosas, no una:

- **Un camino** por el que pasen los mensajes.
- **Una forma de nombrar** a cada participante.
- **Algo que decida** por dónde va cada mensaje.

El resto de este módulo es exactamente eso. Las direcciones son la segunda. Las
rutas y los routers son la tercera. El camino lo da el cable, o lo da AWS.

## 🔬 En detalle

La analogía del sobre y la oficina te va a acompañar todo el curso. Conviene
saber desde ya dónde deja de valer.

Un sobre se entrega entero. Un mensaje de red casi nunca. Lo que mandas se
parte en trozos pequeños, y cada trozo viaja por su cuenta. A cada trozo se le
llama **paquete**. Es la unidad con la que vas a pensar de ahora en adelante.

Cada paquete lleva dos datos escritos delante: de quién viene y para quién es.
Como el remitente y el destinatario de un sobre. Esa parte de delante se escribe
siempre igual, y por eso cualquier aparato sabe leerla.

Que los trozos viajen por separado tiene una consecuencia incómoda. Pueden
llegar desordenados, o puede no llegar alguno. La red no lo garantiza. Alguien
tiene que darse cuenta y pedir el que falta, y eso lo verás en la clase 1.10.

Hay una segunda diferencia con la oficina. El aparato del medio no abre los
sobres ni entiende lo que dicen. Solo mira el destinatario y entrega. Esa
indiferencia es deliberada. Es la razón de que la misma red sirva para un
correo, una videollamada o una copia de seguridad.

Y queda una pregunta que la analogía esconde. ¿Cómo sabe el aparato del medio
por qué cable está cada máquina? Nadie se lo dijo al enchufarlo.

Lo aprende solo, y lo hace de la forma más simple posible. Cada vez que le
llega un paquete, mira **de quién viene** y apunta por qué cable entró. Así va
construyendo una lista de quién está dónde. Y si le llega algo para alguien que
todavía no conoce, lo manda por todos los cables menos uno. Por el que entró,
no. Después se queda con la respuesta y apunta también a ese.

Esa lista que se construye sola es la antepasada de las tablas de rutas de la
clase 1.7. La diferencia estará en que las tablas de rutas no se aprenden
solas: las escribes tú. Y en AWS las vas a escribir a mano.

## 🗺️ Dónde aparece esto en AWS

En AWS no vas a ver un cable nunca. Tampoco vas a comprar el aparato del medio,
ni a elegir dónde se enchufa. Amazon ya construyó el edificio entero, con su
cableado y sus aparatos, y lo comparte entre miles de clientes.

Lo que sí haces es decidir quién pertenece a tu red y quién puede hablar con
quién. Dibujas los límites sobre una infraestructura que ya existe.

Por eso en AWS las redes se **declaran**, no se montan. En el módulo 2 vas a
crear tu primera **VPC** (Virtual Private Cloud, nube privada virtual). Es el
nombre que le pone Amazon a una red tuya. No estarás construyendo nada físico.
Estarás diciendo "estas máquinas forman un grupo, y este es su plano de
direcciones".

De las tres cosas de la lista de arriba, AWS te regala la primera y te deja las
otras dos. Nombrar y decidir siguen siendo tu trabajo. Y como casi nadie te
explica esto, parece que la nube hubiera inventado reglas nuevas. No las
inventó: son las mismas de siempre, con otros botones.

## ⚠️ No lo confundas con

**Una red contra internet.** Internet no es una red. Es muchísimas redes
conectadas entre sí, que acordaron hablar igual. Tu casa tiene una red aunque
le cortes la fibra. Lo que pierdes al cortarla es la conexión con las demás.

**Estar conectado contra poder hablar.** Dos máquinas enchufadas al mismo
aparato están conectadas, y aun así pueden no entenderse. Les puede faltar una
dirección válida, o puede haber algo que lo impida a propósito. Esa diferencia
es la causa de la mitad de los problemas que vas a diagnosticar.

**La red contra lo que corre encima.** Que una página no cargue no significa
que la red falle. El camino puede estar perfecto y el servidor apagado.
Separar las dos cosas es el primer paso de cualquier diagnóstico.

## 🔁 Autoevaluación

1. ¿Qué tres cosas necesita una red para funcionar?
2. ¿Por qué no se conectan todas las máquinas entre sí directamente?
3. ¿Qué es un paquete, y qué lleva escrito delante?
4. De las tres cosas de la primera pregunta, ¿cuál te da AWS ya hecha?

**Respuestas:** Una, un camino, una forma de nombrar a cada participante y algo
que decida por dónde va cada mensaje. Dos, porque el número de cables crece
muchísimo más rápido que el de máquinas. Con cien harían falta casi cinco mil.
Tres, es un trozo de lo que mandas, y lleva delante de quién viene y para quién
es. Cuatro, el camino. Nombrar y decidir siguen siendo tuyos.

## 🎒 Para pensar

Piensa en tu casa. Cuenta cuántas cosas están en la misma red: teléfonos,
televisión, consola, el aparato que te dio la compañía. ¿Cuál de ellas hace de
aparato del medio? ¿Y cómo crees que sabe a cuál entregarle cada cosa, si todas
usan la misma conexión hacia la calle?
