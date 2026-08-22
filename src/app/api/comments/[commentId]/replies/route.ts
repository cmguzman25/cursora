import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { loadLessonComments } from "@/lib/comments/queries";

interface RouteParams {
  params: Promise<{ commentId: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  const { commentId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  // Reading the parent both scopes the response and proves the caller can see
  // the thread — the RLS insert policy enforces the same rule server-side.
  const { data: parent } = await supabase
    .from("lesson_comments")
    .select("id, course_slug, lesson_id, locale")
    .eq("id", commentId)
    .maybeSingle();

  if (!parent) {
    return NextResponse.json({ error: "comment_not_found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const text = typeof body?.body === "string" ? body.body.trim() : "";

  if (!text || text.length > 4000) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { error } = await supabase
    .from("comment_replies")
    .insert({ comment_id: commentId, user_id: user.id, body: text });

  if (error) {
    return NextResponse.json({ error: "insert_failed" }, { status: 400 });
  }

  return NextResponse.json({
    comments: await loadLessonComments(supabase, parent.course_slug, parent.lesson_id, parent.locale),
  });
}
