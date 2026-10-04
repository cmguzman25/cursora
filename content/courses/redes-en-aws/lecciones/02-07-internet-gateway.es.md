# 2.7 — Internet Gateway: qué hace pública a una subred

> Módulo 2 · La VPC · Clase 7 de 11 · ⏱️ 9 min de lectura · 💚 Costo: $0

## 🎯 Qué vas a lograr hoy

Vas a responder una pregunta que casi nadie sabe contestar: **qué hace que una
subred sea pública**. No es una casilla. No es el nombre que le pusiste. Al
terminar vas a tener un Internet Gateway conectado a tu VPC y una ruta que lo
usa. Y vas a poder señalar con el dedo la única línea que convierte una subred
en pública.

## 🤔 Antes de empezar

1. En tu casa, ¿qué pasaría si tu router tuviera cable de fibra pero nadie le
   hubiera dicho a tu computadora que ese router existe?
2. Cuando seguiste el viaje de un paquete, apareció una ruta que servía para
   "todo lo demás". ¿Para qué hacía falta, si ya había rutas concretas?
3. Un edificio de oficinas tiene una puerta a la calle. ¿Alcanza con eso para
   que alguien salga desde una oficina del piso nueve?

## 📐 La idea

Hasta ahora tu VPC es un edificio cerrado. Tiene pisos y oficinas, que son las
subredes. Tiene pasillos internos, que son la ruta `local` que viste en la clase
anterior. Lo que no tiene es puerta a la calle.

El **Internet Gateway** (puerta de enlace a internet) es esa puerta. Se crea
aparte y después se conecta a una VPC. Una VPC puede tener uno solo, y un
gateway puede estar conectado a una sola VPC a la vez.

Pero aquí está la parte que confunde a todo el mundo. **Poner la puerta no abre
el camino hasta ella.** Un empleado del piso nueve necesita además que alguien
le diga por dónde se baja. Eso es la tabla de rutas.

Y esa es la definición real, la que casi nadie dice en voz alta:

> Una subred es pública **si su tabla de rutas tiene una ruta hacia un Internet
> Gateway**. Nada más. No hay una casilla llamada "pública" en ninguna parte de
> la consola.

La ruta que se añade es la ruta por defecto, `0.0.0.0/0`. Significa "cualquier
destino". Ahí está la tercera pregunta del principio. La puerta existe, pero
hace falta el cartel que diga que se sale por ahí.

Así se ve tu red hoy, con la pieza nueva marcada:

```text
   ┌─ VPC redes-vpc-principal  10.0.0.0/16 ──────────────┐
   │                                                     │
   │  ┌── redes-subred-publica-a ──┐                     │
   │  │  10.0.1.0/24               │                     │
   │  │  tabla: redes-rt-publica   │                     │
   │  │    10.0.0.0/16 → local     │                     │
   │  │    0.0.0.0/0   → igw   ◄── NUEVO                 │
   │  └────────────────────────────┘                     │
   │                                                     │
   │  ┌── redes-subred-privada-a ──┐                     │
   │  │  10.0.11.0/24              │                     │
   │  │  tabla: redes-rt-privada   │                     │
   │  │    10.0.0.0/16 → local     │  (sin salida)       │
   │  └────────────────────────────┘                     │
   │                                                     │
   └──────────────────┬──────────────────────────────────┘
                      │  redes-igw   ◄── NUEVO
                   internet
```

Hay una segunda cosa que el gateway hace y que la analogía de la puerta no
cubre. Tu instancia no tiene una dirección pública en su tarjeta de red: por
dentro solo conoce su `10.0.1.x`. Cuando el paquete sale, el gateway **cambia la
dirección de origen** por la dirección pública. Cuando vuelve la respuesta, hace
el cambio al revés. Es una traducción uno a uno, invisible desde dentro.

## 🛠️ Manos a la obra

> 📍 Región del curso: **us-east-1 (Norte de Virginia)**. Compruébala arriba a
> la derecha antes de empezar. Crear algo en otra región y después no
> encontrarlo es el error más común al principio.

**1.** Entra en `VPC → Internet gateways → Create internet gateway`.

| Campo | Valor |
|---|---|
| Name tag | `redes-igw` |
| Etiqueta extra | Clave `curso`, valor `redes-aws` |

*Deberías ver:* el gateway creado, con el estado **Detached**. Existe, pero
todavía no pertenece a ninguna red. Una puerta apoyada en el suelo.

**2.** Con el gateway seleccionado, entra en `Actions → Attach to VPC`. Elige
`redes-vpc-principal` y confirma.

*Deberías ver:* el estado pasa a **Attached**, y aparece el identificador de tu
VPC al lado.

**3.** Ve a `VPC → Route tables` y selecciona `redes-rt-publica`, la que creaste
en la clase anterior. Abre la pestaña `Routes` y pulsa `Edit routes`.

*Deberías ver:* una sola fila, `10.0.0.0/16` con destino `local`. Esa fila no se
puede borrar ni cambiar.

**4.** Pulsa `Add route` y rellena la fila nueva.

| Campo | Valor |
|---|---|
| Destination | `0.0.0.0/0` |
| Target | `Internet Gateway` y después `redes-igw` |

Guarda con `Save changes`.

**5.** Antes de seguir, abre la pestaña `Subnet associations` de esa misma
tabla. Tiene que aparecer `redes-subred-publica-a`, y solo esa.

*Deberías ver:* una subred asociada. Si aparece la privada, la acabas de volver
pública sin querer. Mira el primer fallo de la sección de abajo.

**6.** Ahora abre `redes-rt-privada` y mira sus rutas. No toques nada. Compara:
una tabla tiene dos filas y la otra tiene una. Esa diferencia es todo.

**7.** Falta un detalle. Entra en `VPC → Subnets`, selecciona
`redes-subred-publica-a` y ve a `Actions → Edit subnet settings`. Marca
`Enable auto-assign public IPv4 address` y guarda.

*Deberías ver:* en el resumen de la subred, `Auto-assign public IPv4 address:
Yes`. Sin esto, las instancias que lances ahí nacerían sin dirección pública. Y
una instancia sin dirección pública no puede usar la puerta.

## ▶️ Compruébalo

Abre `redes-rt-publica` y mira la pestaña `Routes`. Tiene que haber exactamente
dos filas, las dos con estado `Active`:

```text
Destination      Target          Status
10.0.0.0/16      local           Active
0.0.0.0/0        igw-0a1b2c3d…   Active
```

Y `redes-rt-privada` tiene que seguir teniendo una sola:

```text
Destination      Target          Status
10.0.0.0/16      local           Active
```

Eso es todo lo que distingue una subred pública de una privada en AWS.

Todavía no hay tráfico que probar, porque no hay ninguna máquina dentro. La
prueba de verdad, con una instancia que responde desde internet, es la clase
2.8. Hoy la comprobación es de lectura. Así se diagnostica la mayoría de los
problemas de red en el trabajo real: mirando la tabla, no lanzando pings.

## 🧯 Si algo se rompe

**Añadiste la ruta y ahora la subred privada también sale a internet.**
Causa: pusiste la ruta en la tabla principal, no en `redes-rt-publica`. La tabla
principal se aplica a toda subred que no tenga otra asociada explícitamente.
Arreglo: borra la ruta `0.0.0.0/0` de la tabla principal y añádela en
`redes-rt-publica`. Después comprueba sus asociaciones.

**El gateway no aparece en la lista de destinos al añadir la ruta.**
Causa: está creado pero no conectado a esta VPC. Solo se ofrecen los que están
en estado `Attached`.
Arreglo: vuelve al paso 2.

**La ruta aparece con estado `Blackhole`.**
Causa: la ruta apunta a algo que ya no está ahí, casi siempre un gateway que se
desconectó. Los paquetes que la toman se descartan en silencio.
Arreglo: vuelve a conectar el gateway, o borra la ruta. `Blackhole` es la
palabra que más vas a ver en tus diagnósticos, y siempre significa lo mismo.

**No te deja conectar el gateway a la VPC.**
Causa: ya hay otro gateway conectado a esa VPC. Solo se admite uno.
Arreglo: busca el que sobra en la lista y bórralo, si no lo usa nadie.

## 🧹 Qué se queda encendido

**Qué creaste:** el Internet Gateway `redes-igw`, una ruta en
`redes-rt-publica` y un ajuste en la subred pública.

**Qué se borra ahora:** nada. Todo lo de hoy hace falta para el resto del
módulo.

**Qué se queda vivo:**

| Recurso | Costo mientras vive | Se borra en |
|---|---|---|
| `redes-igw` | Gratis. Un gateway no se cobra | la 8.6 |
| Ruta `0.0.0.0/0` | Gratis | la 8.6 |

Conviene entender por qué esto es gratis, porque es la excepción. El gateway no
cuesta nada: no es una máquina tuya, es una capacidad de la red de AWS. Lo que
sí se cobra es la **salida de datos** hacia internet, por gigabyte. Entrar es
gratis y salir se paga, y eso vale para toda la nube.

**Comprueba que no quedó nada de más:** en `VPC → Internet gateways`, filtra por
la etiqueta `curso = redes-aws`. Tiene que haber uno, y en estado `Attached`.

## 🔁 Autoevaluación

1. ¿Qué hace exactamente que una subred sea pública?
2. Creaste un gateway y lo conectaste, pero ninguna instancia sale a internet.
   ¿Qué es lo primero que miras?
3. ¿Qué significa que una ruta esté en estado `Blackhole`?
4. Una instancia en la subred pública nace sin dirección pública. ¿Qué ajuste
   falta?

**Respuestas:** Una, que su tabla de rutas tenga una ruta hacia un Internet
Gateway. No existe ninguna casilla de subred pública en ninguna parte. Dos, qué
tabla de rutas tiene asociada esa subred concreta. La confusión habitual es
haber añadido la ruta en la tabla principal. Tres, que la ruta apunta a un
destino que ya no existe. Los paquetes que la toman se descartan sin aviso.
Cuatro, falta activar `Auto-assign public IPv4 address` en la subred. También
puedes darle una dirección a mano al crear la instancia.

## 🎒 Para pensar

Una subred es pública solo por tener esa ruta. ¿Qué pasaría si se la quitaras a
una subred con servidores ya funcionando? Piensa en dos cosas por separado. Las
conexiones que entran desde fuera, y las que la propia máquina abre. No son el
mismo caso, y la diferencia va a importar mucho cuando veas el NAT Gateway.
