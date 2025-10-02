import { definePuzzle } from "../model/puzzle-config";

export default definePuzzle({
  id: "02",
  title: "Level 2",
  pieces: ["const sum = ", "(a, b)", "=>", "a + b;"],
  solution: `
    const sum = (a, b) => a + b;
  `,
});
