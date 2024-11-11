import { expect } from "chai";
import { CompiledAppearanceIndexSchema } from "../src/appearance.index.schema.js"; // Adjust the path as needed

// Test suite for AppearanceIndexSchema
describe("AppearanceIndexSchema Validation", function () {
  // Ensure appearanceStart and appearanceEnd are defined in IndexRangeRegistry for these tests
  const appearanceStart = 0;  // Replace with actual start from your registry if available
  const appearanceEnd = 39;   // Replace with actual end from your registry if available

  it("should validate an index within the valid range", function () {
    const validAppearance = {
      index: appearanceStart,
    };

    const isValid = CompiledAppearanceIndexSchema(validAppearance);
    expect(isValid).to.be.true;
    expect(CompiledAppearanceIndexSchema.errors).to.be.null;
  });

  it("should validate an index at the upper boundary of the range", function () {
    const validAppearance = {
      index: appearanceEnd,
    };

    const isValid = CompiledAppearanceIndexSchema(validAppearance);
    expect(isValid).to.be.true;
    expect(CompiledAppearanceIndexSchema.errors).to.be.null;
  });

  it("should invalidate an index below the minimum boundary", function () {
    const invalidAppearance = {
      index: appearanceStart - 1,
    };

    const isValid = CompiledAppearanceIndexSchema(invalidAppearance);
    expect(isValid).to.be.false;
    expect(CompiledAppearanceIndexSchema.errors).to.not.be.null;
    console.error("Validation errors for index below minimum:", CompiledAppearanceIndexSchema.errors);
  });

  it("should invalidate an index above the maximum boundary", function () {
    const invalidAppearance = {
      index: appearanceEnd + 1,
    };

    const isValid = CompiledAppearanceIndexSchema(invalidAppearance);
    expect(isValid).to.be.false;
    expect(CompiledAppearanceIndexSchema.errors).to.not.be.null;
    console.error("Validation errors for index above maximum:", CompiledAppearanceIndexSchema.errors);
  });

  it("should invalidate a missing 'index' property", function () {
    const invalidAppearance = {};

    const isValid = CompiledAppearanceIndexSchema(invalidAppearance);
    expect(isValid).to.be.false;
    expect(CompiledAppearanceIndexSchema.errors).to.not.be.null;
    console.error("Validation errors for missing 'index' property:", CompiledAppearanceIndexSchema.errors);
  });

  it("should invalidate additional properties in the object", function () {
    const invalidAppearance = {
      index: appearanceStart,
      extraProperty: "not allowed",
    };

    const isValid = CompiledAppearanceIndexSchema(invalidAppearance);
    expect(isValid).to.be.false;
    expect(CompiledAppearanceIndexSchema.errors).to.not.be.null;
    console.error("Validation errors for additional properties:", CompiledAppearanceIndexSchema.errors);
  });

  it("should invalidate an index that is not an integer", function () {
    const invalidAppearance = {
      index: "not an integer",
    };

    const isValid = CompiledAppearanceIndexSchema(invalidAppearance);
    expect(isValid).to.be.false;
    expect(CompiledAppearanceIndexSchema.errors).to.not.be.null;
    console.error("Validation errors for non-integer index:", CompiledAppearanceIndexSchema.errors);
  });
});