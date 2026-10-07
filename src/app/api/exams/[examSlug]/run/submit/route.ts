import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getExamBank } from "@content/exams/registry";
import { sanitizeAnswers } from "@/lib/exams/answers";
import { toGradableExam } from "@/lib/exams/generated";
import { gradeAttempt, isAnswerCorrect, type ExamAnswers } from "@/lib/exams/grading";
import { tablaFaltante } from "@/lib/exams/persistence";
import { registrarResultados } from "@/lib/exams/question-results";
import { TABLA_RENDIDAS } from "@/lib/exams/runs";

/**
 * Entrega y calificación de una rendida de `/exams`. **El servidor califica**: el
 * cliente manda lo que marcó, y la nota la calcula y la guarda esta ruta. Una nota
 * que llega en el cuerpo de la petición no es una nota.
 *
 * Acepta dos formas, con el mismo calificador para las dos:
 *   { attemptId }  → con sesión; se califica y se guarda.
 *   { answers }    → sin sesión o sin la tabla; se califica y se devuelve, sin
 *                    guardar nada.
 *
 * Es idempotente: si la rendida ya estaba entregada, devuelve la nota guardada sin
 * volver a calificar. Hace falta porque la autoentrega del reloj y un toque en
 * "Entregar" pueden llegar casi juntos, y dos notas distintas para la misma
 * rendida serían imposibles de explicar.
 *
 * Al entregar también alimenta `exam_question_results`, para que el historial de
 * fallos sea el mismo sin importar en qué modo se falló.
 */

interface RouteParams {
  examSlug: string;
}

/** Margen después del vencimiento, para no castigar la latencia de la red. */
const GRACIA_MS = 60_000;

export async function POST(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { examSlug } = await params;

  const bank = getExamBank(examSlug);
  if (!bank) {
    return NextResponse.json({ error: "no_exam" }, { status: 404 });
  }

  const examen = toGradableExam(bank);
  const preguntas = examen.questions;

  const body = await request.json().catch(() => null);
  const attemptId = typeof body?.attemptId === "string" ? body.attemptId : null;
  const autoSubmitted = body?.autoSubmitted === true;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const sinPersistir = () => {
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
  };

  // --- sin sesión, o sin rendida guardada: se califica y no se persiste ---
  if (!user || !attemptId) {
    return sinPersistir();
  }

  // --- con sesión ---------------------------------------------------------
  const { data: fila, error: errorLectura } = await supabase
    .from(TABLA_RENDIDAS)
    .select(
      "id, mode, expires_at, answers, submitted_at, auto_submitted, raw_correct, raw_total, scaled_score, passed, domain_scores, bank_version",
    )
    .eq("id", attemptId)
    .eq("user_id", user.id)
    .eq("exam_slug", examSlug)
    .maybeSingle();

  if (errorLectura && tablaFaltante(errorLectura, TABLA_RENDIDAS)) {
    return sinPersistir();
  }
  if (!fila) {
    return NextResponse.json({ error: "run_not_found" }, { status: 404 });
  }

  // Ya entregada: se devuelve lo guardado sin recalificar.
  if (fila.submitted_at && fila.scaled_score !== null) {
    const guardadas = (fila.answers as ExamAnswers | null) ?? {};
    return NextResponse.json({
      result: {
        rawCorrect: fila.raw_correct ?? 0,
        rawTotal: fila.raw_total ?? 0,
        scaledScore: fila.scaled_score,
        passed: fila.passed ?? false,
        domainScores: fila.domain_scores ?? [],
        unanswered: Math.max(0, (fila.raw_total ?? 0) - Object.keys(guardadas).length),
      },
      answers: guardadas,
      autoSubmitted: fila.auto_submitted,
      persisted: true,
      alreadySubmitted: true,
    });
  }

  // Las respuestas que vienen en el cuerpo son el último autoguardado, que puede
  // no haber llegado. En modo examen solo se aceptan dentro del plazo más la
  // gracia: pasado eso vale lo que ya estaba guardado, que es lo que el alumno
  // tenía cuando sonó la campana. En modo estudio no hay plazo.
  const vencimiento = fila.expires_at ? new Date(fila.expires_at).getTime() : null;
  const aTiempo = vencimiento === null || Date.now() <= vencimiento + GRACIA_MS;

  const delCuerpo = sanitizeAnswers(preguntas, body?.answers ?? {});
  if (delCuerpo === null) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const answers: ExamAnswers = aTiempo ? delCuerpo : ((fila.answers as ExamAnswers | null) ?? {});

  const result = gradeAttempt(examen, answers);
  const vencido = vencimiento !== null && Date.now() > vencimiento;

  // `.is("submitted_at", null)` hace de guarda contra la doble entrega: si otra
  // petición llegó primero, esta no actualiza ninguna fila.
  const { data: actualizadas, error } = await supabase
    .from(TABLA_RENDIDAS)
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
    .is("submitted_at", null)
    .select("id");

  if (error) {
    return NextResponse.json({ error: "submit_failed" }, { status: 500 });
  }

  // Solo quien ganó la carrera de la entrega registra el historial, para que una
  // doble entrega no cuente los fallos dos veces.
  let resultsPersisted = true;
  if ((actualizadas?.length ?? 0) > 0) {
    // Solo las preguntas que el alumno llegó a responder. Dejar una en blanco
    // cuenta como error para la nota, pero no es un fallo que enseñe nada: no
    // eligió mal, se quedó sin tiempo.
    const respondidas = preguntas
      .filter((pregunta) => (answers[pregunta.id] ?? []).length > 0)
      .map((pregunta) => ({
        questionId: pregunta.id,
        selected: answers[pregunta.id] ?? [],
        correct: isAnswerCorrect(answers[pregunta.id] ?? [], pregunta),
      }));

    resultsPersisted = await registrarResultados(
      supabase,
      user.id,
      examSlug,
      (fila.bank_version as number | null) ?? bank.version,
      respondidas,
    ).catch(() => false);
  }

  return NextResponse.json({
    result,
    answers,
    autoSubmitted: autoSubmitted || vencido,
    persisted: true,
    resultsPersisted,
  });
}
