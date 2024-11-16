import { expect } from "chai";
import { CompiledGameSchema } from "../schemas/game.template.schema.js";
import IndexRangeRegistry from "../schemas/_indexregistry.js";

// Get the start and end values for visualizations from the IndexRangeRegistry
const { start: visualizationStart, end: visualizationEnd } = IndexRangeRegistry.visualizationRange;
const visualizationMaxItems = visualizationEnd - visualizationStart +1;

describe("Game Schema Validation", function () {

  it("should validate a correct Game object", function () {
    const validGameObject = {
      header: {
        name: "Game Header",
        description: "This is the game header description."
      },
      visualizations: [],
      characteristics: [],
      behaviours: [],
      triggers: [],
      effects: [],
      conditions: [],
      events: []
    };

    const isValid = CompiledGameSchema(validGameObject);
    expect(isValid).to.be.true;
    expect(CompiledGameSchema.errors).to.be.null;
  });

  it("should invalidate when 'header' is missing", function () {
    const invalidGameObject = {
      visualizations: [],
      characteristics: [],
      behaviours: [],
      triggers: [],
      effects: [],
      conditions: [],
      events: []
    };

    const isValid = CompiledGameSchema(invalidGameObject);
    expect(isValid).to.be.false;
    if (CompiledGameSchema.errors) {
      console.error("Validation errors for missing 'header':", CompiledGameSchema.errors);
    }
  });

  it("should invalidate when 'visualizations' exceeds the maximum allowed items", function () {
    const invalidGameObject = {
      header: {
        name: "Game Header",
        description: "This is the game header description."
      },
      visualizations: new Array(visualizationMaxItems + 1).fill({ index: 0 }),
      characteristics: [],
      behaviours: [],
      triggers: [],
      effects: [],
      conditions: [],
      events: []
    };

    const isValid = CompiledGameSchema(invalidGameObject);
    expect(isValid).to.be.false;
    if (CompiledGameSchema.errors) {
      console.error("Validation errors for exceeding max 'visualizations':", CompiledGameSchema.errors);
    }
  });

  it("should invalidate when an item in 'triggers' does not match the trigger definition schema", function () {
    const invalidGameObject = {
      header: {
        name: "Game Header",
        description: "This is the game header description."
      },
      visualizations: [],
      characteristics: [],
      behaviours: [],
      triggers: [{ invalidProperty: "Invalid Trigger" }],
      effects: [],
      conditions: [],
      events: []
    };

    const isValid = CompiledGameSchema(invalidGameObject);
    expect(isValid).to.be.false;
    if (CompiledGameSchema.errors) {
      console.error("Validation errors for invalid 'triggers' item:", CompiledGameSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidGameObject = {
      header: {
        name: "Game Header",
        description: "This is the game header description."
      },
      visualizations: [],
      characteristics: [],
      behaviours: [],
      triggers: [],
      effects: [],
      conditions: [],
      events: [],
      extraProperty: "Not allowed"
    };

    const isValid = CompiledGameSchema(invalidGameObject);
    expect(isValid).to.be.false;
    if (CompiledGameSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledGameSchema.errors);
    }
  });

  it("should invalidate when a required property is missing in an inner schema", function () {
    const invalidGameObject = {
      header: {
        name: "Game Header"
        // Missing 'description'
      },
      visualizations: [],
      characteristics: [],
      behaviours: [],
      triggers: [],
      effects: [],
      conditions: [],
      events: []
    };

    const isValid = CompiledGameSchema(invalidGameObject);
    expect(isValid).to.be.false;
    if (CompiledGameSchema.errors) {
      console.error("Validation errors for missing 'description' in 'header':", CompiledGameSchema.errors);
    }
  });
});