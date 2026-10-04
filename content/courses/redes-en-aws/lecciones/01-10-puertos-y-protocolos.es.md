# 1.10 — Puertos y protocolos: qué es "el 443"

> Módulo 1 · Redes sin nube · Clase 10 de 13 · ⏱️ 8 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

Qué es un puerto y por qué la dirección sola no basta para entregar nada. Vas a
entender de dónde salen los números que escribirás en cada regla de
cortafuegos. Y vas a ver la diferencia entre TCP y UDP. Esa diferencia explica
por qué unas cosas se cortan y otras se ven a saltos.

## 🤔 Antes de empezar

1. En la clase 1.7 vimos qué ruta gana cuando un destino encaja en dos. ¿Cuál
   era la regla?
2. Una máquina puede estar sirviendo una página web y recibiendo correo a la
   vez. ¿Cómo sabe qué es cada cosa?
3. En una carta certificada firmas al recibirla. En una postal no. ¿Cuándo
   compensa cada forma?

## 📐 La idea

La dirección IP te lleva hasta la máquina. Eso es el edificio.

Pero dentro de una máquina hay muchos programas funcionando a la vez. Un
servidor web, una base de datos, un servicio de correo. Cuando llega un
paquete, alguien tiene que decidir a cuál de ellos se lo da.

Ese alguien usa el **puerto**. Es un número de 0 a 65535 que va escrito en cada
paquete, junto a la dirección. La dirección es el edificio y el puerto es el
número de oficina.

Un programa que quiere recibir conexiones **se pone a escuchar** en un puerto.
Desde ese momento, todo lo que llegue a ese número es suyo.

Algunos números están acordados por costumbre, y conviene saberse estos:

| Puerto | Para qué | Dónde lo verás |
|---|---|---|
| 22 | Entrar a una máquina por consola | Reglas de administración |
| 80 | Web sin cifrar | Casi siempre redirige al 443 |
| 443 | Web cifrada | La regla más escrita del mundo |
| 3306 | Base de datos MySQL | Reglas entre aplicación y datos |
| 5432 | Base de datos PostgreSQL | Lo mismo |

Ahí está la segunda pregunta del principio. La misma máquina atiende la web y
el correo porque cada servicio escucha en un número distinto.

La pareja de dirección y puerto es lo que identifica de verdad un extremo de
una conversación. `10.0.1.47:443` es una cosa concreta: el servicio web de esa
máquina.

## 🔬 En detalle

Falta una pieza. El paquete lleva **dos** puertos, no uno: el de destino y el
de origen.

El de destino es el conocido, el 443. El de origen lo elige tu máquina al azar
entre los números altos, por encima del 1024. A esos se les llama **puertos
efímeros**, porque duran lo que dura la conversación.

Eso es lo que permite tener tres pestañas abiertas en la misma web. Las tres
van al 443 del mismo servidor, y se distinguen por su puerto de origen. Es el
mismo truco de la tabla de la clase 1.9.

Guarda bien esa idea de los puertos efímeros. Es la que hace que la clase 1.12
tenga sentido.

La otra pieza es el **protocolo**, que es el acuerdo sobre cómo se habla. Hay
dos que cubren casi todo:

**TCP** (Transmission Control Protocol, protocolo de control de transmisión).
Antes de mandar nada, los dos extremos se saludan y confirman que están.
Después se van confirmando los trozos, y lo que se pierde se vuelve a pedir.
Llega todo y llega en orden. A cambio, es más lento y hay que esperar ese
saludo inicial.

**UDP** (User Datagram Protocol, protocolo de datagramas de usuario). Se manda
y ya. Nadie confirma nada. Si un trozo se pierde, se pierde. A cambio no hay
espera ni saludo previo.

Ahí está la tercera pregunta del principio:

| | TCP | UDP |
|---|---|---|
| Garantiza la entrega | Sí | No |
| Mantiene el orden | Sí | No |
| Hay saludo inicial | Sí | No |
| Se usa para | Web, correo, bases de datos | Vídeo en directo, juegos, DNS |

El criterio es sencillo de recordar. Si perder un trozo arruina el resultado,
TCP. Si llegar tarde es peor que perder algo, UDP. Una transferencia bancaria
no puede perder datos. Una videollamada prefiere saltarse un cuadro antes que
congelarse esperándolo.

Queda decir dónde deja de valer la analogía de la oficina. En un edificio, la
oficina 443 existe aunque no haya nadie dentro. Aquí el puerto no existe hasta
que un programa se pone a escuchar en él. Si no hay nadie, la máquina contesta
que ahí no hay nada, o directamente no contesta.

## 🗺️ Dónde aparece esto en AWS

Cada regla de un grupo de seguridad en AWS tiene exactamente esta forma:

```text
   Tipo          Protocolo   Puerto   Origen
   HTTPS         TCP         443      0.0.0.0/0
   SSH           TCP         22       203.0.113.5/32
   PostgreSQL    TCP         5432     sg-de-la-aplicacion
```

Ahora puedes leer las tres líneas enteras. La primera permite web cifrada desde
cualquier sitio del mundo. La segunda permite administración, pero solo desde
una dirección exacta, con el `/32` de la clase 1.4. La tercera permite llegar a
la base de datos solo desde otro grupo.

La consola rellena el protocolo y el puerto sola cuando eliges el tipo. Es
cómodo y esconde lo que está pasando, así que conviene saber qué hay debajo.

Un detalle que ahorra un diagnóstico largo. En un grupo de seguridad **no hace
falta abrir los puertos efímeros de vuelta**. En otro sitio de AWS sí hace
falta, y eso es exactamente lo que explica la clase siguiente.

## ⚠️ No lo confundas con

**Puerto con protocolo.** El protocolo es cómo se habla, el puerto es con quién.
Una regla necesita los dos. Decir "abre el 443" sin decir TCP está incompleto,
aunque casi siempre se sobrentienda.

**Abrir un puerto con que algo escuche.** Son dos cosas en sitios distintos.
Permite el 443 en todas las reglas del mundo. Si no hay ningún programa
escuchando ahí, no responde nadie. Pasa lo mismo al revés. Es el primer par que
hay que separar cuando algo no conecta.

**El número con el servicio.** Que el 443 sea web es una costumbre, no una ley.
Un servidor puede escuchar la web en el 8443 perfectamente. Las costumbres
ayudan a leer una regla de un vistazo, y nada más.

## 🔁 Autoevaluación

1. ¿Qué añade el puerto a lo que ya hacía la dirección?
2. ¿Cuántos puertos lleva un paquete, y cuáles son?
3. ¿Qué eliges si perder un trozo arruina el resultado?
4. Permites el 443 y la página no carga. ¿Qué otra cosa hay que comprobar?

**Respuestas:** Una, a qué programa de dentro de la máquina va el paquete. La
dirección llega al edificio y el puerto a la oficina. Dos, lleva dos. El de
destino, que es el conocido, y el de origen, elegido al azar entre los altos.
Tres,
TCP, porque confirma la entrega y mantiene el orden. Cuatro, que haya un
programa escuchando de verdad en ese puerto.

## 🎒 Para pensar

El DNS, que es la clase 1.11, usa UDP casi siempre. Es raro: perder una
consulta de DNS significa no encontrar la página. ¿Por qué crees que se eligió
el protocolo que no garantiza nada? Piensa en cuántas consultas hace tu
navegador al abrir una sola web, y en cuánto dura cada una.
