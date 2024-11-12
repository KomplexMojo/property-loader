import { expect } from "chai";
import { CompiledTriggerHeaderSchema } from "../src/trigger.definition.schema.js";

describe("Trigger Definition Schema Validation", function () {
  
  it("should validate a correct Trigger Definition object", function () {
    const validTriggerDefinition = {
      index: { value: 170 }, // Assuming within the trigger index range
      extension: {
        name: "Valid Name",
        description: "A valid description that does not exceed the maximum length.",
        value: 100
      }
    };

    const isValid = CompiledTriggerHeaderSchema(validTriggerDefinition);
    expect(isValid).to.be.true;
    expect(CompiledTriggerHeaderSchema.errors).to.be.null;
  });

  it("should invalidate when 'index' is missing", function () {
    const invalidTriggerDefinition = {
      extension: {
        name: "Valid Name",
        description: "A valid description.",
        value: 100
      }
    };

    const isValid = CompiledTriggerHeaderSchema(invalidTriggerDefinition);
    expect(isValid).to.be.false;

    if (CompiledTriggerHeaderSchema.errors) {
      console.error("Validation errors for missing 'index':", CompiledTriggerHeaderSchema.errors);
    }
  });

  it("should invalidate when 'extension' is missing", function () {
    const invalidTriggerDefinition = {
      index: { value: 100 } // Valid index
    };

    const isValid = CompiledTriggerHeaderSchema(invalidTriggerDefinition);
    expect(isValid).to.be.false;

    if (CompiledTriggerHeaderSchema.errors) {
      console.error("Validation errors for missing 'extension':", CompiledTriggerHeaderSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidTriggerDefinition = {
      index: { value: 100 },
      extension: {
        name: "Valid Name",
        description: "A valid description.",
        value: 100
      },
      extraProperty: "Not allowed" // Additional property
    };

    const isValid = CompiledTriggerHeaderSchema(invalidTriggerDefinition);
    expect(isValid).to.be.false;

    if (CompiledTriggerHeaderSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledTriggerHeaderSchema.errors);
    }
  });

  it("should invalidate when 'index' is out of the valid range", function () {
    const invalidTriggerDefinition = {
      index: { value: 300 }, // Out of range for trigger index
      extension: {
        name: "Valid Name",
        description: "A valid description.",
        value: 100
      }
    };

    const isValid = CompiledTriggerHeaderSchema(invalidTriggerDefinition);
    expect(isValid).to.be.false;

    if (CompiledTriggerHeaderSchema.errors) {
      console.error("Validation errors for 'index' out of range:", CompiledTriggerHeaderSchema.errors);
    }
  });

  it("should invalidate when 'extension' properties are incorrect", function () {
    const invalidTriggerDefinition = {
      index: { value: 100 },
      extension: {
        name: "A".repeat(65), // Exceeds max length for name
        description: "D".repeat(257), // Exceeds max length for description
        value: 300 // Exceeds maximum allowed value
      }
    };

    const isValid = CompiledTriggerHeaderSchema(invalidTriggerDefinition);
    expect(isValid).to.be.false;

    if (CompiledTriggerHeaderSchema.errors) {
      console.error("Validation errors for 'extension' properties:", CompiledTriggerHeaderSchema.errors);
    }
  });
});