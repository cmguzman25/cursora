# 5.1 — Repaso rápido por dominio

> Módulo 5 · Repaso final y simulacro

## 🤔 Antes de empezar

- ¿Cuál de los cuatro dominios sentís que llevás más flojo, y en qué te basás para decirlo?
- Si tuvieras que explicar en una sola frase qué asegura AWS y qué asegurás vos, ¿qué diría esa frase?
- Cuando una pregunta te deja con dos opciones que las dos parecen correctas, ¿qué hacés para desempatar?

## 📘 Contenido

Esta lección no resume el curso: eso ya lo hacen las cuatro lecciones de tablas
comparativas. Acá va algo distinto y más corto: **los pares que de verdad se
confunden**, con la frase que los separa. Son los lugares donde se pierden
puntos sabiendo el tema.

Antes de empezar, el mapa de pesos, porque decide dónde conviene gastar el
repaso:

| Dominio | Peso | Preguntas aproximadas de 65 |
|---|---|---|
| 1. Conceptos de la nube | 24 % | ~16 |
| 2. Seguridad y cumplimiento | 30 % | ~19 |
| 3. Tecnología y servicios | 34 % | ~22 |
| 4. Facturación, precios y soporte | 12 % | ~8 |

Seguridad y Tecnología juntos son casi dos tercios del examen.

### Dominio 1 — Los tres listados que se mezclan

El error más común de este dominio no es confundir conceptos: es confundir
**marcos**. Hay tres listas distintas y dos tienen seis elementos cada una.

| Marco | Cuántos | Responde a | Señal en el examen |
|---|---|---|---|
| **Well-Architected** | 6 pilares | ¿Está bien diseñada esta arquitectura? | "Buenas prácticas", "pilar" |
| **Cloud Adoption Framework** | 6 perspectivas | ¿Está lista la **organización** para migrar? | "Personas", "gobierno", "preparación" |
| **Estrategias de migración** | 6 R | ¿Qué hago con **esta** aplicación? | Nombre de una app concreta |

La regla corta: si la pregunta habla de **personas, procesos o gobierno**, es
CAF. Si habla de **cómo está construido el sistema**, es Well-Architected. Si
habla de **una aplicación que hay que mudar**, son las 6 R.

Y los dos que se dicen casi igual pero no son lo mismo:

- **Economía de escala** es por qué AWS puede cobrar más barato que tu centro de
  datos: compra para millones de clientes. No depende de lo que hagas vos.
- **Elasticidad** es que tus recursos suben y bajan con la demanda. Sí depende de
  cómo diseñaste.

### Dominio 2 — La frontera, y los que detectan

La responsabilidad compartida se resume en una frase: **AWS asegura la nube, vos
asegurás lo que ponés en la nube.** Pero la frontera se mueve según el servicio,
y ahí está la pregunta de examen:

| | ¿Quién parchea el sistema operativo? |
|---|---|
| **EC2** | **Vos.** AWS solo da el hardware y el hipervisor |
| **RDS** | **AWS.** Vos manejás usuarios de la base y qué datos entran |
| **Lambda** | **AWS.** Vos solo sos responsable de tu código y sus permisos |

Lo que **nunca** deja de ser tuyo, en cualquier servicio: tus datos, quién tiene
acceso y cómo clasificás la información.

Ahora el bloque que más cae, y el que más se mezcla. Seis servicios que parecen
hacer lo mismo. La diferencia es **qué pregunta responde cada uno**:

| Servicio | La pregunta que responde |
|---|---|
| **GuardDuty** | ¿Hay alguien atacándome ahora? |
| **Inspector** | ¿Mis EC2 y mis contenedores tienen vulnerabilidades conocidas? |
| **Macie** | ¿Hay datos sensibles en mis buckets de S3? |
| **CloudTrail** | ¿**Quién** hizo qué, y cuándo? |
| **Config** | ¿**Cómo** cambió esta configuración con el tiempo? |
| **CloudWatch** | ¿**Cómo viene funcionando** esto? |

Los tres últimos son el trío clásico: CloudTrail es el registro de **quién**,
Config es el historial de **cómo estaba configurado**, CloudWatch son las
**métricas y los logs**. Si el enunciado dice *auditoría* o *quién borró esto*,
es CloudTrail.

Dos pares más de este dominio:

- **Shield vs. WAF**: Shield para ataques de **volumen** (denegación de
  servicio); WAF para tráfico **malicioso en la aplicación** (inyección SQL,
  scripts). Shield Standard es gratis y automático; Advanced se paga.
- **KMS vs. CloudHSM vs. Secrets Manager**: KMS administra **claves de cifrado**
  compartiendo hardware; CloudHSM es hardware **dedicado** para vos, y aparece
  cuando el enunciado menciona una normativa que lo exige; Secrets Manager
  guarda **contraseñas y credenciales**, y las rota.

Y en identidad, los cuatro objetos de IAM en una línea: el **usuario** es una
persona o aplicación, el **grupo** junta usuarios, la **política** dice qué se
puede hacer, y el **rol** es un permiso que se **asume temporalmente**, sin
contraseña. Cuando una pregunta dice que una instancia EC2 necesita acceder a
S3, la respuesta es un **rol**, nunca una clave guardada en el código.

### Dominio 3 — Elegir entre parientes

Este dominio no pregunta definiciones: pregunta **cuál de estos cuatro**. La
clave está casi siempre en una palabra del enunciado.

| Si el enunciado dice | La respuesta suele ser |
|---|---|
| "Sin administrar servidores", "por evento", "menos de 15 minutos" | **Lambda** |
| "Contenedores sin administrar servidores" | **Fargate** |
| "Subir el código y que AWS se encargue" | **Elastic Beanstalk** |
| "Control total del sistema operativo" | **EC2** |

En almacenamiento, la distinción es la forma de acceso, no el tamaño:

| | Qué es | Se conecta a |
|---|---|---|
| **S3** | Objetos, por internet | Cualquier cosa, desde cualquier lado |
| **EBS** | Un disco | **Una** instancia a la vez, en **una** zona |
| **EFS** | Un sistema de archivos compartido | **Muchas** instancias Linux a la vez |
| **Instance Store** | Disco físico de la máquina | Se **borra** al apagar la instancia |

En bases de datos: **RDS** es relacional administrada; **Aurora** es RDS más
rápida y compatible con MySQL y PostgreSQL; **DynamoDB** es clave-valor sin
esquema y a escala de milisegundos; **ElastiCache** es memoria para acelerar
consultas repetidas; **Redshift** es para analítica sobre grandes volúmenes. Si
dice *data warehouse* o *informes históricos*, es Redshift. Si dice
*milisegundos de un dígito*, es DynamoDB.

En red, el par que siempre cae:

| | Security Group | Network ACL |
|---|---|---|
| Protege | Una instancia | Una subred entera |
| Reglas | Solo permitir | Permitir **y denegar** |
| Memoria | **Con estado**: la respuesta vuelve sola | **Sin estado**: hay que permitir ida y vuelta |

Y los servicios de inteligencia artificial se recuerdan por el **verbo**, no por
el nombre: Rekognition mira **imágenes**, Transcribe pasa **audio a texto**,
Polly pasa **texto a audio**, Translate traduce, Comprehend entiende
**sentimiento**, Textract extrae de **documentos**, Lex arma **chatbots**,
SageMaker es para construir **tus propios modelos**.

### Dominio 4 — Tres cortes y listo

El dominio más chico y el más rentable. Casi todo se resuelve con tres cortes:

- **Precios:** ¿acepta compromiso? → ¿se puede interrumpir? → ¿necesita hardware
  propio? Sin compromiso es On-Demand; interrumpible es Spot; con compromiso y
  flexibilidad, Savings Plans.
- **Costos:** Pricing Calculator **estima** antes, Budgets **avisa** mientras,
  Cost Explorer **explica** después.
- **Soporte:** producción con 24/7 arranca en **Business**; el asesor técnico
  designado solo existe en **Enterprise**.

### Cómo usar este repaso antes del simulacro

Tres pasos, en este orden:

1. Elegí el dominio que marcaste como más flojo en la primera pregunta.
2. Tapá la columna derecha de sus tablas y respondé en voz alta. Lo que no
   puedas decir con tus palabras, no lo sabés todavía.
3. Volvé a la lección original de lo que falló. Recién después, el simulacro.

Hacer el simulacro antes de este repaso desperdicia el simulacro: vas a fallar
por cosas que ya sabías y no vas a aprender nada nuevo del resultado.

**En resumen:** los puntos que se pierden sabiendo el tema están casi siempre en
cuatro lugares: confundir los tres marcos del dominio 1, mover la frontera de la
responsabilidad compartida, mezclar los servicios que detectan, y elegir mal
entre dos parientes del dominio 3. Si llegás al examen con esos cuatro
resueltos, el resto es leer con cuidado.

## 💬 Ahora te toca a ti

**Pregunta:** ¿Cuál de los cuatro dominios sentís que llevás más flojo, y en qué
te basás para decirlo?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No hay respuesta correcta, pero sí hay una forma pobre de
contestarla: "seguridad, porque me parece difícil". Una buena respuesta se apoya
en algo observable — qué tablas seguís sin poder recitar, o en qué preguntas de
los módulos 1 a 4 fallaste. Si no tenés ese dato, el simulacro de la próxima
lección te lo va a dar desglosado por dominio.

**Pregunta:** Si tuvieras que explicar en una sola frase qué asegura AWS y qué
asegurás vos, ¿qué diría esa frase?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** **AWS asegura la nube; vos asegurás lo que ponés en la
nube.** AWS se encarga de lo físico y de la infraestructura que no ves: centros
de datos, hardware, red, hipervisor. Vos te encargás de tus datos, de quién
tiene acceso y de la configuración de lo que levantás. Lo que mueve la frontera
es cuánto administra AWS del servicio: en EC2 el sistema operativo es tuyo, en
RDS y en Lambda es de AWS.

**Pregunta:** Cuando una pregunta te deja con dos opciones que las dos parecen
correctas, ¿qué hacés para desempatar?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Volver al enunciado a buscar **la palabra que decide**.
Cuando dos opciones son técnicamente posibles, el enunciado siempre tiene un
calificativo que elige una: *más económico*, *mínimo esfuerzo operativo*,
*interrumpible*, *sin administrar servidores*, *requisito de cumplimiento*. Las
dos opciones resuelven el problema; solo una resuelve **ese** requisito. Elegir
por intuición en ese punto es tirar una moneda cuando la respuesta estaba
escrita.

## 🎯 Pistas para el examen

- Repasar por dominio es mejor que repasar por lección, porque el examen te va a
  preguntar mezclado. Si solo repasaste en el orden del curso, vas a reconocer
  los temas por contexto y en el examen no hay contexto.
- Cuando dos servicios te suenen parecidos, no busques más detalles de cada uno:
  buscá **la pregunta que responde cada uno**. Una frase bien elegida separa seis
  servicios que diez datos sueltos no separan.
- Si una tabla de esta lección no te cierra, volvé a la lección original antes de
  memorizarla. Memorizar una fila que no entendés funciona hasta que el examen la
  dice con otras palabras.
- Dedicá el repaso en proporción al peso: Seguridad y Tecnología son casi dos
  tercios de las preguntas. Dominio 4 es corto y rinde, así que conviene
  asegurarlo entero.
- Usá el simulacro como diagnóstico, no como nota. El número importa menos que
  el desglose por dominio, que es lo que te dice adónde volver.
