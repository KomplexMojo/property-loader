import { expect } from "chai";
import { CompiledEffectDefinitionSchema } from "../schemas/effect.definition.schema.js";

describe("Effect Header Schema Validation", function () {

  it("should validate a correct Effect Header object", function () {
    const validEffectHeader = {
      index: { value: 192 }, // Valid effect index within range
      extension: {
        subindex: 0,
        name: "Valid Effect Name",
        description: "A valid description for the effect."
      }
    };

    const isValid = CompiledEffectDefinitionSchema(validEffectHeader);
    expect(isValid).to.be.true;
    expect(CompiledEffectDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate when 'index' is out of range", function () {
    const invalidEffectHeader = {
      index: { value: 224 }, // Out of range for effect index
      extension: {
        subindex:100,
        name: "Valid Effect Name",
        description: "A valid description."
      }
    };

    const isValid = CompiledEffectDefinitionSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectDefinitionSchema.errors) {
      console.error("Validation errors for 'index' out of range:", CompiledEffectDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'extension.name' exceeds max length", function () {
    const invalidEffectHeader = {
      index: { value: 192 },
      extension: {
        subindex: 100,
        name: "A".repeat(65), // Exceeds 64 character limit
        description: "A valid description."
      }
    };

    const isValid = CompiledEffectDefinitionSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectDefinitionSchema.errors) {
      console.error("Validation errors for 'name' exceeding max length:", CompiledEffectDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'extension.description' exceeds max length", function () {
    const invalidEffectHeader = {
      index: { value: 192 },
      extension: {
        subindex: 100,
        name: "Valid Effect Name",
        description: "D".repeat(257) // Exceeds 256 character limit
      }
    };

    const isValid = CompiledEffectDefinitionSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectDefinitionSchema.errors) {
      console.error("Validation errors for 'description' exceeding max length:", CompiledEffectDefinitionSchema.errors);
    }
  });

  it("should invalidate when 'extension.value' is out of valid range", function () {
    const invalidEffectHeader = {
      index: { value: 192 },
      extension: {
        subindex: 300,
        name: "Valid Effect Name",
        description: "A valid description."
      }
    };

    const isValid = CompiledEffectDefinitionSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectDefinitionSchema.errors) {
      console.error("Validation errors for 'value' out of range:", CompiledEffectDefinitionSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidEffectHeader = {
      index: { value: 192 },
      // Missing 'extension'
    };

    const isValid = CompiledEffectDefinitionSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectDefinitionSchema.errors) {
      console.error("Validation errors for missing required 'extension' property:", CompiledEffectDefinitionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidEffectHeader = {
      index: { value: 192 },
      extension: {
        subindex: 0,
        name: "Valid Effect Name",
        description: "A valid description.",
      },
      extraProperty: "Not allowed" // Additional property not allowed
    };

    const isValid = CompiledEffectDefinitionSchema(invalidEffectHeader);
    expect(isValid).to.be.false;
    if (CompiledEffectDefinitionSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledEffectDefinitionSchema.errors);
    }
  });
});