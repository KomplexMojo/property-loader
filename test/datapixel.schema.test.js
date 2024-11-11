import { expect } from "chai";
import { CompiledDataPixelSchema } from "../src/datapixel.schema.js"; // Adjust the path if necessary

// Test suite for DataPixelSchema
describe("DataPixelSchema Validation", function () {
  it("should validate a correct DataPixel object", function () {
    const validDataPixel = {
      index: 10,
      R: 100,
      G: 150,
      B: 200,
      A: 0, // Valid alpha value, always 0 for data pixels
    };

    const isValid = CompiledDataPixelSchema(validDataPixel);
    expect(isValid).to.be.true;
    expect(CompiledDataPixelSchema.errors).to.be.null;
    if (!isValid) {
      console.error("Validation errors:", CompiledDataPixelSchema.errors);
    }
  });

  it("should invalidate a DataPixel object with an out-of-range index", function () {
    const invalidDataPixel = {
      index: 300, // Invalid index, out of range
      R: 100,
      G: 150,
      B: 200,
      A: 0,
    };

    const isValid = CompiledDataPixelSchema(invalidDataPixel);
    expect(isValid).to.be.false;
    expect(CompiledDataPixelSchema.errors).to.not.be.null;
    if (isValid) {
      console.error("Validation errors for out-of-range index:", CompiledDataPixelSchema.errors);
    }
  });

  it("should invalidate a DataPixel object with an out-of-range R value", function () {
    const invalidDataPixel = {
      index: 50,
      R: 256, // Invalid R value, out of uint8 range
      G: 150,
      B: 200,
      A: 0,
    };

    const isValid = CompiledDataPixelSchema(invalidDataPixel);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for out-of-range R value:", CompiledDataPixelSchema.errors);
    }
    expect(CompiledDataPixelSchema.errors).to.not.be.null;
  });

  it("should invalidate a DataPixel object with an out-of-range G value", function () {
    const invalidDataPixel = {
      index: 50,
      R: 100,
      G: 300, // Invalid G value, out of uint8 range
      B: 200,
      A: 0,
    };

    const isValid = CompiledDataPixelSchema(invalidDataPixel);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for out-of-range G value:", CompiledDataPixelSchema.errors);
    }
    expect(CompiledDataPixelSchema.errors).to.not.be.null;
  });

  it("should invalidate a DataPixel object with an out-of-range B value", function () {
    const invalidDataPixel = {
      index: 50,
      R: 100,
      G: 150,
      B: 256, // Invalid B value, out of uint8 range
      A: 0,
    };

    const isValid = CompiledDataPixelSchema(invalidDataPixel);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for out-of-range B value:", CompiledDataPixelSchema.errors);
    }
    expect(CompiledDataPixelSchema.errors).to.not.be.null;
  });

  it("should invalidate a DataPixel object with a non-zero A value", function () {
    const invalidDataPixel = {
      index: 50,
      R: 100,
      G: 150,
      B: 200,
      A: 1, // Invalid A value, must be 0 for data pixels
    };

    const isValid = CompiledDataPixelSchema(invalidDataPixel);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for non-zero A value:", CompiledDataPixelSchema.errors);
    }
    expect(CompiledDataPixelSchema.errors).to.not.be.null;
  });

  it("should invalidate a DataPixel object with missing required properties", function () {
    const invalidDataPixel = {
      index: 50,
      R: 100,
      G: 150,
      // B property is missing
      A: 0,
    };

    const isValid = CompiledDataPixelSchema(invalidDataPixel);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for missing required property:", CompiledDataPixelSchema.errors);
    }
    expect(CompiledDataPixelSchema.errors).to.not.be.null;
  });

  it("should invalidate a DataPixel object with additional properties", function () {
    const invalidDataPixel = {
      index: 50,
      R: 100,
      G: 150,
      B: 200,
      A: 0,
      extraProperty: "not allowed", // Additional property not allowed
    };

    const isValid = CompiledDataPixelSchema(invalidDataPixel);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for additional property:", CompiledDataPixelSchema.errors);
    }
    expect(CompiledDataPixelSchema.errors).to.not.be.null;
  });
});