import type { ExamQuizQuestion } from "../../types";

/**
 * Question bank for lesson "01-10-analisis-preguntas-modulo-1" (Módulo 1 —
 * Fundamentos de ingeniería de datos). 15 questions covering the whole module
 * — pipelines and idempotency, batch vs streaming, storage models, file
 * formats, the three cost levers, schema evolution, Spark internals and the
 * service map — not just the last topic seen. See CONTRATO-DE-CLASES.md.
 */
export const MODULE_1_QUESTIONS: ExamQuizQuestion[] = [
  {
    id: "m1-q01",
    prompt:
      "Un proceso nocturno carga las transacciones del día en un almacén de datos insertando filas. Un fallo de red lo interrumpió a mitad de camino y el equipo volvió a ejecutarlo desde el principio. Al día siguiente, los informes muestran importes muy superiores a los reales. ¿Qué cambio evita que vuelva a ocurrir?",
    options: [
      {
        id: "A",
        text: "Aumentar el tamaño de la instancia que ejecuta el proceso",
        correct: false,
        explanation:
          "El proceso no falló por falta de recursos, sino por una interrupción de red. Y aunque fuera más rápido, volver a ejecutarlo seguiría duplicando los datos ya cargados. Esta opción ataca un síntoma que el enunciado no menciona.",
      },
      {
        id: "B",
        text: "Hacer el proceso idempotente: sobrescribir la partición del día completa en lugar de insertar filas",
        correct: true,
        explanation:
          "Un proceso idempotente produce el mismo resultado se ejecute una o cinco veces. Sobrescribir la partición del día borra lo que hubiera quedado a medias y la reescribe entera, así que reintentar es seguro. También sirve deduplicar por una clave única.",
      },
      {
        id: "C",
        text: "Configurar reintentos automáticos cuando el proceso falle",
        correct: false,
        explanation:
          "Es la trampa más frecuente de este tipo de pregunta. Añadir reintentos a un proceso que no es idempotente multiplica el problema: cada reintento vuelve a insertar los datos ya cargados. Los reintentos son útiles, pero solo después de garantizar la idempotencia.",
      },
      {
        id: "D",
        text: "Programar el proceso a una hora de menor tráfico de red",
        correct: false,
        explanation:
          "Reduciría la probabilidad de que la red falle, pero no elimina el fallo ni corrige lo que ocurre al reintentar. Una solución que solo baja la probabilidad de un error no responde a un enunciado que pide evitar que el resultado sea incorrecto.",
      },
    ],
    tips: [
      "\"Se ejecutó dos veces\" y \"los totales están inflados\" es siempre idempotencia. Reconocer ese par te ahorra leer las opciones con detalle.",
      "Desconfía de las opciones que añaden reintentos sin tocar el diseño del proceso: en un proceso no idempotente, empeoran las cosas.",
    ],
  },
  {
    id: "m1-q02",
    prompt:
      "Una empresa transforma los archivos que recibe de sus proveedores y guarda únicamente el resultado limpio, descartando los originales para ahorrar almacenamiento. Seis meses después descubre que una regla de negocio estaba mal aplicada desde el principio y necesita recalcular el histórico. ¿Qué decisión de arquitectura habría evitado el problema?",
    options: [
      {
        id: "A",
        text: "Validar el esquema de los archivos al recibirlos",
        correct: false,
        explanation:
          "La validación de esquema detecta archivos con estructura incorrecta, pero aquí los archivos estaban bien: lo que estaba mal era la regla de transformación. Validar la entrada no habría cambiado nada.",
      },
      {
        id: "B",
        text: "Aumentar la frecuencia de las copias de seguridad del almacén de datos",
        correct: false,
        explanation:
          "Una copia de seguridad restaura el estado anterior de los datos ya transformados, que también estaban mal calculados. Recuperar una versión antigua del resultado erróneo no permite recalcular con la regla corregida.",
      },
      {
        id: "C",
        text: "Adoptar un enfoque ELT, conservando los datos crudos en una zona sin modificar",
        correct: true,
        explanation:
          "En ELT se cargan primero los datos crudos y se transforman después. Conservar el original permite volver a aplicar la regla corregida sobre el histórico completo. Es la principal ventaja de ELT y el motivo por el que la zona cruda es inmutable.",
      },
      {
        id: "D",
        text: "Documentar en un catálogo de datos las reglas de transformación aplicadas a cada conjunto",
        correct: false,
        explanation:
          "Documentar las reglas ayuda a detectar antes que una está mal y a entender qué se aplicó, pero no devuelve los datos de entrada. Sin los originales no hay nada sobre lo que volver a calcular, por muy bien documentada que esté la regla corregida.",
      },
    ],
    tips: [
      "Cuando el enunciado mencione recalcular o reprocesar el histórico, comprueba si el dato original todavía existe. Si no, ninguna solución posterior funciona.",
      "AWS suele premiar conservar el crudo en almacenamiento de objetos: es barato y habilita el reproceso. Desconfía de opciones que descarten el dato de origen.",
    ],
  },
  {
    id: "m1-q03",
    prompt:
      "Una empresa quiere que su panel de operaciones muestre las ventas acumuladas del día con un retraso máximo de dos minutos. El equipo propone una arquitectura de streaming con procesamiento por evento. La dirección pide la opción más económica que cumpla el requisito. ¿Qué recomendación es correcta?",
    options: [
      {
        id: "A",
        text: "Usar micro-batch, porque el requisito es near real time y no exige procesar cada evento por separado",
        correct: true,
        explanation:
          "Dos minutos de retraso es near real time, no tiempo real. El micro-batch acumula pequeños lotes y los procesa, lo que cumple de sobra ese margen y evita el coste de estar dimensionado para el pico las 24 horas y de mantener estado por evento.",
      },
      {
        id: "B",
        text: "Usar streaming con procesamiento por evento, porque es la única forma de bajar de cinco minutos de retraso",
        correct: false,
        explanation:
          "Es falso que sea la única forma: el micro-batch alcanza latencias de segundos a minutos sin problema. Además, el enunciado pide la opción más económica, y el streaming por evento es la cara.",
      },
      {
        id: "C",
        text: "Usar un proceso por lotes programado cada hora, que es lo más barato",
        correct: false,
        explanation:
          "Es la opción más barata, pero incumple el requisito: un lote cada hora produce hasta 60 minutos de retraso cuando el máximo admitido son dos. Una opción que no cumple el requisito funcional queda descartada aunque optimice mejor el costo.",
      },
      {
        id: "D",
        text: "Consultar directamente la base de datos transaccional desde el panel",
        correct: false,
        explanation:
          "Daría datos al instante, pero pondría consultas analíticas sobre el sistema que atiende las operaciones, compitiendo por recursos con el negocio. Es exactamente el problema que los pipelines de datos existen para evitar.",
      },
    ],
    tips: [
      "Traduce la latencia antes de mirar los servicios: real time es segundos, near real time admite minutos, y esa diferencia cambia la respuesta y el precio.",
      "Descarta primero por requisito funcional y solo después por costo. Una opción barata que no cumple el requisito nunca es la correcta.",
    ],
  },
  {
    id: "m1-q04",
    prompt:
      "Una flota de vehículos envía lecturas de telemetría. Algunos circulan por zonas sin cobertura y transmiten las lecturas acumuladas hasta 40 minutos después de generarlas. El equipo necesita informes de actividad por franjas de 15 minutos que reflejen el momento en que ocurrió cada lectura. ¿Qué enfoque cumple el requisito?",
    options: [
      {
        id: "A",
        text: "Aumentar la capacidad de ingesta para procesar las lecturas más rápido",
        correct: false,
        explanation:
          "El retraso no lo causa el sistema, lo causa la falta de cobertura en el origen. Por muy rápido que se procese, una lectura que llega 40 minutos tarde sigue llegando 40 minutos tarde.",
      },
      {
        id: "B",
        text: "Agregar las lecturas por su hora de llegada al sistema",
        correct: false,
        explanation:
          "Es exactamente lo que produce el error: una lectura generada a las 10:00 y recibida a las 10:40 se contabilizaría en la franja de las 10:40. Los informes quedarían mal precisamente en los vehículos con peor cobertura.",
      },
      {
        id: "C",
        text: "Descartar las lecturas que lleguen con más de cinco minutos de retraso",
        correct: false,
        explanation:
          "Eliminaría el problema de asignación a costa de perder los datos de los vehículos que circulan por zonas sin cobertura, que son justamente los que interesa vigilar. Cumplir un requisito borrando los datos incómodos no es una solución.",
      },
      {
        id: "D",
        text: "Agregar por event time, con una tolerancia de espera mayor que el retraso observado",
        correct: true,
        explanation:
          "El event time es el momento en que ocurrió el hecho, que es lo que pide el enunciado. Configurar una espera superior a los 40 minutos observados permite que los rezagados entren en su ventana correcta antes de cerrarla.",
      },
    ],
    tips: [
      "\"Los datos llegan tarde\" más \"el informe debe reflejar cuándo ocurrió\" es siempre una pregunta de event time frente a processing time.",
      "Si el retraso se origina fuera de tu sistema, ninguna opción que aumente capacidad o velocidad lo resuelve.",
    ],
  },
  {
    id: "m1-q05",
    prompt:
      "Un analista ejecuta sobre la base de datos relacional de la empresa una consulta que suma el importe de las ventas agrupadas por región durante tres años. La consulta tarda horas y ralentiza el sistema de cobro. La tabla tiene 45 columnas y la consulta usa 3. ¿Cuál es la causa técnica principal?",
    options: [
      {
        id: "A",
        text: "La tabla no tiene un índice sobre la columna de región",
        correct: false,
        explanation:
          "Un índice ayuda a localizar pocas filas entre muchas, pero esta consulta necesita recorrer prácticamente toda la tabla para agregar tres años. Cuando hay que leerlo casi todo, el índice aporta poco o incluso empeora el plan.",
      },
      {
        id: "B",
        text: "La consulta no está usando particiones de fecha",
        correct: false,
        explanation:
          "Particionar por fecha ayudaría si la consulta filtrara un período corto, pero aquí se piden tres años completos: no hay nada que descartar. Además, el problema de fondo seguiría existiendo.",
      },
      {
        id: "C",
        text: "El almacenamiento por filas obliga a leer las 45 columnas de cada fila para usar solo 3",
        correct: true,
        explanation:
          "Una base transaccional guarda los campos de cada registro juntos y contiguos, lo que es óptimo para leer un registro completo y pésimo para recorrer pocas columnas de millones de filas. Un sistema columnar leería solo esas 3 columnas, muy comprimidas, y podría saltarse bloques con las estadísticas.",
      },
      {
        id: "D",
        text: "La base de datos no tiene suficiente memoria asignada",
        correct: false,
        explanation:
          "Más memoria aliviaría el síntoma sin corregir la causa, y no evitaría la competencia con el sistema de cobro. La carga analítica sobre un sistema transaccional es un problema de arquitectura, no de dimensionamiento.",
      },
    ],
    tips: [
      "\"Pocas columnas de muchísimas filas\" apunta al mundo columnar; \"un registro completo por clave\" apunta al mundo por filas.",
      "Cuando el enunciado mencione que la analítica ralentiza el sistema operativo, la respuesta correcta suele separar ambas cargas, no ajustar la base existente.",
    ],
  },
  {
    id: "m1-q06",
    prompt:
      "Una empresa guarda diez años de registros de clientes como archivos Parquet en un data lake sobre almacenamiento de objetos. Una normativa de privacidad la obliga a eliminar todos los datos de un cliente concreto cuando este lo solicite, sin reescribir conjuntos completos y sin que las consultas en curso vean estados intermedios. ¿Qué solución cumple el requisito con el menor esfuerzo operativo?",
    options: [
      {
        id: "A",
        text: "Adoptar un formato de tabla abierto como Apache Iceberg sobre los mismos archivos",
        correct: true,
        explanation:
          "Iceberg añade una capa de metadatos sobre los archivos que aporta transacciones ACID y borrados a nivel de fila, sin reescribir la tabla entera y sin que un lector vea una escritura a medias. Los datos siguen siendo Parquet en el mismo almacenamiento.",
      },
      {
        id: "B",
        text: "Un proceso que reescriba cada mes las particiones afectadas",
        correct: false,
        explanation:
          "Funcionaría, pero contradice dos condiciones del enunciado: reescribe conjuntos completos y, durante la reescritura, las consultas pueden ver estados inconsistentes. Además, su esfuerzo operativo es alto frente a la alternativa.",
      },
      {
        id: "C",
        text: "Migrar todo el histórico a una base de datos relacional",
        correct: false,
        explanation:
          "Resolvería el borrado por fila, pero cambia la arquitectura completa por un requisito puntual, multiplica el costo de almacenar diez años de datos y pierde la flexibilidad del data lake. El examen penaliza las soluciones desproporcionadas.",
      },
      {
        id: "D",
        text: "Cifrar los datos de cada cliente con una clave distinta y destruir la clave cuando lo solicite",
        correct: false,
        explanation:
          "Es una técnica real, llamada borrado criptográfico, pero gestionar una clave por cliente durante diez años tiene un esfuerzo operativo enorme. Frente a una opción que borra las filas directamente, no es la respuesta de menor esfuerzo.",
      },
    ],
    tips: [
      "\"Borrar o actualizar filas concretas en el data lake\" apunta a un formato de tabla abierto. Es uno de los patrones más nuevos y más preguntados.",
      "Cuando una opción propone cambiar toda la arquitectura por un requisito concreto, casi siempre es incorrecta: busca la que resuelve el requisito donde ya están los datos.",
    ],
  },
  {
    id: "m1-q07",
    prompt:
      "Un equipo almacena 40 GB diarios de eventos como archivos JSON en un data lake y los consulta con un motor SQL que cobra por bytes escaneados. Las consultas filtran siempre por fecha. El costo mensual creció un 300 %. ¿Qué cambio produce la MAYOR reducción de costo?",
    options: [
      {
        id: "A",
        text: "Comprimir los archivos JSON con gzip",
        correct: false,
        explanation:
          "Reduce los bytes almacenados y algo los escaneados, pero sigue obligando a leer todos los campos de todos los registros de todo el histórico. Además, gzip no es divisible, así que perjudica el procesamiento en paralelo.",
      },
      {
        id: "B",
        text: "Convertir los datos a Parquet y particionarlos por fecha",
        correct: true,
        explanation:
          "Combina las dos palancas más potentes. Parquet lee solo las columnas necesarias, muy comprimidas, y permite saltar bloques por estadísticas; el particionado por fecha evita leer los días que la consulta no pide. Cuando el enunciado pide la mayor reducción, la respuesta suma palancas.",
      },
      {
        id: "C",
        text: "Mover los datos con más de 30 días a una clase de almacenamiento de archivo",
        correct: false,
        explanation:
          "Reduce el costo de almacenamiento, que no es el que se disparó: el enunciado señala el costo de las consultas. Además, archivar datos que las consultas todavía necesitan crearía un problema de acceso.",
      },
      {
        id: "D",
        text: "Convertir los datos a Parquet",
        correct: false,
        explanation:
          "Es correcto y ayuda mucho, pero es una sola palanca. Como el enunciado destaca en mayúsculas que busca la MAYOR reducción y menciona que las consultas filtran siempre por fecha, la opción que además particiona es estrictamente mejor.",
      },
    ],
    tips: [
      "Cuando dos opciones son correctas y una incluye a la otra, la respuesta es la más completa. MOST y LEAST en mayúsculas avisan de que hay varias válidas.",
      "El dato \"las consultas filtran siempre por X\" es la señal de que el particionado debe formar parte de la respuesta.",
    ],
  },
  {
    id: "m1-q08",
    prompt:
      "Un job de Apache Spark procesa a diario un único archivo CSV de 12 GB comprimido con gzip. Tarda más de tres horas y las métricas del clúster muestran que la mayoría de los nodos permanece inactiva durante casi todo el proceso. ¿Cuál es la causa más probable?",
    options: [
      {
        id: "A",
        text: "El clúster tiene demasiados pocos nodos para el volumen de datos",
        correct: false,
        explanation:
          "Es la opción tentadora, y el propio enunciado la desmiente: los nodos existentes están inactivos. Si sobra capacidad sin usar, añadir más no cambiaría nada.",
      },
      {
        id: "B",
        text: "Los datos están sesgados y una clave concentra la mayoría de los registros",
        correct: false,
        explanation:
          "El data skew produce un síntoma parecido —un nodo trabajando y el resto esperando—, pero aparece al agrupar o unir por una clave desbalanceada. Aquí el enunciado no menciona ninguna agregación: apunta a la lectura del archivo.",
      },
      {
        id: "C",
        text: "El archivo tiene demasiadas columnas y el motor debe leerlas todas",
        correct: false,
        explanation:
          "Leer columnas innecesarias encarece el trabajo, pero repartido entre todos los nodos. No explica que el clúster esté inactivo, que es el dato central del enunciado.",
      },
      {
        id: "D",
        text: "Un archivo comprimido con gzip no se puede dividir, así que lo procesa una sola tarea",
        correct: true,
        explanation:
          "gzip no es divisible, de modo que el motor no puede repartir el archivo entre varias tareas: un único núcleo descomprime y procesa los 12 GB mientras el resto del clúster espera. Se corrige partiendo el archivo o convirtiéndolo a un formato divisible como Parquet.",
      },
    ],
    tips: [
      "\"Un nodo trabaja y el resto está ocioso\" tiene dos causas: divisibilidad al leer y skew al agrupar. El contexto del enunciado desempata.",
      "Añadir nodos casi nunca es la respuesta correcta en preguntas de rendimiento distribuido, y menos si el enunciado dice que hay nodos inactivos.",
    ],
  },
  {
    id: "m1-q09",
    prompt:
      "Una plataforma ingiere eventos de aplicaciones móviles que evolucionan con frecuencia: cada pocas semanas algún equipo añade campos nuevos. Los eventos deben poder consumirse mientras llegan y los consumidores antiguos no pueden romperse cuando aparezca un campo que no conocen. ¿Qué formato encaja mejor en la capa de ingesta?",
    options: [
      {
        id: "A",
        text: "Avro",
        correct: true,
        explanation:
          "Avro es binario y por filas, lo que encaja con escribir eventos según llegan, e incluye el esquema dentro del propio archivo con reglas explícitas de resolución entre el esquema de escritura y el de lectura. Es el formato con mejor soporte de evolución de esquema y el habitual en streaming.",
      },
      {
        id: "B",
        text: "Parquet",
        correct: false,
        explanation:
          "Parquet es excelente para analizar, pero necesita acumular muchas filas antes de escribir para que la organización columnar tenga sentido. Escribir eventos de uno en uno en Parquet produce archivos diminutos sin ninguna de sus ventajas. Su sitio es la capa analítica, no la ingesta.",
      },
      {
        id: "C",
        text: "CSV",
        correct: false,
        explanation:
          "CSV es el peor formato posible para esquemas cambiantes: no tiene nombres de campo ni tipos, y la identidad de cada valor depende de su posición. Añadir una columna en medio corrompe la interpretación de todo lo posterior sin producir ningún error.",
      },
      {
        id: "D",
        text: "ORC",
        correct: false,
        explanation:
          "ORC es columnar, igual que Parquet, y le aplica la misma objeción: está pensado para la capa analítica y no para escribir eventos según llegan. Que sea del ecosistema Hive no cambia su orientación.",
      },
    ],
    tips: [
      "Ubica el formato en la etapa del pipeline: por filas en la ingesta, columnar en el almacenamiento analítico. Esa sola regla resuelve muchas preguntas.",
      "Cuando el enunciado insista en esquemas que cambian y en no romper consumidores antiguos, piensa en Avro y en un registro de esquemas.",
    ],
  },
  {
    id: "m1-q10",
    prompt:
      "Un proceso de ingesta escribe un archivo Parquet cada 30 segundos en un data lake, particionado por año, mes, día y hora. Las consultas filtran por rangos de días, escanean apenas unos gigabytes y aun así tardan varios minutos. ¿Qué corrige el problema?",
    options: [
      {
        id: "A",
        text: "Convertir los archivos a Parquet",
        correct: false,
        explanation:
          "Los archivos ya están en Parquet según el enunciado. Es un distractor que aprovecha que Parquet es la respuesta correcta en muchas otras preguntas: siempre conviene comprobar qué está ya resuelto antes de proponerlo.",
      },
      {
        id: "B",
        text: "Añadir una partición adicional por identificador de usuario",
        correct: false,
        explanation:
          "Empeoraría el problema. Particionar por un campo de cardinalidad alta multiplica las carpetas y reparte aún menos registros en cada archivo, agravando exactamente lo que está causando la lentitud.",
      },
      {
        id: "C",
        text: "Compactar los archivos pequeños de cada partición en archivos grandes y ampliar el búfer de ingesta",
        correct: true,
        explanation:
          "Escribir cada 30 segundos genera miles de archivos diarios. Cada archivo tiene un costo fijo de apertura que no depende de su tamaño, así que con muchos archivos diminutos el motor pasa más tiempo abriendo objetos que procesando datos. Compactar y escribir menos veces ataca la causa.",
      },
      {
        id: "D",
        text: "Aumentar el número de nodos del motor de consulta",
        correct: false,
        explanation:
          "El cuello de botella son las peticiones y la planificación por archivo, no la capacidad de cómputo. Más nodos abrirían los mismos miles de archivos y la mejora sería marginal frente al costo.",
      },
    ],
    tips: [
      "\"Escanea poco pero tarda mucho\" es el patrón de los archivos pequeños. Si escaneara mucho, el problema sería el formato o el particionado.",
      "Antes de elegir, verifica qué condiciones del enunciado ya están cumplidas: las opciones que proponen algo ya hecho son relleno.",
    ],
  },
  {
    id: "m1-q11",
    prompt:
      "Un equipo va a diseñar el particionado de una tabla de eventos en un data lake. Las consultas filtran casi siempre por fecha y, ocasionalmente, por país. La tabla tiene también un identificador único de transacción y un identificador de usuario, con millones de valores distintos. ¿Qué DOS decisiones son correctas? (Elige dos)",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Particionar por fecha, porque es el campo por el que se filtra habitualmente",
        correct: true,
        explanation:
          "Correcta. La regla para elegir la clave de partición es que coincida con los campos de filtro habituales, y la fecha es la clave más común precisamente porque casi todas las consultas analíticas acotan un período.",
      },
      {
        id: "B",
        text: "Particionar por identificador de transacción para que cada consulta encuentre su registro rápido",
        correct: false,
        explanation:
          "Es el peor caso posible. Un identificador único generaría una partición por registro: millones de carpetas con un archivo diminuto cada una. Planificar la consulta tardaría más que leer los datos.",
      },
      {
        id: "C",
        text: "Usar bucketing por identificador de usuario si las consultas buscan usuarios concretos",
        correct: true,
        explanation:
          "Correcta. El bucketing reparte las filas en un número fijo de archivos según el hash de una columna, de modo que todas las de un mismo usuario caen en el mismo archivo. Es la herramienta adecuada para campos de cardinalidad alta, y rinde al máximo cuando se busca un valor concreto en lugar de muchos a la vez.",
      },
      {
        id: "D",
        text: "Particionar por fecha, país, identificador de usuario e identificador de transacción para cubrir todos los filtros posibles",
        correct: false,
        explanation:
          "Es sobreparticionado. Cada nivel adicional multiplica las carpetas y reduce el tamaño de los archivos; con dos campos de cardinalidad alta, la explosión de metadatos y de archivos pequeños haría las consultas más lentas, no más rápidas.",
      },
      {
        id: "E",
        text: "No particionar, porque el formato columnar ya permite saltar bloques mediante estadísticas",
        correct: false,
        explanation:
          "El predicate pushdown descarta bloques dentro de los archivos que el motor ya abrió, mientras que el particionado evita abrirlos. Son dos ahorros que se suman, y renunciar al segundo obligaría a listar y abrir todo el histórico en cada consulta.",
      },
    ],
    tips: [
      "Particiona por cardinalidad baja o media y por los campos del filtro real; para cardinalidad alta, bucketing.",
      "Si una opción propone particionar por un identificador único, descártala sin leer el resto de la frase.",
      "En las preguntas de respuesta múltiple no hay crédito parcial: acertar una de dos cuenta igual que fallar las dos.",
    ],
  },
  {
    id: "m1-q12",
    prompt:
      "Una aplicación publica eventos en un flujo que consumen tres equipos distintos. Un despliegue cambió el tipo de un campo de número a texto y, durante once días, varios informes mostraron valores nulos sin que ningún proceso fallara. La empresa quiere impedir que un cambio incompatible vuelva a llegar a producción. ¿Qué solución lo consigue?",
    options: [
      {
        id: "A",
        text: "Configurar una alarma que avise cuando el porcentaje de nulos supere un umbral",
        correct: false,
        explanation:
          "Detecta el problema mucho antes que once días, y es una buena práctica, pero solo actúa cuando el dato defectuoso ya se publicó y se procesó. El enunciado pide impedir, no detectar.",
      },
      {
        id: "B",
        text: "Añadir validaciones de tipo en cada uno de los tres consumidores",
        correct: false,
        explanation:
          "Repite la misma lógica en tres sitios, con el riesgo de que se desincronicen, y sigue sin bloquear al productor: el evento incompatible se publicaría igual y cada consumidor decidiría por su cuenta qué hacer con él.",
      },
      {
        id: "C",
        text: "Ejecutar un control de calidad de datos sobre la tabla de destino después de cada carga",
        correct: false,
        explanation:
          "Igual que la alarma, es una comprobación posterior: encuentra el problema cuando los datos ya están escritos. Aporta valor, pero no cumple el requisito de impedir que el cambio llegue a producción.",
      },
      {
        id: "D",
        text: "Registrar el esquema del flujo en un registro de esquemas que rechace las versiones incompatibles",
        correct: true,
        explanation:
          "Un registro de esquemas guarda las versiones del esquema y valida la compatibilidad antes de aceptar una nueva. El cambio incompatible falla en el despliegue del productor, que es el único punto donde se puede impedir de verdad que el dato defectuoso exista.",
      },
    ],
    tips: [
      "\"Impedir\" y \"evitar que llegue a producción\" piden un control previo; \"detectar\" y \"avisar\" piden observabilidad. El verbo decide la respuesta.",
      "Cuando varios consumidores comparten un flujo, la solución correcta suele ser central y no replicada en cada consumidor.",
    ],
  },
  {
    id: "m1-q13",
    prompt:
      "Un job de Spark une una tabla de 4 TB de transacciones con una tabla de 30 MB de países. El job tarda horas y las métricas muestran un volumen muy alto de datos transferidos entre nodos. ¿Qué cambio mejora el rendimiento con el menor esfuerzo?",
    options: [
      {
        id: "A",
        text: "Aumentar el número de nodos del clúster",
        correct: false,
        explanation:
          "Seguiría moviendo los mismos 4 TB por la red, solo que entre más máquinas. El problema no es falta de cómputo, es un movimiento de datos innecesario.",
      },
      {
        id: "B",
        text: "Usar un broadcast join, enviando una copia de la tabla pequeña a cada ejecutor",
        correct: true,
        explanation:
          "La tabla de países cabe de sobra en la memoria de cada ejecutor. Copiarla a todos permite hacer la unión localmente y elimina por completo el shuffle de la tabla de 4 TB, que es lo que estaba generando el tráfico entre nodos.",
      },
      {
        id: "C",
        text: "Aumentar la memoria asignada a cada ejecutor",
        correct: false,
        explanation:
          "Más memoria puede evitar derrames a disco, pero no reduce la cantidad de datos que hay que transferir por la red. El síntoma que da el enunciado es tráfico entre nodos, no falta de memoria.",
      },
      {
        id: "D",
        text: "Ordenar ambas tablas por la clave de unión antes de unirlas",
        correct: false,
        explanation:
          "Ordenar es una operación ancha que provoca su propio shuffle: para evitar un movimiento de datos se añadiría otro, sobre 4 TB. Empeoraría el tiempo total.",
      },
    ],
    tips: [
      "\"Tabla muy grande unida con tabla muy pequeña\" es broadcast join. Es una de las asociaciones más rentables de memorizar del examen.",
      "Optimizar un job distribuido es casi siempre reducir el shuffle. Desconfía de opciones que añadan ordenaciones o reparticiones.",
    ],
  },
  {
    id: "m1-q14",
    prompt:
      "Un job de Spark tiene una etapa con 200 tareas: 199 terminan en menos de un minuto y una tarda cuarenta. La etapa agrupa las ventas por identificador de tienda, y una tienda insignia concentra veinte veces más ventas que la media. ¿Qué DOS acciones atacan la causa? (Elige dos)",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Aplicar salting: añadir un sufijo aleatorio a la clave conflictiva y agregar en dos pasos",
        correct: true,
        explanation:
          "Correcta. El salting reparte las filas de la clave desbalanceada entre varias particiones, de modo que ninguna tarea concentra todo el trabajo. Después se agregan los resultados parciales en un segundo paso.",
      },
      {
        id: "B",
        text: "Duplicar el número de nodos del clúster",
        correct: false,
        explanation:
          "No cambia nada. La tarea grande sigue siendo una sola tarea ejecutándose en un solo núcleo, y el job no termina hasta que ella termina. Los nodos adicionales estarían ociosos, igual que los actuales.",
      },
      {
        id: "C",
        text: "Tratar por separado la clave que concentra los datos y unir los resultados al final",
        correct: true,
        explanation:
          "Correcta. Aislar el valor problemático permite procesarlo con una estrategia distinta —por ejemplo, con más paralelismo interno— mientras el resto de las claves sigue el camino normal. Es una variante habitual de la solución al skew.",
      },
      {
        id: "D",
        text: "Convertir los datos de origen a un formato columnar",
        correct: false,
        explanation:
          "Reduce los bytes leídos, lo que es bueno en general, pero no cambia cómo se reparten las filas al agrupar por tienda. La tarea de la tienda insignia seguiría recibiendo veinte veces más registros que las demás.",
      },
      {
        id: "E",
        text: "Aumentar el timeout de las tareas para que la tarea lenta no falle",
        correct: false,
        explanation:
          "Trata el síntoma en su forma más superficial: acepta que el job tarde cuarenta minutos en lugar de corregir el reparto. Además, el enunciado no menciona que ninguna tarea esté fallando.",
      },
    ],
    tips: [
      "199 tareas rápidas y una lentísima es data skew. El clúster entero espera a un solo núcleo.",
      "Escalar el clúster nunca corrige el skew: el problema es cómo se reparten las filas, no cuántas máquinas hay.",
      "Comprueba si el enunciado menciona un valor que concentra datos: es la confirmación de que se trata de sesgo y no de otra cosa.",
    ],
  },
  {
    id: "m1-q15",
    prompt:
      "Una empresa necesita analizar en tiempo real las lecturas de temperatura de miles de sensores industriales y generar una alerta cuando la media de los últimos cinco minutos supere un umbral. Al revisar las opciones, un candidato duda entre varias arquitecturas. ¿Qué afirmación le ayuda a descartar opciones correctamente?",
    options: [
      {
        id: "A",
        text: "Las opciones que incluyen un servicio de mensajería deben descartarse, porque las alertas no forman parte del pipeline de datos",
        correct: false,
        explanation:
          "Al contrario: enviar notificaciones mediante servicios de mensajería es parte explícita del temario de orquestación de pipelines. El enunciado pide generar una alerta, así que la respuesta correcta incluirá alguno.",
      },
      {
        id: "B",
        text: "Las opciones que entregan los datos directamente a almacenamiento de objetos son válidas, porque después se pueden consultar",
        correct: false,
        explanation:
          "Entregar y consultar después no cumple el requisito: una media de los últimos cinco minutos calculada en tiempo real necesita un motor que mantenga estado por ventana mientras los datos pasan, no una consulta posterior sobre archivos.",
      },
      {
        id: "C",
        text: "Las opciones basadas en servicios de la familia AWS IoT pueden descartarse, porque están fuera del alcance del examen",
        correct: true,
        explanation:
          "Toda la familia AWS IoT está en la lista oficial de servicios out-of-scope. Un escenario con sensores industriales es el distractor temático más habitual: invita a elegir IoT Core o SiteWise. En este examen, los dispositivos escriben directamente a un flujo de eventos.",
      },
      {
        id: "D",
        text: "Las opciones que usan un motor de procesamiento con estado deben descartarse, porque añaden complejidad innecesaria",
        correct: false,
        explanation:
          "Descarta justamente lo que hace falta. Calcular una media móvil sobre los últimos cinco minutos es una agregación por ventana, y eso exige mantener estado. Una transformación sin estado no puede resolverlo.",
      },
    ],
    tips: [
      "Conocer la lista de servicios fuera de alcance convierte varias opciones en descartes inmediatos, sin analizar su contenido técnico.",
      "\"Media de los últimos N minutos\" es siempre una agregación por ventana, y por tanto procesamiento con estado.",
      "Con esto terminas el repaso del Módulo 1. Si fallaste varias del mismo tema, vuelve a esa lección antes de empezar el Módulo 2: el dominio 1 se apoya directamente en estos fundamentos.",
    ],
  },
];
