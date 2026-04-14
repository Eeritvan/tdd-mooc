export class Tetromino {
  private orientations: string[][][]
  private orientationIndex: number

  constructor(orientations: string[][][], currentOrientation = 0) {
    this.orientations = orientations
    this.orientationIndex = currentOrientation
  }

  static createGrid(shapes: string[][][]) {
    return new Tetromino(shapes)
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
    ])
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
    ])
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
    ])
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
    ])
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
    ])
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
    ])
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
    ])
  }

  toString() {
    const index = ((this.orientationIndex % 4) + 4) % 4
    return this.orientations[index].map(x => x.join("")).join('\n') + '\n'
  }

  rotateRight() {
    return new Tetromino(
      this.orientations,
      this.orientationIndex + 1,
    )
  }

  rotateLeft() {
    return new Tetromino(
      this.orientations,
      this.orientationIndex - 1,
    )
  }

  getGrid() {
    const rotations = ((this.orientationIndex % 4) + 4) % 4;
    return this.orientations[rotations]
  }
}
