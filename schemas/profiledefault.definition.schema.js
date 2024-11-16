// profiledefault.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import IndexRangeRegistry from "./_indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

const { start: profileDefaultsStart, end: profileDefaultsEnd } = IndexRangeRegistry.profileDefaultsRange;
const profileDefaultsMaxItems = profileDefaultsEnd - profileDefaultsStart +1;

// Define the DataPixel schema with error handling
const ProfileDefaultDefinitionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/profiledefault.definiton.json",
  type: "object",
  properties: {
    index: {
      type: "integer",
      minimum: 1,
      maximum: profileDefaultsMaxItems,
      description: "Unique index in the uint8 range.",
      errorMessage: {
        type: "The 'index' must be an integer.",
        minimum: `The 'index' must be at least 0.`,
        maximum: `The 'index' must be at most ${profileDefaultsMaxItems}.`,
      },
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
  required: ["index", "name", "value"],
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