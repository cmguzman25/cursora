# 2.4b — Componentes de seguridad: detección y auditoría

> Dominio 2 · Task Statement 2.4 — Identify components and resources for security

## 🤔 Antes de empezar

- Si alguien ya entró a tu edificio y está haciendo algo raro, ¿qué te haría falta para darte cuenta?
- ¿Cómo sabrías si en tus archivadores hay documentos con datos personales que deberían estar protegidos?
- Si tuvieras cinco sistemas de alarma distintos, cada uno avisando por su cuenta, ¿qué problema te traería?

## 📘 Contenido

En la lección anterior vimos los servicios que **bloquean** un ataque antes de
que entre. Pero ninguna barrera es perfecta, y además muchos problemas de
seguridad no son un ataque: son un descuido propio, como una puerta que quedó
abierta o un archivo sensible mal guardado.

Para eso está esta segunda familia: servicios que **miran hacia adentro y te
avisan**. Seguimos con el edificio, pero ahora del lado del monitoreo.

### Amazon GuardDuty: el detective que nota lo raro

**GuardDuty** vigila permanentemente la actividad de tu cuenta y avisa cuando
detecta algo que no encaja: un acceso desde un país donde nunca trabajaste, un
servidor tuyo comunicándose con una dirección conocida por ser maliciosa, o
alguien probando contraseñas una y otra vez.

Es el detective que mira las cámaras y nota el comportamiento extraño. No
bloquea: **avisa**. Y no necesita que instales nada — se activa y empieza a
analizar solo.

¿Qué mira exactamente? Los registros que tu cuenta ya viene generando, entre
ellos los de **CloudTrail**, que vimos en la lección 2.2. Ahí está la
diferencia entre los dos: CloudTrail **guarda** el registro de lo que pasó, y
GuardDuty **lo interpreta** para decirte cuál de esas acciones parece
peligrosa. Uno es el archivo de las cámaras, el otro es quien las mira.

### Amazon Inspector: el que revisa si las cerraduras están flojas

**Inspector** no busca intrusos, busca **debilidades tuyas**. Revisa tus
servidores y aplicaciones y te dice qué tiene una falla conocida: una versión
vieja de un programa con un problema de seguridad ya publicado, o una
biblioteca que hace años nadie actualiza.

Es el inspector que recorre el edificio revisando si las cerraduras son
viejas o si una ventana no cierra bien. Nadie entró todavía: te está avisando
por dónde podrían entrar.

La distinción con GuardDuty es la que más se pregunta: **GuardDuty detecta
amenazas que están ocurriendo; Inspector detecta vulnerabilidades que
todavía nadie explotó.**

### Amazon Macie: el que encuentra datos sensibles

**Macie** revisa la información que guardás en Amazon S3 —el servicio de
almacenamiento de archivos de AWS, que vemos en el Módulo 3— y te avisa si
encuentra **datos personales o sensibles**: números de documento, tarjetas de
crédito, credenciales.

Es alguien que abre los archivadores y te dice: "che, acá hay una carpeta con
documentos de identidad de clientes y está sin proteger". Muchas veces el
problema no es que alguien atacó, sino que información delicada terminó en un
lugar donde no debía estar.

### AWS Security Hub: la central de monitoreo

Si GuardDuty avisa por su lado, Inspector por el suyo y Macie por el suyo,
terminás con varias alarmas sonando en lugares distintos y nadie mirando el
conjunto.

**Security Hub** es la central de monitoreo: reúne los hallazgos de todos
esos servicios en un solo panel, los ordena por gravedad y además revisa si
tu cuenta cumple con estándares de seguridad conocidos —listas de buenas
prácticas que la industria acordó, como las mejores prácticas de seguridad
del propio AWS—. En vez de cinco tableros, uno.

Fijate que Security Hub **no descubre nada por su cuenta**: su valor es
juntar y ordenar lo que descubrieron los demás. Ese matiz es exactamente lo
que el examen quiere que distingas.

### AWS Trusted Advisor: el asesor que revisa todo el negocio

**Trusted Advisor** es distinto a los anteriores: no se enfoca solo en
seguridad. Revisa tu cuenta entera y te da recomendaciones en **seis
categorías**:

- **Optimización de costos:** recursos que estás pagando y no usás.
- **Rendimiento:** configuraciones que podrían andar mejor.
- **Seguridad:** por ejemplo, un depósito de archivos abierto al público o el
  usuario root sin verificación en dos pasos.
- **Tolerancia a fallos:** si te falta respaldo por si algo se cae.
- **Límites de servicio:** si te estás acercando al máximo permitido de algún
  recurso.
- **Excelencia operativa:** prácticas de mantenimiento descuidadas, como
  código corriendo sobre versiones que ya nadie actualiza.

Es el asesor que recorre el negocio completo y te deja una lista de mejoras.
Con el plan de soporte básico ves solo algunas revisiones; con los planes
Business o Enterprise se habilitan todas (los planes de soporte los vemos en
el Módulo 4).

Puestos uno al lado del otro:

| Servicio | ¿Qué busca? | Frase que lo delata |
|---|---|---|
| **GuardDuty** | Amenazas ocurriendo ahora | "Actividad sospechosa o inusual" |
| **Inspector** | Vulnerabilidades en tus sistemas | "Software desactualizado, fallas conocidas" |
| **Macie** | Datos sensibles mal guardados | "Información personal en S3" |
| **Security Hub** | Todo lo anterior, junto | "Una vista central de la seguridad" |
| **Trusted Advisor** | Mejoras en 6 categorías | "Recomendaciones de costos, rendimiento y seguridad" |

**En resumen:** GuardDuty detecta amenazas en curso, Inspector encuentra
vulnerabilidades antes de que alguien las aproveche, Macie identifica datos
sensibles guardados donde no corresponde, Security Hub junta todos esos
hallazgos en un panel único, y Trusted Advisor va más allá de la seguridad y
recomienda mejoras en seis categorías. Todos **avisan**: bloquear es tarea
de los servicios de la lección anterior.

## 💬 Ahora te toca a ti

**Pregunta:** Si alguien ya entró a tu edificio y está haciendo algo raro,
¿qué te haría falta para darte cuenta?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Haría falta alguien mirando las cámaras todo el
tiempo y capaz de notar el comportamiento que se sale de lo normal. En AWS eso
es **Amazon GuardDuty**: analiza la actividad de tu cuenta de forma continua
y te avisa si detecta accesos desde lugares inesperados, comunicación con
direcciones maliciosas conocidas o intentos repetidos de adivinar
contraseñas. Importante: GuardDuty **avisa, no bloquea**.

**Pregunta:** ¿Cómo sabrías si en tus archivadores hay documentos con datos
personales que deberían estar protegidos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Necesitarías que alguien revise el contenido de los
archivadores y te avise qué encontró. Eso hace **Amazon Macie**: analiza lo
que guardás en S3 y te alerta si aparecen datos sensibles como números de
documento o de tarjeta. Es el servicio para el problema de "no me atacaron,
pero tengo información delicada en un lugar donde no debería estar".

**Pregunta:** Si tuvieras cinco sistemas de alarma distintos, cada uno
avisando por su cuenta, ¿qué problema te traería?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que nadie ve el panorama completo: hay que mirar cinco
lugares distintos, es fácil que algo importante pase desapercibido y no se
sabe qué atender primero. **AWS Security Hub** resuelve eso juntando los
hallazgos de GuardDuty, Inspector, Macie y otros en un solo panel, ordenados
por gravedad, y además revisa si tu cuenta cumple estándares de seguridad
conocidos.

## 🎯 Pistas para el examen

- La confusión más frecuente del módulo: **GuardDuty = amenaza en curso,
  Inspector = vulnerabilidad que todavía nadie usó**. Si el escenario dice
  "actividad sospechosa", es GuardDuty; si dice "software desactualizado" o
  "buscar puntos débiles", es Inspector.
- La palabra **"datos personales", "información sensible" o "S3"** junto a
  "descubrir" apunta casi siempre a **Macie**.
- Si el enunciado pide **una vista única o centralizada** de los hallazgos de
  seguridad, es **Security Hub**. Es el que agrega, no el que descubre.
- **Trusted Advisor es el único que no es solo de seguridad.** Si la pregunta
  menciona recomendaciones de costos, rendimiento o límites de servicio junto
  con seguridad, es Trusted Advisor sin dudarlo. Sus categorías se parecen a
  los pilares del Well-Architected, pero no son lo mismo: sostenibilidad es
  un pilar y **no** es una categoría de Trusted Advisor.
- Regla general para todo el bloque: estos servicios **detectan y avisan**,
  no bloquean. Si el escenario pide **impedir** que algo pase, la respuesta
  está entre los de la lección anterior (Shield, WAF, Firewall Manager).
