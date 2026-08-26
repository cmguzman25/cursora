# ★ 2.5 — Tablas comparativas: seguridad y cumplimiento

> Dominio 2 · Cierre de módulo — repaso comparativo

## 🤔 Antes de empezar

- Sin volver atrás, ¿podrías decir en una sola frase la diferencia entre GuardDuty e Inspector?
- Si tuvieras que explicarle a alguien cuándo un dato está cifrado "en tránsito" y cuándo "en reposo", ¿qué ejemplo usarías?
- Entre un usuario IAM y un rol, ¿cuál le darías a un servidor que necesita leer archivos, y por qué?

## 📘 Contenido

Esta lección no trae contenido nuevo — es un repaso de las lecciones 2.1 a
2.4b, organizado en tablas para comparar de un vistazo los servicios que se
parecen. Este módulo es el que más nombres sueltos tiene de todo el curso, y
el examen los mezcla justamente entre sí: casi ninguna pregunta te va a
ofrecer una opción absurda, te va a ofrecer cuatro servicios reales que hacen
cosas parecidas.

### Dónde está la línea de responsabilidad, según el servicio

| | AWS se ocupa de | Vos te ocupás de |
|---|---|---|
| **EC2** | Hardware y virtualización | Sistema operativo y sus parches, software, firewall, datos y accesos |
| **RDS** | Hardware, sistema operativo y parches del motor | Configuración de red, cifrado, datos y accesos |
| **Lambda** | Todo el entorno de ejecución | Tu código, datos y accesos |

Lo que **nunca** sale de tu columna, con ningún servicio: **tus datos y quién
tiene acceso a ellos**.

### Los tres que vigilan tu cuenta

| Servicio | Pregunta que responde | Ejemplo típico |
|---|---|---|
| **CloudWatch** | ¿Cómo está funcionando? | Avisar si la CPU pasa del 90 % |
| **CloudTrail** | ¿Quién hizo qué y cuándo? | Descubrir qué usuario borró una base de datos |
| **AWS Config** | ¿Cómo está configurado y qué cambió? | Detectar un puerto que quedó abierto |

En tres palabras: **Watch = rendimiento, Trail = quién, Config =
configuración.**

### Cifrado: los dos momentos

| | En tránsito | En reposo |
|---|---|---|
| ¿Cuándo protege? | Mientras el dato viaja por la red | Mientras el dato está guardado |
| Ejemplo cotidiano | Un sobre lacrado | Una caja fuerte |
| En la práctica | HTTPS / TLS | Cifrado del disco o del archivo |
| ¿Contra qué? | Que lo intercepten en el camino | Que se lleven el disco |

No son alternativas: se usan los dos. Y las llaves se administran con **KMS**.

### Identidades: usuario, grupo y rol

| | Usuario | Grupo | Rol |
|---|---|---|---|
| ¿Qué es? | La credencial de una persona | Un conjunto de usuarios | Una credencial que se presta |
| ¿Se inicia sesión con él? | Sí | **No**, no es una identidad | Se asume temporalmente |
| Credenciales | Permanentes | — | Temporales, vencen solas |
| ¿Para quién? | Personas | Organizar permisos de a muchos | Personas, servicios u otras cuentas |

El caso que más se pregunta: **un servicio de AWS que necesita acceder a otro
siempre usa un rol**, nunca claves guardadas adentro.

### El mapa del módulo: bloquear vs. avisar

Esta es la división que ordena todos los servicios de la lección 2.4:

| Bloquean antes de que entre (2.4a) | Detectan y avisan (2.4b) |
|---|---|
| Shield, WAF, Firewall Manager | GuardDuty, Inspector, Macie, Security Hub, Trusted Advisor |

Si el escenario pide **impedir** algo, la respuesta está en la columna
izquierda. Si pide **enterarse** de algo, en la derecha.

### Los tres que bloquean

| Servicio | Qué frena | Frase que lo delata |
|---|---|---|
| **Shield** | Ataques de saturación (DDoS) | "Nos tiran el sitio con tráfico masivo" |
| **WAF** | Peticiones web según tus reglas | "Bloquear cierto país, IP o patrón" |
| **Firewall Manager** | Nada por sí mismo: aplica las reglas en muchas cuentas | "Varias cuentas, reglas uniformes" |

**Shield mira el volumen, WAF mira el contenido.** Y Shield Standard ya viene
activado y gratis para todos.

### Los cinco que detectan

| Servicio | ¿Qué busca? | Frase que lo delata |
|---|---|---|
| **GuardDuty** | Amenazas ocurriendo ahora | "Actividad sospechosa o inusual" |
| **Inspector** | Vulnerabilidades todavía sin explotar | "Software desactualizado, fallas conocidas" |
| **Macie** | Datos sensibles mal guardados | "Información personal en S3" |
| **Security Hub** | Nada nuevo: junta lo de los demás | "Una vista central de la seguridad" |
| **Trusted Advisor** | Mejoras en 5 categorías, no solo seguridad | "Recomendaciones de costos, rendimiento y límites" |

Las dos confusiones más caras del módulo están acá: **GuardDuty vs.
Inspector** (amenaza en curso vs. debilidad latente) y **Security Hub vs. el
resto** (agrega vs. descubre).

**En resumen:** tus datos y tus accesos son siempre tuyos, cambie el servicio
que cambie. CloudWatch, CloudTrail y Config responden tres preguntas
distintas: rendimiento, quién y configuración. El cifrado protege en dos
momentos, viajando y guardado. Los roles son la respuesta cada vez que un
servicio necesita acceder a otro. Y los servicios de la lección 2.4 se
ordenan en dos columnas: los que bloquean y los que avisan.

## 💬 Ahora te toca a ti

**Pregunta:** Sin volver atrás, ¿podrías decir en una sola frase la
diferencia entre GuardDuty e Inspector?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** GuardDuty detecta **amenazas que están ocurriendo**
—alguien accediendo desde un lugar raro, un servidor hablando con una
dirección maliciosa—, mientras que Inspector busca **debilidades tuyas que
todavía nadie aprovechó**, como software desactualizado con fallas conocidas.
Uno mira el comportamiento, el otro revisa las cerraduras.

**Pregunta:** Si tuvieras que explicarle a alguien cuándo un dato está
cifrado "en tránsito" y cuándo "en reposo", ¿qué ejemplo usarías?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** En tránsito es el sobre lacrado: protege la carta
**mientras viaja**, para que nadie la lea si la intercepta en el camino — en
la práctica, HTTPS. En reposo es la caja fuerte: la carta ya llegó y está
guardada bajo llave, así que si alguien se lleva el mueble no puede leerla.
Hacen falta los dos, porque proteger solo uno deja el otro flanco abierto.

**Pregunta:** Entre un usuario IAM y un rol, ¿cuál le darías a un servidor
que necesita leer archivos, y por qué?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Un **rol**. Un usuario tiene credenciales permanentes
que habría que guardar dentro del servidor, y ahí quedan escritas, sin
vencimiento, esperando que alguien las encuentre. El rol entrega credenciales
temporales que vencen solas y no hay nada guardado. En el examen, cada vez
que una opción proponga guardar claves de acceso dentro de una instancia, es
la incorrecta.

## 🎯 Pistas para el examen

- Antes de mirar las opciones, ubicá de qué tabla es la pregunta. En este
  módulo casi todas las preguntas son "cuatro servicios reales, uno correcto",
  y saber a qué familia pertenece cada uno descarta la mitad sola.
- Usá el filtro **bloquear vs. avisar** como primer corte en cualquier
  pregunta de la lección 2.4. Es rapidísimo y elimina varias opciones de una.
- Los pares que más se intercambian entre las opciones: **CloudWatch /
  CloudTrail**, **GuardDuty / Inspector** y **Security Hub / los que
  descubren**. Si dominás esos tres pares, ya tenés la mayor parte del módulo.
- Estas tablas son un resumen para repasar rápido, no la fuente de verdad. Si
  una fila no te cierra, volvé a la lección original (2.1 a 2.4b) en vez de
  memorizarla sin entenderla.
- Practicá explicando cada fila con tus palabras, no solo leyéndola. Si podés
  decir en voz alta qué hace cada servicio y en qué se diferencia del de al
  lado, estás listo para las preguntas de este dominio.
