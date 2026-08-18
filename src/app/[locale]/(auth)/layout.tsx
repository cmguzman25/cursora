import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { AuthBrandPanel } from "@/components/auth/AuthBrandPanel";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-1 bg-zinc-50 dark:bg-zinc-950">
      <AuthBrandPanel />
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between p-6 lg:justify-end">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-900 lg:hidden dark:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-bold text-white">
              C
            </span>
            <span className="text-base font-semibold tracking-tight">Cursora</span>
          </Link>
          <LanguageSwitcher />
        </div>
        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
