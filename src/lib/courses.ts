import type { AppLocale } from "@/i18n/routing";
import type { CourseCategory } from "./course-categories";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  /** When present, the course has real lessons and links to `/courses/[slug]` instead of showing "coming soon". */
  slug?: string;
  category: CourseCategory;
  level: CourseLevel;
  durationHours: number;
  studentsCount: number;
  rating: number;
  title: Record<AppLocale, string>;
  description: Record<AppLocale, string>;
}

/**
 * Catalog for the courses page. Will be replaced by a real database query
 * later — the `Course` shape is designed so that swap doesn't require
 * touching the components that consume it.
 */
export const COURSES: Course[] = [
  {
    id: "aws-cloud-practitioner",
    slug: "aws-cloud-practitioner",
    category: "programming",
    level: "beginner",
    durationHours: 20,
    studentsCount: 8,
    rating: 5.0,
    title: {
      es: "AWS Certified Cloud Practitioner",
      en: "AWS Certified Cloud Practitioner",
      "pt-BR": "AWS Certified Cloud Practitioner",
    },
    description: {
      es: "Prepárate para la certificación fundacional de AWS: conceptos de la nube, seguridad, servicios principales y precios.",
      en: "Get ready for AWS's foundational certification: cloud concepts, security, core services, and pricing.",
      "pt-BR": "Prepare-se para a certificação fundamental da AWS: conceitos de nuvem, segurança, serviços principais e preços.",
    },
  },
];
