import { Code2, Languages, MessagesSquare, Sparkles } from "lucide-react";
import type { ComponentType } from "react";

export type CourseCategory = "english" | "portuguese" | "programming" | "general";

interface CourseCategoryConfig {
  key: CourseCategory;
  icon: ComponentType<{ className?: string }>;
  gradient: string;
}

/**
 * Single source of truth for course categories: icon + card gradient per
 * category. Labels live in the `courses.categories.*` translation keys —
 * add both here and there when a new category is introduced.
 */
export const COURSE_CATEGORIES: CourseCategoryConfig[] = [
  { key: "english", icon: Languages, gradient: "from-sky-500 to-blue-600" },
  { key: "portuguese", icon: MessagesSquare, gradient: "from-emerald-500 to-teal-600" },
  { key: "programming", icon: Code2, gradient: "from-indigo-500 to-violet-600" },
  { key: "general", icon: Sparkles, gradient: "from-amber-500 to-orange-600" },
];
