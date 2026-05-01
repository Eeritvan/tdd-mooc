import { describe, test } from "vitest";
import { expect } from "chai";
import { readCSV, parsePeopleCsv, processData } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  test("reads file correctly", async () => {
    const result = await readCSV("test/test.csv")
    expect(result).to.not.be.empty;
  });

  test("reads file correctly and contains correct information", async () => {
    const result = await readCSV("test/test.csv")
    expect(result).to.contain("Loid,Forger,,Male");
    expect(result).to.contain("Anya,Forger,6,Female");
    expect(result).to.contain("Yor,Forger,27,Female");
  });

  test("parses single line correctly", async () => {
    const data = "Yor,Forger,27,Female"
    const parsed = processData(data)

    expect(parsed).to.deep.equal([
      { firstName: 'Yor', lastName: 'Forger', gender: 'f', age: 27 }
    ]);
  });

  test("parses many lines correctly", async () => {
    const data = "Loid,Forger,,Male\nAnya,Forger,6,Female"
    const parsed = processData(data)

    expect(parsed).to.deep.equal([
      { firstName: 'Loid', lastName: 'Forger', gender: 'm' },
      { firstName: 'Anya', lastName: 'Forger', gender: 'f', age: 6 }
    ]);
  });

  test("skips empty lines", async () => {
    const data = "Loid,Forger,,Male\n\n\nAnya,Forger,6,Female"
    const parsed = processData(data)

    expect(parsed).to.deep.equal([
      { firstName: 'Loid', lastName: 'Forger', gender: 'm' },
      { firstName: 'Anya', lastName: 'Forger', gender: 'f', age: 6 }
    ]);
  });

  test("trims white space", async () => {
    const data = "Loid,      Forger ,   ,   Male"
    const parsed = processData(data)

    expect(parsed).to.deep.equal([
      { firstName: 'Loid', lastName: 'Forger', gender: 'm' },
    ]);
  });

  test("reads the test file and retuns correct parsed result", async () => {
    const result = await parsePeopleCsv("test/test.csv")

    expect(result).to.deep.equal([
      { firstName: 'Loid', lastName: 'Forger', gender: 'm' },
      { firstName: 'Anya', lastName: 'Forger', gender: 'f', age: 6 },
      { firstName: 'Yor', lastName: 'Forger', gender: 'f', age: 27 }
    ]);
  });
});
