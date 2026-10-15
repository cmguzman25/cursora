/** m:ss de una duración en segundos (el tiempo de una entrevista). */
export function formatDuration(segundos: number): string {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
