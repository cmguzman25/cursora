import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { routing } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";

/** Reads the session cookie, so it can never be prerendered. */
export const dynamic = "force-dynamic";

/**
 * Role guard for everything under `/[locale]/admin`.
 *
 * `proxy.ts` already requires a session for this path but knows nothing about
 * roles, and adding a `profiles` lookup there would put a database round-trip
 * on every navigation in the app. Guarding in the layout keeps that cost on
 * the admin routes alone. The `/api/admin/*` handlers re-check independently.
 *
 * Answers 404 rather than 403: there is no reason to confirm the route exists
 * to someone who may not use it.
 */
export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      {children}
    </div>
  );
}
