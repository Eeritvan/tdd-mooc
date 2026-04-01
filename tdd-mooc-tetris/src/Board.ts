interface Block {
  position: { x: number, y: number };
  shape: string
}

export class Board {
  width: number;
  height: number;
  private dropping: boolean;
  private shape: string | null;
  private position: { x: number, y: number } | null;
  private blocks: [Block?];
  private activeBlock: Block | null
  private grid: string[][]

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.shape = null;
    this.dropping = false;
    this.position = null;
    this.blocks = [];
    this.activeBlock = null;
    this.grid = Array.from({ length: this.height }, () => Array(this.width).fill("."));
  }

  toString() {
    if (this.position) {
      this.blocks.map(x => {
        this.grid[x?.position.y][x?.position.x] = x?.shape
      })
      this.grid[this.position.y][this.position.x] = this.shape
    }
    return this.grid.map((x) => x.join("")).join("\n") + "\n"
  }

  drop(shape: string) {
    if (!this.dropping) {
      this.shape = shape
      this.dropping = true
      this.position = { x: 1, y: 0 }
      this.activeBlock = { position: { x: 1, y: 0 }, shape };
      return
    }
    throw("already falling")
  }

  private placeBlock() {
    this.dropping = false
    this.activeBlock = null
    const newBlock: Block = {
      position: { x: this.position.x, y: this.position.y },
      shape: this.shape!
    }
    this.blocks.push(newBlock)
  }

  tick() {
    if (this.position) {
      const nextPos = this.position.y + 1
      for (const block of this.blocks) {
        if (block?.position.y === nextPos) {
          this.placeBlock()
          return
        }
      }
      if (this.position.y === this.height - 1) {
        this.placeBlock()
        return
      }
      this.position.y = nextPos
    }
  }

  hasFalling() {
    return this.dropping
  }
}
