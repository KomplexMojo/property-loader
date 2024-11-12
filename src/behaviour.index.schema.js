// behaviourindex.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";

// Import the IndexRangeRegistry
import IndexRangeRegistry from "./indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

// Get the start and end values for behaviours from the IndexRangeRegistry
const { start: behaviourStart, end: behaviourEnd } = IndexRangeRegistry.behaviourRange;

const BehaviourIndexSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/behaviour.index.json",
  type: "object",
  properties: {
    value: {
      type: "integer",
      minimum: behaviourStart,
      maximum: behaviourEnd,
      description:
        "Unique index for the header, must be within the valid range for behaviour.",
      errorMessage: {
        type: "The 'index' must be an integer.",
        minimum: `The 'index' must be at least ${behaviourStart}.`,
        maximum: `The 'index' must be at most ${behaviourEnd}.`,
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

const CompiledBehaviourIndexSchema = ajv.compile(BehaviourIndexSchema);

export { CompiledBehaviourIndexSchema, BehaviourIndexSchema };