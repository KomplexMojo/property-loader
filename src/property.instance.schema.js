import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

// Define the Property schema
const PropertyInstanceSchema = {
  type: "object",
  $id: "http://example.com/schemas/property.instance.json",
  properties: {
    value: { type: "integer", range: [0,255] },
  },
  required: ["value"],
  additionalProperties: false,
};

// Compile the schema for validation
const CompiledPropertyInstanceSchema = ajv.compile(PropertyInstanceSchema);

export { CompiledPropertyInstanceSchema, PropertyInstanceSchema };