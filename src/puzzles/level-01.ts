import { definePuzzle } from "../model/puzzle-config";

export default definePuzzle({
  id: "01",
  title: "Level 1",
  pieces: ["console.log", '("Hello World")'],
  solution: `
    console.log("Hello World")
  `,
});
