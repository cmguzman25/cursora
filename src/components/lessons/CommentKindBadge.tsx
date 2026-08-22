import { useTranslations } from "next-intl";
import { COMMENT_KIND_STYLES, type CommentKind } from "@/lib/comments/kinds";

export function CommentKindBadge({ kind }: { kind: CommentKind }) {
  const t = useTranslations("comments");
  const style = COMMENT_KIND_STYLES[kind];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold ${style.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
      {t(`kinds.${kind}`)}
    </span>
  );
}
