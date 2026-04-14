export class Tetromino {
  private orientations: string[][][]
  private orientationIndex: number

  constructor(currentOrientation: number, shapes2: string[][][]) {
    this.orientations = shapes2
    this.orientationIndex = currentOrientation
  }

  static createGrid(shapes: string[][][]) {
    return new Tetromino(
      0,
      shapes
    )
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
      this.orientationIndex + 1,
      this.orientations
    )
  }

  rotateLeft() {
    return new Tetromino(
      this.orientationIndex - 1,
      this.orientations
    )
  }

  getGrid() {
    const rotations = ((this.orientationIndex % 4) + 4) % 4;
    return this.orientations[rotations]
  }
}
