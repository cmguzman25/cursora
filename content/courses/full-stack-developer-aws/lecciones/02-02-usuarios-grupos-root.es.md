# 2.2 — Usuarios, grupos y root: quién es quién en tu cuenta

> Módulo 2 · Lección 2.2 · Nivel: Básico · ⏱️ 35 min · 💚 Costo: $0

## 🤔 Antes de empezar

- En una empresa, ¿los permisos se le dan a la persona o al puesto que ocupa? ¿Qué pasa cuando entra alguien nuevo al mismo puesto?
- Si tú eres el único que va a trabajar en esta cuenta, ¿para qué crear un grupo de un solo integrante?
- ¿Se te ocurre alguna tarea que el dueño de una empresa **no** debería poder delegar en nadie?

## 📘 Cómo funciona

Hoy dejas de usar el usuario raíz. Al terminar esta lección vas a tener tu propia identidad, y root vuelve a la caja fuerte hasta que haga falta de verdad.

### Tres formas de estar en una cuenta

Ahora mismo tu cuenta tiene una sola identidad. Al final del módulo tendrá tres tipos:

| Identidad | Qué es | Cuándo se usa |
|---|---|---|
| **Usuario raíz** | El dueño de la cuenta, atado al correo del registro | Casi nunca: solo un puñado de tareas |
| **Usuario IAM** | Una persona con nombre, contraseña y permisos acotados | Tu trabajo diario, desde hoy |
| **Rol** | Una identidad prestada y temporal, sin contraseña | Programas y accesos puntuales (lecciones 2.5 y 2.6) |

### Los permisos van al puesto, no a la persona

Aquí viene la primera decisión de diseño, y es la que separa una cuenta ordenada de un desastre a los seis meses.

En una empresa, cuando contratan a un cajero nuevo, nadie se sienta a decidir desde cero a qué sistemas debe acceder: **hereda los permisos del puesto "cajero"**. Y si mañana el puesto necesita acceso a una herramienta nueva, se cambia una vez y todos los cajeros la tienen.

En AWS ese "puesto" es un **grupo**. Los permisos se le dan al grupo, y los usuarios se meten dentro. Ventajas concretas:

- Cambias un permiso en un sitio y afecta a todos los que lo necesitan.
- Cuando entra alguien, no adivinas permisos: lo metes en el grupo que corresponde.
- Cuando alguien se va, lo sacas del grupo y listo.
- Puedes mirar el grupo y responder "¿qué puede hacer un administrador aquí?" sin revisar persona por persona.

Y aquí está la respuesta a la segunda pregunta del inicio: **sí, vale la pena crear un grupo aunque seas uno solo.** Cuesta 20 segundos hoy, y el día que sumes a alguien —o que quieras un usuario aparte para pruebas— tendrás el sistema montado en vez de tener que reorganizarlo todo.

Dos límites que conviene saber: un usuario puede estar en varios grupos a la vez, y **los grupos no pueden contener otros grupos**. No hay jerarquías anidadas.

### Tu usuario administrador no es root

Vas a crear un usuario con la política `AdministratorAccess`, la de los dos asteriscos que leíste en la lección 2.1. Puede hacer prácticamente todo… pero **no todo**. Hay una lista corta de tareas reservadas al usuario raíz:

| Solo puede hacerlo root | Puede hacerlo tu usuario admin |
|---|---|
| Cerrar la cuenta | Crear y borrar cualquier recurso |
| Cambiar el correo o la contraseña raíz | Crear usuarios, grupos y roles |
| Cambiar el plan de soporte | Ver y configurar presupuestos |
| Cambiar la forma de pago | Desplegar aplicaciones |
| Recuperarte si te bloqueas a ti mismo con los permisos | Todo lo demás del curso |

Esa última fila es la que justifica todo: **root es tu paracaídas**. Si algún día escribes una política que te deja fuera de tu propia cuenta, entras con root y lo arreglas. Por eso no se comparte y por eso lleva MFA.

### La trampa de la facturación

Esta sorprende a todo el mundo, y ya la anticipamos en la lección 1.6: **un usuario IAM, aunque sea administrador, no ve la facturación por defecto**. Entras con tu usuario nuevo, buscas tus presupuestos y no aparecen.

No es un permiso de IAM: es un **interruptor de la cuenta** que solo root puede activar, en la configuración de la cuenta. Se llama *IAM user and role access to Billing information*. Lo vas a encender hoy, con root, antes de mudarte a tu nuevo usuario — porque si no, tendrías que volver a entrar como root solo para eso.

### Una honestidad sobre lo que hace la industria

Lo que vas a montar hoy —usuario IAM con contraseña y MFA— funciona perfectamente y es como empieza casi todo el mundo. Pero seamos precisos: **no es lo que AWS recomienda como primera opción para personas.**

La recomendación oficial es que los humanos accedan con **credenciales temporales** a través de **IAM Identity Center**, un sistema de inicio de sesión centralizado. Lo vemos en la lección 2.7, y ahí explicaré por qué no lo montamos hoy. Adelanto el motivo principal, que es de dinero y ya lo conoces: activar Identity Center crea una organización de AWS, y **eso sube automáticamente una cuenta de plan gratuito a plan de pago** (lo viste en la lección 1.4).

Para una persona aprendiendo con una sola cuenta, un usuario IAM con MFA y permisos acotados es una decisión razonable y segura. Solo tienes que saber que, en una empresa, la respuesta sería otra.

**En resumen:** los permisos se le dan al grupo (el puesto), no al usuario (la persona), aunque seas uno solo. Tu usuario administrador podrá hacer casi todo menos una lista corta de tareas que quedan reservadas a root, que es tu paracaídas. Y la facturación necesita un interruptor especial que solo root puede activar.

## 🛠️ Manos a la obra

> 📍 IAM es **global**: la región no importa.
> 💚 Costo de esta práctica: **$0**. Usuarios, grupos y políticas no cuestan nada.

Empieza con la sesión de **root** abierta. Vas a terminar la lección con otra identidad.

### Parte 1 — Con root, antes de mudarte

1. **Activa el acceso a la facturación.** Menú de tu nombre → **Account** → busca **IAM user and role access to Billing information** → **Edit** → marca **Activate IAM Access** → guarda.
   *Deberías ver:* el ajuste activado.
   *Por qué ahora:* es lo único de esta lección que **solo root puede hacer**. Si lo saltas, tu usuario nuevo no verá los presupuestos de la lección 1.6.

### Parte 2 — El grupo (el puesto)

2. **Abre IAM → User groups** (*grupos de usuarios*) → **Create group**.
   *Deberías ver:* un formulario con nombre y una lista de políticas.

3. **Nómbralo `fsaws-admins`** y, en la lista de políticas, busca y marca **`AdministratorAccess`**.
   *Deberías ver:* la política seleccionada abajo, en el resumen.
   *Por qué esta política:* mientras aprendes necesitas poder crear de todo. En la lección 2.4 verás cómo se reduce esto a lo mínimo necesario, que es lo que se hace en producción.

4. **Crea el grupo.**
   *Deberías ver:* `fsaws-admins` en la lista, con 0 usuarios y 1 política.

### Parte 3 — El usuario (la persona)

5. **IAM → Users → Create user.** Ponle tu nombre en minúsculas, por ejemplo `carlos`.
   *Deberías ver:* el formulario de creación.

6. **Marca "Provide user access to the AWS Management Console"** (*dar acceso a la consola*). Elige **I want to create an IAM user**.
   *Deberías ver:* opciones de contraseña.

7. **Elige una contraseña personalizada**, distinta de la de root, y **desmarca** la casilla de "el usuario debe crear una contraseña nueva al iniciar sesión" (esa cuenta es tuya, no de un tercero).
   *Deberías ver:* la contraseña aceptada.

8. **Añádelo al grupo `fsaws-admins`.** En el paso de permisos, elige **Add user to group** y marca el grupo.
   *Deberías ver:* el grupo seleccionado. Fíjate en que **no** le estás poniendo políticas directamente al usuario: eso es a propósito.

9. **Etiquétalo.** Añade `curso = fullstack-aws`, `modulo = 02` y, atención, **`borrar = no`**.
   *Por qué:* es tu primer recurso que **no** se borra al terminar el módulo. La etiqueta de la lección 1.9 empieza a ganarse el sueldo.

10. **Crea el usuario y guarda las credenciales.** AWS te mostrará la URL de acceso, el nombre de usuario y la contraseña.
    *Deberías ver:* un resumen descargable. Guárdalo en tu gestor de contraseñas ahora mismo: la contraseña no se vuelve a mostrar.
    *Ojo:* **no crees claves de acceso** (*access keys*) aquí, aunque te lo ofrezca. No las necesitas todavía y las vemos en la lección 2.8.

### Parte 4 — La mudanza

11. **Cierra sesión como root.**

12. **Entra con tu usuario nuevo** por la URL con alias que anotaste en la lección 2.1: `https://tu-alias.signin.aws.amazon.com/console`.
    *Deberías ver:* la consola, con **tu nombre de usuario** arriba a la derecha (no el nombre de la cuenta a secas).

13. **Ponle MFA a este usuario también.** Menú de tu nombre → **Security credentials** → sección MFA → **Assign MFA device**. Mismo procedimiento que en la lección 1.5, con un nombre distinto (por ejemplo `carlos-telefono`).
    *Deberías ver:* el dispositivo asignado.
    *Por qué:* este usuario es administrador. Sin MFA, tu cuenta está tan expuesta como si siguieras usando root con una sola llave.

14. **Comprueba quién eres ahora.** Abre CloudShell y ejecuta:

    ```bash
    aws sts get-caller-identity
    ```

    *Deberías ver:* el `Arn` termina ahora en `:user/carlos` en vez de `:root`. Compáralo con el resultado de la lección 1.8: esa línea es la prueba de que te mudaste.

15. **Verifica la facturación.** Busca `Billing` y entra a los presupuestos.
    *Deberías ver:* los dos presupuestos de la lección 1.6. Si te dice que no tienes permiso, es que el paso 1 no quedó guardado: vuelve a entrar con root y actívalo.

16. **Comprueba el límite de tu poder.** En **Account**, busca la opción de cerrar la cuenta o de cambiar el plan de soporte.
    *Deberías ver:* que no puedes usarla, o un aviso de que hace falta el usuario raíz. Eres administrador, no dueño — y esa diferencia es justo la que hace que root sea tu paracaídas.

## 💰 Costo y limpieza

- **Qué creaste:** un grupo, un usuario y una asignación de MFA. Nada de esto cuesta.
- **Qué se factura:** nada. IAM es gratuito.
- **Limpieza:** **no borres nada.** Este usuario y este grupo llevan `borrar = no` y son con los que harás el resto del curso.
- **A partir de ahora:** entra siempre por tu URL con alias, con tu usuario. Root solo para la lista corta de tareas de la tabla de arriba.
- **Guarda en tu gestor de contraseñas:** URL con alias, nombre de usuario y contraseña. Junto a las credenciales de root, que siguen en su caja fuerte.

## 💬 Ahora te toca a ti

**Pregunta:** En una empresa, ¿los permisos se le dan a la persona o al puesto que ocupa? ¿Qué pasa cuando entra alguien nuevo al mismo puesto?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Al puesto. Cuando entra alguien nuevo hereda los permisos de ese puesto, sin que nadie tenga que reconstruirlos de memoria. En AWS el puesto es el **grupo**: las políticas se enganchan ahí y los usuarios se meten dentro. La ventaja no es solo comodidad al crear, es al **cambiar**: si mañana los administradores necesitan un permiso más, lo añades una vez al grupo. Si los permisos estuvieran pegados a cada persona, tendrías que acordarte de todas — y a los seis meses, nadie se acuerda.

**Pregunta:** Si tú eres el único que va a trabajar en esta cuenta, ¿para qué crear un grupo de un solo integrante?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque cuesta veinte segundos ahora y evita una reorganización después. En cuanto sumes un segundo usuario —un colaborador, o un usuario de pruebas con permisos recortados como el del ejercicio 2.10— la estructura ya está lista. Es la misma lógica que ordenar los cables con una etiqueta cuando solo tienes dos: no es por hoy, es por el día que tengas ocho. Y hay un beneficio inmediato: mirar el grupo responde "¿qué puede hacer un administrador en esta cuenta?" de un vistazo.

**Pregunta:** ¿Se te ocurre alguna tarea que el dueño de una empresa **no** debería poder delegar en nadie?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Cerrar la empresa, cambiar la cuenta bancaria donde entra el dinero, o modificar quién es el dueño. AWS piensa igual: cerrar la cuenta, cambiar el correo raíz, cambiar la forma de pago y cambiar el plan de soporte quedan reservados al usuario raíz, por muy administrador que seas. Hay una razón práctica además de la simbólica: si esas tareas se pudieran delegar, un atacante que comprometa a un administrador podría cambiar el correo de recuperación y quedarse con la cuenta para siempre. Al reservarlas, siempre queda una vía de vuelta.

## ⚠️ Errores comunes

- **El usuario nuevo no ve la facturación.** Aparece "acceso denegado" en Billing → falta el interruptor *IAM user and role access to Billing information*, que **solo root** puede activar (paso 1).
- **Seguir entrando con root por costumbre.** El correo está guardado en el navegador y es más rápido → borra ese acceso rápido y guarda en su lugar la URL con alias. La costumbre se cambia quitando la tentación.
- **Poner las políticas directamente en el usuario.** Es un clic menos hoy → y un desorden mañana. Las políticas van al grupo; el usuario va al grupo.
- **Olvidar el MFA del usuario nuevo.** "Ya le puse MFA a root" → son identidades distintas. Un administrador sin MFA es la puerta de atrás de toda tu cuenta.
- **Crear claves de acceso al vuelo.** El asistente lo ofrece y se aceptan "por si acaso" → son credenciales de larga duración que no necesitas aún. En la lección 2.8 verás cuándo sí y cuándo nunca.
- **Perder la contraseña del usuario nuevo.** Solo se muestra una vez → si pasa, entras con root y le asignas una contraseña nueva. Para eso es el paracaídas.

## 🎯 Para llevarte

- Root es el dueño; tu usuario IAM es quien trabaja. Desde hoy entras con el segundo.
- Los permisos van al **grupo** (el puesto), no al usuario (la persona). Vale la pena aunque seas uno solo.
- Un administrador puede casi todo, pero no cerrar la cuenta, cambiar el pago, el correo raíz ni el plan de soporte.
- La facturación necesita un interruptor que solo root activa.
- Tu usuario administrador también necesita MFA. Sin excepción.

**En la próxima lección:** abrimos el documento que decide todo esto. Vas a aprender a leer una política IAM en JSON sin que te dé miedo: qué significan `Effect`, `Action`, `Resource` y `Condition`, y cómo se traduce ese texto a "puedes o no puedes".
