import { expect } from "chai";
import { CompiledPixelsDefinitionSchema } from "../src/pixels.definition.schema.js";

describe("Pixel Array Schema Validation", function () {

  it("should validate a correct Pixel Array with exactly 256 unique DataPixel or VisualPixel items", function () {
    const validPixelArray = Array.from({ length: 256 }, (_, i) => ({
      index: i,
      R: 0,
      G: 0,
      B: 0,
      A: 0,
    }));

    const isValid = CompiledPixelsDefinitionSchema(validPixelArray);
    expect(isValid).to.be.true;
    expect(CompiledPixelsDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate when the array has fewer than 256 items", function () {
    const shortPixelArray = Array.from({ length: 255 }, (_, i) => ({
      index: i,
      R: 0,
      G: 0,
      B: 0,
      A: 0,
    }));

    const isValid = CompiledPixelsDefinitionSchema(shortPixelArray);
    expect(isValid).to.be.false;

    if (CompiledPixelsDefinitionSchema.errors) {
      console.error("Validation errors for fewer than 256 items:", CompiledPixelsDefinitionSchema.errors);
    }
  });

  it("should invalidate when the array has more than 256 items", function () {
    const longPixelArray = Array.from({ length: 257 }, (_, i) => ({
      index: i,
      R: 0,
      G: 0,
      B: 0,
      A: 0,
    }));

    const isValid = CompiledPixelsDefinitionSchema(longPixelArray);
    expect(isValid).to.be.false;

    if (CompiledPixelsDefinitionSchema.errors) {
      console.error("Validation errors for more than 256 items:", CompiledPixelsDefinitionSchema.errors);
    }
  });

  it("should invalidate when an item is neither DataPixel nor VisualPixel", function () {
    const invalidPixelArray = Array.from({ length: 256 }, (_, i) => (
      i === 0
        ? { index: i, invalidProperty: "not a pixel" } // Invalid item
        : { index: i, R: 0, G: 0, B: 0, A: 0 }
    ));

    const isValid = CompiledPixelsDefinitionSchema(invalidPixelArray);
    expect(isValid).to.be.false;

    if (CompiledPixelsDefinitionSchema.errors) {
      console.error("Validation errors for invalid item type:", CompiledPixelsDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'pixelArray' is not an array", function () {
    const notAnArray = {
      index: 0,
      R: 0,
      G: 0,
      B: 0,
      A: 0,
    };

    const isValid = CompiledPixelsDefinitionSchema(notAnArray);
    expect(isValid).to.be.false;

    if (CompiledPixelsDefinitionSchema.errors) {
      console.error("Validation errors when 'pixelArray' is not an array:", CompiledPixelsDefinitionSchema.errors);
    }
  });
});