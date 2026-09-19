# ★ 4.4 — Tablas comparativas: precios y soporte

> Dominio 4 · Cierre de módulo — repaso comparativo

## 🤔 Antes de empezar

- Sin volver atrás, ¿cuál es la única diferencia real entre Reserved Instances y Savings Plans?
- Si tuvieras que decir en qué plan de soporte aparece por primera vez el teléfono 24/7, ¿cuál dirías?
- Entre Budgets y Cost Explorer, ¿cuál te avisa y cuál te explica?

## 📘 Contenido

Nada nuevo acá: son las lecciones 4.1 a 4.3 puestas una al lado de la otra.
Este dominio pesa solo 12 % del examen, pero es el más fácil de asegurar,
porque casi todo se decide con dos o tres distinciones.

### Los cinco modelos de compra de cómputo

| | Compromiso | Ahorro | Se interrumpe | Señal en el examen |
|---|---|---|---|---|
| **On-Demand** | Ninguno | — | No | "Impredecible", "corto plazo", "sin compromiso" |
| **Reserved Instances** | 1 o 3 años, instancia fija | Hasta 72 % | No | "Carga estable y conocida" |
| **Savings Plans** | 1 o 3 años, gasto por hora | Hasta 72 % | No | "Estable pero quiere flexibilidad" |
| **Spot** | Ninguno | Hasta 90 % | **Sí, 2 min de aviso** | "Se puede interrumpir", "procesamiento en lote" |
| **Dedicated Host** | Opcional | Es más caro | No | "Licencia por servidor físico", "normativa" |

**Reserved vs. Savings Plans:** los dos piden 1 o 3 años y dan casi el mismo
descuento. Reserved te ata a **un tipo de instancia**; Savings Plans te ata a
**un gasto por hora** y te deja mover instancia, Región y hasta usar Lambda o
Fargate. Si la palabra del enunciado es **flexibilidad**, es Savings Plans.

Y dentro de Reserved: **Standard** descuenta más pero no se cambia;
**Convertible** descuenta menos y sí. Cuanto más pagás por adelantado (*All
Upfront* > *Partial* > *No Upfront*), mayor el descuento.

### Los tres componentes de la factura

| | Se cobra por | Regla corta |
|---|---|---|
| **Cómputo** | Tiempo encendido o ejecuciones | Apagado no se paga (salvo reserva) |
| **Almacenamiento** | GB por mes | Se paga aunque nadie lo mire |
| **Transferencia** | GB de salida | **Entrar gratis, salir se paga** |

### Las herramientas de costos, por momento

| | Antes de gastar | Mientras gastás | Después de gastar |
|---|---|---|---|
| Herramienta | **Pricing Calculator** | **AWS Budgets** | **Cost Explorer** |
| Qué hace | Estima un diseño | Avisa al cruzar un umbral | Muestra y desglosa lo gastado |
| Palabra clave | "Estimar", "presupuestar" | "Notificar", "alerta", "límite" | "Analizar", "en qué se fue" |

Dos parientes que el examen mezcla con estas tres:

- **Cost Anomaly Detection**: avisa de gastos **raros** sin que fijes un techo.
  Budgets avisa cuando cruzás **tu** línea; este, cuando pasa algo inusual.
- **Cost and Usage Report (CUR)**: el detalle crudo, línea por línea, para
  procesar con otras herramientas. No es un panel para mirar.

Y para saber **de quién** es cada gasto: **etiquetas de asignación de costos**.
Ninguna herramienta puede desglosar por equipo o proyecto si nadie etiquetó.

### Varias cuentas: los tres beneficios de la facturación consolidada

Con **AWS Organizations**:

1. **Una sola factura** para todas las cuentas.
2. **Descuentos por volumen**: el uso de todas se suma.
3. **Reserved Instances y Savings Plans compartidos** entre cuentas.

### Los planes de soporte, uno al lado del otro

| | Basic | Developer | Business | Enterprise On-Ramp | Enterprise |
|---|---|---|---|---|---|
| Costo | Gratis | Desde ~29 USD | Desde ~100 USD | Desde ~5.500 USD | Desde ~15.000 USD |
| Soporte técnico | **No** | Correo, horario laboral | **24/7 teléfono, chat, correo** | 24/7 | 24/7 |
| Quién abre casos | — | 1 persona | Ilimitados | Ilimitados | Ilimitados |
| Producción caída | — | — | **< 1 h** | < 1 h | < 1 h |
| Sistema crítico caído | — | — | — | **< 30 min** | **< 15 min** |
| Trusted Advisor | Reducido | Reducido | **Completo** | Completo | Completo |
| TAM | — | — | — | Grupo de TAM | **TAM designado** |

Los tres cortes que resuelven casi todas las preguntas:

- **Producción y 24/7 ⇒ Business** (es el primero que califica).
- **TAM ⇒ Enterprise On-Ramp o Enterprise**, nunca Business.
- **15 minutos ⇒ Enterprise**; **30 minutos ⇒ Enterprise On-Ramp**.

### Los dos paneles que se confunden

| | Trusted Advisor | AWS Health Dashboard |
|---|---|---|
| Qué mira | **Tu cuenta y tu configuración** | **El estado de AWS** |
| Te dice | Costos, rendimiento, seguridad, tolerancia a fallos, cuotas y excelencia operativa | Si un servicio falla o hay mantenimiento en tus recursos |
| En una frase | El problema es tuyo | El problema es de AWS |

**En resumen:** en precios, todo se decide por cuánto compromiso acepta el
cliente y si la carga puede interrumpirse. En costos, por el momento: estimar,
avisar o analizar. En soporte, por si es producción y cuánto puede esperar. Y
entre los dos paneles, Trusted Advisor mira tu cuenta y Health Dashboard mira a
AWS.

## 💬 Ahora te toca a ti

**Pregunta:** Sin volver atrás, ¿cuál es la única diferencia real entre Reserved
Instances y Savings Plans?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** **A qué te comprometés.** Con **Reserved Instances** te
comprometés a un **tipo de instancia** concreto durante 1 o 3 años; con un
**Savings Plan** te comprometés a **gastar cierta cantidad por hora** durante 1
o 3 años, y podés mover la instancia, la familia, la Región e incluso usar
Lambda o Fargate. El plazo y el descuento son prácticamente iguales: lo que
cambia es la flexibilidad.

**Pregunta:** Si tuvieras que decir en qué plan de soporte aparece por primera
vez el teléfono 24/7, ¿cuál dirías?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** **Business**. Basic no tiene soporte técnico y
Developer solo responde por correo en horario laboral y con una sola persona
habilitada para abrir casos. Business es el primer plan pensado para
producción: 24/7 por teléfono, chat y correo, usuarios ilimitados, Trusted
Advisor completo y respuesta en menos de 1 hora si producción está caída.

**Pregunta:** Entre Budgets y Cost Explorer, ¿cuál te avisa y cuál te explica?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** **Budgets avisa** y **Cost Explorer explica**. Budgets
funciona hacia adelante: le ponés un techo de costo o uso y te notifica cuando
te acercás, lo superás o el pronóstico dice que lo vas a superar. Cost Explorer
funciona hacia atrás: gráficos de hasta 12 meses para ver en qué servicio,
Región, cuenta o etiqueta se fue el dinero.

## 🎯 Pistas para el examen

- Este dominio es solo el 12 % del examen, pero es el de mejor relación
  esfuerzo/puntos: son pocas distinciones y casi todas binarias. Vale la pena
  llegar con estas tablas dominadas.
- Frente a una pregunta de precios, preguntate en este orden: **¿acepta
  compromiso?** → **¿se puede interrumpir?** → **¿necesita hardware propio?**
  Las tres respuestas ya eligen el modelo.
- Frente a una pregunta de soporte, preguntate: **¿es producción?** →
  **¿cuánto puede esperar?** → **¿pide un asesor asignado?**
- Cuando dos opciones parezcan válidas, fijate cuál **cumple exactamente** el
  requisito y cuál se pasa. AWS suele considerar incorrecta la opción que
  resuelve el problema pero cuesta de más (por ejemplo, Enterprise cuando
  Business alcanzaba).
- Estas tablas son un resumen para repasar rápido, no la fuente de verdad. Si
  una fila no te cierra, volvé a la lección original antes de memorizarla.
