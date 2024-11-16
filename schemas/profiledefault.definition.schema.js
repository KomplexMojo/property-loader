// profiledefault.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { PropertyInstanceSchema } from "./property.instance.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(PropertyInstanceSchema, "http://example.com/schemas/property.instance.json");

// Define the DataPixel schema with error handling
const ProfileDefaultDefinitionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/profiledefault.definiton.json",
  type: "object",
  properties: {
    index: {
      $ref: "http://example.com/schemas/property.instance.json",
      errorMessage: "The 'sub index' must be a valid property instance even if it is set to 0.",
    },
    subindex: {
      $ref: "http://example.com/schemas/property.instance.json",
      errorMessage: "The 'sub index' must be a valid property instance even if it is set to 0.",
    },
    name: {
      type: "string",
      maxLength: 64,
      errorMessage: {
        type: "The 'name' must be a string.",
        maxLength: "The 'name' must not exceed 64 characters.",
      },
    },
    value: {
      anyOf: [
        {
          type: "boolean",
          errorMessage: {
            type: "The 'value' must be a boolean.",
          },
        },
        {
          type: "integer",
          minimum: 0,
          maximum: 255,
          errorMessage: {
            type: "The 'value' must be an integer.",
            minimum: "The 'value' must be at least 0.",
            maximum: "The 'value' must be at most 255.",
          },
        },
      ],
      errorMessage: "The 'value' must be either a boolean or an integer between 0 and 255.",
    },
  },
  required: ["index", "subindex", "name", "value"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'index' property is required.",
      name: "The 'name' property is required.",
      value: "The 'value' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

const CompiledProfileDefaultSchema = ajv.compile(ProfileDefaultDefinitionSchema);

export { CompiledProfileDefaultSchema, ProfileDefaultDefinitionSchema };