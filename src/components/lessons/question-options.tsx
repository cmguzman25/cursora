"use client";

import { Check, Lightbulb, X } from "lucide-react";
import type { ExamQuizOption } from "@content/courses/types";

/**
 * Lo que `ExamQuiz` (repaso sin tiempo) y `PracticeExam` (simulacro
 * cronometrado) comparten de verdad: cómo se dibuja una opción y cómo se
 * alterna la selección. El comportamiento de los dos difiere en casi todo lo
 * demás —uno revela al instante y obliga a responder, el otro no revela nada
 * hasta entregar y permite dejar en blanco—, así que acá vive solo la parte
 * presentacional, no un motor común lleno de condicionales.
 */

export function optionStateClasses(opts: {
  revealed: boolean;
  selected: boolean;
  correct: boolean;
}): string {
  const { revealed, selected, correct } = opts;

  if (!revealed) {
    return selected
      ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-500/10"
      : "border-zinc-200 hover:border-indigo-300 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-indigo-500/50 dark:hover:bg-zinc-800/50";
  }

  if (correct) {
    return "border-emerald-500 bg-emerald-50 dark:border-emerald-500/60 dark:bg-emerald-500/10";
  }
  if (selected) {
    return "border-red-500 bg-red-50 dark:border-red-500/60 dark:bg-red-500/10";
  }
  return "border-zinc-200 opacity-70 dark:border-zinc-700";
}

/**
 * Alterna una opción. Radio cuando la pregunta tiene una sola correcta
 * (elegir otra reemplaza), casilla cuando admite varias. Devuelve un conjunto
 * nuevo: la función es pura, para que el estado lo maneje quien la llama.
 */
export function toggleSelection(
  current: ReadonlySet<string>,
  optionId: string,
  multiple: boolean,
): Set<string> {
  if (!multiple) {
    return current.has(optionId) ? new Set() : new Set([optionId]);
  }

  const siguiente = new Set(current);
  if (siguiente.has(optionId)) {
    siguiente.delete(optionId);
  } else {
    siguiente.add(optionId);
  }
  return siguiente;
}

interface OptionButtonProps {
  option: ExamQuizOption;
  selected: boolean;
  /** Con `true` se pintan correcta e incorrecta y se muestra la explicación. */
  revealed: boolean;
  disabled?: boolean;
  onToggle: (optionId: string) => void;
}

export function OptionButton({
  option,
  selected,
  revealed,
  disabled = false,
  onToggle,
}: OptionButtonProps) {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => onToggle(option.id)}
        disabled={revealed || disabled}
        aria-pressed={selected}
        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors disabled:cursor-default ${optionStateClasses(
          { revealed, selected, correct: option.correct },
        )}`}
      >
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
            revealed && option.correct
              ? "border-emerald-500 bg-emerald-500 text-white"
              : revealed && selected
                ? "border-red-500 bg-red-500 text-white"
                : selected
                  ? "border-indigo-500 bg-indigo-500 text-white"
                  : "border-zinc-300 text-zinc-500 dark:border-zinc-600 dark:text-zinc-400"
          }`}
        >
          {revealed && option.correct ? (
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
          ) : revealed && selected ? (
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            option.id
          )}
        </span>
        <span className="text-zinc-800 dark:text-zinc-200">{option.text}</span>
      </button>
      {revealed && (
        <p className="mt-1.5 px-4 text-sm text-zinc-600 dark:text-zinc-400">{option.explanation}</p>
      )}
    </div>
  );
}

export function TipsPanel({ tips, title }: { tips: readonly string[]; title: string }) {
  if (tips.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
      <p className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-300">
        <Lightbulb className="h-4 w-4" aria-hidden="true" />
        {title}
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-amber-800 dark:text-amber-300">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
}
