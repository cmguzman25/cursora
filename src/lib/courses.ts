import type { AppLocale } from "@/i18n/routing";
import type { CourseCategory } from "./course-categories";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface Course {
  id: string;
  category: CourseCategory;
  level: CourseLevel;
  durationHours: number;
  studentsCount: number;
  rating: number;
  title: Record<AppLocale, string>;
  description: Record<AppLocale, string>;
}

/**
 * Fictional catalog for the courses page. Will be replaced by a real
 * database query later — the `Course` shape is designed so that swap
 * doesn't require touching the components that consume it.
 */
export const COURSES: Course[] = [
  {
    id: "eng-beginner",
    category: "english",
    level: "beginner",
    durationHours: 16,
    studentsCount: 3200,
    rating: 4.7,
    title: {
      es: "Inglés para principiantes",
      en: "English for Beginners",
      "pt-BR": "Inglês para iniciantes",
    },
    description: {
      es: "Aprende las bases del inglés: vocabulario esencial, gramática simple y frases para el día a día.",
      en: "Learn the basics of English: essential vocabulary, simple grammar, and everyday phrases.",
      "pt-BR": "Aprenda o básico do inglês: vocabulário essencial, gramática simples e frases do dia a dia.",
    },
  },
  {
    id: "eng-business",
    category: "english",
    level: "intermediate",
    durationHours: 22,
    studentsCount: 1580,
    rating: 4.6,
    title: {
      es: "Inglés de negocios",
      en: "Business English",
      "pt-BR": "Inglês para negócios",
    },
    description: {
      es: "Comunícate con confianza en reuniones, correos y presentaciones en un entorno profesional.",
      en: "Communicate with confidence in meetings, emails, and presentations in a professional setting.",
      "pt-BR": "Comunique-se com confiança em reuniões, e-mails e apresentações em um ambiente profissional.",
    },
  },
  {
    id: "pt-beginner",
    category: "portuguese",
    level: "beginner",
    durationHours: 16,
    studentsCount: 2100,
    rating: 4.8,
    title: {
      es: "Português para principiantes",
      en: "Portuguese for Beginners",
      "pt-BR": "Português para iniciantes",
    },
    description: {
      es: "Da tus primeros pasos en portugués con pronunciación, vocabulario y frases básicas de Brasil.",
      en: "Take your first steps in Portuguese with pronunciation, vocabulary, and basic phrases from Brazil.",
      "pt-BR": "Dê os primeiros passos no português com pronúncia, vocabulário e frases básicas do Brasil.",
    },
  },
  {
    id: "pt-conversational",
    category: "portuguese",
    level: "intermediate",
    durationHours: 20,
    studentsCount: 1340,
    rating: 4.7,
    title: {
      es: "Português conversacional",
      en: "Conversational Portuguese",
      "pt-BR": "Português conversacional",
    },
    description: {
      es: "Gana fluidez para conversar en situaciones cotidianas con hablantes nativos de Brasil.",
      en: "Build fluency for everyday conversations with native Brazilian Portuguese speakers.",
      "pt-BR": "Ganhe fluência para conversar em situações do dia a dia com falantes nativos do Brasil.",
    },
  },
  {
    id: "prog-js-intro",
    category: "programming",
    level: "beginner",
    durationHours: 24,
    studentsCount: 4100,
    rating: 4.9,
    title: {
      es: "Introducción a JavaScript",
      en: "Introduction to JavaScript",
      "pt-BR": "Introdução ao JavaScript",
    },
    description: {
      es: "Aprende los fundamentos de programación creando proyectos reales con JavaScript.",
      en: "Learn programming fundamentals by building real projects with JavaScript.",
      "pt-BR": "Aprenda os fundamentos de programação criando projetos reais com JavaScript.",
    },
  },
  {
    id: "prog-python-data",
    category: "programming",
    level: "intermediate",
    durationHours: 30,
    studentsCount: 2670,
    rating: 4.8,
    title: {
      es: "Python para análisis de datos",
      en: "Python for Data Analysis",
      "pt-BR": "Python para análise de dados",
    },
    description: {
      es: "Usa Python, pandas y visualización de datos para responder preguntas con información real.",
      en: "Use Python, pandas, and data visualization to answer questions with real-world data.",
      "pt-BR": "Use Python, pandas e visualização de dados para responder perguntas com dados reais.",
    },
  },
  {
    id: "gen-productivity",
    category: "general",
    level: "beginner",
    durationHours: 10,
    studentsCount: 1890,
    rating: 4.5,
    title: {
      es: "Productividad y gestión del tiempo",
      en: "Productivity & Time Management",
      "pt-BR": "Produtividade e gestão do tempo",
    },
    description: {
      es: "Organiza tu día, prioriza tareas y construye hábitos que te ayuden a avanzar sin agobiarte.",
      en: "Organize your day, prioritize tasks, and build habits that help you move forward without burning out.",
      "pt-BR": "Organize seu dia, priorize tarefas e construa hábitos que ajudam você a avançar sem sobrecarga.",
    },
  },
  {
    id: "gen-public-speaking",
    category: "general",
    level: "intermediate",
    durationHours: 14,
    studentsCount: 1120,
    rating: 4.6,
    title: {
      es: "Oratoria y comunicación efectiva",
      en: "Public Speaking & Effective Communication",
      "pt-BR": "Oratória e comunicação eficaz",
    },
    description: {
      es: "Pierde el miedo a hablar en público y aprende a estructurar ideas que se entiendan y convenzan.",
      en: "Overcome the fear of public speaking and learn to structure ideas that are clear and persuasive.",
      "pt-BR": "Perca o medo de falar em público e aprenda a estruturar ideias claras e persuasivas.",
    },
  },
];
