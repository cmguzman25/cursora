---
name: generar-examen
description: Crea un banco de examen independiente bajo content/exams/<slug>/, con su configuración, sus preguntas por tema, su verificador automático y su alta en el registro. Úsalo cuando se pida un examen, simulacro o batería de preguntas sobre un tema que no es una lección de un curso. Pregunta antes los parámetros que cambian el diseño (temas, dificultad, cantidad de preguntas, formato) y deriva las preguntas de principios de evaluación, no copiando el banco de otro examen.
---

# Banco de examen para la sección `/exams`

Un examen de esta sección **no pertenece a ningún curso**. El alumno lo rinde para
prepararse para una certificación, o para repasar algo que está estudiando fuera de
esta plataforma. Se puede rendir de dos maneras, y las dos salen del mismo banco:

- **modo examen** — cronometrado, con la duración que elige el alumno, sin revelar
  nada hasta entregar.
- **modo estudio** — sin reloj, revelando al instante la correcta y la explicación
  de **cada** opción en el momento en que se marca una.

## La regla que define este skill

**La explicación de una opción incorrecta tiene que decir por qué es tentadora.**

Es lo único que separa este banco de un cuestionario cualquiera. "No es correcta"
no enseña nada; el alumno ya sabía que no era. Lo que no sabe es **qué lo hizo
elegirla**, y nombrárselo es la clase. Si una explicación no identifica una
confusión concreta —una marca temporal mal leída, dos conceptos que se parecen, una
regla aplicada fuera de su caso—, está sin escribir.

El modo estudio existe para mostrar esas explicaciones. Un banco con distractores
sin explicar convierte la mitad de la sección en decoración.

## La otra regla: no copies otro banco

Un examen de vocabulario de inglés y uno de certificación de nube no comparten
formato, longitud ni tipo de enunciado. Diseñá desde los parámetros de la sección 1
y los principios de la 4. Lo que **sí** se reutiliza de los exámenes existentes son
dos cosas, las dos mecánicas: los requisitos técnicos de la sección 3 y la
estructura del verificador (`verificador-plantilla.mjs`, junto a este archivo).

`content/exams/ingles-tiempos-y-condicionales/` es la implementación de referencia.
Míralo para ver cómo encajan las piezas, no para copiar sus temas.

---

## 1. Pregunta los parámetros antes de escribir nada

Usa `AskUserQuestion` en dos rondas. No empieces hasta tenerlas. Si el usuario ya
dio alguna respuesta en su petición, no la vuelvas a preguntar.

### Ronda 1 — qué se evalúa

| Pregunta | Opciones sugeridas |
|---|---|
| ¿Qué temas evalúa? | *Redáctala para el caso concreto*: el usuario los enumera, y de ahí salen los `ExamTopic` |
| ¿Qué dificultad? | Introductorio (reconocer) · Intermedio (aplicar a un escenario) · Avanzado (discriminar entre opciones cercanas) · Mixta escalonada |
| ¿Cuántas preguntas? | 20 · 40 · 65 · Lo decide la cobertura de los temas |
| ¿Cómo se reparten entre temas? | Parejo · Según el peso que yo indique · Según cuánto material tiene cada tema |

### Ronda 2 — la forma de las preguntas

| Pregunta | Opciones sugeridas |
|---|---|
| ¿Imita el formato de un examen real? | Sí, certificación (4 opciones / 1 correcta) · Sí, otro formato (lo describo) · No, repaso libre |
| ¿Proporción de respuesta múltiple? | Ninguna · ~15 % · ~30 % |
| ¿En qué idioma se escriben las preguntas? | Español · Inglés · Enunciado en español y material en el idioma que se estudia |
| ¿Porcentaje para aprobar? | 60 % · 70 % · 80 % |
| ¿Duración sugerida? | Derivada (~1,5 min por pregunta) · La indico yo |

Si alguna respuesta hace inviable el examen tal como se pidió, dilo antes de
escribir. Ejemplo concreto: **un reparto muy desbalanceado rompe el intercalado**.
Con un tema de 30 preguntas y otro de 5, `intercalarPorTema` agota el corto en la
quinta vuelta y las últimas 25 quedan monotemáticas. Conviene avisarlo y proponer un
reparto más parejo, o aceptarlo a sabiendas.

---

## 2. Qué cambia cada parámetro

Esta tabla es el núcleo del skill. Sin ella las preguntas salen genéricas.

### La dificultad manda sobre el tipo de enunciado

| Dificultad | Cómo es el enunciado | Cómo son los distractores |
|---|---|---|
| Introductorio | Recuerdo directo: "¿qué significa X?" | Conceptos de la misma familia, claramente distintos entre sí |
| Intermedio | Escenario: "un equipo necesita X, ¿qué conviene?" | Opciones que serían correctas en **otro** escenario; la explicación dice en cuál |
| Avanzado | Dos opciones defendibles y un detalle que decide | La descartada es casi correcta, y explicar por qué no lo es **es** la clase |
| Mixta | Escalonada, y el reparto va declarado en el README para poder contarlo | Según el escalón |

### El formato manda sobre el verificador

4 opciones / 1 correcta y 5 / 2 son la convención de la casa, y son las constantes
`FORMATOS` del verificador. Otro formato cambia esos números y hay que anotarlo en
el encabezado del verificador, no dejarlo implícito.

La regla detrás de los números: **siempre un distractor más que correctas**. Con 4
opciones y 1 correcta, adivinar paga 25 %; con 3 pagaría 33 %.

### El idioma no cambia nada del código

`questions.es` es el nombre del casillero obligatorio, **no una promesa sobre el
idioma de lo que hay dentro**. Un examen de inglés va a tener sus enunciados en
inglés dentro de `questions.es`, y está bien. Escribilo en el README para que quien
lo lea después no intente "arreglarlo".

Solo se usa el casillero `es`, salvo que el usuario pida traducciones paralelas. Si
las pide, tienen que ser **estrictamente paralelas**: mismas preguntas, mismo orden,
mismos ids de opción, mismas correctas.

---

## 3. Requisitos técnicos de la plataforma

**Verificalos leyendo el código, no confiando en esta lista.** La app cambia. Los
archivos que mandan son estos:

- `content/exams/types.ts` — `GeneratedExamBank`, `ExamTopic`, `ExamQuestionWithTopic`
- `content/exams/registry.ts` — dónde se da de alta el examen
- `content/exams/intercalar.ts` — cómo se ordenan las preguntas
- `src/lib/exams/generated.ts` — cómo el banco se vuelve calificable
- `src/lib/exams/answers.ts` — qué es una respuesta que se puede guardar
- `src/components/lessons/question-options.tsx` — cómo se dibuja una opción

A día de hoy eso impone:

- **Los archivos de tema solo pueden usar `import type`.** El verificador los carga
  directamente con Node, que les quita los tipos pero **no** resuelve imports sin
  extensión. Un `import` de valor en un archivo de tema rompe el verificador, no la
  app, así que el error aparece lejos de su causa.
- **El verificador no importa `preguntas/index.ts` ni `manifest.ts`**, por lo mismo:
  los dos importan sin extensión. Reensambla el banco por su cuenta con
  `intercalarPorTema`.
- **La ficha del examen vive en `configuracion.ts`**, un módulo hoja con solo
  `import type`, y `manifest.ts` la combina con las preguntas. Así el verificador
  puede comprobar que los temas y las cantidades declaradas coinciden con lo que hay
  de verdad, sin que los valores esperados queden duplicados en el script.
- **Los ids de opción son las letras `A`, `B`, `C`… en orden.** `OptionButton`
  imprime `option.id` dentro de un círculo de 24 px cuando la opción no está
  revelada: un id como `opt-1` sale impreso tal cual y desborda.
- **El Markdown no se renderiza** en enunciados, explicaciones ni tips. Van como
  texto plano, así que `**esto**` sale con los asteriscos a la vista. (Los bancos de
  los cursos tienen este problema: sus tips usan `**` y se ven literales. No lo
  repitas.)
- **Sin HTML y sin imágenes.** Si hace falta un esquema, va en texto.
- `title` y `description` son `LocalizedText` **en la configuración**: un examen
  nuevo **no** necesita tocar `messages/*.json`.
- **Subí `version`** ante cualquier edición de cualquier pregunta. Queda guardada en
  cada rendida, y un intento viejo revisado contra un banco más nuevo mostraría
  enunciados que ese alumno no respondió.
- **El examen no existe para la app hasta darlo de alta** en
  `content/exams/registry.ts`.

---

## 4. Principios de evaluación

Cada principio tiene que materializarse en una regla que se pueda comprobar. Un
principio sin regla es una declaración de intenciones.

| Principio | Cómo se materializa |
|---|---|
| Una sola idea por pregunta | Si acertar exige dos conocimientos independientes, son dos preguntas |
| El distractor enseña | Cada opción incorrecta nombra la confusión concreta que la hace atractiva |
| Sin pistas de forma | La correcta no es la más larga, ni la única con jerga, ni la única con un cuantificador prudente ("generalmente", "puede") |
| Sin "todas / ninguna de las anteriores" | Evalúan lógica de examen, no el tema. El verificador las rechaza |
| Enunciado en positivo | Una negación en el enunciado mide lectura, no conocimiento |
| Recuperación, no reconocimiento | El enunciado no repite la frase literal donde se aprendió la respuesta |
| Cobertura declarada | Cada tema tiene las preguntas que declara, y ninguna pregunta vive en un tema que no está declarado |
| La letra correcta no es una pista | El reparto entre A–D queda parejo dentro del margen del verificador |

Dos que valen para cualquier examen y se olvidan:

- **Los tips son para después, no pistas disfrazadas.** Se muestran una vez revelada
  la respuesta. Un tip que diga "fijate en la fecha" convierte la pregunta en un
  ejercicio de lectura de tips. Tienen que generalizar: "una fecha explícita
  descarta el present perfect, sin excepciones".
- **Dos preguntas que se contestan con el mismo razonamiento son una pregunta.**
  Varía el razonamiento, no el vocabulario del enunciado. El control de 7-gramas del
  verificador atrapa la variante perezosa, pero solo si el enunciado se parece; dos
  enunciados distintos con el mismo fondo pasan y no deberían.

---

## 5. Qué entregar

Bajo `content/exams/<slug>/`:

1. **`configuracion.ts`** — slug, título, descripción, temas, `PREGUNTAS_POR_TEMA`,
   dificultad, duración sugerida, porcentaje para aprobar, versión y prefijo de ids.
   Solo `import type`.
2. **`preguntas/tema-<n>-<nombre>.ts`** — uno por tema. Solo `import type`.
3. **`preguntas/index.ts`** — ensambla con `intercalarPorTema`.
4. **`manifest.ts`** — combina la configuración con las preguntas y exporta `bank`.
5. **`verificar-preguntas.mjs`** — adapta `verificador-plantilla.mjs`, que está junto
   a este archivo. Los valores a cambiar están marcados con `AJUSTA`.
6. **`README.md`** — qué cubre, los parámetros con los que se generó, la tabla de
   preguntas, la medición del verificador, y **qué no se verificó**.

Más una línea en `content/exams/registry.ts`.

---

## 6. Calibrá con un tema piloto

No es opcional, y es el paso que más tiempo ahorra.

1. Escribí **un** tema completo, con contenido real.
2. Pasale el verificador.
3. **Leé las explicaciones de punta a punta**, las de las incorrectas incluidas. Es
   lo único que detecta el fallo que importa: un distractor que no enseña nada.
4. Arreglá lo que la lectura encuentre, y recién entonces escribí los otros temas.

El error que cometerías cuarenta veces cuesta diez preguntas encontrarlo acá.

---

## 7. Trampas conocidas

- **El reparto de letras se desbalancea escribiendo tema por tema.** Sin darte
  cuenta, la correcta se va a B y C. Revisá después de cada tema, no al final.
- **El control de 7-gramas salta con enunciados legítimamente parecidos** cuando un
  tema tiene vocabulario estrecho. Reescribí el enunciado; no bajes el umbral.
- **El control de longitud salta al final.** La correcta tiende a ser la más larga
  porque es la que lleva los matices. Si salta, no recortes la correcta: alargá los
  distractores con el detalle que los hace plausibles, que además los mejora.
- **Un `import` de valor en un archivo de tema rompe el verificador**, no la app.
- **Los ids de opción que no son letras salen impresos** en el círculo de la opción.
- **El Markdown no se renderiza.** `**negrita**` sale con asteriscos.
- **Olvidarse del alta en el registro** deja el examen en disco y en ninguna parte.
- **Olvidarse de subir `version`** rompe la revisión de los intentos viejos.
- **Comprobá que el verificador también falla.** Rompé un archivo a propósito —un id
  duplicado, una explicación vacía, todas las correctas en B—, confirmá que salta
  cada control, y restauralo. Un verificador que solo se probó en verde no vale nada.

---

## 8. Sé honesto con lo que no verificaste

El verificador mide **forma, no verdad**. Al entregar, decí explícitamente qué no se
comprobó. Lo habitual:

- **Que cada respuesta marcada como correcta sea de verdad la correcta no lo
  comprueba ningún script.** Solo lo leyó alguien.
- Las explicaciones de las incorrectas afirman cuál es la confusión que las hace
  tentadoras. Eso es una hipótesis didáctica, no un hecho medido.
- La calibración de la dificultad es un juicio, no el resultado de haberlo probado
  con nadie.
- Si hay traducciones, que digan lo mismo que el original no lo revisó un nativo.

Anotalo en el README. Una pregunta que pasa el verificador **no** es una pregunta
verificada.
