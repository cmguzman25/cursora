# 0.2 — Cómo crear y proteger una cuenta AWS Free Tier

> Módulo 0 · Bienvenida y preparación

## 🤔 Antes de empezar

- ¿Alguna vez te registraste en un servicio "gratis" que igual te pidió una tarjeta de crédito? ¿Por qué crees que lo hacen?
- Si tuvieras la llave maestra de un edificio completo —una que abre absolutamente todas las puertas—, ¿la usarías para entrar todos los días o la guardarías para casos especiales?
- ¿Qué crees que puede pasar si usás un servicio que cobra "por uso" y nunca revisás cuánto llevás gastado?

## 📘 Contenido

### Por qué te conviene tener tu propia cuenta

Vas a entender AWS mucho más rápido si podés tocar los servicios con tus propias
manos mientras estudiás, en vez de solo leer sobre ellos. Por eso, antes de seguir
con el contenido del examen, vamos a dejar lista una cuenta de AWS para practicar.

La buena noticia: AWS te deja crear una cuenta gratis para explorar. La mala
noticia (y la razón de esta lección): "gratis" tiene reglas específicas, y si no
las conocés de antemano, es fácil llevarse una sorpresa. Vamos por partes.

### ¿Qué es exactamente la cuenta gratuita de AWS?

Pensalo como una membresía de prueba en un gimnasio. Algunas máquinas del gimnasio
son gratis para cualquier socio, siempre, sin límite de tiempo —por ejemplo, los
casilleros o el bebedero—. Pero además, como promoción de bienvenida, te dan una
cantidad de clases pagas gratis para probar: una vez que se acaban esas clases, o
pasan los meses de la promoción, tenés que empezar a pagar (o dejar de ir).

AWS funciona con esa misma lógica, con dos partes separadas:

1. **Más de 30 servicios "siempre gratis"** (Always Free): tienen un límite de uso
   por mes que nunca vence. Por ejemplo, cierta cantidad de invocaciones de AWS
   Lambda por mes son gratis para siempre, tengas la cuenta hace un día o hace diez
   años.
2. **Un crédito de bienvenida** para cuentas nuevas: **100 USD apenas creás la
   cuenta**, y podés sumar hasta **100 USD más** completando ciertas actividades
   de introducción (hasta 200 USD en total). Ese crédito cubre el uso de servicios
   que no son "siempre gratis" —como ciertos tipos de instancias EC2 o bases de
   datos RDS—, pero **se agota** con el uso, y además **vence a los 6 meses** de
   abierta la cuenta, lo que ocurra primero.

> Si viste tutoriales viejos que hablan de "12 meses gratis" con límites fijos de
> EC2 y S3, esa era la estructura anterior del Free Tier. AWS la cambió: hoy, toda
> cuenta nueva arranca en un **"plan gratuito"** con el crédito de 200 USD y los
> servicios siempre gratis, y se cierra sola a los 6 meses (o cuando se acaba el
> crédito) salvo que la conviertas en un "plan de pago". No te va a cobrar nada
> automáticamente si no hacés esa conversión.

### El usuario root: la llave maestra de tu cuenta

Cuando creás la cuenta, el primer usuario que existe se llama **usuario root**
(raíz). Es exactamente la llave maestra del edificio de la pregunta inicial: puede
hacer *cualquier cosa* en la cuenta, sin excepción —incluso cerrarla o cambiar el
método de pago—. Nadie más tiene ese nivel de poder por defecto.

Por eso la regla de oro es simple: **el usuario root no se usa para el trabajo del
día a día**. Se usa apenas para crear la cuenta y para un puñado de tareas
puntuales que solo root puede hacer (como cerrar la cuenta). Para todo lo demás
—incluso mientras practicás para este examen— lo correcto es crear un usuario
separado con solo los permisos necesarios. Vamos a ver cómo hacer eso en detalle
en la lección 2.3 (IAM); por ahora, alcanza con dejar la cuenta root bien
protegida.

"Bien protegida" hoy tiene un significado concreto: AWS ya **exige** activar la
verificación en dos pasos (MFA, *multi-factor authentication*) en el usuario root
—dejó de ser una simple recomendación—. Si no la activás vos al crear la cuenta,
AWS te la va a pedir de todas formas la primera vez que inicies sesión.

### Pasos para crear la cuenta

1. Entrá a `aws.amazon.com/free` y hacé clic en "Crear una cuenta de AWS".
2. Ingresá tu correo electrónico y elegí un nombre para la cuenta (por ejemplo,
   "Mi cuenta de práctica").
3. Completá tus datos de contacto.
4. Ingresá una tarjeta para verificación. Es el mismo motivo por el que un gimnasio
   te pide una tarjeta para una prueba gratis: es para verificar que sos una
   persona real y tener un medio de pago disponible por si en algún momento
   superás lo gratuito — no significa que te vayan a cobrar automáticamente.
5. Verificá tu identidad por SMS o llamada.
6. Elegí un plan de soporte. Para practicar, el plan **Basic** alcanza de sobra y
   no cuesta nada.
7. Ya adentro de la cuenta, **activá MFA en el usuario root** antes de hacer
   cualquier otra cosa.

### Cómo evitar sorpresas en la factura

Aunque estés en el plan gratuito, es buena costumbre configurar una alerta de
gasto — es el equivalente a poner una alarma de gasto en una tarjeta de débito,
que te avisa apenas cruzás cierto monto, en vez de enterarte al final del mes.
AWS tiene un servicio para esto llamado **AWS Budgets**, donde podés crear una
alerta que te avise por correo si el gasto proyectado supera, por ejemplo, 1 USD.
Vamos a ver este servicio con más detalle en el Módulo 4 (facturación y costos);
por ahora, con crear una alerta simple es suficiente.

**En resumen:** la cuenta gratuita de AWS combina servicios siempre gratis (sin
vencimiento) con un crédito de hasta 200 USD que vence a los 6 meses. El usuario
root es el más poderoso de la cuenta y no se usa para el día a día — lo primero
que hay que hacer al entrar es activarle MFA. Y una alerta de gasto en AWS
Budgets es la forma más simple de evitar sorpresas.

## 💬 Ahora te toca a ti

**Pregunta:** ¿Alguna vez te registraste en un servicio "gratis" que igual te
pidió una tarjeta de crédito? ¿Por qué crees que lo hacen?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Generalmente es para verificar que sos una persona real
(no una cuenta falsa) y para tener un medio de pago listo por si en algún momento
usás algo que no es gratis. AWS hace exactamente esto al crear la cuenta.

**Pregunta:** Si tuvieras la llave maestra de un edificio completo —una que abre
absolutamente todas las puertas—, ¿la usarías para entrar todos los días o la
guardarías para casos especiales?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Lo más seguro es guardarla para casos especiales y usar
una llave normal (con acceso limitado) para el día a día — así, si esa llave se
pierde o alguien la usa mal, el daño posible es mucho menor. Es exactamente la
lógica de no usar el usuario root para el trabajo diario.

**Pregunta:** ¿Qué crees que puede pasar si usás un servicio que cobra "por uso"
y nunca revisás cuánto llevás gastado?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Te podés llevar una sorpresa el día que llega la factura,
sobre todo si algo quedó funcionando sin que te dieras cuenta. Por eso conviene
configurar una alerta (como AWS Budgets) que te avise antes de que eso pase, en
vez de descubrirlo al final.

## 🎯 Pistas para el examen

- El examen pregunta directamente qué se debe y qué no se debe hacer con el
  usuario root. No hace falta memorizar la lista completa de tareas exclusivas de
  root — con entender el principio "usarlo lo menos posible, y siempre con MFA
  activado" resolvés la mayoría de esas preguntas.
- Si una pregunta describe una cuenta usando el usuario root para tareas del día
  a día, o sin MFA activado, esa es la práctica incorrecta — el examen la va a
  marcar como la opción que hay que evitar.
- Distinguí bien dos conceptos que el examen le gusta mezclar: los **servicios
  siempre gratis** (límite mensual, sin vencimiento) no son lo mismo que el
  **crédito de bienvenida** (monto fijo que se agota y vence a los 6 meses).
  Una pregunta puede describir una cuenta que "se queda sin nada gratis" para que
  identifiques cuál de las dos cosas se terminó.
- El plan de soporte **Basic** es gratuito para cualquier cuenta — el examen
  puede usar esto para descartar una opción que dice que hay que pagar para tener
  soporte básico.
