import type { LocalizedText } from "@content/courses/types";
import type { CourseCategory } from "./course-categories";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  /**
   * When present, the course has real lessons and links to `/courses/[slug]`
   * instead of showing "coming soon". It must match the `slug` of a manifest
   * registered in `content/courses/registry.ts`.
   */
  slug?: string;
  category: CourseCategory;
  level: CourseLevel;
  durationHours: number;
  studentsCount: number;
  rating: number;
  title: LocalizedText;
  description: LocalizedText;
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
  {
    id: "full-stack-developer-aws",
    slug: "full-stack-developer-aws",
    category: "programming",
    level: "beginner",
    durationHours: 90,
    studentsCount: 0,
    rating: 5.0,
    title: {
      es: "Full Stack Developer con AWS",
      en: "Full Stack Developer with AWS",
      "pt-BR": "Full Stack Developer com AWS",
    },
    description: {
      es: "De cero a intermedio construyendo una aplicación real en AWS: React, Node, base de datos, login, despliegue automático y control del gasto.",
      en: "From zero to intermediate building a real application on AWS: React, Node, databases, auth, automated deployments, and cost control.",
      "pt-BR": "Do zero ao intermediário construindo uma aplicação real na AWS: React, Node, banco de dados, login, deploy automático e controle de gastos.",
    },
  },
  {
    id: "aws-data-engineer-associate",
    slug: "aws-data-engineer-associate",
    category: "programming",
    level: "intermediate",
    durationHours: 50,
    studentsCount: 0,
    rating: 5.0,
    title: {
      es: "AWS Certified Data Engineer – Associate",
      en: "AWS Certified Data Engineer – Associate",
      "pt-BR": "AWS Certified Data Engineer – Associate",
    },
    description: {
      es: "Preparación completa para el examen DEA-C01: ingesta y transformación, almacenes de datos, operaciones y gobierno. Clases de 15 minutos, sin laboratorios.",
      en: "Complete DEA-C01 exam prep: ingestion and transformation, data stores, operations, and governance. 15-minute lessons, no labs.",
      "pt-BR": "Preparação completa para o exame DEA-C01: ingestão e transformação, armazenamento, operações e governança. Aulas de 15 minutos, sem laboratórios.",
    },
  },
  {
    id: "ingles-a1",
    slug: "ingles-a1",
    category: "english",
    level: "beginner",
    durationHours: 45,
    studentsCount: 0,
    rating: 5.0,
    title: {
      es: "Inglés A1 desde cero",
      en: "English A1 from scratch",
      "pt-BR": "Inglês A1 do zero",
    },
    description: {
      es: "Seis meses para llegar al nivel A1, con clases de 15 minutos pensadas para quien habla español: pronunciación desde el primer día, frases listas para usar y repaso espaciado.",
      en: "Six months to reach A1 level, with 15-minute lessons built for Spanish speakers: pronunciation from day one, ready-to-use phrases, and spaced review.",
      "pt-BR": "Seis meses para chegar ao nível A1, com aulas de 15 minutos pensadas para quem fala espanhol: pronúncia desde o primeiro dia, frases prontas para usar e revisão espaçada.",
    },
  },
];

export function getCourse(slug: string): Course | null {
  return COURSES.find((course) => course.slug === slug) ?? null;
}
