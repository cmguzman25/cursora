"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface QuizProgress {
  currentIndex: number;
  /** Per-question results, keyed by question index as a string: `{"0": true, "2": false}`. */
  results: Record<string, boolean>;
}

const EMPTY_PROGRESS: QuizProgress = { currentIndex: 0, results: {} };

/**
 * Tracks per-user progress within a single "quiz"-kind lesson (which
 * question they're on, and how they scored on each one answered so far),
 * persisted via `/api/courses/[courseSlug]/lessons/[lessonId]/quiz-progress`.
 * Pass `null` for `userKey` while the user is still loading.
 */
export function useQuizProgress(userKey: string | null, courseSlug: string, lessonId: string) {
  const scopeKey = userKey ? `${userKey}:${courseSlug}:${lessonId}` : null;
  const loadedKeyRef = useRef<string | null>(null);
  const [progress, setProgress] = useState<QuizProgress>(EMPTY_PROGRESS);
  const [isLoading, setIsLoading] = useState(Boolean(scopeKey));

  // Derived reset when the scope changes, not a subscription — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (scopeKey !== loadedKeyRef.current) {
    loadedKeyRef.current = scopeKey;
    setProgress(EMPTY_PROGRESS);
    setIsLoading(Boolean(scopeKey));
  }

  useEffect(() => {
    if (!userKey) return;

    let cancelled = false;

    fetch(`/api/courses/${courseSlug}/lessons/${lessonId}/quiz-progress`)
      .then((response) => (response.ok ? response.json() : EMPTY_PROGRESS))
      .then((data: QuizProgress) => {
        if (!cancelled) setProgress({ currentIndex: data.currentIndex ?? 0, results: data.results ?? {} });
      })
      .catch(() => {
        if (!cancelled) setProgress(EMPTY_PROGRESS);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userKey, courseSlug, lessonId]);

  const save = useCallback(
    (next: QuizProgress) => {
      setProgress(next);
      if (!userKey) return;
      fetch(`/api/courses/${courseSlug}/lessons/${lessonId}/quiz-progress`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      }).catch(() => {});
    },
    [userKey, courseSlug, lessonId],
  );

  return { progress, isLoading, save };
}
