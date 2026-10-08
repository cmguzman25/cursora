import type { ExamQuestionWithTopic } from "../../../types";

/**
 * Tema 5: caudal, latencia y reproducibilidad de una ruta de ingesta.
 *
 * El eje del tema son las propiedades que la guía del examen pide comparar entre
 * servicios y que no se contestan nombrando un servicio: cuánto caudal hace falta,
 * cuánta latencia se tolera, cuánto se puede volver a leer, qué pasa cuando el
 * consumidor va más lento que el productor, y cuánto cuesta cada una de esas
 * decisiones. Varios distractores del tema son mejoras reales aplicadas al término
 * que no domina el resultado, y la explicación dice cuál término sí lo domina.
 */
export const TEMA_5_CAUDAL: ExamQuestionWithTopic[] = [
  {
    id: "dea-t5-q01",
    topic: "throughput-replayability",
    prompt:
      "A finance dashboard is refreshed once each morning from 40 GB of transaction records that a partner delivers overnight as a single compressed archive. The team has been asked to minimise both cost and operational effort. Which ingestion design fits the requirement?",
    options: [
      {
        id: "A",
        text: "A scheduled batch job that loads the overnight archive into the target table once per day.",
        correct: true,
        explanation:
          "Correct. The data arrives once a day and is consumed once a day, so a daily batch load is both the cheapest and the least to operate. Nothing downstream could use fresher data, because the source does not produce any.",
      },
      {
        id: "B",
        text: "A Kinesis data stream fed by a process that splits the archive into records, with a Flink application maintaining the table continuously.",
        correct: false,
        explanation:
          "This is the modern-sounding answer and it is the one worth dismantling. Streaming cannot be fresher than its source: the archive only exists once a night, so the pipeline spends 23 hours idle and costs more to run and operate for a table that updates exactly as often as before.",
      },
      {
        id: "C",
        text: "A Firehose stream with a 900-second buffer interval, reading the archive as it is uploaded.",
        correct: false,
        explanation:
          "Choosing the longest available buffer interval shows an instinct that the data is not urgent, which is correct, and then uses a near-real-time delivery service anyway. A 15-minute buffer is meaningless against a once-daily arrival, and the archive still has to be decompressed and split by something.",
      },
      {
        id: "D",
        text: "A DMS task with ongoing replication reading the partner's source database.",
        correct: false,
        explanation:
          "A reasonable design for a different scenario, which is what makes it tempting: continuous change capture is how you keep a table current. There is no database here to connect to. The partner hands over files, and DMS has no file source.",
      },
    ],
    tips: [
      "A streaming pipeline cannot be fresher than its source; a once-nightly file makes it cost more for the same result.",
      "Match ingestion frequency to how often the data actually changes, not to how often you wish it did.",
      "Check what the source can physically produce before comparing streaming and batch at all.",
    ],
  },
  {
    id: "dea-t5-q02",
    topic: "throughput-replayability",
    prompt:
      "A consumer writes each record it receives as a new row in the target table. Operations reports that a handful of rows appear two or three times after every deployment of that consumer. The ingestion layer guarantees at-least-once delivery. What should be changed?",
    options: [
      {
        id: "A",
        text: "Reconfigure the ingestion layer for exactly-once delivery so that no record is ever delivered twice.",
        correct: false,
        explanation:
          "The most attractive wrong answer, because it appears to remove the problem at the root. No such setting exists on these ingestion services: at-least-once is the guarantee they offer, and a redeploy that restarts from the last checkpoint will always re-deliver whatever was in flight.",
      },
      {
        id: "B",
        text: "Make the write idempotent by deriving the row's key from the record, so a repeat rewrites the same row.",
        correct: true,
        explanation:
          "Correct. If duplicates are a normal consequence of the delivery guarantee, the consumer has to be built to absorb them. A key derived from the record turns a second delivery into an overwrite of an identical row rather than an extra one.",
      },
      {
        id: "C",
        text: "Checkpoint more frequently so that fewer records are replayed when the consumer restarts.",
        correct: false,
        explanation:
          "Genuinely effective and genuinely insufficient, which is what makes it the closest miss. More frequent checkpoints shrink the replay window and therefore the number of duplicates, but there is always a window, so the defect becomes rarer instead of gone.",
      },
      {
        id: "D",
        text: "Add a deduplication step that buffers records for five minutes and discards repeats within that window.",
        correct: false,
        explanation:
          "Windowed deduplication is a real technique and it would catch most of these. The window is the weakness: a deployment that takes longer than five minutes replays records whose originals have already left the buffer, so the duplicates come back at exactly the moment they are expected.",
      },
    ],
    tips: [
      "At-least-once delivery makes duplicates a normal event, so the consumer is where the problem gets solved.",
      "An idempotent write derives its key from the record, turning a replay into an overwrite.",
      "Shrinking the replay window lowers the duplicate count and never reaches zero.",
    ],
  },
  {
    id: "dea-t5-q03",
    topic: "throughput-replayability",
    prompt:
      "A design review has to choose the ingestion primitive for a new path with three requirements: several unrelated consumers must each see every record, any record must be re-readable for up to seven days, and ordering must hold per entity. Which choice satisfies all three?",
    options: [
      {
        id: "A",
        text: "An Amazon SQS standard queue, which scales to any volume without capacity planning.",
        correct: false,
        explanation:
          "The scaling claim is true and answers none of the three requirements. A standard queue makes no ordering promise, deletes a message once it is processed so nothing can be re-read, and splits messages among its consumers rather than giving each one everything.",
      },
      {
        id: "B",
        text: "An Amazon SQS FIFO queue, which preserves ordering within each message group.",
        correct: false,
        explanation:
          "This satisfies exactly one of the three requirements, and satisfying the hardest-sounding one makes it feel sufficient. A processed message is deleted, so there is no seven-day re-read, and consumers still compete for messages instead of each receiving the full feed.",
      },
      {
        id: "C",
        text: "A Kinesis data stream with its retention period set to seven days.",
        correct: true,
        explanation:
          "Correct. A stream is a retained log, so reading does not consume: every consumer reads the whole stream independently, any consumer can start from an older position inside the retention window, and ordering holds per shard, which the partition key controls.",
      },
      {
        id: "D",
        text: "An Amazon SQS standard queue per consumer, each subscribed to a shared Amazon SNS topic.",
        correct: false,
        explanation:
          "The strongest distractor, because fan-out genuinely solves the first requirement and is the right pattern when that is all you need. The other two remain unmet: each queue still deletes what it has processed, so nothing is re-readable, and standard queues still do not order.",
      },
    ],
    tips: [
      "A queue distributes work; a stream is a retained log that many readers can each read in full.",
      "A message is gone once deleted from a queue, which rules queues out whenever replay is required.",
      "Topic-to-queue fan-out buys multiple consumers without buying replay.",
    ],
  },
  {
    id: "dea-t5-q04",
    topic: "throughput-replayability",
    prompt:
      "Producers sustain 10,000 records per second across an eight-hour working day and almost nothing outside it, while the consumer steadily processes 4,000 per second around the clock. No record may be lost, and the business has confirmed that results arriving a few hours late are acceptable. What is the appropriate response?",
    options: [
      {
        id: "A",
        text: "Throttle the producers down to 4,000 records per second during the working day.",
        correct: false,
        explanation:
          "Protecting a downstream by slowing the upstream is a legitimate instinct in some systems. It fails here because the producers are reporting events that are already happening: slowing them means either buffering at the producer, which just moves the problem, or discarding records, which the requirement forbids.",
      },
      {
        id: "B",
        text: "Scale the consumer out until it sustains 10,000 records per second through the day.",
        correct: false,
        explanation:
          "Sound engineering and the most commonly chosen answer, which is why the stated tolerance matters. The business accepts results a few hours late, so provisioning for the arrival rate buys latency nobody asked for and is paid for every day.",
      },
      {
        id: "C",
        text: "Shorten the stream's retention period so that the backlog cannot grow without bound.",
        correct: false,
        explanation:
          "This inverts what retention does. Retention is not a cap on the backlog, it is the deadline by which the backlog has to be consumed, so shortening it does not prevent the lag. It converts the lag into the data loss the requirement rules out.",
      },
      {
        id: "D",
        text: "Let the backlog accumulate during the day, and set retention comfortably beyond the time the consumer needs to drain it overnight.",
        correct: true,
        explanation:
          "Correct, and the arithmetic has to be checked before accepting it: eight hours at 10,000 per second is 288 million records, against a daily consumer capacity of 345 million at 4,000 per second around the clock. The backlog peaks near 173 million at the end of the day and clears in about twelve hours, so a retention period of a day or more leaves real margin.",
      },
    ],
    tips: [
      "A retained stream absorbs a mismatch between producer and consumer rates; a backlog is fine if retention outlasts it.",
      "Retention is the deadline for consuming a backlog, not a limit on how large it may grow.",
      "Size a consumer against the latency requirement, not reflexively against the peak arrival rate.",
    ],
  },
  {
    id: "dea-t5-q05",
    topic: "throughput-replayability",
    prompt:
      "Each user action arrives as its own record, and the pipeline must emit one summary per user session, where a session is considered finished after 30 minutes without activity from that user. Which processing approach supports this directly?",
    options: [
      {
        id: "A",
        text: "A function invoked with each batch of records read from the stream.",
        correct: false,
        explanation:
          "The default streaming consumer, and it is stateless: each invocation sees one batch and nothing else, so it cannot know whether 30 quiet minutes have passed for a user. Teams that take this route end up keeping session state in a separate table, which is reimplementing a windowing engine by hand.",
      },
      {
        id: "B",
        text: "Amazon Managed Service for Apache Flink with a session window keyed by user.",
        correct: true,
        explanation:
          "Correct. A session window is the exact primitive described: Flink keeps per-user state, extends the window while records keep arriving, and emits the summary once the configured inactivity gap elapses, including the timers that make the gap fire without new input.",
      },
      {
        id: "C",
        text: "A Firehose transformation function that groups the records inside each delivery buffer.",
        correct: false,
        explanation:
          "A transformation does get to see a group of records together, which is where the appeal lies. The grouping is a delivery buffer, bounded by size and time hints that have nothing to do with user activity, so its boundaries never coincide with a session's.",
      },
      {
        id: "D",
        text: "An Athena query over the delivered objects that groups by user and orders by event timestamp.",
        correct: false,
        explanation:
          "The strongest distractor, because SQL really can reconstruct sessions from gaps and this is how sessions are often analysed. It is a batch computation over data that has already landed, so the pipeline does not emit session summaries; someone runs a query later and gets them.",
      },
    ],
    tips: [
      "Session and sliding windows are stateful operations that a stream processing engine provides and a stateless function does not.",
      "A gap-based boundary needs timers that fire without new input, which is what rules out per-batch processing.",
      "Delivery buffer boundaries are arbitrary and never align with business windows.",
    ],
  },
  {
    id: "dea-t5-q06",
    topic: "throughput-replayability",
    prompt:
      "An event has to be queryable in Athena within 90 seconds of being produced. The path is: producer, then a Kinesis data stream, then a Firehose stream whose delivery hints are set to 5 MB and 300 seconds, then Amazon S3. Measured time from production to queryable is about five minutes. Which component should be addressed first?",
    options: [
      {
        id: "A",
        text: "The producer, by adopting the Kinesis Producer Library to reduce publish latency.",
        correct: false,
        explanation:
          "A real improvement on the wrong term of the sum. Publish latency is measured in milliseconds, so even eliminating it entirely leaves the five minutes essentially unchanged, and the KPL's buffering would actually add a little.",
      },
      {
        id: "B",
        text: "The data stream, by registering the Firehose stream for enhanced fan-out.",
        correct: false,
        explanation:
          "Enhanced fan-out is the standard answer to stream latency, which is exactly the trap. It takes propagation delay from roughly a second to roughly 70 milliseconds, a saving of under one second against a budget overrun of more than three minutes.",
      },
      {
        id: "C",
        text: "The Firehose buffer interval, which accounts for almost all of the measured delay.",
        correct: true,
        explanation:
          "Correct, and the measurement itself proves it: five minutes is the 300-second interval, so if the 5 MB hint were filling first, delivery would already be happening sooner. The interval is what fires, and it is the only term in the sum large enough to bring the total under 90 seconds.",
      },
      {
        id: "D",
        text: "Athena, by adding partition projection so that queries return their results faster.",
        correct: false,
        explanation:
          "This confuses two different budgets. Partition projection shortens how long a query takes to answer, while the requirement concerns how long before the data is there to be queried at all. A faster query over absent data returns nothing faster.",
      },
    ],
    tips: [
      "End-to-end latency is a sum; identify the dominant term before optimising anything.",
      "A 300-second buffer interval overwhelms every millisecond-scale improvement upstream of it.",
      "Data freshness and query duration are separate budgets, and speeding up a query does not improve freshness.",
    ],
  },
  {
    id: "dea-t5-q07",
    topic: "throughput-replayability",
    prompt:
      "A stream carries a steady 6 MB per second with very little variation and no seasonal peaks, and it has run in on-demand capacity mode since launch. A cost review has asked for a recommendation. What should the team do?",
    options: [
      {
        id: "A",
        text: "Move to provisioned capacity mode with the shard count sized for the known throughput.",
        correct: true,
        explanation:
          "Correct. On-demand mode charges a premium for absorbing uncertainty, and this workload has none to absorb. With throughput known and flat, provisioned shards deliver the same capacity for less, and the sizing exercise is a one-off rather than ongoing work.",
      },
      {
        id: "B",
        text: "Remain in on-demand mode, because it removes the risk of throttling as the workload grows.",
        correct: false,
        explanation:
          "Every clause of this is true, which is what makes it persuasive, and none of it addresses a cost review of a flat workload. Buying insurance against variation that the scenario explicitly rules out is the thing being paid for unnecessarily.",
      },
      {
        id: "C",
        text: "Move to provisioned mode and add a function that reshards the stream when CloudWatch alarms fire.",
        correct: false,
        explanation:
          "This gets the capacity mode right and then adds machinery for a problem that does not exist. Automated resharding earns its operational cost only when load actually varies; on a flat workload it is code to maintain and a source of unnecessary resharding events.",
      },
      {
        id: "D",
        text: "Reduce the stream's retention period to the minimum in order to lower the ingest charge.",
        correct: false,
        explanation:
          "It conflates two separate line items. Extended retention is billed on its own, over and above ingest, so shortening it cannot reduce ingest at all, and the only thing actually lost is the replay window.",
      },
    ],
    tips: [
      "On-demand mode is priced for uncertainty; a predictable, flat workload is cheaper on provisioned shards.",
      "Extended retention is billed separately from ingest, so trimming it does not reduce ingest cost.",
      "Automation earns its keep only against variation that actually occurs.",
    ],
  },
  {
    id: "dea-t5-q08",
    topic: "throughput-replayability",
    prompt:
      "A platform ingests telemetry from 5,000 tenants. Each tenant sends under 10 KB per second, tenants are onboarded and removed every week, and the operations team needs throughput reported per tenant. How should the ingestion be arranged?",
    options: [
      {
        id: "A",
        text: "One Kinesis data stream for each tenant, created and deleted as the tenant list changes.",
        correct: false,
        explanation:
          "The intuitive isolation model, and it is how people often start. At 5,000 tenants it runs into the account limit on streams, turns weekly onboarding into provisioning work, and leaves 5,000 single-shard streams each using a fraction of their capacity.",
      },
      {
        id: "B",
        text: "One Kinesis data stream for each tenant in on-demand capacity mode, so capacity tracks each tenant individually.",
        correct: false,
        explanation:
          "This inherits every problem of a stream per tenant and adds one: on-demand mode carries an hourly charge per stream, so 5,000 streams are billed around the clock to carry 10 KB per second each.",
      },
      {
        id: "C",
        text: "One Firehose stream for each tenant, delivering into a dedicated Amazon S3 prefix per tenant.",
        correct: false,
        explanation:
          "It produces a clean per-tenant layout in S3, which is a real benefit and the reason this looks attractive. It is still 5,000 resources to manage, and Firehose has no consumers, so nothing can process the telemetry in flight.",
      },
      {
        id: "D",
        text: "One Kinesis data stream with the tenant ID as the partition key, reporting throughput per tenant from the records themselves.",
        correct: true,
        explanation:
          "Correct. This is the fan-in case: many small producers share one stream sized for their combined volume, the partition key keeps each tenant's records ordered together, and per-tenant throughput becomes a dimension in the metrics rather than a separate resource.",
      },
    ],
    tips: [
      "Many small producers belong in one stream; per-tenant separation is a partition key and a metric dimension, not a resource each.",
      "Per-stream hourly charges and account quotas make resource-per-tenant designs break down at a few hundred tenants.",
      "Reserve a dedicated stream per tenant for hard isolation or compliance boundaries, not for reporting.",
    ],
  },
  {
    id: "dea-t5-q09",
    topic: "throughput-replayability",
    prompt:
      "A new data lake must first receive 10 years of history from an operational database, roughly 8 TB, and then stay current with every change made from that point onward. The source database cannot be taken offline at any stage. Which ingestion plan meets both needs without a gap?",
    options: [
      {
        id: "A",
        text: "A single DMS task of type full load only, re-run every night across the whole database.",
        correct: false,
        explanation:
          "A nightly full reload does eventually reflect every change, which is why it survives in real systems. Moving 8 TB each night is enormously expensive, loads the source heavily, and leaves the lake up to 24 hours stale with no record of intraday changes.",
      },
      {
        id: "B",
        text: "A DMS task of type full load and ongoing replication, which loads the history and then follows the log from the position where the load began.",
        correct: true,
        explanation:
          "Correct. The combined task type exists precisely to remove the handover problem: DMS notes its starting log position, performs the full load while the source stays online, then applies every change from that position forward, so nothing falls between the two phases.",
      },
      {
        id: "C",
        text: "A DMS task of type ongoing replication only, started immediately, with the history loaded afterwards by a separate export.",
        correct: false,
        explanation:
          "The closest wrong answer, and a pattern that is sometimes necessary for very large sources. Done this way the export and the change capture start point share no agreed boundary, so the two datasets either overlap or leave a gap, and nobody can say which.",
      },
      {
        id: "D",
        text: "A Glue job that reads the full table nightly, with a job bookmark on the table's primary key.",
        correct: false,
        explanation:
          "A bookmark on an increasing primary key is a cheap way to pick up new rows, which covers inserts convincingly. Updates to existing rows and deletes both leave the key unchanged or absent, so the lake quietly diverges from the source on everything but inserts.",
      },
    ],
    tips: [
      "Full load plus ongoing replication is one task so that the boundary between history and changes has no gap.",
      "Loading history separately from starting change capture requires an agreed log position shared by both.",
      "A bookmark on an increasing key captures inserts only; updates and deletes go unnoticed.",
    ],
  },
  {
    id: "dea-t5-q10",
    topic: "throughput-replayability",
    prompt:
      "A workload will publish 12,000 records per second to a Kinesis data stream, and the records average 3 KB each. The team is sizing the stream in provisioned capacity mode. What is the minimum shard count that supports this write rate?",
    options: [
      {
        id: "A",
        text: "12 shards",
        correct: false,
        explanation:
          "This uses only the records-per-second limit: 12,000 divided by 1,000 per shard gives 12. It ignores volume entirely, and 12 shards accept 12 MB per second against the 36 MB per second the workload will send.",
      },
      {
        id: "B",
        text: "18 shards",
        correct: false,
        explanation:
          "This divides 36 MB per second by 2 MB, which is the per-shard read limit rather than the write limit. Mixing up the two sides of a shard is one of the easiest ways to under-provision a stream by half.",
      },
      {
        id: "C",
        text: "36 shards",
        correct: true,
        explanation:
          "Correct. The workload is 12,000 times 3 KB, or roughly 36 MB per second, so the byte limit of 1 MB per second per shard requires 36 shards, while the record limit requires only 12. The binding constraint is whichever is larger.",
      },
      {
        id: "D",
        text: "48 shards, the total of what each per-shard limit requires on its own",
        correct: false,
        explanation:
          "Adding 36 and 12 treats the two limits as separate demands to be satisfied side by side. They apply to the same shards simultaneously, so a shard that is handling 1 MB per second is already counted against both; the answer is the maximum, never the sum.",
      },
    ],
    tips: [
      "Size a stream against both per-shard limits and take the larger, never the sum.",
      "Write limits are 1 MB and 1,000 records per second per shard; the 2 MB per second figure belongs to the read side.",
      "Add headroom above the computed minimum, because an uneven partition key saturates one shard well before the stream average is reached.",
    ],
  },
  {
    id: "dea-t5-q11",
    topic: "throughput-replayability",
    multiple: true,
    prompt:
      "After a bug is found in a transformation, a team must be able to reprocess the last 14 days of raw events. Ingestion today is a Firehose stream that applies the transformation and delivers Parquet to Amazon S3. Which two changes make that reprocessing possible? (Choose two.)",
    options: [
      {
        id: "A",
        text: "Extend the Firehose buffer interval to its maximum so that more data is held before each delivery.",
        correct: false,
        explanation:
          "A longer buffer holds data for up to 15 minutes, which can read like a short retention period. It is not storage: once the buffer flushes, Firehose has nothing, so this adds latency and not a single hour of replayable history.",
      },
      {
        id: "B",
        text: "Enable source record backup so the untransformed records are written to Amazon S3 alongside the transformed output.",
        correct: true,
        explanation:
          "Correct, and it is what specifically rescues a transformation bug. The delivered Parquet has the defect baked in, so replaying it reproduces the error; the backup copy holds the original payload, which is the only input a corrected transformation can be run against.",
      },
      {
        id: "C",
        text: "Treat the raw Amazon S3 prefix as the replay source and confirm its lifecycle policy retains at least 14 days.",
        correct: true,
        explanation:
          "Correct. Since Firehose itself retains nothing, the raw prefix is the replay source, and the promise of 14 days is only as good as the lifecycle rule on that prefix. A policy expiring objects after 7 days would silently halve the recovery window.",
      },
      {
        id: "D",
        text: "Extend the Firehose stream's data retention period to 14 days.",
        correct: false,
        explanation:
          "The most convincing option for anyone carrying the Kinesis Data Streams model across. Firehose has no retention setting to extend, because it stores nothing: the parameter being reached for exists on a stream, not on a delivery service.",
      },
      {
        id: "E",
        text: "Enable versioning on the destination bucket so that earlier versions of the objects can be replayed.",
        correct: false,
        explanation:
          "Versioning protects against an object being overwritten or deleted, and that is not what happens here. Firehose writes each batch under a new key and never overwrites, so there are no previous versions for versioning to preserve.",
      },
    ],
    tips: [
      "A delivery service stores nothing, so the replayable copy has to be the records it already wrote to storage.",
      "Source record backup keeps the untransformed payload, which is the only thing a fixed transformation can be re-run against.",
      "A replay window is enforced by the lifecycle policy on the raw prefix; verify it matches the window you promised.",
    ],
  },
];
