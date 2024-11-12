// behaviourheader.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { BehaviourIndexSchema } from "./behaviour.index.schema.js";
import { BehaviourDefinitionSchema } from "./behaviour.definition.schema.js";
import { DefinitionExtensionSchema } from "./definition.extension.schema.js";
import { ProfileDefaultDefinitionSchema } from "./profiledefault.definition.schema.js"

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(ProfileDefaultDefinitionSchema, "http://example.com/schemas/profiledefault.definition.json");
ajv.addSchema(BehaviourIndexSchema, "http://example.com/schemas/behaviour.index.json");
ajv.addSchema(DefinitionExtensionSchema, "http://example.com/schemas/definition.extension.json");
ajv.addSchema(BehaviourDefinitionSchema, "http://example.com/schemas/behaviour.definition.json");

const BehaviourTraitDefinitionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/behaviour.trait.definition.json",
  type: "object",
  properties: {
    definition: { $ref: "http://example.com/schemas/behaviour.definition.json" },
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

const CompiledBehaviourTraitDefinitionSchema = ajv.compile(BehaviourTraitDefinitionSchema);

export { CompiledBehaviourTraitDefinitionSchema, BehaviourTraitDefinitionSchema };