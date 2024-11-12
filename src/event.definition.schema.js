// EventDefinition.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { EventIndexSchema } from "./event.index.schema.js";
import { DefinitionExtensionSchema } from "./definition.extension.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(EventIndexSchema, "http://example.com/schemas/event.index.json");
ajv.addSchema(DefinitionExtensionSchema, "http://example.com/schemas/definition.extension.json");

const EventDefinitionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/event.defintion.json",
  type: "object",
  properties: {
    index: { $ref: "http://example.com/schemas/event.index.json" },
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

const CompiledEventDefinitionSchema = ajv.compile(EventDefinitionSchema);

export { CompiledEventDefinitionSchema, EventDefinitionSchema };