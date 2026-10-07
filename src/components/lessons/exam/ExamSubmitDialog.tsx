"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

interface ExamSubmitDialogProps {
  total: number;
  unanswered: number;
  flagged: number;
  isSubmitting: boolean;
  /**
   * Aviso de las preguntas sin responder. Entra por prop y no por `t()` porque
   * es el único texto de este diálogo que no es genérico: el del simulacro de
   * AWS dice "no hay penalización por respuesta incorrecta", que es cierto en una
   * lección de certificación y falso en un examen sobre vocabulario de inglés.
   * El resto de la copia sí sirve igual en los dos lados y vive en `exam.*`.
   */
  unansweredNotice: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ExamSubmitDialog({
  total,
  unanswered,
  flagged,
  isSubmitting,
  unansweredNotice,
  onConfirm,
  onCancel,
}: ExamSubmitDialogProps) {
  const t = useTranslations("exam");
  const panelRef = useRef<HTMLDivElement>(null);
  const cancelarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    cancelarRef.current?.focus();
  }, []);

  // Escape cancela, y el tabulador queda encerrado en el diálogo: salir con el
  // teclado hacia el examen de atrás mientras esto está abierto dejaría al
  // alumno respondiendo sobre una pantalla que ya no acepta cambios.
  useEffect(() => {
    const alPresionar = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel();
        return;
      }
      if (event.key !== "Tab") return;

      const enfocables = panelRef.current?.querySelectorAll<HTMLElement>("button");
      if (!enfocables || enfocables.length === 0) return;

      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];

      if (event.shiftKey && document.activeElement === primero) {
        event.preventDefault();
        ultimo.focus();
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener("keydown", alPresionar);
    return () => document.removeEventListener("keydown", alPresionar);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/50 p-4 backdrop-blur-sm">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exam-submit-title"
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h2 id="exam-submit-title" className="text-lg font-semibold text-zinc-900 dark:text-white">
          {t("confirmTitle")}
        </h2>

        <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("confirmBody", { total })}</p>

        {unanswered > 0 && (
          <p className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
            {unansweredNotice}
          </p>
        )}
        {flagged > 0 && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {t("confirmFlagged", { count: flagged })}
          </p>
        )}

        <div className="flex flex-wrap justify-end gap-3">
          <Button ref={cancelarRef} variant="outline" onClick={onCancel} disabled={isSubmitting}>
            {t("confirmCancel")}
          </Button>
          <Button onClick={onConfirm} isLoading={isSubmitting}>
            {t("confirmSubmit")}
          </Button>
        </div>
      </div>
    </div>
  );
}
