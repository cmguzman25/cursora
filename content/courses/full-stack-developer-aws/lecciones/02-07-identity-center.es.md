# 2.7 — IAM Identity Center: por qué las empresas ya casi no crean usuarios IAM

> Módulo 2 · Lección 2.7 · Nivel: Básico · ⏱️ 40 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Si trabajaras en una empresa con cinco edificios, ¿te parecería normal registrarte por separado en la recepción de cada uno?
- Cuando alguien se va de una empresa, ¿quién crees que se acuerda de quitarle **todos** los accesos?
- Tu empresa ya sabe quién trabaja allí: está en nóminas, en el correo, en el chat. ¿Por qué tendría que mantener otra lista aparte solo para la nube?

## 📘 Cómo funciona

Un campus con cinco edificios. En cada uno hay una recepción, con su libro de visitas y sus tarjetas. Para trabajar allí te registras cinco veces, llevas cinco tarjetas y memorizas cinco códigos.

El día que te vas de la empresa, alguien tiene que acordarse de dar de baja las cinco. Y ese "alguien" tiene otras catorce cosas que hacer.

Ahora la otra versión: una **oficina central de acreditaciones**. Te registras una vez, tu tarjeta abre los edificios que te corresponden, y el día que Recursos Humanos te marca como baja, deja de funcionar en todos a la vez.

La primera versión son los **usuarios IAM**. La segunda es **IAM Identity Center**.

### Por qué el usuario de la lección 2.2 no escala

Lo que hiciste en la 2.2 está bien: para una cuenta de aprendizaje es exactamente lo correcto. El problema aparece al multiplicar.

Una empresa mediana tiene 200 personas y no una cuenta de AWS, sino varias: producción, pruebas, desarrollo, facturación. Digamos cinco. Con usuarios IAM eso significa:

- **Hasta 1.000 usuarios que crear a mano**, uno por persona y cuenta.
- **1.000 contraseñas** y, si alguien las pide, otras tantas claves de acceso.
- Cuando alguien entra a la empresa, repetir el alta cinco veces.
- Cuando alguien se va, **acordarse de las cinco bajas**. Si se olvida una, queda una puerta abierta que nadie vigila.

Y aquí está el argumento que de verdad cierra la discusión: **la empresa ya sabe quién trabaja allí**. Está en el sistema de correo, en el directorio corporativo, en nóminas. Mantener usuarios IAM significa mantener **una segunda lista de seres humanos**, en paralelo, actualizada a mano. Dos listas de personas siempre acaban diciendo cosas distintas.

### Qué es Identity Center

**IAM Identity Center** (que hasta 2022 se llamaba **AWS Single Sign-On**, o *AWS SSO* — verás las dos formas por todas partes) es la oficina central de acreditaciones de AWS.

Te da tres cosas:

- **Una sola puerta de entrada.** Un portal web con su propia dirección, del estilo `https://d-1234567890.awsapps.com/start`. Entras ahí, y ves la lista de cuentas y papeles a los que tienes derecho. Eliges uno y entras.
- **Un solo sitio donde existe cada persona.** Puedes usar el directorio del propio Identity Center o **conectarlo al que la empresa ya tiene** (Microsoft Entra, Google Workspace, Okta). En ese caso, quien se va de la empresa pierde AWS automáticamente.
- **Reglas centrales.** El doble factor (MFA) se exige desde un único sitio, no cuenta por cuenta.

### Conjuntos de permisos: roles con otro nombre

Aquí es donde todo lo del módulo encaja.

En Identity Center no adjuntas políticas a personas. Creas **conjuntos de permisos** (*permission sets*): plantillas que dicen "quien tenga este papel puede hacer esto". Por ejemplo, un conjunto `SoloLectura` y otro `Desarrollador`.

Después asignas: *"María, con el conjunto Desarrollador, en la cuenta de pruebas"*.

¿Y qué pasa por dentro cuando haces esa asignación? **AWS crea un rol de IAM de verdad en esa cuenta.** Lo vas a ver con tus ojos en la práctica: aparece en IAM → Roles con un nombre que empieza por `AWSReservedSSO_`.

O sea: Identity Center **no sustituye a los roles**, los fabrica y los reparte por ti. Cuando María entra por el portal y elige la cuenta de pruebas, está **asumiendo un rol** — exactamente lo que hiciste tú a mano en la lección 2.5, y lo que hace una Lambda en la 2.6.

Y como es un rol, se lleva la propiedad más importante: **credenciales temporales**. Ninguna persona tiene una contraseña permanente en cada cuenta, ni claves de acceso guardadas en su portátil. La sesión caduca sola.

### En la vida real no se asigna a personas

Un detalle que separa una configuración de juguete de una de verdad: **casi nunca se asigna un conjunto de permisos a una persona suelta**. Se asigna a un **grupo**, igual que en la lección 2.2.

La diferencia es de dónde salen esos grupos. Cuando Identity Center está conectado al directorio de la empresa, los grupos ya existen: *Desarrollo*, *Soporte*, *Finanzas*. Alguien entra al equipo de desarrollo en el sistema de Recursos Humanos y, sin que nadie de tecnología toque nada, aparece con los permisos correctos en las cuentas correctas.

Ese es el momento en que la gestión de accesos deja de ser una tarea y pasa a ser una consecuencia. Y es la razón de fondo por la que las empresas migraron: no por seguridad, sino porque **hacerlo a mano no cabe en el día de nadie**.

### Entonces, ¿los usuarios IAM se acabaron?

Casi. Quedan dos casos legítimos:

- **La cuenta de emergencia.** Si Identity Center o el proveedor de identidad se cae, alguien tiene que poder entrar. Se guarda un usuario con MFA en un sobre cerrado y no se toca. En el oficio se llama *break-glass* (romper el cristal).
- **Algún sistema antiguo** que no sabe hablar el protocolo moderno de inicio de sesión.

Fuera de eso, en una empresa que empieza hoy, crear usuarios IAM para personas está mal visto por la misma razón que apuntar contraseñas en un pósit: funciona, y no hay forma de defenderlo.

### Y en tu cuenta de aprendizaje, ¿qué hago?

Sé honesto contigo mismo: para una cuenta personal, tu usuario de la 2.2 es perfectamente razonable y más simple. Vas a hacer la práctica de hoy para **verlo funcionar y reconocerlo el día que entres a una empresa**, no porque tu cuenta lo necesite.

Eso sí: si alguna vez trabajas con otra persona en la misma cuenta, este es el momento de usarlo.

**En resumen:** Identity Center es la puerta única de entrada a AWS. Las personas viven en un solo directorio, los permisos se definen como conjuntos que se asignan a cuentas, y por debajo todo se convierte en roles con credenciales temporales. Los usuarios IAM quedan para la cuenta de emergencia.

## 🛠️ Manos a la obra

> 📍 **Ojo con la región en esta práctica.** Identity Center se activa en **una sola región** y cambiarla después obliga a borrarlo y rehacerlo. Usa `us-east-1 (N. Virginia)`, la del curso.
> 💚 Costo de esta práctica: **$0**. IAM Identity Center es gratis, y AWS Organizations también.

> 🆕 **Qué vas a cambiar en tu cuenta.** Al activar Identity Center, AWS te va a proponer crear una **organización** (una agrupación de cuentas, aunque de momento solo tengas una). Es gratis, es reversible y es lo normal en cualquier cuenta profesional. Si prefieres no tocar nada, lee la práctica sin ejecutarla: entenderás igual el concepto.

Entra con **tu usuario** de la 2.2.

### Parte 1 — Activar

1. **Consola AWS → IAM Identity Center.** Verifica arriba a la derecha que estás en `us-east-1`.
   *Deberías ver:* una pantalla de bienvenida con un botón de activar (*Enable*).

2. **Púlsalo y acepta** lo que te proponga sobre crear la organización.
   *Deberías ver:* al cabo de un minuto, el panel de Identity Center. Busca la **URL del portal de acceso** (*AWS access portal URL*), algo como `https://d-xxxxxxxxxx.awsapps.com/start`. **Cópiala y guárdala**: es la puerta de entrada.

### Parte 2 — Crear el papel antes que la persona

3. **Menú izquierdo → Permission sets** (*conjuntos de permisos*) → **Create permission set**.
   *Por qué primero el papel:* igual que en la 2.2 creaste el grupo antes que el usuario. Se define el puesto, después se contrata.

4. **Elige `Predefined permission set`** y dentro, **`ReadOnlyAccess`**. Deja la duración de sesión por defecto (1 hora).
   *Deberías ver:* el resumen del conjunto antes de crearlo. Fíjate en que la duración se mide en horas: son credenciales temporales, como en la 2.5.

5. **Créalo.**
   *Deberías ver:* `ReadOnlyAccess` en la lista de conjuntos de permisos.

### Parte 3 — Crear la persona y asignarla

6. **Menú izquierdo → Users → Add user.** Ponle un nombre de usuario como `maria.prueba`, un correo tuyo al que tengas acceso y un nombre y apellido cualquiera.
   *Deberías ver:* pasos opcionales de grupos. Sáltalos y crea el usuario.
   *Ojo:* usa un correo **real tuyo**, porque AWS le manda ahí la invitación para poner contraseña.

7. **Menú izquierdo → AWS accounts.** Marca la casilla de tu cuenta y pulsa **Assign users or groups**.
   *Deberías ver:* un asistente en tres pasos.

8. **Elige a `maria.prueba`**, después el conjunto `ReadOnlyAccess`, y confirma.
   *Deberías ver:* un aviso de que se está *aprovisionando* (*provisioning*). Espera a que termine.

### Parte 4 — El truco de magia

9. **Abre IAM → Roles** y busca `AWSReservedSSO`.
   *Deberías ver:* **un rol nuevo que tú no creaste**, con un nombre como `AWSReservedSSO_ReadOnlyAccess_a1b2c3`. Ábrelo y mira su pestaña *Trust relationships*.
   *Deberías ver:* una política de confianza. Ahí está la prueba: tu conjunto de permisos **se convirtió en un rol de IAM normal y corriente**. Identity Center no inventó nada nuevo; automatizó lo de la lección 2.5.
   *No lo edites a mano:* Identity Center lo vuelve a escribir cada vez que reaprovisiona.

### Parte 5 — Entrar por la puerta nueva

10. **Busca el correo de invitación** de AWS y acepta. Pon una contraseña para `maria.prueba`.
    *Deberías ver:* que te pide configurar el doble factor (MFA). Configúralo con la misma app que usaste en la lección 1.5.

11. **Abre la URL del portal en una ventana privada** del navegador (para no cerrar tu sesión actual) y entra como `maria.prueba`.
    *Deberías ver:* una lista con tu cuenta de AWS y, debajo, el papel `ReadOnlyAccess`. **Eso es el selector de identidad**: no eliges "entrar", eliges *entrar como qué*.

12. **Pulsa el enlace de la consola** y, ya dentro, intenta crear cualquier cosa — por ejemplo un bucket en S3.
    *Deberías ver:* acceso denegado, igual que en la práctica de la 2.5. Es la misma mecánica, con la puerta de entrada de una empresa de verdad.

## 💰 Costo y limpieza

- **Qué creaste:** una organización de AWS, una instancia de Identity Center, un conjunto de permisos, un usuario y una asignación.
- **Qué se factura:** **nada**. IAM Identity Center es gratuito, AWS Organizations es gratuito y los roles que aparecieron tampoco cuestan. No entra en tu factura.
- **Limpieza:** puedes **dejarlo todo**. No cuesta dinero y tu cuenta se parece más a una profesional.
  - Si prefieres deshacerlo: primero **quita la asignación** (AWS accounts → tu cuenta → quitar el usuario), después borra el conjunto de permisos y el usuario, y por último, en **Settings → Management**, elimina la configuración de Identity Center. El rol `AWSReservedSSO_...` desaparece solo al quitar la asignación.
  - **Lo que sí conviene decidir ya:** si dejas Identity Center activo, **no cambies de región** buscándolo. Vive en `us-east-1` y solo aparece ahí.

## 💬 Ahora te toca a ti

**Pregunta:** Si trabajaras en una empresa con cinco edificios, ¿te parecería normal registrarte por separado en la recepción de cada uno?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No, y el motivo no es la pereza: es que cinco registros son cinco sitios donde tus datos pueden quedar desactualizados y cinco bajas que alguien tiene que recordar. Con usuarios IAM y varias cuentas de AWS pasa exactamente eso. Identity Center lo convierte en un solo registro y un solo portal, y las cuentas dejan de ser puertas separadas para ser opciones dentro de la misma puerta.

**Pregunta:** Cuando alguien se va de una empresa, ¿quién crees que se acuerda de **todos** los accesos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Nadie, y por eso el problema no se arregla pidiendo más cuidado. Se arregla haciendo que **solo haya un sitio del que dar de baja**. Si Identity Center está conectado al directorio de la empresa, el día que Recursos Humanos desactiva a esa persona, su acceso a todas las cuentas de AWS se cae en el mismo momento, sin que nadie de tecnología tenga que hacer nada. Los accesos huérfanos son de los agujeros de seguridad más comunes y más aburridos que existen.

**Pregunta:** Tu empresa ya sabe quién trabaja allí. ¿Por qué tendría que mantener otra lista aparte solo para la nube?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No debería, y ese es el argumento central de la lección. Dos listas de personas mantenidas a mano acaban diciendo cosas distintas: alguien cambia de equipo y solo se actualiza una, alguien se va y solo se borra de una. Identity Center existe para que la lista de humanos siga siendo la que la empresa ya mantiene por otros motivos, y AWS se limite a preguntarle. Los usuarios IAM quedan para las máquinas... y ni siquiera: para las máquinas están los roles.

## ⚠️ Errores comunes

- **Activas Identity Center en la región equivocada.** Solo vive en una región y no se mueve → para cambiarla hay que borrar toda la configuración y rehacerla. Decide la región **antes** de pulsar activar.
- **Buscas al usuario nuevo en IAM → Users y no aparece.** Los usuarios de Identity Center **no son usuarios IAM** → viven en su propio directorio, en el menú de Identity Center. Son dos listas distintas en dos sitios distintos.
- **Intentas entrar por la dirección normal de la consola.** Esa pantalla no conoce a `maria.prueba` → hay que entrar por la URL del portal (`d-xxxx.awsapps.com/start`). Guárdala en marcadores el primer día.
- **Editas a mano el rol `AWSReservedSSO_...`.** Parece un rol normal y lo es, pero lo gestiona Identity Center → tus cambios se pierden en el siguiente aprovisionamiento. Lo que hay que editar es el **conjunto de permisos**.
- **Asignas el conjunto de permisos y no funciona todavía.** El aprovisionamiento tarda unos segundos → espera a que el aviso desaparezca antes de probar.
- **Te asustas al ver "organización" y crees que es de pago.** AWS Organizations no cuesta nada → lo que cuesta es lo que haya *dentro* de cada cuenta. Agrupar cuentas es gratis, y de hecho es lo que permite ver la factura de todas juntas (módulo 17).

## 🎯 Para llevarte

- El usuario IAM no escala: multiplica personas por cuentas, y multiplica las bajas que alguien tiene que recordar.
- Identity Center da **una puerta de entrada única** y deja la lista de personas donde la empresa ya la tiene.
- Un **conjunto de permisos** no es un invento nuevo: se convierte en un **rol de IAM** real en cada cuenta donde se asigna.
- Entrar por el portal es **asumir un rol**. Credenciales temporales, igual que en la 2.5 y la 2.6.
- Para personas, en una empresa de hoy, los usuarios IAM quedan casi solo para la cuenta de emergencia.
- Reconocer una URL `d-xxxxxxxxxx.awsapps.com/start` te dice, sin preguntar, cómo gestiona los accesos esa empresa.

**En la próxima lección:** te queda un cabo suelto. Si las personas entran por un portal y los servicios usan roles, ¿para qué existen las **claves de acceso**, y por qué siguen apareciendo en todos los tutoriales? Vamos a ver cuándo una clave está justificada, cuándo es un error, y cómo trabajar desde tu terminal con la **AWS CLI** sin dejar secretos por el camino.
