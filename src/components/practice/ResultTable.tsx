import { useTranslations } from "next-intl";
import type { ResultTable as ResultTableData } from "@/lib/practice/sql/evaluate";

/** Una tabla de resultados de SQL, como la mostraría un cliente de Postgres. */
export function ResultTable({
  table,
  title,
  highlightRow,
}: {
  table: ResultTableData;
  title: string;
  /** Fila (0-based) a resaltar: la primera que difiere. */
  highlightRow?: number;
}) {
  const t = useTranslations("practice");

  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {title} · {t("rowsCount", { count: table.rows.length })}
      </p>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full font-mono text-xs">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              {table.columns.map((c, i) => (
                <th
                  key={i}
                  className="border-b border-zinc-200 px-3 py-1.5 text-left font-semibold text-zinc-700 dark:border-zinc-800 dark:text-zinc-200"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.length === 0 ? (
              <tr>
                <td
                  colSpan={Math.max(table.columns.length, 1)}
                  className="px-3 py-2 text-zinc-400 italic"
                >
                  {t("noRows")}
                </td>
              </tr>
            ) : (
              table.rows.map((row, r) => (
                <tr
                  key={r}
                  className={
                    r === highlightRow
                      ? "bg-rose-50 dark:bg-rose-500/10"
                      : "odd:bg-white even:bg-zinc-50/60 dark:odd:bg-zinc-950 dark:even:bg-zinc-900/60"
                  }
                >
                  {row.map((v, c) => (
                    <td key={c} className="px-3 py-1 whitespace-nowrap text-zinc-800 dark:text-zinc-200">
                      {v === null ? <span className="text-zinc-400 italic">NULL</span> : v}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
