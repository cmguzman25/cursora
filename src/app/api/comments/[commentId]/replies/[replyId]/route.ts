import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { loadLessonComments } from "@/lib/comments/queries";

interface RouteParams {
  params: Promise<{ commentId: string; replyId: string }>;
}

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/**
 * Resolves the reply, its parent thread, and whether the caller owns it.
 * Shared by PATCH and DELETE, which only differ in the mutation itself.
 */
async function loadContext(supabase: SupabaseServerClient, commentId: string, replyId: string) {
  const [{ data: reply }, { data: parent }] = await Promise.all([
    supabase
      .from("comment_replies")
      .select("id, user_id")
      .eq("id", replyId)
      .eq("comment_id", commentId)
      .maybeSingle(),
    supabase
      .from("lesson_comments")
      .select("course_slug, lesson_id, locale")
      .eq("id", commentId)
      .maybeSingle(),
  ]);

  return reply && parent ? { reply, parent } : null;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { commentId, replyId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const context = await loadContext(supabase, commentId, replyId);
  if (!context) {
    return NextResponse.json({ error: "reply_not_found" }, { status: 404 });
  }
  if (context.reply.user_id !== user.id) {
    return NextResponse.json({ error: "only_author_can_edit" }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const text = typeof body?.body === "string" ? body.body.trim() : "";

  if (!text || text.length > 4000) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { error } = await supabase.from("comment_replies").update({ body: text }).eq("id", replyId);
  if (error) {
    return NextResponse.json({ error: "update_failed" }, { status: 400 });
  }

  const { course_slug, lesson_id, locale } = context.parent;
  return NextResponse.json({ comments: await loadLessonComments(supabase, course_slug, lesson_id, locale) });
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { commentId, replyId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const context = await loadContext(supabase, commentId, replyId);
  if (!context) {
    return NextResponse.json({ error: "reply_not_found" }, { status: 404 });
  }
  if (context.reply.user_id !== user.id) {
    return NextResponse.json({ error: "only_author_can_delete" }, { status: 403 });
  }

  await supabase.from("comment_replies").delete().eq("id", replyId);

  const { course_slug, lesson_id, locale } = context.parent;
  return NextResponse.json({ comments: await loadLessonComments(supabase, course_slug, lesson_id, locale) });
}
