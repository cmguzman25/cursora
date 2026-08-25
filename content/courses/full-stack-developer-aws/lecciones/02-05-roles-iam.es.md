# 2.5 — Roles IAM: identidad prestada, el concepto que más cuesta y más se usa

> Módulo 2 · Lección 2.5 · Nivel: Básico · ⏱️ 35 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Cuando entras de visita a una oficina y en recepción te dan un pase temporal, ¿por qué crees que no te dan una llave normal del edificio?
- Si un programa necesita leer archivos de tu cuenta de AWS, ¿dónde guardarías su contraseña para que nadie la robe?
- ¿Qué diferencia hay entre **ser** alguien y **hacer de** alguien durante un rato?

## 📘 Cómo funciona

Llegas a una oficina a una reunión. En recepción no te dan una llave: te dan un **pase de visitante**. Ese pase abre solo la planta 3, deja de funcionar a las seis de la tarde, y no es tuyo — lo devuelves al salir.

Fíjate en tres cosas de ese pase, porque son exactamente las tres cosas que hace un rol en AWS:

- **No tiene dueño.** Mañana se lo dan a otra persona.
- **Caduca solo.** Nadie tiene que acordarse de desactivarlo.
- **Para conseguirlo hay que estar autorizado.** No basta con querer el pase: recepción comprueba que estás en la lista.

Un **rol de IAM** es eso: una identidad **sin contraseña y sin dueño**, que se pide prestada por un rato.

### El problema que vino a resolver

Hasta ahora todas las identidades que conoces tienen credenciales permanentes. Tu usuario tiene una contraseña, y esa contraseña sirve hasta que la cambies.

Eso funciona para personas. Ahora imagina que escribes un programa que necesita leer archivos de AWS. La tentación es obvia: creas un usuario IAM para el programa, le generas unas claves de acceso, y las pegas en el código.

Es la decisión que más incidentes ha causado en la historia de la nube. Por cuatro motivos:

- **La clave no caduca.** Sirve hoy y sirve dentro de tres años.
- **Viaja con el código.** A tu portátil, al de tus compañeros, al servidor.
- **Acaba en Git.** No porque seas descuidado: porque basta un `git add .` en el momento equivocado. Hay robots recorriendo GitHub que encuentran claves de AWS en menos de un minuto.
- **Cambiarla es trabajo manual.** Y por eso nadie la cambia nunca.

Un rol elimina el problema de raíz: **no hay ninguna clave que guardar**.

### Un rol tiene dos políticas, no una

Aquí está el punto que más cuesta, y el que separa a quien entiende roles de quien los copia de un tutorial.

Un usuario tiene **una** clase de política: la de permisos, la que viste en la 2.3 y la 2.4. Un rol tiene **dos**, y hacen trabajos distintos:

| | Política de confianza | Políticas de permisos |
|---|---|---|
| Responde a | **¿QUIÉN** puede ponerse el rol? | **¿QUÉ** puede hacer quien lo lleva puesto? |
| En la analogía | La lista de recepción | Qué puertas abre el pase |
| Cuántas hay | Siempre **una** | Hasta 10, como cualquier identidad |
| Dónde se ve | Pestaña *Trust relationships* | Pestaña *Permissions* |

Si te confundes de política, el síntoma es muy reconocible: **le das todos los permisos del mundo al rol y nadie consigue usarlo**. Los permisos estaban bien; la puerta estaba cerrada.

La política de confianza se lee igual que las de la 2.3, pero trae un campo nuevo, `Principal`, que significa *quién*:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "lambda.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Léelo en voz alta: *"permite que el servicio Lambda se ponga este rol"*. No hay `Resource`, porque el recurso es el rol mismo.

### Qué pasa cuando alguien se pone el rol

El verbo técnico es **asumir** el rol (*assume role*). Por dentro ocurre esto:

1. La identidad pide asumir el rol.
2. Un servicio de AWS llamado **STS** (*Security Token Service*, el servicio de credenciales temporales) comprueba la política de confianza.
3. Si pasa el control, STS devuelve **credenciales temporales**: no una contraseña, sino tres datos que caducan.
4. Con esas credenciales se actúa como el rol, hasta que expiran.

**Por defecto duran una hora.** Se puede ajustar entre 15 minutos y 12 horas, pero la idea es que sean cortas.

Y ahí está la ganancia. Si alguien roba las claves permanentes de un usuario, tiene acceso hasta que alguien se dé cuenta —semanas, quizá meses—. Si alguien roba unas credenciales temporales de un rol, **le quedan cuarenta minutos**.

### Los tres usos que vas a ver siempre

- **Un servicio de AWS que necesita hacer algo.** Una función Lambda que lee un bucket, un servidor EC2 que escribe en una base de datos. Es el uso más común con diferencia, y es la lección 2.6 completa.
- **Una persona que se cambia de sombrero.** Tú, hoy, en la práctica. Entras como tu usuario y te pones un rol más limitado para una tarea concreta.
- **Otra cuenta de AWS.** Las empresas separan producción y pruebas en cuentas distintas, y los permisos cruzan de una a otra con roles.

### Una idea a la que hay que acostumbrarse

Cuando asumes un rol, **dejas de ser quien eras** mientras dura la sesión. No sumas permisos: los cambias. Si eres administrador y te pones un rol de solo lectura, durante esa sesión **no puedes crear nada**, aunque tu usuario sí pueda.

Es incómodo la primera vez y es exactamente lo que queremos: así puedes hacer trabajo delicado con las manos atadas a propósito.

Si te sirve verlo lado a lado:

| | Usuario IAM | Rol IAM |
|---|---|---|
| Credenciales | Contraseña y claves **permanentes** | Temporales, caducan solas |
| Dueño | Una persona concreta | Nadie |
| Cómo se usa | Inicias sesión | Lo **asumes** por un rato |
| Quién puede usarlo | Solo quien tiene la contraseña | Quien pase la política de confianza |
| Para aplicaciones | ❌ Casi nunca | ✅ Siempre que se pueda |

Esa última fila es la que conviene memorizar. Si estás a punto de crear un usuario para algo que no es una persona, para y pregúntate si no hay un rol.

**En resumen:** un rol es una identidad prestada, sin contraseña y sin dueño. Tiene una política de confianza que dice quién puede ponérselo y unas políticas de permisos que dicen qué puede hacer. Al asumirlo recibes credenciales que caducan solas, y mientras lo llevas puesto tus permisos son los del rol, no los tuyos.

## 🛠️ Manos a la obra

> 📍 IAM es **global**: la región no importa.
> 💚 Costo de esta práctica: **$0**. Los roles y las credenciales temporales no cuestan nada.

Entra con **tu usuario** (el de la lección 2.2). Esta práctica **no funciona con root**: el usuario root no puede asumir roles, y en un rato vas a ver por qué eso tiene sentido.

### Parte 1 — Crear el rol

1. **IAM → Roles → Create role.**
   *Deberías ver:* una pantalla que pregunta por el tipo de entidad de confianza (*trusted entity type*).

2. **Elige `AWS account`** (*cuenta de AWS*) y deja marcada la opción **This account** (*esta cuenta*).
   *Deberías ver:* tu número de cuenta de 12 dígitos ya rellenado.
   *Por qué:* le estás diciendo "las identidades de mi propia cuenta podrán ponerse este rol". Eso es la política de confianza, y la estás escribiendo con clics.

3. **En permisos, busca y marca `AmazonS3ReadOnlyAccess`.**
   *Deberías ver:* la política seleccionada abajo.
   *Por qué esta:* es deliberadamente distinta de lo que tú puedes hacer. Queremos notar el cambio.

4. **Nómbralo `fsaws-solo-lectura-s3`** y añade las etiquetas `curso = fullstack-aws`, `modulo = 02` y `borrar = no`.
   *Deberías ver:* el resumen antes de crear.

5. **Crea el rol y ábrelo.** Copia el **nombre exacto** y apunta tu **ID de cuenta** (12 dígitos, arriba a la derecha en el menú de tu nombre). Los vas a necesitar en un minuto.

### Parte 2 — Leer las dos políticas

6. **Mira la pestaña `Permissions`.**
   *Deberías ver:* `AmazonS3ReadOnlyAccess`. Esto es el **qué**.

7. **Ahora la pestaña `Trust relationships`** (*relaciones de confianza*) → **Edit trust policy** para ver el JSON.
   *Deberías ver:* un `Principal` con algo parecido a `"AWS": "arn:aws:iam::123456789012:root"` y `"Action": "sts:AssumeRole"`. Esto es el **quién**.
   *Ojo con ese `:root`:* **no significa el usuario root**. En una política de confianza quiere decir "la cuenta entera", es decir, cualquier identidad de tu cuenta **que además tenga permiso de IAM para asumirlo**. Confunde a todo el mundo la primera vez.

8. **Cierra sin guardar.** Solo veníamos a leer.

### Parte 3 — Ponerte el rol

9. **Menú de tu nombre (arriba a la derecha) → Switch role** (*cambiar de rol*) → **Switch role** otra vez.
   *Deberías ver:* un formulario con cuenta, rol, nombre para mostrar y color.

10. **Rellénalo:** tu ID de cuenta, el nombre `fsaws-solo-lectura-s3`, un nombre para mostrar (`solo-lectura`) y **elige un color llamativo**, por ejemplo el rojo.
    *Por qué el color:* pinta la barra superior mientras llevas el rol puesto. Es tu recordatorio visual de que no eres tú. En equipos serios, producción siempre lleva color.

11. **Pulsa Switch role.**
    *Deberías ver:* la barra de arriba cambiada de color, con `solo-lectura` donde antes estaba tu nombre.

### Parte 4 — Comprobar que de verdad estás atado

12. **Abre S3.** (Consola AWS → S3 → Buckets.)
    *Deberías ver:* la lista de buckets, vacía o no. Puedes mirar: el rol da lectura de S3.

13. **Intenta crear un bucket.** Pulsa **Create bucket**, ponle cualquier nombre y dale a crear.
    *Deberías ver:* un error de acceso denegado. **Y ese error es el objetivo de la práctica.** Tu usuario es administrador y podría crearlo sin problema — pero ahora mismo no eres tu usuario.

14. **Abre IAM → Users.**
    *Deberías ver:* otro acceso denegado. El rol solo sabe de S3.

15. **Vuelve a ti.** Menú de arriba a la derecha → **Back to** *(tu nombre de usuario)*.
    *Deberías ver:* la barra vuelve a su color normal. Prueba otra vez a entrar en IAM → Users: ahora sí.

Acabas de hacer, a mano y en dos clics, lo mismo que hace una función Lambda cada vez que se ejecuta.

## 💰 Costo y limpieza

- **Qué creaste:** un rol de IAM con una política de AWS adjunta.
- **Qué se factura:** **nada**. Los roles son gratis, asumirlos es gratis y las llamadas a STS no se cobran. IAM sigue sin aparecer en tu factura.
- **Limpieza:** **no borres el rol** (`borrar = no`). En la lección 2.9 vas a revisar los accesos de tu cuenta y este rol va a aparecer en el informe — conviene que lo reconozcas y sepas por qué está ahí.
- **Nota:** las credenciales temporales que usaste ya caducaron o caducarán solas. No hay nada que desactivar. Esa es justamente la gracia.

## 💬 Ahora te toca a ti

**Pregunta:** Cuando entras de visita a una oficina y en recepción te dan un pase temporal, ¿por qué crees que no te dan una llave normal del edificio?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque una llave es permanente y no se sabe dónde acaba. El pase resuelve tres problemas a la vez: caduca solo (nadie tiene que acordarse de retirártelo), abre solo lo que necesitas ese día, y no es tuyo, así que mañana se lo pueden dar a otro sin cambiar ninguna cerradura. Un rol de IAM hace exactamente eso: identidad temporal, acotada y sin dueño.

**Pregunta:** Si un programa necesita leer archivos de tu cuenta de AWS, ¿dónde guardarías su contraseña para que nadie la robe?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** En ningún sitio, porque la respuesta correcta es **no tener contraseña**. Cualquier lugar donde la guardes —el código, un archivo de configuración, una variable de entorno— es un lugar del que se puede filtrar, y además una clave permanente sigue sirviendo dentro de tres años. Con un rol, el programa pide credenciales cuando arranca, las recibe caducadas de fábrica, y no hay ningún secreto que proteger. Si la pregunta te salió con la forma "¿dónde la guardo?", es señal de que el problema estaba mal planteado desde el principio.

**Pregunta:** ¿Qué diferencia hay entre **ser** alguien y **hacer de** alguien durante un rato?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que cuando *eres* alguien, tus permisos van contigo a todas partes y todo el tiempo. Cuando *haces de* alguien, tienes sus permisos y **solo los suyos**, durante un rato acotado. Por eso al asumir un rol no sumas permisos: los sustituyes. Lo comprobaste en la práctica cuando, siendo administrador, no pudiste crear un bucket. Esa pérdida temporal de poder no es un fallo: es la herramienta.

## ⚠️ Errores comunes

- **Estás con root y no encuentras "Switch role".** El usuario root **no puede asumir roles** → entra con tu usuario IAM. Tiene lógica: root ya lo puede todo, y ponerle un disfraz no añadiría seguridad, solo confusión.
- **Le das permisos al rol y aun así nadie puede asumirlo.** Confundiste las dos políticas → los permisos están en *Permissions*, pero **quién puede ponérselo** está en *Trust relationships*. Cuando falle un rol, mira primero la de confianza.
- **"Invalid information" al cambiar de rol.** El nombre del rol **distingue mayúsculas** y el ID de cuenta son 12 dígitos sin guiones → cópialos de la página del rol, no los escribas de memoria.
- **Interpretas el `:root` de la política de confianza como el usuario root.** No lo es → ahí significa "esta cuenta". Un rol que confía en `arn:aws:iam::CUENTA:root` puede ser asumido por cualquier identidad de esa cuenta que tenga permiso de IAM para hacerlo.
- **A la hora te echa de la sesión del rol.** No es un fallo → las credenciales temporales caducan por diseño. Vuelve a asumirlo. Si necesitas más tiempo, se ajusta la duración máxima en el propio rol.
- **Creas un usuario IAM con claves de acceso para una aplicación.** Es el atajo que parece razonable y no lo es → si la aplicación corre dentro de AWS, siempre hay un rol para eso. Lo vemos en la lección 2.6, y en la 2.8 veremos los pocos casos en los que una clave de acceso sí está justificada.

## 🎯 Para llevarte

- Un rol es una **identidad prestada**: sin contraseña, sin dueño, y con credenciales que caducan solas.
- Dos políticas, dos preguntas distintas: la de **confianza** dice *quién* puede ponérselo; las de **permisos**, *qué* puede hacer.
- Asumir un rol **sustituye** tus permisos, no los suma. Por eso un administrador con un rol de solo lectura no puede escribir.
- Si tu solución a un problema de acceso incluye guardar una clave en algún sitio, casi siempre existe un rol que lo hace mejor.
- El color de la barra al cambiar de rol no es decoración: es la señal de que estás operando con otra identidad.

**En la próxima lección:** ya te has puesto un rol a mano. Ahora vamos a ver cómo lo hace una máquina: una función Lambda que lee un bucket de S3 sin que en su código aparezca ni una sola credencial. Es el patrón que vas a repetir el resto del curso.
