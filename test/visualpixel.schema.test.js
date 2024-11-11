import { expect } from "chai";
import { CompiledVisualPixelSchema } from "../src/visualpixel.schema.js"; // Adjust the path if necessary

// Test suite for VisualPixelSchema
describe("VisualPixelSchema Validation", function () {
  
  it("should validate a correct VisualPixel object", function () {
    const validVisualPixel = {
      index: 10,
      R: 100,
      G: 150,
      B: 200,
      A: 1, // Valid alpha value greater than 0
    };

    const isValid = CompiledVisualPixelSchema(validVisualPixel);
    expect(isValid).to.be.true;
    expect(CompiledVisualPixelSchema.errors).to.be.null;
  });

  it("should invalidate a VisualPixel object with an out-of-range index", function () {
    const invalidVisualPixel = {
      index: 300, // Invalid index, out of range
      R: 100,
      G: 150,
      B: 200,
      A: 1,
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;
    expect(CompiledVisualPixelSchema.errors).to.not.be.null;
    //console.error("Validation errors for out-of-range index:", CompiledVisualPixelSchema.errors);
  });

  it("should invalidate a VisualPixel object with an out-of-range R value", function () {
    const invalidVisualPixel = {
      index: 50,
      R: 256, // Invalid R value, out of uint8 range
      G: 150,
      B: 200,
      A: 1,
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;
    expect(CompiledVisualPixelSchema.errors).to.not.be.null;
    //console.error("Validation errors for out-of-range R value:", CompiledVisualPixelSchema.errors);
  });

  it("should invalidate a VisualPixel object with an out-of-range G value", function () {
    const invalidVisualPixel = {
      index: 50,
      R: 100,
      G: 300, // Invalid G value, out of uint8 range
      B: 200,
      A: 1,
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;
    expect(CompiledVisualPixelSchema.errors).to.not.be.null;
    //console.error("Validation errors for out-of-range G value:", CompiledVisualPixelSchema.errors);
  });

  it("should invalidate a VisualPixel object with an out-of-range B value", function () {
    const invalidVisualPixel = {
      index: 50,
      R: 100,
      G: 150,
      B: 256, // Invalid B value, out of uint8 range
      A: 1,
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;
    expect(CompiledVisualPixelSchema.errors).to.not.be.null;
    //console.error("Validation errors for out-of-range B value:", CompiledVisualPixelSchema.errors);
  });

  it("should invalidate a VisualPixel object with an out-of-range A value", function () {
    const invalidVisualPixel = {
      index: 50,
      R: 100,
      G: 150,
      B: 200,
      A: 0, // Invalid A value, should be greater than 0
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;
    expect(CompiledVisualPixelSchema.errors).to.not.be.null;
    //console.error("Validation errors for out-of-range A value:", CompiledVisualPixelSchema.errors);
  });

  it("should invalidate a VisualPixel object with missing required properties", function () {
    const invalidVisualPixel = {
      index: 50,
      R: 100,
      G: 150,
      // B property is missing
      A: 1,
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;
    expect(CompiledVisualPixelSchema.errors).to.not.be.null;
    //console.error("Validation errors for missing required property:", CompiledVisualPixelSchema.errors);
  });

  it("should invalidate a VisualPixel object with additional properties", function () {
    const invalidVisualPixel = {
      index: 50,
      R: 100,
      G: 150,
      B: 200,
      A: 1,
      extraProperty: "not allowed", // Additional property not allowed
    };

    const isValid = CompiledVisualPixelSchema(invalidVisualPixel);
    expect(isValid).to.be.false;
    expect(CompiledVisualPixelSchema.errors).to.not.be.null;
    //console.error("Validation errors for additional property:", CompiledVisualPixelSchema.errors);
  });
});