import Ajv from "ajv";
import addErrors from "ajv-errors";

// Import the IndexRangeRegistry
import IndexRangeRegistry from "./indexRangeRegistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

// Get the start and end values for appearances from the IndexRangeRegistry
const { start: triggerStart, end: triggerEnd } = IndexRangeRegistry.triggers;

const TriggerIndexSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/trigger.index.json",
  type: "object",
  properties: {
    index: {
      type: "integer",
      minimum: triggerStart,
      maximum: triggerEnd,
      description:
        "Unique index for the header, must be within the valid range for triggers.",
      errorMessage: {
        type: "The 'index' must be an integer.",
        minimum: `The 'index' must be at least ${triggerStart}.`,
        maximum: `The 'index' must be at most ${triggerEnd}.`,
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

const CompiledTriggerIndex = ajv.compile(TriggerIndexSchema);

export { CompiledTriggerIndex, TriggerIndexSchema};