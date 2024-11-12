import { expect } from "chai";
import { CompiledVisualPixelSchema } from "../src/visualpixel.definition.schema.js";

describe("Visual Pixel Definition Schema Validation", function () {

  it("should validate a correct Visual Pixel object", function () {
    const validVisualPixel = {
      index: 128,
      R: 255,
      G: 0,
      B: 0,
      A: 128,
    };

    const isValid = CompiledVisualPixelSchema(validVisualPixel);
    expect(isValid).to.be.true;
    expect(CompiledVisualPixelSchema.errors).to.be.null;
  });

  it("should invalidate when 'index' is out of range", function () {
    const invalidVisualPixel = {
      index: 300, // Out of range
      R: 255,
      G: 0,
      B: 0,
      A: 128,
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;

    if (CompiledVisualPixelSchema.errors) {
      console.error("Validation errors for out-of-range 'index':", CompiledVisualPixelSchema.errors);
    }
  });

  it("should invalidate when 'A' is out of range", function () {
    const invalidVisualPixel = {
      index: 128,
      R: 255,
      G: 0,
      B: 0,
      A: 0, // Invalid value for 'A', should be between 1 and 255
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;

    if (CompiledVisualPixelSchema.errors) {
      console.error("Validation errors for out-of-range 'A':", CompiledVisualPixelSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidVisualPixel = {
      index: 128,
      R: 255,
      G: 0,
      B: 0,
      // Missing 'A'
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;

    if (CompiledVisualPixelSchema.errors) {
      console.error("Validation errors for missing 'A':", CompiledVisualPixelSchema.errors);
    }
  });

  it("should invalidate when there are additional properties", function () {
    const invalidVisualPixel = {
      index: 128,
      R: 255,
      G: 0,
      B: 0,
      A: 128,
      extraProperty: "Not allowed",
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;

    if (CompiledVisualPixelSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledVisualPixelSchema.errors);
    }
  });

  it("should invalidate when 'R', 'G', or 'B' values are out of range", function () {
    const invalidVisualPixel = {
      index: 128,
      R: 300, // Out of range
      G: -1,  // Out of range
      B: 256, // Out of range
      A: 128,
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;

    if (CompiledVisualPixelSchema.errors) {
      console.error("Validation errors for out-of-range color values:", CompiledVisualPixelSchema.errors);
    }
  });
});