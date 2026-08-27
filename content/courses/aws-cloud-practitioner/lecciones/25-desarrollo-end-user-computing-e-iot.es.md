# 3.8b — Desarrollo, escritorios virtuales e IoT

> Dominio 3 · Task Statement 3.8 — Identify services from other in-scope AWS service categories

## 🤔 Antes de empezar

- Si cada vez que un programador termina un cambio hubiera que subirlo a mano al servidor, ¿qué podría salir mal?
- Si entra alguien nuevo a la empresa mañana y necesita una computadora configurada, ¿cuánto tardarías en dársela?
- Si tuvieras mil sensores repartidos por una ciudad, ¿cómo harías para que te manden lo que miden?

## 📘 Contenido

Esta lección cierra el recorrido por los servicios con tres familias que el
examen nombra aunque no profundice: las herramientas para **publicar
software**, los **escritorios virtuales** y el **internet de las cosas**.

### Publicar software sin romper nada

Acá está la primera pregunta. Subir cambios a mano es lento y, sobre todo,
propenso a errores: alguien se olvida un paso, o sube desde su computadora algo
que no era. La respuesta es automatizar el camino desde que el código se
escribe hasta que llega al usuario. A ese camino se lo llama **canalización**
(*pipeline*).

AWS tiene una familia de servicios para eso, y los nombres dicen bastante:

| Servicio | Qué hace |
|---|---|
| **AWS CodePipeline** | Ordena todos los pasos: construir, probar, publicar |
| **AWS CodeBuild** | Compila el código y corre las pruebas automáticas |
| **AWS CodeDeploy** | Instala la versión nueva en los servidores |
| **AWS CodeArtifact** | Guarda las bibliotecas de las que depende el proyecto |

AWS ofrece además **AWS Amplify** para el caso puntual de publicar sitios y
aplicaciones web o móviles: se conecta al repositorio de código y republica
solo cada vez que hay un cambio.

CodePipeline es el capataz que ordena la secuencia; los demás son los obreros
de cada etapa. Lo importante para el examen es reconocer que **son las
herramientas de publicar software automáticamente**, no el detalle de cada uno.

Se conectan naturalmente con la **infraestructura como código** de la lección
3.1: uno describe cómo debe quedar la infraestructura, el otro automatiza cómo
llega ahí el código.

El beneficio de fondo es el mismo que vimos con CloudFormation: **lo que está
escrito se repite igual siempre**. Un despliegue automatizado se comporta de la
misma manera un martes a la mañana que un viernes a las once de la noche, y
cuando algo falla se sabe exactamente en qué paso fue.

### Levantar una aplicación sin ocuparse de la infraestructura

**AWS Elastic Beanstalk** es un caso intermedio que conviene tener presente:
subís tu aplicación y él se encarga de crear los servidores, el balanceador de
carga y el escalado automático por debajo. Vos seguís teniendo acceso a todo
eso si querés tocarlo, pero no tuviste que armarlo.

Es la diferencia entre construir la casa y alquilarla amueblada, con la
posibilidad de cambiar los muebles si hace falta.

### Escritorios virtuales

Segunda pregunta del principio. Darle una computadora configurada a alguien
que entra mañana implica comprarla, instalarle todo y enviársela.

El **cómputo para el usuario final** le da la vuelta al problema: la
computadora vive en la nube y la persona se conecta a ella desde cualquier
dispositivo, incluso uno viejo.

- **Amazon WorkSpaces** es un escritorio virtual completo: la persona ve su
  escritorio de siempre, con sus programas, pero corriendo en AWS.
- **Amazon AppStream 2.0** entrega **una aplicación puntual** en vez del
  escritorio entero, a través del navegador.

Sirve sobre todo para trabajo remoto, para personal temporal y para casos donde
la información no debe salir del centro de datos: como todo corre en AWS, en la
computadora de la persona no queda nada guardado.

Ese último punto es el que más se pregunta. Si una empresa maneja información
delicada y quiere que sus empleados trabajen desde sus propias computadoras sin
que los datos terminen ahí, un escritorio virtual resuelve el problema: lo que
viaja es la imagen de la pantalla, no los archivos.

La distinción: **WorkSpaces = escritorio completo; AppStream = una aplicación
suelta.**

Conviene ubicarlo entre las opciones de cómputo del principio del módulo, que
van de más control a menos: **EC2** (armás todo), **Elastic Beanstalk** (subís
la aplicación y él arma la infraestructura), **Lambda** (ni siquiera hay
infraestructura visible). Beanstalk es el escalón del medio, y por eso aparece
cuando el escenario quiere comodidad **sin** renunciar a poder mirar por
debajo.

### Internet de las cosas

Tercera pregunta. **IoT** (*Internet of Things*, internet de las cosas) es el
mundo de los dispositivos físicos conectados: sensores, medidores, máquinas de
una fábrica.

**AWS IoT Core** es el servicio que permite que esos dispositivos se conecten a
AWS de forma segura y manden lo que miden, aunque sean miles y aunque la
conexión sea intermitente. El problema que resuelve no es solo recibir datos:
es hacerlo con dispositivos chicos, de poca batería, que aparecen y
desaparecen de la red, y verificando que cada uno sea realmente quien dice ser. Una vez que los datos llegan, se procesan con lo que
ya viste: **Kinesis** si llegan continuamente, **S3** para guardarlos,
**QuickSight** para graficarlos.

**En resumen:** para publicar software automáticamente está la familia Code
—CodePipeline ordenando los pasos, CodeBuild construyendo, CodeDeploy
instalando y CodeArtifact guardando las dependencias—, con Elastic Beanstalk
como atajo para levantar una aplicación sin armar la infraestructura a mano.
Para dar computadoras a distancia están WorkSpaces, que entrega un escritorio
completo, y AppStream, que entrega una sola aplicación. Y IoT Core conecta
dispositivos físicos con AWS.

## 💬 Ahora te toca a ti

**Pregunta:** Si cada vez que un programador termina un cambio hubiera que
subirlo a mano al servidor, ¿qué podría salir mal?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Bastante: alguien se saltea un paso, sube una versión
equivocada, se olvida de correr las pruebas, o lo hace distinto según quién
esté de turno. Automatizar ese camino —construir, probar, publicar— es el
trabajo de la familia **Code**: **CodePipeline** ordena la secuencia,
**CodeBuild** compila y prueba, **CodeDeploy** instala la versión nueva. Es la
misma lógica de la infraestructura como código: lo que está escrito se repite
igual siempre.

**Pregunta:** Si entra alguien nuevo a la empresa mañana y necesita una
computadora configurada, ¿cuánto tardarías en dársela?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Comprando e instalando, días o semanas. Con un
**escritorio virtual** son minutos: **Amazon WorkSpaces** entrega un escritorio
completo que corre en AWS y al que la persona se conecta desde cualquier
dispositivo. Si solo necesitara **un programa puntual** y no el escritorio
entero, **AppStream 2.0** lo entrega directamente por el navegador. Como todo
corre en AWS, además, en la computadora de la persona no queda información
guardada.

**Pregunta:** Si tuvieras mil sensores repartidos por una ciudad, ¿cómo harías
para que te manden lo que miden?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Necesitarías algo preparado para muchísimos
dispositivos chicos, con conexiones que se cortan y vuelven, y que además los
autentique para que nadie mande datos falsos. Eso es **AWS IoT Core**. Una vez
que la información llega a AWS, se procesa con lo que ya conocés: **Kinesis**
si hay que analizarla a medida que llega, **S3** para guardarla y
**QuickSight** para graficarla.

## 🎯 Pistas para el examen

- La familia **Code** se pregunta en bloque: si el escenario habla de
  **automatizar la publicación de software**, la respuesta está ahí.
  CodePipeline es el que **orquesta**; si el enunciado pide compilar y probar,
  es CodeBuild; si pide instalar en los servidores, CodeDeploy.
- **WorkSpaces vs. AppStream:** escritorio completo ⇒ WorkSpaces; una sola
  aplicación por navegador ⇒ AppStream 2.0.
- **Elastic Beanstalk** aparece cuando el escenario dice **"subir la aplicación
  sin administrar la infraestructura" pero conservando acceso a los recursos**.
  Si no quisieran ningún servidor en absoluto, sería Lambda.
- Ante **dispositivos, sensores o máquinas conectadas**, es **IoT Core**.
  Después de eso, el resto del recorrido lo hacen los servicios de datos que ya
  viste.
- Muchos de estos nombres se explican solos. Ante un servicio que no
  reconozcas, leé el nombre: en esta familia casi siempre describe la función.
