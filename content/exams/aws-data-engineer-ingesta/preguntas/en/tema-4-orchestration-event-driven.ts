import type { ExamQuestionWithTopic } from "../../../types";

/**
 * Tema 4: orquestación e ingesta disparada por eventos.
 *
 * El eje del tema es la diferencia entre disparar algo a una hora, disparar algo
 * cuando pasa un hecho, y disparar algo cuando terminó lo anterior. Son tres
 * problemas distintos y el examen los mezcla: un scheduler no sabe de dependencias,
 * un orquestador no es un buffer, y una cola no reparte el mismo mensaje a varios
 * consumidores. Buena parte de los distractores son el servicio correcto para uno de
 * los otros dos problemas, y la explicación nombra cuál.
 */
export const TEMA_4_ORQUESTACION: ExamQuestionWithTopic[] = [
  {
    id: "dea-t4-q01",
    topic: "orchestration-event-driven",
    prompt:
      "Three teams each need to start their own processing when an object is created under a shared Amazon S3 prefix. The first team already configured an S3 event notification to its function, and the second team's attempt to add one for the same prefix and event type was rejected. Each team also wants to match on object size and manage its own trigger without coordinating. What should the teams adopt?",
    options: [
      {
        id: "A",
        text: "Turn on EventBridge notifications for the bucket and have each team create its own rule with its own event pattern.",
        correct: true,
        explanation:
          "Correct. With EventBridge enabled on the bucket, the bucket emits one event and any number of independent rules can match it, so the single-notification-configuration conflict disappears. Rules can also match on any field in the event, object size included, and each team owns its own rule.",
      },
      {
        id: "B",
        text: "Send one S3 event notification to an Amazon SNS topic and let each team subscribe its own function.",
        correct: false,
        explanation:
          "The classic fan-out answer, and it does solve the conflict, which makes it the strongest distractor. One shared notification configuration still has to be owned and changed by somebody, and SNS filter policies work on message attributes rather than on event fields, so object size has to be filtered in each team's code after paying for the invocation.",
      },
      {
        id: "C",
        text: "Have each team configure its own S3 event notification using a distinct suffix filter on that prefix.",
        correct: false,
        explanation:
          "This looks like it sidesteps the rejection by making the filters different. S3 still refuses overlapping configurations for the same prefix and event type, and a suffix filter cannot express a condition on object size at all.",
      },
      {
        id: "D",
        text: "Run a scheduled function that lists the prefix for new objects and invokes each team's function in turn.",
        correct: false,
        explanation:
          "Polling always works, which is why it survives as a fallback. It adds latency, costs a listing of the prefix on every run, and makes one team's scheduled function the single point of failure for everyone else's trigger, which is the opposite of independent ownership.",
      },
    ],
    tips: [
      "A bucket allows only one notification configuration per overlapping prefix and event type; EventBridge removes that limit.",
      "EventBridge rules can match any field of the event, including object size, which S3 notification filters cannot.",
      "Many independent consumers of one event is the case for EventBridge rules or topic fan-out, not for more notification entries.",
    ],
  },
  {
    id: "dea-t4-q02",
    topic: "orchestration-event-driven",
    prompt:
      "An ingestion workflow coordinates a DMS task, two Glue jobs, and a Redshift load. A run lasts about two hours and happens 20 times a day, and auditors require the input and output of every step to be retrievable afterwards. Which AWS Step Functions workflow type should be used?",
    options: [
      {
        id: "A",
        text: "An Express workflow, which costs less per state transition at this execution volume.",
        correct: false,
        explanation:
          "Cost is the wrong axis to decide on first, and the arithmetic is not even in dispute. Express workflows are limited to five minutes, so a two-hour run cannot complete regardless of price; 20 runs a day is also nowhere near the volume Express pricing exists for.",
      },
      {
        id: "B",
        text: "A Standard workflow.",
        correct: true,
        explanation:
          "Correct. Standard workflows run for up to a year, which covers a two-hour pipeline, and they record a durable execution history with each step's input and output that the console and the API can replay. That history is precisely the audit artefact required.",
      },
      {
        id: "C",
        text: "A Standard workflow nested inside an Express workflow so that the orchestration cost stays low.",
        correct: false,
        explanation:
          "Nesting is a real pattern, but inverted here. A parent cannot outlive its own five-minute limit while waiting for a two-hour child, so the outer Express execution would time out first. The useful version of this pattern is the reverse: Standard parent, Express children.",
      },
      {
        id: "D",
        text: "An Express workflow with logging to Amazon CloudWatch Logs set to the ALL level.",
        correct: false,
        explanation:
          "This correctly identifies that Express workflows keep no built-in history and fixes that half of the problem. The five-minute execution limit is untouched, so the workflow still cannot finish, and the audit trail would document two hours of failures.",
      },
    ],
    tips: [
      "Standard workflows run up to a year and retain execution history; Express workflows are capped at five minutes.",
      "Express pricing favours very high volumes of short executions; a few dozen runs a day is not a volume problem.",
      "When a required duration exceeds five minutes, the workflow type is settled before cost enters the discussion.",
    ],
  },
  {
    id: "dea-t4-q03",
    topic: "orchestration-event-driven",
    prompt:
      "A company orchestrates its ingestion with 180 existing Apache Airflow DAGs on self-managed servers. It wants to stop operating schedulers and workers, keep the DAG code as it is, and keep the interface its engineers already use. Where should the workload move?",
    options: [
      {
        id: "A",
        text: "AWS Step Functions, with each DAG rewritten as a state machine definition.",
        correct: false,
        explanation:
          "Step Functions is an excellent orchestrator, which makes this a serious-sounding recommendation. It means rewriting 180 DAGs and retraining everyone on a different interface, and the scenario explicitly protects both the code and the interface.",
      },
      {
        id: "B",
        text: "AWS Glue workflows, with triggers reproducing the dependencies that each DAG expresses.",
        correct: false,
        explanation:
          "Glue workflows are the native choice when everything being orchestrated is Glue, so the association is reasonable. Here it is both a rewrite and a downgrade in expressiveness: trigger-based dependencies cannot represent the branching and dynamic task generation that Airflow DAGs commonly use.",
      },
      {
        id: "C",
        text: "Amazon Managed Workflows for Apache Airflow.",
        correct: true,
        explanation:
          "Correct. MWAA runs Apache Airflow itself, so the existing DAGs are uploaded unchanged and the familiar Airflow UI remains, while AWS operates the scheduler, the workers, and the metadata database.",
      },
      {
        id: "D",
        text: "Amazon EventBridge Scheduler, invoking each task at the time the DAG currently runs it.",
        correct: false,
        explanation:
          "This substitutes a scheduler for an orchestrator, which is the distinction worth being sharp about. EventBridge Scheduler fires reliably at a time, but it has no concept of whether an upstream task succeeded, so every dependency in all 180 DAGs would have to be re-encoded as a guess about duration.",
      },
    ],
    tips: [
      "MWAA is managed Apache Airflow: existing DAGs and the Airflow UI carry over without modification.",
      "A scheduler fires at a time; an orchestrator fires on the outcome of upstream work. They are not interchangeable.",
      "Prefer a managed version of what you already run when the requirement protects existing code.",
    ],
  },
  {
    id: "dea-t4-q04",
    topic: "orchestration-event-driven",
    prompt:
      "A function invoked directly by S3 event notifications processes uploaded files. During a nightly bulk upload, thousands of objects arrive within seconds, the function reaches its concurrency limit, and some objects are never processed at all. Every object must eventually be processed, though not instantly. Which change prevents the loss?",
    options: [
      {
        id: "A",
        text: "Raise the function's reserved concurrency up to the account's concurrency limit.",
        correct: false,
        explanation:
          "This moves the ceiling without removing it, so a larger upload reproduces the failure, and it starves every other function in the account during the burst. It also treats a ceiling as the problem when the real problem is having nowhere to put work that does not fit under it.",
      },
      {
        id: "B",
        text: "Increase the function's timeout so that each invocation has more time to complete its work.",
        correct: false,
        explanation:
          "Timeout and concurrency are separate limits, and this confuses them. A longer timeout means each invocation occupies a concurrency slot for longer, which makes throttling during a burst more likely rather than less.",
      },
      {
        id: "C",
        text: "Enable S3 Versioning so that objects which were not processed can be reprocessed later.",
        correct: false,
        explanation:
          "Versioning does keep the objects safe, and that is the half-truth that makes it attractive. The objects were never the thing that was lost: the invocation was. Nothing in versioning causes a second attempt, so the team would still have to find and replay the gaps by hand.",
      },
      {
        id: "D",
        text: "Have S3 publish the events to an Amazon SQS queue and configure that queue as the function's event source.",
        correct: true,
        explanation:
          "Correct. The queue absorbs the burst and holds events until the function has capacity, which converts a throughput problem into a latency problem the requirement already accepts. Messages are only deleted after a successful invocation, so throttling delays work instead of discarding it.",
      },
    ],
    tips: [
      "A queue between a bursty producer and a rate-limited consumer turns a throughput problem into a latency problem.",
      "S3 notifications invoke Lambda asynchronously with a limited number of retries; throttled events can be dropped once those are exhausted.",
      "Raising a concurrency limit relocates a ceiling. A queue removes the requirement that the work fit beneath one.",
    ],
  },
  {
    id: "dea-t4-q05",
    topic: "orchestration-event-driven",
    prompt:
      "A state machine must run the same validation against each of 4 million objects in an Amazon S3 prefix, with as many as 3,000 validations running concurrently. The current definition uses an inline Map state, which fails once a few thousand items have been read. Which approach handles this volume?",
    options: [
      {
        id: "A",
        text: "Replace the inline Map with a Distributed Map state, which processes items as parallel child executions.",
        correct: true,
        explanation:
          "Correct. Distributed Map was built for exactly this shape: it reads the item list straight from S3 and fans the work out into child executions, so neither the item count nor the accumulated results are constrained by one execution's state.",
      },
      {
        id: "B",
        text: "Keep the inline Map state and raise its MaxConcurrency setting to 3000.",
        correct: false,
        explanation:
          "The most tempting option because it reads as a one-line fix. Inline Map is capped well below that figure and, more fundamentally, keeps every iteration's state inside the parent execution, so it fails on the state payload limit long before concurrency becomes the binding constraint.",
      },
      {
        id: "C",
        text: "Use a Parallel state with 3,000 branches defined in the state machine definition.",
        correct: false,
        explanation:
          "Parallel and Map both produce concurrency, which is where the confusion starts. A Parallel state's branches are written out at design time and are not driven by data, so 3,000 of them would be unmaintainable and would exceed the definition size limit.",
      },
      {
        id: "D",
        text: "Replace the Map state with a function that loops over the objects and validates them one after another.",
        correct: false,
        explanation:
          "Simple to reason about, and it discards the parallelism that makes the job feasible. A single invocation also has a fifteen-minute ceiling, which 4 million serial validations will not fit inside under any circumstances.",
      },
    ],
    tips: [
      "Distributed Map runs items as child executions, which lifts both the concurrency and state payload limits of inline Map.",
      "Inline Map accumulates every iteration's state in the parent execution, so large item counts hit the payload limit.",
      "A Parallel state's branches are fixed in the definition; a Map state's are driven by the data.",
    ],
  },
  {
    id: "dea-t4-q06",
    topic: "orchestration-event-driven",
    prompt:
      "One task in a workflow calls a partner API that intermittently returns a 503 for a few seconds and occasionally returns a permanent validation error. Today either response fails the entire run. The transient case must be retried and the permanent case must be routed to a notification state. Which configuration delivers that?",
    options: [
      {
        id: "A",
        text: "Raise the task's TimeoutSeconds so that the brief unavailability is absorbed without failing.",
        correct: false,
        explanation:
          "A longer timeout only governs how long one attempt may take. A 503 is a completed response, not a slow one, so the attempt fails immediately and nothing about the timeout causes a second one.",
      },
      {
        id: "B",
        text: "Add a Retry block with exponential backoff for the transient error, and a Catch block that routes the validation error to the notification state.",
        correct: true,
        explanation:
          "Correct. These are the two error-handling primitives and they map directly onto the two cases: Retry re-attempts a named error with backoff, while Catch gives a terminal error a different path through the state machine instead of ending the execution.",
      },
      {
        id: "C",
        text: "Wrap the task in a Parallel state so that a failing branch does not fail the execution.",
        correct: false,
        explanation:
          "This assumes a Parallel state is an isolation boundary, and it is the most useful misconception to clear up. If any branch of a Parallel state fails, the Parallel state fails and takes the execution with it unless a Catch is attached, which puts you back at the real answer.",
      },
      {
        id: "D",
        text: "Convert the state machine to an Express workflow so that failed executions are retried automatically.",
        correct: false,
        explanation:
          "Express workflows do have at-least-once semantics when invoked asynchronously, which is the grain of truth here. That retry applies to the whole execution, not to one task, so the permanent validation error would be retried forever and the notification step would never run.",
      },
    ],
    tips: [
      "Retry re-attempts a named error with backoff; Catch sends a terminal error down a different path.",
      "A failing branch inside a Parallel state fails the Parallel state. It is not a failure boundary on its own.",
      "Name specific errors in Retry and Catch so a permanent failure is not retried for minutes before anyone hears about it.",
    ],
  },
  {
    id: "dea-t4-q07",
    topic: "orchestration-event-driven",
    prompt:
      "A function consuming an Amazon SQS queue writes to an Amazon RDS instance that accepts at most 60 concurrent connections. During bursts the function scales out and the database begins refusing connections. The queue must stay in the design and no message may be dropped. What should be configured?",
    options: [
      {
        id: "A",
        text: "A longer visibility timeout on the source queue.",
        correct: false,
        explanation:
          "Visibility timeout decides how long a message stays hidden after being received, which matters for redelivery and for duplicate work. It places no limit on how many invocations run at once, so the database is hit just as hard.",
      },
      {
        id: "B",
        text: "A larger batch size on the event source mapping.",
        correct: false,
        explanation:
          "The closest wrong answer, because a bigger batch does mean fewer invocations for the same number of messages. It still sets no upper bound: Lambda keeps adding concurrent pollers as the backlog grows, so a large enough burst exceeds 60 connections anyway.",
      },
      {
        id: "C",
        text: "Reserved concurrency on the function, set below the database's connection limit.",
        correct: true,
        explanation:
          "Correct. Reserved concurrency is a hard ceiling on how many copies of the function can run at once, which translates directly into a ceiling on connections. Messages the capped function cannot take yet simply wait in the queue, so nothing is lost.",
      },
      {
        id: "D",
        text: "A dead-letter queue attached to the source queue.",
        correct: false,
        explanation:
          "A dead-letter queue is the right tool for messages that keep failing, and that is a different problem. It records the damage after connections have already been refused rather than preventing the refusals, and it would quietly turn a capacity problem into a growing pile of failed messages.",
      },
    ],
    tips: [
      "Reserved concurrency is a hard ceiling on concurrent executions, which is how you protect a downstream with fixed capacity.",
      "Messages wait in the queue while a capped function catches up; nothing is lost as long as retention exceeds the backlog.",
      "Visibility timeout and dead-letter queues govern redelivery and failure, not how wide a function scales.",
    ],
  },
  {
    id: "dea-t4-q08",
    topic: "orchestration-event-driven",
    prompt:
      "A single ingestion event has to reach four downstream systems. They process at very different rates, each one must be able to fail and catch up without affecting the others, and the publisher must send the event only once. Which pattern fits these constraints?",
    options: [
      {
        id: "A",
        text: "Publish to one Amazon SQS queue that all four systems poll.",
        correct: false,
        explanation:
          "A queue with four pollers is a competing-consumers setup, which is the misconception this option targets. Each message is delivered to exactly one of the four, so the systems would split the work rather than each receiving every event.",
      },
      {
        id: "B",
        text: "Publish to an Amazon SNS topic with the four systems subscribed as function endpoints.",
        correct: false,
        explanation:
          "The right fan-out shape, and that makes it the strongest distractor. Without a queue in between, each subscriber must keep up with the publisher: the slow system gets throttled, and SNS retries are finite, so its backlog becomes data loss rather than a backlog.",
      },
      {
        id: "C",
        text: "Publish the event four times, once to a dedicated queue for each downstream system.",
        correct: false,
        explanation:
          "This does give every system its own buffer, which is half the requirement. It breaks the other half outright, since the publisher now sends four times, and it makes adding a fifth system a change to the publisher's code.",
      },
      {
        id: "D",
        text: "Publish to an Amazon SNS topic with four Amazon SQS queues subscribed, one per system.",
        correct: true,
        explanation:
          "Correct. Topic-to-queue fan-out gives each system a private buffer, its own retry behaviour, and its own backlog, so a slow or broken consumer never affects the others, while the publisher still sends one message to one topic.",
      },
    ],
    tips: [
      "Topic-to-queue fan-out gives every consumer its own buffer, retries, and backlog.",
      "Several consumers polling one queue compete for messages: each message goes to exactly one of them.",
      "Subscribing a compute endpoint directly to a topic removes the buffer that lets a slow consumer fall behind safely.",
    ],
  },
  {
    id: "dea-t4-q09",
    topic: "orchestration-event-driven",
    prompt:
      "Messages belonging to one account must be handled in the sequence they were sent, and no message may be handled twice. Volume is roughly 200 messages per second spread across thousands of accounts. Which queue configuration satisfies both constraints while preserving that throughput?",
    options: [
      {
        id: "A",
        text: "An Amazon SQS FIFO queue using the account ID as the message group ID.",
        correct: true,
        explanation:
          "Correct. A FIFO queue orders messages within a message group and deduplicates them, and scoping the group to the account gives per-account ordering while thousands of groups are processed in parallel. The role of the group ID here mirrors a stream's partition key.",
      },
      {
        id: "B",
        text: "An Amazon SQS standard queue, with the consumer deduplicating on a message attribute.",
        correct: false,
        explanation:
          "Consumer-side deduplication is a legitimate technique and covers one of the two requirements. A standard queue makes no ordering promise at all, so messages for an account can arrive out of sequence no matter how carefully duplicates are filtered.",
      },
      {
        id: "C",
        text: "An Amazon SQS standard queue with a visibility timeout set comfortably above the processing time.",
        correct: false,
        explanation:
          "This is genuinely how you avoid one common source of duplicate processing, which is why it feels responsive to the question. It reduces accidental redelivery of a message still being worked on, and provides neither ordering nor real deduplication.",
      },
      {
        id: "D",
        text: "An Amazon SQS FIFO queue using one message group ID for every account.",
        correct: false,
        explanation:
          "Choosing FIFO is right and choosing the group is where it goes wrong. A single group is a single ordered sequence, so every account's messages queue behind every other account's and the throughput requirement collapses.",
      },
    ],
    tips: [
      "A FIFO queue orders within a message group, so the group ID scopes the ordering much like a partition key does.",
      "FIFO queues deduplicate within a five-minute window; standard queues are at-least-once with no ordering guarantee.",
      "One message group for everything turns a FIFO queue into a serial pipe.",
    ],
  },
  {
    id: "dea-t4-q10",
    topic: "orchestration-event-driven",
    prompt:
      "Records arriving on a Kinesis data stream must be reduced to about 2 percent of their volume by a simple content match, enriched with one lookup call, and handed to a state machine. The team does not want to write and operate a function whose only purpose is to move and filter records. Which service provides this directly?",
    options: [
      {
        id: "A",
        text: "Amazon EventBridge rules, with the Kinesis data stream configured as the event source.",
        correct: false,
        explanation:
          "EventBridge rules do filtering declaratively, which is the capability being asked for, but they match events arriving on an event bus. A data stream is not a bus and cannot be attached to a rule as a source.",
      },
      {
        id: "B",
        text: "Amazon Data Firehose, with the state machine configured as the delivery destination.",
        correct: false,
        explanation:
          "Firehose does connect a stream to a target without custom code, which makes it a reasonable guess. Its destinations are data stores and endpoints, not state machines, and it has no declarative filtering: dropping 98 percent of records would need a transformation function, which is the thing being avoided.",
      },
      {
        id: "C",
        text: "Amazon EventBridge Pipes, with a filter and an enrichment step configured on the pipe.",
        correct: true,
        explanation:
          "Correct. A pipe polls the stream, applies a declarative filter so only matching records continue, calls an enrichment target, and invokes the state machine. That is the whole of the glue code the team wanted to avoid owning.",
      },
      {
        id: "D",
        text: "An AWS Glue streaming job that filters the records and starts the state machine for each match.",
        correct: false,
        explanation:
          "Technically capable and the heaviest possible way to do it. A streaming job is continuously running Spark code with workers to size and a script to maintain, which is a larger version of exactly the operational burden the team declined.",
      },
    ],
    tips: [
      "EventBridge Pipes connects one source to one target with optional filtering and enrichment, replacing glue code.",
      "EventBridge rules match events on a bus; a pipe polls a source such as a stream, a queue, or a table stream.",
      "Filtering inside a pipe means the target is never invoked for non-matching records, which is where the saving comes from.",
    ],
  },
  {
    id: "dea-t4-q11",
    topic: "orchestration-event-driven",
    multiple: true,
    prompt:
      "A nightly Standard workflow failed at the third of its six steps. The on-call engineer re-ran it from the start, which cost four hours, and nobody noticed the failure until morning. The team wants a failed run to resume from where it broke, and wants to be alerted the moment one fails. Which two changes deliver that? (Choose two.)",
    options: [
      {
        id: "A",
        text: "Redrive the failed execution, which resumes it from the step that failed and reuses the results of completed steps.",
        correct: true,
        explanation:
          "Correct. Redrive is built for this: a failed Standard execution restarts at its point of failure with the earlier steps' outputs intact, so the three successful hours are not repeated.",
      },
      {
        id: "B",
        text: "Create an EventBridge rule on the Step Functions execution status change event that publishes to an Amazon SNS topic when a run fails.",
        correct: true,
        explanation:
          "Correct. Step Functions emits execution status changes to EventBridge, so a rule matching the FAILED status is the hook that turns a silent overnight failure into a page.",
      },
      {
        id: "C",
        text: "Convert the state machine to an Express workflow so that failed executions are retried automatically.",
        correct: false,
        explanation:
          "The word automatically does a lot of work here. Express retries apply to a whole execution rather than resuming one, there is no redrive, and a workflow with a four-hour critical path cannot run as Express at all.",
      },
      {
        id: "D",
        text: "Increase the TimeoutSeconds of every task so that transient slowness does not fail a step.",
        correct: false,
        explanation:
          "Reasonable hygiene aimed at the wrong target. Nothing in the scenario says the step timed out, and a longer timeout neither resumes a failed run nor tells anyone that one failed.",
      },
      {
        id: "E",
        text: "Enable AWS X-Ray tracing on the state machine so that failures are easier to investigate.",
        correct: false,
        explanation:
          "Tracing genuinely shortens the investigation, which is why it reads as relevant. It helps only once you already know there was a failure, and it does nothing to avoid replaying the first three steps.",
      },
    ],
    tips: [
      "Redrive restarts a failed Standard execution at its point of failure and reuses the output of completed steps.",
      "Step Functions publishes execution status change events to EventBridge, which is the standard alerting hook.",
      "Tracing helps you understand a failure you already know about; it is not a detection mechanism.",
    ],
  },
  {
    id: "dea-t4-q12",
    topic: "orchestration-event-driven",
    multiple: true,
    prompt:
      "An EventBridge rule has been created with an event pattern matching the Object Created detail type for a bucket, and a Glue job as its target, so that the job runs whenever a file lands. The job never starts, and the rule reports no matching invocations. Which two things are missing? (Choose two.)",
    options: [
      {
        id: "A",
        text: "A notification configuration on the bucket that publishes events to the rule's ARN.",
        correct: false,
        explanation:
          "This mixes the two S3 eventing mechanisms together. A notification configuration targets a queue, a topic, or a function directly and cannot name an EventBridge rule; the EventBridge path is enabled with a single switch on the bucket instead.",
      },
      {
        id: "B",
        text: "A Glue trigger of type ON_DEMAND attached to the job.",
        correct: false,
        explanation:
          "Glue triggers are how a Glue workflow starts a job, and the vocabulary overlap makes this look required. An EventBridge target calls StartJobRun directly, so no trigger object has to exist for the job to be startable.",
      },
      {
        id: "C",
        text: "A dead-letter queue on the rule so that failed target invocations become visible.",
        correct: false,
        explanation:
          "Worth adding, and it would have shortened this investigation considerably, but it is not why nothing runs. A dead-letter queue captures invocations that were attempted and failed, and here the rule reports no matches at all.",
      },
      {
        id: "D",
        text: "EventBridge notifications turned on for the bucket.",
        correct: true,
        explanation:
          "Correct, and it explains the zero match count exactly. A bucket sends nothing to EventBridge until that setting is enabled, so the rule has been sitting on an event bus that never received an S3 event.",
      },
      {
        id: "E",
        text: "An IAM role that EventBridge can assume and that permits glue:StartJobRun on the job.",
        correct: true,
        explanation:
          "Correct. EventBridge invokes this kind of target by assuming a role supplied on the rule. Without a role that both trusts EventBridge and allows StartJobRun, the rule has no authority to start anything even once events begin to arrive.",
      },
    ],
    tips: [
      "S3 sends nothing to EventBridge until EventBridge notifications are enabled on the bucket.",
      "An EventBridge rule invokes most targets by assuming a role declared on the rule; a missing role fails silently.",
      "Zero matched events points at the source; matched events with zero successful invocations points at permissions or the target.",
    ],
  },
];
