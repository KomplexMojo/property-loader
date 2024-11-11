import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import addKeywords from "ajv-keywords";
import { HeaderDefinitionSchemaDefinition } from "./headerdefinition.schema";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addFormats(ajv);
addErrors(ajv);
addKeywords(ajv);

ajv.addSchema(HeaderDefinitionSchemaDefinition, "http://example.com/schemas/header.definition.json");

const HeaderDefinitionSchema = {
  type: "object",
  $id: "http://example.com/schemas/header.json",
  properties: {
    index: {
      type: "integer",
      range: [0, 255],
      description: "Unique index for the header, must be within the valid range for a u8 value."
    },
    header: {
      $ref: "http://example.com/schemas/header.defintion.json"
    }
  },
  required: ["index"],
  additionalProperties: false,
}

const CompiledHeaderDefinitionSchema = ajv.compile(HeaderDefinitionSchema);

export { CompiledHeaderDefinitionSchema , HeaderDefinitionSchema};