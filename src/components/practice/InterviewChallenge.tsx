"use client";

import { useMemo, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Clock, EyeOff, Lightbulb, Play, RotateCcw, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Challenge } from "@content/challenges/types";
import {
  finishedKey,
  interviewKey,
  newSessionId,
  parseLocalJson,
  readLocal,
  subscribeLocal,
  writeLocalJson,
} from "@/lib/practice/local-state";
import { Button, buttonClasses } from "@/components/ui/Button";
import { ChallengeWorkspace } from "./ChallengeWorkspace";

interface InterviewRecord {
  id: string;
  startedAt: number;
}

/**
 * Un reto en modo entrevista: reloj con los minutos sugeridos, sin pistas ni
 * solución, y una sola entrega. Cuando se acaba el tiempo se entrega solo.
 *
 * La entrevista en curso se guarda en este navegador (`interviewKey`), así que
 * recargar la página retoma con el tiempo que de verdad queda: el reloj se
 * calcula contra la hora de inicio, no se descuenta de a un segundo.
 */
export function InterviewChallenge({ challenge }: { challenge: Challenge }) {
  const t = useTranslations("practice");
  const { slug, suggestedMinutes } = challenge;

  const raw = useSyncExternalStore(
    subscribeLocal,
    () => readLocal(interviewKey(slug)),
    () => null,
  );
  const registro = useMemo(() => parseLocalJson<InterviewRecord>(raw), [raw]);

  const terminadaRaw = useSyncExternalStore(
    subscribeLocal,
    () => (registro ? readLocal(finishedKey(slug, registro.id)) : null),
    () => null,
  );
  const terminada = terminadaRaw !== null;

  const empezar = () =>
    writeLocalJson(interviewKey(slug), { id: newSessionId(), startedAt: Date.now() });
  const reiniciar = () => writeLocalJson(interviewKey(slug), null);

  if (!registro) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{t("interviewStartTitle")}</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("interviewStartIntro")}</p>
        </div>
        <ul className="flex flex-col gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
          <Regla icon={<Clock className="h-4 w-4" />}>
            {t("ruleTimer", { minutes: suggestedMinutes })}
          </Regla>
          <Regla icon={<EyeOff className="h-4 w-4" />}>{t("ruleNoHints")}</Regla>
          <Regla icon={<Play className="h-4 w-4" />}>{t("ruleRun")}</Regla>
          <Regla icon={<Send className="h-4 w-4" />}>{t("ruleOneSubmit")}</Regla>
          <Regla icon={<Lightbulb className="h-4 w-4" />}>{t("ruleThinkAloud")}</Regla>
        </ul>
        <div className="flex flex-wrap gap-2">
          <Button onClick={empezar}>{t("interviewStart")}</Button>
          <Link href={`/practice/${slug}`} className={buttonClasses("ghost")}>
            {t("backToPractice")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {terminada && (
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={reiniciar}>
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t("interviewAgain")}
          </Button>
          <Link href={`/practice/${slug}`} className={buttonClasses("ghost")}>
            {t("backToPractice")}
          </Link>
        </div>
      )}
      <ChallengeWorkspace
        challenge={challenge}
        session={{
          key: registro.id,
          startedAt: registro.startedAt,
          deadline: registro.startedAt + suggestedMinutes * 60_000,
          showTimer: true,
        }}
      />
    </div>
  );
}

function Regla({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-400" aria-hidden="true">
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}
