import Ajv from "ajv";
import addErrors from "ajv-errors";
import IndexRangeRegistry from "../src/indexregistry.js";

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
      type: "integer",
      minimum: propertyValueStart,
      maximum: propertyvalueEnd,
      description: "Integer value within the defined property range.",
      errorMessage: {
        type: "The 'value' must be an integer.",
        minimum: `The 'value' must be at least ${propertyValueStart}.`,
        maximum: `The 'value' must be at most ${propertyvalueEnd}.`,
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