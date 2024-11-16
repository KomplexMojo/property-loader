import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

// Define the VisualPixelschema
const VisualPixelDefinitionSchema = {
  type: "object",
  $id: "http://example.com/schemas/visualpixel.definition.json",
  properties: {
    index: { type: "integer", minimum: 0, maximum: 255 }, // unique index in the uint8 range
    R: { type: "integer", minimum: 0, maximum: 255 }, // uint8 red value
    G: { type: "integer", minimum: 0, maximum: 255 }, // uint8 green value
    B: { type: "integer", minimum: 0, maximum: 255 }, // uint8 blue value
    A: { type: "integer", minimum: 1, maximum: 255 }, // uint8 alpha value, always 0
  },
  required: ["index", "R", "G", "B", "A"],
  additionalProperties: false,
};

// Compile the schema for validation
const CompiledVisualPixelSchema = ajv.compile(VisualPixelDefinitionSchema);

export { CompiledVisualPixelSchema, VisualPixelDefinitionSchema };