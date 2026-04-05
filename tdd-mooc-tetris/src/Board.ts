import { Tetromino } from "./Tetromino"

interface ActiveBlock {
  position: { x: number, y: number }
  width: number
  height: number
  shape: string | Tetromino
}

export class Board {
  private width: number
  private height: number
  private activeBlock: ActiveBlock | null = null
  private grid: string[][]

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.grid = Array.from({ length: this.height }, () => Array(this.width).fill("."))
  }

  toString() {
    const display = this.grid.map(row => row.slice())

    if (this.activeBlock !== null) {
      const test = this.activeBlock.shape
        .toString()
        .split("\n")
        .filter(x => x.length !== 0)
        .map(x => x.split(""))
      for (let y = 0; y < this.activeBlock.height; y++) {
        for (let x = 0; x < this.activeBlock.width; x++) {
          if (test[y][x] === ".") {
            continue
          }
          display[y + this.activeBlock.position.y][x + this.activeBlock.position.x] = test[y][x]
        }
      }
    }
    return display.map((x) => x.join("")).join("\n") + "\n"
  }

  drop(shape: string | Tetromino) {
    if (this.activeBlock) {
      throw("already falling")
    }
    const size = typeof shape !== "string"
      ? shape.toString().split("\n").filter(x => x.length !== 0).length
      : 1
    const test = Math.floor((this.width - size) / 2);
    this.activeBlock = {
      position: { x: test, y: 0 },
      width: size,
      height: size,
      shape
    }
  }

  private placeBlock() {
    const { x, y } = this.activeBlock.position
    this.grid[y][x] = this.activeBlock.shape
    this.activeBlock = null
  }

  tick() {
    if (this.activeBlock) {
      const { x, y } = this.activeBlock.position;
      const nextYPos = y + 1
      if (nextYPos === this.height) {
        this.placeBlock()
        return
      }
      if (this.grid[nextYPos][x] !== ".") {
        this.placeBlock()
        return
      }
      this.activeBlock.position.y = nextYPos
    }
  }

  hasFalling() {
    return this.activeBlock !== null
  }
}
