"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, ArrowLeft, ArrowRight, Info } from "lucide-react";
import type { PracticeExamBank } from "@content/courses/types";
import type { AppLocale } from "@/i18n/routing";
import { defaultLocale } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useExamAttempt } from "@/hooks/useExamAttempt";
import { useExamCountdown } from "@/hooks/useExamCountdown";
import { isAnswerCorrect, passingRawCount } from "@/lib/exams/grading";
import {
  FlagButton,
  OptionButton,
  TipsPanel,
  toggleSelection,
} from "@/components/lessons/question-options";
import { ExamGate } from "@/components/lessons/exam/ExamGate";
import { ExamTimer } from "@/components/lessons/exam/ExamTimer";
import { ExamQuestionGrid, type Celda } from "@/components/lessons/exam/ExamQuestionGrid";
import { ExamSubmitDialog } from "@/components/lessons/exam/ExamSubmitDialog";
import { ExamResults } from "@/components/lessons/exam/ExamResults";

interface PracticeExamProps {
  courseSlug: string;
  lessonId: string;
  bank: PracticeExamBank;
  locale: AppLocale;
}

type Filtro = "all" | "unanswered" | "flagged" | "wrong";

/**
 * Simulacro cronometrado con nota: el componente de las lecciones
 * `kind: "exam"`.
 *
 * Es un componente aparte de `ExamQuiz` y no un modo suyo, porque los dos
 * discrepan en casi todo lo que hacen: `ExamQuiz` revela la respuesta en el
 * momento y obliga a contestar para avanzar; acá no se revela nada hasta
 * entregar, se puede dejar en blanco, se navega libremente y hay un reloj que
 * entrega solo. Un motor común sería una pila de condicionales.
 */
export function PracticeExam({ courseSlug, lessonId, bank, locale }: PracticeExamProps) {
  // Dos namespaces: `lesson.exam` para lo que habla del simulacro oficial de AWS
  // (la pantalla previa, la nota escalada, los dominios), y `exam` para los textos
  // de interfaz que comparte con los exámenes de `/exams`.
  const t = useTranslations("lesson.exam");
  const tExam = useTranslations("exam");

  const preguntas = bank.questions[locale] ?? bank.questions[defaultLocale];
  // El banco todavía puede estar solo en español. El aviso se decide por el
  // idioma que se está mostrando, no por el de la página.
  const idiomaMostrado = bank.questions[locale] ? locale : defaultLocale;

  const { user, isLoading: cargandoUsuario } = useCurrentUser();
  const { attempt, isLoading, isPersisted, skewMs, start, update, submit, isSubmitting, error } =
    useExamAttempt({
      base: `/api/courses/${courseSlug}/lessons/${lessonId}/exam-attempt`,
      durationMinutes: bank.durationMinutes,
    });

  /** Si el alumno ya apretó "Empezar" en esta visita. */
  const [empezado, setEmpezado] = useState(false);
  const [confirmando, setConfirmando] = useState(false);
  const [revisando, setRevisando] = useState(false);
  const [filtro, setFiltro] = useState<Filtro>("all");

  const entregado = Boolean(attempt?.submittedAt);
  const resultado = attempt?.result ?? null;

  /**
   * En qué pantalla estamos. Es derivado y no estado propio: un intento que
   * llega del servidor ya entregado abre directo en el resultado, y uno abierto
   * espera el clic del gate para que el reloj no corra sin que el alumno sepa
   * que empezó.
   */
  const fase: "gate" | "taking" | "results" = entregado
    ? "results"
    : empezado && attempt
      ? "taking"
      : "gate";

  const { remainingMs, isExpired } = useExamCountdown(
    fase === "taking" && attempt ? attempt.expiresAt : null,
    skewMs,
  );

  const respuestas = useMemo(() => attempt?.answers ?? {}, [attempt?.answers]);
  const marcadas = useMemo(() => new Set(attempt?.flagged ?? []), [attempt?.flagged]);
  const posicion = Math.min(attempt?.cursor ?? 0, Math.max(0, preguntas.length - 1));

  // Autoentrega al llegar a cero. `isSubmitting` y el propio `entregado` evitan
  // la segunda entrega mientras la primera está en vuelo; el servidor además es
  // idempotente, así que una carrera no produciría dos notas.
  useEffect(() => {
    if (fase !== "taking" || !isExpired || isSubmitting) return;
    void submit({ autoSubmitted: true });
  }, [fase, isExpired, isSubmitting, submit]);

  const alEmpezar = useCallback(async () => {
    await start();
    setEmpezado(true);
    setRevisando(false);
  }, [start]);

  const irA = useCallback(
    (index: number) => {
      update({ cursor: Math.min(Math.max(0, index), preguntas.length - 1) });
    },
    [update, preguntas.length],
  );

  const alternarOpcion = useCallback(
    (optionId: string) => {
      const pregunta = preguntas[posicion];
      if (!pregunta) return;

      const actuales = new Set(respuestas[pregunta.id] ?? []);
      const siguiente = toggleSelection(actuales, optionId, pregunta.multiple === true);

      const copia = { ...respuestas };
      if (siguiente.size === 0) {
        delete copia[pregunta.id];
      } else {
        copia[pregunta.id] = [...siguiente];
      }
      update({ answers: copia });
    },
    [preguntas, posicion, respuestas, update],
  );

  const alternarMarca = useCallback(() => {
    const pregunta = preguntas[posicion];
    if (!pregunta) return;

    const siguiente = new Set(marcadas);
    if (siguiente.has(pregunta.id)) {
      siguiente.delete(pregunta.id);
    } else {
      siguiente.add(pregunta.id);
    }
    update({ flagged: [...siguiente] });
  }, [preguntas, posicion, marcadas, update]);

  const respondidas = Object.keys(respuestas).length;
  const sinResponder = preguntas.length - respondidas;

  const celdas: Celda[] = useMemo(() => {
    const todas: Celda[] = preguntas.map((pregunta, index) => {
      const elegidas = respuestas[pregunta.id] ?? [];
      const estado = entregado
        ? isAnswerCorrect(elegidas, pregunta)
          ? "correct"
          : "incorrect"
        : elegidas.length > 0
          ? "answered"
          : "unanswered";
      return { index, estado, marcada: marcadas.has(pregunta.id) };
    });

    if (filtro === "unanswered") return todas.filter((c) => c.estado === "unanswered");
    if (filtro === "flagged") return todas.filter((c) => c.marcada);
    if (filtro === "wrong") return todas.filter((c) => c.estado === "incorrect");
    return todas;
  }, [preguntas, respuestas, marcadas, entregado, filtro]);

  if (isLoading || cargandoUsuario) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const avisoIdioma = idiomaMostrado !== locale && (
    <p className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
      <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      {t("questionsOnlyInSpanish")}
    </p>
  );

  // --- antes de empezar ---------------------------------------------------
  if (fase === "gate") {
    const abierto = attempt && !attempt.submittedAt ? attempt.expiresAt : null;
    return (
      <div className="flex flex-col gap-4">
        {avisoIdioma}
        <ExamGate
          totalQuestions={preguntas.length}
          durationMinutes={bank.durationMinutes}
          passingScore={bank.passingScore}
          scaledMax={bank.scaledMax}
          passingCorrect={passingRawCount(bank, preguntas.length)}
          openAttemptExpiresAt={abierto}
          skewMs={skewMs}
          isPersisted={isPersisted}
          isSignedIn={Boolean(user)}
          isStarting={false}
          error={error}
          onStart={alEmpezar}
        />
      </div>
    );
  }

  // --- resultado y revisión ----------------------------------------------
  if (fase === "results" && resultado) {
    if (!revisando) {
      return (
        <div className="flex flex-col gap-4">
          {avisoIdioma}
          <ExamResults
            bank={bank}
            result={resultado}
            autoSubmitted={attempt?.autoSubmitted ?? false}
            locale={locale}
            onStartReview={() => {
              setRevisando(true);
              setFiltro("all");
            }}
            onRetake={alEmpezar}
            canRetake={isPersisted}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{tExam("reviewIntro")}</p>
          <Button variant="outline" onClick={() => setRevisando(false)}>
            {tExam("exitReview")}
          </Button>
        </div>

        <FiltroDeGrilla filtro={filtro} onChange={setFiltro} revisando />
        <ExamQuestionGrid celdas={celdas} actual={posicion} onJump={irA} />

        <PreguntaDelExamen
          pregunta={preguntas[posicion]}
          numero={posicion + 1}
          total={preguntas.length}
          elegidas={respuestas[preguntas[posicion]?.id ?? ""] ?? []}
          revelada
          marcada={marcadas.has(preguntas[posicion]?.id ?? "")}
          onToggleOption={() => {}}
          onToggleFlag={undefined}
        />

        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => irA(posicion - 1)} disabled={posicion === 0}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {tExam("previous")}
          </Button>
          <Button
            variant="outline"
            onClick={() => irA(posicion + 1)}
            disabled={posicion >= preguntas.length - 1}
          >
            {tExam("next")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    );
  }

  // --- rindiendo ----------------------------------------------------------
  return (
    <div className="flex flex-col gap-6">
      {avisoIdioma}

      {!isPersisted && (
        <p className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {t("gateNotSaved")}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-zinc-900 dark:text-white">
            {tExam("questionProgress", { current: posicion + 1, total: preguntas.length })}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {tExam("answeredCount", { count: respondidas })} ·{" "}
            {tExam("unansweredCount", { count: sinResponder })} ·{" "}
            {tExam("flaggedCount", { count: marcadas.size })}
          </span>
        </div>
        <ExamTimer remainingMs={remainingMs} />
      </div>

      <FiltroDeGrilla filtro={filtro} onChange={setFiltro} revisando={false} />
      <ExamQuestionGrid celdas={celdas} actual={posicion} onJump={irA} />

      <PreguntaDelExamen
        pregunta={preguntas[posicion]}
        numero={posicion + 1}
        total={preguntas.length}
        elegidas={respuestas[preguntas[posicion]?.id ?? ""] ?? []}
        revelada={false}
        marcada={marcadas.has(preguntas[posicion]?.id ?? "")}
        onToggleOption={alternarOpcion}
        onToggleFlag={alternarMarca}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => irA(posicion - 1)} disabled={posicion === 0}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {tExam("previous")}
        </Button>

        <div className="flex gap-3">
          {/*
            Nunca se deshabilita por falta de respuesta: el examen real permite
            dejar preguntas en blanco y volver, y forzar una respuesta para
            avanzar entrenaría justo el hábito contrario al que enseña la
            lección de estrategias.
          */}
          <Button
            variant="outline"
            onClick={() => irA(posicion + 1)}
            disabled={posicion >= preguntas.length - 1}
          >
            {tExam("next")}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button onClick={() => setConfirmando(true)}>{tExam("finishAttempt")}</Button>
        </div>
      </div>

      {confirmando && (
        <ExamSubmitDialog
          total={preguntas.length}
          unanswered={sinResponder}
          flagged={marcadas.size}
          isSubmitting={isSubmitting}
          unansweredNotice={t("confirmUnanswered", { count: sinResponder })}
          onConfirm={() => {
            void submit().then(() => setConfirmando(false));
          }}
          onCancel={() => setConfirmando(false)}
        />
      )}
    </div>
  );
}

function FiltroDeGrilla({
  filtro,
  onChange,
  revisando,
}: {
  filtro: Filtro;
  onChange: (filtro: Filtro) => void;
  revisando: boolean;
}) {
  const tExam = useTranslations("exam");

  const opciones: { valor: Filtro; etiqueta: string }[] = [
    { valor: "all", etiqueta: tExam("filterAll") },
    revisando
      ? { valor: "wrong", etiqueta: tExam("filterWrong") }
      : { valor: "unanswered", etiqueta: tExam("filterUnanswered") },
    { valor: "flagged", etiqueta: tExam("filterFlagged") },
  ];

  return (
    <div className="flex flex-wrap gap-1.5">
      {opciones.map(({ valor, etiqueta }) => (
        <button
          key={valor}
          type="button"
          onClick={() => onChange(valor)}
          aria-pressed={filtro === valor}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
            filtro === valor
              ? "bg-indigo-600 text-white"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          }`}
        >
          {etiqueta}
        </button>
      ))}
    </div>
  );
}

function PreguntaDelExamen({
  pregunta,
  numero,
  total,
  elegidas,
  revelada,
  marcada,
  onToggleOption,
  onToggleFlag,
}: {
  pregunta: PracticeExamBank["questions"]["es"][number] | undefined;
  numero: number;
  total: number;
  elegidas: readonly string[];
  revelada: boolean;
  marcada: boolean;
  onToggleOption: (optionId: string) => void;
  onToggleFlag?: () => void;
}) {
  const tExam = useTranslations("exam");
  const tQuiz = useTranslations("lesson.quiz");

  if (!pregunta) return null;

  const seleccionadas = new Set(elegidas);
  const correctas = pregunta.options.filter((o) => o.correct).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {tExam("questionProgress", { current: numero, total })}
          </span>
          {onToggleFlag && (
            <FlagButton
              flagged={marcada}
              onToggle={onToggleFlag}
              labels={{ flag: tExam("flagThis"), unflag: tExam("unflagThis") }}
            />
          )}
        </div>

        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{pregunta.prompt}</h2>

        {!revelada && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {pregunta.multiple ? tQuiz("selectMultiple", { count: correctas }) : tQuiz("selectOne")}
          </p>
        )}
        {revelada && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {elegidas.length > 0 ? `${tExam("reviewYourAnswer")}: ${elegidas.join(", ")}` : tExam("reviewNoAnswer")}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3" role="group" aria-label={pregunta.prompt}>
        {pregunta.options.map((option) => (
          <OptionButton
            key={option.id}
            option={option}
            selected={seleccionadas.has(option.id)}
            revealed={revelada}
            onToggle={onToggleOption}
          />
        ))}
      </div>

      {revelada && <TipsPanel tips={pregunta.tips} title={tQuiz("tipsTitle")} />}
    </div>
  );
}
