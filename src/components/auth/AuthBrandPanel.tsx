import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function AuthBrandPanel() {
  const t = await getTranslations("auth.brandPanel");

  return (
    <div className="relative hidden overflow-hidden bg-zinc-950 lg:flex lg:w-[45%] lg:flex-col lg:justify-between lg:p-12 xl:p-16">
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 -bottom-32 h-96 w-96 rounded-full bg-fuchsia-600/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:24px_24px]"
        aria-hidden="true"
      />

      <Link href="/" className="relative z-10 flex w-fit items-center gap-2 text-white">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-bold">
          C
        </span>
        <span className="text-lg font-semibold tracking-tight">Cursora</span>
      </Link>

      <div className="relative z-10 flex flex-col gap-6">
        <h2 className="max-w-sm text-3xl font-semibold leading-tight text-white">
          {t("headline")}
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-zinc-400">{t("subtitle")}</p>
      </div>

      <p className="relative z-10 text-xs text-zinc-500">
        {t("copyright", { year: new Date().getFullYear() })}
      </p>
    </div>
  );
}
