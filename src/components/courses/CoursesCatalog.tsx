"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { COURSE_CATEGORIES, type CourseCategory } from "@/lib/course-categories";
import { COURSES } from "@/lib/courses";
import { CourseCard } from "./CourseCard";

type FilterValue = "all" | CourseCategory;

export function CoursesCatalog() {
  const t = useTranslations("courses");
  const [filter, setFilter] = useState<FilterValue>("all");

  const filteredCourses = useMemo(
    () => (filter === "all" ? COURSES : COURSES.filter((course) => course.category === filter)),
    [filter],
  );

  // Only offer filters for categories that actually have a course, so the
  // chips can't lead to an empty catalog.
  const availableCategories = useMemo(
    () => COURSE_CATEGORIES.filter((category) => COURSES.some((course) => course.category === category.key)),
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("heading")}>
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          {t("filters.all")}
        </FilterChip>
        {availableCategories.map((category) => (
          <FilterChip
            key={category.key}
            active={filter === category.key}
            onClick={() => setFilter(category.key)}
          >
            {t(`categories.${category.key}`)}
          </FilterChip>
        ))}
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          {t("emptyState")}
        </p>
      )}
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
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
      }`}
    >
      {children}
    </button>
  );
}
