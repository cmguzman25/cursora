# 1.7 — Cómputo distribuido y Apache Spark: particiones, shuffle, DAG y ejecutores

> Módulo 1 · Fundamentos · ⏱️ 12 min de lectura

## 🤔 Antes de empezar

- Si un trabajo se reparte entre 20 máquinas, ¿por qué no termina 20 veces más
  rápido que en una sola?
- ¿Qué crees que tiene que ocurrir para que un motor distribuido pueda sumar
  ventas agrupadas por país, si cada máquina solo tiene una parte de los datos?
- Un job tiene 200 tareas: 199 terminan en un minuto y una tarda cuarenta.
  ¿Qué puede estar pasando?

## 📘 Contenido

Esta lección no trata de un servicio de AWS. Trata del motor que hay **por
dentro** de AWS Glue y de Amazon EMR: **Apache Spark**. El examen no pide escribir
código de Spark, pero sí resolver preguntas de diagnóstico —"el job tarda tres
horas", "un nodo trabaja y el resto está ocioso"— que solo se responden entendiendo
cómo reparte el trabajo.

### El reparto: particiones, tareas y ejecutores

Un motor distribuido divide los datos en trozos llamados **particiones**. Ojo con
el nombre: **no son las particiones de S3** de la lección 1.5. Aquí son los trozos
en memoria en los que se reparte el trabajo.

La cadena es:

- Una **partición** es un trozo de datos.
- Una **tarea** (*task*) es la unidad de trabajo que procesa **una** partición.
- Un **ejecutor** (*executor*) es un proceso con memoria y varios núcleos que
  ejecuta tareas, una por núcleo a la vez.
- El **driver** es el proceso coordinador: planifica el trabajo, lo reparte y
  recoge los resultados.

De ahí sale la primera regla práctica: **el paralelismo máximo es el número de
particiones**. Si tus datos se dividen en 4 particiones y tienes un clúster con
100 núcleos, van a trabajar 4 y el resto va a mirar. Es exactamente lo que ocurre
con el archivo gzip no divisible de la lección 1.4: un archivo, una partición, una
tarea.

Y la simétrica: si tienes 200.000 particiones diminutas, el coste de planificar y
lanzar cada tarea supera al trabajo útil.

### Evaluación perezosa y el DAG

Spark no ejecuta las operaciones según las lees. Distingue dos tipos:

- Las **transformaciones** (filtrar, unir, agrupar) **no ejecutan nada**: solo
  registran la intención. Es **evaluación perezosa** (*lazy evaluation*).
- Las **acciones** (contar, escribir el resultado, traer datos al driver) son las
  que disparan el cálculo.

Cuando llega una acción, el driver construye un **DAG** (*directed acyclic
graph*, grafo dirigido acíclico): el plan completo de operaciones y sus
dependencias. Verlo entero de una vez le permite optimizar: reordenar filtros para
que se apliquen antes, fusionar pasos y —con formatos como Parquet— **empujar los
filtros hasta la lectura**, de modo que ni siquiera se lean los bloques
descartados.

El DAG se divide en **etapas** (*stages*), y la frontera entre una etapa y la
siguiente es siempre la misma cosa: un shuffle.

### El shuffle: la operación que cuesta

Aquí está el concepto central de la lección.

Algunas operaciones son **estrechas** (*narrow*): cada partición de salida depende
de una sola partición de entrada. Filtrar es estrecha: cada tarea filtra su trozo
sin hablar con nadie. Son baratas y se encadenan sin coordinación.

Otras son **anchas** (*wide*): cada partición de salida depende de **varias**
particiones de entrada. Agrupar por país es ancha, y la pregunta de activación lo
plantea bien: si cada máquina tiene un trozo cualquiera de las ventas, ninguna
puede calcular el total de un país por su cuenta. Hay que **juntar primero todas
las filas del mismo país en la misma máquina**.

Ese movimiento de datos entre máquinas es el **shuffle**, y es la operación más
cara de un motor distribuido, porque implica:

1. Escribir resultados intermedios **a disco** en cada ejecutor.
2. Transferirlos **por red** a los ejecutores de destino.
3. Volver a leerlos y ordenarlos.

Provocan shuffle las agrupaciones (`GROUP BY`), las uniones (`JOIN`), las
ordenaciones (`ORDER BY`) y los cambios explícitos de número de particiones.

De ahí la segunda regla práctica: **optimizar un job distribuido es, casi siempre,
reducir o equilibrar shuffles**. Filtrar antes de agrupar, seleccionar solo las
columnas necesarias y evitar ordenaciones innecesarias mueve menos bytes por la
red.

### Data skew: cuando el reparto es desigual

Un shuffle reparte las filas según el valor de una clave. Si esa clave está mal
distribuida, un ejecutor recibe muchísimo más trabajo que los demás. Eso es
**data skew** (sesgo de datos), y es la respuesta a la tercera pregunta de
activación.

El síntoma es inconfundible: **199 tareas terminan en un minuto y una tarda
cuarenta**. El job no termina hasta que termina la última, así que el clúster
entero espera a un solo núcleo. La tarea rezagada se llama *straggler*.

Las causas típicas son valores que concentran datos de forma natural:

- Andes Retail agrupa ventas por tienda y una tienda insignia vende veinte veces
  más que la media.
- Se agrupa por un campo donde el 70 % de los registros tiene el valor por defecto
  o nulo.

Las soluciones que conviene reconocer:

- **Salting**: añadir un sufijo aleatorio a la clave conflictiva para repartirla
  entre varias particiones, y agregar en dos pasos.
- **Broadcast join** cuando una de las tablas es pequeña: en lugar de mover las
  dos tablas, se envía una copia completa de la pequeña a cada ejecutor y la unión
  se hace localmente, **sin shuffle**. Es la optimización de unión más preguntada.
- **Filtrar o tratar aparte** los valores nulos o por defecto que concentran el
  sesgo.

Aumentar el tamaño del clúster **no arregla el skew**: la tarea grande sigue
siendo una sola tarea en un solo núcleo. Es la opción tentadora e incorrecta que
el examen coloca una y otra vez.

### Memoria y derrames

Cada ejecutor tiene memoria limitada. Si una tarea necesita más de la que tiene,
Spark **derrama** (*spill*) datos a disco: sigue funcionando, pero mucho más
lento. Si ni así cabe, el ejecutor falla con un error de memoria.

Un job con muchos derrames o con ejecutores que mueren por memoria apunta casi
siempre a lo mismo: **particiones demasiado grandes** —pocas particiones para el
volumen— o **skew** concentrando datos en una sola.

### Tolerancia a fallos

Como el DAG registra cómo se obtuvo cada partición a partir de las anteriores, si
un ejecutor muere el motor puede **recalcular solo las particiones perdidas** en
otro nodo, sin repetir el job entero.

Esto tiene una consecuencia directa en AWS: hace viable usar **instancias Spot**
—capacidad sobrante, mucho más barata, que puede retirarse con poco aviso— para
los nodos de trabajo. Si una se retira, el motor recalcula. La práctica habitual
en EMR es poner los nodos coordinadores en capacidad estable y los de trabajo en
Spot, y aparece con frecuencia en las preguntas de optimización de costo.

**En resumen:** el trabajo se reparte en particiones que ejecutan tareas en los
núcleos de los ejecutores, así que el paralelismo está limitado por el número de
particiones. Las transformaciones son perezosas y forman un DAG que se divide en
etapas por cada shuffle, la operación cara porque escribe a disco y mueve datos
por red. El skew concentra el shuffle en una tarea y se corrige con salting o
broadcast join, nunca con más nodos.

## 🔍 Cómo lo pregunta el examen

> Un job de Spark une una tabla de 4 TB de transacciones con una tabla de 30 MB de
> países. El job tarda horas y las métricas muestran un volumen muy alto de datos
> transferidos entre nodos. ¿Qué cambio mejora el rendimiento con el menor
> esfuerzo?

Las pistas son **una tabla enorme y otra diminuta**, **unión** y **mucho tráfico
entre nodos**. Esa combinación describe un shuffle join que no hacía falta.

Por defecto, unir dos tablas obliga a repartir **ambas** por la clave de unión,
moviendo los 4 TB por la red. Pero la tabla de países cabe de sobra en la memoria
de cada ejecutor.

Las opciones tentadoras suelen ser aumentar el número de nodos —moverían los
mismos 4 TB, solo que con más máquinas esperando— o subir la memoria de los
ejecutores, que no reduce el tráfico.

La respuesta correcta es un **broadcast join**: enviar una copia de la tabla
pequeña a cada ejecutor y unir localmente, eliminando el shuffle de la tabla
grande. Cuando veas "unir una tabla muy grande con una muy pequeña", esa es la
respuesta.

## 💬 Ahora te toca a ti

**Pregunta:** Si un trabajo se reparte entre 20 máquinas, ¿por qué no termina 20
veces más rápido que en una sola?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Por tres motivos. Primero, el paralelismo real está
limitado por el número de particiones: si los datos se dividen en 4 trozos, solo
trabajan 4 núcleos por muchas máquinas que haya. Segundo, hay operaciones que
obligan a mover datos entre máquinas —el shuffle—, y ese coste de red y disco
crece con el número de nodos en vez de bajar. Y tercero, el job termina cuando
termina la última tarea, así que un reparto desigual deja a todos esperando a uno.

**Pregunta:** ¿Qué crees que tiene que ocurrir para que un motor distribuido pueda
sumar ventas agrupadas por país, si cada máquina solo tiene una parte de los
datos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que todas las filas de un mismo país acaben en la misma
máquina antes de sumar. Eso obliga a redistribuir los datos según la clave de
agrupación: escribir resultados intermedios a disco, transferirlos por red y
volver a leerlos. Es el shuffle, y es la operación más cara del procesamiento
distribuido. Por eso agrupar y unir cuestan mucho más que filtrar, que cada
máquina puede hacer sobre su propio trozo sin hablar con nadie.

**Pregunta:** Un job tiene 200 tareas: 199 terminan en un minuto y una tarda
cuarenta. ¿Qué puede estar pasando?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Data skew: la clave por la que se reparte el trabajo está
mal distribuida y una partición concentra muchísimos más datos que las demás. Esa
tarea rezagada retrasa el job entero, porque no termina hasta la última. Se
corrige repartiendo la clave conflictiva con salting, usando un broadcast join si
el problema está en una unión con una tabla pequeña, o tratando aparte los valores
nulos o por defecto que concentran el sesgo. Añadir nodos no ayuda: la tarea
grande sigue siendo una sola tarea en un solo núcleo.

## ⚠️ No lo confundas con

- **Particiones de Spark vs. particiones de S3:** las primeras son trozos en
  memoria que determinan el paralelismo; las segundas son carpetas que permiten
  saltarse datos al leer. Mismo nombre, cosas distintas.
- **Transformación estrecha vs. ancha:** la estrecha se resuelve dentro de cada
  partición; la ancha necesita datos de varias y provoca shuffle. Filtrar frente a
  agrupar.
- **Data skew vs. archivo no divisible:** los dos dan "un nodo trabaja y el resto
  espera". El skew ocurre al agrupar o unir por una clave desbalanceada; la falta
  de divisibilidad, al leer un archivo comprimido con gzip.
- **Broadcast join vs. shuffle join:** el broadcast copia la tabla pequeña a cada
  ejecutor y evita mover la grande; el shuffle join reparte las dos por la clave.
- **Spill vs. fallo de memoria:** el derrame a disco es una degradación de
  rendimiento; el fallo de memoria mata el ejecutor. Suelen tener la misma causa.

## 🎯 Pistas para el examen

- **"Un nodo trabaja y el resto está ocioso" tiene dos causas** y hay que
  distinguirlas por el contexto: si el enunciado habla de leer un archivo
  comprimido, es divisibilidad; si habla de agrupar o unir, es skew.
- **Añadir nodos casi nunca es la respuesta correcta** en preguntas de
  rendimiento de Spark. Si el problema es skew o divisibilidad, escalar no cambia
  nada.
- **Tabla enorme unida con tabla pequeña es broadcast join.** Es una de las
  asociaciones más rentables de memorizar.
- **Optimizar un job es reducir el shuffle:** filtrar antes de agrupar y
  seleccionar solo las columnas necesarias. Desconfía de opciones que añadan
  ordenaciones o reparticiones sin motivo.
- **La tolerancia a fallos por recálculo es lo que justifica las instancias
  Spot** en los nodos de trabajo. Cuando pidan reducir costo en EMR, esa suele ser
  parte de la respuesta.
