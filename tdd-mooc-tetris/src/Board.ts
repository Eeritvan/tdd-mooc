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
      ? Tetromino.createGrid([[[ shape ]]])
      : shape

    const grid = newShape.getGrid()
    const size = grid.length

    const isTopEmpty = grid[0].some(x => x !== ".")
    const newY = isTopEmpty ? 0 : -1

    const middle = Math.floor((this.width - size) / 2)
    this.activeBlock = {
      position: { x: middle, y: newY },
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

  private checkCollisions(block: ActiveBlock): boolean {
    const { position: { x: baseX, y: baseY }, width, height, shape } = block
    const activeShape = shape.getGrid()

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (activeShape[y][x] === ".") {
          continue
        }

        const newX = baseX + x
        const newY = baseY + y

        if (newX < 0 || newX >= this.width) {
          return false
        }

        if (newY < 0 || newY >= this.height) {
          return false
        }

        if (this.grid[newY][newX] !== ".") {
          return false
        }
      }
    }

    return true
  }

  tick() {
    if (!this.activeBlock) return

    const { position: { x: baseX, y: baseY } } = this.activeBlock
    const newBlock: ActiveBlock = { ...this.activeBlock, position: { x: baseX, y: baseY + 1 } }

    if (!this.checkCollisions(newBlock)) {
      this.placeBlock()
      return
    }

    this.activeBlock.position.y = baseY + 1
  }

  hasFalling() {
    return this.activeBlock !== null
  }

  moveLeft() {
    if (!this.activeBlock) return

    const { position: { x: baseX, y: baseY } } = this.activeBlock
    const newBlock: ActiveBlock = { ...this.activeBlock, position: { x: baseX - 1, y: baseY  } }

    if (this.checkCollisions(newBlock)) {
      this.activeBlock.position.x = baseX - 1
    }
  }

  moveRight() {
    if (!this.activeBlock) return

    const { position: { x: baseX, y: baseY } } = this.activeBlock
    const newBlock: ActiveBlock = { ...this.activeBlock, position: { x: baseX + 1, y: baseY } }

    if (this.checkCollisions(newBlock)) {
      this.activeBlock.position.x = baseX + 1
    }
  }

  moveDown() {
    if (!this.activeBlock) return

    const { position: { x: baseX, y: baseY } } = this.activeBlock
    const newBlock: ActiveBlock = { ...this.activeBlock, position: { x: baseX, y: baseY + 1 } }

    if (!this.checkCollisions(newBlock)) {
      this.placeBlock()
      return
    }

    this.activeBlock.position.y = baseY + 1
  }

  private isCenterColumnBlocked() {
    if (!this.activeBlock) return false

    const centerRuleBlocks = ["L", "J", "T"]
    if (!centerRuleBlocks.includes(this.activeBlock.shape.type)) return false

    const { position: { x: baseX, y: baseY }, width, height } = this.activeBlock

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (this.grid[y + baseY][x + baseX] !== ".") {
          if (y === 0 && x === 1) {
            return true
          }
          if (y === 1 && x === 1) {
            return true
          }
          if (y === 2 && x === 1) {
            return true
          }
          return false
        }
      }
    }

    return false
  }

  rotateLeft() {
    if (!this.activeBlock) return

    if (this.isCenterColumnBlocked()) return

    const newTetromino = this.activeBlock.shape.rotateLeft()

    const offsets = this.activeBlock.shape.type !== "I" ? [0, 1, -1] : [0]

    for (const xOffset of offsets) {
      const newBlock: ActiveBlock = {
        ...this.activeBlock,
        position: { x: this.activeBlock.position.x + xOffset, y: this.activeBlock.position.y },
        shape: newTetromino,
      }

      if (this.checkCollisions(newBlock)) {
        this.activeBlock = newBlock
        return
      }
    }
  }

  rotateRight() {
    if (!this.activeBlock) return

    if (this.isCenterColumnBlocked()) return

    const newTetromino = this.activeBlock.shape.rotateRight()

    const offsets = this.activeBlock.shape.type !== "I" ? [0, 1, -1] : [0]

    for (const xOffset of offsets) {
      const newBlock: ActiveBlock = {
        ...this.activeBlock,
        position: { x: this.activeBlock.position.x + xOffset, y: this.activeBlock.position.y },
        shape: newTetromino,
      }

      if (this.checkCollisions(newBlock)) {
        this.activeBlock = newBlock
        return
      }
    }
  }
}
