# Inglés: present perfect y condicionales

Examen **semilla** de la sección `/exams`. Existe para que la sección tenga contra
qué desarrollarse y probarse; los exámenes largos los escribe el skill
`generar-examen`.

## Parámetros con los que se escribió

| Parámetro | Valor |
|---|---|
| Dificultad | Intermedia (B1 → B2) |
| Preguntas | 8 |
| Temas | 2 |
| Formato | 7 de opción única (4 opciones / 1 correcta) y 1 de respuesta múltiple (5 / 2) |
| Idioma | Enunciados en español, material en inglés |
| Duración sugerida | 12 min (~1,5 min por pregunta) |
| Para aprobar | 70 % |
| Versión del banco | 1 |

## Temas

| id | Tema | Preguntas | Archivo |
|---|---|---|---|
| `present-perfect` | Present perfect vs. past simple | 4 | `preguntas/tema-1-present-perfect.ts` |
| `condicionales` | Condicionales | 4 | `preguntas/tema-2-condicionales.ts` |

### Preguntas

| id | Tema | Formato | Qué discrimina |
|---|---|---|---|
| `ing-t1-q01` | present-perfect | única | Efecto presente vigente ⇒ present perfect |
| `ing-t1-q02` | present-perfect | única | Marca de tiempo cerrada ⇒ past simple |
| `ing-t1-q03` | present-perfect | única | `how long` + actividad en curso ⇒ perfect continuous |
| `ing-t1-q04` | present-perfect | única | Recuento de veces ⇒ perfect simple, no continuo |
| `ing-t2-q01` | condicionales | única | Nada de `will` después de `if` |
| `ing-t2-q02` | condicionales | única | `If I were you` como fórmula fija |
| `ing-t2-q03` | condicionales | única | Pasado irreal ⇒ tercer condicional |
| `ing-t2-q04` | condicionales | múltiple | Las dos mitades tienen que ser del mismo condicional |

## Medición del verificador

```
node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/ingles-tiempos-y-condicionales/verificar-preguntas.mjs
```

Última corrida: 8 preguntas, 7 de opción única, reparto de la correcta
**A:2 B:1 C:3 D:1**, y la correcta es la opción más larga en 3 de 7 (el tope es
60 %).

Se comprobó además que el verificador **falla**: con seis roturas deliberadas
(id de pregunta duplicado, id de opción que no es letra, "ninguna de las
anteriores", cero opciones correctas, un `topic` no declarado y un conteo
desincronizado en `configuracion.ts`) reportó 7 problemas y salió con código
distinto de cero.

## Lo que NO está verificado

El verificador mide forma, no verdad. En concreto:

- **Que cada respuesta marcada como correcta sea de verdad la correcta no lo
  comprueba ningún script.** Lo revisó una persona leyendo, nada más.
- Las explicaciones de las opciones incorrectas afirman cuál es la confusión que
  hace tentadora a cada una. Eso es una hipótesis didáctica, no un hecho medido.
- La calibración de la dificultad ("intermedia") es un juicio, no el resultado de
  haberlo probado con nadie.
- La traducción al inglés de `title` y `description` no la revisó un hablante
  nativo. Las preguntas no están traducidas: el banco solo existe en el casillero
  `es`, que es lo correcto porque los enunciados ya están pensados para un
  hispanohablante.
