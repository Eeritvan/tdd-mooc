import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

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

  test.skip("a falling tetromino can be rotated right", () => {

  });

  test.skip("a falling tetromino cant be rotated left if there is no room", () => {

  });

  test.skip("a falling tetromino cant be rotated right if there is no room", () => {

  });

  test.skip("wall kick???", () => {

  });
});
