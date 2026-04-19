type TetrominoType = "I" | "O" | "T" | "S" | "Z" | "J" | "L" | "OTHER"

export class Tetromino {
  public type: TetrominoType
  private orientations: string[][][]
  private orientationIndex: number

  constructor(orientations: string[][][], type: TetrominoType = "OTHER",  currentOrientation = 0) {
    this.type = type
    this.orientations = orientations
    this.orientationIndex = currentOrientation
  }

  static createGrid(shapes: string[][][], type: TetrominoType) {
    return new Tetromino(shapes, type)
  }

  static get T_SHAPE() {
    return Tetromino.createGrid([
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
    ], "T")
  }

  static get I_SHAPE() {
    return Tetromino.createGrid([
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
    ], "I")
  }

  static get O_SHAPE() {
    return Tetromino.createGrid([
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
    ], "O")
  }

  static get L_SHAPE() {
    return Tetromino.createGrid([
      [
        ['.', '.', '.'],
        ['L', 'L', 'L'],
        ['L', '.', '.']
      ],
      [
        ['.', 'L', '.'],
        ['.', 'L', '.'],
        ['.', 'L', 'L']
      ],
      [
        ['.', '.', '.'],
        ['.', '.', 'L'],
        ['L', 'L', 'L']
      ],
      [
        ['L', 'L', '.'],
        ['.', 'L', '.'],
        ['.', 'L', '.']
      ],
    ], "L")
  }

  static get J_SHAPE() {
    return Tetromino.createGrid([
      [
        ['.', '.', '.'],
        ['J', 'J', 'J'],
        ['.', '.', 'J']
      ],
      [
        ['.', 'J', 'J'],
        ['.', 'J', '.'],
        ['.', 'J', '.']
      ],
      [
        ['.', '.', '.'],
        ['J', '.', '.'],
        ['J', 'J', 'J']
      ],
      [
        ['.', 'J', '.'],
        ['.', 'J', '.'],
        ['J', 'J', '.']
      ],
    ], "L")
  }

  static get S_SHAPE() {
    return Tetromino.createGrid([
      [
        ['.', '.', '.'],
        ['.', 'S', 'S'],
        ['S', 'S', '.']
      ],
      [
        ['S', '.', '.'],
        ['S', 'S', '.'],
        ['.', 'S', '.']
      ],
      [
        ['.', '.', '.'],
        ['.', 'S', 'S'],
        ['S', 'S', '.']
      ],
      [
        ['S', '.', '.'],
        ['S', 'S', '.'],
        ['.', 'S', '.']
      ],
    ], "S")
  }

  static get Z_SHAPE() {
    return Tetromino.createGrid([
      [
        ['.', '.', '.'],
        ['Z', 'Z', '.'],
        ['.', 'Z', 'Z']
      ],
      [
        ['.', '.', 'Z'],
        ['.', 'Z', 'Z'],
        ['.', 'Z', '.']
      ],
      [
        ['.', '.', '.'],
        ['Z', 'Z', '.'],
        ['.', 'Z', 'Z']
      ],
      [
        ['.', '.', 'Z'],
        ['.', 'Z', 'Z'],
        ['.', 'Z', '.']
      ],
    ], "Z")
  }

  toString() {
    const index = ((this.orientationIndex % 4) + 4) % 4
    return this.orientations[index].map(x => x.join("")).join('\n') + '\n'
  }

  rotateRight() {
    return new Tetromino(
      this.orientations,
      this.type,
      this.orientationIndex + 1,
    )
  }

  rotateLeft() {
    return new Tetromino(
      this.orientations,
      this.type,
      this.orientationIndex - 1,
    )
  }

  getGrid() {
    const rotations = ((this.orientationIndex % 4) + 4) % 4
    return this.orientations[rotations]
  }
}
