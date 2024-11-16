// visualizationheader.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { VisualizationIndexSchema } from "./visualization.index.schema.js";
import { DefinitionExtensionSchema } from "./definition.extension.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(VisualizationIndexSchema, "http://example.com/schemas/visualization.index.json");
ajv.addSchema(DefinitionExtensionSchema, "http://example.com/schemas/definition.extensions.json");

const VisualizationDefinitionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/visualization.definition.json",
  type: "object",
  properties: {
    index: { $ref: "http://example.com/schemas/visualization.index.json" },
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
}

const CompiledVisualizationDefinitionSchema = ajv.compile(VisualizationDefinitionSchema);

export { CompiledVisualizationDefinitionSchema, VisualizationDefinitionSchema };