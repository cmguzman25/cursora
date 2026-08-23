/**
 * Placeholder block for content that is still loading.
 *
 * Its job is to hold the exact space the real content will take, so nothing
 * jumps when the data lands. Size it with `className` (`h-4 w-40`, etc.).
 * The pulse is dropped for readers who asked for reduced motion.
 */
export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-zinc-200 motion-reduce:animate-none dark:bg-zinc-800 ${className}`}
    />
  );
}
