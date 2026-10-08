import type { ExamQuestionWithTopic } from "../../../types";

/**
 * Tema 2: Amazon Data Firehose y la entrega casi en tiempo real.
 *
 * El eje del tema es la diferencia entre un stream retenido y un servicio de
 * entrega. Firehose no guarda nada, no tiene consumidores y no reproduce: toma lo
 * que le mandan, lo acumula hasta un hint de tamaño o de tiempo, opcionalmente lo
 * transforma, y lo escribe en un destino. Casi todos los distractores del tema son
 * una función real de Firehose aplicada al eje equivocado —buffering donde se
 * preguntaba por retención, partición dinámica donde el destino no es S3— y la
 * explicación de cada uno dice cuál es el eje al que sí pertenece.
 */
export const TEMA_2_FIREHOSE: ExamQuestionWithTopic[] = [
  {
    id: "dea-t2-q01",
    topic: "firehose-delivery",
    prompt:
      "A security team queries an Amazon S3 bucket that an Amazon Data Firehose stream writes to, and the analysts report that events take about five minutes to show up. The stream is configured with a 64 MB buffer size and a 300-second buffer interval, and traffic is light enough that the size hint is never reached. Which change reduces the delay?",
    options: [
      {
        id: "A",
        text: "Increase the buffer size to 128 MB so that Firehose writes larger objects more efficiently.",
        correct: false,
        explanation:
          "This confuses throughput with latency, and it moves in the wrong direction. The size hint is already never reached, so raising it changes nothing at all; if traffic ever grew, a larger hint would make records wait longer, not less.",
      },
      {
        id: "B",
        text: "Enable record format conversion to Apache Parquet so that records are written as they arrive.",
        correct: false,
        explanation:
          "Record format conversion changes how a delivered object is laid out, never when it is delivered. The conversion still happens on the buffered batch, so the same five-minute wait applies to a Parquet file as to a JSON one.",
      },
      {
        id: "C",
        text: "Change the Firehose source from Direct PUT to a Kinesis data stream to shorten propagation delay.",
        correct: false,
        explanation:
          "Swapping the source is tempting because propagation delay is a real metric on the stream side. It governs how quickly Firehose sees a record, which is already fast here; the five minutes are spent in the delivery buffer afterwards, which the source setting does not touch.",
      },
      {
        id: "D",
        text: "Lower the buffer interval so that Firehose flushes on elapsed time instead of on accumulated size.",
        correct: true,
        explanation:
          "Correct. Firehose flushes when either hint is met first, and under light traffic the interval is always the one that fires. Lowering it from 300 seconds is the only setting here that shortens the wait, down to zero seconds if the team accepts many small objects.",
      },
    ],
    tips: [
      "Firehose delivers when either the buffer size or the buffer interval is reached, whichever comes first.",
      "Under light traffic the interval decides latency; under heavy traffic the size does. Identify which one is firing before tuning.",
      "The S3 buffer interval can go down to zero seconds, paid for with many small objects.",
    ],
  },
  {
    id: "dea-t2-q02",
    topic: "firehose-delivery",
    prompt:
      "A data engineer sets up an Amazon Data Firehose stream to write incoming JSON records to Amazon S3 as Apache Parquet. Every record fails with a format conversion error. What does the conversion require that is missing?",
    options: [
      {
        id: "A",
        text: "A table in the AWS Glue Data Catalog that declares the schema of the records.",
        correct: true,
        explanation:
          "Correct. Parquet is a typed columnar format, so Firehose has to be told the column names and types before it can write one. It reads that schema from a Glue Data Catalog table, and without the table there is nothing to convert against.",
      },
      {
        id: "B",
        text: "An AWS Lambda transformation that serialises each record into Parquet before delivery.",
        correct: false,
        explanation:
          "The reflex of assuming you must do the work yourself. Firehose performs the conversion natively once it has a schema, and a Lambda transformation here would be both redundant and wrong: transformations must return JSON, not Parquet bytes.",
      },
      {
        id: "C",
        text: "Dynamic partitioning enabled, so that Firehose can group records into Parquet files correctly.",
        correct: false,
        explanation:
          "This bundles two S3 features that are actually independent. Dynamic partitioning decides the prefix an object is written under; format conversion decides the bytes inside it. Either can be enabled without the other.",
      },
      {
        id: "D",
        text: "An Amazon Athena table defined over the destination prefix so that the Parquet schema can be inferred.",
        correct: false,
        explanation:
          "Close enough to be the strongest distractor, because an Athena table is a Glue Data Catalog table. The direction is backwards: the schema has to exist before delivery so Firehose can write with it, not afterwards over objects that were never produced.",
      },
    ],
    tips: [
      "Firehose record format conversion takes its target schema from a Glue Data Catalog table.",
      "Format conversion accepts JSON input only; any other input format needs a Lambda transformation that emits JSON first.",
      "Dynamic partitioning and format conversion are independent settings and neither one implies the other.",
    ],
  },
  {
    id: "dea-t2-q03",
    topic: "firehose-delivery",
    prompt:
      "Objects delivered to Amazon S3 must land under prefixes shaped like customer_id=123/year=2026/month=10/ so that Amazon Athena can prune partitions. The customer ID is a field inside each incoming JSON record. Which Firehose capability produces such a prefix?",
    options: [
      {
        id: "A",
        text: "A custom S3 prefix expression built entirely from the !{timestamp:yyyy} and !{timestamp:MM} namespaces.",
        correct: false,
        explanation:
          "Half right, which is what makes it dangerous. The timestamp namespace does produce the year and month components, but it can only read the delivery or approximate arrival time. It has no access to a field inside the payload, so the customer_id component is impossible this way.",
      },
      {
        id: "B",
        text: "Dynamic partitioning with an inline JQ expression that extracts the customer ID from each record.",
        correct: true,
        explanation:
          "Correct. Dynamic partitioning is exactly the feature that lets a prefix depend on record content: the inline JQ expression pulls customer_id out of the JSON and exposes it as a partition key that the prefix expression can reference.",
      },
      {
        id: "C",
        text: "Record format conversion to Parquet, which writes Hive-style prefixes from the Glue table's partition columns.",
        correct: false,
        explanation:
          "This assumes the Glue table's partition definition drives where Firehose writes. It does not: the Glue table tells Firehose what the columns are, and the delivery prefix is configured separately. Declaring partition columns on the table changes nothing about the S3 path.",
      },
      {
        id: "D",
        text: "An AWS Glue crawler scheduled to reorganise the delivered objects into partitioned prefixes.",
        correct: false,
        explanation:
          "A crawler is for discovery, not movement, and that is the confusion worth fixing. It inspects objects already sitting in S3 and registers the partitions it finds; it never rewrites keys or relocates data.",
      },
    ],
    tips: [
      "Dynamic partitioning is the only Firehose feature that lets the destination prefix depend on the contents of a record.",
      "The !{timestamp:...} namespace can only express delivery time, never a field inside the payload.",
      "A Glue crawler registers partitions that already exist in S3; it never moves or rewrites objects.",
    ],
  },
  {
    id: "dea-t2-q04",
    topic: "firehose-delivery",
    prompt:
      "An AWS Lambda function invoked by a Firehose stream enriches each record with a lookup, and some invocations return records flagged with a processing failure status. The compliance team requires that no such record be lost. Where does Firehose place records that the transformation reported as failed?",
    options: [
      {
        id: "A",
        text: "Back onto the source Kinesis data stream, so that they are picked up again on the next read.",
        correct: false,
        explanation:
          "A reinjection model borrowed from message brokers, where a nacked message returns to the queue. Firehose only ever reads from its source and writes to destinations; it has no path that writes back upstream.",
      },
      {
        id: "B",
        text: "Into an Amazon SQS dead-letter queue attached to the transformation function.",
        correct: false,
        explanation:
          "Lambda dead-letter queues apply to asynchronous invocations, which is where most people have met them. Firehose invokes its transformation synchronously and interprets the response itself, so the function's own dead-letter configuration is never consulted.",
      },
      {
        id: "C",
        text: "Into the configured S3 backup bucket, under a processing-failed prefix.",
        correct: true,
        explanation:
          "Correct. Firehose retries the invocation a configurable number of times, and records still flagged as failed are written to the S3 error bucket under processing-failed/ with the error metadata attached, which is what keeps the compliance requirement satisfiable.",
      },
      {
        id: "D",
        text: "Nowhere: records flagged as failed are dropped once the configured number of retries is exhausted.",
        correct: false,
        explanation:
          "Half of this is true, and that half is the bait. Firehose does stop retrying after the configured attempts, but it then writes the records to the error bucket instead of discarding them, provided one is configured. The real risk is forgetting to configure the bucket, not the service deleting data by design.",
      },
    ],
    tips: [
      "Records a transformation marks as failed go to the S3 error bucket under processing-failed/, not to a dead-letter queue.",
      "Firehose invokes its transformation function synchronously, so Lambda's own retry and dead-letter settings do not apply.",
      "Error and source-record backup to S3 has to be configured explicitly; it is not on by default.",
    ],
  },
  {
    id: "dea-t2-q05",
    topic: "firehose-delivery",
    prompt:
      "Clickstream data must reach Amazon Redshift within a few minutes of being produced. The team has no capacity to build or operate consumer applications, and it has confirmed that the downstream model tolerates a record being written twice on rare occasions. Which ingestion path meets these constraints with no consumer code to maintain?",
    options: [
      {
        id: "A",
        text: "Amazon Kinesis Data Streams with a Kinesis Client Library application that issues COPY commands against Redshift.",
        correct: false,
        explanation:
          "Technically sound, and it is how this was built before Firehose existed, which is why it still feels like the real answer. It is also an application the team has to write, deploy, scale, and keep alive, which is the one thing the scenario rules out.",
      },
      {
        id: "B",
        text: "Amazon MSK with the Redshift sink connector deployed on MSK Connect.",
        correct: false,
        explanation:
          "Managed enough that it looks like it satisfies the no-code requirement. There is still a Kafka cluster to size and a connector configuration to own, and nothing in the scenario suggests the team needs Kafka semantics to begin with.",
      },
      {
        id: "C",
        text: "Amazon Kinesis Data Streams with an AWS Lambda consumer that inserts rows through the Redshift Data API.",
        correct: false,
        explanation:
          "The word serverless makes this read as low effort. It is still a consumer the team maintains, and row-by-row inserts are the classic Redshift anti-pattern: Redshift is built for bulk loads, so this path degrades badly as volume grows.",
      },
      {
        id: "D",
        text: "Amazon Data Firehose with Amazon Redshift configured as the delivery destination.",
        correct: true,
        explanation:
          "Correct. Firehose is the no-code delivery path: you configure a destination rather than write a consumer. It stages batches in S3 and issues COPY on the team's behalf, which is both the right Redshift loading pattern and consistent with the accepted at-least-once duplicates.",
      },
    ],
    tips: [
      "Firehose is configuration instead of code: you pick a destination, and there is no consumer application to operate.",
      "Firehose delivers at least once, so any destination behind it has to tolerate the occasional duplicate.",
      "Redshift should be loaded with COPY from S3 in batches, which is exactly what the Firehose Redshift destination does for you.",
    ],
  },
  {
    id: "dea-t2-q06",
    topic: "firehose-delivery",
    prompt:
      "An architect proposes replacing a Kinesis data stream with Amazon Data Firehose in an ingestion path. One requirement states that if a defect is found in the downstream aggregation logic, the team must be able to reprocess the previous 48 hours of raw events from the ingestion layer. Why does Firehose on its own fail that requirement?",
    options: [
      {
        id: "A",
        text: "Its buffer interval can be set no higher than 900 seconds, which is far shorter than 48 hours.",
        correct: false,
        explanation:
          "The quota is real, which is why this sounds authoritative, but it answers a different question. The buffer interval controls how long records wait before delivery, not how long they remain available afterwards. Even an unlimited buffer would not give you a replayable history.",
      },
      {
        id: "B",
        text: "It does not retain delivered records, so there is no position that a consumer could rewind to.",
        correct: true,
        explanation:
          "Correct. Firehose is a delivery service, not a log: once a batch has been written to the destination, Firehose holds nothing. Replay requires retained records and a readable position, which is precisely what a Kinesis data stream provides and Firehose does not.",
      },
      {
        id: "C",
        text: "It delivers records at most once, so a reprocessing run would miss records that were already consumed.",
        correct: false,
        explanation:
          "This inverts the actual delivery guarantee. Firehose is at least once, so duplicates are the expected anomaly and silent loss is not. Someone who remembers that Firehose has a weaker guarantee than they want often misremembers which direction it is weak in.",
      },
      {
        id: "D",
        text: "It supports only one destination per stream, so a second application cannot read the same data.",
        correct: false,
        explanation:
          "The statement itself is accurate, which makes it a convincing wrong reason. Fan-out is not what the requirement asked about: even a Firehose stream with ten destinations still could not hand anyone the last 48 hours, because it kept none of it.",
      },
    ],
    tips: [
      "Firehose keeps nothing after delivery, so any replay requirement needs a retained stream in front of it.",
      "Firehose guarantees at-least-once delivery: plan for duplicates downstream, not for silent loss.",
      "A true statement can still be the wrong reason. Match the explanation to the requirement that was actually stated.",
    ],
  },
  {
    id: "dea-t2-q07",
    topic: "firehose-delivery",
    prompt:
      "Log documents delivered to Amazon OpenSearch Service all accumulate in one index, which has grown so large that removing old data has become slow and expensive. The team wants a separate index per day so that aging data can be discarded by dropping whole indexes. Which Firehose setting provides this?",
    options: [
      {
        id: "A",
        text: "A buffer interval of 86,400 seconds, so that exactly one batch is delivered per day.",
        correct: false,
        explanation:
          "This equates the delivery period with the index period, which are unrelated, and the number is not even permitted: the buffer interval tops out at 900 seconds. Batches do not create indexes; the index name does.",
      },
      {
        id: "B",
        text: "A Lambda transformation that stamps every document with the date it was produced.",
        correct: false,
        explanation:
          "A date field makes date-range queries work well, and that usefulness is the trap. It does nothing about index layout: all those dated documents still land in the same index, and deleting by query is the slow operation the team is trying to escape.",
      },
      {
        id: "C",
        text: "The index rotation period, set to OneDay.",
        correct: true,
        explanation:
          "Correct. The OpenSearch destination has an index rotation period that appends a date suffix to the configured index name, producing a new index per hour, day, week, or month. Dropping yesterday's index then becomes a single cheap operation.",
      },
      {
        id: "D",
        text: "Dynamic partitioning with a JQ expression that extracts the log date from each document.",
        correct: false,
        explanation:
          "The strongest distractor for anyone who learned dynamic partitioning as the general answer to splitting data by date. Dynamic partitioning exists only for the Amazon S3 destination, so it is not even configurable on a stream that delivers to OpenSearch.",
      },
    ],
    tips: [
      "The OpenSearch destination has an index rotation period that appends a date suffix to the index name.",
      "Dynamic partitioning applies only to the Amazon S3 destination.",
      "Dropping a whole index is far cheaper than deleting documents, which is why time-based rotation is the standard log pattern.",
    ],
  },
  {
    id: "dea-t2-q08",
    topic: "firehose-delivery",
    prompt:
      "One feed of events has to be delivered to Amazon S3 by Firehose and simultaneously read by a fraud detection application that the team is building on the Kinesis Client Library, with latency measured in seconds. The producers must publish each event only once. How should the path be arranged?",
    options: [
      {
        id: "A",
        text: "Publish to a Kinesis data stream, and configure the Firehose stream to use that data stream as its source.",
        correct: true,
        explanation:
          "Correct. A Kinesis data stream can be the source of a Firehose stream, so one publish feeds both paths: the KCL application reads the stream directly in seconds, and Firehose independently batches the same records into S3.",
      },
      {
        id: "B",
        text: "Publish to the Firehose stream with Direct PUT, and have the fraud application read the delivered objects from Amazon S3.",
        correct: false,
        explanation:
          "This does satisfy the publish-once rule and does get data to both places, which is why it is the most chosen wrong answer. The fraud application now waits for the delivery buffer and then has to poll S3, so its latency is measured in minutes rather than seconds.",
      },
      {
        id: "C",
        text: "Publish to the Firehose stream with Direct PUT, and register the fraud application as an enhanced fan-out consumer of it.",
        correct: false,
        explanation:
          "It attaches a Kinesis Data Streams feature to the wrong service. Firehose exposes no consumer API at all: nothing reads from a Firehose stream, so there is no consumer to register with or without enhanced fan-out.",
      },
      {
        id: "D",
        text: "Publish to two Firehose streams, one delivering to Amazon S3 and one delivering to the fraud application behind an HTTP endpoint.",
        correct: false,
        explanation:
          "Publishing to two streams breaks the stated requirement that producers publish once, and it doubles the chance of the two paths diverging. The HTTP endpoint destination is also buffered, so the fraud application still would not get second-level latency.",
      },
    ],
    tips: [
      "A Kinesis data stream can act as a Firehose source, which gives you durable delivery and real-time consumers from a single publish.",
      "Firehose has no consumer API: it only writes to destinations, so nothing reads from it.",
      "When producers must publish once but two systems need the data, put a retained stream first and attach consumers to it.",
    ],
  },
  {
    id: "dea-t2-q09",
    topic: "firehose-delivery",
    prompt:
      "A Firehose stream writes JSON to Amazon S3, where analysts run Athena queries that select 3 of the 60 fields and almost always scan the entire history. Both storage cost and Athena scan cost are over budget, and the producers cannot be modified. Which Firehose configuration reduces both?",
    options: [
      {
        id: "A",
        text: "Enable GZIP compression on the delivered objects.",
        correct: false,
        explanation:
          "The closest wrong answer, because compression genuinely cuts storage and Athena is billed on the compressed bytes it reads. A row-oriented file still has to be read in full to reach three fields, so this leaves the biggest saving on the table: 57 unneeded columns are decompressed on every query.",
      },
      {
        id: "B",
        text: "Raise the buffer size so that Firehose writes fewer and larger JSON objects.",
        correct: false,
        explanation:
          "Larger objects do help Athena, but with planning overhead rather than scan volume: fewer files mean less listing and fewer opens. The bytes stored and the bytes scanned are essentially unchanged, so neither budget problem moves.",
      },
      {
        id: "C",
        text: "Enable dynamic partitioning on the event date so that Athena can prune partitions.",
        correct: false,
        explanation:
          "Partition pruning is the standard Athena cost lever, which is why it comes to mind first. It only pays off when queries filter on the partition column, and the scenario says these queries scan the whole history, so there is nothing to prune.",
      },
      {
        id: "D",
        text: "Enable record format conversion to Apache Parquet with Snappy compression.",
        correct: true,
        explanation:
          "Correct. Parquet is columnar, so Athena reads only the 3 columns a query names instead of all 60, and Snappy shrinks what is stored. It is the one option that attacks both which bytes are read and how many bytes exist.",
      },
    ],
    tips: [
      "Compression reduces the bytes stored and scanned; a columnar format also reduces which bytes have to be touched at all.",
      "Partition pruning saves money only when queries filter on the partition column.",
      "Fewer, larger objects help query planning time, which is a different cost from data scanned.",
    ],
  },
  {
    id: "dea-t2-q10",
    topic: "firehose-delivery",
    prompt:
      "Midway through a product launch, producers using Direct PUT against a Firehose stream begin receiving ServiceUnavailableException responses. The destination is healthy, CloudWatch confirms the stream has reached its default Direct PUT throughput quota for the Region, and no record produced during the launch may be lost. What should the team do?",
    options: [
      {
        id: "A",
        text: "Split the producers across a second Firehose stream with the same destination, redeploying them during the launch.",
        correct: false,
        explanation:
          "The instinct is sound, because Direct PUT throughput quotas really do apply per Firehose stream, so a second stream would come with its own allowance. It is the wrong move mid-incident: it means redeploying every producer while traffic is peaking, and it does nothing for the records being rejected right now, which only a retry can save.",
      },
      {
        id: "B",
        text: "Request a quota increase for the Region and have the producers retry the rejected records with exponential backoff until it takes effect.",
        correct: true,
        explanation:
          "Correct. ServiceUnavailableException signals a throughput limit rather than a broken destination, so two things matter: not losing what is being refused, and raising the ceiling. Backoff and retry protect the launch data immediately, and the quota increase is the durable fix that needs no change to the producers.",
      },
      {
        id: "C",
        text: "Increase the buffer size so that the stream can accept more records in each request.",
        correct: false,
        explanation:
          "This reads buffering as an intake setting. Buffer hints govern how Firehose groups records on their way out to the destination, and they are applied after a record has already been accepted, so they cannot change what the ingestion quota allows in.",
      },
      {
        id: "D",
        text: "Enable record format conversion so that Firehose compresses incoming records and consumes less of the quota.",
        correct: false,
        explanation:
          "Conversion and compression also happen after ingestion, on the buffered batch. The quota is measured against what producers send, so compressing the output has no effect on the rate at which Firehose will accept input.",
      },
    ],
    tips: [
      "ServiceUnavailableException from Firehose means a throughput quota was hit; the response is backoff plus a quota increase request.",
      "Direct PUT throughput quotas apply per Firehose stream per Region, so they can be raised by a support request rather than worked around.",
      "Buffering, conversion and compression all happen after a record is accepted and cannot relieve an ingestion quota.",
    ],
  },
  {
    id: "dea-t2-q11",
    topic: "firehose-delivery",
    multiple: true,
    prompt:
      "A Firehose stream delivers documents to Amazon OpenSearch Service. The security team requires that no event be lost if OpenSearch rejects a document or becomes unreachable for up to an hour. Which two configurations meet that requirement? (Choose two.)",
    options: [
      {
        id: "A",
        text: "Set the index rotation period so that rejected documents are written into the next day's index.",
        correct: false,
        explanation:
          "Index rotation decides the name of the index that successful documents land in. A rejected document was never indexed at all, so no rotation setting gives it a second home.",
      },
      {
        id: "B",
        text: "Configure an Amazon S3 backup bucket so that documents Firehose could not deliver are written there.",
        correct: true,
        explanation:
          "Correct. The S3 backup bucket is the durable landing place for anything the destination refused or that outlived the retry window. Without it, records that exhaust retries are genuinely gone, which is the loss the security team is guarding against.",
      },
      {
        id: "C",
        text: "Enable record format conversion to Apache Parquet so that OpenSearch accepts the rejected documents.",
        correct: false,
        explanation:
          "Format conversion is an S3-destination feature and OpenSearch ingests JSON documents, not Parquet files. Rejections normally come from mapping conflicts or cluster pressure, neither of which a file format changes.",
      },
      {
        id: "D",
        text: "Change the destination to Direct PUT so that producers are notified and can retry on failure.",
        correct: false,
        explanation:
          "This mixes up the two ends of the stream: Direct PUT is a source type, not a destination, so it cannot be selected here. The confusion is understandable because both are configured on the same stream, but only one of them faces the producers.",
      },
      {
        id: "E",
        text: "Set the retry duration long enough to cover an hour of destination unavailability.",
        correct: true,
        explanation:
          "Correct. Firehose retries a failed delivery for the configured duration before giving up, so a retry duration shorter than the outage the team must survive would start writing records off to backup while OpenSearch was merely slow to return.",
      },
    ],
    tips: [
      "Durable delivery to OpenSearch rests on two settings: how long Firehose retries, and where records go when it stops.",
      "The S3 backup bucket is opt-in. Without it, records that exhaust retries are lost.",
      "Direct PUT is a source type; OpenSearch, S3 and Redshift are destinations. Do not confuse the two ends of a stream.",
    ],
  },
  {
    id: "dea-t2-q12",
    topic: "firehose-delivery",
    multiple: true,
    prompt:
      "A stream using Direct PUT sends about 50 KB per second to Amazon S3 with a 1 MB buffer size and a 60-second buffer interval. Athena queries over the destination are slow, and the monthly S3 request charges are higher than forecast. Which two changes address both symptoms? (Choose two.)",
    options: [
      {
        id: "A",
        text: "Raise the buffer size so that Firehose accumulates more data before writing an object.",
        correct: true,
        explanation:
          "Correct. At 50 KB per second the 1 MB hint is reached every twenty seconds, so the size limit is one of the two things producing a flood of tiny objects. Raising it is half of the fix.",
      },
      {
        id: "B",
        text: "Lower the buffer interval to zero seconds so that objects are written as soon as records arrive.",
        correct: false,
        explanation:
          "This treats the symptom as latency when it is object count. Zero-second buffering produces the largest possible number of the smallest possible objects, which makes both the request charges and the Athena planning time considerably worse.",
      },
      {
        id: "C",
        text: "Enable dynamic partitioning keyed on the request ID carried in each record.",
        correct: false,
        explanation:
          "Partitioning is a sound idea attached to a ruinous key. A near-unique field creates one prefix, and effectively one object, per record, which multiplies the object count instead of reducing it and leaves Athena with an unusable partition layout.",
      },
      {
        id: "D",
        text: "Raise the buffer interval so that more records accumulate between flushes.",
        correct: true,
        explanation:
          "Correct, and it is required alongside the size change rather than instead of it. Firehose flushes on whichever hint it reaches first, so leaving the interval at 60 seconds would cap objects at roughly 3 MB no matter how large the size hint became.",
      },
      {
        id: "E",
        text: "Enable server-side encryption with an AWS KMS key on the destination bucket.",
        correct: false,
        explanation:
          "Encryption is good practice and entirely beside the point here. It changes neither the number of objects written nor the volume Athena scans, and KMS adds its own per-request cost on top of the charges the team is trying to reduce.",
      },
    ],
    tips: [
      "Firehose flushes on whichever hint is reached first, so changing only one of the two may change nothing.",
      "Many small objects cost S3 requests and slow Athena, which spends its time listing and opening files instead of reading them.",
      "Dynamic partitioning on a high-cardinality field multiplies object count rather than reducing it.",
    ],
  },
];
