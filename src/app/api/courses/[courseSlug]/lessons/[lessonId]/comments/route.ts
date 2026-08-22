import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isCommentKind } from "@/lib/comments/kinds";
import { loadLessonComments } from "@/lib/comments/queries";
import { routing } from "@/i18n/routing";

interface RouteParams {
  params: Promise<{ courseSlug: string; lessonId: string }>;
}

/**
 * The locale a comment belongs to is the locale of the *content* that was on
 * screen, which is not always the URL locale — a missing translation falls
 * back to the default-locale markdown.
 */
function readLocale(value: unknown) {
  return typeof value === "string" && (routing.locales as readonly string[]).includes(value)
    ? value
    : null;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { courseSlug, lessonId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const locale = readLocale(new URL(request.url).searchParams.get("locale"));
  if (!locale) {
    return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
  }

  return NextResponse.json({
    comments: await loadLessonComments(supabase, courseSlug, lessonId, locale),
  });
}

export async function POST(request: Request, { params }: RouteParams) {
  const { courseSlug, lessonId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const locale = readLocale(body?.locale);
  const kind = body?.kind;
  const text = typeof body?.body === "string" ? body.body.trim() : "";
  const quote = typeof body?.quote === "string" ? body.quote.trim() : "";

  if (!locale) {
    return NextResponse.json({ error: "invalid_locale" }, { status: 400 });
  }
  if (!isCommentKind(kind)) {
    return NextResponse.json({ error: "invalid_kind" }, { status: 400 });
  }
  if (!text || text.length > 4000) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (!quote || quote.length > 2000) {
    return NextResponse.json({ error: "invalid_quote" }, { status: 400 });
  }

  const { error } = await supabase.from("lesson_comments").insert({
    user_id: user.id,
    course_slug: courseSlug,
    lesson_id: lessonId,
    locale,
    kind,
    body: text,
    quote,
    prefix: typeof body?.prefix === "string" ? body.prefix : "",
    suffix: typeof body?.suffix === "string" ? body.suffix : "",
    text_position: Number.isFinite(body?.textPosition) ? Math.trunc(body.textPosition) : 0,
  });

  if (error) {
    return NextResponse.json({ error: "insert_failed" }, { status: 400 });
  }

  return NextResponse.json({
    comments: await loadLessonComments(supabase, courseSlug, lessonId, locale),
  });
}
