"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import type { ExamQuestionWithTopic, ExamTopic } from "@content/exams/types";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useExamRun } from "@/hooks/useExamRun";
import { useExamCountdown } from "@/hooks/useExamCountdown";
import { useExamReviewFlags } from "@/hooks/useExamReviewFlags";
import { isAnswerCorrect } from "@/lib/exams/grading";
import { toggleSelection } from "@/components/lessons/question-options";
import { ExamTimer } from "@/components/lessons/exam/ExamTimer";
import { ExamQuestionGrid, type Celda } from "@/components/lessons/exam/ExamQuestionGrid";
import { ExamSubmitDialog } from "@/components/lessons/exam/ExamSubmitDialog";
import { ExamQuestionCard } from "@/components/exams/ExamQuestionCard";
import { ExamScoreCard } from "@/components/exams/ExamScoreCard";

interface TimedExamRunProps {
  examSlug: string;
  questions: readonly ExamQuestionWithTopic[];
  topics: readonly ExamTopic[];
  passingPercent: number;
  /**
   * Los minutos que pidió la pantalla previa, en `?minutes=`, o null si se llegó
   * sin pedir nada.
   *
   * Es lo que distingue "vengo a rendir uno nuevo" de "vengo a ver en qué quedé":
   * con minutos se abre una rendida; sin minutos solo se retoma la abierta o se
   * muestra el resultado de la última. Sin esa distinción, volver a entrar después
   * de entregar abriría un examen nuevo sin que nadie lo pidiera.
   */
  requestedMinutes: number | null;
  locale: AppLocale;
}

type Filtro = "all" | "unanswered" | "flagged" | "wrong";

/**
 * El modo examen: cronometrado, sin revelar nada hasta entregar.
 *
 * Es un componente aparte de `StudyRun` y no un modo suyo, por la misma razón que
 * `PracticeExam` y `ExamQuiz` están separados en los cursos: los dos discrepan en
 * casi todo. Acá hay un reloj que entrega solo, se puede dejar en blanco, se
 * navega libremente y no se revela nada; allá no hay reloj, se revela al marcar y
 * cada respuesta se registra en el momento. Un motor común sería una pila de
 * condicionales.
 */
export function TimedExamRun({
  examSlug,
  questions,
  topics,
  passingPercent,
  requestedMinutes,
  locale,
}: TimedExamRunProps) {
  const t = useTranslations("exam");
  const tExams = useTranslations("exams");
  const router = useRouter();

  const { user, isLoading: cargandoUsuario } = useCurrentUser();
  const { attempt, isLoading, isPersisted, skewMs, start, update, submit, isSubmitting, error } =
    useExamRun({ examSlug, mode: "exam", durationMinutes: requestedMinutes });

  const flags = useExamReviewFlags({ userKey: user?.id ?? null, examSlug });

  const [confirmando, setConfirmando] = useState(false);
  const [revisando, setRevisando] = useState(false);
  const [filtro, setFiltro] = useState<Filtro>("all");
  /**
   * Que ya se pidió abrir una rendida en esta visita, para no pedir dos.
   *
   * Es una ref y no estado porque nada la dibuja: solo cierra el efecto de abajo.
   * Con estado habría que llamar a `setState` dentro del efecto, que es lo que
   * provoca el render en cascada que la regla `react-hooks/set-state-in-effect`
   * existe para evitar.
   */
  const pedidaRef = useRef(false);

  const abierta = Boolean(attempt && !attempt.submittedAt);
  const entregado = Boolean(attempt?.submittedAt);
  const resultado = attempt?.result ?? null;

  /**
   * En qué pantalla estamos. Derivado y no estado propio.
   *
   * El orden de las ramas es la regla: una rendida abierta manda sobre todo lo
   * demás —se retoma, y los minutos pedidos se ignoran, que es lo que evita abrir
   * un segundo reloj—; si no hay abierta y se vino a rendir, se espera a que el
   * servidor abra la nueva; y solo si no se vino a rendir se muestra el resultado
   * de la última.
   */
  const fase: "loading" | "taking" | "results" = abierta
    ? "taking"
    : requestedMinutes !== null
      ? "loading"
      : entregado
        ? "results"
        : "loading";

  // Abre la rendida cuando se vino a rendir y no hay ninguna abierta. El 409 lo
  // resuelve el hook adoptando la que exista, así que dos pestañas no producen
  // dos relojes.
  useEffect(() => {
    if (isLoading || pedidaRef.current || abierta || requestedMinutes === null) return;
    pedidaRef.current = true;
    void start();
  }, [isLoading, abierta, requestedMinutes, start]);

  // Una vez abierta, se saca `?minutes` de la URL. Sin esto, recargar la pantalla
  // de resultados volvería a disparar el efecto de arriba y abriría un examen
  // nuevo que nadie pidió.
  useEffect(() => {
    if (!abierta || requestedMinutes === null) return;
    router.replace(`/exams/${examSlug}/exam`);
  }, [abierta, requestedMinutes, router, examSlug]);

  const { remainingMs, isExpired } = useExamCountdown(
    fase === "taking" && attempt ? attempt.expiresAt : null,
    skewMs,
  );

  const respuestas = useMemo(() => attempt?.answers ?? {}, [attempt?.answers]);
  const posicion = Math.min(attempt?.cursor ?? 0, Math.max(0, questions.length - 1));

  // Autoentrega al llegar a cero. `isSubmitting` y el propio `entregado` evitan la
  // segunda entrega mientras la primera está en vuelo; el servidor además es
  // idempotente, así que una carrera no produciría dos notas.
  useEffect(() => {
    if (fase !== "taking" || !isExpired || isSubmitting) return;
    void submit({ autoSubmitted: true });
  }, [fase, isExpired, isSubmitting, submit]);

  const irA = useCallback(
    (index: number) => {
      update({ cursor: Math.min(Math.max(0, index), questions.length - 1) });
    },
    [update, questions.length],
  );

  const alternarOpcion = useCallback(
    (optionId: string) => {
      const pregunta = questions[posicion];
      if (!pregunta) return;

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
    },
    [questions, posicion, respuestas, update],
  );

  const respondidas = Object.keys(respuestas).length;
  const sinResponder = questions.length - respondidas;

  const celdas: Celda[] = useMemo(() => {
    const todas: Celda[] = questions.map((pregunta, index) => {
      const elegidas = respuestas[pregunta.id] ?? [];
      const estado = entregado
        ? isAnswerCorrect(elegidas, pregunta)
          ? "correct"
          : "incorrect"
        : elegidas.length > 0
          ? "answered"
          : "unanswered";
      return { index, estado, marcada: flags.flagged.has(pregunta.id) };
    });

    if (filtro === "unanswered") return todas.filter((c) => c.estado === "unanswered");
    if (filtro === "flagged") return todas.filter((c) => c.marcada);
    if (filtro === "wrong") return todas.filter((c) => c.estado === "incorrect");
    return todas;
  }, [questions, respuestas, flags.flagged, entregado, filtro]);

  if (fase === "loading" || isLoading || cargandoUsuario) {
    // Un 500 al abrir dejaría esto cargando para siempre, así que el error se
    // muestra con una salida en vez de un esqueleto eterno.
    if (error) {
      return (
        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {tExams("startFailed")}
          </p>
          <Link href={`/exams/${examSlug}`} className={buttonClasses("outline")}>
            {tExams("backToExam")}
          </Link>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  // --- resultados y revisión ----------------------------------------------
  if (fase === "results" && resultado) {
    if (!revisando) {
      return (
        <ExamScoreCard
          examSlug={examSlug}
          result={resultado}
          topics={topics}
          questions={questions}
          passingPercent={passingPercent}
          autoSubmitted={attempt?.autoSubmitted === true}
          locale={locale}
          onStartReview={() => {
            setRevisando(true);
            setFiltro("all");
            irA(0);
          }}
        />
      );
    }

    const pregunta = questions[posicion];

    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("reviewIntro")}</p>
          <Button variant="outline" onClick={() => setRevisando(false)}>
            {t("exitReview")}
          </Button>
        </div>

        <FiltroDeGrilla filtro={filtro} onChange={setFiltro} revisando />
        <ExamQuestionGrid celdas={celdas} actual={posicion} onJump={irA} />

        {pregunta && (
          <ExamQuestionCard
            question={pregunta}
            number={posicion + 1}
            total={questions.length}
            selected={respuestas[pregunta.id] ?? []}
            revealed
            flagged={flags.flagged.has(pregunta.id)}
            flagPending={flags.pending.has(pregunta.id)}
            onToggleOption={() => {}}
            onToggleFlag={() => void flags.toggle(pregunta.id)}
          />
        )}

        <Navegacion
          posicion={posicion}
          total={questions.length}
          onIr={irA}
          etiquetas={{ previous: t("previous"), next: t("next") }}
        />
      </div>
    );
  }

  // --- rindiendo -----------------------------------------------------------
  const pregunta = questions[posicion];

  return (
    <div className="flex flex-col gap-5">
      {!isPersisted && (
        <p className="flex items-start gap-2.5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {t("saveFailedNotice")}
        </p>
      )}
      {error && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {tExams("startFailed")}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <ExamTimer remainingMs={remainingMs} />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {t("answeredCount", { count: respondidas })} ·{" "}
          {t("flaggedCount", { count: flags.flagged.size })}
        </p>
      </div>

      <FiltroDeGrilla filtro={filtro} onChange={setFiltro} revisando={false} />
      <ExamQuestionGrid celdas={celdas} actual={posicion} onJump={irA} />

      {pregunta && (
        <ExamQuestionCard
          question={pregunta}
          number={posicion + 1}
          total={questions.length}
          selected={respuestas[pregunta.id] ?? []}
          revealed={false}
          flagged={flags.flagged.has(pregunta.id)}
          flagPending={flags.pending.has(pregunta.id)}
          onToggleOption={alternarOpcion}
          onToggleFlag={() => void flags.toggle(pregunta.id)}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Navegacion
          posicion={posicion}
          total={questions.length}
          onIr={irA}
          etiquetas={{ previous: t("previous"), next: t("next") }}
        />
        <Button onClick={() => setConfirmando(true)}>{t("finishAttempt")}</Button>
      </div>

      {confirmando && (
        <ExamSubmitDialog
          total={questions.length}
          unanswered={sinResponder}
          flagged={flags.flagged.size}
          isSubmitting={isSubmitting}
          unansweredNotice={tExams("confirmUnanswered", { count: sinResponder })}
          onConfirm={() => {
            void submit().then(() => setConfirmando(false));
          }}
          onCancel={() => setConfirmando(false)}
        />
      )}
    </div>
  );
}

function Navegacion({
  posicion,
  total,
  onIr,
  etiquetas,
}: {
  posicion: number;
  total: number;
  onIr: (index: number) => void;
  etiquetas: { previous: string; next: string };
}) {
  return (
    <div className="flex gap-2">
      <Button variant="outline" disabled={posicion === 0} onClick={() => onIr(posicion - 1)}>
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {etiquetas.previous}
      </Button>
      <Button
        variant="outline"
        disabled={posicion >= total - 1}
        onClick={() => onIr(posicion + 1)}
      >
        {etiquetas.next}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
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
  const t = useTranslations("exam");

  const opciones: { valor: Filtro; etiqueta: string }[] = [
    { valor: "all", etiqueta: t("filterAll") },
    revisando
      ? { valor: "wrong", etiqueta: t("filterWrong") }
      : { valor: "unanswered", etiqueta: t("filterUnanswered") },
    { valor: "flagged", etiqueta: t("filterFlagged") },
  ];

  return (
    <div className="flex flex-wrap gap-1.5">
      {opciones.map(({ valor, etiqueta }) => (
        <button
          key={valor}
          type="button"
          onClick={() => onChange(valor)}
          aria-pressed={filtro === valor}
          className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
            filtro === valor
              ? "bg-indigo-600 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          }`}
        >
          {etiqueta}
        </button>
      ))}
    </div>
  );
}
