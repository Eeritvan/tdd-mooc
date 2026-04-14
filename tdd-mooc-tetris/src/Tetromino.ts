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

  static get T_SHAPE2() {
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

  static get I_SHAPE2() {
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

  static get O_SHAPE2() {
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
