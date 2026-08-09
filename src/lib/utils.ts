/** Joins truthy class-name fragments together (no dedupe/merge — clsx/tailwind-merge aren't in this project). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
