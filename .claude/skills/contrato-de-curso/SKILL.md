---
name: contrato-de-curso
description: Crea el CONTRATO-DE-CLASES.md de un curso nuevo, junto con su índice, su verificador automático y una clase piloto calibrada. Úsalo cuando se pida diseñar, arrancar o planificar un curso nuevo para esta plataforma, o cuando se hable de "el contrato" de un curso. Pregunta antes los parámetros que cambian el diseño (edad del alumno, duración de las lecturas, tipo de curso) y deriva la estructura de principios de aprendizaje, no de los otros cursos del repositorio.
---

# Contrato de clases para un curso nuevo

Un contrato es el documento que decide **de antemano** cómo se escribe cada
clase de un curso: tipos de clase, secciones obligatorias, longitud, tono y
prohibiciones. Existe para que sesenta u ochenta clases escritas en semanas
distintas se lean como una sola voz, y para que buena parte de su calidad se
compruebe con un script en lugar de a ojo.

## La regla que define este skill

**No copies la estructura pedagógica de los otros cursos del repositorio.**

Cada curso tiene un público, un objetivo y un formato distintos. Un curso de
programación para adultos y uno de inglés para adolescentes no comparten
secciones ni longitudes, aunque compartan plataforma. Diseña desde los
parámetros y desde los principios de la sección 4.

Lo que **sí** se reutiliza de los cursos existentes son dos cosas, ambas
mecánicas: los requisitos técnicos de la app (sección 3) y el verificador
(`verificador-plantilla.mjs`, junto a este archivo). El curso
`content/courses/videojuego-rts-unity/` es la implementación de referencia de
esa maquinaria; míralo para ver cómo encaja todo, no para copiar sus secciones.

---

## 1. Pregunta los parámetros antes de diseñar nada

Usa `AskUserQuestion` en dos rondas. No empieces a escribir hasta tenerlas.
Si el usuario ya dio alguna respuesta en su petición, no la vuelvas a preguntar.

### Ronda 1 — la forma del curso

| Pregunta | Opciones sugeridas |
|---|---|
| ¿Qué tipo de curso es? | Proyecto (se construye algo) · Certificación (hay un examen real) · Habilidad practicable (idioma, instrumento) · Conocimiento (entender un campo) |
| ¿Para quién es? | Niños 8-12 · Adolescentes 13-17 · Adultos sin experiencia en el tema · Adultos con oficio técnico |
| ¿Cuánto debe durar cada lectura? | 5-7 min · 8-10 min · 12-15 min |
| ¿Qué tamaño tiene el curso? | Corto (~30 clases) · Medio (~60) · Largo (~90+) · Lo decide el temario |

### Ronda 2 — lo que cambia el contrato

| Pregunta | Opciones sugeridas |
|---|---|
| ¿Qué trae el alumno? | *Redáctala para el tema concreto*: qué se da por sabido y qué no |
| ¿Usa alguna herramienta externa? | Ninguna · Una (editor, app) · Varias que se comunican entre sí |
| ¿Cómo se evalúa? | Cuestionario al cerrar cada módulo · Solo examen final · Sin evaluación |
| ¿Idiomas? | Solo español · Español y traducciones previstas |

Si alguna respuesta hace inviable el curso tal y como se pidió, dilo antes de
escribir. Ejemplo real: un curso de 65 clases con un módulo de arte "a fondo"
no cabe en 65 clases, y conviene decirlo en vez de comprimir el temario hasta
romper la regla de una idea por clase.

---

## 2. Qué cambia cada parámetro

Esta tabla es el núcleo del skill. Sin ella, el contrato sale genérico.

### La edad y el perfil mandan sobre la forma

Puntos de partida, **para calibrar con la clase piloto**, no para dar por buenos:

| Público | Unidades de lectura por minuto | Máx. palabras/frase | Promedio | Términos nuevos por clase | Secciones por clase |
|---|---|---|---|---|---|
| Niños 8-12 | 90 – 130 | 14 | ≤ 12 | 2 | 5 o 6 |
| Adolescentes 13-17 | 130 – 170 | 17 | ≤ 15 | 3 | 6 o 7 |
| Adultos, tema nuevo | 150 – 190 | 20 | ≤ 18 | 4 | 8 o 9 |
| Adultos con oficio técnico | 170 – 210 | 20 | ≤ 18 | 5 | 8 o 9 |

Cuanto más joven el público, menos secciones y más cortas. Nueve secciones a un
niño de nueve años le parecen un examen.

### El tipo de curso manda sobre las secciones

| Tipo | Secciones que no pueden faltar | Promesa central del contrato |
|---|---|---|
| Proyecto | Manos a la obra · Compruébalo · Si algo se rompe | Al terminar cada clase, lo construido funciona |
| Certificación | Contenido · Cómo cae en el examen · Repaso | Cada clase mapea a un objetivo del temario oficial |
| Habilidad | Modelo · Practícalo · Errores típicos | Cada clase deja una frase o gesto usable hoy |
| Conocimiento | Contenido · Cómo encaja · Repaso | Cada clase responde una pregunta que el alumno se hacía |

### La herramienta externa manda sobre la fórmula de longitud

Sin herramienta, el peso de una clase son sus palabras. Con herramienta, hay
bloques de código o de comandos, que se leen mucho más despacio.

### La evaluación manda sobre los tipos de clase

Con cuestionario por módulo, existe un tipo de clase sin archivo Markdown, cuyo
contenido vive en `preguntas/`. Sin evaluación, ese tipo no existe y el contrato
no debe inventarlo.

---

## 3. Requisitos técnicos de la plataforma

**Verifícalos leyendo el código, no confiando en esta lista.** La app cambia.
Los archivos que mandan son estos:

- `src/app/[locale]/courses/[courseSlug]/[lessonSlug]/page.tsx` — cómo se lee y
  se renderiza una clase.
- `content/courses/types.ts` — `CourseManifest`, `LessonMeta`, `ExamQuizQuestion`.
- `content/courses/registry.ts` — dónde se da de alta el curso.
- `src/lib/courses.ts` y `src/lib/course-categories.ts` — la ficha del catálogo.
- `src/i18n/routing.ts` — idiomas y locale por defecto.

A día de hoy eso impone, y el contrato debe recogerlo:

- Las clases viven en `content/courses/<slug>/lecciones/<id>.<locale>.md`, y el
  `<id>` es exactamente el `id` de la lección en el manifest.
- **Sin frontmatter.** El Markdown se renderiza crudo; un bloque `---` al
  principio saldría impreso. El archivo empieza por `# Título`.
- **Sin HTML y sin imágenes.** Los diagramas van en tablas, listas o bloques
  ` ```text ` con arte ASCII.
- Los bloques de código sí funcionan y están estilados.
- Una clase de tipo cuestionario no tiene `.md`: su banco vive en `preguntas/`.
- Una clase sin su archivo, o un cuestionario sin banco, muestra un aviso de "no
  está lista" en lugar de romper. Se puede publicar el curso a medias.
- Las clases no deben nombrar archivos internos del repositorio. El alumno ve
  una página web, no este proyecto.

---

## 4. Principios de aprendizaje que debe aplicar el contrato

Estos son el porqué de las secciones. Elige los que sirvan al tipo de curso y
haz que **cada uno tenga una sección que lo materialice**. Un principio sin
sección es una declaración de intenciones.

| Principio | Cómo se materializa |
|---|---|
| Objetivo concreto | Primera sección: qué sabrá hacer al terminar, en una frase |
| Activación de conocimiento previo | Preguntas abiertas al principio, sin respuesta en el texto |
| Práctica de recuperación | Preguntas de repaso con respuestas, al final |
| Repaso espaciado | Una pregunta inicial que recupera algo de 3 a 8 clases atrás |
| Una idea por clase | Regla dura: si al resumirla salen dos, son dos clases |
| Feedback inmediato | Sección que describe qué se ve si salió bien |
| Errores anticipados | Lista de fallos típicos: síntoma → causa → arreglo |
| Elaboración | Un reto de extensión corto al final |
| Carga cognitiva | Tope de términos nuevos por clase, según la tabla de edad |

Dos que valen para cualquier curso y se olvidan:

- **El orden es una promesa.** Una clase solo puede usar lo que ya se enseñó.
  Si hace falta algo que no está, se mueve a una clase propia. Las referencias
  hacia delante solo valen como aviso ("esto lo verás en la clase X"), nunca
  como dependencia.
- **Las tres primeras clases no pueden tener repaso espaciado**, porque no hay
  clase tres puestos atrás. Escribe esa excepción en el contrato en lugar de
  fingir que se cumple.

---

## 5. La fórmula de longitud

Declarar "10 min de lectura" sin poder comprobarlo es una promesa vacía. El
contrato debe definir una unidad medible:

```text
peso = palabras_de_prosa + (líneas_de_código × 10)
```

El factor 10 sale de que una línea de código se lee con el cuidado de unas diez
palabras. Ajústalo si el curso tiene otro tipo de contenido lento (tablas de
vocabulario, partituras, fórmulas) y dilo en el contrato.

El peso declarado tiene que caer entre `minutos × V_min` y `minutos × V_max`,
con `V` de la tabla de la sección 2.

Manda medir, no estimar. Escribe primero **una clase piloto** y ajusta la banda
a lo que salga, antes de escribir las otras setenta.

---

## 6. Qué entregar

Cuatro archivos en `content/courses/<slug>/`:

1. **`CONTRATO-DE-CLASES.md`** — el documento. Es el 90 % del trabajo.
2. **`README.md`** — el índice legible: cada módulo con el id, el título y el
   tipo de todas sus clases, más el hito con el que cierra. De aquí se genera
   después el manifest, así que los ids tienen que ser definitivos.
3. **`verificador-lecciones.mjs`** — adapta `verificador-plantilla.mjs`, que
   está junto a este archivo. Los valores a cambiar están marcados arriba.
4. **`lecciones/<clase-piloto>.es.md`** — una clase completa del tipo más
   frecuente, para calibrar.

El contrato debe llevar, como mínimo:

1. Qué construye o consigue el alumno, con la promesa central del tipo de curso
2. A quién le hablamos y qué se da por sabido
3. Mapa del curso: módulos, número de clases y hito de cada uno
4. Entorno o materiales fijos, con versiones, si los hay
5. Los tipos de clase, con cuántas hay de cada uno
6. Las secciones obligatorias de cada tipo, en orden, con presupuesto de palabras
7. Longitud y tiempo de lectura, con la fórmula y la banda
8. Formato del archivo: nombre, título, cabecera, emojis, exclamaciones
9. Reglas del contenido especializado (código, vocabulario, ejercicios)
10. Cómo se redacta: persona, frases, términos nuevos, palabras prohibidas
11. Repaso espaciado, con su excepción para las primeras clases
12. Los cuestionarios, si los hay
13. El verificador
14. La checklist manual de lo que ningún script puede medir

Numera las secciones y **cuida las referencias cruzadas**: si insertas una
sección después, hay que renumerar las citas del propio contrato y las del
encabezado del verificador. Compruébalo con
`grep -nE "secci\S* [0-9]+" CONTRATO-DE-CLASES.md verificar-lecciones.mjs`.

### Qué viene después, y no entra aquí

Cuando el contrato esté aprobado, conectar el curso a la app son cuatro cosas:
`manifest.ts` con las clases del índice, `preguntas/index.ts`, el alta en
`content/courses/registry.ts` y la entrada en `COURSES` de `src/lib/courses.ts`.
Déjalo anotado como pendiente al final del índice.

Un aviso que ahorra trabajo: el título del manifest y el del catálogo se leen
desde sitios distintos, y la app muestra uno en la tarjeta y otro en la cabecera
del curso. Que sean el mismo texto.

---

## 7. Trampas conocidas

Todas estas costaron iteraciones al construir el primer contrato. Anticípalas.

**Al escribir las clases:**

- **El párrafo de respuestas del repaso.** Si al ajustar el margen una línea
  empieza por `2.`, el verificador la cuenta como una pregunta más. Reescribe el
  salto de línea, no el contador.
- **Las clases sin código se quedan cortas.** Un tipo de clase de solo prosa
  suele aterrizar un 10 % por debajo del mínimo. O añades contenido que valga la
  pena, o la banda estaba mal calibrada. Lo que no vale es rellenar.
- **Las palabras prohibidas se cuelan al reescribir.** Revisa después de cada
  tanda de arreglos, no solo al final.
- **Las rutas y carpetas se desvían de la arquitectura declarada.** Si el
  contrato dice que hay cuatro carpetas, ninguna clase puede inventar una quinta.
  Compruébalo con un grep antes de dar el módulo por bueno.

**Al escribir el verificador:**

- **Busca las secciones en la prosa, no en el texto crudo.** Una clase puede
  enseñar un archivo Markdown dentro de un bloque, y sus `##` no son secciones.
- **Las líneas que empiezan por un número y un punto se filtran como listas.**
  Es correcto para las listas, y provoca falsos positivos en prosa que empieza
  por una cifra.
- **Las líneas sangradas son continuación de lista**, no párrafos. Sin esa
  exclusión, el contador de frases une el final de una lista con el párrafo
  siguiente.
- **Comprueba que el verificador también falla.** Escribe un archivo roto a
  propósito, pásalo, confirma que salta cada control y bórralo. Un verificador
  que solo se ha probado en verde no vale nada.

---

## 8. Calibrar con la clase piloto

Este paso no es opcional y es el que más tiempo ahorra.

1. Escribe una clase completa del tipo más frecuente, con contenido real.
2. Pásale el verificador.
3. Si el peso queda fuera de banda por poco y de forma sistemática, **la banda
   está mal**, no la clase. Ajústala en el contrato.
4. Anota en el contrato los números medidos, como referencia para quien escriba
   las demás.

Medición del curso de referencia, para que sirva de orden de magnitud con
adultos y lecturas de 8 minutos: una clase de solo prosa ronda las 1.200
palabras; una con 20 a 35 líneas de código, unas 1.000 más el código.

---

## 9. Sé honesto con lo que no has verificado

Al entregar, di explícitamente qué no se ha comprobado. Lo habitual:

- El código de las clases no se ha compilado en la herramienta real.
- Las rutas de menú vienen de documentación, no de haberlas pulsado.
- El aspecto visual del curso renderizado no lo ha mirado nadie.

Marca esas clases como pendientes en el índice, con un símbolo distinto del de
"terminada". Una clase que pasa el verificador **no** es una clase verificada:
el script mide forma, no verdad.
