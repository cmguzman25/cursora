import { randomUUID } from "node:crypto";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getChallengeSummaries } from "@content/challenges/registry";
import { getChallengeStats } from "@/lib/practice/submissions";
import { parseMockConfig, pickCustomMock } from "@/lib/practice/mock";

/**
 * Arma un simulacro personalizado y redirige a su sesión.
 *
 * El sorteo pasa **una sola vez**, aquí: la sesión recibe los retos ya elegidos
 * en la URL (`?c=slugs&s=id`), así que recargarla no vuelve a sortear. Esta
 * página no renderiza nada.
 */
export default async function MockStartPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ levels?: string; langs?: string; order?: string; n?: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const config = parseMockConfig(await searchParams);
  const retos = config ? pickCustomMock(getChallengeSummaries(), await getChallengeStats(), config) : [];

  if (retos.length === 0) {
    redirect({ href: "/practice/mock?empty=1", locale });
  }

  const q = new URLSearchParams({
    c: retos.map((r) => r.slug).join(","),
    s: randomUUID().slice(0, 12),
  });
  redirect({ href: `/practice/mock/session?${q.toString()}`, locale });
}
