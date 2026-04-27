import { Tetromino } from "./Tetromino"

export class ShuffleBag {
  private items: Tetromino[]

  constructor(items: Tetromino[] = []) {
    this.items = items
  }

  next() {
    return this.items[0]
  }

  add(item: Tetromino) {
    this.items.push(item)
  }
}
