import { expect } from "chai";
import { CompiledCharacteristicsDefinition } from "../schemas/characteristic.definition.schema.js";

describe("Characteristics Definition Schema Validation", function () {

  it("should validate a correct Characteristics Definition object", function () {
    const validCharacteristicsDefinition = {
      index: { value: 45 }, // Within valid range for characteristics
      extension: {
        subindex: 0,
        name: "Valid Name",
        description: "A valid description.",
      }
    };

    const isValid = CompiledCharacteristicsDefinition(validCharacteristicsDefinition);
    expect(isValid).to.be.true;
    expect(CompiledCharacteristicsDefinition.errors).to.be.null;
  });

  it("should invalidate when the index is out of the valid range", function () {
    const invalidCharacteristicsDefinition = {
      index: { value: 90 }, // Out of valid range for characteristics
      extension: {
        subindex: 100,
        name: "Valid Name",
        description: "A valid description.",

      }
    };

    const isValid = CompiledCharacteristicsDefinition(invalidCharacteristicsDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicsDefinition.errors) {
      console.error("Validation errors for index out of range:", CompiledCharacteristicsDefinition.errors);
    }
  });

  it("should invalidate when the extension name exceeds max length", function () {
    const invalidCharacteristicsDefinition = {
      index: { value: 45 },
      extension: {
        subindex: 100,
        name: "A".repeat(65), // Exceeds 64 character max length
        description: "A valid description."
      }
    };

    const isValid = CompiledCharacteristicsDefinition(invalidCharacteristicsDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicsDefinition.errors) {
      console.error("Validation errors for long name in extension:", CompiledCharacteristicsDefinition.errors);
    }
  });

  it("should invalidate when the extension description exceeds max length", function () {
    const invalidCharacteristicsDefinition = {
      index: { value: 45 },
      extension: {
        subindex: 100,
        name: "Valid Name",
        description: "D".repeat(257), // Exceeds 256 character max length
      }
    };

    const isValid = CompiledCharacteristicsDefinition(invalidCharacteristicsDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicsDefinition.errors) {
      console.error("Validation errors for long description in extension:", CompiledCharacteristicsDefinition.errors);
    }
  });

  it("should invalidate when the extension value is out of range", function () {
    const invalidCharacteristicsDefinition = {
      index: { value: 45 },
      extension: {
        subindex: 300,
        name: "Valid Name",
        description: "A valid description."
      }
    };

    const isValid = CompiledCharacteristicsDefinition(invalidCharacteristicsDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicsDefinition.errors) {
      console.error("Validation errors for value out of range in extension:", CompiledCharacteristicsDefinition.errors);
    }
  });

  it("should invalidate when required properties are missing", function () {
    const invalidCharacteristicsDefinition = {
      index: { value: 45 },
      extension: {
        subindex: 100,
        name: "Valid Name"
        // Missing 'description' property
      }
    };

    const isValid = CompiledCharacteristicsDefinition(invalidCharacteristicsDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicsDefinition.errors) {
      console.error("Validation errors for missing required properties in extension:", CompiledCharacteristicsDefinition.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidCharacteristicsDefinition = {
      index: { value: 45 },
      extension: {
        subindex: 100,
        name: "Valid Name",
        description: "A valid description.",
        extraProperty: "Not allowed" // Additional property not allowed
      }
    };

    const isValid = CompiledCharacteristicsDefinition(invalidCharacteristicsDefinition);
    expect(isValid).to.be.false;
    if (CompiledCharacteristicsDefinition.errors) {
      console.error("Validation errors for additional properties:", CompiledCharacteristicsDefinition.errors);
    }
  });
});