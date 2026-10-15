-- Modo entrevista y simulacros de `/practice`.
--
-- Una entrega en modo entrevista es la **respuesta final** de un reto rendido
-- con reloj y sin pistas, sola o como parte de un simulacro de varios retos. Se
-- guarda en la misma tabla que las de práctica porque cuenta igual para el
-- contador de "resuelto" (lo que se resolvió bajo presión también se resolvió),
-- y se distingue con tres columnas:
--
--   * `mode`             — 'practice' | 'interview'.
--   * `duration_seconds` — cuánto tardó desde que empezó el reloj. Null en
--                          práctica, donde no hay reloj.
--   * `session_id`       — el simulacro al que pertenece la entrega, para poder
--                          reconstruirlo después. Null fuera de un simulacro.
--                          Texto y no uuid: lo genera el servidor al armar el
--                          simulacro y viaja en la URL.
--
-- Correr en el panel de Supabase → SQL Editor. Es idempotente.

alter table public.challenge_submissions
  add column if not exists mode text not null default 'practice',
  add column if not exists duration_seconds int,
  add column if not exists session_id text;

alter table public.challenge_submissions
  drop constraint if exists challenge_submissions_modo;

alter table public.challenge_submissions
  add constraint challenge_submissions_modo check (
    mode in ('practice', 'interview')
    and (duration_seconds is null or duration_seconds >= 0)
    and (session_id is null or mode = 'interview')
  );
