import type { ChallengeLanguage } from "@content/challenges/types";
import { createPostgresRunner } from "./postgres";
import type { Runner } from "./types";

export type { ExploreResult, RunOptions, RunResult, Runner } from "./types";
export { RunnerTimeoutError } from "./types";

export { isLanguageSupported } from "../languages";

/**
 * Crea el runner de un lenguaje. Solo en el navegador: los runners usan Web
 * Workers. Agregar un lenguaje es agregar su `runners/<lenguaje>.ts` y un caso acá.
 */
export function createRunner(language: ChallengeLanguage): Runner {
  switch (language) {
    case "postgres":
      return createPostgresRunner();
    default:
      throw new Error(`No runner for language "${language}"`);
  }
}
