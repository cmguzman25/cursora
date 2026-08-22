import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isCommentKind } from "@/lib/comments/kinds";
import { COMMENT_SELECT, isAdmin, mapComment } from "@/lib/comments/queries";

/**
 * Cross-user listing for the admin triage panel.
 *
 * RLS would already return only the admin's own rows to a non-admin, so this
 * cannot leak — but it answers 403 rather than an empty list, so a normal user
 * poking at the endpoint gets an honest response instead of a confusing one.
 */
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }
  if (!(await isAdmin(supabase, user.id))) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const searchParams = new URL(request.url).searchParams;
  const kind = searchParams.get("kind");
  const resolved = searchParams.get("resolved");
  const courseSlug = searchParams.get("courseSlug");

  let query = supabase.from("lesson_comments").select(COMMENT_SELECT);

  if (kind && isCommentKind(kind)) {
    query = query.eq("kind", kind);
  }
  if (resolved === "true") {
    query = query.not("resolved_at", "is", null);
  } else if (resolved === "false") {
    query = query.is("resolved_at", null);
  }
  if (courseSlug) {
    query = query.eq("course_slug", courseSlug);
  }

  const { data } = await query.order("created_at", { ascending: false }).limit(200);

  return NextResponse.json({
    comments: ((data ?? []) as unknown as Record<string, unknown>[]).map(mapComment),
  });
}
