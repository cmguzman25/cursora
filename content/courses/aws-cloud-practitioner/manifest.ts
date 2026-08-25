import type { CourseManifest, LessonMeta, LocalizedText } from "../types";

const COURSE_SLUG = "aws-cloud-practitioner";
const COURSE_TITLE: LocalizedText = {
  es: "AWS Certified Cloud Practitioner (CLF-C02)",
  en: "AWS Certified Cloud Practitioner (CLF-C02)",
  "pt-BR": "AWS Certified Cloud Practitioner (CLF-C02)",
};

const MODULES: Record<string, LocalizedText> = {
  "module-0": {
    es: "Módulo 0 — Bienvenida y preparación",
    en: "Module 0 — Welcome and setup",
    "pt-BR": "Módulo 0 — Boas-vindas e preparação",
  },
  "module-1": {
    es: "Módulo 1 — Conceptos de la nube",
    en: "Module 1 — Cloud Concepts",
    "pt-BR": "Módulo 1 — Conceitos de nuvem",
  },
  "module-2": {
    es: "Módulo 2 — Seguridad y cumplimiento",
    en: "Module 2 — Security and Compliance",
    "pt-BR": "Módulo 2 — Segurança e conformidade",
  },
  "module-3": {
    es: "Módulo 3 — Tecnología y servicios en la nube",
    en: "Module 3 — Cloud Technology and Services",
    "pt-BR": "Módulo 3 — Tecnologia e serviços na nuvem",
  },
  "module-4": {
    es: "Módulo 4 — Facturación, precios y soporte",
    en: "Module 4 — Billing, Pricing, and Support",
    "pt-BR": "Módulo 4 — Faturamento, preços e suporte",
  },
  "module-5": {
    es: "Módulo 5 — Repaso final y simulacro",
    en: "Module 5 — Final Review and Practice Exam",
    "pt-BR": "Módulo 5 — Revisão final e simulado",
  },
};

const LESSONS: LessonMeta[] = [
  { id: "00-bienvenida", moduleId: "module-0", module: MODULES["module-0"], title: { es: "Objetivos del curso y cómo está organizado", en: "Course goals and how it's organized", "pt-BR": "Objetivos do curso e como ele está organizado" } },
  { id: "01-cuenta-free-tier", moduleId: "module-0", module: MODULES["module-0"], title: { es: "Cómo crear y proteger una cuenta AWS Free Tier", en: "Creating and securing an AWS Free Tier account", "pt-BR": "Como criar e proteger uma conta AWS Free Tier" } },
  { id: "02-inscripcion-examen", moduleId: "module-0", module: MODULES["module-0"], title: { es: "Cómo inscribirse al examen y qué esperar el día de la prueba", en: "Registering for the exam and what to expect on test day", "pt-BR": "Como se inscrever no exame e o que esperar no dia da prova" } },

  { id: "03-beneficios-de-aws", moduleId: "module-1", module: MODULES["module-1"], title: { es: "Beneficios de AWS Cloud", en: "Benefits of AWS Cloud", "pt-BR": "Benefícios da AWS Cloud" } },
  { id: "04-well-architected-framework", moduleId: "module-1", module: MODULES["module-1"], title: { es: "Principios de diseño: AWS Well-Architected Framework", en: "Design principles: the AWS Well-Architected Framework", "pt-BR": "Princípios de design: AWS Well-Architected Framework" } },
  { id: "05-migracion-y-aws-caf", moduleId: "module-1", module: MODULES["module-1"], title: { es: "Migración a la nube: AWS Cloud Adoption Framework", en: "Cloud migration: the AWS Cloud Adoption Framework", "pt-BR": "Migração para a nuvem: AWS Cloud Adoption Framework" } },
  { id: "06-economia-de-la-nube", moduleId: "module-1", module: MODULES["module-1"], title: { es: "Economía de la nube", en: "Cloud economics", "pt-BR": "Economia da nuvem" } },
  { id: "07-comparativas-conceptos-de-la-nube", moduleId: "module-1", module: MODULES["module-1"], title: { es: "★ Tablas comparativas: conceptos de la nube", en: "★ Comparison tables: cloud concepts", "pt-BR": "★ Tabelas comparativas: conceitos de nuvem" } },
  { id: "08-analisis-preguntas-modulo-1", moduleId: "module-1", module: MODULES["module-1"], title: { es: "Analiza preguntas de examen: conceptos de la nube", en: "Exam question breakdown: cloud concepts", "pt-BR": "Análise de questões de exame: conceitos de nuvem" }, kind: "quiz" },

  { id: "09-responsabilidad-compartida", moduleId: "module-2", module: MODULES["module-2"], title: { es: "Modelo de responsabilidad compartida", en: "The Shared Responsibility Model", "pt-BR": "Modelo de responsabilidade compartilhada" } },
  { id: "10-gobierno-y-cumplimiento", moduleId: "module-2", module: MODULES["module-2"], title: { es: "Seguridad, gobierno y cumplimiento", en: "Security, governance, and compliance", "pt-BR": "Segurança, governança e conformidade" } },
  { id: "11-iam-y-gestion-de-accesos", moduleId: "module-2", module: MODULES["module-2"], title: { es: "Gestión de accesos: IAM", en: "Access management: IAM", "pt-BR": "Gestão de acessos: IAM" } },
  { id: "12-servicios-de-seguridad", moduleId: "module-2", module: MODULES["module-2"], title: { es: "Componentes y recursos de seguridad", en: "Security components and resources", "pt-BR": "Componentes e recursos de segurança" } },
  { id: "13-comparativas-seguridad", moduleId: "module-2", module: MODULES["module-2"], title: { es: "★ Tablas comparativas: seguridad", en: "★ Comparison tables: security", "pt-BR": "★ Tabelas comparativas: segurança" } },
  { id: "14-analisis-preguntas-modulo-2", moduleId: "module-2", module: MODULES["module-2"], title: { es: "Analiza preguntas de examen: seguridad", en: "Exam question breakdown: security", "pt-BR": "Análise de questões de exame: segurança" } },

  { id: "15-formas-de-desplegar", moduleId: "module-3", module: MODULES["module-3"], title: { es: "Formas de desplegar y operar en AWS", en: "Ways to deploy and operate on AWS", "pt-BR": "Formas de implantar e operar na AWS" } },
  { id: "16-infraestructura-global", moduleId: "module-3", module: MODULES["module-3"], title: { es: "Infraestructura global de AWS", en: "AWS Global Infrastructure", "pt-BR": "Infraestrutura global da AWS" } },
  { id: "17-servicios-de-computo", moduleId: "module-3", module: MODULES["module-3"], title: { es: "Servicios de cómputo", en: "Compute services", "pt-BR": "Serviços de computação" } },
  { id: "18-servicios-de-bases-de-datos", moduleId: "module-3", module: MODULES["module-3"], title: { es: "Servicios de bases de datos", en: "Database services", "pt-BR": "Serviços de banco de dados" } },
  { id: "19-servicios-de-red", moduleId: "module-3", module: MODULES["module-3"], title: { es: "Servicios de red", en: "Networking services", "pt-BR": "Serviços de rede" } },
  { id: "20-almacenamiento-objetos-y-bloques", moduleId: "module-3", module: MODULES["module-3"], title: { es: "Almacenamiento — objetos y bloques", en: "Storage — objects and blocks", "pt-BR": "Armazenamento — objetos e blocos" } },
  { id: "21-almacenamiento-archivos-y-backup", moduleId: "module-3", module: MODULES["module-3"], title: { es: "Almacenamiento — archivos y protección de datos", en: "Storage — files and data protection", "pt-BR": "Armazenamento — arquivos e proteção de dados" } },
  { id: "22-ia-ml-y-analitica", moduleId: "module-3", module: MODULES["module-3"], title: { es: "IA/ML y analítica", en: "AI/ML and analytics", "pt-BR": "IA/ML e análise de dados" } },
  { id: "23-integracion-y-soporte-al-cliente", moduleId: "module-3", module: MODULES["module-3"], title: { es: "Integración, mensajería y soporte al cliente", en: "Integration, messaging, and customer engagement", "pt-BR": "Integração, mensageria e atendimento ao cliente" } },
  { id: "24-desarrollo-end-user-computing-e-iot", moduleId: "module-3", module: MODULES["module-3"], title: { es: "Desarrollo, cómputo para el usuario final e IoT", en: "Developer tools, end-user computing, and IoT", "pt-BR": "Ferramentas de desenvolvedor, computação para o usuário final e IoT" } },
  { id: "25-comparativas-tecnologia-y-servicios", moduleId: "module-3", module: MODULES["module-3"], title: { es: "★ Tablas comparativas: tecnología y servicios", en: "★ Comparison tables: technology and services", "pt-BR": "★ Tabelas comparativas: tecnologia e serviços" } },
  { id: "26-analisis-preguntas-modulo-3", moduleId: "module-3", module: MODULES["module-3"], title: { es: "Analiza preguntas de examen: tecnología y servicios", en: "Exam question breakdown: technology and services", "pt-BR": "Análise de questões de exame: tecnologia e serviços" } },

  { id: "27-modelos-de-precios", moduleId: "module-4", module: MODULES["module-4"], title: { es: "Modelos de precios", en: "Pricing models", "pt-BR": "Modelos de preços" } },
  { id: "28-facturacion-y-costos", moduleId: "module-4", module: MODULES["module-4"], title: { es: "Recursos de facturación y costos", en: "Billing and cost management tools", "pt-BR": "Recursos de faturamento e custos" } },
  { id: "29-soporte-y-recursos-tecnicos", moduleId: "module-4", module: MODULES["module-4"], title: { es: "Soporte técnico", en: "Technical support", "pt-BR": "Suporte técnico" } },
  { id: "30-comparativas-precios-y-soporte", moduleId: "module-4", module: MODULES["module-4"], title: { es: "★ Tablas comparativas: precios y soporte", en: "★ Comparison tables: pricing and support", "pt-BR": "★ Tabelas comparativas: preços e suporte" } },
  { id: "31-analisis-preguntas-modulo-4", moduleId: "module-4", module: MODULES["module-4"], title: { es: "Analiza preguntas de examen: precios y soporte", en: "Exam question breakdown: pricing and support", "pt-BR": "Análise de questões de exame: preços e suporte" } },

  { id: "32-repaso-por-dominio", moduleId: "module-5", module: MODULES["module-5"], title: { es: "Repaso rápido por dominio", en: "Quick review by domain", "pt-BR": "Revisão rápida por domínio" } },
  { id: "33-simulacro-de-examen", moduleId: "module-5", module: MODULES["module-5"], title: { es: "Examen de práctica completo", en: "Full practice exam", "pt-BR": "Simulado completo" } },
  { id: "34-estrategias-dia-del-examen", moduleId: "module-5", module: MODULES["module-5"], title: { es: "Estrategias para el día del examen", en: "Exam-day strategies", "pt-BR": "Estratégias para o dia do exame" } },
];

export const manifest: CourseManifest = {
  slug: COURSE_SLUG,
  title: COURSE_TITLE,
  lessons: LESSONS,
};
