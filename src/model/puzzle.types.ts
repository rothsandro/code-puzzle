export interface Puzzle {
  id: string;
  title: string;
  pieces: PuzzlePiece[];
  solution: string;
}

export interface PuzzlePiece {
  id: string;
  text: string;
}

export interface Position {
  x: number;
  y: number;
}

export type Positions = Record<string, Position>;
