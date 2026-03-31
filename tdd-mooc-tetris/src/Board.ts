export class Board {
  width: number;
  height: number;
  private dropping: string | null;
  private board: string[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.dropping = null;
    this.board = Array.from({ length: height }, () => Array(width).fill("."));
  }

  toString() {
    return this.board.map((x) => x.join("")).join("\n") + "\n"
  }

  drop(shape: string) {
    this.dropping = shape
    this.board[0][1] = this.dropping
    console.log(this.board)
  }
}
