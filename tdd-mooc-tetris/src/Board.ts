import { Tetromino } from "./Tetromino"

export interface Block extends Tetromino {
  width: number
  height: number
}

interface ActiveBlock {
  position: { x: number, y: number }
  shape: string
}

export class Board {
  width: number
  height: number
  private activeBlock: ActiveBlock | null = null
  private activeBlock2: ActiveBlock | null = null
  private grid: string[][]

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.grid = Array.from({ length: this.height }, () => Array(this.width).fill("."))
  }

  toString() {
    if (this.activeBlock !== null) {
      const { x, y } = this.activeBlock.position
      this.grid[y][x] = this.activeBlock.shape
    }
    return this.grid.map((x) => x.join("")).join("\n") + "\n"
  }

  drop(shape: string) {
    if (this.activeBlock) {
      throw("already falling")
    }
    this.activeBlock = { position: { x: 1, y: 0 }, shape }
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
