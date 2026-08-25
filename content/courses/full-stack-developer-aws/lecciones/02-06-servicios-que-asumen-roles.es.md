# 2.6 — Cómo un servicio asume un rol: el caso de una Lambda leyendo un bucket

> Módulo 2 · Lección 2.6 · Nivel: Básico · ⏱️ 35 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Si contratas a una empresa de limpieza para tu oficina, ¿le darías una copia de la llave a cada empleado que venga?
- Un programa que corre en tu portátil se identifica ante AWS con unas claves. ¿Cómo crees que se identifica un programa que corre **dentro** de AWS?
- Si mañana una función tuya empieza a hacer algo que no debería, ¿dónde mirarías para saber qué tenía permitido?

## 📘 Cómo funciona

Contratas una empresa de limpieza. No le das una copia de la llave a cada persona que venga: sería imposible de controlar y tendrías que cambiar la cerradura cada vez que alguien se va.

Lo que haces es registrar **a la empresa** en recepción. Quien venga hoy recoge un pase, ese pase abre solo las oficinas que limpian, y lo devuelve al salir. Mañana viene otra persona y usa el mismo mecanismo. Tú nunca repartes llaves: autorizas a la empresa y defines qué puertas abre el pase.

En AWS, ese pase es el **rol de ejecución** (*execution role*), y la empresa de limpieza es el servicio que ejecuta tu código.

### Toda Lambda lleva un rol puesto, siempre

Primero, dos palabras nuevas en cristiano. Las dos tienen su módulo entero más adelante, así que aquí solo necesitas la idea:

- **S3** es el almacén de archivos de AWS. Guardas archivos dentro de contenedores llamados **buckets** (*cubos*). Es el módulo 5.
- **Lambda** es un servicio donde subes una función —un trozo de código— y AWS la ejecuta cuando hace falta. No hay servidor que administrar. Es el módulo 6.

Lo que importa hoy: **una función Lambda no puede existir sin un rol**. No es opcional ni un ajuste avanzado. Al crearla, AWS te obliga a elegir uno, y si no lo haces, te lo crea.

Ese rol es su identidad. Cuando la función lee un bucket, quien lee no es tu usuario ni el mío: es el rol.

### La cadena completa, paso a paso

Esto es lo que ocurre cada vez que tu función se ejecuta, sin que tú hagas nada:

1. Llega una petición y Lambda arranca tu función.
2. Lambda le pide a **STS** (el servicio de credenciales temporales de la 2.5) que le preste el rol de ejecución.
3. STS comprueba la política de confianza del rol. Y aquí está el reencuentro: esa política es exactamente la que leíste en la lección anterior.

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

*"Permite que el servicio Lambda se ponga este rol."* Sin esa línea, tu función no arranca.

4. STS devuelve credenciales temporales y Lambda **las deja en el entorno de la función**, en unas variables que tu código no tiene ni que mirar.
5. Tu código llama a AWS. La librería oficial de AWS (el **SDK**, el conjunto de herramientas para hablar con AWS desde el código) encuentra esas credenciales sola.

El resultado es este, y merece un momento de atención:

```js
// Fíjate en el paréntesis vacío: no hay usuario, ni clave, ni contraseña.
const s3 = new S3Client({});
```

Ese `{}` vacío es el punto entero de la lección. El SDK busca credenciales en un orden fijo, y dentro de Lambda las encuentra en el entorno. **No hay nada que guardar, nada que rotar y nada que filtrar.**

### Por qué el mismo código funciona en sitios distintos

Cuando no le pasas credenciales, el SDK no se rinde: las busca por su cuenta, en un orden establecido. Simplificando, mira en este orden:

1. Lo que le pasaste en el código (aquí, nada).
2. Las **variables de entorno** del proceso.
3. El archivo de configuración de tu máquina (`~/.aws/credentials`), que verás en la 2.8.
4. La identidad que le da el servicio donde está corriendo: el rol de Lambda, de EC2 o de un contenedor.

Se para en el primer sitio donde encuentra algo. Dentro de Lambda gana el paso 2, porque el servicio ya dejó ahí las credenciales del rol.

Esto tiene una consecuencia práctica muy cómoda: **el mismo código funciona en tu portátil y dentro de AWS sin cambiar una línea**. Lo único que cambia es de dónde salen las credenciales. Cuando alguien dice "en mi máquina funcionaba", en AWS suele significar que en el portátil había un perfil con permisos de sobra y el rol de la función es más estrecho.

### El rol que AWS te crea es casi inútil, y está bien que lo sea

Cuando creas una función desde la consola, AWS te ofrece crear un rol "con permisos básicos". Ese rol sabe hacer **una sola cosa**: escribir en los registros (*logs*).

Nada más. No puede leer un bucket, ni escribir en una base de datos, ni llamar a otro servicio.

La primera vez esto se siente como un obstáculo. No lo es: es **menor privilegio de fábrica** (lección 2.4). AWS no adivina qué necesita tu función, así que no le da nada. Cada permiso que tenga, lo habrás puesto tú a conciencia.

Y como no lo adivina, el camino correcto es justo el que aprendiste: **empezar corto, dejar que falle y leer el error**. Eso es lo que vas a hacer en la práctica, a propósito.

### Cómo se ve esta identidad cuando algo falla

Cuando el permiso falta, el error trae el nombre de quien lo intentó:

```
User: arn:aws:sts::123456789012:assumed-role/fsaws-lee-bucket-role-a1b2/fsaws-lee-bucket
is not authorized to perform: s3:GetObject on resource: arn:aws:s3:::fsaws-roles-1234/hola.txt
```

Léelo con calma, porque cuenta toda la historia:

- `sts:` en vez de `iam:` → son credenciales temporales.
- `assumed-role/` → quien actúa es **un rol asumido**, no un usuario.
- Después vienen el nombre del rol y el de la sesión.
- Y al final, en bandeja: **qué acción faltó y sobre qué recurso**.

Ese mensaje es literalmente la receta de la política que te falta. No hay que adivinar nada.

**En resumen:** los servicios de AWS no usan contraseñas: se ponen un rol. Lambda pide credenciales temporales a STS en cada ejecución y las deja donde el SDK las encuentra solo, por eso el código no lleva claves. El rol que AWS crea por defecto solo escribe logs, y cada permiso extra lo añades tú leyendo los errores reales.

## 🛠️ Manos a la obra

> 📍 Región del curso: **us-east-1 (N. Virginia)**. Verifícala arriba a la derecha **antes de empezar**, y no la cambies a mitad.
> 💚 Costo de esta práctica: **$0**. Lambda tiene 1 millón de peticiones al mes **siempre gratis**, y vas a usar unas cinco. El archivo pesa unos bytes.

Entra con **tu usuario** (no con root, y no con el rol de solo lectura de la lección anterior: hoy necesitas crear cosas).

### Parte 1 — Un archivo que leer

1. **Consola AWS → S3 → Buckets → Create bucket.** Nómbralo `fsaws-roles-` seguido de cuatro números al azar, por ejemplo `fsaws-roles-4821`.
   *Deberías ver:* el nombre aceptado en verde. Si dice que ya existe, cambia los números: los nombres de bucket son únicos **en todo AWS**.
   *Deja todo lo demás como está* y crea el bucket.

2. **Añade la etiqueta** `curso = fullstack-aws` en la sección de etiquetas (o después, en la pestaña *Properties*).

3. **Entra al bucket → Upload → Add files.** Sube un archivo de texto llamado `hola.txt` con una frase cualquiera dentro. Créalo en el bloc de notas si no tienes ninguno.
   *Deberías ver:* `hola.txt` en la lista de objetos.

### Parte 2 — La función y el rol que nace con ella

4. **Consola AWS → Lambda → Create function.** Elige **Author from scratch** (*empezar desde cero*), nómbrala `fsaws-lee-bucket` y en *Runtime* elige la versión más reciente de **Node.js**.
   *Deberías ver:* debajo, una sección plegada llamada *Change default execution role*.

5. **Ábrela y comprueba** que está marcada la opción de **crear un rol nuevo con permisos básicos**. Déjala así y crea la función.
   *Deberías ver:* el editor de código con un archivo `index.mjs`.

6. **Ve a la pestaña `Configuration` → `Permissions`.**
   *Deberías ver:* el nombre del rol que AWS acaba de crear sola, algo como `fsaws-lee-bucket-role-a1b2c3d4`. Ábrelo en una pestaña nueva.

7. **En ese rol, mira las dos pestañas:**
   - `Permissions` → una sola política, de escribir logs. **Nada de S3.**
   - `Trust relationships` → el JSON con `"Service": "lambda.amazonaws.com"`.
   *Deberías ver:* exactamente el documento de la teoría. Ahí está tu Lambda autorizada a ponerse este rol, y nada más.

### Parte 3 — Que falle (esto es lo que veníamos a hacer)

8. **Vuelve a la función, pestaña `Code`.** Borra todo lo que hay en `index.mjs` y pega esto, cambiando el nombre del bucket por el tuyo:

```js
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

// Sin credenciales: el SDK las toma del rol de ejecución.
const s3 = new S3Client({});

export const handler = async () => {
  const respuesta = await s3.send(
    new GetObjectCommand({
      Bucket: "fsaws-roles-4821", // <-- pon aquí tu bucket
      Key: "hola.txt",
    })
  );

  const texto = await respuesta.Body.transformToString();
  return { contenido: texto };
};
```

9. **Pulsa `Deploy`** (*desplegar*) para guardar el código.
   *Deberías ver:* un aviso de que los cambios se desplegaron.

10. **Pestaña `Test` → crea un evento de prueba** con cualquier nombre, deja el contenido por defecto y pulsa **Test**.
    *Deberías ver:* un recuadro rojo con `AccessDenied`. **Enhorabuena: eso es el éxito de esta práctica.**

11. **Busca en el mensaje la parte que dice `is not authorized to perform`.** Anota la acción exacta que aparece ahí.
    *Deberías ver:* `s3:GetObject`. El error te acaba de decir qué permiso escribir.

### Parte 4 — Arreglarlo con lo mínimo

12. **Vuelve al rol** (la pestaña que dejaste abierta) → **Add permissions** → **Create inline policy** → pestaña **JSON**. Pega esto con tu nombre de bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::fsaws-roles-4821/*"
    }
  ]
}
```

*Por qué inline:* este permiso es exclusivo de esta función. Si algún día borras la función y su rol, el permiso se va con ellos (lección 2.4).
*Por qué solo `GetObject` y no `s3:*`:* porque es lo único que el error pidió. Ni una acción más.

13. **Nómbrala `leer-hola-txt`** y guárdala.
    *Deberías ver:* dos políticas en el rol: los logs y la tuya.

14. **Vuelve a la función y pulsa `Test` otra vez.** Espera unos segundos si vuelve a fallar: los cambios de IAM tardan un momento en propagarse.
    *Deberías ver:* un recuadro verde con el contenido de tu archivo. **Y en ningún momento escribiste una credencial.**

## 💰 Costo y limpieza

- **Qué creaste:** un bucket con un archivo diminuto, una función Lambda y un rol de ejecución.
- **Qué se factura:** nada en la práctica. Lambda incluye **1 millón de peticiones y 400.000 GB-segundo al mes de forma permanente** (*Always Free*, no caduca a los 12 meses). S3 entra en los **5 GB gratis durante 12 meses** para cuentas nuevas; tu archivo pesa unos bytes.
- **Limpieza, en este orden** (importa: no se puede borrar un bucket con archivos dentro):
  1. **S3 → tu bucket → Empty** (*vaciar*), confirma escribiendo `permanently delete`.
  2. **S3 → tu bucket → Delete**.
  3. **Lambda → `fsaws-lee-bucket` → Actions → Delete**.
  4. **IAM → Roles → busca `fsaws-lee-bucket-role-...` → Delete.** Este paso se olvida siempre: **borrar la función no borra su rol**. Los roles huérfanos se acumulan durante años en las cuentas reales.
- **Confirma** que la lista de buckets ya no lo muestra y que el rol no aparece en IAM.
- Mañana, echa un ojo a **Billing → Free Tier** por costumbre, aunque aquí no debería moverse nada.

## 💬 Ahora te toca a ti

**Pregunta:** Si contratas a una empresa de limpieza para tu oficina, ¿le darías una copia de la llave a cada empleado que venga?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No, porque perderías el control: cada copia es permanente, viaja contigo sin saberlo y cuando alguien se va de la empresa habría que cambiar la cerradura. Lo razonable es autorizar **a la empresa** y que quien venga use un pase temporal que abre solo lo suyo. Un rol de ejecución es eso: no autorizas cada ejecución de tu función una por una, autorizas al servicio Lambda a ponerse el rol, y cada ejecución recibe un pase que caduca.

**Pregunta:** Un programa que corre en tu portátil se identifica ante AWS con unas claves. ¿Cómo crees que se identifica un programa que corre **dentro** de AWS?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No se identifica: **lo identifican**. El servicio que lo ejecuta le pide credenciales temporales a STS antes de arrancarlo y se las deja en el entorno, así que el SDK las encuentra sin que el código pida nada. Por eso `new S3Client({})` va vacío. La diferencia con el portátil es que dentro de AWS hay alguien de confianza que puede responder por el programa; fuera, no lo hay, y por eso ahí sí hacen falta claves (lección 2.8).

**Pregunta:** Si mañana una función tuya empieza a hacer algo que no debería, ¿dónde mirarías para saber qué tenía permitido?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** En su rol de ejecución: `Configuration → Permissions` en la función, y de ahí al rol en IAM. Ahí están las dos respuestas que importan — *quién* podía ponérselo (política de confianza) y *qué* podía hacer (políticas de permisos). El código puede tener errores, pero **el daño posible lo fija el rol**, no el código. Es la misma idea de la 2.4 aplicada a una máquina.

## ⚠️ Errores comunes

- **`Task timed out after 3.00 seconds`.** La función tarda más que el límite por defecto → *Configuration → General configuration → Edit* y sube el tiempo de espera a 10 segundos. Es habitual en la primera ejecución, cuando la función arranca en frío.
- **Sigue dando `AccessDenied` justo después de arreglar la política.** Los cambios de IAM tardan unos segundos en propagarse → espera y prueba otra vez antes de tocar nada más. Muchísima gente rompe una política correcta por impaciencia.
- **`NoSuchKey`.** El nombre del archivo no coincide → en S3 las mayúsculas importan: `Hola.txt` y `hola.txt` son dos archivos distintos. Copia el nombre desde la lista de objetos.
- **`PermanentRedirect` o un error de región.** El bucket está en una región distinta de la función → los dos tienen que estar en `us-east-1`. Comprueba arriba a la derecha; el error número uno del principiante sigue siendo este.
- **Guardas claves de acceso en las variables de entorno de la Lambda.** Es innecesario y peligroso → la función ya tiene identidad. Si sientes que necesitas una clave dentro de AWS, casi siempre es que le falta un permiso al rol.
- **Borras la función y das la limpieza por hecha.** El rol de ejecución sigue vivo → bórralo aparte. Un rol sin dueño con permisos sobre tus datos es exactamente lo que busca un atacante en una cuenta descuidada.

## 🎯 Para llevarte

- Toda Lambda lleva un **rol de ejecución**. Es su identidad, y no es opcional.
- El código no guarda credenciales porque **el servicio se las inyecta** en cada ejecución; por eso `new S3Client({})` va vacío.
- El rol por defecto solo escribe logs. Que se quede corto es la funcionalidad, no el fallo.
- Cuando falte un permiso, el error de AWS **te dicta la política**: dice la acción exacta y el recurso exacto. Añade eso y nada más.
- `assumed-role` en un mensaje de error significa que quien actuó fue un rol, no una persona. Te dice dónde mirar.
- Borrar una función **no** borra su rol. La limpieza de IAM se hace a mano.

**En la próxima lección:** ya sabes dar identidad a personas y a servicios. Pero las empresas que gestionan cientos de personas casi no crean usuarios IAM — usan otra cosa. Vamos a ver **IAM Identity Center** y por qué el usuario que creaste en la 2.2 es, en el mundo real, la excepción y no la regla.
