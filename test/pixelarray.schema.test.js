import { expect } from "chai";
import { CompiledPixelArraySchema } from "../src/pixelarray.schema.js";

// Pixel array schema tests
describe("Pixel Array Schema Validation", function () {
  it("should validate an array with exactly 256 pixels", function () {
    const pixels = Array.from({ length: 256 }, (_, i) => ({
      index: i,
      R: Math.floor(Math.random() * 256),
      G: Math.floor(Math.random() * 256),
      B: Math.floor(Math.random() * 256),
      A: Math.floor(Math.random() * 256),
    }));

    const isValid = CompiledPixelArraySchema(pixels);
    expect(isValid).to.be.true;
    expect(CompiledPixelArraySchema.errors).to.be.null;
    if (!isValid) {
      console.error("Validation errors for an array with exactly 256 pixels:", CompiledPixelArraySchema.errors);
    }
  });

  it("should invalidate an array with fewer than 256 pixels", function () {
    const pixels = Array.from({ length: 255 }, (_, i) => ({
      index: i,
      R: Math.floor(Math.random() * 256),
      G: Math.floor(Math.random() * 256),
      B: Math.floor(Math.random() * 256),
      A: Math.floor(Math.random() * 256),
    }));

    const isValid = CompiledPixelArraySchema(pixels);
    expect(isValid).to.be.false;
    expect(CompiledPixelArraySchema.errors).to.not.be.null;
    if (isValid) {
      console.error("Validation errors for an array with fewer than 256 pixels:", CompiledPixelArraySchema.errors);
    }
  });

  it("should invalidate an array with more than 256 pixels", function () {
    const pixels = Array.from({ length: 257 }, (_, i) => ({
      index: i,
      R: Math.floor(Math.random() * 256),
      G: Math.floor(Math.random() * 256),
      B: Math.floor(Math.random() * 256),
      A: Math.floor(Math.random() * 256),
    }));

    const isValid = CompiledPixelArraySchema(pixels);
    expect(isValid).to.be.false;
    expect(CompiledPixelArraySchema.errors).to.not.be.null;
    if (isValid) {
      console.error("Validation errors for an array with more than 256 pixels:", CompiledPixelArraySchema.errors);
    }
  });

  it("should invalidate an array with duplicate index values", function () {
    const pixels = [
      ...Array.from({ length: 255 }, (_, i) => ({
        index: i,
        R: Math.floor(Math.random() * 256),
        G: Math.floor(Math.random() * 256),
        B: Math.floor(Math.random() * 256),
        A: Math.floor(Math.random() * 256),
      })),
      {
        index: 254, // Duplicate index
        R: Math.floor(Math.random() * 256),
        G: Math.floor(Math.random() * 256),
        B: Math.floor(Math.random() * 256),
        A: Math.floor(Math.random() * 256),
      },
    ];

    const isValid = CompiledPixelArraySchema(pixels);
    expect(isValid).to.be.false;
    expect(CompiledPixelArraySchema.errors).to.not.be.null;
    if (isValid) {
      console.error("Validation errors for an array with duplicate index values:", CompiledPixelArraySchema.errors);
    }
  });

  function generateRandomPixelArray() {
    const totalPixels = 256;
    const pixels = [];
    const indices = new Set();

    // Helper function to generate a unique index
    function getUniqueIndex() {
      let index;
      do {
        index = Math.floor(Math.random() * 256);
      } while (indices.has(index));
      indices.add(index);
      return index;
    }

    // Generate pixels
    for (let i = 0; i < totalPixels; i++) {
      pixels.push({
        index: getUniqueIndex(),
        R: Math.floor(Math.random() * 256),
        G: Math.floor(Math.random() * 256),
        B: Math.floor(Math.random() * 256),
        A: Math.floor(Math.random() * 256),
      });
    }

    return pixels;
  }

  // Test for validating random pixel arrays
  it("should validate a randomly generated array of 256 pixels", function () {
    const pixels = generateRandomPixelArray();

    const isValid = CompiledPixelArraySchema(pixels);
    expect(isValid).to.be.true;
    expect(CompiledPixelArraySchema.errors).to.be.null;
    if (!isValid) {
      console.error("Validation errors for a randomly generated array of 256 pixels:", CompiledPixelArraySchema.errors);
    }
  });
});