# 1.9 — ★ Tablas comparativas: formatos, latencias y tipos de almacén

> Módulo 1 · Fundamentos · Repaso comparativo · ⏱️ 7 min de lectura

Esta lección no enseña nada nuevo. Pone uno junto a otro los conceptos del módulo
que el examen mezcla a propósito, con las columnas que se usan para decidir. Está
pensada para releerse: vuelve aquí al terminar cada módulo del dominio 2.

## 📊 Las tablas

### Formatos de archivo

| | CSV | JSON | Avro | Parquet | ORC |
|---|---|---|---|---|---|
| Orientación | Filas | Filas | Filas | **Columnas** | **Columnas** |
| Binario | No | No | Sí | Sí | Sí |
| Esquema | Ninguno | Implícito | **En el archivo** | En el archivo | En el archivo |
| Evolución de esquema | Muy mala | Flexible sin validar | **La mejor** | Buena (añadir) | Buena (añadir) |
| Datos anidados | No | **Sí** | Sí | Sí | Sí |
| Compresión típica | Mala | Mala | Buena | **Muy buena** | **Muy buena** |
| Column pruning | No | No | No | **Sí** | **Sí** |
| Predicate pushdown | No | No | No | **Sí** | **Sí** |
| Encaja en | Intercambio | APIs y eventos | Streaming | **Analítica** | Analítica en Hive/EMR |

### Códecs de compresión

| Códec | Ratio | Velocidad | Divisible por sí mismo | Uso habitual |
|---|---|---|---|---|
| Snappy | Bajo | Muy alta | No | **Por defecto con Parquet** |
| gzip | Alto | Media | **No** | Archivos de texto ya existentes |
| bzip2 | Muy alto | Baja | **Sí** | Cuando importa el tamaño, no el tiempo |
| ZSTD | Alto | Alta | No | Alternativa moderna a gzip |

> El detalle que más se pregunta: **Parquet con Snappy sí se procesa en paralelo**,
> aunque Snappy no sea divisible, porque Parquet comprime cada row group por
> separado. Un **CSV grande con gzip no se puede dividir** y lo procesa un solo
> hilo.

### Latencia: qué palabra lleva a qué enfoque

| Palabra del enunciado | Latencia | Enfoque | Necesita estado |
|---|---|---|---|
| *real time*, *lowest latency* | Milisegundos a segundos | Streaming | Habitualmente sí |
| *near real time* | Segundos a minutos | Micro-batch | A veces |
| "informe diario", "cada noche" | Horas | Batch | No |

### Tipos de almacén

| | OLTP | OLAP | Data lake | Lakehouse |
|---|---|---|---|---|
| Carga típica | Muchas operaciones pequeñas | Pocas consultas enormes | Cualquiera | Cualquiera |
| Almacenamiento | Filas | Columnas | Archivos | Archivos + metadatos |
| Esquema | Al escribir | Al escribir | **Al leer** | Al leer, gobernado |
| Transacciones | Sí | Sí | **No** | **Sí** |
| Borrado por fila | Sí | Sí | **No** | **Sí** |
| Coste por GB almacenado | Alto | Alto | **Bajo** | Bajo |
| Ejemplo | RDS, Aurora, DynamoDB | Redshift | S3 | S3 + Iceberg, S3 Tables |

### ETL frente a ELT

| | ETL | ELT |
|---|---|---|
| Dónde se transforma | En un motor intermedio | En el destino |
| Qué se conserva | Solo el resultado | El crudo **y** el resultado |
| Reprocesar el histórico | **Imposible** si cambia la regla | Posible |
| Coste de almacenamiento | Menor | Mayor, pero barato en objetos |
| Señal en el enunciado | — | "recalcular", "reprocesar", "corregir el histórico" |

### Diagnóstico: síntoma → causa → solución

La tabla más rentable del módulo. El examen plantea varios de estos síntomas
casi con las mismas palabras.

| Síntoma | Causa probable | Solución |
|---|---|---|
| Consulta escanea **muchos** bytes y va lenta | Formato por filas, sin particionar | Parquet + particionar por el campo del filtro |
| Consulta escanea **pocos** bytes y va lenta | Demasiados archivos pequeños | Compactar; ampliar el búfer de ingesta |
| Un nodo trabaja y el resto ocioso, **al leer** | Archivo comprimido no divisible | Partir el archivo o convertir a Parquet |
| Un nodo trabaja y el resto ocioso, **al agrupar o unir** | Data skew | Salting; aislar la clave; broadcast join |
| Mucho tráfico entre nodos al unir tablas | Shuffle join con una tabla pequeña | Broadcast join |
| Ejecutores mueren por memoria o derraman a disco | Particiones demasiado grandes o skew | Más particiones; corregir el sesgo |
| Planificar la consulta tarda más que leer | Sobreparticionado | Menos niveles de partición; bucketing u ordenación |
| Errores `SlowDown` al consultar | Demasiadas peticiones a S3 por exceso de archivos | Compactar; espaciar las consultas concurrentes |
| Totales inflados tras un reintento | Proceso no idempotente | Sobrescribir partición o deduplicar por clave |
| Informes con nulos y **ningún error** | Data drift | Registro de esquemas que rechace lo incompatible |
| Informe asigna los datos a la franja horaria equivocada | Se agrega por processing time | Agregar por event time con tolerancia |

> Fíjate en un patrón: **añadir nodos no aparece como solución en ninguna fila.**
> Es la opción tentadora en casi todas estas preguntas y casi nunca la correcta.

### Del pipeline a los dominios del examen

| Etapa del pipeline | Dominio | Peso |
|---|---|---|
| Ingesta y transformación | 1 | 34 % |
| Almacenamiento | 2 | 26 % |
| Servicio, operación y calidad | 3 | 22 % |
| Gobierno, atravesando todo | 4 | 18 % |

### Ventanas de tiempo

| Ventana | Se solapan | Un registro cae en | Sirve para |
|---|---|---|---|
| Fija (*tumbling*) | No | Una sola | Totales por intervalo |
| Deslizante (*sliding*) | Sí | Varias | Medias móviles, picos |
| De sesión (*session*) | No | Una sola | Actividad de un usuario |

### Las tres palancas de costo

| Palanca | Qué reduce | Señal en el enunciado |
|---|---|---|
| Formato columnar | Bytes leídos por fila | "Los CSV/JSON son caros de consultar" |
| Particionado | Filas leídas | "Las consultas filtran siempre por fecha" |
| Tamaño de archivo | Coste fijo de apertura | **"Escanea poco pero tarda mucho"** |

## 🧭 El árbol de decisión

```
¿El dato llega como flujo continuo?
├── Sí → ¿el resultado bloquea una decisión en curso?
│        ├── Sí (segundos)  → streaming con estado
│        └── No  (minutos)  → micro-batch, más barato
└── No → batch programado

¿Cómo se va a leer el dato?
├── Por clave, un registro          → almacén clave-valor (OLTP)
├── Escaneando y agregando columnas → columnar (OLAP o Parquet en S3)
├── Buscando texto libre            → índice de búsqueda
└── Recorriendo relaciones          → grafos

¿Hace falta borrar o actualizar filas concretas en S3?
├── Sí → formato de tabla abierto (Iceberg)
└── No → archivos Parquet particionados

Una consulta va lenta. ¿Cuántos bytes escanea?
├── Muchos  → formato y particionado
└── Pocos   → archivos pequeños: compactar
```

## ⚠️ Los pares que más se confunden

- **Real time vs. near real time:** segundos frente a minutos. Llevan a
  arquitecturas y precios distintos, y el enunciado casi siempre usa una de las
  dos expresiones de forma deliberada.
- **Event time vs. processing time:** cuándo ocurrió el hecho frente a cuándo
  llegó. Agregar por el reloj equivocado da informes incorrectos, no lentos.
- **Avro vs. Parquet:** Avro es por filas, va en la ingesta y destaca en evolución
  de esquema; Parquet es columnar y va en el almacenamiento analítico.
- **Particionado vs. bucketing:** carpetas por valor para cardinalidad baja frente
  a reparto por hash para cardinalidad alta.
- **Partition pruning vs. predicate pushdown:** saltarse carpetas usando la ruta
  frente a saltarse bloques usando las estadísticas del archivo. Se suman.
- **Particiones de S3 vs. particiones de Spark:** carpetas en el almacenamiento
  frente a trozos en memoria que fijan el paralelismo.
- **Data skew vs. archivo no divisible:** los dos dejan un nodo trabajando y el
  resto ocioso. El skew aparece al agrupar o unir; la divisibilidad, al leer un
  archivo comprimido.
- **Transformación estrecha vs. ancha:** filtrar no mueve datos entre nodos;
  agrupar y unir sí, y ese movimiento es el shuffle.
- **Schema-on-read vs. sin esquema:** el esquema existe siempre; la diferencia es
  cuándo se aplica y quién lo valida.
- **Compatibilidad hacia atrás vs. hacia adelante:** consumidor nuevo leyendo datos
  viejos frente a consumidor viejo leyendo datos nuevos.
- **Idempotencia vs. replayability:** que reprocesar no duplique frente a que el
  origen conserve los datos para poder releerlos. Reprocesar bien exige las dos.
- **Data lake vs. data swamp:** misma tecnología; la diferencia es catálogo,
  permisos y organización por zonas.

## 🎯 Pistas para el examen

- **Lee primero la condición de optimización** del enunciado y después vuelve a la
  tabla que corresponda. Estas tablas están ordenadas por los criterios que el
  examen usa para decidir, no por popularidad del servicio.
- **Cuando pidan "la mayor reducción de costo", suma palancas.** Convertir a
  Parquet **y** particionar por el campo del filtro gana a cualquiera por
  separado.
- **Comprueba qué está ya resuelto en el enunciado.** Si los datos ya son Parquet
  y ya están particionados, las opciones que proponen eso son relleno y el
  problema está en otra parte, casi siempre en el número de archivos.
- **Añadir nodos casi nunca arregla un problema de rendimiento distribuido.** Ni
  el skew ni la falta de divisibilidad mejoran con más máquinas.
- **Ante un almacén, pregúntate cómo se lee el dato**, no qué volumen tiene. El
  patrón de acceso decide la familia; el volumen solo decide el tamaño.
