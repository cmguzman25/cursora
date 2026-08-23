"use client";

import { useEffect, useState } from "react";

export interface CourseProgressSummary {
  courseSlug: string;
  currentLessonId: string | null;
  /** ISO timestamp of the last activity in this course (view or completion). */
  lastActivityAt: string;
  completedCount: number;
  /** Did the user deliberately join this course? Drives the "my courses" filter. */
  isEnrolled: boolean;
}

const EMPTY: CourseProgressSummary[] = [];

/**
 * Which courses this user has started, most recently viewed first — the data
 * the catalog needs to sort and to offer its "in progress" filter. Pass `null`
 * while the user is still loading, or when nobody is signed in.
 */
export function useCoursesProgress(userKey: string | null) {
  const [loadedKey, setLoadedKey] = useState<string | null>(userKey);
  const [summaries, setSummaries] = useState<CourseProgressSummary[]>(EMPTY);
  const [isLoading, setIsLoading] = useState(Boolean(userKey));

  // Reset while rendering when the user changes, rather than in an effect that
  // would first paint another user's progress. See:
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (userKey !== loadedKey) {
    setLoadedKey(userKey);
    setSummaries(EMPTY);
    setIsLoading(Boolean(userKey));
  }

  useEffect(() => {
    if (!userKey) return;

    let cancelled = false;

    fetch("/api/courses/progress")
      .then((response) => (response.ok ? response.json() : { courses: EMPTY }))
      .then((data: { courses?: CourseProgressSummary[] }) => {
        if (!cancelled) setSummaries(data.courses ?? EMPTY);
      })
      .catch(() => {
        if (!cancelled) setSummaries(EMPTY);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userKey]);

  return { summaries, isLoading };
}
