"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { BookmarkCheck, BookmarkPlus, BookmarkX, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

interface CourseEnrollmentButtonProps {
  courseSlug: string;
  /** `null` while the user is loading, or when nobody is signed in. */
  userKey: string | null;
  /** Distinguishes "still loading the session" from "signed out". */
  isUserLoading?: boolean;
}

/**
 * Join or leave a course. Leaving only drops the membership — every completed
 * lesson and the current-lesson bookmark stay in place, which is why the
 * button can be pressed without a confirmation dialog.
 */
export function CourseEnrollmentButton({
  courseSlug,
  userKey,
  isUserLoading = false,
}: CourseEnrollmentButtonProps) {
  const t = useTranslations("courseDetail");
  const [loadedKey, setLoadedKey] = useState<string | null>(userKey);
  const [enrolled, setEnrolled] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  if (userKey !== loadedKey) {
    setLoadedKey(userKey);
    setEnrolled(null);
  }

  useEffect(() => {
    if (!userKey) return;

    let cancelled = false;

    fetch(`/api/courses/${courseSlug}/enrollment`)
      .then((response) => (response.ok ? response.json() : { enrolled: false }))
      .then((data: { enrolled?: boolean }) => {
        if (!cancelled) setEnrolled(Boolean(data.enrolled));
      })
      .catch(() => {
        if (!cancelled) setEnrolled(false);
      });

    return () => {
      cancelled = true;
    };
  }, [userKey, courseSlug]);

  // Hold the button's space while the answer is on its way, so it doesn't pop
  // in and shove the rest of the row sideways.
  if (isUserLoading || (userKey && enrolled === null)) {
    return <Skeleton className="h-11 w-36 rounded-xl" />;
  }

  // Signed out: there is nothing to enroll.
  if (!userKey || enrolled === null) return null;

  async function toggle() {
    if (isSaving) return;
    setIsSaving(true);

    const response = await fetch(`/api/courses/${courseSlug}/enrollment`, {
      method: enrolled ? "DELETE" : "POST",
    }).catch(() => null);

    if (response?.ok) {
      const data: { enrolled?: boolean } = await response.json();
      setEnrolled(Boolean(data.enrolled));
    }

    setIsSaving(false);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isSaving}
      aria-pressed={enrolled}
      // The visible label states where you stand ("Enrolled"); the accessible
      // name and the hover label state what pressing does — the "Following →
      // Unfollow" pattern, so the button is never ambiguous.
      aria-label={enrolled ? t("leave") : t("enroll")}
      title={enrolled ? t("leaveHint") : undefined}
      className={`group inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold whitespace-nowrap transition-colors disabled:opacity-60 ${
        enrolled
          ? "border-emerald-200 text-emerald-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700 dark:border-emerald-500/30 dark:text-emerald-400 dark:hover:border-rose-500/30 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      }`}
    >
      {isSaving ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : enrolled ? (
        <>
          <BookmarkCheck className="h-4 w-4 group-hover:hidden" aria-hidden="true" />
          <BookmarkX className="hidden h-4 w-4 group-hover:block" aria-hidden="true" />
        </>
      ) : (
        <BookmarkPlus className="h-4 w-4" aria-hidden="true" />
      )}

      {enrolled ? (
        <span aria-hidden="true">
          <span className="group-hover:hidden">{t("enrolled")}</span>
          <span className="hidden group-hover:inline">{t("leave")}</span>
        </span>
      ) : (
        <span aria-hidden="true">{t("enroll")}</span>
      )}
    </button>
  );
}
