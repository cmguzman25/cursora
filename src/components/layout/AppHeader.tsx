import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { HeaderNav } from "@/components/layout/HeaderNav";
import { UserMenu } from "@/components/layout/UserMenu";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-zinc-900 dark:text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-bold text-white">
              C
            </span>
            <span className="text-base font-semibold tracking-tight">Cursora</span>
          </Link>
          {/*
            Hasta que existió `/exams` la app tenía una sola sección y este
            encabezado no necesitaba ningún enlace. Ahora sí.
          */}
          <HeaderNav />
        </div>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
