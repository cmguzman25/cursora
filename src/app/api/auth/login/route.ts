import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/constants";
import { verifyCredentials } from "@/lib/users";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const remember = Boolean(body?.remember);

  const user = verifyCredentials(email, password);
  if (!user) {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
  }

  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });

  response.cookies.set(SESSION_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    ...(remember ? { maxAge: 60 * 60 * 24 * 30 } : {}),
  });

  return response;
}
