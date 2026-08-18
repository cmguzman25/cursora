import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { LogoutButton } from "@/components/auth/LogoutButton";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-zinc-900 dark:text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-bold text-white">
            C
          </span>
          <span className="text-base font-semibold tracking-tight">Cursora</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
