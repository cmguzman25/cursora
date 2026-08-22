import type { createClient } from "@/lib/supabase/server";
import type { CommentKind } from "@/lib/comments/kinds";
import type { CommentReply, LessonComment } from "@/lib/comments/types";

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>;

/**
 * `lesson_comments` has two foreign keys into `profiles` (author and
 * resolver), so PostgREST needs the constraint name to disambiguate the
 * embeds. Names are Postgres defaults from the migration.
 */
export const COMMENT_SELECT = `
  id, user_id, course_slug, lesson_id, locale, kind, body,
  quote, prefix, suffix, text_position,
  resolved_at, created_at, updated_at,
  author:profiles!lesson_comments_user_id_fkey(name),
  resolver:profiles!lesson_comments_resolved_by_fkey(name),
  replies:comment_replies(
    id, user_id, body, created_at, updated_at,
    author:profiles!comment_replies_user_id_fkey(name, role)
  )
`;

/**
 * Embeds come back as an object for a many-to-one, but PostgREST has shipped
 * both shapes over the years and these queries are untyped (no `Database`
 * generic in this project), so normalise defensively.
 */
function embedded(value: unknown): Record<string, unknown> | null {
  if (Array.isArray(value)) return (value[0] as Record<string, unknown>) ?? null;
  if (value && typeof value === "object") return value as Record<string, unknown>;
  return null;
}

function nameOf(value: unknown, fallback: string) {
  const profile = embedded(value);
  const name = profile?.name;
  return typeof name === "string" && name.length > 0 ? name : fallback;
}

function mapReply(row: Record<string, unknown>): CommentReply {
  const profile = embedded(row.author);
  return {
    id: row.id as string,
    userId: row.user_id as string,
    authorName: nameOf(row.author, "—"),
    authorIsAdmin: profile?.role === "admin",
    body: row.body as string,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

export function mapComment(row: Record<string, unknown>): LessonComment {
  const replies = Array.isArray(row.replies) ? (row.replies as Record<string, unknown>[]) : [];

  return {
    id: row.id as string,
    userId: row.user_id as string,
    authorName: nameOf(row.author, "—"),
    courseSlug: row.course_slug as string,
    lessonId: row.lesson_id as string,
    locale: row.locale as string,
    kind: row.kind as CommentKind,
    body: row.body as string,
    anchor: {
      quote: row.quote as string,
      prefix: (row.prefix as string) ?? "",
      suffix: (row.suffix as string) ?? "",
      textPosition: (row.text_position as number) ?? 0,
    },
    resolvedAt: (row.resolved_at as string | null) ?? null,
    resolvedByName: row.resolved_at ? nameOf(row.resolver, "—") : null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
    replies: replies
      .map(mapReply)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
  };
}

/**
 * Every comment on a lesson the caller is allowed to see. RLS does the
 * filtering: a student gets their own rows, an admin gets everyone's.
 */
export async function loadLessonComments(
  supabase: SupabaseServerClient,
  courseSlug: string,
  lessonId: string,
  locale: string,
) {
  const { data } = await supabase
    .from("lesson_comments")
    .select(COMMENT_SELECT)
    .eq("course_slug", courseSlug)
    .eq("lesson_id", lessonId)
    .eq("locale", locale)
    .order("created_at", { ascending: true });

  return ((data ?? []) as unknown as Record<string, unknown>[]).map(mapComment);
}

export async function isAdmin(supabase: SupabaseServerClient, userId: string) {
  const { data } = await supabase.from("profiles").select("role").eq("id", userId).maybeSingle();
  return data?.role === "admin";
}
