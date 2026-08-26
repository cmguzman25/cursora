"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { COURSE_CATEGORIES, type CourseCategory } from "@/lib/course-categories";
import { COURSES } from "@/lib/courses";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useCoursesProgress } from "@/hooks/useCoursesProgress";
import { Skeleton } from "@/components/ui/Skeleton";
import { CourseCard, CourseCardSkeleton } from "./CourseCard";

type FilterValue = "all" | "inProgress" | CourseCategory;

interface CoursesCatalogProps {
  /** Lessons per course slug, from the manifests — the denominator of each card's percentage. */
  lessonTotals: Record<string, number>;
}

export function CoursesCatalog({ lessonTotals }: CoursesCatalogProps) {
  const t = useTranslations("courses");
  const [filter, setFilter] = useState<FilterValue>("all");
  const { user, isLoading: isUserLoading } = useCurrentUser();
  const { summaries, isLoading: isProgressLoading } = useCoursesProgress(user?.id ?? null);

  // The user's progress decides the order of the cards *and* whether the "my
  // courses" chip exists. Rendering before it lands would show one order and
  // then reshuffle, so the catalog waits behind skeletons instead.
  const isPending = isUserLoading || isProgressLoading;

  // Position in the "last touched" ranking: 0 is the most recent course. The
  // API already returns them ordered, so the index is the rank.
  const rankBySlug = useMemo(
    () => new Map(summaries.map((summary, index) => [summary.courseSlug, index])),
    [summaries],
  );

  // "My courses" is enrollment, not activity: opening a course to look at it
  // must not add it to the list.
  const enrolledSlugs = useMemo(
    () => new Set(summaries.filter((summary) => summary.isEnrolled).map((s) => s.courseSlug)),
    [summaries],
  );

  // Only courses the user has actually touched get an entry, so a card with no
  // progress shows nothing rather than a 0% bar. Lessons dropped from a
  // manifest can leave stale completions behind, hence the clamp.
  const progressBySlug = useMemo(() => {
    const entries = summaries.flatMap((summary) => {
      const total = lessonTotals[summary.courseSlug] ?? 0;
      if (!total) return [];
      const completed = Math.min(summary.completedCount, total);
      return [[summary.courseSlug, { completed, total }] as const];
    });
    return new Map(entries);
  }, [summaries, lessonTotals]);

  // Signing out takes the "in progress" chip away; fall back to "all" instead
  // of leaving the catalog stuck on an empty selection.
  const effectiveFilter = filter === "inProgress" && enrolledSlugs.size === 0 ? "all" : filter;

  const filteredCourses = useMemo(() => {
    const matches = COURSES.filter((course) => {
      if (effectiveFilter === "all") return true;
      if (effectiveFilter === "inProgress") {
        return course.slug ? enrolledSlugs.has(course.slug) : false;
      }
      return course.category === effectiveFilter;
    });

    // Courses you are taking come first, most recently viewed at the top; the
    // rest keep the catalog's own order behind them.
    return matches
      .map((course, index) => ({ course, index }))
      .sort((a, b) => {
        const rankA = a.course.slug ? (rankBySlug.get(a.course.slug) ?? Infinity) : Infinity;
        const rankB = b.course.slug ? (rankBySlug.get(b.course.slug) ?? Infinity) : Infinity;
        return rankA === rankB ? a.index - b.index : rankA - rankB;
      })
      .map(({ course }) => course);
  }, [effectiveFilter, enrolledSlugs, rankBySlug]);

  // Only offer filters for categories that actually have a course, so the
  // chips can't lead to an empty catalog.
  const availableCategories = useMemo(
    () => COURSE_CATEGORIES.filter((category) => COURSES.some((course) => course.category === category.key)),
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("heading")}>
        <FilterChip active={effectiveFilter === "all"} onClick={() => setFilter("all")}>
          {t("filters.all")}
        </FilterChip>
        {/* Only offered once there is something to show, so the chip can't
            lead to an empty catalog — same rule as the category chips. */}
        {isPending && <Skeleton className="h-8 w-28 rounded-full" />}
        {!isPending && enrolledSlugs.size > 0 && (
          <FilterChip active={effectiveFilter === "inProgress"} onClick={() => setFilter("inProgress")}>
            {t("filters.inProgress")}
          </FilterChip>
        )}
        {availableCategories.map((category) => (
          <FilterChip
            key={category.key}
            active={effectiveFilter === category.key}
            onClick={() => setFilter(category.key)}
          >
            {t(`categories.${category.key}`)}
          </FilterChip>
        ))}
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {COURSES.map((course) => (
            <CourseCardSkeleton key={course.id} />
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={course.slug ? progressBySlug.get(course.slug) : undefined}
            />
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
