import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { CourseLessonList } from "@/components/courses/CourseLessonList";
import {
  COURSE_SLUG,
  COURSE_TITLE,
  LESSONS,
} from "@content/courses/aws-cloud-practitioner/manifest";

// Skipped in dev — see the note in [lessonSlug]/page.tsx.
export function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") return [];

  return routing.locales.map((locale) => ({ locale, courseSlug: COURSE_SLUG }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: string; courseSlug: string }>;
}) {
  const { locale, courseSlug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  if (courseSlug !== COURSE_SLUG) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {COURSE_TITLE[locale]}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Curso de preparación para el examen AWS Certified Cloud Practitioner (CLF-C02).
          </p>
        </div>
        <CourseLessonList courseSlug={courseSlug} lessons={LESSONS} />
      </main>
    </div>
  );
}
