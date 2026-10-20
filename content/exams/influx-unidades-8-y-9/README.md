# Influx: Favors and Requests · Complaints and Apologies

Repaso de las **Units 8 y 9** del libro de inglés Influx (Lessons 15 a 18, páginas
60 a 74), escrito para preparar el examen del curso. Las frases, los ejemplos y el
vocabulario son los del libro, tal como están impresos, porque el examen real se
basa en ese contenido. Pertenece al grupo **Influx exámenes** (`influx-examenes`).

## Parámetros con los que se escribió

| Parámetro | Valor |
|---|---|
| Dificultad | Mixta escalonada (ver el reparto abajo) |
| Preguntas | 60, 15 por tema |
| Temas | 4 |
| Formato | 4 opciones / 1 correcta, sin respuesta múltiple |
| Idioma | Enunciados y explicaciones en español; material en inglés, como en el libro |
| Duración sugerida | 90 min (~1,5 min por pregunta) |
| Para aprobar | 70 % |
| Versión del banco | 1 |

**Sobre el idioma.** Las preguntas viven en `questions.es`, que es el nombre del
casillero obligatorio y no una promesa sobre el idioma del contenido: las frases
evaluadas están en inglés y así tienen que quedar. Cuando el libro trae una
traducción al portugués, el enunciado la cita ("En portugués: …") para
desambiguar, igual que hacen los Consolidation Exercises.

**Independiente del libro.** El contenido sale del libro, pero ni los
enunciados ni las explicaciones ni los tips ni los nombres de los temas lo
mencionan (nada de "Lesson 16", "Activity 1", "Helping You", "según el libro"…).
Así lo pidió el usuario: cada pregunta tiene que entenderse sin el libro al
lado. Las referencias quedan solo en los comentarios del código. Quedó pendiente, a
pedido del usuario, una versión en portugués; si se hace, tiene que ser
estrictamente paralela (mismas preguntas, mismo orden, mismos ids de opción,
mismas correctas) y hay que subir `VERSION_DEL_BANCO`.

## Temas

| id | Tema | Preguntas | Archivo |
|---|---|---|---|
| `lesson-15` | Lesson 15 · Favors and Requests: vocabulario y estructuras | 15 | `preguntas/tema-1-lesson-15.ts` |
| `lesson-16` | Lesson 16 · Aceptar y rechazar pedidos | 15 | `preguntas/tema-2-lesson-16.ts` |
| `lesson-17` | Lesson 17 · Complaints and Apologies: vocabulario y verbos | 15 | `preguntas/tema-3-lesson-17.ts` |
| `lesson-18` | Lessons 17–18 · Key phrases, excusas y disculpas | 15 | `preguntas/tema-4-lesson-18.ts` |

Las Key Phrases & Expressions de la Lesson 17 se evalúan en el tema 4 y no en el 3:
la Lesson 17 trae demasiado material para un solo tema, y es la Lesson 18 la que
practica esas frases en su Consolidation Exercise.

### Qué cubre cada tema

- **Lesson 15:** do / ask a favor; can / could más usuales que will / would;
  make / agree to / accept / refuse a request; make / keep / break a promise;
  garbage man = garbage collector; pieces of baggage; suitcase / briefcase /
  backpack; groceries vs. grocery store; keep / kept + keep on -ing;
  promise… will / promised… would; promise not to; I was wondering if; would
  you mind + -ing; I can't promise anything; pack your baggage.
- **Lesson 16:** respuestas de la Activity 1 y del Consolidation Exercise 1;
  aceptar y rechazar (Activity 2); "No, not at all" para aceptar un would you
  mind; it would be a pleasure; I really appreciate it vs. I'd appreciate it if;
  in a row; for the time being; throw away; turn down; put out / chop up / warm
  up; keep = quedarse con; would you mind if I closed; You must be kidding! No
  way!; Could you please + forma base.
- **Lesson 17:** complaint / apology / excuse / fault; fault = defeito;
  forgive / forgave / forgiven; apologize to… for; make a complaint; owe an
  apology; behave like / in a … way; blame for; bother with / about; it doesn't
  bother me; realize; el do enfático de I do apologize; stop + -ing; whose
  fault; reject an apology.
- **Lessons 17–18:** on purpose; there's no excuse for; make it up to;
  make up an excuse; no big deal; lame excuse; sorry to bother you; it wasn't
  my fault; mess / messy; drive somebody nuts; be finished with; respuestas de
  la Activity 1 de la Lesson 18; ran out of gas y las otras excusas;
  unforgivable.

### Reparto de dificultad

Contado a mano, por tipo de enunciado:

| Escalón | Qué pide | Preguntas |
|---|---|---|
| Introductorio | Reconocer un significado o una palabra del vocabulario | ~18 |
| Intermedio | Completar una frase del libro eligiendo forma o preposición | ~26 |
| Avanzado | Elegir entre respuestas del libro que son todas correctas en otro diálogo, o entre dos formas casi iguales (stop to / stop -ing, who's / whose, Yes / No ante would you mind) | ~16 |

## Medición del verificador

```
node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/influx-unidades-8-y-9/verificar-preguntas.mjs
node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/verificar-grupos.mjs
```

Última corrida: 60 preguntas, todas de opción única, reparto de la correcta
**A:15 B:15 C:15 D:15**, y la correcta es la opción más larga en 24 de 60 (el
tope es 60 %). Los dos verificadores salen sin problemas.

Se comprobó además que el verificador **falla**: con cuatro roturas deliberadas
en el tema 1 (id de pregunta duplicado, id de opción `opt-2`, una opción "none of
the above" y una pregunta sin correcta) reportó 4 problemas y salió con código 1.
Después se restauró el archivo y volvió a pasar.

`tsc --noEmit` no reporta errores en los archivos del examen ni en el registro o
los grupos.

## Lo que NO está verificado

El verificador mide forma, no verdad. En concreto:

- **Que cada respuesta marcada como correcta sea de verdad la correcta no lo
  comprueba ningún script.** La revisó solo quien escribió el banco, contra las
  fotos del libro.
- Las frases del libro se transcribieron a mano desde fotos. Un error de
  transcripción (una palabra o una preposición) no lo detectaría nadie más que
  quien compare con el libro.
- Las explicaciones de las incorrectas definen cada opción y nombran la
  confusión que la hace tentadora. Las definiciones no las revisó otra persona, y
  la confusión es una hipótesis didáctica, no algo medido con alumnos.
- Algunos distractores usan palabras que no están en el libro (by accident,
  turn up, turn out, all the time…), siempre definidas en su explicación. Si el
  examen real solo admite vocabulario del libro, esas opciones son más fáciles de
  descartar de lo que serían en el examen.
- El reparto de dificultad es un juicio, no el resultado de haberlo probado con
  nadie.
- Las respuestas de los ejercicios de emparejar (Activity 1 de las Lessons 16 y
  18, Consolidation Exercise 1 de la Lesson 16) se dedujeron del sentido: el libro
  deja los paréntesis en blanco y la clave está en el audio, que no se escuchó.
