"use client";

import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Loader2, TriangleAlert, XCircle } from "lucide-react";
import type { AppLocale } from "@/i18n/routing";
import { localize } from "@content/courses/types";
import type { SqlDataset } from "@content/challenges/types";
import type {
  MismatchKind,
  SqlCaseResult,
  SqlExploreResult,
} from "@/lib/practice/sql/evaluate";
import type { RunOutcome, RunnerFailure, RunnerStatus } from "@/hooks/useChallengeRunner";
import { ResultTable } from "./ResultTable";

const CLAVE_DE_DIFERENCIA = {
  "column-count": "mismatchColumnCount",
  "column-names": "mismatchColumnNames",
  "row-count": "mismatchRowCount",
  "row-values": "mismatchRowValues",
  "row-order": "mismatchRowOrder",
} as const satisfies Record<MismatchKind, string>;

interface ResultsPanelProps {
  status: RunnerStatus;
  outcome: RunOutcome | null;
  failure: RunnerFailure | null;
  /** Los datasets del reto, para mostrar la trampa de un caso oculto que falla. */
  datasets: SqlDataset[];
}

export function ResultsPanel({ status, outcome, failure, datasets }: ResultsPanelProps) {
  const t = useTranslations("practice");
  const locale = useLocale() as AppLocale;

  if (status !== "idle") {
    return (
      <p className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        {status === "starting" ? t("starting") : t("running")}
      </p>
    );
  }

  if (failure) {
    return (
      <p className="flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-800 dark:bg-rose-500/10 dark:text-rose-300">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {failure.kind === "timeout"
          ? t("timeout", { seconds: failure.seconds })
          : t("runnerError", { message: failure.message })}
      </p>
    );
  }

  if (!outcome) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("resultsEmpty")}</p>;
  }

  if (outcome.mode === "explore") {
    return <ExploreOutput result={outcome.result} />;
  }

  const { result, mode } = outcome;

  if (result.fatal) {
    return (
      <p className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 dark:bg-amber-500/10 dark:text-amber-200">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {t("fatal", { message: result.fatal })}
      </p>
    );
  }

  const todoBien = result.passed === result.total;
  const ocultos = result.cases.filter((c) => c.hidden).map((c) => c.name);

  return (
    <div className="flex flex-col gap-4">
      <p
        className={`flex items-center gap-2 text-sm font-semibold ${
          todoBien ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-800 dark:text-zinc-200"
        }`}
      >
        {todoBien && <CheckCircle2 className="h-4 w-4" aria-hidden="true" />}
        {mode === "submit" && todoBien
          ? t("allPassed")
          : t(mode === "run" ? "summaryRun" : "summarySubmit", {
              passed: result.passed,
              total: result.total,
            })}
      </p>

      <ul className="flex flex-col gap-3">
        {result.cases.map((c) => {
          const dataset = datasets.find((d) => d.name === c.name);
          return (
            <CaseRow
              key={c.name}
              caso={c}
              label={
                c.hidden
                  ? t("caseHidden", { number: ocultos.indexOf(c.name) + 1 })
                  : t("caseVisible", { name: c.name })
              }
              trap={
                // Si lo único que falla es el orden, la trampa del caso (NULLs,
                // tabla vacía...) no es lo que el alumno tiene que arreglar.
                c.hidden &&
                c.status !== "passed" &&
                c.mismatch?.kind !== "row-order" &&
                dataset?.trap
                  ? localize(dataset.trap, locale)
                  : null
              }
            />
          );
        })}
      </ul>
    </div>
  );
}

function CaseRow({ caso, label, trap }: { caso: SqlCaseResult; label: string; trap: string | null }) {
  const t = useTranslations("practice");
  const paso = caso.status === "passed";

  return (
    <li className="flex flex-col gap-2 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="font-medium text-zinc-800 dark:text-zinc-200">{label}</span>
        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
            paso ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
          }`}
        >
          {paso ? (
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {t(paso ? "statusPassed" : caso.status === "error" ? "statusError" : "statusFailed")}
          <span className="font-normal text-zinc-400">· {caso.ms} ms</span>
        </span>
      </div>

      {caso.errorKind === "multiple-statements" ? (
        <p className="rounded-lg bg-rose-50 p-2 text-xs text-rose-800 dark:bg-rose-500/10 dark:text-rose-300">
          {t("errorMultipleStatements")}
        </p>
      ) : caso.error && (
        <pre className="overflow-x-auto rounded-lg bg-rose-50 p-2 text-xs whitespace-pre-wrap text-rose-800 dark:bg-rose-500/10 dark:text-rose-300">
          {caso.error}
        </pre>
      )}

      {caso.mismatch && (
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          {t(CLAVE_DE_DIFERENCIA[caso.mismatch.kind])}
          {caso.mismatch.row !== undefined && <> {t("mismatchRowAt", { row: caso.mismatch.row + 1 })}</>}
        </p>
      )}

      {trap && (
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold">{t("trapLabel")}</span> {trap}
        </p>
      )}

      {caso.actual && (
        <div className="grid gap-3 lg:grid-cols-2">
          <ResultTable
            table={caso.actual}
            title={t("yourOutput")}
            highlightRow={caso.mismatch?.row}
          />
          {!paso && caso.expected && (
            <ResultTable
              table={caso.expected}
              title={t("expectedOutput")}
              highlightRow={caso.mismatch?.row}
            />
          )}
        </div>
      )}
    </li>
  );
}

/** La salida de "Ejecutar selección": tablas sin calificar, como en psql. */
function ExploreOutput({ result }: { result: SqlExploreResult }) {
  const t = useTranslations("practice");

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
        {t("exploreSummary", { dataset: result.dataset })}
        <span className="font-normal text-zinc-400"> · {result.ms} ms</span>
      </p>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">{t("exploreNotGraded")}</p>

      {result.error ? (
        <pre className="overflow-x-auto rounded-lg bg-rose-50 p-2 text-xs whitespace-pre-wrap text-rose-800 dark:bg-rose-500/10 dark:text-rose-300">
          {result.error}
        </pre>
      ) : result.tables.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("exploreNoRows", { count: result.silentStatements })}
        </p>
      ) : (
        result.tables.map((tabla, i) => (
          <ResultTable
            key={i}
            table={tabla}
            title={
              result.tables.length > 1
                ? t("exploreStatement", { number: i + 1 })
                : t("exploreResult")
            }
          />
        ))
      )}
    </div>
  );
}
