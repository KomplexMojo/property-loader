import { expect } from "chai";
import { CompiledEffectHeaderSchema } from "../src/effect.definition.schema.js";

describe("Effect Header Schema Validation", function () {

  it("should validate a correct Effect Header object", function () {
    const validEffectHeader = {
      index: { value: 192 }, // Valid effect index within range
      extension: {
        name: "Valid Effect Name",
        description: "A valid description for the effect.",
        value: 100
      }
    };

    const isValid = CompiledEffectHeaderSchema(validEffectHeader);
    expect(isValid).to.be.true;
    expect(CompiledEffectHeaderSchema.errors).to.be.null;
  });

  it("should invalidate when 'index' is out of range", function () {
    const invalidEffectHeader = {
      index: { value: 224 }, // Out of range for effect index
      extension: {
        name: "Valid Effect Name",
        description: "A valid description.",
        value: 100
      }
    };

    const isValid = CompiledEffectHeaderSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectHeaderSchema.errors) {
      console.error("Validation errors for 'index' out of range:", CompiledEffectHeaderSchema.errors);
    }
  });

  it("should invalidate when 'extension.name' exceeds max length", function () {
    const invalidEffectHeader = {
      index: { value: 192 },
      extension: {
        name: "A".repeat(65), // Exceeds 64 character limit
        description: "A valid description.",
        value: 100
      }
    };

    const isValid = CompiledEffectHeaderSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectHeaderSchema.errors) {
      console.error("Validation errors for 'name' exceeding max length:", CompiledEffectHeaderSchema.errors);
    }
  });

  it("should invalidate when 'extension.description' exceeds max length", function () {
    const invalidEffectHeader = {
      index: { value: 192 },
      extension: {
        name: "Valid Effect Name",
        description: "D".repeat(257), // Exceeds 256 character limit
        value: 100
      }
    };

    const isValid = CompiledEffectHeaderSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectHeaderSchema.errors) {
      console.error("Validation errors for 'description' exceeding max length:", CompiledEffectHeaderSchema.errors);
    }
  });

  it("should invalidate when 'extension.value' is out of valid range", function () {
    const invalidEffectHeader = {
      index: { value: 192 },
      extension: {
        name: "Valid Effect Name",
        description: "A valid description.",
        value: 300 // Out of range for value (0-255)
      }
    };

    const isValid = CompiledEffectHeaderSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectHeaderSchema.errors) {
      console.error("Validation errors for 'value' out of range:", CompiledEffectHeaderSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidEffectHeader = {
      index: { value: 192 },
      // Missing 'extension'
    };

    const isValid = CompiledEffectHeaderSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectHeaderSchema.errors) {
      console.error("Validation errors for missing required 'extension' property:", CompiledEffectHeaderSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidEffectHeader = {
      index: { value: 192 },
      extension: {
        name: "Valid Effect Name",
        description: "A valid description.",
        value: 100
      },
      extraProperty: "Not allowed" // Additional property not allowed
    };

    const isValid = CompiledEffectHeaderSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectHeaderSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledEffectHeaderSchema.errors);
    }
  });
});