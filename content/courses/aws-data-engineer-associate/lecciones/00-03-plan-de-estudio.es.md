# 0.3 — Plan de estudio y cómo usar este curso

> Módulo 0 · Preparación · ⏱️ 12 min de lectura

## 🤔 Antes de empezar

- ¿Qué crees que separa a alguien que estudia tres meses y aprueba de alguien que
  estudia tres meses y reprueba?
- El examen no está disponible en español. ¿Cómo crees que eso debería cambiar la
  forma en que estudias?
- ¿Cuándo dirías que estás listo para pagar los 150 dólares y fijar la fecha?

## 📘 Contenido

La mayoría de quienes reprueban el DEA-C01 no reprueban por falta de horas.
Reprueban por dos motivos concretos: estudiaron servicios en lugar de decisiones
entre servicios, y llegaron al examen sin haber practicado en inglés.

Este curso está diseñado contra esos dos fallos. Vale la pena entender cómo,
antes de empezar.

### Los cinco tipos de lección y para qué sirve cada uno

**Lecciones de concepto.** El grueso del curso. Cada una toma un tema, explica el
problema real que resuelve, cómo funciona por dentro y en qué se diferencia de
sus alternativas. Terminan con dos secciones que no son decorativas: *No lo
confundas con*, que aísla los pares que el examen mezcla a propósito, y *Pistas
para el examen*, que enseña a razonar la pregunta.

**Lecciones ★ de tablas comparativas.** Cierran cada módulo. No enseñan nada
nuevo: ponen los servicios del módulo uno junto a otro, con las columnas que el
examen usa para decidir —latencia, esfuerzo operativo, costo, límites—. Son las
lecciones que vas a releer tres o cuatro veces. No están pensadas para leerse una
vez y seguir.

**Lecciones interactivas de análisis de preguntas.** Cierran cada módulo después
de la ★. Presentan preguntas con el formato real y explican **por qué cada
opción es correcta o incorrecta**, no solo la buena. Ahí es donde se aprenden las
trampas. No hay puntaje ni cronómetro: el objetivo es analizar.

**El simulacro** (lección 11.4). Uno solo, al final: 65 preguntas nuevas en 130
minutos, con el reparto oficial por dominio. No recicla preguntas de los módulos,
para que el resultado signifique algo.

**Las lecciones de preparación**, como esta. Solo en el módulo 0.

### Por qué el módulo 1 no se salta

El módulo 1 es de fundamentos: formatos columnares, particionado, OLTP frente a
OLAP, cómo funciona Apache Spark por dentro. Nada de eso aparece como un task
statement en la guía, porque AWS lo da por sabido.

Ese es justamente el motivo para no saltárselo. Si no tienes claro por qué
Parquet reduce el escaneo, o qué es un shuffle en Spark, hay dos bloques enteros
del examen que se vuelven memorización ciega: las preguntas de optimización de
costo en Athena y Redshift, y las de diagnóstico de rendimiento en Glue y EMR.

Si vienes de años trabajando con Spark y almacenes de datos, léelo en diagonal y
quédate con las lecciones ★. Si no, es el módulo que más rendimiento te va a dar
por hora invertida.

### El problema del idioma, y qué hacer con él

El examen se ofrece en **inglés, japonés, coreano y chino simplificado**. No hay
versión en español.

Este curso está en español para que entiendas los conceptos, pero mantiene todo
el vocabulario técnico en inglés a propósito: *shard*, *partition key*,
*distribution style*, *job bookmark*, *least operational overhead*. No es un
descuido de traducción, es material de estudio. El día del examen vas a leer esas
palabras, no sus equivalentes en español.

Tres cosas concretas que ayudan:

- **Solicita la acomodación ESL +30**, que te da 30 minutos extra si el inglés no
  es tu lengua materna. Se pide una sola vez en tu cuenta de AWS Certification y
  aplica a todos tus exámenes. Es gratuita y no hay que justificar nada. La
  lección 0.4 explica cómo.
- **Lee la documentación de AWS en inglés** cuando amplíes un tema. La versión
  traducida existe, pero usa términos que el examen no usa.
- **Practica las preguntas en inglés** en las últimas semanas. El material oficial
  de AWS Skill Builder está en inglés y sirve exactamente para esto.

### Tres planes según tu punto de partida

Elige el que se parezca a tu situación. Todos suponen entre 6 y 8 horas de
estudio por semana.

| | **Plan corto** | **Plan estándar** | **Plan largo** |
|---|---|---|---|
| Para quién | Ya trabajas con datos en AWS a diario | Trabajas con datos, poco AWS (o al revés) | Vienes de otro perfil técnico |
| Duración | 6 semanas | 10 semanas | 16 semanas |
| Módulo 1 | En diagonal | Completo | Completo, con calma |
| Ritmo | 4–5 lecciones/día de estudio | 3 lecciones/día | 2 lecciones/día |
| Simulacro | Semana 5 | Semana 9 | Semana 14 |

El reparto del tiempo dentro del plan sigue el peso de los dominios: alrededor de
un tercio a los módulos 2, 3 y 4 (dominio 1), un cuarto a los módulos 5 y 6
(dominio 2), y el resto repartido entre operaciones y seguridad.

### Los cinco errores de estudio más caros

Vale la pena nombrarlos antes de empezar, porque son fáciles de cometer sin darse
cuenta:

**Estudiar por servicio en vez de por decisión.** Leer la documentación de Glue,
después la de EMR, después la de Lambda, y no detenerse nunca en la frontera
entre los tres. El examen vive en esa frontera.

**Saltarse las lecciones ★.** Son las menos entretenidas y las más rentables. Un
repaso comparativo de veinte minutos rinde más que releer tres lecciones de
concepto.

**Leer solo la explicación de la respuesta correcta.** En las lecciones
interactivas, cada opción incorrecta explica una trampa concreta. Si solo lees la
correcta, te llevas una cuarta parte del valor de la pregunta.

**Dejar el dominio 4 para el final y llegar sin tiempo.** Pesa un 18 %, así que
parece prescindible. Pero cifrado, permisos de Lake Formation y acceso privado
aparecen dentro de preguntas de los otros dominios, así que su impacto real es
mayor que su peso nominal.

**No cronometrarse nunca.** Se puede dominar el temario y aun así no terminar el
examen. El presupuesto de dos minutos por pregunta se entrena, y el momento de
entrenarlo no es el día del examen.

### Un calendario de ejemplo: el plan estándar

Diez semanas, con los módulos repartidos por peso. Sirve como plantilla para
adaptar a los otros dos planes.

| Semana | Contenido |
|---|---|
| 1 | Módulo 0 completo + módulo 1 (fundamentos) |
| 2 | Módulo 2 · ingesta, primera mitad |
| 3 | Módulo 2 · segunda mitad, ★ y cuestionario |
| 4 | Módulo 3 · transformación y procesamiento |
| 5 | Módulo 4 · orquestación y programación |
| 6 | Módulo 5 · elegir el almacén |
| 7 | Módulo 6 · catálogo, ciclo de vida y modelado |
| 8 | Módulos 7 y 8 · operaciones, monitoreo y calidad |
| 9 | Módulos 9 y 10 · seguridad y gobierno + **simulacro** |
| 10 | Repaso del módulo 11, lista de confusiones y preguntas oficiales |

El simulacro va en la semana 9, no en la 10, a propósito: necesitas una semana
por delante para corregir lo que revele.

### Cómo estudiar cada módulo

Un ciclo que funciona, repetido módulo a módulo:

1. **Lee las lecciones de concepto** en orden, sin saltar. Una o dos por sesión;
   más de tres seguidas rinde poco.
2. **Al terminar el módulo, lee la lección ★.** Si alguna fila de las tablas te
   sorprende, vuelve a la lección de ese servicio: acabas de encontrar un hueco.
3. **Haz la lección interactiva de preguntas**, sin apuro y leyendo todas las
   explicaciones, también las de las opciones que descartaste bien. Ahí está la
   mitad del valor.
4. **Anota los errores en una lista.** No los que fallaste por descuido: los que
   fallaste porque confundiste dos servicios. Esa lista es tu material de repaso
   de la última semana.

### Qué usar además de este curso

El curso cubre el temario completo, pero conviene contrastar:

- **La guía oficial de examen.** Es corta y es la fuente de verdad. Léela una vez
  al principio y otra la semana antes.
- **AWS Skill Builder.** Publica el *Official Practice Question Set* del DEA-C01,
  gratuito con una cuenta. Son las preguntas más parecidas a las reales que vas a
  encontrar, escritas por AWS y con explicación de cada respuesta. Pero son
  **solo 20**: sirven para calibrar el estilo, no para medir si estás listo. Esa
  medición es el simulacro de la lección 11.4.
- **La documentación del servicio**, cuando una lección te deje con dudas sobre
  un límite o una cuota concreta. Los números cambian y la documentación siempre
  gana.

### Cómo saber que estás listo

No hay una señal única, pero estas tres juntas son bastante fiables:

- Sacas **más del 80 %** en el simulacro de la lección 11.4, con el tiempo real.
- Puedes explicar, sin mirar, **la diferencia entre Kinesis Data Streams y
  Firehose**, entre **Glue y EMR**, y entre **Secrets Manager y Parameter
  Store**. Si estas tres salen fluidas, el resto suele estar en su sitio.
- Cuando fallas una pregunta, sabes **por qué** fallaste, y no es "no me acordaba
  del servicio" sino "leí mal la condición".

Un 80 % en el simulacro no es exceso de exigencia: la nota de corte real es
720/1000, y un simulacro casero siempre resulta algo más benévolo que el examen.

**En resumen:** el curso ataca los dos motivos por los que se reprueba —estudiar
servicios sueltos en vez de decisiones, y no practicar en inglés—. Elige uno de
los tres planes según tu punto de partida, no te saltes el módulo 1 si no dominas
Spark y los formatos columnares, y usa el simulacro como semáforo, no como
repaso.

## 💬 Ahora te toca a ti

**Pregunta:** ¿Qué crees que separa a alguien que estudia tres meses y aprueba de
alguien que estudia tres meses y reprueba?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Qué estudió, no cuánto. El que reprueba suele haber
memorizado servicios uno por uno: qué es Glue, qué es EMR, qué es Firehose. El
que aprueba estudió las fronteras entre ellos: cuándo Glue en vez de EMR, y qué
frase del enunciado inclina la balanza. El examen no pregunta definiciones,
pregunta elecciones, así que estudiar definiciones es prepararse para otro
examen.

**Pregunta:** El examen no está disponible en español. ¿Cómo crees que eso
debería cambiar la forma en que estudias?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Manteniendo el vocabulario técnico en inglés desde el
primer día, en lugar de traducirlo mentalmente. Los términos —*shard*, *sort
key*, *least operational overhead*— son los que vas a leer bajo presión de
tiempo. Además conviene solicitar la acomodación ESL +30, que da media hora extra
sin coste ni justificación, y practicar preguntas en inglés en las últimas
semanas para que el idioma no consuma tu presupuesto de dos minutos por pregunta.

**Pregunta:** ¿Cuándo dirías que estás listo para pagar los 150 dólares y fijar
la fecha?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Cuando superas el 80 % en un simulacro cronometrado, sabes
explicar de memoria las tres o cuatro comparaciones centrales del temario, y
entiendes por qué fallaste las preguntas que fallaste. Dicho eso, hay un
argumento para fijar la fecha antes de estar listo: una fecha comprada ordena el
estudio y elimina el aplazamiento indefinido. Reservar con cuatro a seis semanas
de margen suele ser buen equilibrio, y además se puede reprogramar hasta 24 horas
antes.

## 🎯 Qué te llevas

- **Elige hoy uno de los tres planes** y anota la fecha objetivo del examen. Un
  plan sin fecha se convierte en estudio indefinido.
- **Solicita la acomodación ESL +30 esta semana**, antes de registrarte a
  cualquier examen. Es gratuita, se pide una sola vez y aplica para siempre.
- **Abre una lista de confusiones** desde la primera lección: cada par de
  servicios que mezclaste va ahí. Esa lista es tu repaso de la última semana.
- **Reserva el simulacro para el final**, con el tiempo real. Gastarlo antes de
  terminar el temario te quita la única medición fiable que tienes.
- **Crea tu cuenta de AWS Skill Builder** y localiza el conjunto oficial de
  preguntas de práctica del DEA-C01, para usarlo en las últimas dos semanas.
