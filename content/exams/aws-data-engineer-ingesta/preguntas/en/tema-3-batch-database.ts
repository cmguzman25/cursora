import type { ExamQuestionWithTopic } from "../../../types";

/**
 * Tema 3: ingesta por lotes y desde bases de datos.
 *
 * El eje del tema es que cada servicio de ingesta tiene un lugar del que puede leer
 * y una forma de saber qué cambió, y que confundir una de esas dos cosas es el error
 * caro. DMS lee el log de transacciones de una base de datos; AppFlow habla con APIs
 * de SaaS; Transfer Family recibe archivos de clientes que no controlamos; un job de
 * Glue lee lo que le digan y necesita que alguien le explique qué es nuevo. Varios
 * distractores del tema son el servicio correcto para el origen equivocado, y la
 * explicación dice para qué origen sí sirve.
 */
export const TEMA_3_BATCH: ExamQuestionWithTopic[] = [
  {
    id: "dea-t3-q01",
    topic: "batch-database-ingestion",
    prompt:
      "Every insert, update, and delete applied to an on-premises Microsoft SQL Server database must land continuously in Amazon S3 so that a data lake table stays in step with the source. The application that owns the database cannot be modified. Which ingestion path captures all three kinds of change?",
    options: [
      {
        id: "A",
        text: "AWS DMS with Amazon S3 as the target endpoint, running a task of type full load and ongoing replication.",
        correct: true,
        explanation:
          "Correct. DMS reads the source transaction log, so it sees deletes as well as inserts and updates, and it needs no application change to do so. The S3 target writes each change with an operation indicator that the lake table can apply.",
      },
      {
        id: "B",
        text: "An AWS Glue job on a schedule reading the table over JDBC with a bookmark on the updated_at column.",
        correct: false,
        explanation:
          "The most instructive wrong answer, because it genuinely captures inserts and updates and is a common pattern. A high-water-mark query can only see rows that still exist, so every delete is invisible: the row simply stops appearing, and the lake keeps the stale copy forever.",
      },
      {
        id: "C",
        text: "Amazon AppFlow with a SQL Server connector scheduled to pull changes.",
        correct: false,
        explanation:
          "This applies a SaaS-oriented service to a relational source. AppFlow connects to application APIs such as Salesforce or ServiceNow and has no SQL Server source connector, so the pipeline cannot be built as described.",
      },
      {
        id: "D",
        text: "AWS DataSync transferring the database's data files from the server's disk into Amazon S3.",
        correct: false,
        explanation:
          "Copying files is attractive because it needs nothing from the database engine. The files of a running database are an inconsistent snapshot of pages mid-transaction, so what lands in S3 is not a queryable dataset and cannot be read as rows.",
      },
    ],
    tips: [
      "Log-based change data capture is the only ingestion method that observes deletes without help from the application.",
      "A query on a modified-timestamp column captures inserts and updates and misses every delete.",
      "Match the service to the source type: DMS for databases, AppFlow for SaaS APIs, DataSync for file systems.",
    ],
  },
  {
    id: "dea-t3-q02",
    topic: "batch-database-ingestion",
    prompt:
      "An AWS Glue Spark job runs every hour against an Amazon S3 prefix where new JSON files keep landing. Each run reprocesses the whole prefix, so runtime and cost climb through the day and the target table fills with duplicates. Which Glue feature makes a run read only what arrived since the previous one?",
    options: [
      {
        id: "A",
        text: "The job's maximum concurrent runs limit, raised so that hourly runs never overlap each other.",
        correct: false,
        explanation:
          "Concurrency control and incrementality are different problems, and this fixes neither. Overlapping runs are not what creates the duplicates: a single run that reads every file already duplicates everything it read last hour.",
      },
      {
        id: "B",
        text: "Job bookmarks.",
        correct: true,
        explanation:
          "Correct. A bookmark is persisted state recording which S3 objects, or which JDBC high-water value, a job has already consumed, so the next run starts where the last one stopped. It has to be enabled on the job and committed in the script to take effect.",
      },
      {
        id: "C",
        text: "An AWS Glue crawler scheduled just before the job so that only new partitions are registered.",
        correct: false,
        explanation:
          "A crawler keeps the Data Catalog current, which feels like it should narrow what the job sees. It only affects metadata: the job still reads whatever its source definition covers, old partitions included, unless something tells it to skip them.",
      },
      {
        id: "D",
        text: "A Glue workflow trigger that passes the end timestamp of the previous run into the job as a parameter.",
        correct: false,
        explanation:
          "The strongest distractor, because this does work and plenty of teams have built it. It is a hand-rolled bookmark with the usual flaws: a file that lands late is skipped forever, and a failed run leaves the timestamp ambiguous, both of which object-level bookmarks handle for you.",
      },
    ],
    tips: [
      "Job bookmarks persist what a Glue job already consumed so later runs skip it.",
      "Bookmarks must be enabled on the job and committed in the script; enabling alone does nothing.",
      "A crawler maintains catalog metadata and never changes which files a job reads.",
    ],
  },
  {
    id: "dea-t3-q03",
    topic: "batch-database-ingestion",
    prompt:
      "Opportunity records from a Salesforce organization have to be copied into Amazon S3 once per hour. The team has no capacity to write or host code and is not permitted to install any package inside the Salesforce org. Which service performs this ingestion?",
    options: [
      {
        id: "A",
        text: "AWS Glue with a JDBC connection pointed at the Salesforce database.",
        correct: false,
        explanation:
          "Glue's JDBC path is the familiar way to read a relational source, which is why it gets reached for here. Salesforce exposes an HTTPS API and no database endpoint a JDBC driver could reach, so there is nothing for the connection to connect to.",
      },
      {
        id: "B",
        text: "AWS DMS with Salesforce configured as the source endpoint.",
        correct: false,
        explanation:
          "DMS covers an impressive list of sources, so assuming Salesforce is among them is reasonable. Its sources are database engines whose transaction logs it can read, and a SaaS application exposes no such log.",
      },
      {
        id: "C",
        text: "Amazon AppFlow with the Salesforce connector on an hourly schedule.",
        correct: true,
        explanation:
          "Correct. AppFlow is the managed connector service for SaaS applications: it authenticates to the org, pulls the object on a schedule, and writes to S3 without any code or anything installed on the Salesforce side.",
      },
      {
        id: "D",
        text: "An AWS Lambda function on an Amazon EventBridge schedule that calls the Salesforce REST API.",
        correct: false,
        explanation:
          "This does work, and it is the answer an engineer who likes control would choose. It is also code the team said it cannot write or maintain, and it means reimplementing OAuth token refresh, pagination, and API limit handling that AppFlow already provides.",
      },
    ],
    tips: [
      "AppFlow is for SaaS application APIs; DMS is for database engines; Glue JDBC needs a reachable database endpoint.",
      "AppFlow handles authentication, pagination, and incremental pulls that a hand-written API client has to reinvent.",
      "A requirement that names a SaaS product by brand and forbids writing code is pointing at AppFlow.",
    ],
  },
  {
    id: "dea-t3-q04",
    topic: "batch-database-ingestion",
    prompt:
      "Several dozen external partners upload nightly files from SFTP clients that they are unwilling to replace. The files have to arrive directly in Amazon S3, and the company refuses to run or patch any file transfer servers. What should the company deploy?",
    options: [
      {
        id: "A",
        text: "An Amazon EC2 Auto Scaling group running OpenSSH with the S3 bucket mounted through a file system driver.",
        correct: false,
        explanation:
          "It satisfies the partners, since nothing changes on their side, and that partial fit is the attraction. It also hands the company exactly what it refused: instances to patch, host keys to manage, and a user directory to operate.",
      },
      {
        id: "B",
        text: "AWS DataSync, with an agent installed at each partner site to push the nightly files.",
        correct: false,
        explanation:
          "DataSync is the right family of tool for moving files, which is why it appears plausible. It needs an agent deployed at the source, and these sources belong to partners the company does not control and cannot install software on.",
      },
      {
        id: "C",
        text: "Amazon AppFlow configured with an SFTP connector for each partner.",
        correct: false,
        explanation:
          "This reads AppFlow as a general-purpose connector service. Its connectors are SaaS application APIs, and it does not act as a server that external clients log into, so it cannot receive an inbound SFTP session at all.",
      },
      {
        id: "D",
        text: "AWS Transfer Family with an SFTP-enabled server whose storage is the Amazon S3 bucket.",
        correct: true,
        explanation:
          "Correct. Transfer Family is managed SFTP in front of S3: partners keep their existing clients and credentials model, files land as S3 objects, and AWS owns the servers, patching, and scaling that the company declined to take on.",
      },
    ],
    tips: [
      "Transfer Family provides managed SFTP, FTPS, and FTP endpoints backed by Amazon S3 or Amazon EFS.",
      "DataSync requires an agent at the source, which rules it out whenever you do not control the other end.",
      "AppFlow connects to SaaS APIs. It is not a file transfer server and accepts no inbound client sessions.",
    ],
  },
  {
    id: "dea-t3-q05",
    topic: "batch-database-ingestion",
    prompt:
      "A DMS task set to full load and ongoing replication reads from a self-managed PostgreSQL 15 server. The full load finishes successfully, and the change capture phase then fails immediately. Which source-side configuration does change capture require?",
    options: [
      {
        id: "A",
        text: "The wal_level parameter set to logical, with a replication slot available for the task.",
        correct: true,
        explanation:
          "Correct. PostgreSQL change capture in DMS decodes the write-ahead log, which only carries enough information when wal_level is logical, and it needs a replication slot to hold its position. A full load reads tables directly, which is why it succeeded first.",
      },
      {
        id: "B",
        text: "A read replica promoted to primary, so that DMS can connect with write permissions on the source.",
        correct: false,
        explanation:
          "This assumes replication needs write access to the source, which feels intuitive because the word replication suggests two-way work. DMS only reads from the source; the write permissions it needs are on the target endpoint.",
      },
      {
        id: "C",
        text: "The source table partitioned, so that DMS can read changes from several partitions in parallel.",
        correct: false,
        explanation:
          "Parallelism by partition is a real DMS capability, but it belongs to the full load phase, which already completed here. Change capture follows a single log stream, so no amount of table partitioning makes it start.",
      },
      {
        id: "D",
        text: "Amazon RDS Performance Insights enabled, so that DMS can observe change activity on the source.",
        correct: false,
        explanation:
          "Confusing an observability tool with a data path. Performance Insights describes what a database is doing for a human reader; it exposes no stream of changes, and it is not even available for a self-managed server.",
      },
    ],
    tips: [
      "PostgreSQL change capture in DMS reads the write-ahead log, which needs wal_level set to logical plus a replication slot.",
      "A full load that succeeds while change capture fails tells you connectivity is fine and logging configuration is not.",
      "The MySQL equivalent is binary logging in ROW format with enough binlog retention for the task to keep up.",
    ],
  },
  {
    id: "dea-t3-q06",
    topic: "batch-database-ingestion",
    prompt:
      "A crawler runs each night over an Amazon S3 prefix holding five years of daily folders. Runs now take hours because every folder is examined again, even though only the newest day ever changes. Which crawler setting cuts the run time?",
    options: [
      {
        id: "A",
        text: "Lower the table level configuration so the crawler stops descending into the older folders.",
        correct: false,
        explanation:
          "Table level configuration sounds like a depth limit on scanning, and that is the misreading. It decides at which folder depth a table is defined, with everything below becoming partitions, so it changes the catalog's shape and not how much S3 the crawler walks.",
      },
      {
        id: "B",
        text: "Enable incremental crawls so that only folders added since the last run are examined.",
        correct: true,
        explanation:
          "Correct. An incremental crawl limits the crawler to new folders and registers the new partitions it finds, which is exactly the shape of this dataset: append-only, with history that never changes.",
      },
      {
        id: "C",
        text: "Reduce the crawler's sample size so that fewer files are read inside each folder.",
        correct: false,
        explanation:
          "The closest wrong answer, because sampling is real and does reduce reads per folder. The hours are being spent listing five years of folders rather than reading inside them, so the crawler still visits every one and the saving is marginal.",
      },
      {
        id: "D",
        text: "Change the crawler's schedule from nightly to weekly so that fewer long runs occur.",
        correct: false,
        explanation:
          "Running less often reduces total crawler time, which is a genuine cost saving, so it is easy to accept. Each individual run still takes hours, and new partitions now stay invisible to queries for up to a week.",
      },
    ],
    tips: [
      "Incremental crawls restrict a crawler to folders added since its previous run.",
      "Table level configuration sets the depth at which tables are defined; it is not a scan limit.",
      "For datasets where partitions are only ever added, Athena partition projection can remove the crawler from the path entirely.",
    ],
  },
  {
    id: "dea-t3-q07",
    topic: "batch-database-ingestion",
    prompt:
      "A broadcaster has 500 TB of archived video on an on-premises NAS that must reach Amazon S3 within three weeks. The site has a single 200 Mbps internet connection, roughly two-thirds of which is permanently consumed by production traffic. Which approach can finish in time?",
    options: [
      {
        id: "A",
        text: "AWS DataSync over the existing connection, with a bandwidth throttle set to the spare capacity.",
        correct: false,
        explanation:
          "DataSync is the correct tool for network transfers and the throttle is responsible engineering, which together make this very convincing. Do the arithmetic: 500 TB over roughly 65 Mbps of spare capacity takes well over a year, so the deadline is missed by two orders of magnitude.",
      },
      {
        id: "B",
        text: "A script on a server at the site that performs S3 multipart uploads of the archive in parallel.",
        correct: false,
        explanation:
          "Parallel multipart upload is the standard way to saturate a link, and saturating is not the problem. The link's capacity is the hard ceiling, so this hits the same timeline as any other network method while adding retry logic nobody wants to own.",
      },
      {
        id: "C",
        text: "AWS Snowball Edge devices shipped to the site, loaded locally, and returned to AWS.",
        correct: true,
        explanation:
          "Correct. When volume divided by usable bandwidth exceeds the deadline, physical transfer is the only option that fits: the archive is copied over the local network at NAS speed and the devices travel in days rather than months.",
      },
      {
        id: "D",
        text: "AWS Storage Gateway in file gateway mode, caching the NAS content and uploading it to Amazon S3.",
        correct: false,
        explanation:
          "A file gateway does present S3 locally and does upload in the background, which makes it look like a transfer appliance. Every uploaded byte still crosses the same 200 Mbps link, so the gateway changes the access pattern and not the transfer time.",
      },
    ],
    tips: [
      "Divide volume by usable bandwidth before choosing a transfer method; the result often rules the network out entirely.",
      "Snowball suits one-time bulk movement; DataSync suits ongoing incremental synchronisation.",
      "Storage Gateway presents cloud storage locally and still sends every byte over your existing link.",
    ],
  },
  {
    id: "dea-t3-q08",
    topic: "batch-database-ingestion",
    prompt:
      "Analysts need tables from an Amazon Aurora MySQL cluster to be queryable in Amazon Redshift within seconds of being written. Management has instructed the data engineering team not to build or operate any pipeline for this. Which approach satisfies both the latency target and the instruction?",
    options: [
      {
        id: "A",
        text: "An AWS DMS task replicating the Aurora cluster into Amazon Redshift continuously.",
        correct: false,
        explanation:
          "Functionally the closest wrong answer: DMS can do this and can keep latency low. It is still a pipeline the team owns, with a replication instance to size, task settings to tune, and failures to be paged about, which is what the instruction forbade.",
      },
      {
        id: "B",
        text: "An AWS Glue job on a five-minute schedule that reads Aurora over JDBC and writes into Redshift.",
        correct: false,
        explanation:
          "Two problems, one of them arithmetic. A five-minute schedule cannot produce second-level freshness no matter how fast the job is, and the job itself is the pipeline the team was told not to build.",
      },
      {
        id: "C",
        text: "Redshift federated queries that read the Aurora tables directly at query time.",
        correct: false,
        explanation:
          "A strong distractor, because there is genuinely no pipeline and the data is as fresh as it gets. The cost lands on the operational database, which now serves analytical scans, and the data never actually arrives in Redshift, so it cannot be joined at warehouse speed or retained after the source prunes it.",
      },
      {
        id: "D",
        text: "A zero-ETL integration between the Aurora MySQL cluster and the Redshift data warehouse.",
        correct: true,
        explanation:
          "Correct. A zero-ETL integration is the managed replication path: AWS keeps the Redshift tables in step with Aurora within seconds, and the team configures the integration once rather than operating anything.",
      },
    ],
    tips: [
      "A zero-ETL integration replicates Aurora into Redshift with nothing for you to build or operate.",
      "Federated query leaves data in the source and puts analytical load on the operational database.",
      "When a requirement forbids operating a pipeline, prefer a managed integration over a managed service you still size and tune.",
    ],
  },
  {
    id: "dea-t3-q09",
    topic: "batch-database-ingestion",
    prompt:
      "Following a DMS migration from Oracle into Amazon RDS for PostgreSQL, an auditor requires evidence that target rows match the source row by row, and that they continue to match while ongoing replication runs. Which DMS capability produces that evidence?",
    options: [
      {
        id: "A",
        text: "Enable data validation on the task so that DMS compares source and target rows and records any mismatches.",
        correct: true,
        explanation:
          "Correct. Data validation reads rows from both endpoints, compares them, and writes discrepancies to a validation table, continuing through the change capture phase. That table is the artefact an auditor can be shown.",
      },
      {
        id: "B",
        text: "Run a premigration assessment on the task and attach its report.",
        correct: false,
        explanation:
          "The nearest miss, and a real DMS feature people conflate with validation. An assessment runs before the task and reports structural obstacles such as unsupported data types or missing primary keys. It never looks at a single row of data.",
      },
      {
        id: "C",
        text: "Turn on detailed Amazon CloudWatch logging for the task and reconcile the applied statement counts.",
        correct: false,
        explanation:
          "Counts feel like proof because they are numeric. Matching statement counts show that the same amount of work happened, not that the resulting rows are identical, and a silently truncated or type-coerced value is counted as applied.",
      },
      {
        id: "D",
        text: "Enable automated backups on the RDS instance and compare restored snapshots against the source.",
        correct: false,
        explanation:
          "Backups demonstrate that the target can be recovered, which is a different assurance entirely. Comparing a restored snapshot by hand is also a point-in-time exercise, and the auditor asked for evidence that holds while replication continues.",
      },
    ],
    tips: [
      "DMS data validation compares rows on both endpoints continuously and records mismatches in a validation table.",
      "A premigration assessment inspects structure before the task starts and never compares data.",
      "Row counts and log volume measure activity, not correctness.",
    ],
  },
  {
    id: "dea-t3-q10",
    topic: "batch-database-ingestion",
    prompt:
      "A DMS task that moves a table containing CLOB columns reports no errors, yet the text in the target rows is cut off at 32 KB. Which task setting explains the truncation?",
    options: [
      {
        id: "A",
        text: "Parallel load split the table into ranges, and the final range of each large value was dropped.",
        correct: false,
        explanation:
          "This invents a truncation mechanism out of a real feature. Parallel load divides a table into row ranges to speed up the full load; it never splits an individual column value, so it cannot cut one short.",
      },
      {
        id: "B",
        text: "Limited LOB mode is enabled with a maximum LOB size smaller than the largest value in the column.",
        correct: true,
        explanation:
          "Correct. Limited LOB mode allocates a fixed buffer per large object for speed and quietly discards anything beyond it, with 32 KB as the familiar default. No error is raised because truncating is the documented behaviour of that mode.",
      },
      {
        id: "C",
        text: "Schema conversion created the target column as VARCHAR rather than TEXT, so values are clipped on insert.",
        correct: false,
        explanation:
          "A believable schema defect and worth ruling out properly. PostgreSQL rejects an over-length value for a bounded VARCHAR with an error instead of clipping it, so the task would have failed loudly rather than producing shortened rows.",
      },
      {
        id: "D",
        text: "Data validation is disabled, so DMS applied the rows without checking their length.",
        correct: false,
        explanation:
          "This treats validation as a gate. Validation observes and reports differences after rows are applied; it never blocks or corrects a write, so enabling it would have revealed the truncation without preventing it.",
      },
    ],
    tips: [
      "Limited LOB mode is fast and silently truncates anything over the configured maximum LOB size.",
      "Full LOB mode preserves whole values at a heavy performance cost; inline LOB mode is the compromise for mixed sizes.",
      "Silent truncation at a round number points to a configured limit rather than a bug.",
    ],
  },
  {
    id: "dea-t3-q11",
    topic: "batch-database-ingestion",
    prompt:
      "An AWS Glue job has to read from an Amazon RDS instance that has no public address and lives in private subnets. The job fails while establishing the database connection. Which configuration gives the job network access to the instance?",
    options: [
      {
        id: "A",
        text: "Add an internet gateway route to the private subnets so that the job can reach the instance.",
        correct: false,
        explanation:
          "Routing is the right category and this is the wrong direction. Glue is not inside the VPC to begin with, so an internet gateway route gives it no new path, and the only thing the change would accomplish is exposing a database that was deliberately private.",
      },
      {
        id: "B",
        text: "Grant the job's IAM role the rds:DescribeDBInstances and rds-db:connect permissions.",
        correct: false,
        explanation:
          "The confusion to name is permission versus reachability. IAM decides whether a call is authorised; it cannot create a network path, and a connection that never reaches the instance fails before any authorisation is evaluated.",
      },
      {
        id: "C",
        text: "Create an AWS Glue connection specifying the VPC, subnet, and security group, and attach it to the job.",
        correct: true,
        explanation:
          "Correct. Attaching a Glue connection is what causes Glue to create elastic network interfaces inside the chosen subnet, so the job runs with an address in the VPC and can reach a private instance through normal security group rules.",
      },
      {
        id: "D",
        text: "Create an interface VPC endpoint for AWS Glue in the database's VPC.",
        correct: false,
        explanation:
          "A precise and common mix-up. A Glue interface endpoint lets resources inside the VPC call the Glue API without traversing the internet, which is the opposite direction of travel. It does nothing to place the job's workers inside the VPC.",
      },
    ],
    tips: [
      "A Glue connection is what places a job's elastic network interfaces inside your VPC subnets.",
      "The security group used by a Glue connection must allow inbound traffic from itself, for Glue's internal communication.",
      "IAM governs whether a call is permitted; routing and security groups govern whether it can be made at all.",
    ],
  },
  {
    id: "dea-t3-q12",
    topic: "batch-database-ingestion",
    prompt:
      "A crawler pointed at s3://logs/ has produced thousands of nearly identical Glue tables, one per device folder, when the team wanted a single table partitioned by device. Every folder holds files with the same schema. Which configuration yields one table?",
    options: [
      {
        id: "A",
        text: "Enable incremental crawls so that folders already seen are not registered as tables again.",
        correct: false,
        explanation:
          "Incremental crawling changes how much the crawler looks at, not how it groups what it finds. New device folders would still each become their own table, so the catalog keeps sprawling at the same rate.",
      },
      {
        id: "B",
        text: "Configure the crawler to update all new and existing partitions with metadata from the table.",
        correct: false,
        explanation:
          "This is a real crawler option and it does concern partitions, which is why it looks relevant. It propagates column changes from a table down to its partitions, and it only applies once the partitions exist as partitions rather than as separate tables.",
      },
      {
        id: "C",
        text: "Exclude the device folders with a glob pattern so that the crawler stops at the top level.",
        correct: false,
        explanation:
          "Excluding does stop the extra tables from appearing, which makes it feel like a fix. Excluded prefixes are not catalogued at all, so the data becomes invisible rather than partitioned, and queries return nothing instead of too many tables.",
      },
      {
        id: "D",
        text: "Set the crawler's table level configuration so that the table is defined at the s3://logs/ level.",
        correct: true,
        explanation:
          "Correct. The table level tells the crawler at which folder depth a dataset begins; defining it at the bucket's logs level makes everything underneath partitions of one table, which is the shape the team wanted.",
      },
    ],
    tips: [
      "Table level configuration sets the folder depth where a table begins; everything deeper becomes partitions.",
      "A crawler creates a separate table for each folder that looks like an independent dataset, which is why consistent prefixes matter.",
      "Excluding a prefix removes it from the catalog entirely instead of folding it into a parent table.",
    ],
  },
  {
    id: "dea-t3-q13",
    topic: "batch-database-ingestion",
    multiple: true,
    prompt:
      "A nightly AWS Glue Spark job reads roughly 200,000 small JSON objects from Amazon S3 and takes four hours. Monitoring shows the driver busy while most executors sit idle, and adding workers has not helped. Which two changes reduce the runtime? (Choose two.)",
    options: [
      {
        id: "A",
        text: "Set the job's groupFiles option to inPartition with a group size, so each task reads many small objects.",
        correct: true,
        explanation:
          "Correct. File grouping is the direct answer to a small-file workload: instead of one task per object, Spark packs many objects into each task, which cuts scheduling overhead and puts the idle executors to work.",
      },
      {
        id: "B",
        text: "Increase the number of DPUs allocated to the job so that more executors are available.",
        correct: false,
        explanation:
          "The reflex for a slow Spark job, and the scenario already reports it was tried. Executors are idle, so capacity is not the constraint; more of them simply means more idle capacity being billed.",
      },
      {
        id: "C",
        text: "Change the job from a Spark job to a Python shell job to avoid Spark's startup overhead.",
        correct: false,
        explanation:
          "Startup overhead is real but measured in minutes, not hours, so this misattributes the cost. A Python shell job also runs on a single node, which removes the parallelism that is the only thing making 200,000 objects tractable.",
      },
      {
        id: "D",
        text: "Enable the job bookmark so that objects processed on previous nights are not read again.",
        correct: false,
        explanation:
          "A good practice that answers a different question. The scenario describes the cost of a single night's objects; a bookmark prevents rereading earlier nights but does nothing about the 200,000 files this run legitimately has to open.",
      },
      {
        id: "E",
        text: "Have the upstream delivery write larger objects so that fewer, bigger files arrive each night.",
        correct: true,
        explanation:
          "Correct, and it is the fix that lasts. Grouping compensates for small files at read time, while enlarging them at write time removes the problem for every consumer of the dataset, including Athena.",
      },
    ],
    tips: [
      "A busy driver with idle executors in Spark is the signature of too many small files, not too little capacity.",
      "Glue's groupFiles option packs many small objects into each task, which is the read-time mitigation.",
      "Fixing object size at the point of writing helps every downstream consumer, not just one job.",
    ],
  },
  {
    id: "dea-t3-q14",
    topic: "batch-database-ingestion",
    multiple: true,
    prompt:
      "Target latency on a DMS change capture task has grown from seconds to nearly an hour during business hours. The replication instance shows sustained high CPU, and the task applies changes one statement at a time to an Amazon RDS target. Which two actions reduce the latency? (Choose two.)",
    options: [
      {
        id: "A",
        text: "Change the task type to full load only so that it stops tracking ongoing changes.",
        correct: false,
        explanation:
          "This removes the latency metric by removing the feature that produces it. Change capture is the requirement, so abandoning it does not make the pipeline faster, it makes it a different and worse pipeline.",
      },
      {
        id: "B",
        text: "Increase the retention period of the transaction logs on the source database.",
        correct: false,
        explanation:
          "Worth doing for safety and easy to mistake for a fix. Longer log retention means a lagging task can still find the changes it needs instead of failing outright, but it does nothing to help the task catch up.",
      },
      {
        id: "C",
        text: "Enable batch apply so that captured changes are applied to the target in batches rather than individually.",
        correct: true,
        explanation:
          "Correct. Applying changes one statement at a time is usually the dominant cost in a lagging task. Batch apply groups them into far fewer round trips to the target, which is typically the single largest latency reduction available.",
      },
      {
        id: "D",
        text: "Scale the replication instance up to a class with more CPU and memory.",
        correct: true,
        explanation:
          "Correct, and the metrics point at it directly: sustained high CPU on the replication instance means the task is compute-bound while transforming and applying changes, so the instance class is a real constraint rather than a guess.",
      },
      {
        id: "E",
        text: "Enable data validation on the task so that rows falling behind are detected sooner.",
        correct: false,
        explanation:
          "Detection is not acceleration, and here it actively hurts. Validation issues its own reads against both endpoints, adding load to the already saturated replication instance and pushing latency further up.",
      },
    ],
    tips: [
      "Applying changes one row at a time is the usual cause of growing target latency; batch apply is the first thing to try.",
      "High CPU on the replication instance means the bottleneck is the instance class, not the task settings.",
      "Validation adds read load to both endpoints, so turn it on deliberately and not while chasing latency.",
    ],
  },
];
