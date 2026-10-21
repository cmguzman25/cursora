"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ExamVisualTheme } from "@content/exams/types";

/**
 * El tema visual de la página de examen que se está mirando, para los
 * componentes cliente que tienen que **comportarse** distinto —celebrar un
 * acierto— y no solo verse distinto. Lo que es solo color no pasa por acá: lo
 * resuelve el CSS de `globals.css` a partir de `data-exam-theme`.
 *
 * Es un contexto y no una prop para no enhebrar el tema por cada página y cada
 * orquestador: `ExamThemeScope` lo provee una vez, y `StudyRun` o
 * `TimedExamRun` lo leen donde lo necesitan.
 */
const ExamThemeContext = createContext<ExamVisualTheme | null>(null);

export function ExamThemeProvider({
  theme,
  children,
}: {
  theme: ExamVisualTheme | null;
  children: ReactNode;
}) {
  return <ExamThemeContext.Provider value={theme}>{children}</ExamThemeContext.Provider>;
}

export function useExamTheme(): ExamVisualTheme | null {
  return useContext(ExamThemeContext);
}
