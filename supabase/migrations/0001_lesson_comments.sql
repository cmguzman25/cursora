-- Lesson comments: text-selection annotations on course content.
--
-- Run this in the Supabase dashboard → SQL Editor. It is written to be
-- idempotent, so re-running it is safe.
--
-- Authorisation model: there is no service-role key in this project, so every
-- rule below has to hold under RLS with the *user's own* session. Admin
-- visibility comes from the policies themselves, not from a privileged client.

-- ---------------------------------------------------------------------------
-- Helper: is the caller an admin?
-- ---------------------------------------------------------------------------
-- SECURITY DEFINER so the lookup bypasses the RLS on `profiles`. Without it,
-- policies that call this would be evaluated against profiles' own policies —
-- which is both slower and a recursion hazard.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
-- `user_id` references profiles(id) rather than auth.users(id) on purpose:
-- PostgREST can only embed `author:profiles(name)` when that FK exists, and the
-- admin dashboard needs author names. profiles.id already references
-- auth.users.id, so the delete cascade still reaches through.
create table if not exists public.lesson_comments (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  course_slug   text not null,
  lesson_id     text not null,
  -- Locale of the content the comment was anchored against. Not necessarily
  -- the URL locale: a missing translation falls back to the default-locale
  -- markdown, and the quote only matches the text actually rendered.
  locale        text not null,
  kind          text not null check (kind in ('error', 'suggestion', 'question')),
  body          text not null check (char_length(body) between 1 and 4000),
  -- W3C-style text quote selector.
  quote         text not null check (char_length(quote) between 1 and 2000),
  prefix        text not null default '',
  suffix        text not null default '',
  text_position integer not null default 0,
  resolved_at   timestamptz,
  resolved_by   uuid references public.profiles(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.comment_replies (
  id         uuid primary key default gen_random_uuid(),
  comment_id uuid not null references public.lesson_comments(id) on delete cascade,
  user_id    uuid not null references public.profiles(id) on delete cascade,
  body       text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------
create index if not exists lesson_comments_lesson_idx
  on public.lesson_comments (course_slug, lesson_id, locale);

create index if not exists lesson_comments_user_idx
  on public.lesson_comments (user_id, created_at desc);

-- Admin dashboard: filter by kind / open-vs-resolved, newest first.
create index if not exists lesson_comments_triage_idx
  on public.lesson_comments (kind, resolved_at, created_at desc);

create index if not exists comment_replies_comment_idx
  on public.comment_replies (comment_id, created_at);

-- ---------------------------------------------------------------------------
-- Column-level rules for UPDATE
-- ---------------------------------------------------------------------------
-- RLS grants or denies a whole row, so it cannot express "the admin may
-- resolve but not rewrite, the author may edit but not self-resolve". That
-- split lives here.
create or replace function public.enforce_lesson_comment_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.user_id is distinct from old.user_id then
    raise exception 'cannot_reassign_comment';
  end if;

  -- Only admins may touch the resolution fields.
  if (new.resolved_at is distinct from old.resolved_at
      or new.resolved_by is distinct from old.resolved_by)
     and not public.is_admin() then
    raise exception 'only_admin_can_resolve';
  end if;

  -- Anyone who is not the author (i.e. an admin) may only change resolution.
  if auth.uid() is distinct from old.user_id
     and (new.body is distinct from old.body
          or new.kind is distinct from old.kind
          or new.quote is distinct from old.quote
          or new.prefix is distinct from old.prefix
          or new.suffix is distinct from old.suffix
          or new.text_position is distinct from old.text_position) then
    raise exception 'only_author_can_edit';
  end if;

  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists enforce_lesson_comment_update on public.lesson_comments;
create trigger enforce_lesson_comment_update
  before update on public.lesson_comments
  for each row execute function public.enforce_lesson_comment_update();

create or replace function public.touch_comment_reply()
returns trigger
language plpgsql
as $$
begin
  if new.user_id is distinct from old.user_id then
    raise exception 'cannot_reassign_reply';
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists touch_comment_reply on public.comment_replies;
create trigger touch_comment_reply
  before update on public.comment_replies
  for each row execute function public.touch_comment_reply();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.lesson_comments enable row level security;
alter table public.comment_replies enable row level security;

drop policy if exists "lesson_comments_select" on public.lesson_comments;
create policy "lesson_comments_select" on public.lesson_comments
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "lesson_comments_insert" on public.lesson_comments;
create policy "lesson_comments_insert" on public.lesson_comments
  for insert to authenticated
  with check (user_id = auth.uid());

-- The author edits their own; the admin passes through to resolve. The trigger
-- above decides which columns each of them is allowed to move.
drop policy if exists "lesson_comments_update" on public.lesson_comments;
create policy "lesson_comments_update" on public.lesson_comments
  for update to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- Deliberately author-only: the admin resolves content complaints, it does not
-- delete other people's words.
drop policy if exists "lesson_comments_delete" on public.lesson_comments;
create policy "lesson_comments_delete" on public.lesson_comments
  for delete to authenticated
  using (user_id = auth.uid());

-- A reply is visible exactly when its parent comment is.
drop policy if exists "comment_replies_select" on public.comment_replies;
create policy "comment_replies_select" on public.comment_replies
  for select to authenticated
  using (
    exists (
      select 1 from public.lesson_comments c
      where c.id = comment_id
        and (c.user_id = auth.uid() or public.is_admin())
    )
  );

-- ...and you may only reply to a thread you can see.
drop policy if exists "comment_replies_insert" on public.comment_replies;
create policy "comment_replies_insert" on public.comment_replies
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.lesson_comments c
      where c.id = comment_id
        and (c.user_id = auth.uid() or public.is_admin())
    )
  );

drop policy if exists "comment_replies_update" on public.comment_replies;
create policy "comment_replies_update" on public.comment_replies
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "comment_replies_delete" on public.comment_replies;
create policy "comment_replies_delete" on public.comment_replies
  for delete to authenticated
  using (user_id = auth.uid());

-- Additive, and named distinctly so it never clobbers the existing self-read
-- policy on profiles. Two needs:
--   * the admin dashboard resolves author names across all users;
--   * a student must see the *name* of the admin who replied to their comment,
--     otherwise replies render anonymously.
-- Admin profiles hold only id/name/role, and on a course platform the
-- instructor's name is not a secret — so exposing them to signed-in users is
-- the smallest widening that makes replies legible.
drop policy if exists "profiles_admin_select_all" on public.profiles;
create policy "profiles_admin_select_all" on public.profiles
  for select to authenticated
  using (public.is_admin() or role = 'admin');

-- ---------------------------------------------------------------------------
-- Function grants
-- ---------------------------------------------------------------------------
-- Supabase's default privileges grant EXECUTE on every new public function to
-- anon/authenticated, so the `revoke ... from public` above does not by itself
-- close the /rest/v1/rpc endpoint. Revoke the explicit grants too.
--
-- Trigger functions are never called directly: PostgreSQL checks EXECUTE
-- against the trigger's creator at CREATE TRIGGER time, not against the user
-- firing it, so nobody loses anything here.
revoke execute on function public.enforce_lesson_comment_update() from public, anon, authenticated;
revoke execute on function public.touch_comment_reply() from public, anon, authenticated;

-- `touch_comment_reply` runs as SECURITY INVOKER, but pin its search_path
-- anyway so a role-level setting cannot change what it resolves.
alter function public.touch_comment_reply() set search_path = public;

-- `is_admin()` stays callable by signed-in users (the RLS policies evaluate it
-- as the caller), but anon has no business reaching it.
revoke execute on function public.is_admin() from anon;
