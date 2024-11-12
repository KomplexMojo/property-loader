import Ajv from "ajv";
import addErrors from "ajv-errors";
import IndexRangeRegistry from "./indexregistry.js";

// index schemas
import { VisualizationIndexSchema } from "./visualization.index.schema.js";
import { BehaviourIndexSchema } from "./behaviour.index.schema.js";
import { CharacteristicIndexSchema } from "./characteristic.index.schema.js";
import { ConditionIndexSchema } from "./condition.index.schema.js";
import { EffectIndexSchema } from "./effect.index.schema.js";
import { EventIndexSchema } from "./event.index.schema.js";
import { TriggerIndexSchema } from "./trigger.index.schema.js";

// definition schemas
import { DefinitionExtensionSchema } from "./definition.extension.schema.js";
import { BehaviourDefinitionSchema } from "./behaviour.definition.schema.js";
import { CharacteristicDefinitionSchema } from "./characteristic.definition.schema.js";
import { ConditionDefinitionSchema } from "./condition.definition.schema.js";
import { DataPixelDefinitionSchema } from "./datapixel.definition.schema.js";
import { EffectDefinitionSchema } from "./effect.definition.schema.js";
import { EventDefinitionSchema } from "./event.definition.schema.js";
import { HeaderDefinitionSchema } from "./header.definition.schema.js";
import { PixelsDefinitionSchema } from "./pixels.definition.schema.js";
import { ProfileDefaultDefinitionSchema } from "./profiledefault.definition.schema.js";
import { PropertyDefinitionSchema } from "./property.definition.schema.js";
import { TriggerDefinitionSchema } from "./trigger.definition.schema.js";
import { VisualizationDefinitionSchema } from "./visualization.definition.schema.js";
import { VisualPixelDefinitionSchema } from "./visualpixel.definition.schema.js";

// instance schemas
import { ConditionInstanceSchema } from "./condition.instance.schema.js";
import { EffectInstanceSchema } from "./effect.instance.schema.js";
import { PropertyInstanceSchema } from "./property.instance.schema.js";
import { TriggerInstanceSchema } from "./trigger.instance.schema.js";

// trait schema
import { BehaviourTraitDefinitionSchema } from "./behaviour.trait.definition.schema.js";
import { CharacteristicTraitDefinitionSchema } from "./characteristic.trait.definition.schema.js";
import { VisualizationTraitDefinitionSchema } from "./visualization.trait.definition.schema.js";

// add ranges for 
const { start: visualizationStart, end: visualizationEnd } = IndexRangeRegistry.visualizationRange;
const { start: characteristicsStart, end: characteristicsEnd } = IndexRangeRegistry.characteristicRange;
const { start: behavioursStart, end: behavioursEnd } = IndexRangeRegistry.behaviourRange;
const { start: eventsStart, end: eventsEnd } = IndexRangeRegistry.eventRange;
const { start: triggerStart, end: triggerEnd } = IndexRangeRegistry.triggerRange;
const { start: effectStart, end: effectEnd } = IndexRangeRegistry.effectRange;
const { start: conditionStart, end: conditionEnd } = IndexRangeRegistry.conditionRange;
const { start: profileDefaultStart, end: profileDefaultEnd } = IndexRangeRegistry.profileDefaultsRange;

// Calculate maxItems dynamically
const visualizationMaxItems = visualizationEnd - visualizationStart + 1;
const characteristicMaxItems = characteristicsEnd - characteristicsStart + 1;
const behaviourMaxItems = behavioursEnd - behavioursStart + 1;
const eventMaxItems = eventsEnd - eventsStart + 1;
const triggersMaxItems = triggerEnd - triggerStart + 1;
const effectsMaxItems = effectEnd - effectStart + 1;
const conditionsMaxItems = conditionEnd - conditionStart + 1;
const profileDefaultMaxItems = profileDefaultEnd - profileDefaultStart +1;

// Initialize AJV
const ajv = new Ajv({ allErrors: true, strict: false });

addErrors(ajv);

// index schemas
ajv.addSchema(VisualizationIndexSchema, "http://example.com/schemas/visualization.index.json");
ajv.addSchema(BehaviourIndexSchema, "http://example.com/schemas/behaviour.index.json");
ajv.addSchema(CharacteristicIndexSchema, "http://example.com/schemas/characteristic.index.json");
ajv.addSchema(ConditionIndexSchema, "http://example.com/schemas/condition.index.json");
ajv.addSchema(EffectIndexSchema, "http://example.com/schemas/effect.index.json");
ajv.addSchema(EventIndexSchema, "http://example.com/schemas/event.index.json");
ajv.addSchema(TriggerIndexSchema, "http://example.com/schemas/trigger.index.json");

// definition schemas
ajv.addSchema(DefinitionExtensionSchema,"http://example.com/schemas/definition.extension.json");
ajv.addSchema(VisualizationDefinitionSchema,"http://example.com/schemas/visualization.definition.json");
ajv.addSchema(BehaviourDefinitionSchema,"http://example.com/schemas/behaviour.definition.json");
ajv.addSchema(CharacteristicDefinitionSchema,"http://example.com/schemas/characteristic.definition.json");
ajv.addSchema(ConditionDefinitionSchema,"http://example.com/schemas/condition.definition.json");
ajv.addSchema(DataPixelDefinitionSchema,"http://example.com/schemas/datapixel.definition.json");
ajv.addSchema(EffectDefinitionSchema,"http://example.com/schemas/effect.definition.json");
ajv.addSchema(EventDefinitionSchema,"http://example.com/schemas/event.definition.json");
ajv.addSchema(HeaderDefinitionSchema,"http://example.com/schemas/header.definition.json");
ajv.addSchema(PixelsDefinitionSchema,"http://example.com/schemas/pixels.definition.json");
ajv.addSchema(ProfileDefaultDefinitionSchema,"http://example.com/schemas/profiledefault.definition.json");
ajv.addSchema(PropertyDefinitionSchema,"http://example.com/schemas/property.definition.json");
ajv.addSchema(TriggerDefinitionSchema,"http://example.com/schemas/trigger.definition.json");
ajv.addSchema(VisualPixelDefinitionSchema,"http://example.com/schemas/visualpixel.definition.json");

// instance schemas
ajv.addSchema(ConditionInstanceSchema,"http://example.com/schemas/condition.instance.schema.json");
ajv.addSchema(EffectInstanceSchema,"http://example.com/schemas/effect.instance.schema.json");
ajv.addSchema(PropertyInstanceSchema,"http://example.com/schemas/property.instance.schema.json");
ajv.addSchema(TriggerInstanceSchema,"http://example.com/schemas/trigger.instance.schema.json");

// trait schema
ajv.addSchema(BehaviourTraitDefinitionSchema,"http://example.com/schemas/behaviour.trait.definition.schema.json");
ajv.addSchema(CharacteristicTraitDefinitionSchema,"http://example.com/schemas/characteristic.trait.definition.schema.json");
ajv.addSchema(VisualizationTraitDefinitionSchema,"http://example.com/schemas/visualization.trait.definition.schema.json");

const GameSchema = {
    type: "object",
    $id: "http://example.com/schemas/game.json",
    properties: {
        header: {
            $ref: "http://example.com/schemas/header.definition.json",
        },
        visualizations: {
            type: "array",
            minItems: 0,
            maxItems: visualizationMaxItems,
            items: { $ref: "http://example.com/schemas/visualization.trait.definition.json" },
        },
        characteristics: {
            type: "array",
            minItems: 0,
            maxItems: characteristicMaxItems,
            items: { $ref: "http://example.com/schemas/characteristic.trait.definition.json" },
        },
        behaviours: {
            type: "array",
            minItems: 0,
            maxItems: behaviourMaxItems,
            items: { $ref: "http://example.com/schemas/behaviour.trait.definition.json" },
        },
        triggers: {
            type: "array",
            minItems: 0,
            maxItems: triggersMaxItems,
            items: { $ref: "http://example.com/schemas/trigger.definition.json" },
        },
        effects: {
            type: "array",
            minItems: 0,
            maxItems: effectsMaxItems,
            items: { $ref: "http://example.com/schemas/effect.definition.json" },
        },
        conditions: {
            type: "array",
            minItems: 0,
            maxItems: conditionsMaxItems,
            items: { $ref: "http://example.com/schemas/condition.definition.json" },
        },
        events: {
            type: "array",
            minItems: 0,
            maxItems: eventMaxItems,
            items: { $ref: "http://example.com/schemas/event.definition.json" }
        },
    },
    required: ["header", "visualizations", "characteristics", "effects", "behaviours", "events"],
    additionalProperties: false,
};

// Compile the schema with custom validation
const CompiledGameSchema = ajv.compile(GameSchema);

console.log("Final Game Schema Definition:", JSON.stringify(GameSchema, null, 2));

// Export the schema and validation function
export { CompiledGameSchema, GameSchema };