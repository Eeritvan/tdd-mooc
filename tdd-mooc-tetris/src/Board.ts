interface Block {
  position: { x: number, y: number };
  shape: string
}

export class Board {
  width: number;
  height: number;
  private activeBlock: Block | null
  private grid: string[][]

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.activeBlock = null;
    this.grid = Array.from({ length: this.height }, () => Array(this.width).fill("."));
  }

  toString() {
    if (this.activeBlock !== null) {
      this.grid[this.activeBlock.position.y][this.activeBlock.position.x] = this.activeBlock.shape
    }
    return this.grid.map((x) => x.join("")).join("\n") + "\n"
  }

  drop(shape: string) {
    if (!this.activeBlock) {
      this.activeBlock = { position: { x: 1, y: 0 }, shape };
      return
    }
    throw("already falling")
  }

  private placeBlock() {
    this.grid[this.activeBlock.position.y][this.activeBlock.position.x] = this.activeBlock.shape
    this.activeBlock = null
  }

  tick() {
    if (this.activeBlock) {
      const nextPos = this.activeBlock.position.y + 1
      if (this.activeBlock.position.y === this.height - 1) {
        this.placeBlock()
        return
      }
      if (this.grid[this.activeBlock?.position.y + 1][this.activeBlock?.position.x] !== ".") {
        this.placeBlock()
        return
      }
      this.activeBlock.position.y = nextPos
    }
  }

  hasFalling() {
    return this.activeBlock !== null
  }
}
