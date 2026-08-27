# 3.7 — IA/ML y analítica

> Dominio 3 · Task Statement 3.7 — Identify AWS AI/ML services and analytics services

## 🤔 Antes de empezar

- Si quisieras que un programa reconozca si una foto tiene un perro o un gato, ¿tendrías que enseñarle vos desde cero?
- ¿Qué diferencia hay entre tener datos guardados y poder responder preguntas con esos datos?
- Si te llegara información nueva cada segundo, sin parar, ¿la procesarías de a una o esperarías a juntar un montón?

## 📘 Contenido

Este tema junta dos familias que el examen agrupa: los servicios que
**aprenden de los datos** (inteligencia artificial) y los que **sacan
conclusiones de los datos** (analítica). No hay que saber usarlos: hay que
reconocer para qué sirve cada uno.

### Dos formas de usar inteligencia artificial

Acá está la primera pregunta. Hay dos caminos, y el examen los distingue:

**Servicios ya entrenados.** AWS ya hizo el trabajo pesado: vos le mandás una
foto y te dice qué hay adentro. No hace falta saber nada de inteligencia
artificial. Es comprar el pan hecho.

**Construir tu propio modelo.** Cuando el problema es específico de tu negocio
y ningún servicio genérico lo resuelve, hay que entrenar un modelo con tus
propios datos. Es amasar el pan vos mismo. En AWS eso se hace con **Amazon
SageMaker AI**, la plataforma para preparar datos, entrenar modelos y ponerlos
a funcionar.

La regla: **si el problema es común (reconocer texto, traducir, transcribir
audio), hay un servicio ya hecho. Si es propio de tu negocio, es SageMaker.**

### Los servicios ya entrenados que conviene reconocer

| Servicio | Qué hace |
|---|---|
| **Amazon Rekognition** | Analiza imágenes y videos: objetos, caras, escenas |
| **Amazon Textract** | Extrae el texto y los datos de un documento escaneado |
| **Amazon Comprehend** | Entiende texto: de qué habla, si el tono es positivo o negativo |
| **Amazon Transcribe** | Convierte audio en texto escrito |
| **Amazon Polly** | Convierte texto en voz hablada |
| **Amazon Translate** | Traduce entre idiomas |
| **Amazon Lex** | Construye asistentes conversacionales (chatbots) |
| **Amazon Kendra** | Busca dentro de los documentos de la empresa con preguntas en lenguaje natural |

No hace falta memorizarlos de memoria: alcanza con reconocer la raíz del
nombre. *Rekognition* suena a reconocer imágenes, *Transcribe* a transcribir,
*Translate* a traducir, *Polly* habla. Dos pares que el examen cruza a
propósito:

- **Transcribe y Polly son opuestos**: uno va de audio a texto, el otro de
  texto a audio.
- **Rekognition y Textract se parecen** porque los dos miran imágenes, pero
  Rekognition responde *qué hay* en la foto (un auto, una cara) y Textract
  responde *qué dice* el papel escaneado (el número de una factura).

### IA generativa: Bedrock y Amazon Q

Los servicios de arriba hacen una tarea puntual. La **IA generativa** hace
algo distinto: **crea** contenido nuevo —texto, resúmenes, código— a partir de
lo que se le pide.

- **Amazon Bedrock** te deja construir aplicaciones sobre modelos de IA
  generativa ya entrenados, de AWS y de otras empresas, sin administrar ninguna
  infraestructura. Es el equivalente a Rekognition pero para generar contenido:
  el modelo pesado ya existe, vos lo usás.
- **Amazon Q** es un asistente de IA de AWS que responde preguntas en lenguaje
  natural, tanto sobre la propia AWS como sobre la información de tu empresa.

La diferencia con SageMaker AI sigue siendo la misma de antes: **Bedrock usa
modelos que ya existen; SageMaker AI es para entrenar uno propio.**

### Analítica: convertir datos en respuestas

Segunda pregunta del principio. Tener datos guardados no sirve de nada si no
podés preguntarles cosas.

Muchas empresas guardan todo en S3 y analizan desde ahí, sin mover nada a otro
lado. A ese patrón se lo llama **lago de datos** (*data lake*), y explica por
qué varios de estos servicios trabajan directamente sobre S3.

- **Amazon Athena** consulta directamente los archivos que tenés en S3, sin
  cargarlos antes en ninguna base de datos. Es entrar al depósito y contar las
  cajas ahí mismo, sin mudarlas.
- **AWS Glue** prepara y ordena los datos antes de analizarlos: los busca, los
  limpia y los convierte al formato correcto. Es el trabajo aburrido pero
  imprescindible de acomodar el depósito.
- **Amazon QuickSight** arma los tableros y gráficos que la gente de negocio
  mira. Es el informe con gráficos que se lleva a la reunión.
- **Amazon Redshift** es un almacén de datos pensado para analizar volúmenes
  enormes con consultas complejas. Es el depósito diseñado específicamente
  para que contar sea rápido.

### Datos que llegan sin parar

Tercera pregunta. A veces la información no llega en tandas sino
continuamente: sensores, clics en una web, transacciones.

**Amazon Kinesis** procesa esa información **a medida que llega**, en vez de
esperar a juntar un lote. Es la diferencia entre revisar la caja al cierre del
día y ver cada venta en el momento en que ocurre.

Si el escenario habla de **tiempo real, transmisión continua o datos en
movimiento**, la respuesta es Kinesis.

**En resumen:** para problemas comunes de inteligencia artificial hay
servicios ya entrenados —Rekognition para imágenes, Textract para documentos,
Comprehend para texto, Transcribe y Polly para audio, Translate para idiomas,
Lex para chatbots, Kendra para buscar—; para generar contenido nuevo están
Bedrock y Amazon Q; y para entrenar un modelo propio, SageMaker AI. Del lado de analítica, Athena consulta
directamente sobre S3, Glue prepara los datos, QuickSight arma los tableros,
Redshift es el almacén para grandes volúmenes, y Kinesis procesa información
que llega continuamente.

## 💬 Ahora te toca a ti

**Pregunta:** Si quisieras que un programa reconozca si una foto tiene un
perro o un gato, ¿tendrías que enseñarle vos desde cero?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No, porque reconocer objetos en fotos es un problema
común que AWS ya resolvió: **Amazon Rekognition** lo hace sin que sepas nada
de inteligencia artificial. Entrenar un modelo propio con **SageMaker AI**
tendría sentido solo si el problema fuera específico de tu negocio —por
ejemplo, distinguir si una pieza de tu fábrica salió defectuosa—, algo que
ningún servicio genérico puede saber.

**Pregunta:** ¿Qué diferencia hay entre tener datos guardados y poder
responder preguntas con esos datos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Guardar es solo el primer paso; para responder
preguntas hace falta consultarlos y presentarlos. En AWS, **Athena** permite
consultar directamente los archivos que están en S3 sin moverlos, **Glue**
prepara y limpia los datos para que se puedan analizar, **QuickSight** arma
los tableros que mira la gente de negocio, y **Redshift** es el almacén
pensado para consultas complejas sobre volúmenes muy grandes.

**Pregunta:** Si te llegara información nueva cada segundo, sin parar, ¿la
procesarías de a una o esperarías a juntar un montón?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Depende de para qué la necesites, pero si el valor está
en reaccionar rápido —detectar un fraude, ver un sensor que se dispara— hay
que procesarla **a medida que llega**. Ese es el trabajo de **Amazon
Kinesis**. Esperar a juntar un lote sirve cuando el análisis es histórico y no
urgente, y ahí encajan mejor Athena o Redshift.

## 🎯 Pistas para el examen

- La primera decisión de IA es **¿problema común o propio del negocio?** Si es
  común (imágenes, texto, audio, traducción), hay un servicio ya entrenado. Si
  hay que **generar** contenido nuevo, es **Bedrock**. Si requiere entrenar un
  modelo con datos propios, es **SageMaker AI**.
- **Transcribe y Polly se cruzan a propósito** en las opciones: Transcribe va
  de **audio a texto**, Polly de **texto a audio**. Fijate en qué dirección va
  el escenario antes de marcar. Lo mismo con **Rekognition** (qué hay en la
  imagen) y **Textract** (qué dice el documento).
- Ante **tiempo real, transmisión continua o "a medida que llega"**, la
  respuesta es **Kinesis**. Ante análisis histórico sobre lo ya guardado, es
  Athena o Redshift.
- **Athena consulta sobre S3 sin mover nada**; Redshift requiere cargar los
  datos en su almacén. Si el enunciado insiste en no mover ni transformar
  nada, es Athena.
- Los nombres son la mejor pista: casi todos estos servicios se llaman como lo
  que hacen. Si dudás entre dos, leé el nombre en voz alta antes de descartar.
