// effectinstanceinstance.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { EffectIndexSchema} from "./effect.index.schema.js";
import { PropertyInstanceSchema } from "./property.instance.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(EffectIndexSchema, "http://example.com/schemas/effect.index.json");
ajv.addSchema(PropertyInstanceSchema, "http://example.com/schemas/property.instance.json");

const EffectInstanceSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/effect.instance.json",
  type: "object",
  properties: {
    index: {
      $ref: "http://example.com/schemas/effect.index.json",
      errorMessage: "The 'index' must be a valid effect index.",
    },
    subindex: {
      $ref: "http://example.com/schemas/property.instance.json",
      errorMessage: "The 'subindex' must be a valid property instance even if it is set to 0.",
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
      subindex: "The 'subindex' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

const CompiledEffectPropertyInstanceSchema = ajv.compile(EffectInstanceSchema);

export { CompiledEffectPropertyInstanceSchema, EffectInstanceSchema };