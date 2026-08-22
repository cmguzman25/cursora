"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

/**
 * Renders nothing for anyone but an admin. This is convenience, not security —
 * the route itself is guarded in `src/app/[locale]/admin/layout.tsx`.
 */
export function AdminNavLink() {
  const t = useTranslations("admin");
  const { user } = useCurrentUser();

  if (user?.role !== "admin") return null;

  return (
    <Link
      href="/admin/comments"
      className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm font-medium text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">{t("nav")}</span>
    </Link>
  );
}
