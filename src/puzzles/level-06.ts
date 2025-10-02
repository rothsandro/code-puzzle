import { definePuzzle } from "../model/puzzle-config";

export default definePuzzle({
  id: "06",
  title: "Level 6",
  pieces: [
    "values",
    ".map",
    "(Number)",
    ".filter",
    "(Boolean)",
    ".reduce",
    "((a, b) => a + b)",
  ],
  solution: `
    values
      .map(Number)
      .filter(Boolean)
      .reduce((a, b) => a + b)
  `,
});
