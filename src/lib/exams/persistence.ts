/**
 * Las migraciones de este proyecto se corren a mano en el SQL Editor de
 * Supabase, así que una tabla puede no existir todavía cuando el código que la
 * usa ya está desplegado.
 *
 * La política en todo el proyecto es degradar, no romper: si la tabla falta, el
 * examen se puede rendir igual —en memoria— y la interfaz avisa que no se va a
 * guardar. Para eso hay que distinguir "la tabla no existe" de cualquier otro
 * error de base, que sí es un 500.
 */
export function tablaFaltante(
  error: { code?: string; message?: string } | null,
  tabla: string,
): boolean {
  if (!error) return false;
  // 42P01 es `undefined_table` de PostgreSQL. El chequeo del mensaje queda como
  // red de seguridad: PostgREST no siempre propaga el código.
  return error.code === "42P01" || (error.message ?? "").includes(tabla);
}
