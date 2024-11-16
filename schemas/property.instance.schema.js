import Ajv from "ajv";
import addErrors from "ajv-errors";
import IndexRangeRegistry from "../schemas/_indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

const { start: propertyValueStart, end: propertyvalueEnd } = IndexRangeRegistry.propertyValueRange;

// Define the Property schema with error handling
const PropertyInstanceSchema = {
  type: "object",
  $id: "http://example.com/schemas/property.instance.json",
  properties: {
    value: {
      oneOf: [
        { type: "boolean" },
        { type: "integer", minimum: propertyValueStart, maximum: propertyvalueEnd },
        { type: "string" },
      ],
      description: "The 'value' can be any valid JSON data type.",
      errorMessage: {
        type: "The 'value' must be a valid JSON data type.",
      },
    },
  },
  required: ["value"],
  additionalProperties: false,
  errorMessage: {
    required: {
      value: "The 'value' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

// Compile the schema for validation
const CompiledPropertyInstanceSchema = ajv.compile(PropertyInstanceSchema);

export { CompiledPropertyInstanceSchema, PropertyInstanceSchema };
