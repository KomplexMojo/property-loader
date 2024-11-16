// conditioninstanceinstance.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { PropertyInstanceSchema } from "./property.instance.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(PropertyInstanceSchema, "http://example.com/schemas/property.instance.json");

const ProfileDefaultInstanceSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/profiledefault.instance.json",
  type: "object",
  properties: {
    index: {
      $ref: "http://example.com/schemas/property.instance.json",
      errorMessage: "The 'index' must be a valid property instance even if it is set to 0.",
    },
    subindex: {
      $ref: "http://example.com/schemas/property.instance.json",
      errorMessage: "The 'subindex' must be a valid property instance even if it is set to 0.",
    },
    value: {
      $ref: "http://example.com/schemas/property.instance.json",
      errorMessage: "The 'value' must be a valid property instance even if it is set to 0.",
    },
  },
  required: ["index", "subindex", "value"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'index' property is required.",
      subindex: "The 'subindex' property is required.",
      value: "The 'value' property is required."
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

const CompiledProfileDefaultInstanceSchema = ajv.compile(ProfileDefaultInstanceSchema);

export { CompiledProfileDefaultInstanceSchema, ProfileDefaultInstanceSchema };