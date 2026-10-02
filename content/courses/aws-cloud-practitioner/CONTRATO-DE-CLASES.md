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
- **Tono cercano y directo, en voseo.** Se le habla al lector de "vos"
  (*tenés*, *podés*, *fijate*), como si fuera una conversación y no un manual
  corporativo.

  Hay **dos excepciones congeladas por formato**, que están en tuteo y así se
  quedan porque son idénticas en las 31 lecciones y cambiarlas rompería la
  comparación en todas: el título `## 💬 Ahora te toca a ti` y la línea
  `*Intenta responderla con tus palabras antes de seguir.*`. La interfaz de la
  app (los textos de `messages/*.json`) también usa tuteo; es otra capa y no se
  toca desde acá.
- **Extensión:** lo suficiente para explicar bien el tema, sin relleno. La
  referencia se mide sobre **el archivo completo**: entre 900 y 1700 palabras.
  Este techo es fijo — no se estira para "meter todo": si un tema es demasiado
  complejo o tiene demasiadas partes para entrar sin perder la simplicidad,
  **se divide en dos o tres lecciones** (como ya hicimos con 2.4a/2.4b,
  3.6a/3.6b y 3.8a/3.8b), no se alarga una sola lección más allá del rango.
  Una lección larga cansa y hace que el lector pierda el hilo; varias lecciones
  cortas y enfocadas se leen mejor y se recuerdan mejor.

  **Las lecciones de tablas comparativas (★) van de 700 a 1450 palabras.** Ahí
  el contenido es tabular y la prosa es mínima a propósito: sirven para comparar
  de un vistazo, no para explicar de nuevo lo que ya se enseñó. Agregar párrafos
  para llegar a un número sería justamente el relleno que este contrato prohíbe.

  *Estos rangos se cuentan sobre el archivo entero porque es lo que el
  verificador puede medir sin ambigüedad, y están calibrados contra lo que las
  31 lecciones realmente hacen. La versión anterior del contrato pedía 800-1500
  palabras "de la sección de contenido", un número que no se cumplía con
  ninguna forma de contar: midiendo solo la sección de Contenido, seis lecciones
  quedaban por debajo de 800; midiendo el archivo entero, la lección 4.1 se
  pasaba de 1500.*

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

Casi todo lo demás se chequea solo. Desde la raíz del repositorio:

```bash
node content/courses/aws-cloud-practitioner/verificar-lecciones.mjs
node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/courses/aws-cloud-practitioner/verificar-preguntas.mjs
```

El primero revisa las lecciones Markdown: las cuatro secciones exactas y en
orden, la cabecera, el resumen de cierre, que las preguntas de la sección 1 y la
3 sean idénticas palabra por palabra, el rango de palabras, el voseo, que no
haya signos de exclamación ni emoji fuera de los títulos, y que el manifiesto,
los archivos y el README coincidan entre sí.

El segundo revisa los cinco bancos de preguntas: los conteos por dominio, el
reparto de la letra correcta, que cada opción tenga explicación, los tips, los
ids únicos y que ningún enunciado del simulacro se parezca a uno de los bancos
de módulo. Importa los `.ts` directamente —Node 24 les quita los tipos al
cargarlos— así que valida sobre los objetos reales, no con expresiones
regulares.

Los dos salen con código 1 si encuentran algo, así que sirven en un hook o en CI.

## Formato especial: lecciones "Analiza preguntas de examen"

Al final de cada módulo de contenido (1 a 4), después de la lección de tablas
comparativas (★), hay una lección con un formato distinto al de arriba — no
enseña un tema nuevo, entrena reconocer la respuesta correcta entre opciones
parecidas. No aplica al módulo 0 (todavía no hay contenido de examen) ni al
módulo 5, que tiene su propio formato: el simulacro cronometrado, descrito en
la sección siguiente.

Estas lecciones **no se escriben en Markdown**: son interactivas. La lección
se marca con `kind: "quiz"` en el `manifest.ts` y su contenido vive como datos
tipados en `preguntas/modulo-N.ts`, registrados en `preguntas/index.ts`. La
app las renderiza con el componente `ExamQuiz`, que muestra una pregunta a la
vez, permite elegir una opción y después revisar la respuesta o pasar de largo
con solo un aviso de si estuvo bien o mal. El avance se guarda por usuario, así
que se puede retomar donde se dejó.

Reglas de contenido:

- **La cantidad de preguntas depende del módulo**, en proporción a cuánto
  pesa ese dominio en el examen y a cuántos subtemas tiene. Cubren temas de
  todo el módulo, no solo del último tema visto:

  | Módulo | Dominio | Peso en el examen | Preguntas |
  |---|---|---|---|
  | 1 | Conceptos de la nube | 24 % | 20 |
  | 2 | Seguridad y cumplimiento | 30 % | 25 |
  | 3 | Tecnología y servicios | 34 % | 35 |
  | 4 | Facturación, precios y soporte | 12 % | 15 |

  El Módulo 3 lleva bastantes más porque, además de ser el dominio más
  pesado, es el que más servicios sueltos hay que reconocer.
- **Formato real del examen:** opción múltiple (1 correcta entre 4) o
  respuesta múltiple (2 correctas entre 5, con `multiple: true`), igual que
  el CLF-C02 real. Alrededor del 15 % de respuesta múltiple es una
  proporción realista.
- **Por cada opción** —correcta o incorrecta— hay que explicar por qué lo es.
  No alcanza con justificar la correcta: en las incorrectas es donde se
  enseñan las trampas típicas del examen.
- **Tips por pregunta** (`tips`): 2 o 3 sugerencias que enseñen a *reconocer*
  el tipo de pregunta, no que repitan el dato ya explicado.
- **No es un simulacro cronometrado ni tiene puntaje que se reporte como
  nota.** El objetivo es analizar, no medir. (El simulacro cronometrado real
  está en la lección 5.2, al final del curso.)
- Mismo lenguaje simple y en voseo que el resto del curso: las explicaciones
  no dan por sentado que el lector recuerde el detalle exacto, así que
  conviene recordar brevemente el concepto antes de decir por qué una opción
  falla.

Reglas de diseño del banco de preguntas (fáciles de romper sin darse cuenta):

- **Repartir la respuesta correcta** entre A, B, C y D de forma pareja. Si se
  escriben las preguntas de corrido, la correcta tiende a caer siempre en la
  misma letra y se acierta por patrón en vez de por conocimiento.
- **Cubrir cada concepto del módulo como respuesta correcta** al menos una
  vez, no solo como distractor.
- **Los distractores tienen que ser tentadores.** Una opción obviamente falsa
  no enseña nada; la mejor es la que se confunde de verdad con la correcta
  (por ejemplo, "License Included" frente a "BYOL").
- **Ningún distractor puede ser defendible como correcto.** Si alguien con
  buen criterio puede argumentar que también es válido, hay que reemplazarlo.
- **Opciones gramaticalmente parejas.** Si tres son frases verbales y una es
  un sustantivo suelto, esa asimetría es una pista involuntaria.
- **Un mismo concepto se nombra siempre igual** en todas las preguntas y con
  el mismo nombre que usa la lección que lo enseñó.

## Formato especial: el simulacro cronometrado (lección 5.2)

La lección 5.2 es el único examen con reloj y con nota del curso. Igual que las
lecciones de "analiza preguntas", **no se escribe en Markdown**: se marca con
`kind: "exam"` en el `manifest.ts` y la app la renderiza con el componente
`PracticeExam`.

Dónde vive cada cosa:

| Qué | Dónde |
|---|---|
| Las preguntas | `preguntas/simulacro/dominio-{1,2,3,4}.ts` |
| Duración, escala y pesos | `preguntas/simulacro/configuracion.ts` |
| El orden en que se sirven | `preguntas/simulacro/intercalar.ts` |
| El ensamblado final | `preguntas/simulacro/index.ts` |

Un archivo por dominio y no uno solo, porque 65 preguntas con sus opciones
explicadas son unas 2.000 líneas: separadas, el reparto por dominio se puede
verificar de forma mecánica y cada tanda se revisa por separado.

Reglas de contenido:

- **65 preguntas en 90 minutos**, igual que el CLF-C02 real.
- **Reparto por dominio: 16 / 19 / 22 / 8.** Es lo más cerca que se puede
  quedar de los pesos oficiales (24 / 30 / 34 / 12 %) con un total de 65:
  da 24,6 / 29,2 / 33,8 / 12,3 %.
- **Las preguntas son nuevas.** No se reciclan de los bancos de módulo: si el
  alumno ya las vio al cerrar cada módulo, la nota sale inflada y el simulacro
  deja de medir. El verificador de preguntas rechaza enunciados repetidos o
  demasiado parecidos entre los cinco bancos.
- **Las explicaciones se leen todas juntas al final, sin la lección delante.**
  A diferencia de los bancos de módulo, que se responden con el tema fresco,
  acá cada explicación recuerda el concepto en una frase antes de decir por qué
  la opción falla.
- Valen todas las reglas de diseño de banco de la sección anterior: reparto
  parejo de la letra correcta, explicación en cada opción, 2 o 3 tips,
  distractores tentadores pero indefendibles, nombres consistentes.

Cómo se calcula la nota:

- Escala **100 a 1000**, se aprueba con **700**, anclado al **70 % de
  aciertos** — o sea 46 de 65. La recta se quiebra en ese ancla a propósito:
  con una recta sola, los 700 puntos caerían en el 66,7 % y aprobaría quien
  saca el 68 %, por debajo del umbral real.
- **La nota la calcula el servidor**, no el cliente, y el vencimiento del
  intento también lo fija el servidor. Un plazo puesto por el navegador no es
  un plazo, y una nota que llega en el cuerpo de una petición no es una nota.
- **La pantalla de resultados tiene que decir que la nota es una
  aproximación**, y por qué: el examen real tiene 15 preguntas que no puntúan y
  usa un modelo de equiparación que AWS no publica. Es la pantalla donde el
  alumno más confía en el número, y prometer una precisión que no tenemos sería
  mentirle justo ahí.
- El desglose por dominio se presenta como **diagnóstico de dónde reforzar**, no
  como sub-notas. Con 8 preguntas en el dominio 4, un error mueve ese
  porcentaje 12 puntos.

Diferencias de comportamiento con las lecciones de repaso (`kind: "quiz"`):

| | Repaso (`quiz`) | Simulacro (`exam`) |
|---|---|---|
| Revela la respuesta | En el momento | Recién al entregar |
| Dejar en blanco | No se puede | Sí, y se puede marcar y volver |
| Reloj | No tiene | 90 minutos, entrega solo al llegar a 0 |
| Nota | "Acertaste N de M" | Escala 100-1000 con aprobado/no aprobado |
| Se guarda en | `quiz_progress`, por índice | `exam_attempts`, por id de pregunta |
