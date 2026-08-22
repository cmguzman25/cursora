import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isCommentKind, isResolvable } from "@/lib/comments/kinds";
import { isAdmin, loadLessonComments } from "@/lib/comments/queries";

interface RouteParams {
  params: Promise<{ commentId: string }>;
}

/**
 * Mutations answer with the whole refreshed lesson thread, matching
 * `/api/courses/[courseSlug]/progress` — the client replaces its state
 * wholesale instead of patching it.
 */
async function respondWithThread(
  supabase: Awaited<ReturnType<typeof createClient>>,
  scope: { course_slug: string; lesson_id: string; locale: string },
) {
  return NextResponse.json({
    comments: await loadLessonComments(supabase, scope.course_slug, scope.lesson_id, scope.locale),
  });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { commentId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  // RLS already hides comments the caller may not touch, so a miss here is
  // indistinguishable from "does not exist" — which is the intent.
  const { data: existing } = await supabase
    .from("lesson_comments")
    .select("id, user_id, kind, course_slug, lesson_id, locale")
    .eq("id", commentId)
    .maybeSingle();

  if (!existing) {
    return NextResponse.json({ error: "comment_not_found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const action = body?.action;

  if (action === "update") {
    if (existing.user_id !== user.id) {
      return NextResponse.json({ error: "only_author_can_edit" }, { status: 403 });
    }

    const text = typeof body?.body === "string" ? body.body.trim() : "";
    if (!text || text.length > 4000) {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    const kind = body?.kind;
    if (kind !== undefined && !isCommentKind(kind)) {
      return NextResponse.json({ error: "invalid_kind" }, { status: 400 });
    }

    const { error } = await supabase
      .from("lesson_comments")
      .update({ body: text, ...(kind ? { kind } : {}) })
      .eq("id", commentId);

    if (error) {
      return NextResponse.json({ error: "update_failed" }, { status: 400 });
    }
  } else if (action === "resolve" || action === "unresolve") {
    // Belt and braces: the DB trigger rejects this too, but a clean 403 beats
    // surfacing a Postgres exception to the UI.
    if (!(await isAdmin(supabase, user.id))) {
      return NextResponse.json({ error: "only_admin_can_resolve" }, { status: 403 });
    }
    if (!isResolvable(existing.kind)) {
      return NextResponse.json({ error: "kind_not_resolvable" }, { status: 400 });
    }

    const resolving = action === "resolve";
    const { error } = await supabase
      .from("lesson_comments")
      .update({
        resolved_at: resolving ? new Date().toISOString() : null,
        resolved_by: resolving ? user.id : null,
      })
      .eq("id", commentId);

    if (error) {
      return NextResponse.json({ error: "update_failed" }, { status: 400 });
    }
  } else {
    return NextResponse.json({ error: "invalid_action" }, { status: 400 });
  }

  return respondWithThread(supabase, existing);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { commentId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const { data: existing } = await supabase
    .from("lesson_comments")
    .select("id, user_id, course_slug, lesson_id, locale")
    .eq("id", commentId)
    .maybeSingle();

  if (!existing) {
    return NextResponse.json({ error: "comment_not_found" }, { status: 404 });
  }
  if (existing.user_id !== user.id) {
    return NextResponse.json({ error: "only_author_can_delete" }, { status: 403 });
  }

  await supabase.from("lesson_comments").delete().eq("id", commentId);

  return respondWithThread(supabase, existing);
}
