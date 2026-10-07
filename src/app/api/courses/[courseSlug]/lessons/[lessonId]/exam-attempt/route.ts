import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPracticeExam } from "@content/courses/registry";
import { sanitizeAnswers, sanitizeFlagged } from "@/lib/exams/answers";
import { tablaFaltante } from "@/lib/exams/persistence";

/**
 * Un intento de simulacro cronometrado. A diferencia de `quiz-progress`, que
 * confía en el `currentIndex` que manda el cliente, acá el servidor es dueño de
 * dos cosas que no se pueden delegar: **el reloj** y **la nota** (esta última
 * en `./submit`). Un vencimiento puesto por el cliente no es un vencimiento.
 *
 *   GET    → el intento abierto, o el último entregado, o null. Siempre con la
 *            hora del servidor, para que el cliente corrija su desfase.
 *   POST   → abre un intento, fijando el vencimiento desde el servidor.
 *   PATCH  → autoguardado de respuestas, marcas y posición.
 */

interface RouteParams {
  courseSlug: string;
  lessonId: string;
}

const COLUMNAS =
  "id, started_at, expires_at, submitted_at, auto_submitted, answers, flagged, cursor, raw_correct, raw_total, scaled_score, passed, domain_scores, bank_version";

type FilaIntento = {
  id: string;
  started_at: string;
  expires_at: string;
  submitted_at: string | null;
  auto_submitted: boolean;
  answers: Record<string, string[]> | null;
  flagged: string[] | null;
  cursor: number;
  raw_correct: number | null;
  raw_total: number | null;
  scaled_score: number | null;
  passed: boolean | null;
  domain_scores: unknown;
  bank_version: number;
};

function comoRespuesta(fila: FilaIntento) {
  return {
    id: fila.id,
    startedAt: fila.started_at,
    expiresAt: fila.expires_at,
    submittedAt: fila.submitted_at,
    autoSubmitted: fila.auto_submitted,
    answers: fila.answers ?? {},
    flagged: fila.flagged ?? [],
    cursor: fila.cursor,
    bankVersion: fila.bank_version,
    result:
      fila.submitted_at && fila.scaled_score !== null
        ? {
            rawCorrect: fila.raw_correct ?? 0,
            rawTotal: fila.raw_total ?? 0,
            scaledScore: fila.scaled_score,
            passed: fila.passed ?? false,
            domainScores: fila.domain_scores ?? [],
          }
        : null,
  };
}

/**
 * La tabla puede no existir todavía: la migración 0005 se corre a mano.
 *
 * Delega en el detector compartido, que compara el mensaje de forma exacta. La
 * versión anterior hacía `message.includes("exam_attempts")`, y eso confundía la
 * violación del índice `exam_attempts_one_open` —que contiene esa subcadena— con
 * una tabla inexistente: un intento ya abierto se reportaba como "no se puede
 * guardar" en vez de como 409.
 */
function faltaLaTabla(error: { code?: string; message?: string } | null): boolean {
  return tablaFaltante(error, "exam_attempts");
}

export async function GET(_request: Request, { params }: { params: Promise<RouteParams> }) {
  const { courseSlug, lessonId } = await params;
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
    .from("exam_attempts")
    .select(COLUMNAS)
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .eq("lesson_id", lessonId)
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error && faltaLaTabla(error)) {
    return NextResponse.json({ attempt: null, serverNow, persisted: false });
  }
  if (error) {
    return NextResponse.json({ error: "load_failed" }, { status: 500 });
  }

  return NextResponse.json({
    attempt: data ? comoRespuesta(data as FilaIntento) : null,
    serverNow,
    persisted: true,
  });
}

export async function POST(_request: Request, { params }: { params: Promise<RouteParams> }) {
  const { courseSlug, lessonId } = await params;

  const bank = getPracticeExam(courseSlug, lessonId);
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

  // La duración sale del banco, del lado del servidor. Si viniera en el cuerpo
  // de la petición, el examen duraría lo que el cliente quisiera.
  const ahora = Date.now();
  const expiresAt = new Date(ahora + bank.durationMinutes * 60_000).toISOString();

  const { data, error } = await supabase
    .from("exam_attempts")
    .insert({
      user_id: user.id,
      course_slug: courseSlug,
      lesson_id: lessonId,
      started_at: new Date(ahora).toISOString(),
      expires_at: expiresAt,
      bank_version: bank.version,
    })
    .select(COLUMNAS)
    .single();

  if (error) {
    // El código exacto antes que la heurística: si no, un intento ya abierto se
    // reporta como "no se puede guardar".
    //
    // El índice único parcial rechaza un segundo intento abierto. No es un
    // error del usuario: pasa con dos pestañas, y el cliente lo resuelve
    // volviendo a pedir el intento que ya existe.
    if (error.code === "23505") {
      return NextResponse.json({ error: "attempt_open" }, { status: 409 });
    }
    if (faltaLaTabla(error)) {
      return NextResponse.json({ error: "not_persisted" }, { status: 503 });
    }
    return NextResponse.json({ error: "start_failed" }, { status: 500 });
  }

  return NextResponse.json({
    attempt: comoRespuesta(data as FilaIntento),
    serverNow: new Date().toISOString(),
    persisted: true,
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { courseSlug, lessonId } = await params;

  const bank = getPracticeExam(courseSlug, lessonId);
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

  const body = await request.json().catch(() => null);
  const attemptId = typeof body?.attemptId === "string" ? body.attemptId : null;
  // Se sanea contra las preguntas en español: es el idioma en el que el banco
  // está completo, y los ids de pregunta y de opción son los mismos en todas las
  // traducciones (lo exige `LocalizedQuestions` en content/courses/types.ts).
  const preguntas = bank.questions.es;
  const answers = sanitizeAnswers(preguntas, body?.answers ?? {});
  const flagged = sanitizeFlagged(preguntas, body?.flagged ?? []);
  const cursor = Number.isInteger(body?.cursor) ? (body.cursor as number) : null;

  if (!attemptId || answers === null || flagged === null || cursor === null) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (cursor < 0 || cursor > preguntas.length) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const { data: actual, error: errorLectura } = await supabase
    .from("exam_attempts")
    .select("id, expires_at, submitted_at")
    .eq("id", attemptId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (errorLectura && faltaLaTabla(errorLectura)) {
    return NextResponse.json({ error: "not_persisted" }, { status: 503 });
  }
  if (!actual) {
    return NextResponse.json({ error: "attempt_not_found" }, { status: 404 });
  }
  if (actual.submitted_at) {
    return NextResponse.json({ error: "already_submitted" }, { status: 409 });
  }
  // Sin esta guarda, las respuestas tipeadas después de la campana se guardan
  // igual, y el reloj del servidor no serviría para nada.
  if (new Date(actual.expires_at).getTime() < Date.now()) {
    return NextResponse.json({ error: "expired" }, { status: 409 });
  }

  const { error } = await supabase
    .from("exam_attempts")
    .update({ answers, flagged, cursor, updated_at: new Date().toISOString() })
    .eq("id", attemptId)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }

  return NextResponse.json({ saved: true, serverNow: new Date().toISOString() });
}
