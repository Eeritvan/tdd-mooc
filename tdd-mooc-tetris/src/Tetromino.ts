import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  private shape: RotatingShape
  private orientations: number
  private currentOrientation: number

  constructor(shape: RotatingShape, orientation: number, currentOrientation: number) {
    this.shape = shape
    this.orientations = orientation
    this.currentOrientation = currentOrientation
  }

  static createGrid(shape: string, orientations: number, currentOrientations: number) {
    const newShape = RotatingShape.fromString(shape)
    return new Tetromino(
      newShape,
      orientations,
      currentOrientations
    )
  }

  static get T_SHAPE(): Tetromino {
    return Tetromino.createGrid(
      `.T.
       TTT
       ...`,
      4,
      0,
    );
  }

  static get I_SHAPE(): Tetromino {
    return Tetromino.createGrid(
      `.....
       .....
       IIII.
       .....
       .....`,
      2,
      0
    );
  }

  static get O_SHAPE(): Tetromino {
    return Tetromino.createGrid(
      `.OO
       .OO
       ...`,
       1,
       0
    );
  }

  toString() {
    return this.shape.toString()
  }

  rotateRight() {
    return new Tetromino(
      this.shape.rotateRight(),
      this.orientations,
      this.currentOrientation = this.currentOrientation + 1,
    )
  }

  rotateLeft() {
    return new Tetromino(
      this.shape.rotateLeft(),
      this.orientations,
      this.currentOrientation = this.currentOrientation - 1,
    )
  }

  getGrid() {
    return this.shape.getGrid()
  }
}
