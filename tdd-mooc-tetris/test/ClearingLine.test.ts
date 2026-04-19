import { beforeEach, describe, test } from "vitest"
import { expect } from "chai"
import { Board } from "../src/Board"
import { Tetromino } from "../src/Tetromino"

function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveDown();
  }
}

function moveToLeftWall(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}

function moveToRightWall(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

describe("Clearing lines", () => {
  let board: Board
  beforeEach(() => {
    board = new Board(8, 6)
  })

  test("bottom line can be cleared", () => {
    board.drop(Tetromino.I_SHAPE)
    moveToLeftWall(board)
    fallToBottom(board)

    board.drop(Tetromino.I_SHAPE)
    moveToRightWall(board)
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `........
       ........
       ........
       ........
       ........
       ........`
    )
  })
})
