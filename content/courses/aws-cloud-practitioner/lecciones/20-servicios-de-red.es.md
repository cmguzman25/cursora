# 3.5 — Servicios de red

> Dominio 3 · Task Statement 3.5 — Identify AWS network services

## 🤔 Antes de empezar

- Si alquilás oficinas en un edificio compartido, ¿te gustaría que tus vecinos pudieran entrar a las tuyas?
- ¿Qué diferencia hay entre un guardia en la puerta de cada oficina y un guardia en la entrada del piso?
- Si tu empresa manda muchísima información a AWS todos los días, ¿te fiarías de internet común para eso?

## 📘 Contenido

Hasta ahora vimos dónde corre tu programa y dónde se guardan los datos. Falta
lo que los conecta: **la red**. Es el tema más técnico del módulo, pero el
examen solo pide reconocer para qué sirve cada pieza.

### VPC: tu propio pedazo de red privada

Una **VPC** (*Virtual Private Cloud*) es una red privada tuya dentro de AWS.
Aunque la infraestructura sea compartida con otros clientes, tu VPC está
aislada: nadie de afuera entra salvo que vos lo permitas.

Es tu oficina dentro de un edificio compartido. El edificio es de todos; tu
oficina, no.

Dentro de la VPC, la red se divide en **subredes**:

- **Subred pública:** lo que va ahí puede alcanzarse desde internet. Es la
  recepción, de cara a la calle. Ahí van los servidores web.
- **Subred privada:** no es alcanzable desde internet. Es la oficina del
  fondo. Ahí van las bases de datos, que nadie de afuera debería tocar
  directamente.

Esa separación —**web adelante, base de datos atrás**— es una de las ideas de
diseño que más aparece en el examen.

Para que la subred pública pueda hablar con internet hace falta una **puerta
de enlace a internet** (*internet gateway*), que es literalmente la puerta de
entrada del edificio.

Queda una duda razonable: si la subred privada no toca internet, ¿cómo hace
un servidor de ahí para bajar una actualización de seguridad? Para eso está
la **puerta de enlace NAT** (*NAT gateway*): deja que los de adentro
**salgan** a internet, pero no permite que nadie de afuera **entre**. Es la
puerta de servicio por la que los empleados salen a la calle y que no tiene
picaporte del lado de afuera.

### Security groups y NACL: los dos guardias

Acá está la segunda pregunta del principio, y es la comparación estrella del
tema.

- Un **security group** es el guardia en la puerta **de cada oficina**.
  Protege un recurso puntual (una instancia). Solo sabe **permitir**: lo que
  no está permitido, no entra. Y **recuerda** quién entró, así que si dejaste
  pasar una visita, la respuesta sale sin necesidad de otra regla.
- Una **NACL** (*Network Access Control List*) es el guardia en la entrada
  **del piso entero**. Protege una subred completa. Puede **permitir y también
  negar** expresamente, y **no recuerda** nada: la entrada y la salida se
  controlan por separado.

Puesto en tabla:

| | Security group | NACL |
|---|---|---|
| ¿Qué protege? | Un recurso (una instancia) | Una subred completa |
| ¿Puede negar? | No, solo permitir | Sí, permitir y negar |
| ¿Recuerda la conexión? | Sí | No |
| Analogía | Guardia de la oficina | Guardia del piso |

Si una pregunta menciona **bloquear expresamente** una dirección concreta, la
respuesta es NACL, porque el security group no sabe negar.

No son alternativas: se usan las dos capas juntas. La NACL filtra a lo grande
en el borde de la subred, y el security group afina quién puede llegar a cada
recurso puntual. Un pedido tiene que pasar por las dos para entrar.

### Conectar tu edificio con AWS

Tercera pregunta: mucha información viajando todos los días. Hay dos formas de
unir la red de tu empresa con tu VPC:

- **AWS Site-to-Site VPN:** un túnel cifrado que viaja **por internet**. Se
  activa rápido y sale barato, pero comparte camino con todo el mundo, así que
  la velocidad varía.
- **AWS Direct Connect:** un **cable dedicado** entre tu edificio y AWS. No
  pasa por internet, así que el rendimiento es constante y previsible. Tarda
  semanas en instalarse y cuesta bastante más.

La regla: **si el escenario pide rendimiento estable, previsible o mucho
volumen constante, es Direct Connect. Si pide algo rápido y económico, es
VPN.**

### Route 53 y CloudFront

Faltan dos servicios que trabajan del lado del usuario:

- **Amazon Route 53** es el **DNS** de AWS: traduce el nombre que la gente
  escribe (`mitienda.com`) a la dirección técnica del servidor. Es la guía
  telefónica de internet. También sirve para registrar dominios y para enviar
  a cada usuario al servidor que le convenga.
- **Amazon CloudFront** es la red de entrega de contenido que usa las
  **ubicaciones de borde** de la lección 3.2: guarda copias de tu contenido
  cerca del usuario para que llegue rápido. Es donde se conecta **AWS WAF**,
  como vimos en la 2.4a.

Los dos suelen aparecer juntos en las opciones porque los dos "hacen que el
sitio ande mejor", pero atacan cosas distintas: Route 53 resuelve **a qué
dirección ir**, y CloudFront resuelve **desde dónde se entrega el contenido**
una vez que ya sabés adónde ir.

**En resumen:** una VPC es tu red privada dentro de AWS, dividida en subredes
públicas (de cara a internet) y privadas (protegidas). Los security groups
cuidan recursos individuales y solo permiten; las NACL cuidan subredes enteras
y además pueden negar. Para unir tu empresa con AWS, la VPN va por internet y
Direct Connect por un cable dedicado. Route 53 traduce nombres en direcciones,
y CloudFront acerca el contenido al usuario.

## 💬 Ahora te toca a ti

**Pregunta:** Si alquilás oficinas en un edificio compartido, ¿te gustaría que
tus vecinos pudieran entrar a las tuyas?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No, y por eso existe la **VPC**: aunque la
infraestructura física de AWS sea compartida entre muchos clientes, tu VPC es
una red privada aislada donde nadie entra salvo que vos lo habilites. Dentro
se divide en **subredes públicas**, alcanzables desde internet, donde van los
servidores web, y **subredes privadas**, donde conviene poner las bases de
datos para que nadie de afuera llegue a ellas directamente.

**Pregunta:** ¿Qué diferencia hay entre un guardia en la puerta de cada
oficina y un guardia en la entrada del piso?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El de cada oficina protege un recurso puntual; el del
piso protege a todos los de esa planta. En AWS, el primero es el **security
group**, que se aplica a una instancia, **solo permite** y recuerda las
conexiones que dejó pasar. El segundo es la **NACL**, que se aplica a una
subred entera, **puede negar expresamente** y no recuerda nada, así que la
entrada y la salida se controlan por separado.

**Pregunta:** Si tu empresa manda muchísima información a AWS todos los días,
¿te fiarías de internet común para eso?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Probablemente no, porque internet es compartido y la
velocidad varía según el momento. Para volumen alto y constante conviene
**AWS Direct Connect**, un cable dedicado entre tu edificio y AWS que da
rendimiento previsible. La alternativa es **Site-to-Site VPN**, un túnel
cifrado que sí va por internet: se activa en minutos y cuesta mucho menos, así
que es la opción razonable cuando el volumen es moderado o hay apuro.

## 🎯 Pistas para el examen

- **Security group vs. NACL** es la comparación más preguntada del tema. Dos
  atajos: si hay que **negar** algo puntual, es NACL; si protege **una
  instancia**, es security group.
- **Direct Connect vs. VPN:** cable dedicado, rendimiento constante y semanas
  de instalación ⇒ Direct Connect. Por internet, rápido de activar y barato ⇒
  VPN.
- Si el escenario pone la **base de datos accesible desde internet**, es
  incorrecto por diseño: va en subred privada. Es una trampa habitual.
- **Route 53 = nombres de dominio (DNS); CloudFront = contenido cerca del
  usuario.** Los dos "aceleran" cosas, pero solo CloudFront guarda copias.
- Recordá que la VPC es **regional**: vive dentro de una Región y puede
  abarcar varias Zonas de disponibilidad, que es justamente lo que permite la
  alta disponibilidad de la lección 3.2.
