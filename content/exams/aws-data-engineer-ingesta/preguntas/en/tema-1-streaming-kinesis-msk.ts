import type { ExamQuestionWithTopic } from "../../../types";

/**
 * Tema 1: ingesta en streaming con Kinesis Data Streams y Amazon MSK.
 *
 * El eje del tema es que casi todas las decisiones de un stream se reducen a cuatro
 * ejes independientes, y el examen mezcla deliberadamente los cuatro: capacidad de
 * escritura (shards o modo on-demand), capacidad de lectura (consumidores
 * compartidos o enhanced fan-out), historia (retención y compactación) y orden
 * (clave de partición). La mayoría de los distractores son la respuesta correcta a
 * un eje distinto del que pregunta el enunciado, y la explicación de cada uno nombra
 * cuál es ese eje.
 *
 * Preguntas en inglés, como el DEA-C01. Ver el aviso de `configuracion.ts` sobre por
 * qué viven en el casillero `es`.
 */
export const TEMA_1_STREAMING: ExamQuestionWithTopic[] = [
  {
    id: "dea-t1-q01",
    topic: "streaming-kinesis-msk",
    prompt:
      "A rideshare company streams vehicle telemetry into an Amazon Kinesis data stream that has 20 shards. Each record uses the vehicle's city as the partition key. Two cities account for most of the company's trips, and the producers for those two cities receive frequent ProvisionedThroughputExceededException errors while the stream's overall utilization stays near 15 percent. What is the MOST likely cause of the errors?",
    options: [
      {
        id: "A",
        text: "The stream is in on-demand capacity mode and has not finished doubling its capacity for the current write volume.",
        correct: false,
        explanation:
          "Tempting because an on-demand stream really does throw this exact exception while it catches up to a sudden step in traffic, and that is a well-known gotcha. But the scenario says the stream has 20 shards, which is a provisioned-mode detail, and a warm-up problem would hit every producer rather than only the two busiest cities.",
      },
      {
        id: "B",
        text: "The partition key has too few distinct values, so writes concentrate on a small number of shards.",
        correct: true,
        explanation:
          "Correct. Kinesis hashes the partition key to choose a shard, so a key with only a handful of values can only reach a handful of shards no matter how many exist. The two giveaway facts are that the errors follow specific producers and that stream-wide utilization is low: capacity exists, but the busiest cities cannot reach it.",
      },
      {
        id: "C",
        text: "The producers exceed the limit of 1,000 records per second that applies to the stream as a whole.",
        correct: false,
        explanation:
          "The number is real but the scope is wrong, and that is the confusion worth naming: 1,000 records per second and 1 MB per second are per-shard limits, so a 20-shard stream allows 20,000 records per second in total. Reading the quota as stream-wide also makes the low utilization figure look impossible instead of diagnostic.",
      },
      {
        id: "D",
        text: "The records exceed the 1 MB maximum size for a single Kinesis record, so the service rejects them.",
        correct: false,
        explanation:
          "Oversized records are rejected, but the error is different and the pattern would be different too: a record either fits or it never fits, so the failures would be constant rather than concentrated at peak, and they would not correlate with which city sent them.",
      },
    ],
    tips: [
      "Throttling that follows specific producers points at key distribution; throttling that follows total volume points at capacity.",
      "Kinesis write quotas of 1 MB per second and 1,000 records per second are per shard, not per stream.",
      "Stream-level utilization can look low while one shard is saturated, so read per-shard metrics before adding shards.",
    ],
  },
  {
    id: "dea-t1-q02",
    topic: "streaming-kinesis-msk",
    prompt:
      "A data engineering team must be able to rebuild a downstream analytics table by reprocessing every event that a Kinesis data stream received over the previous 30 days. The stream currently uses the default configuration. Which change makes that reprocessing possible?",
    options: [
      {
        id: "A",
        text: "Increase the stream's data retention period to 30 days or more.",
        correct: true,
        explanation:
          "Correct. A stream keeps records for 24 hours by default, so a 30-day replay is impossible until retention is extended; the service supports up to 365 days. Retention is the only setting that decides how far back a new consumer can start.",
      },
      {
        id: "B",
        text: "Enable enhanced fan-out for the application that performs the reprocessing.",
        correct: false,
        explanation:
          "Enhanced fan-out is a read-throughput and latency feature: it gives the consumer its own 2 MB per second per shard. It makes a replay run faster but cannot make a record exist that retention already discarded, which is the distinction this question tests.",
      },
      {
        id: "C",
        text: "Switch the stream to on-demand capacity mode so that records are retained until a consumer reads them.",
        correct: false,
        explanation:
          "This imports queue semantics into a streaming service. In Amazon SQS a message does survive until it is consumed and deleted, but a Kinesis record expires on a timer whether or not anyone read it, and capacity mode changes only how write capacity is provisioned.",
      },
      {
        id: "D",
        text: "Configure the consumer to checkpoint its position in an Amazon DynamoDB table so that it can restart from an earlier point in the stream.",
        correct: false,
        explanation:
          "The strongest distractor, because the Kinesis Client Library genuinely does checkpoint to DynamoDB and genuinely can restart from an older sequence number. It just cannot restart from before the retention horizon: tracking a position only helps inside the window that retention keeps open.",
      },
    ],
    tips: [
      "Kinesis Data Streams retains records for 24 hours by default and can be extended to 365 days.",
      "How far back you can replay is a retention decision; where a consumer resumes is a checkpoint decision.",
      "Kinesis records expire on a timer; unlike a queue, reading them does not delete them and not reading them does not keep them.",
    ],
  },
  {
    id: "dea-t1-q03",
    topic: "streaming-kinesis-msk",
    prompt:
      "Three independent applications read the same Kinesis data stream. Each one needs the full throughput of every shard, and the business requires that a new record reach each application in roughly 70 milliseconds. Today the applications share read capacity and observe about one second of propagation delay. Which solution satisfies the latency and throughput requirements?",
    options: [
      {
        id: "A",
        text: "Triple the number of shards so that the stream carries enough total read capacity for all three applications.",
        correct: false,
        explanation:
          "Adding shards raises the stream's total capacity, which is why it feels like the general-purpose fix. It does not change the fact that shared-throughput consumers divide one shard's 2 MB per second among themselves, and polling consumers cannot get near 70 milliseconds no matter how many shards exist.",
      },
      {
        id: "B",
        text: "Have one application read the stream and republish every record to two Amazon SQS queues that the other two applications poll.",
        correct: false,
        explanation:
          "A real fan-out pattern, and that is what makes it attractive. It costs an extra hop of latency, makes the relay a single point of failure, and SQS standard queues give up the per-shard ordering the stream provided, so it trades away more than it solves.",
      },
      {
        id: "C",
        text: "Register each application as a consumer that uses enhanced fan-out.",
        correct: true,
        explanation:
          "Correct. Enhanced fan-out gives every registered consumer a dedicated 2 MB per second per shard, so the applications stop competing, and it pushes records over HTTP/2 with roughly 70 milliseconds of propagation delay instead of waiting for a poll.",
      },
      {
        id: "D",
        text: "Increase how often each application calls GetRecords so that records are retrieved as soon as they arrive.",
        correct: false,
        explanation:
          "Polling harder is the instinctive answer to latency, but GetRecords is capped at five calls per second per shard across all shared-throughput consumers. Three applications polling aggressively hit that ceiling and start throttling each other, which makes the delay worse rather than better.",
      },
    ],
    tips: [
      "Enhanced fan-out buys two separate things: a dedicated 2 MB per second per shard, and about 70 ms of push latency.",
      "Shared-throughput consumers split one shard's 2 MB per second and share a limit of five GetRecords calls per second.",
      "Adding shards scales the stream's total capacity, never one consumer's share of a single shard.",
    ],
  },
  {
    id: "dea-t1-q04",
    topic: "streaming-kinesis-msk",
    prompt:
      "An order management system publishes create, update, and cancel events to a 12-shard Kinesis data stream. Events that belong to the same order must be processed in the sequence they were produced, while events for different orders may be processed in any sequence. How should a data engineer meet the ordering requirement?",
    options: [
      {
        id: "A",
        text: "Reduce the stream to a single shard so that every event passes through one globally ordered sequence of sequence numbers.",
        correct: false,
        explanation:
          "This does deliver ordering, which is exactly why it draws people in, but it delivers a stronger guarantee than the requirement asks for and charges the whole system for it: one shard caps the stream at 1 MB per second and one consumer. Global ordering is the wrong tool when only per-order ordering was requested.",
      },
      {
        id: "B",
        text: "Enable enhanced fan-out so that the consumer receives records in the sequence in which Kinesis stored them.",
        correct: false,
        explanation:
          "Enhanced fan-out changes how fast and how promptly records are delivered, never their arrangement. Records already arrive in sequence within a shard for every consumer type, so this option promises something the service already does and still leaves one order's events spread over 12 shards.",
      },
      {
        id: "C",
        text: "Sort the records in each batch by their ApproximateArrivalTimestamp before the consumer applies them.",
        correct: false,
        explanation:
          "Sorting looks like a cheap fix and it is the usual first idea. The timestamp is approximate and not unique, and more importantly the events for one order are in different shards being read by different workers, so no single batch ever contains the full sequence to sort.",
      },
      {
        id: "D",
        text: "Use the order ID as the partition key so that all events for one order land on the same shard.",
        correct: true,
        explanation:
          "Correct. Kinesis guarantees order within a shard, and the partition key decides the shard, so keying by order ID puts one order's events in one ordered sequence while different orders still spread across all 12 shards. The requirement and the key choice line up exactly.",
      },
    ],
    tips: [
      "Kinesis preserves ordering within a shard only, which makes per-entity ordering a partition key decision.",
      "Pick a partition key with enough distinct values to spread load, but stable enough to keep related records together.",
      "When a requirement asks for per-key ordering, global ordering is an overpayment, not a safer answer.",
    ],
  },
  {
    id: "dea-t1-q05",
    topic: "streaming-kinesis-msk",
    prompt:
      "A media company's ingestion workload sits almost idle most of the week, then climbs roughly 30-fold as the audience builds over the half hour before each live broadcast. Broadcasts are announced only a few hours ahead. The team does not want to track shard counts or maintain resharding scripts, and wants to pay only for the traffic it actually sends. Which capacity configuration fits this pattern?",
    options: [
      {
        id: "A",
        text: "On-demand capacity mode.",
        correct: true,
        explanation:
          "Correct. On-demand mode manages write capacity for the team and bills per GB ingested plus an hourly stream charge, so an idle week costs almost nothing and a broadcast scales without anyone being paged. It is the mode designed for traffic that cannot be forecast.",
      },
      {
        id: "B",
        text: "Provisioned capacity mode with the shard count fixed at the volume observed during the largest broadcast.",
        correct: false,
        explanation:
          "This is the cautious engineering answer and it does prevent throttling, which is why it is the most chosen wrong option. It also bills for peak shards every hour of the idle week, which directly contradicts the requirement to pay only for traffic actually sent.",
      },
      {
        id: "C",
        text: "Provisioned capacity mode with an AWS Lambda function that reshards the stream when Amazon CloudWatch alarms fire.",
        correct: false,
        explanation:
          "This was the standard pattern before on-demand mode existed, so it still appears in older material and in team habits. It is precisely the resharding machinery the team said it does not want to maintain, and it reacts after the alarm rather than before the broadcast.",
      },
      {
        id: "D",
        text: "Provisioned capacity mode with enhanced fan-out enabled so that consumers absorb the broadcast peaks.",
        correct: false,
        explanation:
          "This mixes up the two sides of the stream. Enhanced fan-out scales reads, and the problem described is on the write side: producers sending 30 times more data. No read-side setting creates write capacity.",
      },
    ],
    tips: [
      "On-demand mode suits unpredictable traffic and bills per GB plus an hourly stream charge rather than per shard-hour.",
      "On-demand can double throughput from the trailing 30-day peak, so a sudden step change may still throttle briefly.",
      "Capacity mode governs write capacity; enhanced fan-out governs read capacity. Decide which side is saturated first.",
    ],
  },
  {
    id: "dea-t1-q06",
    topic: "streaming-kinesis-msk",
    prompt:
      "A sensor fleet emits one 200-byte reading per second per device into a Kinesis data stream. Total volume is modest at 40 MB per second, yet the stream throttles on record count well before it approaches its byte limit, and PUT payload units dominate the monthly bill. Which change addresses both the throttling and the cost?",
    options: [
      {
        id: "A",
        text: "Switch the stream to on-demand capacity mode so that the per-second record count limit no longer applies to producers.",
        correct: false,
        explanation:
          "On-demand mode removes the need to size shards, but it does not remove per-shard limits: the records-per-second ceiling still exists behind the scenes, and 200-byte records still each consume a full PUT payload unit. The option solves the sizing chore, not the two problems that were asked about.",
      },
      {
        id: "B",
        text: "Use the Kinesis Producer Library to aggregate many readings into each Kinesis record, and deaggregate them with the Kinesis Client Library.",
        correct: true,
        explanation:
          "Correct. Aggregation packs many application-level readings into one Kinesis record, so thousands of readings consume one record slot and one payload unit instead of thousands. Both symptoms have the same root cause, records far smaller than the 25 KB billing unit, and aggregation is the feature that targets it.",
      },
      {
        id: "C",
        text: "Use the PutRecords API to send the readings to the stream in batches of up to 500 instead of calling PutRecord once per reading.",
        correct: false,
        explanation:
          "The most instructive wrong answer, because batching and aggregation are routinely confused. PutRecords is collection: it cuts the number of HTTP requests, but each of the 500 entries still counts separately against the records-per-second limit and is still billed as its own payload unit, so neither symptom improves.",
      },
      {
        id: "D",
        text: "Compress each reading with gzip before calling PutRecord so that fewer PUT payload units are consumed per reading.",
        correct: false,
        explanation:
          "Compression attacks bytes, and bytes were never the constraint here. A 200-byte payload barely compresses, and even an empty record consumes one 25 KB payload unit, so the bill does not move and the record count does not change at all.",
      },
    ],
    tips: [
      "Collection with PutRecords reduces API calls; aggregation with the KPL reduces the number of Kinesis records.",
      "A PUT payload unit is billed in 25 KB increments, so records much smaller than that waste most of what you pay for.",
      "Per-shard limits are 1,000 records per second and 1 MB per second; whichever you reach first is what throttles you.",
    ],
  },
  {
    id: "dea-t1-q07",
    topic: "streaming-kinesis-msk",
    prompt:
      "A company operates an Amazon MSK provisioned cluster with brokers spread across three Availability Zones. One topic must never lose a message that was acknowledged to the producer, and it must continue accepting writes if a single Availability Zone becomes unreachable. Which combination of topic and producer settings satisfies both conditions?",
    options: [
      {
        id: "A",
        text: "replication.factor = 3, min.insync.replicas = 3, producer acks = all",
        correct: false,
        explanation:
          "The classic trap, and the one most people pick because it looks maximally safe. It is durable, but requiring all three replicas to be in sync means the loss of one Availability Zone leaves two replicas and stops writes entirely, which breaks the availability half of the requirement.",
      },
      {
        id: "B",
        text: "replication.factor = 3, min.insync.replicas = 1, producer acks = all",
        correct: false,
        explanation:
          "This looks durable because acks is set to all, which is where the confusion lives: acks = all means all replicas currently in sync, and min.insync.replicas = 1 allows that set to be just the leader. A message can be acknowledged by one broker and then lost when that broker fails.",
      },
      {
        id: "C",
        text: "replication.factor = 3, min.insync.replicas = 2, producer acks = all",
        correct: true,
        explanation:
          "Correct. Three replicas across three Availability Zones with a quorum of two means every acknowledged write exists on at least two brokers in two zones, so losing one zone loses no acknowledged data and still leaves two in-sync replicas, which is enough to keep accepting writes.",
      },
      {
        id: "D",
        text: "replication.factor = 2, min.insync.replicas = 2, producer acks = 1 so that only the leader must confirm",
        correct: false,
        explanation:
          "Two problems compound here. With acks = 1 the producer is told the write succeeded as soon as the leader has it, so min.insync.replicas is never consulted, and with only two replicas the loss of one zone already drops the in-sync set below the configured minimum.",
      },
    ],
    tips: [
      "Replication factor 3 with min.insync.replicas 2 and acks = all is the standard setting that survives one broker or zone loss while staying writable.",
      "min.insync.replicas only takes effect when producers use acks = all; with acks = 1 it is never evaluated.",
      "Setting min.insync.replicas equal to the replication factor trades availability away without buying extra durability.",
    ],
  },
  {
    id: "dea-t1-q08",
    topic: "streaming-kinesis-msk",
    prompt:
      "A team wants to stream change events from a self-managed PostgreSQL database into Amazon MSK topics using the Debezium source connector, which the team has already configured and tested on a laptop. The team is unwilling to provision, scale, or patch the worker nodes that Kafka Connect normally runs on. How should the connector be deployed?",
    options: [
      {
        id: "A",
        text: "Package the connector logic as an AWS Lambda function and invoke it on an Amazon EventBridge schedule.",
        correct: false,
        explanation:
          "Lambda is the reflex answer whenever a requirement says serverless, and that reflex is what this option exploits. A Kafka Connect connector is a plugin for the Connect runtime, not a Lambda handler, and a scheduled poll is not change data capture: it would miss deletes and intermediate states between invocations.",
      },
      {
        id: "B",
        text: "Run Kafka Connect in distributed mode on an Amazon EC2 Auto Scaling group placed behind a Network Load Balancer.",
        correct: false,
        explanation:
          "This is how Connect is classically deployed, so it reads as the expert answer. It is also exactly the worker fleet the team refused to own: the Auto Scaling group still needs AMIs, patching, and capacity decisions.",
      },
      {
        id: "C",
        text: "Use AWS Database Migration Service with the MSK cluster configured as the target endpoint.",
        correct: false,
        explanation:
          "The strongest distractor, because DMS really can perform PostgreSQL change data capture into Kafka and really is managed. It just does not run Kafka Connect connectors, so it throws away the Debezium configuration the team already validated and changes the message format the downstream consumers were built against.",
      },
      {
        id: "D",
        text: "Use MSK Connect with the Debezium connector uploaded as a custom plugin.",
        correct: true,
        explanation:
          "Correct. MSK Connect is managed Kafka Connect: the team uploads the Debezium plugin, supplies the connector configuration it already tested, and AWS runs and autoscales the workers. The existing work carries over unchanged, which is what the scenario is protecting.",
      },
    ],
    tips: [
      "When a scenario names an existing Kafka Connect connector, the managed path is MSK Connect, not a rewrite onto another service.",
      "DMS and MSK Connect can both do database CDC into Kafka, but only MSK Connect runs Kafka Connect plugins.",
      "A scheduled poll is not change data capture: it cannot see rows that were created and deleted between two runs.",
    ],
  },
  {
    id: "dea-t1-q09",
    topic: "streaming-kinesis-msk",
    prompt:
      "A startup is standing up its first Kafka workload. Traffic is expected to swing unpredictably between almost nothing and roughly 100 MB per second. The four-person team needs Kafka API compatibility for its existing client libraries but has no Kafka operations experience and wants to avoid sizing brokers or rebalancing partitions. Which option should the team choose?",
    options: [
      {
        id: "A",
        text: "Amazon MSK Serverless.",
        correct: true,
        explanation:
          "Correct. MSK Serverless speaks the Kafka API, so the client code carries over once it is configured for IAM authentication, which is the only mechanism it offers. It removes precisely the two tasks the team named: there are no brokers to size and no partition rebalancing to run, and billing is per cluster-hour, partition-hour, and traffic.",
      },
      {
        id: "B",
        text: "Amazon MSK provisioned, with brokers sized for the expected peak and Cruise Control deployed to rebalance partitions.",
        correct: false,
        explanation:
          "A legitimate production architecture, which is why it is tempting for a team that wants to do things properly. Both halves of it are the work the team excluded: sizing brokers for peak and operating a rebalancing tool are exactly the Kafka operations skills they do not have.",
      },
      {
        id: "C",
        text: "Amazon MSK provisioned with storage autoscaling enabled so that the cluster adapts to the varying load.",
        correct: false,
        explanation:
          "The partial-automation trap. Storage autoscaling is real and useful, but it only grows broker disks when they fill; broker instance types, broker count, and partition placement all still have to be chosen and revisited by hand.",
      },
      {
        id: "D",
        text: "A self-managed Apache Kafka cluster on Amazon EC2, with instance types selected using the Apache Kafka sizing guidance.",
        correct: false,
        explanation:
          "Maximum control, and the only option that guarantees the team owns every operational task it said it cannot staff: broker provisioning, patching, ZooKeeper or KRaft management, and capacity planning.",
      },
    ],
    tips: [
      "MSK Serverless removes broker sizing and partition rebalancing; MSK provisioned keeps both as your job.",
      "Storage autoscaling in MSK provisioned grows disks only. Compute capacity is still sized manually.",
      "MSK Serverless has its own quotas, including per-partition throughput, so check the expected peak against them before committing.",
    ],
  },
  {
    id: "dea-t1-q10",
    topic: "streaming-kinesis-msk",
    prompt:
      "Thousands of mobile clients send events through an API layer that calls PutRecord once per event against a Kinesis data stream. During short traffic peaks a small fraction of those calls fail with throttling errors, and the mobile team reports that the corresponding events never show up downstream. Shard count already covers the peak byte volume. Which change makes the ingest tolerate these brief episodes?",
    options: [
      {
        id: "A",
        text: "Replace the stream with an Amazon SQS standard queue, which absorbs the peak because it has no per-shard write limit.",
        correct: false,
        explanation:
          "Switching services does sidestep per-shard limits, which makes it read like the decisive fix. It also discards replay and per-key ordering, and it treats a missing-retry bug as an architecture problem: the same code calling SQS without retries would lose messages during an SQS error too.",
      },
      {
        id: "B",
        text: "Use the Kinesis Producer Library, which buffers records and retries throttled writes with exponential backoff.",
        correct: true,
        explanation:
          "Correct. The events are lost because a throttled PutRecord is a rejected write and nothing retried it. The KPL adds the buffering and backoff-based retry that a hand-rolled single-record producer lacks, so a few seconds of throttling becomes a few seconds of added latency instead of data loss.",
      },
      {
        id: "C",
        text: "Increase the stream's data retention period so that throttled records are held until write capacity frees up.",
        correct: false,
        explanation:
          "This misreads where retention applies. Retention governs how long records that were successfully accepted stay readable; a throttled record was never accepted, so there is nothing in the stream for a longer retention period to keep.",
      },
      {
        id: "D",
        text: "Enable enhanced fan-out so that consumers drain the shards faster and relieve the pressure on producers.",
        correct: false,
        explanation:
          "This carries a queue intuition into Kinesis: in a queue, consuming faster frees space for producers. A Kinesis shard is rate-limited rather than a finite buffer, so how fast consumers read has no effect whatsoever on whether a write is throttled.",
      },
    ],
    tips: [
      "A throttled PutRecord is a rejected write. If the producer does not retry it, the event is gone.",
      "The Kinesis Producer Library adds buffering, aggregation, and retry with backoff that hand-written producers usually omit.",
      "In Kinesis, reading does not free write capacity: shards are rate-limited, not a buffer that drains.",
    ],
  },
  {
    id: "dea-t1-q11",
    topic: "streaming-kinesis-msk",
    prompt:
      "While a Kinesis Client Library application is consuming a stream, a data engineer splits one hot shard into two child shards. No record written before the split may be lost. What becomes of the records that the original shard was already holding?",
    options: [
      {
        id: "A",
        text: "They are redistributed across the two child shards according to the new hash key ranges.",
        correct: false,
        explanation:
          "This is the rebalancing mental model people bring from Kafka partition reassignment, where data really can be moved between brokers. Kinesis never rewrites stored records: a split changes only where future records land, so nothing existing is redistributed.",
      },
      {
        id: "B",
        text: "They are discarded when the split completes, so the producers have to send them again.",
        correct: false,
        explanation:
          "The fear-driven reading of resharding, and it is worth ruling out explicitly because it would make resharding unusable on a live stream. A split is a metadata operation; it never deletes records that were already durably written.",
      },
      {
        id: "C",
        text: "They stay in the parent shard, which remains readable until the retention period expires.",
        correct: true,
        explanation:
          "Correct. The parent shard is closed to new writes but keeps its records and stays readable for the rest of the retention period. The KCL drains a parent to the end before it picks up the children, which is how a split preserves both completeness and per-key ordering.",
      },
      {
        id: "D",
        text: "They are copied into both child shards, so the consumer must deduplicate them by sequence number.",
        correct: false,
        explanation:
          "Plausible if you assume resharding duplicates data to be safe, and it invents a deduplication burden that does not exist. Records live in exactly one shard; the only duplicates a KCL application normally has to tolerate come from checkpoint replays, not from splits.",
      },
    ],
    tips: [
      "Resharding creates new shards and closes old ones; it never moves, copies, or deletes records already written.",
      "The KCL finishes a parent shard before starting its children, which is what keeps per-key order across a split.",
      "A closed parent shard disappears only when retention expires, so expect to see more shards than the current open count.",
    ],
  },
  {
    id: "dea-t1-q12",
    topic: "streaming-kinesis-msk",
    prompt:
      "Applications running on Amazon EKS in the same AWS account as an Amazon MSK cluster produce to and consume from several topics. Security requires that each workload's topic permissions be expressed as policies attached to the role it already assumes, with no password or certificate left to rotate. Which client authentication method should be configured on the cluster?",
    options: [
      {
        id: "A",
        text: "SASL/SCRAM authentication with the credentials stored in AWS Secrets Manager and rotated automatically.",
        correct: false,
        explanation:
          "This is the closest wrong answer because it is genuinely the managed-secret option for MSK and Secrets Manager really can rotate the credential. It is still a password, so there is still a secret with a rotation lifecycle, and permissions are granted in Kafka ACLs rather than in the role policies the requirement names.",
      },
      {
        id: "B",
        text: "Mutual TLS authentication using client certificates issued by an AWS Private Certificate Authority.",
        correct: false,
        explanation:
          "Strong authentication, and attractive because a private CA sounds like the enterprise-grade choice. Certificates expire and must be renewed and distributed, which is the exact rotation burden the requirement rules out.",
      },
      {
        id: "C",
        text: "Unauthenticated access, restricted by security groups that allow traffic only from the EKS node subnets.",
        correct: false,
        explanation:
          "The confusion to name is treating reachability as identity. A security group decides which network can connect, not who is connecting, so every workload inside the allowed subnets gets the same unlimited access and per-workload topic permissions become impossible.",
      },
      {
        id: "D",
        text: "IAM access control for Amazon MSK, with topic permissions granted in the workloads' IAM policies.",
        correct: true,
        explanation:
          "Correct. IAM access control handles both authentication and authorization for Kafka clients using the IAM role the pod already assumes, so topic-level permissions live in IAM policies and there is no password or certificate in the picture at all.",
      },
    ],
    tips: [
      "IAM access control for MSK authenticates and authorizes Kafka clients through IAM policies, leaving no secret to rotate.",
      "Security groups limit who can reach a port; they never establish identity. An authentication requirement needs an authentication mechanism.",
      "SASL/SCRAM and mTLS are both supported on MSK, but each introduces a credential or certificate with a rotation lifecycle.",
    ],
  },
  {
    id: "dea-t1-q13",
    topic: "streaming-kinesis-msk",
    prompt:
      "A company ingests clickstream events keyed by user. It must retain the most recent event for every user key indefinitely, so that a newly deployed consumer can rebuild a complete user-state table from the log at any point in the future. The engineering team already maintains Kafka consumer code. Which ingestion platform supports this requirement directly?",
    options: [
      {
        id: "A",
        text: "Amazon MSK with a topic that uses log compaction.",
        correct: true,
        explanation:
          "Correct. Log compaction is the Kafka feature that keeps the latest record per key indefinitely while discarding superseded versions, which is exactly a rebuildable state table. The team's existing Kafka consumers read it without modification.",
      },
      {
        id: "B",
        text: "Amazon Kinesis Data Streams with the data retention period raised to its maximum of 365 days.",
        correct: false,
        explanation:
          "The most seductive option, because 365 days feels close enough to indefinitely. Two things break it: a year is still a hard horizon, and Kinesis has no compaction, so the stream accumulates every historical version of every key instead of converging to the latest one.",
      },
      {
        id: "C",
        text: "Amazon Kinesis Data Streams with enhanced fan-out registered for the rebuild consumer.",
        correct: false,
        explanation:
          "Enhanced fan-out answers a different question: how fast the rebuild consumer can read. It does nothing about how much history exists, and the rebuild fails for lack of data long before read throughput becomes the constraint.",
      },
      {
        id: "D",
        text: "Amazon Data Firehose delivering the events to Amazon S3 with dynamic partitioning on the user key.",
        correct: false,
        explanation:
          "Tempting because S3 does store data indefinitely at low cost. Firehose is a delivery service with no log semantics: nothing collapses old versions of a key, so rebuilding the latest state per user means writing and running a separate deduplication job over the whole history.",
      },
    ],
    tips: [
      "Log compaction keeps the most recent record per key forever and has no Kinesis Data Streams equivalent.",
      "Kinesis retention tops out at 365 days, so any requirement worded as indefinitely points away from it.",
      "When a requirement names a Kafka-specific capability, the answer is managed Kafka rather than a Kinesis look-alike.",
    ],
  },
  {
    id: "dea-t1-q14",
    topic: "streaming-kinesis-msk",
    multiple: true,
    prompt:
      "A Kinesis data stream in provisioned capacity mode rejects writes with ProvisionedThroughputExceededException during a two-hour window every evening. Metrics show incoming bytes reaching about three times the provisioned capacity during that window, with load spread evenly across all shards. Which two actions would each, on its own, resolve the rejected writes? (Choose two.)",
    options: [
      {
        id: "A",
        text: "Increase the shard count so that provisioned write capacity covers the evening peak volume.",
        correct: true,
        explanation:
          "Correct. In provisioned mode, write capacity is shard count multiplied by 1 MB per second, so tripling demand against fixed capacity is resolved by provisioning enough shards for the peak.",
      },
      {
        id: "B",
        text: "Reduce the number of distinct partition key values so that writes are grouped onto fewer shards.",
        correct: false,
        explanation:
          "This inverts a rule that is genuinely about throttling. Partition key cardinality matters when load is uneven, but here it is already even, and deliberately concentrating writes onto fewer shards creates hot shards and makes the throttling worse.",
      },
      {
        id: "C",
        text: "Switch the stream to on-demand capacity mode so that write capacity follows the observed traffic.",
        correct: true,
        explanation:
          "Correct. On-demand mode manages write capacity against observed throughput, which covers a predictable nightly peak without anyone resharding. Be aware it scales from the trailing peak, so the very first evening may still throttle briefly.",
      },
      {
        id: "D",
        text: "Register the consumer applications for enhanced fan-out so that shards are drained faster during the peak.",
        correct: false,
        explanation:
          "Read-side capacity, applied to a write-side failure. Draining shards faster does not return write capacity to producers, because a shard enforces a rate rather than holding a queue that can fill up.",
      },
      {
        id: "E",
        text: "Increase the stream's data retention period so that it spans the full two-hour evening peak.",
        correct: false,
        explanation:
          "Retention governs how long accepted records remain readable. A rejected write never entered the stream, so no retention setting can rescue it, and two hours is already inside the 24-hour default anyway.",
      },
    ],
    tips: [
      "When load is already even across shards, throttling is a capacity problem rather than a key distribution problem.",
      "Write capacity comes from shard count in provisioned mode, or is managed for you in on-demand mode.",
      "Enhanced fan-out is read capacity and retention is history. Neither one adds write capacity.",
    ],
  },
  {
    id: "dea-t1-q15",
    topic: "streaming-kinesis-msk",
    multiple: true,
    prompt:
      "An AWS Lambda function consumes a Kinesis data stream and applies the events to Amazon DynamoDB. Events sharing an account ID must be applied in production sequence. A single malformed event is currently stalling its shard for the entire retention period while Lambda retries it. Which two configuration choices preserve per-account sequencing and stop one bad event from blocking its shard? (Choose two.)",
    options: [
      {
        id: "A",
        text: "Set the event source mapping's starting position to LATEST so that the function skips past the malformed event.",
        correct: false,
        explanation:
          "The starting position applies only when the mapping first begins reading a shard, which is the detail that makes this look like an escape hatch. It has no effect on a batch already being retried, and skipping ahead would silently drop every event behind the bad one.",
      },
      {
        id: "B",
        text: "Produce the events using the account ID as the partition key.",
        correct: true,
        explanation:
          "Correct. Kinesis orders records within a shard, and the partition key selects the shard, so keying on account ID is what makes one account's events a single ordered sequence that Lambda then processes in order.",
      },
      {
        id: "C",
        text: "Register the Lambda event source mapping for enhanced fan-out so that the failing batch is isolated from the others.",
        correct: false,
        explanation:
          "Enhanced fan-out gives the mapping dedicated throughput and lower latency, and the word dedicated is what makes isolation sound plausible. It changes nothing about retry behaviour: the same poison record would block its own dedicated stream of batches just as thoroughly.",
      },
      {
        id: "D",
        text: "Configure the event source mapping with a maximum retry attempts value and an on-failure destination.",
        correct: true,
        explanation:
          "Correct. Together these bound the damage: after the configured number of attempts Lambda stops retrying the batch, sends its metadata to the failure destination for investigation, and moves on, so the shard advances instead of stalling until the record expires.",
      },
      {
        id: "E",
        text: "Reduce the stream to a single shard so that ordering is global and the failing record is easier to locate.",
        correct: false,
        explanation:
          "Global ordering is stronger than the per-account requirement and caps the stream's throughput at one shard. It also makes the stall strictly worse: with one shard, the poison record blocks every account rather than only the accounts that hash to its shard.",
      },
    ],
    tips: [
      "Per-key ordering comes from the partition key. Collapsing to a single shard is an overpowered substitute with a throughput cost.",
      "An event source mapping with unlimited retries and no failure destination will retry a bad record until it expires, blocking everything behind it.",
      "Maximum retry attempts, bisect on function error, and on-failure destinations are the Lambda controls for poison records.",
    ],
  },
  {
    id: "dea-t1-q16",
    topic: "streaming-kinesis-msk",
    multiple: true,
    prompt:
      "A Kinesis Client Library application consuming a 50-shard stream runs on four Amazon EC2 instances. The MillisBehindLatest metric climbs steadily through the day even though producers are never throttled. The team must close the gap without altering the stream's shard count. Which two actions help? (Choose two.)",
    options: [
      {
        id: "A",
        text: "Increase the shard count so that each shard carries fewer records for the application to process.",
        correct: false,
        explanation:
          "More shards would genuinely give the application more parallelism, which is why it is the first idea most people have. The scenario rules it out explicitly, and the constraint is there because resharding does not fix a consumer that is slow per record.",
      },
      {
        id: "B",
        text: "Lower the KCL's maxRecords setting so that each GetRecords call returns a smaller, faster batch.",
        correct: false,
        explanation:
          "Smaller batches do finish faster individually, and that is the trap. GetRecords is capped at five calls per second per shard, so fewer records per call means strictly less throughput per shard and the lag grows faster.",
      },
      {
        id: "C",
        text: "Add EC2 instances to the application so that more shard leases are processed in parallel.",
        correct: true,
        explanation:
          "Correct. The KCL assigns leases across workers, and four instances covering 50 shards means each worker is serialising many shards. Adding workers spreads the leases out, and the useful ceiling is one worker per shard.",
      },
      {
        id: "D",
        text: "Raise the stream's data retention period so that the application has more time to catch up before records expire.",
        correct: false,
        explanation:
          "This buys time before data loss, which is a real and sometimes necessary mitigation, and that usefulness is what makes it attractive here. It does not reduce lag by a single millisecond: the consumer is still falling behind, just with a later deadline.",
      },
      {
        id: "E",
        text: "Move the per-record database lookup out of the record processor and batch it once per batch of records.",
        correct: true,
        explanation:
          "Correct. Rising lag with healthy writes means processing time per record is the bottleneck. Replacing one lookup per record with one lookup per batch cuts that time directly, which is the lever that remains when shard count is fixed.",
      },
    ],
    tips: [
      "MillisBehindLatest rising while producers are healthy is a consumer throughput problem, not an ingestion problem.",
      "A KCL application gains nothing from more workers than the stream has shards, because a shard is leased to one worker at a time.",
      "Smaller batches never make a consumer faster when GetRecords calls are capped at five per second per shard.",
    ],
  },
];
