import { beforeEach, describe, test } from "vitest"
import { Tetromino } from "../src/Tetromino"
import { expect } from "chai"
import { ShuffleBag } from "../src/ShuffleBag"

describe("shuffle bag with all tetromies", () => {
  let shuffleBag: ShuffleBag
  let items: Tetromino[]
  beforeEach(() => {
    items = [
      Tetromino.T_SHAPE,
      Tetromino.J_SHAPE,
      Tetromino.L_SHAPE,
      Tetromino.O_SHAPE,
      Tetromino.S_SHAPE,
      Tetromino.T_SHAPE,
      Tetromino.Z_SHAPE,
    ]
    shuffleBag = new ShuffleBag(items)
  })

  test("returns a tetromino", () => {
    const item = shuffleBag.next()

    expect(items).to.include(item);
  })
})
