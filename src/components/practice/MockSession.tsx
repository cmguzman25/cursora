"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Circle, Clock, EyeOff, Flag, Send, Shuffle, XCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { localize } from "@content/courses/types";
import type { Challenge } from "@content/challenges/types";
import {
  finishedKey,
  mockKey,
  parseLocalJson,
  readLocal,
  subscribeLocal,
  writeLocalJson,
} from "@/lib/practice/local-state";
import { mockMinutes } from "@/lib/practice/mock";
import { useExamCountdown } from "@/hooks/useExamCountdown";
import { ExamTimer } from "@/components/lessons/exam/ExamTimer";
import { Button, buttonClasses } from "@/components/ui/Button";
import { formatDuration } from "@/lib/practice/format";
import { ChallengeWorkspace, type InterviewResult } from "./ChallengeWorkspace";
import { DifficultyBadge } from "./DifficultyBadge";

interface MockRecord {
  startedAt: number;
  /** El alumno lo dio por terminado antes de tiempo. */
  ended?: boolean;
}

/**
 * Un simulacro: varios retos con **un solo reloj**, sin pistas, una entrega por
 * reto. Se puede saltar de un reto a otro; cada uno queda entregado por
 * separado.
 *
 * Los workspaces de todos los retos quedan montados (los inactivos, ocultos):
 * así cada uno conserva su estado y, cuando se acaba el tiempo o el alumno
 * termina, **cada uno** entrega lo que tenga sin esperar a que lo abran.
 */
export function MockSession({ mockId, challenges }: { mockId: string; challenges: Challenge[] }) {
  const t = useTranslations("practice");
  const locale = useLocale() as AppLocale;
  const minutos = mockMinutes(challenges);

  const raw = useSyncExternalStore(
    subscribeLocal,
    () => readLocal(mockKey(mockId)),
    () => null,
  );
  const registro = useMemo(() => parseLocalJson<MockRecord>(raw), [raw]);

  // Una sola lectura para todos los resultados: el snapshot es un string, así
  // que es estable entre renders mientras nada cambie.
  const resultadosRaw = useSyncExternalStore(
    subscribeLocal,
    () => JSON.stringify(challenges.map((c) => readLocal(finishedKey(c.slug, mockId)))),
    () => "[]",
  );
  const resultados = useMemo(
    () =>
      (JSON.parse(resultadosRaw) as (string | null)[]).map((r) =>
        parseLocalJson<InterviewResult>(r ?? null),
      ),
    [resultadosRaw],
  );

  const [activo, setActivo] = useState(0);
  const [confirmarFin, setConfirmarFin] = useState(false);

  const deadline = registro ? registro.startedAt + minutos * 60_000 : null;
  const { remainingMs } = useExamCountdown(
    deadline !== null ? new Date(deadline).toISOString() : null,
    0,
  );

  const empezar = () => writeLocalJson(mockKey(mockId), { startedAt: Date.now() });
  const terminar = () => {
    if (!registro) return;
    setConfirmarFin(false);
    writeLocalJson(mockKey(mockId), { ...registro, ended: true });
  };

  const todosEntregados = resultados.every((r) => r !== null);

  if (!registro || deadline === null) {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{t("mockStartTitle")}</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("mockStartIntro", { count: challenges.length, minutes: minutos })}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {challenges.map((c) => (
            <DifficultyBadge key={c.slug} difficulty={c.difficulty} />
          ))}
        </div>
        <ul className="flex flex-col gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
          <Regla icon={<Clock className="h-4 w-4" />}>{t("mockRuleTimer", { minutes: minutos })}</Regla>
          <Regla icon={<Shuffle className="h-4 w-4" />}>{t("mockRuleSwitch")}</Regla>
          <Regla icon={<EyeOff className="h-4 w-4" />}>{t("ruleNoHints")}</Regla>
          <Regla icon={<Send className="h-4 w-4" />}>{t("mockRuleOneSubmit")}</Regla>
          <Regla icon={<Flag className="h-4 w-4" />}>{t("mockRuleEnd")}</Regla>
        </ul>
        <Button className="self-start" onClick={empezar}>
          {t("mockStart")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {todosEntregados ? (
        <MockSummary challenges={challenges} results={resultados} locale={locale} />
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <ExamTimer remainingMs={remainingMs} />
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("mockProgress", {
              done: resultados.filter((r) => r !== null).length,
              total: challenges.length,
            })}
          </span>
          {confirmarFin ? (
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{t("mockEndConfirm")}</span>
              <Button onClick={terminar}>{t("mockEndYes")}</Button>
              <Button variant="ghost" onClick={() => setConfirmarFin(false)}>
                {t("submitFinalNo")}
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="ml-auto"
              disabled={registro.ended}
              onClick={() => setConfirmarFin(true)}
            >
              <Flag className="h-4 w-4" aria-hidden="true" />
              {t("mockEnd")}
            </Button>
          )}
        </div>
      )}

      <div role="tablist" className="flex flex-wrap gap-2">
        {challenges.map((c, i) => {
          const r = resultados[i];
          return (
            <button
              key={c.slug}
              role="tab"
              aria-selected={activo === i}
              onClick={() => setActivo(i)}
              className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${
                activo === i
                  ? "border-indigo-500 bg-indigo-50 text-indigo-900 dark:border-indigo-400 dark:bg-indigo-500/10 dark:text-indigo-100"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              }`}
            >
              {r === null ? (
                <Circle className="h-4 w-4 text-zinc-400" aria-hidden="true" />
              ) : r.passed ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              ) : (
                <XCircle className="h-4 w-4 text-rose-600" aria-hidden="true" />
              )}
              <span className="font-medium">{t("mockTab", { number: i + 1 })}</span>
              <span className="hidden sm:inline">· {localize(c.title, locale)}</span>
            </button>
          );
        })}
      </div>

      {challenges.map((c, i) => (
        <div key={c.slug} hidden={activo !== i}>
          <ChallengeWorkspace
            challenge={c}
            session={{
              key: mockId,
              startedAt: registro.startedAt,
              deadline,
              showTimer: false,
              forceEnd: registro.ended === true,
              mockId,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function MockSummary({
  challenges,
  results,
  locale,
}: {
  challenges: Challenge[];
  results: (InterviewResult | null)[];
  locale: AppLocale;
}) {
  const t = useTranslations("practice");
  const resueltos = results.filter((r) => r?.passed).length;
  const tiempo = Math.max(0, ...results.map((r) => r?.durationSeconds ?? 0));

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {t("mockSummaryTitle", { solved: resueltos, total: challenges.length })}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {t("mockSummaryTime", { time: formatDuration(tiempo) })}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-left text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <th className="py-2 pr-3 font-medium">#</th>
              <th className="py-2 pr-3 font-medium">{t("mockColChallenge")}</th>
              <th className="py-2 pr-3 font-medium">{t("mockColResult")}</th>
              <th className="py-2 pr-3 font-medium">{t("mockColTime")}</th>
              <th className="py-2" />
            </tr>
          </thead>
          <tbody>
            {challenges.map((c, i) => {
              const r = results[i];
              return (
                <tr key={c.slug} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800/60">
                  <td className="py-2 pr-3 text-zinc-500">{i + 1}</td>
                  <td className="py-2 pr-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {localize(c.title, locale)}
                      </span>
                      <DifficultyBadge difficulty={c.difficulty} />
                    </div>
                  </td>
                  <td className="py-2 pr-3">
                    {r && (
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          r.passed ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
                        }`}
                      >
                        {r.passed ? (
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <XCircle className="h-4 w-4" aria-hidden="true" />
                        )}
                        {t("historyCases", { passed: r.passedCases, total: r.totalCases })}
                      </span>
                    )}
                  </td>
                  <td className="py-2 pr-3 tabular-nums text-zinc-700 dark:text-zinc-300">
                    {r ? formatDuration(r.durationSeconds) : "—"}
                    {r?.auto && <span className="ml-1 text-xs text-zinc-400">({t("mockAuto")})</span>}
                  </td>
                  <td className="py-2 text-right">
                    <Link
                      href={`/practice/${c.slug}`}
                      className="text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {t("mockSeePractice")}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{t("mockSummaryHint")}</p>
      <Link href="/practice/mock" className={buttonClasses("primary", "self-start")}>
        {t("mockAgain")}
      </Link>
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
