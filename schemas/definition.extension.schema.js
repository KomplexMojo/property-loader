// defaultdefinition.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import IndexRangeRegistry from "./_indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

const { start: namePropertyStart, end: namePropertyEnd } = IndexRangeRegistry.namePropertyRange;
const { start: descriptionPropertyStart, end: descriptionPropertyEnd } = IndexRangeRegistry.descriptionPropertyRange;

// Calculate maxItems dynamically
const namePropertyMaxLength = namePropertyEnd - namePropertyStart + 1;
const descriptionPropertyMaxLength = descriptionPropertyEnd - descriptionPropertyStart + 1;

addErrors(ajv);

// Define the defaultdefinition schema with error handling
const DefinitionExtensionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/definition.extension.json",
  type: "object",
  properties: {
    subindex: {
      type: "integer",
      minimum: 0,
      maximum: 255,
      description: "The subindex of the definition. These are used for definitions that have sub-properties.",
      errorMessage: {
        type: "The 'subindex' must be an integer.",
        minimum: `The 'subindex' must be at least 0.`,
        maximum: `The 'subindex' must be at most 255.`,
      }
    },
    name: {
      type: "string",
      maxLength: namePropertyMaxLength,
      description: "Name of the definition.",
      errorMessage: {
        type: "The 'name' must be a string.",
        maxLength: `name must not exceed ${namePropertyMaxLength} characters.`,
      },
    },
    description: {
      type: "string",
      maxLength: descriptionPropertyMaxLength,
      description: "Description of the definition.",
      errorMessage: {
        type: "The 'description' must be a string.",
        maxLength: `name must not exceed ${descriptionPropertyMaxLength} characters.`,
      },
    }
  },
  required: ["subindex", "name", "description"],
  additionalProperties: false,
  errorMessage: {
    required: {
      subindex: "The 'subindex' property is required even if it is 0.",
      name: "The 'name' property is required.",
      description: "The 'description' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

// Compile the schema for validation
const CompiledDefinitionExtensionSchema = ajv.compile(DefinitionExtensionSchema);

export { CompiledDefinitionExtensionSchema, DefinitionExtensionSchema };