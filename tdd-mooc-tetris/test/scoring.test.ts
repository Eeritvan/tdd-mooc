import { beforeEach, describe, test } from "vitest"
import { expect } from "chai"
import { Scoring } from "../src/Scoring"

describe("scoring", () => {
  let scoring: Scoring
  beforeEach(() => {
    scoring = new Scoring()
  })

  test("clearing 1 line rewards 40 points", () => {
    scoring.clearLine(1)
    expect(scoring.score).to.equal(40)
  })

  test("clearing 2 line rewards 100 points", () => {
    scoring.clearLine(2)
    expect(scoring.score).to.equal(100)
  })

  test("clearing 3 line rewards 300 points", () => {
    scoring.clearLine(3)
    expect(scoring.score).to.equal(300)
  })

  test("clearing 4 line rewards 1200 points", () => {
    scoring.clearLine(4)
    expect(scoring.score).to.equal(1200)
  })

  test("clearing 10 lines increases the level by one", () => {
    const ogLevel = scoring.level
    scoring.clearLine(4)
    scoring.clearLine(4)
    scoring.clearLine(4)
    expect(scoring.level).to.equal(ogLevel + 1)
  })

  test("clearing 20 lines increases the level by 2", () => {
    const ogLevel = scoring.level
    scoring.clearLine(4)
    scoring.clearLine(4)
    scoring.clearLine(4)
    scoring.clearLine(4)
    scoring.clearLine(4)
    expect(scoring.level).to.equal(ogLevel + 2)
  })

  test("score sums up correctly", () => {
    scoring.clearLine(4)
    scoring.clearLine(4)
    expect(scoring.score).to.equal(2400)
    scoring.clearLine(4)
    scoring.clearLine(4)
    scoring.clearLine(4)
    expect(scoring.score).to.equal(8400)
  })
})
