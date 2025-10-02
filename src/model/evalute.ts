import { CANVAS_HEIGHT, CANVAS_WIDTH, PIECE_HEIGHT } from "../config/canvas";
import type { Puzzle, PuzzlePiece, Positions, Position } from "./puzzle.types";

export function isOnCanvas(pos: Position) {
  const isInRangeInclusive = (n: number, min: number, max: number) =>
    n >= min && n <= max;

  return (
    isInRangeInclusive(pos.x, 0, CANVAS_WIDTH) &&
    isInRangeInclusive(pos.y, 0, CANVAS_HEIGHT)
  );
}

export function checkIfSolved(puzzle: Puzzle, positions: Positions) {
  const ordered = orderPieces(puzzle.pieces, positions);
  const result = ordered.map((p) => p.text).join("");

  return puzzle.pieces.map((p) => p.text).join("") === result;
}

function orderPieces(pieces: PuzzlePiece[], pos: Positions) {
  const lines: Line[] = [];
  const validPieces = pieces.filter((p) => isOnCanvas(pos[p.id]));

  validPieces: for (const piece of validPieces) {
    const top = pos[piece.id].y;
    const bottom = top + PIECE_HEIGHT;

    for (const line of lines) {
      const noOverlap = bottom < line.top || line.bottom < top;
      if (noOverlap) continue;

      line.pieces.push(piece);
      line.top = Math.min(line.top, top);
      line.bottom = Math.max(line.bottom, bottom);
      continue validPieces;
    }

    lines.push({ top, bottom, pieces: [piece] });
  }

  return lines
    .toSorted((a, b) => a.top - b.top)
    .flatMap((l) => l.pieces.toSorted((a, b) => pos[a.id].x - pos[b.id].x));
}

interface Line {
  top: number;
  bottom: number;
  pieces: PuzzlePiece[];
}
