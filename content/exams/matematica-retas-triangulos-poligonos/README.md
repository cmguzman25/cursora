# Matemática: retas paralelas, triângulos e polígonos

Tercera prueba del grupo **Exámenes Saymons** (`examenes-saymons` en
`content/exams/groups.ts`). Sale de las 87 fotos del libro de Matemática que
quedaron en `examenes-saymons/WhatsApp Unknown 2026-10-21 at 19.00.32.zip`:

- Capítulo 10, "Retas paralelas cortadas por uma transversal: ângulos", pp. 40–74.
- Capítulo 11, "Triângulos", pp. 76–102.
- Capítulo 12, "Polígonos regulares", pp. 104–128.

El examen cubre la teoría, los ejemplos resueltos, los recuadros AZpédia, los
"Voando Alto" (teorema de los bicos, teorema de Pitágoras, la geometría de las
colmenas) y los tipos de ejercicio de las "Atividades" y la "Folha AZ" de los
tres capítulos. Los números de los ejercicios se cambiaron respecto del libro,
para que el alumno resuelva y no reconozca.

## Parámetros con los que se escribió

| Parámetro | Valor |
|---|---|
| Dificultad | Mixta: 23 de recordar (definiciones, clasificar un par de ángulos, nombres) y 42 de aplicar (ecuaciones con ángulos, existencia, fórmulas de polígonos) |
| Preguntas | 65 |
| Temas | 6, de 7 a 15 preguntas (siguen las secciones del libro; los cálculos pesan más porque es lo que más trae la prueba) |
| Formato | Opción única, 4 opciones / 1 correcta. Sin respuesta múltiple |
| Idioma | **Portugués**, enunciados y explicaciones |
| Figuras | 2, dibujadas para este examen (no son recortes del libro), en 8 preguntas |
| Duración sugerida | 98 min (~1,5 min por pregunta) |
| Para aprobar | 80 % |
| Versión del banco | 1 |

Los parámetros no se preguntaron: se tomaron de las otras dos pruebas del grupo
(portugués, 4/1, 80 %), y la cantidad salió de pedir que cubra todo el
contenido.

**Sobre el idioma.** Todo está en portugués porque el libro y la prueba real del
alumno son en portugués. Vive en `questions.es` porque ese es el nombre del
casillero obligatorio, no porque esté en español. No lo "arregles".

## Figuras

Están en `public/exams/matematica-retas-triangulos-poligonos/` y se dibujaron
con un script de Python (PIL), no se recortaron del libro:

- `retas-paralelas-transversal.png`: r // s cortadas por t, con los ocho ángulos
  a–h en las mismas posiciones que usa el libro (a, b, c, d en r; e, f, g, h en
  s; a arriba a la derecha de t y en sentido antihorario). La usan
  `mat-t2-q03` y `mat-t3-q01`, `q02`, `q03`, `q04`, `q12`, `q13`.
- `angulo-entre-paralelas.png`: un "bico" con vértice P entre r y s, ángulos de
  35° y 45°. La usa `mat-t3-q10`.

Cada enunciado con figura describe en el `alt` lo que hay en la imagen.

## Temas y cobertura

| # | id | Tema | Páginas |
|---|---|---|---|
| 1 | `retas-no-plano` | Retas paralelas, concorrentes e transversais | 40–43 |
| 2 | `angulos-opostos-pelo-vertice` | Ângulos adjacentes, suplementares e OPV | 44–46 |
| 3 | `angulos-com-transversal` | Ângulos correspondentes, alternos e colaterais | 46–74 |
| 4 | `triangulos-elementos-e-classificacao` | Triângulos: elementos, classificação e construção | 76–82, 90–92 |
| 5 | `triangulos-angulos-e-existencia` | Triângulos: soma dos ângulos e condição de existência | 82–90 |
| 6 | `poligonos-regulares` | Polígonos regulares: diagonais e ângulos | 104–128 |

Lo que aparece solo dentro de explicaciones o tips, sin pregunta propia: las
fotos de ejemplos cotidianos (bandera, flauta transversal, cerca, cancha de
básquet), el triángulo pitagórico 3-4-5, las faces de la pirámide de Gizé y la
Galería Nacional de Arte, el mosaico y las teselas, los ángulos de 108° del
pentágono regular, el origami.

Lo que **no** aparece: los códigos de habilidades BNCC, las preguntas de
apertura de cada capítulo, las actividades "Reflita, Argumente e Compartilhe"
(circuitos en serie y en paralelo, GPS, origami: son de discusión, no
evaluables con una opción), los ejercicios de construcción con regla y
transportador que piden dibujar (se evalúa el procedimiento, no el dibujo), los
problemas que dependen de una figura compleja del libro (bandera del club,
pentágonos encajados, estrella de triángulos equiláteros, mosaico de ladrillos)
y el triángulo de Bermudas.

### Preguntas

R = recordar, A = aplicar.

| id | Tipo | Qué evalúa |
|---|---|---|
| `mat-t1-q01` | R | Paralelas: distancia constante |
| `mat-t1-q02` | R | Paralelas coincidentes vs. distintas |
| `mat-t1-q03` | A | Concorrentes perpendiculares (bandera) |
| `mat-t1-q04` | A | Transversal (cerca) |
| `mat-t1-q05` | R | Símbolo // y feixe de paralelas |
| `mat-t1-q06` | R | Coplanares vs. colineares |
| `mat-t1-q07` | A | Transversal (ferrocarril) |
| `mat-t2-q01` | R | Ángulos adyacentes |
| `mat-t2-q02` | R | Definición de OPV |
| `mat-t2-q03` | R | Identificar el OPV en la figura |
| `mat-t2-q04` | A | Ecuación con OPV |
| `mat-t2-q05` | A | OPV + suplementares en dos pasos |
| `mat-t2-q06` | R | Los cuatro ángulos suman 360° |
| `mat-t2-q07` | A | Los cuatro ángulos a partir de uno |
| `mat-t2-q08` | A | Demostración de la congruencia de los OPV |
| `mat-t2-q09` | A | Dos pares OPV, x e y |
| `mat-t3-q01` | R | Correspondiente de a (figura) |
| `mat-t3-q02` | R | Alternos internos (figura) |
| `mat-t3-q03` | R | Colaterales externos (figura) |
| `mat-t3-q04` | A | Alternos internos: misma medida |
| `mat-t3-q05` | A | Colaterales internos: ecuación con 180° |
| `mat-t3-q06` | A | Correspondientes distintos ⇒ concurrentes |
| `mat-t3-q07` | A | Alternos externos: ecuación |
| `mat-t3-q08` | A | Correspondientes y ángulo agudo |
| `mat-t3-q09` | A | Colaterales internos, "el doble" |
| `mat-t3-q10` | A | Paralela auxiliar en un bico (figura) |
| `mat-t3-q11` | A | Teorema de los bicos |
| `mat-t3-q12` | R | Colaterales externos suman 180° (figura) |
| `mat-t3-q13` | R | Región interna (figura) |
| `mat-t4-q01` | R | Puntos colineales |
| `mat-t4-q02` | R | El triángulo no tiene diagonales |
| `mat-t4-q03` | A | Clasificación por ángulos (acutángulo) |
| `mat-t4-q04` | A | Obtusángulo y equilátero (Folha AZ) |
| `mat-t4-q05` | A | No existe equilátero obtusángulo |
| `mat-t4-q06` | R | Isósceles: ángulos de la base iguales |
| `mat-t4-q07` | A | Isósceles: igualar lados |
| `mat-t4-q08` | R | Construcción con regla y compás |
| `mat-t4-q09` | A | Teorema de Pitágoras |
| `mat-t4-q10` | R | Rigidez del triángulo |
| `mat-t5-q01` | A | Ángulo que falta + clasificación |
| `mat-t5-q02` | A | Ángulos proporcionales (x, 3x, 5x) |
| `mat-t5-q03` | A | Triángulo rectángulo, agudo doble del otro |
| `mat-t5-q04` | A | Isósceles: ángulos de la base |
| `mat-t5-q05` | A | Ángulo externo |
| `mat-t5-q06` | A | Existencia: 7, 9, 21 |
| `mat-t5-q07` | A | Existencia: el techo del carpintero |
| `mat-t5-q08` | A | Dos ángulos de 95° y 106° |
| `mat-t5-q09` | A | Perímetro y clasificación por lados |
| `mat-t5-q10` | A | Isósceles con 60° ⇒ equilátero |
| `mat-t5-q11` | A | Intervalo del tercer lado |
| `mat-t6-q01` | R | Definición de polígono |
| `mat-t6-q02` | R | Polígono convexo |
| `mat-t6-q03` | A | Equilátero, equiángulo, regular (rombo) |
| `mat-t6-q04` | R | Nombres: undecágono, icoságono |
| `mat-t6-q05` | A | Diagonales de un vértice y triángulos |
| `mat-t6-q06` | A | Total de diagonales |
| `mat-t6-q07` | A | Suma de ángulos internos |
| `mat-t6-q08` | A | Ángulo interno del regular |
| `mat-t6-q09` | A | Lados a partir del ángulo externo |
| `mat-t6-q10` | A | Lados a partir de la suma |
| `mat-t6-q11` | A | Suma interna = 4 × suma externa |
| `mat-t6-q12` | A | Perímetro a partir de la suma |
| `mat-t6-q13` | R | Hexágonos de las colmenas |
| `mat-t6-q14` | A | Lado a partir del ángulo interno y el perímetro |
| `mat-t6-q15` | R | Construcción del cuadrado |

## Verificador

```
node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/matematica-retas-triangulos-poligonos/verificar-preguntas.mjs
```

Medición al entregar (versión 1):

- 65 preguntas, todas de opción única.
- Correctas por letra: A 17 · B 18 · C 16 · D 14.
- La correcta es la opción más larga en 32/65 (tope: 60 %).
- 8 preguntas con figura, y las dos figuras están en `public/`.
- Sin enunciados repetidos ni parecidos (control de 7-gramas).

Se comprobó que el verificador también falla: con un id duplicado, una
explicación vacía y una figura movida de lugar, saltaron los tres controles; y
con el banco restaurado volvió a dar OK.

## Qué no se verificó

- **Que cada respuesta marcada como correcta sea de verdad la correcta no lo
  comprueba ningún script.** Las cuentas se hicieron a mano y se repasaron una
  vez; nadie más las revisó.
- Las explicaciones de las incorrectas nombran un error concreto (un signo mal
  pasado, sumar en vez de igualar, olvidar el ÷ 2). Que ese sea el error que
  comete un alumno es una hipótesis didáctica, no algo medido.
- La calibración de la dificultad es un juicio; el examen no se probó con nadie.
- El portugués lo escribió un modelo, no un nativo.
- Las figuras se revisaron a ojo. La del bico está dibujada con los ángulos
  reales (35° y 45°); la de los ángulos a–h no lleva medidas.
