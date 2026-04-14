import { RotatingShape } from "./RotatingShape";

export class Tetromino {
  private shape: RotatingShape
  private shapes2: string[][][]
  private orientations: number
  private currentOrientation: number

  constructor(shape: RotatingShape, orientation: number, currentOrientation: number, shapes2: string[][][]) {
    this.shape = shape
    this.shapes2 = shapes2
    this.orientations = orientation
    this.currentOrientation = currentOrientation
  }

  static createGrid(shape: string, orientations: number, currentOrientations = 0) {
    const newShape = RotatingShape.fromString(shape)
    return new Tetromino(
      newShape,
      orientations,
      currentOrientations,
      []
    )
  }

  static createGrid2(shapes: string[][][]) {
    return new Tetromino(
      RotatingShape.fromString('x'),
      4,
      0,
      shapes
    )
  }

  static get T_SHAPE2() {
    return Tetromino.createGrid2([
      [
        ['.', '.', '.'],
        ['T', 'T', 'T'],
        ['.', 'T', '.']
      ],
      [
        ['.', 'T', '.'],
        ['.', 'T', 'T'],
        ['.', 'T', '.']
      ],
      [
        ['.', 'T', '.'],
        ['T', 'T', 'T'],
        ['.', '.', '.']
      ],
      [
        ['.', 'T', '.'],
        ['T', 'T', '.'],
        ['.', 'T', '.']
      ],
    ])
  }

  static get T_SHAPE(): Tetromino {
    return Tetromino.createGrid(
      `.T.
       TTT
       ...`,
      4,
    );
  }

  static get I_SHAPE2() {
    return Tetromino.createGrid2([
      [
        ['.', '.', '.', '.'],
        ['I', 'I', 'I', 'I'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.']
      ],
      [
        ['.', '.', 'I', '.'],
        ['.', '.', 'I', '.'],
        ['.', '.', 'I', '.'],
        ['.', '.', 'I', '.']
      ],
      [
        ['.', '.', '.', '.'],
        ['I', 'I', 'I', 'I'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.']
      ],
      [
        ['.', '.', 'I', '.'],
        ['.', '.', 'I', '.'],
        ['.', '.', 'I', '.'],
        ['.', '.', 'I', '.']
      ],
    ])
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

  static get O_SHAPE2() {
    return Tetromino.createGrid2([
      [
        ['O', 'O'],
        ['O', 'O'],
      ],
      [
        ['O', 'O'],
        ['O', 'O'],
      ],
      [
        ['O', 'O'],
        ['O', 'O'],
      ],
      [
        ['O', 'O'],
        ['O', 'O'],
      ],
    ])
  }

  toString() {
    const rotations = ((this.currentOrientation % this.orientations) + this.orientations) % this.orientations;
    let newShape = this.shape;
    for (let i = 0; i < rotations; i++) {
      newShape = newShape.rotateRight();
    }
    return newShape.toString()
  }

  toString2() {
    const index = ((this.currentOrientation % this.orientations) + this.orientations) % this.orientations
    return this.shapes2[index].map(x => x.join("")).join('\n') + '\n'
  }

  rotateRight() {
    return new Tetromino(
      this.shape,
      this.orientations,
      this.currentOrientation + 1,
      this.shapes2
    )
  }

  rotateLeft() {
    return new Tetromino(
      this.shape,
      this.orientations,
      this.currentOrientation - 1,
      this.shapes2
    )
  }

  getGrid() {
    const rotations = ((this.currentOrientation % this.orientations) + this.orientations) % this.orientations;
    try {
      if (this.shapes2[0].length !== undefined) {
        return this.shapes2[rotations]
      }
    } catch {
      let newShape = this.shape;
      for (let i = 0; i < rotations; i++) {
        newShape = newShape.rotateRight();
      }
      return newShape.getGrid()
    }
  }
}
