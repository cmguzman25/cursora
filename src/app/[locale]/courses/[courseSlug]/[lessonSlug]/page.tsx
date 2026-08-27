import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ReactMarkdown, { defaultUrlTransform, type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { AppHeader } from "@/components/layout/AppHeader";
import { LessonProgressControls } from "@/components/courses/LessonProgressControls";
import { AnnotatedLesson } from "@/components/lessons/AnnotatedLesson";
import { ExamQuiz } from "@/components/lessons/ExamQuiz";
import { SpeakButton } from "@/components/lessons/SpeakButton";
import { COURSE_MANIFESTS, getCourseManifest, getExamQuiz } from "@content/courses/registry";
import { localize } from "@content/courses/types";

interface LessonPageParams {
  locale: string;
  courseSlug: string;
  lessonSlug: string;
}

/** The link protocol that turns a piece of a lesson into something you can hear. */
const SAY_PROTOCOL = "say:";

/** Flattens a rendered link's children back to plain text, for `[hello](say:)`. */
function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return nodeText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

/**
 * Lesson markdown marks audible English as `[hello](say:)` — a normal link
 * whose destination says "read this out loud" instead of naming a page. The
 * language courses need it in every vocabulary table; the others never use it,
 * and their links keep behaving like links.
 *
 * Writing the text twice (`[hello](say:hello)`) is allowed but discouraged:
 * spaces have to be escaped as `%20` in a link destination, which is easy to
 * get wrong. An empty `say:` reads whatever the link says.
 */
const markdownComponents: Components = {
  a({ href, children, ...props }) {
    if (!href?.startsWith(SAY_PROTOCOL)) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }

    let spoken = href.slice(SAY_PROTOCOL.length);
    try {
      spoken = decodeURIComponent(spoken);
    } catch {
      // A malformed escape is not worth losing the lesson over: fall back to
      // the link's own text below.
      spoken = "";
    }

    const text = spoken.trim() || nodeText(children);
    return (
      <>
        {children}
        <SpeakButton text={text} />
      </>
    );
  },
};

/** `say:` is not a real URL scheme, so the default transform would strip it. */
function lessonUrlTransform(url: string) {
  return url.startsWith(SAY_PROTOCOL) ? url : defaultUrlTransform(url);
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
    COURSE_MANIFESTS.flatMap((course) =>
      course.lessons.map((lesson) => ({
        locale,
        courseSlug: course.slug,
        lessonSlug: lesson.id,
      })),
    ),
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

  const course = getCourseManifest(courseSlug);
  if (!course) {
    notFound();
  }

  const lessonIndex = course.lessons.findIndex((lesson) => lesson.id === lessonSlug);
  if (lessonIndex === -1) {
    notFound();
  }

  const lesson = course.lessons[lessonIndex];
  const nextLesson = course.lessons[lessonIndex + 1] ?? null;
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
        {localize(lesson.module, locale)}
      </p>
      <p className="text-xs text-zinc-400">
        {t("progress", { current: lessonIndex + 1, total: course.lessons.length })}
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

  if (lesson.kind === "quiz") {
    const questions = getExamQuiz(courseSlug, lesson.id) ?? [];
    return (
      <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
        <AppHeader />
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-10">
          {lessonHeader}
          {questions.length > 0 ? (
            <ExamQuiz courseSlug={courseSlug} lessonId={lesson.id} questions={questions} />
          ) : (
            <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
              {t("notReady")}
            </p>
          )}
          {progressControls}
        </main>
      </div>
    );
  }

  return (
    // `data-reading-surface` is what the reading themes in globals.css paint;
    // ReadingSettings switches them by writing `data-reading-theme` on <html>.
    <div
      data-reading-surface=""
      className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950"
    >
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
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
              urlTransform={lessonUrlTransform}
            >
              {content}
            </ReactMarkdown>
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
