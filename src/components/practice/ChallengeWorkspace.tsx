"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Lightbulb, Lock, Play, RotateCcw, Send } from "lucide-react";
import type { AppLocale } from "@/i18n/routing";
import {
  draftKey,
  finishedKey,
  parseLocalJson,
  readLocal,
  sessionDraftKey,
  subscribeLocal,
  unlockedKey,
  writeLocal,
  writeLocalJson,
} from "@/lib/practice/local-state";
import { useExamCountdown } from "@/hooks/useExamCountdown";
import { ExamTimer } from "@/components/lessons/exam/ExamTimer";
import { formatDuration } from "@/lib/practice/format";
import { localize } from "@content/courses/types";
import type { Challenge } from "@content/challenges/types";
import { useChallengeRunner } from "@/hooks/useChallengeRunner";
import { useChallengeSubmissions } from "@/hooks/useChallengeSubmissions";
import { Button } from "@/components/ui/Button";
import { CodeEditor } from "./CodeEditor";
import { Markdown } from "./Markdown";
import { ResultsPanel } from "./ResultsPanel";
import { SubmissionHistory } from "./SubmissionHistory";

/** Cuántas entregas muestra el historial (el servidor trae las mismas). */
const HISTORIAL = 10;

type Tab = "statement" | "hints" | "solution";

/**
 * Las condiciones de una entrevista: reloj, sin pistas, una sola entrega.
 * Sin `session`, el workspace está en modo práctica.
 */
export interface InterviewSession {
  /** Espacio de nombres del estado local: uno por entrevista o simulacro. */
  key: string;
  /** Epoch ms en que arrancó el reloj. */
  startedAt: number;
  /** Epoch ms en que se acaba el tiempo y se entrega solo. */
  deadline: number;
  /** false en un simulacro, donde el reloj es uno solo para todos los retos. */
  showTimer: boolean;
  /** El alumno terminó el simulacro antes de tiempo: entregar lo que haya. */
  forceEnd?: boolean;
  /** Id del simulacro, para agrupar sus entregas. */
  mockId?: string;
}

/** Lo que queda guardado al entregar en una entrevista. */
export interface InterviewResult {
  passed: boolean;
  passedCases: number;
  totalCases: number;
  durationSeconds: number;
  /** true si la entregó el reloj (o el fin del simulacro), no el alumno. */
  auto: boolean;
}

function totalDeCasos(challenge: Challenge): number {
  const ev = challenge.evaluation;
  return ev.kind === "sql-query" ? ev.datasets.length : ev.tests.length;
}

export function ChallengeWorkspace({
  challenge,
  session,
}: {
  challenge: Challenge;
  session?: InterviewSession;
}) {
  const t = useTranslations("practice");
  const locale = useLocale() as AppLocale;
  const { run, status, outcome, failure, supported } = useChallengeRunner(challenge);
  const entregas = useChallengeSubmissions(challenge.slug, HISTORIAL);
  const guardarEntrega = entregas.save;
  const { slug, starterCode } = challenge;
  const entrevista = session !== undefined;

  // Borrador y desbloqueo viven en este navegador (ver `local-state.ts`). En una
  // entrevista el borrador es otro: empieza desde el código inicial y no pisa el
  // de práctica.
  const claveBorrador = session ? sessionDraftKey(slug, session.key) : draftKey(slug);
  const code = useSyncExternalStore(
    subscribeLocal,
    () => readLocal(claveBorrador) ?? starterCode,
    () => starterCode,
  );
  const resultadoGuardado = useSyncExternalStore(
    subscribeLocal,
    () => (session ? readLocal(finishedKey(slug, session.key)) : null),
    () => null,
  );
  const resultadoFinal = useMemo(
    () => parseLocalJson<InterviewResult>(resultadoGuardado),
    [resultadoGuardado],
  );
  const terminada = entrevista && resultadoFinal !== null;
  const desbloqueada = useSyncExternalStore(
    subscribeLocal,
    () => readLocal(unlockedKey(slug)) === "1",
    () => false,
  );

  const [tab, setTab] = useState<Tab>("statement");
  const [pistasAbiertas, setPistasAbiertas] = useState(0);
  const [confirmarRendirse, setConfirmarRendirse] = useState(false);
  const [confirmarReset, setConfirmarReset] = useState(false);
  const [seleccion, setSeleccion] = useState("");
  const [confirmarEntrega, setConfirmarEntrega] = useState(false);

  const setCode = useCallback(
    (nuevo: string) => writeLocal(claveBorrador, nuevo === starterCode ? null : nuevo),
    [claveBorrador, starterCode],
  );

  const desbloquear = useCallback(() => writeLocal(unlockedKey(slug), "1"), [slug]);

  // Con algo seleccionado, "Ejecutar" corre solo eso y sin calificar: sirve para
  // mirar los datos o probar un pedazo de la consulta, como en psql.
  const haySeleccion = seleccion.trim().length > 0;
  const ejecutar = useCallback(
    () => void (haySeleccion ? run(seleccion, "explore") : run(code, "run")),
    [run, code, seleccion, haySeleccion],
  );

  // Solo "Enviar" cuenta como entrega. Si el reto mismo falló (`fatal`), no es
  // un intento del alumno y no se guarda.
  const enviar = useCallback(async () => {
    const resultado = await run(code, "submit");
    if (resultado?.mode !== "submit" || resultado.result.fatal) return;
    desbloquear();
    void guardarEntrega({
      code,
      passedCases: resultado.result.passed,
      totalCases: resultado.result.total,
      mode: "practice",
    });
  }, [run, code, desbloquear, guardarEntrega]);

  // --- entrevista: entrega final, manual o automática -------------------------
  const entregarFinal = useCallback(
    async (auto: boolean) => {
      if (!session) return;
      const resultado = await run(code, "submit");
      const total = totalDeCasos(challenge);
      const pasados =
        resultado?.mode === "submit" && !resultado.result.fatal ? resultado.result.passed : 0;
      const segundos = Math.round(
        (Math.min(Date.now(), session.deadline) - session.startedAt) / 1000,
      );
      const final: InterviewResult = {
        passed: pasados === total,
        passedCases: pasados,
        totalCases: total,
        durationSeconds: Math.max(0, segundos),
        auto,
      };
      writeLocalJson(finishedKey(slug, session.key), final);
      desbloquear();
      void guardarEntrega({
        code,
        passedCases: pasados,
        totalCases: total,
        mode: "interview",
        durationSeconds: final.durationSeconds,
        sessionId: session.mockId,
      });
    },
    [session, run, code, challenge, slug, desbloquear, guardarEntrega],
  );

  const { remainingMs, isExpired } = useExamCountdown(
    session ? new Date(session.deadline).toISOString() : null,
    0,
  );

  // Se acabó el tiempo (o el simulacro): se entrega lo que haya, una sola vez.
  // Si justo hay una corrida en curso, se espera a que termine: `run` no acepta
  // otra mientras tanto, y la entrega se perdería.
  const autoEntregadaRef = useRef(false);
  useEffect(() => {
    if (!session || terminada || autoEntregadaRef.current || status !== "idle") return;
    if (!isExpired && !session.forceEnd) return;
    autoEntregadaRef.current = true;
    void entregarFinal(true);
  }, [session, terminada, status, isExpired, entregarFinal]);

  const ocupado = status !== "idle";
  const ev = challenge.evaluation;

  // En una entrevista en curso no hay pistas ni solución: solo el enunciado.
  const tabs: { id: Tab; label: string }[] =
    entrevista && !terminada
      ? [{ id: "statement", label: t("tabStatement") }]
      : [
          { id: "statement", label: t("tabStatement") },
          { id: "hints", label: t("tabHints") },
          { id: "solution", label: t("tabSolution") },
        ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ------------------------------------------------ enunciado / pistas / solución */}
      <section className="flex min-w-0 flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div role="tablist" className="flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                tab === id
                  ? "border-indigo-600 text-zinc-900 dark:border-indigo-400 dark:text-white"
                  : "border-transparent text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "statement" && (
          <div className="flex flex-col gap-4">
            <Markdown>{localize(challenge.statement, locale)}</Markdown>
            {challenge.output && (
              <div className="flex flex-col gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-sm dark:border-indigo-500/30 dark:bg-indigo-500/10">
                <p className="font-semibold text-indigo-900 dark:text-indigo-200">{t("outputTitle")}</p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  <span className="font-medium">{t("outputColumns")}</span>{" "}
                  {challenge.output.columns.map((c, i) => (
                    <span key={c}>
                      {i > 0 && ", "}
                      <code className="rounded bg-white px-1 py-0.5 font-mono text-xs dark:bg-zinc-900">{c}</code>
                    </span>
                  ))}
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  <span className="font-medium">{t("outputOrder")}</span>{" "}
                  {challenge.output.order ? localize(challenge.output.order, locale) : t("outputAnyOrder")}
                </p>
              </div>
            )}
            {ev.kind === "sql-query" && (
              <>
                <details className="group" open>
                  <summary className="cursor-pointer text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {t("schemaTitle")}
                  </summary>
                  <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">
                    {ev.schema}
                  </pre>
                </details>
                {ev.datasets
                  .filter((d) => !d.hidden)
                  .map((d) => (
                    <details key={d.name}>
                      <summary className="cursor-pointer text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {t("sampleDataTitle")}
                      </summary>
                      <pre className="mt-2 overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">
                        {d.seed}
                      </pre>
                    </details>
                  ))}
              </>
            )}
            {ev.kind === "code-tests" && (
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{t("examplesTitle")}</h3>
                {ev.tests
                  .filter((tc) => !tc.hidden)
                  .map((tc) => (
                    <pre
                      key={tc.name}
                      className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100"
                    >
                      {`${tc.call}\n// ${t("examplesExpected")}\n${tc.expected}`}
                    </pre>
                  ))}
              </div>
            )}
          </div>
        )}

        {tab === "hints" && (
          <div className="flex flex-col gap-3">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("hintsIntro")}</p>
            {challenge.hints.slice(0, pistasAbiertas).map((pista, i) => (
              <div
                key={i}
                className="rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-500/30 dark:bg-amber-500/10"
              >
                <p className="mb-1 text-xs font-semibold text-amber-800 dark:text-amber-300">
                  {t("hintLabel", { number: i + 1 })}
                </p>
                <Markdown compact>{localize(pista, locale)}</Markdown>
              </div>
            ))}
            {pistasAbiertas < challenge.hints.length ? (
              <Button
                variant="outline"
                className="self-start"
                onClick={() => setPistasAbiertas((n) => n + 1)}
              >
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
                {t("showHint", { number: pistasAbiertas + 1 })}
              </Button>
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("noMoreHints")}</p>
            )}
          </div>
        )}

        {tab === "solution" &&
          (desbloqueada ? (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{t("solutionCode")}</h3>
                <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">
                  {challenge.solution.code}
                </pre>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{t("solutionWhy")}</h3>
                <Markdown>{localize(challenge.solution.explanation, locale)}</Markdown>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{t("pitfallsTitle")}</h3>
                <ul className="flex flex-col gap-2">
                  {challenge.solution.pitfalls.map((p, i) => (
                    <li key={i} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                      <Markdown compact>{localize(p, locale)}</Markdown>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3">
              <p className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {t("solutionLocked")}
              </p>
              {confirmarRendirse ? (
                <div className="flex flex-col gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-500/30 dark:bg-amber-500/10">
                  <p className="text-sm text-amber-900 dark:text-amber-200">{t("giveUpConfirm")}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={desbloquear}>
                      {t("giveUpYes")}
                    </Button>
                    <Button variant="ghost" onClick={() => setConfirmarRendirse(false)}>
                      {t("giveUpNo")}
                    </Button>
                  </div>
                </div>
              ) : (
                <Button variant="ghost" onClick={() => setConfirmarRendirse(true)}>
                  {t("giveUp")}
                </Button>
              )}
            </div>
          ))}
      </section>

      {/* ------------------------------------------------ editor y resultados */}
      <section className="flex min-w-0 flex-col gap-4">
        {session?.showTimer && !terminada && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
              {t("interviewBadge")}
            </span>
            <ExamTimer remainingMs={remainingMs} />
          </div>
        )}
        {terminada && resultadoFinal && <FinalBanner result={resultadoFinal} />}
        <CodeEditor
          value={code}
          onChange={setCode}
          language={challenge.language}
          onRun={ejecutar}
          onSelectionChange={setSeleccion}
        />

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={ejecutar} disabled={!supported || ocupado}>
            <Play className="h-4 w-4" aria-hidden="true" />
            {haySeleccion ? t("runSelection") : t("run")}
          </Button>
          {entrevista ? (
            <Button
              onClick={() => setConfirmarEntrega(true)}
              disabled={!supported || ocupado || terminada}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {t("submitFinal")}
            </Button>
          ) : (
            <Button onClick={enviar} disabled={!supported || ocupado}>
              <Send className="h-4 w-4" aria-hidden="true" />
              {t("submit")}
            </Button>
          )}
          <span className="text-xs text-zinc-400">{t("shortcutHint")}</span>
          {!entrevista && entregas.persisted && (
            <span className="flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              {t("solvedCount", { count: entregas.solved })}
            </span>
          )}
          <Button
            variant="ghost"
            className="ml-auto"
            disabled={ocupado}
            onClick={() => {
              if (confirmarReset) {
                setCode(challenge.starterCode);
                setConfirmarReset(false);
              } else {
                setConfirmarReset(true);
              }
            }}
            onBlur={() => setConfirmarReset(false)}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {confirmarReset ? t("resetConfirm") : t("reset")}
          </Button>
        </div>

        {confirmarEntrega && !terminada && (
          <div className="flex flex-col gap-2 rounded-xl border border-indigo-200 bg-indigo-50 p-3 dark:border-indigo-500/30 dark:bg-indigo-500/10">
            <p className="text-sm text-indigo-900 dark:text-indigo-200">{t("submitFinalConfirm")}</p>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setConfirmarEntrega(false);
                  void entregarFinal(false);
                }}
                disabled={ocupado}
              >
                {t("submitFinalYes")}
              </Button>
              <Button variant="ghost" onClick={() => setConfirmarEntrega(false)}>
                {t("submitFinalNo")}
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">{t("resultsTitle")}</h2>
          {supported ? (
            <ResultsPanel
              status={status}
              outcome={outcome}
              failure={failure}
              datasets={ev.kind === "sql-query" ? ev.datasets : []}
            />
          ) : (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("unsupportedLanguage")}</p>
          )}
          {entregas.saveStatus === "failed" && (
            <p className="text-xs text-amber-700 dark:text-amber-400">{t("saveFailed")}</p>
          )}
        </div>

        {!entrevista && entregas.persisted && (
          <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
              {t("historyTitle", { attempts: entregas.attempts, solved: entregas.solved })}
            </h2>
            <SubmissionHistory submissions={entregas.submissions} onRestore={setCode} />
          </div>
        )}
      </section>
    </div>
  );
}

/** El resultado de la entrega final de una entrevista. */
function FinalBanner({ result }: { result: InterviewResult }) {
  const t = useTranslations("practice");
  return (
    <div
      className={`flex flex-col gap-1 rounded-xl border p-4 text-sm ${
        result.passed
          ? "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200"
          : "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200"
      }`}
    >
      <p className="font-semibold">{result.passed ? t("finalPassed") : t("finalFailed")}</p>
      <p>
        {t("finalDetail", {
          passed: result.passedCases,
          total: result.totalCases,
          time: formatDuration(result.durationSeconds),
        })}
        {result.auto && <> {t("finalAuto")}</>}
      </p>
      <p className="text-xs opacity-80">{t("finalUnlocked")}</p>
    </div>
  );
}
