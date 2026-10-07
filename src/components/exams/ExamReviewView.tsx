"use client";

import { useTranslations } from "next-intl";
import { Flag, Info, XCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ExamQuestionWithTopic } from "@content/exams/types";
import { Skeleton } from "@/components/ui/Skeleton";
import { buttonClasses } from "@/components/ui/Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useExamReviewFlags } from "@/hooks/useExamReviewFlags";
import { ExamQuestionCard } from "@/components/exams/ExamQuestionCard";

/** Una pregunta fallada y todavía pendiente, con lo que el servidor sabe de ella. */
export interface PreguntaFallada {
  questionId: string;
  missCount: number;
  lastSelected: string[];
}

interface ExamReviewViewProps {
  examSlug: string;
  questions: readonly ExamQuestionWithTopic[];
  wrong: readonly PreguntaFallada[];
  /**
   * Cuántas preguntas del historial ya no existen en el banco.
   *
   * Se informa en vez de ignorarse en silencio: una pregunta registrada contra la
   * versión 1 del banco que se borró en la 3 no tiene enunciado que mostrar, y
   * buscarla a ciegas para desreferenciarla sería un error en pantalla.
   */
  droppedCount: number;
}

/**
 * "Lo que tengo que repasar" de un examen.
 *
 * Dos secciones, y la separación es lo importante: las **falladas** las eligió el
 * historial —se erraron y todavía no se acertaron— y las **marcadas** las eligió
 * el alumno. Mezclarlas en una sola lista perdería la diferencia entre "esto no me
 * sale" y "esto quiero volver a leerlo".
 *
 * Las falladas vienen del servidor, porque salen de una tabla. Las marcadas las
 * trae el hook, porque acá también se pueden desmarcar y eso tiene que verse al
 * instante.
 */
export function ExamReviewView({
  examSlug,
  questions,
  wrong,
  droppedCount,
}: ExamReviewViewProps) {
  const t = useTranslations("exams");

  const { user, isLoading: cargandoUsuario } = useCurrentUser();
  const flags = useExamReviewFlags({ userKey: user?.id ?? null, examSlug });

  const porId = new Map(questions.map((pregunta) => [pregunta.id, pregunta]));

  const falladas = wrong
    .map((fallada) => ({ ...fallada, pregunta: porId.get(fallada.questionId) }))
    .filter((fallada): fallada is PreguntaFallada & { pregunta: ExamQuestionWithTopic } =>
      Boolean(fallada.pregunta),
    );

  const marcadas = questions.filter((pregunta) => flags.flagged.has(pregunta.id));

  const vacio = falladas.length === 0 && marcadas.length === 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("reviewIntro")}</p>
        {droppedCount > 0 && (
          <p className="flex items-start gap-2.5 rounded-xl bg-zinc-100 p-3 text-sm text-zinc-600 dark:bg-zinc-800/60 dark:text-zinc-400">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {t("reviewDroppedByVersion", { count: droppedCount })}
          </p>
        )}
      </div>

      {cargandoUsuario || flags.isLoading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : vacio ? (
        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("reviewEmpty")}</p>
          <Link href={`/exams/${examSlug}`} className={buttonClasses("outline")}>
            {t("backToExam")}
          </Link>
        </div>
      ) : (
        <>
          <Seccion
            icono={<XCircle className="h-4 w-4 text-red-600 dark:text-red-400" aria-hidden="true" />}
            titulo={t("reviewWrongTitle")}
            intro={t("reviewWrongIntro")}
            vacio={t("reviewWrongEmpty")}
            cantidad={falladas.length}
          >
            {falladas.map(({ pregunta, missCount, lastSelected }, index) => (
              <div
                key={pregunta.id}
                className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="self-start rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">
                  {t("reviewMissCount", { count: missCount })}
                </span>
                <ExamQuestionCard
                  question={pregunta}
                  number={index + 1}
                  total={falladas.length}
                  selected={lastSelected}
                  revealed
                  flagged={flags.flagged.has(pregunta.id)}
                  flagPending={flags.pending.has(pregunta.id)}
                  onToggleOption={() => {}}
                  onToggleFlag={() => void flags.toggle(pregunta.id)}
                />
              </div>
            ))}
          </Seccion>

          <Seccion
            icono={
              <Flag className="h-4 w-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            }
            titulo={t("reviewFlaggedTitle")}
            intro={t("reviewFlaggedIntro")}
            vacio={t("reviewFlaggedEmpty")}
            cantidad={marcadas.length}
          >
            {marcadas.map((pregunta, index) => (
              <div
                key={pregunta.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <ExamQuestionCard
                  question={pregunta}
                  number={index + 1}
                  total={marcadas.length}
                  selected={[]}
                  revealed
                  flagged
                  flagPending={flags.pending.has(pregunta.id)}
                  onToggleOption={() => {}}
                  onToggleFlag={() => void flags.toggle(pregunta.id)}
                />
              </div>
            ))}
          </Seccion>
        </>
      )}
    </div>
  );
}

function Seccion({
  icono,
  titulo,
  intro,
  vacio,
  cantidad,
  children,
}: {
  icono: React.ReactNode;
  titulo: string;
  intro: string;
  vacio: string;
  cantidad: number;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
          {icono}
          {titulo}
          <span className="text-sm font-normal text-zinc-500 tabular-nums dark:text-zinc-400">
            ({cantidad})
          </span>
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {cantidad === 0 ? vacio : intro}
        </p>
      </div>
      {cantidad > 0 && <div className="flex flex-col gap-4">{children}</div>}
    </section>
  );
}
