# 3.8a — Integración, mensajería y atención al cliente

> Dominio 3 · Task Statement 3.8 — Identify services from other in-scope AWS service categories

## 🤔 Antes de empezar

- Si una parte de tu sistema le pasa trabajo a otra y la segunda se cae, ¿qué debería pasar con ese trabajo?
- ¿Qué diferencia hay entre dejar un mensaje en un buzón para una persona y publicarlo en la cartelera del edificio?
- Si tuvieras que montar un centro de atención telefónica desde cero, ¿comprarías centrales telefónicas?

## 📘 Contenido

Hasta ahora vimos las piezas grandes: cómputo, datos, red, almacenamiento.
Falta cómo esas piezas **se hablan entre sí** sin volverse frágiles, y un par
de servicios sueltos que el examen igual pregunta.

### El problema del acoplamiento

Imaginá una tienda en línea. Cuando alguien compra, hay que registrar el
pedido, cobrar y avisar al depósito. Si el sistema de pedidos le habla
**directamente** al del depósito y el depósito está caído, la compra falla
entera — aunque el cliente ya haya pagado.

A eso se lo llama estar **fuertemente acoplado**: si una pieza cae, arrastra a
las demás. La solución es poner algo en el medio.

### Amazon SQS: el buzón de tareas

Acá está la primera pregunta del principio. **Amazon SQS** (*Simple Queue
Service*) es una **cola de mensajes**: el sistema de pedidos deja el trabajo en
una fila, y el depósito lo retira cuando puede.

Es el buzón de la oficina. El cartero deja la carta y se va; no espera a que
el destinatario esté en su escritorio. Si el destinatario está de licencia, la
carta lo espera.

Eso cambia todo: si el depósito se cae una hora, los pedidos **se acumulan en
la cola** en vez de perderse, y se procesan cuando vuelve. Los dos sistemas
quedan **desacoplados**.

Un detalle del funcionamiento: cada mensaje lo retira **un solo** consumidor y
después desaparece de la cola. Es una tarea que se hace una vez.

Hay un segundo beneficio menos evidente: la cola **absorbe los picos**. Si un
lunes de ofertas llegan diez veces más pedidos de los normales, se apilan en
la fila y el depósito los va procesando a su ritmo, sin caerse. Sin la cola,
esa avalancha le pegaría de lleno.

### Amazon SNS: la cartelera

Segunda pregunta. A veces no querés darle una tarea a alguien puntual, querés
**avisarle lo mismo a todos los interesados a la vez**.

**Amazon SNS** (*Simple Notification Service*) hace eso: publicás un mensaje en
un "tema" y **todos los suscriptos lo reciben** — otro sistema, un correo, un
mensaje de texto.

Es la cartelera del edificio: se cuelga un aviso y lo lee todo el que pasa.
Cuando se confirma un pedido, con un solo mensaje podés avisarle al depósito,
al sistema de facturación y al cliente por correo.

La comparación que más se pregunta:

| | SQS (cola) | SNS (notificaciones) |
|---|---|---|
| Analogía | Un buzón | Una cartelera |
| ¿Quién lo recibe? | **Un** consumidor | **Todos** los suscriptos |
| ¿Qué es el mensaje? | Una tarea por hacer | Un aviso de que algo pasó |
| ¿Espera al destinatario? | Sí, queda en la fila | No, se envía y listo |

Regla corta: **una tarea que alguien tiene que hacer ⇒ SQS. Un aviso para
muchos ⇒ SNS.**

### Amazon EventBridge: conectar por eventos

**EventBridge** va un paso más allá: permite que los servicios reaccionen
a **eventos** sin conocerse entre sí. "Cuando se suba un archivo, ejecutá esta
función." "Cuando una instancia cambie de estado, avisá acá."

Es el sistema nervioso de la aplicación: las piezas no se llaman por nombre,
simplemente anuncian lo que les pasó y quien tenga interés reacciona. Se usa
muchísimo junto con Lambda.

¿En qué se diferencia de SNS? SNS existe para **avisarle a los suscriptos** que
algo pasó; EventBridge está pensado para **encadenar reacciones** entre
servicios de AWS y aplicaciones, filtrando qué eventos importan y a quién le
corresponde cada uno. A este nivel alcanza con quedarse con esa idea.

### API Gateway: la puerta de entrada

Falta una pieza que conecta a la aplicación con el mundo de afuera. **Amazon
API Gateway** es la puerta por donde entran los pedidos que le hacen otros
programas a tu sistema: recibe cada llamada, verifica que quien la hace tenga
permiso, controla que nadie abuse haciendo miles de pedidos por segundo, y
recién ahí la deriva a quien corresponda —muy seguido, a una función Lambda.

Es la recepción del edificio: nadie pasa sin anunciarse. Es también, como
vimos en la lección 2.4a, uno de los lugares donde se conecta **AWS WAF**.

### Atención al cliente y comunicación

Tercera pregunta del principio. AWS también ofrece servicios ya armados para
hablar con tus clientes, y no hay que construirlos:

- **Amazon Connect** es un centro de contacto (*call center*) en la nube: se
  configura desde el navegador, sin comprar centrales telefónicas ni contratar
  líneas. Escala igual que el resto de la nube: si un día entran diez veces más
  llamadas, no hay hardware que agregar.
- **Amazon SES** (*Simple Email Service*) envía correo en volumen: facturas,
  confirmaciones, boletines.

No los confundas con SNS. **SNS avisa a sistemas y personas de que algo pasó;
SES manda correo de verdad, con su formato y su contenido, a tus clientes.**

**En resumen:** SQS es una cola donde un sistema deja tareas y otro las retira
cuando puede, lo que evita que la caída de una pieza arrastre a las demás. SNS
publica un aviso que reciben todos los suscriptos a la vez. EventBridge conecta
servicios por eventos sin que se conozcan entre sí. Y del lado del cliente,
Connect es un centro de contacto en la nube y SES el servicio para enviar
correo en volumen.

## 💬 Ahora te toca a ti

**Pregunta:** Si una parte de tu sistema le pasa trabajo a otra y la segunda se
cae, ¿qué debería pasar con ese trabajo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Debería quedar esperando, no perderse ni hacer fallar a
quien lo envió. Eso se logra poniendo una **cola** en el medio: **Amazon SQS**.
El primer sistema deja el mensaje en la fila y sigue con lo suyo; el segundo lo
retira cuando vuelve a estar disponible. Así los dos quedan **desacoplados**, y
la caída de uno deja de arrastrar al otro.

**Pregunta:** ¿Qué diferencia hay entre dejar un mensaje en un buzón para una
persona y publicarlo en la cartelera del edificio?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El buzón es para un destinatario que retirará la carta;
la cartelera la lee todo el que pase. En AWS, el buzón es **SQS** —un mensaje,
un consumidor, y desaparece de la cola cuando alguien lo toma— y la cartelera
es **SNS**, donde publicás una vez y **todos los suscriptos** reciben el aviso.
Por eso SQS se usa para repartir tareas y SNS para notificar que algo ocurrió.

**Pregunta:** Si tuvieras que montar un centro de atención telefónica desde
cero, ¿comprarías centrales telefónicas?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No hace falta: **Amazon Connect** es un centro de
contacto en la nube que se configura desde el navegador, sin comprar equipos ni
contratar líneas por adelantado. Es el mismo razonamiento del Módulo 1 —dejar
de adivinar la capacidad y cambiar gasto fijo por variable— aplicado a la
atención al cliente: si un día entran diez veces más llamadas, no hay hardware
que agregar.

## 🎯 Pistas para el examen

- **SQS vs. SNS es la comparación estrella del tema.** Un mensaje que **una**
  parte tiene que procesar ⇒ SQS. Un aviso que **muchos** deben recibir ⇒ SNS.
  Si el enunciado dice "notificar", casi siempre es SNS.
- Ante las palabras **desacoplar, que no se pierdan los mensajes** o **que una
  falla no afecte al resto**, la respuesta es **SQS**. Es el ejemplo canónico
  de arquitectura desacoplada.
- **SNS y SES se confunden porque los dos "envían".** SNS notifica a sistemas y
  suscriptos de que algo pasó; SES manda correo a tus clientes. Si el escenario
  habla de campañas, facturas o correo con formato, es SES.
- Si el escenario describe **reaccionar automáticamente a que algo ocurrió** en
  AWS, pensá en **EventBridge**, normalmente disparando una función Lambda.
- **Amazon Connect es centro de contacto, no conectividad de red.** El nombre
  engaña: no tiene nada que ver con Direct Connect ni con VPN.
