import type { SupabaseClient } from "@supabase/supabase-js";
import { tablaFaltante } from "./persistence";

/**
 * El historial de fallos por pregunta de los exámenes de `/exams`.
 *
 * Lo alimentan los dos modos, por caminos distintos y por una razón concreta:
 * el modo examen registra todo de golpe al entregar, y el modo estudio **nunca
 * entrega**, así que registra pregunta por pregunta en el momento en que el
 * alumno marca. Sin esto último, un fallo cometido repasando no quedaría en
 * ninguna parte.
 */

export const TABLA = "exam_question_results";

export const COLUMNAS =
  "question_id, times_answered, times_wrong, last_wrong_at, last_correct_at, last_selected, bank_version";

export interface FilaDeResultado {
  question_id: string;
  times_answered: number;
  times_wrong: number;
  last_wrong_at: string | null;
  last_correct_at: string | null;
  last_selected: string[] | null;
  bank_version: number;
}

export interface ResultadoDePregunta {
  questionId: string;
  /** Lo que marcó. Se guarda para que el repaso diga "elegiste B, y B falla porque…". */
  selected: string[];
  correct: boolean;
}

/**
 * Si una pregunta sigue pendiente de repaso: se falló alguna vez y no se acertó
 * después.
 *
 * Se decide comparando dos marcas de tiempo y no con un booleano "ya la tengo",
 * porque el booleano pierde el orden: quien acierta en marzo y vuelve a fallar en
 * mayo sigue necesitando repasar, y con un booleano habría que acordarse de
 * bajarlo en el camino de escritura del fallo.
 */
export function siguePendiente(fila: FilaDeResultado): boolean {
  if (fila.times_wrong === 0) return false;
  if (!fila.last_wrong_at) return false;
  if (!fila.last_correct_at) return true;
  return new Date(fila.last_correct_at) < new Date(fila.last_wrong_at);
}

/**
 * Acumula los resultados en `exam_question_results`.
 *
 * **El incremento no es atómico**, y conviene decirlo en vez de dar a entender lo
 * contrario: el proyecto no tiene service-role key y `supabase-js` no sabe
 * expresar `times_wrong = times_wrong + 1` en un upsert, así que esto lee y
 * después escribe. Dos escrituras simultáneas sobre la misma pregunta podrían
 * perder un incremento. Es inocuo acá: la entrega es idempotente, el modo estudio
 * escribe de a una pregunta, y nadie suma estas columnas para nada que dependa de
 * que estén exactas — se usan para decidir si una pregunta aparece en el repaso, y
 * para eso alcanza con que sean mayores que cero.
 *
 * Todas las filas del lote llevan **las mismas claves**, incluidas las dos marcas
 * de tiempo con su valor anterior cuando no cambian. PostgREST arma un único
 * `INSERT ... ON CONFLICT DO UPDATE` para el lote entero a partir de las claves
 * que ve, así que un lote con objetos de formas distintas escribiría columnas que
 * no corresponden.
 *
 * Devuelve false si la tabla no existe todavía, para que quien llama pueda avisar
 * en vez de romper.
 */
export async function registrarResultados(
  supabase: SupabaseClient,
  userId: string,
  examSlug: string,
  bankVersion: number,
  resultados: readonly ResultadoDePregunta[],
): Promise<boolean> {
  if (resultados.length === 0) return true;

  const { data: previas, error: errorLectura } = await supabase
    .from(TABLA)
    .select("question_id, times_answered, times_wrong, last_wrong_at, last_correct_at")
    .eq("user_id", userId)
    .eq("exam_slug", examSlug)
    .in(
      "question_id",
      resultados.map((r) => r.questionId),
    );

  if (errorLectura) {
    if (tablaFaltante(errorLectura, TABLA)) return false;
    throw errorLectura;
  }

  const porId = new Map((previas ?? []).map((fila) => [fila.question_id as string, fila]));
  const ahora = new Date().toISOString();

  const filas = resultados.map((resultado) => {
    const previa = porId.get(resultado.questionId);
    const vecesRespondida = (previa?.times_answered as number | undefined) ?? 0;
    const vecesFallada = (previa?.times_wrong as number | undefined) ?? 0;
    const falloAntes = (previa?.last_wrong_at as string | null | undefined) ?? null;
    const aciertoAntes = (previa?.last_correct_at as string | null | undefined) ?? null;

    return {
      user_id: userId,
      exam_slug: examSlug,
      question_id: resultado.questionId,
      times_answered: vecesRespondida + 1,
      times_wrong: vecesFallada + (resultado.correct ? 0 : 1),
      last_wrong_at: resultado.correct ? falloAntes : ahora,
      last_correct_at: resultado.correct ? ahora : aciertoAntes,
      last_selected: resultado.selected,
      bank_version: bankVersion,
    };
  });

  const { error } = await supabase
    .from(TABLA)
    .upsert(filas, { onConflict: "user_id,exam_slug,question_id" });

  if (error) {
    if (tablaFaltante(error, TABLA)) return false;
    throw error;
  }

  return true;
}
