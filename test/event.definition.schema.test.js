import { expect } from "chai";
import { CompiledEventDefinitionSchema } from "../src/event.definition.schema.js";

describe("Event Definition Schema Validation", function () {

  it("should validate a correct Event Definition object", function () {
    const validEventDefinition = {
      index: { value: 140 },
      extension: {
        name: "Valid Event Name",
        description: "This is a valid description within allowed length.",
        value: 100
      }
    };

    const isValid = CompiledEventDefinitionSchema(validEventDefinition);
    expect(isValid).to.be.true;
    expect(CompiledEventDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate when 'index' is out of range", function () {
    const invalidEventDefinition = {
      index: { value: 160 }, // Out of range for event index
      extension: {
        name: "Valid Event Name",
        description: "This is a valid description within allowed length.",
        value: 100
      }
    };

    const isValid = CompiledEventDefinitionSchema(invalidEventDefinition);
    expect(isValid).to.be.false;
    if (CompiledEventDefinitionSchema.errors) {
      console.error("Validation errors for 'index' out of range:", CompiledEventDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'extension.name' exceeds maximum length", function () {
    const invalidEventDefinition = {
      index: { value: 140 },
      extension: {
        name: "A".repeat(65), // Exceeds 64 character max length
        description: "A valid description.",
        value: 100
      }
    };

    const isValid = CompiledEventDefinitionSchema(invalidEventDefinition);
    expect(isValid).to.be.false;
    if (CompiledEventDefinitionSchema.errors) {
      console.error("Validation errors for 'extension.name' length:", CompiledEventDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'extension.description' exceeds maximum length", function () {
    const invalidEventDefinition = {
      index: { value: 140 },
      extension: {
        name: "Valid Event Name",
        description: "D".repeat(257), // Exceeds 256 character max length
        value: 100
      }
    };

    const isValid = CompiledEventDefinitionSchema(invalidEventDefinition);
    expect(isValid).to.be.false;
    if (CompiledEventDefinitionSchema.errors) {
      console.error("Validation errors for 'extension.description' length:", CompiledEventDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'extension.value' is out of range", function () {
    const invalidEventDefinition = {
      index: { value: 140 },
      extension: {
        name: "Valid Event Name",
        description: "A valid description.",
        value: 300 // Exceeds maximum of 255
      }
    };

    const isValid = CompiledEventDefinitionSchema(invalidEventDefinition);
    expect(isValid).to.be.false;
    if (CompiledEventDefinitionSchema.errors) {
      console.error("Validation errors for 'extension.value' out of range:", CompiledEventDefinitionSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidEventDefinition = {
      index: { value: 140 },
      extension: {
        name: "Valid Event Name",
        // Missing 'description'
        value: 100
      }
    };

    const isValid = CompiledEventDefinitionSchema(invalidEventDefinition);
    expect(isValid).to.be.false;
    if (CompiledEventDefinitionSchema.errors) {
      console.error("Validation errors for missing required property:", CompiledEventDefinitionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidEventDefinition = {
      index: { value: 140 },
      extension: {
        name: "Valid Event Name",
        description: "A valid description.",
        value: 100,
        extraProperty: "Not allowed" // Additional property not allowed
      }
    };

    const isValid = CompiledEventDefinitionSchema(invalidEventDefinition);
    expect(isValid).to.be.false;
    if (CompiledEventDefinitionSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledEventDefinitionSchema.errors);
    }
  });
});