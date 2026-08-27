import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

interface RouteParams {
  courseSlug: string;
  lessonId: string;
}

interface BookmarkBody {
  locale: string;
  quote: string;
  prefix: string;
  suffix: string;
  textPosition: number;
}

/** Mirrors the column constraints in `0004_lesson_bookmarks.sql`. */
function parseBody(value: unknown): BookmarkBody | null {
  if (typeof value !== "object" || value === null) return null;
  const body = value as Record<string, unknown>;

  const locale = typeof body.locale === "string" ? body.locale : null;
  const quote = typeof body.quote === "string" ? body.quote.trim() : null;
  const prefix = typeof body.prefix === "string" ? body.prefix : "";
  const suffix = typeof body.suffix === "string" ? body.suffix : "";
  const textPosition = Number.isInteger(body.textPosition) ? (body.textPosition as number) : 0;

  if (!locale || !quote || quote.length > 2000 || textPosition < 0) return null;
  return { locale, quote, prefix, suffix, textPosition };
}

/**
 * The reader's own mark in this lesson: at most one, keyed by the primary key
 * of `lesson_bookmarks`. Returns `{ bookmark: null }` rather than a 404 when
 * there isn't one — "nothing marked yet" is the normal case, not an error.
 */
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
    .from("lesson_bookmarks")
    .select("locale, quote, prefix, suffix, text_position, updated_at")
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (!data) return NextResponse.json({ bookmark: null });

  return NextResponse.json({
    bookmark: {
      locale: data.locale as string,
      quote: data.quote as string,
      prefix: (data.prefix as string) ?? "",
      suffix: (data.suffix as string) ?? "",
      textPosition: (data.text_position as number) ?? 0,
      updatedAt: data.updated_at as string,
    },
  });
}

/** Sets the mark, or moves it — the same upsert either way. */
export async function PUT(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { courseSlug, lessonId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const body = parseBody(await request.json().catch(() => null));
  if (!body) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("lesson_bookmarks")
    .upsert(
      {
        user_id: user.id,
        course_slug: courseSlug,
        lesson_id: lessonId,
        locale: body.locale,
        quote: body.quote,
        prefix: body.prefix,
        suffix: body.suffix,
        text_position: body.textPosition,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,course_slug,lesson_id" },
    )
    .select("locale, quote, prefix, suffix, text_position, updated_at")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }

  return NextResponse.json({
    bookmark: {
      locale: data.locale as string,
      quote: data.quote as string,
      prefix: (data.prefix as string) ?? "",
      suffix: (data.suffix as string) ?? "",
      textPosition: (data.text_position as number) ?? 0,
      updatedAt: data.updated_at as string,
    },
  });
}

export async function DELETE(_request: Request, { params }: { params: Promise<RouteParams> }) {
  const { courseSlug, lessonId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const { error } = await supabase
    .from("lesson_bookmarks")
    .delete()
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .eq("lesson_id", lessonId);

  if (error) {
    return NextResponse.json({ error: "delete_failed" }, { status: 500 });
  }

  return NextResponse.json({ bookmark: null });
}
