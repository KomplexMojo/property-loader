import Ajv from "ajv";
import addErrors from "ajv-errors";
import IndexRangeRegistry from "./indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

const { start: propertyValueStart, end: propertyvalueEnd } = IndexRangeRegistry.propertyValueRange;

// Define the Property schema
const PropertyInstanceSchema = {
  type: "object",
  $id: "http://example.com/schemas/property.instance.json",
  properties: {
    value: {
      type: "integer",
      minimum: propertyValueStart,
      maximum: propertyvalueEnd
    },
  },
  required: ["value"],
  additionalProperties: false,
};

// Compile the schema for validation
const CompiledPropertyInstanceSchema = ajv.compile(PropertyInstanceSchema);

export { CompiledPropertyInstanceSchema, PropertyInstanceSchema };