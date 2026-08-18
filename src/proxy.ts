import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { SESSION_COOKIE } from "@/lib/constants";

const handleI18nRouting = createMiddleware(routing);

const PUBLIC_SEGMENTS = ["login", "register"];

export function proxy(request: NextRequest) {
  const intlResponse = handleI18nRouting(request);

  if (intlResponse.headers.get("location")) {
    return intlResponse;
  }

  const { pathname } = request.nextUrl;
  const [, locale, ...rest] = pathname.split("/");
  const isPublicPath = PUBLIC_SEGMENTS.includes(rest[0] ?? "");
  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (!hasSession && !isPublicPath) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (hasSession && isPublicPath) {
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
