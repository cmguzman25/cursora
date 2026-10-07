import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPracticeExam } from "@content/courses/registry";
import { sanitizeAnswers } from "@/lib/exams/answers";
import { gradeAttempt, type ExamAnswers } from "@/lib/exams/grading";

/**
 * Entrega y calificación de un simulacro. **El servidor califica**: el cliente
 * manda lo que marcó, y la nota la calcula y la guarda esta ruta. Una nota que
 * llega en el cuerpo de la petición no es una nota.
 *
 * Acepta dos formas, y usa el mismo calificador para las dos:
 *   { attemptId }  → con sesión; las respuestas se leen de la fila, y lo que
 *                    venga en `answers` se toma como el último autoguardado.
 *   { answers }    → sin sesión; se califica y se devuelve, sin guardar nada.
 *
 * Es idempotente: si el intento ya estaba entregado, devuelve la nota guardada
 * sin volver a calificar. Hace falta porque la autoentrega del reloj y un toque
 * en "Entregar" pueden llegar casi juntos, y dos notas distintas para el mismo
 * intento serían imposibles de explicar.
 */

interface RouteParams {
  courseSlug: string;
  lessonId: string;
}

/** Margen después del vencimiento, para no castigar la latencia de la red. */
const GRACIA_MS = 60_000;

function faltaLaTabla(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return error.code === "42P01" || (error.message ?? "").includes("exam_attempts");
}

export async function POST(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { courseSlug, lessonId } = await params;

  const bank = getPracticeExam(courseSlug, lessonId);
  if (!bank) {
    return NextResponse.json({ error: "no_exam" }, { status: 404 });
  }

  // El saneador y el calificador trabajan sobre el array de preguntas del idioma
  // que se rindió, no sobre el mapa de traducciones del banco (ver `GradableExam`
  // en src/lib/exams/grading.ts). Acá es siempre el español: es el idioma en el
  // que todo banco está completo, y el único con el que se puede calificar un
  // intento viejo sin que la nota dependa de qué traducciones se agregaron
  // después.
  const preguntas = bank.questions.es;
  const examen = { ...bank, questions: preguntas };

  const body = await request.json().catch(() => null);
  const attemptId = typeof body?.attemptId === "string" ? body.attemptId : null;
  const autoSubmitted = body?.autoSubmitted === true;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // --- sin sesión, o sin intento guardado: se califica y no se persiste ---
  if (!user || !attemptId) {
    const answers = sanitizeAnswers(preguntas, body?.answers ?? {});
    if (answers === null) {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }
    return NextResponse.json({
      result: gradeAttempt(examen, answers),
      answers,
      autoSubmitted,
      persisted: false,
    });
  }

  // --- con sesión ---------------------------------------------------------
  const { data: fila, error: errorLectura } = await supabase
    .from("exam_attempts")
    .select(
      "id, expires_at, answers, submitted_at, auto_submitted, raw_correct, raw_total, scaled_score, passed, domain_scores",
    )
    .eq("id", attemptId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (errorLectura && faltaLaTabla(errorLectura)) {
    const answers = sanitizeAnswers(preguntas, body?.answers ?? {});
    if (answers === null) {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }
    return NextResponse.json({
      result: gradeAttempt(examen, answers),
      answers,
      autoSubmitted,
      persisted: false,
    });
  }
  if (!fila) {
    return NextResponse.json({ error: "attempt_not_found" }, { status: 404 });
  }

  // Ya entregado: se devuelve lo guardado sin recalificar.
  if (fila.submitted_at && fila.scaled_score !== null) {
    return NextResponse.json({
      result: {
        rawCorrect: fila.raw_correct ?? 0,
        rawTotal: fila.raw_total ?? 0,
        scaledScore: fila.scaled_score,
        passed: fila.passed ?? false,
        domainScores: fila.domain_scores ?? [],
        unanswered: Math.max(0, (fila.raw_total ?? 0) - Object.keys(fila.answers ?? {}).length),
      },
      answers: fila.answers ?? {},
      autoSubmitted: fila.auto_submitted,
      persisted: true,
      alreadySubmitted: true,
    });
  }

  // Las respuestas que vienen en el cuerpo son el último autoguardado, que
  // puede no haber llegado. Solo se aceptan dentro del plazo más la gracia:
  // pasado eso vale lo que ya estaba guardado, que es lo que el alumno tenía
  // cuando sonó la campana.
  const vencimiento = new Date(fila.expires_at).getTime();
  const aTiempo = Date.now() <= vencimiento + GRACIA_MS;

  const delCuerpo = sanitizeAnswers(preguntas, body?.answers ?? {});
  if (delCuerpo === null) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const answers: ExamAnswers = aTiempo
    ? delCuerpo
    : ((fila.answers as ExamAnswers | null) ?? {});

  const result = gradeAttempt(examen, answers);
  const vencido = Date.now() > vencimiento;

  const { error } = await supabase
    .from("exam_attempts")
    .update({
      answers,
      submitted_at: new Date().toISOString(),
      auto_submitted: autoSubmitted || vencido,
      raw_correct: result.rawCorrect,
      raw_total: result.rawTotal,
      scaled_score: result.scaledScore,
      passed: result.passed,
      domain_scores: result.domainScores,
      updated_at: new Date().toISOString(),
    })
    .eq("id", attemptId)
    .eq("user_id", user.id)
    .is("submitted_at", null);

  if (error) {
    return NextResponse.json({ error: "submit_failed" }, { status: 500 });
  }

  return NextResponse.json({
    result,
    answers,
    autoSubmitted: autoSubmitted || vencido,
    persisted: true,
  });
}
