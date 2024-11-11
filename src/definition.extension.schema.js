// defaultdefinition.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

// Define the defaultdefinition schema with error handling
const DefinitionExtensionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/definition.extension.json",
  type: "object",
  properties: {
    name: {
      type: "string",
      maxLength: 64,
      description: "Name of the header.",
      errorMessage: {
        type: "The 'name' must be a string.",
        maxLength: "The 'name' must not exceed 64 characters.",
      },
    },
    description: {
      type: "string",
      maxLength: 256,
      description: "Description of the header.",
      errorMessage: {
        type: "The 'description' must be a string.",
        maxLength: "The 'description' must not exceed 256 characters.",
      },
    },
    value: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      description:
        "Default value the of the definition.",
      errorMessage: {
        type: "The 'value' must be an integer.",
        minimum: `The 'value' must be at least 0.`,
        maximum: `The 'value' must be at most 255.`,
      },
    },
  },
  required: ["name", "description", "value"],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: "The 'name' property is required.",
      description: "The 'description' property is required.",
      value: "The 'value' property is required even if it is 0.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

// Compile the schema for validation
const CompiledDefinitionExtensionSchema = ajv.compile(DefinitionExtensionSchema);

export { CompiledDefinitionExtensionSchema, DefinitionExtensionSchema };