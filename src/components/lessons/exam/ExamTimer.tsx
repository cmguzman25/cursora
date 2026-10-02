"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";
import { formatRemaining } from "@/hooks/useExamCountdown";

/** Minutos restantes en los que se avisa, una vez cada uno. */
const AVISOS = [10, 5, 1];

export function ExamTimer({ remainingMs }: { remainingMs: number }) {
  const t = useTranslations("lesson.exam");
  const minutosRestantes = Math.ceil(remainingMs / 60_000);

  // Qué avisos ya se anunciaron, para no repetirlos en cada tic.
  const anunciadosRef = useRef<Set<number>>(new Set());
  const [aviso, setAviso] = useState<number | null>(null);

  useEffect(() => {
    const pendiente = AVISOS.find(
      (minuto) => minutosRestantes <= minuto && !anunciadosRef.current.has(minuto),
    );
    if (pendiente === undefined) return;

    anunciadosRef.current.add(pendiente);
    setAviso(pendiente);
  }, [minutosRestantes]);

  const urgente = remainingMs <= 2 * 60_000;
  const atento = !urgente && remainingMs <= 10 * 60_000;

  const color = urgente
    ? "border-red-500 bg-red-50 text-red-700 dark:border-red-500/60 dark:bg-red-500/10 dark:text-red-400"
    : atento
      ? "border-amber-400 bg-amber-50 text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300"
      : "border-zinc-200 bg-white text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200";

  return (
    <>
      {/*
        `aria-live="off"` es deliberado: un cronómetro que se anuncia cada
        segundo vuelve la página inservible con un lector de pantalla. Los
        avisos van por la región de abajo, que se escribe tres veces en total.
      */}
      <div
        role="timer"
        aria-live="off"
        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold tabular-nums ${color}`}
      >
        <Clock className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">{t("timeRemaining")}: </span>
        {remainingMs <= 0 ? t("timeUp") : formatRemaining(remainingMs)}
      </div>

      <div aria-live="polite" className="sr-only">
        {aviso !== null ? t("timeWarning", { minutes: aviso }) : ""}
      </div>
    </>
  );
}
