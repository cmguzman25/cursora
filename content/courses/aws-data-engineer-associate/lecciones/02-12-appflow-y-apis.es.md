# 2.12 — Amazon AppFlow, consumo de APIs de datos y allowlists de IP

> Módulo 2 · Dominio 1 (34 %) · Task 1.1 — Perform data ingestion · ⏱️ 10 min de lectura

## 🤔 Antes de empezar

- Para traer datos de una aplicación comercial como un CRM, ¿qué trabajo crees que
  hay que hacer más allá de llamar a su API?
- Si una API devuelve los resultados de mil en mil, ¿qué tiene que recordar tu
  proceso entre una llamada y la siguiente?
- ¿Por qué crees que un sistema externo puede exigir saber desde qué direcciones
  de red te vas a conectar?

## 📘 Contenido

Buena parte de los datos que una empresa necesita no están en sus bases de datos:
están en aplicaciones de terceros. El CRM comercial, la plataforma de anuncios, el
sistema de tickets de soporte. Todas exponen APIs, y todas son un pequeño proyecto
si se integran a mano.

### Lo que cuesta consumir una API de verdad

La primera pregunta de activación tiene una respuesta larga, y conviene verla
entera porque es lo que justifica que exista un servicio dedicado. Integrar una
API de terceros implica:

- **Autenticarse** y renovar el token cuando caduca.
- **Paginar**: casi ninguna API devuelve todo de una vez. Devuelve mil registros y
  un puntero a la página siguiente, y tu proceso tiene que recordarlo. Esa es la
  respuesta a la segunda pregunta: el **token de paginación**, junto con la marca
  de hasta dónde llegó la última ejecución.
- **Respetar los límites de tasa.** Si consultas demasiado rápido, la API responde
  con un error de limitación y hay que reintentar con espera progresiva.
- **Detectar cambios**: pedir solo lo modificado desde la última vez, en lugar de
  descargar todo el catálogo cada noche.
- **Sobrevivir a los cambios de la API**, que el proveedor hace sin consultarte.
- **Manejar los fallos**: reintentos, registros de error, avisos.

Escribir y mantener eso para cinco aplicaciones distintas es trabajo permanente. Y
el examen premia sistemáticamente no hacerlo.

### Amazon AppFlow

**Amazon AppFlow** integra aplicaciones SaaS con AWS **mediante configuración, sin
escribir código**. Tiene conectores ya construidos para plataformas como
Salesforce, ServiceNow, Zendesk, Slack, Google Analytics o SAP, y se encarga de la
autenticación, la paginación, los reintentos y los límites de tasa.

Un **flujo** de AppFlow define:

- **Origen y destino.** El destino puede ser Amazon S3, Amazon Redshift o la
  propia aplicación SaaS, entre otros.
- **Cuándo se ejecuta**: bajo demanda, **según una programación**, o **disparado
  por un evento** en la aplicación de origen, cuando esta lo soporta. Esa última
  opción es la que permite reaccionar en cuanto cambia un registro en el CRM.
- **Qué se transfiere**: selección de campos, **filtros** para traer solo lo que
  interesa, y transformaciones ligeras como concatenar campos, cambiar el formato
  de una fecha o **enmascarar** valores sensibles.
- **Validaciones**, que permiten descartar o marcar registros que no cumplan una
  condición.

Para la conectividad privada, AppFlow puede usar **AWS PrivateLink**, de modo que
el tráfico con la aplicación no salga a internet cuando el proveedor lo soporta.

La regla del examen es directa: **si el origen es una aplicación SaaS con conector
disponible y el enunciado pide el menor esfuerzo de desarrollo, la respuesta es
AppFlow**, no una función que llame a la API.

### AppFlow frente a las alternativas

| Situación | Respuesta |
|---|---|
| SaaS con conector, sin código | **AppFlow** |
| SaaS soportado por una integración zero-ETL hacia Redshift | **Zero-ETL** (lección 2.10) |
| API propia o sin conector | Código propio en Lambda, o un contenedor si tarda más de 15 minutos |
| Base de datos, no aplicación | DMS (lección 2.9) |
| Archivos por SFTP | Transfer Family |

La frontera con zero-ETL merece atención, porque desde que existen las
integraciones de aplicaciones SaaS a través de AWS Glue, ambos servicios compiten
para el mismo trabajo. El desempate práctico: **si el destino es Redshift y no hay
que transformar, zero-ETL; si el destino es S3 o hace falta filtrar y transformar
por el camino, AppFlow**.

### Cuando hay que escribir el consumidor

Si no hay conector, el patrón habitual es una función de **Lambda** disparada por
un horario de **EventBridge**, que llama a la API, pagina y escribe en S3.

Dos detalles que el examen usa:

- **El límite de 15 minutos de Lambda** vuelve a ser el techo. Una descarga
  completa que tarde más obliga a otro motor, o a partir el trabajo en varias
  invocaciones que se coordinen con Step Functions.
- **Dónde se guardan las credenciales.** La respuesta correcta es siempre
  **AWS Secrets Manager**, nunca variables de entorno ni código. Se estudia en la
  lección 9.7.

Y una precaución de diseño: consumir una API con muchas invocaciones concurrentes
es la forma más rápida de que el proveedor te limite. Conviene poner un límite de
concurrencia a la función.

### Allowlists de direcciones IP

La tercera pregunta de activación apunta a un requisito muy común: muchos sistemas
—sobre todo los locales de la propia empresa, o los de socios comerciales— solo
aceptan conexiones desde direcciones conocidas. Se llama **allowlist** (lista de
permitidos).

El problema es que los servicios gestionados de AWS no se conectan desde una
dirección fija: usan rangos que cambian. Hay tres formas de resolverlo, y conviene
reconocerlas:

- **Publicar los rangos oficiales.** AWS publica los rangos de direcciones de cada
  servicio y región, y el sistema de destino los añade a su lista. Es frágil,
  porque los rangos cambian y hay que mantenerlos.
- **Salir por una dirección fija propia.** Si el proceso corre dentro de una VPC,
  su tráfico saliente puede pasar por una **NAT Gateway con IP elástica**, que sí
  es una dirección estable y conocida. Es la solución habitual cuando el socio
  exige una IP concreta.
- **Evitar internet.** Con **PrivateLink** o una conexión privada hacia el centro
  de datos, el tráfico no sale a la red pública y la lista de IP deja de tener
  sentido.

En el examen, cuando un enunciado diga que el origen **solo acepta conexiones
desde direcciones autorizadas**, la respuesta suele pasar por ejecutar la ingesta
dentro de una VPC con salida por una dirección fija.

**En resumen:** consumir una API implica autenticación, paginación, límites de
tasa y detección de cambios, y AppFlow resuelve todo eso por configuración para
las aplicaciones SaaS con conector, con filtros, enmascarado y ejecución
programada o por evento. Sin conector, el patrón es Lambda con EventBridge y las
credenciales en Secrets Manager. Y cuando el origen exige direcciones autorizadas,
la salida por una IP fija desde una VPC es la respuesta.

## 🔍 Cómo lo pregunta el examen

> Una empresa necesita copiar cada hora los registros nuevos y modificados de su
> CRM comercial a Amazon S3, aplicando un filtro por región y enmascarando el
> número de teléfono de los clientes. El equipo no dispone de desarrolladores para
> mantener una integración. ¿Qué solución cumple el requisito con el menor
> esfuerzo de desarrollo?

Las pistas son **CRM comercial**, **cada hora**, **filtro y enmascarado**, y **sin
desarrolladores**. Las cuatro describen las capacidades de un servicio de
integración por configuración.

Eso descarta la función de Lambda que llame a la API del CRM: funcionaría, pero
implica escribir y mantener paginación, autenticación y reintentos, justo lo que el
enunciado quiere evitar.

También descarta DMS, que trabaja con bases de datos y no con aplicaciones SaaS, y
las opciones que proponen exportar manualmente desde el CRM.

La respuesta correcta es un **flujo de AppFlow programado cada hora**, con un
filtro por región y una transformación de enmascarado sobre el teléfono. Fíjate en
que el enmascarado forma parte de lo que AppFlow hace: si una opción propone
AppFlow más un proceso posterior para enmascarar, es más compleja de lo necesario.

## 💬 Ahora te toca a ti

**Pregunta:** Para traer datos de una aplicación comercial como un CRM, ¿qué
trabajo crees que hay que hacer más allá de llamar a su API?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Autenticarse y renovar los tokens, paginar los resultados,
respetar los límites de tasa con reintentos y espera progresiva, pedir solo lo
modificado desde la última ejecución, manejar los errores y adaptarse cuando el
proveedor cambie su API. Es un componente que hay que mantener para siempre, y
multiplicado por cada aplicación integrada. AppFlow existe precisamente para que
eso no lo escriba nadie.

**Pregunta:** Si una API devuelve los resultados de mil en mil, ¿qué tiene que
recordar tu proceso entre una llamada y la siguiente?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** El token o cursor de paginación que la API devuelve junto
con cada página, para pedir la siguiente. Y, entre una ejecución y la siguiente, la
marca de hasta dónde llegó —una fecha de modificación o un identificador—, que es
lo que permite pedir solo lo nuevo en lugar de descargarlo todo otra vez. Sin esa
segunda marca, cada ejecución repite el trabajo completo y consume los límites de
tasa del proveedor sin necesidad.

**Pregunta:** ¿Por qué crees que un sistema externo puede exigir saber desde qué
direcciones de red te vas a conectar?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Por seguridad: restringir el acceso a un conjunto conocido
de direcciones reduce la superficie de ataque, y muchos sistemas locales o de
socios lo exigen por política. El problema es que los servicios gestionados de AWS
no salen desde una dirección fija. La solución habitual es ejecutar la ingesta
dentro de una VPC cuyo tráfico saliente pase por una NAT Gateway con IP elástica,
que sí es estable. La alternativa mejor, cuando se puede, es evitar internet con
una conexión privada.

## ⚠️ No lo confundas con

- **AppFlow vs. DMS:** AppFlow integra aplicaciones SaaS; DMS trabaja con bases de
  datos. El origen decide.
- **AppFlow vs. zero-ETL de aplicaciones:** compiten. Zero-ETL gana si el destino es
  Redshift y no hay que transformar; AppFlow, si el destino es S3 o hace falta
  filtrar y enmascarar.
- **Programación vs. disparo por evento:** AppFlow admite las dos. El disparo por
  evento reacciona en cuanto cambia el origen, si la aplicación lo soporta.
- **Rangos de IP de AWS vs. IP fija propia:** publicar los rangos del servicio es
  frágil y hay que mantenerlo; salir por una NAT Gateway con IP elástica da una
  dirección estable bajo tu control.
- **Límite de tasa del proveedor vs. throttling de AWS:** el primero lo impone el
  sistema externo; el segundo, el servicio de AWS. Se tratan en la lección 2.13.

## 🎯 Pistas para el examen

- **"Sin desarrolladores" o "sin escribir código" con un origen SaaS es AppFlow.**
  Proponer Lambda contra la API es el distractor de más esfuerzo.
- **El enmascarado y el filtrado están dentro de AppFlow.** Una opción que añada un
  proceso posterior para eso es innecesariamente compleja.
- **"Solo acepta conexiones desde direcciones autorizadas" apunta a una salida con
  IP fija desde una VPC**, o a conectividad privada.
- **Las credenciales van en Secrets Manager.** Si una opción las pone en variables
  de entorno o en el código, descártala sin leer el resto.
