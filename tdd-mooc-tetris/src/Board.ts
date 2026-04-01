export class Board {
  width: number;
  height: number;
  private dropping: string | null;
  private position: { x: number, y: number } | null;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.dropping = null;
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
    this.dropping = shape
    this.position = { x: 1, y: 0 }
  }
}
