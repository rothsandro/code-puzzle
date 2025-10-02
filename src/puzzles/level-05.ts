import { definePuzzle } from "../model/puzzle-config";

export default definePuzzle({
  id: "05",
  title: "Level 5",
  pieces: [
    "const clamp =",
    "(min, max, value)",
    "=>",
    "Math.min",
    "(",
    "Math.max",
    "(value, min)",
    ",",
    "max",
    ")",
  ],
  solution: `
    const clamp = (min, max, value) => Math.min(Math.max(value, min), max)
  `,
});
