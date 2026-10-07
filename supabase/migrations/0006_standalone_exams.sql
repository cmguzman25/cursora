-- Los exámenes de la sección `/exams`: exámenes que no pertenecen a ningún
-- curso. El alumno los rinde para prepararse para una certificación o para
-- repasar algo que está estudiando fuera de esta plataforma, y cada uno se
-- puede rendir de dos maneras:
--
--   * modo `exam`  — cronometrado, con una duración que **elige el alumno**, sin
--     revelar nada hasta entregar.
--   * modo `study` — sin reloj, revelando la respuesta correcta y la explicación
--     de cada opción en el momento en que se marca una.
--
-- Tres tablas, y la razón de que sean tres está explicada en la cabecera de cada
-- una. Lo que no hay que hacer es extender `exam_attempts` (ver
-- 0005_exam_attempts.sql): sus columnas `course_slug` y `lesson_id` son NOT NULL
-- y su índice único parcial se apoya en esa tupla, y un examen de esta sección no
-- tiene lección a la que pertenecer. El mismo razonamiento con el que esa
-- migración decidió no extender `quiz_progress` aplica acá una vez más.
--
-- Correr en el panel de Supabase → SQL Editor. Está escrito para ser
-- idempotente, así que volver a correrlo es seguro.


-- ---------------------------------------------------------------------------
-- exam_runs — una rendida de un examen de la sección
-- ---------------------------------------------------------------------------
-- Igual que `exam_attempts`, el reloj vive acá y no en el navegador:
-- `expires_at` lo escribe el servidor a partir de now() más los minutos que
-- pidió el alumno, y al cliente se le manda junto con la hora del servidor para
-- que dibuje la diferencia. Recargar la página retoma con los minutos que de
-- verdad quedan, y mover el reloj del sistema no cambia nada.
--
-- Dos diferencias con `exam_attempts` que vale la pena nombrar:
--
--   1. `duration_minutes` es una columna, no una constante del banco. En los
--      simulacros de los cursos la duración es la del examen real y no se
--      negocia; acá el alumno decide si quiere 15 minutos o 90, y eso hay que
--      guardarlo para que el historial diga en qué condiciones sacó esa nota.
--
--      Eso debilita un poco la promesa de 0005 ("el reloj lo pone el servidor"),
--      y conviene ser preciso sobre en qué: el servidor sigue siendo el único que
--      escribe `expires_at`, y lo hace una sola vez, al arrancar. Lo que pasó a
--      ser entrada del cliente es la **duración**, que la ruta acota antes de
--      usarla y después persiste acá. Una recarga no puede estirar un examen en
--      curso, porque el vencimiento ya está escrito y no se recalcula. Es
--      aceptable porque esto es estudio propio: no hay supervisión ni una nota
--      que valga para nadie más que para el alumno.
--   2. **No hay columna `flagged`.** En `exam_attempts` las banderas son del
--      intento y mueren con él. Acá el pedido es poder volver semanas después a
--      "lo que tengo que repasar", así que viven en `exam_review_flags`, que es
--      su única fuente de verdad en los dos modos.
create table if not exists public.exam_runs (
  id                uuid        primary key default gen_random_uuid(),
  user_id           uuid        not null references auth.users(id) on delete cascade,
  exam_slug         text        not null,

  mode              text        not null check (mode in ('exam', 'study')),
  -- null en modo estudio: no hay reloj que configurar.
  duration_minutes  int         check (duration_minutes is null or duration_minutes between 1 and 600),

  started_at        timestamptz not null default now(),
  -- null en modo estudio, por el mismo motivo.
  expires_at        timestamptz,
  submitted_at      timestamptz,
  -- Si entregó el alumno o lo entregó el reloj: la pantalla de resultados lo
  -- dice, porque quedarse sin tiempo es información útil.
  auto_submitted    boolean     not null default false,

  -- { "ing-b2-q01": ["B"], "ing-b2-q04": ["A","C"] } — indexado por **id de
  -- pregunta**, no por posición, así que reordenar o reescribir el banco no
  -- puede recalificar en silencio una rendida ya guardada.
  answers           jsonb       not null default '{}'::jsonb,
  -- En qué pregunta estaba, para que una recarga caiga donde iba.
  cursor            int         not null default 0,

  -- Las escribe el servidor al entregar, nunca el cliente.
  raw_correct       int,
  raw_total         int,
  -- Porcentaje de aciertos. A diferencia de los simulacros de AWS, un examen de
  -- esta sección no tiene una escala oficial que imitar, así que la nota es el
  -- porcentaje y no hay ninguna precisión que haya que disculpar en pantalla.
  scaled_score      int,
  passed            boolean,
  -- [{ "domainId": "past-perfect", "correct": 4, "total": 5 }, ...] — acá los
  -- "dominios" son los temas que el examen declara evaluar.
  domain_scores     jsonb,

  -- Qué edición del banco se respondió. Una rendida revisada contra un banco
  -- distinto del que se rindió mostraría los enunciados equivocados.
  bank_version      int         not null default 1,
  updated_at        timestamptz not null default now(),

  -- El estado intermedio no existe: un examen cronometrado sin vencimiento
  -- correría para siempre, y un repaso con vencimiento tendría un reloj que la
  -- interfaz no dibuja y que lo entregaría solo a espaldas del alumno. Sin este
  -- check, un bug en la ruta de arranque produciría una de las dos cosas y no se
  -- notaría hasta que alguien perdiera una rendida.
  constraint exam_runs_reloj check (
    (mode = 'exam'  and expires_at is not null and duration_minutes is not null) or
    (mode = 'study' and expires_at is null     and duration_minutes is null)
  )
);

create index if not exists exam_runs_by_exam
  on public.exam_runs (user_id, exam_slug, started_at desc);

-- Como máximo una rendida sin entregar por alumno, examen **y modo**. Por modo y
-- no por examen a propósito: dejar un repaso a medias no tiene por qué impedir
-- sentarse a rendir el cronometrado. Dentro de un mismo modo sí hace falta el
-- tope, porque si no a alguien al que le quedan cinco minutos le alcanzaría con
-- abrir una rendida nueva para tener dos relojes corriendo, que es justo lo que
-- la cuenta regresiva existe para evitar.
create unique index if not exists exam_runs_one_open
  on public.exam_runs (user_id, exam_slug, mode)
  where submitted_at is null;

alter table public.exam_runs enable row level security;

drop policy if exists "exam_runs_select" on public.exam_runs;
create policy "exam_runs_select" on public.exam_runs
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "exam_runs_insert" on public.exam_runs;
create policy "exam_runs_insert" on public.exam_runs
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "exam_runs_update" on public.exam_runs;
create policy "exam_runs_update" on public.exam_runs
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Sin política de delete, igual que en `exam_attempts`: una rendida es el
-- registro de una rendida. Poder borrar una desaprobada volvería inútil el
-- historial de notas para la persona a la que le sirve. "Rendirlo de nuevo" es
-- un insert.


-- ---------------------------------------------------------------------------
-- exam_question_results — el historial de fallos, por pregunta
-- ---------------------------------------------------------------------------
-- Una fila por alumno, examen y pregunta, con el acumulado de cuántas veces la
-- vio y cuántas la falló.
--
-- Es un rollup, y existe por un motivo que no es la velocidad: **el modo estudio
-- nunca entrega**. No hay un momento de calificación donde mirar `answers` y
-- sacar la cuenta, porque el alumno puede dejar un repaso a la mitad y cerrar la
-- pestaña. Sin esta tabla, un fallo cometido en modo estudio no quedaría
-- registrado en ninguna parte, y el requisito es justamente que los fallos se
-- registren.
--
-- Como efecto secundario, la vista de "lo que tengo que repasar" se resuelve con
-- una consulta indexada en vez de recorrer todas las rendidas recalificándolas
-- contra el banco.
--
-- El modo examen la alimenta también, en el upsert masivo que hace la ruta de
-- entrega, para que las dos modalidades construyan el mismo historial.
--
-- Una pregunta está **pendiente de repaso** cuando se falló alguna vez y no se
-- acertó después:
--
--   times_wrong > 0 and (last_correct_at is null or last_correct_at < last_wrong_at)
--
-- Se expresa con dos marcas de tiempo y no con un booleano "ya la tengo" porque
-- el booleano pierde el orden: quien acierta una pregunta en marzo y la vuelve a
-- fallar en mayo sigue necesitando repasarla, y con un booleano habría que
-- acordarse de bajarlo en el camino de escritura del fallo.
create table if not exists public.exam_question_results (
  user_id         uuid        not null references auth.users(id) on delete cascade,
  exam_slug       text        not null,
  question_id     text        not null,

  times_answered  int         not null default 0,
  times_wrong     int         not null default 0,
  last_wrong_at   timestamptz,
  -- Null = nunca la acertó. La fila **no** se borra al acertar: saber que algo
  -- costó tres intentos es justamente lo que hace útil al historial.
  last_correct_at timestamptz,
  -- Lo último que marcó, para que la vista de repaso pueda decir "elegiste B, y
  -- B falla porque…" en vez de sólo cuál era la correcta.
  last_selected   jsonb       not null default '[]'::jsonb,
  -- Contra qué edición del banco se registró. Si el banco cambió de versión, la
  -- vista de repaso filtra contra los ids que existen hoy: una pregunta
  -- eliminada no tiene enunciado que mostrar, y buscarla a ciegas reventaría.
  bank_version    int         not null default 1,

  primary key (user_id, exam_slug, question_id)
);

-- El filtro de la vista de repaso: las que alguna vez falló, más recientes
-- primero.
create index if not exists exam_question_results_wrong
  on public.exam_question_results (user_id, exam_slug, last_wrong_at desc)
  where times_wrong > 0;

alter table public.exam_question_results enable row level security;

drop policy if exists "exam_question_results_select" on public.exam_question_results;
create policy "exam_question_results_select" on public.exam_question_results
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "exam_question_results_insert" on public.exam_question_results;
create policy "exam_question_results_insert" on public.exam_question_results
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "exam_question_results_update" on public.exam_question_results;
create policy "exam_question_results_update" on public.exam_question_results
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Sin política de delete: es historial. Que una pregunta deje de estar pendiente
-- se expresa con `last_correct_at`, no borrando la evidencia de que alguna vez se
-- falló.
--
-- Un aviso para quien escriba la ruta que actualiza esta tabla: el proyecto no
-- tiene service-role key, y `supabase-js` no sabe expresar
-- `times_wrong = times_wrong + 1` en un upsert. El incremento es leer-y-escribir,
-- así que dos escrituras simultáneas sobre la misma pregunta podrían perder una.
-- Es inocuo y conviene decirlo en el código en vez de dar a entender que el
-- contador es exacto: la entrega es idempotente, el modo estudio escribe una
-- pregunta a la vez, y nadie suma esta columna para nada que importe.


-- ---------------------------------------------------------------------------
-- exam_review_flags — las preguntas marcadas para repasar
-- ---------------------------------------------------------------------------
-- Única fuente de verdad de las banderas, y la misma en los dos modos: el alumno
-- puede marcar una pregunta mientras corre el reloj o mientras repasa sin apuro,
-- y en los dos casos la encuentra después en `/exams/<slug>/repaso`.
--
-- Deliberadamente **no** es una columna del intento. Una bandera puesta durante
-- un examen cronometrado que desapareciera al entregarlo no serviría para nada:
-- el momento en que el alumno más necesita volver a una pregunta es justo
-- después de haberla marcado sin tiempo para pensarla.
create table if not exists public.exam_review_flags (
  user_id     uuid        not null references auth.users(id) on delete cascade,
  exam_slug   text        not null,
  question_id text        not null,
  -- Por qué la marcó, si quiso decirlo. Opcional.
  note        text,
  flagged_at  timestamptz not null default now(),

  primary key (user_id, exam_slug, question_id)
);

alter table public.exam_review_flags enable row level security;

drop policy if exists "exam_review_flags_select" on public.exam_review_flags;
create policy "exam_review_flags_select" on public.exam_review_flags
  for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "exam_review_flags_insert" on public.exam_review_flags;
create policy "exam_review_flags_insert" on public.exam_review_flags
  for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "exam_review_flags_update" on public.exam_review_flags;
create policy "exam_review_flags_update" on public.exam_review_flags
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Ésta **sí** lleva política de delete, a diferencia de las otras dos: una
-- bandera es una nota que el alumno se dejó a sí mismo, y desmarcar es
-- exactamente borrarla. Obligarlo a convivir con una lista de repaso que sólo
-- crece la volvería inservible en dos semanas.
drop policy if exists "exam_review_flags_delete" on public.exam_review_flags;
create policy "exam_review_flags_delete" on public.exam_review_flags
  for delete to authenticated
  using (user_id = auth.uid());
