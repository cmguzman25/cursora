import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name : "";
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    const code = error.message.toLowerCase().includes("already registered")
      ? "email_taken"
      : "register_failed";
    return NextResponse.json({ error: code }, { status: 400 });
  }

  // If the Supabase project requires email confirmation, signUp succeeds
  // but no session is created yet — the account can't log in until the
  // confirmation link is clicked.
  if (!data.session || !data.user) {
    return NextResponse.json({ requiresConfirmation: true });
  }

  return NextResponse.json({
    user: {
      id: data.user.id,
      name,
      email: data.user.email,
      role: "user",
    },
  });
}
