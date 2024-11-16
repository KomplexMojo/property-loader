import Ajv from "ajv";
import addErrors from "ajv-errors";

import { DataPixelDefinitionSchema } from "./datapixel.definition.schema.js";
import { VisualPixelDefinitionSchema } from "./visualpixel.definition.schema.js";
import { PixelsDefinitionSchema } from "./pixels.definition.schema.js";
import { VisualizationDefinitionSchema } from "./visualization.definition.schema.js"
import { VisualizationIndexSchema } from "./visualization.index.schema.js";
import { DefinitionExtensionSchema } from "./definition.extension.schema.js";
import { ProfileDefaultInstanceSchema } from "./profiledefault.instance.schema.js";
import { PropertyInstanceSchema } from "./property.instance.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

// Add DataPixel and VisualPixel schemas to AJV registry

ajv.addSchema(PropertyInstanceSchema, "http://example.com/schemas/property.instance.json" );
ajv.addSchema(ProfileDefaultInstanceSchema, "http://example.com/schemas/profiledefault.instance.json");
ajv.addSchema(DefinitionExtensionSchema, "http://example.com/schemas/definition.extension.json");
ajv.addSchema(VisualizationIndexSchema, "http://example.com/schemas/visualization.index.json");
ajv.addSchema(DataPixelDefinitionSchema, "http://example.com/schemas/datapixel.definition.json");
ajv.addSchema(VisualPixelDefinitionSchema, "http://example.com/schemas/visualpixel.definition.json");
ajv.addSchema(PixelsDefinitionSchema, "http://example.com/schemas/pixels.definition.json");
ajv.addSchema(VisualizationDefinitionSchema, "http://example.com/schemas/visualization.definition.json");

const VisualizationTraitDefinitionSchema = {
  type: "object",
  $id: "http://example.com/schemas/visualization.trait.definition.json",
  properties: {
    defaults: { $ref: "http://example.com/schemas/profiledefault.instance.json" },
    definition: { $ref: "http://example.com/schemas/visualization.definition.json" },
    pixels: { $ref: "http://example.com/schemas/pixels.definition.json" }
  },
  required: ["defaults", "definition", "pixels"],
  additionalProperties: false,
};

// Compile the schema with custom validation
const CompiledVisualizationTraitSchema = ajv.compile(VisualizationTraitDefinitionSchema);

// Export the schema and validation function
export { CompiledVisualizationTraitSchema, VisualizationTraitDefinitionSchema };