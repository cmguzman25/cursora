import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * El markdown de los retos (enunciado, pistas, explicación). Sin componente de
 * cliente propio: funciona igual renderizado en el servidor que dentro de
 * `ChallengeWorkspace`.
 */
export function Markdown({ children, compact = false }: { children: string; compact?: boolean }) {
  return (
    <div
      className={`prose prose-zinc dark:prose-invert prose-headings:font-semibold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-pre:bg-zinc-900 prose-pre:text-zinc-100 max-w-none ${
        compact ? "prose-sm prose-p:my-1" : "prose-sm sm:prose-base"
      }`}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
