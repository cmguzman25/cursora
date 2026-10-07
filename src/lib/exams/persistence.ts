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

  // 42P01 es `undefined_table` de PostgreSQL, y es la señal buena.
  if (error.code === "42P01") return true;

  // El chequeo del mensaje es una red de seguridad por si PostgREST no propaga
  // el código, y tiene que ser **exacto**.
  //
  // Antes decía `message.includes(tabla)`, y eso provocó un error real: el
  // mensaje de una violación del índice único `exam_runs_one_open` contiene la
  // subcadena `exam_runs`, así que un intento ya abierto —que debe devolver 409
  // para que el cliente lo retome— se clasificaba como "la tabla no existe" y
  // devolvía 503. El alumno veía "no estamos consiguiendo guardar tus
  // respuestas" mientras sus respuestas se guardaban perfectamente.
  //
  // La moraleja, para quien agregue tablas: cualquier índice o restricción cuyo
  // nombre empiece por el de la tabla rompía la versión anterior.
  const mensaje = error.message ?? "";
  return (
    mensaje.includes(`relation "${tabla}" does not exist`) ||
    mensaje.includes(`relation "public.${tabla}" does not exist`)
  );
}
