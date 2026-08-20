"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { TestAccountsHint, TEST_ACCOUNTS } from "@/components/auth/TestAccountsHint";

interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isSafeRedirect(path: string | null): path is string {
  return !!path && path.startsWith("/") && !path.startsWith("//");
}

function LoginForm() {
  const t = useTranslations("auth.login");
  const tAuth = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const redirectTo = isSafeRedirect(from) ? from : `/${locale}`;

  const defaultAccount = TEST_ACCOUNTS[0];
  const [email, setEmail] = useState(defaultAccount.email);
  const [password, setPassword] = useState(defaultAccount.password);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): FormErrors {
    const validationErrors: FormErrors = {};
    if (!email) validationErrors.email = t("emailRequired");
    else if (!EMAIL_REGEX.test(email)) validationErrors.email = t("emailInvalid");
    if (!password) validationErrors.password = t("passwordRequired");
    return validationErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setFormError(null);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });

      if (!response.ok) {
        setFormError(t("invalidCredentials"));
        setIsSubmitting(false);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setFormError(t("invalidCredentials"));
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("subtitle")}</p>
      </div>

      <TestAccountsHint
        onSelect={(account) => {
          setEmail(account.email);
          setPassword(account.password);
          setErrors({});
          setFormError(null);
        }}
      />

      <SocialButtons />

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <span className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
          {tAuth("divider")}
        </span>
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <Input
          label={t("emailLabel")}
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          icon={<Mail className="h-4 w-4" aria-hidden="true" />}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />

        <div className="flex flex-col gap-1.5">
          <PasswordInput
            label={t("passwordLabel")}
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
          />
          <div className="flex justify-end">
            <button
              type="button"
              disabled
              title={tAuth("comingSoon")}
              className="cursor-not-allowed text-xs font-medium text-zinc-400 dark:text-zinc-600"
            >
              {t("forgotPassword")}
            </button>
          </div>
        </div>

        <Checkbox
          name="remember"
          checked={remember}
          onChange={(event) => setRemember(event.target.checked)}
          label={t("remember")}
        />

        {formError && (
          <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
            {formError}
          </p>
        )}

        <Button type="submit" isLoading={isSubmitting} className="w-full">
          {t("submit")}
          {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
        </Button>
      </form>

      <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
        {t("noAccount")}{" "}
        <Link
          href="/register"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          {t("registerLink")}
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
