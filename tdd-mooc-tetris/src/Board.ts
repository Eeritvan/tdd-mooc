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

  private static toTetromino(s: string | Tetromino) {
    return typeof s === "string" ? Tetromino.createGrid(s) : s
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
    const tetromino = Board.toTetromino(shape)

    const size = tetromino.toString().split("\n").filter(x => x.length !== 0).length

    const test = Math.floor((this.width - size) / 2);
    this.activeBlock = {
      position: { x: test, y: 0 },
      width: size,
      height: size,
      shape
    }
  }

  private placeBlock() {
    const { x: baseX, y: baseY } = this.activeBlock.position

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
        this.grid[y + baseY][x + baseX] = test[y][x]
      }
    }
    this.activeBlock = null
  }

  tick() {
    if (this.activeBlock) {
      const { height, width, position: { x, y }, shape } = this.activeBlock;

      const test = shape
        .toString()
        .split("\n")
        .filter(x => x.length !== 0)
        .map(x => x.split(""))

      const nextYPos = y + 1

      for (let y2 = 0; y2 < height; y2++) {
        for (let x2 = 0; x2 < width; x2++) {
          if (test[y2][x2] === ".") {
            continue
          }

          const newX = x + x2
          const newY = nextYPos + y2

          if (newY >= this.height) {
            this.placeBlock()
            return
          }

          if (this.grid[newY][newX] !== ".") {
            this.placeBlock()
            return
          }
        }
      }
      this.activeBlock.position.y = nextYPos
    }
  }

  hasFalling() {
    return this.activeBlock !== null
  }
}
