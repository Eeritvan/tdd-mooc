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

  test("return all tetrominoes eventually", () => {
    const testSet = new Set()
    for (let i = 0; i < 100; i++) {
      testSet.add(shuffleBag.next())
    }

    expect(testSet.size).to.equal(7);
  })

  test("1 item can be added to the bag", () => {
    const newBag = new ShuffleBag()
    newBag.add(Tetromino.O_SHAPE)

    const testSet = new Set()
    for (let i = 0; i < 100; i++) {
      testSet.add(newBag.next())
    }

    expect(testSet.size).to.equal(1);
  })

  test("multiple items can be added to the bag", () => {
    const newBag = new ShuffleBag()
    newBag.add(Tetromino.O_SHAPE, 5)

    const testSet = new Set()
    for (let i = 0; i < 100; i++) {
      testSet.add(newBag.next())
    }

    expect(testSet.size).to.equal(1);
  })
})
