# 3.6b — Almacenamiento: archivos compartidos y protección de datos

> Dominio 3 · Task Statement 3.6 — Identify AWS storage services

## 🤔 Antes de empezar

- Si diez personas de una oficina necesitan trabajar sobre la misma carpeta a la vez, ¿alcanzaría con darle a cada una su propio disco?
- Si guardás archivos que después de un año ya nadie mira, ¿te acordarías de moverlos a un lugar más barato todos los meses?
- Si tenés copias de seguridad de cinco servicios distintos, cada una configurada por su lado, ¿cómo sabrías que todas se están haciendo bien?

## 📘 Contenido

En la lección anterior vimos objetos (S3) y bloques (EBS). Falta el tercer
tipo —los **archivos compartidos**— y todo lo que tiene que ver con
**proteger** lo que ya guardaste.

### Almacenamiento de archivos: la carpeta compartida

Acá está la primera pregunta. Un disco EBS se conecta normalmente a **una
sola instancia**. Si diez servidores necesitan leer y escribir en la misma
carpeta al mismo tiempo, eso no alcanza.

El **almacenamiento de archivos** resuelve justamente eso: una carpeta con su
estructura de subcarpetas, montada a la vez por muchos servidores. Es la
carpeta compartida de red de una oficina.

AWS ofrece dos:

- **Amazon EFS** (*Elastic File System*): para servidores Linux. Crece y se
  achica solo según lo que guardes, y —a diferencia de EBS— es accesible desde
  **varias Zonas de disponibilidad**.
- **Amazon FSx**: para casos que necesitan un sistema de archivos concreto,
  sobre todo **Windows**, o sistemas de alto rendimiento para cálculo
  científico.

La regla corta: **si el escenario dice Windows, es FSx; si dice Linux y
compartido, es EFS.**

### Los tres tipos, uno al lado del otro

Esta es la comparación que más se pregunta del tema:

| | Objetos (S3) | Bloques (EBS) | Archivos (EFS / FSx) |
|---|---|---|---|
| Qué es | Archivos completos con su rótulo | El disco de una instancia | Una carpeta compartida |
| ¿Cuántos lo usan a la vez? | Muchos, desde cualquier lado | Normalmente uno | Muchos servidores a la vez |
| Alcance | Regional | Una Zona de disponibilidad | Puede abarcar varias Zonas |
| Caso típico | Fotos, respaldos, web | Sistema operativo de un servidor | Carpeta compartida entre servidores |

Fijate que la fila del alcance explica muchas decisiones de arquitectura: si
una aplicación tiene que seguir en pie cuando se cae una Zona de
disponibilidad, un disco EBS solo no alcanza, porque vive en una sola zona.
EFS y S3 no tienen ese problema.

### Copiar a otra Región

S3 puede además **replicar** automáticamente lo que guardes hacia un depósito
en otra Región. Sirve para dos cosas distintas: tener una copia lejos por si
una Región entera queda fuera de servicio, y acercar los archivos a usuarios
de otro continente. Es la respuesta cuando el escenario pide una copia en otra
parte del mundo — acordate de la lección 3.2: las Regiones son independientes
y nada se copia entre ellas salvo que alguien lo configure.

### Ciclo de vida: que se mude solo

Segunda pregunta del principio: nadie se va a acordar de mover archivos viejos
todos los meses.

Las **políticas de ciclo de vida** de S3 automatizan eso. Se escribe una regla
del estilo "a los 30 días pasalo a una clase más barata, a los 365 mandalo a
Glacier, a los 7 años borralo", y S3 la aplica solo, para siempre, sin que
nadie intervenga.

Es el ahorro de la lección anterior, pero sin depender de la memoria de nadie.
Cuando el examen mencione **mover datos entre clases automáticamente según su
antigüedad**, la respuesta es ciclo de vida.

### Conectar tu edificio con el almacenamiento de AWS

**AWS Storage Gateway** permite que los servidores que siguen en el centro de
datos de la empresa usen el almacenamiento de AWS **como si fuera local**. Es
la pieza de almacenamiento del modelo **híbrido** que vimos en la lección 3.1:
la aplicación de siempre guarda archivos donde siempre, pero por detrás
terminan en AWS.

Se usa mucho para respaldos: en vez de comprar más discos o cintas cada año,
el espacio en AWS es prácticamente ilimitado.

La gracia está en que **la aplicación no se entera**. Un sistema viejo que
solo sabe guardar en una carpeta de red sigue guardando exactamente ahí; es
Storage Gateway el que, por detrás, va dejando esa información en AWS. Por eso
aparece siempre en escenarios donde hay que modernizar el almacenamiento sin
tocar una aplicación que nadie quiere —o puede— reescribir.

### AWS Backup: un solo lugar para todas las copias

Tercera pregunta. Si cada servicio se respalda por su cuenta —EBS por un
lado, RDS por otro, EFS por otro— nadie tiene la foto completa, y el día que
falte una copia se descubre tarde.

**AWS Backup** centraliza eso: definís una política de respaldo —cada cuánto
copiar, cuánto tiempo conservar— y se aplica a los servicios que elijas desde
un solo lugar. Además deja ver de un vistazo si todo se está respaldando como
corresponde.

Es la misma idea de **centralizar** que ya viste en el Módulo 2 con Security
Hub y Firewall Manager: cuando algo se administra de a pedazos, tarde o
temprano se rompe sin que nadie lo note.

**En resumen:** cuando muchos servidores necesitan la misma carpeta a la vez
se usa almacenamiento de archivos, con EFS para Linux y FSx para Windows o
alto rendimiento. Las políticas de ciclo de vida mueven los archivos de S3 a
clases más baratas según su antigüedad sin que nadie intervenga. Storage
Gateway conecta los servidores propios de la empresa con el almacenamiento de
AWS, y AWS Backup reúne en un solo lugar las copias de seguridad de varios
servicios.

## 💬 Ahora te toca a ti

**Pregunta:** Si diez personas de una oficina necesitan trabajar sobre la
misma carpeta a la vez, ¿alcanzaría con darle a cada una su propio disco?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No, porque cada una tendría su copia y las versiones se
desincronizarían enseguida. Hace falta **una sola carpeta compartida** que
todas usen al mismo tiempo, que es el almacenamiento de **archivos**. En AWS
es **EFS** para servidores Linux —accesible además desde varias Zonas de
disponibilidad— o **FSx** cuando hace falta Windows o un sistema de alto
rendimiento. Un disco **EBS** no serviría acá: se conecta normalmente a una
sola instancia.

**Pregunta:** Si guardás archivos que después de un año ya nadie mira, ¿te
acordarías de moverlos a un lugar más barato todos los meses?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Seguramente no, y por eso existen las **políticas de
ciclo de vida** de S3. Se escribe una regla una sola vez —"a los 30 días pasá
a una clase más barata, al año mandá a Glacier, a los siete años borrá"— y S3
la aplica sola de ahí en adelante. El ahorro deja de depender de que alguien
se acuerde.

**Pregunta:** Si tenés copias de seguridad de cinco servicios distintos, cada
una configurada por su lado, ¿cómo sabrías que todas se están haciendo bien?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Con cinco configuraciones separadas, no lo sabrías:
habría que revisar servicio por servicio y es fácil que alguna falle sin que
nadie se entere. **AWS Backup** resuelve eso centralizando las políticas de
respaldo de varios servicios en un solo lugar, con una vista única del estado
de todo. Es la misma lógica de centralizar que ya vimos con Security Hub para
los hallazgos de seguridad.

## 🎯 Pistas para el examen

- **La pregunta clave de este tema es cuántos acceden a la vez.** Uno solo ⇒
  EBS. Muchos servidores sobre la misma carpeta ⇒ EFS o FSx. Archivos sueltos
  desde cualquier lado ⇒ S3.
- **EFS vs. FSx se decide por el sistema operativo:** si el enunciado nombra
  Windows, es FSx; si es Linux, EFS.
- Ante **"mover automáticamente según la antigüedad"** o **"reducir costos sin
  intervención manual"**, la respuesta es **política de ciclo de vida**.
- **Storage Gateway aparece siempre en escenarios híbridos**: servidores
  propios que siguen funcionando pero quieren usar el almacenamiento de AWS.
  Si no hay centro de datos propio en el enunciado, no es la respuesta.
- Si el escenario menciona **varios servicios respaldados con una sola
  política** o **una vista central de las copias**, es **AWS Backup**, no la
  función de respaldo de cada servicio por separado.
