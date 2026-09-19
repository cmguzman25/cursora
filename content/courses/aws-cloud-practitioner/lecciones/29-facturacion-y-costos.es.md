# 4.2 — Recursos de facturación y costos

> Dominio 4 · Task Statement 4.2 — Understand resources for billing, budget, and cost management

## 🤔 Antes de empezar

- Antes de mudarte a un departamento nuevo, ¿cómo harías para estimar cuánto vas a gastar por mes?
- Si en tu casa hay cinco personas con teléfono, ¿te conviene que cada una tenga su plan o un plan familiar?
- Si el gasto de este mes se va al doble sin que nadie lo note hasta que llega la factura, ¿qué te hubiera gustado tener?

## 📘 Contenido

En la lección anterior vimos **cómo cobra** AWS. Ahora viene lo otro:
**cómo te enterás de lo que estás gastando** y cómo evitás sorpresas. Este es
el tema donde el examen pregunta más nombres de herramientas, y casi todos se
parecen entre sí. Conviene separarlos por **el momento** en que los usás.

### La línea de tiempo del gasto

| Momento | Pregunta que respondés | Herramienta |
|---|---|---|
| **Antes** de gastar | ¿Cuánto me va a costar esto? | **Pricing Calculator** |
| **Mientras** gastás | ¿Voy bien o me estoy pasando? | **AWS Budgets** |
| **Después** de gastar | ¿En qué se me fue la plata? | **Cost Explorer** |

Si te quedás solo con esa tabla, ya contestás buena parte de las preguntas del
dominio 4. Ahora vamos una por una.

### Antes: AWS Pricing Calculator

Ahí está la primera pregunta del principio. Antes de mudarte pedís los números:
cuánto sale el alquiler, las expensas, la luz. Sumás y ves si te da.

La **AWS Pricing Calculator** es exactamente eso: una página web donde armás la
solución que estás pensando —tantos servidores de tal tamaño, tantos gigabytes
en S3, tanto tráfico— y te devuelve **una estimación mensual**. No hace falta
tener cuenta de AWS ni haber creado nada. Sirve para presentar un presupuesto,
comparar dos diseños o justificar una migración.

Es una **estimación**, no una factura: si después usás más, pagás más.

### Mientras: AWS Budgets

Tercera pregunta. Lo que hubieras querido tener es **un aviso antes de que
llegue la factura**, no después.

**AWS Budgets** es eso. Definís un techo —"no quiero gastar más de 200 dólares
este mes"— y AWS te **avisa por correo** cuando te acercás o lo superás.
También podés ponerle un umbral de **pronóstico**: te avisa cuando, al ritmo
actual, vas a terminar el mes pasado de la línea, aunque todavía no la hayas
cruzado.

Es la alarma del tanque de nafta: no espera a que te quedes en la banquina.

Los presupuestos pueden ser de **costo** (dólares), de **uso** (horas,
gigabytes), de **cobertura de Reserved Instances o Savings Plans**, y pueden
además **disparar una acción** automática cuando se pasan.

Hay un pariente cercano que también aparece en el examen: **AWS Cost Anomaly
Detection**, que aprende tu patrón normal de gasto y te avisa cuando aparece
algo raro, sin que vos hayas fijado ningún techo. Budgets te avisa cuando
cruzás **la línea que vos pusiste**; Cost Anomaly Detection te avisa cuando
pasa **algo inusual** que no habías previsto.

### Después: Cost Explorer

Cuando el gasto ya ocurrió, la pregunta cambia: *¿en qué se me fue?*

**AWS Cost Explorer** es el panel con gráficos que responde eso. Te deja mirar
hacia atrás —hasta 12 meses— y desglosar el gasto **por servicio, por Región,
por cuenta o por etiqueta**. También **proyecta** los próximos meses según tu
tendencia, y recomienda dónde te convendría comprar Reserved Instances o
Savings Plans.

Es el resumen de la tarjeta de crédito, pero con gráficos y filtros.

Si necesitás el detalle absoluto —cada línea de uso, hora por hora, para
procesarlo con otras herramientas— eso es el **AWS Cost and Usage Report
(CUR)**: el archivo más completo que existe sobre tu gasto, pensado para
analizarlo con otros sistemas, no para mirarlo a ojo.

### Las etiquetas: saber de quién es cada gasto

Cost Explorer te dice que gastaste 4.000 dólares en EC2. Pero, ¿cuánto fue del
equipo de marketing y cuánto del de ingeniería?

Para eso están las **etiquetas de asignación de costos** (*cost allocation
tags*): pares de texto que le pegás a cada recurso, como `Proyecto: Tienda` o
`Ambiente: Producción`. Una vez activadas en la consola de facturación, podés
**filtrar y agrupar el gasto por esas etiquetas**.

Es ponerle una calcomanía con el nombre a cada caja del depósito: las cajas son
las mismas, pero ahora sabés de quién es cada una. Sin etiquetas, la factura te
dice *qué* servicios usaste, pero nunca *para qué*.

### Varias cuentas: AWS Organizations y facturación consolidada

Segunda pregunta del principio. Con cinco teléfonos en casa, el plan familiar
gana: una sola factura y el consumo de todos suma para conseguir mejor tarifa.

**AWS Organizations** te deja agrupar varias cuentas de AWS bajo una **cuenta
de administración**, y activar la **facturación consolidada**
(*consolidated billing*). Los beneficios son tres, y los tres se preguntan:

1. **Una sola factura** para todas las cuentas, en vez de una por cuenta.
2. **Descuentos por volumen**: el uso de todas las cuentas **se suma**, así que
   llegás antes a los tramos de precio más baratos.
3. **Las Reserved Instances y los Savings Plans se comparten**: si una cuenta
   no usa toda su reserva, otra cuenta del grupo la aprovecha.

Organizations tiene además una segunda cara, de gobierno: desde la cuenta de
administración se pueden aplicar **políticas de control de servicios** (*service
control policies*, o **SCP**), que son reglas que fijan **el techo de lo que
cada cuenta tiene permitido hacer**. Por ejemplo: "en ninguna cuenta de este
grupo se pueden crear recursos fuera de la Región de São Paulo". Es el
reglamento del consorcio: por más que el dueño de un departamento quiera, hay
cosas que el edificio no permite. Ni siquiera el usuario root de esa cuenta
puede saltárselo.

¿Y para qué separar en varias cuentas, entonces? Para aislar ambientes
(producción de pruebas), separar equipos, y que un error en una cuenta no toque
a las demás.

### Dónde se ve todo esto

Todo vive en la **consola de facturación** (*AWS Billing and Cost Management*),
que además muestra la factura del mes, el detalle por servicio y el uso de la
capa gratuita. Y se conecta con algo de la lección 2.3: modificar los datos de
facturación es una de las tareas reservadas al **usuario root**, y para que un
usuario de IAM pueda siquiera **ver** esta consola hay que habilitárselo
explícitamente. Tener una cuenta de IAM no alcanza.

**En resumen:** Pricing Calculator estima **antes** de gastar, Budgets avisa
**mientras** gastás y Cost Explorer analiza **después**. Las etiquetas de
asignación de costos permiten saber qué equipo o proyecto generó cada gasto, y
AWS Organizations con facturación consolidada junta varias cuentas en una sola
factura, con descuentos por volumen y reservas compartidas.

## 💬 Ahora te toca a ti

**Pregunta:** Antes de mudarte a un departamento nuevo, ¿cómo harías para
estimar cuánto vas a gastar por mes?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Pedirías los números de cada cosa —alquiler, expensas,
servicios— y los sumarías antes de firmar. En AWS eso lo hace la **AWS Pricing
Calculator**: cargás la solución que estás planeando y te devuelve una
estimación mensual, sin necesidad de crear nada ni de tener cuenta. Es la única
de las tres herramientas principales que sirve **antes** de gastar; Budgets y
Cost Explorer necesitan que el gasto ya esté ocurriendo.

**Pregunta:** Si en tu casa hay cinco personas con teléfono, ¿te conviene que
cada una tenga su plan o un plan familiar?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El plan familiar, porque el consumo se suma y se paga
una sola factura. Eso es la **facturación consolidada** de **AWS
Organizations**: varias cuentas bajo una cuenta de administración, con una sola
factura, **descuentos por volumen** porque el uso de todas se agrega, y
**Reserved Instances y Savings Plans compartidos** entre las cuentas del grupo.
Lo importante es que las cuentas siguen separadas: se unifica el pago, no los
recursos.

**Pregunta:** Si el gasto de este mes se va al doble sin que nadie lo note
hasta que llega la factura, ¿qué te hubiera gustado tener?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Un aviso a tiempo. **AWS Budgets** te deja fijar un
techo de costo o de uso y te notifica cuando te acercás, cuando lo superás o
cuando el **pronóstico** dice que vas a superarlo antes de fin de mes. Si
además querés que te avise de gastos raros sin tener que definir un límite,
eso es **AWS Cost Anomaly Detection**. Y para entender *dónde* se disparó el
gasto una vez ocurrido, **Cost Explorer**.

## 🎯 Pistas para el examen

- Ubicá primero **el momento**: estimar algo que todavía no existe ⇒ Pricing
  Calculator. Avisar al cruzar un límite ⇒ Budgets. Analizar lo ya gastado ⇒
  Cost Explorer. Casi todas las preguntas del tema se resuelven con esa
  pregunta previa.
- **Budgets avisa, Cost Explorer explica.** Si el enunciado dice "notificar",
  "alerta" o "antes de que se pase", es Budgets aunque también aparezca Cost
  Explorer entre las opciones.
- Cuando el escenario pregunta **qué equipo, proyecto o departamento** generó
  el gasto, la respuesta son las **etiquetas de asignación de costos**. Ninguna
  herramienta puede desglosar por área si antes nadie etiquetó los recursos.
- Ante **varias cuentas**, pensá en **AWS Organizations**. Y recordá los tres
  beneficios de la facturación consolidada —una factura, descuentos por
  volumen, reservas compartidas—: el examen suele pedir dos de los tres en una
  pregunta de respuesta múltiple.
- **El Cost and Usage Report es el nivel de detalle máximo**, no el panel de
  todos los días. Si la opción habla de exportar datos crudos para analizarlos
  con otras herramientas, es CUR; si habla de mirar gráficos, es Cost Explorer.
