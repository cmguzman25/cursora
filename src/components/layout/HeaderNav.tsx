"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

/**
 * Los enlaces de sección del encabezado.
 *
 * Es un componente de cliente aparte y no parte de `AppHeader` porque lo único que
 * necesita del navegador es `usePathname`, para marcar cuál está activo. Dejándolo
 * acá, `AppHeader` sigue siendo un componente de servidor.
 *
 * `usePathname` de `@/i18n/navigation` devuelve la ruta **sin** el prefijo de
 * idioma, así que la comparación no tiene que saber en qué idioma está la página.
 */
export function HeaderNav() {
  const t = useTranslations("exams");
  const pathname = usePathname();

  const enlaces = [
    { href: "/", etiqueta: t("navCourses"), activo: pathname === "/" },
    { href: "/exams", etiqueta: t("navExams"), activo: pathname.startsWith("/exams") },
  ] as const;

  return (
    <nav className="flex items-center gap-1">
      {enlaces.map(({ href, etiqueta, activo }) => (
        <Link
          key={href}
          href={href}
          aria-current={activo ? "page" : undefined}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            activo
              ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
              : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          }`}
        >
          {etiqueta}
        </Link>
      ))}
    </nav>
  );
}
