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
})
