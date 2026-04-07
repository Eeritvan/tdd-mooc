import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

function fallToBottom(board: Board) {
  for (let i = 0; i < 10; i++) {
    board.moveDown();
  }
}

describe("falling rotating tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino can be rotated right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("a falling tetromino cant be rotated left if there is no room", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.moveLeft()
    fallToBottom(board)

    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.moveRight()
    board.moveRight()
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft()
    board.moveRight()
    board.moveDown()
    board.moveDown()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...I.TI...
       ...ITTI...
       ...I.TI...
       ...I..I...`
    );
  });

  test.skip("a falling tetromino cant be rotated right if there is no room", () => {

  });

  test.skip("wall kick???", () => {

  });
});
