# 1.5 — Blindar la cuenta: MFA en el usuario root y por qué nunca se trabaja con root

> Módulo 1 · Lección 1.5 · Nivel: Básico · ⏱️ 25 min · 💚 Costo: $0

## 🤔 Antes de empezar

- Si te robaran la contraseña de tu correo ahora mismo, ¿qué otra cosa necesitaría esa persona para entrar? ¿Tienes algo así puesto?
- En un edificio, ¿por qué el dueño no le da la llave maestra al portero que trabaja todos los días?
- Si alguien entrara a tu cuenta de AWS a las 3 de la mañana y encendiera 50 servidores, ¿cuándo te enterarías?

## 📘 Cómo funciona

En la lección anterior creaste la cuenta. Hoy le pones cerradura antes de guardar nada adentro.

### El usuario root es el dueño del edificio

Cuando te registraste, ese correo se convirtió en el **usuario raíz** (*root user*). No es "el administrador": es el dueño. Y tiene poderes que **nadie más puede tener**, ni siquiera un usuario al que le des todos los permisos del mundo:

- Cerrar la cuenta.
- Cambiar el correo raíz, la contraseña raíz o la forma de pago.
- Cambiar el plan de soporte.
- Recuperar el acceso cuando te bloqueaste a ti mismo por un permiso mal puesto.

Esa última es la clave de todo: **root es tu llave de emergencia**. Y una llave de emergencia se guarda en la caja fuerte, no se lleva en el bolsillo todos los días.

### Por qué nunca se trabaja con root

En un edificio, el dueño no le da la llave maestra al portero. No porque desconfíe, sino porque:

1. **A la llave maestra no se le pueden poner límites.** Al usuario root de AWS **no se le puede restringir con permisos**: cualquier política que intentes ponerle, él la puede quitar. A un usuario normal sí puedes decirle "solo puedes leer este bucket", y se cumple.
2. **Si se pierde, se pierde todo.** Con la llave maestra filtrada, quien la tenga puede cambiar la cerradura y dejarte afuera de tu propio edificio: cambiar el correo, la contraseña y la tarjeta.
3. **No sabes quién hizo qué.** Si tres personas usan la misma llave, el registro dice "entró el dueño" y nada más. Con usuarios separados, el registro dice quién fue.

Por eso la práctica profesional es: **root se usa dos o tres veces en la vida de una cuenta** (crear la cuenta, arreglar un desastre de permisos, cerrar la cuenta), y para todo lo demás se usan usuarios y roles con permisos acotados. Eso lo montamos en el módulo 2.

Y un "nunca" que vale la pena grabarse: **jamás crees claves de acceso (access keys) para el usuario root**. Son credenciales de programa, sin límites y sin caducidad, con poder total sobre la cuenta. Es la forma más rápida conocida de acabar con una factura de cinco cifras.

### La segunda llave: qué es el MFA

El MFA (*multi-factor authentication*, autenticación de varios factores) es exigir **dos pruebas distintas** para entrar:

- **Algo que sabes**: tu contraseña.
- **Algo que tienes**: tu teléfono, o una llavecita USB.

Es el mismo principio que el cajero automático: la tarjeta sola no sirve, el PIN solo tampoco. Hacen falta los dos. Por eso, aunque alguien te robe la contraseña —y las contraseñas se filtran todo el tiempo— sin el segundo factor no entra.

AWS acepta tres formas, y no son equivalentes:

| Tipo | Qué es | Cuándo conviene |
|---|---|---|
| **Passkey o llave de seguridad (FIDO2)** | La huella o el PIN de tu dispositivo, o una llavecita física tipo YubiKey | **Lo que AWS recomienda.** Es resistente al *phishing*: aunque te engañen con una web falsa, la llave no funciona ahí |
| **App de autenticación (TOTP)** | Una app que muestra un código de 6 dígitos que cambia cada 30 segundos (Google Authenticator, Microsoft Authenticator, Authy…) | La opción práctica para empezar: gratis y sin comprar nada |
| **Token físico TOTP** | Un llavero con pantallita que muestra el código | Empresas con políticas estrictas; hay que comprarlo |

Un detalle honesto sobre las apps: si guardas el código TOTP en el mismo gestor de contraseñas donde está la contraseña de AWS, técnicamente ya no son dos factores separados —quien entre a tu gestor tiene los dos—. Sigue siendo muchísimo mejor que no tener nada, pero si puedes, usa un dispositivo distinto o una passkey.

### Esto ya no es opcional

Antes el MFA en root era "muy recomendable". **Ahora AWS lo exige.** Desde 2024 lo fue pidiendo por etapas y hoy aplica a todos los tipos de cuenta, incluidas las individuales como la tuya. Tienes **35 días** desde tu primer intento de entrar a la consola para registrarlo; pasado ese plazo, no puedes seguir usando la consola hasta configurarlo.

Así que no lo hacemos porque el curso sea prudente: lo hacemos porque, si no, en un mes te quedas fuera.

### La trampa de la que nadie avisa: perder el teléfono

Aquí está el error clásico. Activas el MFA con la app del teléfono, todo perfecto… hasta que el teléfono se rompe, se pierde o lo cambias. Ahí quedas con la contraseña correcta y sin la segunda llave, y recuperar el acceso implica un proceso de verificación con AWS que puede llevar días.

Por eso AWS permite registrar **hasta 8 dispositivos MFA** en el usuario raíz. La regla práctica:

- Registra **dos**: por ejemplo, la app del teléfono y una passkey en tu computadora (o la app en una tablet vieja).
- Guarda el código de configuración (la cadena larga que aparece junto al QR) en tu gestor de contraseñas, no en una captura de pantalla en el mismo teléfono.
- Verifica que el correo y el teléfono de la cuenta estén al día: es por ahí por donde AWS te va a verificar si alguna vez pierdes todo.

**En resumen:** el usuario root es la llave maestra de tu cuenta: no se le pueden poner límites, así que se guarda para emergencias y se protege con MFA — que además ya es obligatorio, con 35 días de plazo. Registra dos dispositivos, nunca crees claves de acceso para root, y para el trabajo diario usa usuarios con permisos acotados.

## 🛠️ Manos a la obra

> 📍 Región: el MFA es una configuración de la cuenta entera, no de una región. Da igual cuál tengas seleccionada arriba a la derecha.
> 💚 Costo de esta práctica: **$0**. El MFA virtual es gratis y no crea recursos facturables. (Solo cuesta si decides comprar una llave física, que **no** es un cobro de AWS y no hace falta para este curso.)

Necesitas tu teléfono con una app de autenticación instalada. Si no tienes ninguna: Google Authenticator, Microsoft Authenticator o Authy sirven, son gratis y funcionan igual.

1. **Entra como usuario raíz.** Ve a [console.aws.amazon.com](https://console.aws.amazon.com), elige **Root user**, tu correo y tu contraseña.
   *Deberías ver:* la consola de AWS con tu nombre de cuenta arriba a la derecha.

2. **Abre las credenciales de seguridad.** Haz clic en tu nombre de cuenta (arriba a la derecha) → **Security credentials** (*credenciales de seguridad*).
   *Deberías ver:* una página con secciones para contraseña, MFA y claves de acceso.

3. **Empieza el registro.** Busca la sección **Multi-factor authentication (MFA)** y pulsa **Assign MFA device** (*asignar dispositivo MFA*).
   *Deberías ver:* un campo para ponerle un nombre al dispositivo y una lista de tipos.

4. **Ponle un nombre reconocible.** Por ejemplo `telefono-carlos`. Elige **Authenticator app** (*aplicación de autenticación*) y continúa.
   *Por qué el nombre importa:* cuando tengas dos dispositivos registrados, es la única forma de saber cuál es cuál si pierdes uno y tienes que borrarlo.

5. **Escanea el código QR.** Pulsa **Show QR code** y escanéalo con la app del teléfono.
   *Deberías ver:* en el teléfono aparece una entrada nueva con un código de 6 dígitos que cambia cada 30 segundos.

6. **Guarda la clave secreta antes de continuar.** Debajo del QR hay un enlace tipo **Show secret key**: copia esa cadena y guárdala en tu gestor de contraseñas.
   *Por qué:* con ella puedes volver a dar de alta el MFA en un teléfono nuevo sin depender del viejo. Guárdala donde no esté la contraseña, si puedes.

7. **Confirma con dos códigos seguidos.** AWS pide **dos códigos consecutivos**. Escribe el que ves, espera a que cambie y escribe el siguiente. Pulsa **Add MFA**.
   *Deberías ver:* un mensaje de éxito y el dispositivo listado en la sección de MFA.

8. **Registra un segundo dispositivo (muy recomendado).** Repite desde el paso 3 con otro teléfono, una tablet o una **passkey** de tu computadora.
   *Deberías ver:* dos entradas en la lista de MFA. Ese es el seguro contra perder el teléfono.

9. **Compruébalo de verdad.** Cierra sesión y vuelve a entrar como root.
   *Deberías ver:* después de la contraseña, AWS te pide el código de 6 dígitos. Si te lo pide, funciona. Una protección que no probaste, no sabes si existe.

10. **Confirma que root no tiene claves de acceso.** De vuelta en **Security credentials**, mira la sección **Access keys**.
    *Deberías ver:* que está vacía. Si hubiera alguna, bórrala: root nunca debe tener claves de acceso.

## 💰 Costo y limpieza

- **Qué creaste:** una configuración de seguridad. No es un recurso: no ocupa nada ni se factura.
- **Qué se factura:** nada, ni ahora ni nunca por tener MFA.
- **Limpieza:** **no borres nada.** Esto se queda para siempre. Si algún día cambias de teléfono, registra primero el nuevo dispositivo y borra el viejo después, en ese orden.
- **Anota en tu gestor de contraseñas:** correo raíz, contraseña, ID de cuenta de 12 dígitos y la clave secreta del MFA. Con esas cuatro cosas guardadas, ningún cambio de teléfono te deja fuera.

## 💬 Ahora te toca a ti

**Pregunta:** Si te robaran la contraseña de tu correo ahora mismo, ¿qué otra cosa necesitaría esa persona para entrar? ¿Tienes algo así puesto?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Si tienes verificación en dos pasos, necesitaría además tu teléfono o tu llave física, y con la contraseña sola no llega a ningún lado. Si no la tienes, la contraseña **es** la única puerta: quien la consiga, entra. Ese es exactamente el razonamiento del MFA en AWS, con un agravante: detrás de tu cuenta de AWS hay una tarjeta de crédito y la capacidad de encender servidores caros en minutos. Y si el correo raíz cae, también cae AWS, porque desde el correo se restablece la contraseña — por eso el correo raíz merece su propia verificación en dos pasos.

**Pregunta:** En un edificio, ¿por qué el dueño no le da la llave maestra al portero que trabaja todos los días?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque la llave maestra abre todo y no se le puede poner límites: no existe una versión de esa llave que abra solo el sótano. Al portero se le da una llave acotada a lo que necesita, que además se puede cambiar si se pierde. En AWS es literal: al usuario root **no se le pueden restringir permisos**, mientras que a un usuario o rol sí, y se le pueden revocar en un segundo. De ahí la regla: root para emergencias, usuarios acotados para el día a día.

**Pregunta:** Si alguien entrara a tu cuenta de AWS a las 3 de la mañana y encendiera 50 servidores, ¿cuándo te enterarías?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Hoy por hoy, con suerte cuando llegara la factura a fin de mes, y para entonces podrían ser miles de dólares. Esa es la mitad que el MFA no cubre: el MFA hace difícil que entren, pero no te avisa de lo que pasa dentro. La otra mitad es la vigilancia del gasto, y es exactamente lo que montamos en la próxima lección con una alarma que te escribe un correo en cuanto la cuenta pasa de un dólar. Cerradura **y** alarma: las dos, no una.

## ⚠️ Errores comunes

- **"El código no es válido".** El reloj del teléfono está desfasado respecto al real → los códigos TOTP dependen de la hora exacta. Activa la hora automática en el teléfono (en Google Authenticator, además, hay una opción de sincronizar la hora) e inténtalo otra vez.
- **Poner MFA al usuario IAM y creer que root quedó protegido.** Son identidades distintas, cada una con su propio MFA → esta lección es específicamente sobre el root; el de los usuarios IAM lo vemos en el módulo 2.
- **Un solo dispositivo MFA, y encima el teléfono de todos los días.** Se pierde o se rompe y empieza un proceso de recuperación de días → registra dos dispositivos y guarda la clave secreta en el gestor de contraseñas.
- **Guardar la captura del QR en la galería del mismo teléfono.** Parece práctico → es exactamente donde miraría alguien que te robe el teléfono. La clave secreta va en el gestor de contraseñas, no en la galería.
- **Crear claves de acceso para root "para probar la CLI".** Es lo que sugieren muchos tutoriales viejos → nunca. En la lección 2.8 verás cómo usar la CLI de la forma correcta, sin claves de root.

## 🎯 Para llevarte

- Root es la llave de emergencia: no se le pueden poner límites, así que se usa poquísimo y se guarda bien.
- Nunca crees claves de acceso para el usuario root. Nunca.
- MFA es "algo que sabes" + "algo que tienes". Con la contraseña sola no se entra.
- Ya es obligatorio: tienes 35 días desde tu primer inicio de sesión antes de quedarte fuera de la consola.
- Registra dos dispositivos (AWS admite hasta 8) y guarda la clave secreta: perder el teléfono no debería costarte la cuenta.

**En la próxima lección:** la alarma. Vas a crear un presupuesto en AWS Budgets que te escriba un correo apenas la cuenta pase de 1, 5 y 10 dólares. Es el paso obligatorio del curso y va antes de crear cualquier otro recurso.
