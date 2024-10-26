// schema.test.js

import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';
import assert from 'node:assert';
import gameSchema from '../schemas/schema.json' assert { type: 'json' };

describe('Dungeon Crawler Schema Validation', () => {
  let ajv;

  before(() => {
    // Initialize Ajv with options suitable for your schema
    ajv = new Ajv({
      strict: false, // Disable strict mode if needed
      allErrors: true,
      allowUnionTypes: true // To support multiple types in "type" keyword
    });

    // Add formats support (optional, if you use formats in your schema)
    addFormats(ajv);

    // Add custom keywords
    addKeywords(ajv, ['uniqueItemProperties']);

  });

  it('Schema should compile without errors', function () {
    assert.doesNotThrow(() => {
      ajv.compile(gameSchema);
    }, 'Schema failed to compile');
  });

  it('Generated data should conform to the schema', function () {
    // Generate data dynamically
    const data = generateTestData();

    const validate = ajv.compile(gameSchema);
    const valid = validate(data);
    if (!valid) {
      console.error('Validation errors:', validate.errors);
    }
    assert.strictEqual(valid, true, 'Generated data does not conform to the schema');
  });

  // Add more tests as needed to cover different aspects of your schema
});

// Function to generate test data conforming to the schema
function generateTestData() {
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

// Helper functions to generate each part of the data
function generateAppearance() {
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
    pixels: generatePixelsArray(),
  };

  return appearance;
}

function generatePixelsArray() {
  const pixels = [];
  let index = 0;

  // Generate 156 visual pixels (alpha > 0)
  for (let i = 0; i < 156; i++) {
    pixels.push({
      index: index++,
      r: 255,
      g: 255,
      b: 255,
      a: 255, // Alpha > 0
    });
  }

  // Generate 20 characteristic pixels
  const characteristicIndices = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
    50, 51, 52, 53, 54, 55, 56, 57, 58, 59]; // Example indices
  for (let i = 0; i < 20; i++) {
    pixels.push({
      index: index++,
      r: characteristicIndices[i], // r corresponds to the characteristic definition index
      g: 0,
      b: 0,
      a: 0, // Alpha = 0
    });
  }

  // Generate 20 behaviour pixels
  const behaviourIndices = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99,
    100, 101, 102, 103, 104, 105, 106, 107, 108, 109]; // Example indices
  for (let i = 0; i < 20; i++) {
    pixels.push({
      index: index++,
      r: behaviourIndices[i], // r corresponds to the behaviour definition index
      g: 0,
      b: 0,
      a: 0, // Alpha = 0
    });
  }

  // Generate 60 event pixels
  const eventIndices = [];
  for (let i = 140; i < 140 + 60; i++) {
    eventIndices.push(i);
  }
  for (let i = 0; i < 60; i++) {
    pixels.push({
      index: index++,
      r: eventIndices[i], // r corresponds to the event definition index
      g: 0,
      b: 0,
      a: 0, // Alpha = 0
    });
  }

  // Ensure we have exactly 256 pixels
  assert.strictEqual(pixels.length, 256, 'Pixels array must contain exactly 256 pixels');

  return pixels;
}

function generateCharacteristic() {
  return {
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
}

function generateBehaviour() {
  return {
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
}

function generateTrigger() {
  return {
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
}

function generateCondition() {
  return {
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
}

function generateEffect() {
  return {
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
}

function generateEvent() {
  return {
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
}