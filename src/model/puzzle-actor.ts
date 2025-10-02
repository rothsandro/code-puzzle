import { assign, setup } from "xstate";
import { shuffle } from "../lib/random";
import { checkIfSolved } from "./evalute";
import type { Puzzle, PuzzlePiece } from "./puzzle.types";
import {
  CANVAS_HEIGHT,
  CANVAS_OFF_PADDING,
  CANVAS_OFF_WIDTH,
  PIECE_GAP,
  PIECE_HEIGHT,
} from "../config/canvas";
import party from "party-js";

export const puzzleMachine = setup({
  types: {
    input: {} as { puzzle: Puzzle },
    context: {} as {
      puzzle: Puzzle;
      pieces: PuzzlePiece[];
      positions: Record<string, { x: number; y: number }>;
    },
    events: {} as { type: "piece.move"; id: string; x: number; y: number },
  },
  guards: {
    isSolved: (ctx) => checkIfSolved(ctx.context.puzzle, ctx.context.positions),
  },
  actions: {
    showConfetti: () => party.confetti(document.body),
  },
}).createMachine({
  context: ({ input }) => ({
    puzzle: input.puzzle,
    pieces: shuffle(input.puzzle.pieces), // Ensure DOM order is randomized
    positions: Object.fromEntries(
      shuffle(input.puzzle.pieces).map((p, idx, list) => [
        p.id,
        {
          x: -CANVAS_OFF_WIDTH + CANVAS_OFF_PADDING,
          y: CANVAS_OFF_PADDING + getRelativeInitialPosition(list.length, idx),
        },
      ])
    ),
  }),
  initial: "solving",
  states: {
    solving: {
      on: {
        "piece.move": {
          actions: assign({
            positions: (ctx) => ({
              ...ctx.context.positions,
              [ctx.event.id]: { x: ctx.event.x, y: ctx.event.y },
            }),
          }),
        },
      },
      always: {
        guard: "isSolved",
        target: "solved",
      },
    },
    solved: {
      type: "final",
      entry: "showConfetti",
    },
  },
});

function getRelativeInitialPosition(count: number, index: number) {
  const totalHeight = count * PIECE_HEIGHT + (count - 1) * PIECE_GAP;
  const startY = (CANVAS_HEIGHT - totalHeight) / 2;
  return startY + index * (PIECE_HEIGHT + PIECE_GAP);
}
