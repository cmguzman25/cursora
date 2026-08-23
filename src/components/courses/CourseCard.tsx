"use client";

import { Clock, Star, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Course } from "@/lib/courses";
import { COURSE_CATEGORIES } from "@/lib/course-categories";
import { Skeleton } from "@/components/ui/Skeleton";
import { localize } from "@content/courses/types";

/**
 * Same silhouette as `CourseCard`, shown while the catalog waits for the
 * user's progress — which decides both the order of the cards and whether the
 * "my courses" filter exists. Kept next to the real card so the two stay in
 * step when the card's layout changes.
 */
export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <Skeleton className="h-28 rounded-none" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-11/12" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-1 h-9 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function CourseCard({ course }: { course: Course }) {
  const locale = useLocale();
  const t = useTranslations("courses");
  const category = COURSE_CATEGORIES.find((entry) => entry.key === course.category)!;
  const Icon = category.icon;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div
        className={`flex h-28 items-center justify-center bg-gradient-to-br ${category.gradient}`}
      >
        <Icon className="h-10 w-10 text-white/90" />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {t(`categories.${course.category}`)}
          </span>
          <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {t(`levels.${course.level}`)}
          </span>
        </div>

        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
          {localize(course.title, locale)}
        </h3>
        <p className="flex-1 text-sm text-zinc-500 dark:text-zinc-400">
          {localize(course.description, locale)}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {t("duration", { hours: course.durationHours })}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            {t("students", { count: course.studentsCount })}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
            {course.rating.toFixed(1)}
          </span>
        </div>

        {course.slug ? (
          <Link
            href={`/courses/${course.slug}`}
            className="mt-1 inline-flex h-9 items-center justify-center rounded-lg border border-zinc-200 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            {t("viewCourse")}
          </Link>
        ) : (
          <button
            type="button"
            disabled
            title={t("comingSoonCourse")}
            className="mt-1 inline-flex h-9 cursor-not-allowed items-center justify-center rounded-lg border border-zinc-200 text-sm font-medium text-zinc-500 dark:border-zinc-700 dark:text-zinc-500"
          >
            {t("viewCourse")}
          </button>
        )}
      </div>
    </div>
  );
}
