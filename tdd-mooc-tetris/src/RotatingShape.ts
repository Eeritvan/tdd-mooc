export class RotatingShape {
  private grid: string[][]

  constructor(grid: string[][]) {
    this.grid = grid
  }

  static fromString(shape: string) {
    const grid = shape.split("\n").map(x => x.trim().split(""))
    return new RotatingShape(grid)
  }

  private formatGrid(str: string[][]) {
    return str.map(x => x.join("")).join("\n") + "\n"
  }

  toString() {
    return this.formatGrid(this.grid)
  }

  // https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript
  rotateRight(): RotatingShape {
    const rotated = this.grid[0].map((_, i) => this.grid.map(row => row[i]).reverse())
    return new RotatingShape(rotated)
  }

  // https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript
  rotateLeft(): RotatingShape {
    const rotated = this.grid[0].map((_, i) => this.grid.map(row => row[row.length - 1 - i]))
    return new RotatingShape(rotated)
  }
}
