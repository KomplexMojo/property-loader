import { expect } from "chai";
import { CompiledBehaviourDefinitionSchema } from "../schemas/behaviour.definition.schema.js";

describe("Behaviour Definition Schema Validation", function () {

  it("should validate a correct Behaviour Definition object", function () {
    const validBehaviourDefinition = {
      index: { value: 90 },
      extension: {
        subindex: { value: 100} ,
        name: "Valid Name",
        description: "A valid description within length limits.",
      }
    };

    const isValid = CompiledBehaviourDefinitionSchema(validBehaviourDefinition);
    expect(isValid).to.be.true;
    expect(CompiledBehaviourDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate when index is out of range", function () {
    const invalidBehaviourDefinition = {
      index: { value: 140 }, // Out of range for behaviour index
      extension: {
        subindex: 100,
        name: "Valid Name",
        description: "A valid description.",
      }
    };

    const isValid = CompiledBehaviourDefinitionSchema(invalidBehaviourDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourDefinitionSchema.errors) {
      console.error("Validation errors for out-of-range index:", CompiledBehaviourDefinitionSchema.errors);
    }
  });

  it("should invalidate when the name exceeds the maximum length", function () {
    const invalidBehaviourDefinition = {
      index: { value: 90 },
      extension: {
        subindex: 100,
        name: "A".repeat(65), // Exceeds 64 character max length
        description: "A valid description.",
      }
    };

    const isValid = CompiledBehaviourDefinitionSchema(invalidBehaviourDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourDefinitionSchema.errors) {
      console.error("Validation errors for long name:", CompiledBehaviourDefinitionSchema.errors);
    }
  });

  it("should invalidate when the description exceeds the maximum length", function () {
    const invalidBehaviourDefinition = {
      index: { value: 90 },
      extension: {
        subindex: 100,
        name: "Valid Name",
        description: "D".repeat(257), // Exceeds 256 character max length
      }
    };

    const isValid = CompiledBehaviourDefinitionSchema(invalidBehaviourDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourDefinitionSchema.errors) {
      console.error("Validation errors for long description:", CompiledBehaviourDefinitionSchema.errors);
    }
  });

  it("should invalidate when the value is out of the valid range", function () {
    const invalidBehaviourDefinition = {
      index: { value: 90 },
      extension: {
        subindex: 300, // Exceeds maximum of 255
        name: "Valid Name",
        description: "A valid description.",
      }
    };

    const isValid = CompiledBehaviourDefinitionSchema(invalidBehaviourDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourDefinitionSchema.errors) {
      console.error("Validation errors for value out of range:", CompiledBehaviourDefinitionSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidBehaviourDefinition = {
      index: { value: 90 },
      extension: {
        subindex: 100,
        name: "Valid Name",
        // Missing 'description'
      }
    };

    const isValid = CompiledBehaviourDefinitionSchema(invalidBehaviourDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourDefinitionSchema.errors) {
      console.error("Validation errors for missing required property:", CompiledBehaviourDefinitionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidBehaviourDefinition = {
      index: { value: 90 },
      extension: {
        subindex: 100,
        name: "Valid Name",
        description: "A valid description.",
        extraProperty: "Not allowed" // Additional property not allowed
      }
    };

    const isValid = CompiledBehaviourDefinitionSchema(invalidBehaviourDefinition);
    expect(isValid).to.be.false;
    if (CompiledBehaviourDefinitionSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledBehaviourDefinitionSchema.errors);
    }
  });
});