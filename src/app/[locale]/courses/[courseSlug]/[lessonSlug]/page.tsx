import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { LessonProgressControls } from "@/components/courses/LessonProgressControls";
import { AnnotatedLesson } from "@/components/lessons/AnnotatedLesson";
import { COURSE_SLUG, LESSONS } from "@content/courses/aws-cloud-practitioner/manifest";

interface LessonPageParams {
  locale: string;
  courseSlug: string;
  lessonSlug: string;
}

function readLessonFile(courseSlug: string, lessonSlug: string, locale: string) {
  const filePath = path.join(
    process.cwd(),
    "content",
    "courses",
    courseSlug,
    "lecciones",
    `${lessonSlug}.${locale}.md`,
  );
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : null;
}

/**
 * Pre-renders every locale × lesson combination at build time, so lesson
 * pages are served as static HTML instead of being rendered per request.
 * Skipped in dev: Next.js 16 + Turbopack has shown route-param instability
 * in `next dev` when this runs (crashes and spurious 404s on existing
 * lessons) — dev already renders on demand regardless, so this only needs
 * to run for `next build`.
 */
export function generateStaticParams() {
  if (process.env.NODE_ENV !== "production") return [];

  return routing.locales.flatMap((locale) =>
    LESSONS.map((lesson) => ({
      locale,
      courseSlug: COURSE_SLUG,
      lessonSlug: lesson.id,
    })),
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<LessonPageParams>;
}) {
  const { locale, courseSlug, lessonSlug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  if (courseSlug !== COURSE_SLUG) {
    notFound();
  }

  const lessonIndex = LESSONS.findIndex((lesson) => lesson.id === lessonSlug);
  if (lessonIndex === -1) {
    notFound();
  }

  const lesson = LESSONS[lessonIndex];
  const nextLesson = LESSONS[lessonIndex + 1] ?? null;
  const t = await getTranslations("lesson");

  let content = readLessonFile(courseSlug, lessonSlug, locale);
  // The locale of the markdown actually on screen. Comments anchor to the text
  // they were made against, so a fallback render must be recorded as such —
  // otherwise a Spanish quote would be filed under `en` and never re-match.
  let contentLocale = locale;
  let isFallbackContent = false;
  if (!content && locale !== routing.defaultLocale) {
    content = readLessonFile(courseSlug, lessonSlug, routing.defaultLocale);
    isFallbackContent = content !== null;
    if (isFallbackContent) contentLocale = routing.defaultLocale;
  }

  const lessonHeader = (
    <div className="flex flex-col gap-2">
      <Link
        href={`/courses/${courseSlug}`}
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
      >
        {t("backToCourse")}
      </Link>
      <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
        {lesson.module[locale]}
      </p>
      <p className="text-xs text-zinc-400">
        {t("progress", { current: lessonIndex + 1, total: LESSONS.length })}
      </p>
      {isFallbackContent && (
        <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300">
          {t("notTranslated")}
        </p>
      )}
    </div>
  );

  const progressControls = (
    <LessonProgressControls
      courseSlug={courseSlug}
      lessonId={lesson.id}
      nextLessonId={nextLesson?.id ?? null}
    />
  );

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main
        className={`mx-auto flex w-full flex-1 flex-col gap-6 px-6 py-10 ${
          content ? "max-w-6xl" : "max-w-3xl"
        }`}
      >
        {content ? (
          // ReactMarkdown still runs on the server here: AnnotatedLesson takes
          // the rendered output as children, so the parser stays off the client.
          <AnnotatedLesson
            courseSlug={courseSlug}
            lessonId={lesson.id}
            contentLocale={contentLocale}
            header={lessonHeader}
            footer={progressControls}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
          </AnnotatedLesson>
        ) : (
          <>
            {lessonHeader}
            <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              {t("notReady")}
            </p>
            {progressControls}
          </>
        )}
      </main>
    </div>
  );
}
