# 2.2 — Seguridad, gobierno y cumplimiento

> Dominio 2 · Task Statement 2.2 — Understand AWS Cloud security, governance, and compliance concepts

## 🤔 Antes de empezar

- Si un cliente grande te preguntara "¿cómo sé que AWS es un proveedor seguro?", ¿qué le mostrarías?
- ¿Qué diferencia habrá entre proteger un dato mientras viaja por internet y protegerlo mientras está guardado en un disco?
- Si mañana alguien borra algo importante de tu cuenta de AWS, ¿cómo te enterarías de quién fue?

## 📘 Contenido

En la lección anterior vimos que la seguridad se reparte entre AWS y vos.
Ahora vamos a lo concreto: **cómo se demuestra que las reglas se cumplen**,
**cómo se protegen los datos** y **cómo sabés qué está pasando dentro de tu
cuenta**. Son las tres preguntas que este tema responde.

### Cumplimiento: demostrar que cumplís las reglas

Muchas industrias tienen reglas obligatorias sobre cómo tratar la
información: bancos, salud, comercios que aceptan tarjetas. **Cumplimiento**
(*compliance*) es poder demostrar, con papeles, que esas reglas se respetan.

Pensá en un restaurante. Vos no entrás a la cocina a revisar si está limpia:
le pedís el certificado de bromatología que emitió un inspector
independiente. Confiás en el papel, no en la palabra del dueño.

AWS hace lo mismo: auditores externos revisan sus centros de datos y emiten
informes con nombres como **SOC**, **ISO 27001** o **PCI DSS** (la norma para
manejar datos de tarjetas de crédito). Esos informes se descargan desde
**AWS Artifact**, un portal gratuito dentro de la consola.

Acá hay un detalle que el examen adora: **Artifact te da los certificados de
AWS, no los tuyos**. Sirve para probarle a un cliente o a un auditor que la
infraestructura que usás está certificada. Que lo que vos construiste encima
cumpla las reglas sigue siendo tu parte del trato.

### Dónde viven tus datos

Cuando elegís una Región de AWS, tus datos se quedan ahí. **AWS no los mueve
a otro país por su cuenta.** Esto importa porque muchos países exigen que
cierta información no salga de su territorio, y sos vos quien elige la Región
para cumplir con eso.

### Cifrado: en tránsito y en reposo

**Cifrar** es convertir la información en algo ilegible para quien no tenga
la llave. Hay dos momentos distintos en que puede hacer falta, y el examen
los separa siempre:

- **Cifrado en tránsito:** protege el dato **mientras viaja** por la red. Es
  el sobre lacrado de una carta: aunque alguien la intercepte en el camino,
  no puede leerla. En la práctica es **HTTPS/TLS**, el candadito del
  navegador.
- **Cifrado en reposo:** protege el dato **mientras está guardado** en un
  disco. Es la caja fuerte: la carta ya llegó, pero está bajo llave. Si
  alguien se robara el disco, no podría leer nada.

Los dos se usan juntos, no son alternativas. Un dato puede viajar cifrado y
después quedar guardado sin cifrar, y ahí seguís expuesto.

Las llaves que abren ese cifrado se administran con **AWS KMS** (*Key
Management Service*, servicio de gestión de llaves), que es donde se crean,
guardan y controlan. Como vimos en la lección anterior: AWS te da la
herramienta, pero **decidir cifrar y configurarlo es tuyo**.

### Saber qué pasa en tu cuenta: los tres servicios que se confunden

Acá están los tres nombres que más se mezclan de todo el examen. Imaginá que
tenés un local a la calle:

- El **tablero con los números del negocio**: cuánta gente entró hoy, cuánto
  se vendió, si la heladera está a la temperatura correcta. Te dice **cómo
  va todo**. Eso es **Amazon CloudWatch**: recolecta métricas y registros, y
  te avisa con una alarma si algo se sale de lo normal (por ejemplo, si un
  servidor pasa del 90 % de uso).
- Las **cámaras de seguridad**: graban quién entró, a qué hora y qué tocó. No
  te dicen si el negocio va bien, te dicen **quién hizo qué**. Eso es **AWS
  CloudTrail**: deja registrada cada acción hecha en tu cuenta, con el
  usuario, la fecha y desde dónde. Es el servicio de auditoría: cuando algo
  se borró y nadie sabe quién fue, se mira acá.
- El **inventario de cómo debe estar puesto todo**: esta puerta cerrada, este
  matafuegos cargado, este cartel colgado. Y un aviso si algo cambia. Eso es
  **AWS Config**: registra cómo está configurado cada recurso, guarda el
  historial de cambios y te avisa si algo dejó de cumplir una regla que
  definiste.

Puesto uno al lado del otro:

| Servicio | Pregunta que responde | Ejemplo típico |
|---|---|---|
| **CloudWatch** | ¿Cómo está funcionando? | Avisar si la CPU pasa del 90 % |
| **CloudTrail** | ¿Quién hizo qué y cuándo? | Descubrir qué usuario borró una base de datos |
| **AWS Config** | ¿Cómo está configurado y qué cambió? | Detectar que alguien abrió un puerto que debía estar cerrado |

La forma más rápida de no confundirlos: **CloudWatch mira el rendimiento,
CloudTrail mira a las personas, Config mira la configuración.**

**En resumen:** el cumplimiento se demuestra con informes de auditoría que
descargás desde AWS Artifact (son de AWS, no tuyos). Los datos se protegen
cifrándolos en tránsito, mientras viajan, y en reposo, mientras están
guardados. Y para saber qué pasa en tu cuenta tenés tres servicios distintos:
CloudWatch para el rendimiento, CloudTrail para quién hizo qué, y AWS Config
para cómo está configurado todo.

## 💬 Ahora te toca a ti

**Pregunta:** Si un cliente grande te preguntara "¿cómo sé que AWS es un
proveedor seguro?", ¿qué le mostrarías?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Le mostrarías los informes de auditoría que emiten
revisores externos sobre AWS —SOC, ISO 27001, PCI DSS y otros— que se
descargan gratis desde **AWS Artifact**. Es el equivalente al certificado de
bromatología del restaurante: no le pedís que confíe en tu palabra, le das el
papel de un tercero independiente. Eso sí, esos informes cubren la
infraestructura de AWS; si el cliente pregunta por la seguridad de *tu*
aplicación, eso lo tenés que demostrar vos.

**Pregunta:** ¿Qué diferencia habrá entre proteger un dato mientras viaja por
internet y protegerlo mientras está guardado en un disco?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Son dos momentos distintos y hacen falta los dos. El
cifrado **en tránsito** protege el dato mientras se mueve por la red, como un
sobre lacrado que nadie puede leer aunque lo intercepte en el camino: en la
práctica es HTTPS/TLS. El cifrado **en reposo** protege el dato mientras está
guardado, como una caja fuerte: si alguien se llevara el disco, no podría
leer nada. Proteger solo uno de los dos deja el otro flanco abierto.

**Pregunta:** Si mañana alguien borra algo importante de tu cuenta de AWS,
¿cómo te enterarías de quién fue?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Con **AWS CloudTrail**, que deja registrada cada
acción hecha en la cuenta junto con el usuario que la hizo, la fecha y desde
dónde. Es el servicio de auditoría, las "cámaras de seguridad" de tu cuenta.
Ojo con no confundirlo: CloudWatch te habría avisado de que algo dejó de
funcionar, pero no te dice quién lo causó; y AWS Config te muestra cómo
cambió la configuración, pero el nombre y apellido de quién ejecutó la acción
lo encontrás en CloudTrail.

## 🎯 Pistas para el examen

- Memorizá el trío con tres palabras: **CloudWatch = rendimiento**,
  **CloudTrail = quién**, **Config = configuración**. Si el enunciado
  pregunta "quién hizo esto", la respuesta es CloudTrail casi sin excepción.
- **CloudWatch y CloudTrail son los que más se intercambian** entre las
  opciones, justamente porque los nombres se parecen. Fijate si el escenario
  habla de métricas y alarmas (Watch) o de auditoría y responsables (Trail).
- Si una opción dice que **AWS Artifact sirve para auditar tus propios
  recursos**, es incorrecta. Artifact solo entrega los informes de
  cumplimiento **de AWS**. Auditar lo tuyo es Config y CloudTrail.
- Ante la palabra "cifrado", preguntate en qué momento: si el dato **se
  mueve**, es en tránsito (HTTPS/TLS); si **está guardado**, es en reposo.
  Muchas preguntas se resuelven solo con distinguir eso.
- Recordá que el cumplimiento es **compartido**: que AWS tenga la
  certificación PCI DSS no significa que tu aplicación cumpla PCI DSS
  automáticamente. Es una trampa clásica en los escenarios.
