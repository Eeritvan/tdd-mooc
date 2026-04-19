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
  let board2: Board
  beforeEach(() => {
    board = new Board(8, 6)
    board2 = new Board(9, 8)
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

  test("gravity works when clearing lines", () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveDown()
    board.rotateRight()
    board.rotateRight()
    moveToLeftWall(board)
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE)
    board.moveDown()
    board.moveRight()
    board.rotateRight()
    board.rotateRight()
    fallToBottom(board)

    board.drop(Tetromino.L_SHAPE)
    board.moveDown()
    board.rotateRight()
    moveToRightWall(board)
    fallToBottom(board)

    expect(board.toString()).to.equalShape(
      `........
       ........
       ........
       ........
       ......L.
       .T..T.L.`
    )
  })

  test("double clear works", () => {
    board2.drop(Tetromino.I_SHAPE)
    moveToLeftWall(board2)
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    moveToLeftWall(board2)
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveRight()
    board2.moveRight()
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveRight()
    board2.moveRight()
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveDown()
    board2.rotateRight()
    moveToRightWall(board2)
    fallToBottom(board2)

    expect(board2.toString()).to.equalShape(
      `.........
       .........
       .........
       .........
       .........
       .........
       ........I
       ........I`
    )
  })

  test("triple clear works", () => {
    board2.drop(Tetromino.I_SHAPE)
    moveToLeftWall(board2)
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    moveToLeftWall(board2)
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    moveToLeftWall(board2)
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveRight()
    board2.moveRight()
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveRight()
    board2.moveRight()
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveRight()
    board2.moveRight()
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveDown()
    board2.rotateRight()
    moveToRightWall(board2)
    fallToBottom(board2)

    expect(board2.toString()).to.equalShape(
      `.........
       .........
       .........
       .........
       .........
       .........
       .........
       ........I`
    )
  })

  test("tetris (four line) clear works", () => {
    board2.drop(Tetromino.I_SHAPE)
    moveToLeftWall(board2)
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    moveToLeftWall(board2)
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    moveToLeftWall(board2)
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    moveToLeftWall(board2)
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveRight()
    board2.moveRight()
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveRight()
    board2.moveRight()
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveRight()
    board2.moveRight()
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveRight()
    board2.moveRight()
    fallToBottom(board2)

    board2.drop(Tetromino.I_SHAPE)
    board2.moveDown()
    board2.rotateRight()
    moveToRightWall(board2)
    fallToBottom(board2)

    expect(board2.toString()).to.equalShape(
      `.........
       .........
       .........
       .........
       .........
       .........
       .........
       .........`
    )
  })
})
