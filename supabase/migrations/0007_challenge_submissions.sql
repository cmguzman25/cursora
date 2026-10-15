-- Las entregas de los retos de código de la sección `/practice`.
--
-- Una fila por cada vez que el alumno pulsa **Enviar** (no por cada "Ejecutar":
-- esas son pruebas, no intentos). De acá salen tres cosas:
--
--   * el contador de veces resuelto de cada reto (solo las entregas con todos
--     los casos en verde),
--   * el orden por defecto del catálogo (primero lo que menos se resolvió),
--   * el historial de la página del reto, con el código de cada entrega.
--
-- La calificación ocurre en el navegador (Postgres en WASM) y el servidor guarda
-- lo que el cliente informa. Es la misma decisión que 0006 tomó con la duración
-- de los exámenes: esto es estudio propio, sin una nota que valga para nadie más
-- que para el alumno. La ruta sí comprueba que el reto exista y que los números
-- sean coherentes entre sí; el `check` de abajo lo repite en la base.
--
-- Correr en el panel de Supabase → SQL Editor. Es idempotente.

create table if not exists public.challenge_submissions (
  id              uuid        primary key default gen_random_uuid(),
  user_id         uuid        not null references auth.users(id) on delete cascade,
  challenge_slug  text        not null,
  language        text        not null,
  code            text        not null check (char_length(code) <= 20000),

  passed_cases    int         not null,
  total_cases     int         not null,
  -- Redundante con los dos de arriba, y a propósito: es la columna por la que se
  -- cuenta y se filtra, y el `check` impide que diga algo distinto.
  passed          boolean     not null,

  created_at      timestamptz not null default now(),

  constraint challenge_submissions_casos check (
    total_cases > 0
    and passed_cases between 0 and total_cases
    and passed = (passed_cases = total_cases)
  )
);

-- El historial de un reto, del más nuevo al más viejo.
create index if not exists challenge_submissions_by_challenge
  on public.challenge_submissions (user_id, challenge_slug, created_at desc);

alter table public.challenge_submissions enable row level security;

drop policy if exists "challenge_submissions_select" on public.challenge_submissions;
create policy "challenge_submissions_select" on public.challenge_submissions
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "challenge_submissions_insert" on public.challenge_submissions;
create policy "challenge_submissions_insert" on public.challenge_submissions
  for insert to authenticated
  with check (user_id = auth.uid());

-- Sin update ni delete: una entrega es un hecho. Corregir el código es enviar
-- otra vez.
