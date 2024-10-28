import { strict as assert } from 'node:assert';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export let definedGameSchema = JSON.parse(definedSchema());

function definedSchema() {
    const schemaPath = join(__dirname, '../../schemas/schema.json');
    const schemaContent = readFileSync(schemaPath, 'utf-8');
    return schemaContent;
}

export let generatedStaticGameData = generateStaticTestData();

function generateStaticTestData() {
    const data = {
        appearances: [generateAppearance()],
        characteristics: [generateCharacteristic()],
        behaviours: [generateBehaviour()],
        triggers: [generateTrigger()],
        conditions: [generateCondition()],
        effects: [generateEffect()],
        events: [generateEvent()],
    };
    return data;
}

export let generatedDynamicGameData = generateDynamicTestData({ visual:156, characteristic:20, behaviour:20, event:60 });

function generateDynamicTestData({ visual, characteristic, behaviour, event }) {
    const data = {
        appearances: [generateDynamicAppearance({ visual, characteristic, behaviour, event })],
        characteristics: [generateCharacteristic()],
        behaviours: [generateBehaviour()],
        triggers: [generateTrigger()],
        conditions: [generateCondition()],
        effects: [generateEffect()],
        events: [generateEvent()],
    };
    return data;
}

// Helper functions to generate each part of the data
export function generateAppearance() {
    const appearance = {
        index: 0,
        name: 'Test Appearance',
        description: 'This is a test appearance.',
        defaults: {
            required: true,
            growth: 'fixed',
        },
        properties: [
            {
                value: 1,
                name: 'Property1',
                description: 'Description of Property1',
            }
        ],
        pixels: generatePixelsArray(),
    };
    console.log(JSON.stringify(appearance, null, 2));
    return appearance;
}

// Helper functions to generate each part of the data
export function generateDynamicAppearance({ visual, characteristic, behaviour, event }) {
    const appearance = {
        index: 0,
        name: 'Test Appearance',
        description: 'This is a test appearance.',
        defaults: {
            required: true,
            growth: 'fixed',
        },
        properties: [
            {
                value: 1,
                name: 'Property1',
                description: 'Description of Property1',
            },
        ],
        pixels: generateDynamicPixelsArray({ visual, characteristic, behaviour, event }),
    };
    //console.log("Generated Appearance:", JSON.stringify(appearance, null, 2));
    return appearance;
}

export function generatePixelsArray() {
    const pixels = [];
    let index = 0;

    // Generate 156 visual pixels
    for (let i = 0; i < 156; i++) {
        pixels.push({ index: index++, r: 255, g: 255, b: 255, a: 255 });
    }

    // Generate 20 characteristic pixels
    const characteristicIndices = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
    for (let i = 0; i < 20; i++) {
        pixels.push({ index: index++, r: characteristicIndices[i], g: 0, b: 0, a: 0 });
    }

    // Generate 20 behaviour pixels
    const behaviourIndices = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109];
    for (let i = 0; i < 20; i++) {
        pixels.push({ index: index++, r: behaviourIndices[i], g: 0, b: 0, a: 0 });
    }

    // Generate 60 event pixels
    for (let i = 140; i < 140 + 60; i++) {
        pixels.push({ index: index++, r: i, g: 0, b: 0, a: 0 });
    }

    console.log(JSON.stringify(pixels, null, 2));
    assert.strictEqual(pixels.length, 256, 'Pixels array must contain exactly 256 pixels');
    return pixels;
}

export function generateDynamicPixelsArray({ visual, characteristic, behaviour, event }) {
    const pixels = [];
    let index = 0;

    // Generate visual pixels
    for (let i = 0; i < visual; i++) {
        pixels.push({
            index: index++,
            r: 255,
            g: 255,
            b: 255,
            a: 255, // Visual pixels have alpha > 0
        });
    }

    // Generate characteristic pixels
    const characteristicIndices = Array.from({ length: characteristic }, (_, i) => 40 + i);
    for (let i = 0; i < characteristic; i++) {
        pixels.push({
            index: index++,
            r: characteristicIndices[i], // Set to characteristic range
            g: 0,
            b: 0,
            a: 0, // Data pixels have alpha = 0
        });
    }

    // Generate behaviour pixels
    const behaviourIndices = Array.from({ length: behaviour }, (_, i) => 90 + i);
    for (let i = 0; i < behaviour; i++) {
        pixels.push({
            index: index++,
            r: behaviourIndices[i], // Set to behaviour range
            g: 0,
            b: 0,
            a: 0,
        });
    }

    // Generate event pixels
    const eventIndices = Array.from({ length: event }, (_, i) => 140 + i);
    for (let i = 0; i < event; i++) {
        pixels.push({
            index: index++,
            r: eventIndices[i], // Set to event range
            g: 0,
            b: 0,
            a: 0,
        });
    }

    // Ensure array has exactly 256 pixels
    if (pixels.length !== 256) {
        throw new Error('Pixels array must contain exactly 256 pixels');
    }

    return pixels;
}

export function generateCharacteristic() {
    const characteristic = {
        index: 40,
        name: 'Health',
        description: 'Represents the health of an entity.',
        defaults: {
            required: true,
            growth: 'variable',
        },
        properties: [
            {
                value: 100,
                name: 'MaxHealth',
                description: 'Maximum health value.',
            },
        ],
    };
    //console.log("Generated Characteristic:", JSON.stringify(characteristic, null, 2));
    return characteristic;
}

export function generateBehaviour() {
    const behaviour = {
        index: 90,
        name: 'Aggressive',
        description: 'An aggressive behaviour.',
        defaults: {
            required: true,
            growth: 'fixed',
        },
        properties: [
            {
                value: 10,
                name: 'AttackPower',
                description: 'Power of attack.',
            },
        ],
    };
    //console.log("Generated Behaviour:", JSON.stringify(behaviour, null, 2));
    return behaviour;
}

export function generateTrigger() {
    const trigger = {
        index: 190,
        name: 'OnDamage',
        description: 'Triggered when damage is taken.',
        defaults: {
            required: false,
            growth: 'variable',
        },
        properties: [
            {
                value: 0,
                name: 'DamageThreshold',
                description: 'Threshold of damage to trigger.',
            },
        ],
    };
    //console.log("Generated Trigger:", JSON.stringify(trigger, null, 2));
    return trigger;
}

export function generateCondition() {
    const condition = {
        index: 230,
        name: 'IsLowHealth',
        description: 'Checks if health is low.',
        defaults: {
            required: false,
            growth: 'variable',
        },
        properties: [
            {
                value: 30,
                name: 'HealthPercentage',
                description: 'Health percentage to consider as low.',
            },
        ],
    };
    //console.log("Generated Condition:", JSON.stringify(condition, null, 2));
    return condition;
}

export function generateEffect() {
    const effect = {
        index: 210,
        name: 'Heal',
        description: 'Heals the entity.',
        defaults: {
            required: false,
            growth: 'variable',
        },
        properties: [
            {
                value: 20,
                name: 'HealAmount',
                description: 'Amount to heal.',
            },
        ],
    };
    //console.log("Generated Effect:", JSON.stringify(effect, null, 2));
    return effect;
}

export function generateEvent() {
    const event = {
        index: 140,
        name: 'LowHealthEvent',
        description: 'Event when health is low.',
        defaults: {
            required: false,
            growth: 'variable',
        },
        triggers: [
            {
                index: 190, // Trigger index
                propertyIndex: 0,
                value: 1,
            },
        ],
        conditions: [
            {
                index: 230, // Condition index
                propertyIndex: 0,
                value: 1,
            },
        ],
        effects: [
            {
                index: 210, // Effect index
                propertyIndex: 0,
                value: 1,
            },
        ],
        appliesTo: [
            {
                index: 40, // Characteristic index
                propertyIndex: 0,
                value: 1,
            },
        ],
    };
    //console.log("Generated Event:", JSON.stringify(event, null, 2));
    return event;
}