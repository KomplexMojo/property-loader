// effectinstanceinstance.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import { EventIndexSchema} from "./event.index.schema.js";
import { PropertyInstanceSchema } from "./property.instance.schema.js";
import { SubIndexSchema } from "./subindex.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });

addErrors(ajv);

ajv.addSchema(EventIndexSchema, "http://example.com/schemas/event.index.json");
ajv.addSchema(SubIndexSchema, "http://example.com/schemas/subindex.json" );
ajv.addSchema(PropertyInstanceSchema, "http://example.com/schemas/property.instance.json");

const EventInstanceSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/event.instance.json",
  type: "object",
  properties: {
    index: {
      $ref: "http://example.com/schemas/event.index.json",
      errorMessage: "The 'index' must be a valid effect index.",
    },
    subindex: {
      $ref: "http://example.com/schemas/subindex.json",
      errorMessage: "The 'sub index' must be a valid property instance even if it is set to 0.",
    },
    value: {
      $ref: "http://example.com/schemas/property.instance.json",
      errorMessage: "The 'secondary value' must be a valid property instance even if it is set to 0.",
    },
  },
  required: ["index", "subindex"],
  additionalProperties: false,
  errorMessage: {
    required: {
      index: "The 'index' property is required.",
      primary: "The 'subindex' property is required."
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

const CompiledEventInstanceSchema = ajv.compile(EventInstanceSchema);

export { CompiledEventInstanceSchema, EventInstanceSchema };