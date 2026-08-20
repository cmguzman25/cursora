import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

async function loadProgress(supabase: SupabaseServerClient, userId: string, courseSlug: string) {
  const [{ data: completions }, { data: courseProgress }] = await Promise.all([
    supabase
      .from("lesson_completions")
      .select("lesson_id")
      .eq("user_id", userId)
      .eq("course_slug", courseSlug),
    supabase
      .from("course_progress")
      .select("current_lesson_id")
      .eq("user_id", userId)
      .eq("course_slug", courseSlug)
      .maybeSingle(),
  ]);

  return {
    completedLessons: (completions ?? []).map((row) => row.lesson_id as string),
    currentLessonId: (courseProgress?.current_lesson_id as string | null) ?? null,
  };
}

export async function GET(_request: Request, { params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  return NextResponse.json(await loadProgress(supabase, user.id, courseSlug));
}

export async function PATCH(request: Request, { params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const action = body?.action;
  const lessonId = typeof body?.lessonId === "string" ? body.lessonId : "";

  if (!lessonId) {
    return NextResponse.json({ error: "lesson_id_required" }, { status: 400 });
  }

  if (action === "toggleCompleted") {
    const { data: existing } = await supabase
      .from("lesson_completions")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("course_slug", courseSlug)
      .eq("lesson_id", lessonId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("lesson_completions")
        .delete()
        .eq("user_id", user.id)
        .eq("course_slug", courseSlug)
        .eq("lesson_id", lessonId);
    } else {
      await supabase
        .from("lesson_completions")
        .insert({ user_id: user.id, course_slug: courseSlug, lesson_id: lessonId });
    }
  } else if (action === "setCurrentLesson") {
    await supabase.from("course_progress").upsert(
      {
        user_id: user.id,
        course_slug: courseSlug,
        current_lesson_id: lessonId,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,course_slug" },
    );
  } else {
    return NextResponse.json({ error: "invalid_action" }, { status: 400 });
  }

  return NextResponse.json(await loadProgress(supabase, user.id, courseSlug));
}
