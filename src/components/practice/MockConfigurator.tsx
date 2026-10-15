"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import {
  CHALLENGE_DIFFICULTIES,
  type ChallengeDifficulty,
  type ChallengeLanguage,
  type ChallengeSummary,
} from "@content/challenges/types";
import { isLanguageSupported } from "@/lib/practice/languages";
import {
  MAX_RETOS_POR_SIMULACRO,
  MOCK_ORDERS,
  mockCandidates,
  mockStartHref,
  type MockOrder,
} from "@/lib/practice/mock";
import { Button } from "@/components/ui/Button";
import { CLAVE_DE_DIFICULTAD, NOMBRE_DE_LENGUAJE } from "./DifficultyBadge";

const CLAVE_DE_ORDEN = {
  "least-solved": "mockOrderLeastSolved",
  "most-failed": "mockOrderMostFailed",
  random: "mockOrderRandom",
} as const satisfies Record<MockOrder, string>;

interface MockConfiguratorProps {
  /** Fichas del catálogo (sin soluciones): solo para contar disponibles. */
  catalog: ChallengeSummary[];
  /** false sin sesión: los criterios por historial no tienen con qué ordenar. */
  hasStats: boolean;
}

/**
 * El simulacro a medida: el alumno elige niveles, lenguajes, criterio y
 * cantidad, y ve en vivo cuántos retos entran. Los retos concretos se sortean
 * en el servidor (`/practice/mock/start`), con su historial.
 */
export function MockConfigurator({ catalog, hasStats }: MockConfiguratorProps) {
  const t = useTranslations("practice");
  const router = useRouter();

  const lenguajes = [...new Set(catalog.map((c) => c.language))];
  const [niveles, setNiveles] = useState<ChallengeDifficulty[]>([...CHALLENGE_DIFFICULTIES]);
  const [idiomas, setIdiomas] = useState<ChallengeLanguage[]>(lenguajes.filter(isLanguageSupported));
  const [orden, setOrden] = useState<MockOrder>("least-solved");
  const [cantidad, setCantidad] = useState(2);
  const [yendo, setYendo] = useState(false);

  const disponibles = mockCandidates(catalog, { difficulties: niveles, languages: idiomas }).length;

  const alternar = <T,>(lista: T[], valor: T) =>
    lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor];

  const armar = () => {
    setYendo(true);
    router.push(mockStartHref({ difficulties: niveles, languages: idiomas, order: orden, count: cantidad }));
  };

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-1">
        <h2 className="flex items-center gap-2 text-base font-semibold text-zinc-900 dark:text-white">
          <SlidersHorizontal className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          {t("mockCustomTitle")}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("mockCustomText")}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Fila label={t("mockCustomLevels")}>
          {CHALLENGE_DIFFICULTIES.map((d) => (
            <Chip key={d} active={niveles.includes(d)} onClick={() => setNiveles(alternar(niveles, d))}>
              {t(CLAVE_DE_DIFICULTAD[d])}
            </Chip>
          ))}
        </Fila>
        <Fila label={t("mockCustomLanguages")}>
          {lenguajes.map((l) => {
            const conMotor = isLanguageSupported(l);
            return (
              <Chip
                key={l}
                active={idiomas.includes(l)}
                disabled={!conMotor}
                title={conMotor ? undefined : t("mockCustomNoEngine")}
                onClick={() => setIdiomas(alternar(idiomas, l))}
              >
                {NOMBRE_DE_LENGUAJE[l]}
                {!conMotor && <span className="ml-1 text-xs">({t("mockCustomNoEngine")})</span>}
              </Chip>
            );
          })}
        </Fila>
        <Fila label={t("mockCustomOrder")}>
          {MOCK_ORDERS.map((o) => (
            <Chip key={o} active={orden === o} onClick={() => setOrden(o)}>
              {t(CLAVE_DE_ORDEN[o])}
            </Chip>
          ))}
        </Fila>
        <Fila label={t("mockCustomCount")}>
          {Array.from({ length: MAX_RETOS_POR_SIMULACRO }, (_, i) => i + 1).map((n) => (
            <Chip key={n} active={cantidad === n} onClick={() => setCantidad(n)}>
              {n}
            </Chip>
          ))}
        </Fila>
      </div>

      <div className="flex flex-col gap-1 text-xs text-zinc-500 dark:text-zinc-400">
        <p className={disponibles === 0 ? "font-medium text-amber-700 dark:text-amber-400" : ""}>
          {t("mockCustomAvailable", { count: disponibles })}
        </p>
        {disponibles > 0 && cantidad > disponibles && (
          <p className="text-amber-700 dark:text-amber-400">{t("mockCustomFewer", { available: disponibles })}</p>
        )}
        {!hasStats && orden !== "random" && <p>{t("mockCustomNoStats")}</p>}
        <p>{t("mockCustomSpread")}</p>
      </div>

      <Button className="self-start" disabled={disponibles === 0} isLoading={yendo} onClick={armar}>
        {t("mockCustomBuild")}
      </Button>
    </section>
  );
}

function Fila({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="w-36 text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
      {children}
    </div>
  );
}

function Chip({
  active,
  disabled,
  title,
  onClick,
  children,
}: {
  active: boolean;
  disabled?: boolean;
  title?: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      disabled={disabled}
      title={title}
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        active
          ? "bg-indigo-600 text-white"
          : "bg-white text-zinc-700 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:ring-zinc-800 dark:hover:bg-zinc-800"
      }`}
    >
      {children}
    </button>
  );
}
