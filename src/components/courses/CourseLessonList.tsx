"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Circle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCourseProgress } from "@/hooks/useCourseProgress";
import { localize, type LessonMeta } from "@content/courses/types";
import { Skeleton } from "@/components/ui/Skeleton";
import { CourseEnrollmentButton } from "./CourseEnrollmentButton";
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
      modules.push({ moduleId: lesson.moduleId, moduleLabel: localize(lesson.module, locale), lessons: [lesson] });
    }
  }
  return modules;
}

export function CourseLessonList({ courseSlug, lessons }: CourseLessonListProps) {
  const t = useTranslations("courseDetail");
  const locale = useLocale() as AppLocale;
  const { user, isLoading: isUserLoading } = useCurrentUser();
  const {
    completedLessons,
    currentLessonId,
    isCompleted,
    isLoading: isProgressLoading,
  } = useCourseProgress(user?.id ?? null, courseSlug);

  // Progress arrives from the server after the page paints. Until it does,
  // every part that depends on it holds its space with a skeleton, so the
  // counter, the ticks and the buttons don't shove the page around on arrival.
  const isPending = isUserLoading || isProgressLoading;

  const startLessonId = currentLessonId ?? lessons[0]?.id;
  const hasProgress = completedLessons.length > 0 || Boolean(currentLessonId);
  const progressPct = lessons.length
    ? Math.round((completedLessons.length / lessons.length) * 100)
    : 0;

  const modules = useMemo(() => groupByModule(lessons, locale), [lessons, locale]);

  /** The module holding the lesson you'd land on if you pressed "continue". */
  const activeModuleId = useMemo(() => {
    const target = currentLessonId ?? lessons[0]?.id;
    const holder = modules.find((group) => group.lessons.some((lesson) => lesson.id === target));
    return holder?.moduleId ?? modules[0]?.moduleId;
  }, [modules, currentLessonId, lessons]);

  // Open the first module to begin with: for someone who hasn't started, that
  // *is* the active one, so the common case never visibly rearranges when
  // progress lands a moment later.
  const [openModules, setOpenModules] = useState<Set<string>>(
    () => new Set(modules[0] ? [modules[0].moduleId] : []),
  );

  // Once progress arrives, fold everything except where the reader actually
  // is. Adjusted during render rather than in an effect, since it is derived
  // from freshly-arrived async data — the pattern used in `ExamQuiz` too. See:
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [appliedDefault, setAppliedDefault] = useState<string | null>(null);
  if (!isPending && activeModuleId && appliedDefault !== activeModuleId) {
    setAppliedDefault(activeModuleId);
    setOpenModules(new Set([activeModuleId]));
  }

  const allOpen = openModules.size === modules.length;

  function toggleModule(moduleId: string) {
    setOpenModules((current) => {
      const next = new Set(current);
      if (!next.delete(moduleId)) next.add(moduleId);
      return next;
    });
  }

  function toggleAll() {
    setOpenModules(allOpen ? new Set() : new Set(modules.map((group) => group.moduleId)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex-1">
          {isPending ? (
            <Skeleton className="h-5 w-48" />
          ) : (
            <p className="flex max-w-xs items-baseline justify-between gap-3 text-sm font-medium text-zinc-900 dark:text-white">
              <span>
                {t("completedCount", { completed: completedLessons.length, total: lessons.length })}
              </span>
              <span className="text-indigo-600 dark:text-indigo-400">
                {t("percentComplete", { percent: progressPct })}
              </span>
            </p>
          )}
          <div
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t("progressLabel")}
            className="mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CourseEnrollmentButton
            courseSlug={courseSlug}
            userKey={user?.id ?? null}
            isUserLoading={isUserLoading}
          />
          {isPending ? (
            <Skeleton className="h-11 w-40 rounded-xl" />
          ) : (
            startLessonId && (
              <Link
                href={`/courses/${courseSlug}/${startLessonId}`}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-indigo-600/25 transition-all hover:from-indigo-500 hover:to-violet-500"
              >
                {hasProgress ? t("continueCourse") : t("startCourse")}
              </Link>
            )
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={toggleAll}
          className="rounded-lg px-2 py-1 text-xs font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          {allOpen ? t("collapseAll") : t("expandAll")}
        </button>
      </div>

      {modules.map(({ moduleId, moduleLabel, lessons: moduleLessons }) => {
        const isOpen = openModules.has(moduleId);
        const doneCount = moduleLessons.filter((lesson) => isCompleted(lesson.id)).length;
        const panelId = `module-panel-${moduleId}`;

        return (
        <div key={moduleId} className="flex flex-col gap-2">
          <h2>
            <button
              type="button"
              onClick={() => toggleModule(moduleId)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="flex w-full items-center gap-2 rounded-lg px-1 py-1 text-left text-sm font-semibold text-zinc-500 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              <ChevronDown
                aria-hidden="true"
                className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "" : "-rotate-90"}`}
              />
              <span className="min-w-0 flex-1">{moduleLabel}</span>
              {/* Kept outside the panel: the count is the one thing worth
                  knowing about a module you've folded away. */}
              {isPending ? (
                <Skeleton className="h-3.5 w-10" />
              ) : (
                <span className="shrink-0 text-xs font-medium text-zinc-400 tabular-nums dark:text-zinc-500">
                  {doneCount}/{moduleLessons.length}
                </span>
              )}
            </button>
          </h2>
          <ul
            id={panelId}
            hidden={!isOpen}
            className="flex flex-col divide-y divide-zinc-200 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900"
          >
            {moduleLessons.map((lesson) => (
              <li key={lesson.id}>
                <Link
                  href={`/courses/${courseSlug}/${lesson.id}`}
                  className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  {isPending ? (
                    <Skeleton className="h-4 w-4 shrink-0 rounded-full" />
                  ) : isCompleted(lesson.id) ? (
                    <Check
                      className="h-4 w-4 shrink-0 text-emerald-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <Circle
                      className="h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-600"
                      aria-hidden="true"
                    />
                  )}
                  <span className="text-zinc-700 dark:text-zinc-200">{localize(lesson.title, locale)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        );
      })}
    </div>
  );
}
