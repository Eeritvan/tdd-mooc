export class RotatingShape {
  private grid: string[][]

  constructor(grid: string[][]) {
    console.log(grid)
    this.grid = grid
  }

  static fromString(shape: string) {
    const grid = shape.split("\n").map(x => x.trim().split(""))
    return new RotatingShape(grid)
  }
}
