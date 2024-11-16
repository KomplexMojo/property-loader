// triggerinstanceinstance.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { TriggerIndexSchema } from "./trigger.index.schema.js";
import { PropertyInstanceSchema } from "./property.instance.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(TriggerIndexSchema, "http://example.com/schemas/trigger.index.json");
ajv.addSchema(PropertyInstanceSchema, "http://example.com/schemas/property.instance.json");

const TriggerInstanceSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/trigger.instance.json",
  type: "object",
  properties: {
    index: {
      $ref: "http://example.com/schemas/trigger.index.json",
      errorMessage: "The 'index' must be a valid trigger index.",
    },
    subindex: {
      $ref: "http://example.com/schemas/property.instance.json",
      errorMessage: "The 'primary value' must be a valid property instance even if it is set to 0. Primary values could be a set to the index of the property for a definition.",
    },
    value: {
      $ref: "http://example.com/schemas/property.instance.json",
      errorMessage: "The 'secondary value' must be a valid property instance even if it is set to 0.",
    },
  },
  required: ["index", "subindex"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'index' property is required.",
      subindex: "The 'subindex' property is required."
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

const CompiledTriggerInstance = ajv.compile(TriggerInstanceSchema);

export { CompiledTriggerInstance, TriggerInstanceSchema };