# 1.13 — El viaje de un paquete, de punta a punta

> Módulo 1 · Redes sin nube · Clase 13 de 13 · ⏱️ 8 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a entender hoy

Las doce piezas anteriores, funcionando juntas. Vas a seguir un paquete desde
que escribes una dirección hasta que la página aparece. Al terminar, el módulo
1 deja de ser doce conceptos sueltos y pasa a ser un recorrido. Y ese recorrido
es el que vas a construir con tus manos en el módulo 2.

## 🤔 Antes de empezar

1. En la clase 1.9 vimos por qué nadie puede entrar desde fuera sin que le
   hayan pedido algo. ¿Cuál era el motivo?
2. Antes de seguir leyendo, intenta enumerar lo que pasa al abrir una web.
   ¿Cuántos pasos te salen?
3. ¿Qué parte de ese recorrido crees que falla más a menudo?

## 📐 La idea

Escribes `tienda.ejemplo.com` y pulsas enter. Esto es lo que ocurre, con el
número de la clase donde lo viste.

**Uno. Traducir el nombre.** Tu máquina no sabe qué es ese nombre. Pregunta al
intermediario de DNS y recibe una dirección, `203.0.113.40` (clase 1.11).

**Dos. ¿Vecino o no?** Compara esa dirección con la suya usando la máscara.
`203.0.113.40` no está en su barrio (clase 1.3).

**Tres. Al router.** Como no es vecino, se lo entrega a la puerta de enlace, la
dirección acabada en `.1` (clase 1.3).

**Cuatro. Elegir ruta.** El router mira su tabla. Ninguna fila concreta encaja,
así que gana `0.0.0.0/0` (clases 1.4 y 1.7).

**Cinco. Traducir la dirección.** Tu paquete lleva una dirección privada que
internet descarta. El aparato de la frontera la cambia por la pública y apunta
la traducción (clases 1.8 y 1.9).

**Seis. Cruzar internet.** Decenas de routers repiten el paso cuatro, cada uno
con su tabla. Ninguno conoce el camino completo (clase 1.7).

**Siete. De la puerta a la oficina.** El paquete ya llegó al edificio correcto,
que es la máquina. El puerto 443 dice a qué programa de dentro entregarlo
(clase 1.10).

**Ocho. Pasar el control.** Antes de entrar, un cortafuegos comprueba si está
permitido (clase 1.12).

Y entonces empieza la vuelta, que es donde está lo interesante.

## 🔬 En detalle

El camino de regreso no es el de ida al revés. Es un viaje nuevo, con sus
propias decisiones, y cada una puede fallar por su cuenta.

```text
   IDA                           VUELTA

   nombre → dirección            el servidor responde
   ¿vecino? → no                 ¿vecino? → no
   a la puerta de enlace         a su puerta de enlace
   ruta 0.0.0.0/0                ruta hacia tu dirección pública
   NAT: cambia el origen         llega al aparato de tu frontera
   cruza internet                NAT: busca la fila y la deshace
   puerto 443 → el programa      llega a tu máquina
   cortafuegos: ¿permitido?      cortafuegos: ¿permitido?
```

Fíjate en las dos filas del NAT. A la ida escribe la traducción, a la vuelta la
deshace. Si esa fila hubiera caducado, la respuesta llegaría y no habría a
quién dársela.

Y fíjate en los dos cortafuegos. Son dos comprobaciones distintas, en máquinas
distintas. Con estado, la de la vuelta pasa sola. Sin estado, hay que haberla
permitido (clase 1.12).

De todo esto sale lo más útil del módulo: **un orden para diagnosticar**. Cuando
algo no conecta, se comprueba en este orden, y no en otro:

| Orden | Pregunta | Si falla aquí |
|---|---|---|
| 1 | ¿El nombre resuelve? | Es DNS, y lo demás no importa todavía |
| 2 | ¿Hay ruta hacia el destino? | Falta una fila en una tabla |
| 3 | ¿Hay ruta de vuelta? | El clásico que nadie mira |
| 4 | ¿Lo permite el cortafuegos de ida? | Falta una regla |
| 5 | ¿Y el de vuelta? | Solo si es de los que no recuerdan |
| 6 | ¿Hay algo escuchando en ese puerto? | La red está bien, el programa no |

El orden importa por una razón práctica. Cada paso descarta una familia entera
de causas. Empezar por el final es lo que convierte un diagnóstico de cinco
minutos en una tarde perdida.

## 🗺️ Dónde aparece esto en AWS

Todo el recorrido existe en AWS, con otros nombres. Esta tabla es el puente
hacia el módulo 2, y conviene volver a ella cuando algo no cuadre:

| En el módulo 1 | En AWS | Clase |
|---|---|---|
| La red | La VPC | 2.1 |
| El barrio | La subred | 2.4 |
| La puerta de enlace | El router implícito de la VPC | 2.6 |
| La tabla de rutas | La tabla de rutas, igual | 2.6 |
| La salida a internet | El Internet Gateway | 2.7 |
| El NAT de la frontera | El NAT Gateway | 2.9 |
| Cortafuegos con estado | El grupo de seguridad | 3.1 |
| Cortafuegos sin estado | La lista de control de acceso | 3.4 |
| El intermediario de DNS | Route 53 | 7.5 |

Ninguna fila de esa tabla es una invención de Amazon. Son las mismas piezas de
siempre, con la diferencia de que no las montas: las declaras.

Esa es la idea con la que conviene cerrar el módulo. Lo que vas a hacer en la
consola no es aprender un producto. Es escribir, en los formularios de AWS, las
decisiones que acabas de entender.

## ⚠️ No lo confundas con

**El camino de ida con el de vuelta.** Son dos viajes independientes, y cada
uno puede romperse solo. Es la causa más frecuente de los fallos que parecen
imposibles. Por eso ocupa dos filas de la tabla de diagnóstico.

**Que algo no conecte con que la red falle.** La red puede estar perfecta y el
programa de destino apagado. Esa es la última fila de la tabla. Se comprueba la
última por un motivo: es la causa menos probable.

**Un diagnóstico con tocar cosas.** La tentación es cambiar una regla y probar.
Eso funciona a veces y esconde la causa siempre. Recorrer la tabla en orden es
más lento el primer día y mucho más rápido a partir del segundo.

## 🔁 Autoevaluación

1. ¿Qué es lo primero que hace tu máquina al escribir un nombre?
2. ¿Por qué el camino de vuelta puede fallar aunque la ida funcione?
3. ¿En qué orden se comprueban las causas cuando algo no conecta?
4. ¿Qué pieza de AWS se corresponde con el NAT de la frontera de tu casa?

**Respuestas:** Una, traducir el nombre a una dirección preguntando al DNS.
Dos, porque es un viaje nuevo, con su propia ruta y su propio cortafuegos.
Tres, primero el nombre. Después la ruta de ida y la de vuelta. Después el
permiso de ida y el de vuelta. Y por último, si hay algo escuchando. Cuatro, el
NAT Gateway, que verás en la clase 2.9.

## 🎒 Para pensar

Vuelve a la segunda pregunta del principio y mira tu lista. ¿Cuántos de los
ocho pasos tenías? ¿Cuál te faltaba? Guarda esa respuesta. Lo que no estaba en
tu lista es lo que vas a mirar el último cuando algo falle. Y con una
frecuencia incómoda, es justo donde está el problema.
