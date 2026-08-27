# 3.4 — Servicios de bases de datos

> Dominio 3 · Task Statement 3.4 — Identify AWS database services

## 🤔 Antes de empezar

- ¿Qué diferencia hay entre una planilla con columnas fijas y una caja donde cada papel tiene un formato distinto?
- Si una consulta a la base de datos se repite miles de veces por minuto y siempre da lo mismo, ¿tendría sentido recalcularla cada vez?
- Si tuvieras que mudar una base de datos de un edificio a otro sin cerrar el negocio, ¿cómo lo harías?

## 📘 Contenido

Una **base de datos** es donde una aplicación guarda la información de forma
organizada para volver a buscarla. AWS ofrece varias, y el examen no pide
saber usarlas: pide **reconocer cuál corresponde a cada situación**.

### Relacionales: la planilla con columnas fijas

Una base de datos **relacional** organiza la información en tablas con
columnas definidas de antemano: cada cliente tiene nombre, documento y correo,
todos igual. Es la planilla de contabilidad: rígida, pero perfecta cuando los
datos tienen siempre la misma forma y necesitás cruzarlos entre sí.

- **Amazon RDS** (*Relational Database Service*) es el servicio administrado
  para las bases relacionales de siempre: MySQL, PostgreSQL, SQL Server,
  Oracle, MariaDB. Como vimos en la lección 2.1, AWS se encarga del sistema
  operativo, los parches y las copias de seguridad; vos, de los datos y los
  accesos.
- **Amazon Aurora** es la base relacional propia de AWS, compatible con MySQL
  y PostgreSQL, pero bastante más rápida y con la información replicada
  automáticamente en varias Zonas de disponibilidad. Es la opción cuando hace
  falta más rendimiento y disponibilidad que las que da RDS estándar.

RDS tiene además dos funciones que se preguntan seguido y que suenan
parecidas pero resuelven problemas distintos:

- **Multi-AZ** mantiene una **copia de respaldo en otra Zona de
  disponibilidad**, lista para tomar el control sola si la principal falla.
  Es para **no caerse**, no para andar más rápido: la copia espera, no atiende
  consultas.
- Las **réplicas de lectura** son copias adicionales que **sí atienden
  consultas de lectura**, para repartir la carga cuando muchísima gente
  consulta a la vez. Es para **rendimiento**, no para disponibilidad.

La regla corta: **Multi-AZ = disponibilidad; réplicas de lectura =
rendimiento.**

### No relacionales: la caja donde cada papel es distinto

Ahora la otra mitad de la primera pregunta. A veces los datos **no tienen
todos la misma forma**: un producto tiene talles, otro tiene voltaje, otro
tiene páginas. Forzar eso en columnas fijas es incómodo.

**Amazon DynamoDB** es la base **no relacional** (o *NoSQL*) de AWS. Guarda
cada elemento con la estructura que tenga, y está pensada para responder en
milisegundos aunque haya millones de operaciones por segundo. Además es
**serverless**: no hay servidor que administrar ni tamaño que elegir.

La regla corta para el examen: **columnas fijas y relaciones ⇒ RDS o Aurora;
estructura flexible y escala enorme ⇒ DynamoDB.**

Que una sea "no relacional" no la vuelve mejor ni peor: resuelven problemas
distintos. Una tienda que necesita cruzar pedidos con clientes y facturas
está mejor con una relacional; un videojuego que guarda el progreso de
millones de jugadores, donde cada partida se busca por su identificador y
nada se cruza con nada, está mejor con DynamoDB.

### Caché: no recalcular lo mismo mil veces

Segunda pregunta del principio. Si diez mil personas piden la misma lista de
productos por minuto, ir a la base de datos cada vez es un desperdicio.

Una **caché** guarda las respuestas más pedidas en memoria, donde se leen
muchísimo más rápido. Es tener a mano el papel que consultás todo el día en
vez de ir al archivo cada vez.

**Amazon ElastiCache** es el servicio administrado de caché en memoria. Se usa
**delante** de la base de datos: si la respuesta ya está en la caché, se
devuelve al instante y la base ni se entera.

### Mudar una base de datos sin cerrar el negocio

Tercera pregunta. Cuando una empresa migra a AWS, casi siempre tiene que
mover su base de datos, y apagarla durante días no es opción.

- **AWS DMS** (*Database Migration Service*) copia la base de datos hacia AWS
  **mientras la original sigue funcionando**, y va sincronizando los cambios
  hasta el momento del corte. Es mudarte de casa sin dejar de vivir en ella.
- **AWS SCT** (*Schema Conversion Tool*) se usa cuando además hay que
  **cambiar de motor** —por ejemplo, de Oracle a PostgreSQL— y traduce la
  estructura de una a otra.

La distinción que el examen pregunta: **DMS mueve los datos; SCT traduce la
estructura cuando el motor de origen y el de destino son distintos.**

### Las opciones, una al lado de la otra

| Servicio | Qué es | Cuándo aparece |
|---|---|---|
| **RDS** | Base relacional administrada (MySQL, PostgreSQL…) | "Base tradicional, sin administrar el servidor" |
| **Aurora** | Relacional de AWS, más rápida y replicada | "Necesitamos más rendimiento y disponibilidad" |
| **DynamoDB** | No relacional, serverless, milisegundos | "Estructura flexible, escala enorme" |
| **ElastiCache** | Caché en memoria | "Las mismas consultas se repiten muchísimo" |
| **DMS** | Migrar bases de datos a AWS | "Mover sin apagar el sistema" |
| **SCT** | Convertir la estructura entre motores | "Pasar de Oracle a PostgreSQL" |

**En resumen:** para datos con columnas fijas se usan RDS o Aurora, siendo
Aurora la opción de más rendimiento y disponibilidad. Para datos de estructura
flexible y escala muy grande, DynamoDB, que además es serverless. ElastiCache
guarda en memoria las respuestas que se repiten para no recalcularlas. Y para
migrar, DMS mueve los datos sin apagar el sistema, con SCT al lado cuando hay
que cambiar de motor.

## 💬 Ahora te toca a ti

**Pregunta:** ¿Qué diferencia hay entre una planilla con columnas fijas y una
caja donde cada papel tiene un formato distinto?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** La planilla obliga a que todo tenga la misma forma, lo
que la vuelve ideal para cruzar información entre tablas; la caja acepta
cualquier formato y es más cómoda cuando cada elemento es distinto. En AWS la
planilla son las bases **relacionales** —**RDS**, o **Aurora** si hace falta
más rendimiento— y la caja es **DynamoDB**, la base **no relacional**, pensada
además para escalas enormes y sin servidor que administrar.

**Pregunta:** Si una consulta a la base de datos se repite miles de veces por
minuto y siempre da lo mismo, ¿tendría sentido recalcularla cada vez?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** No: sería trabajo repetido y además hace más lenta la
respuesta. Conviene guardar el resultado en una **caché**, que lo mantiene en
memoria y lo devuelve al instante. En AWS ese servicio es **Amazon
ElastiCache**, y se coloca delante de la base de datos: si la respuesta ya
está guardada, la base ni se entera de la consulta.

**Pregunta:** Si tuvieras que mudar una base de datos de un edificio a otro
sin cerrar el negocio, ¿cómo lo harías?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Copiando todo al destino mientras el original sigue
trabajando, y sincronizando los cambios hasta el momento de hacer el cambio
definitivo. Eso hace **AWS DMS**. Si además el destino usa un motor distinto
al del origen —por ejemplo, pasar de Oracle a PostgreSQL— hace falta también
**AWS SCT**, que traduce la estructura de una tecnología a la otra.

## 🎯 Pistas para el examen

- La primera decisión siempre es **relacional o no relacional**. Si el
  escenario habla de tablas, columnas fijas o relaciones entre datos, es RDS o
  Aurora. Si habla de estructura variable, milisegundos o escala masiva, es
  DynamoDB.
- **RDS vs. Aurora:** si el enunciado pide más rendimiento, replicación
  automática o mayor disponibilidad y no menciona un motor puntual poco común,
  la respuesta suele ser Aurora.
- Ante **consultas repetidas, alta latencia de lectura o "aliviar la carga de
  la base"**, la respuesta es **ElastiCache**. Es el único de la lista que no
  es una base de datos sino un acelerador delante de una.
- **DMS y SCT vienen en par pero no son intercambiables:** DMS mueve datos,
  SCT convierte la estructura. Si el escenario cambia de motor, hacen falta
  los dos; si no, alcanza con DMS.
- **DynamoDB es serverless**; RDS y Aurora no. Si una opción propone elegir el
  tamaño del servidor de DynamoDB, desconfiá.
