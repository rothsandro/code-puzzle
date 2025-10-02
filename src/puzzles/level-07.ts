import { definePuzzle } from "../model/puzzle-config";

export default definePuzzle({
  id: "07",
  title: "Level 7",
  pieces: [
    "const isTripleNumber =",
    "n =>",
    "/^",
    "(",
    "d",
    ")",
    "\\1",
    "{2}",
    "$/",
    ".test(n)",
  ],
  solution: `
    const isTripleNumber = n => /^(\d)\\1{2}$/.test(n)
  `,
});
