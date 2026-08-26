"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, CornerDownRight, Loader2, Pencil, RotateCcw, Trash2, TriangleAlert } from "lucide-react";
import { COMMENT_KINDS, COMMENT_KIND_STYLES, isResolvable, type CommentKind } from "@/lib/comments/kinds";
import type { LessonComment } from "@/lib/comments/types";
import { CommentKindBadge } from "@/components/lessons/CommentKindBadge";

interface CommentCardProps {
  comment: LessonComment;
  currentUserId: string;
  isAdmin: boolean;
  /** The quoted text no longer exists in the rendered lesson. */
  isOrphan?: boolean;
  isActive?: boolean;
  onFocus?: () => void;
  onUpdate: (body: string, kind: CommentKind) => Promise<boolean>;
  onDelete: () => Promise<boolean>;
  onToggleResolved: (resolved: boolean) => Promise<boolean>;
  onReply: (body: string) => Promise<boolean>;
  onDeleteReply: (replyId: string) => Promise<boolean>;
  /** Rendered above the card in the admin panel to say which lesson this is. */
  contextLabel?: ReactNode;
}

export function CommentCard({
  comment,
  currentUserId,
  isAdmin,
  isOrphan = false,
  isActive = false,
  onFocus,
  onUpdate,
  onDelete,
  onToggleResolved,
  onReply,
  onDeleteReply,
  contextLabel,
}: CommentCardProps) {
  const t = useTranslations("comments");
  const locale = useLocale();
  const [isEditing, setIsEditing] = useState(false);
  const [draftBody, setDraftBody] = useState(comment.body);
  const [draftKind, setDraftKind] = useState<CommentKind>(comment.kind);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  /** Which action is in flight, so only that control spins. `null` when idle. */
  const [pending, setPending] = useState<string | null>(null);
  const cardRef = useRef<HTMLElement>(null);

  const busy = pending !== null;

  const isOwn = comment.userId === currentUserId;
  const isResolved = comment.resolvedAt !== null;
  const canResolve = isAdmin && isResolvable(comment.kind);
  const style = COMMENT_KIND_STYLES[comment.kind];

  useEffect(() => {
    if (isActive) {
      cardRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [isActive]);

  function formatDate(value: string) {
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(
      new Date(value),
    );
  }

  /**
   * Runs a card action with `busy` held for its duration. Every control that
   * can start one is disabled meanwhile and the one that was pressed shows a
   * spinner, so a slow round-trip never reads as a press that didn't land.
   */
  async function run(key: string, action: () => Promise<boolean>) {
    if (busy) return false;
    setPending(key);
    try {
      return await action();
    } finally {
      setPending(null);
    }
  }

  async function handleSaveEdit() {
    const trimmed = draftBody.trim();
    if (!trimmed) return;
    if (await run("save", () => onUpdate(trimmed, draftKind))) setIsEditing(false);
  }

  async function handleReply() {
    const trimmed = replyBody.trim();
    if (!trimmed) return;
    if (await run("reply", () => onReply(trimmed))) setReplyBody("");
  }

  return (
    <article
      ref={cardRef}
      onClick={onFocus}
      className={`rounded-xl border border-l-4 bg-white p-3 transition-colors dark:bg-zinc-900 ${style.cardAccent} ${
        isActive
          ? "border-indigo-400 ring-2 ring-indigo-500/30 dark:border-indigo-500"
          : "border-zinc-200 dark:border-zinc-800"
      } ${isResolved ? "opacity-70" : ""}`}
    >
      {contextLabel}

      <header className="mb-2 flex flex-wrap items-center gap-2">
        <CommentKindBadge kind={comment.kind} />
        {isResolved && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
            <Check className="h-3 w-3" aria-hidden="true" />
            {t("resolved")}
          </span>
        )}
        <span className="ml-auto text-xs text-zinc-400">{formatDate(comment.createdAt)}</span>
      </header>

      <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {isOwn ? t("you") : comment.authorName}
      </p>

      <blockquote className="mb-2 border-l-2 border-zinc-300 pl-2 text-xs text-zinc-500 italic dark:border-zinc-600 dark:text-zinc-400">
        {comment.anchor.quote}
      </blockquote>

      {isOrphan && (
        <p className="mb-2 flex items-start gap-1.5 rounded-lg bg-amber-50 px-2 py-1.5 text-xs text-amber-800 dark:bg-amber-500/10 dark:text-amber-300">
          <TriangleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {t("orphanedHint")}
        </p>
      )}

      {isEditing ? (
        <div className="flex flex-col gap-2">
          <div className="flex gap-1.5">
            {COMMENT_KINDS.map((option) => {
              const optionStyle = COMMENT_KIND_STYLES[option];
              const selected = option === draftKind;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDraftKind(option)}
                  aria-pressed={selected}
                  className={`flex flex-1 items-center justify-center gap-1 rounded-lg border px-2 py-1 text-xs font-medium transition-colors ${
                    selected
                      ? optionStyle.pickerSelected
                      : "border-zinc-200 text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${optionStyle.dot}`} aria-hidden="true" />
                  {t(`kinds.${option}`)}
                </button>
              );
            })}
          </div>
          <textarea
            value={draftBody}
            onChange={(event) => setDraftBody(event.target.value)}
            rows={3}
            maxLength={4000}
            className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-sm text-zinc-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setDraftBody(comment.body);
                setDraftKind(comment.kind);
              }}
              className="rounded-lg px-2 py-1 text-xs font-semibold text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              {t("cancel")}
            </button>
            <button
              type="button"
              onClick={handleSaveEdit}
              disabled={busy || !draftBody.trim()}
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-2 py-1 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
            >
              {pending === "save" && <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />}
              {t("save")}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm whitespace-pre-wrap text-zinc-700 dark:text-zinc-200">{comment.body}</p>
      )}

      {comment.replies.length > 0 && (
        <ul className="mt-3 flex flex-col gap-2 border-l-2 border-zinc-200 pl-3 dark:border-zinc-700">
          {comment.replies.map((reply) => (
            <li key={reply.id} className="text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                  {reply.userId === currentUserId ? t("you") : reply.authorName}
                </span>
                {reply.authorIsAdmin && (
                  <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                    {t("adminBadge")}
                  </span>
                )}
                <span className="text-xs text-zinc-400">{formatDate(reply.createdAt)}</span>
                {reply.userId === currentUserId && (
                  <button
                    type="button"
                    onClick={() => run(`reply:${reply.id}`, () => onDeleteReply(reply.id))}
                    disabled={busy}
                    aria-label={t("delete")}
                    aria-busy={pending === `reply:${reply.id}`}
                    className="ml-auto text-zinc-400 transition-colors hover:text-rose-600 disabled:opacity-50"
                  >
                    {pending === `reply:${reply.id}` ? (
                      <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                    ) : (
                      <Trash2 className="h-3 w-3" aria-hidden="true" />
                    )}
                  </button>
                )}
              </div>
              <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-200">{reply.body}</p>
            </li>
          ))}
        </ul>
      )}

      {isResolved && comment.resolvedByName && (
        <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-400">
          {t("resolvedBy", { name: comment.resolvedByName })}
        </p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-zinc-100 pt-2 dark:border-zinc-800">
        {isOwn && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <Pencil className="h-3 w-3" aria-hidden="true" />
            {t("edit")}
          </button>
        )}

        {isOwn && (
          <button
            type="button"
            onClick={() => {
              if (confirmingDelete) run("delete", onDelete);
              else setConfirmingDelete(true);
            }}
            onBlur={() => setConfirmingDelete(false)}
            disabled={busy}
            aria-busy={pending === "delete"}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
              confirmingDelete
                ? "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {pending === "delete" ? (
              <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
            ) : (
              <Trash2 className="h-3 w-3" aria-hidden="true" />
            )}
            {confirmingDelete ? t("confirmDelete") : t("delete")}
          </button>
        )}

        {canResolve && (
          <button
            type="button"
            onClick={() => run("resolve", () => onToggleResolved(!isResolved))}
            disabled={busy}
            aria-busy={pending === "resolve"}
            className={`ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold transition-colors disabled:opacity-50 ${
              isResolved
                ? "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300"
            }`}
          >
            {pending === "resolve" ? (
              <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
            ) : isResolved ? (
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Check className="h-3 w-3" aria-hidden="true" />
            )}
            {isResolved ? t("reopen") : t("markResolved")}
          </button>
        )}
      </div>

      <div className="mt-2 flex items-start gap-1.5">
        <CornerDownRight className="mt-2 h-3.5 w-3.5 shrink-0 text-zinc-300" aria-hidden="true" />
        <textarea
          value={replyBody}
          onChange={(event) => setReplyBody(event.target.value)}
          rows={replyBody ? 2 : 1}
          maxLength={4000}
          placeholder={t("replyPlaceholder")}
          className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />
        {replyBody.trim() && (
          <button
            type="button"
            onClick={handleReply}
            disabled={busy}
            aria-busy={pending === "reply"}
            className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-lg bg-indigo-600 px-2 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
          >
            {pending === "reply" && <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />}
            {t("send")}
          </button>
        )}
      </div>
    </article>
  );
}
