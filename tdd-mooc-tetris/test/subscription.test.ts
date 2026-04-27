import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Scoring } from "../src/Scoring";
import { Tetromino } from "../src/Tetromino";

function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveDown();
  }
}

describe("Subscribe", () => {
  let board: Board
  let scoring: Scoring
  beforeEach(() => {
    board = new Board(5, 8);
    scoring = new Scoring();
    board.subscribe(scoring);
  });

  test("clearing 1 line on board rewards 40 points", () => {
    board.drop(Tetromino.I_SHAPE)
    fallToBottom(board)

    board.drop(Tetromino.I_SHAPE)
    board.tick()
    board.rotateLeft()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)

    expect(scoring.score).to.equal(40)
  });
});
