// datapixel.schema.js

import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

// Define the DataPixel schema with error handling
const DataPixelDefinitionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/datapixel.definition.json",
  type: "object",
  properties: {
    index: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      description: "Unique index in the uint8 range.",
      errorMessage: {
        type: "The 'index' must be an integer.",
        minimum: "The 'index' must be at least 0.",
        maximum: "The 'index' must be at most 255.",
      },
    },
    R: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      description: "uint8 red value.",
      errorMessage: {
        type: "The 'R' must be an integer.",
        minimum: "The 'R' must be at least 0.",
        maximum: "The 'R' must be at most 255.",
      },
    },
    G: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      description: "uint8 green value.",
      errorMessage: {
        type: "The 'G' must be an integer.",
        minimum: "The 'G' must be at least 0.",
        maximum: "The 'G' must be at most 255.",
      },
    },
    B: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      description: "uint8 blue value.",
      errorMessage: {
        type: "The 'B' must be an integer.",
        minimum: "The 'B' must be at least 0.",
        maximum: "The 'B' must be at most 255.",
      },
    },
    A: {
      const: 0,
      description: "uint8 alpha value, always 0.",
      errorMessage: {
        const: "The 'A' must always be 0.",
      },
    },
  },
  required: ["index", "R", "G", "B", "A"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'index' property is required.",
      R: "The 'R' property is required.",
      G: "The 'G' property is required.",
      B: "The 'B' property is required.",
      A: "The 'A' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

// Compile the schema for validation
const CompiledDataPixelSchema = ajv.compile(DataPixelDefinitionSchema);

export { CompiledDataPixelSchema, DataPixelDefinitionSchema };