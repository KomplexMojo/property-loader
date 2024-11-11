// event.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";

// supporting schemas
import { TriggerIndexSchema } from "./trigger.index.schema.js";
import { EffectIndexSchema } from "./effect.index.schema.js";
import { ConditionIndexSchema } from "./condition.index.schema.js";

// main schemas
import { HeaderDefinitionSchema } from "./header.definition.schema.js";
import { ProfileDefaultSchema } from "./profiledefault.definition.schema.js";
import { TriggerInstanceSchema } from "./trigger.instance.json.js";
import { EffectInstanceSchema } from "./effect.instance.json.js";
import { ConditionInstanceSchema } from "./condition.instance.json.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

// add ranges for 
const { start: triggerStart, end: triggerEnd } = IndexRangeRegistry.triggers;
const { start: effectStart, end: effectEnd } = IndexRangeRegistry.effects;
const { start: conditionStart, end: conditionEnd } = IndexRangeRegistry.conditions;

// Calculate maxItems dynamically
const triggersMaxItems = triggerEnd - triggerStart + 1;
const effectsMaxItems = effectEnd - effectStart + 1;
const conditionsMaxItems = conditionEnd - conditionStart +1;

// supporting schemas
ajv.addSchema(TriggerIndexSchema, "http://example.com/schemas/trigger.index.json");
ajv.addSchema(EffectIndexSchema, "http://example.com/schemas/effect.index.json");
ajv.addSchema(ConditionIndexSchema, "http://example.com/schemas/condition.index.json");

// schemas that are directly used.
ajv.addSchema(HeaderDefinitionSchema, "http://example.com/schemas/header.defintion.json");
ajv.addSchema(ProfileDefaultSchema, "http://example.com/schemas/header.defintion.json");
ajv.addSchema(TriggerInstanceSchema, "http://example.com/schemas/trigger.instance.json");
ajv.addSchema(EffectInstanceSchema, "http://example.com/schemas/effect.instance.json");
ajv.addSchema(ConditionInstanceSchema, "http://example.com/schemas/condition.instance.json");

// Define the EventManager schema with error handling
const EventTemplateSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/event.template.json",
  type: "object",
  properties: {
    header: {
      $ref: "http://example.com/schemas/header.json",
      errorMessage: "The 'header' must be a valid event header.",
    },
    defaults: {
      type: "array",
      minItems: 1,
      maxItems: 10,
      items: { $ref: "http://example.com/schemas/profile.default.json" },
      errorMessage: {
        type: "The 'defaults' must be an array.",
        minItems: "The 'defaults' must have at least 0 items.",
        maxItems: "The 'defaults' must not exceed 10 items.",
      },
    },
    triggers: {
      type: "array",
      minItems: 1,
      maxItems: triggersMaxItems,
      items: { $ref: "http://example.com/schemas/trigger.instance.json" },
      errorMessage: {
        type: "The 'triggers' must be an array.",
        minItems: "There must be at least 1 trigger.",
        maxItems: `There must be at most ${triggersMaxItems} triggers.`,
      },
    },
    effects: {
      type: "array",
      minItems: 1,
      maxItems: effectsMaxItems,
      items: { $ref: "http://example.com/schemas/effect.instance.json" },
      errorMessage: {
        type: "The 'effects' must be an array.",
        minItems: "There must be at least 1 effect.",
        maxItems: `There must be at most ${effectsMaxItems} effects.`,
      },
    },
    conditions: {
      type: "array",
      minItems: 1,
      maxItems: conditionsMaxItems,
      items: { $ref: "http://example.com/schemas/condition.instance.json" },
      errorMessage: {
        type: "The 'conditions' must be an array.",
        minItems: "There must be at least 1 condition.",
        maxItems: `There must be at most ${conditionsMaxItems} conditions.`,
      },
    },
  },
  required: ["header", "triggers", "effects", "conditions"],
  additionalProperties: false,
  errorMessage: {
    required: {
      header: "The 'header' property is required.",
      triggers: "The 'triggers' property is required.",
      effects: "The 'effects' property is required.",
      conditions: "The 'conditions' property is required.",
    },
    additionalProperties: "No additional properties are allowed in the object.",
  },
};

// Compile the schema for the EventManager
const CompiledEventTemplateSchema = ajv.compile(EventTemplateSchema);

// Export the compiled schemas and definitions
export {
  CompiledEventTemplateSchema,
  EventTemplateSchema
};