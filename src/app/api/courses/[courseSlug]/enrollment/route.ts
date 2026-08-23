import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getCourseManifest } from "@content/courses/registry";

interface RouteParams {
  params: Promise<{ courseSlug: string }>;
}

/**
 * Joining and leaving a course. Enrollment is deliberate — nothing here is
 * called implicitly by reading a lesson — and leaving only removes the
 * membership row: `course_progress` and `lesson_completions` are untouched, so
 * re-enrolling resumes exactly where the user left off.
 */
export async function GET(_request: Request, { params }: RouteParams) {
  const { courseSlug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const { data } = await supabase
    .from("course_enrollments")
    .select("course_slug")
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .maybeSingle();

  return NextResponse.json({ enrolled: data !== null });
}

export async function POST(_request: Request, { params }: RouteParams) {
  const { courseSlug } = await params;

  // Enrolling writes a slug that later drives navigation, so only courses the
  // app actually knows about are accepted.
  if (!getCourseManifest(courseSlug)) {
    return NextResponse.json({ error: "unknown_course" }, { status: 404 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const { error } = await supabase
    .from("course_enrollments")
    .upsert({ user_id: user.id, course_slug: courseSlug }, { onConflict: "user_id,course_slug" });

  if (error) {
    return NextResponse.json({ error: "enrollment_failed" }, { status: 500 });
  }

  return NextResponse.json({ enrolled: true });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { courseSlug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const { error } = await supabase
    .from("course_enrollments")
    .delete()
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug);

  if (error) {
    return NextResponse.json({ error: "enrollment_failed" }, { status: 500 });
  }

  return NextResponse.json({ enrolled: false });
}
