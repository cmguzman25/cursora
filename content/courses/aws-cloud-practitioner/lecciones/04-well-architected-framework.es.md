# 1.2 — Principios de diseño: AWS Well-Architected Framework

> Dominio 1 · Task Statement 1.2 — Identify design principles of the AWS Well-Architected Framework

## 🤔 Antes de empezar

- Antes de mudarte a una casa nueva, ¿qué cosas revisarías además de si "se ve linda"? (pensá en seguridad, gastos, qué tan fácil es arreglar algo si se rompe)
- Si tuvieras que elegir entre un auto muy barato que se rompe seguido, y uno más caro pero confiable, ¿cómo pensarías esa decisión?
- ¿Alguna vez tuviste que elegir entre hacer algo más rápido y barato ahora, o hacerlo mejor pero que tome más tiempo o cueste más? ¿Qué elegiste?

## 📘 Contenido

### Un checklist para evaluar si algo está "bien construido"

Un arquitecto que diseña un edificio no solo revisa si las paredes van a
aguantar el peso del techo. También revisa si va a ser seguro en un
terremoto, si el mantenimiento va a ser manejable con el tiempo, si el
presupuesto alcanza, y si el diseño gasta energía de más.

El **AWS Well-Architected Framework** es exactamente ese tipo de checklist,
pero para sistemas en la nube. Es un conjunto de preguntas y buenas
prácticas, organizadas en **6 pilares**, que ayudan a revisar si algo que
construiste en AWS está bien diseñado — no solo "si funciona", sino si va a
seguir funcionando bien con el tiempo, si es seguro, si es eficiente y si no
estás gastando de más.

### Los 6 pilares

**1. Excelencia operativa.** ¿Podés operar el sistema y mejorarlo con el
tiempo, detectando y arreglando problemas rápido? Pensá en dos cocinas de
restaurante: una tiene procedimientos claros y checklists, así que si se
rompe una heladera lo notan enseguida y saben qué hacer; la otra no tiene
ningún proceso, así que el problema se descubre recién cuando ya se echó a
perder la comida.

**2. Seguridad.** ¿Está protegida la información y los sistemas? Un banco no
protege el dinero con una sola cerradura — tiene guardia, cámaras, alarma y
una puerta blindada, todo junto. En AWS, seguridad significa lo mismo: varias
capas de protección en lugar de depender de una sola.

**3. Fiabilidad.** ¿El sistema se recupera solo de una falla, y aguanta la
demanda que le llega? Un hospital tiene generadores de respaldo para que una
cirugía no se interrumpa si se corta la luz. Un sistema fiable está pensado
para que una falla puntual no tire abajo todo lo demás.

**4. Eficiencia de rendimiento.** ¿Estás usando los recursos de forma
inteligente, y podés adaptarte si la demanda o la tecnología cambian? Es la
diferencia entre usar una bicicleta para llevar un paquete a la vuelta de la
esquina, y usar un camión gigante "por las dudas" para lo mismo. Se trata de
elegir el tamaño correcto, no el más grande posible.

**5. Optimización de costos.** ¿Estás consiguiendo el resultado que
necesitás sin gastar de más? En la lección 1.1 ya vimos la idea de pagar solo
por lo que usás — este pilar es la versión "de diseño" de esa misma idea:
revisar activamente que no estés pagando por un depósito enorme que usás
apenas cinco días al año.

**6. Sostenibilidad.** ¿El sistema minimiza su impacto ambiental? Es como
elegir electrodomésticos eficientes en tu casa, o compartir auto en vez de
que cada uno maneje por separado: se llega al mismo resultado, gastando
menos energía en el camino. Este es el pilar más nuevo de los seis — AWS lo
agregó después de los otros cinco.

### Los pilares a veces compiten entre sí

Algo importante: mejorar un pilar puede significar ceder un poco en otro. Más
fiabilidad (por ejemplo, tener sistemas de respaldo duplicados) casi siempre
cuesta más dinero, lo cual tensiona contra el pilar de optimización de
costos. No existe una arquitectura "perfecta" en los 6 pilares a la vez — el
Well-Architected Framework no te dice qué elegir, te ayuda a ver
conscientemente qué estás priorizando y qué estás cediendo a cambio.

Para ayudar con esto, AWS ofrece una herramienta gratuita llamada **AWS
Well-Architected Tool**, disponible desde la consola, que te hace preguntas
sobre tu arquitectura y te señala en qué pilares podrías estar en riesgo.

**En resumen:** el Well-Architected Framework es un checklist de 6 pilares
(excelencia operativa, seguridad, fiabilidad, eficiencia de rendimiento,
optimización de costos y sostenibilidad) para revisar si un sistema está bien
diseñado. Mejorar un pilar suele implicar ceder algo en otro, y AWS tiene una
herramienta gratuita (AWS Well-Architected Tool) para ayudarte a revisar tu
arquitectura contra los 6.

## 💬 Ahora te toca a ti

**Pregunta:** Antes de mudarte a una casa nueva, ¿qué cosas revisarías además
de si "se ve linda"? (pensá en seguridad, gastos, qué tan fácil es arreglar
algo si se rompe)

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Probablemente revisarías varias cosas a la vez:
seguridad del barrio, costo de mantenimiento, qué tan fácil es conseguir un
plomero si algo se rompe, y quizás hasta el gasto de energía. Cada una de
esas preocupaciones se parece a uno de los 6 pilares — no evaluás la casa por
un solo criterio.

**Pregunta:** Si tuvieras que elegir entre un auto muy barato que se rompe
seguido, y uno más caro pero confiable, ¿cómo pensarías esa decisión?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Es exactamente la tensión entre fiabilidad y costo
que mencionamos: más confiabilidad casi siempre cuesta más. No hay una
respuesta "correcta" única — depende de qué estés priorizando en ese momento,
igual que con una arquitectura en AWS.

**Pregunta:** ¿Alguna vez tuviste que elegir entre hacer algo más rápido y
barato ahora, o hacerlo mejor pero que tome más tiempo o cueste más? ¿Qué
elegiste?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Cualquiera de las dos puede ser válida según el
contexto — la clave, igual que con el Well-Architected Framework, es que la
elección sea consciente y no accidental. El problema no es priorizar
velocidad sobre calidad (o viceversa); el problema es no darse cuenta de que
se está haciendo esa elección.

## 🎯 Pistas para el examen

- El examen suele describir una situación (por ejemplo, "una empresa quiere
  reducir su huella de carbono" o "un sistema necesita detectar fallas
  rápido") y esperar que identifiques a qué pilar corresponde. Enfocate en
  reconocer el *problema* que resuelve cada pilar, no en memorizar sus
  nombres de memoria.
- El pilar de **sostenibilidad** es el más nuevo y el que menos se suele
  recordar — repasalo con atención, porque el examen lo pregunta igual que a
  los otros cinco.
- Si una pregunta menciona específicamente una herramienta gratuita de AWS
  para evaluar una arquitectura contra los 6 pilares, la respuesta es **AWS
  Well-Architected Tool** — no lo confundas con AWS Trusted Advisor, que
  vamos a ver más adelante y cumple un rol distinto (recomendaciones
  generales, no una revisión estructurada por los 6 pilares).
- Ojo con las preguntas que mencionan un trade-off entre dos pilares (por
  ejemplo, "más redundancia pero más costo"): no busques la opción que
  maximiza un solo pilar, busca la que refleja mejor la prioridad que
  describe el enunciado.
