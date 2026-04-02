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
    const result = Array.from({ length: this.grid.length }, () => Array(this.grid[0].length).fill("."))
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        result[x][this.grid.length - 1 - y] = this.grid[y][x]
      }
    }

    return this.formatGrid(result)
  }

  rotateLeft() {
    const result = Array.from({ length: this.grid.length }, () => Array(this.grid[0].length).fill("."))
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        result[this.grid.length - 1 - x][y] = this.grid[y][x]
      }
    }

    return this.formatGrid(result)
  }
}
