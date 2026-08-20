# Contrato de redacción — curso AWS Certified Cloud Practitioner

Este documento define **cómo se escribe cada lección** de este curso. Es un
contrato: toda lección nueva (`lecciones/*.md`) tiene que seguir esta misma
estructura, el mismo tono y las mismas cuatro secciones, en el mismo orden.

Este contrato aplica **solo a este curso**. Cuando armemos otro curso, ese
tendrá su propio contrato, adaptado a ese tema y a esa audiencia.

## Principios generales de redacción

- **Lenguaje simple, siempre.** El lector no tiene experiencia previa en la
  nube ni en tecnología. Si una persona sin ese background no entendería una
  frase, hay que reescribirla.
- **Ningún término técnico sin explicar.** La primera vez que aparece una
  sigla o un servicio de AWS, se explica en palabras simples antes de usar el
  nombre técnico (ejemplo: "una base de datos administrada por AWS, llamada
  RDS" — no solo "RDS").
- **Un ejemplo cotidiano por concepto importante.** Antes o después de la
  explicación "técnica", hay que dar una analogía de la vida real (una
  oficina, un edificio, una tienda, un armario con llaves, etc.). El ejemplo
  técnico de AWS viene después del ejemplo cotidiano, no al revés.
- **Frases cortas.** Preferir dos oraciones simples antes que una oración
  larga con varias ideas encadenadas.
- **Tono cercano y directo.** Se le habla al lector de "tú", como si fuera
  una conversación, no un manual corporativo.
- **Extensión de la sección de contenido:** lo suficiente para explicar bien
  el tema, sin relleno. Como referencia, entre 800 y 1500 palabras. Este techo
  es fijo — no se estira para "meter todo": si un tema es demasiado complejo
  o tiene demasiadas partes para entrar en 1500 palabras sin perder la
  simplicidad, **se divide en dos o tres lecciones** (como ya hicimos con
  3.6a/3.6b y 3.8a/3.8b), no se alarga una sola lección más allá del rango.
  Una lección larga cansa y hace que el lector pierda el hilo; varias
  lecciones cortas y enfocadas se leen mejor y se recuerdan mejor.

## Estructura obligatoria de cada lección

Toda lección tiene exactamente estas cuatro secciones, en este orden:

### 1. 🤔 Antes de empezar

Van **entre 2 y 4 preguntas**, escritas por nosotros (no por el lector),
*antes* de cualquier contenido. El objetivo no es que el lector las responda
todavía — es que su cerebro quede "activado", buscando esa respuesta mientras
lee la lección.

Reglas para estas preguntas:
- Son preguntas abiertas, de intuición, no preguntas de examen ni de sí/no.
- Se relacionan directamente con el tema de la lección.
- No se responden en esta sección. Se responden más adelante, en la sección 3.
- Si el lector nunca escuchó el tema, la pregunta lo invita a imaginar o
  arriesgar una respuesta de todas formas.

Ejemplo (lección sobre IAM):

> ¿Alguna vez escuchaste hablar de IAM? ¿Qué crees que hace?
> ¿Para qué crees que sirve dentro de una cuenta de AWS?

### 2. 📘 Contenido

La explicación del tema, siguiendo los principios generales de arriba:
lenguaje simple, un ejemplo cotidiano por concepto, sin dar por sentado
conocimiento previo. Se pueden usar subtítulos, listas y tablas para que sea
fácil de escanear — no todo tiene que ser párrafo corrido.

Cierra siempre con un mini resumen de 2-3 líneas ("en resumen...") con las
ideas clave del tema, antes de pasar a la siguiente sección.

### 3. 💬 Ahora te toca a ti

Se repiten **exactamente las mismas preguntas** de la sección 1 — palabra por
palabra. La diferencia es el marco: ahora se invita al lector a responderlas
con lo que acaba de aprender, antes de mirar la respuesta sugerida.

Formato por pregunta:

```
**Pregunta:** (la misma pregunta de la sección 1)

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** ...
```

La respuesta sugerida no reemplaza la reflexión del lector — es para que
pueda comparar y corregirse.

### 4. 🎯 Pistas para el examen

Una lista corta (3 a 5 puntos) que no repite contenido, sino que enseña
**cómo pensar** ese tema de cara al examen: qué suele confundir el examen
CLF-C02 en este punto, qué distinción le gusta preguntar a AWS, qué "trampas"
son comunes entre las opciones de respuesta, o qué principio general ayuda a
descartar opciones incorrectas aunque no te acuerdes del detalle exacto.

Esta sección es sobre estrategia y forma de pensar, no sobre datos nuevos.

## Plantilla lista para copiar

```markdown
# [Número y nombre de la lección]

> Dominio X · Task Statement X.X — [nombre oficial del task statement]

## 🤔 Antes de empezar

- Pregunta 1
- Pregunta 2

## 📘 Contenido

[Desarrollo del tema, con ejemplos cotidianos primero y luego el ejemplo
en AWS]

**En resumen:** ...

## 💬 Ahora te toca a ti

**Pregunta:** Pregunta 1

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** ...

**Pregunta:** Pregunta 2

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** ...

## 🎯 Pistas para el examen

- Pista 1
- Pista 2
- Pista 3
```

## Checklist antes de dar una lección por terminada

- [ ] ¿Las preguntas de "Antes de empezar" y "Ahora te toca a ti" son
      exactamente las mismas?
- [ ] ¿Cada término técnico nuevo se explicó en palabras simples la primera
      vez que aparece?
- [ ] ¿Hay al menos un ejemplo cotidiano (no técnico) por concepto importante?
- [ ] ¿El contenido cierra con un resumen corto?
- [ ] ¿Las pistas para el examen enseñan una forma de pensar, no solo repiten
      datos ya dichos en el contenido?

## Formato especial: lecciones "Analiza preguntas de examen"

Al final de cada módulo de contenido (1 a 4), después de la lección de tablas
comparativas (★), hay una lección con un formato distinto al de arriba — no
enseña un tema nuevo, entrena reconocer la respuesta correcta entre opciones
parecidas. No aplica al módulo 0 (todavía no hay contenido de examen) ni al
módulo 5 (ya tiene el simulacro completo en 5.2).

Reglas:

- **Exactamente 20 preguntas** por lección, cubriendo temas de todo el
  módulo (no solo del último tema visto).
- **Formato real del examen:** opción múltiple (1 correcta entre 4) o
  respuesta múltiple (2 correctas entre 5), igual que el CLF-C02 real.
- **Por cada pregunta**, además de marcar la opción correcta, hay que
  explicar por qué **cada una de las opciones incorrectas** está mal — no
  alcanza con explicar por qué la correcta está bien. Ahí es donde se
  enseñan las trampas típicas del examen.
- **No es un simulacro cronometrado ni tiene puntaje.** El lector puede leer
  la respuesta y la explicación de inmediato si quiere — el objetivo es
  analizar, no medir. (El simulacro cronometrado real está en la lección 5.2,
  al final del curso.)
- Mismo lenguaje simple que el resto del curso: las explicaciones no dan por
  sentado que el lector recuerde el detalle exacto, así que conviene
  recordar brevemente el concepto antes de decir por qué una opción falla.

Plantilla por pregunta:

```markdown
## Pregunta N

[Enunciado de la pregunta, con un caso o escenario si aplica]

- A) ...
- B) ...
- C) ...
- D) ...

**Respuesta correcta: B**

- **A)** Por qué esta opción no es correcta.
- **B)** Por qué esta es la correcta.
- **C)** Por qué esta opción no es correcta.
- **D)** Por qué esta opción no es correcta.
```

La lección completa es la introducción breve (misma cabecera con
`> Módulo X · Cierre de módulo — análisis de preguntas de examen`) seguida de
las 20 preguntas con este formato, una tras otra.
