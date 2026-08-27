-- Reading bookmark: where a reader left off inside a lesson.
--
-- Run this in the Supabase dashboard → SQL Editor. It is written to be
-- idempotent, so re-running it is safe.
--
-- One mark per reader per lesson, enforced by the primary key rather than by
-- application code: "move my mark" is an upsert on that key, so there is no
-- window in which a lesson could hold two.
--
-- The position is stored the same way `lesson_comments` stores its own — as a
-- W3C-style text quote selector (see src/lib/comments/anchor.ts) instead of a
-- scroll offset or a paragraph number. A pixel offset would land somewhere
-- else the moment the reader changed the font size or rotated their phone, and
-- a paragraph index would silently drift when the lesson's markdown is edited.
-- A quote that no longer matches simply fails to resolve, and the mark is
-- ignored rather than dropping the reader in the wrong place.
--
-- `locale` is part of the row for the same reason it is on a comment: a
-- missing translation falls back to the default-locale markdown, so the quote
-- only means anything against the language it was taken from.

create table if not exists public.lesson_bookmarks (
  user_id       uuid not null references auth.users(id) on delete cascade,
  course_slug   text not null,
  lesson_id     text not null,
  locale        text not null,
  quote         text not null check (char_length(quote) between 1 and 2000),
  prefix        text not null default '',
  suffix        text not null default '',
  text_position integer not null default 0,
  updated_at    timestamptz not null default now(),
  primary key (user_id, course_slug, lesson_id)
);

alter table public.lesson_bookmarks enable row level security;

-- A bookmark is private to its owner. Unlike comments there is no admin view:
-- how far along someone is reading is nobody else's business.
drop policy if exists "lesson_bookmarks_select" on public.lesson_bookmarks;
create policy "lesson_bookmarks_select" on public.lesson_bookmarks
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "lesson_bookmarks_insert" on public.lesson_bookmarks;
create policy "lesson_bookmarks_insert" on public.lesson_bookmarks
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "lesson_bookmarks_update" on public.lesson_bookmarks;
create policy "lesson_bookmarks_update" on public.lesson_bookmarks
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "lesson_bookmarks_delete" on public.lesson_bookmarks;
create policy "lesson_bookmarks_delete" on public.lesson_bookmarks
  for delete to authenticated
  using (user_id = auth.uid());
