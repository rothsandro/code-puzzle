import { usePuzzlePieces } from "../model/puzzles";
import { Canvas } from "./canvas";
import { CanvasPiece } from "./canvas-piece";
import { GameControls } from "./game-controls";

export function Game() {
  const pieces = usePuzzlePieces();

  return (
    <div className="space-y-4">
      <div className="px-3">
        <GameControls />
      </div>
      <Canvas>
        {pieces.map((piece) => (
          <CanvasPiece key={piece.id} piece={piece} />
        ))}
      </Canvas>
    </div>
  );
}
