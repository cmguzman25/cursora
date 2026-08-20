"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Check, PartyPopper } from "lucide-react";
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
  const { isCompleted, toggleCompleted, setCurrentLesson } = useCourseProgress(
    user?.id ?? null,
    courseSlug,
  );

  useEffect(() => {
    setCurrentLesson(lessonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  const completed = isCompleted(lessonId);

  return (
    <div className="flex flex-col gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
      <button
        type="button"
        onClick={() => toggleCompleted(lessonId)}
        aria-pressed={completed}
        className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-colors ${
          completed
            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
            : "border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        }`}
      >
        <Check className="h-4 w-4" aria-hidden="true" />
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
