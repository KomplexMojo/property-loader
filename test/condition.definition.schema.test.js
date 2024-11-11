import { expect } from "chai";
import { CompiledConditionDefinition } from "../src/condition.definition.schema.js";

describe("Condition Definition Schema Validation", function () {
  
  it("should validate a correct Condition Definition object", function () {
    const validConditionDefinition = {
      index: { index: 224 }, // Valid index within condition range
      extension: {
        name: "Valid Condition Name",
        description: "A valid description within length limit.",
        value: 150
      }
    };

    const isValid = CompiledConditionDefinition(validConditionDefinition);
    expect(isValid).to.be.true;
    expect(CompiledConditionDefinition.errors).to.be.null;
  });

  it("should invalidate when the condition index is out of range", function () {
    const invalidConditionDefinition = {
      index: { index: 300 }, // Out of range for condition index
      extension: {
        name: "Valid Condition Name",
        description: "A valid description within length limit.",
        value: 150
      }
    };

    const isValid = CompiledConditionDefinition(invalidConditionDefinition);
    expect(isValid).to.be.false;
    if (CompiledConditionDefinition.errors) {
      console.error("Validation errors for out-of-range index:", CompiledConditionDefinition.errors);
    }
  });

  it("should invalidate when the extension name exceeds maximum length", function () {
    const invalidConditionDefinition = {
      index: { index: 224 },
      extension: {
        name: "A".repeat(65), // Exceeds 64 character max length
        description: "A valid description.",
        value: 150
      }
    };

    const isValid = CompiledConditionDefinition(invalidConditionDefinition);
    expect(isValid).to.be.false;
    if (CompiledConditionDefinition.errors) {
      console.error("Validation errors for name exceeding max length:", CompiledConditionDefinition.errors);
    }
  });

  it("should invalidate when the extension description exceeds maximum length", function () {
    const invalidConditionDefinition = {
      index: { index: 224 },
      extension: {
        name: "Valid Condition Name",
        description: "D".repeat(257), // Exceeds 256 character max length
        value: 150
      }
    };

    const isValid = CompiledConditionDefinition(invalidConditionDefinition);
    expect(isValid).to.be.false;
    if (CompiledConditionDefinition.errors) {
      console.error("Validation errors for description exceeding max length:", CompiledConditionDefinition.errors);
    }
  });

  it("should invalidate when the extension value is out of valid range", function () {
    const invalidConditionDefinition = {
      index: { index: 224 },
      extension: {
        name: "Valid Condition Name",
        description: "A valid description.",
        value: 300 // Exceeds maximum of 255
      }
    };

    const isValid = CompiledConditionDefinition(invalidConditionDefinition);
    expect(isValid).to.be.false;
    if (CompiledConditionDefinition.errors) {
      console.error("Validation errors for value out of range:", CompiledConditionDefinition.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidConditionDefinition = {
      index: { index: 224 },
      extension: {
        name: "Valid Condition Name",
        // Missing 'description' property
        value: 150
      }
    };

    const isValid = CompiledConditionDefinition(invalidConditionDefinition);
    expect(isValid).to.be.false;
    if (CompiledConditionDefinition.errors) {
      console.error("Validation errors for missing required property:", CompiledConditionDefinition.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidConditionDefinition = {
      index: { index: 224 },
      extension: {
        name: "Valid Condition Name",
        description: "A valid description.",
        value: 150,
        extraProperty: "Not allowed" // Additional property not allowed
      }
    };

    const isValid = CompiledConditionDefinition(invalidConditionDefinition);
    expect(isValid).to.be.false;
    if (CompiledConditionDefinition.errors) {
      console.error("Validation errors for additional properties:", CompiledConditionDefinition.errors);
    }
  });

  it("should invalidate when the 'index' property is missing", function () {
    const invalidConditionDefinition = {
      // Missing 'index' property
      extension: {
        name: "Valid Condition Name",
        description: "A valid description.",
        value: 150
      }
    };

    const isValid = CompiledConditionDefinition(invalidConditionDefinition);
    expect(isValid).to.be.false;
    if (CompiledConditionDefinition.errors) {
      console.error("Validation errors for missing 'index' property:", CompiledConditionDefinition.errors);
    }
  });

  it("should invalidate when the 'extension' property is missing", function () {
    const invalidConditionDefinition = {
      index: { index: 224 }
      // Missing 'extension' property
    };

    const isValid = CompiledConditionDefinition(invalidConditionDefinition);
    expect(isValid).to.be.false;
    if (CompiledConditionDefinition.errors) {
      console.error("Validation errors for missing 'extension' property:", CompiledConditionDefinition.errors);
    }
  });
});