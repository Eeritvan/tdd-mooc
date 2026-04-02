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
    const result = Array.from({ length: this.grid.length }, () => Array(this.grid.length).fill("."))

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
      }
    }
    return result
  }
}
