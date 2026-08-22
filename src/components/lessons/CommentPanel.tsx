"use client";

import { useTranslations } from "next-intl";
import { Highlighter, Loader2, MessageSquarePlus } from "lucide-react";
import type { CommentKind } from "@/lib/comments/kinds";
import type { LessonComment } from "@/lib/comments/types";
import { CommentCard } from "@/components/lessons/CommentCard";

interface CommentPanelProps {
  comments: LessonComment[];
  isLoading: boolean;
  error: string | null;
  currentUserId: string;
  isAdmin: boolean;
  orphanIds: Set<string>;
  activeId: string | null;
  highlightsSupported: boolean;
  onFocus: (commentId: string) => void;
  onUpdate: (commentId: string, body: string, kind: CommentKind) => Promise<boolean>;
  onDelete: (commentId: string) => Promise<boolean>;
  onToggleResolved: (commentId: string, resolved: boolean) => Promise<boolean>;
  onReply: (commentId: string, body: string) => Promise<boolean>;
  onDeleteReply: (commentId: string, replyId: string) => Promise<boolean>;
}

export function CommentPanel({
  comments,
  isLoading,
  error,
  currentUserId,
  isAdmin,
  orphanIds,
  activeId,
  highlightsSupported,
  onFocus,
  onUpdate,
  onDelete,
  onToggleResolved,
  onReply,
  onDeleteReply,
}: CommentPanelProps) {
  const t = useTranslations("comments");

  return (
    <aside className="lg:sticky lg:top-24" aria-label={t("panelTitle")}>
      <header className="mb-3 flex items-center gap-2">
        <Highlighter className="h-4 w-4 text-zinc-400" aria-hidden="true" />
        <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">{t("panelTitle")}</h2>
        {comments.length > 0 && (
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {comments.length}
          </span>
        )}
      </header>

      {!highlightsSupported && comments.length > 0 && (
        <p className="mb-3 rounded-lg bg-zinc-100 px-3 py-2 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
          {t("highlightsUnsupported")}
        </p>
      )}

      {error && (
        <p className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
          {t("saveError")}
        </p>
      )}

      {isLoading ? (
        <p className="flex items-center gap-2 text-xs text-zinc-400">
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          {t("loading")}
        </p>
      ) : comments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-4 text-center dark:border-zinc-700">
          <MessageSquarePlus className="mx-auto mb-2 h-5 w-5 text-zinc-300" aria-hidden="true" />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{t("empty")}</p>
          <p className="mt-1 text-xs text-zinc-400">{t("selectHint")}</p>
        </div>
      ) : (
        <ul className="flex max-h-[calc(100vh-9rem)] flex-col gap-3 overflow-y-auto pr-1">
          {comments.map((comment) => (
            <li key={comment.id}>
              <CommentCard
                comment={comment}
                currentUserId={currentUserId}
                isAdmin={isAdmin}
                isOrphan={orphanIds.has(comment.id)}
                isActive={activeId === comment.id}
                onFocus={() => onFocus(comment.id)}
                onUpdate={(body, kind) => onUpdate(comment.id, body, kind)}
                onDelete={() => onDelete(comment.id)}
                onToggleResolved={(resolved) => onToggleResolved(comment.id, resolved)}
                onReply={(body) => onReply(comment.id, body)}
                onDeleteReply={(replyId) => onDeleteReply(comment.id, replyId)}
              />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
