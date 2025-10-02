export function AppHeader() {
  return (
    <header className="flex p-6 items-center justify-between">
      <h1 className="text-xl font-semibold">Code Puzzle</h1>
      <a
        href="https://bsky.app/profile/sandroroth.com"
        target="_blank"
        className="text-sm text-gray-500 hover:text-teal-600"
      >
        @sandroroth.com
      </a>
    </header>
  );
}
