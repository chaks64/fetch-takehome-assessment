const chai = require("chai");
const { pointsCalculator } = require("../utils/pointsCalculator");
const { validateReceipt } = require("../utils/validateReceipt");
const allExamples = require("./testData.function");
const assert = chai.assert;

describe("Utility Function Tests", () => {
  // Test case for valid receipt
  const receipt = validateReceipt(allExamples.successReceipt);
  it("valid receipt and points 1", () => {
    assert.equal(receipt, true);
    // Test case for calculatePoints()
    if (receipt) {
      it("should run only when receipt is valid and check the points calulation", () => {
        const points = pointsCalculator(successReceipt);
        assert.equal(points, 31);
      });
    }
  });

  const property = validateReceipt(allExamples.missingProperty);
  it("missing property", () => {
    assert.equal(property, false);
    // Test case for calculatePoints()
    if (property) {
      it("should run only when receipt is valid and check the points calulation", () => {
        const points = pointsCalculator(successReceipt);
        assert.equal(points, 31);
      });
    }
  });

  const retailName = validateReceipt(allExamples.errorRetailerName);
  it("Error retail name", () => {
    assert.equal(retailName, false);
    // Test case for calculatePoints()
    if (receipt) {
      it("should run only when receipt is valid and check the points calulation", () => {
        const points = pointsCalculator(successReceipt);
        assert.equal(points, 31);
      });
    }
  });

  const date = validateReceipt(allExamples.errorDateProperty);
  it("Error Date", () => {
    assert.equal(date, false);
    // Test case for calculatePoints()
    if (date) {
      it("should run only when receipt is valid and check the points calulation", () => {
        const points = pointsCalculator(successReceipt);
        assert.equal(points, 31);
      });
    }
  });

  const time = validateReceipt(allExamples.errorTimeProperty);
  it("Error Time", () => {
    assert.equal(time, false);
    // Test case for calculatePoints()
    if (time) {
      it("should run only when receipt is valid and check the points calulation", () => {
        const points = pointsCalculator(successReceipt);
        assert.equal(points, 31);
      });
    }
  });

  const items = validateReceipt(allExamples.errorItems);
  it("Error in Items", () => {
    assert.equal(items, false);
    // Test case for calculatePoints()
    if (items) {
      it("should run only when receipt is valid and check the points calulation", () => {
        const points = pointsCalculator(successReceipt);
        assert.equal(points, 31);
      });
    }
  });

  const total = validateReceipt(allExamples.successReceipt2);
  it("Success receipt 2", () => {
    assert.equal(total, true);
    // Test case for calculatePoints()
    if (total) {
      it("should run only when receipt is valid and check the points calulation", () => {
        const points = pointsCalculator(successReceipt);
        assert.equal(points, 109);
      });
    }
  });
});
