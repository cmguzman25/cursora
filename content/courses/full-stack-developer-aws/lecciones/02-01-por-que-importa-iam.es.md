# 2.1 — Por qué IAM es lo primero que revisa un profesional

> Módulo 2 · Lección 2.1 · Nivel: Básico · ⏱️ 25 min · 💚 Costo: $0

## 🤔 Antes de empezar

- En un hotel, ¿por qué la tarjeta de la señora de la limpieza abre las habitaciones pero no la caja fuerte de recepción?
- Si contratas a alguien por dos semanas y le das una llave, ¿qué haces el día que se va?
- Si un programa que escribiste tiene un error y borra archivos, ¿qué determina **cuántos** archivos puede llegar a borrar?

## 📘 Cómo funciona

En la lección 1.5 dejamos una pregunta abierta. Dijimos que al usuario raíz no se le pueden poner límites, que es la llave maestra y que se guarda en la caja fuerte. Perfecto. Pero entonces, **¿con qué llave trabajas todos los días?**

La respuesta es este módulo entero, y empieza con tres letras: IAM.

### IAM es el sistema de llaves de tu cuenta

**IAM** significa *Identity and Access Management*: gestión de identidades y accesos. Traducido a lo que hace: es el servicio que decide **quién puede entrar a tu cuenta y qué puede tocar una vez dentro**.

Piensa en un hotel. El dueño tiene una llave maestra que abre todo (ese es root). Pero el hotel no funciona con llaves maestras repartidas: funciona con un sistema de tarjetas. La tarjeta de la señora de la limpieza abre las habitaciones del tercer piso entre las 8 y las 16, y nada más. La del recepcionista abre recepción y la caja, pero ninguna habitación. Y cuando alguien deja de trabajar ahí, se desactiva su tarjeta en dos segundos — **sin cambiar ni una sola cerradura**.

Eso último es la clave, y es lo que hace que IAM sea tan superior a "compartir la contraseña de root": las identidades se crean, se limitan y se apagan de forma independiente.

### Las dos preguntas que responde

Cada vez que alguien —o algo— intenta hacer algo en tu cuenta, AWS hace dos preguntas distintas, y conviene no confundirlas:

| Pregunta | Nombre técnico | Ejemplo del hotel |
|---|---|---|
| **¿Quién eres?** | Autenticación | Mostrar tu tarjeta en la puerta |
| **¿Qué puedes hacer?** | Autorización | Que esa tarjeta abra —o no— esta puerta concreta |

Son independientes. Puedes estar perfectamente identificado y aun así no poder hacer nada. De hecho, ese es el estado por defecto de todo usuario nuevo, y lleva a la regla más importante del módulo.

### La regla de oro: todo está prohibido hasta que lo permitas

En AWS, **por defecto no se puede hacer nada**. Ni mirar. Ni listar. Nada.

Un usuario recién creado, con su contraseña correcta, entra a la consola y ve errores de "no tienes permiso" por todas partes. Eso no es un fallo: es el diseño. AWS parte de **denegar** y solo abre lo que tú abras explícitamente.

La lógica completa son tres reglas, en este orden:

| Situación | Resultado |
|---|---|
| Nadie dijo nada sobre esta acción | ❌ **Denegado** (denegación implícita) |
| Alguna política dice "permitido" | ✅ Permitido |
| Alguna política dice "denegado" | ❌ **Denegado, y gana siempre** |

La tercera fila es la que hay que grabarse: **una denegación explícita vence a cualquier permiso**. Si diez políticas te dan acceso y una sola te lo niega, no entras. Esto, que parece un detalle, es la herramienta que usan las empresas para poner barreras que nadie puede saltarse ni por error.

Es lo contrario a como funciona tu computadora, donde todo está permitido salvo lo que se bloquea. Aquí se empieza con la casa cerrada y se van abriendo puertas de a una.

### Las cuatro piezas de IAM

Todo el módulo gira alrededor de cuatro palabras. Aquí va el mapa; cada una tiene su lección:

| Pieza | Qué es | Ejemplo del hotel | Lección |
|---|---|---|---|
| **Usuario** | Una persona con credenciales propias | Un empleado con su tarjeta | 2.2 |
| **Grupo** | Un conjunto de usuarios que comparten permisos | "Personal de limpieza" | 2.2 |
| **Política** | El documento que dice qué se permite | La lista de puertas que abre cada tipo de tarjeta | 2.3 y 2.4 |
| **Rol** | Una identidad prestada, temporal, sin contraseña | La tarjeta de visitante que se pide al entrar y se devuelve al salir | 2.5 y 2.6 |

Si tuvieras que quedarte con una: **el rol**. Es la pieza que más se usa en AWS moderno y la que menos se entiende al principio. Por eso tiene dos lecciones.

### Por qué un profesional mira esto primero

Cuando alguien con experiencia recibe una cuenta de AWS, no mira qué hay construido: mira **quién puede entrar y qué puede tocar**. Hay tres razones, y las tres son caras de aprender por las malas.

**1. Los permisos definen el radio de daño.** Un programa con un error que puede tocar un solo bucket, borra un bucket. El mismo error con permisos de administrador, borra la base de datos de producción. La calidad del código no cambió: cambió cuánto alcance tenía para equivocarse. A esto se le llama *radio de explosión*, y es el motivo por el que se dan permisos mínimos.

**2. Es tu mitad del trato.** AWS trabaja con un **modelo de responsabilidad compartida**: ellos protegen la infraestructura —los edificios, los servidores, la red—, y tú proteges **quién accede a tus cosas y qué datos guardas**. Nadie va a configurar los permisos por ti. Si dejas la puerta abierta, la puerta queda abierta.

**3. Una credencial filtrada no se puede "arreglar después".** Hay bots que escanean GitHub las 24 horas buscando claves de AWS publicadas por error. El tiempo entre publicar una clave y que alguien la use para encender servidores de minería se mide en **minutos**, y la factura en miles de dólares. Puedes borrar la clave, pero no puedes deshacer lo que ya hicieron con ella.

Por eso este módulo va antes de construir nada: cuando en el módulo 6 tu primera función necesite acceso a la base de datos, la pregunta no será "¿cómo le doy acceso?" sino "¿cómo le doy **solo** el acceso que necesita?".

### Dos datos prácticos

- **IAM no cuesta nada.** Es una función de tu cuenta, sin cargo. Puedes crear usuarios, grupos, roles y políticas sin mirar la factura. En un curso obsesionado con el gasto, este módulo entero es gratis.
- **IAM es global.** Como viste en la lección 1.7, hay servicios regionales y globales: IAM es de los globales. Un usuario que creas no vive en `us-east-1`; existe en toda la cuenta. No busques el selector de región aquí.

### Lo que vas a hacer en este módulo

Al terminar el módulo 2 tendrás: una identidad de trabajo propia con permisos acotados (dejarás de usar root), entenderás el documento JSON que define permisos, sabrás crear roles para que tus programas accedan a recursos sin claves, y habrás hecho dos ejercicios reales: dar de alta a un desarrollador junior con permisos mínimos, y darle a una aplicación acceso a un solo bucket demostrando que no puede tocar nada más.

**En resumen:** IAM es el sistema de tarjetas de tu cuenta: responde quién eres y qué puedes hacer, con la regla de que **todo está prohibido salvo lo que permitas explícitamente** y que una denegación explícita gana siempre. Se revisa primero porque los permisos determinan el radio de daño de cualquier error, es tu parte del modelo de responsabilidad compartida, y una credencial filtrada no se puede deshacer. Es gratis y es global.

## 🛠️ Manos a la obra

> 📍 IAM es **global**: no importa qué región tengas seleccionada.
> 💚 Costo de esta práctica: **$0**. IAM no tiene costo, y hoy solo vamos a mirar.

Hoy no creas nada: vas a explorar cómo está tu cuenta y a leer tu primera política de permisos.

1. **Abre IAM.** Busca `IAM` en la consola.
   *Deberías ver:* un panel con un resumen: usuarios, grupos, roles y políticas.

2. **Mira el marcador.** Fíjate en cuántos usuarios y grupos tienes.
   *Deberías ver:* **cero usuarios y cero grupos**. Ahora mismo la única identidad de tu cuenta es el usuario raíz. Eso cambia en la lección 2.2.

3. **Encuentra tu URL de acceso.** En el mismo panel, busca el enlace de inicio de sesión con el alias que creaste en el ejercicio 1.10.
   *Deberías ver:* algo como `https://tu-alias.signin.aws.amazon.com/console`. Guárdalo: por ahí entrarán los usuarios que crees.

4. **Cuenta las políticas que ya existen.** En el menú de la izquierda entra a **Policies** (*políticas*) y filtra por tipo **AWS managed** (*administradas por AWS*).
   *Deberías ver:* **cientos** de políticas ya escritas. No empiezas de cero: AWS trae recetas de permisos hechas para los casos habituales.

5. **Lee la política más peligrosa que existe.** Busca `AdministratorAccess`, ábrela y mira su pestaña de JSON.
   *Deberías ver:* algo muy parecido a esto:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": "*",
         "Resource": "*"
       }
     ]
   }
   ```

   Tres líneas que importan: **permite** (`Allow`) **cualquier acción** (`Action: *`) sobre **cualquier recurso** (`Resource: *`). Esos dos asteriscos son "todo". Cuando en el trabajo alguien pida "acceso de admin, solo por hoy", esto es lo que está pidiendo.

6. **Ahora lee una razonable.** Busca `AmazonS3ReadOnlyAccess` y abre su JSON.
   *Deberías ver:* una lista concreta de acciones, todas de lectura (`s3:Get*`, `s3:List*`), en vez de un asterisco. Compara mentalmente: la primera abre el hotel entero; esta abre una puerta y solo para mirar.

7. **Confirma desde la terminal.** Abre CloudShell y ejecuta:

   ```bash
   aws iam list-users
   ```

   *Deberías ver:* una lista vacía (`"Users": []`). Es la prueba, desde otro ángulo, de que aún no existe ninguna identidad además de root.

8. **Comprueba que IAM no entiende de regiones.** Ejecuta lo mismo apuntando a otra región:

   ```bash
   aws iam list-users --region sa-east-1
   ```

   *Deberías ver:* exactamente el mismo resultado vacío, sin error. IAM es global: la región da igual.

## 💰 Costo y limpieza

- **Qué creaste:** nada. Solo miraste.
- **Qué se factura:** nada. **IAM no tiene costo**: ni los usuarios, ni los grupos, ni los roles, ni las políticas. Este módulo completo es gratis.
- **Limpieza:** no hay nada que borrar.
- **Anota para la próxima lección:** tu URL de acceso con alias (paso 3). La vas a usar para entrar con tu nuevo usuario.

## 💬 Ahora te toca a ti

**Pregunta:** En un hotel, ¿por qué la tarjeta de la señora de la limpieza abre las habitaciones pero no la caja fuerte de recepción?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque cada persona recibe acceso a lo que necesita para su trabajo, y nada más. No es desconfianza: es que si esa tarjeta se pierde o se la roban, el daño posible queda acotado a unas habitaciones en vez de a todo el hotel. En AWS es idéntico y tiene nombre: **principio de menor privilegio**. Y la consecuencia práctica es que los permisos no se dan "por si acaso" — se dan cuando hacen falta, porque cada permiso extra amplía lo que puede salir mal.

**Pregunta:** Si contratas a alguien por dos semanas y le das una llave, ¿qué haces el día que se va?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Le pides la llave, o cambias la cerradura si era una copia. Ese es justamente el problema de compartir la contraseña de root: no se puede "quitar" a una sola persona, habría que cambiarla para todos. Con IAM, cada identidad es independiente: se desactiva la de esa persona en dos segundos y nadie más se entera. Y hay una versión todavía mejor, que veremos en la lección 2.5: los **roles**, credenciales que caducan solas — la llave que se autodestruye sin que nadie tenga que acordarse de pedirla.

**Pregunta:** Si un programa que escribiste tiene un error y borra archivos, ¿qué determina **cuántos** archivos puede llegar a borrar?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Sus permisos, no la gravedad del error. El mismo fallo, con acceso a un solo bucket, borra ese bucket; con permisos de administrador, borra lo que quiera. A eso se le llama **radio de daño**, y es la razón de fondo por la que un profesional revisa IAM antes que el código: el código va a tener errores —siempre los tiene—, y lo único que controla cuánto duelen es cuánto alcance le diste.

## ⚠️ Errores comunes

- **Buscar el selector de región en IAM.** Se crea un usuario y se teme haberlo creado "en la región equivocada" → IAM es global. Un usuario existe en toda la cuenta.
- **Creer que un usuario nuevo puede al menos mirar.** Se crea, se entra y todo da error de permisos → es lo esperado: por defecto no se puede hacer **nada**. Los permisos se añaden explícitamente.
- **Confundir autenticación con autorización.** "Ya inició sesión, entonces puede entrar a S3" → son dos preguntas distintas. Identificarse no da permisos.
- **Dar `AdministratorAccess` "temporalmente".** Es la política de los dos asteriscos → lo temporal se queda, y ese usuario pasa a poder cerrar la cuenta. Si de verdad hace falta algo puntual, para eso están los roles.
- **Pensar que IAM cuesta.** Se evita crear usuarios "para no gastar" → es gratis. No hay ninguna razón económica para seguir usando root.

## 🎯 Para llevarte

- IAM responde dos preguntas distintas: quién eres (autenticación) y qué puedes hacer (autorización).
- Por defecto **todo está denegado**; un permiso explícito abre la puerta y una denegación explícita la cierra por encima de cualquier permiso.
- Cuatro piezas: usuario, grupo, política y rol. El rol es la más importante y la que más cuesta al principio.
- Los permisos definen el radio de daño de cualquier error. Por eso se revisan antes que el código.
- IAM es gratis y global: no hay excusa de costo ni de región para no usarlo.

**En la próxima lección:** dejas de ser root. Vas a crear tu propio usuario con permisos de administrador, meterlo en un grupo, protegerlo con MFA y entrar por tu URL con alias. A partir de ahí, el resto del curso lo haces con esa identidad.
