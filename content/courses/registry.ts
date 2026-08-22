import type { CourseManifest } from "./types";
import { manifest as awsCloudPractitioner } from "./aws-cloud-practitioner/manifest";
import { manifest as fullStackDeveloperAws } from "./full-stack-developer-aws/manifest";

/**
 * Every course the app can render. Adding a course means creating its folder
 * under `content/courses/`, exporting a `manifest` from it, and listing it
 * here — the course and lesson routes are generated from this list.
 *
 * The imports are static on purpose: the routes pre-render at build time, so
 * the manifests have to be part of the bundle, not read at request time.
 */
export const COURSE_MANIFESTS: CourseManifest[] = [awsCloudPractitioner, fullStackDeveloperAws];

const BY_SLUG = new Map(COURSE_MANIFESTS.map((course) => [course.slug, course]));

export function getCourseManifest(slug: string): CourseManifest | null {
  return BY_SLUG.get(slug) ?? null;
}
