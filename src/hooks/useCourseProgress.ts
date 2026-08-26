"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface CourseProgress {
  completedLessons: string[];
  currentLessonId: string | null;
}

const EMPTY_PROGRESS: CourseProgress = { completedLessons: [], currentLessonId: null };

/**
 * Tracks per-user course progress (completed lessons + current lesson),
 * persisted server-side via `/api/courses/[courseSlug]/progress`. The server
 * derives the user from the Supabase session (RLS-scoped) — `userKey` here
 * only gates *when* we fetch, so we don't request before we know someone is
 * logged in. Pass `null` while the user is still loading.
 */
export function useCourseProgress(userKey: string | null, courseSlug: string) {
  const scopeKey = userKey ? `${userKey}:${courseSlug}` : null;
  const loadedKeyRef = useRef<string | null>(null);
  const [progress, setProgress] = useState<CourseProgress>(EMPTY_PROGRESS);
  const [isLoading, setIsLoading] = useState(Boolean(scopeKey));
  /**
   * The lesson whose completion is being written right now, so the control
   * that started it can say so. Ticking a lesson is a round-trip to the
   * server, and without this the button sits there looking unpressed.
   */
  const [pendingLessonId, setPendingLessonId] = useState<string | null>(null);

  // Reset synchronously during render when the scope changes (user logs
  // out, or the course changes) — a derived reset, not a subscription, so
  // it belongs in render rather than an effect. See:
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (scopeKey !== loadedKeyRef.current) {
    loadedKeyRef.current = scopeKey;
    setProgress(EMPTY_PROGRESS);
    setIsLoading(Boolean(scopeKey));
  }

  useEffect(() => {
    if (!userKey) return;

    let cancelled = false;

    fetch(`/api/courses/${courseSlug}/progress`)
      .then((response) => (response.ok ? response.json() : EMPTY_PROGRESS))
      .then((data: CourseProgress) => {
        if (!cancelled) {
          setProgress({
            completedLessons: data.completedLessons ?? [],
            currentLessonId: data.currentLessonId ?? null,
          });
        }
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
  }, [userKey, courseSlug]);

  const mutate = useCallback(
    async (body: { action: "toggleCompleted" | "setCurrentLesson"; lessonId: string }) => {
      if (!userKey) return;

      // Only the tick has a control waiting on it; recording the current
      // lesson happens on its own on page load and shows nothing.
      const isVisible = body.action === "toggleCompleted";
      if (isVisible) setPendingLessonId(body.lessonId);

      try {
        const response = await fetch(`/api/courses/${courseSlug}/progress`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (!response.ok) return;
        const data: CourseProgress = await response.json();
        setProgress({
          completedLessons: data.completedLessons ?? [],
          currentLessonId: data.currentLessonId ?? null,
        });
      } catch {
        // Offline or the request died: leave the progress as it was. The
        // pending flag still clears, so the button becomes usable again.
      } finally {
        if (isVisible) setPendingLessonId(null);
      }
    },
    [userKey, courseSlug],
  );

  const isCompleted = useCallback(
    (lessonId: string) => progress.completedLessons.includes(lessonId),
    [progress],
  );

  const toggleCompleted = useCallback(
    (lessonId: string) => {
      mutate({ action: "toggleCompleted", lessonId });
    },
    [mutate],
  );

  const setCurrentLesson = useCallback(
    (lessonId: string) => {
      if (progress.currentLessonId === lessonId) return;
      mutate({ action: "setCurrentLesson", lessonId });
    },
    [progress.currentLessonId, mutate],
  );

  return {
    completedLessons: progress.completedLessons,
    currentLessonId: progress.currentLessonId,
    isLoading,
    /** The lesson whose tick is in flight, if any. */
    pendingLessonId,
    isCompleted,
    toggleCompleted,
    setCurrentLesson,
  };
}
