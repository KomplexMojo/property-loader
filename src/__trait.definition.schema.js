// trait.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { HeaderDefinitionSchema } from "./header.definition.schema.js";
import { ProfileDefaultSchema } from "./profiledefault.definition.schema.js";
import { PropertyDefinitionSchema } from "./property.definition.schema.js";
import { CharacteristicDefinitionSchema } from "./characteristic.definition.schema.js";
import { BehaviourDefinitionSchema } from "./behaviour.definition.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

// Add Header and other schemas to AJV registry
ajv.addSchema(HeaderDefinitionSchema, "http://example.com/schemas/header.definition.json");
ajv.addSchema(ProfileDefaultSchema, "http://example.com/schemas/profile.default.json");
ajv.addSchema(PropertyDefinitionSchema, "http://example.com/schemas/property.definition.json");
ajv.addSchema(CharacteristicDefinitionSchema, "http://example.com/schemas/characteristic.definition.json");
ajv.addSchema(BehaviourDefinitionSchema, "http://example.com/schemas/behaviour.definition.json");

const TraitSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/trait.definition.json",
  type: "object",
  properties: {
    header: {
      $ref: "http://example.com/schemas/header.definition.json",
      errorMessage: "The 'header' must be a valid header definition.",
    },
    defaults: {
      type: "array",
      minItems: 1,
      maxItems: 10,
      items: { $ref: "http://example.com/schemas/profile.default.json" },
      errorMessage: {
        type: "The 'defaults' must be an array.",
        minItems: "The 'defaults' must contain at least 1 item.",
        maxItems: "The 'defaults' must not exceed 10 items.",
      },
    },
    definitions: {
      type: "array",
      minItems: 1,
      maxItems: 256,
      items: {
        oneOf: [
          { $ref: "http://example.com/schemas/characteristic.definition.json" },
          { $ref: "http://example.com/schemas/behaviour.definition.json" },
        ],
      },
      errorMessage: {
        type: "The 'definitions' must be an array.",
        minItems: "The 'definitions' must contain at least 1 item.",
        maxItems: "The 'definitions' must not exceed 256 items.",
        oneOf: "Each item in 'definitions' must be a valid characteristic or behaviour definition.",
      },
    },
  },
  required: ["header", "defaults", "definitions"],
  additionalProperties: false,
  errorMessage: {
    required: {
      header: "The 'header' property is required.",
      defaults: "The 'defaults' property is required.",
      definitions: "The 'definitions' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

// Compile the schema with custom validation
const CompiledTraitSchema = ajv.compile(TraitSchema);

// Export the schema and validation function
export { CompiledTraitSchema, TraitSchema };