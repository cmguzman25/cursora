/// <reference lib="webworker" />
import { PGlite } from "@electric-sql/pglite";
import {
  evaluateSql,
  exploreSql,
  type SqlEvaluateInput,
  type SqlExploreResult,
  type SqlRunResult,
} from "./evaluate";

/**
 * El Web Worker que corre Postgres (PGlite) para los retos de SQL.
 *
 * Vive en un worker por dos motivos: PGlite es WASM síncrono y congelaría la
 * pestaña durante una consulta pesada, y la única forma confiable de cortar una
 * consulta que no termina (`pg_sleep`, un producto cartesiano enorme) es
 * terminar el worker entero. El tiempo límite lo pone `runners/postgres.ts`.
 *
 * La base se crea una sola vez por worker (arrancar Postgres tarda un segundo y
 * medio) y se reutiliza: `evaluateSql` deja todo dentro de transacciones que se
 * deshacen.
 */

export type PostgresWorkerRequest =
  | { id: number; type: "evaluate"; input: SqlEvaluateInput }
  | { id: number; type: "explore"; input: Parameters<typeof exploreSql>[1] };

export type PostgresWorkerResponse =
  | { id: number; ok: true; result: SqlRunResult | SqlExploreResult }
  | { id: number; ok: false; error: string };

declare const self: DedicatedWorkerGlobalScope;

let db: Promise<PGlite> | null = null;

self.onmessage = async (event: MessageEvent<PostgresWorkerRequest>) => {
  const request = event.data;
  const { id } = request;
  let response: PostgresWorkerResponse;
  try {
    db ??= PGlite.create();
    const pg = await db;
    const result =
      request.type === "evaluate"
        ? await evaluateSql(pg, request.input)
        : await exploreSql(pg, request.input);
    response = { id, ok: true, result };
  } catch (e) {
    response = { id, ok: false, error: e instanceof Error ? e.message : String(e) };
  }
  self.postMessage(response);
};
