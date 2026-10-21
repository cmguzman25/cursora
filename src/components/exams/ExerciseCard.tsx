"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CircleAlert, Eye, EyeOff } from "lucide-react";
import type { Exercise } from "@content/exercises/types";
import type { ExamQuestionImage } from "@content/exams/types";
import { buttonClasses } from "@/components/ui/Button";

interface ExerciseCardProps {
  exercise: Exercise;
  /** Se llama cada vez que el alumno abre la solución. */
  onSolve?: () => void;
}

/**
 * Un ejercicio práctico: el enunciado y la figura del libro, y un botón que
 * revela la resolución paso a paso.
 *
 * No hay nada que responder ni que guardar: el alumno resuelve en el cuaderno y
 * compara. Por eso el estado es solo "solución visible o no", y vive acá.
 */
export function ExerciseCard({ exercise, onSolve }: ExerciseCardProps) {
  const t = useTranslations("exams");
  const [abierta, setAbierta] = useState(false);
  const idSolucion = `solucion-${exercise.id}`;

  return (
    <article
      id={exercise.id}
      className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
          {exercise.label}
        </span>
        <p className="whitespace-pre-line text-base font-medium text-zinc-900 dark:text-white">
          {exercise.prompt}
        </p>
        {exercise.image && <FiguraDoExercicio key={exercise.image.src} image={exercise.image} />}
      </div>

      <div>
        <button
          type="button"
          onClick={() => {
            if (!abierta) onSolve?.();
            setAbierta(!abierta);
          }}
          aria-expanded={abierta}
          aria-controls={idSolucion}
          className={buttonClasses(abierta ? "outline" : "primary")}
        >
          {abierta ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
          {abierta ? t("exercisesHide") : t("exercisesSolve")}
        </button>
      </div>

      {abierta && (
        <div
          id={idSolucion}
          className="flex flex-col gap-4 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5 dark:border-emerald-500/30 dark:bg-emerald-500/5"
        >
          <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            {t("exercisesSolutionTitle")}
          </h3>

          <ol className="flex flex-col gap-3">
            {exercise.steps.map((paso, i) => (
              <li key={i} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white"
                >
                  {i + 1}
                </span>
                <div className="flex min-w-0 flex-col gap-2">
                  <p className="text-sm text-zinc-800 dark:text-zinc-200">{paso.text}</p>
                  {paso.work && paso.work.length > 0 && (
                    <div className="flex flex-col gap-1 overflow-x-auto rounded-lg bg-white px-3 py-2 font-mono text-sm text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
                      {paso.work.map((linea, j) => (
                        <span key={j} className="whitespace-pre">
                          {linea}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <p className="rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white">
            {t("exercisesAnswer")}: {exercise.answer}
          </p>

          {exercise.note && (
            <p className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                <strong className="font-semibold">{t("exercisesNote")}:</strong> {exercise.note}
              </span>
            </p>
          )}
        </div>
      )}
    </article>
  );
}

/** La figura del libro. Si el archivo no carga, desaparece: el enunciado la describe. */
function FiguraDoExercicio({ image }: { image: ExamQuestionImage }) {
  const [fallo, setFallo] = useState(false);
  if (fallo) return null;

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes="(max-width: 640px) 100vw, 480px"
      className="h-auto w-full max-w-md rounded-xl border border-zinc-200 bg-white dark:border-zinc-700"
      onError={() => setFallo(true)}
    />
  );
}
