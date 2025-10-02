import { definePuzzle } from "../model/puzzle-config";

export default definePuzzle({
  id: "03",
  title: "Level 3",
  pieces: [
    "setTimeout",
    "(",
    "console.log",
    ",",
    "1000",
    ",",
    '"Hello World"',
    ")",
  ],
  solution: `
    setTimeout(console.log, 1000, "Hello World")
  `,
});
