import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  private grid: string[][]


  constructor(grid: string[][]) {
    this.grid = grid
  }

  static createGrid(shape: string) {
    const grid = shape.split("\n").map(x => x.trim().split(""))
    return new Tetromino(grid)
  }

  static get T_SHAPE(): Tetromino {
    return Tetromino.createGrid(
      `.T.
       TTT
       ...`
    );
  }

  toString() {
    return this.grid.map(x => x.join("")).join("\n") + "\n"
  }

  rotateRight() {
    const str = this.grid.map(x => x.join("")).join("\n") + "\n"
    const testing = RotatingShape.fromString(str)
    return testing.rotateRight()
  }

  rotateLeft() {
    const str = this.grid.map(x => x.join("")).join("\n") + "\n"
    const testing = RotatingShape.fromString(str)
    return testing.rotateLeft()
  }
}
