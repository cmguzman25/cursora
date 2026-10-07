import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getExamBank } from "@content/exams/registry";
import { toGradableExam } from "@/lib/exams/generated";
import { isAnswerCorrect } from "@/lib/exams/grading";
import { registrarResultados } from "@/lib/exams/question-results";

/**
 * El registro pregunta por pregunta del **modo estudio**.
 *
 * Existe porque el modo estudio nunca entrega: el alumno revela una respuesta,
 * aprende algo y en cualquier momento cierra la pestaña. Si el historial de
 * fallos solo se escribiera al entregar, repasar no dejaría ningún rastro — y el
 * pedido era justamente que los fallos queden registrados.
 *
 * **El servidor decide si estuvo bien.** El cuerpo trae lo que el alumno marcó, no
 * si acertó: un cliente que informara su propio veredicto podría vaciarse la lista
 * de repaso diciendo que acertó todo.
 */

interface RouteParams {
  examSlug: string;
}

export async function POST(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { examSlug } = await params;

  const bank = getExamBank(examSlug);
  if (!bank) {
    return NextResponse.json({ error: "no_exam" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const questionId = typeof body?.questionId === "string" ? body.questionId : null;
  const selected = Array.isArray(body?.selected) ? body.selected : null;

  if (!questionId || !selected || selected.some((id: unknown) => typeof id !== "string")) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const pregunta = toGradableExam(bank).questions.find((q) => q.id === questionId);
  if (!pregunta) {
    return NextResponse.json({ error: "unknown_question" }, { status: 400 });
  }

  const idsValidos = new Set(pregunta.options.map((o) => o.id));
  const marcadas = [...new Set(selected as string[])];
  if (marcadas.length === 0 || marcadas.some((id) => !idsValidos.has(id))) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const correct = isAnswerCorrect(marcadas, pregunta);

  const persisted = await registrarResultados(supabase, user.id, examSlug, bank.version, [
    { questionId, selected: marcadas, correct },
  ]).catch(() => false);

  if (!persisted) {
    return NextResponse.json({ error: "not_persisted" }, { status: 503 });
  }

  return NextResponse.json({ correct, persisted: true });
}
