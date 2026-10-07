import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getExamBank } from "@content/exams/registry";
import { toGradableExam } from "@/lib/exams/generated";
import { tablaFaltante } from "@/lib/exams/persistence";

/**
 * Las preguntas marcadas para repasar después.
 *
 * Una por fila en `exam_review_flags`, y no un array dentro de la rendida, por
 * dos motivos: tienen que sobrevivir a la entrega —el momento en que más falta
 * hace volver a una pregunta es justo después de haberla marcado sin tiempo para
 * pensarla— y tienen que ser las mismas en los dos modos.
 *
 * Es una ruta por pregunta y no un PUT del array completo. Un PUT del array
 * perdería marcas con dos pestañas abiertas, y lo que la interfaz hace es
 * exactamente alternar una.
 *
 *   GET    → los ids marcados de este examen.
 *   POST   → marca una. Idempotente: marcar dos veces no es un error.
 *   DELETE → la desmarca.
 */

interface RouteParams {
  examSlug: string;
}

const TABLA = "exam_review_flags";

/** Rechaza ids que no existen en el banco, para que la tabla no junte basura. */
function preguntaValida(examSlug: string, questionId: unknown): boolean {
  if (typeof questionId !== "string") return false;
  const bank = getExamBank(examSlug);
  if (!bank) return false;
  return toGradableExam(bank).questions.some((q) => q.id === questionId);
}

export async function GET(_request: Request, { params }: { params: Promise<RouteParams> }) {
  const { examSlug } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ questionIds: [], persisted: false });
  }

  const { data, error } = await supabase
    .from(TABLA)
    .select("question_id")
    .eq("user_id", user.id)
    .eq("exam_slug", examSlug);

  if (error && tablaFaltante(error, TABLA)) {
    return NextResponse.json({ questionIds: [], persisted: false });
  }
  if (error) {
    return NextResponse.json({ error: "load_failed" }, { status: 500 });
  }

  return NextResponse.json({
    questionIds: (data ?? []).map((fila) => fila.question_id as string),
    persisted: true,
  });
}

export async function POST(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { examSlug } = await params;

  const body = await request.json().catch(() => null);
  if (!preguntaValida(examSlug, body?.questionId)) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  // `upsert` y no `insert`: marcar algo que ya estaba marcado es lo que pasa
  // cuando hay dos pestañas abiertas, y no tiene por qué ser un error.
  const { error } = await supabase
    .from(TABLA)
    .upsert(
      { user_id: user.id, exam_slug: examSlug, question_id: body.questionId as string },
      { onConflict: "user_id,exam_slug,question_id" },
    );

  if (error) {
    if (tablaFaltante(error, TABLA)) {
      return NextResponse.json({ error: "not_persisted" }, { status: 503 });
    }
    return NextResponse.json({ error: "flag_failed" }, { status: 500 });
  }

  return NextResponse.json({ flagged: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { examSlug } = await params;

  const questionId = new URL(request.url).searchParams.get("questionId");
  if (!preguntaValida(examSlug, questionId)) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const { error } = await supabase
    .from(TABLA)
    .delete()
    .eq("user_id", user.id)
    .eq("exam_slug", examSlug)
    .eq("question_id", questionId as string);

  if (error) {
    if (tablaFaltante(error, TABLA)) {
      return NextResponse.json({ error: "not_persisted" }, { status: 503 });
    }
    return NextResponse.json({ error: "unflag_failed" }, { status: 500 });
  }

  return NextResponse.json({ flagged: false });
}
