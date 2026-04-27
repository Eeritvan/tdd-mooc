import { Tetromino } from "./Tetromino"

export class ShuffleBag {
  private items: Tetromino[]
  private currentPosition = -1

  constructor(items: Tetromino[] = []) {
    this.items = items
  }

  next() {
    const size = this.items.length
    if (this.currentPosition < 1) {
        this.currentPosition = size - 1
        const currentItem = this.items[0]
        return currentItem
    }
    const pos = Math.floor(Math.random() * this.currentPosition)
    const currentItem = this.items[pos]
    this.items[pos] = this.items[this.currentPosition]
    this.items[this.currentPosition] = currentItem
    this.currentPosition--
    return currentItem
  }

  add(item: Tetromino, amount = 1) {
    for (let i = 0; i < amount; i++) {
      this.items.push(item);
    }
    this.currentPosition = this.items.length - 1;
  }
}
