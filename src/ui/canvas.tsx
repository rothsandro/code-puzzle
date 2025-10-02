import clsx from "clsx";
import type { ReactNode } from "react";
import {
  CANVAS_HEIGHT,
  CANVAS_OFF_WIDTH,
  CANVAS_WIDTH,
} from "../config/canvas";
import { useHasPiecesOnCanvas } from "../model/puzzles";

export interface CanvasProps {
  children?: ReactNode;
}

export function Canvas(prop: CanvasProps) {
  const { children } = prop;

  return (
    <div
      className="relative rounded-2xl shadow-xs bg-white"
      style={{ paddingLeft: CANVAS_OFF_WIDTH }}
    >
      <div
        className="relative"
        style={{ height: CANVAS_HEIGHT, width: CANVAS_WIDTH }}
      >
        <Separator />
        <Placeholder />
        {children}
      </div>
    </div>
  );
}

function Separator() {
  return <div className="absolute inset-y-10 w-[1px] bg-gray-200" />;
}

function Placeholder() {
  const hasPiecesOnCanvas = useHasPiecesOnCanvas();

  return (
    <div
      className={clsx(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        "font-light text-3xl text-gray-300",
        "select-none pointer-events-none",
        "transition-[scale,opacity] duration-300",
        {
          "scale-150 opacity-0": hasPiecesOnCanvas,
        }
      )}
    >
      Drop the pieces here
    </div>
  );
}
