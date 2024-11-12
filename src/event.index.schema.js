import Ajv from "ajv";
import addErrors from "ajv-errors";

// Import the IndexRangeRegistry
import IndexRangeRegistry from "./indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

// Get the start and end values for appearances from the IndexRangeRegistry
const { start: eventStart, end: eventEnd } = IndexRangeRegistry.eventRange;

const EventIndexSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/event.index.json",
  type: "object",
  properties: {
    value: {
      type: "integer",
      minimum: eventStart,
      maximum: eventEnd,
      description:
        "Unique index for the header, must be within the valid range for events.",
      errorMessage: {
        type: "The 'index' must be an integer.",
        minimum: `The 'index' must be at least ${eventStart}.`,
        maximum: `The 'index' must be at most ${eventEnd}.`,
      },
    },
  },
  required: ["value"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'index' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

const CompiledEventIndexSchema = ajv.compile(EventIndexSchema);

export { CompiledEventIndexSchema, EventIndexSchema};