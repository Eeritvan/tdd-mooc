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

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.shape = null;
    this.dropping = false;
    this.position = null;
    this.blocks = [];
  }

  toString() {
    const board = Array.from({ length: this.height }, () => Array(this.width).fill("."));
    if (this.position) {
      board[this.position.y][this.position.x] = this.shape
    }
    return board.map((x) => x.join("")).join("\n") + "\n"
  }

  drop(shape: string) {
    if (!this.dropping) {
      this.shape = shape
      this.dropping = true
      this.position = { x: 1, y: 0 }
      return
    }
    throw("already falling")
  }

  tick() {
    if (this.position) {
      if (this.position.y === this.height - 1) {
        this.dropping = false
        const newBlock: Block = {
          position: { x: this.position.x, y: this.position.y },
          shape: this.shape!
        }
        this.blocks.push(newBlock)
        return
      }
      this.position.y = this.position.y + 1
    }
  }

  hasFalling() {
    return this.dropping
  }
}
