import { createClient } from "@/lib/supabase/server";
import type { ExamQuestionWithTopic } from "@content/exams/types";
import { tablaFaltante } from "./persistence";
import { siguePendiente, COLUMNAS as COLUMNAS_RESULTADO, TABLA as TABLA_RESULTADOS, type FilaDeResultado } from "./question-results";
import { TABLA_RENDIDAS, type ModoDeRendida } from "./runs";

/**
 * Las lecturas que hacen las páginas de `/exams` directamente contra Supabase.
 *
 * Las páginas son componentes de servidor, así que no necesitan una ruta de API
 * para leer: la sesión ya está en las cookies y las políticas de RLS hacen el
 * resto. Las rutas de `/api/exams/` existen solo para lo que el cliente **muta**.
 *
 * Todas estas funciones devuelven algo utilizable cuando la tabla todavía no
 * existe —la migración 0006 se corre a mano—, para que la sección se pueda ver
 * antes de haberla corrido.
 */

/** Una rendida sin entregar, para ofrecer continuarla en la pantalla previa. */
export interface RendidaAbiertaDB {
  mode: ModoDeRendida;
  expiresAt: string | null;
  answered: number;
}

export async function leerRendidasAbiertas(examSlug: string): Promise<RendidaAbiertaDB[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from(TABLA_RENDIDAS)
    .select("mode, expires_at, answers")
    .eq("user_id", user.id)
    .eq("exam_slug", examSlug)
    .is("submitted_at", null);

  if (error) return [];

  return (data ?? []).map((fila) => ({
    mode: fila.mode as ModoDeRendida,
    expiresAt: (fila.expires_at as string | null) ?? null,
    answered: Object.keys((fila.answers as Record<string, string[]> | null) ?? {}).length,
  }));
}

export interface PreguntaFalladaDB {
  questionId: string;
  missCount: number;
  lastSelected: string[];
}

export interface RepasoDeExamen {
  wrong: PreguntaFalladaDB[];
  /** Falladas cuyo id ya no existe en el banco, por un cambio de versión. */
  droppedCount: number;
}

/**
 * Las preguntas falladas y todavía pendientes de un examen.
 *
 * Se filtran contra los ids que el banco tiene **hoy**: una pregunta registrada
 * contra la versión 1 y borrada en la 3 no tiene enunciado que mostrar. Se cuentan
 * aparte para poder decirlo, en vez de desaparecer sin explicación.
 */
export async function leerRepaso(
  examSlug: string,
  questions: readonly ExamQuestionWithTopic[],
): Promise<RepasoDeExamen> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { wrong: [], droppedCount: 0 };

  const { data, error } = await supabase
    .from(TABLA_RESULTADOS)
    .select(COLUMNAS_RESULTADO)
    .eq("user_id", user.id)
    .eq("exam_slug", examSlug)
    .gt("times_wrong", 0)
    .order("last_wrong_at", { ascending: false });

  if (error) return { wrong: [], droppedCount: 0 };

  const idsDelBanco = new Set(questions.map((pregunta) => pregunta.id));
  const pendientes = ((data ?? []) as unknown as FilaDeResultado[]).filter(siguePendiente);

  return {
    wrong: pendientes
      .filter((fila) => idsDelBanco.has(fila.question_id))
      .map((fila) => ({
        questionId: fila.question_id,
        missCount: fila.times_wrong,
        lastSelected: fila.last_selected ?? [],
      })),
    droppedCount: pendientes.filter((fila) => !idsDelBanco.has(fila.question_id)).length,
  };
}

/**
 * Cuántas preguntas tiene pendientes de repaso el alumno en cada examen.
 *
 * Dos consultas para todo el catálogo, no una por examen: la tabla está indexada
 * por `(user_id, exam_slug)` y agrupar en JS sale más barato que N viajes.
 *
 * Una pregunta fallada **y** marcada cuenta una sola vez, que es lo que el número
 * de la tarjeta promete: cuántas preguntas te esperan.
 *
 * Devuelve null si las tablas no existen todavía, para distinguir "no tenés nada
 * pendiente" de "no lo pudimos averiguar".
 */
export async function contarPendientesPorExamen(): Promise<Record<string, number> | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [resultados, marcas] = await Promise.all([
    supabase
      .from(TABLA_RESULTADOS)
      .select("exam_slug, question_id, times_wrong, last_wrong_at, last_correct_at")
      .eq("user_id", user.id)
      .gt("times_wrong", 0),
    supabase.from("exam_review_flags").select("exam_slug, question_id").eq("user_id", user.id),
  ]);

  if (
    (resultados.error && tablaFaltante(resultados.error, TABLA_RESULTADOS)) ||
    (marcas.error && tablaFaltante(marcas.error, "exam_review_flags"))
  ) {
    return null;
  }
  if (resultados.error || marcas.error) return null;

  const porExamen = new Map<string, Set<string>>();
  const sumar = (examSlug: string, questionId: string) => {
    const actuales = porExamen.get(examSlug) ?? new Set<string>();
    actuales.add(questionId);
    porExamen.set(examSlug, actuales);
  };

  for (const fila of (resultados.data ?? []) as unknown as (FilaDeResultado & {
    exam_slug: string;
  })[]) {
    // `siguePendiente` solo lee las tres columnas que sí se seleccionaron; los
    // campos que faltan no participan de la decisión.
    if (siguePendiente({ ...fila, times_answered: 0, last_selected: null, bank_version: 1 })) {
      sumar(fila.exam_slug, fila.question_id);
    }
  }
  for (const fila of marcas.data ?? []) {
    sumar(fila.exam_slug as string, fila.question_id as string);
  }

  return Object.fromEntries([...porExamen].map(([slug, ids]) => [slug, ids.size]));
}
