# AWS Cloud Practitioner: segundo refuerzo para Grediana

54 preguntas nuevas armadas a partir de lo que Grediana siguió fallando, o marcó para
repasar, en `aws-cloud-practitioner-refuerzo-grediana`. Está en el grupo
`aws-cloud-practitioner`, después del primer refuerzo.

## De dónde sale

Datos leídos el 27 de octubre de 2026 de `exam_question_results`, `exam_review_flags`
y `exam_runs` (usuaria "Gredy Grimales"):

- **Primer refuerzo, modo estudio (14 al 18 de octubre):** respondió las 48. En su
  último intento **17 siguen mal**, y marcó para repasar 17 preguntas: 16 de las
  pendientes (todas menos d2-q10) y d1-q01, que después acertó. En total son **18
  preguntas**, y cada una tiene acá tres nuevas.
- **Corrigió en el primer refuerzo** WAF, Shield, Macie, Security Hub, Trusted Advisor,
  Snowball, AppStream contra WorkSpaces y EC2 Instance Savings Plans. Esos servicios
  aparecen acá solo como distractores.
- **Las rendidas en modo examen no cuentan:** la del primer refuerzo (18 de octubre)
  se entregó con 4 de 48 respondidas y la del simulacro (12 y 13 de octubre) con 0.
  Sus notas (8 % y 0 %) no miden lo que sabe.
- Los 16 fallos del simulacro siguen apareciendo como pendientes solo porque no lo
  volvió a rendir. Ya los cubría el primer refuerzo, así que este examen parte de los
  fallos del primer refuerzo.

Dos de cada tres preguntas atacan la confusión desde un escenario que todavía no vio.
En los grupos donde falló todo el trío, o la misma pregunta más de una vez
(conectividad, almacenamiento, analítica y CI/CD), una de las tres es "al revés": la
correcta es la opción que antes había elegido mal, para que no aprenda la regla
"siempre la otra".

| Pendiente del primer refuerzo | Eligió → era | Preguntas nuevas |
|---|---|---|
| ref-gr-d1-q05 (mal 2 de 3) | Eficiencia de rendimiento → Fiabilidad | ref2-gr-d1-q01, q03, q05 |
| ref-gr-d1-q01 (marcada) | trampa: Optimización de costos | ref2-gr-d1-q02, q04, q06 |
| ref-gr-d2-q02 | "parchear el SO" → actualizar la librería en Lambda | ref2-gr-d2-q01–q03 |
| ref-gr-d2-q08 (mal 2 de 2) | Macie → Inspector | ref2-gr-d2-q04–q06 |
| ref-gr-d2-q10 (mal 2 de 2) | WAF → GuardDuty | ref2-gr-d2-q07–q09 |
| ref-gr-d3-q02 (mal 2 de 2) | Route 53 → Global Accelerator | ref2-gr-d3-q01–q03 |
| ref-gr-d3-q03 (mal 2 de 2) | cree que CloudFront replica el origen | ref2-gr-d3-q04–q06 |
| ref-gr-d3-q04 (**mal 3 de 3**) | internet gateway → Site-to-Site VPN | ref2-gr-d3-q07, q10, q11 |
| ref-gr-d3-q06 | NAT gateway → Direct Connect | ref2-gr-d3-q08, q09, q12 |
| ref-gr-d3-q08 (mal 2 de 2) | S3 → almacén de instancias | ref2-gr-d3-q15, q16, q18 |
| ref-gr-d3-q09 (mal 2 de 2) | cree que EBS se borra al detener y sirve en cualquier zona | ref2-gr-d3-q13, q14, q17 |
| ref-gr-d3-q16 (mal 2 de 2) | Athena → Redshift | ref2-gr-d3-q19, q20, q26 |
| ref-gr-d3-q17 (mal 2 de 2) | QuickSight → EMR | ref2-gr-d3-q21, q24, q27 |
| ref-gr-d3-q18 (mal 2 de 2) | RDS → QuickSight para el tablero | ref2-gr-d3-q22, q23, q25 |
| ref-gr-d3-q20 (mal 2 de 2) | CodePipeline → CodeDeploy | ref2-gr-d3-q30–q32 |
| ref-gr-d3-q21 | CodeDeploy → CodePipeline (el mismo par, invertido) | ref2-gr-d3-q28, q29, q33 |
| ref-gr-d4-q03 | Dedicated Hosts "para ahorrar" → Compute Savings Plans | ref2-gr-d4-q01–q03 |
| ref-gr-d4-q06 | CloudWatch → AWS Health Dashboard | ref2-gr-d4-q04–q06 |

## Parámetros

| | |
|---|---|
| Temas | Los 4 dominios del CLF-C02, con los mismos ids que el simulacro |
| Reparto | 6 / 9 / 33 / 6: tres por pendiente, así que el desbalance es su perfil de errores. El intercalado agota los dominios 1 y 4 en la sexta vuelta y el 2 en la novena: las últimas 24 preguntas son todas del dominio 3 |
| Dificultad | Avanzado: discriminar entre opciones cercanas |
| Formato | 4 opciones / 1 correcta, y 5 opciones / 2 correctas |
| Respuesta múltiple | 18 de 54 (33 %), más que el ~15 % del examen real, porque pedir dos servicios a la vez obliga a separar los pares que confunde |
| Idioma | Español (casillero `es`) |
| Aprobación | 70 % |
| Duración sugerida | 75 minutos |
| Versión | 1 |

## Verificador

```
node --no-warnings=MODULE_TYPELESS_PACKAGE_JSON content/exams/aws-cloud-practitioner-refuerzo-2-grediana/verificar-preguntas.mjs
```

Es el verificador del primer refuerzo, ampliado: compara los 7-gramas de cada
enunciado contra los 65 del simulacro **y** los 48 del primer refuerzo, y falla si
comparten dos tramos o más.

Medición al entregar: 54 preguntas, 18 de respuesta múltiple. Letra correcta en las
de opción única: A 8 · B 9 · C 10 · D 9. La correcta es la opción más larga en 12 de
36 (13 antes de la revisión técnica).

Ese control atrapó cuatro enunciados en la primera pasada. Tres repetían el mismo
razonamiento que una pregunta del primer refuerzo que ella ya había acertado (el
fallo de caché de CloudFront en Tokio, quién borró un bucket, y el espacio temporal
rápido). Esos se reemplazaron por ángulos nuevos: invalidación y TTL, retención de
CloudTrail en S3, y qué pasa con el almacén de instancias al detener. El cuarto solo
se parecía en la redacción y se reescribió.

Se comprobó que también falla cuando corresponde: con un id duplicado, y con un
enunciado copiado del primer refuerzo (ref-gr-d2-q14), dio error.

## Revisión técnica (27 de octubre de 2026)

Antes de publicarlo, tres revisores independientes (otras instancias de Claude)
leyeron las 54 preguntas contra la guía del CLF-C02. No encontraron ninguna respuesta
marcada que fuera incorrecta, pero sí estos problemas, ya corregidos:

- **Respuestas ambiguas:**
  - d1-q05: escalar con la demanda también figura en el pilar de fiabilidad. Ahora el enunciado pide el objetivo principal, que es recuperarse de un fallo.
  - d3-q02: Global Accelerator también se podía defender. Ahora el enunciado exige resolverlo solo con DNS.
  - d3-q26: Redshift Serverless tampoco cobra si no se consulta. La opción C ahora habla de no crear nada antes.
  - d3-q30 y d3-q33: desde mayo de 2025 CodePipeline tiene una acción propia que despliega en Lambda moviendo el tráfico de forma gradual, así que despliegue gradual ya no es sinónimo de CodeDeploy. d3-q30 ahora pide un servicio sin pipeline, y la opción E de d3-q33 ahora habla de grupos de despliegue.
- **Errores técnicos en las explicaciones:**
  - d2-q08: GuardDuty no ve el tráfico HTTP. La premisa ahora sale de los registros del balanceador.
  - d3-q01: CloudFront no acepta UDP.
  - d3-q20 y d3-q22: Redshift Spectrum y las consultas federadas de Athena.
  - d3-q15 y d3-q17: el almacén de instancias se borra siempre al detener, no "puede" borrarse.
  - d3-q29: CodeDeploy no tiene "proyectos".
  - d3-q31: afirmaciones absolutas sobre CodePipeline.
  - d4-q01: una RI es un descuento, no hardware compartido.
  - d4-q05: los eventos de datos de CloudTrail se activan aparte.
  - d4-q02: ya no nombra el plan Business Support, porque AWS reorganizó sus planes de soporte.
- **Pistas de forma:** se acortaron las opciones correctas de d2-q02, d4-q03 y d4-q05.
- **Tips:** los que citaban el enunciado o daban reglas absolutas ahora dan una regla general.

La versión sigue en 1 porque nadie rindió todavía el examen.

## Qué no se verificó

- **Que cada respuesta marcada como correcta sea de verdad la correcta no lo comprueba
  ningún script.** Las escribió Claude contra lo que sabe de AWS. Conviene que alguien
  con la certificación las lea, sobre todo los datos que cambian con el tiempo: los
  descuentos (~72 % para Savings Plans y RI, hasta 90 % para Spot), los 90 días del
  historial de eventos de CloudTrail, qué volúmenes admiten EBS Multi-Attach (io1 e
  io2) y que Athena tenga cuadernos de Spark.
- Las explicaciones de las incorrectas describen qué es cada opción y qué confusión la
  hace tentadora. Las descripciones de los servicios no las revisó nadie con la
  certificación; la confusión es una hipótesis didáctica sacada de sus respuestas, no
  algo medido.
- Los principios de diseño de los pilares (d1-q03 y d1-q06) se citan según la versión
  del framework que conoce Claude; AWS reordenó y renombró algunos entre versiones.
- La dificultad es un juicio. No se probó con nadie.
- Que este examen corrija sus errores se va a ver recién cuando lo rinda:
  `exam_question_results` registra cada pregunta por separado.
