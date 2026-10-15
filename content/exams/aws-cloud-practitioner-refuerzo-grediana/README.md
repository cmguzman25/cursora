# AWS Cloud Practitioner: refuerzo para Grediana

48 preguntas nuevas armadas a partir de los errores de Grediana en
`aws-cloud-practitioner-simulacro`. Está en el grupo `aws-cloud-practitioner`, después
del simulacro.

## De dónde sale

Su rendida del simulacro (banco v2, modo estudio, del 7 al 9 de octubre de 2026):
64 de 65 respondidas y **16 falladas** (≈75 %). Las 16 que marcó para repasar son
**exactamente esas mismas 16**. Los datos salen de `exam_question_results` y
`exam_review_flags`.

Cada fallo tiene **tres preguntas nuevas**. Ninguna copia un enunciado del simulacro (el
verificador lo comprueba) y cada trío enfrenta el par que confundió desde otro ángulo.
Cuando conviene, una del trío es "al revés": la correcta es justo la opción que había
elegido mal, para que no aprenda la regla "siempre la otra".

| Fallo del simulacro | Eligió → era | Preguntas nuevas |
|---|---|---|
| sim-d1-q05 | Eficiencia de rendimiento → Optimización de costos | ref-gr-d1-q01–q03 |
| sim-d1-q07 | Fiabilidad → Excelencia operativa | ref-gr-d1-q04–q06 |
| sim-d2-q01 | AWS → el cliente parchea el SO de EC2 | ref-gr-d2-q01–q03 |
| sim-d2-q04 | + cifrado en reposo (es del cliente) | ref-gr-d2-q04–q06 |
| sim-d2-q16 | Inspector → WAF | ref-gr-d2-q07–q09 |
| sim-d2-q18 | GuardDuty → Macie | ref-gr-d2-q10–q12 |
| sim-d2-q19 | + CloudTrail en lugar de Security Hub (Trusted Advisor lo acertó) | ref-gr-d2-q13–q15 |
| sim-d3-q05 | + "elimina el servidor de origen" (CloudFront) | ref-gr-d3-q01–q03 |
| sim-d3-q14 | Internet gateway → Direct Connect | ref-gr-d3-q04–q06 |
| sim-d3-q16 | S3 "montado como disco" → EBS | ref-gr-d3-q07–q09 |
| sim-d3-q18 | DMS + EBS → Snowball + Storage Gateway | ref-gr-d3-q10–q12 |
| sim-d3-q19 | Polly → Transcribe | ref-gr-d3-q13–q15 |
| sim-d3-q20 | Redshift → Athena | ref-gr-d3-q16–q18 |
| sim-d3-q22 | + AppStream 2.0 en lugar de CodePipeline (WorkSpaces lo acertó) | ref-gr-d3-q19–q21: una de escritorios, dos de CI/CD |
| sim-d4-q01 | RI estándar → Savings Plans | ref-gr-d4-q01–q03 |
| sim-d4-q08 | CloudWatch → AWS Health Dashboard | ref-gr-d4-q04–q06 |

El "+" marca las de elegir dos, donde acertó una y erró la otra.

## Parámetros

| | |
|---|---|
| Temas | Los 4 dominios del CLF-C02, con los mismos ids que el simulacro |
| Reparto | 6 / 15 / 21 / 6: tres por fallo, así que el desbalance es su perfil de errores. Por eso el intercalado agota los dominios 1 y 4 en la sexta vuelta y las últimas 15 preguntas son de los dominios 2 y 3 |
| Dificultad | Avanzado: discriminar entre opciones cercanas |
| Formato | 4 opciones / 1 correcta, y 5 opciones / 2 correctas |
| Respuesta múltiple | 14 de 48 (~29 %), más que el ~15 % del examen real, porque 5 de sus 16 fallos fueron de elegir dos |
| Idioma | Español (casillero `es`) |
| Aprobación | 70 % |
| Duración sugerida | 70 minutos |
| Versión | 2 |

## Verificador

```
node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/aws-cloud-practitioner-refuerzo-grediana/verificar-preguntas.mjs
```

Es el verificador del simulacro adaptado, con un control extra: compara los 7-gramas de
cada enunciado contra los 65 del simulacro, y falla si comparten dos tramos o más.

Medición al entregar: 48 preguntas, 14 de respuesta múltiple. Letra correcta en las de
opción única: A 9 · B 9 · C 8 · D 8. La correcta es la opción más larga en 12 de 34.

Se comprobó que también falla cuando corresponde: con un id duplicado, y con un
enunciado copiado del simulacro (sim-d4-q08), dio error.

## Revisión (13 de octubre de 2026)

Segunda lectura completa, antes de que nadie lo rindiera (cero rendidas en `exam_runs`),
así que la versión se queda en 1: no hay ningún intento guardado que pueda quedar
desfasado.

- **Diagnóstico corregido en dos fallos de elegir dos.** En sim-d3-q22 Grediana acertó
  WorkSpaces y el error fue no elegir CodePipeline; en sim-d2-q19 acertó Trusted Advisor y
  el error fue no elegir Security Hub. Para d3-q22 eso cambió el contenido: la q20, que
  era otra pregunta de escritorios, ahora es CodeDeploy contra CodePipeline y CodeBuild,
  así que dos de las tres apuntan a CI/CD. El trío de d2-q19 ya tenía Security Hub como
  respuesta en la q13.
- **d3-q08:** el distractor "S3 Glacier" pasó a ser "S3 Glacier Deep Archive". Glacier
  Instant Retrieval recupera en milisegundos, así que "tarda de minutos a horas" no valía
  para toda la familia.
- **d3-q17:** la explicación de Athena decía que no corre Spark. Athena tiene cuadernos de
  Spark; lo que la descarta es que no da control sobre el clúster.
- **d4-q02:** la explicación de las RI estándar dice ahora que la flexibilidad de tamaño
  de las RI regionales solo existe para Linux.
- **d2-q15:** se agregó que los chequeos completos de Trusted Advisor (los de costos, por
  ejemplo) requieren el plan de soporte Business o superior, que es un detalle que el
  examen pregunta.
- **d2-q07:** el enunciado decía que WAF mira la solicitud "antes de que llegue al
  balanceador", y cuando WAF va asociado al balanceador eso no es exacto. Ahora dice
  "antes de que llegue a la aplicación".
- Redacción: "se aplica solo" (ambiguo) pasó a "se aplica automáticamente". También se
  sacó la palabra "textual" a dos citas de principios de diseño, porque la lista de
  principios del framework cambió entre versiones.

## Revisión (15 de octubre de 2026) — versión 2

Las 144 explicaciones de opciones incorrectas se reescribieron con un patrón fijo:
**primero qué es o para qué sirve esa opción** (el servicio, el pilar, el modelo de
compra), **después por qué no es la correcta en este escenario**, nombrando la confusión
que la hace tentadora. Antes muchas solo decían por qué no correspondía, y quien no
conocía el servicio se quedaba sin saber qué era. Enunciados, opciones, correctas y tips
no cambiaron. La versión sube a 2 porque cambia el texto que se muestra al revisar.

## Qué no se verificó

- **Que cada respuesta marcada como correcta sea de verdad la correcta no lo comprueba
  ningún script.** Las escribió y las revisó Claude contra lo que sabe de AWS. Conviene
  que alguien con la certificación las lea, sobre todo los datos que cambian con el
  tiempo: los porcentajes de descuento de Savings Plans (~66 % y ~72 %), el cifrado
  por defecto de S3 y la protección de S3 de GuardDuty.
- Las explicaciones de las incorrectas describen qué es cada opción y qué confusión la
  hace tentadora. Las descripciones de los servicios no las revisó nadie con la
  certificación; la confusión es una hipótesis didáctica, no algo medido.
- Nombres y disponibilidad de servicios que AWS pudo haber cambiado. Sobre la familia
  Snow (Snowball Edge, q10), QuickSight y AppStream 2.0 hubo anuncios de cambios de
  disponibilidad o de marca que no se confirmaron. Se usan los nombres de la guía del
  CLF-C02, que es lo que pregunta el examen, pero conviene contrastarlos con la guía
  vigente.
- La dificultad es un juicio. No se probó con nadie.
- Que este examen corrija sus errores se va a ver recién cuando lo rinda:
  `exam_question_results` registra cada pregunta por separado.
