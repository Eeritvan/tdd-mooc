export class RotatingShape {
  private grid: string[][]

  constructor(grid: string[][]) {
    this.grid = grid
  }

  static fromString(shape: string) {
    const grid = shape.split("\n").map(x => x.trim().split(""))
    return new RotatingShape(grid)
  }

  toString() {
    return this.grid.map(x => x.join("")).join("\n") + "\n"
  }

  rotateRight() {
    return this.grid
      .map((_, i) => this.grid.map(row => row[i]).reverse())
      .map(x => x.join("")).join("\n") + "\n"
  }
}
