import Ajv from "ajv";
import addErrors from "ajv-errors";
import { PixelArraySchema } from "./pixels.definition.schema.js";

import { HeaderDefinitionSchema } from "./header.definition.schema.js";
import { DataPixelSchema } from "./datapixel.definition.schema.js";
import { VisualPixelSchema } from "./visualpixel.definition.schema.js";
import { PixelArraySchema } from "./pixels.definition.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

// Add DataPixel and VisualPixel schemas to AJV registry

ajv.addSchema(HeaderDefinitionSchema, "http://example.com/schemas/header.json");
ajv.addSchema(DataPixelSchema, "http://example.com/schemas/datapixel.json");
ajv.addSchema(VisualPixelSchema, "http://example.com/schemas/visualpixel.json");
ajv.addSchema(PixelArraySchema, "http://example.com/schemas/pixel.array.json");

const VisualizationDefinitionSchema = {
  type: "object",
  $id: "http://example.com/schemas/visualization.definition.json",
  properties: {
    header: { $ref: "http://example.com/schemas/header.json" },
    pixels: { $ref: "http://example.com/schemas/pixel.array.json" }
  },
  required: ["header", "pixels"],
  additionalProperties: false,
};

// Compile the schema with custom validation
const CompiledVisualizationSchema = ajv.compile(VisualizationDefinitionSchema);

// Export the schema and validation function
export { CompiledVisualizationSchema, VisualizationDefinitionSchema };