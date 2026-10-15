import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { MockSession } from "@/components/practice/MockSession";
import { getChallenge } from "@content/challenges/registry";
import type { Challenge } from "@content/challenges/types";
import { MAX_RETOS_POR_SIMULACRO, MOCK_ID } from "@/lib/practice/mock";

/**
 * Una sesión de simulacro. Los retos y el id vienen en la URL que armó
 * `/practice/mock`; acá solo se validan: un slug que no existe, repetido o un
 * id con forma rara es un 404, no un simulacro a medias.
 */
export default async function MockSessionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ c?: string; s?: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const { c, s } = await searchParams;
  const slugs = (c ?? "").split(",").filter(Boolean);
  if (
    !s ||
    !MOCK_ID.test(s) ||
    slugs.length === 0 ||
    slugs.length > MAX_RETOS_POR_SIMULACRO ||
    new Set(slugs).size !== slugs.length
  ) {
    notFound();
  }
  const retos = slugs.map(getChallenge);
  if (retos.some((r) => r === null)) {
    notFound();
  }

  const t = await getTranslations("practice");

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-6 py-8">
        <div className="flex flex-col gap-2">
          <Link
            href="/practice/mock"
            className="self-start text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            ← {t("mockBack")}
          </Link>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {t("mockTitle")}
          </h1>
        </div>

        <MockSession mockId={s} challenges={retos as Challenge[]} />
      </main>
    </div>
  );
}
