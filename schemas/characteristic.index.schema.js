import Ajv from "ajv";
import addErrors from "ajv-errors";
import IndexRangeRegistry from "./_indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

const { start: characteristicStart, end: characteristicEnd } = IndexRangeRegistry.characteristicRange;

const CharacteristicIndexSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/characteristic.index.json",
  type: "object",
  properties: {
    value: {
      type: "integer",
      minimum: characteristicStart,
      maximum: characteristicEnd,
      description: "Unique index for the header, must be within the valid range for characteristic.",
      errorMessage: {
        type: "The 'index' must be an integer.",
        minimum: `The 'index' must be at least ${characteristicStart}.`,
        maximum: `The 'index' must be at most ${characteristicEnd}.`,
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

const CompiledCharacteristicIndexSchema = ajv.compile(CharacteristicIndexSchema);

export { CompiledCharacteristicIndexSchema, CharacteristicIndexSchema };