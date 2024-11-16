// characteristicheader.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { CharacteristicDefinitionSchema } from "./characteristic.definition.schema.js";
import { CharacteristicIndexSchema } from "./characteristic.index.schema.js";
import { DefinitionExtensionSchema } from "./definition.extension.schema.js";
import { ProfileDefaultDefinitionSchema } from "./profiledefault.definition.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(CharacteristicIndexSchema, "http://example.com/schemas/characteristic.index.json");
ajv.addSchema(DefinitionExtensionSchema, "http://example.com/schemas/definition.extension.json");
ajv.addSchema(CharacteristicDefinitionSchema, "http://example.com/schemas/characteristic.definition.json");
ajv.addSchema(ProfileDefaultDefinitionSchema, "http://example.com/schemas/profiledefault.definition.json")

const CharacteristicTraitDefinitionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/characteristic.trait.definition.json",
  type: "object",
  properties: {
    definition: { $ref: "http://example.com/schemas/characteristic.definition.json" },
    defaults: { $ref: "http://example.com/schemas/profiledefault.definition.json" },
  },
  required: ["definition", "defaults"],
  additionalProperties: false,
  errorMessage: {
    required: {
      definition: "The 'definition' property is required.",
      defaults: "The 'defaults' property is required."
    },
    additionalProperties: "No additional properties are allowed in the object."
  }
};

const CompiledCharacteristicTraitDefinitionSchema = ajv.compile(CharacteristicTraitDefinitionSchema);

export { CompiledCharacteristicTraitDefinitionSchema, CharacteristicTraitDefinitionSchema };