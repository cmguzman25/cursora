-- Course enrollments: which courses a user has explicitly joined.
--
-- Run this in the Supabase dashboard → SQL Editor. It is written to be
-- idempotent, so re-running it is safe.
--
-- Why a table of its own: "my courses" used to be inferred from activity, so
-- merely opening a lesson to peek at it made the course yours. Enrollment is a
-- deliberate act, and it is kept apart from `course_progress` and
-- `lesson_completions` precisely so that leaving a course never touches the
-- progress — re-enrolling picks up exactly where you left off.

create table if not exists public.course_enrollments (
  user_id     uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  enrolled_at timestamptz not null default now(),
  primary key (user_id, course_slug)
);

-- The catalog lists a user's enrollments on every visit, newest first.
create index if not exists course_enrollments_user_idx
  on public.course_enrollments (user_id, enrolled_at desc);

alter table public.course_enrollments enable row level security;

-- Enrollment is private to its owner: no admin escape hatch here, unlike
-- comments, because nothing in the app needs to read someone else's.
drop policy if exists "course_enrollments_select" on public.course_enrollments;
create policy "course_enrollments_select" on public.course_enrollments
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "course_enrollments_insert" on public.course_enrollments;
create policy "course_enrollments_insert" on public.course_enrollments
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "course_enrollments_delete" on public.course_enrollments;
create policy "course_enrollments_delete" on public.course_enrollments
  for delete to authenticated
  using (user_id = auth.uid());
