"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, Check, Lightbulb, RotateCcw, Target, X } from "lucide-react";
import type { ExamQuizQuestion } from "@content/courses/types";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useQuizProgress } from "@/hooks/useQuizProgress";

interface ExamQuizProps {
  courseSlug: string;
  lessonId: string;
  questions: ExamQuizQuestion[];
}

/** How long the quick "correct / incorrect" flash stays up before auto-advancing. */
const QUICK_FEEDBACK_MS = 900;

function optionStateClasses(opts: {
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

export function ExamQuiz({ courseSlug, lessonId, questions }: ExamQuizProps) {
  const t = useTranslations("lesson.quiz");
  const { user, isLoading: isUserLoading } = useCurrentUser();
  const userId = user?.id ?? null;
  const { progress, isLoading: isProgressLoading, save } = useQuizProgress(
    userId,
    courseSlug,
    lessonId,
  );

  /**
   * The questions this run walks through, as indices into `questions`. A first
   * pass is every question in order; a "redo the ones I missed" pass is just
   * those. Everything else — selections, results, the saved position — stays
   * keyed by question index, so it means the same thing in either kind of run.
   */
  const fullRun = useMemo(() => questions.map((_, position) => position), [questions]);
  const [run, setRun] = useState<number[]>(fullRun);
  const [position, setPosition] = useState(0);
  const [selectionsByIndex, setSelectionsByIndex] = useState<Map<number, Set<string>>>(new Map());
  const [resultsByIndex, setResultsByIndex] = useState<Map<number, boolean>>(new Map());
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [finished, setFinished] = useState(false);
  /** true/false while the quick-advance flash is showing; null the rest of the time. */
  const [quickFeedback, setQuickFeedback] = useState<boolean | null>(null);
  const quickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (quickTimeoutRef.current) clearTimeout(quickTimeoutRef.current);
    };
  }, []);

  // Once the saved position loads, jump straight to it — a derived
  // adjustment from freshly-arrived async data, not a subscription, so it
  // runs during render rather than in an effect. See:
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const resumeKey = !isProgressLoading && userId ? `${userId}:${courseSlug}:${lessonId}` : null;
  const resumedKeyRef = useRef<string | null>(null);
  if (resumeKey !== resumedKeyRef.current) {
    resumedKeyRef.current = resumeKey;
    if (resumeKey !== null) {
      const savedIndex = Math.min(Math.max(progress.currentIndex, 0), questions.length);
      const savedResults = new Map<number, boolean>(
        Object.entries(progress.results).map(([key, value]) => [Number(key), value]),
      );
      setResultsByIndex(savedResults);
      // What's saved is a question index, which only pins down a position in
      // the full run — a redo pass isn't stored, so resuming one after a
      // reload continues through the rest of the questions instead.
      setRun(fullRun);
      if (savedIndex >= questions.length) {
        setFinished(true);
      } else {
        setPosition(savedIndex);
      }
    }
  }

  const correctCount = [...resultsByIndex.values()].filter(Boolean).length;
  const answeredCount = resultsByIndex.size;
  const isStillLoading = isUserLoading || (Boolean(userId) && isProgressLoading);

  // Bounded by the current bank: a saved result can outlive the question it
  // scored if the bank later loses one.
  const wrongIndices = [...resultsByIndex.entries()]
    .filter(([questionIndex, correct]) => !correct && questionIndex < questions.length)
    .map(([questionIndex]) => questionIndex)
    .sort((a, b) => a - b);

  /**
   * Starts a fresh pass over `nextRun`. Selections and reveals are dropped so
   * the questions come up blank; `nextResults` decides what carries over —
   * nothing when starting from scratch, the previous scores when redoing the
   * misses, since those questions are about to overwrite their own entries and
   * the rest of the score should survive.
   */
  function startRun(nextRun: number[], nextResults: Map<number, boolean>) {
    if (nextRun.length === 0) return;
    setRun(nextRun);
    setPosition(0);
    setSelectionsByIndex(new Map());
    setRevealedIndices(new Set());
    setResultsByIndex(nextResults);
    setFinished(false);
    save({ currentIndex: nextRun[0], results: Object.fromEntries(nextResults) });
  }

  if (isStillLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
        <div className="flex flex-col gap-3 pt-2">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-10 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
          {t("finishedTitle")}
        </h2>
        <p className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
          {t("finishedScore", { correct: correctCount, total: answeredCount })}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {wrongIndices.length > 0 ? t("backToLesson") : t("perfectScore")}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-3">
          {/* Redoing the misses is the offer that earns its place first: it is
              the shorter run and the one that moves the score. */}
          {wrongIndices.length > 0 && (
            <Button onClick={() => startRun(wrongIndices, resultsByIndex)}>
              <Target className="h-4 w-4" aria-hidden="true" />
              {t("retryWrong", { count: wrongIndices.length })}
            </Button>
          )}
          <Button
            variant={wrongIndices.length > 0 ? "outline" : "primary"}
            onClick={() => startRun(fullRun, new Map())}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t("restartAll")}
          </Button>
        </div>
      </div>
    );
  }

  // `position` walks the run; `index` is the question it currently points at.
  const index = run[Math.min(position, run.length - 1)] ?? 0;
  const question = questions[Math.min(index, questions.length - 1)];
  const isLast = position === run.length - 1;
  const correctIds = new Set(question.options.filter((option) => option.correct).map((option) => option.id));
  const selected = selectionsByIndex.get(index) ?? new Set<string>();
  const isRevealed = revealedIndices.has(index);
  const isSelectionCorrect =
    selected.size === correctIds.size && [...selected].every((id) => correctIds.has(id));
  const isBusy = quickFeedback !== null;
  const requiredCount = question.options.filter((option) => option.correct).length;

  function toggleOption(optionId: string) {
    if (isRevealed || isBusy) return;
    setSelectionsByIndex((current) => {
      const next = new Map(current);
      const nextSet = new Set(next.get(index) ?? []);
      if (question.multiple) {
        if (nextSet.has(optionId)) nextSet.delete(optionId);
        else nextSet.add(optionId);
      } else {
        nextSet.clear();
        nextSet.add(optionId);
      }
      next.set(index, nextSet);
      return next;
    });
  }

  function recordResult(correct: boolean) {
    const next = new Map(resultsByIndex);
    next.set(index, correct);
    setResultsByIndex(next);
    return next;
  }

  function persist(nextIndex: number, results: Map<number, boolean>) {
    save({ currentIndex: nextIndex, results: Object.fromEntries(results) });
  }

  function goTo(nextPosition: number, results: Map<number, boolean>) {
    if (nextPosition >= run.length) {
      setFinished(true);
      // Saved as "past the last question", which is what marks the quiz
      // finished on the next visit, whichever run got them here.
      persist(questions.length, results);
      return;
    }
    setPosition(nextPosition);
    persist(run[nextPosition], results);
  }

  function handlePrevious() {
    if (position === 0 || isBusy) return;
    goTo(position - 1, resultsByIndex);
  }

  function handleReveal() {
    if (selected.size === 0 || isBusy) return;
    const nextResults = recordResult(isSelectionCorrect);
    setRevealedIndices((current) => new Set(current).add(index));
    persist(index, nextResults);
  }

  function handleAdvanceAfterReveal() {
    goTo(position + 1, resultsByIndex);
  }

  function handleQuickAdvance() {
    if (selected.size === 0 || isBusy) return;
    const correct = isSelectionCorrect;
    const nextResults = recordResult(correct);
    setQuickFeedback(correct);
    quickTimeoutRef.current = setTimeout(() => {
      setQuickFeedback(null);
      goTo(position + 1, nextResults);
    }, QUICK_FEEDBACK_MS);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-zinc-400 uppercase">
          {t("questionProgress", { current: position + 1, total: run.length })}
          {/* A shorter run than the whole quiz can only be a redo of the
              misses — say so, or the counter looks like the quiz shrank. */}
          {run.length < questions.length && (
            <span className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              {t("retryRunBadge")}
            </span>
          )}
        </p>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">{question.prompt}</h2>
        {!isRevealed && quickFeedback === null && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {question.multiple ? t("selectMultiple", { count: requiredCount }) : t("selectOne")}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3" role="group" aria-label={question.prompt}>
        {question.options.map((option) => {
          const isSelected = selected.has(option.id);
          return (
            <div key={option.id} className="flex flex-col">
              <button
                type="button"
                onClick={() => toggleOption(option.id)}
                disabled={isRevealed || isBusy}
                aria-pressed={isSelected}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors disabled:cursor-default ${optionStateClasses(
                  { revealed: isRevealed, selected: isSelected, correct: option.correct },
                )}`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                    isRevealed && option.correct
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : isRevealed && isSelected
                        ? "border-red-500 bg-red-500 text-white"
                        : isSelected
                          ? "border-indigo-500 bg-indigo-500 text-white"
                          : "border-zinc-300 text-zinc-500 dark:border-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {isRevealed && option.correct ? (
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : isRevealed && isSelected ? (
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    option.id
                  )}
                </span>
                <span className="text-zinc-800 dark:text-zinc-200">{option.text}</span>
              </button>
              {isRevealed && (
                <p className="mt-1.5 px-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {option.explanation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {(isRevealed || quickFeedback !== null) && (
        <div
          role="status"
          className={`rounded-xl px-4 py-3 text-sm font-semibold ${
            (isRevealed ? isSelectionCorrect : quickFeedback)
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
              : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
          }`}
        >
          {(isRevealed ? isSelectionCorrect : quickFeedback) ? t("correct") : t("incorrect")}
        </div>
      )}

      {isRevealed && question.tips.length > 0 && (
        <div className="flex flex-col gap-2 rounded-xl border border-amber-300 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
          <p className="flex items-center gap-2 text-sm font-semibold text-amber-800 dark:text-amber-300">
            <Lightbulb className="h-4 w-4" aria-hidden="true" />
            {t("tipsTitle")}
          </p>
          <ul className="list-disc space-y-1 pl-5 text-sm text-amber-800 dark:text-amber-300">
            {question.tips.map((tip, tipIndex) => (
              <li key={tipIndex}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex items-center justify-between gap-3">
        {index > 0 ? (
          <Button variant="ghost" onClick={handlePrevious} disabled={isBusy}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("previous")}
          </Button>
        ) : (
          <span />
        )}

        <div className="flex gap-3">
          {isRevealed ? (
            <Button onClick={handleAdvanceAfterReveal}>{isLast ? t("finish") : t("nextQuestion")}</Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleQuickAdvance} disabled={selected.size === 0 || isBusy}>
                {isLast ? t("finish") : t("nextQuestion")}
              </Button>
              <Button onClick={handleReveal} disabled={selected.size === 0 || isBusy}>
                {t("reviewAnswer")}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
