"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TextAnchor } from "@/lib/comments/anchor";
import type { CommentKind } from "@/lib/comments/kinds";
import type { LessonComment } from "@/lib/comments/types";

interface UseLessonCommentsArgs {
  /** Gates *when* we fetch; the server derives the real user from the session. */
  userKey: string | null;
  courseSlug: string;
  lessonId: string;
  /** Locale of the rendered content, which may differ from the URL locale. */
  contentLocale: string;
}

const EMPTY: LessonComment[] = [];

/**
 * Comments for one lesson, persisted through `/api/courses/.../comments`.
 * Mirrors `useCourseProgress`: every mutation answers with the whole refreshed
 * thread and we swap state wholesale, so the UI can never drift from the DB.
 */
export function useLessonComments({
  userKey,
  courseSlug,
  lessonId,
  contentLocale,
}: UseLessonCommentsArgs) {
  const scopeKey = userKey ? `${userKey}:${courseSlug}:${lessonId}:${contentLocale}` : null;
  const loadedKeyRef = useRef<string | null>(null);
  const [comments, setComments] = useState<LessonComment[]>(EMPTY);
  const [isLoading, setIsLoading] = useState(Boolean(scopeKey));
  const [error, setError] = useState<string | null>(null);

  // Derived reset during render rather than in an effect — same reasoning as
  // useCourseProgress: this adjusts state to a changed prop, it isn't a
  // subscription. https://react.dev/learn/you-might-not-need-an-effect
  if (scopeKey !== loadedKeyRef.current) {
    loadedKeyRef.current = scopeKey;
    setComments(EMPTY);
    setIsLoading(Boolean(scopeKey));
    setError(null);
  }

  const listUrl = `/api/courses/${courseSlug}/lessons/${lessonId}/comments`;

  useEffect(() => {
    if (!userKey) return;

    let cancelled = false;

    fetch(`${listUrl}?locale=${encodeURIComponent(contentLocale)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled) setComments(data?.comments ?? EMPTY);
      })
      .catch(() => {
        if (!cancelled) setComments(EMPTY);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userKey, listUrl, contentLocale]);

  const send = useCallback(
    async (url: string, method: string, payload?: unknown) => {
      setError(null);
      try {
        const response = await fetch(url, {
          method,
          ...(payload === undefined
            ? {}
            : { headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }),
        });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
          setError(data?.error ?? "request_failed");
          return false;
        }

        setComments(data?.comments ?? EMPTY);
        return true;
      } catch {
        setError("request_failed");
        return false;
      }
    },
    [],
  );

  const addComment = useCallback(
    (input: { kind: CommentKind; body: string; anchor: TextAnchor }) =>
      send(listUrl, "POST", {
        locale: contentLocale,
        kind: input.kind,
        body: input.body,
        ...input.anchor,
      }),
    [send, listUrl, contentLocale],
  );

  const updateComment = useCallback(
    (commentId: string, input: { body: string; kind?: CommentKind }) =>
      send(`/api/comments/${commentId}`, "PATCH", { action: "update", ...input }),
    [send],
  );

  const deleteComment = useCallback(
    (commentId: string) => send(`/api/comments/${commentId}`, "DELETE"),
    [send],
  );

  const setResolved = useCallback(
    (commentId: string, resolved: boolean) =>
      send(`/api/comments/${commentId}`, "PATCH", {
        action: resolved ? "resolve" : "unresolve",
      }),
    [send],
  );

  const addReply = useCallback(
    (commentId: string, body: string) =>
      send(`/api/comments/${commentId}/replies`, "POST", { body }),
    [send],
  );

  const deleteReply = useCallback(
    (commentId: string, replyId: string) =>
      send(`/api/comments/${commentId}/replies/${replyId}`, "DELETE"),
    [send],
  );

  return {
    comments,
    isLoading,
    error,
    addComment,
    updateComment,
    deleteComment,
    setResolved,
    addReply,
    deleteReply,
  };
}
