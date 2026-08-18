"use client";

import { useTranslations } from "next-intl";

export const TEST_ACCOUNTS = [
  { role: "user" as const, email: "user@cursora.com", password: "User123!" },
  { role: "admin" as const, email: "admin@cursora.com", password: "Admin123!" },
];

interface TestAccountsHintProps {
  onSelect: (account: { email: string; password: string }) => void;
}

export function TestAccountsHint({ onSelect }: TestAccountsHintProps) {
  const t = useTranslations("auth.login.testAccounts");

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-dashed border-indigo-300 bg-indigo-50/50 p-3 dark:border-indigo-800 dark:bg-indigo-500/5">
      <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300">{t("title")}</p>
      <div className="flex flex-col gap-1.5 sm:flex-row">
        {TEST_ACCOUNTS.map((account) => (
          <button
            key={account.role}
            type="button"
            onClick={() => onSelect(account)}
            className="flex flex-1 flex-col items-start gap-0.5 rounded-lg border border-indigo-200 bg-white px-3 py-2 text-left transition-colors hover:bg-indigo-50 dark:border-indigo-800 dark:bg-zinc-900 dark:hover:bg-indigo-500/10"
          >
            <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-200">
              {account.role === "admin" ? t("admin") : t("user")}
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400">{account.email}</span>
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
              {account.password}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
