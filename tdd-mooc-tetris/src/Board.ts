import { createLogger } from "vite"
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
      const activeShape = this.activeBlock.shape.getGrid()

      for (let y = 0; y < this.activeBlock.height; y++) {
        for (let x = 0; x < this.activeBlock.width; x++) {
          if (activeShape[y][x] === ".") {
            continue
          }
          display[y + this.activeBlock.position.y][x + this.activeBlock.position.x] = activeShape[y][x]
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

    const middle = Math.floor((this.width - size) / 2);
    this.activeBlock = {
      position: { x: middle, y: 0 },
      width: size,
      height: size,
      shape: newShape
    }
  }

  private placeBlock() {
    if (!this.activeBlock) return

    const { width, height, position: { x: baseX, y: baseY }, shape } = this.activeBlock

    const activeShape = shape.getGrid()
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (activeShape[y][x] === ".") {
          continue
        }
        this.grid[y + baseY][x + baseX] = activeShape[y][x]
      }
    }
    this.activeBlock = null
  }

  tick() {
    if (!this.activeBlock) return

    const { height, width, position: { x: baseX, y: baseY }, shape } = this.activeBlock;
    const activeShape = shape.getGrid()
    const nextYPos = baseY + 1

    for (let y2 = 0; y2 < height; y2++) {
      for (let x2 = 0; x2 < width; x2++) {
        if (activeShape[y2][x2] === ".") {
          continue
        }

        const newX = baseX + x2
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

  moveLeft() {
    if (!this.activeBlock) return

    const { position: { x: baseX, y: baseY }, width, height, shape } = this.activeBlock
    const activeShape = shape.getGrid()
    const nextXPos = baseX - 1

    for (let y2 = 0; y2 < height; y2++) {
      for (let x2 = 0; x2 < width; x2++) {
        if (activeShape[y2][x2] === ".") {
          continue
        }

        const newX = nextXPos + x2
        const newY = baseY + y2

        if (this.grid[newY][newX] !== ".") {
          return
        }
      }
    }

    this.activeBlock.position.x = nextXPos
  }

  moveRight() {
    if (!this.activeBlock) return
    this.activeBlock.position.x = this.activeBlock.position.x + 1
  }

  moveDown() {
    if (!this.activeBlock) return
    this.activeBlock.position.y = this.activeBlock.position.y + 1
  }
}
