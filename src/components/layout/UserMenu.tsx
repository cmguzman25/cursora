"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, Loader2, LogOut, ShieldCheck } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { useCurrentUser, resetCurrentUser } from "@/hooks/useCurrentUser";
import { Skeleton } from "@/components/ui/Skeleton";

/**
 * Two letters for the avatar: the initials of a real name, or the start of the
 * email for accounts whose profile has no name yet (`/api/auth/me` falls back
 * to the email there).
 */
function initials(name: string): string {
  const source = name.includes("@") ? name.split("@")[0] : name;
  const words = source.split(/[\s._-]+/).filter(Boolean);
  const letters = words.length > 1 ? words[0][0] + words[1][0] : source.slice(0, 2);
  return letters.toUpperCase();
}

const ITEM_CLASS =
  "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800";

/**
 * The account control in the header: who is signed in, and everything you can
 * do about it.
 *
 * It replaces the row of separate controls that used to live here (name,
 * admin, log out), which competed with each other and with the wordmark.
 * Language is deliberately *not* in here — it belongs to the site, not to your
 * account, and it keeps its own globe next door. The name stays outside the
 * panel too, since knowing which account you are on shouldn't cost a click,
 * while the email — long, and rarely needed — moves inside.
 *
 * Interaction follows the disclosure pattern rather than `role="menu"`,
 * because the admin entry is a destination, and destinations are links rather
 * than menu commands.
 * https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 */
export function UserMenu() {
  const t = useTranslations("common");
  const tAdmin = useTranslations("admin");
  const router = useRouter();
  const { user, isLoading } = useCurrentUser();

  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      // Escape has to hand focus back, or the keyboard user is left on a
      // panel that no longer exists.
      triggerRef.current?.focus();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  async function handleLogout() {
    setIsLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    // The session is gone; drop the identity cached for it before any
    // component can read it again.
    resetCurrentUser();
    router.push("/login");
    router.refresh();
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="hidden h-4 w-24 sm:block" />
      </div>
    );
  }

  // No identity, no account control. The header keeps its language switcher
  // either way, so a failed `/api/auth/me` doesn't leave it empty.
  if (!user) return null;

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key !== "ArrowDown") return;
          event.preventDefault();
          setOpen(true);
          // Opening with the keyboard should land inside the panel, the way
          // the menu button pattern behaves.
          requestAnimationFrame(() => {
            panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
          });
        }}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="account-panel"
        aria-label={t("signedInAs", { name: user.email })}
        className="flex items-center gap-2 rounded-full py-0.5 pr-2 pl-0.5 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:hover:bg-zinc-800"
      >
        <Avatar name={user.name} className="h-8 w-8 text-xs" />
        <span className="hidden max-w-[10rem] truncate text-sm font-medium text-zinc-700 sm:block dark:text-zinc-200">
          {user.name}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          ref={panelRef}
          id="account-panel"
          className="absolute right-0 z-20 mt-2 w-72 origin-top-right rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
        >
          <div className="flex items-center gap-2.5 px-2.5 py-2">
            <Avatar name={user.name} className="h-9 w-9 text-sm" />
            <div className="min-w-0">
              <p className="flex items-center gap-1.5">
                <span className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                  {user.name}
                </span>
                {user.role === "admin" && (
                  <span className="shrink-0 rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-indigo-600 uppercase dark:bg-indigo-950 dark:text-indigo-300">
                    {tAdmin("nav")}
                  </span>
                )}
              </p>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
            </div>
          </div>

          <Divider />

          {user.role === "admin" && (
            <Link href="/admin/comments" onClick={() => setOpen(false)} className={ITEM_CLASS}>
              <ShieldCheck className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
              {tAdmin("nav")}
            </Link>
          )}

          {user.role === "admin" && <Divider />}

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`${ITEM_CLASS} text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-950/40`}
          >
            {isLoggingOut ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
            ) : (
              <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            )}
            {t("logout")}
          </button>
        </div>
      )}
    </div>
  );
}

function Avatar({ name, className }: { name: string; className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 font-semibold text-white ${className}`}
    >
      {initials(name)}
    </span>
  );
}

function Divider() {
  return <div className="my-1.5 h-px bg-zinc-100 dark:bg-zinc-800" />;
}
