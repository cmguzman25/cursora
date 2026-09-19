# 4.3 — Soporte técnico

> Dominio 4 · Task Statement 4.3 — Identify AWS technical resources and support options

## 🤔 Antes de empezar

- Si tu negocio entero depende de un sistema y ese sistema se cae un domingo a las 3 de la mañana, ¿a quién llamás?
- ¿Qué diferencia hay entre el teléfono de atención al cliente de una empresa y tener un asesor que ya conoce tu caso?
- Si nadie te reclama nada, ¿quién te avisaría que estás gastando de más o que dejaste una puerta abierta?

## 📘 Contenido

Ya sabés cómo cobra AWS y cómo mirar lo que gastás. Falta la otra mitad del
dominio 4: **qué pasa cuando algo se rompe** y **dónde buscar ayuda**. Este
tema es de memoria pura, pero la mayoría de las preguntas se resuelven con una
sola idea: **cuánto tiempo estás dispuesto a esperar**.

### Lo que es gratis para todos

Antes de hablar de planes pagos, hay un montón de material que viene sin costo
con cualquier cuenta:

- **La documentación oficial** de cada servicio.
- **Los whitepapers**: documentos técnicos de AWS sobre arquitectura, seguridad
  o migración. El del Well-Architected Framework, que vimos en el Módulo 1, es
  uno de ellos.
- **AWS re:Post**: el foro de preguntas y respuestas de la comunidad, moderado
  por AWS. Es gratis, pero **la respuesta te la da la comunidad**, no un
  ingeniero con un compromiso de tiempo.
- **AWS Knowledge Center**: las respuestas a las preguntas más frecuentes.
- **AWS Training and Certification** y **AWS Skill Builder**, para capacitarse.

Esa distinción importa para el examen: re:Post es ayuda **de la comunidad**;
Support es ayuda **contractual**, con tiempos de respuesta garantizados.

### Los planes de AWS Support

Acá está la primera pregunta del principio. Si el negocio depende de un sistema
y se cae un domingo de madrugada, no alcanza con un foro: necesitás a alguien
del otro lado del teléfono, y necesitás que conteste rápido.

AWS vende ese "rápido" en cinco escalones. Es el seguro médico: todos te
atienden, la diferencia es en cuánto tiempo y quién.

**Basic (gratuito).** Viene con toda cuenta. Incluye soporte para temas de
**facturación y de la cuenta** —no técnicos—, la documentación, los
whitepapers, re:Post, el panel de estado y una parte de Trusted Advisor. No hay
ingenieros disponibles para tu problema técnico.

**Developer (pago, desde ~29 USD/mes).** Soporte técnico **por correo, en
horario laboral**, atendido por *Cloud Support Associates*. Solo **una
persona** de tu empresa puede abrir casos. Está pensado para quien está
**probando o desarrollando**, no para producción.

**Business (pago, desde ~100 USD/mes).** El primer plan pensado para
**producción**. Soporte **24/7 por teléfono, correo y chat** con *Cloud Support
Engineers*, **usuarios ilimitados** abriendo casos, **Trusted Advisor completo**
y ayuda con software de terceros común (sistemas operativos, servidores web,
bases de datos) sobre AWS.

**Enterprise On-Ramp (pago, desde ~5.500 USD/mes).** El escalón intermedio.
Agrega acceso a un **grupo de Technical Account Managers (TAM)** y al servicio
de *concierge* para temas de facturación.

**Enterprise (pago, desde ~15.000 USD/mes).** Lo máximo. Incluye un **TAM
designado**: una persona concreta, asignada a tu cuenta, que conoce tu
arquitectura, hace revisiones periódicas y te ayuda a planificar. Ahí está la
segunda pregunta del principio — la diferencia entre llamar a un 0800 donde
tenés que explicar todo de cero y tener a alguien que ya sabe cómo está armado
tu sistema.

### Los tiempos de respuesta (esto se pregunta)

Esta tabla es de las pocas cosas del curso que conviene memorizar tal cual:

| Severidad | Developer | Business | Enterprise On-Ramp | Enterprise |
|---|---|---|---|---|
| Consulta general | < 24 h | < 24 h | < 24 h | < 24 h |
| Sistema con problemas | < 12 h | < 12 h | < 12 h | < 12 h |
| **Producción con problemas** | — | **< 4 h** | < 4 h | < 4 h |
| **Producción caída** | — | **< 1 h** | < 1 h | < 1 h |
| **Sistema crítico caído** | — | — | **< 30 min** | **< 15 min** |

Un detalle de la primera columna: en **Developer** esas horas se cuentan **solo
en horario laboral**. En Business y de ahí para arriba, el reloj corre las 24
horas, todos los días.

Los tres números que más caen en el examen son **1 hora (Business, producción
caída)**, **30 minutos (Enterprise On-Ramp)** y **15 minutos (Enterprise)**.

Y los dos cortes que hay que tener clarísimos:

- **Developer no sirve para producción** ni tiene teléfono ni 24/7.
- **El TAM aparece recién en Enterprise On-Ramp** (compartido) y **Enterprise**
  (designado). Business no tiene TAM.

### AWS Trusted Advisor

Tercera pregunta. Nadie te va a reclamar que estás pagando de más por un
servidor apagado, ni que dejaste un bucket de S3 abierto. Hace falta algo que
revise por vos.

**Trusted Advisor** es un revisor automático que mira tu cuenta y te da
recomendaciones en **seis categorías** — son las mismas que ya viste en la
lección 2.4b:

1. **Optimización de costos** — recursos que pagás y no usás.
2. **Rendimiento** — configuraciones que te están frenando.
3. **Seguridad** — puertos abiertos, root sin MFA, permisos de más.
4. **Tolerancia a fallos** — cosas sin respaldo ni redundancia.
5. **Límites de servicio** (cuotas) — cuánto te falta para tocar un tope.
6. **Excelencia operativa** — prácticas de mantenimiento descuidadas.

Es la inspección técnica del auto: no espera a que se rompa, revisa y te dice
qué conviene cambiar.

El detalle que el examen adora: **con Basic y Developer solo tenés un conjunto
reducido de revisiones** (las de seguridad básicas y todas las de cuotas). **El
Trusted Advisor completo, con las seis categorías, arranca en Business.**

### AWS Health Dashboard

Trusted Advisor mira **tu configuración**. El **AWS Health Dashboard** mira
**el estado del servicio**, y tiene dos caras:

- **Estado general de los servicios**: si S3 tiene problemas en una Región,
  aparece ahí. Es público y lo ve cualquiera.
- **Tu estado de cuenta** (*Your account health*): eventos que afectan
  **específicamente a tus recursos** — un mantenimiento programado en tu
  instancia, un certificado por vencer. Es personalizado.

La diferencia con Trusted Advisor, en una frase: **Health Dashboard te dice si
el problema es de AWS; Trusted Advisor te dice si el problema es tuyo.**

### Quién más te puede ayudar

- **AWS Partner Network (APN)**: la red de empresas certificadas por AWS. Los
  *Consulting Partners* te ayudan a diseñar y migrar; los *Technology Partners*
  venden software que corre sobre AWS.
- **AWS Marketplace**: la tienda donde comprás software de terceros ya listo
  para desplegar, y **te lo cobran en la misma factura de AWS**.
- **AWS Professional Services**: consultores del propio AWS para proyectos
  grandes.
- **AWS Managed Services (AMS)**: AWS opera tu infraestructura por vos.
- **AWS Well-Architected Tool**: una herramienta gratuita de la consola que te
  hace preguntas sobre tu arquitectura y te devuelve un informe según los seis
  pilares del Módulo 1.

**En resumen:** la documentación, los whitepapers y re:Post son gratis para
todos; el soporte técnico con tiempos garantizados se paga. Developer es para
desarrollo, Business es el primer plan de producción con 24/7 y Trusted Advisor
completo, y Enterprise agrega un TAM designado con respuesta en 15 minutos.
Trusted Advisor revisa tu cuenta en seis categorías y el Health Dashboard te
avisa cuando el problema es de AWS.

## 💬 Ahora te toca a ti

**Pregunta:** Si tu negocio entero depende de un sistema y ese sistema se cae un
domingo a las 3 de la mañana, ¿a quién llamás?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** A **AWS Support**, pero solo si tenés un plan que
atienda a esa hora. **Basic** no da soporte técnico y **Developer** solo
responde por correo en horario laboral, así que un domingo de madrugada no te
sirven. El primer plan con **24/7 por teléfono, chat y correo** es **Business**,
con respuesta en **menos de 1 hora** si el sistema de producción está caído. Si
el sistema es crítico para el negocio y una hora es demasiado, ahí aparecen
**Enterprise On-Ramp (30 minutos)** y **Enterprise (15 minutos)**.

**Pregunta:** ¿Qué diferencia hay entre el teléfono de atención al cliente de
una empresa y tener un asesor que ya conoce tu caso?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que al asesor no tenés que explicarle todo de cero: ya
conoce tu situación y puede anticiparse. En AWS ese asesor es el **Technical
Account Manager (TAM)**, una persona asignada a tu cuenta que conoce tu
arquitectura, hace revisiones proactivas y te ayuda a planificar. Aparece
recién en **Enterprise On-Ramp** (un grupo de TAM compartido) y en
**Enterprise** (un TAM designado para vos). Business, por bueno que sea, te da
ingenieros de guardia pero no un TAM.

**Pregunta:** Si nadie te reclama nada, ¿quién te avisaría que estás gastando de
más o que dejaste una puerta abierta?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** **AWS Trusted Advisor**, que revisa tu cuenta sola y te
da recomendaciones en seis categorías: costos, rendimiento, seguridad,
tolerancia a fallos, límites de servicio y excelencia operativa. Es el que
detecta el servidor que
pagás sin usar o el puerto abierto de más. Ojo con el detalle: con **Basic y
Developer** solo ves un conjunto reducido de revisiones; **las seis categorías
completas empiezan en Business**.

## 🎯 Pistas para el examen

- Casi toda pregunta de planes de soporte se resuelve leyendo **dos datos del
  enunciado: si es producción y cuánto puede esperar**. "Desarrollo, horario
  laboral" ⇒ Developer. "Producción 24/7" ⇒ Business. "15 minutos" o "TAM
  designado" ⇒ Enterprise.
- **La palabra TAM descarta Business y todo lo de abajo.** Es el corte más
  usado por el examen para separar Business de Enterprise.
- **Trusted Advisor vs. Health Dashboard:** si el problema está en *tu*
  configuración (costo, seguridad, cuotas) es Trusted Advisor; si el problema
  está en *AWS* o en un mantenimiento que afecta a tus recursos, es el Health
  Dashboard.
- Cuidado con confundir **re:Post** (comunidad, gratis, sin garantía de tiempo)
  con **AWS Support** (contractual, con tiempos de respuesta). Si el escenario
  exige un compromiso de respuesta, la comunidad nunca es la respuesta correcta.
- Si el escenario pide **ayuda externa para migrar o diseñar**, pensá en el
  **AWS Partner Network**; si pide **comprar software de terceros ya listo**, en
  **AWS Marketplace**. Los dos aparecen como distractores uno del otro.
