import type { Challenge } from "@content/challenges/types";
import type { SqlExploreResult, SqlRunResult } from "../sql/evaluate";

/**
 * La interfaz común de los motores de ejecución de `/practice`.
 *
 * Hoy el único resultado es el de SQL; cuando entre un runner de funciones
 * (JS, Python), `RunResult` pasa a ser una unión discriminada y la UI elige el
 * panel según el `kind` de la evaluación del reto.
 */
export type RunResult = SqlRunResult;

/** Ejecutar sin calificar (una selección del editor) contra los datos del ejemplo. */
export type ExploreResult = SqlExploreResult;

export interface RunOptions {
  /** false = "Ejecutar" (solo casos visibles); true = "Enviar" (todos). */
  includeHidden: boolean;
}

export interface Runner {
  run(code: string, challenge: Challenge, options: RunOptions): Promise<RunResult>;
  explore(code: string, challenge: Challenge): Promise<ExploreResult>;
  /** Libera lo que el runner tenga abierto (el worker). */
  dispose(): void;
}

export class RunnerTimeoutError extends Error {
  constructor(public readonly seconds: number) {
    super(`timeout after ${seconds}s`);
    this.name = "RunnerTimeoutError";
  }
}
