"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Inbox, Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { COMMENT_KINDS, type CommentKind } from "@/lib/comments/kinds";
import type { LessonComment } from "@/lib/comments/types";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { CommentCard } from "@/components/lessons/CommentCard";

type KindFilter = CommentKind | "all";
type StatusFilter = "all" | "open" | "resolved";

const STATUS_FILTERS: StatusFilter[] = ["all", "open", "resolved"];

/**
 * Triage inbox for every comment in the platform.
 *
 * Reads `/api/admin/comments`, which enforces the role check server-side —
 * this component only shapes the request. Mutations reuse the same per-comment
 * endpoints the lesson panel uses, then refetch so the filters stay honest
 * (resolving a comment can drop it out of the current view).
 */
export function AdminCommentsBoard() {
  const t = useTranslations("admin");
  // Kind labels are shared with the lesson panel; no reason to translate them twice.
  const tKinds = useTranslations("comments");
  const { user } = useCurrentUser();
  const [comments, setComments] = useState<LessonComment[]>([]);
  const [kind, setKind] = useState<KindFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("open");
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const query = new URLSearchParams();
  if (kind !== "all") query.set("kind", kind);
  if (status !== "all") query.set("resolved", String(status === "resolved"));
  const url = `/api/admin/comments${query.size > 0 ? `?${query}` : ""}`;

  // Bumped after a mutation to re-run the fetch below. Resolving a comment can
  // move it out of the active filter, so the list has to come back from the
  // server rather than be patched locally.
  const [reloadToken, setReloadToken] = useState(0);
  const scopeKey = `${url}#${reloadToken}`;
  const [loadedKey, setLoadedKey] = useState(scopeKey);

  // Adjusting state during render rather than in an effect, so the spinner
  // appears on the same commit that changes the filter — and so no setState
  // ends up in an effect body.
  // https://react.dev/learn/you-might-not-need-an-effect
  if (scopeKey !== loadedKey) {
    setLoadedKey(scopeKey);
    setIsLoading(true);
    setHasError(false);
  }

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error("failed"))))
      .then((data) => {
        if (!cancelled) setComments(data?.comments ?? []);
      })
      .catch(() => {
        if (cancelled) return;
        setHasError(true);
        setComments([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url, reloadToken]);

  const send = useCallback(async (path: string, method: string, payload?: unknown) => {
    const response = await fetch(path, {
      method,
      ...(payload === undefined
        ? {}
        : { headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }),
    });
    if (!response.ok) return false;
    setReloadToken((value) => value + 1);
    return true;
  }, []);

  if (!user) {
    return (
      <p className="flex items-center gap-2 text-sm text-zinc-400">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        {t("comments.loading")}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          {t("comments.title")}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("comments.subtitle")}</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <FilterGroup label={t("comments.filterKind")}>
          <FilterChip active={kind === "all"} onClick={() => setKind("all")}>
            {t("comments.all")}
          </FilterChip>
          {COMMENT_KINDS.map((option) => (
            <FilterChip key={option} active={kind === option} onClick={() => setKind(option)}>
              {tKinds(`kinds.${option}`)}
            </FilterChip>
          ))}
        </FilterGroup>

        <FilterGroup label={t("comments.filterStatus")}>
          {STATUS_FILTERS.map((option) => (
            <FilterChip key={option} active={status === option} onClick={() => setStatus(option)}>
              {t(`comments.status.${option}`)}
            </FilterChip>
          ))}
        </FilterGroup>
      </div>

      {hasError && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
          {t("comments.loadError")}
        </p>
      )}

      {isLoading ? (
        <p className="flex items-center gap-2 text-sm text-zinc-400">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          {t("comments.loading")}
        </p>
      ) : comments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
          <Inbox className="mx-auto mb-3 h-6 w-6 text-zinc-300" aria-hidden="true" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("comments.empty")}</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {comments.map((comment) => (
            <li key={comment.id}>
              <CommentCard
                comment={comment}
                currentUserId={user.id}
                isAdmin
                contextLabel={
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
                    <span className="font-medium text-zinc-500 dark:text-zinc-400">
                      {comment.lessonId}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{comment.locale}</span>
                    <Link
                      href={`/courses/${comment.courseSlug}/${comment.lessonId}`}
                      className="ml-auto font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                      {t("comments.viewInLesson")}
                    </Link>
                  </div>
                }
                onUpdate={(body, nextKind) =>
                  send(`/api/comments/${comment.id}`, "PATCH", {
                    action: "update",
                    body,
                    kind: nextKind,
                  })
                }
                onDelete={() => send(`/api/comments/${comment.id}`, "DELETE")}
                onToggleResolved={(resolved) =>
                  send(`/api/comments/${comment.id}`, "PATCH", {
                    action: resolved ? "resolve" : "unresolve",
                  })
                }
                onReply={(body) => send(`/api/comments/${comment.id}/replies`, "POST", { body })}
                onDeleteReply={(replyId) =>
                  send(`/api/comments/${comment.id}/replies/${replyId}`, "DELETE")
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium tracking-wide text-zinc-400 uppercase">{label}</span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-500/60 dark:bg-indigo-500/10 dark:text-indigo-300"
          : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
      }`}
    >
      {children}
    </button>
  );
}
