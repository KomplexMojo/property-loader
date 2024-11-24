import { expect } from "chai";
import { CompiledTriggerHeaderSchema } from "../schemas/trigger.definition.schema.js";

describe("Trigger Definition Schema Validation", function () {
  
  it("should validate a correct Trigger Definition object", function () {
    const validTriggerDefinition = {
      index: { value: 170 }, // Assuming within the trigger index range
      extension: {
        subindex: {value: 100},
        name: "Valid Name",
        description: "A valid description that does not exceed the maximum length."
      }
    };

    const isValid = CompiledTriggerHeaderSchema(validTriggerDefinition);
    expect(isValid).to.be.true;
    expect(CompiledTriggerHeaderSchema.errors).to.be.null;
  });

  it("should invalidate when 'index' is missing", function () {
    const invalidTriggerDefinition = {
      extension: {
        subindex: 100,
        name: "Valid Name",
        description: "A valid description."
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
        subindex: 100,
        name: "Valid Name",
        description: "A valid description."
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
        subindex: 100,
        name: "Valid Name",
        description: "A valid description."
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
        subindex: 100,
        name: "A".repeat(65), // Exceeds max length for name
        description: "D".repeat(257) // Exceeds max length for description
      }
    };

    const isValid = CompiledTriggerHeaderSchema(invalidTriggerDefinition);
    expect(isValid).to.be.false;

    if (CompiledTriggerHeaderSchema.errors) {
      console.error("Validation errors for 'extension' properties:", CompiledTriggerHeaderSchema.errors);
    }
  });
});