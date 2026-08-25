-- Per-user progress within a "quiz"-kind lesson (see LessonMeta.kind): which
-- question they're on, and how they did on each one they've answered, so
-- re-entering the lesson resumes instead of restarting from question 1.
-- `current_index` can equal `questions.length`, meaning "finished this quiz".
--
-- `results` is a per-question map (`{"0": true, "2": false}`, keyed by
-- question index) rather than a plain correct/answered count: the quiz lets
-- the learner go back and re-answer a question, and an aggregate count can't
-- absorb that safely on resume (recomputing it from scratch would either
-- double-count or lose previously-scored questions). A per-index map merges
-- correctly either way.
--
-- Run this in the Supabase dashboard → SQL Editor. It is written to be
-- idempotent, so re-running it is safe.

create table if not exists public.quiz_progress (
  user_id       uuid not null references auth.users(id) on delete cascade,
  course_slug   text not null,
  lesson_id     text not null,
  current_index int not null default 0,
  results       jsonb not null default '{}'::jsonb,
  updated_at    timestamptz not null default now(),
  primary key (user_id, course_slug, lesson_id)
);

alter table public.quiz_progress enable row level security;

drop policy if exists "quiz_progress_select" on public.quiz_progress;
create policy "quiz_progress_select" on public.quiz_progress
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "quiz_progress_insert" on public.quiz_progress;
create policy "quiz_progress_insert" on public.quiz_progress
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "quiz_progress_update" on public.quiz_progress;
create policy "quiz_progress_update" on public.quiz_progress
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
