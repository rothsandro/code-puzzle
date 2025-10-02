import type { Puzzle } from "./puzzle.types";

export type PuzzleConfig = Omit<Puzzle, "pieces"> & {
  pieces: string[];
};

export function definePuzzle(puzzle: PuzzleConfig): Puzzle {
  validatePieces(puzzle.pieces, puzzle.solution);

  return {
    ...puzzle,
    pieces: puzzle.pieces.map((text) => ({ id: crypto.randomUUID(), text })),
  };
}

function validatePieces(pieces: string[], solution: string) {
  pieces.reduce((acc, piece) => {
    acc = acc.trimStart();
    if (!acc.startsWith(piece)) {
      throw new Error(`Piece "${piece}" does not fit. Current: "${acc}"`);
    }

    return acc.slice(piece.length);
  }, solution);
}
