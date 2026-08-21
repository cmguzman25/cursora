# ★ 1.5 — Tablas comparativas: conceptos de la nube

> Dominio 1 · Cierre de módulo — repaso comparativo

## 🤔 Antes de empezar

- Sin mirar atrás, ¿podrías nombrar los 6 pilares del Well-Architected Framework de memoria? ¿Cuáles se te complican más?
- Si alguien te preguntara "¿cuál es la diferencia entre CapEx y OpEx?" en una sola frase, ¿qué le dirías?
- Entre rehosting y replatforming, ¿cuál de los dos implica más cambios en la aplicación?

## 📘 Contenido

Esta lección no trae contenido nuevo — es un repaso de las lecciones 1.1 a
1.4, organizado en tablas para que puedas comparar los conceptos parecidos
uno al lado del otro. Como vimos en la introducción del curso, este es
justo el formato que más aparece en las preguntas reales del examen: "¿cuál
de estas opciones parecidas es la correcta para esta situación?".

### Los 6 pilares del Well-Architected, uno junto al otro

| Pilar | Pregunta clave | Ejemplo cotidiano |
|---|---|---|
| Excelencia operativa | ¿Podés operar y mejorar el sistema con el tiempo? | Una cocina con checklists claros |
| Seguridad | ¿Está protegida la información y los sistemas? | Un banco con varias capas de protección |
| Fiabilidad | ¿El sistema se recupera solo de una falla? | Un hospital con generador de respaldo |
| Eficiencia de rendimiento | ¿Usás los recursos del tamaño correcto? | Elegir bici o camión según el paquete |
| Optimización de costos | ¿Evitás gastar en algo que no necesitás? | No alquilar un depósito que casi no usás |
| Sostenibilidad | ¿Se minimiza el impacto ambiental? | Elegir electrodomésticos eficientes |

### CapEx vs. OpEx

| | CapEx (gasto de capital) | OpEx (gasto operativo) |
|---|---|---|
| Cuándo se paga | Una suma grande, por adelantado | Según el uso, mes a mes |
| Qué representa | Comprar un activo que después mantenés vos | Pagar por un servicio que otro mantiene |
| Ejemplo cotidiano | Comprar una casa | Alquilar un departamento |
| Ejemplo en AWS | Comprar servidores propios | Usar instancias de EC2 |

### Las 6 R de migración: cuándo conviene cada una

| Estrategia | Qué hace | Cuándo conviene |
|---|---|---|
| Rehosting | Mueve la app tal cual, sin cambios | Migrar rápido, sin tiempo para rediseñar |
| Replatforming | Mueve con algunos ajustes menores | Sacarle algo de provecho a la nube sin rediseñar todo |
| Repurchasing | Reemplaza por otro producto (SaaS) | Ya existe una alternativa mejor lista para usar |
| Refactoring | Rediseña la app para la nube | Se busca el máximo beneficio a largo plazo |
| Retire | Da de baja el sistema | Ya no aporta valor a la empresa |
| Retain | Lo deja como está, sin migrar | Hay una razón (regulación, costo) para esperar |

**En resumen:** esta lección no agrega conceptos nuevos — junta lo visto en
el Módulo 1 en tres tablas para que puedas repasar rápido las diferencias
entre conceptos parecidos, que es exactamente el tipo de comparación que más
te va a pedir el examen real.

## 💬 Ahora te toca a ti

**Pregunta:** Sin mirar atrás, ¿podrías nombrar los 6 pilares del
Well-Architected Framework de memoria? ¿Cuáles se te complican más?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Excelencia operativa, seguridad, fiabilidad,
eficiencia de rendimiento, optimización de costos y sostenibilidad. Si te
costó alguno, revisá la tabla de arriba una vez más — el pilar de
sostenibilidad suele ser el que más cuesta recordar por ser el más nuevo.

**Pregunta:** Si alguien te preguntara "¿cuál es la diferencia entre CapEx y
OpEx?" en una sola frase, ¿qué le dirías?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** CapEx es pagar mucho de una sola vez por algo que
después es tuyo y tenés que mantener; OpEx es pagar de a poco, según el uso,
por algo que mantiene otro. AWS funciona como OpEx.

**Pregunta:** Entre rehosting y replatforming, ¿cuál de los dos implica más
cambios en la aplicación?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Replatforming — rehosting mueve la aplicación sin
tocarle nada, mientras que replatforming le hace algunos ajustes puntuales
(aunque sin llegar a rediseñarla por completo, eso ya sería refactoring).

## 🎯 Pistas para el examen

- Cuando una pregunta te dé un escenario y 4 opciones parecidas, tu primer
  paso debería ser ubicar mentalmente cada opción en la tabla que
  corresponda — la mayoría de las veces, dos opciones se descartan solas en
  cuanto identificás la tabla correcta.
- No trates estas tablas como la única fuente de verdad — son un resumen
  para repasar rápido. Si alguna fila no te cierra del todo, volvé a la
  lección original (1.1 a 1.4) en vez de memorizar la tabla sin entenderla.
- Practicá explicar cada fila con tus propias palabras, no solo leerla — es
  la diferencia entre reconocer un concepto y poder aplicarlo cuando el
  examen lo disfraza de situación real.
