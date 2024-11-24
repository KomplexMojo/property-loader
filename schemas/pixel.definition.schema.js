import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

const PixelDefinitionSchema = {
  type: "object",
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/pixel.definition.json",
  properties: {
    index: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      errorMessage: {
        type: "'index' must be an integer.",
        minimum: "'index' must be at least 0.",
        maximum: "'index' must be at most 255.",
      },
    },
    IsStorage: {
        type: "boolean",
        errorMessage: {
          type: "'IsStorage' must be an boolean value.",
        },
      },
    A: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      errorMessage: {
        type: "'A' must be an integer.",
        minimum: "'A' must be at least 0.",
        maximum: "'A' must be at most 255.",
      },
    },
    R: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      errorMessage: {
        type: "'R' must be an integer.",
        minimum: "'R' must be at least 0.",
        maximum: "'R' must be at most 255.",
      },
    },
    G: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      errorMessage: {
        type: "'G' must be an integer.",
        minimum: "'G' must be at least 0.",
        maximum: "'G' must be at most 255.",
      },
    },
    B: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      errorMessage: {
        type: "'B' must be an integer.",
        minimum: "'B' must be at least 0.",
        maximum: "'B' must be at most 255.",
      },
    },
  },
  required: ["index", "IsStorage", "R", "G", "B", "A"],
  errorMessage: {
    required: {
      index: "'index' is required.",
      IsStorage: "'IsStorage' is required.",
      R: "'R' is required.",
      G: "'G' is required.",
      B: "'B' is required.",
      A: "'A' is required.",
    },
    additionalProperties: "No additional properties are allowed.",
  },
  additionalProperties: false,
  if: {
    properties: { A: { const: 0 } },
  },
  then: {
    description: "Data pixel schema",
    properties: {
      index: { type: "integer", minimum: 0, maximum: 255 },
      A: { const: 0, errorMessage: "'A' must be 0 for data pixels." },
      IsStorage: { const: true},
      R: { type: "integer", minimum: 0, maximum: 255 },
      G: { type: "integer", minimum: 0, maximum: 255 },
      B: { type: "integer", minimum: 0, maximum: 255 },
    },
    required: ["index", "R", "G", "B", "A"],
    additionalProperties: false,
    errorMessage: "Invalid data pixel.",
  },
  else: {
    description: "Visual pixel schema",
    properties: {
      index: { type: "integer", minimum: 0, maximum: 255 },
      IsStorage: { const: false},
      A: {
        type: "integer",
        minimum: 1,
        maximum: 255,
        errorMessage: "'A' must be between 1 and 255 for visual pixels.",
      },
      R: { type: "integer", minimum: 0, maximum: 255 },
      G: { type: "integer", minimum: 0, maximum: 255 },
      B: { type: "integer", minimum: 0, maximum: 255 },
    },
    required: ["index", "IsStorage", "R", "G", "B", "A"],
    additionalProperties: false,
    errorMessage: "Invalid visual pixel.",
  },
};

// Compile the Schema
const CompiledPixelDefinitionSchema = ajv.compile(PixelDefinitionSchema);

// Test Data
const validDataPixel = { index: 12, IsStorage: true , R: 255, G: 128, B: 64, A: 0 }; // Data pixel
const validVisualPixel = { index: 12, IsStorage: true, R: 255, G: 128, B: 64, A: 255 }; // Visual pixel
const invalidPixel = { index: 12, IsStorage:true, R: 255, G: 128, B: 64, A: -1 }; // Invalid alpha

// Test Function
function testPixel(pixel) {
  const valid = CompiledPixelDefinitionSchema(pixel);
  if (valid) {
    console.log(`Validation succeeded for pixel:`, pixel);
  } else {
    console.error(`Validation failed for pixel:`, pixel, CompiledPixelDefinitionSchema.errors);
  }
}

export { CompiledPixelDefinitionSchema, PixelDefinitionSchema }

// Run Tests
testPixel(validDataPixel);   // Should log success
testPixel(validVisualPixel); // Should log success
testPixel(invalidPixel);     // Should log failure with enhanced error messages