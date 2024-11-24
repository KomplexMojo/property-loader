import Ajv from "ajv";
import addErrors from "ajv-errors";

import { PixelDefinitionSchema } from "./pixel.definition.schema.js";
import { VisualizationDefinitionSchema } from "./visualization.definition.schema.js";
import { VisualizationIndexSchema } from "./visualization.index.schema.js";
import { DefinitionExtensionSchema } from "./definition.extension.schema.js";
import { ProfileDefaultInstanceSchema } from "./profiledefault.instance.schema.js";
import { PropertyInstanceSchema } from "./property.instance.schema.js";
import { SubIndexSchema } from "./subindex.schema.js";
import IndexRangeRegistry from "./_indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);


const { start: pixelMin, end: pixelMax } = IndexRangeRegistry.pixelRange;
const totalPixels = pixelMax - pixelMin +1;

// Add schemas to AJV registry
ajv.addSchema(PixelDefinitionSchema, "http://example.com/schemas/pixel.definition.json");
ajv.addSchema(PropertyInstanceSchema, "http://example.com/schemas/property.instance.json");
ajv.addSchema(ProfileDefaultInstanceSchema, "http://example.com/schemas/profiledefault.instance.json");
ajv.addSchema(SubIndexSchema, "http://example.com/schemas/subindex.json");
ajv.addSchema(DefinitionExtensionSchema, "http://example.com/schemas/definition.extension.json");
ajv.addSchema(VisualizationIndexSchema, "http://example.com/schemas/visualization.index.json");
ajv.addSchema(VisualizationDefinitionSchema, "http://example.com/schemas/visualization.definition.json");

// Define the VisualizationTraitDefinitionSchema
const VisualizationTraitDefinitionSchema = {
  type: "object",
  $id: "http://example.com/schemas/visualization.trait.definition.json",
  properties: {
    defaults: { $ref: "http://example.com/schemas/profiledefault.instance.json" },
    definition: { $ref: "http://example.com/schemas/visualization.definition.json" },
    pixels: {
      type: "array",
      items: { $ref: "http://example.com/schemas/pixel.definition.json" },
      minItems: totalPixels,
      maxItems: totalPixels,
      errorMessage: {
        type: "'pixels' must be an array.",
        minItems: "'pixels' must contain at least one valid pixel definition.",
      },
    },
  },
  required: ["defaults", "definition", "pixels"],
  additionalProperties: false,
  errorMessage: {
    required: {
      defaults: "'defaults' is required and must conform to the profile default schema.",
      definition: "'definition' is required and must conform to the visualization definition schema.",
      pixels: "'pixels' is required and must be an array of pixel definitions.",
    },
    additionalProperties: "No additional properties are allowed.",
  },
};

// Compile the schema with custom validation
const CompiledVisualizationTraitSchema = ajv.compile(VisualizationTraitDefinitionSchema);

// Export the schema and validation function
export { CompiledVisualizationTraitSchema, VisualizationTraitDefinitionSchema };