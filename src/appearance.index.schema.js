// appearanceindex.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";

// Import the IndexRangeRegistry
import IndexRangeRegistry from "./indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

// Get the start and end values for appearances from the IndexRangeRegistry
const { start: appearanceStart, end: appearanceEnd } = IndexRangeRegistry.appearanceRange;

const AppearanceIndexSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/appearance.index.json",
  type: "object",
  properties: {
    index: {
      type: "integer",
      minimum: appearanceStart,
      maximum: appearanceEnd,
      description:
        "Unique index for the header, must be within the valid range for appearances.",
      errorMessage: {
        type: "The 'index' must be an integer.",
        minimum: `The 'index' must be at least ${appearanceStart}.`,
        maximum: `The 'index' must be at most ${appearanceEnd}.`,
      },
    },
  },
  required: ["index"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'index' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

const CompiledAppearanceIndexSchema = ajv.compile(AppearanceIndexSchema);

export { CompiledAppearanceIndexSchema, AppearanceIndexSchema };