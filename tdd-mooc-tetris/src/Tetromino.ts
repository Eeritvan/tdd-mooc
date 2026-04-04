import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  private shape: RotatingShape

  constructor(shape: RotatingShape) {
    this.shape = shape
  }

  static createGrid(shape: string) {
    const newShape = RotatingShape.fromString(shape)
    return new Tetromino(newShape)
  }

  static get T_SHAPE(): Tetromino {
    return Tetromino.createGrid(
      `.T.
       TTT
       ...`
    );
  }

  toString() {
    return this.shape.toString()
  }

  rotateRight() {
    return this.shape.rotateRight()
  }

  rotateLeft() {
    return this.shape.rotateLeft()
  }
}
