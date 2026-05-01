import { describe, test as found } from "vitest";
import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";
import seedrandom from "seedrandom";

describe("Untestable 2: a dice game", () => {
  const seeds = [
    "testSeed1",
    "testSeed2",
    "testSeed3",
    "testSeed4",
    "testSeed5",
    "testSeed6",
    "testSeed7",
    "testSeed8",
    "testSeed9",
    "testSeed10",
  ]

  found("returns a number", () => {
    expect(diceHandValue()).to.be.a("number");
  });

  found("returns random numbers every time", () => {
    const randomSeed = seeds[Math.floor(Math.random()*seeds.length)];
    seedrandom(randomSeed, { global: true });

    const list1 = []
    for (let i = 0; i < 100; i++) {
      list1.push(diceHandValue())
    }

    const list2 = []
    for (let i = 0; i < 100; i++) {
      list2.push(diceHandValue())
    }

    // https://www.geeksforgeeks.org/javascript/how-to-compare-two-arrays-in-javascript/
    const areListsEqual = JSON.stringify(list1) === JSON.stringify(list2)
    expect(areListsEqual).to.be.false;
  });

  found("returns all the possible random outcomes eventually", () => {
    const randomSeed = seeds[Math.floor(Math.random()*seeds.length)];
    seedrandom(randomSeed, { global: true });

    const found = new Set()
    for (let i = 0; i < 10000; i++) {
       const result = diceHandValue()
       found.add(result)
    }
    expect(found.has(2)).to.be.true;
    expect(found.has(3)).to.be.true;
    expect(found.has(4)).to.be.true;
    expect(found.has(5)).to.be.true;
    expect(found.has(6)).to.be.true;

    expect(found.has(101)).to.be.true;
    expect(found.has(102)).to.be.true;
    expect(found.has(103)).to.be.true;
    expect(found.has(104)).to.be.true;
    expect(found.has(105)).to.be.true;
    expect(found.has(106)).to.be.true;
  });

  found("does not return a negative number", () => {
    const randomSeed = seeds[Math.floor(Math.random()*seeds.length)];
    seedrandom(randomSeed, { global: true });

    let negativeFound = false
    for (let i = 0; i < 10000; i++) {
      const result = diceHandValue()
      if (result < 0) {
        negativeFound = true
      }
    }

    expect(negativeFound).to.be.false;
  });
});
