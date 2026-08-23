# 1.4 — Crear tu cuenta AWS paso a paso, sin sustos con la tarjeta

> Módulo 1 · Lección 1.4 · Nivel: Básico · ⏱️ 30 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Si un servicio te promete que no te va a cobrar, ¿por qué crees que igual te pide una tarjeta?
- ¿Qué correo electrónico usarías para registrarte en algo que dentro de dos años quizás sea tu proyecto más importante?
- Si alguien consiguiera la contraseña de tu cuenta de AWS, ¿qué es lo peor que podría hacer?

## 📘 Cómo funciona

Hoy creas tu cuenta. Es la lección donde más gente se traba, no por dificultad técnica, sino por tres dudas razonables: la tarjeta, el correo y el plan. Vamos con las tres antes de tocar nada.

### Por qué pide tarjeta si no vas a gastar

AWS pide una tarjeta por el mismo motivo que un hotel la pide al hacer el check-in aunque la habitación ya esté paga: **para verificar que existes**.

Sin ese requisito, cualquiera podría abrir cuentas ilimitadas en un minuto y usar servidores gratis para cosas turbias. La tarjeta es el filtro antifraude.

Dos cosas concretas que te van a pasar:

1. **Un cobro de verificación de 1 USD.** Al completar el paso del pago, AWS hace un cargo de **1 dólar** (en India, 2 rupias) solo para comprobar que la tarjeta es real. No es una compra: es una retención temporal que desaparece o se devuelve en unos días. Vas a verla en el resumen y no es un error.
2. **Nada más, salvo que tú lo provoques.** Si eliges el plan gratuito, tu tarjeta *no se cobra* hasta que decidas pasar a plan de pago. Y si eliges plan de pago, solo se cobra lo que exceda tus créditos y lo que quede fuera de los servicios siempre gratis.

Sirve tanto una tarjeta de crédito como una de débito internacional. Si tu tarjeta es de débito, revisa antes que tenga habilitadas las compras por internet en el exterior: es la causa número uno de "mi registro falló".

### El correo raíz: la llave maestra

El correo con el que te registras se convierte en el **usuario raíz** (*root user*) de la cuenta. No es "un usuario más": es el dueño. Puede cerrar la cuenta, cambiar la forma de pago y hacer cosas que ningún otro usuario puede.

Y aquí está la parte incómoda: **quien controla ese correo, controla la cuenta**, porque puede pedir un restablecimiento de contraseña. Por eso:

- Usa un correo que **controles tú** y que no compartas con nadie. Nada de `info@` ni el correo de la oficina que ven cinco personas.
- Si puedes, usa uno dedicado solo para esto (por ejemplo `tunombre.aws@gmail.com`) y activa la verificación en dos pasos **en ese correo**, no solo en AWS.
- Anota el **ID de cuenta de 12 dígitos** que te asignan. Te lo van a pedir para iniciar sesión como usuario de IAM, y aparece en soporte, facturación y mil sitios más.

Guarda el correo, la contraseña y el ID en un gestor de contraseñas. En la lección 1.5 le agregamos una segunda llave (MFA), que es lo que de verdad lo blinda.

### Personal o empresa

El formulario te va a preguntar si la cuenta es *Personal* o *Business*. La documentación de AWS es clara: **tienen exactamente las mismas funciones y características**. La diferencia es administrativa (datos fiscales, facturación a nombre de una empresa).

Para aprender, elige **Personal**. Si algún día facturas a clientes desde esa cuenta, se puede cambiar la información fiscal después.

### El plan: la decisión que preparamos en la lección anterior

Aquí aplicas lo que aprendiste en 1.3. Al registrarte eliges entre **Free plan** y **Paid plan**, y en ambos casos recibes los mismos 100 USD de crédito inicial (más hasta 100 adicionales por completar actividades de iniciación).

| | Free plan | Paid plan |
|---|---|---|
| Puede cobrarte | No | Sí, lo que exceda créditos y servicios siempre gratis |
| Servicios | Solo un subconjunto | Todos, más las pruebas cortas |
| Cuando se acaban los créditos o los 6 meses | **La cuenta se cierra** y pierdes acceso a recursos y datos (90 días para recuperarla) | No pasa nada, sigue |

**La recomendación del curso sigue siendo Paid plan**, por lo que vimos: los servicios siempre gratis lo son igual, tus créditos se gastan primero, y tu proyecto no desaparece a los seis meses. La protección real no es el plan: es la alarma de gasto que ponemos en la lección 1.6.

Dos datos útiles por si eliges el gratuito:
- Puedes pasar a plan de pago cuando quieras desde **Billing and Cost Management → Upgrade plan**, y los créditos que te sobren **se aplican a las facturas siguientes**. El camino documentado va del gratuito al de pago; no hay uno de vuelta.
- Hay acciones que **suben tu cuenta a plan de pago automáticamente**: unirte a AWS Organizations, montar un Control Tower, entrar al AWS Partner Network o marcar la cuenta como HIPAA/SEC. Ninguna de esas aparece en este curso, pero conviene saberlo.

### La trampa del plan de soporte

Casi al final del registro aparece una pantalla llamada **Select a support plan**. Es el único lugar del registro donde puedes contratar un gasto fijo mensual sin darte cuenta.

- **Basic Support**: gratis. Incluye la documentación, los foros y las herramientas de salud del servicio. **Es el que necesitas.**
- **Los planes con soporte humano** (Developer, Business, Enterprise): personas que te responden, con un costo **mensual mínimo desde unos 29 USD**. Se cobra **todos los meses**, uses o no uses el soporte. AWS está reorganizando estos planes —Developer y Business se retiran el 1 de enero de 2027 en favor de *Business Support+*, también desde 29 USD al mes—, así que los nombres que veas pueden variar. Lo que no varía: **todos cuestan y el gratuito es Basic.**

Elige **Basic** y sigue. Nadie que esté aprendiendo necesita soporte pagado.

### Qué pasa cuando terminas

Al enviar el formulario verás un cartel de que la cuenta se está activando. **Suele tardar unos minutos, pero puede tardar hasta 24 horas** y recibirás un correo cuando esté lista. Si te pasa lo segundo, no es que algo salió mal: la verificación quedó en revisión manual.

Y cuando entres por primera vez, la tentación va a ser crear algo. Aguanta dos lecciones: primero MFA (1.5), después la alarma de gasto (1.6). Ese orden es deliberado — es el mismo que sigue un profesional al recibir una cuenta nueva.

**En resumen:** la tarjeta es un filtro antifraude y verás un cargo temporal de 1 USD; el correo del registro es la llave maestra de todo y merece un correo dedicado con verificación en dos pasos; elige Personal, Paid plan y soporte Basic. Al terminar, no crees nada todavía.

## 🛠️ Manos a la obra

> 📍 Esta práctica se hace en el sitio de registro de AWS, no en la consola.
> 💚 Costo de esta práctica: **$0**. No se crea ningún recurso que facture.

> ⚠️ **AVISO DE COSTO — verificación de tarjeta y plan de soporte**
>
> Dos cosas de este registro tocan dinero:
> - **Cargo de verificación de 1 USD** (2 INR en India) al completar el paso del pago. Es una comprobación temporal, no una compra: se devuelve o desaparece en unos días. Es inevitable y es normal.
> - **El plan de soporte.** Si eliges cualquiera que no sea **Basic**, contratas un costo fijo mensual (desde unos 29 USD). **Elige siempre Basic Support.**
>
> Si no quieres registrar una tarjeta todavía: puedes leer esta lección y seguir el curso hasta la 3.12 sin cuenta de AWS (los módulos 3 y 4 se hacen enteros en tu computadora). Necesitarás la cuenta a partir del módulo 5.

Ten a mano: un correo que controles, una tarjeta habilitada para compras internacionales y un teléfono donde recibir un SMS.

1. **Abre el registro.** Entra a [aws.amazon.com](https://aws.amazon.com) y elige **Create an AWS Account** (*crear una cuenta de AWS*), arriba a la derecha.
   *Deberías ver:* un formulario que pide un correo y un nombre de cuenta.

2. **Escribe tu correo raíz y el nombre de la cuenta.** En **Root user email address** pon el correo dedicado; en **AWS account name**, algo como `curso-fullstack-aws`. Pulsa **Verify email address**.
   *Deberías ver:* un aviso de que se envió un código.
   *Por qué:* el nombre de la cuenta se puede cambiar después; el correo raíz es mucho más incómodo de cambiar. Piénsalo bien ahora.

3. **Confirma con el código.** Copia el código de 6 dígitos del correo y pégalo.
   *Deberías ver:* la pantalla para crear la contraseña.

4. **Crea la contraseña raíz.** Larga, única, guardada en tu gestor de contraseñas. No la reutilices de ningún otro sitio.
   *Deberías ver:* al continuar, la pantalla de tipo de cuenta.

5. **Elige Personal.** Completa nombre, teléfono, país y dirección.
   *Deberías ver:* los campos de contacto. Usa datos reales: si AWS no puede verificarte, la activación se traba.

6. **Elige el plan.** Selecciona **Paid plan** (recomendación del curso; repasa la tabla de arriba si dudas).
   *Deberías ver:* un resumen de lo que incluye antes de continuar.

7. **Carga la tarjeta.** Ingresa los datos y la dirección de facturación tal como figura en el banco.
   *Deberías ver:* el aviso del cargo de verificación de 1 USD. Es el momento del aviso de costo de arriba.

8. **Verifica tu identidad.** Elige recibir un **SMS** o una llamada, selecciona el código de país, escribe tu número y luego el PIN que te llegue.
   *Deberías ver:* un mensaje de verificación exitosa.

9. **Elige el plan de soporte: Basic Support.** Es la opción gratuita.
   *Deberías ver:* una pantalla de confirmación diciendo que tu cuenta se está activando.

10. **Espera el correo de activación y entra por primera vez.** Ve a [console.aws.amazon.com](https://console.aws.amazon.com), elige **Root user**, escribe tu correo y tu contraseña.
    *Deberías ver:* la consola de AWS, con un buscador arriba y tu nombre de cuenta en la esquina superior derecha.

11. **Anota tu ID de cuenta.** Haz clic en tu nombre de cuenta (arriba a la derecha) y copia el número de **12 dígitos**. Guárdalo junto al correo y la contraseña.
    *Deberías ver:* un menú con el ID de cuenta, la opción de facturación y la de cerrar sesión.

12. **Cierra sesión y no crees nada todavía.**
    *Por qué:* una cuenta recién creada tiene una sola llave (la contraseña) y ninguna alarma de gasto. Las dos próximas lecciones arreglan exactamente eso, en ese orden.

## 💰 Costo y limpieza

- **Qué creaste:** una cuenta de AWS. No creaste ningún recurso: una cuenta vacía **no cuesta nada**, ni hoy ni dentro de un año.
- **Qué se factura:** el cargo temporal de verificación de 1 USD, que se devuelve. Nada más.
- **Free Tier:** tienes 100 USD de crédito disponibles desde ya (y hasta 100 más por completar las actividades de iniciación que AWS te sugiera), válidos 6 meses.
- **Limpieza:** no hay nada que borrar. **Esta cuenta se queda**: es la que usarás todo el curso.
- **Revisa en unos días:** entra a **Billing and Cost Management** y confirma que el cargo de 1 USD desapareció y que el saldo del mes está en cero.

## 💬 Ahora te toca a ti

**Pregunta:** Si un servicio te promete que no te va a cobrar, ¿por qué crees que igual te pide una tarjeta?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Para verificar que eres una persona real y frenar el abuso. Si no pidieran tarjeta, cualquiera abriría miles de cuentas gratuitas para usar servidores con fines turbios. Es el mismo motivo por el que un hotel pide la tarjeta al hacer el check-in aunque la habitación esté paga. En AWS eso se traduce en un cargo de verificación de 1 USD que después se devuelve, y en que tu tarjeta no se cobra hasta que superes lo gratuito y los créditos.

**Pregunta:** ¿Qué correo electrónico usarías para registrarte en algo que dentro de dos años quizás sea tu proyecto más importante?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Uno que controles solo tú, que no compartas con nadie y que tenga verificación en dos pasos activada. Idealmente uno dedicado a esto, no el del trabajo actual (si te vas de esa empresa, pierdes la cuenta) ni un buzón compartido tipo `info@`. El motivo es simple: quien controla ese correo puede pedir el restablecimiento de la contraseña raíz, y con eso se queda con toda la cuenta.

**Pregunta:** Si alguien consiguiera la contraseña de tu cuenta de AWS, ¿qué es lo peor que podría hacer?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Con el usuario raíz puede hacer prácticamente todo: leer y borrar tus datos, cambiar la forma de pago, cerrar la cuenta y, el clásico, encender decenas de servidores caros para minar criptomonedas — una factura de miles de dólares en pocos días, a tu nombre. Por eso la próxima lección no es "vamos a construir algo", sino ponerle una segunda llave a esa puerta. La contraseña sola no alcanza cuando detrás hay una tarjeta.

## ⚠️ Errores comunes

- **La tarjeta es rechazada.** Suele ser una tarjeta de débito sin compras internacionales habilitadas, o una dirección de facturación que no coincide con la del banco → habilita el uso internacional con tu banco y copia la dirección exactamente como figura en el resumen.
- **Elegir un plan de soporte pagado sin querer.** La pantalla de soporte aparece cuando ya estás cansado y con ganas de terminar → **Basic Support** es el gratuito. Si te equivocaste, se puede cambiar después en la consola de AWS Support, pero el mes en curso ya se factura.
- **Registrarse con el correo del trabajo o uno compartido.** Parece práctico y después es un problema serio → si cambias de empleo o alguien más accede a ese buzón, pierdes o comprometes la cuenta entera.
- **La activación se demora y se crean cuentas repetidas.** Pasan 20 minutos, cunde el nerviosismo y se abre otra cuenta con otro correo → la activación puede tardar **hasta 24 horas**. Espera el correo; tener dos cuentas complica facturación y límites gratuitos.
- **Empezar a crear recursos apenas entras.** La consola es tentadora y hay botones enormes de "lanzar instancia" → sin MFA y sin alarma de gasto, cualquier error es caro. Dos lecciones más de paciencia.

## 🎯 Para llevarte

- La tarjeta es antifraude: verás un cargo temporal de 1 USD y nada más, salvo que tú generes gasto.
- El correo del registro es el usuario raíz: quien lo controla, controla la cuenta. Correo dedicado y con verificación en dos pasos.
- Personal y Business tienen las mismas funciones; el plan de soporte correcto es **Basic** (gratis).
- Paid plan no significa "voy a pagar": significa que tu cuenta no se cierra sola a los 6 meses. Los servicios siempre gratis lo siguen siendo.
- Una cuenta vacía cuesta cero. Lo que cuesta es lo que enciendes dentro de ella.

**En la próxima lección:** le ponemos la segunda llave a la puerta. Vas a activar MFA en el usuario raíz, entender por qué los profesionales casi nunca inician sesión con ese usuario, y dejar la cuenta lista para trabajar sin miedo.
