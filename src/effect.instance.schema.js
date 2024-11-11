// effectinstanceinstance.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { EffectIndexSchemaDefinition } from "./effect.index.schema";
import { PropertyInstanceSchemaDefinition } from "./property.instance.schema";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(EffectIndexSchemaDefinition, "http://example.com/schemas/effect.index.json");
ajv.addSchema(PropertyInstanceSchemaDefinition, "http://example.com/schemas/property.instance.json");

const EffectInstanceSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/effect.instance.json",
  type: "object",
  properties: {
    index: {
      $ref: "http://example.com/schemas/effect.index.json",
      errorMessage: "The 'index' must be a valid effect index.",
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

const CompiledEffectPropertyInstanceSchema = ajv.compile(EffectInstanceSchema);

export { CompiledEffectPropertyInstanceSchema, EffectInstanceSchema };