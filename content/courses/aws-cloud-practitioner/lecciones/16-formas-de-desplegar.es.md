# 3.1 — Formas de desplegar y operar en AWS

> Dominio 3 · Task Statement 3.1 — Define methods of deploying and operating in the AWS Cloud

## 🤔 Antes de empezar

- Si tuvieras que encender doscientos servidores configurados exactamente igual, ¿los armarías uno por uno a mano?
- ¿Qué diferencia hay entre hacer algo con el mouse y dejar escrito en un papel cómo se hace?
- Si una empresa tiene sus propios servidores y no puede deshacerse de ellos todavía, ¿podría igual usar la nube?

## 📘 Contenido

Ya sabés qué es la nube y quién se ocupa de la seguridad. Ahora empieza el
módulo más grande del examen, y arranca por lo más básico: **¿cómo se le dan
órdenes a AWS?** y **¿dónde termina corriendo tu aplicación?**

### Las cuatro formas de darle órdenes a AWS

Pensá en un depósito enorme. Hay varias maneras de pedir que muevan cajas:

**1. La consola de administración.** Es la página web de AWS: entrás, hacés
clic y creás lo que necesites. Como ir personalmente al depósito y señalar
con el dedo. Es la forma más fácil de empezar y la mejor para explorar, pero
lenta y difícil de repetir sin equivocarse.

**2. La línea de comandos (AWS CLI).** En vez de hacer clic, escribís
órdenes de texto en una terminal. Como mandar una nota escrita con
instrucciones precisas. Sirve para automatizar: una orden que funcionó se
puede guardar y repetir mil veces igual.

**3. Los SDK.** Son bibliotecas que permiten que **tu propio programa** le dé
órdenes a AWS desde el código, en el lenguaje que uses (Python, Java,
JavaScript). Como que tu sistema de ventas llame solo al depósito cuando hace
falta, sin que nadie levante el teléfono.

**4. Infraestructura como código.** Acá está el salto conceptual importante,
así que va aparte.

### Infraestructura como código

Volvamos a la pregunta del principio: doscientos servidores iguales. Hacerlos
a mano por la consola sería larguísimo, y seguro alguno quedaría distinto sin
que nadie lo note.

La alternativa es escribir **un archivo que describa cómo debe quedar todo**:
"quiero tres servidores de este tamaño, una base de datos así, conectados de
esta forma". Le das ese archivo a AWS y él lo construye. Eso es
**infraestructura como código**, y en AWS el servicio que lo hace se llama
**AWS CloudFormation**.

Es la diferencia entre armar un mueble improvisando y tener el plano. Con el
plano:

- Podés levantar el mismo entorno **muchas veces exactamente igual** (uno para
  pruebas, otro para producción).
- Si alguien cambia algo a mano, se nota, porque el plano dice cómo debería estar.
- El archivo se guarda, se versiona y se revisa, como cualquier otro código.
- Para deshacer todo, borrás lo que creó el plano — sin ir recurso por recurso.

Hay un problema concreto que esto resuelve y que conviene tener presente. Si
alguien entra a la consola y cambia algo a mano —agranda un servidor para
salir de un apuro y después nadie lo anota—, la realidad deja de coincidir
con el plano. A eso se lo llama **desvío de configuración**, y es de donde
salen las fallas más difíciles de entender: el entorno de pruebas y el de
producción dejaron de ser iguales sin que nadie lo supiera. Con el plano
escrito, esa diferencia se detecta.

Cuando el examen mencione **"repetible", "consistente", "automatizado" o
"evitar errores manuales"**, casi siempre está pidiendo infraestructura como
código.

Una aclaración que conecta con el módulo anterior: la CLI, los SDK y
CloudFormation necesitan credenciales para actuar en tu nombre. Si quien las
usa es un servicio de AWS, la forma correcta de dárselas es un **rol**, como
vimos en la lección 2.3 — nunca una clave escrita dentro del servidor.

### Dónde termina corriendo tu aplicación

La segunda pregunta del tema: no todas las empresas ponen todo en la nube.
Hay tres modelos de despliegue.

**Todo en la nube.** La aplicación entera vive en AWS. Es lo más simple y lo
que más aprovecha la nube. Como mudarte por completo a un departamento
alquilado y vender la casa vieja.

**Híbrido.** Una parte en AWS y otra en los servidores propios de la empresa,
conectados entre sí. Es lo que hacen las empresas que ya tenían
infraestructura y no pueden —o no quieren— mover todo de golpe: quizá por una
regulación que obliga a guardar cierta información en su propio edificio, o
porque un sistema viejo es demasiado caro de migrar. Como mudarte al
departamento pero dejar los muebles pesados en la casa vieja por ahora.

**En las instalaciones propias (*on-premises*).** Todo corre en el centro de
datos de la empresa. Técnicamente no es nube, pero el examen lo nombra como
punto de comparación.

Fijate que **híbrido no es un paso a medias que hay que corregir**: para
muchas empresas es el destino final y una decisión deliberada.

### Nube privada, pública e híbrida

Vas a escuchar también otra división, que responde a *quién es dueño* de la
infraestructura:

| | Qué significa | Ejemplo |
|---|---|---|
| **Nube pública** | La infraestructura es de un proveedor y la comparten muchos clientes | AWS, tal como lo venimos viendo |
| **Nube privada** | Infraestructura dedicada a una sola organización | El centro de datos propio de un banco |
| **Nube híbrida** | Las dos conectadas entre sí | Parte en AWS, parte en el edificio propio |

**En resumen:** a AWS se le dan órdenes de cuatro formas —la consola web con
clics, la línea de comandos, los SDK desde tu propio código, y la
infraestructura como código con CloudFormation, que describe en un archivo
cómo debe quedar todo—. Y una aplicación puede correr enteramente en la nube,
enteramente en servidores propios, o repartida entre las dos, que es el
modelo híbrido.

## 💬 Ahora te toca a ti

**Pregunta:** Si tuvieras que encender doscientos servidores configurados
exactamente igual, ¿los armarías uno por uno a mano?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No: llevaría muchísimo tiempo y, sobre todo, alguno
terminaría configurado distinto sin que nadie se dé cuenta. Lo que
corresponde es escribir **un archivo que describa cómo tiene que quedar
todo** y dejar que AWS lo construya. Eso es infraestructura como código, y el
servicio de AWS que lo hace es **CloudFormation**. La ventaja no es solo la
velocidad: el mismo archivo levanta el entorno idéntico las veces que haga
falta.

**Pregunta:** ¿Qué diferencia hay entre hacer algo con el mouse y dejar
escrito en un papel cómo se hace?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Lo que hacés con el mouse ocurre una vez y se pierde;
lo que queda escrito se puede repetir, revisar, corregir y compartir. Esa es
exactamente la diferencia entre usar la **consola** de AWS y usar la **línea
de comandos**, los **SDK** o la **infraestructura como código**. La consola es
ideal para explorar y aprender; para todo lo que haya que repetir sin
equivocarse, conviene que esté escrito.

**Pregunta:** Si una empresa tiene sus propios servidores y no puede
deshacerse de ellos todavía, ¿podría igual usar la nube?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Sí, con un modelo **híbrido**: una parte de la
aplicación corre en AWS y otra sigue en los servidores propios, conectadas
entre sí. Es habitual cuando una regulación obliga a guardar cierta
información en el edificio de la empresa, o cuando migrar un sistema viejo
saldría carísimo. Y no es necesariamente algo transitorio: para muchas
empresas el híbrido es la arquitectura definitiva.

## 🎯 Pistas para el examen

- Ante las palabras **repetible, consistente, automatizado, versionado** o
  **"evitar errores manuales"**, la respuesta es **infraestructura como
  código (CloudFormation)**. Es la señal más confiable de este tema.
- Si el escenario dice que **la aplicación tiene que hablar con AWS desde el
  código**, es un **SDK**. Si habla de scripts o de una terminal, es la
  **CLI**. Si habla de aprender, explorar o hacer algo una sola vez, es la
  **consola**.
- Cuando aparezcan **servidores propios que se quedan** conectados con AWS,
  es **híbrido**. La palabra clave suele ser "existente", "heredado" o una
  regulación que obliga a no mover los datos.
- Descartá las opciones que proponen hacer a mano algo que el escenario
  describe como repetitivo: el examen premia casi siempre la automatización.
