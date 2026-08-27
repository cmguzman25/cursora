"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TextAnchor } from "@/lib/comments/anchor";

export interface LessonBookmark extends TextAnchor {
  /** Locale of the markdown the quote was taken from — not always the URL locale. */
  locale: string;
  updatedAt: string;
}

interface UseLessonBookmarkArgs {
  /** `null` while the session is loading, or when nobody is signed in. */
  userKey: string | null;
  courseSlug: string;
  lessonId: string;
}

/**
 * The reader's single mark in this lesson, persisted via
 * `/api/courses/[courseSlug]/lessons/[lessonId]/bookmark`.
 *
 * "One per lesson" is the database's primary key, not a rule enforced here:
 * saving is always an upsert, so moving the mark and setting it for the first
 * time are the same call.
 */
export function useLessonBookmark({ userKey, courseSlug, lessonId }: UseLessonBookmarkArgs) {
  const url = `/api/courses/${courseSlug}/lessons/${lessonId}/bookmark`;
  const scopeKey = userKey ? `${userKey}:${courseSlug}:${lessonId}` : null;
  const loadedKeyRef = useRef<string | null>(null);

  const [bookmark, setBookmark] = useState<LessonBookmark | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(scopeKey));
  const [isSaving, setIsSaving] = useState(false);

  // Derived reset when the scope changes, not a subscription — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (scopeKey !== loadedKeyRef.current) {
    loadedKeyRef.current = scopeKey;
    setBookmark(null);
    setIsLoading(Boolean(scopeKey));
  }

  useEffect(() => {
    if (!userKey) return;

    let cancelled = false;

    fetch(url)
      .then((response) => (response.ok ? response.json() : { bookmark: null }))
      .then((data: { bookmark?: LessonBookmark | null }) => {
        if (!cancelled) setBookmark(data.bookmark ?? null);
      })
      .catch(() => {
        if (!cancelled) setBookmark(null);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url, userKey]);

  const save = useCallback(
    async (anchor: TextAnchor, locale: string) => {
      if (!userKey) return false;
      setIsSaving(true);
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...anchor, locale }),
        });
        if (!response.ok) return false;
        const data: { bookmark?: LessonBookmark | null } = await response.json();
        setBookmark(data.bookmark ?? null);
        return true;
      } catch {
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [url, userKey],
  );

  const remove = useCallback(async () => {
    if (!userKey) return false;
    setIsSaving(true);
    try {
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) return false;
      setBookmark(null);
      return true;
    } catch {
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [url, userKey]);

  return { bookmark, isLoading, isSaving, save, remove };
}
