// conditionindex.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import IndexRangeRegistry from "./indexRangeRegistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

const { start: conditionStart, end: conditionEnd } = IndexRangeRegistry.conditions;

const ConditionIndexSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/condition.index.json",
  type: "object",
  properties: {
    index: {
      type: "integer",
      minimum: conditionStart,
      maximum: conditionEnd,
      description: "Unique index for the header, must be within the valid range for condition.",
      errorMessage: {
        type: "The 'index' must be an integer.",
        minimum: `The 'index' must be at least ${conditionStart}.`,
        maximum: `The 'index' must be at most ${conditionEnd}.`,
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

const CompiledConditionIndexSchema = ajv.compile(ConditionIndexSchema);

export { CompiledConditionIndexSchema, ConditionIndexSchema };