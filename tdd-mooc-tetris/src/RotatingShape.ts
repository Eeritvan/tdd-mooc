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

  rotateRight() {
    return this.formatGrid(this.grid
      .map((_, i) => this.grid.map(row => row[i]).reverse()))
  }
}
