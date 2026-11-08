import { useTheme } from '@/hooks/use-theme';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const resolvedTheme =
    theme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : theme;

  const toggle = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <button
      onClick={toggle}
      className="fixed top-4 right-10 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-neutral-700 bg-white text-neutral-700 transition-colors duration-300 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white"
    >
      {/* Sun - light mode */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute h-5 w-5 scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
      {/* Moon - dark mode */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute h-5 w-5 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
