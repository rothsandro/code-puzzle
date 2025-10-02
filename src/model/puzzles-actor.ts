import { assign, createActor, setup, spawnChild, stopChild } from "xstate";
import { puzzleMachine } from "./puzzle-actor";
import { puzzles } from "../puzzles";

const machine = setup({
  types: {
    context: {} as { gameIdx: number },
    events: {} as
      | { type: "puzzle.restart" }
      | { type: "puzzle.next" }
      | { type: "puzzle.prev" },
    children: {} as {
      puzzle: "puzzle";
    },
  },
  guards: {
    hasPrevGame: (ctx) => ctx.context.gameIdx > 0,
    hasNextGame: (ctx) => ctx.context.gameIdx + 1 < puzzles.length,
  },
  actors: {
    puzzle: puzzleMachine,
  },
  actions: {
    stopPuzzle: stopChild("puzzle"),
    startPuzzle: spawnChild("puzzle", {
      id: "puzzle",
      input: (ctx) => ({
        puzzle: puzzles[ctx.context.gameIdx],
      }),
    }),
  },
}).createMachine({
  context: { gameIdx: 0 },
  entry: "startPuzzle",
  on: {
    "puzzle.restart": {
      actions: ["stopPuzzle", "startPuzzle"],
    },
    "puzzle.prev": {
      guard: "hasPrevGame",
      actions: [
        assign({ gameIdx: (ctx) => ctx.context.gameIdx - 1 }),
        "stopPuzzle",
        "startPuzzle",
      ],
    },
    "puzzle.next": {
      guard: "hasNextGame",
      actions: [
        assign({ gameIdx: (ctx) => ctx.context.gameIdx + 1 }),
        "stopPuzzle",
        "startPuzzle",
      ],
    },
  },
});

export const puzzlesActor = createActor(machine).start();
