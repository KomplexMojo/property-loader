import { expect } from "chai";
import { CompiledAppearanceDefinitionSchema } from "../src/appearance.definition.schema.js";

describe("Appearance Definition Schema Validation", function () {
  
  it("should validate a correct Appearance Definition object", function () {
    const validAppearanceDefinition = {
      index: { index: 0 },
      extension: {
        name: "Valid Name",
        description: "A valid description that does not exceed the maximum length.",
        value: 100
      }
    };

    const isValid = CompiledAppearanceDefinitionSchema(validAppearanceDefinition);
    expect(isValid).to.be.true;
    expect(CompiledAppearanceDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate when index is out of range", function () {
    const invalidAppearanceDefinition = {
      index: { index: 40 }, // Out of range for appearance index
      extension: {
        name: "Valid Name",
        description: "A valid description that does not exceed the maximum length.",
        value: 100
      }
    };

    const isValid = CompiledAppearanceDefinitionSchema(invalidAppearanceDefinition);
    expect(isValid).to.be.false;
    if (CompiledAppearanceDefinitionSchema.errors) {
      console.error("Validation errors for out-of-range index:", CompiledAppearanceDefinitionSchema.errors);
    }
  });

  it("should invalidate when the name exceeds the maximum length", function () {
    const invalidAppearanceDefinition = {
      index: { index: 0 },
      extension: {
        name: "A".repeat(65), // Exceeds 64 character max length
        description: "A valid description.",
        value: 100
      }
    };

    const isValid = CompiledAppearanceDefinitionSchema(invalidAppearanceDefinition);
    expect(isValid).to.be.false;
    if (CompiledAppearanceDefinitionSchema.errors) {
      console.error("Validation errors for long name:", CompiledAppearanceDefinitionSchema.errors);
    }
  });

  it("should invalidate when the description exceeds the maximum length", function () {
    const invalidAppearanceDefinition = {
      index: { index: 0 },
      extension: {
        name: "Valid Name",
        description: "D".repeat(257), // Exceeds 256 character max length
        value: 100
      }
    };

    const isValid = CompiledAppearanceDefinitionSchema(invalidAppearanceDefinition);
    expect(isValid).to.be.false;
    if (CompiledAppearanceDefinitionSchema.errors) {
      console.error("Validation errors for long description:", CompiledAppearanceDefinitionSchema.errors);
    }
  });

  it("should invalidate when the value is out of the valid range", function () {
    const invalidAppearanceDefinition = {
      index: { index: 0 },
      extension: {
        name: "Valid Name",
        description: "A valid description.",
        value: 300 // Exceeds maximum of 255
      }
    };

    const isValid = CompiledAppearanceDefinitionSchema(invalidAppearanceDefinition);
    expect(isValid).to.be.false;
    if (CompiledAppearanceDefinitionSchema.errors) {
      console.error("Validation errors for value out of range:", CompiledAppearanceDefinitionSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidAppearanceDefinition = {
      index: { index: 0 },
      extension: {
        name: "Valid Name",
        // Missing 'description'
        value: 100
      }
    };

    const isValid = CompiledAppearanceDefinitionSchema(invalidAppearanceDefinition);
    expect(isValid).to.be.false;
    if (CompiledAppearanceDefinitionSchema.errors) {
      console.error("Validation errors for missing required property:", CompiledAppearanceDefinitionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidAppearanceDefinition = {
      index: { index: 0 },
      extension: {
        name: "Valid Name",
        description: "A valid description.",
        value: 100,
        extraProperty: "Not allowed" // Additional property not allowed
      }
    };

    const isValid = CompiledAppearanceDefinitionSchema(invalidAppearanceDefinition);
    expect(isValid).to.be.false;
    if (CompiledAppearanceDefinitionSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledAppearanceDefinitionSchema.errors);
    }
  });
});