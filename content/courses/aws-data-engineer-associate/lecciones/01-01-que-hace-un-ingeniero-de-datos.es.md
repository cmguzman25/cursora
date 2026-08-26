# 1.1 — Qué hace un ingeniero de datos y qué es un pipeline de datos

> Módulo 1 · Fundamentos · ⏱️ 12 min de lectura

## 🤔 Antes de empezar

- Una empresa ya guarda todas sus ventas en una base de datos. ¿Por qué
  necesitaría además a alguien que construya un pipeline de datos?
- ¿Qué crees que puede salir mal en un proceso que copia datos de un sistema a
  otro todas las noches?
- Si un proceso nocturno falla a mitad de camino y lo vuelves a ejecutar, ¿qué
  problema podría aparecer?

## 📘 Contenido

Andes Retail tiene 400 supermercados. Cada caja registra las ventas en una base
de datos relacional que responde en milisegundos, porque su trabajo es cobrar sin
hacer esperar al cliente. Todo funciona.

Entonces el área comercial pide algo aparentemente simple: *"quiero ver las
ventas de yogur por región, comparadas con el mismo mes del año pasado"*.

Y ahí aparece el problema. Esa consulta tiene que recorrer cientos de millones de
filas repartidas en 400 bases de datos distintas. Ejecutarla sobre las bases de
las cajas haría dos cosas malas a la vez: tardaría horas y **frenaría el cobro en
las tiendas**. La base de datos que cobra rápido y la que analiza bien no son la
misma base de datos.

Resolver esa tensión es el trabajo del ingeniero de datos.

### Qué es un pipeline de datos

Un **pipeline de datos** es el conjunto de procesos que mueve datos desde donde
se generan hasta donde se consumen, transformándolos por el camino para que sean
utilizables.

Tiene cuatro etapas, y conviene fijarlas porque el examen se organiza alrededor
de ellas:

**1. Ingesta (ingestion).** Sacar los datos de su origen. Los orígenes son
heterogéneos: bases de datos operativas, archivos que deja un proveedor, eventos
que emite una aplicación, APIs de terceros. Cada uno tiene su propio ritmo y sus
propias limitaciones.

**2. Almacenamiento (storage).** Dejarlos en algún lugar donde quepan, sean
baratos de guardar y se puedan leer bien. La elección de dónde —un data lake, un
almacén de datos, una base clave-valor— condiciona todo lo que viene después.

**3. Transformación (transformation).** Limpiar, unir, agregar, cambiar de
formato. Aquí es donde los datos crudos se vuelven datos utilizables: se
descartan registros corruptos, se unifican los códigos de producto de 400
tiendas, se calculan totales.

**4. Servicio (serving).** Ponerlos a disposición de quien los consume: un panel
de visualización, un analista con SQL, un modelo, otra aplicación.

Y atravesando las cuatro etapas, tres preocupaciones que no son una fase sino una
condición permanente: **orquestación** (qué se ejecuta, en qué orden y qué pasa
si falla), **observabilidad** (cómo sabes que funcionó) y **gobierno** (quién
puede ver qué, y cómo lo demuestras).

### ETL y ELT: el mismo trabajo en distinto orden

Durante décadas el patrón fue **ETL**: *extract, transform, load*. Se extraen los
datos, se transforman en un servidor intermedio y se cargan ya limpios en el
destino. Tenía sentido cuando el almacenamiento era caro: no querías guardar nada
que no fueras a usar.

Con el almacenamiento barato en la nube apareció **ELT**: *extract, load,
transform*. Primero se cargan los datos crudos tal cual llegan, y la
transformación se hace después, dentro del destino, que suele tener más potencia
de cálculo que cualquier servidor intermedio.

| | ETL | ELT |
|---|---|---|
| Dónde se transforma | En un motor intermedio | En el destino |
| Qué se guarda | Solo el resultado | El crudo **y** el resultado |
| Ventaja | Menos almacenamiento, datos limpios de entrada | Puedes reprocesar el crudo si cambian las reglas |
| Riesgo | Si la regla estaba mal, el dato original se perdió | Guardas basura junto con lo bueno |

La ventaja decisiva de ELT es la que menos se menciona: **conservar el dato crudo
te permite corregir errores del pasado**. Si dentro de seis meses descubres que
la regla que calculaba el descuento estaba mal, con ELT reprocesas; con ETL, el
dato original ya no existe.

### Las tres zonas de un data lake

Casi todas las plataformas de datos organizan el almacenamiento en tres niveles.
Los nombres cambian según la empresa, pero la idea es siempre la misma:

- **Zona cruda (raw).** El dato tal como llegó, sin tocar. Es inmutable: nunca se
  edita ni se borra. Sirve como red de seguridad y como evidencia para auditoría.
- **Zona curada (curated).** El dato ya limpio, validado, deduplicado y en un
  formato eficiente. Es la que consume la mayoría de los procesos.
- **Zona de consumo (consumption).** Datos ya agregados y modelados para un uso
  concreto: la tabla que alimenta el panel de ventas, el conjunto que usa un
  equipo específico.

En el ejemplo de Andes Retail: los archivos CSV que llegan de las 400 tiendas se
depositan intactos en la zona cruda; un proceso los limpia, unifica los códigos
de producto y los guarda en la zona curada; otro calcula las ventas por región y
mes y deja el resultado en la zona de consumo, listo para el panel.

### Idempotencia: el concepto que separa un pipeline serio de uno frágil

Un proceso es **idempotente** cuando ejecutarlo dos veces produce el mismo
resultado que ejecutarlo una sola vez.

Suena teórico hasta que ocurre esto: el proceso nocturno de Andes Retail carga
las ventas del día, se cae a mitad de camino, y el equipo lo vuelve a lanzar por
la mañana. Si el proceso no es idempotente, las ventas de las 180 tiendas que sí
se cargaron antes del fallo **se cargan otra vez**. El informe del lunes muestra
que la empresa vendió un 45 % más de lo real, y nadie lo detecta hasta el cierre
del mes.

Las formas habituales de conseguir idempotencia son tres:

- **Sobrescribir en vez de añadir.** El proceso borra la partición del día y la
  escribe entera de nuevo, en lugar de insertar filas.
- **Claves de deduplicación.** Cada registro lleva un identificador único y el
  destino rechaza los repetidos.
- **Marcas de progreso.** El proceso registra hasta dónde llegó y al reiniciarse
  continúa desde ahí.

Esto conecta con otro concepto que verás mucho: la **replayability**, la
capacidad de volver a procesar datos ya procesados. Un pipeline replayable
necesita dos cosas: que el origen conserve los datos el tiempo suficiente para
volver a leerlos, y que el proceso sea idempotente para que reprocesar no
duplique nada.

### Por qué esto importa para el examen

Las cuatro etapas del pipeline no son una casualidad pedagógica: son casi
exactamente los cuatro dominios del DEA-C01.

| Etapa del pipeline | Dominio del examen |
|---|---|
| Ingesta y transformación | Dominio 1 (34 %) |
| Almacenamiento | Dominio 2 (26 %) |
| Servicio, operación y calidad | Dominio 3 (22 %) |
| Gobierno, atravesando todo | Dominio 4 (18 %) |

Cuando leas un escenario del examen, ubicar en qué etapa está el problema reduce
drásticamente las opciones posibles antes incluso de pensar en servicios.

**En resumen:** un pipeline mueve datos desde donde se generan hasta donde se
consumen, en cuatro etapas —ingesta, almacenamiento, transformación y servicio—
atravesadas por orquestación, observabilidad y gobierno. ELT domina en la nube
porque conservar el crudo permite reprocesar. Y un pipeline que no es idempotente
duplica datos en cuanto algo falla, que es siempre.

## 🔍 Cómo lo pregunta el examen

> Una empresa carga cada noche las transacciones del día en su almacén de datos
> mediante un proceso que inserta filas. Un fallo de red interrumpió el proceso y
> el equipo volvió a ejecutarlo. Los informes del día siguiente muestran importes
> superiores a los reales. ¿Qué cambio evita que esto vuelva a ocurrir?

Las palabras que importan son **inserta filas**, **volvió a ejecutarlo** e
**importes superiores a los reales**. Juntas describen un problema de
idempotencia, no de red ni de capacidad.

Eso descarta de entrada las opciones que atacan el síntoma equivocado: aumentar
el tamaño de la instancia, añadir reintentos automáticos —reintentar un proceso
no idempotente empeora el problema— o mejorar la conectividad.

La respuesta correcta será la que haga el proceso repetible sin efectos
acumulativos: sobrescribir la partición del día completa, o deduplicar por una
clave única. Cuando veas "se ejecutó dos veces" y "los números están inflados",
piensa en idempotencia antes que en cualquier servicio.

## 💬 Ahora te toca a ti

**Pregunta:** Una empresa ya guarda todas sus ventas en una base de datos. ¿Por
qué necesitaría además a alguien que construya un pipeline de datos?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Porque la base de datos que atiende las operaciones está
optimizada para escribir y leer registros individuales muy rápido, no para
recorrer millones de filas. Ejecutar consultas analíticas sobre ella sería lento
y, peor, competiría por recursos con el sistema que cobra a los clientes. Además,
los datos suelen estar repartidos en muchos sistemas con formatos distintos: hace
falta un proceso que los reúna, los unifique y los deje en un almacén pensado
para analizar.

**Pregunta:** ¿Qué crees que puede salir mal en un proceso que copia datos de un
sistema a otro todas las noches?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Casi todo, y por eso el dominio 3 del examen existe. El
origen puede no estar disponible; los datos pueden llegar con un formato distinto
al esperado porque alguien cambió el esquema; el proceso puede caerse a la mitad
y dejar datos parciales; puede tardar más que la ventana nocturna y solaparse con
la ejecución siguiente; pueden llegar registros duplicados o corruptos. Un
pipeline maduro no es el que no falla, es el que falla de forma detectable y
recuperable.

**Pregunta:** Si un proceso nocturno falla a mitad de camino y lo vuelves a
ejecutar, ¿qué problema podría aparecer?

*Intenta responderla con tus palabras antes de seguir.*

**Respuesta sugerida:** Que los datos que sí alcanzó a cargar antes del fallo se
carguen por segunda vez, duplicando registros e inflando cualquier total
calculado sobre ellos. Es el problema que resuelve la idempotencia: diseñar el
proceso para que ejecutarlo dos veces dé el mismo resultado que ejecutarlo una,
sobrescribiendo particiones completas, deduplicando por clave única o llevando
una marca de hasta dónde llegó.

## ⚠️ No lo confundas con

- **ETL vs. ELT:** en ETL se transforma antes de cargar y solo se guarda el
  resultado; en ELT se carga el crudo primero y se transforma en el destino, lo
  que permite reprocesar si cambian las reglas.
- **Idempotencia vs. reintento:** el reintento es volver a ejecutar; la
  idempotencia es la propiedad que hace que ese reintento sea seguro. Añadir
  reintentos a un proceso no idempotente multiplica el daño.
- **Replayability vs. idempotencia:** replayability es que el **origen** conserve
  los datos para poder volver a leerlos; idempotencia es que el **proceso** no
  duplique al reprocesarlos. Hacen falta las dos.
- **Zona cruda vs. copia de seguridad:** la zona cruda es un dato vivo que se
  consulta y se reprocesa; una copia de seguridad se guarda para restaurar. No
  cumplen la misma función aunque ambas conserven el original.

## 🎯 Pistas para el examen

- **Ubica el escenario en una etapa del pipeline antes de mirar las opciones.**
  Un problema de ingesta rara vez se resuelve con un servicio de
  almacenamiento, y esa sola observación descarta la mitad de las respuestas.
- **"Se ejecutó dos veces" y "los totales están inflados" es idempotencia**, no
  capacidad ni red. Es uno de los patrones más repetidos del examen.
- **Cuando el enunciado menciona reprocesar datos históricos**, comprueba dos
  cosas en las opciones: que el origen retenga los datos y que el destino no
  duplique. Una opción que resuelva solo una mitad es incorrecta.
- **ELT es casi siempre la dirección que premia AWS**, porque conservar el crudo
  en S3 es barato y habilita el reproceso. Desconfía de opciones que descarten el
  dato original.
