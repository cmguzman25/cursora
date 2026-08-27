# ★ 3.9 — Tablas comparativas: tecnología y servicios

> Dominio 3 · Cierre de módulo — repaso comparativo

## 🤔 Antes de empezar

- Sin volver atrás, ¿podrías decir en una frase cuándo conviene Lambda y cuándo EC2?
- Si te dieran los nombres S3, EBS y EFS, ¿sabrías cuál va con "muchos servidores sobre la misma carpeta"?
- Entre SQS y SNS, ¿cuál usarías para avisarle lo mismo a cinco sistemas a la vez?

## 📘 Contenido

Esta lección no trae contenido nuevo: es un repaso de las lecciones 3.1 a
3.8b puesto en tablas. Este es el módulo con más nombres de todo el curso, y
el examen los mezcla entre sí — casi ninguna pregunta ofrece una opción
absurda, ofrece cuatro servicios reales parecidos.

### Cómputo: cuánto te querés ocupar

| | EC2 | Contenedores (ECS/EKS) | Fargate | Lambda |
|---|---|---|---|---|
| Qué te da | Un servidor completo | Contenedores orquestados | Contenedores sin servidores | Una función suelta |
| Vos administrás | Todo lo de adentro | El contenedor | Casi nada | Solo tu código |
| Se paga por | Tiempo encendido | Recursos usados | Lo que consume | Ejecuciones y duración |
| Señal en el examen | "Control total del sistema operativo" | "Ya usamos contenedores" | "Contenedores sin administrar" | "Sin servidores, pagar por uso" |

**ECS vs. EKS:** si nombra Kubernetes, es EKS. Si no, ECS.

### Infraestructura global

| | Región | Zona de disponibilidad | Ubicación de borde |
|---|---|---|---|
| Qué es | Zona geográfica del mundo | Centros de datos aislados dentro de una Región | Punto de presencia cerca del usuario |
| Sirve para | Elegir dónde viven los datos | Que una falla no tire el servicio | Entregar contenido rápido |
| Cuántas | Decenas | Varias por Región | Cientos |

**Alta disponibilidad ⇒ varias Zonas de disponibilidad.** Latencia de usuarios
lejanos ⇒ ubicaciones de borde.

### Almacenamiento: los tres tipos

| | S3 (objetos) | EBS (bloques) | EFS / FSx (archivos) |
|---|---|---|---|
| Qué guarda | Archivos completos | El disco de una instancia | Una carpeta compartida |
| Cuántos lo usan | Muchos, desde cualquier lado | Normalmente uno | Muchos servidores a la vez |
| Alcance | Regional | Una Zona de disponibilidad | Varias Zonas |

**EBS es persistente; instance store es efímero.** **EFS es Linux; FSx es
Windows.** Y para abaratar según antigüedad, política de ciclo de vida.

### Bases de datos

| Servicio | Cuándo |
|---|---|
| **RDS** | Datos con columnas fijas, base tradicional administrada |
| **Aurora** | Lo mismo, pero con más rendimiento y disponibilidad |
| **DynamoDB** | Estructura flexible, escala enorme, serverless |
| **ElastiCache** | Las mismas consultas se repiten muchísimo |
| **Redshift** | Analizar volúmenes enormes con consultas complejas |
| **DMS / SCT** | Migrar una base a AWS / convertirla a otro motor |

**Multi-AZ = disponibilidad; réplicas de lectura = rendimiento.** Se parecen y
el examen las cruza.

### Red: los dos guardias y las dos conexiones

| | Security group | NACL |
|---|---|---|
| Protege | Un recurso | Una subred entera |
| ¿Puede negar? | No, solo permite | Sí |
| ¿Recuerda la conexión? | Sí | No |

| | Site-to-Site VPN | Direct Connect |
|---|---|---|
| Por dónde va | Internet | Un cable dedicado |
| Rendimiento | Variable | Constante y previsible |
| Activación | Minutos, barato | Semanas, caro |

**Route 53 resuelve a qué dirección ir; CloudFront, desde dónde se entrega el
contenido.**

### Mensajería: buzón o cartelera

| | SQS | SNS | EventBridge |
|---|---|---|---|
| Analogía | Un buzón | Una cartelera | El sistema nervioso |
| Lo recibe | **Un** consumidor | **Todos** los suscriptos | Quien se suscribió a ese evento |
| Sirve para | Repartir tareas y absorber picos | Notificar que algo pasó | Encadenar reacciones entre servicios |

**Y ojo con SNS vs. SES:** SNS notifica que algo pasó; SES manda correo de
verdad a tus clientes.

### IA: ya hecho, generado o entrenado por vos

| | Ejemplos | Cuándo |
|---|---|---|
| **Servicios ya entrenados** | Rekognition, Textract, Comprehend, Transcribe, Polly, Translate, Lex, Kendra | El problema es común |
| **IA generativa** | Bedrock, Amazon Q | Hay que **crear** contenido nuevo |
| **Modelo propio** | SageMaker AI | El problema es específico de tu negocio |

Los dos pares que el examen cruza: **Transcribe (audio→texto) contra Polly
(texto→audio)**, y **Rekognition (qué hay en la imagen) contra Textract (qué
dice el documento)**.

### Analítica

| Servicio | Qué hace |
|---|---|
| **Athena** | Consulta los archivos de S3 sin moverlos |
| **Glue** | Prepara y limpia los datos |
| **QuickSight** | Arma los tableros y gráficos |
| **Redshift** | Almacén para consultas complejas y grandes volúmenes |
| **Kinesis** | Procesa datos a medida que llegan |

**En resumen:** en cómputo, la escala va de EC2 (control total) a Lambda (nada
que administrar). En almacenamiento, la pregunta es cuántos acceden a la vez.
En bases de datos, primero decidís relacional o no relacional. En red,
security group protege un recurso y NACL una subred. En mensajería, SQS
reparte tareas de a una y SNS avisa a todos. Y en IA, si el problema es común
hay un servicio ya hecho, si hay que generar contenido es Bedrock, y si es
propio de tu negocio, SageMaker AI.

## 💬 Ahora te toca a ti

**Pregunta:** Sin volver atrás, ¿podrías decir en una frase cuándo conviene
Lambda y cuándo EC2?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** **Lambda** cuando la tarea es corta, se dispara de vez
en cuando y no querés administrar nada — si nadie la usa, no pagás. **EC2**
cuando necesitás control del sistema operativo, instalar software propio, o el
proceso corre de forma continua durante horas. La pregunta que los separa es
cuánto control necesitás y cuánto trabajo estás dispuesto a asumir.

**Pregunta:** Si te dieran los nombres S3, EBS y EFS, ¿sabrías cuál va con
"muchos servidores sobre la misma carpeta"?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** **EFS**, que es el almacenamiento de archivos: una
carpeta compartida que muchos servidores montan a la vez, y accesible desde
varias Zonas de disponibilidad. **EBS** no serviría porque es el disco de una
instancia puntual, y **S3** guarda archivos completos como objetos, no una
carpeta que se monte. Si el escenario dijera Windows en vez de Linux, sería
**FSx**.

**Pregunta:** Entre SQS y SNS, ¿cuál usarías para avisarle lo mismo a cinco
sistemas a la vez?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** **SNS**, porque es la cartelera: publicás una vez y
**todos los suscriptos** reciben el aviso. **SQS** es el buzón, donde cada
mensaje lo retira **un solo** consumidor y después desaparece — sirve para
repartir tareas, no para avisarle a varios de lo mismo.

## 🎯 Pistas para el examen

- Ubicá primero **de qué familia es la pregunta** (cómputo, almacenamiento,
  base de datos, red, mensajería, IA) y recién después compará opciones. En
  este módulo, saber la familia ya descarta la mitad.
- Los cinco pares que más se cruzan: **SQS/SNS**, **security group/NACL**,
  **EFS/FSx**, **Transcribe/Polly** y **Multi-AZ / réplicas de lectura**. Si
  dominás esos cinco, cubrís buena parte del dominio.
- Muchas preguntas se resuelven con **una sola palabra del enunciado**:
  "Kubernetes" ⇒ EKS, "Windows" ⇒ FSx, "sin servidores" ⇒ Lambda, "tiempo
  real" ⇒ Kinesis, "varias cuentas" ⇒ el servicio centralizador.
- Estas tablas son un resumen para repasar rápido, no la fuente de verdad. Si
  una fila no te cierra, volvé a la lección original antes de memorizarla.
- Practicá diciendo en voz alta qué hace cada servicio y en qué se diferencia
  del de al lado. Si podés explicarlo, lo reconocés en el examen.
