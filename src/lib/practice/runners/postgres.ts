import type { Challenge, SqlQueryEvaluation } from "@content/challenges/types";
import type { PostgresWorkerRequest, PostgresWorkerResponse } from "../sql/postgres.worker";
import {
  RunnerTimeoutError,
  type ExploreResult,
  type RunOptions,
  type RunResult,
  type Runner,
} from "./types";

/**
 * Tiempo máximo de una corrida. El primer arranque de Postgres cuenta (~1,5 s),
 * así que el margen es generoso; lo que se busca cortar son las consultas que
 * no terminan nunca.
 */
const TIMEOUT_SECONDS = 15;

type RequestBody = PostgresWorkerRequest extends infer R
  ? R extends PostgresWorkerRequest
    ? Omit<R, "id">
    : never
  : never;

/**
 * Runner de SQL de PostgreSQL. Habla con `postgres.worker.ts` y, si una corrida
 * pasa el tiempo límite, mata el worker y arranca uno nuevo en la siguiente:
 * dentro de WASM no hay otra forma de interrumpir una consulta.
 */
export function createPostgresRunner(): Runner {
  let worker: Worker | null = null;
  let nextId = 1;

  function getWorker(): Worker {
    worker ??= new Worker(new URL("../sql/postgres.worker.ts", import.meta.url), {
      type: "module",
    });
    return worker;
  }

  function kill() {
    worker?.terminate();
    worker = null;
  }

  function sqlEvaluation(challenge: Challenge): SqlQueryEvaluation {
    const evaluation = challenge.evaluation;
    if (evaluation.kind !== "sql-query") {
      throw new Error(`postgres runner cannot run "${evaluation.kind}"`);
    }
    return evaluation;
  }

  function send<T>(body: RequestBody): Promise<T> {
    const w = getWorker();
    const id = nextId++;

    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup();
        kill();
        reject(new RunnerTimeoutError(TIMEOUT_SECONDS));
      }, TIMEOUT_SECONDS * 1000);

      function onMessage(event: MessageEvent<PostgresWorkerResponse>) {
        if (event.data.id !== id) return;
        cleanup();
        if (event.data.ok) resolve(event.data.result as T);
        else reject(new Error(event.data.error));
      }
      function onError(event: ErrorEvent) {
        cleanup();
        kill();
        reject(new Error(event.message || "worker error"));
      }
      function cleanup() {
        clearTimeout(timer);
        w.removeEventListener("message", onMessage);
        w.removeEventListener("error", onError);
      }

      w.addEventListener("message", onMessage);
      w.addEventListener("error", onError);
      w.postMessage({ ...body, id } as PostgresWorkerRequest);
    });
  }

  return {
    async run(code: string, challenge: Challenge, options: RunOptions): Promise<RunResult> {
      return send<RunResult>({
        type: "evaluate",
        input: {
          evaluation: sqlEvaluation(challenge),
          referenceSql: challenge.solution.code,
          userSql: code,
          includeHidden: options.includeHidden,
        },
      });
    },
    async explore(code: string, challenge: Challenge): Promise<ExploreResult> {
      return send<ExploreResult>({
        type: "explore",
        input: { evaluation: sqlEvaluation(challenge), sql: code },
      });
    },
    dispose: kill,
  };
}
