-- Un intento de un simulacro cronometrado (lecciones con `kind: "exam"`, ver
-- LessonMeta.kind). Tabla aparte de `quiz_progress` a propósito: esa guarda una
-- fila por lección y califica cada pregunta como un booleano, que es lo correcto
-- para un repaso sin tiempo que se retoma para siempre, y lo incorrecto para un
-- examen que se rinde, se califica y se vuelve a rendir.
--
-- Cuatro motivos concretos para no extenderla:
--   1. Su clave primaria es (user_id, course_slug, lesson_id): una fila, o sea
--      un solo intento para toda la vida. Un simulacro cuyo valor está en
--      repetirlo y ver moverse la nota necesita historial.
--   2. Su columna `results` es un mapa de booleanos, y la ruta que la escribe lo
--      valida así. La revisión posterior necesita saber **qué** marcó el alumno,
--      no solo si acertó.
--   3. Harían falta siete columnas más que quedarían en NULL en cada fila de
--      repaso.
--   4. Su centinela de "terminado" es current_index == cantidad de preguntas, y
--      un examen se puede entregar desde la pregunta 12.
--
-- El reloj vive acá, no en el navegador. `expires_at` lo escribe el servidor a
-- partir de now() más la duración del banco, y al cliente se le manda junto con
-- la hora del servidor para que dibuje la diferencia. Eso es lo que hace que
-- recargar la página retome con los minutos que de verdad quedan, y que mover
-- el reloj del sistema no cambie nada.
--
-- `answers` guarda los ids de opción elegidos — no un booleano de acierto —
-- porque la revisión pregunta por pregunta tiene que mostrar qué se marcó. Y se
-- indexa por **id de pregunta**, no por posición como hace `quiz_progress`, así
-- que reordenar o reescribir el banco no puede recalificar en silencio un
-- intento ya guardado.
--
-- Correr en el panel de Supabase → SQL Editor. Está escrito para ser
-- idempotente, así que volver a correrlo es seguro.

create table if not exists public.exam_attempts (
  id             uuid        primary key default gen_random_uuid(),
  user_id        uuid        not null references auth.users(id) on delete cascade,
  course_slug    text        not null,
  lesson_id      text        not null,

  started_at     timestamptz not null default now(),
  expires_at     timestamptz not null,
  submitted_at   timestamptz,
  -- Si entregó el alumno o lo entregó el reloj: la pantalla de resultados lo
  -- dice, porque quedarse sin tiempo es información útil.
  auto_submitted boolean     not null default false,

  -- { "sim-d1-q01": ["B"], "sim-d2-q04": ["A","C"] }
  answers        jsonb       not null default '{}'::jsonb,
  -- Ids de las preguntas que el alumno marcó para volver: ["sim-d3-q07", ...]
  flagged        jsonb       not null default '[]'::jsonb,
  -- En qué pregunta estaba, para que una recarga caiga donde iba.
  cursor         int         not null default 0,

  -- Las escribe el servidor al entregar, nunca el cliente.
  raw_correct    int,
  raw_total      int,
  scaled_score   int,
  passed         boolean,
  -- [{ "domainId": "1", "correct": 12, "total": 16 }, ...]
  domain_scores  jsonb,

  -- Qué edición del banco se respondió. Un intento revisado contra un banco
  -- distinto del que se rindió mostraría los enunciados equivocados.
  bank_version   int         not null default 1,
  updated_at     timestamptz not null default now()
);

create index if not exists exam_attempts_by_lesson
  on public.exam_attempts (user_id, course_slug, lesson_id, started_at desc);

-- Como máximo un intento sin entregar por alumno y por lección. Sin esto, a
-- alguien al que le quedan cinco minutos le alcanzaría con abrir un intento
-- nuevo para tener dos relojes corriendo, que es justo lo que la cuenta
-- regresiva existe para evitar.
create unique index if not exists exam_attempts_one_open
  on public.exam_attempts (user_id, course_slug, lesson_id)
  where submitted_at is null;

alter table public.exam_attempts enable row level security;

drop policy if exists "exam_attempts_select" on public.exam_attempts;
create policy "exam_attempts_select" on public.exam_attempts
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "exam_attempts_insert" on public.exam_attempts;
create policy "exam_attempts_insert" on public.exam_attempts
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "exam_attempts_update" on public.exam_attempts;
create policy "exam_attempts_update" on public.exam_attempts
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Sin política de delete, deliberadamente: un intento es el registro de una
-- rendida. Poder borrar uno desaprobado volvería inútil el historial de notas
-- para la persona a la que le sirve. "Rendirlo de nuevo" es un insert.
