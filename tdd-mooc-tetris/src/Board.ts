export class Board {
  width: number;
  height: number;
  private dropping: string | null;
  private position: { x: number, y: number } | null;
  private board: string[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.dropping = null;
    this.position = null;
    this.board = Array.from({ length: height }, () => Array(width).fill("."));
  }

  toString() {
    return this.board.map((x) => x.join("")).join("\n") + "\n"
  }

  drop(shape: string) {
    this.dropping = shape
    this.position = { x: 0, y: 1 }
    this.board[this.position.x][this.position.y] = this.dropping
  }
}
