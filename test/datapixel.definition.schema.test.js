import { expect } from "chai";
import { CompiledDataPixelDefinition } from "../schemas/datapixel.definition.schema.js";

describe("DataPixel Schema Validation", function () {
  
  it("should validate a correct DataPixel object", function () {
    const validDataPixel = {
      index: 100,
      R: 120,
      G: 130,
      B: 140,
      A: 0
    };

    const isValid = CompiledDataPixelDefinition(validDataPixel);
    expect(isValid).to.be.true;
    expect(CompiledDataPixelDefinition.errors).to.be.null;
  });

  it("should invalidate when 'index' is out of range", function () {
    const invalidDataPixel = {
      index: 300, // Out of range
      R: 120,
      G: 130,
      B: 140,
      A: 0
    };

    const isValid = CompiledDataPixelDefinition(invalidDataPixel);
    expect(isValid).to.be.false;
    if (CompiledDataPixelDefinition.errors) {
      console.error("Validation errors for out-of-range 'index':", CompiledDataPixelDefinition.errors);
    }
  });

  it("should invalidate when 'R' is out of range", function () {
    const invalidDataPixel = {
      index: 100,
      R: 300, // Out of range
      G: 130,
      B: 140,
      A: 0
    };

    const isValid = CompiledDataPixelDefinition(invalidDataPixel);
    expect(isValid).to.be.false;
    if (CompiledDataPixelDefinition.errors) {
      console.error("Validation errors for out-of-range 'R':", CompiledDataPixelDefinition.errors);
    }
  });

  it("should invalidate when 'G' is out of range", function () {
    const invalidDataPixel = {
      index: 100,
      R: 120,
      G: 300, // Out of range
      B: 140,
      A: 0
    };

    const isValid = CompiledDataPixelDefinition(invalidDataPixel);
    expect(isValid).to.be.false;
    if (CompiledDataPixelDefinition.errors) {
      console.error("Validation errors for out-of-range 'G':", CompiledDataPixelDefinition.errors);
    }
  });

  it("should invalidate when 'B' is out of range", function () {
    const invalidDataPixel = {
      index: 100,
      R: 120,
      G: 130,
      B: 300, // Out of range
      A: 0
    };

    const isValid = CompiledDataPixelDefinition(invalidDataPixel);
    expect(isValid).to.be.false;
    if (CompiledDataPixelDefinition.errors) {
      console.error("Validation errors for out-of-range 'B':", CompiledDataPixelDefinition.errors);
    }
  });

  it("should invalidate when 'A' is not 0", function () {
    const invalidDataPixel = {
      index: 100,
      R: 120,
      G: 130,
      B: 140,
      A: 1 // Should be 0
    };

    const isValid = CompiledDataPixelDefinition(invalidDataPixel);
    expect(isValid).to.be.false;
    if (CompiledDataPixelDefinition.errors) {
      console.error("Validation errors for non-zero 'A':", CompiledDataPixelDefinition.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidDataPixel = {
      index: 100,
      R: 120,
      G: 130,
      // Missing 'B'
      A: 0
    };

    const isValid = CompiledDataPixelDefinition(invalidDataPixel);
    expect(isValid).to.be.false;
    if (CompiledDataPixelDefinition.errors) {
      console.error("Validation errors for missing required property:", CompiledDataPixelDefinition.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidDataPixel = {
      index: 100,
      R: 120,
      G: 130,
      B: 140,
      A: 0,
      extraProperty: "not allowed" // Additional property not allowed
    };

    const isValid = CompiledDataPixelDefinition(invalidDataPixel);
    expect(isValid).to.be.false;
    if (CompiledDataPixelDefinition.errors) {
      console.error("Validation errors for additional properties:", CompiledDataPixelDefinition.errors);
    }
  });
});