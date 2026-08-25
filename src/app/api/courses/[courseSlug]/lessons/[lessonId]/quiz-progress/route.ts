import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface RouteParams {
  courseSlug: string;
  lessonId: string;
}

const EMPTY_PROGRESS = { currentIndex: 0, results: {} as Record<string, boolean> };

function isResultsMap(value: unknown): value is Record<string, boolean> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  return Object.values(value).every((entry) => typeof entry === "boolean");
}

export async function GET(_request: Request, { params }: { params: Promise<RouteParams> }) {
  const { courseSlug, lessonId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const { data } = await supabase
    .from("quiz_progress")
    .select("current_index, results")
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (!data) {
    return NextResponse.json(EMPTY_PROGRESS);
  }

  return NextResponse.json({
    currentIndex: data.current_index as number,
    results: (data.results as Record<string, boolean>) ?? {},
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { courseSlug, lessonId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const currentIndex = Number.isInteger(body?.currentIndex) ? body.currentIndex : null;
  const results = isResultsMap(body?.results) ? body.results : null;

  if (currentIndex === null || results === null) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("quiz_progress")
    .upsert(
      {
        user_id: user.id,
        course_slug: courseSlug,
        lesson_id: lessonId,
        current_index: currentIndex,
        results,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,course_slug,lesson_id" },
    )
    .select("current_index, results")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }

  return NextResponse.json({
    currentIndex: data.current_index as number,
    results: (data.results as Record<string, boolean>) ?? {},
  });
}
