// pixelarray.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import addKeywords from "ajv-keywords";
import { VisualPixelDefinitionSchema } from "./visualpixel.definition.schema.js";
import { DataPixelDefinitionSchema } from "./datapixel.definition.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);
addKeywords(ajv);

// Add DataPixel and VisualPixel schemas to AJV registry
ajv.addSchema(DataPixelDefinitionSchema, "http://example.com/schemas/datapixel.definition.json");
ajv.addSchema(VisualPixelDefinitionSchema, "http://example.com/schemas/visualpixel.definition.json");

// Define the PixelArraySchema with error handling
const PixelsDefinitionSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/pixels.json",
  type: "array",
  minItems: 256,
  maxItems: 256,
  items: {
    oneOf: [
      { $ref: "http://example.com/schemas/datapixel.definition.json" },
      { $ref: "http://example.com/schemas/visualpixel.definition.json" },
    ],
    errorMessage: "Each item in the 'pixelArray' must be a valid DataPixel or VisualPixel.",
  },
  uniqueItemProperties: ["index"],
  errorMessage: {
    type: "The 'pixelArray' must be an array.",
    minItems: "The 'pixelArray' must contain exactly 256 items.",
    maxItems: "The 'pixelArray' must contain exactly 256 items.",
    uniqueItemProperties: "Each item in the 'pixelArray' must have a unique 'index' property.",
  },
};

// Compile the schema with custom validation
const CompiledPixelArraySchema = ajv.compile(PixelsDefinitionSchema);

// Export the schema and validation function
export { CompiledPixelArraySchema, PixelsDefinitionSchema };