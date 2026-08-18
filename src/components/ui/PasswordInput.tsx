"use client";

import { forwardRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input, type InputProps } from "./Input";

type PasswordInputProps = Omit<InputProps, "type" | "icon" | "rightElement">;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(props, ref) {
    const [visible, setVisible] = useState(false);
    const t = useTranslations("common.passwordVisibility");

    return (
      <Input
        ref={ref}
        type={visible ? "text" : "password"}
        icon={<Lock className="h-4 w-4" aria-hidden="true" />}
        rightElement={
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
            aria-label={visible ? t("hide") : t("show")}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        }
        {...props}
      />
    );
  },
);
