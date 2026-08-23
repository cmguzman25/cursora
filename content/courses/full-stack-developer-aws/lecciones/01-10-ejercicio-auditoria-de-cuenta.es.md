# 1.10 — Ejercicio guiado: auditoría de una cuenta recién creada

> Módulo 1 · Ejercicio guiado 1 de 2 · Construir · Nivel: Básico · ⏱️ 60 min · 💚 Costo: $0

## 🎬 El caso

Es tu primer encargo como freelance. **Doña Rosa**, la panadería del barrio, quiere su sistema de pedidos online. Su sobrino le abrió una cuenta de AWS hace dos semanas "para ir avanzando", metió la tarjeta del negocio y no la tocó nunca más. Ahora te dan a ti las llaves.

Antes de escribir una sola línea de código, tienes que hacer lo que hace cualquier profesional cuando recibe una cuenta ajena: **auditarla**. Porque si esa cuenta está mal cerrada, no importa lo bien que programes: el problema va a ser una factura de 800 dólares o un acceso indebido, y va a ser tu problema.

Vas a auditar **tu propia cuenta**, la que creaste en la lección 1.4, tratándola exactamente como si te la acabara de entregar un cliente: sin dar nada por sentado y comprobándolo todo con tus ojos. Al terminar tendrás un documento que podrías enviarle a Doña Rosa por correo.

## ✅ Lo que vas a construir

Un **informe de auditoría** guardado en tu cuenta, y una cuenta que pasa las siete comprobaciones que hace un profesional el día uno.

```
   INFORME DE AUDITORÍA — cuenta de AWS
   ├── 1. Identidad      ¿quién puede entrar y con qué llaves?
   ├── 2. Contactos      ¿a quién avisa AWS si algo pasa?
   ├── 3. Dinero         ¿hay alarmas? ¿alguien las lee?
   ├── 4. Rastro         ¿qué se hizo en esta cuenta y quién lo hizo?
   ├── 5. Diagnóstico    ¿qué dice la herramienta de AWS?
   └── 6. Veredicto      apta / no apta para empezar a trabajar
```

**Criterios de aceptación:**

- [ ] El usuario raíz tiene MFA activo, con **al menos dos** dispositivos registrados.
- [ ] El usuario raíz **no tiene ninguna clave de acceso**.
- [ ] Los tres contactos alternativos (facturación, operaciones y seguridad) están rellenados.
- [ ] La cuenta tiene un **alias** legible, no solo los 12 dígitos.
- [ ] Hay **al menos dos presupuestos** activos con alerta a un correo que lees.
- [ ] Las etiquetas `curso` y `modulo` están activadas para costos.
- [ ] Revisaste el historial de actividad y sabes qué se hizo en la cuenta en los últimos días.
- [ ] Revisaste los diagnósticos de seguridad disponibles, refrescándolos a mano.
- [ ] El informe está **guardado** y sobrevive a cerrar el navegador.

## 🧰 Antes de empezar

- Haber completado las lecciones **1.4 a 1.9** de este módulo (cuenta creada, MFA, presupuestos, etiquetas).
- Tener a mano el teléfono con la app de autenticación.
- Un correo que revises de verdad.
- Tiempo real: unos 60 minutos, de una sentada.

## 💰 Semáforo de costo

> 💚 **Costo: $0.** Todo lo que usa este ejercicio es gratuito: consultar tu cuenta, ver el historial de actividad, leer los diagnósticos básicos y escribir un archivo en CloudShell no cuesta nada.

> ⚠️ **AVISO DE COSTO — servicios de seguridad que verás por el camino**
>
> Mientras auditas vas a cruzarte con botones tentadores de **GuardDuty**, **AWS Config**, **Security Hub** o **Inspector**. Son servicios de seguridad excelentes y **todos cuestan dinero desde que se activan** (Config cobra por cada cambio de configuración registrado; GuardDuty, por volumen de eventos analizados).
> - **Qué hacer:** míralos, lee qué prometen y **no actives ninguno**. Este ejercicio no los necesita.
> - **Si ya activaste alguno por curiosidad:** desactívalo hoy mismo y revisa la facturación mañana.

## 🪜 Paso a paso

### Fase 1 — Prepara el informe

1. **Abre CloudShell** (el icono de terminal de la barra superior) y crea el archivo del informe:

   ```bash
   cat > ~/auditoria-cuenta.md << 'FIN'
   # Informe de auditoría — cuenta AWS
   Fecha:
   Auditor:
   ID de cuenta:

   ## 1. Identidad
   ## 2. Contactos
   ## 3. Dinero
   ## 4. Rastro de actividad
   ## 5. Diagnóstico
   ## 6. Veredicto
   FIN
   cat ~/auditoria-cuenta.md
   ```

   *Deberías ver:* el contenido del archivo impreso en pantalla.
   *Por qué en CloudShell:* está en tu carpeta persistente (el gigabyte de la lección 1.8), así que sigue ahí mañana. Si prefieres, hazlo en un archivo de tu computadora — pero hazlo en algún lado: **una auditoría que no se escribe, no existe**.

2. **Averigua con qué identidad estás trabajando:**

   ```bash
   aws sts get-caller-identity
   ```

   *Deberías ver:* tu `Account` de 12 dígitos y un `Arn` terminado en `:root`. Anota ambos en el informe.

### Fase 2 — Identidad: quién puede entrar

3. **Revisa el MFA del usuario raíz.** Ve a tu nombre de cuenta (arriba a la derecha) → **Security credentials** → sección **Multi-factor authentication (MFA)**.
   *Deberías ver:* al menos un dispositivo. **Anota cuántos hay.** Si solo hay uno, registra un segundo ahora (lección 1.5): un único dispositivo es un hallazgo de auditoría, no una anécdota.

4. **Busca claves de acceso del usuario raíz.** En esa misma página, mira **Access keys**.
   *Deberías ver:* la sección **vacía**. Si hubiera alguna, bórrala y anótalo como hallazgo grave: son credenciales sin límites ni caducidad sobre toda la cuenta.

5. **Mira el panel de IAM.** Busca `IAM` en la consola y entra a su página principal.
   *Deberías ver:* un panel de **Security recommendations** (*recomendaciones de seguridad*) y un resumen de usuarios, grupos y roles — todo en cero, porque aún no creaste ninguno. Anota lo que diga el panel.

6. **Ponle alias a la cuenta.** En esa misma página de IAM, busca el **Account Alias** (junto a la URL de inicio de sesión) y crea uno, por ejemplo `donarosa-fsaws`.
   *Deberías ver:* la URL de acceso pasa de `https://123456789012.signin.aws.amazon.com/console` a una con tu alias.
   *Por qué:* nadie recuerda 12 dígitos. Cuando en el módulo 2 crees usuarios, entrarán por esa dirección.

### Fase 3 — Contactos: a quién avisa AWS

7. **Abre la configuración de la cuenta.** Menú de tu nombre → **Account** (*cuenta*).
   *Deberías ver:* tus datos de contacto principales y, más abajo, **Alternate contacts** (*contactos alternativos*).

8. **Rellena los tres contactos alternativos:** *Billing* (facturación), *Operations* (operaciones) y *Security* (seguridad). Si trabajas solo, pon tu mismo correo en los tres.
   *Deberías ver:* los tres con datos guardados.
   *Por qué importa de verdad:* si AWS detecta que tus credenciales se filtraron, o que hay actividad sospechosa, escribe al contacto de seguridad. Si está vacío, escribe solo al correo raíz — el que quizá no revisas a diario. En una empresa, estos tres contactos son personas distintas.

9. **Verifica el teléfono y el correo principales.** En la misma página.
   *Deberías ver:* datos actuales y tuyos. Anota en el informe si algo estaba desactualizado.

### Fase 4 — Dinero: las alarmas

10. **Comprueba los presupuestos.** Ve a **Billing and Cost Management** → **Budgets**.
    *Deberías ver:* los dos de la lección 1.6. Abre cada uno y confirma la dirección de correo de sus alertas.

11. **Mira el gasto real del mes.** En el panel principal de facturación.
    *Deberías ver:* un número muy bajo o cero. Anótalo exactamente en el informe: es el punto de partida contra el que compararás.

12. **Confirma las etiquetas de costos.** **Cost allocation tags** → busca `curso` y `modulo`.
    *Deberías ver:* ambas activas. Si aún no aparecen, anótalo como pendiente de revisar mañana (recuerda: tardan hasta 24 horas).

### Fase 5 — Rastro: qué pasó en esta cuenta

13. **Abre el historial de actividad.** Busca `CloudTrail` → **Event history** (*historial de eventos*).
    *Deberías ver:* una lista de acciones con fecha, usuario y servicio. **No hiciste nada para activarlo**: CloudTrail viene encendido por defecto y guarda los últimos **90 días** de eventos de gestión, sin costo por consultarlos.

14. **Busca tus propias huellas.** Filtra por nombre de evento `CreateBucket`.
    *Deberías ver:* el bucket que creaste en la lección 1.9, con la hora y la identidad que lo hizo. Busca ahora `DeleteBucket` y verás cuándo lo borraste.
    *Por qué esto es oro:* es la respuesta a "¿quién encendió esto?" y "¿qué pasó aquí?". El día que aparezca un cargo raro, este es el primer sitio donde mirar.

15. **Anota dos límites importantes** en tu informe: el historial guarda **90 días** y muestra los eventos **de la región seleccionada**. Si buscas algo y no aparece, prueba en otra región antes de asustarte.

### Fase 6 — Diagnóstico automático

16. **Abre Trusted Advisor.** Búscalo en la consola.
    *Deberías ver:* un panel con categorías (seguridad, límites de servicio, tolerancia a fallos…). Con el plan **Basic** tienes **todas las comprobaciones de límites de servicio** y **una selección** de las de seguridad y tolerancia a fallos; las demás aparecen bloqueadas y son de los planes de pago.

17. **Refresca a mano.** Pulsa el botón **Refresh** de las comprobaciones de seguridad.
    *Por qué:* en el plan Basic **no se actualizan solas**. Un panel en verde que nadie refrescó desde hace un mes no dice nada.

18. **Lee los resultados y anótalos.** Especialmente la comprobación del MFA en el usuario raíz.
    *Deberías ver:* esa comprobación en verde, porque lo activaste en la lección 1.5. Es la confirmación externa de tu propio trabajo.

### Fase 7 — Veredicto

19. **Completa el informe.** Vuelve a CloudShell y ábrelo con el editor incluido:

    ```bash
    nano ~/auditoria-cuenta.md
    ```

    Rellena cada sección con lo que anotaste. En **Veredicto**, escribe una de estas dos frases y justifícala en dos líneas:
    - `APTA para empezar a trabajar`
    - `NO APTA — corregir primero: ...`

    *Deberías ver:* al guardar con `Ctrl+O` y salir con `Ctrl+X`, el archivo actualizado.

20. **Guarda una copia legible del resumen:**

    ```bash
    grep -A 2 "Veredicto" ~/auditoria-cuenta.md
    ```

    *Deberías ver:* tu veredicto impreso. Eso es lo que le mandarías al cliente.

## 🔍 Verifica que funciona

- **El informe sobrevive.** Cierra CloudShell, navega por la consola, ábrelo de nuevo y ejecuta `cat ~/auditoria-cuenta.md`. Debe seguir completo.
- **Los contactos quedaron guardados.** Recarga la página de **Account** y comprueba que los tres contactos alternativos siguen ahí.
- **El alias funciona.** Abre una ventana de incógnito y entra a `https://TU-ALIAS.signin.aws.amazon.com/console`. Debe cargar la pantalla de inicio de sesión de **tu** cuenta.
- **Prueba negativa — la cerradura de verdad frena.** En esa ventana de incógnito, intenta entrar como usuario raíz **con la contraseña correcta** y luego escribe **un código MFA equivocado** (cambia un dígito).
  *Debe fallar.* Si te dejara entrar, tu MFA no estaría protegiendo nada. Que lo que debe fallar falle es tan importante como que lo que debe funcionar funcione.
- **Prueba negativa 2 — el historial no miente.** En CloudTrail, busca un evento que sepas que nunca ocurrió (por ejemplo `RunInstances`, que sería encender un servidor).
  *Debe devolver cero resultados.* Si apareciera algo que tú no hiciste, tendrías un incidente de seguridad de verdad entre manos.

## 🧹 Limpieza

**No borres nada.** Este ejercicio no crea recursos facturables: crea *configuración*, y toda ella se queda:

1. El informe (`~/auditoria-cuenta.md`) — se queda; lo vas a actualizar en el módulo 17.
2. Los contactos alternativos y el alias — se quedan para siempre.
3. Los presupuestos y las etiquetas de costos — se quedan.
4. **Comprobación final:** ve a **Billing and Cost Management** y confirma que el gasto del mes sigue igual que en el paso 11.

## 🧠 Qué acabas de aprender

- **A auditar antes de construir.** El orden profesional es cerrar la casa y después amueblarla, no al revés.
- **Que la seguridad de una cuenta no es un botón**, sino una lista corta de comprobaciones aburridas: quién entra, con qué llaves, a quién se avisa y qué quedó registrado.
- **A leer el rastro.** CloudTrail estaba encendido desde el primer día y ya tenía tus movimientos guardados. Saber que existe cambia cómo se investiga un problema.
- **A distinguir lo gratis de lo que cobra**, incluso dentro de las herramientas de seguridad: los diagnósticos básicos y el historial son gratis; Config, GuardDuty o Security Hub no.
- **A dejar constancia por escrito.** Un hallazgo que no se anota, se olvida.

**Cómo se ve esto en un trabajo real:** en una empresa, esta lista es un *runbook* que se ejecuta cada vez que se abre una cuenta, y con presupuesto se automatiza — Security Hub la evalúa sola, AWS Config vigila los cambios y Control Tower crea las cuentas ya configuradas. Todo eso cuesta dinero y tiene sentido con decenas de cuentas. Con una cuenta y un curso, la versión manual que acabas de hacer es exactamente la correcta.

## 🚀 Reto extra (opcional)

Convierte tu auditoría en algo repetible: escribe un script `auditoria.sh` en CloudShell que responda automáticamente a las preguntas que hoy contestaste a mano. Pistas de por dónde investigar: `aws sts get-caller-identity`, `aws budgets describe-budgets`, `aws cloudtrail lookup-events` y `aws account get-alternate-contact`.

No te doy la solución a propósito: parte del oficio es leer la documentación de un comando y descubrir qué parámetros necesita. Todos los comandos de esa lista son de **solo lectura** y gratuitos.

**En la próxima lección:** el ejercicio de *operar* del módulo. En 30 minutos vas a estimar cuánto costaría al mes la aplicación completa de Doña Rosa —la de verdad, con todas sus piezas— y a descubrir cuál de ellas se lleva el 80% de la factura.
