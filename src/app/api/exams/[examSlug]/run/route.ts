import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getExamBank } from "@content/exams/registry";
import { sanitizeAnswers } from "@/lib/exams/answers";
import { clampDuration, toGradableExam } from "@/lib/exams/generated";
import { tablaFaltante } from "@/lib/exams/persistence";
import {
  COLUMNAS_RENDIDA,
  TABLA_RENDIDAS,
  comoRespuesta,
  modoValido,
  type FilaRendida,
} from "@/lib/exams/runs";

/**
 * Una rendida de un examen de la sección `/exams`.
 *
 * Es la hermana de `/api/courses/[courseSlug]/lessons/[lessonId]/exam-attempt`, y
 * es una ruta aparte y no la misma con un parámetro más porque las claves, el
 * banco del que sale el examen y lo que hay que validar al arrancar son
 * distintos. Lo que **no** está duplicado es nada de lo que decide una nota: el
 * saneado y la calificación salen de `src/lib/exams/`.
 *
 *   GET ?mode=exam|study → la rendida abierta de ese modo, o la última entregada,
 *                          o null. Siempre con la hora del servidor.
 *   POST                 → abre una rendida. El cuerpo trae el modo y, en modo
 *                          examen, los minutos que eligió el alumno.
 *   PATCH                → autoguardado de respuestas y posición.
 *
 * El reloj sigue siendo del servidor: `expires_at` lo escribe esta ruta una sola
 * vez, al arrancar, y nunca se recalcula. Lo que pasó a ser entrada del cliente es
 * la **duración**, que se acota con `clampDuration` antes de usarse. Una recarga
 * no puede estirar un examen en curso.
 *
 * Las marcas para repasar **no pasan por acá**: viven en `exam_review_flags` y se
 * manejan en `../flags`, porque tienen que sobrevivir a la rendida.
 */

interface RouteParams {
  examSlug: string;
}

export async function GET(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { examSlug } = await params;

  // El banco se comprueba también en el GET, no solo al escribir: sin esto un
  // slug mal escrito devolvería `attempt: null` con un 200, y el cliente lo
  // dibujaría como "todavía no empezaste" en vez de como lo que es.
  if (!getExamBank(examSlug)) {
    return NextResponse.json({ error: "no_exam" }, { status: 404 });
  }

  const mode = modoValido(new URL(request.url).searchParams.get("mode"));
  if (!mode) {
    return NextResponse.json({ error: "invalid_mode" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Siempre se devuelve la hora del servidor, incluso sin sesión: el cliente la
  // usa para corregir su desfase y para no confiar en el reloj de la máquina.
  const serverNow = new Date().toISOString();

  if (!user) {
    return NextResponse.json({ attempt: null, serverNow, persisted: false });
  }

  const { data, error } = await supabase
    .from(TABLA_RENDIDAS)
    .select(COLUMNAS_RENDIDA)
    .eq("user_id", user.id)
    .eq("exam_slug", examSlug)
    .eq("mode", mode)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error && tablaFaltante(error, TABLA_RENDIDAS)) {
    return NextResponse.json({ attempt: null, serverNow, persisted: false });
  }
  if (error) {
    return NextResponse.json({ error: "load_failed" }, { status: 500 });
  }

  return NextResponse.json({
    attempt: data ? comoRespuesta(data as FilaRendida) : null,
    serverNow,
    persisted: true,
  });
}

export async function POST(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { examSlug } = await params;

  const bank = getExamBank(examSlug);
  if (!bank) {
    return NextResponse.json({ error: "no_exam" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const mode = modoValido(body?.mode);
  if (!mode) {
    return NextResponse.json({ error: "invalid_mode" }, { status: 400 });
  }

  // En modo examen la duración es obligatoria y se acota. Si no es utilizable se
  // responde 400 en vez de elegir un valor por el alumno: un examen que dura algo
  // distinto de lo que pidió es peor que un error.
  let durationMinutes: number | null = null;
  if (mode === "exam") {
    durationMinutes = clampDuration(body?.durationMinutes);
    if (durationMinutes === null) {
      return NextResponse.json({ error: "invalid_duration" }, { status: 400 });
    }
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const ahora = Date.now();

  const { data, error } = await supabase
    .from(TABLA_RENDIDAS)
    .insert({
      user_id: user.id,
      exam_slug: examSlug,
      mode,
      duration_minutes: durationMinutes,
      started_at: new Date(ahora).toISOString(),
      // El modo estudio no tiene reloj, y el check de la tabla exige que las dos
      // columnas vayan juntas.
      expires_at:
        durationMinutes === null
          ? null
          : new Date(ahora + durationMinutes * 60_000).toISOString(),
      bank_version: bank.version,
    })
    .select(COLUMNAS_RENDIDA)
    .single();

  if (error) {
    if (tablaFaltante(error, TABLA_RENDIDAS)) {
      return NextResponse.json({ error: "not_persisted" }, { status: 503 });
    }
    // El índice único parcial rechaza una segunda rendida abierta del mismo modo.
    // No es un error del usuario: pasa con dos pestañas, y el cliente lo resuelve
    // volviendo a pedir la que ya existe.
    if (error.code === "23505") {
      return NextResponse.json({ error: "run_open" }, { status: 409 });
    }
    return NextResponse.json({ error: "start_failed" }, { status: 500 });
  }

  return NextResponse.json({
    attempt: comoRespuesta(data as FilaRendida),
    serverNow: new Date().toISOString(),
    persisted: true,
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { examSlug } = await params;

  const bank = getExamBank(examSlug);
  if (!bank) {
    return NextResponse.json({ error: "no_exam" }, { status: 404 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const preguntas = toGradableExam(bank).questions;

  const body = await request.json().catch(() => null);
  const attemptId = typeof body?.attemptId === "string" ? body.attemptId : null;
  const answers = sanitizeAnswers(preguntas, body?.answers ?? {});
  const cursor = Number.isInteger(body?.cursor) ? (body.cursor as number) : null;

  if (!attemptId || answers === null || cursor === null) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (cursor < 0 || cursor > preguntas.length) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { data: actual, error: errorLectura } = await supabase
    .from(TABLA_RENDIDAS)
    .select("id, expires_at, submitted_at")
    .eq("id", attemptId)
    .eq("user_id", user.id)
    .eq("exam_slug", examSlug)
    .maybeSingle();

  if (errorLectura && tablaFaltante(errorLectura, TABLA_RENDIDAS)) {
    return NextResponse.json({ error: "not_persisted" }, { status: 503 });
  }
  if (!actual) {
    return NextResponse.json({ error: "run_not_found" }, { status: 404 });
  }
  if (actual.submitted_at) {
    return NextResponse.json({ error: "already_submitted" }, { status: 409 });
  }
  // Sin esta guarda, las respuestas tipeadas después de la campana se guardan
  // igual, y el reloj del servidor no serviría para nada. En modo estudio no hay
  // vencimiento, así que no hay nada que vencer.
  if (actual.expires_at && new Date(actual.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "expired" }, { status: 409 });
  }

  const { error } = await supabase
    .from(TABLA_RENDIDAS)
    .update({ answers, cursor, updated_at: new Date().toISOString() })
    .eq("id", attemptId)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }

  return NextResponse.json({ saved: true, serverNow: new Date().toISOString() });
}
