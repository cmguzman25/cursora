import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getChallenge } from "@content/challenges/registry";
import type { Challenge } from "@content/challenges/types";
import {
  aResumen,
  COLUMNAS_ENTREGA,
  esTablaFaltante,
  LIMITE_HISTORIAL,
  TABLA_ENTREGAS,
  validarEntrega,
} from "@/lib/practice/submissions";

/**
 * Las entregas de un reto.
 *
 *   GET  → historial (las últimas `LIMITE_HISTORIAL`) y contadores.
 *   POST → registra una entrega (un "Enviar"). Los "Ejecutar" no se guardan.
 *
 * `persisted: false` en el GET significa que no se pudo leer (sin sesión o sin
 * la migración 0007): la UI esconde el historial en vez de mostrarlo vacío.
 */

interface RouteParams {
  challengeSlug: string;
}

function totalDeCasos(challenge: Challenge): number {
  const ev = challenge.evaluation;
  return ev.kind === "sql-query" ? ev.datasets.length : ev.tests.length;
}

export async function GET(_request: Request, { params }: { params: Promise<RouteParams> }) {
  const { challengeSlug } = await params;
  if (!getChallenge(challengeSlug)) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const vacio = { submissions: [], attempts: 0, solved: 0, persisted: false };
  if (!user) return NextResponse.json(vacio);

  // El historial viene limitado, pero los contadores son sobre todas las
  // entregas: por eso son dos consultas. Las de conteo no traen filas.
  const [historial, intentos, resueltos] = await Promise.all([
    supabase
      .from(TABLA_ENTREGAS)
      .select(COLUMNAS_ENTREGA)
      .eq("user_id", user.id)
      .eq("challenge_slug", challengeSlug)
      .order("created_at", { ascending: false })
      .limit(LIMITE_HISTORIAL),
    supabase
      .from(TABLA_ENTREGAS)
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("challenge_slug", challengeSlug),
    supabase
      .from(TABLA_ENTREGAS)
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("challenge_slug", challengeSlug)
      .eq("passed", true),
  ]);

  const error = historial.error ?? intentos.error ?? resueltos.error;
  if (error && esTablaFaltante(error)) return NextResponse.json(vacio);
  if (error) return NextResponse.json({ error: "load_failed" }, { status: 500 });

  const submissions = (historial.data ?? []).map((fila) => aResumen(fila));

  return NextResponse.json({
    submissions,
    attempts: intentos.count ?? 0,
    solved: resueltos.count ?? 0,
    persisted: true,
  });
}

export async function POST(request: Request, { params }: { params: Promise<RouteParams> }) {
  const { challengeSlug } = await params;
  const challenge = getChallenge(challengeSlug);
  if (!challenge) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const entrega = validarEntrega(body, totalDeCasos(challenge));
  if (!entrega) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "not_authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from(TABLA_ENTREGAS)
    .insert({
      user_id: user.id,
      challenge_slug: challengeSlug,
      language: challenge.language,
      code: entrega.code,
      passed_cases: entrega.passedCases,
      total_cases: entrega.totalCases,
      passed: entrega.passedCases === entrega.totalCases,
      mode: entrega.mode,
      duration_seconds: entrega.durationSeconds,
      session_id: entrega.sessionId,
    })
    .select(COLUMNAS_ENTREGA)
    .single();

  if (error) {
    if (esTablaFaltante(error)) {
      return NextResponse.json({ error: "not_persisted" }, { status: 503 });
    }
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }

  return NextResponse.json({ submission: aResumen(data) });
}
