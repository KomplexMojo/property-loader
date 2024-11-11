import { expect } from "chai";
import { CompiledGameSchema } from "../src/game.schema.js"; // Adjust the path as needed

describe("GameSchema Validation", function () {
  it("should validate a correct Game object", function () {
    const validGameObject = {
      header: {
        index: 1,
        name: "Game Header",
        description: "Description for the game header.",
      },
      appearances: [
        {
          header: {
            index: 0,
            name: "Appearance Header",
            description: "Description for appearance.",
          },
          pixels: Array.from({ length: 256 }, (_, i) => ({
            index: i,
            R: Math.floor(Math.random() * 256),
            G: Math.floor(Math.random() * 256),
            B: Math.floor(Math.random() * 256),
            A: Math.floor(Math.random() * 256),
          })),
        },
      ],
      characteristics: [
        {
          header: {
            index: 2,
            name: "Characteristic Header",
            description: "Description for characteristic.",
          },
          defaults: [
            {
              index: 5,
              name: "DefaultProfile",
              value: 42,
            },
          ],
          properties: [
            {
              index: 10,
              name: "MaxHealth",
              value: 100,
              description: "Maximum health points.",
            },
          ],
        },
      ],
      behaviours: [
        {
          header: {
            index: 3,
            name: "Behaviour Header",
            description: "Description for behaviour.",
          },
          defaults: [
            {
              index: 6,
              name: "BehaviourProfileDefault",
              value: 50,
            },
          ],
          properties: [
            {
              index: 20,
              name: "Speed",
              value: 5,
              description: "Movement speed.",
            },
          ],
        },
      ],
      events: [
        {
          header: {
            index: 4,
            name: "Event Header",
            description: "Description for event.",
          },
          defaults: [
            {
              index: 7,
              name: "test",
              value: 100,
            },
          ],
          triggers: [
            {
              index: 8,
              value: 10,

            },
          ],
          effects: [
            {
              index: 9,
              value: 20,
            },
          ],
          conditions: [
            {
              index: 10,
              value: 1,
            },
          ],
        },
      ],
    };

    const isValid = CompiledGameSchema(validGameObject);
    if (!isValid) {
      console.error("Validation errors:", CompiledGameSchema.errors);
    }
    expect(isValid).to.be.true;
  });

  it("should invalidate a Game object with a missing header", function () {
    const invalidGameObject = {
      appearances: [],
      characteristics: [],
      behaviours: [],
      events: [],
    };

    const isValid = CompiledGameSchema(invalidGameObject);
    if (!isValid) {
      console.error("Validation errors:", CompiledGameSchema.errors);
    }
    expect(isValid).to.be.false;
  });

  it("should invalidate a Game object with additional properties", function () {
    const invalidGameObject = {
      header: {
        index: 1,
        name: "Game Header",
        description: "Description for the game header.",
      },
      extraProperty: "This should not be allowed",
    };

    const isValid = CompiledGameSchema(invalidGameObject);
    if (!isValid) {
      console.error("Validation errors:", CompiledGameSchema.errors);
    }
    expect(isValid).to.be.false;
  });

  it("should invalidate a Game object with too many appearances", function () {
    const invalidGameObject = {
      header: {
        index: 1,
        name: "Game Header",
        description: "Description for the game header.",
      },
      appearances: Array.from({ length: 41 }, () => ({
        header: {
          index: 0,
          name: "Appearance Header",
          description: "Description for appearance.",
        },
        pixels: Array.from({ length: 256 }, (_, i) => ({
          index: i,
          R: Math.floor(Math.random() * 256),
          G: Math.floor(Math.random() * 256),
          B: Math.floor(Math.random() * 256),
          A: Math.floor(Math.random() * 256),
        })),
      })),
    };

    const isValid = CompiledGameSchema(invalidGameObject);
    if (!isValid) {
      console.error("Validation errors:", CompiledGameSchema.errors);
    }
    expect(isValid).to.be.false;
  });

  it("should invalidate a Game object with too many characteristics", function () {
    const invalidGameObject = {
      header: {
        index: 1,
        name: "Game Header",
        description: "Description for the game header.",
      },
      characteristics: Array.from({ length: 51 }, () => ({
        header: {
          index: 2,
          name: "Characteristic Header",
          description: "Description for characteristic.",
        },
        properties: [
          {
            index: 10,
            name: "MaxHealth",
            value: 100,
            description: "Maximum health points.",
          },
        ],
      })),
    };

    const isValid = CompiledGameSchema(invalidGameObject);
    if (!isValid) {
      console.error("Validation errors:", CompiledGameSchema.errors);
    }
    expect(isValid).to.be.false;
  });

  it("should invalidate a Game object with too many behaviours", function () {
    const invalidGameObject = {
      header: {
        index: 1,
        name: "Game Header",
        description: "Description for the game header.",
      },
      behaviours: Array.from({ length: 51 }, () => ({
        header: {
          index: 3,
          name: "Behaviour Header",
          description: "Description for behaviour.",
        },
        properties: [
          {
            index: 20,
            name: "Speed",
            value: 5,
            description: "Movement speed.",
          },
        ],
      })),
    };

    const isValid = CompiledGameSchema(invalidGameObject);
    if (!isValid) {
      console.error("Validation errors:", CompiledGameSchema.errors);
    }
    expect(isValid).to.be.false;
  });

  it("should invalidate a Game object with too many events", function () {
    const invalidGameObject = {
      header: {
        index: 1,
        name: "Game Header",
        description: "Description for the game header.",
      },
      events: Array.from({ length: 21 }, () => ({
        header: {
          index: 4,
          name: "Event Header",
          description: "Description for event.",
        },
        defaults: [],
        triggers: [
          {
            index: 6,
            name: "Trigger1",
            value: 10,
            description: "Trigger description.",
          },
        ],
        effects: [
          {
            index: 7,
            name: "Effect1",
            value: 20,
            description: "Effect description.",
          },
        ],
        conditions: [
          {
            index: 8,
            name: "Condition1",
            value: 1,
            description: "Condition description.",
          },
        ],
      })),
    };

    const isValid = CompiledGameSchema(invalidGameObject);
    if (!isValid) {
      console.error("Validation errors:", CompiledGameSchema.errors);
    }
    expect(isValid).to.be.false;
  });
});