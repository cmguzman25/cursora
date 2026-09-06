import type { ExamQuizQuestion } from "../../types";

/**
 * English version of the Module 1 bank (`modulo-1.ts`). The real DEA-C01 is
 * only offered in English, Japanese, Korean and Simplified Chinese, so
 * practising in the language of the exam is part of the preparation: the
 * wording of the question is half of what has to be decoded under time
 * pressure.
 *
 * This is deliberately not a literal translation. Each question keeps the same
 * scenario, the same correct answer and the same reason every distractor
 * fails, but is written in the register AWS actually uses — "A company...",
 * "Which solution will meet these requirements with the LEAST operational
 * overhead?", "(Choose two.)" — so the phrasing itself becomes familiar.
 *
 * It has to stay parallel to the Spanish bank: same ids, same order, same
 * option letters, same `correct` flags. `LocalizedQuestions` in
 * `content/courses/types.ts` explains why (progress is keyed by index and the
 * learner can switch language mid-run).
 */
export const MODULE_1_QUESTIONS_EN: ExamQuizQuestion[] = [
  {
    id: "m1-q01",
    prompt:
      "A company runs a nightly job that loads the day's transactions into a data warehouse by inserting rows. A network failure interrupted the job halfway through, and the team reran it from the beginning. The next day, reports show amounts that are much higher than the actual figures. Which change will prevent this from happening again?",
    options: [
      {
        id: "A",
        text: "Increase the size of the instance that runs the job",
        correct: false,
        explanation:
          "The job did not fail because it ran out of resources. It failed because of a network interruption. Even if the job ran faster, rerunning it would still duplicate the data that was already loaded. This option addresses a symptom the scenario never mentions.",
      },
      {
        id: "B",
        text: "Make the job idempotent by overwriting the entire partition for the day instead of inserting rows",
        correct: true,
        explanation:
          "An idempotent job produces the same result whether it runs once or five times. Overwriting the day's partition discards whatever was left half-written and replaces it in full, which makes a retry safe. Deduplicating on a unique key achieves the same goal.",
      },
      {
        id: "C",
        text: "Configure automatic retries for when the job fails",
        correct: false,
        explanation:
          "This is the most common trap in this type of question. Adding retries to a job that is not idempotent multiplies the problem: every retry inserts the already-loaded data again. Retries are useful, but only after idempotency is guaranteed.",
      },
      {
        id: "D",
        text: "Schedule the job during a period of lower network traffic",
        correct: false,
        explanation:
          "This would lower the chance of a network failure, but it neither eliminates the failure nor fixes what happens on a retry. A solution that only reduces the probability of an error does not answer a requirement to prevent an incorrect result.",
      },
    ],
    tips: [
      '"The job ran twice" plus "the totals are inflated" always points to idempotency. Recognizing that pair saves you from reading the options closely.',
      "Be suspicious of options that add retries without changing the design of the job. On a job that is not idempotent, retries make things worse.",
    ],
  },
  {
    id: "m1-q02",
    prompt:
      "A company transforms the files it receives from its suppliers and stores only the cleaned result, discarding the originals to save on storage. Six months later, the company discovers that a business rule was applied incorrectly from the start and needs to recompute the historical data. Which architectural decision would have prevented this problem?",
    options: [
      {
        id: "A",
        text: "Validate the schema of the files when they are received",
        correct: false,
        explanation:
          "Schema validation catches files with an incorrect structure, but the files here were fine. What was wrong was the transformation rule. Validating the input would have changed nothing.",
      },
      {
        id: "B",
        text: "Increase the frequency of the data warehouse backups",
        correct: false,
        explanation:
          "A backup restores an earlier state of the already-transformed data, which was computed incorrectly as well. Recovering an older version of the wrong result does not allow the company to recompute with the corrected rule.",
      },
      {
        id: "C",
        text: "Adopt an ELT approach that keeps the raw data in an unmodified zone",
        correct: true,
        explanation:
          "In ELT the raw data is loaded first and transformed afterward. Keeping the original makes it possible to apply the corrected rule to the full history. This is the main advantage of ELT and the reason the raw zone is immutable.",
      },
      {
        id: "D",
        text: "Document the transformation rules applied to each dataset in a data catalog",
        correct: false,
        explanation:
          "Documenting the rules helps the company notice sooner that one is wrong and understand what was applied, but it does not bring back the input data. Without the originals there is nothing to recompute from, no matter how well the corrected rule is documented.",
      },
    ],
    tips: [
      "When a scenario mentions recomputing or reprocessing history, check whether the original data still exists. If it does not, no downstream solution works.",
      "AWS tends to reward keeping raw data in object storage: it is cheap and it enables reprocessing. Be suspicious of options that discard the source data.",
    ],
  },
  {
    id: "m1-q03",
    prompt:
      "A company wants its operations dashboard to show the day's running sales total with a maximum delay of 2 minutes. The team proposes a streaming architecture with per-event processing. Management asks for the most cost-effective option that meets the requirement. Which recommendation is correct?",
    options: [
      {
        id: "A",
        text: "Use micro-batch processing, because the requirement is near real time and does not require each event to be processed individually",
        correct: true,
        explanation:
          "A 2-minute delay is near real time, not real time. Micro-batch processing accumulates small batches and processes them, which meets that margin comfortably and avoids the cost of being sized for peak load 24 hours a day and of keeping per-event state.",
      },
      {
        id: "B",
        text: "Use streaming with per-event processing, because it is the only way to get below 5 minutes of delay",
        correct: false,
        explanation:
          "It is not the only way: micro-batch processing reaches latencies of seconds to minutes without difficulty. The scenario also asks for the most cost-effective option, and per-event streaming is the expensive one.",
      },
      {
        id: "C",
        text: "Use a batch job scheduled every hour, which is the cheapest option",
        correct: false,
        explanation:
          "It is the cheapest option, but it does not meet the requirement: an hourly batch produces up to 60 minutes of delay when the maximum allowed is 2. An option that fails the functional requirement is eliminated no matter how well it optimizes cost.",
      },
      {
        id: "D",
        text: "Query the transactional database directly from the dashboard",
        correct: false,
        explanation:
          "This would return data instantly, but it would put an analytical workload on the system that serves operations, competing for resources with the business. That is precisely the problem data pipelines exist to avoid.",
      },
    ],
    tips: [
      "Translate the latency before you look at the services: real time means seconds, near real time allows minutes, and that difference changes both the answer and the price.",
      "Eliminate on the functional requirement first and on cost only afterward. A cheap option that does not meet the requirement is never correct.",
    ],
  },
  {
    id: "m1-q04",
    prompt:
      "A vehicle fleet sends telemetry readings. Some vehicles travel through areas with no network coverage and transmit their accumulated readings up to 40 minutes after generating them. The team needs activity reports in 15-minute buckets that reflect when each reading actually occurred. Which approach meets the requirement?",
    options: [
      {
        id: "A",
        text: "Increase ingestion capacity to process the readings faster",
        correct: false,
        explanation:
          "The delay is not caused by the system. It is caused by the lack of coverage at the source. No matter how fast the processing is, a reading that arrives 40 minutes late still arrives 40 minutes late.",
      },
      {
        id: "B",
        text: "Aggregate the readings by the time they arrive at the system",
        correct: false,
        explanation:
          "This is exactly what produces the error: a reading generated at 10:00 and received at 10:40 would be counted in the 10:40 bucket. The reports would be wrong precisely for the vehicles with the worst coverage.",
      },
      {
        id: "C",
        text: "Discard readings that arrive more than 5 minutes late",
        correct: false,
        explanation:
          "This would remove the bucketing problem at the cost of losing data from the vehicles that travel through areas without coverage, which are exactly the ones worth monitoring. Meeting a requirement by deleting the inconvenient data is not a solution.",
      },
      {
        id: "D",
        text: "Aggregate by event time, with an allowed lateness greater than the observed delay",
        correct: true,
        explanation:
          "Event time is the moment the event actually happened, which is what the requirement asks for. Configuring an allowed lateness above the observed 40 minutes lets the late arrivals land in their correct window before it closes.",
      },
    ],
    tips: [
      '"Data arrives late" plus "the report must reflect when it happened" is always an event time versus processing time question.',
      "If the delay originates outside your system, no option that adds capacity or speed will resolve it.",
    ],
  },
  {
    id: "m1-q05",
    prompt:
      "An analyst runs a query against the company's relational database that sums sales amounts grouped by region over 3 years. The query takes hours and slows down the payment processing system. The table has 45 columns and the query uses 3. What is the main technical cause?",
    options: [
      {
        id: "A",
        text: "The table does not have an index on the region column",
        correct: false,
        explanation:
          "An index helps locate a few rows among many, but this query has to scan almost the entire table to aggregate 3 years. When nearly everything must be read, an index contributes little or even produces a worse plan.",
      },
      {
        id: "B",
        text: "The query is not using date partitions",
        correct: false,
        explanation:
          "Partitioning by date would help if the query filtered a short period, but it asks for 3 full years: there is nothing to prune. The underlying problem would also remain.",
      },
      {
        id: "C",
        text: "Row-based storage forces the engine to read all 45 columns of every row to use only 3",
        correct: true,
        explanation:
          "A transactional database stores the fields of each record together and contiguously, which is optimal for reading a full record and terrible for scanning a few columns across millions of rows. A columnar system would read only those 3 columns, heavily compressed, and could skip blocks using statistics.",
      },
      {
        id: "D",
        text: "The database does not have enough memory allocated",
        correct: false,
        explanation:
          "More memory would relieve the symptom without addressing the cause, and it would not remove the contention with the payment system. An analytical workload on a transactional system is an architecture problem, not a sizing problem.",
      },
    ],
    tips: [
      '"A few columns across very many rows" points to the columnar world; "one full record by key" points to the row-based world.',
      "When a scenario mentions that analytics is slowing down the operational system, the correct answer usually separates the two workloads rather than tuning the existing database.",
    ],
  },
  {
    id: "m1-q06",
    prompt:
      "A company stores 10 years of customer records as Parquet files in a data lake on object storage. A privacy regulation requires the company to delete all of a specific customer's data on request, without rewriting entire datasets and without in-flight queries seeing intermediate states. Which solution will meet these requirements with the LEAST operational overhead?",
    options: [
      {
        id: "A",
        text: "Adopt an open table format such as Apache Iceberg on top of the same files",
        correct: true,
        explanation:
          "Iceberg adds a metadata layer over the files that provides ACID transactions and row-level deletes, without rewriting the whole table and without a reader ever seeing a partial write. The data remains Parquet in the same storage.",
      },
      {
        id: "B",
        text: "Run a monthly job that rewrites the affected partitions",
        correct: false,
        explanation:
          "This would work, but it contradicts two conditions in the scenario: it rewrites entire datasets, and during the rewrite queries can see inconsistent states. Its operational overhead is also high compared to the alternative.",
      },
      {
        id: "C",
        text: "Migrate the entire history to a relational database",
        correct: false,
        explanation:
          "This would solve row-level deletion, but it replaces the whole architecture to satisfy one requirement, multiplies the cost of storing 10 years of data, and gives up the flexibility of the data lake. The exam penalizes disproportionate solutions.",
      },
      {
        id: "D",
        text: "Encrypt each customer's data with a separate key and destroy the key on request",
        correct: false,
        explanation:
          "This is a real technique, known as crypto-shredding, but managing one key per customer for 10 years carries enormous operational overhead. Compared with an option that deletes the rows directly, it is not the least-overhead answer.",
      },
    ],
    tips: [
      '"Delete or update specific rows in the data lake" points to an open table format. It is one of the newest and most frequently tested patterns.',
      "When an option proposes replacing the whole architecture to satisfy one requirement, it is almost always wrong. Look for the one that solves the requirement where the data already lives.",
    ],
  },
  {
    id: "m1-q07",
    prompt:
      "A team stores 40 GB of events per day as JSON files in a data lake and queries them with a SQL engine that charges by bytes scanned. The queries always filter by date. Monthly cost has grown by 300%. Which change will reduce the query cost MOST effectively?",
    options: [
      {
        id: "A",
        text: "Compress the JSON files by using gzip",
        correct: false,
        explanation:
          "This reduces stored bytes and scanned bytes somewhat, but the engine still has to read every field of every record across the whole history. gzip is also not splittable, which hurts parallel processing.",
      },
      {
        id: "B",
        text: "Convert the data to Parquet and partition it by date",
        correct: true,
        explanation:
          "This combines the two most powerful levers. Parquet reads only the required columns, heavily compressed, and allows blocks to be skipped by using statistics; partitioning by date avoids reading the days the query does not ask for. When the requirement asks for the largest reduction, the answer stacks levers.",
      },
      {
        id: "C",
        text: "Move data older than 30 days to an archive storage class",
        correct: false,
        explanation:
          "This reduces storage cost, which is not the cost that grew: the scenario points at query cost. Archiving data that queries still need would also create an access problem.",
      },
      {
        id: "D",
        text: "Convert the data to Parquet",
        correct: false,
        explanation:
          "This is correct and it helps a great deal, but it is a single lever. Because the question capitalizes MOST and states that queries always filter by date, the option that also partitions is strictly better.",
      },
    ],
    tips: [
      "When two options are correct and one contains the other, the answer is the more complete one. MOST and LEAST in capitals warn you that more than one option works.",
      'The detail "queries always filter by X" is the signal that partitioning has to be part of the answer.',
    ],
  },
  {
    id: "m1-q08",
    prompt:
      "An Apache Spark job processes a single 12 GB CSV file compressed with gzip every day. The job takes more than 3 hours, and cluster metrics show that most of the nodes stay idle for almost the entire run. What is the MOST likely cause?",
    options: [
      {
        id: "A",
        text: "The cluster has too few nodes for the volume of data",
        correct: false,
        explanation:
          "This is the tempting option, and the scenario itself rules it out: the existing nodes are idle. If there is unused capacity, adding more would change nothing.",
      },
      {
        id: "B",
        text: "The data is skewed and one key holds the majority of the records",
        correct: false,
        explanation:
          "Data skew produces a similar symptom, one node working while the rest wait, but it appears when grouping or joining on an unbalanced key. This scenario mentions no aggregation at all: it points at reading the file.",
      },
      {
        id: "C",
        text: "The file has too many columns and the engine must read all of them",
        correct: false,
        explanation:
          "Reading unnecessary columns makes the job more expensive, but that cost is spread across every node. It does not explain an idle cluster, which is the central detail of the scenario.",
      },
      {
        id: "D",
        text: "A gzip-compressed file is not splittable, so a single task processes it",
        correct: true,
        explanation:
          "gzip is not splittable, so the engine cannot divide the file across multiple tasks: one core decompresses and processes all 12 GB while the rest of the cluster waits. The fix is to split the file or convert it to a splittable format such as Parquet.",
      },
    ],
    tips: [
      '"One node works and the rest are idle" has two causes: splittability when reading and skew when grouping. The context of the scenario breaks the tie.',
      "Adding nodes is almost never the correct answer in distributed performance questions, least of all when the scenario says nodes are idle.",
    ],
  },
  {
    id: "m1-q09",
    prompt:
      "A platform ingests events from mobile applications that evolve frequently: every few weeks a team adds new fields. The events must be consumable as they arrive, and existing consumers must not break when a field they do not recognize appears. Which format is the BEST fit for the ingestion layer?",
    options: [
      {
        id: "A",
        text: "Avro",
        correct: true,
        explanation:
          "Avro is binary and row-based, which matches writing events as they arrive, and it embeds the schema in the file itself with explicit resolution rules between the writer schema and the reader schema. It has the strongest schema evolution support and is the usual choice in streaming.",
      },
      {
        id: "B",
        text: "Parquet",
        correct: false,
        explanation:
          "Parquet is excellent for analytics, but it needs many rows accumulated before writing for the columnar layout to pay off. Writing events one at a time in Parquet produces tiny files with none of its advantages. Its place is the analytical layer, not ingestion.",
      },
      {
        id: "C",
        text: "CSV",
        correct: false,
        explanation:
          "CSV is the worst possible format for changing schemas: it has no field names and no types, and the identity of each value depends on its position. Adding a column in the middle corrupts the interpretation of everything after it without raising any error.",
      },
      {
        id: "D",
        text: "ORC",
        correct: false,
        explanation:
          "ORC is columnar, like Parquet, and the same objection applies: it is designed for the analytical layer, not for writing events as they arrive. Coming from the Hive ecosystem does not change its orientation.",
      },
    ],
    tips: [
      "Place the format at its stage in the pipeline: row-based at ingestion, columnar in analytical storage. That rule alone resolves many questions.",
      "When a scenario insists on changing schemas and on not breaking existing consumers, think Avro and a schema registry.",
    ],
  },
  {
    id: "m1-q10",
    prompt:
      "An ingestion process writes one Parquet file every 30 seconds to a data lake that is partitioned by year, month, day, and hour. Queries filter by date ranges, scan only a few gigabytes, and still take several minutes. Which action will resolve the problem?",
    options: [
      {
        id: "A",
        text: "Convert the files to Parquet",
        correct: false,
        explanation:
          "The files are already in Parquet according to the scenario. This is a distractor that exploits the fact that Parquet is the correct answer in many other questions: always check what has already been done before proposing it.",
      },
      {
        id: "B",
        text: "Add an additional partition on the user identifier",
        correct: false,
        explanation:
          "This would make the problem worse. Partitioning on a high-cardinality field multiplies the number of prefixes and puts even fewer records in each file, aggravating exactly what is causing the slowness.",
      },
      {
        id: "C",
        text: "Compact the small files in each partition into large files and increase the ingestion buffer",
        correct: true,
        explanation:
          "Writing every 30 seconds generates thousands of files per day. Each file carries a fixed opening cost that is independent of its size, so with many tiny files the engine spends more time opening objects than processing data. Compacting and writing less often addresses the cause.",
      },
      {
        id: "D",
        text: "Increase the number of nodes in the query engine",
        correct: false,
        explanation:
          "The bottleneck is the per-file requests and planning, not compute capacity. More nodes would open the same thousands of files, and the improvement would be marginal relative to the cost.",
      },
    ],
    tips: [
      '"Scans little but takes long" is the small files pattern. If it scanned a lot, the problem would be the format or the partitioning.',
      "Before choosing, verify which conditions in the scenario are already satisfied: options that propose something already done are filler.",
    ],
  },
  {
    id: "m1-q11",
    prompt:
      "A team is designing the partitioning strategy for an event table in a data lake. Queries almost always filter by date and occasionally by country. The table also has a unique transaction identifier and a user identifier, both with millions of distinct values. Which TWO decisions are correct? (Choose two.)",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Partition by date, because it is the field the queries usually filter on",
        correct: true,
        explanation:
          "Correct. The rule for choosing a partition key is that it should match the fields used in the usual filters, and date is the most common key precisely because almost every analytical query bounds a time period.",
      },
      {
        id: "B",
        text: "Partition by transaction identifier so that each query finds its record quickly",
        correct: false,
        explanation:
          "This is the worst possible case. A unique identifier would create one partition per record: millions of prefixes with one tiny file each. Planning the query would take longer than reading the data.",
      },
      {
        id: "C",
        text: "Use bucketing on the user identifier if queries look up specific users",
        correct: true,
        explanation:
          "Correct. Bucketing distributes rows across a fixed number of files based on the hash of a column, so all the rows for a given user land in the same file. It is the right tool for high-cardinality fields, and it pays off most when looking up one specific value rather than many at once.",
      },
      {
        id: "D",
        text: "Partition by date, country, user identifier, and transaction identifier to cover every possible filter",
        correct: false,
        explanation:
          "This is over-partitioning. Each additional level multiplies the number of prefixes and shrinks the files; with two high-cardinality fields, the explosion of metadata and small files would make queries slower, not faster.",
      },
      {
        id: "E",
        text: "Do not partition, because the columnar format can already skip blocks by using statistics",
        correct: false,
        explanation:
          "Predicate pushdown discards blocks inside files the engine has already opened, whereas partitioning avoids opening them at all. The two savings add up, and giving up the second would force every query to list and open the entire history.",
      },
    ],
    tips: [
      "Partition on low or medium cardinality and on the fields in the real filter; for high cardinality, use bucketing.",
      "If an option proposes partitioning on a unique identifier, eliminate it without reading the rest of the sentence.",
      "Multiple-response questions carry no partial credit: getting one of two right scores the same as getting both wrong.",
    ],
  },
  {
    id: "m1-q12",
    prompt:
      "An application publishes events to a stream that three different teams consume. A deployment changed a field's type from number to string and, for 11 days, several reports showed null values without any process failing. The company wants to prevent an incompatible change from reaching production again. Which solution achieves this?",
    options: [
      {
        id: "A",
        text: "Configure an alarm that notifies the team when the percentage of null values exceeds a threshold",
        correct: false,
        explanation:
          "This detects the problem far sooner than 11 days, and it is a good practice, but it only acts once the faulty data has already been published and processed. The requirement asks to prevent, not to detect.",
      },
      {
        id: "B",
        text: "Add type validation to each of the three consumers",
        correct: false,
        explanation:
          "This repeats the same logic in three places, where the copies can drift apart, and it still does not block the producer: the incompatible event would be published anyway and each consumer would decide on its own what to do with it.",
      },
      {
        id: "C",
        text: "Run a data quality check against the destination table after each load",
        correct: false,
        explanation:
          "Like the alarm, this is an after-the-fact check: it finds the problem once the data has already been written. It adds value, but it does not meet the requirement to stop the change from reaching production.",
      },
      {
        id: "D",
        text: "Register the stream's schema in a schema registry that rejects incompatible versions",
        correct: true,
        explanation:
          "A schema registry stores the schema versions and validates compatibility before accepting a new one. The incompatible change fails at the producer's deployment, which is the only point where the faulty data can genuinely be prevented from existing.",
      },
    ],
    tips: [
      '"Prevent" and "stop it from reaching production" call for an upstream control; "detect" and "alert" call for observability. The verb decides the answer.',
      "When several consumers share a stream, the correct solution is usually central rather than replicated in each consumer.",
    ],
  },
  {
    id: "m1-q13",
    prompt:
      "A Spark job joins a 4 TB transactions table with a 30 MB countries table. The job takes hours, and metrics show a very high volume of data transferred between nodes. Which change will improve performance with the LEAST effort?",
    options: [
      {
        id: "A",
        text: "Increase the number of nodes in the cluster",
        correct: false,
        explanation:
          "This would still move the same 4 TB across the network, just among more machines. The problem is not a lack of compute, it is unnecessary data movement.",
      },
      {
        id: "B",
        text: "Use a broadcast join, sending a copy of the small table to every executor",
        correct: true,
        explanation:
          "The countries table fits comfortably in each executor's memory. Copying it everywhere allows the join to happen locally and completely removes the shuffle of the 4 TB table, which is what was generating the traffic between nodes.",
      },
      {
        id: "C",
        text: "Increase the memory allocated to each executor",
        correct: false,
        explanation:
          "More memory can avoid spilling to disk, but it does not reduce the amount of data that must travel across the network. The symptom in the scenario is traffic between nodes, not memory pressure.",
      },
      {
        id: "D",
        text: "Sort both tables on the join key before joining them",
        correct: false,
        explanation:
          "Sorting is a wide transformation that triggers its own shuffle: to avoid one data movement you would add another, over 4 TB. Total runtime would get worse.",
      },
    ],
    tips: [
      '"Very large table joined with a very small table" is a broadcast join. It is one of the most valuable associations to memorize for the exam.',
      "Optimizing a distributed job almost always means reducing the shuffle. Be suspicious of options that add sorts or repartitions.",
    ],
  },
  {
    id: "m1-q14",
    prompt:
      "A Spark job has a stage with 200 tasks: 199 finish in less than 1 minute and one takes 40 minutes. The stage groups sales by store identifier, and one flagship store has 20 times more sales than the average. Which TWO actions address the cause? (Choose two.)",
    multiple: true,
    options: [
      {
        id: "A",
        text: "Apply salting: add a random suffix to the hot key and aggregate in two passes",
        correct: true,
        explanation:
          "Correct. Salting spreads the rows of the unbalanced key across several partitions, so no single task concentrates all the work. The partial results are then combined in a second pass.",
      },
      {
        id: "B",
        text: "Double the number of nodes in the cluster",
        correct: false,
        explanation:
          "This changes nothing. The large task is still a single task running on a single core, and the job does not finish until that task does. The additional nodes would sit idle, just like the current ones.",
      },
      {
        id: "C",
        text: "Process the key that concentrates the data separately and combine the results at the end",
        correct: true,
        explanation:
          "Correct. Isolating the problematic value allows it to be processed with a different strategy, for example with more internal parallelism, while the remaining keys follow the normal path. It is a common variant of the fix for skew.",
      },
      {
        id: "D",
        text: "Convert the source data to a columnar format",
        correct: false,
        explanation:
          "This reduces the bytes read, which is good in general, but it does not change how rows are distributed when grouping by store. The flagship store's task would still receive 20 times more records than the others.",
      },
      {
        id: "E",
        text: "Increase the task timeout so that the slow task does not fail",
        correct: false,
        explanation:
          "This treats the symptom in its most superficial form: it accepts a 40-minute job instead of fixing the distribution. The scenario also never says that any task is failing.",
      },
    ],
    tips: [
      "199 fast tasks and one very slow task is data skew. The entire cluster is waiting on a single core.",
      "Scaling the cluster never fixes skew: the problem is how the rows are distributed, not how many machines there are.",
      "Check whether the scenario mentions a value that concentrates the data. That is the confirmation that you are looking at skew and not something else.",
    ],
  },
  {
    id: "m1-q15",
    prompt:
      "A company needs to analyze temperature readings from thousands of industrial sensors in real time and raise an alert when the average of the last 5 minutes exceeds a threshold. While reviewing the answer choices, a candidate is torn between several architectures. Which statement helps eliminate options correctly?",
    options: [
      {
        id: "A",
        text: "Options that include a messaging service can be eliminated, because alerts are not part of the data pipeline",
        correct: false,
        explanation:
          "The opposite is true: sending notifications through messaging services is explicitly in scope as part of pipeline orchestration. The scenario asks for an alert to be raised, so the correct answer will include one.",
      },
      {
        id: "B",
        text: "Options that deliver the data straight to object storage are valid, because the data can be queried afterward",
        correct: false,
        explanation:
          "Delivering and querying afterward does not meet the requirement: a 5-minute rolling average computed in real time needs an engine that keeps windowed state as the data flows, not a later query over files.",
      },
      {
        id: "C",
        text: "Options based on services from the AWS IoT family can be eliminated, because they are out of scope for the exam",
        correct: true,
        explanation:
          "The entire AWS IoT family is on the official out-of-scope services list. An industrial sensor scenario is the most common thematic distractor: it invites you to pick IoT Core or SiteWise. On this exam, devices write directly to an event stream.",
      },
      {
        id: "D",
        text: "Options that use a stateful processing engine can be eliminated, because they add unnecessary complexity",
        correct: false,
        explanation:
          "This eliminates exactly what is needed. Computing a rolling average over the last 5 minutes is a windowed aggregation, and that requires state. A stateless transformation cannot do it.",
      },
    ],
    tips: [
      "Knowing the out-of-scope services list turns several options into immediate eliminations, without analyzing their technical content.",
      '"Average of the last N minutes" is always a windowed aggregation, and therefore stateful processing.',
      "This completes the Module 1 review. If you missed several questions on the same topic, go back to that lesson before starting Module 2: Domain 1 builds directly on these fundamentals.",
    ],
  },
];
