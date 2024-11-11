import { expect } from "chai";
import { CompiledEventManagerSchema } from "../src/eventmanagement.schema.js"; // Adjust the path as necessary

// Test suite for EventManagerSchema
describe("EventManagerSchema Validation", function () {
  it("should validate a correct EventManager object", function () {
    const validEventManager = {
      header: {
        index: 1,
        name: "Event Header",
        description: "Description of the event header.",
      },
      defaults: [
        {
          index: 1,
          name: "DefaultProfile1",
          value: 10
        },
      ],
      triggers: [
        {
          index: 0,
          value: 42
        },
      ],
      effects: [
        {
          index: 1,
          value: 10
        },
      ],
      conditions: [
        {
          index: 2,
          value: 12,
        },
      ],
    };

    const isValid = CompiledEventManagerSchema(validEventManager);
    expect(isValid).to.be.true;
    expect(CompiledEventManagerSchema.errors).to.be.null;
    if (!isValid) {
      console.error("Validation errors for event manager object:", CompiledEventManagerSchema.errors);
    }
  });

  it("should invalidate an EventManager object with missing header", function () {
    const invalidEventManager = {
      defaults: [],
      triggers: [
        {
          index: 0,
          name: "Trigger1",
          value: 42,
          description: "Description for Trigger1",
        },
      ],
      effects: [
        {
          index: 1,
          name: "Effect1",
          value: 10,
          description: "Description for Effect1",
        },
      ],
      conditions: [
        {
          index: 2,
          name: "Condition1",
          value: true,
          description: "Description for Condition1",
        },
      ],
    };

    const isValid = CompiledEventManagerSchema(invalidEventManager);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for missing header:", CompiledEventManagerSchema.errors);
    }
  });

  it("should invalidate an EventManager object with too many defaults", function () {
    const invalidEventManager = {
      header: {
        index: 1,
        name: "Event Header",
        description: "Description of the event header.",
      },
      defaults: Array.from({ length: 11 }, (_, i) => ({
        index: i,
        name: `DefaultProfile${i}`,
        value: 10,
        description: `Profile default description ${i}.`,
      })), // 11 items, exceeding maxItems of 10
      triggers: [
        {
          index: 0,
          value: 42,
        },
      ],
      effects: [
        {
          index: 1,
          value: 10,
        },
      ],
      conditions: [
        {
          index: 2,
          value: true,
        },
      ],
    };

    const isValid = CompiledEventManagerSchema(invalidEventManager);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for too many defaults:", CompiledEventManagerSchema.errors);
    }
  });

  it("should invalidate an EventManager object with too few triggers", function () {
    const invalidEventManager = {
      header: {
        index: 1,
        name: "Event Header",
        description: "Description of the event header.",
      },
      defaults: [],
      triggers: [], // No triggers, minItems of 1 required
      effects: [
        {
          index: 1,
          value: 10,
        },
      ],
      conditions: [
        {
          index: 2,
          value: true,
        },
      ],
    };

    const isValid = CompiledEventManagerSchema(invalidEventManager);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for too few triggers:", CompiledEventManagerSchema.errors);
    }
  });

  it("should invalidate an EventManager object with too many effects", function () {
    const invalidEventManager = {
      header: {
        index: 1,
        name: "Event Header",
        description: "Description of the event header.",
      },
      defaults: [],
      triggers: [
        {
          index: 0,
          value: 42,
        },
      ],
      effects: Array.from({ length: 33 }, (_, i) => ({
        index: i,
        value: 10,
      })), // 33 items, exceeding maxItems of 32
      conditions: [
        {
          index: 2,
          value: true,
        },
      ],
    };

    const isValid = CompiledEventManagerSchema(invalidEventManager);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for too many effects:", CompiledEventManagerSchema.errors);
    }
  });

  it("should invalidate an EventManager object with additional properties", function () {
    const invalidEventManager = {
      header: {
        index: 1,
        name: "Event Header",
        description: "Description of the event header.",
      },
      defaults: [],
      triggers: [
        {
          index: 0,
          value: 42,
        },
      ],
      effects: [
        {
          index: 1,
          value: 10,
        },
      ],
      conditions: [
        {
          index: 2,
          value: true,
        },
      ],
      extraProperty: "This should not be allowed", // Additional property not allowed
    };

    const isValid = CompiledEventManagerSchema(invalidEventManager);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for additional properties:", CompiledEventManagerSchema.errors);
    }
  });
});