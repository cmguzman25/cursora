# 1.8 — IP pública e IP privada: dos mundos y un malentendido

> Módulo 1 · Redes sin nube · Clase 8 de 13 · ⏱️ 8 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

Por qué tu dirección empieza por `192.168` y la de alguien en otro continente
también. Vas a ver que hay dos mundos de direcciones con reglas distintas.
Y vas a deshacer el malentendido más peligroso de todo el curso: creer que
"privada" significa "protegida".

## 🤔 Antes de empezar

1. Al final de la clase 1.2 quedó una pregunta abierta sobre direcciones
   repetidas en casas distintas. ¿Qué respuesta se te ocurrió?
2. ¿Cuántos edificios del mundo crees que tienen un apartamento llamado "3B"?
3. Si alguien te dice que vive en el "3B", ¿puedes mandarle una carta?

## 📐 La idea

Las direcciones IP se parten en dos grupos, y la diferencia no está en cómo se
escriben. Está en **quién las respeta**.

**Direcciones públicas.** Son únicas en todo el planeta. Alguien las reparte y
lleva la cuenta. Si tienes una, nadie más la tiene, y cualquier router del
mundo sabe cómo llegar a ella.

**Direcciones privadas.** Son tres rangos apartados a propósito para uso
interno. Cualquiera puede usarlas en su casa o en su empresa, a la vez, sin
pedir permiso a nadie. Son los tres de esta tabla:

| Rango | Desde | Hasta | Dónde se ve |
|---|---|---|---|
| `10.0.0.0/8` | `10.0.0.0` | `10.255.255.255` | Empresas y nubes |
| `172.16.0.0/12` | `172.16.0.0` | `172.31.255.255` | Redes medianas |
| `192.168.0.0/16` | `192.168.0.0` | `192.168.255.255` | Casas y oficinas pequeñas |

La regla que lo cambia todo es esta: **ningún router de internet acepta
reenviar un paquete hacia una dirección privada**. Están acordadas como "esto
es de puertas adentro", y se descartan en la frontera.

Ahí están las dos preguntas del principio. Hay millones de apartamentos "3B" en
el mundo, y el nombre funciona perfectamente dentro de su edificio. Lo que no
puedes es mandar una carta solo con eso.

Y ahí está también la respuesta a lo que quedó abierto en la clase 1.2. Tu
`192.168.1.10` y la de alguien en otra ciudad pueden ser idénticas. Están en
redes distintas que no se ven entre sí. La regla de no repetir direcciones vale
dentro de una red, no entre redes separadas.

## 🔬 En detalle

Estos rangos no se apartaron por elegancia. Se apartaron porque las direcciones
se estaban acabando, y eso lo viste en la clase 1.2: solo hay 4.300 millones.

La cuenta no sale. Imagina que cada teléfono y cada televisión necesitara una
dirección única del mundo. Nos habríamos quedado sin ellas hace veinte años.

La solución fue repartir el problema. Cada casa y cada empresa usa direcciones
privadas por dentro, que no cuestan nada y se repiten libremente. Hacia fuera,
todos comparten unas pocas públicas. Así un edificio de cien máquinas consume
una sola dirección del mundo.

El reparto tiene un efecto secundario que conviene ver desde ya. Las
direcciones privadas son **gratis y abundantes**, y las públicas son escasas y
se pagan. El rango `10.0.0.0/8` te da dieciséis millones de direcciones sin
pedirle permiso a nadie.

Por eso en la nube nunca se escatima con las direcciones privadas. Pedir un
`/16` para una VPC que va a tener veinte máquinas no es derrochar: es dejarse
sitio. Lo que sí se escatima es lo público, y verás su precio en la clase 2.8.

Eso deja una pregunta obvia. Si mi máquina tiene una dirección que internet no
acepta, ¿cómo cargo una página? La respuesta ocupa la clase 1.9 entera, y se
llama NAT. El resumen por ahora: alguien cambia tu dirección por una pública al
salir, y la deshace al volver.

Hay un detalle que conviene fijar desde ya. Una máquina con dirección privada
**no tiene una dirección pública escondida**. No es que tenga las dos. Tiene
una, la privada, y otra cosa le presta la pública un momento al pasar.

La analogía del "3B" deja de valer en una cosa, y es importante. Dentro de un
edificio puedes preguntarle al portero por el 3B de otro edificio, y a lo mejor
te orienta. En internet no hay a quién preguntar. Los routers no es que no
sepan llegar a una dirección privada: es que tienen acordado no intentarlo.

## 🗺️ Dónde aparece esto en AWS

Cuando crees tu VPC vas a elegir un rango, y AWS te obliga a elegirlo de estos
tres. Por eso los ejemplos de este curso empiezan por `10.`. Es la costumbre en
la nube: es el rango más grande y deja sitio de sobra para crecer.

Hay dos consecuencias que vale la pena adelantar:

- Toda instancia nace con una dirección privada, y esa no se la quita nadie. Si
  además necesita hablar con internet, se le añade algo encima.
- Si dos VPC usan el mismo rango, **no se pueden conectar entre sí**. Es el
  problema de los rangos solapados, y en la clase 5.4 verás por qué no tiene
  una solución cómoda.

Por eso la elección del rango de una VPC parece trivial y no lo es. No estás
eligiendo un número bonito: estás decidiendo con quién vas a poder conectarte
dentro de tres años. La clase 2.2 va entera sobre eso.

## ⚠️ No lo confundas con

**Privada con segura.** Este es el error que más caro sale, así que conviene
decirlo sin rodeos. Que una máquina tenga dirección privada no la protege de
nada. Si algo ya está dentro de tu red, o si hay un camino abierto hacia ella,
la alcanza igual. Lo privado describe **cómo se enruta**, no quién tiene
permiso. El permiso es la clase 1.12.

**Privada con invisible.** Una dirección privada es perfectamente visible para
todos sus vecinos. Dentro del edificio, el "3B" lo encuentra cualquiera.

**Tu dirección pública con la de tu máquina.** La pública que ves al buscar
"cuál es mi IP" no está configurada en ninguna de tus máquinas. Es la del
aparato de la frontera, y la comparten todos los de la casa. Esto ya salió en
la clase 1.2, y ahora entiendes por qué pasa.

## 🔁 Autoevaluación

1. ¿Cuáles son los tres rangos privados?
2. ¿Qué hace un router de internet con un paquete dirigido a `10.0.1.5`?
3. ¿Por qué tu dirección de casa puede coincidir con la de otra persona?
4. ¿Protege algo tener una dirección privada?

**Respuestas:** Una, `10.0.0.0/8`, `172.16.0.0/12` y `192.168.0.0/16`. Dos, lo
descarta. Esas direcciones están acordadas como internas y no se reenvían.
Tres, porque están en redes distintas que no se ven entre sí. La regla de no
repetir vale dentro de una red. Cuatro, no. Describe cómo se enruta, no quién
tiene permiso para entrar.

## 🎒 Para pensar

Una empresa tiene dos oficinas y las dos usan `192.168.1.0/24`. Deciden unirlas
con un cable para que trabajen como una sola red. ¿Qué crees que pasa el primer
día? Piensa en una máquina `192.168.1.20` de la oficina A mandando algo a la
`192.168.1.20` de la oficina B.
