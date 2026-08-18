"use client";

import { Clock, Star, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { Course } from "@/lib/courses";
import { COURSE_CATEGORIES } from "@/lib/course-categories";

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
          {course.title[locale]}
        </h3>
        <p className="flex-1 text-sm text-zinc-500 dark:text-zinc-400">
          {course.description[locale]}
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

        <button
          type="button"
          disabled
          title={t("comingSoonCourse")}
          className="mt-1 inline-flex h-9 cursor-not-allowed items-center justify-center rounded-lg border border-zinc-200 text-sm font-medium text-zinc-500 dark:border-zinc-700 dark:text-zinc-500"
        >
          {t("viewCourse")}
        </button>
      </div>
    </div>
  );
}
