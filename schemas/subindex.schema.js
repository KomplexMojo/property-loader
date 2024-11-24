import Ajv from "ajv";
import addErrors from "ajv-errors";
import IndexRangeRegistry from "./_indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

const { start: subindexStart, end: subindexEnd } = IndexRangeRegistry.subindexRange;

const SubIndexSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/subindex.json",
  type: "object",
  properties: {
    value: {
      type: "integer",
      minimum: subindexStart,
      maximum: subindexEnd,
      description: "Unique subindex for the header, must be within the valid range for characteristic.",
      errorMessage: {
        type: "The 'subindex' must be an integer.",
        minimum: `The 'subindex' must be at least ${subindexStart}.`,
        maximum: `The 'subindex' must be at most ${subindexEnd}.`,
      },
    },
  },
  required: ["value"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'subindex' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

const CompiledSubIndexSchema = ajv.compile(SubIndexSchema);

export { CompiledSubIndexSchema, SubIndexSchema };