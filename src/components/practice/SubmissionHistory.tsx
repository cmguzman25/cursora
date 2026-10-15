"use client";

import { useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { CheckCircle2, ChevronDown, ChevronRight, XCircle } from "lucide-react";
import type { SubmissionSummary } from "@/lib/practice/submissions";
import { formatDuration } from "@/lib/practice/format";

interface SubmissionHistoryProps {
  submissions: SubmissionSummary[];
  /** Copia el código de una entrega al editor. */
  onRestore: (code: string) => void;
}

/** "Tus envíos": las últimas entregas, con su código desplegable y recuperable. */
export function SubmissionHistory({ submissions, onRestore }: SubmissionHistoryProps) {
  const t = useTranslations("practice");
  const format = useFormatter();
  const [abierta, setAbierta] = useState<string | null>(null);

  if (submissions.length === 0) {
    return <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("historyEmpty")}</p>;
  }

  return (
    <ul className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
      {submissions.map((s) => {
        const expandida = abierta === s.id;
        return (
          <li key={s.id} className="flex flex-col gap-2 py-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <button
                type="button"
                onClick={() => setAbierta(expandida ? null : s.id)}
                aria-expanded={expandida}
                className="flex items-center gap-1.5 text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
              >
                {expandida ? (
                  <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {format.dateTime(new Date(s.createdAt), {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </button>
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  s.passed ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
                }`}
              >
                {s.passed ? (
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {t("historyCases", { passed: s.passedCases, total: s.totalCases })}
              </span>
              {s.mode === "interview" && (
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300">
                  {t("historyInterview", { time: formatDuration(s.durationSeconds ?? 0) })}
                </span>
              )}
              <button
                type="button"
                onClick={() => onRestore(s.code)}
                className="ml-auto text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
              >
                {t("historyRestore")}
              </button>
            </div>
            {expandida && (
              <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-xs text-zinc-100">{s.code}</pre>
            )}
          </li>
        );
      })}
    </ul>
  );
}
