# 2.3 — Gestión de accesos: IAM

> Dominio 2 · Task Statement 2.3 — Identify AWS access management capabilities

## 🤔 Antes de empezar

- En una oficina donde cada empleado tiene su credencial para entrar, ¿por qué no le darían a todos directamente la llave maestra del edificio?
- Si contratás a alguien por dos semanas, ¿le darías una credencial permanente o algo temporal?
- ¿Cómo harías para que un programa —no una persona— pueda acceder a algo, sin dejarle una contraseña anotada en algún lado?

## 📘 Contenido

En la lección 2.1 quedó claro que decidir **quién accede a qué** es siempre
tu responsabilidad. La herramienta para hacerlo se llama **IAM**
(*Identity and Access Management*, gestión de identidades y accesos). Es
gratis, y es el servicio que más se pregunta de todo este dominio.

Toda la lección usa la misma analogía: **un edificio de oficinas con
credenciales**.

### El usuario root: la llave maestra

Cuando creás una cuenta de AWS, nace con un único acceso: el **usuario
root**, el correo con el que te registraste. Es la llave maestra del
edificio: abre absolutamente todo, y nadie le puede quitar permisos.

Justamente por eso **no se usa para el trabajo diario**. Se le activa la
verificación en dos pasos, se guarda a resguardo y se lo deja para las pocas
tareas que solo él puede hacer (cerrar la cuenta, cambiar el plan de soporte,
modificar datos de facturación). Para todo lo demás se crean otros accesos.

### Usuarios y grupos

Un **usuario IAM** es la credencial personal de alguien: tiene nombre propio
y sus propios permisos. Cada persona debería tener el suyo, sin compartirlo
— si dos personas usan la misma credencial, cuando algo pasa no hay forma de
saber quién fue.

Un **grupo** es un departamento del edificio: "Contabilidad", "Soporte".
En vez de configurarle las puertas a cada empleado una por una, se las
configurás al departamento y después metés gente adentro. Si mañana entra
alguien nuevo a Contabilidad, lo agregás al grupo y ya tiene lo que
corresponde; si se va, lo sacás.

Un detalle que el examen pregunta: **un grupo no es una identidad**. No podés
"iniciar sesión como grupo" — el grupo solo existe para agrupar usuarios y
darles permisos de a muchos.

### Políticas: la lista de puertas que abre cada credencial

Una **política** es el documento que dice exactamente qué puede hacer una
credencial y sobre qué recursos. Es la lista de puertas que abre ese pase:
"puede entrar al depósito, puede leer los archivos de Contabilidad, no puede
tocar la sala de servidores".

Dos reglas que valen oro en el examen:

- **Todo lo que no está permitido, está prohibido.** Un usuario nuevo nace
  sin poder hacer absolutamente nada hasta que le asignes permisos.
- **Una prohibición explícita gana siempre.** Si una política le permite algo
  y otra se lo niega expresamente, gana la negación. Siempre.

### Roles: la credencial que se presta

Acá está el concepto más importante y el que más se confunde.

Un **rol** también tiene permisos, pero **no le pertenece a nadie de forma
permanente y no tiene contraseña**. Es la credencial de visitante que está
colgada en recepción: alguien la toma prestada, la usa un rato y la devuelve.
Las credenciales que entrega son temporales y vencen solas.

Sirve para tres situaciones típicas:

- **Una persona externa o de otro sector** que necesita entrar un rato a
  hacer algo puntual.
- **Otra cuenta de AWS** que necesita acceder a algo tuyo.
- **Un servicio de AWS**, y este es el caso clave: si tu servidor EC2 necesita
  leer archivos de un depósito de datos, le asignás un rol. El servidor
  "toma prestada" la credencial cuando la necesita.

¿Por qué importa tanto? Porque la alternativa sería anotar una contraseña o
una clave de acceso dentro del servidor, y ahí queda escrita, sin vencimiento,
esperando que alguien la encuentre. **Siempre que veas la opción de usar un
rol en vez de guardar claves en algún lado, esa es la respuesta correcta.**

| | Usuario | Rol |
|---|---|---|
| ¿A quién pertenece? | A una persona concreta | A nadie: se toma prestado |
| Credenciales | Permanentes (contraseña o clave) | Temporales, vencen solas |
| ¿Quién lo usa? | Personas | Personas, servicios u otras cuentas |

### MFA: la segunda prueba

**MFA** (autenticación multifactor) es pedir dos cosas distintas para entrar:
**algo que sabés** (la contraseña) y **algo que tenés** (un código que genera
tu teléfono). Es la credencial más la huella digital.

Sirve para que una contraseña robada no alcance por sí sola. Es
imprescindible en el usuario root —como ya vimos al crear la cuenta en la
lección 0.2— y muy recomendable en cualquier usuario con permisos amplios.

### Menor privilegio

El **principio de menor privilegio** dice que cada credencial debe tener
**solo los permisos que necesita para su tarea, ni uno más**. Al de
Contabilidad no le das la llave de la sala de servidores "por las dudas".

Es más simple empezar dando poco e ir agregando cuando algo falta, que dar
todo y después intentar recortar. Esta es la respuesta correcta en cualquier
pregunta que hable de "cómo asignar permisos de la forma más segura".

### IAM Identity Center: una credencial para varios edificios

Cuando una empresa crece, deja de tener una sola cuenta de AWS y pasa a tener
varias (una para desarrollo, otra para producción, otra por área). Crear
usuarios repetidos en cada una se vuelve un problema.

**IAM Identity Center** resuelve eso: la persona inicia sesión **una sola
vez** y desde ahí accede a todas las cuentas a las que tenga permiso. Además
se conecta con el sistema de usuarios que la empresa ya tenga, así no hay que
duplicar nada. Es la credencial única que abre varios edificios.

**En resumen:** el usuario root es la llave maestra y se guarda para
emergencias. Las personas usan usuarios IAM, agrupados en grupos para
administrar permisos de a muchos. Las políticas definen qué puede hacer cada
uno, sabiendo que sin permiso explícito no se puede nada y que una negación
siempre gana. Los roles son credenciales temporales que se prestan —sobre
todo a servicios, para no guardar claves escritas—, MFA agrega una segunda
prueba de identidad, y el menor privilegio manda dar siempre lo mínimo
necesario.

## 💬 Ahora te toca a ti

**Pregunta:** En una oficina donde cada empleado tiene su credencial para
entrar, ¿por qué no le darían a todos directamente la llave maestra del
edificio?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque cualquier error o descuido se vuelve
catastrófico: con la llave maestra, alguien que solo necesitaba entrar al
depósito podría borrar algo crítico sin querer, y si esa llave se filtra, se
pierde todo el edificio de una. Además, si todos usan la misma, no hay forma
de saber quién hizo qué. Eso es exactamente el **principio de menor
privilegio**: cada uno recibe solo los permisos que su tarea necesita, y por
eso en AWS el usuario root se guarda y se trabaja con usuarios IAM.

**Pregunta:** Si contratás a alguien por dos semanas, ¿le darías una
credencial permanente o algo temporal?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Algo temporal, que venza solo. Una credencial
permanente hay que acordarse de darla de baja, y si nadie se acuerda queda
activa para siempre. En AWS eso son los **roles**: no le pertenecen a nadie,
se toman prestados y entregan credenciales que vencen solas. Un usuario IAM,
en cambio, tiene credenciales permanentes que alguien tiene que revocar a
mano.

**Pregunta:** ¿Cómo harías para que un programa —no una persona— pueda
acceder a algo, sin dejarle una contraseña anotada en algún lado?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Asignándole un **rol**. Si un servidor EC2 necesita
leer archivos de un depósito de datos, se le asigna un rol y el servidor toma
prestadas credenciales temporales cada vez que las necesita. La alternativa
—guardar una clave de acceso dentro del servidor— deja esa clave escrita,
sin vencimiento, disponible para cualquiera que llegue a ese archivo. Por eso
en el examen, usar un rol siempre le gana a guardar claves.

## 🎯 Pistas para el examen

- Grabate la distinción de fondo: **usuario = permanente y de una persona;
  rol = temporal y prestado**. De ahí sale la regla más rentable del examen:
  si el escenario dice que **un servicio de AWS necesita acceder a otro**
  (por ejemplo, EC2 leyendo de un depósito de datos), la respuesta es
  **rol** casi sin excepción, y cualquier opción que proponga guardar claves
  de acceso dentro de la instancia es incorrecta.
- Ante cualquier pregunta sobre "la forma más segura de dar permisos", la
  respuesta involucra **menor privilegio**: empezar con lo mínimo y agregar
  después.
- Recordá las dos reglas de las políticas: **sin permiso explícito no se
  puede nada**, y **una negación explícita le gana a cualquier permiso**.
- Si una opción propone **usar el usuario root para tareas del día a día** o
  compartir sus credenciales, descartala de entrada. El root solo se usa para
  las pocas tareas que nadie más puede hacer.
- **IAM es gratis y es global**: no se cobra por crear usuarios y no se elige
  una Región al configurarlo. Aparece de vez en cuando como opción a descartar.
