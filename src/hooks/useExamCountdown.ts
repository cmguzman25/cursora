"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Cuenta regresiva de un simulacro.
 *
 * El reloj es una fuente externa, así que se lee con `useSyncExternalStore` y
 * no con un `useState` que un efecto va empujando. Eso resuelve de una vez
 * tres cosas que con estado propio salen mal:
 *
 * 1. **No se decrementa un contador**: cada lectura se calcula contra tiempo
 *    absoluto. Un intervalo en una pestaña de fondo se estrangula a un tic por
 *    minuto y una laptop suspendida no ejecuta ninguno, así que un contador que
 *    resta de a uno se quedaría minutos atrás de la realidad.
 *
 * 2. **Se corrige el desfase del reloj local** con la hora que informó el
 *    servidor. El vencimiento lo fijó el servidor, así que comparar contra
 *    `Date.now()` sin corregir dejaría que un reloj de sistema adelantado
 *    cambiara el tiempo disponible.
 *
 * 3. **La lectura se cuantiza a segundos enteros**, que es lo que hace estable
 *    el valor que devuelve: el intervalo corre cada 250 ms para reaccionar
 *    rápido, pero React solo re-renderiza cuando cambia el segundo.
 */

/** Segundo actual según el reloj del navegador. 0 en el servidor. */
function useSegundoActual(activo: boolean): number {
  const subscribe = useCallback(
    (listener: () => void) => {
      if (!activo) return () => {};

      const intervalo = setInterval(listener, 250);
      // Al volver a la pestaña se recalcula en el acto, para no esperar hasta
      // un segundo cuando el alumno regresa y el tiempo ya se terminó.
      const alVolver = () => {
        if (document.visibilityState === "visible") listener();
      };
      document.addEventListener("visibilitychange", alVolver);

      return () => {
        clearInterval(intervalo);
        document.removeEventListener("visibilitychange", alVolver);
      };
    },
    [activo],
  );

  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => 0,
  );
}

export function useExamCountdown(
  expiresAtIso: string | null,
  skewMs: number,
): { remainingMs: number; isExpired: boolean } {
  const vencimiento = expiresAtIso ? new Date(expiresAtIso).getTime() : null;
  const segundo = useSegundoActual(vencimiento !== null);

  // El 0 es el valor del servidor y del primer render de hidratación: todavía
  // no se sabe la hora, y declarar vencido un examen en ese instante
  // dispararía una autoentrega apenas carga la página.
  const horaConocida = segundo > 0;
  const restante = vencimiento === null || !horaConocida ? 0 : vencimiento - (segundo * 1000 + skewMs);

  return {
    remainingMs: Math.max(0, restante),
    isExpired: vencimiento !== null && horaConocida && restante <= 0,
  };
}

/** mm:ss, o h:mm:ss cuando pasa de la hora. */
export function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const horas = Math.floor(total / 3600);
  const minutos = Math.floor((total % 3600) / 60);
  const segundos = total % 60;

  const dos = (n: number) => String(n).padStart(2, "0");
  return horas > 0 ? `${horas}:${dos(minutos)}:${dos(segundos)}` : `${dos(minutos)}:${dos(segundos)}`;
}
