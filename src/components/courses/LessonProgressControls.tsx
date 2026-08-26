"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Check, Loader2, PartyPopper } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCourseProgress } from "@/hooks/useCourseProgress";

interface LessonProgressControlsProps {
  courseSlug: string;
  lessonId: string;
  nextLessonId: string | null;
}

export function LessonProgressControls({
  courseSlug,
  lessonId,
  nextLessonId,
}: LessonProgressControlsProps) {
  const t = useTranslations("lesson");
  const { user } = useCurrentUser();
  const userId = user?.id ?? null;
  const { isCompleted, toggleCompleted, setCurrentLesson, pendingLessonId } = useCourseProgress(
    userId,
    courseSlug,
  );

  // Record the visit once the user is known. Depending on `lessonId` alone
  // silently dropped the write on a fresh page load: the effect ran while
  // `useCurrentUser` was still fetching, and a signed-out call is a no-op — so
  // only lessons reached by in-app navigation were ever recorded.
  useEffect(() => {
    if (!userId) return;
    setCurrentLesson(lessonId);
  }, [userId, lessonId, setCurrentLesson]);

  const completed = isCompleted(lessonId);
  const isSaving = pendingLessonId === lessonId;

  return (
    <div className="flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
      <button
        type="button"
        onClick={() => toggleCompleted(lessonId)}
        disabled={isSaving}
        aria-pressed={completed}
        aria-busy={isSaving}
        className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
          completed
            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
            : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        }`}
      >
        {/* The label stays put while it saves — swapping it too would make the
            button change width under the cursor that just pressed it. */}
        {isSaving ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Check className="h-4 w-4" aria-hidden="true" />
        )}
        {completed ? t("markedComplete") : t("markComplete")}
      </button>

      {nextLessonId ? (
        <Link
          href={`/courses/${courseSlug}/${nextLessonId}`}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:from-indigo-500 hover:to-violet-500"
        >
          {t("next")}
          <span aria-hidden="true">→</span>
        </Link>
      ) : (
        <span className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-amber-100 px-4 text-sm font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
          <PartyPopper className="h-4 w-4" aria-hidden="true" />
          {t("courseFinished")}
        </span>
      )}
    </div>
  );
}
