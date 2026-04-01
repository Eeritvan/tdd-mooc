interface Block {
  position: { x: number, y: number };
  shape: string
}

export class Board {
  width: number;
  height: number;
  private shape: string | null;
  private position: { x: number, y: number } | null;
  private blocks: [Block?];
  private activeBlock: Block | null
  private grid2: string[][]

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.shape = null;
    this.position = null;
    this.blocks = [];
    this.activeBlock = null;
    this.grid2 = Array.from({ length: this.height }, () => Array(this.width).fill("."));
  }

  toString() {
    if (this.activeBlock !== null) {
      this.grid2[this.activeBlock.position.y][this.activeBlock.position.x] = this.activeBlock.shape
    }
    return this.grid2.map((x) => x.join("")).join("\n") + "\n"
  }

  drop(shape: string) {
    if (!this.activeBlock) {
      this.shape = shape
      this.position = { x: 1, y: 0 }
      this.activeBlock = { position: { x: 1, y: 0 }, shape };
      return
    }
    throw("already falling")
  }

  private placeBlock() {
    const newBlock: Block = {
      position: { x: this.position.x, y: this.position.y },
      shape: this.shape!
    }
    this.grid2[this.activeBlock.position.y][this.activeBlock.position.x] = this.activeBlock.shape
    this.activeBlock = null
    this.blocks.push(newBlock)
  }

  tick() {
    if (this.position) {
      const nextPos = this.activeBlock.position.y + 1
      if (this.activeBlock.position.y === this.height - 1) {
        this.placeBlock()
        return
      }
      if (this.grid2[this.activeBlock?.position.y + 1][this.activeBlock?.position.x] !== ".") {
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
