"use client";

import { useTranslations } from "next-intl";
import type { ExamQuestionWithTopic } from "@content/exams/types";
import { FlagButton, OptionButton, TipsPanel } from "@/components/lessons/question-options";

interface ExamQuestionCardProps {
  question: ExamQuestionWithTopic;
  /** Posición humana, 1-based. */
  number: number;
  total: number;
  selected: readonly string[];
  /** Con `true` se pintan correcta e incorrecta, se muestran las explicaciones y los tips. */
  revealed: boolean;
  flagged: boolean;
  flagPending?: boolean;
  onToggleOption: (optionId: string) => void;
  onToggleFlag: () => void;
}

/**
 * Una pregunta de un examen de `/exams`, con su botón de marcar para repasar.
 *
 * La usan los dos modos y la vista de repaso, que es lo que de verdad comparten:
 * cómo se dibuja una pregunta. Lo que **no** comparten —reloj, cuándo revelar, si
 * se puede dejar en blanco— vive en cada orquestador, no acá en condicionales.
 *
 * Está escrito de cero en vez de exportar el `PreguntaDelExamen` interno de
 * `PracticeExam.tsx`, para no tocar un archivo que ya funciona. Lo verdaderamente
 * reusable —`OptionButton`, `TipsPanel`, `FlagButton`— sí sale de
 * `question-options.tsx` y es el mismo código en los dos lados.
 */
export function ExamQuestionCard({
  question,
  number,
  total,
  selected,
  revealed,
  flagged,
  flagPending = false,
  onToggleOption,
  onToggleFlag,
}: ExamQuestionCardProps) {
  const t = useTranslations("exam");

  const elegidas = new Set(selected);
  const correctas = question.options.filter((o) => o.correct).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {t("questionProgress", { current: number, total })}
          </span>
          <FlagButton
            flagged={flagged}
            onToggle={onToggleFlag}
            isPending={flagPending}
            labels={{ flag: t("flagThis"), unflag: t("unflagThis") }}
          />
        </div>

        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{question.prompt}</h2>

        {!revealed && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {question.multiple ? t("selectMultiple", { count: correctas }) : t("selectOne")}
          </p>
        )}
        {revealed && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {selected.length > 0
              ? `${t("reviewYourAnswer")}: ${selected.join(", ")}`
              : t("reviewNoAnswer")}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3" role="group" aria-label={question.prompt}>
        {question.options.map((option) => (
          <OptionButton
            key={option.id}
            option={option}
            selected={elegidas.has(option.id)}
            revealed={revealed}
            onToggle={onToggleOption}
          />
        ))}
      </div>

      {revealed && <TipsPanel tips={question.tips} title={t("tipsTitle")} />}
    </div>
  );
}
