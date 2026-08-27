# 3.3 — Servicios de cómputo

> Dominio 3 · Task Statement 3.3 — Identify AWS compute services

## 🤔 Antes de empezar

- Si necesitás un lugar donde correr un programa, ¿te conviene siempre alquilar una computadora entera?
- ¿Qué pasaría si tu sitio recibe cien visitas un día y cien mil al siguiente?
- Si un programa tuyo se ejecuta dos segundos por día, ¿tendría sentido pagar un servidor encendido las veinticuatro horas?

## 📘 Contenido

**Cómputo** es simplemente "dónde corre tu programa". AWS ofrece varias
formas, y la diferencia entre ellas es **cuánto te tenés que ocupar vos**.
Cuanto más abajo bajás en esta lección, menos trabajo tuyo y menos control.

### EC2: la computadora alquilada

**Amazon EC2** (*Elastic Compute Cloud*) te da un servidor virtual: una
computadora en la nube que encendés, apagás y administrás como si fuera
tuya. Vos elegís el sistema operativo, instalás lo que quieras y sos
responsable de mantenerlo — como vimos en el modelo de responsabilidad
compartida.

Es alquilar un departamento vacío: total libertad para amueblarlo, pero todo
lo de adentro es tu problema.

A cada servidor se lo llama **instancia**, y hay familias pensadas para
distintos trabajos: algunas con mucho procesador, otras con mucha memoria,
otras con mucho almacenamiento rápido. Elegir el tamaño adecuado es el
*rightsizing* que vimos en la lección 1.4.

**Se paga por el tiempo que la instancia está encendida**, la use alguien o no.

### Contenedores: la caja con todo adentro

Un problema clásico: un programa funciona en la computadora del programador y
falla en el servidor, porque alguna versión no coincide.

Un **contenedor** empaqueta el programa **junto con todo lo que necesita para
correr**. Es la caja de mudanza rotulada: lo que entró es exactamente lo que
sale, no importa dónde la abras. Los contenedores arrancan en segundos y
pesan mucho menos que una computadora entera.

¿Por qué no usar siempre una instancia EC2 entonces? Porque una instancia
incluye un sistema operativo completo: tarda minutos en arrancar y ocupa
bastante. Un contenedor comparte el sistema operativo del servidor donde
corre, así que en la misma máquina entran muchos más y arrancan casi al
instante. Eso importa cuando hay que crecer rápido ante un pico de demanda.

Cuando hay muchos contenedores hace falta alguien que decida en qué servidor
va cada uno, los reinicie si se caen y sume más cuando la demanda sube. A eso
se lo llama **orquestar**, y AWS ofrece dos servicios que lo hacen:

- **Amazon ECS** (*Elastic Container Service*): la forma de AWS de manejar
  contenedores. Más simple si arrancás de cero.
- **Amazon EKS** (*Elastic Kubernetes Service*): lo mismo, pero usando
  Kubernetes, un estándar de la industria. La opción de quien ya trabaja con
  Kubernetes y quiere seguir haciéndolo.

### Serverless: pagar solo cuando se usa

Acá está la tercera pregunta del principio: un programa que corre dos
segundos por día.

**AWS Lambda** te deja subir una función y ejecutarla **solo cuando algo la
dispara** — alguien sube un archivo, llega un pedido, se cumple un horario.
No hay servidor que encender ni apagar, y **si nadie la usa, no pagás nada**.
Se cobra por la cantidad de ejecuciones y el tiempo que tardan.

"Serverless" ("sin servidores") no significa que no haya servidores: significa
que **no son tu problema**. Es la diferencia entre tener auto propio y pedir
un viaje cuando lo necesitás.

Su límite: Lambda está pensado para tareas que **empiezan y terminan
rápido**. Para algo que corre durante horas sin parar, conviene EC2 o
contenedores.

Existe también **AWS Fargate**, que corre contenedores sin que tengas que
administrar los servidores por debajo — serverless, pero para contenedores.

### Que crezca y se achique solo

Segunda pregunta del principio: cien visitas hoy, cien mil mañana.

- **Auto Scaling** agrega instancias cuando la demanda sube y las quita
  cuando baja. Es la elasticidad de la lección 1.1, hecha realidad: se
  contratan meseros extra el día que el restaurante se llena.
- Un **balanceador de carga** (*Elastic Load Balancing*) reparte las visitas
  entre todas esas instancias, para que ninguna quede saturada mientras otra
  descansa. Es el anfitrión que distribuye la gente entre las mesas libres.

Los dos van juntos: Auto Scaling pone y saca servidores, el balanceador
reparte el tráfico entre los que hay. Y como el balanceador puede repartir
entre **varias Zonas de disponibilidad**, es también la pieza que sostiene la
alta disponibilidad de la lección anterior.

### Las opciones, una al lado de la otra

| Servicio | Qué te da | Cuánto administrás | Se paga por |
|---|---|---|---|
| **EC2** | Un servidor virtual completo | Todo lo de adentro | Tiempo encendido |
| **ECS / EKS** | Orquestación de contenedores | Menos: solo el contenedor | Los recursos que usan |
| **Fargate** | Contenedores sin administrar servidores | Casi nada | Lo que consume el contenedor |
| **Lambda** | Ejecutar una función suelta | Solo tu código | Ejecuciones y su duración |

**En resumen:** EC2 te da un servidor virtual completo y pagás mientras esté
encendido. Los contenedores empaquetan el programa con todo lo que necesita y
se organizan con ECS o EKS —o con Fargate, si no querés administrar los
servidores—. Lambda ejecuta funciones sueltas solo cuando algo las dispara y
no cobra si nadie las usa. Y Auto Scaling junto con el balanceador de carga
hacen que la capacidad suba y baje sola repartiendo el tráfico.

## 💬 Ahora te toca a ti

**Pregunta:** Si necesitás un lugar donde correr un programa, ¿te conviene
siempre alquilar una computadora entera?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No siempre. Alquilar la computadora entera es **EC2**,
y te da control total, pero también te deja a cargo del sistema operativo y de
todo lo que instales. Si tu programa cabe en una caja autocontenida, un
**contenedor** alcanza; y si es una tarea corta que se dispara de vez en
cuando, **Lambda** es mejor todavía porque no hay nada que administrar. La
pregunta útil es cuánto control necesitás y cuánto trabajo estás dispuesto a
asumir.

**Pregunta:** ¿Qué pasaría si tu sitio recibe cien visitas un día y cien mil
al siguiente?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Con una sola instancia fija, el día de cien mil se
caería, y el día de cien estarías pagando capacidad ociosa. La solución son
dos piezas que trabajan juntas: **Auto Scaling**, que agrega instancias cuando
la demanda sube y las quita cuando baja, y un **balanceador de carga**, que
reparte las visitas entre las instancias que haya en ese momento. Eso es la
elasticidad del Módulo 1 puesta en práctica.

**Pregunta:** Si un programa tuyo se ejecuta dos segundos por día, ¿tendría
sentido pagar un servidor encendido las veinticuatro horas?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No: estarías pagando 24 horas para usar 2 segundos.
Ese es el caso donde brilla **AWS Lambda**: subís la función, se ejecuta
cuando algo la dispara, y **si nadie la usa no pagás nada**. Se cobra por
ejecución y por el tiempo que tarda. Eso sí, Lambda es para tareas que
empiezan y terminan rápido; si el proceso corriera durante horas, convendría
EC2 o contenedores.

## 🎯 Pistas para el examen

- Si el escenario dice que **no quieren administrar servidores** o que **solo
  quieren pagar cuando el código se ejecuta**, la respuesta es **Lambda**. Las
  palabras "serverless" y "sin administrar infraestructura" son la señal.
- Si necesitan **control total del sistema operativo** o instalar software
  propio, es **EC2**. Cualquier opción serverless queda descartada ahí.
- **Auto Scaling y balanceador de carga se preguntan como par.** Auto Scaling
  ajusta *cuántos* servidores hay; el balanceador decide *a cuál* va cada
  visita. Si una opción los intercambia, es incorrecta.
- **ECS vs. EKS:** si el enunciado menciona Kubernetes, es EKS; si no lo
  menciona, ECS alcanza. Es la única diferencia que el examen pide a este
  nivel.
- Ojo con Lambda y las tareas largas: si el escenario habla de un proceso que
  corre horas o de forma continua, Lambda deja de ser la respuesta.
