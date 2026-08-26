"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, Mail, User } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { resetCurrentUser } from "@/hooks/useCurrentUser";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const tAuth = useTranslations("auth");
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requiresConfirmation, setRequiresConfirmation] = useState(false);

  function validate(values: FormValues): FormErrors {
    const validationErrors: FormErrors = {};
    if (!values.name.trim()) validationErrors.name = t("nameRequired");
    if (!values.email) validationErrors.email = t("emailRequired");
    else if (!EMAIL_REGEX.test(values.email)) validationErrors.email = t("emailInvalid");
    if (!values.password) validationErrors.password = t("passwordRequired");
    else if (values.password.length < 8) validationErrors.password = t("passwordTooShort");
    if (values.confirmPassword !== values.password)
      validationErrors.confirmPassword = t("confirmPasswordMismatch");
    if (!values.terms) validationErrors.terms = t("termsRequired");
    return validationErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationErrors = validate({ name, email, password, confirmPassword, terms });
    setErrors(validationErrors);
    setFormError(null);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setFormError(
          data?.error === "email_taken" ? t("emailTaken") : t("registerFailed"),
        );
        setIsSubmitting(false);
        return;
      }

      if (data?.requiresConfirmation) {
        setRequiresConfirmation(true);
        setIsSubmitting(false);
        return;
      }

      // Registering signs the new account in, so any identity this tab cached
      // for an earlier session is stale.
      resetCurrentUser();
      router.push("/");
      router.refresh();
    } catch {
      setFormError(t("registerFailed"));
      setIsSubmitting(false);
    }
  }

  if (requiresConfirmation) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
            {t("confirmEmailTitle")}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {t("confirmEmailSubtitle", { email })}
          </p>
        </div>
        <Link
          href="/login"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          {t("loginLink")}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          {t("title")}
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("subtitle")}</p>
      </div>

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
          label={t("nameLabel")}
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          icon={<User className="h-4 w-4" aria-hidden="true" />}
          value={name}
          onChange={(event) => setName(event.target.value)}
          error={errors.name}
        />

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

        <div className="flex flex-col gap-2">
          <PasswordInput
            label={t("passwordLabel")}
            name="password"
            autoComplete="new-password"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
          />
          <PasswordStrength password={password} />
        </div>

        <PasswordInput
          label={t("confirmPasswordLabel")}
          name="confirmPassword"
          autoComplete="new-password"
          placeholder={t("confirmPasswordPlaceholder")}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={errors.confirmPassword}
        />

        <Checkbox
          name="terms"
          checked={terms}
          onChange={(event) => setTerms(event.target.checked)}
          error={errors.terms}
          label={t.rich("terms", {
            terms: (chunks) => (
              <button
                type="button"
                disabled
                title={tAuth("comingSoon")}
                className="cursor-not-allowed font-medium text-indigo-600/70 dark:text-indigo-400/70"
              >
                {chunks}
              </button>
            ),
            privacy: (chunks) => (
              <button
                type="button"
                disabled
                title={tAuth("comingSoon")}
                className="cursor-not-allowed font-medium text-indigo-600/70 dark:text-indigo-400/70"
              >
                {chunks}
              </button>
            ),
          })}
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
        {t("hasAccount")}{" "}
        <Link
          href="/login"
          className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          {t("loginLink")}
        </Link>
      </p>
    </div>
  );
}
