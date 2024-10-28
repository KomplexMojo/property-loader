import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { DataPixelSchema } from "./datapixel.schema.test.js";
import { VisualPixelSchema } from "./visualpixel.schema.test.js";
import { expect } from "chai";

// Initialize AJV with references and custom errors
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

// Add DataPixel and VisualPixel schemas to AJV registry
ajv.addSchema(DataPixelSchema, "http://example.com/schemas/datapixel.json");
ajv.addSchema(VisualPixelSchema, "http://example.com/schemas/visualpixel.json");

// Define PixelArraySchema
const PixelArraySchema = {
  type: "array",
  minItems: 256,
  maxItems: 256,
  uniqueItems: true,
  items: {
    oneOf: [
      { $ref: "http://example.com/schemas/datapixel.json" },
      { $ref: "http://example.com/schemas/visualpixel.json" },
    ],
  },
  pixelCounts: true,
  uniqueIndices: true
};

// Custom validation function to enforce unique `index` values
function validateUniqueIndices(schema, data) {
  const indices = data.map((pixel) => pixel.index);
  const uniqueIndices = new Set(indices);

  if (uniqueIndices.size !== indices.length) {
    validateUniqueIndices.errors = [
      {
        keyword: "uniqueIndices",
        message: "Pixel array contains duplicate `index` values.",
        instancePath: "/index",
      },
    ];
    return false;
  }

  return true;
}

// Add uniqueIndices as a keyword
ajv.addKeyword({
  keyword: "uniqueIndices",
  type: "array",
  errors: true,
  validate: validateUniqueIndices,
});

// Custom validation function to check counts of data and visual pixels
function validatePixelCounts(schema, data) {
  let dataPixelCount = 0;
  let visualPixelCount = 0;

  data.forEach((pixel) => {
    if (pixel.A === 0) dataPixelCount++;
    else if (pixel.A > 0) visualPixelCount++;
  });

  if (dataPixelCount > 100) {
    validatePixelCounts.errors = [
      {
        keyword: "pixelCounts",
        message: `Exceeds maximum of 100 data pixels (A=0). Found ${dataPixelCount}.`,
        instancePath: "/dataPixel",
      },
    ];
    return false;
  }

  if (visualPixelCount > 156) {
    validatePixelCounts.errors = [
      {
        keyword: "pixelCounts",
        message: `Exceeds maximum of 156 visual pixels (A>0). Found ${visualPixelCount}.`,
        instancePath: "/visualPixel",
      },
    ];
    return false;
  }

  return true;
}

// Add pixelCounts as a keyword
ajv.addKeyword({
  keyword: "pixelCounts",
  type: "array",
  errors: true,
  validate: validatePixelCounts,
});

// Compile the schema with custom validation for both pixelCounts and uniqueIndices
const validatePixelArray = ajv.compile({
  ...PixelArraySchema,
  pixelCounts: true,
  uniqueIndices: true, // Add this line to ensure unique index validation is applied
});

// Pixel array schema tests
describe("Pixel Array Schema Validation with Custom Counts, Min, Max, Unique", function () {
  it("should validate an array with 100 data pixels and 156 visual pixels", function () {
    const pixels = [
      ...Array.from({ length: 100 }, (_, i) => ({
        index: i,
        R: 100,
        G: 150,
        B: 200,
        A: 0, // dataPixel
      })),
      ...Array.from({ length: 156 }, (_, i) => ({
        index: i + 100,
        R: 101,
        G: 150,
        B: 201,
        A: 1, // visualPixel
      })),
    ];

    const isValid = validatePixelArray(pixels);
    expect(isValid).to.be.true;
    expect(validatePixelArray.errors).to.be.null;

    if (!isValid) {
      console.log("Validation errors:", validatePixelArray.errors);
    }
  });

  it("should invalidate an array with more than 100 data pixels", function () {
    const pixels = [
      ...Array.from({ length: 101 }, (_, i) => ({
        index: i,
        R: 100,
        G: 150,
        B: 200,
        A: 0, // dataPixel
      })),
      ...Array.from({ length: 155 }, (_, i) => ({
        index: i + 101,
        R: 101,
        G: 150,
        B: 201,
        A: 1, // visualPixel
      })),
    ];

    //console.log("Generated Pixels for Valid Test:", JSON.stringify(pixels, null, 2)); // Print pixels

    const isValid = validatePixelArray(pixels);
    expect(isValid).to.be.false;
    expect(validatePixelArray.errors).to.not.be.null;

    if (isValid) {
      console.log("Validation errors:", validatePixelArray.errors);
    }
  });

  it("should invalidate an array with more than 156 visual pixels", function () {
    const pixels = [
      ...Array.from({ length: 100 }, (_, i) => ({
        index: i,
        R: 100,
        G: 150,
        B: 200,
        A: 0, // dataPixel
      })),
      ...Array.from({ length: 157 }, (_, i) => ({
        index: i + 100,
        R: 101,
        G: 150,
        B: 201,
        A: 1, // visualPixel
      })),
    ];

    const isValid = validatePixelArray(pixels);
    expect(isValid).to.be.false;
    expect(validatePixelArray.errors).to.not.be.null;

    if (isValid) {
      console.log("Validation errors:", validatePixelArray.errors);
    }
  });
  it("should validate an array with exactly 256 unique pixels", function () {
    const pixels = [
      ...Array.from({ length: 100 }, (_, i) => ({
        index: i,
        R: 100,
        G: 150,
        B: 200,
        A: 0, // dataPixel
      })),
      ...Array.from({ length: 156 }, (_, i) => ({
        index: i + 100,
        R: 121,
        G: 130,
        B: 141,
        A: 1, // visualPixel
      })),
    ];

    const isValid = validatePixelArray(pixels);
    expect(isValid).to.be.true;
    expect(validatePixelArray.errors).to.be.null;

    if (!isValid) {
      console.log("Validation errors:", validatePixelArray.errors);
    }
  });

  it("should invalidate an array with fewer than 256 pixels", function () {
    const pixels = [
      ...Array.from({ length: 50 }, (_, i) => ({
        index: i,
        R: 100,
        G: 150,
        B: 200,
        A: 0, // dataPixel
      })),
      ...Array.from({ length: 100 }, (_, i) => ({
        index: i + 50,
        R: 121,
        G: 131,
        B: 141,
        A: 1, // visualPixel
      })),
    ]; // 150 total items

    const isValid = validatePixelArray(pixels);
    expect(isValid).to.be.false;
    expect(validatePixelArray.errors).to.not.be.null;
    if (isValid) {
      console.log("Validation errors:", validatePixelArray.errors);
    }
  });

  it("should invalidate an array with more than 256 pixels", function () {
    const pixels = [
      ...Array.from({ length: 101 }, (_, i) => ({
        index: i,
        R: 100,
        G: 150,
        B: 200,
        A: 0, // dataPixel
      })),
      ...Array.from({ length: 156 }, (_, i) => ({
        index: i + 101,
        R: 121,
        G: 131,
        B: 141,
        A: 1, // visualPixel
      })),
    ]; // 257 total items

    const isValid = validatePixelArray(pixels);
    expect(isValid).to.be.false;
    expect(validatePixelArray.errors).to.not.be.null;
    if (isValid) {
      console.log("Validation errors:", validatePixelArray.errors);
    }
  });

  it("should invalidate an array with duplicate index values", function () {
    const pixels = [
      ...Array.from({ length: 100 }, (_, i) => ({
        index: i,
        R: 100,
        G: 150,
        B: 200,
        A: 0, // dataPixel
      })),
      ...Array.from({ length: 156 }, (_, i) => ({
        index: i + 50, // Duplicates from 50 to 99
        R: 121,
        G: 131,
        B: 141,
        A: 1, // visualPixel
      })),
    ]; // 206 unique items, 50 duplicate indices

    const isValid = validatePixelArray(pixels);
    expect(isValid).to.be.false;
    expect(validatePixelArray.errors).to.not.be.null;
    if (isValid) {
      console.log("Validation errors:", validatePixelArray.errors);
    }
  });
  
  function generateRandomPixelArray() {
    const totalPixels = 256;
    const dataPixelLimit = 100;
    const visualPixelLimit = 156;
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
  
    // Generate data pixels
    for (let i = 0; i < dataPixelLimit; i++) {
      pixels.push({
        index: getUniqueIndex(),
        R: Math.floor(Math.random() * 256),
        G: Math.floor(Math.random() * 256),
        B: Math.floor(Math.random() * 256),
        A: 0, // dataPixel with A = 0
      });
    }
  
    // Generate visual pixels
    for (let i = 0; i < visualPixelLimit; i++) {
      pixels.push({
        index: getUniqueIndex(),
        R: Math.floor(Math.random() * 256),
        G: Math.floor(Math.random() * 256),
        B: Math.floor(Math.random() * 256),
        A: Math.floor(Math.random() * 255) + 1, // visualPixel with A > 0
      });
    }
  
    // Randomly shuffle the array to intermix data and visual pixels
    for (let i = pixels.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pixels[i], pixels[j]] = [pixels[j], pixels[i]];
    }
  
    return pixels;
  }

  // Test for validating random pixel arrays
  describe("Pixel Array Schema Validation with Random Pixel Array", function () {
    it("should validate a randomly generated array of data and visual pixels", function () {
      const pixels = generateRandomPixelArray();
      //console.log("Generated Random Pixel Array:", pixels);
  
      const isValid = validatePixelArray(pixels);
      expect(isValid).to.be.true;
      expect(validatePixelArray.errors).to.be.null;
  
      if (!isValid) {
        console.error("Validation errors:", validatePixelArray.errors);
      }
    });
  });

});