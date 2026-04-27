import { beforeEach, describe, test } from "vitest"
import { expect } from "chai"
import { Board } from "../src/Board"
import { Scoring } from "../src/Scoring"
import { Tetromino } from "../src/Tetromino"

function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveDown()
  }
}

function dropIOnRight(board: Board) {
  board.drop(Tetromino.I_SHAPE)
  board.tick()
  board.rotateLeft()
  board.moveRight()
  board.moveRight()
  fallToBottom(board)
}

function dropI(board: Board) {
  board.drop(Tetromino.I_SHAPE)
  fallToBottom(board)
}

function clearFourLines(board: Board) {
  for (let i = 0; i < 4; i++) dropI(board)
  dropIOnRight(board)
}

describe("Subscribe", () => {
  let board: Board
  let scoring: Scoring
  beforeEach(() => {
    board = new Board(5, 8)
    scoring = new Scoring()
    board.subscribe(scoring)
  })

  test("clearing 1 line on board rewards 40 points", () => {
    dropI(board)
    dropIOnRight(board)

    expect(scoring.score).to.equal(40)
  })

  test("clearing 4 line on board rewards 1200 points", () => {
    clearFourLines(board)

    expect(scoring.score).to.equal(1200)
  })

  test("clearing 10 line on board increases the level", () => {
    clearFourLines(board)
    clearFourLines(board)
    clearFourLines(board)

    expect(scoring.level).to.equal(1)
  })
})
