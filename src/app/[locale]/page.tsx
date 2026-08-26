import { getTranslations } from "next-intl/server";
import { AppHeader } from "@/components/layout/AppHeader";
import { CoursesCatalog } from "@/components/courses/CoursesCatalog";
import { getLessonTotals } from "@content/courses/registry";

export default async function Home() {
  const t = await getTranslations("courses");

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
            {t("heading")}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{t("subheading")}</p>
        </div>
        <CoursesCatalog lessonTotals={getLessonTotals()} />
      </main>
    </div>
  );
}
