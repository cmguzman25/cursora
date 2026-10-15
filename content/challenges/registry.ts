import type { Challenge, ChallengeSummary } from "./types";
import { challenge as areaDeFiguras } from "./area-de-figuras/reto";
import { challenge as cacheLru } from "./cache-lru/reto";
import { challenge as clientesSinPedidos } from "./clientes-sin-pedidos/reto";
import { challenge as dosSumas } from "./dos-sumas/reto";
import { challenge as empleadosFueraDeVentas } from "./empleados-fuera-de-ventas/reto";
import { challenge as evaluarExpresiones } from "./evaluar-expresiones/reto";
import { challenge as frecuenciaDePalabras } from "./frecuencia-de-palabras/reto";
import { challenge as fusionarIntervalos } from "./fusionar-intervalos/reto";
import { challenge as promedioDeNotasValidas } from "./promedio-de-notas-validas/reto";
import { challenge as rachaMasLarga } from "./racha-mas-larga/reto";
import { challenge as retencionDiaSiguiente } from "./retencion-dia-siguiente/reto";
import { challenge as saldoDeCuentas } from "./saldo-de-cuentas/reto";
import { challenge as subcadenaSinRepetidos } from "./subcadena-sin-repetidos/reto";
import { challenge as validarRegistro } from "./validar-registro/reto";

/**
 * Todos los retos que la sección `/practice` puede servir. Agregar uno es crear
 * su carpeta bajo `content/challenges/` con un `reto.ts` que exporte
 * `challenge`, y listarlo acá. El verificador (`verificar-retos.mjs`) avisa si
 * hay una carpeta que no está en esta lista.
 *
 * Imports estáticos por el mismo motivo que `content/exams/registry.ts`: las
 * rutas se prerenderizan en el build.
 */
export const CHALLENGES: Challenge[] = [
  clientesSinPedidos,
  empleadosFueraDeVentas,
  retencionDiaSiguiente,
  rachaMasLarga,
  // Scala
  frecuenciaDePalabras,
  promedioDeNotasValidas,
  areaDeFiguras,
  dosSumas,
  validarRegistro,
  subcadenaSinRepetidos,
  saldoDeCuentas,
  fusionarIntervalos,
  evaluarExpresiones,
  cacheLru,
];

const BY_SLUG = new Map(CHALLENGES.map((c) => [c.slug, c]));

export const CHALLENGE_SLUGS = CHALLENGES.map((c) => c.slug);

export function getChallenge(slug: string): Challenge | null {
  return BY_SLUG.get(slug) ?? null;
}

/** Fichas del catálogo, sin solución ni datos, para no mandarlos al navegador. */
export function getChallengeSummaries(): ChallengeSummary[] {
  return CHALLENGES.map(({ slug, title, difficulty, tags, language, suggestedMinutes }) => ({
    slug,
    title,
    difficulty,
    tags,
    language,
    suggestedMinutes,
  }));
}
