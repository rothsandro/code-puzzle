import { definePuzzle } from "../model/puzzle-config";

export default definePuzzle({
  id: "04",
  title: "Level 4",
  pieces: [
    "row",
    ":",
    "for (let row of rows) {",
    "for (let cell of row) {",
    "if (!cell)",
    "break",
    "row",
    'console.log("Cell", cell)',
    "}",
    "}",
  ],
  solution: `
    row: for (let row of rows) {
      for (let cell of row) {
        if (!cell) break row
        console.log("Cell", cell)
      }
    }
  `,
});
