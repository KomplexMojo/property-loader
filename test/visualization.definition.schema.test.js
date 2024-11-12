import { expect } from "chai";
import { CompiledVisualizationDefinitionSchema } from "../src/visualization.definition.schema.js";

describe("Visualization Definition Schema Validation", function () {
  
  it("should validate a correct Visualization Definition object", function () {
    const validVisualizationDefinition = {
      index: { value: 0 },
      extension: {
        name: "Valid Name",
        description: "A valid description that does not exceed the maximum length.",
        value: 100
      }
    };

    const isValid = CompiledVisualizationDefinitionSchema(validVisualizationDefinition);
    expect(isValid).to.be.true;
    expect(CompiledVisualizationDefinitionSchema.errors).to.be.null;
  });

  it("should invalidate when index is out of range", function () {
    const invalidVisualizationDefinition = {
      index: { value: 40 }, // Out of range for visualization index
      extension: {
        name: "Valid Name",
        description: "A valid description that does not exceed the maximum length.",
        value: 100
      }
    };

    const isValid = CompiledVisualizationDefinitionSchema(invalidVisualizationDefinition);
    expect(isValid).to.be.false;
    if (CompiledVisualizationDefinitionSchema.errors) {
      console.error("Validation errors for out-of-range index:", CompiledVisualizationDefinitionSchema.errors);
    }
  });

  it("should invalidate when the name exceeds the maximum length", function () {
    const invalidVisualizationDefinition = {
      index: { value: 0 },
      extension: {
        name: "A".repeat(65), // Exceeds 64 character max length
        description: "A valid description.",
        value: 100
      }
    };

    const isValid = CompiledVisualizationDefinitionSchema(invalidVisualizationDefinition);
    expect(isValid).to.be.false;
    if (CompiledVisualizationDefinitionSchema.errors) {
      console.error("Validation errors for long name:", CompiledVisualizationDefinitionSchema.errors);
    }
  });

  it("should invalidate when the description exceeds the maximum length", function () {
    const invalidVisualizationDefinition = {
      index: { value: 0 },
      extension: {
        name: "Valid Name",
        description: "D".repeat(257), // Exceeds 256 character max length
        value: 100
      }
    };

    const isValid = CompiledVisualizationDefinitionSchema(invalidVisualizationDefinition);
    expect(isValid).to.be.false;
    if (CompiledVisualizationDefinitionSchema.errors) {
      console.error("Validation errors for long description:", CompiledVisualizationDefinitionSchema.errors);
    }
  });

  it("should invalidate when the value is out of the valid range", function () {
    const invalidVisualizationDefinition = {
      index: { value: 0 },
      extension: {
        name: "Valid Name",
        description: "A valid description.",
        value: 300 // Exceeds maximum of 255
      }
    };

    const isValid = CompiledVisualizationDefinitionSchema(invalidVisualizationDefinition);
    expect(isValid).to.be.false;
    if (CompiledVisualizationDefinitionSchema.errors) {
      console.error("Validation errors for value out of range:", CompiledVisualizationDefinitionSchema.errors);
    }
  });

  it("should invalidate when a required property is missing", function () {
    const invalidVisualizationDefinition = {
      index: { value: 0 },
      extension: {
        name: "Valid Name",
        // Missing 'description'
        value: 100
      }
    };

    const isValid = CompiledVisualizationDefinitionSchema(invalidVisualizationDefinition);
    expect(isValid).to.be.false;
    if (CompiledVisualizationDefinitionSchema.errors) {
      console.error("Validation errors for missing required property:", CompiledVisualizationDefinitionSchema.errors);
    }
  });

  it("should invalidate when additional properties are present", function () {
    const invalidVisualizationDefinition = {
      index: { value: 0 },
      extension: {
        name: "Valid Name",
        description: "A valid description.",
        value: 100,
        extraProperty: "Not allowed" // Additional property not allowed
      }
    };

    const isValid = CompiledVisualizationDefinitionSchema(invalidVisualizationDefinition);
    expect(isValid).to.be.false;
    if (CompiledVisualizationDefinitionSchema.errors) {
      console.error("Validation errors for additional properties:", CompiledVisualizationDefinitionSchema.errors);
    }
  });
});