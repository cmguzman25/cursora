"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ExamAnswers, ExamResult } from "@/lib/exams/grading";

export interface ExamAttempt {
  id: string | null;
  startedAt: string;
  /**
   * Null cuando el intento no tiene reloj — el "modo estudio" de la sección
   * `/exams`. `useExamCountdown` ya trata el null como "no hay cuenta regresiva",
   * así que no hace falta ninguna rama extra para sostenerlo.
   */
  expiresAt: string | null;
  submittedAt: string | null;
  autoSubmitted: boolean;
  answers: ExamAnswers;
  flagged: string[];
  cursor: number;
  result: ExamResult | null;
}

/** Cada cuánto se vuelca el estado al servidor mientras el alumno responde. */
const AUTOGUARDADO_MS = 1500;

interface UseExamAttemptResult {
  attempt: ExamAttempt | null;
  isLoading: boolean;
  /**
   * false cuando el intento vive solo en memoria: sin sesión, o porque la
   * migración 0005 todavía no se corrió. El examen funciona igual; lo que no
   * hay es historial ni recuperación al recargar, y la interfaz lo avisa.
   */
  isPersisted: boolean;
  /** Diferencia entre el reloj del servidor y el del navegador, en ms. */
  skewMs: number;
  start: () => Promise<void>;
  /** Guarda en memoria al instante y vuelca al servidor con retardo. */
  update: (cambios: Partial<Pick<ExamAttempt, "answers" | "flagged" | "cursor">>) => void;
  submit: (opts?: { autoSubmitted?: boolean }) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

interface UseExamAttemptOptions {
  /**
   * Ruta de la API del intento, ya armada por el llamador. La arma él y no este
   * hook porque los simulacros de los cursos cuelgan de
   * `/api/courses/<slug>/lessons/<id>/exam-attempt` y los exámenes de la sección
   * `/exams` de `/api/exams/<slug>/run`: son dos jerarquías distintas, y pasar
   * las dos tuplas de claves para que el hook elija sería pedirle que sepa de
   * rutas que no le incumben.
   */
  base: string;
  /**
   * Parámetros de query que solo lleva el GET. Van aparte de `base` y no pegados
   * a mano porque la entrega se arma como `${base}/submit`: una query dentro de
   * `base` quedaría en el medio de la ruta.
   */
  query?: Record<string, string>;
  /** Minutos del intento, o null si no tiene reloj (modo estudio). */
  durationMinutes: number | null;
  /**
   * Cuerpo del POST de arranque. Los exámenes de `/exams` mandan acá el modo y la
   * duración que eligió el alumno; los simulacros de los cursos no mandan nada,
   * porque su duración la fija el banco.
   */
  startBody?: Record<string, unknown>;
}

export function useExamAttempt({
  base,
  query,
  durationMinutes,
  startBody,
}: UseExamAttemptOptions): UseExamAttemptResult {
  const sufijo = query ? `?${new URLSearchParams(query).toString()}` : "";
  const urlDeLectura = `${base}${sufijo}`;

  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPersisted, setIsPersisted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skewMs, setSkewMs] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const volcadoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const adoptar = useCallback(
    (data: { attempt: ExamAttempt | null; serverNow: string; persisted: boolean }) => {
      setAttempt(data.attempt);
      setIsPersisted(data.persisted);
      setSkewMs(new Date(data.serverNow).getTime() - Date.now());
    },
    [],
  );

  useEffect(() => {
    let cancelado = false;

    fetch(urlDeLectura)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelado || !data) return;
        adoptar(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelado) setIsLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, [urlDeLectura, adoptar]);

  const volcar = useCallback(
    (estado: ExamAttempt, persistido: boolean) => {
      if (!persistido || !estado.id || estado.submittedAt) return;
      fetch(base, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId: estado.id,
          answers: estado.answers,
          flagged: estado.flagged,
          cursor: estado.cursor,
        }),
      }).catch(() => {});
    },
    [base],
  );

  // Un cierre de pestaña no debería perder lo tipeado en el último segundo y
  // medio, así que el volcado pendiente se fuerza al salir o al ocultar. El
  // efecto se vuelve a registrar con cada cambio de `attempt`, que es lo que
  // le da acceso al estado actual sin leer una ref durante el render.
  useEffect(() => {
    if (!attempt || !isPersisted) return;

    const forzar = () => {
      if (volcadoRef.current) {
        clearTimeout(volcadoRef.current);
        volcadoRef.current = null;
      }
      volcar(attempt, isPersisted);
    };

    window.addEventListener("beforeunload", forzar);
    document.addEventListener("visibilitychange", forzar);
    return () => {
      window.removeEventListener("beforeunload", forzar);
      document.removeEventListener("visibilitychange", forzar);
    };
  }, [attempt, isPersisted, volcar]);

  // El temporizador pendiente se limpia al desmontar, para no volcar sobre un
  // componente que ya no está.
  useEffect(() => {
    return () => {
      if (volcadoRef.current) clearTimeout(volcadoRef.current);
    };
  }, []);

  // `startBody` se serializa para la lista de dependencias: un llamador que lo
  // escriba como objeto literal crearía uno nuevo en cada render, y `start`
  // cambiaría de identidad para siempre.
  const cuerpoDeArranque = startBody ? JSON.stringify(startBody) : null;

  const start = useCallback(async () => {
    setError(null);

    const response = await fetch(
      base,
      cuerpoDeArranque
        ? { method: "POST", headers: { "Content-Type": "application/json" }, body: cuerpoDeArranque }
        : { method: "POST" },
    ).catch(() => null);

    // Sin sesión, o sin la tabla: el examen corre en memoria. El reloj lo pone
    // el cliente porque no hay otro, y la interfaz avisa que no se va a guardar.
    if (!response || response.status === 401 || response.status === 503) {
      const ahora = Date.now();
      setAttempt({
        id: null,
        startedAt: new Date(ahora).toISOString(),
        expiresAt:
          durationMinutes === null
            ? null
            : new Date(ahora + durationMinutes * 60_000).toISOString(),
        submittedAt: null,
        autoSubmitted: false,
        answers: {},
        flagged: [],
        cursor: 0,
        result: null,
      });
      setIsPersisted(false);
      setSkewMs(0);
      return;
    }

    // Ya había un intento abierto (dos pestañas): se adopta el que existe en
    // vez de mostrar un error.
    if (response.status === 409) {
      const data = await fetch(urlDeLectura)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null);
      if (data) adoptar(data);
      return;
    }

    if (!response.ok) {
      setError("start_failed");
      return;
    }

    adoptar(await response.json());
  }, [base, urlDeLectura, cuerpoDeArranque, durationMinutes, adoptar]);

  const update = useCallback(
    (cambios: Partial<Pick<ExamAttempt, "answers" | "flagged" | "cursor">>) => {
      setAttempt((actual) => {
        if (!actual || actual.submittedAt) return actual;

        const siguiente = { ...actual, ...cambios };

        if (volcadoRef.current) clearTimeout(volcadoRef.current);
        volcadoRef.current = setTimeout(() => {
          volcadoRef.current = null;
          volcar(siguiente, isPersisted);
        }, AUTOGUARDADO_MS);

        return siguiente;
      });
    },
    [volcar, isPersisted],
  );

  const submit = useCallback(
    async (opts?: { autoSubmitted?: boolean }) => {
      if (!attempt || attempt.submittedAt || isSubmitting) return;

      setIsSubmitting(true);
      setError(null);

      if (volcadoRef.current) {
        clearTimeout(volcadoRef.current);
        volcadoRef.current = null;
      }

      const response = await fetch(`${base}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId: attempt.id,
          answers: attempt.answers,
          autoSubmitted: opts?.autoSubmitted === true,
        }),
      }).catch(() => null);

      if (!response || !response.ok) {
        setError("submit_failed");
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();
      setAttempt((actual) =>
        actual
          ? {
              ...actual,
              submittedAt: new Date().toISOString(),
              autoSubmitted: data.autoSubmitted === true,
              answers: data.answers ?? actual.answers,
              result: data.result as ExamResult,
            }
          : actual,
      );
      setIsSubmitting(false);
    },
    [base, attempt, isSubmitting],
  );

  return { attempt, isLoading, isPersisted, skewMs, start, update, submit, isSubmitting, error };
}
