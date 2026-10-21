# Matemática: sequências, padrões e ordinais

Primera prueba del grupo **Exámenes Lucía** (`examenes-lucia` en
`content/exams/groups.ts`). Sale de las 21 fotos del libro de Matemática de 2º
ano que quedaron en
`examenes-lucia/Examen matemáticas lucia-20261021T122459Z-1-001.zip`, pp. 48–68,
y usa **los mismos ejemplos del libro**, porque la prueba real se basa en ellos.

## Parámetros con los que se escribió

| Parámetro | Valor |
|---|---|
| Alumna | Lucía, 7 años, 2º ano |
| Dificultad | Introductoria: reconocer y aplicar directamente lo del libro |
| Preguntas | 37 |
| Temas | 4, de 8 a 10 preguntas cada uno (siguen las secciones del libro) |
| Formato | **3 opciones / 1 correcta** (menos texto que leer a los 7 años; sigue siendo un distractor más que correctas). Sin respuesta múltiple |
| Idioma | **Portugués**, enunciados, explicaciones y tips, con frases cortas |
| Duración sugerida | 55 min (~1,5 min por pregunta) |
| Para aprobar | 70 % |
| Versión del banco | 3 (la 2 agregó las imágenes; la 3 corrigió el número de pastillas del bolo y un distractor) |
| Aspecto | Tema visual `unicornio` (lo pone el grupo, ver abajo) |

**Sobre el idioma.** Está en portugués porque el libro y la prueba real son en
portugués. Vive en `questions.es` porque ese es el nombre del casillero
obligatorio, no porque esté en español. No lo "arregles".

**Sobre las explicaciones.** La correcta dice por qué lo es, con la cuenta
hecha ("1 + 2 = 3, 3 + 2 = 5"). Cada incorrecta dice primero **qué es** esa
opción ("De 1 em 1 é contar sem pular nenhum: 1, 2, 3, 4") y después por qué no
responde a esta pregunta. Los tips generalizan para la próxima ("Para achar o
padrão, faça a conta do segundo número menos o primeiro").

## Temas y cobertura

| # | id | Tema | Preguntas | Páginas |
|---|---|---|---|---|
| 1 | `sequencias-numericas` | Sequências numéricas e o número que falta | 10 | 48–55, 66–68 |
| 2 | `pares-impares-crescente-decrescente` | Pares e ímpares, crescente e decrescente | 9 | 49, 53–54 |
| 3 | `padroes-de-cores-e-formas` | Padrões de cores e de formas | 8 | 56–61, 67 |
| 4 | `numerais-ordinais` | Numerais ordinais | 10 | 62–65 |

Ejemplos del libro que tienen pregunta propia: la barraca de argolas (1, 3, 5,
7), los pinos verdes de Quique (3, 6, 9), el ejercicio resuelto 2, 5, 8, 11 → 14,
el tablero de Yuri hasta el 52, los dos roteiros de la calculadora (10 + 10 = y
50 − 5 =), 50, 45, 40, 35, _, _, 20, las camisetas (4 en 4), los apartamentos
del edificio de Quique, los botones 1, 2, 4, 8 → 16, los ejemplos de pares (84,
136, 20) e ímpares (17, 89, 143), las sequências crescente (11…19) y
decrescente (30…22), las fichas de Felipe (125…137), "começa no 40 e diminui de
2 em 2", la casa de unir puntos (97…104), las dos sequências de figuras con un
hueco, las pastillas del bolo de Mafê, los emojis, las 4 flechas, la colmena del
artesanato de bambú, el "Debate na colmeia", el trigésimo segundo lugar de
Tainá, 13º, 22º, 2ª, 35ª, 48ª, el ascensor de Joana (17º y 19º) y la carrera de
Mafê (22 coches delante → 23º).

Lo que aparece solo dentro de explicaciones o tips: el 18º/18ª, el 11º–12º
(undécimo, duodécimo), la regla de 110 que baja de 1 en 1, los trabajos
indígenas con palha, cerâmica e penas, el hexágono y los triángulos del bambú.

Lo que **no** aparece:

- Las actividades abiertas o que dependen de la clase: la lista de alumnos del
  ejercicio 2 de la p. 52, "crie uma sequência" con un compañero, "qual modelo
  você mais gostou", los dibujos libres, el tablero de triángulos de 4 colores
  para reproducir y el "Por que é importante usar o elevador com um adulto".
- "Começa no 30 / no 100 / no 110" del ejercicio 3: se cubre el razonamiento con
  el del 40 y el de la calculadora; serían la misma pregunta con otros números.
- La fila de personas del autobús (p. 64): depende de la foto (quién lleva
  vestido amarillo), y el examen no admite imágenes.
- Los códigos QR y los créditos de las fotos.

## Imágenes del libro

18 de las 37 preguntas muestran la ilustración del libro en la que se apoyan
(campo opcional `image` de `ExamQuestionWithTopic`, que dibuja
`ExamQuestionCard`): la barraca de argolas, los cuadros 2, 5, 8, 11, el tablero
de Yuri, las teclas de los dos roteiros de la calculadora, las camisetas, los
botones, las fichas de Felipe, las dos secuencias de figuras, el bolo, los
emojis, las flechas, el bambú y el ascensor.

- Son recortes de las fotos, en `public/exams/matematica-sequencias-padroes-ordinais/`.
  Los genera el script `recortar.py` (fuera del repo) a partir del zip de
  `examenes-lucia/`.
- **Nunca muestran la respuesta.** Donde Lucía la había dibujado (las dos
  secuencias de figuras), se tapó con un recuadro y un "?"; donde había escrito
  (calculadora, camisetas, botones, emojis, flechas, fichas, bambú) se recortó
  alrededor.
- **Están en `.gitignore`**: son ilustraciones del libro y el repositorio es
  público. En un clon nuevo faltan, el verificador lo avisa sin fallar y la app
  muestra las preguntas sin ellas.
- Los enunciados siguen describiendo lo esencial con palabras, así que la
  pregunta se entiende también sin la imagen.

## El tema visual `unicornio`

Lo declara el grupo (`theme: "unicornio"` en `groups.ts`), no este banco: toda
prueba nueva que entre a "Exámenes Lucía" se ve igual sin hacer nada. Lo aplica
`src/components/exams/theme/ExamThemeScope.tsx` en las páginas del grupo, de la
ficha, del modo estudio, del modo examen y del repaso:

- Colores rosa y lila: `globals.css` redefine, solo dentro de
  `[data-exam-theme="unicornio"]`, las variables de Tailwind (`--color-zinc-*`,
  `--color-indigo-*`, `--color-violet-*`). Verde = acierto y rojo = error se
  mantienen. Los demás exámenes no cambian.
- Letra Fredoka (redonda), más grande (`--text-*`) y esquinas más redondas.
- Unicornios, arcoíris y estrellas flotando de fondo.
- **Modo estudio:** al acertar suben unicornios, estrellas y corazones y aparece
  un cartel ("Muito bem, Lucía! 🦄", "Arrasou! 🌈"…); al equivocarse, solo un
  cartel tranquilo ("Quase! Leia a explicação 💜"); al terminar, una lluvia más
  grande. **Modo examen:** la lluvia sale en la pantalla de resultados si aprueba.
- Con "reducir movimiento" activado en el sistema, sin chispas ni adornos que se
  muevan.

Conviene que Lucía use el **modo estudio**: es el que muestra las explicaciones
y los festejos pregunta por pregunta.

## Medición del verificador

```
node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/matematica-sequencias-padroes-ordinais/verificar-preguntas.mjs
```

```
  tema 1 "sequencias-numericas": 10 preguntas
  tema 2 "pares-impares-crescente-decrescente": 9 preguntas
  tema 3 "padroes-de-cores-e-formas": 8 preguntas
  tema 4 "numerais-ordinais": 10 preguntas
  total 37 | opción única 37 | correctas A:13 B:12 C:12
  la correcta es la más larga en 7/37 de opción única
  con imagen 18/37
OK — sin problemas
```

Diferencias con la plantilla del verificador: el formato es 3 opciones / 1
correcta, el reparto de letras se mide sobre A–C, y la fuga por longitud cuenta
solo cuando la correcta es **estrictamente** la más larga (muchas opciones son
números del mismo largo, y un empate no da pista). Además revisa las imágenes:
texto alternativo, ancho y alto, forma del `src`, y avisa (sin fallar) si falta
el archivo. Se comprobó que el
verificador falla: con un id repetido, una explicación vacía y preguntas sin
correcta, saltan los controles correspondientes.

## Qué no se verificó

- **Que cada respuesta marcada como correcta sea de verdad la correcta no lo
  comprueba ningún script.** Las cuentas se hicieron y se releyeron a mano.
- Dos datos salen de leer las fotos y no del texto del libro: el orden de las
  pastillas del bolo (vermelho, verde, marrom, azul) y la dirección de cada
  flecha (verde ➡️, amarela ⬅️, azul ⬆️, cinza ⬇️), que coincide con lo que Lucía
  escribió en el libro. Conviene confirmarlos con el libro en la mano.
- Que el portugués sea natural para una nena de 7 años no lo revisó un nativo.
- La calibración de la dificultad es un juicio, no el resultado de haberlo
  probado con Lucía.
- El tema visual se comprobó compilando el CSS y con `tsc` y `eslint`, pero
  **no se miró en el navegador** con una sesión iniciada (las páginas de
  `/exams` piden login).
