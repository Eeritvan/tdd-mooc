export class Tetromino {
  private grid: string[][]


  constructor(grid: string[][]) {
    this.grid = grid
  }

  static createGrid(shape: string) {
    const grid = shape.split("\n").map(x => x.trim().split(""))
    return new Tetromino(grid)
  }

  static get T_SHAPE(): Tetromino {
    return Tetromino.createGrid(
      `.T.
       TTT
       ...`
    );
  }
}
