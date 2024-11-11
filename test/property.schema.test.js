import { expect } from "chai";
import { CompiledPropertyDefinitionSchema } from '../src/propertydefinition.schema.js';

// Test suite for PropertySchema
describe("PropertySchema Validation", function () {
  it("should validate a correct Property object", function () {
    const validProperty = {
      index: 10,
      name: "MaxHealth",
      value: 100,
      description: "The maximum health points.",
    };

    const isValid = CompiledPropertyDefinitionSchema(validProperty);
    expect(isValid).to.be.true;
    if (!isValid) {
      console.error("Validation errors:", CompiledPropertyDefinitionSchema.errors);
    }
    expect(CompiledPropertyDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate a Property object with an out-of-range index", function () {
    const invalidProperty = {
      index: 300, // Invalid index, out of range
      name: "MaxHealth",
      value: 100,
      description: "The maximum health points.",
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidProperty);
    expect(isValid).to.be.false;
    if (isValid ) {
      console.error("Validation errors for out-of-range index:", CompiledPropertyDefinitionSchema.errors);
    }
    expect(CompiledPropertyDefinitionSchema.errors).to.not.be.null;
  });

  it("should invalidate a Property object with a name exceeding maxLength", function () {
    const invalidProperty = {
      index: 10,
      name: "A".repeat(65), // Name exceeds maxLength of 64
      value: 100,
      description: "The maximum health points.",
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidProperty);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for name exceeding maxLength:", CompiledPropertyDefinitionSchema.errors);
    }
    expect(CompiledPropertyDefinitionSchema.errors).to.not.be.null;
  });

  it("should invalidate a Property object with a negative value", function () {
    const invalidProperty = {
      index: 10,
      name: "MaxHealth",
      value: -1, // Invalid value, less than minimum of 0
      description: "The maximum health points.",
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidProperty);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for negative value:", CompiledPropertyDefinitionSchema.errors);
    }
    expect(CompiledPropertyDefinitionSchema.errors).to.not.be.null;
  });

  it("should invalidate a Property object with a description exceeding maxLength", function () {
    const invalidProperty = {
      index: 10,
      name: "MaxHealth",
      value: 100,
      description: "A".repeat(257), // Description exceeds maxLength of 256
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidProperty);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for description exceeding maxLength:", CompiledPropertyDefinitionSchema.errors);
    }
    expect(CompiledPropertyDefinitionSchema.errors).to.not.be.null;
  });

  it("should invalidate a Property object with missing required properties", function () {
    const invalidProperty = {
      index: 10,
      name: "MaxHealth",
      // Missing 'value' and 'description'
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidProperty);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for missing required properties:", CompiledPropertyDefinitionSchema.errors);
    }
    expect(CompiledPropertyDefinitionSchema.errors).to.not.be.null;
  });

  it("should invalidate a Property object with additional properties", function () {
    const invalidProperty = {
      index: 10,
      name: "MaxHealth",
      value: 100,
      description: "The maximum health points.",
      extraProperty: "not allowed", // Additional property not allowed
    };

    const isValid = CompiledPropertyDefinitionSchema(invalidProperty);
    expect(isValid).to.be.false;
    if (isValid) {
      console.error("Validation errors for additional property:", CompiledPropertyDefinitionSchema.errors);
    }
    expect(CompiledPropertyDefinitionSchema.errors).to.not.be.null;
  });
});