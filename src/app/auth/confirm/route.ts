import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";
import { routing } from "@/i18n/routing";

/**
 * Handler for the link Supabase sends in confirmation/recovery emails
 * (`{{ .SiteURL }}/auth/confirm?token_hash=...&type=...`). Not under
 * `[locale]` because Supabase's email templates link here directly,
 * without a locale prefix.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      return NextResponse.redirect(new URL(`/${routing.defaultLocale}`, request.url));
    }
  }

  return NextResponse.redirect(
    new URL(`/${routing.defaultLocale}/login?confirmError=1`, request.url),
  );
}
