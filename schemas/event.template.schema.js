// event.schema.js

import Ajv from "ajv";
import addErrors from "ajv-errors";
import IndexRangeRegistry from "./_indexregistry.js";

// index schemas
import { EventIndexSchema } from "./event.index.schema.js";
import { TriggerIndexSchema } from "./trigger.index.schema.js";
import { EffectIndexSchema } from "./effect.index.schema.js";
import { ConditionIndexSchema } from "./condition.index.schema.js";

// definition schemas
import { EventDefinitionSchema } from "./event.definition.schema.js";
import { ProfileDefaultDefinitionSchema } from "./profiledefault.definition.schema.js";

// instance schemas
import { TriggerInstanceSchema } from "./trigger.instance.schema.js";
import { EffectInstanceSchema } from "./effect.instance.schema.js";
import { ConditionInstanceSchema } from "./condition.instance.schema.js";
import { PropertyInstanceSchema } from "./property.instance.schema.js";
import { EventInstanceSchema } from "./event.instance.schema.js";

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

// add ranges for 
const { start: triggerStart, end: triggerEnd } = IndexRangeRegistry.triggerRange;
const { start: effectStart, end: effectEnd } = IndexRangeRegistry.eventRange;
const { start: conditionStart, end: conditionEnd } = IndexRangeRegistry.conditionRange;
const { start: eventStart, end: eventEnd } = IndexRangeRegistry.eventRange;

// Calculate maxItems dynamically
const eventsMaxItems = eventEnd - eventStart + 1;
const triggersMaxItems = triggerEnd - triggerStart + 1;
const effectsMaxItems = effectEnd - effectStart + 1;
const conditionsMaxItems = conditionEnd - conditionStart + 1;

// supporting schemas
ajv.addSchema(EventIndexSchema, "http://example.com/schemas/event.index.json");
ajv.addSchema(TriggerIndexSchema, "http://example.com/schemas/trigger.index.json");
ajv.addSchema(EffectIndexSchema, "http://example.com/schemas/effect.index.json");
ajv.addSchema(ConditionIndexSchema, "http://example.com/schemas/condition.index.json");

// schemas that are directly used.

ajv.addSchema(EventDefinitionSchema, "http://example.com/schemas/event.definition.json");
ajv.addSchema(ProfileDefaultDefinitionSchema, "http://example.com/schemas/profiledefault.definition.json");

// instance schemas
ajv.addSchema(PropertyInstanceSchema, "http://example.com/schemas/property.instance.json");
ajv.addSchema(TriggerInstanceSchema, "http://example.com/schemas/trigger.instance.json");
ajv.addSchema(EffectInstanceSchema, "http://example.com/schemas/effect.instance.json");
ajv.addSchema(ConditionInstanceSchema, "http://example.com/schemas/condition.instance.json");
ajv.addSchema(EventInstanceSchema, "http://example.com/schemas/event.instance.json");

// Define the EventManager schema with error handling
const EventTemplateSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/schemas/event.template.json",
  type: "object",
  properties: {
    event: {
      $ref: "http://example.com/schemas/event.instance.json",
      errorMessage: "The 'event' must be a valid event instance.",
    },
    defaults: {
      type: "array",
      minItems: 1,
      maxItems: 10,
      items: { $ref: "http://example.com/schemas/profiledefault.definition.json" },
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
  required: ["event", "triggers", "effects", "conditions"],
  additionalProperties: false,
  errorMessage: {
    required: {
      header: "The 'event' property is required.",
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