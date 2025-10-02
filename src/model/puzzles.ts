import { useSelector } from "@xstate/react";
import { puzzlesActor } from "./puzzles-actor";
import { useDragDrop } from "../lib/drag-drop";
import { useCallback } from "react";
import { isOnCanvas } from "./evalute";
import { puzzles } from "../puzzles";

export function usePuzzlePieces() {
  const actor = usePuzzle();
  return useSelector(actor, (x) => x.context.pieces);
}

export function usePuzzlePiece(id: string) {
  const actor = usePuzzle();

  const isSolved = useSelector(actor, (ctx) => ctx.matches("solved"));
  const position = useSelector(actor, (ctx) => ctx.context.positions[id]);

  const dragDrop = useDragDrop({
    onMove: useCallback(
      (offset) =>
        actor.send({
          type: "piece.move",
          id,
          x: position.x + offset.x,
          y: position.y + offset.y,
        }),
      [actor, position]
    ),
  });

  return {
    isSolved,
    position,
    ...dragDrop,
    isDragging: dragDrop.isDragging && !isSolved,
  };
}

export function useHasPiecesOnCanvas() {
  const actor = usePuzzle();

  return useSelector(
    actor,
    useCallback((x) => Object.values(x.context.positions).some(isOnCanvas), [])
  );
}

export function useCurrentLevelTitle() {
  return useSelector(puzzlesActor, (x) => puzzles[x.context.gameIdx].title);
}

export function useGameControls() {
  const next = { type: "puzzle.next" as const };
  const prev = { type: "puzzle.prev" as const };

  return {
    restart: () => puzzlesActor.send({ type: "puzzle.restart" }),

    goToNextLevel: () => puzzlesActor.send(next),
    hasNextLevel: useSelector(puzzlesActor, (x) => x.can(next)),

    goToPrevLevel: () => puzzlesActor.send(prev),
    hasPrevLevel: useSelector(puzzlesActor, (x) => x.can(prev)),
  };
}

function usePuzzle() {
  const actor = useSelector(puzzlesActor, (x) => x.children.puzzle);
  if (!actor) throw new Error("Puzzle actor not available");
  return actor;
}
