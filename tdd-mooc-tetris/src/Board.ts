import { Tetromino } from "./Tetromino"

interface ActiveBlock {
  position: { x: number, y: number }
  width: number
  height: number
  shape: Tetromino
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
      const test = this.activeBlock.shape.getGrid()

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
    if (this.activeBlock) throw ("already falling")

    const newShape = typeof shape === "string"
      ? Tetromino.createGrid(shape)
      : shape

    const size = newShape.getGrid().length

    const test = Math.floor((this.width - size) / 2);
    this.activeBlock = {
      position: { x: test, y: 0 },
      width: size,
      height: size,
      shape: newShape
    }
  }

  private placeBlock() {
    if (!this.activeBlock) return

    const { width, height, position: { x: baseX, y: baseY }, shape } = this.activeBlock

    const test = shape.getGrid()
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (test[y][x] === ".") {
          continue
        }
        this.grid[y + baseY][x + baseX] = test[y][x]
      }
    }
    this.activeBlock = null
  }

  tick() {
    if (!this.activeBlock) return

    const { height, width, position: { x, y }, shape } = this.activeBlock;
    const test = shape.getGrid()
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

  hasFalling() {
    return this.activeBlock !== null
  }
}
