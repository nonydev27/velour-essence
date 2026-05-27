// Simple class name merger without clsx/tailwind-merge dependency
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
