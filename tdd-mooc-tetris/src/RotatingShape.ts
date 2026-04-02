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
}
