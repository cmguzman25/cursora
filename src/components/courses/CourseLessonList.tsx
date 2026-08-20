"use client";

import { Check, Circle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import type { LessonMeta } from "@content/courses/aws-cloud-practitioner/manifest";
import type { AppLocale } from "@/i18n/routing";

interface CourseLessonListProps {
  courseSlug: string;
  lessons: LessonMeta[];
}

function groupByModule(lessons: LessonMeta[], locale: AppLocale) {
  const modules: { moduleId: string; moduleLabel: string; lessons: LessonMeta[] }[] = [];
  for (const lesson of lessons) {
    const group = modules.at(-1);
    if (group && group.moduleId === lesson.moduleId) {
      group.lessons.push(lesson);
    } else {
      modules.push({ moduleId: lesson.moduleId, moduleLabel: lesson.module[locale], lessons: [lesson] });
    }
  }
  return modules;
}

export function CourseLessonList({ courseSlug, lessons }: CourseLessonListProps) {
  const t = useTranslations("courseDetail");
  const locale = useLocale() as AppLocale;
  const { user } = useCurrentUser();
  const { completedLessons, currentLessonId, isCompleted } = useCourseProgress(
    user?.id ?? null,
    courseSlug,
  );

  const startLessonId = currentLessonId ?? lessons[0]?.id;
  const hasProgress = completedLessons.length > 0 || Boolean(currentLessonId);
  const progressPct = lessons.length
    ? Math.round((completedLessons.length / lessons.length) * 100)
    : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-900 dark:text-white">
            {t("completedCount", { completed: completedLessons.length, total: lessons.length })}
          </p>
          <div className="mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        {startLessonId && (
          <Link
            href={`/courses/${courseSlug}/${startLessonId}`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-indigo-600/25 transition-all hover:from-indigo-500 hover:to-violet-500"
          >
            {hasProgress ? t("continueCourse") : t("startCourse")}
          </Link>
        )}
      </div>

      {groupByModule(lessons, locale).map(({ moduleId, moduleLabel, lessons: moduleLessons }) => (
        <div key={moduleId} className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{moduleLabel}</h2>
          <ul className="flex flex-col divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
            {moduleLessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/courses/${courseSlug}/${lesson.id}`}
                  className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  {isCompleted(lesson.id) ? (
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden="true" />
                  ) : (
                    <Circle
                      className="h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-600"
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-zinc-700 dark:text-zinc-200">{lesson.title[locale]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
