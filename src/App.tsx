import { AppHeader } from "./ui/app-header";
import { Game } from "./ui/game";

export function App() {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr]">
      <AppHeader />
      <main className="grid place-items-center px-6 py-12">
        <Game />
      </main>
    </div>
  );
}
