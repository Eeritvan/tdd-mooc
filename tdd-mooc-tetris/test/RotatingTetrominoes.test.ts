import { describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino";

function distinctOrientations(shape: Tetromino) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString2());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString2());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The T shape", () => {
  const shape = Tetromino.T_SHAPE2;

  test("initial orientation", () => {
    expect(shape.toString2()).to.equalShape(
      `...
       TTT
       .T.`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString2()).to.equalShape(
      `.T.
       .TT
       .T.`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString2()).to.equalShape(
      `.T.
       TT.
       .T.`
    );
  });

  test("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

describe("The I shape", () => {
  const shape = Tetromino.I_SHAPE2;

  test("initial orientation", () => {
    expect(shape.toString2()).to.equalShape(
      `....
       IIII
       ....
       ....`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString2()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString2()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.`
    );
  });

  test("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});

describe("The O shape", () => {
  const shape = Tetromino.O_SHAPE2;

  test("initial orientation", () => {
    expect(shape.toString2()).to.equalShape(
      `OO
       OO`
    );
  });

  test("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString2()).to.equalShape(
      `OO
       OO`
    );
  });

  test("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString2()).to.equalShape(
      `OO
       OO`
    );
  });

  test("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});
