import Ajv from "ajv";
import addErrors from "ajv-errors";
import IndexRangeRegistry from "./_indexregistry.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });


const { start: namePropertyStart, end: namePropertyEnd } = IndexRangeRegistry.namePropertyRange;
const { start: descriptionPropertyStart, end: descriptionPropertyEnd } = IndexRangeRegistry.descriptionPropertyRange;

const maxNameLength = namePropertyEnd + 1 - namePropertyStart;
const maxDescriptionLength = descriptionPropertyEnd + 1 - descriptionPropertyStart;

addErrors(ajv);

const HeaderDefinitionSchema = {
  type: "object",
  $id: "http://example.com/schemas/header.definition.json",
  properties: {
    name: {
      type: "string",
      maxLength: maxNameLength,
      description: "Name of the header.",
      errorMessage: {
        type: "The 'name' must be a string.",
        maxLength: `The 'name' must not exceed ${maxNameLength} characters.`,
      },
    },
    description: {
      type: "string",
      maxLength: maxDescriptionLength,
      description: "Description of the header.",
      errorMessage: {
        type: "The 'description' must be a string.",
        maxLength: `The 'description' must not exceed ${maxDescriptionLength}.`,
      },
    },
  },
  required: ["name", "description"],
  additionalProperties: false,
}

const CompiledHeaderDefinitionSchema = ajv.compile(HeaderDefinitionSchema);

export { CompiledHeaderDefinitionSchema , HeaderDefinitionSchema};