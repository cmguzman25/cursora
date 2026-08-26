# 0.2 — Cómo son las preguntas: escenarios, palabras clave y descarte de opciones

> Módulo 0 · Preparación · ⏱️ 11 min de lectura

## 🤔 Antes de empezar

- Si dos opciones de respuesta resuelven técnicamente el mismo problema, ¿qué
  parte del enunciado crees que decide cuál es la correcta?
- ¿Qué harías con una pregunta que no sabes responder, sabiendo que tienes 130
  minutos para 65 preguntas?
- ¿Por qué crees que el examen usa el formato de respuesta múltiple (elegir dos
  o más) en lugar de hacer todas las preguntas de una sola opción?

## 📘 Contenido

El DEA-C01 casi no pregunta definiciones. Pregunta **situaciones**. Y en una
situación, más de una opción suele funcionar. Lo que decide la respuesta correcta
es una frase corta, casi siempre al final del enunciado, que la mayoría de los
candidatos lee por encima.

### La anatomía de una pregunta

Casi todas siguen la misma estructura de cuatro partes:

1. **La empresa y el contexto.** "Una empresa de logística recopila telemetría de
   5.000 camiones."
2. **El volumen o la escala.** "Cada vehículo emite un registro cada 10 segundos."
3. **El requisito funcional.** "El equipo necesita detectar frenadas bruscas y
   alertar en menos de un minuto."
4. **La condición de optimización.** "¿Qué solución cumple el requisito **con el
   menor esfuerzo operativo**?"

Las tres primeras partes acotan qué es técnicamente posible. **La cuarta elige
entre lo posible.** Cambia solo esa frase y la respuesta correcta cambia, con el
resto del enunciado idéntico.

### Las palabras clave que deciden

Estas expresiones aparecen en inglés y son el eje de la pregunta. Conviene
reconocerlas de inmediato:

| En el enunciado | Qué favorece |
|---|---|
| *least operational overhead* / *least management* | Lo serverless y gestionado: Glue frente a EMR, Firehose frente a un consumidor propio, Redshift Serverless frente a provisionado |
| *most cost-effective* | Lo que menos factura para ese patrón: Spot, particionado, formatos columnares, capacidad reservada si la carga es constante |
| *least development effort* / *minimal code changes* | Servicios de configuración en vez de código: AppFlow, DataBrew, zero-ETL, un crawler en vez de un script |
| *real time* / *lowest latency* | Streaming de verdad: Kinesis Data Streams, Managed Service for Apache Flink, MSK |
| *near real time* | Micro-batch: Firehose con buffer pequeño, Glue streaming |
| *highly available* / *fault tolerant* | Multi-AZ, reintentos, DLQ, replicación |
| *without exposing data to the internet* | VPC endpoints, PrivateLink |
| *MOST* / *LEAST* en mayúsculas | AWS lo destaca porque hay varias opciones válidas y solo una es la extrema |

La trampa más común del examen es un par de opciones donde **una es más barata y
la otra tiene menos esfuerzo operativo**. Si no lees qué pidió el enunciado,
tienes un 50 % de acierto sobre una pregunta que sabías responder.

### Un mismo escenario, dos respuestas

RutaSur Logística ingiere telemetría de su flota y quiere guardarla en Amazon S3
en formato Parquet para analizarla después con Athena.

- Si la pregunta cierra con **"con el menor esfuerzo operativo"**, la respuesta
  apunta a Kinesis Data Firehose: entrega gestionada, convierte a Parquet sin
  código y no hay nada que operar.
- Si cierra con **"y además debe permitir reprocesar los datos de los últimos
  siete días ante un error de la aplicación"**, Firehose deja de servir: no
  retiene los datos para volver a leerlos. La respuesta se mueve a Kinesis Data
  Streams con la retención configurada.

Mismo escenario, misma tecnología de base, respuestas distintas. El examen está
construido sobre este tipo de bifurcación.

### El descarte, en tres pasadas

Cuando una pregunta tiene cuatro opciones y no sabes la respuesta de memoria,
sirve descartar en este orden:

**Pasada 1 — Lo que está fuera de alcance o no existe.** Una opción que nombra
AWS X-Ray, AWS IoT Core o Amazon SES está casi siempre puesta como relleno.
Igual con combinaciones imposibles: un servicio que no puede escribir en ese
destino, o un formato que ese motor no lee.

**Pasada 2 — Lo que no cumple el requisito funcional.** Si el enunciado pide
latencia por debajo de un minuto, una opción basada en un job programado cada
hora queda fuera, aunque sea la más barata del grupo.

**Pasada 3 — Lo que sobrevive contra la condición de optimización.** Aquí suelen
quedar dos opciones, ambas correctas técnicamente. Vuelves al final del
enunciado, relees la frase de optimización y eliges.

Si después de las tres pasadas siguen quedando dos, hay una heurística que ayuda
más de lo que debería: **AWS suele preferir la opción con menos piezas móviles**.
Una solución con un servicio gestionado gana casi siempre a una que encadena
tres componentes que hay que mantener.

### Las tres familias de preguntas

Casi todo lo que vas a ver cae en una de estas tres, y cada una se resuelve de
forma distinta:

**Elección de servicio.** La más frecuente. "Una empresa necesita X. ¿Qué
solución cumple con la menor Y?" Se resuelve comparando servicios, y es para lo
que sirven las lecciones ★ de tablas comparativas.

**Diagnóstico.** "Un job de Glue que antes tardaba 20 minutos ahora tarda tres
horas" o "las consultas de Athena devuelven filas duplicadas". Aquí no eliges un
servicio: identificas una causa. Estas preguntas premian entender el mecanismo
—qué es un shuffle, qué hace un job bookmark, cómo se sincroniza una partición—
y castigan la memorización de listas de funcionalidades.

**Configuración.** "¿Qué parámetro hay que ajustar para…?" Piden un valor o una
opción concreta: el tamaño de buffer de Firehose, el modo de capacidad de
DynamoDB, el estilo de distribución de una tabla de Redshift. Son las que más se
parecen a preguntas de memoria, y las que justifican prestar atención a los
números que aparecen en las lecciones.

Reconocer la familia en los primeros segundos te ahorra tiempo, porque te dice
dónde buscar la respuesta: en la tabla comparativa, en el mecanismo interno o en
el parámetro.

### Las preguntas de respuesta múltiple

Son alrededor del 15 % del examen. Piden dos o más respuestas correctas entre
cinco o más opciones, y **el enunciado dice cuántas** ("Choose TWO", "Choose
THREE").

Tres reglas prácticas:

- **No hay crédito parcial.** Si la pregunta pide dos y aciertas una, la pregunta
  cuenta como incorrecta. No hay premio por aproximarse.
- **Marca exactamente las que pide.** El sistema no te deja enviar más, pero sí
  menos, y menos es un error garantizado.
- **Suelen ser preguntas de "qué dos pasos hay que hacer".** Muchas veces las dos
  respuestas son complementarias: una configura el permiso y la otra activa el
  cifrado. Si dos opciones parecen dos mitades de la misma solución, es buena
  señal.

### La gestión del tiempo

130 minutos y 65 preguntas dan **exactamente 2 minutos por pregunta**. Sin margen
para la revisión final si te detienes en cada una.

El reparto que funciona es desigual a propósito: las preguntas cortas se
responden en 45 segundos y regalan tiempo a los escenarios largos, que pueden
llevarse cuatro minutos. La regla operativa es simple: **si a los dos minutos no
tienes una respuesta, marca la que mejor te parezca, señálala para revisión y
sigue**. Puedes volver a las marcadas al final, y volverás con la cabeza más
fresca y a veces con la respuesta encontrada en otra pregunta del examen.

Nunca dejes una en blanco al pasar de largo. Marcar una opción y señalarla para
revisión cuesta lo mismo que saltarla, pero te protege si se acaba el tiempo.

**En resumen:** las preguntas describen una situación, y la frase de optimización
del final —*most cost-effective*, *least operational overhead*, *real time*— es
la que elige entre las opciones que ya funcionan. Descarta en tres pasadas: lo
imposible, lo que no cumple el requisito, y lo que pierde contra la condición de
optimización. Dos minutos por pregunta, y nada en blanco.

## 🔍 Cómo lo pregunta el examen

> Mediateca, una plataforma de video, escribe eventos de clickstream en Amazon S3
> como archivos JSON pequeños, unos 40 GB al día. Los analistas los consultan con
> Amazon Athena filtrando siempre por fecha. Las consultas tardan minutos y el
> costo mensual de Athena creció un 300 %. ¿Qué cambio ofrece la **mayor**
> reducción de costo con el **menor esfuerzo continuo**?

Las pistas están repartidas: **JSON pequeños**, **filtran siempre por fecha**,
**mayor reducción de costo** y **menor esfuerzo continuo**.

Athena cobra por datos escaneados, así que el costo baja de dos formas: leyendo
menos filas (particionado) y leyendo menos bytes por fila (formato columnar). Una
opción que solo proponga particionar por fecha es correcta pero incompleta; una
que convierta a Parquet **y** particione por fecha ataca las dos palancas y gana
en "mayor reducción".

La segunda condición descarta la solución artesanal: un script propio que corra
a diario en una instancia EC2 funcionaría, pero hay que mantenerlo. Un job de AWS
Glue programado, o directamente escribir en Parquet desde el origen, no.

Una opción tentadora que suele aparecer aquí: "aumentar la capacidad de Athena".
No existe esa palanca —Athena es serverless y cobra por escaneo—, así que se cae
en la primera pasada.

## 💬 Ahora te toca a ti

**Pregunta:** Si dos opciones de respuesta resuelven técnicamente el mismo
problema, ¿qué parte del enunciado crees que decide cuál es la correcta?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** La condición de optimización, que casi siempre está en la
última frase: *most cost-effective*, *least operational overhead*, *lowest
latency*, *least development effort*. Las partes anteriores del enunciado —la
empresa, el volumen, el requisito funcional— acotan qué es posible; esa frase
final elige entre lo posible. Es la línea que más candidatos leen rápido y la que
más preguntas decide.

**Pregunta:** ¿Qué harías con una pregunta que no sabes responder, sabiendo que
tienes 130 minutos para 65 preguntas?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Descartar lo que puedas, marcar la mejor opción que
quede, señalarla para revisión y seguir adelante. Nunca dejarla en blanco: no hay
penalización por adivinar, así que una respuesta al azar siempre vale más que
ninguna. El presupuesto es de 2 minutos por pregunta, y quedarse cinco minutos en
una difícil te quita el tiempo de tres fáciles que sí sabes.

**Pregunta:** ¿Por qué crees que el examen usa el formato de respuesta múltiple
(elegir dos o más) en lugar de hacer todas las preguntas de una sola opción?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque muchas soluciones reales necesitan más de un paso,
y elegir uno solo no demostraría que entiendes la solución completa. Un caso
típico: dar acceso a unos datos requiere a la vez un permiso de Lake Formation y
un rol de IAM; saber solo una mitad deja el sistema roto. Además, el formato
elimina el acierto por descarte: adivinar dos opciones correctas entre cinco es
mucho más difícil que adivinar una entre cuatro. Por eso no hay crédito parcial.

## 🎯 Qué te llevas

- **Lee la última frase del enunciado antes que las opciones.** Es la que decide.
  Muchos candidatos la leen al final, cuando ya se enamoraron de una opción.
- **Practica el descarte en tres pasadas** desde ahora, en cada cuestionario de
  este curso: lo imposible o fuera de alcance, lo que no cumple el requisito, y
  lo que pierde contra la condición de optimización.
- **Cronométrate en dos minutos por pregunta.** Si te pasas, marca y sigue. Este
  hábito se entrena antes del examen, no durante.
- **Cuando dudes entre dos opciones válidas, elige la de menos piezas móviles.**
  No es infalible, pero se alinea con cómo AWS escribe las respuestas correctas.
- **Anota las palabras clave en inglés** de la tabla de esta lección y tenlas a
  mano mientras estudias. Reconocerlas al instante vale tanto como saber el
  servicio.
