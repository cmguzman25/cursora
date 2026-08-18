"use client";

import { useTranslations } from "next-intl";

const LEVEL_KEYS = ["veryWeak", "weak", "fair", "strong", "veryStrong"] as const;
const LEVEL_COLORS = ["bg-red-500", "bg-orange-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500"];

function getScore(password: string) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

export function PasswordStrength({ password }: { password: string }) {
  const t = useTranslations("auth.register.passwordStrength");

  if (!password) return null;

  const score = getScore(password);

  return (
    <div className="flex flex-col gap-1.5" aria-live="polite">
      <div className="flex gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= score - 1 ? LEVEL_COLORS[score] : "bg-zinc-200 dark:bg-zinc-700"
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        {t("label")} <span className="font-medium">{t(LEVEL_KEYS[score])}</span>
      </p>
    </div>
  );
}
