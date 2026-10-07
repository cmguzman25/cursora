"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseExamReviewFlagsArgs {
  /** `null` mientras la sesión carga, o cuando no hay nadie con sesión. */
  userKey: string | null;
  examSlug: string;
}

/**
 * Las preguntas que el alumno marcó para repasar en este examen, contra
 * `/api/exams/[examSlug]/flags`.
 *
 * Es un hook aparte del de la rendida porque las marcas **no son de la rendida**:
 * se ponen igual en el examen cronometrado y en el repaso, y sobreviven a la
 * entrega. Juntarlas con el autoguardado de respuestas obligaría a la vista de
 * repaso —que no tiene ninguna rendida abierta— a inventarse una para poder leer
 * las marcas.
 *
 * `toggle` escribe primero en memoria y después en el servidor, y revierte si el
 * servidor rechaza. Es la excepción al "releer la respuesta del servidor" que usan
 * los otros hooks del proyecto, y por un motivo concreto: marcar una pregunta pasa
 * mientras corre el reloj, y una bandera que tarda 300 ms en aparecer se siente
 * roto. El riesgo que esto corre —mostrar una marca que no se guardó— se paga con
 * la reversión y el aviso de `isPersisted`.
 */
export function useExamReviewFlags({ userKey, examSlug }: UseExamReviewFlagsArgs) {
  const url = `/api/exams/${examSlug}/flags`;
  const scopeKey = userKey ? `${userKey}:${examSlug}` : null;
  const loadedKeyRef = useRef<string | null>(null);

  const [flagged, setFlagged] = useState<ReadonlySet<string>>(new Set());
  const [isLoading, setIsLoading] = useState(Boolean(scopeKey));
  const [isPersisted, setIsPersisted] = useState(false);
  const [pending, setPending] = useState<ReadonlySet<string>>(new Set());

  // Reset derivado al cambiar de ámbito, no una suscripción — ver
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (scopeKey !== loadedKeyRef.current) {
    loadedKeyRef.current = scopeKey;
    setFlagged(new Set());
    setPending(new Set());
    setIsPersisted(false);
    setIsLoading(Boolean(scopeKey));
  }

  useEffect(() => {
    if (!userKey) return;

    let cancelled = false;

    fetch(url)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { questionIds?: string[]; persisted?: boolean } | null) => {
        if (cancelled || !data) return;
        setFlagged(new Set(data.questionIds ?? []));
        setIsPersisted(data.persisted === true);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url, userKey]);

  const toggle = useCallback(
    async (questionId: string) => {
      const marcada = flagged.has(questionId);

      // Optimista: la interfaz responde al instante.
      setFlagged((actuales) => {
        const siguiente = new Set(actuales);
        if (marcada) siguiente.delete(questionId);
        else siguiente.add(questionId);
        return siguiente;
      });
      setPending((actuales) => new Set(actuales).add(questionId));

      const response = await fetch(
        marcada ? `${url}?questionId=${encodeURIComponent(questionId)}` : url,
        marcada
          ? { method: "DELETE" }
          : {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ questionId }),
            },
      ).catch(() => null);

      setPending((actuales) => {
        const siguiente = new Set(actuales);
        siguiente.delete(questionId);
        return siguiente;
      });

      if (!response || !response.ok) {
        // Se revierte: mostrar una marca que no existe le haría creer al alumno
        // que tiene una lista de repaso que no va a estar ahí mañana.
        setFlagged((actuales) => {
          const siguiente = new Set(actuales);
          if (marcada) siguiente.add(questionId);
          else siguiente.delete(questionId);
          return siguiente;
        });
        if (response && (response.status === 401 || response.status === 503)) {
          setIsPersisted(false);
        }
        return false;
      }

      return true;
    },
    [flagged, url],
  );

  return { flagged, isLoading, isPersisted, pending, toggle };
}
