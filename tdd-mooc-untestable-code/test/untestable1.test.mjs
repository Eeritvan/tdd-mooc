import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("is a number", () => {
    expect(daysUntilChristmas()).to.be.a("number");
  });

  test("is 0 on christmas day", () => {
    const currentYear = new Date().getFullYear()
    const time = new Date(currentYear, 11, 25)
    expect(daysUntilChristmas(time)).to.be.equal(0);
  });

  test("is 30 a month before christmas", () => {
    const currentYear = new Date().getFullYear()
    const time = new Date(currentYear, 10, 25)
    expect(daysUntilChristmas(time)).to.be.equal(30);
  });
});
