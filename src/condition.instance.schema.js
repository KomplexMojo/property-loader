// conditioninstanceinstance.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { ConditionIndexSchema } from "./condition.index.schema.js";
import { PropertyInstanceSchema } from "./property.instance.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(ConditionIndexSchema, "http://example.com/schemas/condition.index.json");
ajv.addSchema(PropertyInstanceSchema, "http://example.com/schemas/property.instance.json");

const ConditionInstanceSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/condition.instance.json",
  type: "object",
  properties: {
    index: {
      $ref: "http://example.com/schemas/condition.index.json",
      errorMessage: "The 'index' must be a valid condition index.",
    },
    primary: {
      $ref: "http://example.com/schemas/property.instance.json",
      errorMessage: "The 'primary value' must be a valid property instance even if it is set to 0. Primary values could be a set to the index of the property for a definition.",
    },
    secondary: {
      $ref: "http://example.com/schemas/property.instance.json",
      errorMessage: "The 'secondary value' must be a valid property instance even if it is set to 0.",
    },
  },
  required: ["index", "primary","secondary"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'index' property is required.",
      primary: "The 'primary value' property is required.",
      secondary: "The 'secondary value' property is required.",

    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

const CompiledConditionInstanceSchema = ajv.compile(ConditionInstanceSchema);

export { CompiledConditionInstanceSchema, ConditionInstanceSchema };