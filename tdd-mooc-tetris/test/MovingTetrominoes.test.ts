import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

describe("Moving tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  test("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `OO........
       OO........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("it cannot be moved right beyond the board", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `........OO
       ........OO
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("it cannot be moved down beyond the board", () => {
    board.drop(Tetromino.O_SHAPE);
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()

    expect(board.hasFalling()).to.equal(false)
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....OO....
       ....OO....`
    );
  });

  test("it cannot be moved left through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft()
    board.moveLeft()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()

    board.drop(Tetromino.O_SHAPE);
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveLeft()
    board.moveLeft()
    board.moveLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ...OO.....
       ..TOO.....
       .TTT......`
    );
  });

  test("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    board.moveRight()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveDown()

    board.drop(Tetromino.O_SHAPE);
    board.moveDown()
    board.moveDown()
    board.moveDown()
    board.moveRight()
    board.moveRight()
    board.moveRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....OO....
       ....OOT...
       .....TTT..`
    );
  });
});
