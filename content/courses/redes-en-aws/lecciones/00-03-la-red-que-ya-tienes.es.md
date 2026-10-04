# 0.3 — Primer vistazo: la red que AWS ya te dio

> Módulo 0 · Preparar el terreno · Clase 3 de 3 · ⏱️ 8 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a lograr hoy

Vas a abrir la consola de red de AWS. Dentro hay una red que tu cuenta ya tiene
montada sin que tú hicieras nada. No vas a entender casi nada de lo que veas, y
ese es justo el objetivo. Al terminar tendrás la lista de las palabras que te
faltan, con la clase donde se explica cada una.

## 🤔 Antes de empezar

1. ¿Sabías que tu cuenta de AWS ya tiene una red creada desde el primer día?
2. Cuando entras a una herramienta nueva y ves diez palabras que no conoces,
   ¿qué sueles hacer?
3. ¿Qué crees que es más útil: que te expliquen algo y luego verlo, o verlo
   primero sin entenderlo y que te lo expliquen después?

## 📐 La idea

Cuando AWS te abre una cuenta, te crea una red completa en cada región, lista
para usar. Se llama la **VPC por defecto** (Virtual Private Cloud, nube privada
virtual). Existe para que puedas lanzar un servidor el primer día sin saber
nada de redes.

Es cómoda y es un problema a la vez. Cómoda porque funciona. Problema porque
funciona sin que sepas por qué. El día que algo falle, no tendrás ni idea de
dónde mirar.

Hoy no vas a tocarla. Solo vas a abrirla y leerla, como quien mira el cuadro
eléctrico de una casa nueva sin cambiar nada.

Y aquí está lo que de verdad importa de esta clase. Vas a ver un montón de
palabras que no significan nada para ti todavía. Eso no es un fallo tuyo ni una
señal de que vayas mal: es el punto de partida normal.

Ahí está la segunda pregunta del principio. Casi todo el mundo busca cada
palabra por separado y en orden aleatorio. Acaba con diez explicaciones sueltas
que no encajan entre sí.

Este curso hace lo contrario. Las ordena, y cada una llega cuando ya tienes lo
que hace falta para entenderla. Esa es toda la diferencia, y es la razón de que
el módulo 1 dure trece clases.

## 🛠️ Manos a la obra

> 📍 Región del curso: **us-east-1 (Norte de Virginia)**. Compruébala arriba a
> la derecha antes de empezar. Cada región tiene su propia red por defecto, así
> que si miras otra verás números distintos a los de esta clase.

**1.** En la barra de búsqueda de la consola escribe `VPC` y entra en el
servicio.

*Deberías ver:* un panel con un resumen de recursos. A la izquierda, un menú
con `Your VPCs`, `Subnets`, `Route tables` e `Internet gateways`.

**2.** Entra en `Your VPCs`. Verás una, marcada como `Default VPC: Yes`.

*Deberías ver:* una red con un rango que casi seguro es `172.31.0.0/16`. Anota
ese número, lo vas a reconocer en el módulo 1.

**3.** Entra en `Subnets`. Verás varias filas, no una.

*Deberías ver:* entre cuatro y seis filas. Cada una tiene un rango distinto
(`172.31.0.0/20`, `172.31.16.0/20`…) y está en una zona de disponibilidad
distinta. Fíjate en que los números no se repiten ni se solapan.

**4.** Entra en `Route tables` y abre la que aparece. Mira la pestaña `Routes`.

*Deberías ver:* exactamente dos filas. Una con destino `172.31.0.0/16` y target
`local`. Otra con destino `0.0.0.0/0` y un target que empieza por `igw-`.

**5.** Entra en `Internet gateways`.

*Deberías ver:* uno, en estado `Attached`, conectado a esa VPC. Es el mismo
`igw-` que acabas de ver en la tabla de rutas.

**6.** Vuelve a `Your VPCs`, selecciona la red y busca la pestaña
`Resource map`.

*Deberías ver:* un dibujo con la VPC, sus subredes y sus conexiones. Es la
misma red que acabas de recorrer a mano, de un vistazo.

## ▶️ Compruébalo

No hay nada que haya salido bien o mal, porque no has creado nada. Lo que sí
tienes que poder hacer es copiar estos cuatro datos de tu cuenta:

```text
   Rango de la VPC por defecto    172.31.0.0/16
   Número de subredes             (cuenta las filas)
   Filas de la tabla de rutas     2
   Internet gateways              1, en estado Attached
```

Y ahora el entregable de verdad de esta clase: **el mapa de lo que no
entiendes**. Cada palabra que acabas de ver, con la clase que la explica.

| Lo que viste | Qué es, por ahora | Se explica en |
|---|---|---|
| `172.31.0.0` | Una dirección IP | clase 1.2 |
| `/16`, `/20` | La notación CIDR | clase 1.4 |
| Subnet | Una subred | clase 1.5 |
| Route table, target | Una tabla de rutas | clase 1.7 |
| `local` | El router interno de la red | clase 1.7 |
| `0.0.0.0/0` | La ruta por defecto | clase 1.4 |
| `igw-`, Internet gateway | La salida a internet | clase 2.7 |
| Security group | Un cortafuegos con memoria | clase 1.12 |
| Zona de disponibilidad | Dónde está físicamente cada subred | clase 1.5 |

Guarda esta tabla. Es el índice de tu propia confusión, y en trece clases vas a
poder tacharla entera.

Fíjate en una cosa antes de cerrar. Ocho de las nueve filas se explican en el
módulo 1, que no toca la consola. Solo una es propia de AWS. Eso dice algo
importante: lo que te falta no es AWS, son redes.

## 🧯 Si algo se rompe

**No aparece ninguna VPC.**
Causa: alguien borró la red por defecto, o la cuenta es de una organización que
las crea sin ella. Es más común de lo que parece en cuentas de empresa.
Arreglo: no hace falta arreglarlo. En el módulo 2 vas a construir la tuya desde
cero, que es lo que de verdad importa. Lee esta clase y sigue.

**Ves muchas más VPC de las que esperabas.**
Causa: es una cuenta compartida o con cosas creadas antes.
Arreglo: fíjate solo en la que diga `Default VPC: Yes` y deja el resto en paz.

**Los números no coinciden con los de esta clase.**
Causa: casi siempre, estás en otra región.
Arreglo: cambia a `us-east-1` arriba a la derecha. Si sigues viendo otro rango,
no pasa nada: lo que importa es la forma, no el número exacto.

## 🧹 Qué se queda encendido

**Qué creaste:** nada. Esta clase es de solo mirar.

**Qué se borra ahora:** nada, y conviene insistir en una cosa. **No borres la
VPC por defecto.** No cuesta dinero, y en el módulo 2 vas a construir la tuya
al lado sin tocar esta.

**Qué se queda vivo:** no queda nada encendido por tu parte. La red por defecto
ya estaba ahí antes de esta clase, y es gratis. Una VPC, sus subredes, sus
tablas de rutas y su gateway no se cobran por existir.

**Comprueba que no quedó nada de más:** entra en `Your VPCs` y confirma que
sigue habiendo las mismas que al empezar.

## 🔁 Autoevaluación

1. ¿Qué es la VPC por defecto y por qué existe?
2. ¿Cuántas subredes tiene, y qué las diferencia entre sí?
3. ¿Cuántas filas tiene su tabla de rutas, y qué significa que haya dos?
4. ¿Por qué esta clase te pide mirar algo que todavía no entiendes?

**Respuestas:** Una, una red completa que AWS crea en cada región al abrir la
cuenta. Existe para que puedas lanzar un servidor sin saber de redes. Dos, una
por zona de disponibilidad, cada una con un rango distinto que no se solapa con
los demás. Tres, tiene dos filas. Una para el tráfico de dentro de la red, y
otra para todo lo demás, que sale a internet. Cuatro, porque ver primero hace
que la explicación tenga dónde agarrarse después.

## 🎒 Para pensar

Mira otra vez la tabla de rutas, la de dos filas. Una dice `172.31.0.0/16` y la
otra dice `0.0.0.0/0`. Si llega algo para la dirección `172.31.5.9`, las dos
filas podrían valer. ¿Cuál crees que gana, y por qué? No busques la respuesta:
apúntala y compárala en la clase 1.7.
