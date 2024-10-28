// validate-schema.js

import Ajv from 'ajv';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse schema.json
const schemaPath = join(__dirname, 'schemas/schema.json');
const schemaContent = readFileSync(schemaPath, 'utf-8');
const gameSchema = JSON.parse(schemaContent);

// Initialize Ajv
const ajv = new Ajv({code: {esm: true},strict: true})

const schema = {
  "type": "object",
  "properties": {
    "appearances": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/appearance"
      }
    },
    "characteristics": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/characteristic"
      }
    },
    "behaviours": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/behaviour"
      }
    },
    "triggers": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/trigger"
      }
    },
    "conditions": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/condition"
      }
    },
    "effects": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/effect"
      }
    },
    "events": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/event"
      }
    }
  },
  "required": [
    "appearances",
    "characteristics",
    "behaviours",
    "triggers",
    "conditions",
    "effects",
    "events"
  ],
  "definitions": {
    "defaults": {
      "type": "object",
      "properties": {
        "required": {
          "type": "boolean"
        },
        "growth": {
          "type": "string",
          "enum": [
            "fixed",
            "variable"
          ]
        }
      },
      "required": [
        "required",
        "growth"
      ]
    },
    "property": {
      "type": "object",
      "properties": {
        "value": {
          "type": "integer",
          "maximum": 255
        },
        "name": {
          "type": "string",
          "maxLength": 128
        },
        "description": {
          "type": "string",
          "maxLength": 512
        }
      },
      "required": [
        "value",
        "name",
        "description"
      ]
    },
    "parameterValue": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "maximum": 255
        },
        "propertyIndex": {
          "type": "integer",
          "maximum": 255
        },
        "value": {
          "type": "integer",
          "maximum": 255
        }
      },
      "required": [
        "index",
        "propertyIndex",
        "value"
      ]
    },
    "pixel": {
      "type": "object",
      "properties": {
        "a": {
          "type": "integer"
        }
      },
      "required": [
        "a"
      ],
      "allOf": [
        {
          "if": {
            "properties": {
              "a": {
                "const": 0
              }
            }
          },
          "then": {
            "$ref": "#/definitions/dataPixel"
          },
          "else": {
            "$ref": "#/definitions/visualPixel"
          }
        }
      ]
    },
    "dataPixel": {
      "type": "object",
      "properties": {
        "a": {
          "const": 0
        },
        "r": {
          "type": "integer"
        }
      },
      "required": [
        "a",
        "r"
      ],
      "oneOf": [
        {
          "$ref": "#/definitions/characteristicPixel"
        },
        {
          "$ref": "#/definitions/behaviourPixel"
        },
        {
          "$ref": "#/definitions/eventPixel"
        }
      ]
    },
    "visualPixel": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255
        },
        "r": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255,
          "default": 255
        },
        "g": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255,
          "default": 255
        },
        "b": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255,
          "default": 255
        },
        "a": {
          "type": "integer",
          "minimum": 1,
          "maximum": 255,
          "default": 255
        }
      },
      "required": [
        "index",
        "r",
        "g",
        "b",
        "a"
      ]
    },
    "characteristicPixel": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255
        },
        "r": {
          "type": "integer",
          "minimum": 40,
          "maximum": 89
        },
        "g": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255
        },
        "b": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255
        },
        "a": {
          "type": "integer",
          "const": 0
        }
      },
      "required": [
        "index",
        "r",
        "g",
        "b",
        "a"
      ]
    },
    "behaviourPixel": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255
        },
        "r": {
          "type": "integer",
          "minimum": 90,
          "maximum": 139
        },
        "g": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255
        },
        "b": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255
        },
        "a": {
          "type": "integer",
          "const": 0
        }
      },
      "required": [
        "index",
        "r",
        "g",
        "b",
        "a"
      ]
    },
    "eventPixel": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255
        },
        "r": {
          "type": "integer",
          "minimum": 140,
          "maximum": 255
        },
        "g": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255
        },
        "b": {
          "type": "integer",
          "minimum": 0,
          "maximum": 255
        },
        "a": {
          "type": "integer",
          "const": 0
        }
      },
      "required": [
        "index",
        "r",
        "g",
        "b",
        "a"
      ]
    },
    "appearance": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "minimum": 0,
          "maximum": 39
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "defaults": {
          "$ref": "#/definitions/defaults"
        },
        "properties": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/property"
          }
        },
        "pixels": {
          "type": "array",
          "contains": {"type: integer"},
          "uniqueItems": true,
          "items": {
            "$ref": "#/definitions/pixel"
          },
          "minItems": 256,
          "maxItems": 256,
          "allOf": [
            {
              "contains": {
                "$ref": "#/definitions/visualPixel"
              },
              "minContains": 156,
              "maxContains": 156
            },
            {
              "contains": {
                "$ref": "#/definitions/characteristicPixel"
              },
              "minContains": 20,
              "maxContains": 20
            },
            {
              "contains": {
                "$ref": "#/definitions/behaviourPixel"
              },
              "minContains": 20,
              "maxContains": 20
            },
            {
              "contains": {
                "$ref": "#/definitions/eventPixel"
              },
              "minContains": 60,
              "maxContains": 60
            }
          ]
        }
      },
      "required": [
        "index",
        "name",
        "description",
        "defaults",
        "properties",
        "pixels"
      ]
    },
    "characteristic": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "minimum": 40,
          "maximum": 89
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "defaults": {
          "$ref": "#/definitions/defaults"
        },
        "properties": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/property"
          }
        }
      },
      "required": [
        "index",
        "name",
        "description",
        "defaults",
        "properties"
      ]
    },
    "behaviour": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "minimum": 90,
          "maximum": 139
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "defaults": {
          "$ref": "#/definitions/defaults"
        },
        "properties": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/property"
          }
        }
      },
      "required": [
        "index",
        "name",
        "description",
        "defaults",
        "properties"
      ]
    },
    "trigger": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "minimum": 190,
          "maximum": 209
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "defaults": {
          "$ref": "#/definitions/defaults"
        },
        "properties": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/property"
          }
        }
      },
      "required": [
        "index",
        "name",
        "description",
        "defaults",
        "properties"
      ]
    },
    "condition": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "minimum": 230,
          "maximum": 255
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "defaults": {
          "$ref": "#/definitions/defaults"
        },
        "properties": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/property"
          }
        }
      },
      "required": [
        "index",
        "name",
        "description",
        "defaults",
        "properties"
      ]
    },
    "effect": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "minimum": 210,
          "maximum": 229
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "defaults": {
          "$ref": "#/definitions/defaults"
        },
        "properties": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/property"
          }
        }
      },
      "required": [
        "index",
        "name",
        "description",
        "defaults",
        "properties"
      ]
    },
    "event": {
      "type": "object",
      "properties": {
        "index": {
          "type": "integer",
          "minimum": 140,
          "maximum": 169
        },
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "defaults": {
          "$ref": "#/definitions/defaults"
        },
        "triggers": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/parameterValue"
          },
          "uniqueItems": true
        },
        "conditions": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/parameterValue"
          },
          "uniqueItems": true
        },
        "effects": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/parameterValue"
          },
          "uniqueItems": true
        },
        "appliesTo": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/parameterValue"
          },
          "uniqueItems": true
        }
      },
      "required": [
        "index",
        "name",
        "description",
        "defaults",
        "triggers",
        "conditions",
        "effects",
        "appliesTo"
      ]
    }
  }
}

const validate = ajv.compile(schema);

const data = generateTestData();

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
  //assert.strictEqual(pixels.length, 256, 'Pixels array must contain exactly 256 pixels');

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

const valid = validate(data)
if (!valid) console.log(validate.errors);

console.log("out");