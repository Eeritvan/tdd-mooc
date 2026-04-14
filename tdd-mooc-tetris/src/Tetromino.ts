export class Tetromino {
  private shapes2: string[][][]
  private currentOrientation: number

  constructor(currentOrientation: number, shapes2: string[][][]) {
    this.shapes2 = shapes2
    this.currentOrientation = currentOrientation
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
    const index = ((this.currentOrientation % 4) + 4) % 4
    return this.shapes2[index].map(x => x.join("")).join('\n') + '\n'
  }

  rotateRight() {
    return new Tetromino(
      this.currentOrientation + 1,
      this.shapes2
    )
  }

  rotateLeft() {
    return new Tetromino(
      this.currentOrientation - 1,
      this.shapes2
    )
  }

  getGrid() {
    const rotations = ((this.currentOrientation % 4) + 4) % 4;
    return this.shapes2[rotations]
  }
}
