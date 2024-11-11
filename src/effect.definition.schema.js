// effectheader.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { EffectIndexSchema } from "./effect.index.schema";
import { DefinitionExtensionSchema } from "./definition.extension.schema";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(EffectIndexSchema, "http://example.com/schemas/effect.index.json");
ajv.addSchema(DefinitionExtensionSchema, "http://example.com/schemas/definition.extension.json");

const EffectDefinitionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/effecth.defintion.json",
  type: "object",
  properties: {
    index: { $ref: "http://example.com/schemas/effect.index.json" },
    extension: { $ref: "http://example.com/schemas/definition.extension.json" }
  },
  required: ["index", "extension"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'index' property is required.",
      extension: "The 'extension' property is required."
    },
    additionalProperties: "No additional properties are allowed in the object.",
  }
};

const CompiledEffectHeaderSchema = ajv.compile(EffectDefinitionSchema);

export { CompiledEffectHeaderSchema, EffectDefinitionSchema };