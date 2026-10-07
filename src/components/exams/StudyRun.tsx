"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ExamQuestionWithTopic } from "@content/exams/types";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useExamRun } from "@/hooks/useExamRun";
import { useExamReviewFlags } from "@/hooks/useExamReviewFlags";
import { isAnswerCorrect } from "@/lib/exams/grading";
import { toggleSelection } from "@/components/lessons/question-options";
import { ExamQuestionGrid, type Celda } from "@/components/lessons/exam/ExamQuestionGrid";
import { ExamQuestionCard } from "@/components/exams/ExamQuestionCard";

interface StudyRunProps {
  examSlug: string;
  questions: readonly ExamQuestionWithTopic[];
}

/**
 * El modo estudio: sin reloj, revelando al marcar.
 *
 * Al elegir una opción se revela al instante la correcta, la explicación de
 * **cada** opción —también de las que no se marcaron, que es donde está casi todo
 * el valor— y los tips. Recién entonces se habilita avanzar.
 *
 * Dos diferencias con el `ExamQuiz` de los cursos, que hace algo parecido:
 *
 *   1. **Todo va indexado por id de pregunta**, no por posición. `ExamQuiz` guarda
 *      `selectionsByIndex` y `resultsByIndex`, que alcanza para un repaso que
 *      vive en una sola fila; acá el historial de fallos tiene que seguir siendo
 *      el mismo cuando el banco se reordene o se reescriba.
 *   2. **Cada respuesta se registra en el servidor en el momento**, porque este
 *      modo no entrega nunca. Si el historial se escribiera al final, un repaso
 *      abandonado a la mitad —que es el caso normal— no dejaría rastro.
 *
 * No hay autoentrega ni diálogo de confirmación: terminar es irse. Lo que el
 * alumno respondió ya está guardado.
 */
export function StudyRun({ examSlug, questions }: StudyRunProps) {
  const t = useTranslations("exam");
  const tExams = useTranslations("exams");

  const { user, isLoading: cargandoUsuario } = useCurrentUser();
  const { attempt, isLoading, isPersisted, start, update, recordAnswer } = useExamRun({
    examSlug,
    mode: "study",
    durationMinutes: null,
  });

  const flags = useExamReviewFlags({ userKey: user?.id ?? null, examSlug });

  /**
   * Qué preguntas están reveladas **en esta visita**.
   *
   * Es estado local y no algo que venga del servidor a propósito: al retomar un
   * repaso, lo útil es volver a ver la pregunta y poder pensarla, no encontrarse
   * la respuesta ya destapada. Lo que sí persiste es lo que marcó, que es lo que
   * permite saber por dónde iba.
   */
  const [reveladas, setReveladas] = useState<ReadonlySet<string>>(new Set());
  const [terminado, setTerminado] = useState(false);

  const respuestas = useMemo(() => attempt?.answers ?? {}, [attempt?.answers]);
  const posicion = Math.min(attempt?.cursor ?? 0, Math.max(0, questions.length - 1));

  // Se arranca al montar: a esta ruta se llega habiendo elegido el modo en la
  // pantalla previa. No hay reloj, así que no hay nada que quemar por entrar.
  //
  // Va en un efecto y no derivado durante el render porque `start()` hace una
  // petición, y un render no puede tener efectos secundarios. La guarda es una ref
  // y no estado porque nada la dibuja, y porque llamar a `setState` dentro de un
  // efecto provoca el render en cascada que la regla
  // `react-hooks/set-state-in-effect` existe para evitar.
  const empezadoRef = useRef(false);
  useEffect(() => {
    if (isLoading || empezadoRef.current) return;
    empezadoRef.current = true;
    void start();
  }, [isLoading, start]);

  const irA = useCallback(
    (index: number) => {
      update({ cursor: Math.min(Math.max(0, index), questions.length - 1) });
    },
    [update, questions.length],
  );

  const alternarOpcion = useCallback(
    (optionId: string) => {
      const pregunta = questions[posicion];
      if (!pregunta || reveladas.has(pregunta.id)) return;

      const actuales = new Set(respuestas[pregunta.id] ?? []);
      const correctas = pregunta.options.filter((o) => o.correct).length;
      const siguiente = toggleSelection(actuales, optionId, correctas > 1);

      const copia = { ...respuestas };
      if (siguiente.size === 0) {
        delete copia[pregunta.id];
      } else {
        copia[pregunta.id] = [...siguiente];
      }
      update({ answers: copia });

      // Se revela cuando ya eligió tantas opciones como correctas tiene la
      // pregunta. En las de una sola correcta es inmediato; en las de varias
      // espera a que complete, porque revelar con media respuesta le diría que se
      // equivocó cuando todavía estaba eligiendo.
      if (siguiente.size === correctas) {
        setReveladas((previas) => new Set(previas).add(pregunta.id));
        void recordAnswer(pregunta.id, [...siguiente]);
      }
    },
    [questions, posicion, respuestas, reveladas, update, recordAnswer],
  );

  const respondidas = questions.filter((p) => reveladas.has(p.id));
  const aciertos = respondidas.filter((p) =>
    isAnswerCorrect(respuestas[p.id] ?? [], p),
  ).length;

  const celdas: Celda[] = useMemo(
    () =>
      questions.map((pregunta, index) => {
        const elegidas = respuestas[pregunta.id] ?? [];
        const estado = reveladas.has(pregunta.id)
          ? isAnswerCorrect(elegidas, pregunta)
            ? "correct"
            : "incorrect"
          : elegidas.length > 0
            ? "answered"
            : "unanswered";
        return { index, estado, marcada: flags.flagged.has(pregunta.id) };
      }),
    [questions, respuestas, reveladas, flags.flagged],
  );

  if (isLoading || cargandoUsuario) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (terminado) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {tExams("studyFinishedTitle")}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {tExams("studyFinishedScore", { correct: aciertos, total: respondidas.length })}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={`/exams/${examSlug}/review`} className={buttonClasses()}>
            {tExams("goToReview")}
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              setReveladas(new Set());
              setTerminado(false);
              irA(0);
            }}
          >
            {tExams("studyRestart")}
          </Button>
          <Link href={`/exams/${examSlug}`} className={buttonClasses("ghost")}>
            {tExams("backToExam")}
          </Link>
        </div>
      </div>
    );
  }

  const pregunta = questions[posicion];
  const revelada = pregunta ? reveladas.has(pregunta.id) : false;
  const acerto = pregunta && revelada && isAnswerCorrect(respuestas[pregunta.id] ?? [], pregunta);

  return (
    <div className="flex flex-col gap-5">
      {!isPersisted && (
        <p className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {t("saveFailedNotice")}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {tExams("studyProgress", {
            answered: respondidas.length,
            total: questions.length,
            correct: aciertos,
          })}
        </p>
        {revelada && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              acerto
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            }`}
          >
            {acerto ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {acerto ? tExams("studyCorrect") : tExams("studyIncorrect")}
          </span>
        )}
      </div>

      <ExamQuestionGrid celdas={celdas} actual={posicion} onJump={irA} />

      {pregunta && (
        <ExamQuestionCard
          question={pregunta}
          number={posicion + 1}
          total={questions.length}
          selected={respuestas[pregunta.id] ?? []}
          revealed={revelada}
          flagged={flags.flagged.has(pregunta.id)}
          flagPending={flags.pending.has(pregunta.id)}
          onToggleOption={alternarOpcion}
          onToggleFlag={() => void flags.toggle(pregunta.id)}
        />
      )}

      {!revelada && (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{tExams("studyRevealHint")}</p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <Button variant="outline" disabled={posicion === 0} onClick={() => irA(posicion - 1)}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("previous")}
          </Button>
          <Button
            variant="outline"
            disabled={posicion >= questions.length - 1}
            onClick={() => irA(posicion + 1)}
          >
            {t("next")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <Button onClick={() => setTerminado(true)}>{tExams("studyFinish")}</Button>
      </div>
    </div>
  );
}
