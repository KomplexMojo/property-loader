// propertydefinition.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

// Define the PropertyDefinition schema with error handling
const PropertyDefinitionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/property.definition.json",
  type: "object",
  properties: {
    index: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      description: "Unique index in the uint8 range.",
      errorMessage: {
        type: "The 'index' must be an integer.",
        minimum: "The 'index' must be at least 0.",
        maximum: "The 'index' must be at most 255.",
      },
    },
    name: {
      type: "string",
      maxLength: 64,
      description: "Name of the property.",
      errorMessage: {
        type: "The 'name' must be a string.",
        maxLength: "The 'name' must not exceed 64 characters.",
      },
    },
    value: {
      type: "integer",
      minimum: 0,
      description: "Value of the property.",
      errorMessage: {
        type: "The 'value' must be an integer.",
        minimum: "The 'value' must be at least 0.",
      },
    },
    description: {
      type: "string",
      maxLength: 256,
      description: "Description of the property.",
      errorMessage: {
        type: "The 'description' must be a string.",
        maxLength: "The 'description' must not exceed 256 characters.",
      },
    },
  },
  required: ["index", "name", "value", "description"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'index' property is required.",
      name: "The 'name' property is required.",
      value: "The 'value' property is required.",
      description: "The 'description' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

// Compile the schema for validation
const CompiledPropertyDefinitionSchema = ajv.compile(PropertyDefinitionSchema);

// Export the compiled schema and its definition
export { CompiledPropertyDefinitionSchema, PropertyDefinitionSchema };