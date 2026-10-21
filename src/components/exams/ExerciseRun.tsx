"use client";

import { useMemo, useRef, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Exercise, ExerciseSection } from "@content/exercises/types";
import { Button } from "@/components/ui/Button";
import { ExamQuestionGrid, type Celda } from "@/components/lessons/exam/ExamQuestionGrid";
import {
  parseLocalJson,
  readLocal,
  subscribeLocal,
  writeLocalJson,
} from "@/lib/practice/local-state";
import { ExerciseCard } from "./ExerciseCard";

/** Lo que se recuerda de una lista en este navegador. */
interface Registro {
  actual: string;
  vistas: string[];
}

interface ExerciseRunProps {
  setSlug: string;
  sections: readonly ExerciseSection[];
  exercises: readonly Exercise[];
}

/**
 * Los ejercicios de una lista, uno por pantalla, con "Anterior" y "Siguiente"
 * como las preguntas del modo estudio.
 *
 * La grilla marca los ejercicios cuya solución ya se abrió, para que el alumno
 * vea por dónde va. Eso y la posición se recuerdan en el navegador con el mismo
 * almacén que los retos de `/practice` (`lib/practice/local-state`): el servidor
 * renderiza el primer ejercicio y el cliente adopta lo guardado al hidratar. Es
 * una comodidad, no un registro: si el navegador no deja guardar, la página
 * funciona igual y no recuerda nada al recargar.
 */
export function ExerciseRun({ setSlug, sections, exercises }: ExerciseRunProps) {
  const t = useTranslations("exam");
  const tExams = useTranslations("exams");
  const claveDeGuardado = `ejercicios:${setSlug}`;

  const arribaRef = useRef<HTMLDivElement>(null);

  const raw = useSyncExternalStore(
    subscribeLocal,
    () => readLocal(claveDeGuardado),
    () => null,
  );
  const registro = useMemo(() => parseLocalJson<Registro>(raw), [raw]);

  const indiceGuardado = registro ? exercises.findIndex((e) => e.id === registro.actual) : -1;
  const posicion = indiceGuardado >= 0 ? indiceGuardado : 0;
  const vistas = useMemo(
    () => new Set(Array.isArray(registro?.vistas) ? registro.vistas : []),
    [registro],
  );
  const ejercicio = exercises[posicion];

  const guardar = (actual: string, nuevasVistas: ReadonlySet<string>) =>
    writeLocalJson(claveDeGuardado, { actual, vistas: [...nuevasVistas] } satisfies Registro);

  if (!ejercicio) return null;

  const irA = (indice: number) => {
    const destino = Math.min(exercises.length - 1, Math.max(0, indice));
    guardar(exercises[destino].id, vistas);
    arribaRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const marcarVista = (id: string) => {
    if (!vistas.has(id)) guardar(ejercicio.id, new Set(vistas).add(id));
  };

  const celdas: Celda[] = exercises.map((e, index) => ({
    index,
    estado: vistas.has(e.id) ? "answered" : "unanswered",
    marcada: false,
  }));

  const seccionActual = sections.find((s) => s.id === ejercicio.section);

  return (
    <div ref={arribaRef} className="flex scroll-mt-24 flex-col gap-5">
      <nav aria-label={tExams("exercisesSectionsNav")} className="flex flex-wrap gap-2">
        {sections.map((seccion) => {
          const primero = exercises.findIndex((e) => e.section === seccion.id);
          const activa = seccion.id === ejercicio.section;
          return (
            <button
              key={seccion.id}
              type="button"
              disabled={primero < 0}
              onClick={() => irA(primero)}
              aria-current={activa ? "true" : undefined}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                activa
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-400 dark:bg-emerald-500/10 dark:text-emerald-300"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-emerald-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              }`}
            >
              {seccion.source.split(" · ")[0]}: {seccion.title}
            </button>
          );
        })}
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {tExams("exercisesProgress", { current: posicion + 1, total: exercises.length })}
          {seccionActual && (
            <span className="text-zinc-500 dark:text-zinc-400"> · {seccionActual.source}</span>
          )}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {tExams("exercisesSeen", {
            count: exercises.filter((e) => vistas.has(e.id)).length,
            total: exercises.length,
          })}
        </p>
      </div>

      <ExamQuestionGrid
        celdas={celdas}
        actual={posicion}
        onJump={irA}
        etiquetas={{
          grupo: tExams("exercisesGridLabel"),
          celda: (numero, estado) =>
            tExams(estado === "answered" ? "exercisesGridCellSeen" : "exercisesGridCell", {
              number: numero,
            }),
        }}
      />

      <ExerciseCard
        key={ejercicio.id}
        exercise={ejercicio}
        onSolve={() => marcarVista(ejercicio.id)}
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button variant="outline" disabled={posicion === 0} onClick={() => irA(posicion - 1)}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t("previous")}
        </Button>
        <Button
          variant="outline"
          disabled={posicion >= exercises.length - 1}
          onClick={() => irA(posicion + 1)}
        >
          {t("next")}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
