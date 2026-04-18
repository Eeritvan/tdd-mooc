import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board";
import { Tetromino } from "../src/Tetromino";

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

describe("falling rotating tetrominoes", () => {
  let board: Board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("a falling tetromino can be rotated left", () => {
    board.drop(Tetromino.T_SHAPE)
    board.moveDown()
    board.rotateLeft()

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
    board.moveDown()
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
    board.moveDown()
    board.rotateRight()
    board.moveLeft()
    fallToBottom(board)

    board.drop(Tetromino.I_SHAPE);
    board.moveDown()
    board.rotateRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    board.moveRight()
    board.moveDown()
    board.rotateLeft()
    board.moveDown()
    board.moveDown()
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....I.TI..
       ....ITTI..
       ....I.TI..
       ....I..I..`
    );
  });

  test("a falling tetromino cant be rotated right if there is no room", () => {
    board.drop(Tetromino.I_SHAPE);
    board.moveDown()
    board.rotateRight()
    board.moveLeft()
    fallToBottom(board)

    board.drop(Tetromino.I_SHAPE);
    board.moveDown()
    board.rotateRight()
    board.moveRight()
    board.moveRight()
    fallToBottom(board)

    board.drop(Tetromino.T_SHAPE);
    board.moveRight()
    board.moveRight()
    board.moveDown()
    board.rotateLeft()
    board.moveDown()
    board.moveDown()
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....I.TI..
       ....ITTI..
       ....I.TI..
       ....I..I..`
    );
  });

  test("T-SHAPE left rotation too close to left wall triggers wall kick", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()
    board.rotateRight()
    moveToLeftWall(board)
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ..........
       ..........`
    );
  });

  test("T-SHAPE left rotation too close to right wall triggers wall kick", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()
    board.rotateLeft()
    moveToRightWall(board)
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("T-SHAPE right rotation too close to left wall triggers wall kick", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()
    board.rotateRight()
    moveToLeftWall(board)
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("T-SHAPE right rotation too close to right wall triggers wall kick", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown()
    board.rotateLeft()
    moveToRightWall(board)
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ..........
       ..........`
    );
  });

  test("I-SHAPE cannot be wall kicked on left wall", () => {
    board.drop(Tetromino.I_SHAPE)
    board.moveDown()
    board.moveDown()
    board.rotateLeft()
    moveToLeftWall(board)
    board.rotateLeft()

    expect(board.toString()).to.equalShape(
      `..........
       I.........
       I.........
       I.........
       I.........
       ..........`
    );
  });

  test.skip("I-SHAPE cannot be wall kicked on right wall", () => {
    board.drop(Tetromino.I_SHAPE)
    board.moveDown()
    board.moveDown()
    board.rotateLeft()
    moveToRightWall(board)
    board.rotateRight()

    expect(board.toString()).to.equalShape(
      `..........
       .........I
       .........I
       .........I
       .........I
       ..........`
    )
  })
})
