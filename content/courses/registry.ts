import type { CourseManifest, ExamQuizQuestion } from "./types";
import { manifest as awsCloudPractitioner } from "./aws-cloud-practitioner/manifest";
import { EXAM_QUIZZES as AWS_CLOUD_PRACTITIONER_QUIZZES } from "./aws-cloud-practitioner/preguntas";
import { manifest as fullStackDeveloperAws } from "./full-stack-developer-aws/manifest";
import { manifest as awsDataEngineerAssociate } from "./aws-data-engineer-associate/manifest";
import { EXAM_QUIZZES as AWS_DATA_ENGINEER_QUIZZES } from "./aws-data-engineer-associate/preguntas";

/**
 * Every course the app can render. Adding a course means creating its folder
 * under `content/courses/`, exporting a `manifest` from it, and listing it
 * here — the course and lesson routes are generated from this list.
 *
 * The imports are static on purpose: the routes pre-render at build time, so
 * the manifests have to be part of the bundle, not read at request time.
 */
export const COURSE_MANIFESTS: CourseManifest[] = [
  awsCloudPractitioner,
  fullStackDeveloperAws,
  awsDataEngineerAssociate,
];

const BY_SLUG = new Map(COURSE_MANIFESTS.map((course) => [course.slug, course]));

export function getCourseManifest(slug: string): CourseManifest | null {
  return BY_SLUG.get(slug) ?? null;
}

/**
 * How many lessons each course has, keyed by slug — the denominator of the
 * catalog's progress percentage. Built here rather than in the catalog itself
 * because this module pulls in every manifest (and its question banks); the
 * catalog is a client component, and importing the registry there would ship
 * all of that to the browser to count array lengths.
 */
export function getLessonTotals(): Record<string, number> {
  return Object.fromEntries(COURSE_MANIFESTS.map((course) => [course.slug, course.lessons.length]));
}

/** Question banks for "quiz"-kind lessons (see `LessonMeta.kind`), keyed by course slug then lesson id. */
const EXAM_QUIZZES: Record<string, Record<string, ExamQuizQuestion[]>> = {
  [awsCloudPractitioner.slug]: AWS_CLOUD_PRACTITIONER_QUIZZES,
  [awsDataEngineerAssociate.slug]: AWS_DATA_ENGINEER_QUIZZES,
};

export function getExamQuiz(courseSlug: string, lessonId: string): ExamQuizQuestion[] | null {
  return EXAM_QUIZZES[courseSlug]?.[lessonId] ?? null;
}
