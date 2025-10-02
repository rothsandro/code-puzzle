import clsx from "clsx";
import type { PuzzlePiece } from "../model/puzzle.types";
import { usePuzzlePiece } from "../model/puzzles";

export interface CanvasPieceProps {
  piece: PuzzlePiece;
}

export function CanvasPiece(props: CanvasPieceProps) {
  const { piece } = props;
  const { isDragging, position, elementProps, isSolved } = usePuzzlePiece(
    piece.id
  );

  return (
    <div
      style={{ left: position.x, top: position.y }}
      className={clsx(
        "absolute",
        "px-2 py-0.5 rounded-4xl",
        "font-mono text-slate-700",
        "select-none whitespace-nowrap",
        "transition-shadow duration-300",
        {
          "bg-gray-100": !isSolved,
          "bg-green-100 text-green-800 cursor-default": isSolved,
          "cursor-grab": !isDragging && !isSolved,
          "shadow-lg z-10 cursor-grabbing": isDragging,
        }
      )}
      {...elementProps}
    >
      {piece.text}
    </div>
  );
}
