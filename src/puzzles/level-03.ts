import { definePuzzle } from "../model/puzzle-config";

export default definePuzzle({
  id: "03",
  title: "Level 3",
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
