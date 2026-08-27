# 2.17 — ★ Tablas comparativas: Data Streams vs. Firehose vs. MSK vs. Flink vs. DMS vs. AppFlow

> Módulo 2 · Dominio 1 (34 %) · Repaso comparativo · ⏱️ 6 min de lectura

Los servicios de ingesta son la familia que el examen confunde con más
insistencia. Esta lección los pone uno junto a otro con los criterios que deciden.
Vuelve aquí cada vez que falles una pregunta de ingesta.

## 📊 Las tablas

### Los servicios de streaming, uno junto a otro

| | **Kinesis Data Streams** | **Kinesis Data Firehose** | **Amazon MSK** | **Managed Flink** |
|---|---|---|---|---|
| Qué hace | **Retiene** un flujo | **Entrega** a un destino | Retiene (Kafka) | **Procesa** el flujo |
| Retención | 24 h – **365 días** | No retiene | Configurable, **indefinida** | No aplica |
| Reprocesar | Sí | **No** | Sí | Desde el origen |
| Consumidores | Varios; EFO da 2 MB/s a cada uno | El destino configurado | Consumer groups | No aplica |
| Latencia | Sub-segundo | Desde 60 s (o cero buffering) | Sub-segundo | Sub-segundo |
| Esfuerzo | Escribes el consumidor | **Ninguno** | El mayor | Escribes la aplicación |
| Estado y ventanas | No | No | No | **Sí** |
| Se paga por | Shard/hora o datos | Datos ingeridos | Bróker/hora o uso | KPU/hora |

### Los servicios de ingesta no-streaming

| | **AWS DMS** | **Zero-ETL** | **Amazon AppFlow** | **DataSync / Transfer Family** |
|---|---|---|---|---|
| Origen | Bases de datos | Bases y SaaS soportados | Aplicaciones SaaS | Archivos |
| Destino | S3, Redshift, DynamoDB, OpenSearch, bases | **Redshift** (y DynamoDB→OpenSearch) | S3, Redshift, SaaS | S3 y otros |
| Transformación | Reglas simples | **Ninguna** | Filtros, enmascarado | Ninguna |
| Esfuerzo | Dimensionar y operar | **Mínimo** | Configuración | Bajo |
| Caso propio | Migrar sin parar el origen | Replicar tal cual | Integrar SaaS sin código | Mover archivos |

### Límites que el examen pregunta

| Servicio | Límite |
|---|---|
| Shard de Kinesis, escritura | **1 MB/s** o **1.000 registros/s** |
| Shard de Kinesis, lectura compartida | **2 MB/s**, repartidos entre todos |
| Enhanced fan-out | **2 MB/s por consumidor**, hasta **20** registrados |
| Latencia de lectura | ~200 ms compartido (1 consumidor) · **~70 ms** con EFO |
| Retención de Kinesis | 24 h por defecto, hasta **365 días** |
| Retención de DynamoDB Streams | **24 h**, no ampliable |
| Firehose, intervalo de búfer | **60 – 900 segundos** |
| Firehose, particionado dinámico | **500 particiones activas** (hasta 2.500) |
| Lambda ESM, tamaño de lote | 100 por defecto, hasta **10.000** |
| Lambda ESM, paralelismo por shard | 1 por defecto, hasta **10** |
| Lambda, duración máxima | **15 minutos** |

### Cómo se lee un consumidor de Kinesis

| | Compartido | Enhanced fan-out |
|---|---|---|
| Capacidad | 2 MB/s **entre todos** | 2 MB/s **cada uno** |
| Modelo | El consumidor pide (`GetRecords`) | Kinesis empuja (`SubscribeToShard`) |
| Latencia | ~200 ms con 1 · ~1.000 ms con 5 | **~70 ms**, con 1 o con 5 |
| Costo | Incluido | Aparte |

### Semántica de entrega

| Semántica | Qué garantiza | Dónde |
|---|---|---|
| At-most-once | No duplica, **puede perder** | Casi nunca aceptable |
| **At-least-once** | No pierde, **puede duplicar** | Kinesis, DynamoDB Streams, SQS estándar, Lambda |
| Exactly-once | Ni pierde ni duplica | SQS FIFO (ventana de 5 min); efecto en Flink |

> La consecuencia práctica: **el consumidor debe ser idempotente**. La entrega
> única casi nunca la da el transporte.

## 🧭 El árbol de decisión

```
¿El dato llega como flujo continuo?
├── NO → ¿qué es el origen?
│        ├── Base de datos    → ¿destino Redshift y sin transformar?
│        │                      ├── Sí → ZERO-ETL
│        │                      └── No → DMS (+ SCT si cambia de motor)
│        ├── Aplicación SaaS  → AppFlow (o zero-ETL si va a Redshift)
│        └── Archivos         → S3 · DataSync · Transfer Family · Snow Family
│
└── SÍ → ¿hay que releer o hay varios consumidores independientes?
         ├── NO  → ¿el destino está en la lista de Firehose?
         │          ├── Sí → FIREHOSE (menor esfuerzo)
         │          └── No → Data Streams + consumidor propio
         └── SÍ  → ¿ya usan Kafka o exigen portabilidad?
                    ├── Sí → AMAZON MSK
                    └── No → KINESIS DATA STREAMS

¿Hay que agregar por ventanas, unir flujos o detectar ausencias?
└── Sí → MANAGED SERVICE FOR APACHE FLINK, siempre.
```

## ⚠️ Los pares que más se confunden

- **Data Streams vs. Firehose:** retener frente a entregar. Firehose no permite
  reprocesar y sus destinos son una lista cerrada; Data Streams exige que escribas
  el consumidor.
- **Firehose vs. Flink:** Firehose transforma **por registro y sin estado**; Flink
  agrega, une y recuerda. No compiten.
- **Kinesis vs. MSK:** integración nativa y menor esfuerzo frente a API de Kafka,
  portabilidad, retención indefinida y conectores.
- **DMS vs. zero-ETL:** DMS admite muchos orígenes y destinos y hay que operarlo;
  zero-ETL no se opera pero solo va a Redshift y no transforma.
- **DMS vs. SCT:** DMS mueve los datos; SCT convierte el esquema. Una migración
  entre motores distintos necesita los dos.
- **DynamoDB Streams vs. Kinesis para DynamoDB:** 24 h y orden garantizado frente a
  365 días y todo el ecosistema, con posibles duplicados y desorden.
- **Compartido vs. enhanced fan-out:** capacidad repartida frente a capacidad
  propia; ~200 ms frente a ~70 ms.
- **KPL vs. KCL:** producir —agregar, agrupar, reintentar— frente a consumir
  —checkpoints y reparto de shards—.
- **Bisección vs. informe de fallos parciales:** partir el lote para aislar al
  culpable frente a decir exactamente qué registros reintentar.
- **Programación vs. evento:** intervalos fijos frente a reaccionar a algo. Si el
  origen puede avisar, avisar gana.
- **EventBridge vs. Scheduler vs. Pipes:** enrutar eventos que ocurren, ejecutar a
  una hora con zona horaria, o conectar origen y destino con filtro y
  enriquecimiento.
- **Fan-in vs. fan-out:** converger muchos productores frente a repartir a muchos
  consumidores.
- **Idempotencia vs. replayability:** que reprocesar no duplique frente a que el
  origen conserve los datos. Reprocesar exige las dos.

## 🎯 Pistas para el examen

- **Lee siempre la condición de optimización antes de las opciones.** *Least
  operational overhead* mueve la respuesta hacia Firehose, zero-ETL y AppFlow;
  *real time* la mueve hacia Data Streams y Flink.
- **"Reprocesar", "releer" o "un consumidor nuevo necesita el histórico" descarta
  Firehose de inmediato.** Es el descarte más rentable del módulo.
- **"Hay capacidad pero da errores de throughput" es siempre partition key**, tanto
  en Kinesis como en DynamoDB. Añadir shards no lo arregla.
- **"Detectar que algo no ocurrió" o cualquier ventana deslizante es Flink.**
  Ninguna función por registro puede hacerlo.
- **Comprueba si el destino está en la lista cerrada de Firehose** antes de
  elegirlo. Si no está, la respuesta cambia aunque todo lo demás encaje.
- **Ante dos motores de base de datos distintos, la opción debe incluir la
  conversión de esquema.** Si solo dice DMS, está incompleta.
- **Ninguna respuesta correcta descarta datos en silencio** cuando el destino
  falla. Si una opción implica pérdida, elimínala sin analizarla.
