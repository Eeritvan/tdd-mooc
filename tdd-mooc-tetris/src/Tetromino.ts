import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  private shape: string[][]

  constructor(shape: string[][]) {
    this.shape = shape
  }

  static createGrid(shape: string) {
    const newshape = shape.split("\n").map(x => x.trim().split(""))
    return new Tetromino(newshape)
  }

  static get T_SHAPE(): Tetromino {
    return Tetromino.createGrid(
      `.T.
       TTT
       ...`
    );
  }

  toString() {
    return this.shape.map(x => x.join("")).join("\n") + "\n"
  }

  rotateRight() {
    const str = this.shape.map(x => x.join("")).join("\n") + "\n"
    const testing = RotatingShape.fromString(str)
    return testing.rotateRight()
  }

  rotateLeft() {
    const str = this.shape.map(x => x.join("")).join("\n") + "\n"
    const testing = RotatingShape.fromString(str)
    return testing.rotateLeft()
  }
}
