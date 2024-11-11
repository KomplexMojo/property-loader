// behaviourheader.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { BehaviourDefinitionSchema } from "./behaviour.definition.schema";
import { BehaviourIndexSchema } from "./behaviour.index.schema";
import { DefinitionExtensionSchema } from "./definition.extension.schema";
import IndexRangeRegistry from "./indexregistry";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

const { start: behaviourStart, end: behaviourEnd } = IndexRangeRegistry.behaviours;

addErrors(ajv);

ajv.addSchema(BehaviourIndexSchema, "http://example.com/schemas/behaviour.index.json");
ajv.addSchema(DefinitionExtensionSchema, "http://example.com/schemas/definition.extension.json");
ajv.addSchema(BehaviourDefinitionSchema, "http://example.com/schemas/behaviour.definition.json");

const BehaviourTraitDefinitionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/behaviour.trait.definition.json",
  type: "object",
  properties: {
    definition: { $ref: "http://example.com/schemas/behaviour.definition.json" },
    defaults: { $ref: "http://example.com/schemas/profile.default.json" },
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