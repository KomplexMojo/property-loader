// visualizationindex.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";

// Import the IndexRangeRegistry
import IndexRangeRegistry from "./_indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

// Get the start and end values for visualizations from the IndexRangeRegistry
const { start: visualizationStart, end: visualizationEnd } = IndexRangeRegistry.visualizationRange;

const VisualizationIndexSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/visualization.index.json",
  type: "object",
  properties: {
    value: {
      type: "integer",
      minimum: visualizationStart,
      maximum: visualizationEnd,
      description:
        "Unique index for the header, must be within the valid range for visualizations.",
      errorMessage: {
        type: "The 'index' must be an integer.",
        minimum: `The 'index' must be at least ${visualizationStart}.`,
        maximum: `The 'index' must be at most ${visualizationEnd}.`,
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

const CompiledVisualizationIndexSchema = ajv.compile(VisualizationIndexSchema);

export { CompiledVisualizationIndexSchema, VisualizationIndexSchema };