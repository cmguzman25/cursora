"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Challenge } from "@content/challenges/types";
import {
  createRunner,
  isLanguageSupported,
  RunnerTimeoutError,
  type ExploreResult,
  type RunResult,
  type Runner,
} from "@/lib/practice/runners";

/**
 * - `run`: califica contra los casos visibles.
 * - `submit`: califica contra todos, ocultos incluidos.
 * - `explore`: corre lo seleccionado contra el ejemplo, sin calificar.
 */
export type RunMode = "run" | "submit" | "explore";

export type RunnerStatus = "idle" | "starting" | "running";

export type RunnerFailure =
  | { kind: "timeout"; seconds: number }
  | { kind: "error"; message: string };

export type RunOutcome =
  | { mode: "run" | "submit"; result: RunResult }
  | { mode: "explore"; result: ExploreResult };

/**
 * Corre el código del alumno con el runner del lenguaje del reto.
 *
 * El runner (y su worker con Postgres adentro) se crea en la primera corrida, no
 * al montar: así abrir un reto para leer el enunciado no descarga ni arranca
 * nada. Esa primera corrida es la lenta, y se distingue con el estado
 * `starting` para que la UI no parezca colgada.
 */
export function useChallengeRunner(challenge: Challenge) {
  const runnerRef = useRef<Runner | null>(null);
  const yaArrancoRef = useRef(false);
  const [status, setStatus] = useState<RunnerStatus>("idle");
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [failure, setFailure] = useState<RunnerFailure | null>(null);

  useEffect(() => {
    return () => {
      runnerRef.current?.dispose();
      runnerRef.current = null;
    };
  }, []);

  const supported = isLanguageSupported(challenge.language);

  const run = useCallback(
    async (code: string, mode: RunMode): Promise<RunOutcome | null> => {
      if (!supported || status !== "idle") return null;

      const runner = (runnerRef.current ??= createRunner(challenge.language));
      setStatus(yaArrancoRef.current ? "running" : "starting");
      setFailure(null);

      try {
        const nuevo: RunOutcome =
          mode === "explore"
            ? { mode, result: await runner.explore(code, challenge) }
            : {
                mode,
                result: await runner.run(code, challenge, { includeHidden: mode === "submit" }),
              };
        yaArrancoRef.current = true;
        setOutcome(nuevo);
        return nuevo;
      } catch (e) {
        if (e instanceof RunnerTimeoutError) {
          // El runner mató el worker: la próxima corrida vuelve a arrancar Postgres.
          yaArrancoRef.current = false;
          setFailure({ kind: "timeout", seconds: e.seconds });
        } else {
          setFailure({ kind: "error", message: e instanceof Error ? e.message : String(e) });
        }
        setOutcome(null);
        return null;
      } finally {
        setStatus("idle");
      }
    },
    [challenge, status, supported],
  );

  return { run, status, outcome, failure, supported };
}
