import { Tetromino } from "./Tetromino"

export class ShuffleBag {
  private items: Tetromino[]

  constructor(items: Tetromino[]) {
    this.items = items
  }

  next() {}

  add() {}
}
