export class Board {
  width: number;
  height: number;
  private dropping2: boolean;
  private dropping: string | null;
  private position: { x: number, y: number } | null;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.dropping = null;
    this.dropping2 = false;
    this.position = null;
  }

  toString() {
    const board = Array.from({ length: this.height }, () => Array(this.width).fill("."));
    if (this.position) {
      board[this.position.y][this.position.x] = this.dropping
    }
    return board.map((x) => x.join("")).join("\n") + "\n"
  }

  drop(shape: string) {
    if (!this.dropping) {
      this.dropping = shape
      this.dropping2 = true
      this.position = { x: 1, y: 0 }
      return
    }
    throw("already falling")
  }

  tick() {
    if (this.position) {
      if (this.position.y === this.height - 1) {
        this.dropping2 = false
        return
      }
      this.position.y = this.position.y + 1
    }
  }

  hasFalling() {
    return this.dropping2
  }
}
