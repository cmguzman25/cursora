# 0.1 — Qué evalúa el DEA-C01 y qué queda fuera de alcance

> Módulo 0 · Preparación · ⏱️ 12 min de lectura

## 🤔 Antes de empezar

- Si tuvieras que adivinar, ¿qué crees que le pide AWS a un ingeniero de datos
  certificado: que sepa construir pipelines, o que sepa elegir entre varias
  formas de construirlos?
- ¿Por qué crees que un examen de nivel associate pondría preguntas donde varias
  opciones funcionan técnicamente?
- ¿Qué temas de datos esperarías que **no** entren en un examen de ingeniería de
  datos?

## 📘 Contenido

El DEA-C01 no evalúa si sabes escribir código de transformación. Evalúa si sabes
**elegir**. Esa distinción define todo lo demás: cómo son las preguntas, qué hay
que estudiar y por qué candidatos con experiencia real a veces reprueban.

> **Antes de seguir, una aclaración sobre este módulo.** En las cuatro lecciones
> del módulo 0 van a aparecer nombres de servicios y términos técnicos que
> todavía no conoces: Glue, Firehose, Parquet, shard, particionado. **No hace
> falta que los entiendas ahora.** Aquí están de ejemplo, para mostrar el tipo de
> decisión que se evalúa. Cada uno tiene su propia lección más adelante, y a
> partir del módulo 1 ningún término se usa sin explicarlo antes. Léelos como
> nombres propios y sigue adelante.

### Qué dice la guía oficial

AWS define el examen así: valida la capacidad de **implementar data pipelines y
de monitorear, resolver problemas y optimizar costo y rendimiento de acuerdo con
las buenas prácticas**. Y desglosa cuatro tareas concretas:

- Ingerir y transformar datos, y orquestar pipelines aplicando conceptos de
  programación.
- Elegir un data store óptimo, diseñar modelos de datos, catalogar esquemas y
  gestionar el ciclo de vida de los datos.
- Operar, mantener y monitorear pipelines. Analizar datos y asegurar su calidad.
- Implementar autenticación, autorización, cifrado, privacidad y gobierno.
  Habilitar el registro de actividad.

Fíjate en los verbos: *elegir*, *optimizar*, *resolver problemas*, *asegurar*.
Ninguno es *programar*.

### El perfil que AWS espera

La guía describe al candidato objetivo como alguien con **2 a 3 años de
experiencia en ingeniería de datos** y **1 a 2 años de experiencia práctica con
AWS**. Se espera que entienda cómo el volumen, la variedad y la velocidad de los
datos afectan la ingesta, la transformación, el modelado, la seguridad y el
diseño del almacén.

Eso es una expectativa, no un requisito: no hay prerrequisitos formales. Pero
explica el nivel de las preguntas. El examen no te va a preguntar qué es Amazon
S3; te va a preguntar si conviene S3 con Iceberg o Redshift para un caso con
requisitos concretos de latencia y costo.

Este curso asume ese piso pero no lo da por hecho: el módulo 1 lo construye
desde cero.

### Lo que AWS da por sabido y no te va a enseñar

La guía lista aparte el conocimiento previo que el examen **usa pero no evalúa
de forma directa**. Conviene leerlo como una lista de comprobación, porque si
algo de aquí te suena a chino, es un hueco que hay que tapar antes de estudiar
servicios.

De informática general, se espera que sepas:

- Montar y mantener pipelines de **ETL** (extract, transform, load) desde el
  origen hasta el destino.
- Aplicar conceptos de programación de alto nivel, **independientes del
  lenguaje**.
- Usar comandos de **Git** para control de versiones.
- Usar **data lakes** para almacenar datos.
- Conceptos generales de **redes, almacenamiento y cómputo**.
- Conceptos generales de **vectores**.

Y sobre AWS en particular:

- Comparar servicios para entender sus diferencias de **costo, rendimiento y
  funcionalidad**. Esta línea es, literalmente, la descripción de cómo se
  pregunta el examen.
- Los servicios de **cifrado, gobierno, protección y registro** de los datos que
  circulan por un pipeline.
- Cómo **estructurar y ejecutar consultas SQL** en los servicios de AWS.
- Cómo **analizar datos, verificar su calidad y asegurar su consistencia**.

Ese último bloque explica por qué en este curso hay lecciones de SQL analítico y
de calidad de datos, aunque parezcan ajenas a "la nube": el examen las cruza con
los servicios.

### Los cuatro dominios

| Dominio | Peso |
|---|---|
| 1. Data Ingestion and Transformation | 34 % |
| 2. Data Store Management | 26 % |
| 3. Data Operations and Support | 22 % |
| 4. Data Security and Governance | 18 % |

El dominio 1 vale más de un tercio él solo. Si tuvieras que repartir el tiempo de
estudio de forma proporcional, un día de cada tres iría a ingesta y
transformación.

Pero cuidado con la lectura simplista de esta tabla. El dominio 4 pesa "solo" un
18 %, y aun así **cifrado, permisos de Lake Formation y auditoría aparecen
mezclados dentro de preguntas de los otros tres dominios**. Un escenario de
ingesta puede pedirte que los datos viajen cifrados y sin salir a internet: eso
es dominio 1 en la superficie y dominio 4 en la respuesta.

### Qué NO se evalúa

La guía es explícita sobre tres tareas que quedan fuera:

- **Entrenar modelos de machine learning y hacer inferencias.** Vas a ver
  Amazon SageMaker AI y Amazon Bedrock en el temario, pero como piezas de un
  pipeline de datos —preparar datos, catalogar linaje, generar embeddings—,
  nunca como "entrena este modelo".
- **Conocer la sintaxis específica de un lenguaje.** No te van a pedir que
  detectes un error de puntuación en Python. Sí que reconozcas qué hace un
  bloque de PySpark o una consulta SQL.
- **Sacar conclusiones de negocio a partir de los datos.** No hay preguntas del
  tipo "¿qué debería hacer la empresa con esta caída de ventas?".

Además, AWS publica una lista de **servicios fuera de alcance**. Los que más
sorprenden en un examen de datos:

- **AWS X-Ray** no entra. La observabilidad que se evalúa es CloudWatch,
  CloudTrail y Amazon Managed Grafana.
- **Toda la familia AWS IoT** queda fuera (IoT Core, SiteWise, FleetWise…),
  aunque la telemetría de dispositivos sea un caso clásico de datos. En el
  examen, los dispositivos escriben directo a Kinesis o a Amazon MSK.
- **Amazon SES, Pinpoint y Connect** no entran. Las notificaciones del examen
  son Amazon SNS y Amazon SQS.
- **Amazon FinSpace** no entra, pese a ser un servicio de datos financieros.

Esto es más útil de lo que parece. Si una opción de respuesta nombra AWS X-Ray o
AWS IoT Core, casi con seguridad es un distractor.

### Cómo es el examen por dentro

| | |
|---|---|
| Preguntas | 65 en total: **50 puntuables** y 15 que no cuentan |
| Duración | 130 minutos |
| Formatos | Opción múltiple (1 correcta de 4) y respuesta múltiple (2 o más de 5 o más) |
| Puntaje | Escala de 100 a 1000; se aprueba con **720** |
| Modelo | **Compensatorio** |
| Costo | 150 USD |
| Idiomas | Inglés, japonés, coreano y chino simplificado |

Tres detalles de esta tabla cambian cómo estudias:

**Las 15 preguntas no puntuables no están identificadas.** AWS las usa para
probar preguntas futuras. No puedes saber cuáles son, así que las respondes
todas con el mismo cuidado. El lado bueno: si una pregunta te parece rarísima o
sobre un tema que juraste que no estaba en el temario, hay una probabilidad real
de que no cuente.

**El modelo compensatorio significa que se aprueba por el total.** No necesitas
un mínimo en cada dominio. Puedes ir flojo en seguridad y compensarlo con
ingesta. El informe de resultados te dará una clasificación por sección, pero es
orientativa: no determina si apruebas.

**No hay penalización por adivinar.** Una pregunta sin responder cuenta como
incorrecta, exactamente igual que una respondida al azar. Como el azar sí puede
acertar y el vacío nunca, dejar algo en blanco solo puede perjudicarte.

### Un ejemplo del tipo de decisión que se evalúa

Andes Retail, una cadena de supermercados, consolida cada noche las ventas de
400 tiendas: unos 200 GB en archivos CSV que caen en Amazon S3. El equipo de
analítica los consulta al día siguiente y las consultas filtran casi siempre por
fecha y por tienda.

Un examen de programación te pediría escribir el job. El DEA-C01 te pregunta
otra cosa: convertir esos CSV a Parquet particionado por fecha, ¿reduce el costo
de las consultas de Athena? ¿Conviene un job de AWS Glue o un clúster de EMR
para la conversión? ¿Y si el requisito fuera "el menor esfuerzo operativo
posible"?

Todas esas preguntas tienen respuestas defendibles según el requisito. Esa es
exactamente la habilidad que se mide.

### En qué se diferencia de otras certificaciones associate

Si ya rendiste el Solutions Architect – Associate, el cambio de enfoque
sorprende. Aquel examen premia el diseño de arquitecturas: alta disponibilidad,
tolerancia a fallos, elección de cómputo. El DEA-C01 baja un nivel y entra en el
detalle operativo del dato: cómo se particiona, en qué formato se guarda, qué
pasa cuando un job falla a la mitad y hay que reprocesar, cuánto escanea una
consulta.

Eso significa que hay temas que aquí se preguntan con mucha más profundidad —los
estilos de distribución de Redshift, los bookmarks de Glue, el buffering de
Firehose— y otros que casi desaparecen, como el diseño de VPC más allá de lo
necesario para que un pipeline acceda a sus fuentes de forma privada.

También cambia el vocabulario. Términos como *shard*, *skew*, *replayability*,
*schema evolution* o *idempotencia* son cotidianos en este examen y casi no
aparecen en los otros.

**En resumen:** el DEA-C01 evalúa criterio de ingeniero, no habilidad de
programador. Son 65 preguntas en 130 minutos, se aprueba con 720 sobre 1000 y el
modelo es compensatorio. El dominio 1 pesa un tercio del examen, y saber qué
servicios quedan fuera de alcance es una herramienta de descarte tan útil como
saber qué entra.

## 💬 Ahora te toca a ti

**Pregunta:** Si tuvieras que adivinar, ¿qué crees que le pide AWS a un ingeniero
de datos certificado: que sepa construir pipelines, o que sepa elegir entre
varias formas de construirlos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que sepa elegir. La guía oficial usa verbos como
*implementar*, *optimizar*, *monitorear* y *resolver problemas*, no *programar*.
Construir un pipeline se puede hacer de cinco formas distintas en AWS; la
certificación mide si sabes cuál encaja con los requisitos de latencia, costo,
esfuerzo operativo y seguridad de cada caso.

**Pregunta:** ¿Por qué crees que un examen de nivel associate pondría preguntas
donde varias opciones funcionan técnicamente?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque así es el trabajo real. En AWS casi siempre hay
más de una forma de resolver un problema, y la diferencia entre ellas es el
costo, el esfuerzo de mantenimiento o la latencia. El examen construye las
preguntas de forma que varias opciones "funcionan", y agrega una condición al
final —la más económica, la de menor esfuerzo operativo— que deja una sola
correcta. Aprender a leer esa condición es media batalla, y es el tema de la
próxima lección.

**Pregunta:** ¿Qué temas de datos esperarías que **no** entren en un examen de
ingeniería de datos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Los que pertenecen a otros roles. Entrenar modelos de
machine learning y hacer inferencias es trabajo de un científico de datos o un
ingeniero de ML, e interpretar los resultados para tomar decisiones es trabajo
de negocio: AWS declara las tres tareas fuera de alcance. Tampoco entra la
sintaxis fina de un lenguaje, porque un ingeniero de datos trabaja con varios.
Lo que quizá no esperabas es que AWS X-Ray y toda la familia AWS IoT también
queden fuera, aunque suenen relacionados con datos.

## 🎯 Qué te llevas

- **Estudia para elegir, no para construir.** Cada vez que aprendas un servicio,
  pregúntate con qué otro compite y cuál es la diferencia de costo, latencia y
  esfuerzo operativo. Ese par de datos es lo que se pregunta.
- **Reparte el tiempo por peso, pero no ignores el dominio 4.** Un tercio del
  esfuerzo al dominio 1 es razonable; aun así, cifrado y permisos aparecen
  incrustados en preguntas de los otros dominios.
- **Quédate con los servicios fuera de alcance** de esta lección. Reconocer
  X-Ray, IoT Core o SES en una opción de respuesta te ahorra segundos y descarta
  distractores. La lista completa se repasa en la lección 11.3.
- **No dejes preguntas en blanco.** No hay penalización por adivinar y una
  respuesta vacía cuenta igual que una equivocada.
- **Anota tu punto de partida hoy.** ¿Cuántos de los cuatro dominios te resultan
  familiares? Esa respuesta define el plan de estudio que vas a elegir en la
  lección 0.3.
