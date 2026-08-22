import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { CourseLessonList } from "@/components/courses/CourseLessonList";
import { getCourse } from "@/lib/courses";
import { COURSE_MANIFESTS, getCourseManifest } from "@content/courses/registry";
import { localize } from "@content/courses/types";

// Skipped in dev — see the note in [lessonSlug]/page.tsx.
export function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") return [];

  return routing.locales.flatMap((locale) =>
    COURSE_MANIFESTS.map((course) => ({ locale, courseSlug: course.slug })),
  );
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

  const course = getCourseManifest(courseSlug);
  if (!course) {
    notFound();
  }

  // The catalog holds the marketing copy (already translated); the manifest
  // only knows the lessons. A course can exist without a catalog entry while
  // it is being written, so the description is optional here.
  const description = getCourse(courseSlug)?.description;

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {localize(course.title, locale)}
          </h1>
          {description && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {localize(description, locale)}
            </p>
          )}
        </div>
        <CourseLessonList courseSlug={course.slug} lessons={course.lessons} />
      </main>
    </div>
  );
}
