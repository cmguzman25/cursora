# Exercícios: retas, triângulos e polígonos

Lista de ejercicios prácticos del grupo **Exámenes Saymons**
(`exerciseSetSlugs` en `content/exams/groups.ts`). Se abre en
`/exams/exercises/exercicios-retas-triangulos-poligonos`.

Son **todas** las Atividades (niveles 1, 2 y 3) y la Folha AZ de los capítulos
10, 11 y 12 del libro de Matemática, con los enunciados y las figuras del libro.
Las figuras son recortes de las fotos de
`examenes-saymons/WhatsApp Unknown 2026-10-21 at 19.00.32.zip` y están en
`public/exercises/exercicios-retas-triangulos-poligonos/`. Los apartados con
figura propia (4a, 4b...) son tarjetas separadas; los que no tienen figura van
juntos en una tarjeta.

No se califica nada: el alumno resuelve en el cuaderno, pulsa "Resolver" y
compara con la resolución paso a paso. Cada paso explica qué se hace y por qué, y
las cuentas van en renglones aparte (`work`).

| Capítulo | Ejercicios | Con figura |
|---|---|---|
| 10 · Retas paralelas cortadas por uma transversal | 38 | 32 |
| 11 · Triângulos | 29 | 16 |
| 12 · Polígonos regulares | 27 | 10 |

## Verificador

```
node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exercises/verificar-ejercicios.mjs
```

Comprueba ids, secciones, que nada esté vacío, que no haya Markdown, que cada
ejercicio tenga pasos, que las figuras existan y que la lista esté registrada y
en un grupo.

## Qué no se verificó

- **Que cada resolución esté bien no lo comprueba ningún script.** Se resolvieron
  a mano y se repasaron una vez; nadie más las revisó.
- Las figuras del libro son esquemáticas. Donde la posición de un ángulo era
  ambigua se decidió por la geometría del dibujo; los casos más dudosos son
  `c10-n2-4a` (x = 98°) y `c10-n1-3` (ángulos de 158° aunque el dibujo los
  muestra agudos; el ejercicio lo avisa en su nota).
- `c10-n2-11` (zigue-zague): con los datos del libro sale x = 30/11 ≈ 2,7°, un
  valor raro que no coincide con el dibujo. Probablemente hay un error en el
  libro; el ejercicio lo avisa en su nota.
- `c11-n2-10` (ladrilhos) y `c11-n2-13` (Clara) son problemas de olimpíada
  resueltos a partir de la figura, sin gabarito para contrastar.
- Las construcciones con regla y compás se resuelven describiendo los pasos; el
  dibujo no se puede comprobar.
- Las soluciones están en portugués escrito por un modelo, no por un nativo.
