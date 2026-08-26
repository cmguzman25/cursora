# 2.4a — Componentes de seguridad: protección contra ataques

> Dominio 2 · Task Statement 2.4 — Identify components and resources for security

## 🤔 Antes de empezar

- Si de repente llegaran mil personas falsas a tu local solo para tapar la puerta y que no entren los clientes de verdad, ¿cómo te defenderías?
- ¿Qué diferencia hay entre poner un portero que revisa a cada persona y poner una reja que simplemente bloquea todo?
- Si tu empresa tuviera veinte sucursales, ¿configurarías las reglas de seguridad en cada una por separado?

## 📘 Contenido

Los servicios de seguridad de AWS se dividen en dos familias que conviene no
mezclar: los que **bloquean el ataque antes de que entre** y los que **miran
hacia adentro y avisan si algo anda mal**. Esta lección cubre la primera
familia; la detección la vemos en la 2.4b.

### AWS Shield: contra los ataques de saturación

Imaginá que mil personas falsas se amontonan en la puerta de tu local, sin
intención de comprar nada, solo para que los clientes reales no puedan
entrar. Eso es un **ataque de denegación de servicio** (*DDoS*): saturar un
sitio con tráfico basura hasta que deja de responder a la gente de verdad.

**AWS Shield** es la defensa contra eso, y viene en dos niveles:

- **Shield Standard:** gratis y activado automáticamente para todos los
  clientes, sin que tengas que hacer nada. Cubre los ataques más comunes.
- **Shield Advanced:** de pago, para quien necesita más. Suma protección
  contra ataques más grandes y sofisticados, informes detallados y acceso a
  un equipo de AWS especializado en responder a estos incidentes.

Shield Advanced tiene además un beneficio que suele sorprender: **te protege
del costo del ataque**. Cuando alguien te satura de tráfico, tus servicios
escalan para aguantar y esa escalada se cobra. Con Advanced, AWS te devuelve
esos cargos extra provocados por el ataque.

Que Shield Standard esté siempre activo y sea gratis es un dato que el examen
pregunta seguido.

### AWS WAF: el portero que revisa quién entra

Shield frena una avalancha, pero no distingue el contenido de cada pedido.
Para eso está el portero.

**AWS WAF** (*Web Application Firewall*, cortafuegos de aplicaciones web)
revisa cada petición que llega a tu sitio y la deja pasar o la bloquea según
reglas que vos definís. Es el portero que mira a cada persona y decide: a
esta la dejo entrar, a esta no.

Sirve para bloquear cosas como:

- Peticiones que vienen de una dirección de internet concreta o de un país
  determinado.
- Intentos de colar instrucciones maliciosas dentro de un formulario, para
  robar o borrar información de la base de datos.
- Un mismo visitante que hace demasiadas peticiones por minuto.

WAF no se instala dentro de tu servidor: se coloca **delante** de tu
aplicación web, de modo que el tráfico pasa primero por él y solo llega lo
que aprobó. Por eso se conecta a los servicios que reciben el tráfico antes
que nadie —la red de distribución de contenido, el balanceador de carga o la
puerta de entrada de tus APIs—, que vemos en el Módulo 3.

La diferencia con Shield en una frase: **Shield te defiende del volumen, WAF
te defiende del contenido.** Y no compiten: lo normal es usar los dos juntos,
Shield frenando la avalancha y WAF revisando lo que sí llega.

### AWS Firewall Manager: las mismas reglas en todas las sucursales

Si tu empresa tiene una sola cuenta de AWS, configurás WAF ahí y listo. Pero
cuando hay veinte cuentas, repetir las mismas reglas en cada una es lento y,
peor, es fácil que alguna quede desactualizada y se transforme en el punto
débil.

**AWS Firewall Manager** resuelve eso: definís las reglas **una sola vez** y
se aplican a todas las cuentas de la organización, incluidas las que se creen
más adelante. Es la empresa de seguridad que impone el mismo protocolo en
todas las sucursales, en vez de dejar que cada gerente improvise el suyo.

| Servicio | Qué hace | Cuándo aparece en el examen |
|---|---|---|
| **Shield** | Frena ataques de saturación (DDoS) | "Nos tiran el sitio con tráfico masivo" |
| **WAF** | Filtra peticiones web según reglas | "Queremos bloquear cierto tráfico o país" |
| **Firewall Manager** | Aplica esas reglas en muchas cuentas a la vez | "Tenemos varias cuentas y queremos reglas uniformes" |

### AWS Marketplace: comprar seguridad ya hecha

No todo hay que construirlo. **AWS Marketplace** es una tienda dentro de AWS
donde encontrás software de otras empresas listo para usar: antivirus,
cortafuegos especializados, herramientas de monitoreo.

La ventaja es que se instala en pocos clics y **se paga junto con tu factura
de AWS**, sin negociar un contrato aparte con cada proveedor. Es la
diferencia entre fabricar tu propia alarma y comprarla en una tienda de
proveedores ya verificados.

### Dónde buscar cuando tengas dudas

El examen también espera que sepas que AWS publica material de seguridad
gratuito. Los que conviene tener presentes:

- **Documentación y *whitepapers*:** guías oficiales sobre cómo asegurar cada
  servicio y sobre buenas prácticas generales.
- **AWS Security Blog** y el **Centro de conocimiento**: artículos y
  respuestas a preguntas frecuentes.
- **AWS Trusted Advisor**, que revisa tu cuenta y te da recomendaciones
  concretas — lo vemos en detalle en la próxima lección.
- **AWS Support**: si el problema es serio, hay planes de soporte con acceso a
  gente de AWS (los vemos en el Módulo 4).

**En resumen:** Shield te protege de los ataques de saturación y viene
activado gratis para todos en su versión Standard. WAF filtra las peticiones
web según reglas que vos definís, así que Shield mira el volumen y WAF mira
el contenido. Firewall Manager aplica esas reglas en muchas cuentas de una
sola vez, y AWS Marketplace te deja comprar herramientas de seguridad de
terceros que se cobran en tu misma factura.

## 💬 Ahora te toca a ti

**Pregunta:** Si de repente llegaran mil personas falsas a tu local solo para
tapar la puerta y que no entren los clientes de verdad, ¿cómo te defenderías?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Necesitarías algo que detecte esa avalancha y la
frene antes de que llegue a la puerta, sin bloquear a los clientes reales. En
AWS eso es **AWS Shield**, la protección contra ataques de denegación de
servicio (DDoS). Lo bueno es que **Shield Standard ya viene activado y es
gratis para todos**, sin configurar nada; si necesitás protección contra
ataques más grandes, informes y un equipo especializado, existe Shield
Advanced, que es pago.

**Pregunta:** ¿Qué diferencia hay entre poner un portero que revisa a cada
persona y poner una reja que simplemente bloquea todo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El portero mira **el contenido** de cada caso y decide
uno por uno; la reja frena **el volumen** sin distinguir. Esa es justamente la
diferencia entre **AWS WAF** y **AWS Shield**. WAF revisa cada petición web y
la bloquea si coincide con una regla tuya (viene de tal país, trae
instrucciones maliciosas, hace demasiadas peticiones). Shield actúa antes,
frenando la avalancha de tráfico basura. No son alternativas: se usan juntos.

**Pregunta:** Si tu empresa tuviera veinte sucursales, ¿configurarías las
reglas de seguridad en cada una por separado?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No, porque es lento y sobre todo porque alguna va a
quedar desactualizada y se vuelve el punto débil de toda la empresa. En AWS,
las "sucursales" son las distintas cuentas, y la solución es **AWS Firewall
Manager**: definís las reglas una sola vez y se aplican a todas las cuentas
de la organización, incluidas las que se creen después.

## 🎯 Pistas para el examen

- La distinción más preguntada de esta lección: **Shield = volumen (DDoS),
  WAF = contenido (reglas sobre las peticiones)**. Si el escenario habla de
  saturar el sitio con tráfico, es Shield; si habla de bloquear cierto tipo
  de petición, país o dirección, es WAF.
- Si una opción dice que hay que **contratar o activar Shield Standard**, es
  incorrecta: viene activado por defecto y sin costo para todos los clientes.
  El que se contrata y se paga es Shield **Advanced**.
- En cuanto el enunciado mencione **varias cuentas** y querer reglas
  **uniformes o centralizadas**, pensá en **Firewall Manager**. Esa palabra
  —centralizar— es la señal.
- Ante "necesitamos una herramienta de seguridad de otro proveedor",
  la respuesta es **AWS Marketplace**, con la ventaja de que se paga en la
  misma factura de AWS.
- Ojo con no confundir estos servicios con los de la próxima lección: acá
  todos **bloquean o previenen**; los de la 2.4b **detectan y avisan**. Si el
  escenario dice "queremos enterarnos de que algo pasó", ninguno de estos es
  la respuesta.
