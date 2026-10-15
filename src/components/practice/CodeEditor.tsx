"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Editor, { type OnMount } from "@monaco-editor/react";
import { useTranslations } from "next-intl";
import type { ChallengeLanguage } from "@content/challenges/types";

/** Id de lenguaje de Monaco para el resaltado. */
const LENGUAJE_DE_MONACO: Record<ChallengeLanguage, string> = {
  postgres: "sql",
  javascript: "javascript",
  typescript: "typescript",
  python: "python",
  scala: "scala",
};

/**
 * Sigue el tema del sistema, igual que el resto de la app (los `dark:` de
 * Tailwind dependen de `prefers-color-scheme`).
 */
const DARK_QUERY = "(prefers-color-scheme: dark)";

function subscribeToScheme(listener: () => void) {
  const mq = window.matchMedia(DARK_QUERY);
  mq.addEventListener("change", listener);
  return () => mq.removeEventListener("change", listener);
}

function useSystemDark(): boolean {
  return useSyncExternalStore(
    subscribeToScheme,
    () => window.matchMedia(DARK_QUERY).matches,
    () => false,
  );
}

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: ChallengeLanguage;
  /** Ctrl/Cmd + Enter. */
  onRun: () => void;
  /** El texto seleccionado ("" si no hay selección), para "Ejecutar selección". */
  onSelectionChange: (selected: string) => void;
}

/**
 * El editor: Monaco, el mismo de VS Code, que es lo más parecido a lo que se
 * usa en CoderPad o HackerRank.
 *
 * `@monaco-editor/react` carga Monaco desde su CDN la primera vez que se monta,
 * y no hace nada en el servidor, así que no hace falta `next/dynamic`.
 */
export function CodeEditor({
  value,
  onChange,
  language,
  onRun,
  onSelectionChange,
}: CodeEditorProps) {
  const t = useTranslations("practice");
  const dark = useSystemDark();

  // El atajo se registra una vez al montar; el ref evita que llame a un `onRun` viejo.
  const onRunRef = useRef(onRun);
  const onSelectionRef = useRef(onSelectionChange);
  useEffect(() => {
    onRunRef.current = onRun;
    onSelectionRef.current = onSelectionChange;
  }, [onRun, onSelectionChange]);

  const handleMount: OnMount = (editor, monaco) => {
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => onRunRef.current());
    editor.onDidChangeCursorSelection(({ selection }) => {
      const model = editor.getModel();
      onSelectionRef.current(model && !selection.isEmpty() ? model.getValueInRange(selection) : "");
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <Editor
        height="22rem"
        language={LENGUAJE_DE_MONACO[language]}
        theme={dark ? "vs-dark" : "light"}
        value={value}
        onChange={(v) => onChange(v ?? "")}
        onMount={handleMount}
        loading={<p className="p-4 text-sm text-zinc-500">{t("editorLoading")}</p>}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          tabSize: 2,
          automaticLayout: true,
          padding: { top: 12 },
        }}
      />
    </div>
  );
}
