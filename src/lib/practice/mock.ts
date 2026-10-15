import {
  CHALLENGE_DIFFICULTIES,
  CHALLENGE_LANGUAGES,
  type ChallengeDifficulty,
  type ChallengeLanguage,
  type ChallengeSummary,
} from "@content/challenges/types";
import { isLanguageSupported } from "./languages";
import type { ChallengeStats } from "./submissions";

/**
 * Los simulacros de entrevista de `/practice/mock`: varios retos, un solo reloj,
 * y los elige la plataforma, como en una prueba real.
 *
 * Esta parte es pura (sin Supabase ni navegador): recibe el catálogo y las
 * estadísticas y devuelve los retos elegidos.
 */

export type MockPresetId = "short" | "standard" | "full";

export interface MockPreset {
  id: MockPresetId;
  /** Un reto por cada entrada, en este orden. */
  difficulties: ChallengeDifficulty[];
}

export const MOCK_PRESETS: MockPreset[] = [
  { id: "short", difficulties: ["basic", "medium"] },
  { id: "standard", difficulties: ["medium", "advanced"] },
  { id: "full", difficulties: ["basic", "medium", "advanced"] },
];

/** Cuántos retos admite como máximo la URL de una sesión. */
export const MAX_RETOS_POR_SIMULACRO = 6;

/**
 * Elige un reto por dificultad: el **menos resuelto** de cada nivel y, entre los
 * empatados, uno al azar. Así un simulacro empuja hacia lo que menos se
 * practicó sin repetir siempre el mismo.
 *
 * Solo entran retos con motor: uno sin motor no se puede entregar. Devuelve
 * null si algún nivel no tiene ningún reto disponible.
 */
export function pickMockChallenges(
  catalog: ChallengeSummary[],
  stats: Record<string, ChallengeStats> | null,
  difficulties: ChallengeDifficulty[],
  random: () => number = Math.random,
): ChallengeSummary[] | null {
  const elegidos: ChallengeSummary[] = [];
  const resueltas = (slug: string) => stats?.[slug]?.solved ?? 0;

  for (const nivel of difficulties) {
    const candidatos = catalog.filter(
      (c) =>
        c.difficulty === nivel &&
        isLanguageSupported(c.language) &&
        !elegidos.some((e) => e.slug === c.slug),
    );
    if (candidatos.length === 0) return null;
    const minimo = Math.min(...candidatos.map((c) => resueltas(c.slug)));
    const empatados = candidatos.filter((c) => resueltas(c.slug) === minimo);
    elegidos.push(empatados[Math.floor(random() * empatados.length)]);
  }
  return elegidos;
}

/** Minutos totales de un simulacro: la suma de los sugeridos de cada reto. */
export function mockMinutes(challenges: { suggestedMinutes: number }[]): number {
  return challenges.reduce((total, c) => total + c.suggestedMinutes, 0);
}

/** Id de sesión válido para la URL y para la columna `session_id`. */
export const MOCK_ID = /^[A-Za-z0-9_-]{6,64}$/;

// ---------------------------------------------------------------------------
// Simulacro personalizado: el alumno elige niveles, lenguajes, criterio y
// cantidad; la plataforma sigue eligiendo **cuáles**.
// ---------------------------------------------------------------------------

export type MockOrder = "least-solved" | "most-failed" | "random";

export const MOCK_ORDERS: readonly MockOrder[] = ["least-solved", "most-failed", "random"];

export interface MockConfig {
  difficulties: ChallengeDifficulty[];
  languages: ChallengeLanguage[];
  order: MockOrder;
  /** 1..MAX_RETOS_POR_SIMULACRO */
  count: number;
}

/** Retos que entran con estos filtros. Solo los que tienen motor: los demás no se pueden entregar. */
export function mockCandidates(
  catalog: ChallengeSummary[],
  filters: Pick<MockConfig, "difficulties" | "languages">,
): ChallengeSummary[] {
  return catalog.filter(
    (c) =>
      isLanguageSupported(c.language) &&
      filters.difficulties.includes(c.difficulty) &&
      filters.languages.includes(c.language),
  );
}

function barajar<T>(items: T[], random: () => number): T[] {
  const copia = [...items];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Elige los retos de un simulacro personalizado.
 *
 * 1. Baraja los candidatos: es el desempate entre los que el criterio no distingue.
 * 2. Los ordena por el criterio (orden estable, así el barajado sobrevive en los empates):
 *    - `least-solved`: menos veces resuelto primero;
 *    - `most-failed`: más entregas fallidas primero y, a igual cantidad, menos resuelto;
 *    - `random`: tal como quedaron barajados.
 * 3. Reparte **por turnos** entre los niveles elegidos, para que el simulacro no
 *    salga entero de un nivel; si uno se queda sin retos, siguen los demás.
 * 4. Devuelve de menor a mayor dificultad, como en una entrevista.
 *
 * Sin estadísticas (sin sesión) todo empata y la elección queda al azar. Puede
 * devolver menos de `count` si no hay suficientes candidatos.
 */
export function pickCustomMock(
  catalog: ChallengeSummary[],
  stats: Record<string, ChallengeStats> | null,
  config: MockConfig,
  random: () => number = Math.random,
): ChallengeSummary[] {
  const resueltas = (slug: string) => stats?.[slug]?.solved ?? 0;
  const fallidas = (slug: string) => {
    const s = stats?.[slug];
    return s ? s.attempts - s.solved : 0;
  };
  const clave = (c: ChallengeSummary): number[] => {
    switch (config.order) {
      case "least-solved":
        return [resueltas(c.slug)];
      case "most-failed":
        return [-fallidas(c.slug), resueltas(c.slug)];
      case "random":
        return [];
    }
  };
  const comparar = (a: ChallengeSummary, b: ChallengeSummary) => {
    const ka = clave(a);
    const kb = clave(b);
    for (let i = 0; i < ka.length; i++) {
      if (ka[i] !== kb[i]) return ka[i] - kb[i];
    }
    return 0;
  };

  const ordenados = barajar(mockCandidates(catalog, config), random).sort(comparar);
  const niveles = CHALLENGE_DIFFICULTIES.filter((d) => config.difficulties.includes(d));
  const colas = niveles.map((d) => ordenados.filter((c) => c.difficulty === d));

  const elegidos: ChallengeSummary[] = [];
  while (elegidos.length < config.count && colas.some((q) => q.length > 0)) {
    for (const cola of colas) {
      const siguiente = cola.shift();
      if (siguiente && elegidos.length < config.count) elegidos.push(siguiente);
    }
  }

  const rango = (d: ChallengeDifficulty) => CHALLENGE_DIFFICULTIES.indexOf(d);
  return elegidos.sort((a, b) => rango(a.difficulty) - rango(b.difficulty));
}

/** Lee la configuración de la URL de `/practice/mock/start`. null si algo no cuadra. */
export function parseMockConfig(params: {
  levels?: string;
  langs?: string;
  order?: string;
  n?: string;
}): MockConfig | null {
  const lista = (v?: string) => [...new Set((v ?? "").split(",").filter(Boolean))];
  const difficulties = lista(params.levels);
  const languages = lista(params.langs);
  const count = Number(params.n);

  if (difficulties.length === 0 || !difficulties.every((d) => (CHALLENGE_DIFFICULTIES as readonly string[]).includes(d))) {
    return null;
  }
  if (languages.length === 0 || !languages.every((l) => (CHALLENGE_LANGUAGES as readonly string[]).includes(l))) {
    return null;
  }
  if (!(MOCK_ORDERS as readonly string[]).includes(params.order ?? "")) return null;
  if (!Number.isInteger(count) || count < 1 || count > MAX_RETOS_POR_SIMULACRO) return null;

  return {
    difficulties: difficulties as ChallengeDifficulty[],
    languages: languages as ChallengeLanguage[],
    order: params.order as MockOrder,
    count,
  };
}

/** La URL de `/practice/mock/start` para una configuración (inversa de `parseMockConfig`). */
export function mockStartHref(config: MockConfig): string {
  const q = new URLSearchParams({
    levels: config.difficulties.join(","),
    langs: config.languages.join(","),
    order: config.order,
    n: String(config.count),
  });
  return `/practice/mock/start?${q.toString()}`;
}
