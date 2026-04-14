import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveDown();
  }
}

function moveToLeftBorder(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveLeft();
  }
}

function moveToRightBorder(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveRight();
  }
}

describe("Moving tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be moved left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..TTT.....
       ...T......
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be moved right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `..........
       ....TTT...
       .....T....
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
       ..........
       ...TTT....
       ....T.....
       ..........
       ..........`
    );
  });

  test("it cannot be moved left beyond the board", () => {
    board.drop(Tetromino.O_SHAPE);
    moveToLeftBorder(board)

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
    moveToRightBorder(board)

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
    fallToBottom(board)

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
    fallToBottom(board)

    board.drop(Tetromino.O_SHAPE);
    board.moveDown()
    board.moveDown()
    board.moveDown()
    moveToLeftBorder(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....OO....
       .TTTOO....
       ..T.......`
    );
  });

  test("it cannot be moved right through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)

    board.drop(Tetromino.O_SHAPE);
    board.moveDown()
    board.moveDown()
    board.moveDown()
    moveToRightBorder(board)

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....OO....
       ....OOTTT.
       .......T..`
    );
  });

  test("it cannot be moved down through other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board)

    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board)

    expect(board.hasFalling()).to.equal(false)
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....OO....
       ....OO....
       ...TTT....
       ....T.....`
    );
  });
});
