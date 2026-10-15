import type { ChallengeLanguage } from "@content/challenges/types";

/**
 * Lenguajes con motor de ejecución. Módulo aparte de `runners/` para que el
 * servidor pueda consultarlo sin importar los Web Workers.
 *
 * Un reto sin motor se puede leer, escribir y ver su solución, pero no
 * ejecutar: por eso queda fuera del modo entrevista y de los simulacros.
 */
export function isLanguageSupported(language: ChallengeLanguage): boolean {
  return language === "postgres";
}
