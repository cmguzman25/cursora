import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface CourseActivity {
  currentLessonId: string | null;
  lastActivityAt: string;
  completedCount: number;
  isEnrolled: boolean;
}

/**
 * Every course this user has started, most recently touched first.
 *
 * The sibling route under `[courseSlug]/progress` answers "how far am I in
 * *this* course"; the catalog needs the cross-course view instead, so it can
 * sort by recency and filter down to the courses that are actually yours.
 *
 * Activity comes from two sources, because either one on its own can miss a
 * course: `course_progress.updated_at` is written when a lesson page opens,
 * and `lesson_completions.completed_at` when a lesson is ticked off. Activity
 * drives the ordering; membership ("my courses") is the separate, deliberate
 * `course_enrollments` row, so peeking at a course never joins it.
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const [{ data: progressRows }, { data: completions }, { data: enrollments }] = await Promise.all([
    supabase
      .from("course_progress")
      .select("course_slug, current_lesson_id, updated_at")
      .eq("user_id", user.id),
    supabase.from("lesson_completions").select("course_slug, completed_at").eq("user_id", user.id),
    supabase.from("course_enrollments").select("course_slug, enrolled_at").eq("user_id", user.id),
  ]);

  const byCourse = new Map<string, CourseActivity>();

  for (const row of progressRows ?? []) {
    byCourse.set(row.course_slug as string, {
      currentLessonId: (row.current_lesson_id as string | null) ?? null,
      lastActivityAt: row.updated_at as string,
      completedCount: 0,
      isEnrolled: false,
    });
  }

  for (const row of completions ?? []) {
    const courseSlug = row.course_slug as string;
    const completedAt = row.completed_at as string;
    const entry = byCourse.get(courseSlug);

    if (!entry) {
      byCourse.set(courseSlug, {
        currentLessonId: null,
        lastActivityAt: completedAt,
        completedCount: 1,
        isEnrolled: false,
      });
      continue;
    }

    entry.completedCount += 1;
    if (Date.parse(completedAt) > Date.parse(entry.lastActivityAt)) {
      entry.lastActivityAt = completedAt;
    }
  }

  // A course can be enrolled with no activity yet — it still belongs in the
  // list, dated by when it was joined.
  for (const row of enrollments ?? []) {
    const courseSlug = row.course_slug as string;
    const entry = byCourse.get(courseSlug);

    if (entry) {
      entry.isEnrolled = true;
      continue;
    }

    byCourse.set(courseSlug, {
      currentLessonId: null,
      lastActivityAt: row.enrolled_at as string,
      completedCount: 0,
      isEnrolled: true,
    });
  }

  const courses = [...byCourse.entries()]
    .map(([courseSlug, activity]) => ({ courseSlug, ...activity }))
    .sort((a, b) => Date.parse(b.lastActivityAt) - Date.parse(a.lastActivityAt));

  return NextResponse.json({ courses });
}
