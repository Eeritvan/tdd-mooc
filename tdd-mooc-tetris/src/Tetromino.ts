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

  static createGrid(shape: string, orientations: number, currentOrientations = 0) {
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
    );
  }

  static get I_SHAPE(): Tetromino {
    return Tetromino.createGrid(
      `.....
       .....
       IIII.
       .....
       .....`,
      2
    );
  }

  static get O_SHAPE(): Tetromino {
    return Tetromino.createGrid(
      `.OO
       .OO
       ...`,
       1
    );
  }

  toString() {
    const rotations = ((this.currentOrientation % this.orientations) + this.orientations) % this.orientations;
    let newShape = this.shape;
    for (let i = 0; i < rotations; i++) {
      newShape = newShape.rotateRight();
    }
    return newShape.toString()
  }

  rotateRight() {
    return new Tetromino(
      this.shape,
      this.orientations,
      this.currentOrientation + 1,
    )
  }

  rotateLeft() {
    return new Tetromino(
      this.shape,
      this.orientations,
      this.currentOrientation - 1,
    )
  }

  getGrid() {
    const rotations = ((this.currentOrientation % this.orientations) + this.orientations) % this.orientations;
    let newShape = this.shape;
    for (let i = 0; i < rotations; i++) {
      newShape = newShape.rotateRight();
    }
    return newShape.getGrid()
  }
}
