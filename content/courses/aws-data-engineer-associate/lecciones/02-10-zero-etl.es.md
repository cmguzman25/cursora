# 2.10 — Integraciones zero-ETL: cuando el pipeline desaparece

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 9 min de lectura

## 🤔 Antes de empezar

- Si AWS pudiera replicar automáticamente una base operativa hacia un almacén
  analítico, ¿qué parte de tu trabajo dejaría de existir?
- ¿Qué crees que se pierde cuando una integración automática sustituye a un
  pipeline que tú controlas?
- Un enunciado pide llevar datos de una base a un almacén analítico "con el menor
  esfuerzo operativo posible". ¿Qué deberías comprobar antes de elegir?

## 📘 Contenido

Durante años, llevar los datos de una base operativa a un almacén analítico exigía
construir un pipeline: capturar cambios, transformarlos, cargarlos, orquestarlo
todo y vigilar que no se rompiera.

Las **integraciones zero-ETL** eliminan ese trabajo. Se configura una integración
entre un origen y un destino, y AWS **crea y mantiene la replicación**: carga
inicial, cambios continuos, recuperación ante errores y supervisión. No hay
pipeline que construir ni que operar.

Es una de las incorporaciones recientes al temario y aparece con fuerza, porque
encaja con la condición de optimización favorita del examen: **least operational
overhead**.

### Qué orígenes admite hacia Amazon Redshift

La lista es más amplia de lo que muchos esperan:

- **Amazon Aurora MySQL** y **Aurora PostgreSQL**
- **Amazon RDS** para **MySQL**, **PostgreSQL** y **Oracle**
- **Amazon DynamoDB**
- Bases **autogestionadas**: MySQL, PostgreSQL, SQL Server y Oracle
- **Aplicaciones SaaS**: Salesforce, SAP, ServiceNow, Zendesk y varias
  plataformas de anuncios

*(Lista vigente; AWS añade orígenes con frecuencia y conviene contrastarla con la
documentación.)*

Que DynamoDB esté en la lista importa: es la alternativa sin pipeline al patrón de
la lección 2.8 cuando el destino es Redshift.

### Cómo funciona

El modelo tiene tres piezas con nombre propio, y el examen las usa:

- La **base de datos de origen**, desde donde se replica.
- El **almacén de destino**: un clúster de Redshift o un grupo de trabajo de
  Redshift Serverless.
- La **base de datos de destino**, que se crea en ese almacén a partir de la
  integración y donde aparecen los datos replicados.

Tras una **carga inicial**, la integración replica los cambios de forma continua.
Los datos quedan disponibles en Redshift **casi en tiempo real**, y desde ahí se
pueden usar todas sus capacidades: vistas materializadas, compartición de datos y
consultas junto a otras fuentes.

Un detalle útil: existe un **modo histórico** (*history mode*) que conserva las
versiones anteriores de cada fila en lugar de solo el estado actual, lo que
permite análisis de evolución sin construir nada.

Y algo que conviene tener presente: la integración **no detiene ni interfiere** con
la base de origen. Se puede seguir escribiendo y consultando mientras Redshift
recibe los datos.

### Qué se gana y qué se pierde

Esta es la respuesta a la segunda pregunta de activación, y es donde el examen
construye sus distractores.

**Se gana:** no hay código, no hay orquestación, no hay instancias que
dimensionar, no hay fallos de pipeline que diagnosticar, y la latencia baja de
horas a minutos.

**Se pierde control:**

- **No hay transformación por el camino.** Los datos llegan tal como están en el
  origen. Limpiar, unir con otras fuentes o aplicar reglas de negocio exige hacerlo
  **después**, dentro de Redshift.
- **El destino está fijado.** La integración replica a Redshift, no a un data lake
  arbitrario ni a un motor cualquiera.
- **El origen y el destino deben estar soportados.** Fuera de la lista, no hay
  integración.
- **Hay límites y consideraciones** de tipos de datos y objetos que no se replican,
  que dependen del motor de origen.

De ahí la regla de decisión más útil de esta lección:

> Si el escenario pide **replicar tal cual** desde un origen soportado a Redshift,
> zero-ETL gana por esfuerzo operativo. Si pide **transformar durante el trayecto**
> o un destino distinto, hace falta un pipeline.

### Zero-ETL frente a DMS

Es la comparación directa que el examen plantea:

| | **Zero-ETL** | **AWS DMS** |
|---|---|---|
| Esfuerzo operativo | Mínimo: se configura y ya | Hay que dimensionar y operar la replicación |
| Orígenes | Lista cerrada | Amplia, incluida cualquier base local compatible |
| Destinos | Redshift | S3, Redshift, DynamoDB, OpenSearch, bases relacionales |
| Transformación | No | Reglas simples de selección y renombrado |
| Migración puntual | No es su caso | Sí, es su caso original |
| Conversión de esquema | No aplica | Requiere SCT para motores distintos |

Traducido a decisiones: **origen soportado y destino Redshift, zero-ETL**;
**destino S3, motores exóticos o migración con conversión de esquema, DMS**.

### Otras integraciones sin pipeline

El patrón se ha extendido más allá de Redshift, y conviene reconocer dos casos:

- **DynamoDB con Amazon OpenSearch Service**, para hacer búsqueda de texto sobre
  los datos de una tabla sin construir el índice a mano.
- Las integraciones de **aplicaciones SaaS** a través de AWS Glue, que compiten
  directamente con Amazon AppFlow para ese mismo trabajo.

**En resumen:** las integraciones zero-ETL replican de forma gestionada desde una
base de datos o aplicación soportada hacia Redshift, con carga inicial, cambios
continuos y latencia de minutos, sin pipeline que construir ni operar. A cambio no
transforman por el camino y el destino está fijado, así que dejan de servir en
cuanto el escenario pide limpiar, unir o escribir en otro sitio.

## 🔍 Cómo lo pregunta el examen

> Una empresa necesita analizar en Amazon Redshift los datos de su base Aurora
> MySQL, con un retraso máximo de unos minutos. Los datos deben llegar sin
> modificaciones y el equipo no dispone de personal para mantener un pipeline.
> ¿Qué solución cumple el requisito con el menor esfuerzo operativo?

Tres pistas encajan: **origen Aurora MySQL**, **destino Redshift**, **sin
modificaciones** y **sin personal para mantener un pipeline**. Es el caso exacto
para el que existe zero-ETL.

Descarta la opción de DMS con full load + CDC: funcionaría, pero exige dimensionar
y operar una instancia de replicación, y el enunciado pide expresamente el menor
esfuerzo operativo.

Descarta también las opciones que construyen un pipeline con captura de cambios,
un servicio de transformación y una carga programada: cumplen, pero son justo lo
que el enunciado quiere evitar. Y descarta las consultas federadas desde Redshift
al origen, porque cargarían la base operativa en cada consulta en lugar de replicar.

La respuesta correcta es la **integración zero-ETL de Aurora MySQL con Redshift**.
La clave está en "sin modificaciones": si el enunciado pidiera limpiar o unir con
otras fuentes durante el trayecto, zero-ETL dejaría de ser válida.

## 💬 Ahora te toca a ti

**Pregunta:** Si AWS pudiera replicar automáticamente una base operativa hacia un
almacén analítico, ¿qué parte de tu trabajo dejaría de existir?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** La construcción y el mantenimiento del pipeline de
replicación: capturar los cambios, dimensionar el proceso que los mueve,
orquestarlo, vigilar que no se rompa y arreglarlo cuando lo haga. Lo que **no**
desaparece es el trabajo de modelado y transformación: los datos llegan tal como
están en el origen, así que limpiarlos, unirlos con otras fuentes y darles forma
analítica sigue siendo necesario, solo que ahora dentro del destino.

**Pregunta:** ¿Qué crees que se pierde cuando una integración automática sustituye
a un pipeline que tú controlas?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Control sobre el trayecto. No puedes transformar,
filtrar ni enriquecer los datos mientras se mueven, el destino está fijado —en
este caso Redshift— y el origen tiene que estar en la lista de soportados. También
hay límites sobre qué tipos de datos y objetos se replican. A cambio se elimina
todo el trabajo de operación, que es exactamente el intercambio que el examen
premia cuando pide el menor esfuerzo operativo.

**Pregunta:** Un enunciado pide llevar datos de una base a un almacén analítico
"con el menor esfuerzo operativo posible". ¿Qué deberías comprobar antes de
elegir?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Tres cosas. Si el origen está entre los soportados por
zero-ETL; si el destino es Redshift; y si los datos deben llegar sin transformar.
Si las tres se cumplen, zero-ETL es casi con seguridad la respuesta, porque
elimina el pipeline entero. Si alguna falla —el destino es un data lake, hay que
limpiar por el camino, el origen es un motor no soportado—, la respuesta vuelve a
ser DMS o un pipeline construido.

## ⚠️ No lo confundas con

- **Zero-ETL vs. DMS:** zero-ETL no exige operar nada pero solo va a Redshift desde
  orígenes soportados; DMS admite muchos más orígenes y destinos, incluido S3, a
  cambio de dimensionarlo y mantenerlo.
- **Zero-ETL vs. consulta federada:** la integración **replica** los datos al
  destino; la consulta federada los lee del origen en cada consulta, cargando la
  base operativa.
- **Zero-ETL vs. ELT:** zero-ETL es la forma de mover; ELT es la estrategia de
  transformar después. De hecho encajan bien: zero-ETL carga el crudo y la
  transformación ocurre en Redshift.
- **Modo histórico vs. estado actual:** por defecto se replica el estado actual de
  cada fila; el modo histórico conserva además las versiones anteriores.
- **Zero-ETL de DynamoDB a Redshift vs. DynamoDB Streams:** la integración replica
  sin pipeline hacia Redshift; el stream da los cambios para que tú los consumas
  hacia donde quieras.

## 🎯 Pistas para el examen

- **"Sin mantener un pipeline" o "sin personal para operarlo" con destino Redshift
  apunta a zero-ETL.** Es la opción de menor esfuerzo operativo por diseño.
- **La condición que descarta zero-ETL es transformar durante el trayecto.** Si el
  enunciado pide limpiar, unir o filtrar antes de cargar, deja de ser válida.
- **Comprueba el destino antes que nada.** Si es un data lake en S3, zero-ETL no
  aplica y la respuesta suele ser DMS o un pipeline.
- **No confundas replicar con consultar en el origen.** Una consulta federada evita
  copiar datos pero carga el sistema operativo en cada ejecución.
