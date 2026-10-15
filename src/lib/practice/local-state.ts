/**
 * Estado por reto que se guarda en este navegador: el borrador del código y si
 * la solución ya se desbloqueó.
 *
 * Se expone como *external store* (para `useSyncExternalStore`), igual que la
 * preferencia del panel en `AnnotatedLesson`: el servidor renderiza el valor por
 * defecto y el cliente adopta el guardado al hidratar, sin un efecto que
 * escriba estado al montar.
 *
 * La memoria es la fuente primaria y `localStorage` solo la persistencia: si el
 * almacenamiento está bloqueado (modo privado), el editor sigue funcionando y
 * simplemente no recuerda nada al recargar.
 */

const memoria = new Map<string, string | null>();
const listeners = new Set<() => void>();

export const draftKey = (slug: string) => `practice:draft:${slug}`;
export const unlockedKey = (slug: string) => `practice:unlocked:${slug}`;

export function subscribeLocal(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function readLocal(key: string): string | null {
  if (memoria.has(key)) return memoria.get(key) ?? null;
  try {
    const valor = window.localStorage.getItem(key);
    memoria.set(key, valor);
    return valor;
  } catch {
    return null;
  }
}

export function writeLocal(key: string, value: string | null) {
  memoria.set(key, value);
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Sin persistencia; la memoria alcanza para esta visita.
  }
  for (const listener of listeners) listener();
}

// --- modo entrevista ----------------------------------------------------------

/** La entrevista en curso de un reto suelto: `{ id, startedAt }`. */
export const interviewKey = (slug: string) => `practice:interview:${slug}`;

/** El resultado final de un reto dentro de una entrevista o simulacro. */
export const finishedKey = (slug: string, sessionKey: string) =>
  `practice:finished:${slug}@${sessionKey}`;

/** El borrador de un reto dentro de una entrevista: no pisa el de práctica. */
export const sessionDraftKey = (slug: string, sessionKey: string) =>
  `${draftKey(slug)}@${sessionKey}`;

/** Un simulacro: `{ startedAt, ended }`. */
export const mockKey = (mockId: string) => `practice:mock:${mockId}`;

/** Lee un valor JSON guardado con `writeLocalJson`; null si no hay o está roto. */
export function parseLocalJson<T>(raw: string | null): T | null {
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeLocalJson(key: string, value: unknown) {
  writeLocal(key, value === null ? null : JSON.stringify(value));
}

/** Un id corto para una entrevista o un simulacro. */
export function newSessionId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
