import Ajv from "ajv";
import addErrors from "ajv-errors";

// Import the IndexRangeRegistry
import IndexRangeRegistry from "./indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

// Get the start and end values for appearances from the IndexRangeRegistry
const { start: effectStart, end: effectEnd } = IndexRangeRegistry.effectRange;

const EffectIndexSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/effect.index.json",
  type: "object",
  properties: {
    value: {
      type: "integer",
      minimum: effectStart,
      maximum: effectEnd,
      description:
        "Unique index for the header, must be within the valid range for effects.",
      errorMessage: {
        type: "The 'index' must be an integer.",
        minimum: `The 'index' must be at least ${effectStart}.`,
        maximum: `The 'index' must be at most ${effectEnd}.`,
      },
    },
  },
  required: ["value"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'index' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

const CompiledEffectIndexSchema = ajv.compile(EffectIndexSchema);

export { CompiledEffectIndexSchema, EffectIndexSchema };